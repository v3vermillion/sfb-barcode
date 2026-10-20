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


class Usda(unittest.TestCase):
    """identify.read_fdc: USDA FoodData Central Branded Foods, kept for the chains in data/brands.json."""
    HEAD = "fdc_id,brand_owner,brand_name,subbrand_name,gtin_upc,ingredients,not_a_significant_source_of,serving_size,serving_size_unit,household_serving_fulltext,branded_food_category,data_source,package_weight,modified_date,available_date,market_country,discontinued_date,preparation_state_code,trade_channel,short_description"

    def zip(self, branded, food):
        import zipfile
        path = Path(tempfile.mkdtemp()) / "fdc.zip"
        with zipfile.ZipFile(path, "w") as z:
            z.writestr("FoodData_Central_branded_food_csv_2026-04-30/branded_food.csv", self.HEAD + "\n" + "\n".join(branded) + "\n")
            z.writestr("FoodData_Central_branded_food_csv_2026-04-30/food.csv", "fdc_id,data_type,description,food_category_id,publication_date\n" + "\n".join(food) + "\n")
        return path

    def test_the_chains_rows_are_kept_by_brand_owner_or_prefix_with_label_names_title_cased(self):
        from crawler import identify
        row = lambda fid, owner, brand, upc, weight, when, country="United States": \
            f'{fid},"{owner}","{brand}",,{upc},"SALT, OIL",,28,g,,Chips,GDSN,{weight},2024-01-01,{when},{country},,,,'
        path = self.zip([
            row(1, "Aldi-Benner Company", "Clancy's", "041498123451", "6.25 oz/177 g", "4/1/2024"),       # a listed brand
            row(2, "Costco Companies Inc.", "", "096619123452", "", "1/5/2023"),                        # brand owner only: listed under the chain
            row(3, "The Kroger Co.", "Kroger", "011110123459", "12 oz", "6/1/2022", country="New Zealand"),   # not a US row
            row(4, "PepsiCo", "Pepsi", "012000123450", "12 fl oz", "1/1/2024"),                        # a national brand: Open Facts' job
            row(5, "Somebody Else", "Mystery", "085239123454", "10 oz", "1/1/2024"),                     # Target's company prefix
            row(6, "Aldi-Benner Company", "Clancy's", "041498123451", "6.25 oz", "9/9/2025"),          # the newer record of the same barcode wins
            row(7, "Aldi-Benner Company", "Clancy's", "041498123456", "6.25 oz", "9/9/2025"),          # a wrong check digit: not a barcode
        ], ['1,branded_food,"CLANCY\'S, BAKED POTATO CRISPS, ORIGINAL",,2024-04-01', '2,branded_food,"ORGANIC EXTRA VIRGIN OLIVE OIL",,2023-01-05',
            '3,branded_food,X,,2022', '4,branded_food,PEPSI,,2024', '5,branded_food,"Mystery Crunch, Sea Salt",,2024',
            '6,branded_food,"CLANCY\'S, BAKED POTATO CRISPS, ORIGINAL",,2025-09-09'])
        rows = identify.read_fdc(path, identify.fdc_scope())
        self.assertEqual([(r["upc"], r["brand"], r["name"], r["quantity"], r["store"]) for r in rows], [
            ("00041498123451", "Clancy's", "Baked Potato Crisps, Original", "6.25 oz", "Aldi"),
            ("00085239123454", "Mystery", "Mystery Crunch, Sea Salt", "10 oz", "Target"),
            ("00096619123452", "Costco", "Organic Extra Virgin Olive Oil", "", "Costco")])
        self.assertTrue(all(r["source"] == "usda" for r in rows))
        self.assertIn("costco", identify.other_store_brands(), "a row listed under the chain's name is valued at the store-brand tier")

    def test_usda_first_open_facts_fills_the_rest_and_a_missing_package_size(self):
        from crawler import identify
        fdc = [{"upc": "00096619123452", "name": "Organic Extra Virgin Olive Oil", "brand": "Costco", "quantity": "", "store": "Costco", "source": "usda"},
               {"upc": "00041498123451", "name": "Baked Potato Crisps, Original", "brand": "Clancy's", "quantity": "6.25 oz", "store": "Aldi", "source": "usda"}]
        off = [{"upc": "00096619123452", "name": "Kirkland Olive Oil", "brand": "Kirkland Signature", "quantity": "2 l"},
               {"upc": "00041498123451", "name": "Clancy's chips", "brand": "Clancy's", "quantity": "177 g"},
               {"upc": "00012000123450", "name": "Pepsi", "brand": "Pepsi", "quantity": "12 fl oz"}]
        merged = {r["upc"]: r for r in identify.merge_sources(fdc, off)}
        self.assertEqual(len(merged), 3)
        self.assertEqual((merged["00096619123452"]["name"], merged["00096619123452"]["quantity"]), ("Organic Extra Virgin Olive Oil", "2 l"))
        self.assertEqual(merged["00041498123451"]["quantity"], "6.25 oz")
        self.assertEqual(merged["00012000123450"]["brand"], "Pepsi")

    def test_the_newest_release_is_read_off_the_download_page_else_the_dated_fallback(self):
        from crawler import identify
        class Page:
            def __init__(self, text): self.text = text
            def raise_for_status(self): pass
        class Session:
            def __init__(self, text): self.text = text
            def get(self, url, **kw): return Page(self.text)
        html = ('<a href="https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_branded_food_csv_2025-12-18.zip">Dec</a>'
                '<a href="https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_branded_food_csv_2026-04-30.zip">Apr</a>'
                '<a href="https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_foundation_food_csv_2026-10-30.zip">other type</a>')
        self.assertEqual(identify.fdc_url(Session(html)), "https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_branded_food_csv_2026-04-30.zip")
        self.assertEqual(identify.fdc_url(Session("<html>maintenance</html>")), identify.FDC_URL.format(date=identify.FDC_FALLBACK_DATE))
        self.assertEqual(identify.title_case("CREAM OF MUSHROOM SOUP"), "Cream of Mushroom Soup")
        self.assertEqual(identify.title_case("Already Cased"), "Already Cased")
