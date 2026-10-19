"""The gates and the live check with one-unit rows of "(N pack)" bundle listings (decision of 2026-10-19)."""
import unittest

from _fixtures import StoreCase, FakeWM, snapshot_rows, row


class PackListingGates(StoreCase, unittest.TestCase):
    def setUp(self):
        self.setup_store()

    def tearDown(self):
        self.teardown_store()

    def unit(self, i, n=6, listing=60.0, **kw):
        return row(i, name=f"Hefty Trash Bags {i}, 40 Count", price=round(listing / n, 2), listing_price=listing, listing_pack=n,
                   flags=["pack_listing"], **kw)

    def test_the_live_check_compares_one_unit_with_one_unit(self):
        rows = snapshot_rows(n_food=120, n_pets=60) + [self.unit(5000 + i) for i in range(10)]
        self.write_candidate(rows)
        # Walmart answers for the bundle listing with the bundle's price: 60.00 for six units of 10.00
        live = {5000 + i: 60.0 for i in range(10)}
        self.assertEqual(self.qa.check(wm=FakeWM(rows, prices=live)), "review")
        x = self.gates()["gates"]["live_match"]
        self.assertTrue(x["pass"]); self.assertEqual(x["value"], 1.0)
        # a bundle that went up by half is reported as one unit's price
        live[5000] = 90.0
        self.qa.check(wm=FakeWM(rows, prices=live))
        ex = [e for e in self.gates()["extras"]["live"]["examples"] if e["id"] == 5000]
        self.assertEqual((ex[0]["snapshot"], ex[0]["live"]), (10.0, 15.0))

    def test_the_first_build_under_the_rule_sees_through_the_price_and_count_changes(self):
        # published before the rule: bundle rows named "(6 pack) ..." at the bundle price; 40 of them in Food
        prev = snapshot_rows(n_food=200, n_pets=60)
        bundles = [row(5000 + i, name=f"(6 pack) Hefty Trash Bags {i}, 40 Count", price=60.0, pack=6) for i in range(40)]
        self.write_published(prev + bundles)
        # the candidate: the same plain rows, 20 bundles gone (redundant), 20 kept as one unit each at 10.00
        cand = prev + [self.unit(5000 + i) for i in range(20)]
        self.write_candidate(cand)
        live = {5000 + i: 60.0 for i in range(20)}                       # Walmart still prices the bundle listing as a bundle
        self.assertEqual(self.qa.check(wm=FakeWM(cand, prices=live)), "review")
        g = self.gates()["gates"]
        self.assertTrue(g["price_drift"]["pass"]); self.assertEqual(g["price_drift"]["value"], 0.0, "60.00 for six is 10.00 each: no drift")
        self.assertTrue(g["category_counts"]["pass"], "the 20 bundle rows that left are not a category shrinking")
        self.assertEqual(g["category_counts"]["value"], 0.0)
        self.assertTrue(g["item_count"]["pass"])
        # a unit whose bundle price really moved still counts
        cand2 = prev + [self.unit(5000 + i, listing=60.0 if i else 120.0) for i in range(20)]
        self.write_candidate(cand2)
        self.qa.check(wm=FakeWM(cand2, prices={**live, 5000: 120.0}))
        self.assertEqual(len(self.gates()["extras"]["drift"]), 1)


    def test_the_first_build_under_the_ceiling_is_not_a_shrinking_category(self):
        # published before the $150 ceiling (2026-10-19): 60 Food rows above it (cases, equipment); the candidate has none
        prev = snapshot_rows(n_food=200, n_pets=60)
        dear = [row(6000 + i, name=f"Nielsen-Massey Vanilla Extract {i}, 128 fl oz", price=499.95) for i in range(60)]
        self.write_published(prev + dear)
        self.write_candidate(prev)
        self.assertEqual(self.qa.check(wm=FakeWM(prev)), "review")
        g = self.gates()["gates"]
        self.assertTrue(g["category_counts"]["pass"], "Food 261 -> 201 is the ceiling, not a category shrinking"); self.assertEqual(g["category_counts"]["value"], 0.0)
        self.assertTrue(g["item_count"]["pass"]); self.assertEqual(g["item_count"]["value"], 1.0)
        self.assertIn("60 above the price ceiling", g["item_count"]["detail"])
        # the same rows priced under the ceiling and dropped for any other reason still count as missing
        cheap = [dict(r, price=99.95) for r in dear]
        self.write_published(prev + cheap)
        self.write_candidate(prev)
        self.assertEqual(self.qa.check(wm=FakeWM(prev)), "hold")
        g = self.gates()["gates"]
        self.assertFalse(g["category_counts"]["pass"]); self.assertFalse(g["item_count"]["pass"])


if __name__ == "__main__":
    unittest.main()
