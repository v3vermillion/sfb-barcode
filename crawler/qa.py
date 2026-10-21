"""Acceptance gates, sample-review hand-off and publishing.

  python -m crawler.qa check             # evaluate the candidate: report.md, gates.json, review-sample.jsonl
  python -m crawler.qa finalize          # fold build/candidate/review-verdict.json (crawler/review.py) into the gates
  python -m crawler.qa publish           # promote the candidate when gates.json says "ready"
  python -m crawler.qa publish --approve # manual override: publish a held candidate after reading the report

check(wm) -> "ready" | "review" | "hold"      state.status: ready/review -> "built", hold -> "needs_review"
finalize() -> "ready" | "hold"
publish(approve=False) -> bool                 records price history (crawler/history.py) before replacing build/published

Thresholds live in data/gates.json (defaults below). A null threshold means measure-only: the gate is
measured and reported but never holds. gates.json records config_hash (sha256 of data/gates.json +
data/sentinels.json + data/categories.json) so the orchestrator can re-evaluate a hold after an edit to
a threshold. A snapshot reaches the app only through `publish`; a hold keeps the previous snapshot live.
"""
import argparse, hashlib, json, os, random, shutil, statistics
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

import requests

from . import store, history, review
from .normalize import to_base
from .wm import Throttled

BUILD = store.ROOT / "build"
CAND, PUB = BUILD / "candidate", BUILD / "published"
STATE = store.ROOT / "state" / "run.json"
SIZING = store.ROOT / "sizing.json"
DATA = Path(__file__).resolve().parent.parent / "data"
SENTINELS = DATA / "sentinels.json"
GATES = DATA / "gates.json"

DEFAULTS = {
    "dept_size_tolerance": 0.30,        # pages crawled vs sizing total_pages; null = skip the comparison
    "sentinel_misses_max": 0,
    "live_sample": 500,                 # rows re-checked live against /items?ids=
    "live_match_min": 0.90,             # share of rows Walmart still lists whose live price is within live_match_tolerance
    "live_match_tolerance": 0.05,       # a live price this close to the snapshot counts as a match (0 = exact only)
    "live_missing_max": None,           # share of sampled rows Walmart no longer lists; null = reported, never holds
    "size_parse_min": 0.92,             # share of Food rows sized (parsed, by the pound or sold each); 0.927 measured 2026-10-08
    "unit_outliers_max": None,          # share of unit-priced rows outside [median/10, median*10]: measure-only until
                                        # size parsing improves (first real Food crawl measured 0.075); the rows are flagged
    "unit_outlier_group_min": 50,
    "price_drift_max": 0.02,            # share of rows whose price moved > 50% since the published snapshot
    "item_count_min_ratio": 0.90,
    "category_count_tolerance": 0.20,
    "category_count_min_rows": 200,
    "sample_review": {"required": True, "max_junk_rate": 0.05, "hard_max_junk_rate": 0.10, "confidence": 0.95,
                      "sample_size": 600, "batch_size": 300,    # held on evidence, not a point estimate (review.decide)
                      "unavailable_grace_days": 21,             # review unavailable this long: publish on the other gates
                      "new_rows_only": True, "min_new_rows": 50},  # review what the reviewed snapshot did not have
    "audit_sample": 500,
    "audit_per_department": 30,         # extra rows per department each audit, so each department's drift is measured
    "audit_match_min": 0.95,
}
LIVE_CHUNK = 20
DETERMINISTIC = ("departments_complete", "sentinels", "live_match", "size_parse", "unit_outliers",
                 "price_drift", "item_count", "category_counts")
TRANSIENT_ERRORS = (Throttled, requests.RequestException, RuntimeError)
# candidate files that belong to one run's check; removed before a new check so nothing stale is read
CHECK_ARTIFACTS = ("gates.json", "report.md", "review-sample.jsonl", "review-verdict.json")


# ----------------------------------------------------------------------------- config

def gates_config() -> dict:
    """data/gates.json merged over DEFAULTS. Explicit nulls are kept (measure-only)."""
    cfg = {k: (dict(v) if isinstance(v, dict) else v) for k, v in DEFAULTS.items()}
    loaded = store.read_json(GATES, {}) or {}
    for k, v in loaded.items():
        if k == "note":
            continue
        if isinstance(v, dict) and isinstance(cfg.get(k), dict):
            cfg[k].update(v)
        else:
            cfg[k] = v
    return cfg


def config_hash() -> str:
    """sha256 over the bytes of data/gates.json, data/sentinels.json and data/categories.json (in that
    order; a missing file hashes as empty). Stored in gates.json; a changed hash means re-evaluate."""
    h = hashlib.sha256()
    for p in (GATES, SENTINELS, store.CONFIG):
        h.update(Path(p).read_bytes() if Path(p).exists() else b"")
        h.update(b"\0")
    return h.hexdigest()


def walmart_client():
    """A Walmart client when the environment has credentials, else None."""
    if os.environ.get("WM_CONSUMER_ID", "").strip() and os.environ.get("WM_PRIVATE_KEY", "").strip():
        from .wm import Walmart
        return Walmart()
    return None


def _now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _gate(passed, value, threshold, detail):
    return {"pass": passed, "value": value, "threshold": threshold, "detail": detail}


def _measured(ok, value, threshold, detail):
    """A gate with a numeric threshold: a null threshold measures only and never holds."""
    if threshold is None:
        return _gate(True, value, None, "measure-only: " + detail)
    return _gate(bool(ok), value, threshold, detail)


# ----------------------------------------------------------------------------- gates

def _text(r):
    return f"{r.get('brand') or ''} {r['name']}".lower()


def sentinel_check(rows):
    """Every sentinel must match a priced row: name+brand contain all tokens, size within 3% if given."""
    sents = json.loads(Path(SENTINELS).read_text())["sentinels"]
    results = []
    for s in sents:
        toks = [t.lower() for t in s["all"]]
        want = to_base(float(s["size"][0]), s["size"][1]) if s.get("size") else None
        hit = None
        for r in rows:
            if not isinstance(r.get("price"), (int, float)) or r["price"] <= 0 or r.get("price_withheld"):
                continue                                   # a sentinel must be found with a price the app shows
            t = _text(r)
            if all(tok in t for tok in toks):
                if want and want[0]:
                    if r.get("base_unit") != want[1] or not r.get("base_qty") or abs(r["base_qty"] - want[0]) / want[0] > 0.03:
                        continue
                hit = r
                break
        results.append({"q": s["q"], "ok": hit is not None,
                        "match": f"{hit['name']} ${hit['price']}" if hit else None})
    return results


def gate_departments(state, stats, cfg_depts, sizing, tol):
    """Every department of the run finished and kept rows; pages within ±tol of sizing when sizing exists.
    Departments no longer in data/categories.json are ignored (process.build ignores them too)."""
    problems, checked = [], 0
    kept_by = stats.get("kept_by_department") or {}
    for d in state.get("departments") or []:
        dept = cfg_depts.get(d["id"])
        if not dept:
            continue
        checked += 1
        name = dept["name"]
        if d.get("status") != "done":
            problems.append(f"{name}: status {d.get('status')}")
        elif (kept_by.get(name) or 0) <= 0:
            problems.append(f"{name}: 0 items kept")
        tp = ((sizing or {}).get(d["id"]) or {}).get("total_pages")
        pages = d.get("pages")
        if tol is not None and isinstance(tp, (int, float)) and tp > 0 and isinstance(pages, (int, float)):
            dev = (pages - tp) / tp
            if abs(dev) > tol:
                problems.append(f"{name}: {pages} pages vs {tp} sized ({dev:+.0%})")
    detail = f"{checked} departments checked" + (f"; sizing {'used' if sizing else 'absent'}")
    if problems:
        detail += ": " + "; ".join(problems[:20])
    return _gate(not problems, len(problems), tol, detail)


def gate_sentinels(rows, max_misses):
    sres = sentinel_check(rows)
    misses = [s["q"] for s in sres if not s["ok"]]
    detail = f"{len(sres) - len(misses)}/{len(sres)} found and priced"
    if misses:
        detail += "; missing: " + ", ".join(misses[:20]) + (" ..." if len(misses) > 20 else "")
    return _measured(len(misses) <= (max_misses or 0), len(misses), max_misses, detail), misses


def live_sample_rows(rows, n, seed, include_carried=False):
    """The rows a live check may compare: primary listing for its UPC, in stock, not a promo price.
    The acceptance gate leaves out carried-over rows (not crawled in this run, so a price difference
    says nothing about the crawl); the weekly audit passes include_carried=True because stale
    carried-over prices are exactly what it looks for. Deterministic for a given seed."""
    pool = [r for r in rows if r.get("primary") and r.get("upc")
            and (r.get("store_stock") if "store_price" in (r.get("flags") or []) else r.get("stock")) == "Available"
            and "promo_price" not in (r.get("flags") or []) and not r.get("price_withheld")
            and "placeholder" not in (r.get("flags") or [])
            and (include_carried or "carried_over" not in (r.get("flags") or []))]
    pool.sort(key=lambda r: str(r["id"]))
    if len(pool) <= n:
        return pool
    return random.Random(str(seed)).sample(pool, n)


def _consumable_departments():
    try:
        return {d["name"] for d in store.config()["departments"] if d.get("consumable", True)}
    except (OSError, ValueError, KeyError, TypeError):
        return set()


def live_check(wm, sample, tolerance=0.05):
    """Compare snapshot prices with Walmart right now, LIVE_CHUNK ids per call. Stops at the first
    transport/throttle error and reports what it managed to check (error recorded, never raised).
    Rates are over the rows Walmart still lists: a listing that is gone is not a wrong price (donors give old
    stock, and the app keeps pricing it); it is counted in `missing` and reported on its own. `close` counts live
    prices within `tolerance` of the snapshot (exact included); `by_tier` splits consumable from durable rows."""
    by_id = {str(r["id"]): r for r in sample}
    # a row showing the store's price is compared with the store's price now, every other row with Walmart.com's
    from . import storeprice
    sid = (storeprice.config() or {}).get("store_id")
    chunks = []
    for store_rows in (False, True):
        ids = [i for i, r in by_id.items() if ("store_price" in (r.get("flags") or [])) == store_rows]
        chunks += [(ids[i:i + LIVE_CHUNK], sid if store_rows else None) for i in range(0, len(ids), LIVE_CHUNK)]
    res = {"sample": len(by_id), "checked": 0, "exact": 0, "within_5pct": 0, "close": 0, "missing": 0, "calls": 0,
           "tolerance": tolerance, "by_tier": {"consumable": {"found": 0, "exact": 0, "close": 0, "missing": 0},
                                              "durable": {"found": 0, "exact": 0, "close": 0, "missing": 0}},
           "examples": [], "error": None, "by_row": {}}
    consumable = _consumable_departments()
    for chunk, store_id in chunks:
        try:
            items = wm.get_items(chunk, store_id=store_id) if store_id else wm.get_items(chunk)
        except TRANSIENT_ERRORS as e:
            res["error"] = f"{type(e).__name__}: {str(e)[:200]}"
            break
        res["calls"] += 1
        live = {str(it.get("itemId")): it for it in items if isinstance(it, dict)}
        for iid in chunk:
            r, it = by_id[iid], live.get(iid)
            res["checked"] += 1
            tier = res["by_tier"]["consumable" if r.get("dept") in consumable else "durable"]
            if it is None or not isinstance(it.get("salePrice"), (int, float)):
                res["missing"] += 1; tier["missing"] += 1; res["by_row"][iid] = "missing"
                res["examples"].append({"id": r["id"], "name": r["name"], "snapshot": r["price"], "live": None})
                continue
            tier["found"] += 1
            # a pack_listing row is one unit of a bundle listing: Walmart's price for the listing is for all of them
            n = r.get("listing_pack") if "pack_listing" in (r.get("flags") or ()) else None
            live_price = float(it["salePrice"]) / (n if isinstance(n, int) and n > 1 else 1)
            diff = abs(float(r["price"]) - live_price)
            rel = diff / float(r["price"]) if r["price"] else 9e9
            if diff < 0.005:
                res["exact"] += 1; res["within_5pct"] += 1; res["close"] += 1
                tier["exact"] += 1; tier["close"] += 1; res["by_row"][iid] = "exact"
            else:
                if rel <= 0.05:
                    res["within_5pct"] += 1
                if rel <= tolerance:
                    res["close"] += 1; tier["close"] += 1; res["by_row"][iid] = "close"
                else:
                    res["by_row"][iid] = "far"
                res["examples"].append({"id": r["id"], "name": r["name"], "snapshot": r["price"], "live": round(live_price, 2)})
    n = res["checked"]
    found = n - res["missing"]
    res["found"] = found
    res["match_rate"] = round(res["exact"] / found, 4) if found else None
    res["within_5pct_rate"] = round(res["within_5pct"] / found, 4) if found else None
    res["close_rate"] = round(res["close"] / found, 4) if found else None
    res["missing_rate"] = round(res["missing"] / n, 4) if n else None
    for t in res["by_tier"].values():
        t["close_rate"] = round(t["close"] / t["found"], 4) if t["found"] else None
    res["examples"].sort(key=lambda e: -(abs(e["snapshot"] - e["live"]) / e["snapshot"] if e["live"] is not None and e["snapshot"] else 9e9))
    res["examples"] = res["examples"][:25]
    return res


def gate_live(rows, wm, cfg, seed):
    """Returns (gate, live_result, transient)."""
    n, min_rate = int(cfg.get("live_sample") or 0), cfg.get("live_match_min")
    if n <= 0:
        return _measured(False, None, min_rate, "not run: live_sample is 0"), None, False
    sample = live_sample_rows(rows, n, seed)
    if not sample:
        return _measured(False, None, min_rate, "no eligible rows (primary, UPC, in stock, no promo, crawled this run)"), None, False
    if wm is None:
        wm = walmart_client()
    if wm is None:
        return _measured(False, None, min_rate, "not run: no Walmart credentials in the environment (WM_CONSUMER_ID / WM_PRIVATE_KEY)"), None, False
    tol = cfg.get("live_match_tolerance")
    tol = float(tol) if isinstance(tol, (int, float)) and not isinstance(tol, bool) and tol >= 0 else 0.05
    res = live_check(wm, sample, tolerance=tol)
    if res["checked"] < max(1, len(sample) / 2):
        detail = f"live check unavailable after {res['checked']}/{len(sample)} rows: {res['error']}"
        return _measured(False, None, min_rate, detail), res, True
    found, tiers = res["found"], res["by_tier"]
    pct = lambda v: f"{v:.1%}" if isinstance(v, (int, float)) else "-"
    detail = (f"{res['close']}/{found} within {tol:.0%} ({pct(res['close_rate'])}; exact {res['exact']}, {pct(res['match_rate'])}) "
              f"of the rows Walmart still lists; no longer listed: {res['missing']} of {res['checked']} "
              f"({pct(res['missing_rate'])}, not counted as wrong); consumable {pct(tiers['consumable']['close_rate'])} "
              f"of {tiers['consumable']['found']}, durable {pct(tiers['durable']['close_rate'])} of {tiers['durable']['found']}; "
              f"{res['calls']} calls")
    if res["error"]:
        detail += f"; stopped early: {res['error']}"
    ok = min_rate is None or (res["close_rate"] is not None and res["close_rate"] >= min_rate)
    missing_max = cfg.get("live_missing_max")
    if ok and missing_max is not None and res["missing_rate"] is not None and res["missing_rate"] > missing_max:
        ok = False
        detail += f"; HOLD: no longer listed above live_missing_max {missing_max:.1%}"
    return _measured(ok, res["close_rate"], min_rate, detail), res, False


def gate_size_parse(rows, min_rate):
    # placeholder listings (barcode only, no product name to parse) are not part of the rate (docs/DECISIONS.md, 2026-10-08)
    food = [r for r in rows if r.get("dept") == "Food" and "placeholder" not in (r.get("flags") or [])]
    if not food:
        return _gate(True, None, min_rate, "no Food rows to measure")
    parsed = by_weight = each = 0
    for r in food:
        if isinstance(r.get("base_qty"), (int, float)) and r["base_qty"] > 0:
            parsed += 1
        elif r.get("basis") == "lb":
            by_weight += 1                      # priced per pound: the basis is the size
        elif "sold_each" in (r.get("flags") or []):
            each += 1                           # priced per piece (produce each, store cakes, gifts): the basis is the size
    sized = parsed + by_weight + each
    rate = round(sized / len(food), 4)
    return _measured(rate >= (min_rate or 0), rate, min_rate,
                     f"{sized}/{len(food)} Food rows sized ({rate:.1%}): {parsed} with a parsed size, {by_weight} sold by "
                     f"the pound, {each} sold each")


def _path_levels(r):
    """Comparison groups from most to least specific: the Walmart category path and each of its parents, then the
    snapshot category. "Herbs, spices & seasoning mixes/Spices" is compared with spices, not with 5 lb bags of flour."""
    parts = [p for p in str(r.get("path") or "").split("/") if p][2:]          # drop "Home Page/<Department>"
    if r.get("base_unit") == "ct":
        # a count is only comparable with the same kind of thing: cotton swabs at a cent each are not outliers against
        # vitamins at ten cents a tablet, so counts compare within their aisle and its sub-aisles, never a whole category
        return ["p:" + "/".join(parts[:i]) for i in range(len(parts), 1, -1)]
    levels = ["p:" + "/".join(parts[:i]) for i in range(len(parts), 0, -1)]
    return levels + ["c:" + str(r.get("cat"))]


def unit_price_medians(rows, group_min=50, include=None):
    """Median unit price per (comparison group, base unit) for groups with at least group_min unit-priced rows.
    Returns lookup(row) -> (median, group label) using the most specific qualifying group, or (None, None).
    include(row) limits which rows build the medians (e.g. only rows with an unambiguous pack)."""
    groups = defaultdict(list)
    for r in rows:
        up = r.get("unit_price")
        if isinstance(up, (int, float)) and up > 0 and r.get("base_unit") and (include is None or include(r)):
            for lvl in _path_levels(r):
                groups[(lvl, r["base_unit"])].append(up)
    med = {k: statistics.median(v) for k, v in groups.items() if len(v) >= group_min}

    def lookup(r):
        for lvl in _path_levels(r):
            m = med.get((lvl, r.get("base_unit")))
            if m and m > 0:
                return m, lvl
        return None, None
    return lookup


def unit_outlier_stats(rows, group_min=50):
    """Unit-priced rows whose unit_price falls outside [median/10, median*10] of comparable items: the most specific
    Walmart category path (or parent, or snapshot category) with at least group_min unit-priced rows in the same base
    unit. Returns (share of all unit-priced rows, total unit-priced rows, examples)."""
    rows = [r for r in rows if isinstance(r.get("unit_price"), (int, float)) and r["unit_price"] > 0 and r.get("base_unit")]
    lookup = unit_price_medians(rows, group_min)
    outliers = []
    for r in rows:
        med, lvl = lookup(r)
        if med and (r["unit_price"] < med / 10 or r["unit_price"] > med * 10):
            outliers.append({"id": r["id"], "name": r.get("name"), "cat": r.get("cat"), "group": lvl, "unit": r["base_unit"],
                             "unit_price": r["unit_price"], "median": round(med, 4), "ratio": round(r["unit_price"] / med, 6)})
    # severity = how many times off the median in either direction; a ratio that rounds to 0 must not divide by zero
    outliers.sort(key=lambda o: -(o["ratio"] if o["ratio"] >= 1 else 1 / max(o["ratio"], 1e-9)))
    total = len(rows)
    share = round(len(outliers) / total, 5) if total else 0.0
    return share, total, outliers


def gate_unit_outliers(rows, cfg, stats=None):
    """Share of unit-priced rows more than 10x off their category+unit median. process.build() already nulls and
    flags those rows (unit_price_suspect) so none reaches the app; it records the share it saw in
    stats["unit_outliers_raw"], which is what this gate measures. Without that record (older candidates) the
    rows are measured directly."""
    raw = (stats or {}).get("unit_outliers_raw")
    if raw and "share" in raw:
        share, total, outliers = raw["share"], raw.get("unit_priced_rows", 0), list(raw.get("examples") or [])
        count = raw.get("count", len(outliers))
    else:
        share, total, outliers = unit_outlier_stats(rows, int(cfg.get("unit_outlier_group_min") or 50))
        count = len(outliers)
    mx = cfg.get("unit_outliers_max")
    detail = (f"{count} of {total} unit-priced rows outside [median/10, median*10] of their category+unit group "
              f"({share:.2%}); their per-unit prices are dropped and the rows flagged unit_price_suspect")
    return _measured(share <= (mx if mx is not None else 1), share, mx, detail), outliers[:25]


def gates_vs_previous(rows, stats, prev, prev_stats, cfg, rules=None):
    """price_drift, item_count, category_counts against the published snapshot (measure nothing without one).
    rules: {"consumable": cap, "durable": cap, "consumable_depts": {names}, "exclude_paths": [keywords]} from
    data/categories.json; published rows above the cap of their department, or under a path now excluded, are not in
    the candidate by rule (2026-10-19), so they are compared as absent."""
    out, drift, unstable = {}, [], []
    if not prev:
        for name in ("price_drift", "item_count", "category_counts"):
            out[name] = _gate(True, None, cfg.get({"price_drift": "price_drift_max", "item_count": "item_count_min_ratio",
                                                   "category_counts": "category_count_tolerance"}[name]),
                              "no previous snapshot")
        return out, drift, unstable
    from .normalize import PACK_LISTING_RX
    for r in rows:
        p = prev.get(r["id"])
        if not p or not isinstance(p.get("price"), (int, float)) or p["price"] <= 0:
            continue
        old = p["price"]
        n = r.get("listing_pack") if "pack_listing" in (r.get("flags") or ()) else None
        if isinstance(n, int) and n > 1 and "pack_listing" not in (p.get("flags") or ()):
            old = old / n          # the row is one unit of a bundle listing now; the published row was the whole bundle
        if abs(r["price"] - old) / old > 0.5:
            drift.append({"id": r["id"], "name": r["name"], "old": p["price"], "new": r["price"]})
    share = round(len(drift) / len(rows), 5) if rows else 0.0
    mx = cfg.get("price_drift_max")
    out["price_drift"] = _measured(share <= (mx if mx is not None else 1), share, mx,
                                   f"{len(drift)} of {len(rows)} prices moved more than 50% ({share:.2%})")
    # rows a rule removed on purpose are no regression: bundle listings ("(N pack) ...", compared plain with plain: the
    # rows the pack_listing rule removes from the published counts against the units it keeps in the candidate), and
    # published rows above the price ceiling of their department (data/categories.json max_price)
    prev_bundles, prev_over = Counter(), Counter()
    c = rules or {}
    excl = [str(k).lower() for k in (c.get("exclude_paths") or [])]
    for p in prev.values():
        # a bundle listing published before the rule (its name still wrapped) or a unit published under it (flagged)
        if PACK_LISTING_RX.match(p.get("name") or "") or "pack_listing" in (p.get("flags") or ()):
            prev_bundles[str(p.get("cat"))] += 1
            continue
        cap = c.get("consumable") if p.get("dept") in (c.get("consumable_depts") or ()) else c.get("durable")
        path = (p.get("path") or "").lower()
        if (isinstance(cap, (int, float)) and isinstance(p.get("price"), (int, float)) and p["price"] > cap) or any(k in path for k in excl):
            prev_over[str(p.get("cat"))] += 1
    new_units = Counter(str(r.get("cat")) for r in rows if "pack_listing" in (r.get("flags") or ()))
    removed = sum(prev_bundles.values()) + sum(prev_over.values())
    n_prev_all, n_all = max(1, len(prev) - removed), len(rows) - sum(new_units.values())
    ratio = round(n_all / n_prev_all, 4)
    mn = cfg.get("item_count_min_ratio")
    out["item_count"] = _measured(ratio >= (mn or 0), ratio, mn, f"{len(rows)} items vs {len(prev)} published ({ratio:.1%}"
                                  + (f", {removed} published rows left by rule: {sum(prev_bundles.values())} bundle listings, "
                                     f"{sum(prev_over.values())} above the price ceiling or under an excluded path, against {sum(new_units.values())} bundle units kept)" if removed else ")"))
    tol, min_rows = cfg.get("category_count_tolerance"), int(cfg.get("category_count_min_rows") or 0)
    worst = 0.0
    for cat, n_prev in (prev_stats.get("kept_by_category") or {}).items():
        n = (stats.get("kept_by_category") or {}).get(cat, 0)
        n_prev, n = n_prev - prev_bundles.get(str(cat), 0) - prev_over.get(str(cat), 0), n - new_units.get(str(cat), 0)
        if n_prev >= min_rows and n_prev > 0:
            dev = abs(n - n_prev) / n_prev
            worst = max(worst, dev)
            if tol is not None and dev > tol:
                unstable.append({"cat": cat, "old": n_prev, "new": n})
    detail = f"largest category change {worst:.1%} (categories with >= {min_rows} published rows)"
    if unstable:
        _explain_unstable(unstable, rows, prev)
        detail += "; over tolerance: " + ", ".join(f"cat {u['cat']} {u['old']}->{u['new']}" for u in unstable[:15])
    out["category_counts"] = _measured(not unstable, round(worst, 4), tol, detail)
    return out, drift, unstable


def _explain_unstable(unstable, rows, prev):
    """Why a category's count moved (2026-10-21: a hold whose cause took a day to find): for each over-tolerance category,
    the published rows re-classified into or out of it (`moved`, "from->to": n, with the commonest Walmart path segments
    under `paths`), the rows new to the candidate (`added`) and the published rows the candidate no longer has (`gone`).
    A rule change moves rows; a crawl that lost a department loses them."""
    cats = {str(u["cat"]) for u in unstable}
    prev_cat = {pid: str(p.get("cat")) for pid, p in prev.items()}
    moved, paths, new, seen = Counter(), defaultdict(Counter), Counter(), set()
    for r in rows:
        c, pc = str(r.get("cat")), prev_cat.get(r["id"])
        seen.add(r["id"])
        if pc is None:
            if c in cats:
                new[c] += 1
        elif pc != c and (c in cats or pc in cats):
            moved[(pc, c)] += 1
            paths[(pc, c)]["/".join((r.get("path") or "").split("/")[2:4])] += 1
    gone = Counter(prev_cat[pid] for pid in prev if pid not in seen and prev_cat[pid] in cats)
    for u in unstable:
        c = str(u["cat"])
        u["moved"] = {f"{a}->{b}": n for (a, b), n in sorted(moved.items(), key=lambda kv: -kv[1]) if c in (a, b)}
        u["paths"] = {f"{a}->{b}": [f"{seg} {n}" for seg, n in paths[(a, b)].most_common(3)] for (a, b) in moved if c in (a, b)}
        u["added"], u["gone"] = new[c], gone[c]          # rows new to the candidate / published rows it no longer has


def gate_review_pending(sr):
    if not sr or not sr.get("required", True):
        return _gate(True, None, (sr or {}).get("max_junk_rate"), "not required (sample_review.required is false)")
    return _gate(None, None, sr.get("max_junk_rate"), "pending: `python -m crawler.review run`, then `qa finalize`")


def reviewed_snapshot(manifest):
    """The published snapshot's version when its rows were judged by a passed sample review (or none was required),
    else None: a snapshot approved by hand over a failed review, or published under the review grace, was not."""
    if not isinstance(manifest, dict) or not manifest.get("version"):
        return None
    gates = manifest.get("gates") if isinstance(manifest.get("gates"), dict) else {}
    sr = gates.get("sample_review") if isinstance(gates.get("sample_review"), dict) else {}
    if gates.get("review_grace") or sr.get("pass") is not True:
        return None
    return manifest["version"]


def review_pool(rows, prev, prev_manifest, sr):
    """What the sample review judges: every reviewable row, or (sample_review.new_rows_only) only the rows the last
    reviewed snapshot did not have, since a refresh changes prices, not the rows a reviewer already judged. Returns
    (rows to sample from, info dict); info["skip"] says why no review is needed (fewer than min_new_rows new rows)."""
    sr = sr or {}
    eligible = review.reviewable(rows)
    info = {"eligible": len(eligible), "new_rows_only": bool(sr.get("new_rows_only", DEFAULTS["sample_review"]["new_rows_only"]))}
    since = reviewed_snapshot(prev_manifest) if prev else None
    if not info["new_rows_only"] or not since:
        info["since"] = None
        info["reason"] = "the published snapshot was not judged by a passed review" if prev and info["new_rows_only"] else None
        return eligible, info
    new = [r for r in eligible if r.get("id") not in prev]
    min_new = sr.get("min_new_rows", DEFAULTS["sample_review"]["min_new_rows"])
    min_new = int(min_new) if isinstance(min_new, (int, float)) and not isinstance(min_new, bool) and min_new >= 0 else 0
    info.update(since=since, new=len(new), min_new_rows=min_new)
    if len(new) < min_new:
        info["skip"] = (f"only {len(new)} reviewable rows are new since the reviewed snapshot {since} "
                        f"(fewer than min_new_rows {min_new}): nothing new to judge")
    return new, info


REVIEW_FIXES = {
    "auth": "the Anthropic API rejected ANTHROPIC_API_KEY as invalid or revoked (HTTP 401) -> replace the repository secret",
    "permission": "the Anthropic API refused ANTHROPIC_API_KEY permission (HTTP 403) -> check the key's workspace and model access",
    "credits": "the Anthropic account is out of credits -> add credits in the Anthropic Console (auto-reload is off)",
    "model": "the review model is not available on this key (HTTP 404) and no replacement was found -> set the "
             "SFB_REVIEW_MODEL repository variable to a current model id",
}
OUTAGE = store.ROOT / "state" / "review-outage.json"   # since when the review has been unavailable (key, credits, model, API)


def review_outage(unavailable, kind=None, reason=None, now=None):
    """Keep state/review-outage.json: the first time the review could not run (a missing or rejected key,
    no credits, a retired model, an API outage) and the latest attempt. Cleared as soon as a review gives a verdict.
    Returns the outage record, or None when the review is available."""
    now = now or _now()
    if not unavailable:
        if OUTAGE.exists():
            OUTAGE.unlink()
        return None
    rec = store.read_json(OUTAGE) or {}
    if not rec.get("since"):
        rec = {"since": now}
    rec.update(last=now, kind=kind, reason=(reason or "")[:300])
    store.write_json(OUTAGE, rec)
    return rec


def grace_gate(gate, outage, sr, now=None):
    """The sample_review gate when the review has been unavailable for longer than sample_review.unavailable_grace_days:
    the snapshot is then judged on the deterministic gates alone, so volunteers' prices never go stale because a key,
    credits or a model id needs a person (docs/DECISIONS.md 2026-10-14). null disables it. Returns the gate and the
    grace record (None when the grace has not run out)."""
    days = (sr or {}).get("unavailable_grace_days", DEFAULTS["sample_review"]["unavailable_grace_days"])
    if not outage or not isinstance(days, (int, float)) or isinstance(days, bool):
        return gate, None
    try:
        since = datetime.fromisoformat(str(outage["since"]).replace("Z", "+00:00"))
    except (KeyError, ValueError, TypeError):
        return gate, None
    if since.tzinfo is None:
        since = since.replace(tzinfo=timezone.utc)
    then = datetime.fromisoformat((now or _now()).replace("Z", "+00:00"))
    age = (then - since).total_seconds() / 86400
    if age < days:
        return gate, None
    rec = {"since": outage["since"], "days": round(age, 1), "grace_days": days, "kind": outage.get("kind")}
    detail = (f"review unavailable since {outage['since'][:10]} ({age:.0f} days, grace {days:g}): judged on the "
              f"deterministic gates alone; last attempt: {gate.get('detail')}")
    return _gate(True, None, gate.get("threshold"), detail), rec


def evaluate_review(verdict, run_id, sr):
    """The sample_review gate from build/candidate/review-verdict.json. Returns (gate, transient)."""
    required = bool(sr.get("required", True)) if sr else False
    max_junk = (sr or {}).get("max_junk_rate")
    status = (verdict or {}).get("status")
    if verdict and verdict.get("run_id") not in (None, run_id):
        verdict, status = None, None
    if not verdict:
        if required:
            return _gate(False, None, max_junk, "no review verdict for this run (run `python -m crawler.review run`)"), False
        return _gate(True, None, max_junk, "not required; no verdict for this run"), False
    reason = str(verdict.get("reason") or "")[:300]
    if status == "skipped":
        if required:
            return _gate(False, None, max_junk, f"review skipped: {reason or 'ANTHROPIC_API_KEY missing'} "
                                                "-> add the ANTHROPIC_API_KEY repository secret (or set sample_review.required false)"), True
        return _gate(True, None, max_junk, f"not required; review skipped: {reason}"), False
    if status in ("pass", "fail"):
        # the decision is recomputed here from the counts (review.decide), so an edited threshold applies at the
        # next finalize without a new review; an old verdict without counts falls back to its stated rate
        systematic = bool(verdict.get("systematic_junk"))
        ex = verdict.get("junk_examples") or []
        n = verdict.get("sample_rows")
        n = int(n) if isinstance(n, int) and not isinstance(n, bool) and n > 0 else 0
        stated = verdict.get("model_junk_rate", verdict.get("junk_rate"))
        stated = float(stated) if isinstance(stated, (int, float)) and not isinstance(stated, bool) else None
        k = verdict.get("junk_count")
        if not (isinstance(k, int) and not isinstance(k, bool)):
            k = review.junk_count(len(ex), stated, n) if n else (stated or 0.0)
        d = review.decide(k, n, systematic, sr)
        batches = verdict.get("batches") or []
        detail = (f"junk {k}/{n} ({d['rate']:.1%}), {d['confidence']:.0%} lower bound {d['lower_bound']:.1%}" if n
                  else f"junk rate {d['rate']:.1%} (stated; no row count)")
        detail += f" vs {d['max_junk_rate']:.1%} target" if d["max_junk_rate"] is not None else " (no target)"
        if d["hard_max_junk_rate"] is not None:
            detail += f", hard cap {d['hard_max_junk_rate']:.0%}"
        detail += f", systematic junk: {'yes' if systematic else 'no'}, {len(ex)} examples"
        if batches:
            detail += f", {len(batches)} batches"
        detail += f", model {verdict.get('model')}: {d['why']}"
        notes = str(verdict.get("notes") or "").strip()
        if notes:
            detail += f"; notes: {notes[:400]}"
        return _gate(d["ok"], d["rate"], max_junk, detail), False
    # "error" or anything unknown: no usable verdict. Retried every TRANSIENT_RETRY_HOURS, so once the key or the
    # credits are fixed the next retry clears the hold by itself.
    if required:
        fix = REVIEW_FIXES.get(verdict.get("error_kind"))
        if fix:
            return _gate(False, None, max_junk, f"review failed: {fix} ({reason})"), True
        return _gate(False, None, max_junk, f"review {status or 'unknown'}: {reason} (transient; re-run review and finalize)"), True
    return _gate(True, None, max_junk, f"not required; review {status or 'unknown'}: {reason}"), False


# ----------------------------------------------------------------------------- check / finalize / publish

def check(wm=None):
    state = store.read_json(STATE)
    if not state:
        raise SystemExit("no run state (state/run.json)")
    stats = store.read_json(CAND / "stats.json")
    if not stats or not store.jsonl_exists(CAND / "items.jsonl.gz"):
        raise SystemExit("no candidate: run `python -m crawler.process` first")
    for f in CHECK_ARTIFACTS:
        p = CAND / f
        if p.exists():
            p.unlink()
    cfg = gates_config()
    run_id = state["run_id"]
    config = store.config()
    cfg_depts = {d["id"]: d for d in config["departments"]}
    rows = list(store.iter_jsonl_gz(CAND / "items.jsonl.gz"))
    prev = {r["id"]: r for r in store.iter_jsonl_gz(PUB / "items.jsonl.gz")} if store.jsonl_exists(PUB / "items.jsonl.gz") else {}
    prev_stats = store.read_json(PUB / "stats.json") or {}
    sizing = store.read_json(SIZING)

    gates, extras, transient = {}, {}, False
    gates["departments_complete"] = gate_departments(state, stats, cfg_depts, sizing, cfg.get("dept_size_tolerance"))
    gates["sentinels"], extras["sentinel_misses"] = gate_sentinels(rows, cfg.get("sentinel_misses_max"))
    gates["live_match"], live, t = gate_live(rows, wm, cfg, run_id)
    transient |= t
    extras["live"] = live
    gates["size_parse"] = gate_size_parse(rows, cfg.get("size_parse_min"))
    gates["unit_outliers"], extras["unit_outliers"] = gate_unit_outliers(rows, cfg, stats)
    rules = {"consumable": (config.get("consumable_rules") or {}).get("max_price"), "durable": (config.get("durable_rules") or {}).get("max_price"),
             "consumable_depts": {d["name"] for d in config["departments"] if d.get("consumable")}, "exclude_paths": config.get("exclude_path_keywords") or []}
    vs, extras["drift"], extras["unstable"] = gates_vs_previous(rows, stats, prev, prev_stats, cfg, rules)
    gates.update(vs)
    extras["drift"] = extras["drift"][:50]
    sr = cfg.get("sample_review")
    gates["sample_review"] = gate_review_pending(sr)
    pool, extras["review_pool"] = review_pool(rows, prev, store.read_json(PUB / "manifest.json") or {}, sr)
    if gates["sample_review"]["pass"] is None and extras["review_pool"].get("skip"):
        gates["sample_review"] = _gate(True, None, (sr or {}).get("max_junk_rate"), extras["review_pool"]["skip"])

    passed = all(gates[n]["pass"] for n in DETERMINISTIC)
    if not passed:
        status = "hold"
    elif gates["sample_review"]["pass"] is None:
        status = "review"
    else:
        status = "ready"
    # only a hold caused solely by an unavailable live check is transient (a retry may clear it)
    transient = transient and status == "hold" and all(gates[n]["pass"] for n in DETERMINISTIC if n != "live_match")

    review.write_sample(pool, run_id, n=int((sr or {}).get("sample_size") or 300))
    g = {"run_id": run_id, "gates": gates, "passed_deterministic": passed, "status": status,
         "config_hash": config_hash(), "checked": _now(), "transient": transient, "thresholds": cfg, "extras": extras}
    store.write_json(CAND / "gates.json", g)
    report = _report(state, stats, g)
    (CAND / "report.md").write_text(report)
    state["status"] = "needs_review" if status == "hold" else "built"
    store.write_json(STATE, state)
    print(report)
    return status


def finalize():
    g = store.read_json(CAND / "gates.json")
    if not g:
        raise SystemExit("run `check` first")
    sr = (g.get("thresholds") or gates_config()).get("sample_review")
    verdict = store.read_json(CAND / "review-verdict.json")
    gate, transient = evaluate_review(verdict, g["run_id"], sr)
    # the review could not run (not: it ran and held): remember since when, and after the grace judge without it
    unavailable = transient and isinstance(verdict, dict) and verdict.get("status") in ("error", "skipped")
    outage = review_outage(unavailable, (verdict or {}).get("error_kind") or (verdict or {}).get("status"),
                           (verdict or {}).get("reason"))
    g.pop("review_grace", None)
    if unavailable and g.get("passed_deterministic"):
        gate, grace = grace_gate(gate, outage, sr)
        if grace:
            g["review_grace"] = grace
            transient = False
    g["gates"]["sample_review"] = gate
    status = "ready" if g.get("passed_deterministic") and gate["pass"] else "hold"
    g["status"], g["finalized"] = status, _now()
    # a hold is transient when a retry may clear it: the review errored while every deterministic gate
    # passed, or the check itself was already held only by an unavailable live check
    review_only_blocker = transient and bool(g.get("passed_deterministic"))
    g["transient"] = status == "hold" and (review_only_blocker or bool(g.get("transient")))
    store.write_json(CAND / "gates.json", g)
    state = store.read_json(STATE) or {"run_id": g["run_id"]}
    stats = store.read_json(CAND / "stats.json") or {}
    report = _report(state, stats, g)
    (CAND / "report.md").write_text(report)
    state["status"] = "needs_review" if status == "hold" else "built"
    store.write_json(STATE, state)
    print(report)
    return status


def publish(approve=False):
    g = store.read_json(CAND / "gates.json")
    if not g:
        raise SystemExit("run `check` first")
    if g["status"] != "ready" and not approve:
        what = "sample review pending: run `python -m crawler.review run` then `qa finalize`" if g["status"] == "review" \
            else "gates hold; previous snapshot stays live. Review build/candidate/report.md (or `publish --approve`)"
        print(what)
        return False
    stats = store.read_json(CAND / "stats.json")
    if not stats or not store.jsonl_exists(CAND / "items.jsonl.gz"):
        raise SystemExit("no candidate snapshot to publish")
    run_id = stats["run_id"]
    if g.get("run_id") not in (None, run_id):
        raise SystemExit(f"gates.json is for run {g.get('run_id')} but the candidate is {run_id}: run `check` first")
    prev_manifest = store.read_json(PUB / "manifest.json") or {}
    prev_path = PUB / "items.jsonl.gz"
    today = _now()[:10]
    hist = history.record(store.iter_jsonl_gz(prev_path) if store.jsonl_exists(prev_path) else None,
                          store.iter_jsonl_gz(CAND / "items.jsonl.gz"), run_id, today,
                          prev_run_id=prev_manifest.get("version"))
    if PUB.exists():
        shutil.rmtree(PUB)
    shutil.copytree(CAND, PUB)
    failed = [n for n, x in g["gates"].items() if x.get("pass") is False]
    now = _now()
    # departments: when each one was last crawled (this run's finished departments, the rest carried over from the
    # previous manifest); ci.decide() refreshes a department once that date is older than its cadence interval
    st = store.read_json(STATE) or {}
    crawled = {}
    if st.get("run_id") in (None, run_id):
        for d in st.get("departments") or []:
            if d.get("status") == "done" and d.get("name"):
                crawled[d["name"]] = {"crawled": d.get("done_at") or st.get("crawled") or now, "run_id": run_id}
    departments = {**{k: v for k, v in (prev_manifest.get("departments") or {}).items() if isinstance(v, dict)}, **crawled}
    try:
        every = {d["name"] for d in store.config().get("departments") or []}
    except (OSError, ValueError, KeyError, TypeError):
        every = set()
    # full_published: when every department was last refreshed (a partial publish carries the rest over from the
    # previous snapshot), so the legacy monthly full crawl keys off it; a run that covered every department counts
    full_published = now if str(run_id).endswith("-full") or (every and every <= set(crawled)) else (
        prev_manifest.get("full_published") or prev_manifest.get("published"))
    manifest = {"version": run_id, "published": now, "full_published": full_published, "departments": departments,
                "items": stats["items"], "upcs": stats["upcs"],
                "gates_passed": g["status"] == "ready", "approved_manually": bool(approve), "file": "items.jsonl.gz",
                "gates": {"status": g["status"], "passed_deterministic": g.get("passed_deterministic"), "failed": failed,
                          "review_grace": g.get("review_grace"),
                          "config_hash": g.get("config_hash"), "checked": g.get("checked"),
                          "sample_review": g["gates"].get("sample_review")},
                "history": hist}
    store.write_json(PUB / "manifest.json", manifest)
    state = store.read_json(STATE) or {}
    if state.get("run_id") in (None, run_id):
        state["status"] = "published"
        store.write_json(STATE, state)
    else:
        # the state belongs to a newer run (a crawl in progress or finished and not yet built): leave it
        # untouched so that run keeps resuming; the published snapshot is this candidate's
        print(f"state belongs to run {state.get('run_id')} ({state.get('status')}); left untouched")
    print(f"published {manifest['version']}: {manifest['items']} items; history {hist['kind']} {hist['file']} ({hist['rows']} rows)")
    return True


# ----------------------------------------------------------------------------- report

def _fmt(v):
    if v is None:
        return "-"
    if isinstance(v, float):
        return f"{v:.4g}"
    return str(v)


def _report(state, stats, g):
    status = g["status"]
    headline = {"ready": "all gates passed", "review": "deterministic gates passed; sample review pending",
                "hold": "HOLD - previous snapshot stays live"}.get(status, status)
    L = [f"# Snapshot report — {state.get('run_id', g.get('run_id'))}", "", f"Status: **{status}** ({headline})",
         f"Checked: {g.get('checked')}  |  config hash: {str(g.get('config_hash'))[:12]}" + ("  |  transient hold (retry may clear it)" if g.get("transient") else ""),
         "", "## Gates"]
    for name, x in g["gates"].items():
        mark = {True: "PASS", False: "FAIL", None: "PENDING"}[x.get("pass")]
        L.append(f"- {mark} {name} — value {_fmt(x.get('value'))}, threshold {_fmt(x.get('threshold'))}: {x.get('detail')}")
    if stats:
        L += ["", "## Totals",
              f"- items kept: {stats.get('items')}  |  UPCs: {stats.get('upcs')}  |  carried over: {stats.get('carried_over')}",
              f"- UPCs with conflicting prices (>1.5x): {stats.get('upc_price_conflicts')}", "", "## Kept by department"]
        for k, v in sorted((stats.get("kept_by_department") or {}).items(), key=lambda x: -x[1]):
            raw = (stats.get("raw_by_department") or {}).get(k)
            L.append(f"- {k}: {v} kept of {raw if raw is not None else 'carried'} raw")
        L += ["", "## Rejects by reason"]
        tot = Counter()
        for d in (stats.get("rejects_by_department") or {}).values():
            tot.update(d)
        L += [f"- {k}: {v}" for k, v in tot.most_common()]
        L += ["", "## Flags"] + [f"- {k}: {v}" for k, v in sorted((stats.get("flags") or {}).items(), key=lambda x: -x[1])]
        bounds = stats.get("price_bounds") or {}
        if bounds:
            L += ["", "## Plausible price range by department (outside it the price is withheld)", "",
                  "| department | low | high | 99th percentile |", "|---|---|---|---|"]
            L += [f"| {d} | ${b['low']:.2f} | ${b['high']:,.2f} | ${b['p99']:,.2f} |" for d, b in sorted(bounds.items())]
        withheld = stats.get("price_withheld")
        if withheld is not None:
            L += ["", f"## Withheld prices ({len(withheld)}): valued at an equivalent instead", "",
                  "| department | item | Walmart price | why | valued at | how |", "|---|---|---|---|---|---|"]
            L += [f"| {w['dept']} | {w['id']} {str(w['name'])[:70]} | ${w['raw_price']:,.2f} | {w.get('why', '')} | ${w['value']:,.2f} | "
                  f"{w['method']}{(': ' + str(w['basis'])[:50]) if w.get('basis') else ''} |" for w in withheld]
        ph = stats.get("placeholders")
        if ph:
            L += ["", f"## Placeholder listings ({ph['count']}): barcode lookup only, not in typed search",
                  "Names that identify no product (\"Merchandise\", a brand alone, \"Discontinued\", \"coming soon\", a supplier "
                  "code); kept so a scan of the barcode still prices the item, named from another listing with the same UPC or "
                  "Open Facts when possible. Test listings and store displays are not carried (rejects above). "
                  f"Names filled: {ph.get('names_filled') or {}}. First examples:"]
            L += [f"- {e['id']} UPC {e['upc']} {e['dept']}: {e.get('listed_name') or e['name']} -> {e['name']} (${e['price']})"
                  for e in ph["examples"][:15]]
        verdict = store.read_json(CAND / "review-verdict.json") or {}
        if verdict.get("miscategorized_rate") is not None:
            L += ["", f"## Category labels in the sample review: {verdict['miscategorized_rate']:.1%} judged wrong"]
            L += [f"- {e['id']}: {e['category']} -> {e['should_be']}" for e in verdict.get("miscategorized_examples", [])]
    ex = g.get("extras") or {}
    if ex.get("sentinel_misses"):
        L += ["", "## Sentinels missing"] + [f"- MISSING: {m}" for m in ex["sentinel_misses"]]
    live = ex.get("live")
    if live and live.get("examples"):
        L += ["", f"## Live price differences (worst {len(live['examples'])} of {live.get('checked')} checked)"]
        L += [f"- {e['id']} {e['name']}: snapshot {e['snapshot']} -> live {e['live'] if e['live'] is not None else 'not found'}" for e in live["examples"]]
    if ex.get("unit_outliers"):
        L += ["", "## Unit-price outliers (worst 25)"]
        L += [f"- {o['id']} {o['name']}: {o['unit_price']}/{o['unit']} vs median {o['median']} (x{o['ratio']}), cat {o['cat']}" for o in ex["unit_outliers"]]
    if ex.get("unstable"):
        L += ["", "## Category count changes over tolerance"]
        for u in ex["unstable"]:
            L.append(f"- cat {u['cat']}: {u['old']} -> {u['new']}" + (f"; re-classified: " + ", ".join(f"{k} {n}" for k, n in u["moved"].items()) if u.get("moved") else "")
                     + (f"; new rows {u['added']}" if u.get("added") else "") + (f"; published rows gone {u['gone']}" if u.get("gone") else ""))
            for k, segs in (u.get("paths") or {}).items():
                L.append(f"  - {k}: " + "; ".join(segs))
    if ex.get("drift"):
        L += ["", f"## Price changes > 50% (first {len(ex['drift'])})"] + [f"- {d['id']} {d['name']}: {d['old']} -> {d['new']}" for d in ex["drift"]]
    return "\n".join(L) + "\n"


def main(argv=None):
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("check")
    sub.add_parser("finalize")
    p = sub.add_parser("publish"); p.add_argument("--approve", action="store_true")
    a = ap.parse_args(argv)
    if a.cmd == "check":
        check()
    elif a.cmd == "finalize":
        finalize()
    else:
        publish(a.approve)


if __name__ == "__main__":
    main()
