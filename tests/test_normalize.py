import json, unittest
from pathlib import Path
from crawler import normalize as N

CFG = json.loads((Path(__file__).resolve().parent.parent / "data" / "categories.json").read_text())
FOOD = next(d for d in CFG["departments"] if d["name"] == "Food")


class T(unittest.TestCase):
    def q(self, s): return N.parse_quantity(s)

    def test_quantities(self):
        self.assertEqual(self.q("Great Value Whole Kernel Sweet Corn, Gluten-Free, 29 oz Can"), (29.0, "oz", None))
        self.assertEqual(self.q("(8 pack) Great Value Golden Sweet Whole Kernel Corn, 15.25 oz"), (15.25, "oz", 8))
        self.assertEqual(self.q("Mountain Dew Soda Pop, 16.9 fl oz, 24 Pack Bottles"), (16.9, "fl oz", 24))
        self.assertEqual(self.q("Mt. Olive PicklePak Kosher Dill Petites Pickles, 4 - 3.7 fl oz Cups"), (3.7, "fl oz", 4))
        self.assertEqual(self.q("Don Pancho Whole Wheat Large Wraps, 17 oz, 8 Count"), (17.0, "oz", 8))
        self.assertEqual(self.q("Fresh Express Crunchy Blends Veggie Lover's Salad, 11 oz"), (11.0, "oz", None))
        self.assertEqual(self.q("Mt. Olive Fresh Pack Whole Kosher Dills Pickles, 128 fl oz Jar"), (128.0, "fl oz", None))
        self.assertEqual(self.q("Equate Ibuprofen Tablets, 200 mg, 100 Count"), (100.0, "ct", None))
        self.assertEqual(self.q("Coca-Cola Soda, 12 x 12 fl oz Cans"), (12.0, "fl oz", 12))
        self.assertEqual(self.q("Lawry's Teriyaki Marinade - 12 fl oz"), (12.0, "fl oz", None))
        self.assertEqual(self.q("Dan-O's Original Seasoning - 3.5oz"), (3.5, "oz", None))
        self.assertEqual(self.q("Bananas, each"), (None, None, None))

    def test_count_beside_a_pack(self):
        # the count survives a stated pack; a stated total is never multiplied again
        self.assertEqual(self.q("(5 pack) (5 Pack) Miracle Tree Tea Organic Moringa, 16 Count"), (16.0, "ct", 5))
        self.assertEqual(self.q("Lipton Decaf Tea Bags Family Size, 24 ct (Pack of 6)"), (24.0, "ct", 6))
        self.assertEqual(self.q("Senseo Decaf Coffee Pods, 108 Count (6 Packs of 18 Pods)"), (108.0, "ct", None))
        self.assertEqual(self.q("Trident Gum, 9 Packs of 16 Pieces (144 Total Pieces)"), (144.0, "ct", None))
        self.assertEqual(self.q("GUM Soft-Picks, 90 Count (Pack of 3) 270 Total"), (90.0, "ct", 3))
        self.assertEqual(self.q("(6 pack) Equate Wipes, 40 Total Wipes"), (40.0, "ct", 6), "under a (6 pack) wrapper the total is per unit")
        self.assertEqual(self.q("Equate Tampons (20 Count)"), (20.0, "ct", None), "(20 Count) is not a pack of 20 as well")
        self.assertEqual(self.q("Colgate 360 Total Advanced Toothbrush - 2 Count"), (2.0, "ct", None))
        self.assertEqual(self.q("(0 pack) (12 Pack) Kedem Juice Grape, 22 Fz"), (22.0, "fl oz", 12), "(0 pack) is ignored")
        # the basic pass keeps the long-standing reading so a size field's weight still wins over "(12 Count)"
        self.assertEqual(N.parse_quantity("Powerful Greek Yogurt Protein Drink (12 Count)", extended=False), (None, None, 12))

    def test_count_nouns_dozen_and_word_numbers(self):
        self.assertEqual(self.q("Celestial Seasonings Peppermint, 20 Tea Bags"), (20.0, "ct", None))
        self.assertEqual(self.q("CLIF BAR Peanut Butter Banana, 12 Bars"), (12.0, "ct", None))
        self.assertEqual(self.q("Brooklyn Bean Breakfast Blend, 40 K-Cup Pods"), (40.0, "ct", None))
        self.assertEqual(self.q("Sunbeam Coffee Filters, 100 Each"), (100.0, "ct", None))
        self.assertEqual(self.q("Red Roses with Premium Greens, Two Dozen"), (24.0, "ct", None))
        self.assertEqual(self.q("Two Pounds Of Fresh Raw Walnuts"), (2.0, "lb", None))
        self.assertEqual(self.q("Fieldpack Fresh Stem Strawberries 1#"), (1.0, "lb", None))
        self.assertEqual(self.q("Covermark SPF 15 # 50 Beige, 1 oz"), (1.0, "oz", None), "a shade number is not pounds")
        self.assertEqual(self.q("Oakhurst Pumpkin Spice Eggnog, Quart"), (1.0, "qt", None))
        self.assertEqual(self.q("Swiss Premium Orange Blast Drink - 1 Half Gallon Jug"), (0.5, "gal", None))
        self.assertEqual(self.q("Bud Light Gift Bucket with Two Pint Glasses, 5.5 oz"), (5.5, "oz", None))
        self.assertEqual(N.parse_quantity("Celestial Seasonings Peppermint, 20 Tea Bags", extended=False), (None, None, None),
                         "count nouns are read only when no weight or volume is stated anywhere")

    def test_unit_abbreviations_fractions_and_shorthands(self):
        self.assertEqual(self.q("Kedem Juice Grape, 22 Fz"), (22.0, "fl oz", None))
        self.assertEqual(self.q("Gel Shwr White Tea, 16.9 Fo (pack Of 1)"), (16.9, "fl oz", 1))
        self.assertEqual(self.q("Orion Choco Chip Cookie, 104 Gm"), (104.0, "g", None))
        self.assertEqual(self.q("Pom Peach Passion White Tea 1.5lt"), (1.5, "l", None))
        self.assertEqual(self.q("Naturtint 7GM Chocolate Caramel Hair Color"), (None, None, None), "7GM is a shade")
        self.assertEqual(self.q("MISS CLAIROL 46 LT COOL"), (None, None, None), "46 LT is a shade")
        self.assertEqual(self.q("Stay Hard 1 1/2oz"), (1.5, "oz", None))
        self.assertEqual(self.q("Wilton Icing Tube, 4-1/4 ounces"), (4.25, "oz", None))
        self.assertEqual(self.q("RICA PEAR NECTAR 1/2 LT 500ml 18/1"), (0.5, "l", None))
        self.assertEqual(self.q("Orajel Kids Toothpaste 24/2oz"), (2.0, "oz", None), "N/size keeps the long-standing reading")
        self.assertEqual(self.q("Betty Crocker Complete Meals | 24. OZ"), (24.0, "oz", None))
        self.assertEqual(self.q("Sechler's Jalapeno Sweet Relish, 16 Fl O"), (16.0, "fl oz", None))
        self.assertEqual(self.q("Raisin Bran Rb 28.2ozx14 Bns Pk"), (28.2, "oz", None), "x14 is the supplier case; Walmart prices one box")
        self.assertEqual(self.q("LorAnn Oils Flavoring | 1 Fl Dram"), (0.125, "fl oz", None))
        self.assertEqual(self.q("11.5z Mh Dark Roast Can"), (11.5, "oz", None))
        self.assertEqual(N.parse_quantity("11.5z Mh Dark Roast Can", extended=False), (None, None, None))
        self.assertEqual(self.q("Nissan 350z by Nissan for Men"), (None, None, None))

    def test_sold_each_counts_as_sized_by_basis(self):
        def row(name, path, size=None):
            r, _ = N.normalize({"itemId": 9, "name": name, "salePrice": 1.0, "size": size, "upc": "078742054261", "categoryPath": path}, FOOD, CFG)
            return r
        for name, path, size in [("Red Grapefruit, each", "Home Page/Food/Fresh Produce/Fresh Fruit", None),
                                 ("Hass Avocado", "Home Page/Food/Fresh Produce/Fresh Fruit/Avocados", None),
                                 ("Louisiana Grills Sweet Heat Rub", "Home Page/Food/Pantry", "EA"),
                                 ("1/4 Marble Sheet Cake with Batman Kit", "Home Page/Food/Bakery & Bread/Cakes/Shop all cakes", None),
                                 ("Nostalgic Gift Basket", "Home Page/Food/Food Gifts/All Food Gifts", None),
                                 ("Polka Dot Number 7 Birthday Candle", "Home Page/Food/Baking/Baking Ingredients/Frosting, Toppings & Decorations", None),
                                 ("Farm Direct Bouquet of 12 Roses", "Home Page/Food/Flower Shop/All Flowers", None)]:
            r = row(name, path, size)
            self.assertIn("sold_each", r["flags"], name); self.assertIsNone(r["size"]); self.assertIsNone(r["unit_price"])
        for name, path in [("Louisiana Hot Sauce", "Home Page/Food/Pantry/Pantry meal essentials"),
                           ("Wilton Easter Clr Egg Sprinkl Mix", "Home Page/Food/Baking/Baking Ingredients/Frosting, Toppings & Decorations"),
                           ("Merchandise", "Home Page/Food/Pantry/Pantry meal essentials")]:
            self.assertNotIn("sold_each", row(name, path)["flags"], f"{name}: a packaged good with a missing size is a failure")

    def test_stated_weight_beats_a_piece_count(self):
        r, _ = N.normalize({"itemId": 5, "name": "Powerful Coconut Greek Yogurt Protein Drink (12 Count)", "size": "12 oz",
                            "salePrice": 24.0, "categoryPath": "Home Page/Food/Dairy"}, FOOD, CFG)
        self.assertEqual((r["size"], r["unit"], r["pack"]), (12.0, "oz", 12))
        r, _ = N.normalize({"itemId": 6, "name": "Haagen Dazs Chocolate Pint", "size": "14 fl oz", "salePrice": 5.0,
                            "categoryPath": "Home Page/Food/Frozen"}, FOOD, CFG)
        self.assertEqual((r["size"], r["unit"]), (14.0, "fl oz"), "the stated 14 fl oz beats the word Pint")

    def test_nutrient_grams_are_not_the_size(self):
        self.assertEqual(self.q("Ratio Granola Cereal, 18g Protein, 9.8 oz"), (9.8, "oz", None))
        self.assertEqual(self.q("Nalley Chili, 19g Protein Per Serving, 14 oz. Can"), (14.0, "oz", None))
        self.assertEqual(N.parse_quantity("Chomps Beef Sticks, 10g of Protein", extended=False), (None, None, None))
        self.assertEqual(self.q("Quest Bar 60g"), (60.0, "g", None))

    def test_pack_options_list_every_reading_the_name_supports(self):
        po = N.pack_options
        self.assertEqual(po("Pop-Tarts Frosted Strawberry, 58.6 oz, 32 Count"), [1, 32])
        self.assertEqual(po("Kikkoman Miso Soup, 1.05 oz, 3 Packets"), [1, 3])
        self.assertEqual(po("(24 Cans) Monster Rehab, 15.5 fl oz"), [1, 24])
        self.assertEqual(po("Famous Amos 2 oz Snack Pack, 36/Carton"), [1, 36])
        self.assertEqual(po("(3 pack) Pop-Ice, 1.5 Fl Oz, 80 Ct"), [1, 3, 80, 240])
        self.assertEqual(po("Hershey Topping Bettercream 15/12oz"), [1, 15])
        self.assertEqual(po("120pcspk Swdsh Fsh"), [1, 120])
        self.assertEqual(po("2.5oz Popcorn Kernel Packs, 24 Case"), [1, 24])
        self.assertEqual(po("Rhythm Kale Chips, 2 oz, (Pack of, 12)"), [1, 12])
        self.assertEqual(po("Niagara Water, 16.9 oz Bottle, 24/Pack, 2016/Pallet"), [1, 24, 2016])
        self.assertEqual(po("Del Monte Cut Green Beans, 14.5 oz Can"), [1])
        self.assertEqual(self.q("Klass Pineapple Drink, 0.26 Fl Oz, 36 Co"), (0.26, "fl oz", 36), "a count cut to 'Co'")

    def test_gtin(self):
        self.assertEqual(N.gtin14("078742054261")[0], "00078742054261")
        self.assertTrue(N.gtin14("078742054261")[2])
        key, retired, _ = N.gtin14("deleted_071279261027")
        self.assertTrue(retired); self.assertEqual(key, "00071279261027")
        self.assertEqual(N.gtin14("07874205426")[0], "00078742054261")  # 11 digits -> check digit added

    def test_junk(self):
        book = {"name": "Vinegars of the World, (Paperback)", "brandName": "Laura Solieri", "salePrice": 127.93, "categoryPath": "Home Page/Food/Pantry"}
        self.assertEqual(N.junk_reason(book, "Food", CFG), "media")
        cd = {"name": "Soul Sauce", "brandName": "UMGD", "salePrice": 34.47, "upc": "731452166821", "categoryPath": "Home Page/Food/Pantry"}
        self.assertEqual(N.junk_reason(cd, "Food", CFG), "media")
        authors = {"name": "Salad Dressings", "brandName": "Jessica Strand; Maren Caruso", "salePrice": 13.68, "categoryPath": "x"}
        self.assertEqual(N.junk_reason(authors, "Food", CFG), "media")
        third = {"name": "Whole Kernel Corn 15 oz", "sellerInfo": "Hayam Store", "salePrice": 10.99}
        self.assertEqual(N.junk_reason(third, "Food", CFG), "third_party_seller")
        beer = {"name": "Bud Light 12 pk", "salePrice": 12.0, "categoryPath": "Home Page/Food/Alcohol/Beer"}
        self.assertEqual(N.junk_reason(beer, "Food", CFG), "alcohol")
        ok = {"name": "Great Value Whole Kernel Sweet Corn, 29 oz Can", "brandName": "Great Value", "salePrice": 1.22, "upc": "078742054261", "sellerInfo": "Walmart.com"}
        self.assertIsNone(N.junk_reason(ok, "Food", CFG))

    def test_row(self):
        item = {"itemId": 1, "name": "(8 pack) Great Value Golden Sweet Whole Kernel Corn, 15.25 oz", "brandName": "Great Value",
                "size": "15 oz", "salePrice": 4.0, "upc": "464583029559", "categoryPath": "Home Page/Food/Pantry/Canned goods/Canned vegetables/Canned corn"}
        row, why = N.normalize(item, FOOD, CFG)
        self.assertIsNone(why)
        # a "(8 pack)" bundle listing is eight units of the can: the row is one can at 1/8 of the bundle's price (2026-10-19)
        self.assertEqual((row["size"], row["unit"], row["pack"], row["cat"]), (15.25, "oz", 1, "6"))
        self.assertEqual((row["name"], row["price"], row["listing_price"], row["listing_pack"]),
                         ("Great Value Golden Sweet Whole Kernel Corn, 15.25 oz", 0.5, 4.0, 8))
        self.assertIn("pack_listing", row["flags"])
        self.assertAlmostEqual(row["unit_price"], 0.5 / 15.25, places=4)
        self.assertTrue(row["store_brand"])
        row2, _ = N.normalize({"itemId": 2, "name": "Diet Mountain Dew Soda, 12 fl oz, 12 Pack Cans", "salePrice": 6.48,
                               "categoryPath": "Home Page/Food/Beverages/Soda"}, FOOD, CFG)
        self.assertIn("diet", row2["variants"]); self.assertEqual(row2["cat"], "10"); self.assertEqual(row2["pack"], 12)
        row3, _ = N.normalize({"itemId": 3, "name": "Marketside Bistro Blend Salad, 10 oz", "size": "23 oz", "salePrice": 4.17,
                               "categoryPath": "Home Page/Food/Fresh Produce/Packaged Salads"}, FOOD, CFG)
        self.assertEqual(row3["size"], 10.0); self.assertIn("size_conflict", row3["flags"])


class Decisions20261008(unittest.TestCase):
    """Decisions of 2026-10-08: per-unit prices only for consumables, placeholders barcode-only, store categories."""

    def item(self, name, **kw):
        it = {"itemId": 7, "name": name, "brandName": kw.pop("brand", "Great Value"), "salePrice": kw.pop("price", 2.0),
              "upc": kw.pop("upc", "078742054261"), "categoryPath": kw.pop("path", "Home Page/Food/Pantry/Canned goods")}
        it.update(kw)
        return it

    def test_durable_departments_get_no_unit_price(self):
        home = next(d for d in CFG["departments"] if d["name"] == "Home")
        row, _ = N.normalize(self.item("Mainstays 12 oz Ceramic Mug", path="Home Page/Home/Kitchen & Dining"), home, CFG)
        self.assertEqual((row["size"], row["unit"]), (12.0, "oz"), "the size is still shown")
        self.assertIsNone(row["unit_price"]); self.assertNotIn("pack_options", row)
        food, _ = N.normalize(self.item("Great Value Whole Kernel Corn, 15.25 oz"), FOOD, CFG)
        self.assertAlmostEqual(food["unit_price"], 2.0 / 15.25, places=4)

    def test_placeholder_is_kept_only_with_a_valid_barcode(self):
        row, why = N.normalize(self.item("Merchandise"), FOOD, CFG)
        self.assertIsNone(why); self.assertIn("placeholder", row["flags"])
        row, why = N.normalize(self.item("Merchandise", upc="078742054262"), FOOD, CFG)
        self.assertEqual(why, "placeholder_no_barcode")
        row, why = N.normalize(self.item("Merchandise", upc=None), FOOD, CFG)
        self.assertIsNone(row); self.assertIn(why, ("placeholder_no_barcode", "food_without_upc_or_size"))

    def test_discontinued_marker_is_cleaned_and_flagged(self):
        row, _ = N.normalize(self.item("***DISCONTINUED***Arrowhead Mills Flour White Unbleached, 5 lb"), FOOD, CFG)
        self.assertEqual(row["name"], "Arrowhead Mills Flour White Unbleached, 5 lb")
        self.assertIn("discontinued", row["flags"]); self.assertNotIn("placeholder", row["flags"])

    def test_store_category_and_its_evidence(self):
        row, _ = N.normalize(self.item("Brew Rite 8-12 Cup Basket Style Coffee Filters, 200 Ct",
                                       path="Home Page/Food/Coffee/Coffee Filters"), FOOD, CFG)
        self.assertEqual(row["cat"], "16")
        self.assertEqual(row["noun"][0], 16, "the evidence travels to process.build(), which removes it")

    def test_weight_ranges_and_load_ratings_are_not_sizes(self):
        self.assertEqual(N.parse_quantity("Gerber Starter Pack All-in-One Diaper with Insert Neutral L 22-37 lbs"), (None, None, None))
        self.assertEqual(N.parse_quantity("Invacare Sling Straps for Patient Lift Slings, 450 lb. Weight Capacity")[0], None)
        self.assertEqual(N.parse_quantity("Toddler Seat, Holds up to 30 lbs, 2 lb")[:2], (2.0, "lb"))
        self.assertEqual(N.parse_quantity("Coca-Cola 24-12 oz Cans"), (12.0, "oz", 24), "a pack written with a hyphen stays")

    def test_inner_counts_are_offered_to_pack_resolution(self):
        for name, n in (("KIND Bars Variety Pack, 1.4 oz, 12 Snack Bars", 12), ("Diedrich K-Cup, 0.31 Oz, Carton Of 24", 24),
                        ("Takis Mini, 25 Individual Snack Packs, 1.23 oz", 25), ("Umpqua Oats, 2.47 oz each, 8 Cups", 8),
                        ("Good Day 1.5 oz. Bar Soap (500-Piece/Carton)", 500), ("BF MAYO GARLIC 72P 1.2Z", 72),
                        ("Pamela's Oat Cranberry Almond Bars 7.05 oz (6x5 Ct)", 30), ("Mama Vermicelli, 55 g (Innerpack of 30)", 30)):
            self.assertIn(n, N.pack_options(name), name)

    def test_test_listings_and_store_displays_are_not_carried(self):
        for name, price, why in (("Signing Test 3178 Dummy Stress Test", 15.77, "test_listing"),
                                 ("14pc Delsym Pdq", 151.76, "store_display")):
            row, reason = N.normalize(self.item(name, price=price), FOOD, CFG)
            self.assertIsNone(row); self.assertEqual(reason, why, name)
        # a placeholder name on an internal (restricted-circulation 4-prefix) barcode is a test listing
        row, reason = N.normalize(self.item("Merchandise", upc="406727352130", price=2.27), FOOD, CFG)
        self.assertIsNone(row); self.assertEqual(reason, "test_listing")

    def test_other_placeholders_are_kept_for_barcode_lookup(self):
        for name in ("coming soon", "Merchandise", "Discontinued Item by supplier", "Protection Plan 3 Year", "SMARTnet"):
            row, reason = N.normalize(self.item(name, price=2.98), FOOD, CFG)
            self.assertIsNone(reason, name); self.assertIn("placeholder", row["flags"])
        row, _ = N.normalize(self.item("Great Value Corn, 15 oz", upc="406727352130"), FOOD, CFG)
        self.assertNotIn("placeholder", row["flags"], "a real product name on a 4-prefix barcode is a product")

    def test_a_consumable_priced_like_a_pallet_is_a_listing_error(self):
        pills = {"name": "Estomicina Anti - Diarrheal - Anti-diarreico 100 Caps (Pack of 1)", "salePrice": 1600.52, "upc": "078742054261",
                 "categoryPath": "Home Page/Health and Medicine/Digestive Health", "sellerInfo": "Walmart.com"}
        self.assertEqual(N.junk_reason(pills, "Health and Medicine", CFG), "consumable_over_cap")
        self.assertIsNone(N.junk_reason(dict(pills, salePrice=16.52), "Health and Medicine", CFG))

    def test_paper_basis_weight_is_not_a_size(self):
        row, _ = N.normalize(self.item("LUXPaper 8 1/2 x 11 Cardstock, 65 lb. Cream Parchment, 50/Pack", upc="078742054261"), FOOD, CFG)
        self.assertNotEqual((row["size"], row["unit"]), (65.0, "lb"))
        row, _ = N.normalize(self.item("Great Value Long Grain Rice, 20 lb", upc="078742054261"), FOOD, CFG)
        self.assertEqual((row["size"], row["unit"]), (20.0, "lb"))

    def test_apparel_found_under_food_is_not_carried(self):
        _, why = N.normalize(self.item("White Stag® Long Sleeve Ribbed Turtleneck", path="Home Page/Food/Fresh Food"), FOOD, CFG)
        self.assertEqual(why, "apparel")


class PackListings20261019(unittest.TestCase):
    """Decision of 2026-10-19: a "(N pack)" bundle listing is N units of the item, priced for all N."""

    def item(self, name, price, **kw):
        it = {"itemId": 7, "name": name, "brandName": kw.pop("brand", "Hefty"), "salePrice": price,
              "upc": kw.pop("upc", None), "categoryPath": kw.pop("path", "Home Page/Household Essentials/Paper & Plastic/Trash Bags")}
        it.update(kw)
        return it

    def test_pack_listing_reads_the_wrappers(self):
        self.assertEqual(N.pack_listing("(6 pack) Hefty Ultra Strong 13 Gallon Trash Bags, 40 Bags"), ("Hefty Ultra Strong 13 Gallon Trash Bags, 40 Bags", 6))
        self.assertEqual(N.pack_listing("(3 pack) (3 Pack) Hershey's Instant Pudding, 3.56 Oz"), ("Hershey's Instant Pudding, 3.56 Oz", 3), "a repeated wrapper counts once")
        self.assertEqual(N.pack_listing("(2 pack) (6 Pack) Crest Cavity Protection Toothpaste 6.4 oz."), ("Crest Cavity Protection Toothpaste 6.4 oz.", 6), "the largest count is the bundle")
        self.assertEqual(N.pack_listing("(0 pack) (17 Pack) Lay's Stax, 5.75 Oz"), ("Lay's Stax, 5.75 Oz", 17))
        self.assertEqual(N.pack_listing("(1 pack) Old El Paso Refried Beans, 16 oz Can"), ("Old El Paso Refried Beans, 16 oz Can", None), "(1 pack) is only stripped")
        self.assertEqual(N.pack_listing("(48 pk) Knorr Chicken Bouillon Cubes, 2.2 oz"), ("Knorr Chicken Bouillon Cubes, 2.2 oz", 48))
        self.assertEqual(N.pack_listing("(2-Pack) Mederma Advanced Scar Gel, 1.76 oz."), ("Mederma Advanced Scar Gel, 1.76 oz.", 2))
        self.assertEqual(N.pack_listing("Great Value Corn, 15.25 oz (6 pack)"), ("Great Value Corn, 15.25 oz (6 pack)", None), "only a leading wrapper is a bundle listing")
        self.assertEqual(N.pack_listing(""), ("", None))

    def test_a_bundle_listing_is_one_unit_at_a_share_of_its_price(self):
        hh = next(d for d in CFG["departments"] if d["name"] == "Household Essentials")
        row, why = N.normalize(self.item("(6 pack) Hefty Ultra Strong 13 Gallon Trash Bags, Tall Kitchen Trash Bags, Blackout, 40 Bags", 79.99), hh, CFG)
        self.assertIsNone(why)
        self.assertEqual(row["name"], "Hefty Ultra Strong 13 Gallon Trash Bags, Tall Kitchen Trash Bags, Blackout, 40 Bags")
        self.assertEqual((row["price"], row["listing_price"], row["listing_pack"]), (13.33, 79.99, 6))
        self.assertIn("pack_listing", row["flags"])
        self.assertEqual(row["pack"], 1, "the bundle count is never the row's pack")
        plain, _ = N.normalize(self.item("Hefty Ultra Strong 13 Gallon Trash Bags, 40 Bags", 10.52), hh, CFG)
        self.assertNotIn("pack_listing", plain["flags"]); self.assertNotIn("listing_price", plain)

    def test_the_caps_and_the_equipment_rule_judge_one_unit(self):
        toys = next(d for d in CFG["departments"] if d["name"] == "Toys")
        bundle = self.item("(12 pack) Play-Doh Modeling Compound, 4 oz Can", 150.0, brand="Play-Doh", upc="035000510099", path="Home Page/Toys/Arts & Crafts")
        row, why = N.normalize(bundle, toys, CFG)
        self.assertIsNone(why, "twelve cans at $12.50 each are under the durable cap, although the bundle is not")
        self.assertEqual(row["price"], 12.5)
        over = self.item("(2 pack) Giant Play Kitchen", 350.0, brand="Step2", upc="035000510099", path="Home Page/Toys/Pretend Play")
        self.assertEqual(N.normalize(over, toys, CFG)[1], "durable_over_cap", "a $175 unit is over the cap")
        health = next(d for d in CFG["departments"] if d["name"] == "Health and Medicine")
        chairs = self.item("(2 pack) Massage Chair Recliner", 180.0, brand="Acme", path="Home Page/Health and Medicine/Home Health Care")
        self.assertIsNone(N.normalize(chairs, health, CFG)[1], "a $90 unit is not large equipment (the rule starts at $100)")

    def test_a_placeholder_bundle_is_judged_on_its_unit_price(self):
        hh = next(d for d in CFG["departments"] if d["name"] == "Household Essentials")
        row, why = N.normalize(self.item("(12 pack) coming soon", 45.84, upc="078742054261"), hh, CFG)
        self.assertIsNone(why); self.assertIn("placeholder", row["flags"]); self.assertEqual(row["price"], 3.82)


if __name__ == "__main__":
    unittest.main()


class HygieneAndContainerCounts(unittest.TestCase):
    """Real listings from the 2026-10-09 crawl that were read wrong."""

    def test_a_container_count_beside_a_weight_is_the_pack(self):
        self.assertEqual(N.parse_quantity("Dove Gentle Exfoliating Beauty Bar, 3.75 oz, 6 Bar", extended=False), (3.75, "oz", 6))
        self.assertEqual(N.parse_quantity("StarKist Chunk Light Tuna in Water, 5 oz, 8 Cans", extended=False), (5.0, "oz", 8))

    def test_rolls_diapers_and_tablets_are_counts(self):
        for name, n in [("Charmin Ultra Soft Toilet Paper 24 Double Rolls", 24), ("Charmin Sensitive Bathroom Tissue, Unscented, 12 rolls", 12),
                        ("Parent's Choice Diapers, Size 3, 36 Diapers", 36), ("Equate Ibuprofen 200 mg, 100 Tablets", 100),
                        ("Bounty Paper Towels, 6 Triple Rolls", 6)]:
            self.assertEqual(N.parse_quantity(name)[:2], (float(n), "ct"), name)

    def test_a_count_read_as_the_size_is_not_also_a_pack(self):
        row, why = N.normalize({"itemId": 1, "upc": "037000978172", "name": "Charmin Ultra Soft Toilet Paper Mega Rolls, 12 count",
                              "salePrice": 17.01, "marketplace": False, "categoryPath": "Home Page/Household Essentials/Toilet Paper"},
                             next(d for d in CFG["departments"] if d["name"] == "Household Essentials"), CFG)
        self.assertIsNone(why)
        self.assertEqual((row["size"], row["unit"], row["pack"]), (12.0, "ct", 1))
        self.assertNotIn(12, row.get("pack_options") or [])


class UpcE(unittest.TestCase):
    def test_a_valid_upc_e_is_stored_as_its_upc_a(self):
        # the app's own test pair: UPC-E 11459709 -> UPC-A 011400000597... checked through the shared expansion
        a = N.upce_to_upca("11459709")
        self.assertEqual(len(a), 12)
        key, retired, ok = N.gtin14("11459709")
        self.assertTrue(ok); self.assertEqual(key, a.zfill(14))

    def test_an_eight_digit_code_that_is_not_a_valid_upc_e_stays_as_it_is(self):
        key, _, _ = N.gtin14("11459708")
        self.assertEqual(key, "00000011459708")
        key, _, _ = N.gtin14("40170725")              # EAN-8 (number system 4): never expanded
        self.assertEqual(key, "00000040170725")


class Decisions20261012(unittest.TestCase):
    """Decision of 2026-10-12 (issue #18): the durable scope is sized to the proven pack. Durable departments keep only
    listings with a barcode priced at or under durable_rules.max_price; the departments a food bank rarely receives
    leave the crawl and Home Improvement narrows to Emergency Prep and Water Purification."""

    def item(self, name, **kw):
        it = {"itemId": 7, "name": name, "brandName": kw.pop("brand", "Mainstays"), "salePrice": kw.pop("price", 12.0),
              "upc": kw.pop("upc", "681131001199"), "categoryPath": kw.pop("path", "Home Page/Toys/Building Sets")}
        it.update(kw)
        return it

    def test_durable_rows_need_a_barcode_and_a_price_under_the_cap(self):
        toys = next(d for d in CFG["departments"] if d["name"] == "Toys")
        cap = CFG["durable_rules"]["max_price"]
        self.assertEqual(cap, 100); self.assertTrue(CFG["durable_rules"]["barcode_required"])
        row, why = N.normalize(self.item("Lego Classic Bricks Set, 484 Pieces", price=cap), toys, CFG)
        self.assertIsNone(why); self.assertEqual(row["price"], float(cap))
        _, why = N.normalize(self.item("Power Wheels Ride-On Truck", price=cap + 0.01), toys, CFG)
        self.assertEqual(why, "durable_over_cap")
        _, why = N.normalize(self.item("Lego Classic Bricks Set, 484 Pieces", upc=None), toys, CFG)
        self.assertEqual(why, "durable_without_upc")
        _, why = N.normalize(self.item("Lego Classic Bricks Set, 484 Pieces", upc="deleted_681131001199"), toys, CFG)
        self.assertIsNone(why, "a retired barcode is still a barcode: donors give old stock")

    def test_consumable_departments_are_not_capped(self):
        row, why = N.normalize(self.item("Similac Pro-Advance Infant Formula, 30.8 oz, Case of 4",
                                         path="Home Page/Food/Baby Food", price=180.0), FOOD, CFG)
        self.assertIsNone(why); self.assertEqual(row["price"], 180.0)
        self.assertIsNone(N.junk_reason(self.item("Anything", upc=None, price=500.0), "Pets", CFG, consumable=True))

    def test_crawl_scope_of_the_decision(self):
        names = {d["name"] for d in CFG["departments"]}
        for gone in ("Jewelry", "Cell Phones", "Electronics", "Sports & Outdoors", "Patio & Garden", "Arts Crafts & Sewing"):
            self.assertNotIn(gone, names); self.assertIn(gone, CFG["not_crawled"].values())
        for kept in ("Toys", "Office Supplies", "Party & Occasions", "Seasonal", "Home", "Home Improvement"):
            self.assertIn(kept, names)
        hi = next(d for d in CFG["departments"] if d["name"] == "Home Improvement")
        self.assertEqual([u["name"] for u in hi["split"]], ["Emergency Prep", "Water Purification"])
        self.assertEqual(len(next(d for d in CFG["departments"] if d["name"] == "Home")["split"]), 5)
        sentinels = json.loads((Path(__file__).resolve().parent.parent / "data" / "sentinels.json").read_text())["sentinels"]
        self.assertEqual(len(sentinels), 114)
        self.assertFalse(any("rain-x" in s["q"] for s in sentinels), "the Auto & Tires sentinel left with its department")
        self.assertFalse(any("onn" in s["q"] for s in sentinels), "the Electronics sentinel left with its department")
