"""Offline identification + equivalent pricing for barcodes Walmart doesn't sell
(Aldi, Giant Eagle, Meijer, Target, Dollar General, Marc's, Costco store brands, regional brands).

  python -m crawler.identify fetch     # Open Food/Beauty/Products Facts -> US subset (UPC, name, brand, quantity)
  python -m crawler.identify match     # pre-compute an equivalent Walmart price for each identified UPC

Equivalent price = the closest Walmart-sold product of the same type, priced per unit and scaled to the
donated item's size. Other chains' store brands are matched to Walmart's store brands (same price tier);
national brands are matched to the same brand first. Every row carries a confidence and the basis item,
and the app labels these as "equivalent value", never as an exact price.
Data: Open Food Facts contributors, ODbL (attribution required in the app's About screen).
"""
import argparse, csv, gzip, io, json, re, sys
from pathlib import Path
from collections import Counter, defaultdict

import requests

from . import store
from .normalize import gtin14, parse_quantity, to_base

SOURCES = [
    "https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv.gz",
    "https://static.openbeautyfacts.org/data/en.openbeautyfacts.org.products.csv.gz",
    "https://static.openproductsfacts.org/data/en.openproductsfacts.org.products.csv.gz",
]
OUT = store.ROOT / "identify"
# Open Food Facts refuses requests without an identifying User-Agent (python-requests' default gets HTTP 403)
USER_AGENT = "SFBValuation/1.0 (Strongsville Emergency Food Bank donation valuation; +https://github.com/v3vermillion/sfb-valuation)"

BRANDS_FILE = Path(__file__).resolve().parent.parent / "data" / "brands.json"


def store_brands(path=BRANDS_FILE):
    """{brand (lower-case) -> store name} from data/brands.json: the other chains' store brands a food bank receives."""
    cfg = json.loads(Path(path).read_text(encoding="utf-8"))
    return {b.strip().lower(): store for store, d in cfg["stores"].items() for b in d.get("brands", [])}


OTHER_STORE_BRANDS = frozenset(store_brands())
WALMART_STORE_BRANDS = {"great value", "equate", "mainstays", "parent's choice", "marketside", "freshness guaranteed",
                        "sam's choice", "bettergoods", "ol' roy", "special kitty", "pen+gear", "hyper tough", "onn."}
STOP = {"the", "and", "with", "of", "in", "a", "an", "for", "to", "oz", "fl", "lb", "lbs", "g", "ml", "l", "ct", "count",
        "pack", "pk", "can", "cans", "jar", "bottle", "bottles", "box", "bag", "each", "size", "value", "family",
        "net", "wt", "x", "&", "-", "original", "brand"}


def tokens(text, brand=None):
    t = re.sub(r"\d+(\.\d+)?", " ", (text or "").lower())
    words = re.findall(r"[a-z][a-z'+]*", t)
    btoks = set(re.findall(r"[a-z][a-z'+]*", (brand or "").lower()))
    return {w for w in words if w not in STOP and w not in btoks and len(w) > 1}


def fetch(attempts=4, wait_s=20):
    """Download the Open Food/Beauty/Products Facts exports and keep US products with a valid barcode and a name.
    Each source is retried (its S3 mirror answers 404 now and then); a source that still fails raises, so a partial
    product list is never written."""
    import time
    OUT.mkdir(parents=True, exist_ok=True)
    csv.field_size_limit(sys.maxsize)
    rows, seen = [], set()
    for url in SOURCES:
        for attempt in range(1, attempts + 1):
            try:
                got, keys = _read_source(url, seen)
                break
            except (requests.RequestException, OSError, EOFError) as e:
                if attempt == attempts:
                    raise
                print(f"{url.split('/')[2]}: attempt {attempt} failed ({type(e).__name__}: {e}); retrying")
                time.sleep(wait_s * attempt)
        rows += got
        seen |= keys
        print(f"{url.split('/')[2]}: {len(got)} US products")
    store.write_jsonl_gz(OUT / "products_us.jsonl.gz", rows)
    print(f"total {len(rows)}")


def _read_source(url, seen):
    got, keys = [], set()
    with requests.get(url, stream=True, timeout=600, headers={"User-Agent": USER_AGENT}) as r:
        r.raise_for_status()
        gz = gzip.GzipFile(fileobj=r.raw)
        reader = csv.reader(io.TextIOWrapper(gz, encoding="utf-8", errors="replace"), delimiter="\t", quoting=csv.QUOTE_NONE)
        header = next(reader)
        ix = {h: i for i, h in enumerate(header)}
        for rec in reader:
            try:
                if "en:united-states" not in rec[ix["countries_tags"]]:
                    continue
                key, _, ok = gtin14(rec[ix["code"]])
                name = rec[ix["product_name"]].strip()
                if not key or not ok or not name or key in seen or key in keys:
                    continue
                keys.add(key)
                got.append({"upc": key, "name": name, "brand": rec[ix["brands"]].split(",")[0].strip(),
                            "quantity": rec[ix["quantity"]].strip()})
            except (IndexError, KeyError):
                continue
    return got, keys


# Open Facts quantities are typed by volunteers: a can of soda is "12 oz" as often as "12 fl oz" (2,990 vs 4,060
# beverage-named US records, 2026-10-19), so weight and volume ounces match each other one to one
LOOSE_UNITS = {"oz", "fl oz"}
GROUP_MARGIN = 0.1      # candidates this close to the best score form the group whose median per-unit price is the value
GROUP_MAX = 10


def same_measure(a, b):
    return a == b or (a in LOOSE_UNITS and b in LOOSE_UNITS)


def group_value(scored, base, pack):
    """The equivalent price from the best-scoring comparable items: the median per-unit price of the top group (every
    candidate within GROUP_MARGIN of the best score, at most GROUP_MAX, same-pack listings first), times the item's
    size. One listing never sets the value on its own: a "12 oz" energy drink was priced from a single 24-can case at
    $80.94 (2026-10-19). Returns (price, basis row, group size)."""
    scored.sort(key=lambda x: (-x[0], x[1].get("pack") != pack, str(x[1]["id"])))
    best = scored[0][0]
    group = [r for sc, r in scored if sc >= best - GROUP_MARGIN][:GROUP_MAX]
    ups = sorted(r["unit_price"] for r in group)
    med = ups[len(ups) // 2] if len(ups) % 2 else (ups[len(ups) // 2 - 1] + ups[len(ups) // 2]) / 2
    basis = min(group, key=lambda r: (abs(r["unit_price"] - med), r.get("pack") != pack, str(r["id"])))
    return round(med * base * pack, 2), basis, len(group)


def match():
    pub = store.ROOT / "build" / "published" / "items.jsonl.gz"
    cand = store.ROOT / "build" / "candidate" / "items.jsonl.gz"
    src = pub if store.jsonl_exists(pub) else cand
    wm = [r for r in store.iter_jsonl_gz(src) if r.get("unit_price") and r.get("base_unit")
          and "placeholder" not in (r.get("flags") or []) and not r.get("price_withheld")]
    wm_upcs = {r["upc"] for r in store.iter_jsonl_gz(src) if r.get("upc")}
    index = defaultdict(list)
    tok_of = {}
    for i, r in enumerate(wm):
        tk = tokens(r["name"], r.get("brand"))
        tok_of[i] = tk
        for t in tk:
            index[t].append(i)
    df = Counter({t: len(v) for t, v in index.items()})

    out, stats = [], Counter()
    for p in store.iter_jsonl_gz(OUT / "products_us.jsonl.gz"):
        if p["upc"] in wm_upcs:
            stats["exact_in_walmart"] += 1; continue
        size, unit, pack = parse_quantity(p["quantity"] or p["name"])
        base, dim = to_base(size, unit)
        pt = tokens(p["name"], p["brand"])
        if not pt or not base:
            stats["unparseable"] += 1; continue
        brand = (p["brand"] or "").lower()
        other_store = brand in OTHER_STORE_BRANDS
        cands = set()
        for t in sorted(pt, key=lambda t: df.get(t, 0))[:3]:
            if df.get(t, 0) and df[t] < 20000:
                cands.update(index[t])
        scored = []
        for i in cands:
            r = wm[i]
            if not same_measure(r["base_unit"], dim):
                continue
            j = len(pt & tok_of[i]) / len(pt | tok_of[i])
            rb = (r.get("brand") or "").lower()
            if other_store and rb in WALMART_STORE_BRANDS:
                j += 0.15
            elif not other_store and rb and rb == brand:
                j += 0.25
            ratio = min(base, r["base_qty"]) / max(base, r["base_qty"])
            j += 0.1 * ratio
            if j >= 0.45:
                scored.append((j, r))
        if not scored:
            stats["no_equivalent"] += 1; continue
        price, best, n_group = group_value(scored, base, pack or 1)
        best_score = scored[0][0]
        conf = "high" if best_score >= 0.7 else "medium" if best_score >= 0.55 else "low"
        stats[f"matched_{conf}"] += 1
        out.append({"upc": p["upc"], "name": p["name"], "brand": p["brand"], "quantity": p["quantity"],
                    "base_qty": base, "base_unit": dim, "pack": pack or 1, "est_price": price,
                    "basis_id": best["id"], "basis_name": best["name"], "basis_price": best["price"], "basis_count": n_group,
                    "confidence": conf, "score": round(best_score, 3)})
    n = store.write_jsonl_gz(OUT / "equivalents.jsonl.gz", out)
    store.write_json(OUT / "equivalents_stats.json", dict(stats))
    print(f"equivalents: {n}  {dict(stats)}")


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["fetch", "match"])
    a = ap.parse_args(argv)
    fetch() if a.cmd == "fetch" else match()


if __name__ == "__main__":
    main()
