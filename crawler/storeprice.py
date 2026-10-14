"""Store-level prices: what Walmart charges at one store (Strongsville, OH), not Walmart.com.

  python -m crawler.storeprice probe --zip 44136 [--store-id N] [--sample raw-part.jsonl.gz]
  python -m crawler.storeprice refresh --budget-min 300     # (ci.py runs this as the `store` job)

The store is data/store.json. `refresh` asks Walmart for the store's price and stock of the snapshot's barcode
rows, 20 per call, consumable departments first and the oldest check first, and keeps them in
store_prices/<store_id>.jsonl.gz (one record per Walmart item id: p price, s stock, t date checked, g gone,
  e the HTTP status when Walmart could not answer for the id).
store_prices/latest.json says how many rows are still due; ci.decide() runs `store` while any are.
process.build() then shows the store price of every row checked within max_age_days (apply()).

Walmart's Product Lookup (`/items`) takes `storeId` and `zipCode` ("price and availability is also dependent on
zipCode and storeId", walmart.io affiliate docs). Most core rows in the crawl say "Not available" online (87% on
2026-10-09): those are items sold in stores, not shipped. A store price is the shelf price a donor paid, so it is
the price this app should show when Walmart returns one.

`probe` is read-only and costs about a dozen calls: it lists the stores near the zip code, then asks for the same
items three ways (no location, zipCode, storeId) and for one category page with and without storeId, and prints how
many prices and stock values differ. It answers, before anything is built on it: does this key get store prices,
for which store id, and from which endpoints. Nothing is written to the data-store.
"""
import argparse, json, os, random, sys, time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote

import requests

from .wm import SERVER_RETRIES

from . import store

CONFIG = Path(__file__).resolve().parent.parent / "data" / "store.json"
DIR = store.ROOT / "store_prices"
CHUNK = 20                    # /items takes up to 20 ids per call
SPLIT_RETRIES = 1             # 5xx retries per call while a failing chunk is split (the chunk itself had the full retries)
ERROR_RETRY_DAYS = 7          # an id Walmart answers with a server error is asked again after this many days
NOT_CARRIED_DAYS = 90         # a row the store does not carry is asked again after this many days (store.json not_carried_every_days)
DEAD_CHUNKS = 2               # consecutive chunks with every id failing on a server error: Walmart is down, stop the pass
SAVE_EVERY_S = 15 * 60
RECORD_VERSION = 2            # v1 records (2026-10-13) kept marketplace offers as store prices; they are refetched

FIELDS = ("salePrice", "stock", "availableOnline", "offerType")


def _items(page):
    items = page.get("items") if isinstance(page, dict) else page
    return [i for i in (items or []) if isinstance(i, dict)]


def _call(wm, path):
    try:
        return wm.get(path), None
    except Exception as e:  # noqa: BLE001 - the probe reports every failure instead of stopping
        return None, f"{type(e).__name__}: {str(e)[:200]}"


def stores_near(wm, zip_code):
    out = {}
    for path in (f"/stores?zip={quote(zip_code)}",):
        page, err = _call(wm, path)
        rows = page if isinstance(page, list) else (page or {}).get("stores") if isinstance(page, dict) else None
        out[path] = {"error": err} if err else {
            "stores": [{k: s.get(k) for k in ("no", "name", "city", "stateProvCode", "zip", "streetAddress")}
                       for s in (rows or []) if isinstance(s, dict)][:10],
            "raw_keys": sorted(page.keys())[:20] if isinstance(page, dict) else None}
    return out


def sample_ids(part, n=20, seed=7):
    """Up to n primary-listing item ids from a raw part: half 'Not available' online, half available."""
    rows = list(store.iter_jsonl_gz(part)) if part else []
    na = [r["itemId"] for r in rows if r.get("stock") == "Not available" and r.get("itemId")]
    av = [r["itemId"] for r in rows if r.get("stock") == "Available" and r.get("itemId")]
    rnd = random.Random(seed)
    return rnd.sample(na, min(len(na), n // 2)) + rnd.sample(av, min(len(av), n - min(len(na), n // 2)))


def compare(base, other):
    """Per field: how many of the items both answers carry differ."""
    b = {i.get("itemId"): i for i in base}
    o = {i.get("itemId"): i for i in other}
    both = [k for k in b if k in o]
    diff = {f: sum(1 for k in both if b[k].get(f) != o[k].get(f)) for f in FIELDS}
    examples = [{"itemId": k, "name": (b[k].get("name") or "")[:60],
                 **{f"{f}": [b[k].get(f), o[k].get(f)] for f in ("salePrice", "stock")}}
                for k in both if b[k].get("salePrice") != o[k].get("salePrice") or b[k].get("stock") != o[k].get("stock")][:8]
    return {"items_both": len(both), "only_base": len(set(b) - set(o)), "only_other": len(set(o) - set(b)),
            "differ": diff, "examples": examples}


def probe(wm, zip_code="44136", store_id=None, part=None, category="976759"):
    report = {"zip": zip_code, "stores": stores_near(wm, zip_code)}
    if not store_id:
        for v in report["stores"].values():
            for s in v.get("stores") or []:
                if s.get("no"):
                    store_id = str(s["no"]); break
            if store_id:
                break
    report["store_id"] = store_id
    ids = sample_ids(part) if part else []
    report["sample"] = len(ids)
    if ids:
        joined = ",".join(str(i) for i in ids)
        answers = {}
        for label, extra in (("plain", ""), ("zipCode", f"&zipCode={zip_code}"),
                             ("storeId", f"&storeId={store_id}" if store_id else None)):
            if extra is None:
                continue
            page, err = _call(wm, f"/items?ids={joined}{extra}")
            answers[label] = {"error": err} if err else _items(page)
        report["items"] = {label: (a if isinstance(a, dict) else {"returned": len(a)}) for label, a in answers.items()}
        for label in ("zipCode", "storeId"):
            if isinstance(answers.get(label), list) and isinstance(answers.get("plain"), list):
                report["items"][label]["vs_plain"] = compare(answers["plain"], answers[label])
    if store_id:
        base, err1 = _call(wm, f"/paginated/items?category={category}&soldByWmt=true")
        loc, err2 = _call(wm, f"/paginated/items?category={category}&soldByWmt=true&storeId={store_id}")
        report["paginated"] = {"error": err1 or err2} if (err1 or err2) else {
            "plain_items": len(_items(base)), "storeId_items": len(_items(loc)),
            "storeId_total_pages": loc.get("totalPages") if isinstance(loc, dict) else None,
            "plain_total_pages": base.get("totalPages") if isinstance(base, dict) else None,
            "vs_plain": compare(_items(base), _items(loc))}
    return report


# ----------------------------------------------------------------------------- refresh (the `store` job)

def config():
    try:
        c = json.loads(CONFIG.read_text())
    except (OSError, ValueError):
        return None
    return c if c.get("store_id") else None


def _now():
    return datetime.now(timezone.utc)


def _day(dt):
    return dt.date().isoformat()


def _age_days(day, now):
    try:
        return (now.date() - datetime.fromisoformat(str(day)[:10]).date()).days
    except ValueError:
        return None


def path(store_id):
    return DIR / f"{store_id}.jsonl.gz"


def load(store_id):
    """{item id: {"p": price | None, "s": stock, "t": "YYYY-MM-DD", "d": department, "v": RECORD_VERSION,
    "g": True when the store has no Walmart-sold offer for it}}. Records of an older version are dropped: they were
    taken before the sold-by-Walmart rule and may hold a marketplace seller's price (a 15 oz soup at $10)."""
    p = path(store_id)
    if not store.jsonl_exists(p):
        return {}
    return {r["id"]: r for r in store.iter_jsonl_gz(p) if "id" in r and r.get("v") == RECORD_VERSION}


def walmart_sold(it):
    """The same rule as the app's live check (pipeline/src/index.js walmartSold): Walmart's own offer with a price.
    With storeId Walmart answers with the buy-box offer, which is a marketplace seller's when the store does not
    carry the item; that price is not the shelf price."""
    if not isinstance(it, dict) or it.get("marketplace") is True:
        return False
    seller = str(it.get("sellerInfo") or "").strip().lower()
    if seller and seller != "walmart.com":
        return False
    p = it.get("salePrice")
    return isinstance(p, (int, float)) and not isinstance(p, bool) and p > 0


def tiers(cfg):
    """[(rank, department set, refresh_every_days, max_age_days)] from data/store.json `tiers`; without tiers, one tier of
    every consumable department (the 2026-10-09 behaviour) with the top-level cadence."""
    out = []
    for i, t in enumerate(cfg.get("tiers") or []):
        if isinstance(t, dict) and t.get("departments"):
            out.append((i, set(t["departments"]), int(t.get("refresh_every_days") or cfg.get("refresh_every_days") or 7),
                        int(t.get("max_age_days") or cfg.get("max_age_days") or 21)))
    if out:
        return out
    return [(0, _consumable_depts(), int(cfg.get("refresh_every_days") or 7), int(cfg.get("max_age_days") or 21))]


def tier_of(dept, cfg):
    """(rank, refresh_every_days, max_age_days) for a department, None when it is outside the store-price scope."""
    for rank, depts, every, max_age in tiers(cfg):
        if dept in depts:
            return rank, every, max_age
    return None


def save(store_id, recs):
    store.write_jsonl_gz(path(store_id), sorted(recs.values(), key=lambda r: str(r["id"])))


def source_rows():
    """The rows to price: the published snapshot, else the latest candidate."""
    for p in (store.ROOT / "build" / "published" / "items.jsonl.gz", store.ROOT / "build" / "candidate" / "items.jsonl.gz"):
        if store.jsonl_exists(p):
            return store.iter_jsonl_gz(p)
    return iter(())


def _consumable_depts():
    try:
        return {d["name"] for d in store.config()["departments"] if d.get("consumable")}
    except (OSError, ValueError, KeyError):
        return set()


def due_ids(rows, recs, now, every_days=None, consumable=None, cfg=None, meta=None):
    """Barcode rows (primary listing, not a placeholder) inside the store-price scope (tiers) whose store price is
    missing or older than their tier's refresh_every_days: lower tier first, never checked before checked long ago,
    then by id (stable). `meta` (optional dict) receives {id: (department, online price)} for the due rows."""
    cfg = cfg if cfg is not None else (config() or {})
    if every_days is not None and not cfg.get("tiers"):
        cfg = dict(cfg, refresh_every_days=every_days)
    if consumable is not None and not cfg.get("tiers"):
        tier_list = [(0, set(consumable), int(cfg.get("refresh_every_days") or 7), int(cfg.get("max_age_days") or 21))]
    else:
        tier_list = tiers(cfg)
    due = []
    for r in rows:
        if not r.get("primary") or not r.get("upc") or "placeholder" in (r.get("flags") or []):
            continue
        tier = next(((rank, every) for rank, depts, every, _ in tier_list if r.get("dept") in depts), None)
        if tier is None:
            continue
        rank, every = tier
        rec = recs.get(r["id"])
        age = _age_days(rec["t"], now) if rec else None
        if age is not None and age < _interval(rec, every, cfg):
            continue
        due.append((rank, rec is not None, -(age or 0), str(r["id"]), r["id"]))
        if meta is not None:
            meta[r["id"]] = (r.get("dept"), r.get("price"))
    due.sort()
    return [d[-1] for d in due]


def _interval(rec, every, cfg):
    """Days before a record is asked again: the tier's cadence for a priced row, sooner for a server error, and
    not_carried_every_days (at least the cadence) for a row the store does not carry."""
    if rec.get("e"):
        return min(every, ERROR_RETRY_DAYS)
    if rec.get("g"):
        v = (cfg or {}).get("not_carried_every_days", NOT_CARRIED_DAYS)
        v = int(v) if isinstance(v, (int, float)) and not isinstance(v, bool) and v > 0 else NOT_CARRIED_DAYS
        return max(every, v)
    return every


NOT_FOUND = ("HTTP 400 ", "HTTP 404 ")


class Unavailable(Exception):
    """Walmart answered every id of DEAD_CHUNKS chunks in a row with a server error: an outage, not bad ids."""


def _status(e):
    """The HTTP status behind a requests error, or "network" when the request never got an answer."""
    r = getattr(e, "response", None)
    return int(r.status_code) if r is not None and getattr(r, "status_code", None) else "network"


def _fetch(wm, ids, sid, calls, errors=None, retries=None):
    """The store's listings for ids: {itemId: item}. Walmart answers a chunk whose ids it cannot all serve at the store
    with HTTP 400 "Results not found" (2026-10-13, run 55) instead of an empty page, and a chunk holding certain ids
    with HTTP 502 on every attempt (2026-10-14, runs 58-61: the same 20 ids three times): either way the chunk is split
    in halves down to single ids, so the ids it does serve are still priced. A single id refused with 400 is gone; one
    that still fails on a server error (after SPLIT_RETRIES retries per call) is put in `errors` as (id, status) so the
    caller can record it and ask again later. Returns the items found; calls[0] counts the requests made."""
    path = f"/items?ids={','.join(str(x) for x in ids)}&storeId={quote(sid)}"
    try:
        page = wm.get(path) if retries is None else wm.get(path, server_retries=retries)
        calls[0] += 1
    except RuntimeError as e:
        if not str(e).startswith(NOT_FOUND):
            raise
        calls[0] += 1
        if len(ids) == 1:
            return {}
        mid = len(ids) // 2
        return {**_fetch(wm, ids[:mid], sid, calls, errors, retries), **_fetch(wm, ids[mid:], sid, calls, errors, retries)}
    except requests.RequestException as e:
        calls[0] += 1 + (SERVER_RETRIES if retries is None else retries)
        if len(ids) == 1:
            if errors is not None:
                errors.append((ids[0], _status(e)))
            return {}
        mid = len(ids) // 2
        return {**_fetch(wm, ids[:mid], sid, calls, errors, SPLIT_RETRIES),
                **_fetch(wm, ids[mid:], sid, calls, errors, SPLIT_RETRIES)}
    return {it.get("itemId"): it for it in _items(page)}


def refresh(wm, budget_min, now=None, cfg=None):
    """Price due rows at the configured store until done, the budget ends or Walmart throttles (Throttled propagates
    after the records fetched so far are saved). Returns a summary; writes store_prices/latest.json."""
    from .wm import Throttled
    cfg = cfg or config()
    if not cfg:
        return {"status": "skipped", "reason": "no data/store.json store_id"}
    now = now or _now()
    sid = str(cfg["store_id"])
    recs = load(sid)
    meta = {}
    ids = due_ids(source_rows(), recs, now, cfg=cfg, meta=meta)
    deadline = time.time() + budget_min * 60
    last_save = time.time()
    done = calls = got = gone = 0
    by_dept = {}
    outcome = "done"
    dead = failed = 0
    try:
        for i in range(0, len(ids), CHUNK):
            if time.time() > deadline:
                outcome = "budget"; break
            chunk = ids[i:i + CHUNK]
            n_calls, errors = [0], []
            items = _fetch(wm, chunk, sid, n_calls, errors)
            calls += n_calls[0]
            errored = {iid: status for iid, status in errors}
            dead = dead + 1 if len(chunk) > 1 and len(errored) == len(chunk) else 0
            day = _day(now)
            for iid in chunk:
                it = items.get(iid) or items.get(str(iid))
                dept, online = meta.get(iid, (None, None))
                st = by_dept.setdefault(dept or "?", {"checked": 0, "priced": 0, "gone": 0, "not_walmart": 0, "out_of_stock": 0,
                                                       "compared": 0, "same": 0, "within_5pct": 0, "higher": 0, "lower": 0,
                                                       "error": 0})
                st["checked"] += 1
                if iid in errored:
                    # Walmart could not answer for this id (a server error on every attempt): no price, asked again
                    # after ERROR_RETRY_DAYS rather than first thing next run
                    recs[iid] = {"id": iid, "p": None, "s": None, "t": day, "d": dept, "v": RECORD_VERSION, "g": True,
                                 "e": errored[iid]}
                    failed += 1; st["error"] += 1
                    continue
                if it is None or not walmart_sold(it):
                    # no listing, or a marketplace seller's buy box: the store has no shelf price for it
                    recs[iid] = {"id": iid, "p": None, "s": None, "t": day, "d": dept, "v": RECORD_VERSION, "g": True}
                    gone += 1; st["gone"] += 1
                    if it is not None:
                        st["not_walmart"] += 1
                    continue
                p = float(it["salePrice"])
                recs[iid] = {"id": iid, "p": p, "s": it.get("stock"), "t": day, "d": dept, "v": RECORD_VERSION}
                got += 1; st["priced"] += 1
                if it.get("stock") != "Available":
                    st["out_of_stock"] += 1
                if isinstance(online, (int, float)) and online > 0:
                    st["compared"] += 1
                    if abs(p - online) < 0.005:
                        st["same"] += 1; st["within_5pct"] += 1
                    else:
                        if abs(p - online) <= 0.05 * online:
                            st["within_5pct"] += 1
                        st["higher" if p > online else "lower"] += 1
            done += len(chunk)
            if dead >= DEAD_CHUNKS:
                outcome = "unavailable"
                last = errored[chunk[-1]]
                raise Unavailable(f"Walmart answered every id of {dead} chunks in a row with a server error "
                                  f"(last: {'HTTP %d' % last if isinstance(last, int) else 'network error'}); "
                                  f"{len(ids) - done} rows left for a later run")
            if time.time() - last_save > SAVE_EVERY_S:
                save(sid, recs); _marker(sid, len(ids) - done, now, recs, cfg, by_dept)
                store.checkpoint(f"store prices {sid}: {done}/{len(ids)}")
                last_save = time.time()
    except Throttled:
        outcome = "throttled"
        raise
    finally:
        save(sid, recs)
        latest = _marker(sid, len(ids) - done, now, recs, cfg, by_dept)
        store.checkpoint(f"store prices {sid}: {done}/{len(ids)} ({outcome})")
    return {"status": outcome, "store_id": sid, "due": len(ids), "checked": done, "priced": got, "gone": gone,
            "errors": failed, "calls": calls, "remaining": latest["due"], "by_dept": by_dept}


def _marker(sid, remaining, now, recs, cfg, by_dept=None):
    """store_prices/latest.json: rows still due, when the next pass is due (the oldest record of each tier plus the
    tier's cadence), the scope, and this pass's per-department comparison with Walmart.com's price."""
    next_due = None
    for rank, depts, every, _ in tiers(cfg):
        oldest = min((r["t"] for r in recs.values() if r.get("t") and r.get("d") in depts), default=None)
        nd = (datetime.fromisoformat(oldest) + timedelta(days=every)).date().isoformat() if oldest else _day(now)
        next_due = nd if next_due is None or nd < next_due else next_due
    latest = {"store_id": sid, "checked": now.isoformat(timespec="seconds"), "due": max(0, remaining),
              "records": len(recs), "next_due": next_due or _day(now),
              "scope": [{"departments": sorted(d), "refresh_every_days": e, "max_age_days": m} for _, d, e, m in tiers(cfg)]}
    if by_dept:
        latest["by_dept"] = by_dept
    store.write_json(DIR / "latest.json", latest)
    return latest


def due(latest, now):
    """For ci.decide(): store work is due when nothing was recorded yet, rows remain from the last pass, or the oldest
    record has aged past refresh_every_days (next_due)."""
    if not config():
        return False
    if not isinstance(latest, dict):
        return True
    if (latest.get("due") or 0) > 0:
        return True
    nd = latest.get("next_due")
    return not nd or str(nd)[:10] <= _day(now)


def apply(rows, now=None, cfg=None):
    """process.build(): every row with a store price checked within max_age_days shows it. Walmart.com's price stays in
    online_price; the per-unit price scales with it; an online promo or kept normal price no longer applies (the store
    price is what the shelf says). Returns how many rows took a store price."""
    for r in rows.values():
        # a row carried over from the last snapshot may already show a store price: start again from Walmart.com's
        if "store_price" in r.get("flags", []):
            online = r.pop("online_price", None)
            if isinstance(online, (int, float)) and online > 0:
                if r.get("unit_price") and r.get("price"):
                    r["unit_price"] = round(r["unit_price"] * online / r["price"], 4)
                r["price"] = online
            r["flags"] = [f for f in r["flags"] if f != "store_price"]
            r.pop("store_checked", None); r.pop("store_stock", None)
    cfg = cfg or config()
    if not cfg:
        return 0
    now = now or _now()
    recs = load(str(cfg["store_id"]))
    if not recs:
        return 0
    n = 0
    for r in rows.values():
        rec = recs.get(r["id"])
        if not rec or rec.get("g") or not isinstance(rec.get("p"), (int, float)) or rec["p"] <= 0:
            continue
        if rec.get("s") != "Available":
            continue                                  # the shelf price of an item the store is out of: not shown
        tier = tier_of(rec.get("d") or r.get("dept"), cfg)
        if tier is None:
            continue
        age = _age_days(rec.get("t"), now)
        if age is None or age > tier[2]:
            continue
        old = r.get("price")
        r["online_price"] = old
        r["price"] = round(float(rec["p"]), 2)
        if r.get("unit_price") and isinstance(old, (int, float)) and old > 0:
            r["unit_price"] = round(r["unit_price"] * r["price"] / old, 4)
        r.pop("promo", None)
        r["flags"] = [f for f in r.get("flags", []) if f not in ("kept_normal_price", "promo_price")] + ["store_price"]
        r["store_checked"] = rec["t"]
        if rec.get("s"):
            r["store_stock"] = rec["s"]
        n += 1
    return n


def markdown(r):
    L = [f"### Store price probe (zip {r['zip']}, store id {r.get('store_id') or 'none found'})", ""]
    for path, v in r["stores"].items():
        if v.get("error"):
            L.append(f"- `{path}`: {v['error']}")
        else:
            L.append(f"- `{path}`: {len(v['stores'])} stores" + (f" (keys {v['raw_keys']})" if v.get("raw_keys") else ""))
            for s in v["stores"]:
                L.append(f"  - #{s.get('no')} {s.get('name')} — {s.get('streetAddress')}, {s.get('city')} {s.get('zip')}")
    L.append(f"\nSample: {r.get('sample', 0)} items (half 'Not available' online)\n")
    for label, v in (r.get("items") or {}).items():
        if v.get("error"):
            L.append(f"- `/items` {label}: {v['error']}")
            continue
        line = f"- `/items` {label}: {v.get('returned')} returned"
        if "vs_plain" in v:
            c = v["vs_plain"]
            line += f"; vs no location: {c['differ']['salePrice']} prices and {c['differ']['stock']} stock values differ of {c['items_both']}"
        L.append(line)
        for e in (v.get("vs_plain") or {}).get("examples", []):
            L.append(f"  - {e['itemId']} {e['name']}: price {e['salePrice'][0]} -> {e['salePrice'][1]}, stock {e['stock'][0]} -> {e['stock'][1]}")
    p = r.get("paginated")
    if p:
        if p.get("error"):
            L.append(f"- `/paginated` with storeId: {p['error']}")
        else:
            c = p["vs_plain"]
            L.append(f"- `/paginated` with storeId: {p['storeId_items']} items, {p['storeId_total_pages']} pages "
                     f"(plain {p['plain_items']}, {p['plain_total_pages']} pages); {c['differ']['salePrice']} prices and "
                     f"{c['differ']['stock']} stock values differ of {c['items_both']}")
    return "\n".join(L)


def main(argv=None):
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("probe")
    p.add_argument("--zip", default="44136")
    p.add_argument("--store-id", default=None)
    p.add_argument("--sample", default=None, help="a raw crawl part (jsonl.gz) to draw item ids from")
    rf = sub.add_parser("refresh")
    rf.add_argument("--budget-min", type=float, default=60)
    a = ap.parse_args(argv)
    from .wm import Walmart
    if a.cmd == "refresh":
        print(json.dumps(refresh(Walmart(), a.budget_min), indent=1))
        return 0
    r = probe(Walmart(), a.zip, a.store_id or None, Path(a.sample) if a.sample else None)
    text = markdown(r)
    print(text)
    print(json.dumps(r, indent=1, default=str)[:20000])
    summ = os.environ.get("GITHUB_STEP_SUMMARY")
    if summ:
        with open(summ, "a") as f:
            f.write(text + "\n")


if __name__ == "__main__":
    sys.exit(main())
