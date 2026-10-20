"""crawler/valuation.py: implausible prices are withheld and valued at an equivalent; never blank."""
import unittest

from crawler import valuation as V

CFG = {"price_sanity": {"floor": 0.10, "over_p99": 5, "caps": {"Food": 500, "default": 5000}}}


def row(i, name, price, cat="6", dept="Food", qty=None, unit=None, pack=1, flags=None, brand="Great Value", path=None):
    up = round(price / (qty * pack), 4) if qty else None
    return {"id": i, "upc": f"{i:014d}", "name": name, "brand": brand, "price": price, "cat": cat, "dept": dept,
            "base_qty": qty, "base_unit": unit, "pack": pack, "unit_price": up, "flags": list(flags or []),
            "path": path or "Home Page/Food/Pantry/Canned goods/Canned corn"}


def snapshot(extra):
    rows = {i: row(i, f"Great Value Whole Kernel Corn {i}", 1.0 + (i % 7) * 0.1, qty=15.25, unit="oz") for i in range(1, 400)}
    for r in extra:
        rows[r["id"]] = r
    return rows


class Bounds(unittest.TestCase):
    def test_range_is_the_cap_or_a_multiple_of_the_99th_percentile(self):
        rows = [row(i, "x", float(i)) for i in range(1, 101)]          # p99 = 100
        lo, hi, p99 = V.bounds(rows, CFG)["Food"]
        self.assertEqual((lo, hi, p99), (0.10, 500, 100))               # 5 x 100 = 500, the Food cap
        rows = [row(i, "x", i / 10) for i in range(1, 101)]            # p99 = 10
        self.assertEqual(V.bounds(rows, CFG)["Food"][1], 50)

    def test_placeholders_do_not_shape_the_range(self):
        rows = [row(i, "x", 1.0) for i in range(1, 100)] + [row(999, "Merchandise", 9000.0, flags=["placeholder"])]
        self.assertEqual(V.bounds(rows, CFG)["Food"][1], 5.0)


class Apply(unittest.TestCase):
    def test_an_absurd_price_is_withheld_and_valued_at_the_closest_comparable(self):
        rows = snapshot([row(1000, "Great Value Whole Kernel Corn 3", 3.26e21, qty=15.25, unit="oz")])
        withheld, bounds, dropped = V.apply(rows, CFG)
        r = rows[1000]
        self.assertTrue(r["price_withheld"]); self.assertIn("price_withheld", r["flags"])
        self.assertEqual(r["price"], 3.26e21, "Walmart's price is kept as listed for history and audits")
        self.assertIsNone(r["unit_price"])
        self.assertEqual(r["equiv"]["method"], "comparable item")
        self.assertTrue(1.0 <= r["equiv"]["price"] <= 1.7)
        self.assertEqual([w["id"] for w in withheld], [1000]); self.assertEqual(withheld[0]["raw_price"], 3.26e21)
        self.assertEqual(dropped, [])

    def test_a_one_cent_listing_is_withheld_too(self):
        rows = snapshot([row(1001, "Great Value Whole Kernel Corn 4", 0.01, qty=15.25, unit="oz")])
        V.apply(rows, CFG)
        self.assertTrue(rows[1001]["price_withheld"])
        self.assertGreater(rows[1001]["equiv"]["price"], 0.10)

    def test_without_a_comparable_the_per_unit_median_then_the_category_median(self):
        odd = row(1002, "Zqxv Unusual Imported Thing", 99999.0, qty=30.5, unit="oz", brand="Zqxv")
        rows = snapshot([odd])
        V.apply(rows, CFG, group_min=50)
        self.assertEqual(rows[1002]["equiv"]["method"], "median per-unit price of comparable items")
        self.assertAlmostEqual(rows[1002]["equiv"]["price"], round(1.3 / 15.25 * 30.5, 2), delta=0.5)
        nosize = row(1003, "Zqxv Unusual Imported Thing", 99999.0, brand="Zqxv")
        rows = snapshot([nosize])
        V.apply(rows, CFG)
        self.assertEqual(rows[1003]["equiv"]["method"], "median price of its category")
        self.assertEqual(rows[1003]["equiv"]["confidence"], "rough")
        self.assertGreater(rows[1003]["equiv"]["price"], 0)

    def test_a_placeholder_with_an_implausible_price_is_dropped(self):
        rows = snapshot([row(1004, "Merchandise", 7009.32, flags=["placeholder"])])
        withheld, _, dropped = V.apply(rows, CFG)
        self.assertNotIn(1004, rows)
        self.assertEqual(dropped, [(1004, "Food", "placeholder_price")]); self.assertEqual(withheld, [])

    def test_a_register_name_priced_like_a_pallet_is_dropped(self):
        rows = snapshot([row(1005, "Old El Paso Bold/Pri", 1042.0), row(1006, "ReadyWise 2160 Serving Emergency Food Bucket", 4599.99)])
        withheld, _, dropped = V.apply(rows, CFG)
        self.assertEqual(dropped, [(1005, "Food", "store_display")])
        self.assertEqual([w["id"] for w in withheld], [1006], "a full product name is withheld and valued, not dropped")

    def test_a_price_far_below_comparable_items_in_price_and_per_unit_is_withheld(self):
        rows = snapshot([])
        for r in rows.values():
            r["_kind"] = "corn"
        cheap = row(1007, "Great Value Whole Kernel Corn 9", 0.04, qty=15.25, unit="oz"); cheap["_kind"] = "corn"
        single = row(1008, "Great Value Whole Kernel Corn Snack Cup", 0.30, qty=1.0, unit="oz"); single["_kind"] = "corn"
        rows[1007], rows[1008] = cheap, single
        withheld, _, _ = V.apply(rows, {"price_sanity": {"floor": 0.01, "over_p99": 5, "caps": {"default": 5000}}})
        self.assertTrue(rows[1007].get("price_withheld"), "$0.04 for 15.25 oz when corn sells at $1.30")
        self.assertEqual(withheld[0]["why"], "far below comparable items")
        self.assertFalse(rows[1008].get("price_withheld"), "a small size is cheap per item but not per ounce")

    def test_a_price_far_above_the_item_s_in_stock_siblings_is_withheld(self):
        # 2026-10-19: one product line, many flavours; Walmart's feed carries stale flavour listings at 3-4x the line's price
        rows = snapshot([])
        for r in rows.values():
            r["_kind"] = "corn"
        flavours = ["Orange", "Grape Rush", "Cherry Cola", "Retro Vibe", "Astro Vibe", "Galaxy Vibe"]
        prices = [2.57, 2.28, 2.57, 2.57, 7.69, 4.40]          # 7.69 is inside the department's range: only the sibling rule sees it
        stock = ["Not available", "Not available", "Available", "Available", "Not available", "Available"]
        for i, (fl, p, st) in enumerate(zip(flavours, prices, stock)):
            r = row(2000 + i, f"CELSIUS Sparkling {fl}, Functional Energy Drink 12 fl oz Single Can", p, cat="10", qty=12.0, unit="fl oz", brand="CELSIUS",
                    path="Home Page/Food/Beverages/Energy Drinks")
            r["_kind"] = "energy drink"; r["stock"] = st
            rows[r["id"]] = r
        withheld, _, _ = V.apply(rows, CFG)
        self.assertTrue(rows[2004].get("price_withheld"), "$7.69 against in-stock siblings at $2.57")
        w = next(x for x in withheld if x["id"] == 2004)
        self.assertEqual(w["why"], "far above the same item's other variants")
        self.assertAlmostEqual(w["value"], 2.57, places=1, msg="valued from a sibling")
        self.assertEqual(w["method"], "comparable item")
        for i in (2000, 2001, 2002, 2003, 2005):
            self.assertFalse(rows[2000 + 0].get("price_withheld")); self.assertFalse(rows[i].get("price_withheld"), f"{i}: within 2.5x stays")
        self.assertNotIn("_why", rows[2004])
        # fewer than three in-stock siblings: no reference, nothing withheld
        rows2 = snapshot([])
        for r in rows2.values():
            r["_kind"] = "corn"
        for i, (p, st) in enumerate([(2.57, "Available"), (2.57, "Available"), (7.69, "Not available")]):
            r = row(3000 + i, f"CELSIUS Sparkling Flavour {i}, Energy Drink 12 fl oz", p, cat="10", qty=12.0, unit="fl oz", brand="CELSIUS"); r["_kind"] = "energy drink"; r["stock"] = st
            rows2[r["id"]] = r
        V.apply(rows2, CFG)
        self.assertFalse(rows2[3002].get("price_withheld"))
        # a count is too coarse a family (an electric and a manual toothbrush are both "1 ct"): never judged
        rows3 = snapshot([])
        for r in rows3.values():
            r["_kind"] = "corn"
        for i, (p, st) in enumerate([(19.97, "Available"), (19.97, "Available"), (19.97, "Available"), (299.94, "Available")]):
            r = row(4000 + i, f"Oral-B Toothbrush {i}", p, cat="15", qty=1.0, unit="ct", brand="Oral-B", dept="Personal Care"); r["_kind"] = "toothbrush"; r["stock"] = st
            rows3[r["id"]] = r
        V.apply(rows3, CFG)
        self.assertFalse(rows3[4003].get("price_withheld"))

    def test_a_price_far_above_the_same_kind_of_item_is_withheld(self):
        # 24 allergy tablets at $460.58 beside forty listings of tablets around $15 (owner's case, 2026-10-19); no size
        # was read from its name, so only the item price can be judged
        rows = snapshot([])
        for i in range(5000, 5040):
            r = row(i, f"Brand {i} Allergy Relief Tablets, 30 Count", 12.0 + (i % 9), cat="14", dept="Health and Medicine", qty=30.0, unit="ct", brand=f"Brand {i}")
            r["_kind"] = "tablets"; rows[i] = r
        big = row(5100, "Kirkland Signature Aller-Tec D 12 Hour, 24 Extended Release Tablets", 460.58, cat="14", dept="Health and Medicine", brand="Kirkland")
        big["_kind"] = "tablets"; rows[5100] = big
        # a large size is not an error: ten times the price, but the same price per tablet
        bulk = row(5101, "Brand Allergy Relief Tablets, 365 Count", 150.0, cat="14", dept="Health and Medicine", qty=365.0, unit="ct", brand="Bulk")
        bulk["_kind"] = "tablets"; rows[5101] = bulk
        cfg = {"price_sanity": {"floor": 0.10, "over_p99": 5, "caps": {"default": 5000}}}
        withheld, _, _ = V.apply(rows, cfg)
        self.assertTrue(rows[5100].get("price_withheld")); self.assertFalse(rows[5101].get("price_withheld"))
        w = next(x for x in withheld if x["id"] == 5100)
        self.assertEqual(w["why"], "far above the same kind of item"); self.assertLess(w["value"], 30.0)
        self.assertNotIn("_why", rows[5100])
        # a durable good (process.build marks it) is a model, not an error: an electric toothbrush beside manual ones
        rows2 = snapshot([])
        for i in range(6000, 6040):
            r = row(i, f"Brand {i} Soft Toothbrush, 1 Count", 2.0 + (i % 5) * 0.5, cat="15", dept="Personal Care", brand=f"Brand {i}"); r["_kind"] = "toothbrush"; rows2[i] = r
        io = row(6100, "Oral-B iO Series 5 Electric Toothbrush", 99.0, cat="15", dept="Personal Care", brand="Oral-B"); io["_kind"] = "toothbrush"; io["_durable"] = True; rows2[6100] = io
        V.apply(rows2, cfg)
        self.assertFalse(rows2[6100].get("price_withheld"))

    def test_an_out_of_stock_variant_takes_the_price_its_in_stock_siblings_agree_on(self):
        # owner's case, 2026-10-20: CELSIUS flavours; every in-stock one at $2.57, the out-of-stock ones stale
        def can(i, flavour, price, stock="Available", **kw):
            r = row(i, f"CELSIUS Sparkling {flavour}, Functional Energy Drink 12 fl oz", price, cat="10", qty=12.0, unit="fl oz", brand="CELSIUS", dept="Food")
            r["stock"] = stock; r.update(kw); return r
        rows = {}
        for i, fl in enumerate(["Orange", "Kiwi Guava", "Cherry Cola", "Playa Vibe", "Pink Lemonade"]):
            rows[7000 + i] = can(7000 + i, fl, 2.57)
        rows[7010] = can(7010, "Grape Rush", 2.28, stock="Not available")
        rows[7011] = can(7011, "Astro Vibe", 9.37, stock="Not available")
        rows[7012] = can(7012, "Wild Berry", 2.57, stock="Not available")                  # already at the line's price
        rows[7013] = can(7013, "Strawberry Passionfruit", 7.69)                             # in stock: its own price stays (the sibling rule judges it)
        rows[7014] = can(7014, "Tropical Vibe", 2.19, stock="Not available", flags=["store_price"])   # the store's shelf price is current
        rows[7015] = can(7015, "Peach Vibe", 2.28, stock="Not available", flags=["pack_listing"], listing_price=27.36, listing_pack=12)
        # a different line of the same brand and size: 12-packs are their own family (pack differs), and two in stock agree on nothing
        rows[7020] = can(7020, "Original Variety Pack", 21.47, pack=12); rows[7021] = can(7021, "Vibe Variety Pack", 21.47, pack=12); rows[7022] = can(7022, "Space Variety Pack", 19.98, stock="Not available", pack=12)
        changed, used = V.apply_family_prices(rows.values(), {"Food"})
        self.assertEqual((changed, used), (3, 1))
        for i in (7010, 7011, 7015):
            self.assertEqual(rows[i]["price"], 2.57); self.assertIn("family_price", rows[i]["flags"]); self.assertAlmostEqual(rows[i]["unit_price"], round(2.57 / 12, 4))
        self.assertEqual(rows[7010]["family_price_from"], 2.28); self.assertEqual(rows[7011]["family_price_from"], 9.37)
        self.assertEqual(rows[7015]["listing_price"], 30.84, "a bundle's price follows its unit")
        for i in (7012, 7013, 7014, 7022):
            self.assertNotIn("family_price", rows[i]["flags"])
        self.assertEqual(rows[7013]["price"], 7.69); self.assertEqual(rows[7014]["price"], 2.19); self.assertEqual(rows[7022]["price"], 19.98)
        # names that differ in more than a flavour are not one line: Lash Blast Fusion and Lash Blast Volume mascaras
        self.assertFalse(V._one_run_diff("covergirl lash blast fusion waterproof mascara 895 black brown".split(), "covergirl lash blast volume waterproof mascara 835 black brown".split()))
        self.assertTrue(V._one_run_diff("celsius sparkling grape rush functional energy drink".split(), "celsius sparkling orange functional energy drink".split()))
        # outside the consumable departments the rule does nothing
        rows2 = {i: can(i, f"Flavour {i}", 2.57 if i < 8005 else 9.0, stock="Available" if i < 8005 else "Not available", dept="Home") for i in range(8000, 8007)}
        self.assertEqual(V.apply_family_prices(rows2.values(), {"Food"}), (0, 0))

    def test_a_low_price_two_same_size_listings_agree_on_is_kept(self):
        rows = snapshot([])
        for r in rows.values():
            r["_kind"] = "corn"
        a = row(1009, "Great Value Whole Kernel Corn 9", 0.04, qty=15.25, unit="oz"); a["_kind"] = "corn"
        b = row(1010, "Great Value No Salt Whole Kernel Corn 9", 0.04, qty=15.25, unit="oz"); b["_kind"] = "corn"
        rows[1009], rows[1010] = a, b
        V.apply(rows, {"price_sanity": {"floor": 0.01, "over_p99": 5, "caps": {"default": 5000}}})
        self.assertFalse(rows[1009].get("price_withheld")); self.assertFalse(rows[1010].get("price_withheld"))

    def test_an_equivalent_value_must_be_believable_for_its_kind(self):
        chairs = {i: row(i, f"Brand{i} Shiatsu Massage Chair Model {i}", 900.0 + i, cat="14", dept="Health and Medicine",
                         path="Home Page/Health and Medicine/Massage") for i in range(2000, 2040)}
        pills = {i: row(i, f"Equate Pain Reliever {i}", 5.0, cat="14", dept="Health and Medicine",
                        path="Home Page/Health and Medicine/Pain Relief") for i in range(3000, 3400)}
        rows = {**chairs, **pills}
        for r in chairs.values():
            r["_kind"] = "massage chair"
        odd = row(2100, "Zqxv Deluxe Zero Gravity Massage Chair", 99999.0, cat="14", dept="Health and Medicine",
                  path="Home Page/Health and Medicine/Massage")
        odd["_kind"] = "massage chair"; rows[2100] = odd
        V.apply(rows, CFG)
        self.assertGreater(rows[2100]["equiv"]["price"], 90, "never valued like a bottle of pain reliever")

    def test_plausible_prices_are_untouched(self):
        rows = snapshot([])
        before = {i: dict(r) for i, r in rows.items()}
        withheld, _, _ = V.apply(rows, CFG)
        self.assertEqual(withheld, []); self.assertEqual(rows, before)


if __name__ == "__main__":
    unittest.main()
