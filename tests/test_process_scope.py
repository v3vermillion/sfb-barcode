"""process.build reads only the child nodes data/categories.json lists for a split department: a node removed after the
crawl finished still has its raw pages on disk (crawl.sync prunes them only while a crawl runs) and must not be built."""
import importlib, json, os, shutil, tempfile, unittest
from pathlib import Path
from unittest import mock

HI = "1072864"


def listing(i, name, price=12.0):
    return {"itemId": i, "upc": f"{681131000000 + i:012d}", "name": name, "brandName": "Mainstays", "salePrice": price,
            "marketplace": False, "stock": "Available", "categoryPath": "Home Page/Home Improvement/Emergency Prep"}


class SplitScope(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.env = mock.patch.dict(os.environ, {"SFB_STORE": str(self.tmp), "SFB_NO_COMMIT": "1"}); self.env.start()
        import crawler.store, crawler.process
        importlib.reload(crawler.store); importlib.reload(crawler.process)
        self.store, self.process = crawler.store, crawler.process
        self.cfg = self.store.config()

    def tearDown(self):
        self.env.stop(); shutil.rmtree(self.tmp)

    def test_only_configured_nodes_are_built(self):
        hi = next(d for d in self.cfg["departments"] if d["id"] == HI)
        kept = [str(u["id"]) for u in hi["split"]]
        self.assertEqual(kept, ["1072864_8036850", "1072864_6610571"], "the 2026-10-12 scope")
        gone = "1072864_1031899"                                   # Tools: crawled, then removed from the split
        run = "run-x"
        units = [{"id": u, "name": u, "status": "done", "pages": 1, "items": 1, "parts": 1, "total_pages": 1}
                 for u in kept + [gone]]
        self.store.write_json(self.tmp / "state" / "run.json", {
            "run_id": run, "plan": "full", "status": "crawled",
            "departments": [{"id": HI, "name": "Home Improvement", "status": "done", "pages": 3, "total_pages": 3, "units": units},
                            {"id": "976759", "name": "Food", "status": "done", "pages": 1, "total_pages": 1}]})
        self.store.write_jsonl_gz(self.tmp / "raw" / run / HI / kept[0] / "part-0001.jsonl.gz", [listing(1, "Emergency Candle, 6 Pack")])
        self.store.write_jsonl_gz(self.tmp / "raw" / run / HI / kept[1] / "part-0001.jsonl.gz", [listing(2, "Water Filter Pitcher, 10 Cup")])
        self.store.write_jsonl_gz(self.tmp / "raw" / run / HI / gone / "part-0001.jsonl.gz", [listing(3, "Cordless Drill, 20V")])
        self.store.write_jsonl_gz(self.tmp / "raw" / run / "976759" / "part-0001.jsonl.gz",
                                  [{**listing(4, "Great Value Whole Kernel Corn, 15.25 oz", 0.98), "categoryPath": "Home Page/Food/Pantry"}])
        self.process.build()
        rows = {r["id"]: r for r in self.store.iter_jsonl_gz(self.tmp / "build" / "candidate" / "items.jsonl.gz")}
        self.assertEqual(set(rows), {1, 2, 4}, "the removed node's pages are not built")
        stats = json.loads((self.tmp / "build" / "candidate" / "stats.json").read_text())
        self.assertEqual(stats["raw_by_department"]["Home Improvement"], 2)
        self.assertEqual(stats["raw_by_department"]["Food"], 1, "a department without split reads its folder as before")


if __name__ == "__main__":
    unittest.main()
