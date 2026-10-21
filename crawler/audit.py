"""Weekly live audit of the published snapshot.

  python -m crawler.audit            # sample published rows, re-check them live, write audit/<date>.json + latest.json

due(store_root, cfg, now) -> bool    audit/latest.json missing or older than cfg["audit_every_days"] (default 7)
run(wm=None) -> dict                 {"status", "match_rate", "close_rate", "within_5pct", "outlier_share", "alert", ...}
                                     alert = close_rate (within live_match_tolerance) < data/gates.json audit_match_min;
                                     null = never alert (the setting since 2026-10-19: month-old prices are the choice)
The sample uses the same selection rule as the live_match gate (qa.live_sample_rows: primary, UPC, in stock,
no promo price) but keeps carried-over rows, since stale prices on rows not re-crawled since their department's
last crawl are what the audit is for. Each department's drift goes to the ledger (audit/drift.json). The seed
changes daily, so successive audits look at different rows. Nothing is written when the audit could not run
({"status": "skipped"|"error"}), so the next scheduled run tries again.
"""
import argparse
from datetime import datetime, timedelta, timezone
from pathlib import Path

from . import store, qa

AUDIT = store.ROOT / "audit"
PUB = store.ROOT / "build" / "published"


def _now():
    return datetime.now(timezone.utc)


def _parse(ts):
    if not isinstance(ts, str) or not ts:
        return None
    try:
        d = datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except ValueError:
        return None
    return d if d.tzinfo else d.replace(tzinfo=timezone.utc)


def due(store_root, cfg, now=None) -> bool:
    """True when no audit was recorded or the last one is older than audit_every_days. Unreadable input -> True."""
    now = now or _now()
    every = (cfg or {}).get("audit_every_days", 7)
    try:
        every = float(every)
    except (TypeError, ValueError):
        every = 7.0
    latest = store.read_json(Path(store_root) / "audit" / "latest.json")
    if not isinstance(latest, dict):
        return True
    checked = _parse(latest.get("checked"))
    if checked is None:
        return True
    return now - checked >= timedelta(days=every)


def run(wm=None, n=None) -> dict:
    manifest = store.read_json(PUB / "manifest.json")
    items = PUB / "items.jsonl.gz"
    if not manifest or not store.jsonl_exists(items):
        res = {"status": "skipped", "reason": "no published snapshot", "alert": False}
        print(res["reason"])
        return res
    cfg = qa.gates_config()
    n = int(n or cfg.get("audit_sample") or 500)
    min_rate = cfg.get("audit_match_min")
    wm = wm or qa.walmart_client()
    if wm is None:
        res = {"status": "skipped", "reason": "no Walmart credentials in the environment", "alert": False}
        print(res["reason"])
        return res
    now = _now()
    date = now.strftime("%Y-%m-%d")
    rows = list(store.iter_jsonl_gz(items))
    sample = qa.live_sample_rows(rows, n, seed=f"audit-{manifest.get('version')}-{date}", include_carried=True)
    if not sample:
        res = {"status": "skipped", "reason": "no eligible rows in the published snapshot", "alert": False}
        print(res["reason"])
        return res
    tol = cfg.get("live_match_tolerance")
    tol = float(tol) if isinstance(tol, (int, float)) and not isinstance(tol, bool) and tol >= 0 else 0.05
    live = qa.live_check(wm, sample, tolerance=tol)
    if live["checked"] < max(1, len(sample) / 2):
        res = {"status": "error", "alert": False, "checked_rows": live["checked"], "sample": len(sample),
               "reason": f"live check unavailable after {live['checked']}/{len(sample)} rows: {live['error']}"}
        print(f"audit not recorded: {res['reason']}")
        return res
    # a second, stratified sample (per_dept rows of every department, beyond those the random sample drew) so each
    # department's drift is measured on its own; the alert still judges the random sample
    per_dept = cfg.get("audit_per_department")
    per_dept = int(per_dept) if isinstance(per_dept, int) and not isinstance(per_dept, bool) and per_dept > 0 else 0
    taken = {str(r["id"]) for r in sample}
    extra = []
    for name in sorted({r.get("dept") for r in rows if r.get("dept")}):
        pool = [r for r in rows if r.get("dept") == name and str(r["id"]) not in taken]
        extra += qa.live_sample_rows(pool, per_dept, seed=f"audit-{manifest.get('version')}-{date}-{name}", include_carried=True)
    live2 = qa.live_check(wm, extra, tolerance=tol) if extra else None
    by_dept = _by_department(rows, manifest, [sample, extra], [live, live2], now)
    share, total, outliers = qa.unit_outlier_stats(rows, int(cfg.get("unit_outlier_group_min") or 50))
    res = {
        "status": "ok", "checked": now.isoformat(timespec="seconds"), "date": date, "version": manifest.get("version"),
        "published": manifest.get("published"), "sample": len(sample), "checked_rows": live["checked"],
        "calls": live["calls"], "exact": live["exact"], "missing": live["missing"],
        "match_rate": live["match_rate"], "within_5pct": live["within_5pct_rate"],
        "close_rate": live["close_rate"], "tolerance": tol, "found": live["found"], "by_tier": live["by_tier"],
        "drift_examples": live["examples"], "live_error": live["error"],
        "outlier_share": share, "outlier_rows": len(outliers), "unit_priced_rows": total, "outlier_examples": outliers[:25],
        "audit_match_min": min_rate,
        "alert": bool(min_rate is not None and live["close_rate"] is not None and live["close_rate"] < min_rate),
        "by_dept": by_dept, "stratified_rows": len(extra), "stratified_calls": live2["calls"] if live2 else 0,
    }
    res["calls"] = int(live["calls"]) + int(res["stratified_calls"])
    # the ledger and the refresh plan (crawler/cadence.py); a planning problem is recorded, never a failed audit
    try:
        from . import cadence
        sch = _schedule()
        c = cadence.config(sch)
        points = cadence.record(cadence.read_ledger(), by_dept, date, manifest.get("version"), keep=int(c["ledger_points_per_department"]))
        store.write_json(cadence.ledger_path(), {"points": points, "updated": res["checked"]})
        res["cadence"] = cadence.refresh_plan(sch, now)
    except Exception as e:  # noqa: BLE001
        res["cadence_error"] = f"{type(e).__name__}: {str(e)[:200]}"
    store.write_json(AUDIT / f"{date}.json", res)
    store.write_json(AUDIT / "latest.json", res)
    fmt = lambda v: f"{v:.1%}" if isinstance(v, (int, float)) else "-"
    print(f"audit {date} of {res['version']}: within {tol:.0%} {fmt(res['close_rate'])}, exact {fmt(res['match_rate'])} of "
          f"{res['found']} still listed, no longer listed {res['missing']}, unit outliers {share:.2%}"
          + (" -> ALERT" if res["alert"] else ""))
    return res


def _schedule():
    try:
        from . import ci
        return ci.schedule()
    except Exception:  # noqa: BLE001
        return {}


def _by_department(rows, manifest, samples, lives, now):
    """{department: {rows, found, close, missing, close_rate, age_days}} over every sampled row, with the department's
    age (days since its last crawl, from the manifest; the publish date when unknown)."""
    counts = {}
    for r in rows:
        counts[r.get("dept")] = counts.get(r.get("dept"), 0) + 1
    out = {}
    for sample, live in zip(samples, lives):
        if not live:
            continue
        for r in sample:
            o = live["by_row"].get(str(r["id"]))
            if o is None:
                continue
            d = out.setdefault(r.get("dept"), {"rows": counts.get(r.get("dept"), 0), "found": 0, "close": 0, "missing": 0})
            if o == "missing":
                d["missing"] += 1
            else:
                d["found"] += 1
                if o in ("exact", "close"):
                    d["close"] += 1
    crawled = manifest.get("departments") if isinstance(manifest.get("departments"), dict) else {}
    for name, d in out.items():
        d["close_rate"] = round(d["close"] / d["found"], 4) if d["found"] else None
        when = (crawled.get(name) or {}).get("crawled") if isinstance(crawled.get(name), dict) else None
        when = _parse(when) or _parse(manifest.get("full_published")) or _parse(manifest.get("published"))   # as ci.due_departments
        d["age_days"] = round((now - when).total_seconds() / 86400, 1) if when else None
    return out


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, default=None)
    a = ap.parse_args(argv)
    run(n=a.sample)


if __name__ == "__main__":
    main()
