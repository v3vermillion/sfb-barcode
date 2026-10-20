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

    WALMART = [wm_row(1, "Uptime Original Energy Drink, 12 Oz, 24 Ct", 80.94, 12, "oz", pack=24, brand="Uptime"),
               wm_row(2, "Rockstar Original Energy Drink, 12 Fl. Oz.", 3.58, 12, "fl oz", brand="Rockstar"),
               wm_row(3, "NOS Energy Drink, 12 Fl. Oz., 6 Count", 5.23, 12, "fl oz", pack=6, brand="NOS"),
               wm_row(4, "Monster Energy Drink, 12 Fl Oz", 2.48, 12, "fl oz", brand="Monster"),
               wm_row(5, "Hog Bite Energy Drink, 12 oz", 6.71, 12, "oz", brand="Hog Bite"),
               wm_row(6, "Red Bull Energy Drink, 12 Fl Oz (24 pack)", 73.99, 12, "fl oz", pack=24, brand="Red Bull"),
               wm_row(7, "Great Value Peanut Butter, 16 oz", 1.98, 16, "oz", brand="Great Value")]
    UPS = sorted([80.94 / 288, 3.58 / 12, 5.23 / 72, 2.48 / 12, 6.71 / 12, 73.99 / 288])
    MEDIAN_PER_OZ = (UPS[2] + UPS[3]) / 2

    def test_the_value_is_the_median_of_the_comparable_group_and_oz_matches_fl_oz(self):
        # a national brand's energy drink: the median of the six comparable 12 oz listings (oz and fl oz alike), no tier
        eq = self.run_match(self.WALMART, [{"upc": "00196633831439", "name": "Energy Drink", "brand": "Zevia", "quantity": "12 oz"}])
        e = eq["00196633831439"]
        self.assertEqual(e["basis_count"], 6); self.assertAlmostEqual(e["est_price"], round(self.MEDIAN_PER_OZ * 12, 2), places=2)
        self.assertIsNone(e["store_brand_factor"])
        self.assertNotEqual(e["est_price"], round(80.94 / 24, 2), "never one listing alone (the Uptime case was $3.37)")

    def test_another_chains_store_brand_is_valued_at_the_store_brand_tier(self):
        # Kirkland (Costco's brand) beside national-brand comparables only: the measured store-brand ratio applies
        # (the default 0.5 here, as the fixture has no Walmart store brand of the kind to measure against)
        eq = self.run_match(self.WALMART, [{"upc": "00196633831439", "name": "Energy Drink", "brand": "Kirkland", "quantity": "12 oz"}])
        e = eq["00196633831439"]
        self.assertEqual(e["store_brand_factor"], 0.5)
        self.assertAlmostEqual(e["est_price"], round(round(self.MEDIAN_PER_OZ * 12, 2) * 0.5, 2), places=2)
        # with Walmart's own brand among the comparables the group already carries the tier: no factor
        walmart = self.WALMART + [wm_row(8, "Great Value Energy Drink, 12 fl oz", 1.12, 12, "fl oz", brand="Great Value")]
        eq = self.run_match(walmart, [{"upc": "00196633831439", "name": "Energy Drink", "brand": "Kirkland", "quantity": "12 oz"}])
        self.assertIsNone(eq["00196633831439"]["store_brand_factor"])
        # the factor is measured per category when the snapshot has enough of both
        import crawler.identify as I
        rows = [wm_row(100 + i, f"Great Value Soda {i}, 12 fl oz", 0.5, 12, "fl oz", brand="Great Value") for i in range(10)] + \
               [wm_row(200 + i, f"Brand Soda {i}, 12 fl oz", 2.0, 12, "fl oz", brand=f"Brand {i}") for i in range(20)]
        self.assertEqual(I.store_tier_factors(rows), {("10", "fl oz"): 0.3}, "clipped to the floor: 0.25 measured")

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
