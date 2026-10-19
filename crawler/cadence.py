"""Per-department refresh cadence from measured price drift (docs/DECISIONS.md 2026-10-14).

The weekly audit measures, for every department, how many of its rows Walmart still prices within the tolerance
and how old those rows are (the department's last crawl). Those points go into audit/drift.json (the ledger). From
the ledger each department gets a drift rate: the share of its prices that move beyond the tolerance per day, shrunk
towards a prior while evidence is thin. The plan then picks each department's refresh interval:

  - a department's cycle-average accuracy is 1 - rate x interval / 2 (prices drift linearly with age, which the
    ledger keeps checking); the ideal interval is the longest that keeps that average at the target;
  - a crawl costs pages x calls_per_page Walmart calls, and the refresh crawls may use crawl_share of the day's quota
    (the per-minute cap the last crawl inferred, times 1440); while the plan costs more than that, the interval that
    loses the least accuracy per call saved is stretched by a day, up to max_days;
  - the result is written to state/cadence.json; ci.decide() refreshes a department when its last crawl is older than
    its interval. `fits` is false when the quota cannot hold every department at the target: the owner then raises
    crawl_share or lowers the target (an [accuracy-budget] issue says which departments and by how much).
Everything here is pure arithmetic over the inputs; the pipeline supplies them.
"""
import math
from datetime import datetime, timezone

from . import store

DEFAULTS = {
    "fixed_days": 0,                 # > 0: every department on this one interval, the measured plan bypassed (owner, 2026-10-19)
    "target_close_rate": 0.92,       # cycle-average share of listed rows within the tolerance (audit bar 0.90 + margin)
    "min_days": 5,
    "max_days": 120,
    "default_drift_per_day": 0.023,  # prior: 8% of prices beyond 5% after 3.5 days (gate and audit, 2026-10-13)
    "prior_weight": 200.0,           # row-days of evidence the prior is worth: ~50 rows a week for a month overrule it
    "crawl_share": 0.5,              # share of the daily Walmart quota the refresh crawls may use
    "calls_per_page": 2.4,           # measured 2026-10-12: 44,558 calls for about 18,600 pages (sizing, retries, splits)
    "ledger_points_per_department": 40,
}


def ledger_path():
    return store.ROOT / "audit" / "drift.json"


def plan_path():
    return store.ROOT / "state" / "cadence.json"


def config(schedule):
    c = dict(DEFAULTS)
    raw = (schedule or {}).get("refresh") if isinstance(schedule, dict) else None
    for k in DEFAULTS:
        v = (raw or {}).get(k)
        if isinstance(v, (int, float)) and not isinstance(v, bool) and v >= 0:
            c[k] = v
    c["min_days"] = max(1, int(c["min_days"])); c["max_days"] = max(c["min_days"], int(c["max_days"]))
    c["fixed_days"] = int(c["fixed_days"]) if c["fixed_days"] > 0 else 0
    return c


# ----------------------------------------------------------------------------- the ledger

def read_ledger():
    d = store.read_json(ledger_path())
    return d.get("points") if isinstance(d, dict) and isinstance(d.get("points"), list) else []


def record(points, by_dept, date, version, keep=40):
    """Append one audit's per-department outcomes to the ledger points (newest last; keep the last `keep` per
    department). by_dept: {name: {found, close, missing, age_days}}."""
    pts = [p for p in points if isinstance(p, dict) and p.get("dept")]
    for name, d in sorted((by_dept or {}).items()):
        if not isinstance(d, dict) or not isinstance(d.get("found"), int):
            continue
        pts.append({"date": date, "version": version, "dept": name, "age_days": d.get("age_days"),
                    "found": int(d["found"]), "close": int(d.get("close") or 0), "missing": int(d.get("missing") or 0)})
    out, per = [], {}
    for p in reversed(pts):
        n = per.get(p["dept"], 0)
        if n < keep:
            out.append(p); per[p["dept"]] = n + 1
    out.reverse()
    return out


def drift_rates(points, departments, c):
    """{name: {"drift_per_day", "evidence_row_days", "misses"}}: the share of a department's listed prices that move
    beyond the tolerance per day, from every ledger point with a known age, shrunk towards the prior."""
    prior, w = float(c["default_drift_per_day"]), float(c["prior_weight"])
    miss, expo = {}, {}
    for p in points:
        age = p.get("age_days")
        if not isinstance(age, (int, float)) or isinstance(age, bool) or age <= 0 or not p.get("found"):
            continue
        d = p["dept"]
        miss[d] = miss.get(d, 0) + max(0, int(p["found"]) - int(p.get("close") or 0))
        expo[d] = expo.get(d, 0.0) + float(p["found"]) * float(age)
    out = {}
    for name in departments:
        e, m = expo.get(name, 0.0), miss.get(name, 0)
        rate = (m + prior * w) / (e + w) if (e + w) > 0 else prior
        out[name] = {"drift_per_day": round(min(max(rate, 0.0), 1.0), 5), "evidence_row_days": round(e, 1), "misses": m}
    return out


# ----------------------------------------------------------------------------- the plan

def ideal_interval(rate, c):
    """The longest interval whose cycle-average accuracy (1 - rate x t / 2) still meets the target, within bounds."""
    lo, hi = c["min_days"], c["max_days"]
    if rate <= 0:
        return hi
    t = 2.0 * (1.0 - float(c["target_close_rate"])) / rate
    return int(min(hi, max(lo, math.floor(t))))


def pages_by_department(sizing, departments_cfg):
    """{name: pages} from sizing.json: a split department is the sum of its child nodes."""
    out = {}
    sizing = sizing if isinstance(sizing, dict) else {}
    for d in departments_cfg or []:
        name, did = d.get("name"), str(d.get("id"))
        units = [str(u.get("id")) for u in d.get("split") or []]
        if units:
            pages = sum(int((sizing.get(u) or {}).get("total_pages") or 0) for u in units)
        else:
            pages = int((sizing.get(did) or {}).get("total_pages") or 0)
        out[name] = pages
    return out


def plan(departments, drift, pages, rows, per_min, c, now=None, floors=None):
    """The refresh interval per department under the call budget. departments: names in scope; drift: drift_rates();
    pages: {name: pages}; rows: {name: kept rows}; per_min: the inferred per-minute cap; floors: {name: days} the
    interval may not go under while a department's evidence is thinner than the prior (the legacy cadence: nothing
    is crawled more often than before on the strength of a guess)."""
    per_min = float(per_min) if isinstance(per_min, (int, float)) and not isinstance(per_min, bool) and per_min > 0 else 6.0
    budget = per_min * 60 * 24 * float(c["crawl_share"])
    cost = {d: float(pages.get(d) or 0) * float(c["calls_per_page"]) for d in departments}
    rate = {d: float((drift.get(d) or {}).get("drift_per_day", c["default_drift_per_day"])) for d in departments}
    weight = {d: float(rows.get(d) or 0) for d in departments}
    fixed = int(c.get("fixed_days") or 0)
    t = {d: (fixed or ideal_interval(rate[d], c)) for d in departments}
    for d in departments:
        fl = (floors or {}).get(d)
        thin = float((drift.get(d) or {}).get("evidence_row_days", 0) or 0) < float(c["prior_weight"])
        if not fixed and thin and isinstance(fl, (int, float)) and not isinstance(fl, bool):
            t[d] = int(min(c["max_days"], max(t[d], fl)))
    ideal = dict(t)
    daily = lambda: sum(cost[d] / t[d] for d in departments if t[d])
    # a fixed interval is the owner's choice: nothing is stretched and the plan always "fits" (the cost is still reported)
    while not fixed and daily() > budget:
        cands = [d for d in departments if t[d] < c["max_days"] and cost[d] > 0]
        if not cands:
            break
        # stretch the interval that loses the least accuracy (rows x drift / 2 per day) per call per day saved
        def price(d):
            saved = cost[d] / t[d] - cost[d] / (t[d] + 1)
            return (weight[d] * rate[d] / 2.0) / saved if saved > 0 else float("inf")
        t[min(cands, key=price)] += 1
    total_rows = sum(weight.values())
    expected = 1.0 - (sum(weight[d] * rate[d] * t[d] / 2.0 for d in departments) / total_rows if total_rows else 0.0)
    # the verdict rests on measured departments only: a prior-driven estimate never raises an alert
    measured = [d for d in departments if float((drift.get(d) or {}).get("evidence_row_days", 0) or 0) >= float(c["prior_weight"])]
    m_rows = sum(weight[d] for d in measured)
    expected_measured = (1.0 - sum(weight[d] * rate[d] * t[d] / 2.0 for d in measured) / m_rows) if m_rows else None
    fits = bool(fixed) or (daily() <= budget + 1e-9 and (expected_measured is None or expected_measured >= float(c["target_close_rate"]) - 1e-9))
    stamp = (now or datetime.now(timezone.utc)).isoformat(timespec="seconds")
    return {
        "computed": stamp, "target_close_rate": c["target_close_rate"], "per_min": per_min, "fixed_days": fixed or None,
        "budget_calls_per_day": round(budget, 1), "cost_calls_per_day": round(daily(), 1),
        "expected_close_rate": round(expected, 4), "fits": bool(fits),
        "expected_close_rate_measured": round(expected_measured, 4) if expected_measured is not None else None,
        "measured_departments": measured,
        "departments": {d: {"interval_days": t[d], "ideal_days": ideal[d], "drift_per_day": round(rate[d], 5),
                            "pages": int(pages.get(d) or 0), "rows": int(weight[d]), "calls_per_day": round(cost[d] / t[d], 1) if t[d] else 0.0,
                            "evidence_row_days": (drift.get(d) or {}).get("evidence_row_days", 0)} for d in departments},
    }


def refresh_plan(schedule, now=None):
    """Read the ledger, sizing, the published stats, the inferred pace and the scope, write state/cadence.json and
    return the plan (None when there is no published snapshot to plan for)."""
    cfg = store.config()
    depts_cfg = cfg.get("departments") or []
    names = [d["name"] for d in depts_cfg]
    stats = store.read_json(store.ROOT / "build" / "published" / "stats.json") or {}
    if not stats:
        return None
    c = config(schedule)
    drift = drift_rates(read_ledger(), names, c)
    pages = pages_by_department(store.read_json(store.ROOT / "sizing.json"), depts_cfg)
    rows = stats.get("kept_by_department") or {}
    pace = ((store.read_json(store.ROOT / "state" / "run.json") or {}).get("pace") or {}).get("per_min")
    sch = schedule or {}
    floors = {d["name"]: (sch.get("core_every_days", 7) if d.get("consumable") else sch.get("full_every_days", 30)) for d in depts_cfg}
    p = plan(names, drift, pages, rows, pace, c, now, floors=floors)
    store.write_json(plan_path(), p)
    return p


def interval_for(name, cadence, consumable, schedule):
    """A department's refresh interval: the plan's, else the legacy cadence (core_every_days for a consumable
    department, full_every_days for the rest)."""
    fixed = config(schedule)["fixed_days"]
    if fixed:
        return float(fixed)         # the owner's fixed interval applies at once, not after the next audit rewrites the plan
    d = ((cadence or {}).get("departments") or {}).get(name) if isinstance(cadence, dict) else None
    if isinstance(d, dict) and isinstance(d.get("interval_days"), (int, float)) and d["interval_days"] > 0:
        return float(d["interval_days"])
    return float(schedule["core_every_days"] if consumable else schedule["full_every_days"])


def markdown(p):
    if not p:
        return ""
    L = [f"Refresh plan ({p['computed'][:10]}): expected within-tolerance share {p['expected_close_rate']:.1%} against a "
         f"{p['target_close_rate']:.0%} target, {p['cost_calls_per_day']:.0f} of {p['budget_calls_per_day']:.0f} calls a day"
         + (f" (fixed {p['fixed_days']}-day interval, owner's choice)" if p.get("fixed_days") else " (fits)" if p["fits"] else " (DOES NOT FIT)"), "",
         "| department | drift/day | interval | ideal | pages | rows | calls/day | evidence (row-days) |", "|---|---|---|---|---|---|---|---|"]
    for name, d in sorted(p["departments"].items(), key=lambda kv: -kv[1]["rows"]):
        L.append(f"| {name} | {d['drift_per_day']:.2%} | {d['interval_days']} d | {d['ideal_days']} d | {d['pages']} | {d['rows']} | "
                 f"{d['calls_per_day']:.0f} | {d['evidence_row_days']:.0f} |")
    return "\n".join(L)
