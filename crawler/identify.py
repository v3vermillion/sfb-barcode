"""Offline identification + equivalent pricing for barcodes Walmart doesn't sell
(Aldi, Giant Eagle, Meijer, Target, Dollar General, Marc's, Costco store brands, regional brands).

  python -m crawler.identify fetch     # USDA FoodData Central (other chains' brands) + Open Food/Beauty/Products Facts
                                       #   -> US products (UPC, name, brand, quantity)
  python -m crawler.identify match     # pre-compute an equivalent Walmart price for each identified UPC

Equivalent price = the closest Walmart-sold product of the same type, priced per unit and scaled to the
donated item's size. Other chains' store brands are matched to Walmart's store brands (same price tier);
national brands are matched to the same brand first. Every row carries a confidence and the basis item,
and the app labels these as "equivalent value", never as an exact price.
Data: USDA FoodData Central, Branded Foods (public domain; label data from GS1 US, the barcode registry, so the other
chains' store brands are complete and exact: Aldi's Clancy's, Kroger's Private Selection, Kirkland Signature), kept for
the chains in data/brands.json (brand, brand owner or barcode prefix: the gap the food bank sees, and a pack the phone can
hold); Open Food/Beauty/Products Facts contributors, ODbL (attribution required in the app's About screen), for the rest.
"""
import argparse, csv, gzip, io, json, os, re, sys, tempfile, zipfile
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
# USDA FoodData Central, Branded Foods: the download page names the newest release (twice a year); the dated URL is the
# fallback when the page cannot be read. 430 MB zipped; branded_food.csv (UPC, brand owner, brand name, package weight,
# market country) and food.csv (the descriptions) are read from the archive on disk, never held in memory whole.
FDC_PAGE = "https://fdc.nal.usda.gov/download-datasets"
FDC_RX = re.compile(r"fdc-datasets/FoodData_Central_branded_food_csv_(\d{4}-\d{2}-\d{2})\.zip")
FDC_URL = "https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_branded_food_csv_{date}.zip"
FDC_FALLBACK_DATE = "2026-04-30"
OUT = store.ROOT / "identify"
# Open Food Facts refuses requests without an identifying User-Agent (python-requests' default gets HTTP 403)
USER_AGENT = "SFBValuation/1.0 (Strongsville Emergency Food Bank donation valuation; +https://github.com/v3vermillion/sfb-valuation)"

BRANDS_FILE = Path(__file__).resolve().parent.parent / "data" / "brands.json"


def store_brands(path=BRANDS_FILE):
    """{brand (lower-case) -> store name} from data/brands.json: the other chains' store brands a food bank receives."""
    cfg = json.loads(Path(path).read_text(encoding="utf-8"))
    return {b.strip().lower(): store for store, d in cfg["stores"].items() for b in d.get("brands", [])}


def other_store_brands():
    """The other chains' brands, and the chains' own names (a USDA row whose brand owner is the chain and whose brand field
    is empty is listed under the chain's name), as a set read when needed (a build or an audit never fails on an edit to
    brands.json)."""
    cfg = json.loads(Path(BRANDS_FILE).read_text(encoding="utf-8"))
    return frozenset(store_brands()) | frozenset(s.lower() for s in cfg["stores"] if s != "another grocer")


def fdc_scope(path=BRANDS_FILE):
    """scope(brand, owner, gtin14) -> the chain a USDA Branded Foods row belongs to, or None: a listed brand, a brand owner
    whose name has the chain's words (data/brands.json `owners`), or a barcode under one of the chain's company prefixes."""
    cfg = json.loads(Path(path).read_text(encoding="utf-8"))
    brands = {b.strip().lower(): st for st, d in cfg["stores"].items() for b in d.get("brands", [])}
    owners = [(re.compile(r"\b" + re.escape(o.lower()) + r"\b"), st) for st, d in cfg["stores"].items() for o in d.get("owners", [])]
    prefixes = [(p, st) for st, d in cfg["stores"].items() for p in d.get("prefixes", [])]

    def scope(brand, owner, key):
        st = brands.get((brand or "").strip().lower())
        if st:
            return st
        o = (owner or "").lower()
        for rx, st in owners:
            if rx.search(o):
                return st
        ean = (key or "")[1:]
        for p, st in prefixes:
            if ean.startswith(p):
                return st
        return None
    return scope


_SMALL = {"a", "an", "and", "of", "or", "the", "with", "in", "for", "to", "on", "by", "n"}


def title_case(s):
    """USDA label text is often all capitals ("CLANCY'S, BAKED POTATO CRISPS"): lower it and capitalise each word, small
    words aside; text that already has lower-case letters is left as it is."""
    s = re.sub(r"\s+", " ", (s or "").strip())
    if not s or s != s.upper():
        return s
    words = s.lower().split(" ")
    cap = lambda w: re.sub(r"(^|[-/(])([a-z])", lambda m: m.group(1) + m.group(2).upper(), w)
    return " ".join(w if (i and w in _SMALL) else cap(w) for i, w in enumerate(words))
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


def _retry(fn, label, attempts, wait_s):
    import time
    for attempt in range(1, attempts + 1):
        try:
            return fn()
        except (requests.RequestException, OSError, EOFError, zipfile.BadZipFile, KeyError) as e:
            if attempt == attempts:
                raise
            print(f"{label}: attempt {attempt} failed ({type(e).__name__}: {e}); retrying")
            time.sleep(wait_s * attempt)


def fetch(attempts=4, wait_s=20):
    """Download USDA FoodData Central's Branded Foods (the other chains' brands) and the Open Food/Beauty/Products Facts
    exports, and keep US products with a valid barcode and a name: the USDA row first (label data), Open Facts for every
    other barcode and for the package size a USDA row lacks. Each source is retried (the Open Facts S3 mirror answers 404
    now and then); a source that still fails raises, so a partial product list is never written."""
    OUT.mkdir(parents=True, exist_ok=True)
    csv.field_size_limit(sys.maxsize)
    fdc = _retry(lambda: _fetch_fdc(fdc_scope()), "usda", attempts, wait_s)
    print(f"usda: {len(fdc)} products of the chains in data/brands.json")
    rows, seen = [], set()
    for url in SOURCES:
        got, keys = _retry(lambda: _read_source(url, seen), url.split("/")[2], attempts, wait_s)
        rows += got
        seen |= keys
        print(f"{url.split('/')[2]}: {len(got)} US products")
    merged = merge_sources(fdc, rows)
    store.write_jsonl_gz(OUT / "products_us.jsonl.gz", merged)
    print(f"total {len(merged)}")


def merge_sources(fdc, open_facts):
    """One row per barcode: the USDA row, with Open Facts' quantity when the label data gives no package size; every other
    Open Facts row as it is."""
    by = {r["upc"]: dict(r) for r in fdc}
    out = []
    for r in open_facts:
        f = by.get(r["upc"])
        if f is None:
            out.append(r)
        elif not f.get("quantity") and r.get("quantity"):
            f["quantity"] = r["quantity"]
    return list(by.values()) + out


def fdc_url(session=requests):
    """The newest Branded Foods CSV release named on the download page, else the dated fallback."""
    try:
        r = session.get(FDC_PAGE, timeout=120, headers={"User-Agent": USER_AGENT})
        r.raise_for_status()
        dates = FDC_RX.findall(r.text)
    except requests.RequestException:
        dates = []
    return FDC_URL.format(date=max(dates) if dates else FDC_FALLBACK_DATE)


def _fetch_fdc(scope):
    url = fdc_url()
    fd, tmp = tempfile.mkstemp(prefix="fdc-", suffix=".zip")
    os.close(fd)
    try:
        with requests.get(url, stream=True, timeout=600, headers={"User-Agent": USER_AGENT}) as r:
            r.raise_for_status()
            with open(tmp, "wb") as f:
                for chunk in r.iter_content(1 << 20):
                    f.write(chunk)
        print(f"usda: {url.rsplit('/', 1)[1]} downloaded")
        return read_fdc(tmp, scope)
    finally:
        try:
            os.unlink(tmp)
        except OSError:
            pass


def read_fdc(zip_path, scope):
    """The US Branded Foods rows of the chains `scope` names, from the release archive: {upc, name, brand, quantity, store,
    source "usda"}; the newest record of a barcode wins. Names are the label description, title-cased, without a leading
    repeat of the brand ("CLANCY'S, BAKED POTATO CRISPS" -> "Baked Potato Crisps" under brand Clancy's)."""
    csv.field_size_limit(sys.maxsize)
    with zipfile.ZipFile(zip_path) as z:
        names = {n.rsplit("/", 1)[-1]: n for n in z.namelist()}
        with z.open(names["branded_food.csv"]) as f:
            reader = csv.reader(io.TextIOWrapper(f, encoding="utf-8", errors="replace"))
            header = next(reader)
            ix = {h: i for i, h in enumerate(header)}
            picked = {}                                   # fdc_id -> (available_date, row without a name yet)
            by_upc = {}                                   # upc -> fdc_id
            for rec in reader:
                try:
                    if rec[ix["market_country"]].strip() != "United States":
                        continue
                    key, _, ok = gtin14(rec[ix["gtin_upc"]])
                    if not key or not ok:
                        continue
                    brand = rec[ix["brand_name"]].strip()
                    owner = rec[ix["brand_owner"]].strip()
                    st = scope(brand, owner, key)
                    if not st:
                        continue
                    when = rec[ix["available_date"]].strip() if "available_date" in ix else ""
                    prev = by_upc.get(key)
                    if prev is not None and picked[prev][0] >= _iso_date(when):
                        continue
                    if prev is not None:
                        del picked[prev]
                    fid = rec[ix["fdc_id"]].strip()
                    by_upc[key] = fid
                    picked[fid] = (_iso_date(when), {"upc": key, "brand": title_case(brand) if brand else st, "store": st,
                                                      "quantity": rec[ix["package_weight"]].strip() if "package_weight" in ix else "",
                                                      "source": "usda"})
                except (IndexError, KeyError):
                    continue
        out = []
        with z.open(names["food.csv"]) as f:
            reader = csv.reader(io.TextIOWrapper(f, encoding="utf-8", errors="replace"))
            header = next(reader)
            ix = {h: i for i, h in enumerate(header)}
            for rec in reader:
                try:
                    hit = picked.get(rec[ix["fdc_id"]].strip())
                    if hit is None:
                        continue
                    name = _label_name(rec[ix["description"]], hit[1]["brand"])
                    if name:
                        out.append({**hit[1], "name": name})
                except (IndexError, KeyError):
                    continue
    out.sort(key=lambda r: r["upc"])
    return [{"upc": r["upc"], "name": r["name"], "brand": r["brand"], "quantity": r["quantity"], "store": r["store"], "source": r["source"]} for r in out]


def _iso_date(s):
    """USDA dates are m/d/Y; sortable Y-m-d, "" when unreadable."""
    m = re.match(r"^\s*(\d{1,2})/(\d{1,2})/(\d{4})\s*$", s or "")
    return f"{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}" if m else (s or "").strip()


def _label_name(description, brand):
    """The label description, title-cased; the USDA "BRAND, DESCRIPTION" form loses the repeated brand (the app shows the
    brand once, before the name); a brand that is simply the first word of the name stays."""
    name = title_case(description)
    if brand and name.lower().startswith(brand.lower()) and name[len(brand):len(brand) + 1] in (",", ":"):
        rest = name[len(brand) + 1:].strip(" ,:-")
        if rest:
            name = rest
    return name


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


# Walmart's own brands against national brands of the same kind and unit, measured on the published snapshot
# 2026-10-20 across 28 kinds: median unit-price ratio 0.49 (quartiles 0.34 and 0.74). Another chain's store brand
# valued from national-brand comparables alone would be about twice its real price (a Kirkland energy drink at a
# Monster can's price), so the value is scaled by the ratio measured in the item's category, else the default.
STORE_TIER_DEFAULT = 0.5
STORE_TIER_MIN, STORE_TIER_MAX = 0.3, 0.9


def store_tier_factors(wm):
    """{(cat, base_unit): median store-brand unit price / median national-brand unit price}, where both sides have
    enough rows (10 and 20), clipped to [STORE_TIER_MIN, STORE_TIER_MAX]."""
    import statistics
    sb, nb = defaultdict(list), defaultdict(list)
    for r in wm:
        key = (r.get("cat"), r.get("base_unit"))
        ((sb if (r.get("brand") or "").strip().lower() in WALMART_STORE_BRANDS else nb)[key]).append(r["unit_price"])
    out = {}
    for key, s in sb.items():
        n = nb.get(key) or []
        if len(s) >= 10 and len(n) >= 20:
            out[key] = round(min(STORE_TIER_MAX, max(STORE_TIER_MIN, statistics.median(s) / statistics.median(n))), 2)
    return out


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
    has_store_brand = any((r.get("brand") or "").strip().lower() in WALMART_STORE_BRANDS for r in group)
    return round(med * base * pack, 2), basis, len(group), has_store_brand


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
    others = other_store_brands()
    tiers = store_tier_factors(wm)
    for p in store.iter_jsonl_gz(OUT / "products_us.jsonl.gz"):
        if p["upc"] in wm_upcs:
            stats["exact_in_walmart"] += 1; continue
        size, unit, pack = parse_quantity(p["quantity"] or p["name"])
        base, dim = to_base(size, unit)
        pt = tokens(p["name"], p["brand"])
        if not pt or not base:
            stats["unparseable"] += 1; continue
        brand = (p["brand"] or "").lower()
        other_store = brand in others
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
        price, best, n_group, has_store_brand = group_value(scored, base, pack or 1)
        factor = None
        if other_store and not has_store_brand:
            factor = tiers.get((best.get("cat"), best.get("base_unit")), STORE_TIER_DEFAULT)
            price = round(price * factor, 2)
            stats["store_tier_applied"] += 1
        best_score = scored[0][0]
        conf = "high" if best_score >= 0.7 else "medium" if best_score >= 0.55 else "low"
        stats[f"matched_{conf}"] += 1
        if p.get("source") == "usda":
            stats["matched_usda"] += 1
        out.append({"upc": p["upc"], "name": p["name"], "brand": p["brand"], "quantity": p["quantity"],
                    "base_qty": base, "base_unit": dim, "pack": pack or 1, "est_price": price,
                    "basis_id": best["id"], "basis_name": best["name"], "basis_price": best["price"], "basis_count": n_group,
                    "store_brand_factor": factor, "confidence": conf, "score": round(best_score, 3)})
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
