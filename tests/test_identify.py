"""identify.match: an equivalent value comes from the group of comparable Walmart items, never one listing alone."""
import importlib, json, os, shutil, tempfile, unittest
from pathlib import Path
from unittest import mock


def wm_row(i, name, price, qty, unit, pack=1, brand="Brand"):
    return {"id": i, "upc": f"{i:014d}", "name": name, "brand": brand, "size": qty, "unit": unit, "pack": pack, "base_qty": qty,
            "base_unit": unit, "price": price, "unit_price": round(price / (qty * pack), 4), "basis": "each", "cat": "10", "dept": "Food",
            "path": "Home Page/Food/Beverages", "variants": [], "store_brand": False, "stock": "Available", "flags": []}


class Match(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.env = mock.patch.dict(os.environ, {"SFB_STORE": str(self.tmp), "SFB_NO_COMMIT": "1"}); self.env.start()
        import crawler.store, crawler.identify
        importlib.reload(crawler.store); importlib.reload(crawler.identify)
        self.store, self.identify = crawler.store, crawler.identify

    def tearDown(self):
        self.env.stop(); shutil.rmtree(self.tmp)

    def run_match(self, walmart, products):
        self.store.write_jsonl_gz(self.tmp / "build" / "published" / "items.jsonl.gz", walmart)
        self.store.write_jsonl_gz(self.tmp / "identify" / "products_us.jsonl.gz", products)
        self.identify.match()
        return {e["upc"]: e for e in self.store.iter_jsonl_gz(self.tmp / "identify" / "equivalents.jsonl.gz")}

    def test_the_value_is_the_median_of_the_comparable_group_and_oz_matches_fl_oz(self):
        walmart = [wm_row(1, "Uptime Original Energy Drink, 12 Oz, 24 Ct", 80.94, 12, "oz", pack=24, brand="Uptime"),
                   wm_row(2, "Rockstar Original Energy Drink, 12 Fl. Oz.", 3.58, 12, "fl oz", brand="Rockstar"),
                   wm_row(3, "NOS Energy Drink, 12 Fl. Oz., 6 Count", 5.23, 12, "fl oz", pack=6, brand="NOS"),
                   wm_row(4, "Monster Energy Drink, 12 Fl Oz", 2.48, 12, "fl oz", brand="Monster"),
                   wm_row(5, "Hog Bite Energy Drink, 12 oz", 6.71, 12, "oz", brand="Hog Bite"),
                   wm_row(6, "Red Bull Energy Drink, 12 Fl Oz (24 pack)", 73.99, 12, "fl oz", pack=24, brand="Red Bull"),
                   wm_row(7, "Great Value Peanut Butter, 16 oz", 1.98, 16, "oz", brand="Great Value")]
        eq = self.run_match(walmart, [{"upc": "00196633831439", "name": "Energy Drink", "brand": "Kirkland", "quantity": "12 oz"}])
        e = eq["00196633831439"]
        ups = sorted([80.94 / 288, 3.58 / 12, 5.23 / 72, 2.48 / 12, 6.71 / 12, 73.99 / 288])
        median = (ups[2] + ups[3]) / 2
        self.assertEqual(e["est_price"], round(median * 12, 2))
        self.assertEqual(e["basis_count"], 6, "the fl oz listings count: volunteers write a can as oz or fl oz")
        self.assertNotEqual(e["est_price"], round(80.94 / 288 * 12, 2), "the 24-can case is not the value on its own")
        self.assertEqual(e["base_unit"], "oz"); self.assertEqual(e["confidence"], "high")

    def test_a_lone_match_and_no_match(self):
        walmart = [wm_row(1, "Great Value Creamy Peanut Butter, 16 oz", 1.98, 16, "oz", brand="Great Value"),
                   wm_row(2, "Jif Creamy Peanut Butter, 16 oz", 2.78, 16, "oz", brand="Jif")]
        eq = self.run_match(walmart, [{"upc": "00041498100001", "name": "Creamy Peanut Butter", "brand": "Kirkland", "quantity": "16 oz"},
                                      {"upc": "00041498100002", "name": "Wiper Blades", "brand": "Kirkland", "quantity": "2 pack"}])
        e = eq["00041498100001"]
        self.assertEqual(e["basis_id"], 1, "another store's brand is matched to Walmart's store brand first")
        self.assertEqual(e["est_price"], 1.98)
        self.assertNotIn("00041498100002", eq)
        stats = json.loads((self.tmp / "identify" / "equivalents_stats.json").read_text())
        self.assertEqual(stats["unparseable"], 1)


if __name__ == "__main__":
    unittest.main()


class Brands(unittest.TestCase):
    def test_the_other_stores_brands_come_from_data_brands_json(self):
        import json
        from pathlib import Path
        from crawler import identify
        cfg = json.loads((Path(identify.__file__).resolve().parent.parent / "data" / "brands.json").read_text(encoding="utf-8"))
        names = identify.store_brands()
        for b, store in [("kirkland signature", "Costco"), ("heinen's", "Heinen's"), ("happy belly", "Amazon"), ("clancy's", "Aldi"), ("market district", "Giant Eagle"), ("marc's", "Marc's"), ("365 by whole foods market", "Whole Foods Market")]:
            self.assertEqual(names[b], store); self.assertIn(b, identify.other_store_brands())
        for store, d in cfg["stores"].items():
            for pfx in d["prefixes"]:
                self.assertRegex(pfx, r"^\d{6,10}$", f"{store}: a prefix is the leading digits of the 13-digit barcode")
        self.assertFalse(identify.other_store_brands() & identify.WALMART_STORE_BRANDS)
        from crawler.normalize import STORE_BRANDS
        self.assertFalse(identify.other_store_brands() & STORE_BRANDS, "Member's Mark is Walmart's own (Sam's Club)")
        self.assertNotIn("presto!", identify.other_store_brands(), "a brand Walmart sells is not a store brand")
