"""Decision of 2026-10-19: Walmart's "(N pack)" bundle listings are one unit of the item at 1/N of the bundle's price, and
go when a plain listing of the same item exists (same barcode, or same brand and name)."""
import importlib, json, os, shutil, tempfile, unittest
from pathlib import Path
from unittest import mock

PATH = "Home Page/Household Essentials/Paper & Plastic/Trash Bags"


def item(i, name, price, upc=None, brand="Hefty", **kw):
    it = {"itemId": i, "upc": upc, "name": name, "brandName": brand, "salePrice": price, "marketplace": False,
          "stock": "Available", "categoryPath": PATH}
    it.update(kw)
    return it


class PackListings(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        self.env = mock.patch.dict(os.environ, {"SFB_STORE": str(self.tmp), "SFB_NO_COMMIT": "1"}); self.env.start()
        import crawler.store, crawler.process, crawler.storeprice
        importlib.reload(crawler.store); importlib.reload(crawler.storeprice); importlib.reload(crawler.process)
        self.store, self.process, self.sp = crawler.store, crawler.process, crawler.storeprice

    def tearDown(self):
        self.env.stop(); shutil.rmtree(self.tmp)

    def build(self, items, prev=None, dept=("1115193", "Household Essentials")):
        run = "run-x"
        self.store.write_json(self.tmp / "state" / "run.json", {"run_id": run, "plan": "core", "status": "crawled",
                              "departments": [{"id": dept[0], "name": dept[1], "status": "done"}]})
        self.store.write_jsonl_gz(self.tmp / "raw" / run / dept[0] / "part-0001.jsonl.gz", items)
        if prev is not None:
            self.store.write_jsonl_gz(self.tmp / "build" / "published" / "items.jsonl.gz", prev)
        stats = self.process.build()
        return {r["id"]: r for r in self.store.iter_jsonl_gz(self.tmp / "build" / "candidate" / "items.jsonl.gz")}, stats

    def test_a_bundle_with_a_plain_listing_of_the_same_item_goes(self):
        rows, stats = self.build([
            item(1, "Hefty Ultra Strong 13 Gallon Trash Bags, Blackout, 40 Bags", 10.52, upc="013700433856"),
            item(2, "(6 pack) Hefty Ultra Strong 13 Gallon Trash Bags, Blackout, 40 Bags", 79.99),                      # same name, no barcode
            item(3, "(3 pack) Hefty Ultra Strong 13 Gallon Trash Bags, Blackout, 40 Count Box", 31.5, upc="013700433856"),  # same barcode, other name
            item(4, "(2 pack) Hefty Strong Trash Bags, 28 Count", 26.0, upc="013700700002"),                 # no plain listing: kept as one unit
            item(5, "(6 pack) Merchandise", 60.0, upc="078742054261"),                                                   # a placeholder is not a plain listing
            item(6, "(4 pack) Hefty Strong Trash Bags, 28 Count", 48.0, upc="013700700002"),                 # a second bundle of the same item stays too
        ])
        self.assertEqual(sorted(rows), [1, 4, 5, 6])
        self.assertEqual(stats["rejects_by_department"]["Household Essentials"]["multipack_listing"], 2)
        r4 = rows[4]
        self.assertEqual((r4["name"], r4["price"], r4["listing_price"], r4["listing_pack"], r4["pack"]),
                         ("Hefty Strong Trash Bags, 28 Count", 13.0, 26.0, 2, 1))
        self.assertIn("pack_listing", r4["flags"])
        self.assertEqual(rows[6]["price"], 12.0)
        self.assertTrue(r4.get("primary") or rows[6].get("primary"), "a kept unit answers the barcode")
        self.assertIn("placeholder", rows[5]["flags"]); self.assertEqual(rows[5]["price"], 10.0)
        self.assertEqual(stats["flags"]["pack_listing"], 3)

    def test_a_carried_over_bundle_row_is_converted_too(self):
        prev = [{"id": 9, "upc": "00013700700009", "name": "(4 pack) Hefty Strong Trash Bags, 28 Count", "brand": "Hefty",
                 "size": 28.0, "unit": "ct", "pack": 4, "base_qty": 28.0, "base_unit": "ct", "price": 52.0, "unit_price": round(52 / 112, 4),
                 "basis": "each", "cat": "16", "dept": "Pets", "path": "Home Page/Pets/x", "variants": [], "store_brand": False,
                 "stock": "Available", "online": True, "offer": None, "size_src": "name", "flags": ["carried_over"], "primary": True}]
        rows, _ = self.build([item(1, "Hefty Ultra Strong 13 Gallon Trash Bags, 40 Bags", 10.52, upc="013700433856")], prev=prev)
        r = rows[9]
        self.assertEqual((r["name"], r["price"], r["listing_price"], r["listing_pack"], r["pack"], r["size"]),
                         ("Hefty Strong Trash Bags, 28 Count", 13.0, 52.0, 4, 1, 28.0))
        self.assertAlmostEqual(r["unit_price"], round(13.0 / 28, 4)); self.assertIn("pack_listing", r["flags"]); self.assertIn("carried_over", r["flags"])

    def test_the_promo_guard_needs_the_same_basis(self):
        # the published row was the whole bundle (before the rule); the promo cannot keep that as the unit's normal price
        prev_bundle = [{"id": 2, "upc": "00013700700002", "name": "(2 pack) Hefty Strong Trash Bags, 28 Count", "brand": "Hefty",
                        "size": 28.0, "unit": "ct", "pack": 2, "base_qty": 28.0, "base_unit": "ct", "price": 26.0, "unit_price": 0.4643, "basis": "each",
                        "cat": "16", "dept": "Household Essentials", "path": PATH, "variants": [], "store_brand": False, "stock": "Available",
                        "online": True, "offer": None, "size_src": "name", "flags": [], "primary": True}]
        rows, _ = self.build([item(2, "(2 pack) Hefty Strong Trash Bags, 28 Count", 20.0, upc="013700700002", clearance=True)], prev=prev_bundle)
        self.assertEqual(rows[2]["price"], 10.0); self.assertIn("promo_price", rows[2]["flags"]); self.assertNotIn("kept_normal_price", rows[2]["flags"])
        # once both are on the unit basis the guard works as before
        rows, _ = self.build([item(2, "(2 pack) Hefty Strong Trash Bags, 28 Count", 20.0, upc="013700700002", clearance=True)],
                             prev=[dict(rows[2], price=13.0, flags=["pack_listing"])])
        self.assertEqual((rows[2]["price"], rows[2]["promo"]), (13.0, 10.0)); self.assertIn("kept_normal_price", rows[2]["flags"])

    def test_the_store_price_of_a_bundle_is_shared_out_too(self):
        now = self.sp._now()
        self.store.write_jsonl_gz(self.tmp / "store_prices" / "2266.jsonl.gz",
                                  [{"id": 2, "p": 24.0, "s": "Available", "t": self.sp._day(now), "d": "Household Essentials", "v": self.sp.RECORD_VERSION}])
        with mock.patch.object(self.sp, "config", lambda: {"store_id": "2266", "tiers": [{"departments": ["Household Essentials"], "refresh_every_days": 28, "max_age_days": 42}]}):
            rows, _ = self.build([item(2, "(2 pack) Hefty Paper Napkins, 100 Count", 26.0, upc="013700700002")])
        r = rows[2]
        self.assertEqual((r["price"], r["online_price"]), (12.0, 13.0)); self.assertIn("store_price", r["flags"])
        self.assertAlmostEqual(r["unit_price"], round(12.0 / 100, 4))
        # the comparison the store pass records is the bundle's price against the bundle's
        meta = {}
        self.sp.due_ids(iter([r]), {}, now, cfg={"store_id": "2266", "tiers": [{"departments": ["Household Essentials"]}]}, meta=meta)
        self.assertEqual(meta[2], ("Household Essentials", 26.0))


if __name__ == "__main__":
    unittest.main()
