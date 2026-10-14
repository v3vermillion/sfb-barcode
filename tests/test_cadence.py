"""crawler/cadence.py: drift from the ledger, the refresh plan under the quota, the intervals decide() uses."""
import unittest
from datetime import datetime, timezone

from _fixtures import StoreCase
from crawler import cadence as C

NOW = datetime(2026, 10, 14, 12, 0, tzinfo=timezone.utc)
SCHED = {"core_every_days": 7, "full_every_days": 30}


class Arithmetic(unittest.TestCase):
    def setUp(self):
        self.c = C.config({})

    def test_config_defaults_and_overrides(self):
        self.assertEqual(self.c["target_close_rate"], 0.92); self.assertEqual(self.c["min_days"], 5); self.assertEqual(self.c["max_days"], 120)
        c = C.config({"refresh": {"target_close_rate": 0.9, "min_days": "x", "max_days": 3, "crawl_share": -1}})
        self.assertEqual((c["target_close_rate"], c["min_days"], c["max_days"], c["crawl_share"]), (0.9, 5, 5, 0.5))

    def test_ledger_keeps_the_last_points_per_department(self):
        pts = []
        for week in range(5):
            pts = C.record(pts, {"Food": {"found": 10, "close": 9, "missing": 0, "age_days": 7}}, f"2026-11-0{week + 1}", "v", keep=3)
        self.assertEqual([p["date"] for p in pts], ["2026-11-03", "2026-11-04", "2026-11-05"])
        pts = C.record(pts, {"Home": {"found": 5, "close": 5, "missing": 1, "age_days": 20}, "Bad": {"found": "x"}}, "2026-11-06", "v", keep=3)
        self.assertEqual([p["dept"] for p in pts], ["Food", "Food", "Food", "Home"])

    def test_drift_rates_shrink_towards_the_prior_until_evidence_outweighs_it(self):
        d = C.drift_rates([], ["Food"], self.c)["Food"]
        self.assertEqual(d["drift_per_day"], 0.023); self.assertEqual(d["evidence_row_days"], 0.0)
        pts = [{"dept": "Food", "found": 100, "close": 100, "missing": 0, "age_days": 10}]       # no drift in 1,000 row-days
        self.assertAlmostEqual(C.drift_rates(pts, ["Food"], self.c)["Food"]["drift_per_day"], 0.023 * 200 / 1200, places=5)
        pts = pts * 10                                                                               # 10,000 row-days
        self.assertLess(C.drift_rates(pts, ["Food"], self.c)["Food"]["drift_per_day"], 0.0005)
        fast = [{"dept": "Food", "found": 100, "close": 50, "missing": 0, "age_days": 10}] * 10   # half the prices move in 10 days
        self.assertAlmostEqual(C.drift_rates(fast, ["Food"], self.c)["Food"]["drift_per_day"], (500 + 0.023 * 200) / 10200, places=5)
        self.assertEqual(C.drift_rates([{"dept": "Food", "found": 10, "close": 1, "age_days": None}], ["Food"], self.c)["Food"]["misses"], 0,
                         "a point without an age is no evidence")

    def test_ideal_interval(self):
        self.assertEqual(C.ideal_interval(0.023, self.c), 6)         # 2 x 0.08 / 0.023 = 6.96
        self.assertEqual(C.ideal_interval(0.0, self.c), 120); self.assertEqual(C.ideal_interval(0.5, self.c), 5)
        self.assertIn(C.ideal_interval(0.004, self.c), (39, 40))      # 2 x 0.08 / 0.004 = 40 (float), under the 120-day cap
        self.assertEqual(C.ideal_interval(0.001, self.c), 120)         # a department measured as nearly static

    def test_pages_by_department_sums_split_nodes(self):
        sizing = {"1": {"total_pages": 100}, "2_1": {"total_pages": 30}, "2_2": {"total_pages": 20}}
        cfg = [{"id": "1", "name": "Food"}, {"id": "2", "name": "Home", "split": [{"id": "2_1"}, {"id": "2_2"}]}, {"id": "3", "name": "Toys"}]
        self.assertEqual(C.pages_by_department(sizing, cfg), {"Food": 100, "Home": 50, "Toys": 0})
        self.assertEqual(C.pages_by_department(None, cfg), {"Food": 0, "Home": 0, "Toys": 0})

    def test_plan_stretches_the_cheapest_intervals_until_the_quota_holds(self):
        depts = ["Food", "Home", "Toys"]
        drift = C.drift_rates([], depts, self.c)
        pages = {"Food": 1579, "Home": 4865, "Toys": 2560}; rows = {"Food": 293000, "Home": 753000, "Toys": 318000}
        p = C.plan(depts, drift, pages, rows, 8, self.c, now=NOW)
        self.assertEqual(p["budget_calls_per_day"], 5760.0); self.assertTrue(p["fits"])
        self.assertEqual([p["departments"][d]["interval_days"] for d in depts], [6, 6, 6])
        tight = dict(self.c, crawl_share=0.2)                                   # 2,304 calls a day
        p = C.plan(depts, drift, pages, rows, 8, tight, now=NOW)
        self.assertLessEqual(p["cost_calls_per_day"], 2304.0)
        self.assertTrue(all(p["departments"][d]["interval_days"] >= 6 for d in depts))
        self.assertGreaterEqual(p["departments"]["Home"]["interval_days"], p["departments"]["Food"]["interval_days"],
                                "the department with the most calls per row-of-accuracy is never stretched less")
        self.assertTrue(p["fits"], "over budget is a fit once stretched; a prior-driven shortfall never fails the plan")
        self.assertLess(p["expected_close_rate"], 0.92); self.assertIsNone(p["expected_close_rate_measured"])
        self.assertEqual(p["departments"]["Food"]["ideal_days"], 6)
        # measured departments decide the verdict: Home measured at 2.3%/day held to 30 days by a tight quota = does not fit
        measured_all = {d: {"drift_per_day": 0.023, "evidence_row_days": 5000, "misses": 1} for d in depts}
        p = C.plan(depts, measured_all, pages, rows, 8, dict(self.c, crawl_share=0.15), now=NOW)
        self.assertFalse(p["fits"]); self.assertEqual(sorted(p["measured_departments"]), sorted(depts))
        self.assertLess(p["expected_close_rate_measured"], 0.92)
        # thin evidence keeps a department at its legacy floor; measured evidence frees it
        p = C.plan(depts, drift, pages, rows, 8, self.c, now=NOW, floors={"Home": 30, "Food": 7})
        self.assertEqual((p["departments"]["Home"]["interval_days"], p["departments"]["Food"]["interval_days"]), (30, 7))
        measured = dict(drift, Home={"drift_per_day": 0.023, "evidence_row_days": 5000, "misses": 1})
        p = C.plan(depts, measured, pages, rows, 8, self.c, now=NOW, floors={"Home": 30, "Food": 7})
        self.assertEqual(p["departments"]["Home"]["interval_days"], 6)
        # no pace known: 6 a minute; a department without pages costs nothing
        p = C.plan(["Food"], drift, {}, rows, None, self.c, now=NOW)
        self.assertEqual(p["per_min"], 6.0); self.assertEqual(p["cost_calls_per_day"], 0.0); self.assertTrue(p["fits"])
        self.assertIn("| Food |", C.markdown(p)); self.assertEqual(C.markdown(None), "")

    def test_interval_for_prefers_the_plan_over_the_legacy_cadence(self):
        plan = {"departments": {"Food": {"interval_days": 11}, "Home": {"interval_days": 0}}}
        self.assertEqual(C.interval_for("Food", plan, True, SCHED), 11.0)
        self.assertEqual(C.interval_for("Home", plan, False, SCHED), 30.0)
        self.assertEqual(C.interval_for("Toys", None, False, SCHED), 30.0); self.assertEqual(C.interval_for("Pets", "x", True, SCHED), 7.0)


class Store(StoreCase, unittest.TestCase):
    def setUp(self):
        self.setup_store()
        import importlib, crawler.cadence
        importlib.reload(crawler.cadence); self.C = crawler.cadence

    def tearDown(self):
        self.teardown_store()

    def test_refresh_plan_reads_the_store_and_writes_the_plan(self):
        self.assertIsNone(self.C.refresh_plan(SCHED, NOW), "nothing published, nothing to plan")
        from _fixtures import snapshot_rows
        rows = snapshot_rows()
        self.write_published(rows)
        self.store.write_json(self.store.ROOT / "state" / "run.json", {"pace": {"per_min": 7}})
        self.store.write_json(self.store.ROOT / "audit" / "drift.json", {"points": [{"dept": "Food", "found": 100, "close": 60, "missing": 0, "age_days": 10}] * 5})
        p = self.C.refresh_plan(SCHED, NOW)
        self.assertEqual(p, self.store.read_json(self.store.ROOT / "state" / "cadence.json"))
        self.assertEqual(p["per_min"], 7.0)
        self.assertEqual(p["departments"]["Food"]["rows"], 121); self.assertLess(p["departments"]["Food"]["interval_days"], 7)
        self.assertEqual(p["departments"]["Home"]["interval_days"], 30, "no evidence: the legacy floor")
