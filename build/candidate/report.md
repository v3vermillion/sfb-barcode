# Snapshot report — 20261020-172046-refresh

Status: **ready** (all gates passed)
Checked: 2026-10-21T16:58:12+00:00  |  config hash: ddffa24e9d95

## Gates
- PASS category_counts — value 0.3929, threshold 0.4: largest category change 39.3% (categories with >= 200 published rows)
- PASS departments_complete — value 0, threshold 0.3: 7 departments checked; sizing used
- PASS item_count — value 1.004, threshold 0.9: 2359474 items vs 2566573 published (100.4%, 234230 published rows left by rule: 140909 bundle listings, 93321 above the price ceiling or under an excluded path, against 18807 bundle units kept)
- PASS live_match — value 0.9203, threshold 0.9: 277/301 within 5% (92.0%; exact 265, 88.0%) of the rows Walmart still lists; no longer listed: 19 of 320 (5.9%, not counted as wrong); consumable 94.4% of 198, durable 87.4% of 103; 16 calls; stopped early: RuntimeError: HTTP 400 for /items?ids=536238412,669372501,896222347,6026870695,561547009,17092161329,1195141652,16671415,16899207413,19122759848,255305722,18910403447,13622257576,25462481,17234360830,16862401328,36
- PASS price_drift — value 0.00115, threshold 0.02: 2721 of 2359474 prices moved more than 50% (0.11%)
- PASS sample_review — value 0.0333, threshold 0.05: junk 20/600 (3.3%), 95% lower bound 2.3% vs 5.0% target, hard cap 10%, systematic junk: no, 20 examples, 2 batches, model claude-sonnet-5-5: ok; notes: No systematic junk class. The sample has a few isolated bad rows: a spam name, a placeholder, a wholesale case, and about five size misparses (an 'L'/'lb' or weight value read as a volume or weight). Category mislabels are the more frequent problem: bobble heads as Beverages, kitchen and bath items as Lawn/Personal Care/Frozen, and a few food items in the wrong food category. | Junk is scattered s
- PASS sentinels — value 0, threshold 0: 114/114 found and priced
- PASS size_parse — value 0.9253, threshold 0.92: 212181/229316 Food rows sized (92.5%): 207682 with a parsed size, 8 sold by the pound, 4491 sold each
- PASS unit_outliers — value 0.02372, threshold -: measure-only: 12026 of 506915 unit-priced rows outside [median/10, median*10] of their category+unit group (2.37%); their per-unit prices are dropped and the rows flagged unit_price_suspect

## Totals
- items kept: 2359474  |  UPCs: 2248350  |  carried over: 1614710
- UPCs with conflicting prices (>1.5x): 6786

## Kept by department
- Home: 746382 kept of carried raw
- Toys: 313486 kept of 514387 raw
- Food: 233020 kept of carried raw
- Office Supplies: 177807 kept of carried raw
- Beauty: 177638 kept of 205745 raw
- Party & Occasions: 148697 kept of carried raw
- Pets: 148236 kept of carried raw
- Health and Medicine: 134506 kept of 171450 raw
- Baby: 95467 kept of 179776 raw
- Household Essentials: 61412 kept of 76462 raw
- Personal Care: 61083 kept of carried raw
- Premium Beauty: 49017 kept of 54795 raw
- Home Improvement: 8071 kept of carried raw
- Seasonal: 4641 kept of 6315 raw
- Pharmacy: 11 kept of carried raw

## Rejects by reason
- multipack_listing: 122030
- durable_over_cap: 75183
- excluded_category: 62700
- durable_without_upc: 59301
- no_price: 54018
- media: 24206
- apparel: 19655
- consumable_over_cap: 17772
- marketplace: 15126
- footwear: 3768
- commercial_lot: 3304
- auto_part: 2816
- large_equipment: 1290
- store_display: 936
- tobacco: 584
- test_listing: 564
- no_name: 349
- placeholder_no_barcode: 270
- alcohol: 184
- placeholder_price: 55
- pet_bed: 52
- duplicate: 3

## Flags
- carried_over: 1523307
- no_size: 1385726
- store_price: 33664
- sold_each: 27592
- unit_price_suspect: 21059
- placeholder: 19401
- pack_listing: 18807
- size_conflict: 16387
- retired_upc: 11871
- pack_resolved: 10238
- discontinued: 6237
- price_withheld: 5136
- pack_truncated: 3102
- family_price: 2030
- name_filled: 443
- promo_price: 412
- upc_check_digit: 108
- kept_normal_price: 91

## Plausible price range by department (outside it the price is withheld)

| department | low | high | 99th percentile |
|---|---|---|---|
| Baby | $0.10 | $645.00 | $129.00 |
| Beauty | $0.10 | $570.00 | $114.00 |
| Food | $0.10 | $500.00 | $106.29 |
| Health and Medicine | $0.10 | $659.50 | $131.90 |
| Home | $0.10 | $478.20 | $95.64 |
| Home Improvement | $0.10 | $485.00 | $97.00 |
| Household Essentials | $0.10 | $500.00 | $113.73 |
| Office Supplies | $0.10 | $484.70 | $96.94 |
| Party & Occasions | $0.10 | $439.05 | $87.81 |
| Personal Care | $0.10 | $985.00 | $197.00 |
| Pets | $0.10 | $1,939.30 | $387.86 |
| Pharmacy | $0.10 | $20.00 | $4.00 |
| Premium Beauty | $0.10 | $675.00 | $135.00 |
| Seasonal | $0.10 | $384.95 | $76.99 |
| Toys | $0.10 | $489.95 | $97.99 |

## Withheld prices (5136): valued at an equivalent instead

| department | item | Walmart price | why | valued at | how |
|---|---|---|---|---|---|
| Baby | 797874708 1x SILICONE ORTHODONTIC DESIGN SOOTHER 0+ M / TIGER & STORAGE BOX | $149.99 | far above the same kind of item | $19.99 | comparable item: 1x SILICONE ORTHODONTIC DESIGN SOOTHER 6+ M / TIGE |
| Baby | 55141950 Baby Brezza One Step 2-in-1 Steamer & Blender Baby Food Maker with 3 P | $149.97 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 110304378 Beaba Babycook Baby Food Maker | $149.95 | far above the same kind of item | $21.95 | comparable item: BEABA Multiportions Silicone Baby Food Freezer Tra |
| Baby | 717895771 BEABA Babycook® Solo Baby Food Maker, Baby Food Blender, Baby Steamer, | $149.95 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 54304019 Doctor-approved, PURE SAFETY Crib Liners in Certified Organic Ivory Co | $149.06 | far above the same kind of item | $3.53 | median price of the same kind of item |
| Baby | 56201815 DaVinci Universal Wide Removable Changing Tray (M0619) Espresso | $149.00 | far above the same kind of item | $79.00 | comparable item: DaVinci Universal Removable Changing Tray (M0219) |
| Baby | 454002897 DaVinci Universal Wide Removable Changing Tray in Natural | $149.00 | far above the same kind of item | $79.00 | comparable item: DaVinci Universal Removable Changing Tray (M0219) |
| Baby | 5031462026 Carrot Teether Sidek | $148.80 | far above the same kind of item | $98.00 | comparable item: INF Carrot Teether S |
| Baby | 53994479 Bambino Mio Miosoft Birth to Potty Pack, (Choose Your Pattern) | $146.99 | far above the same kind of item | $120.22 | comparable item: Bambino Mio Miosoft Birth to Potty Pack, (Choose Y |
| Baby | 360408808 1x SILICONE ORTHODONTIC DESIGN SOOTHER 6+ M / ELEPHANT & STORAGE BOX | $144.99 | far above the same kind of item | $39.99 | comparable item: 1x SILICONE ORTHODONTIC DESIGN SOOTHER 12+ M / TIG |
| Baby | 898963299 1x SILICONE ORTHODONTIC DESIGN SOOTHER 6+ M / OWL & STORAGE BOX | $144.99 | far above the same kind of item | $27.99 | comparable item: 1x SILICONE ORTHODONTIC DESIGN SOOTHER 12+ M / OWL |
| Baby | 47682335 6V Battery Operated Motorbike, Pink | $139.99 | far above the same kind of item | $16.78 | comparable item: Conair Battery-Operated Fabric Shaver, Pink |
| Baby | 16068558437 Beech-Nut Snacks Shi | $139.00 | far above the same kind of item | $8.13 | median price of the same kind of item |
| Baby | 5170438289 DaVinci 6-Drawer Child Dresser, Pine Fog Gray | $136.95 | far above the same kind of item | $10.31 | median price of the same kind of item |
| Baby | 14323442 DaVinci Baby Jenny Lind Changing Table with 1" Waterproof Pad, Rich Ch | $135.00 | far above the same kind of item | $10.31 | median price of the same kind of item |
| Baby | 417129072 DaVinci Full-Size Bed Conversion Kit for Autumn Crib and Changer Combo | $132.89 | far above the same kind of item | $99.00 | comparable item: DaVinci Twin/Full-Size Bed Conversion Kit (M5789)  |
| Baby | 2506426861 Munchkin® Miracle® 360° Spoutless Tie Dye Sippy Cup, Blue/Green, Unise | $132.84 | far above the same kind of item | $6.47 | comparable item: Munchkin® Miracle® 360° Spoutless Tie Dye Sippy Cu |
| Baby | 877487929 Ride On Tractor and Trailer Battery Powered Vehicle by Lil’ Rider (Red | $131.89 | far above the same kind of item | $74.72 | comparable item: Ride-On Toy ATV –Battery Operated Electric by Lil’ |
| Baby | 17772043 Baby Chef by Kids Line Ultimate Baby Food Center | $130.00 | far above the same kind of item | $36.20 | comparable item: Baby Chef by Kids Line Six-Bottle Sanitizing Steam |
| Baby | 54382954 Bacati Emma Aztec Coral/mint/navy 10-pie | $129.99 | far above the same kind of item | $5.94 | median price of the same kind of item |
| Baby | 310227191 Babymoov Duo Meal Lite 4-in-1 multi-purpose baby food processor | $129.99 | far above the same kind of item | $49.99 | comparable item: Babymoov Duo Meal Lite Food Maker - 4 in 1 Food Pr |
| Baby | 54084683 DaVinci Universal Wide Removable Changing Tray (M0619) grey | $129.00 | far above the same kind of item | $79.00 | comparable item: DaVinci Universal Removable Changing Tray (M0219) |
| Baby | 237253212 DaVinci Twin Size Conversion Kit for Charlie Mini Combo in White | $129.00 | far above the same kind of item | $79.00 | comparable item: DaVinci Toddler Bed Conversion Kit for Dakota Crib |
| Baby | 373060210 DaVinci Hidden Hardware Twin/Full-Size Bed Conversion Kit (M5789) in C | $129.00 | far above the same kind of item | $99.00 | comparable item: DaVinci Hidden Hardware Twin/Full-Size Bed Convers |
| Baby | 491562571 DaVinci Full Size Bed Conversion Kit for Piedmont Combo in Slate | $129.00 | far above the same kind of item | $89.00 | comparable item: DaVinci Toddler Bed Conversion Kit (M12599) in Sla |
| Baby | 766759606 DaVinci Full Size Bed Conversion Kit for Piedmont Combo in White | $129.00 | far above the same kind of item | $79.00 | comparable item: DaVinci Toddler Bed Conversion Kit (M12599) in Cot |
| Baby | 907745302 DaVinci Hidden Hardware Twin/Full-Size Bed Conversion Kit (M5789) in P | $129.00 | far above the same kind of item | $99.00 | comparable item: DaVinci Hidden Hardware Twin/Full-Size Bed Convers |
| Baby | 948797105 DaVinci Universal Wide Removable Changing Tray in Ebony | $129.00 | far above the same kind of item | $79.00 | comparable item: DaVinci Universal Removable Changing Tray (M0219) |
| Baby | 15939776 Similac Advance Powder Baby Formula With Iron, Has DHA & Lutein, 12.4- | $120.72 | far above the same item's other variants | $21.97 | comparable item: Similac Advance Powder Baby Formula With Iron, Has |
| Baby | 54306854 Doctor-approved, PURE SAFETY Crib Liners in Certified Organic Pink & W | $119.35 | far above the same kind of item | $3.53 | median price of the same kind of item |
| Baby | 2490896843 EVLA'S Baby Food Maker with 2 Steaming Cups, Steamer, Blender, Baby Fo | $119.12 | far above the same kind of item | $74.95 | comparable item: EVLA'S Baby Food Maker with 2 Steaming Cups, Steam |
| Baby | 50141359 DaVinci Hidden Hardware Twin-Full Size Bed Conversion Kit in Cherry | $119.00 | far above the same kind of item | $99.00 | comparable item: DaVinci Hidden Hardware Twin/Full-Size Bed Convers |
| Baby | 465247253 DaVinci Hiddern Hardware Twin/Full-Size Bed Conversion Kit (M5789) in  | $119.00 | far above the same kind of item | $99.00 | comparable item: DaVinci Hidden Hardware Twin/Full-Size Bed Convers |
| Baby | 786926183 BEABA Babycook 4-in-1 Baby Food Maker, Neon | $119.00 | far above the same kind of item | $59.95 | comparable item: Beaba Baby Milk Bottle Warmer - Neon |
| Baby | 54430597 Pure Bliss Toddler Drink Non-gmo 31.8oz | $118.98 | far above the same kind of item | $13.71 | comparable item: Parent's Choice Non-Gmo Toddler Drink, Powder, 4 P |
| Baby | 908916507 Gerber Natura Organic | $113.00 | far above the same kind of item | $23.24 | comparable item: Gerber Natura Organic Infant Formula, Stage 3, 23. |
| Baby | 17387095 DaVinci Futura Cradle | $112.00 | far above the same kind of item | $10.31 | median price of the same kind of item |
| Baby | 17387096 DaVinci Futura Cradle | $112.00 | far above the same kind of item | $10.31 | median price of the same kind of item |
| Baby | 17387143 DaVinci Futura Cradle, Espresso | $112.00 | far above the same kind of item | $10.31 | median price of the same kind of item |
| Baby | 298885595 Gerber Good Start, Toddler Probiotic, Grow, 30 single serve packets (P | $110.99 | far above the same kind of item | $9.27 | median price of the same kind of item |
| Baby | 140313590 The Great American Hanger Company Rounded Wooden Kids Hanger with Natu | $110.00 | far above the same kind of item | $46.00 | comparable item: The Great American Hanger Company Rounded Wooden K |
| Baby | 54716934 PURE SAFETY Vertical Liners in Orange & Aqua Reversible Cotton, Choose | $106.60 | far above the same kind of item | $3.53 | median price of the same kind of item |
| Baby | 21094289 Gerber Good Start Nourish22 Powder Canis | $103.65 | far above the same kind of item | $16.44 | comparable item: Gerber Good Start Nourish Powder 12.6 Oz |
| Baby | 29445023 Baby Food Making And Storage Kit - The Let's Get Started Package With  | $99.99 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 42511051 Babymoov Nutribaby - 5 in 1 Baby Food Maker with Steam Cooker, Blend & | $99.99 | far above the same kind of item | $49.99 | comparable item: Babymoov Duo Meal Lite Food Maker - 4 in 1 Food Pr |
| Baby | 44299503 Babymoov Nutribaby - 5 in 1 Baby Food Maker with Steam Cooker, Blend & | $99.99 | far above the same kind of item | $49.99 | comparable item: Babymoov Duo Meal Lite Food Maker - 4 in 1 Food Pr |
| Baby | 185998926 Babymoov Nutribaby - 5 in 1 Baby Food Maker with Steam Cooker, Blend & | $99.99 | far above the same kind of item | $49.99 | comparable item: Babymoov Duo Meal Lite Food Maker - 4 in 1 Food Pr |
| Baby | 20449611 Annabel Karmel FreshFoods Cook-n-Blend Baby Food Maker | $99.97 | far above the same kind of item | $51.18 | comparable item: NUK Freshfoods NUK Smoothie and Baby Food Maker |
| Baby | 149378215 BEABA Babycook® Original Baby Food Maker, Baby Food Steamer, Baby Blen | $99.95 | far above the same kind of item | $26.92 | comparable item: BEABA Clip Peacock Containers Snacks and Baby Food |
| Baby | 880596801 [$5 Savings] Baby brezza 2-in-1 baby food maker, glass, with Free $5 G | $99.04 | far above the same kind of item | $20.00 | comparable item: [$20 Savings] Baby brezza baby bottle and baby foo |
| Baby | 23900326 Sage Spoonfuls On-the-go Baby Food Makin | $98.86 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 614747832 [$20 Savings] Baby brezza deluxe 2-in-1 baby food maker with Free $20  | $96.96 | far above the same kind of item | $20.00 | comparable item: [$20 Savings] Baby brezza baby bottle and baby foo |
| Baby | 805903190 Baby Food Maker Bundle with Reusable Baby Food Pouches | $95.20 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 432189582 EVLA'S Baby Food Maker, Steamer, Blender, Baby Food Processor, Touch S | $94.99 | far above the same kind of item | $74.95 | comparable item: EVLA'S Baby Food Maker with 2 Steaming Cups, Steam |
| Baby | 1827359079 BLACK+DECKER BDXFMB82 Baby Food Maker with All-in-One Functions | $89.99 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 33289425 Annabel Karmel FreshFoods Baby Food Maker with Bonus Mash & Serve Bowl | $89.97 | far above the same kind of item | $10.97 | comparable item: Annabel Karmel FreshFoods Freezer Tray with Mash & |
| Baby | 956433254 EVLA'S Baby Food Maker, Steamer, Blender, Baby Food Processor, Touch S | $89.95 | far above the same kind of item | $74.95 | comparable item: EVLA'S Baby Food Maker with 2 Steaming Cups, Steam |
| Baby | 984536637 EVLA’s Baby Food Maker with Touch Screen and 6 Reusable Pouches, White | $89.95 | far above the same kind of item | $74.95 | comparable item: EVLA'S Baby Food Maker with 2 Steaming Cups, Steam |
| Baby | 1353700038 EVLA’s Baby Food Maker with Reusable Pouches, Dark Gray | $89.95 | far above the same kind of item | $7.56 | median price of the same kind of item |
| Baby | 391073859 Way To Celebrate Valentine's Day XXL Sitting 6-foot Cream Bear | $89.00 | far above the same kind of item | $8.56 | median price of the same kind of item |
| Baby | 37076945 Ti Amo Dressing Station, Onyx | $88.42 | far above the same kind of item | $6.39 | median price of the same kind of item |
| Baby | 1781330922 EVLA’s Baby Food Maker with Touch Screen and 6 Reusable Pouches, Peach | $84.95 | far above the same kind of item | $74.95 | comparable item: EVLA'S Baby Food Maker with 2 Steaming Cups, Steam |
| Baby | 164430547 Pick Strips r Teeth Cleaning Baby Oral 5 Minute Speed ning Gel Teeth P | $77.37 | far above the same kind of item | $58.04 | comparable item: Teeth ning 5000 Toothbrush Braces Removal Tooth Cl |
| Baby | 173241819 Cavity Filler for Teeth ning Gel Toothpaste Toothpaste Topper Fluoride | $77.37 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Baby | 204003170 Toddler Toothpaste Age 2-4 No Fluoride Deep Cleaning Teeth s Teeth nin | $77.37 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Baby | 272400081 PediaSure Grow & Gain Shake Mix Powder, Vanilla, 14.1 oz Can, 48 Servi | $74.98 | far above the same item's other variants | $13.97 | comparable item: PediaSure Grow & Gain Shake Mix Powder, Vanilla, 1 |
| Baby | 576964786 PediaSure Grow & Gain Shake Mix Powder, Chocolate, 14.1 oz Can, 48 Ser | $54.98 | far above the same item's other variants | $13.97 | comparable item: PediaSure Grow & Gain Shake Mix Powder, Chocolate, |
| Baby | 701753477 PediaSure Grow & Gain Shake Mix Powder, Strawberry, 14.1 oz Can, 48 Se | $54.98 | far above the same item's other variants | $28.97 | comparable item: PediaSure Grow & Gain Shake Mix Powder, Strawberry |
| Baby | 50033705 Pedialyte Cherry Electrolyte Powder, 0.6 oz, 6 count, (Pack of 6) | $54.88 | far above the same item's other variants | $9.31 | comparable item: Pedialyte Sparkling Rush Electrolyte Powder, Cherr |
| Baby | 55368254 Eco by Naty Clean Potty, Made of Sugarcane and Includes 10 Flushable L | $49.99 | far above the same kind of item | $27.50 | comparable item: Baby Patent Clean Flush Potty with 30 Flushable Li |
| Baby | 10773733 Playtex Baby Nurser Bottle Gift Set, with Disposable Drop-Ins Liners | $44.99 | far above the same kind of item | $3.53 | median price of the same kind of item |
| Baby | 851001773 Foundations Non-Waterproof Changing Station Liners, Disposable 2-Ply,  | $39.80 | far above the same kind of item | $26.59 | comparable item: Foundations Waterproof Changing Station Liners, Di |
| Baby | 9521703387 Johnson’s Baby Bedtime Routine Set: Bath, Shampoo, & Baby Lotion, 3 It | $24.74 | far above the same item's other variants | $7.62 | comparable item: Johnson & Johnson Johnson's Bedtime Baby Bath, 28  |
| Baby | 426393034 Munchkin® Nibbles & Giggles Toddler Gift Set, Includes 360° Sippy Cup  | $20.60 | far above the same item's other variants | $12.77 | comparable item: Munchkin® Snack+™ Stainless Steel Toddler Snack Ca |
| Baby | 6795724803 Plum Organics Stage 2 Organic Baby Food, Zucchini, Pea, and Kale with  | $18.81 | far above the same item's other variants | $1.36 | comparable item: Plum Organics Organic Stage 2 Baby Food, Banana Zu |
| Baby | 36372303 Plum Organics Organic Baby Food, Stage 2, Apple & Carrot, 4 Oz | $17.93 | far above the same item's other variants | $1.48 | comparable item: Plum Organics Stage 2 Organic Baby Food Pouches: A |
| Baby | 186220947 Munchkin® Nibbles & Giggles Toddler Gift Set, Includes 10 oz Miracle®  | $16.91 | far above the same item's other variants | $6.56 | comparable item: Munchkin® Miracle® 360° Toddler Sippy Cup, 10 oz,  |
| Baby | 639488141 Munchkin® Miracle® 360° Stainless Steel Toddler Sippy Cup, 10 oz, Purp | $16.31 | far above the same item's other variants | $6.05 | comparable item: Munchkin® Miracle® 360° Toddler Sippy Cup, 14 oz,  |
| Baby | 257618507 Johnson's First Touch Baby Gift Set with Baby Lotion, Diaper Cream and | $15.99 | far above the same item's other variants | $10.19 | comparable item: Johnson's Baby First Touch Gift Set, 3 Items |
| Baby | 55273745 Munchkin® Miracle® 360° Stainless Steel Toddler Sippy Cup, 10 oz, Blue | $15.75 | far above the same item's other variants | $6.05 | comparable item: Munchkin Miracle 360° Toddler Sippy Cup, Unisex, 1 |
| Baby | 55273746 Munchkin® Miracle® 360° Stainless Steel Toddler Sippy Cup, 10 oz, Gree | $15.75 | far above the same item's other variants | $6.05 | comparable item: Munchkin® Miracle® 360° Toddler Sippy Cup, 14 oz,  |
| Baby | 55273747 Munchkin® Miracle® 360° Stainless Steel Toddler Sippy Cup, 10 oz, Pink | $15.75 | far above the same item's other variants | $6.05 | comparable item: Munchkin Miracle 360 Toddler Sippy Cup 14 oz Pink  |
| Baby | 47760192 Gerber 3rd Foods Chicken Itty-bitty Nood | $13.83 | far above the same item's other variants | $4.13 | comparable item: Gerber 3rd Foods Herb Chicken Dinner |
| Baby | 20449574 Gerber Nuk Trendline 5-oz Learner Cups, Bpa-fre | $13.62 | far above the same item's other variants | $13.38 | comparable item: Gerber Nuk Trendline 5-oz Learner Cups, Bpa-fre |
| Baby | 20449580 Gerber Nuk Trendline 5-oz Learner Cups, Bpa-fre | $13.62 | far above the same item's other variants | $13.38 | comparable item: Gerber Nuk Trendline 5-oz Learner Cups, Bpa-fre |
| Baby | 47760193 Gerber 3rd Foods Roasted Vegetable & Chi | $12.01 | far above the same item's other variants | $2.29 | median per-unit price of comparable items |
| Baby | 47760195 Gerber 3rd Foods Herbed Vegetable, Pasta | $12.01 | far above the same item's other variants | $2.29 | median per-unit price of comparable items |
| Baby | 139819227 Plum Organcics Organic Baby Food, Stage 3, Chickpea, Tomato with Beef  | $9.88 | far above the same item's other variants | $1.69 | comparable item: Plum Organics Stage 2 Organic Baby Food Pouches: P |
| Baby | 47760196 Gerber 3rd Foods Autumn Vegetable & Turk | $9.68 | far above the same item's other variants | $2.29 | median per-unit price of comparable items |
| Baby | 20449581 Gerber Nuk Trendline 5-oz Learner Cups, Bpa-fre | $9.32 | far above the same item's other variants | $13.38 | comparable item: Gerber Nuk Trendline 5-oz Learner Cups, Bpa-fre |
| Baby | 180765072 Plum Organics Organic Baby Food, Stage 2, Cherry, Sweet Corn & Greek Y | $8.40 | far above the same item's other variants | $2.21 | comparable item: Plum Organics Stage 2 Cherry, Sweet Corn & Greek Y |
| Baby | 168705970 Plum Organics Organic Baby Food, Stage 1, Just Peaches, 3.5 Oz | $6.60 | far above the same item's other variants | $1.48 | comparable item: Plum Organics® Just® Peaches Stage 1 Organic Baby  |
| Baby | 409609229 Beech-Nut Naturals Stage 2, Apple Yogurt Cinnamon & Oat Baby Food, 3.5 | $5.28 | far above the same item's other variants | $2.62 | comparable item: Beech-Nut Naturals Superblends Stage 3 Baby Food,  |
| Baby | 50733145 Beech-Nut Naturals Just Bananas Stage 2 Baby Food, 4 oz | $5.06 | far above the same item's other variants | $1.26 | comparable item: Beech-Nut Naturals Just Bananas Stage 2 Baby Food, |
| Baby | 34118469 Plum Organics Stage 2 Organic Baby Food Pouch: Pear, Green Bean, Greek | $4.32 | far above the same item's other variants | $1.56 | comparable item: Plum Organics Stage 2, Green Bean Pear & Greek Yog |
| Baby | 211375888 Beech-Nut Naturals Immune Support Stage 4 Baby Food, Pear Kale & Orang | $4.29 | far above the same item's other variants | $1.28 | comparable item: Beech-Nut Naturals Immune Support Stage 4 Baby Foo |
| Baby | 426015721 Beech-Nut Naturals Immune Support Stage 4 Baby Food, Apple Blueberry & | $4.27 | far above the same item's other variants | $1.28 | comparable item: Beech-Nut Naturals Immune Support Stage 4 Baby Foo |
| Baby | 216007926 Beech-Nut Naturals Immune Support Stage 4 Baby Food, Banana Pumpkin &  | $3.92 | far above the same item's other variants | $1.28 | comparable item: Beech-Nut Naturals Immune Support Stage 4 Baby Foo |
| Baby | 742639654 Beech-Nut Naturals Stage 2, Banana Blueberries & Avocado Baby Food, 3. | $3.86 | far above the same item's other variants | $1.22 | comparable item: Beech-Nut Naturals Stage 2, Banana Blueberries & A |
| Baby | 862925200 Beech-Nut Harvest Dinners Stage 2, Chicken Apple & Carrot Baby Food, 4 | $3.71 | far above the same item's other variants | $2.42 | comparable item: Beech-Nut Harvest Dinners Stage 2, Chicken Apple & |
| Baby | 21179249 Beech-Nut Stage 2 1/2 Homestyle Textures Peas & Carrots Baby Food, 4 o | $3.41 | far above the same item's other variants | $1.67 | median per-unit price of comparable items |
| Baby | 707446662 Beech-Nut Harvest Dinners Stage 2, Chicken Pear & Zucchini Baby Food,  | $3.29 | far above the same item's other variants | $1.08 | comparable item: Beech-Nut Harvest Dinners Stage 2, Chicken Pear &  |
| Baby | 50893880 Beech-Nut Naturals Stage 2, Apple & Kale Baby Food, 4 oz Jar | $3.24 | far above the same item's other variants | $1.39 | comparable item: Beech-Nut Naturals Stage 2, Apple & Kale Baby Food |
| Baby | 193587652 Beech-Nut Fruities Stage 2 Baby Food, Apple Mango & Carrot, 3.5 oz Pou | $3.13 | far above the same item's other variants | $1.28 | comparable item: Beech-Nut Fruities Stage 2 Baby Food, Apple Mango  |
| Baby | 199067121 Beech-Nut Fruities Stage 2 Peach Apple & Banana Baby Food, 3.5 oz, She | $3.13 | far above the same item's other variants | $1.28 | comparable item: Beech-Nut Fruities Stage 2 Baby Food, Peach Apple  |
| Baby | 395706269 Neocate SyneoTM Infant, 14.1 oz / 400 g (Case of 4 cans) | $0.98 | far below comparable items | $62.81 | median per-unit price of comparable items |
| Baby | 24692629 Earth's Best Organic Stage 3, Pumpkin, Cranberry & Apple, 4.2 Ounce Po | $0.08 | below range | $3.22 | comparable item: Earth's Best Organic Stage 3 Baby Food, Pumpkin Cr |
| Baby | 335399630 Delta Display Silver Lining Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 336098812 Fisher Price Displayer - Fp Stow'ngo Travel Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 347795839 T-fal Rw Xcel 39 Stm Dsp | $0.01 | below range | $16.87 | median price of its category |
| Baby | 357069558 Delta Display Turtle Dove Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 418610432 Services Taxable Cvmp | $0.01 | below range | $16.87 | median price of its category |
| Baby | 426072706 Services Taxable Cvmp | $0.01 | below range | $16.87 | median price of its category |
| Baby | 474417677 Delta Display Pooh Bassinet | $0.01 | below range | $89.97 | comparable item: Delta Winnie The Pooh Rocking Bassinet |
| Baby | 481721192 Delta Display Star Glaze Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 490470317 Delta Display Royalton Bassinet | $0.01 | below range | $62.87 | comparable item: Delta Gliding Bassinet |
| Baby | 580029219 Graco DuoDiner DLX 6-in-1 Convertible Highchair, Kenton, 25 lbs | $0.01 | below range | $129.00 | comparable item: Graco - DuoDiner Highchair, Brunswick |
| Baby | 610905728 Services Non Taxable Cvmp | $0.01 | below range | $16.87 | median price of its category |
| Baby | 613124386 Delta Display Beauty Rest Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 669451083 Delta Bassinet Royalton Display | $0.01 | below range | $62.87 | comparable item: Delta Gliding Bassinet |
| Baby | 794759139 Services Non Taxable Cvmp | $0.01 | below range | $16.87 | median price of its category |
| Baby | 821806590 Haakaa Silicone Breast Pump Display | $0.01 | below range | $11.65 | comparable item: Haakaa Silicone Breast Pump 4 oz, 1 pk |
| Baby | 831550216 Graco Pack ‘n Play Playard Anywhere Dreamer, Marlo | $0.01 | below range | $129.00 | comparable item: Graco Pack 'n Play Playard Anywhere Dreamer Portab |
| Baby | 840273301 Delta Display Garden Gate Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 874842918 TIDAL Premium 4-Month FREE Trial, then $7.99/month - A Walmart Exclusi | $0.01 | below range | $16.87 | median price of its category |
| Baby | 911705862 Delta Display Falling Leave Bassinet | $0.01 | below range | $20.00 | median price of the same kind of item |
| Baby | 936284522 Comotomo 5oz 1pk Disp | $0.01 | below range | $6.07 | median per-unit price of comparable items |
| Baby | 976271340 Delta Display Peterrabbit Bassinet | $0.01 | below range | $62.87 | comparable item: Delta Gliding Bassinet |
| Baby | 1647202526 Cam 2 Dream Duo Dummy Unit - Mint (For Displays) | $0.01 | below range | $16.87 | median price of its category |
| Baby | 2262506362 Safety 1st 360 Degree Smart Baby Cam Monitor Display DNP | $0.01 | below range | $16.87 | median price of its category |
| Baby | 5022870899 Spectra S1 Plus Dummy | $0.01 | below range | $16.87 | median price of its category |
| Baby | 5023829165 Graco Made2Grow 5-in-1 High Chair for Infants and Toddlers, Terrazo, D | $0.01 | below range | $99.99 | comparable item: Graco Made2Grow 5-in-1 High Chair |
| Baby | 6267503564 Infantino Grow-with-Me 4-in-1 Convertible High Chair, 6-36 Months, Hus | $0.01 | below range | $63.44 | median price of the same kind of item |
| Baby | 7198609570 Baby Einstein Kick & Snooze 3-in-1 Foldable Playard with Bassinet and  | $0.01 | below range | $22.17 | median price of the same kind of item |
| Baby | 7204919338 Ingenuity Proper Positioner Create Up! Multi-Mode Folding High Chair - | $0.01 | below range | $139.99 | comparable item: Ingenuity Proper Positioner Create Up! Multi-Mode  |
| Baby | 7328867970 Baby Trend Simply Smart Playard with Fold Assist Technology - Shale Gr | $0.01 | below range | $125.00 | comparable item: Baby Trend Simply Smart 2.0 Nursery Center Playard |
| Baby | 7384266217 Little Partners® Grow ‘N Stow Folding Learning Tower® Display | $0.01 | below range | $16.87 | median price of its category |
| Baby | 7833409505 Ingenuity Trio Foldaway 6-in-1 Baby High Chair, 6 Ways to Use, 6M-5Y | $0.01 | below range | $99.99 | comparable item: Ingenuity Trio Foldaway 6-in-1 High Chair - Pink Q |
| Baby | 10141424565 DISPLAY Alpha Set 2025 v10 | $0.01 | below range | $16.87 | median price of its category |
| Baby | 16690701760 HUGGIES VERTICAL RACK V2 NC CUCUMBER | $0.01 | below range | $16.87 | median price of its category |
| Baby | 16745306619 HUGGIES VERTICAL RACK V2 NC SENSITIVE | $0.01 | below range | $16.87 | median price of its category |
| Baby | 16947762891 Maxi Cosi Swift Play Yard, Gray Display | $0.01 | below range | $16.87 | median price of its category |
| Beauty | 188672476 Mizuno Strong Oil Glove Conditioner Box | $150.00 | far above the same kind of item | $14.32 | median price of the same kind of item |
| Beauty | 11469162280 AG 8 MOD Blush - BM | $150.00 | far above the same kind of item | $11.37 | median price of the same kind of item |
| Beauty | 362971272 3.35" GLITTER LIP GLOSS, Case of 144 | $149.55 | far above the same kind of item | $73.50 | comparable item: MONKEY LIP GLOSS, Case of 24 |
| Beauty | 426131027 Prevasil Ultra Care Lip Balm with Lysine - Cold Sore & Fever Blister D | $149.13 | far above the same kind of item | $3.24 | median per-unit price of comparable items |
| Beauty | 19536454384 Shark Depuffi, Instant Hot + Cold Contrast Therapy Device, InstaChill  | $149.00 | far above the same kind of item | $11.86 | median price of the same kind of item |
| Beauty | 141065208 Curly Human Hair Extension 24"24"24" 3 Bundles Remy Hair | $148.99 | far above the same kind of item | $84.90 | comparable item: Unique Bargains Curly Human Hair Extension 12"14"1 |
| Beauty | 5150283426 Sharper Image® Revel Hair Multi-Styler 6-In-1, 6 Premium Airflow Attac | $148.60 | far above the same kind of item | $11.48 | median price of the same kind of item |
| Beauty | 800499234 R.BELG CHOCOLATE GALETS WHITE CREME | $148.27 | far above the same kind of item | $12.84 | median price of the same kind of item |
| Beauty | 127945631 Fine Thin Hair Products Uittey2 Hair Brush No More Frizz for Thin Hair | $148.11 | far above the same kind of item | $83.61 | comparable item: Fine Thin Hair Products Uittey2 Hair Brush No More |
| Beauty | 111504383 Tio Nacho Natural Lightening Shampoo with Royal Jelly and Chamomile 41 | $146.84 | far above the same kind of item | $43.35 | comparable item: Tio Nacho Natural Lightening Shampoo with Royal Je |
| Beauty | 374963602 Gelish Mini Professional Soak Off Gel Nail Polish Starter Kit with 17  | $145.25 | far above the same kind of item | $39.68 | comparable item: Gelish Soak-Off Mini Complete Basix Gel Nail Polis |
| Beauty | 49295402 Foundation Plexi Shield | $144.99 | far above the same kind of item | $14.09 | median price of the same kind of item |
| Beauty | 835456114 6 Pack - Conair Ceramic Ionic Styler 1875 Watt Hair Dryer 1 ea | $144.93 | far above the same kind of item | $29.99 | comparable item: Conair 1875 Watt Titanium Ceramic Hair Dryer 1 ea |
| Beauty | 344815255 Indian - Clip In Body Wave Hair Extensions 24" | $144.55 | far above the same kind of item | $84.78 | comparable item: Clip In Body Wave Hair Extensions 14" |
| Beauty | 248162164 New Stainless Steel 10 in 1 Manicure Pedicure Set With Leather Travel  | $144.00 | far above the same kind of item | $27.98 | comparable item: Professional Stainless Steel Manicure Pedicure Set |
| Beauty | 434405004 10 in 1 Stainless Steel Manicure Pedicure Set With Leather Travel Case | $144.00 | far above the same kind of item | $27.98 | comparable item: Professional Stainless Steel Manicure Pedicure Set |
| Beauty | 571191969 10 in 1 Stainless Steel Manicure Pedicure set With Leather Travel Case | $144.00 | far above the same kind of item | $27.98 | comparable item: Professional Stainless Steel Manicure Pedicure Set |
| Beauty | 814473858 10 in 1 Stainless Steel Manicure Pedicure Set With Leather Travel Case | $144.00 | far above the same kind of item | $27.98 | comparable item: Professional Stainless Steel Manicure Pedicure Set |
| Beauty | 732555297 Bath and Body Works Forever Red Fine Fragrance Mist 3 Oz | $143.68 | far above the same kind of item | $5.17 | comparable item: Bath & Body Works Forever Red Vanilla Rum Fine Fra |
| Beauty | 108273340 Unique Bargains Curly Human Hair Extension 222426 3 Bundles Remy Hair | $143.49 | far above the same kind of item | $84.90 | comparable item: Unique Bargains Curly Human Hair Extension 12"14"1 |
| Beauty | 514012501 Unique Bargains Loose Curly Human Hair Extension 24"24"24" 3 Bundles R | $143.41 | far above the same kind of item | $103.05 | comparable item: Unique Bargains Loose Curly Human Hair Extension 1 |
| Beauty | 709723072 Unique Bargains Loose Curly Human Hair Extension 22"24"26" 3 Bundles R | $143.41 | far above the same kind of item | $103.05 | comparable item: Unique Bargains Loose Curly Human Hair Extension 1 |
| Beauty | 571798707 Restonic 5" Low Profile Foundation, Full | $142.86 | far above the same kind of item | $14.09 | median price of the same kind of item |
| Beauty | 846747820 5.5" MAKE UP LIP GLOSS SET, Case of 48 | $141.36 | far above the same kind of item | $61.94 | comparable item: Make Up Beauty Set In Box 3 Assorted, Case of 24 |
| Beauty | 156226959 PF 12PC BUTTER CHEAT | $141.33 | far above the same kind of item | $11.17 | median price of the same kind of item |
| Beauty | 192132698 Pocket Bristle & Nylon Hair Brush, BN4, Dark Ruby | $140.00 | far above the same kind of item | $69.00 | comparable item: ($120 Value) Mason Pearson Pocket Bristle & Nylon  |
| Beauty | 168574151 Restorative Facial Cream with Shea Butter by Sisley for Unisex - 1.4 o | $139.99 | far above the same kind of item | $76.59 | comparable item: Self Tanning Hydrating Facial Skin Care by Sisley  |
| Beauty | 103336327 Concealer Dark Skin Vex Pro Foundation Wet Wild Concealer The Highligh | $139.97 | far above the same kind of item | $93.31 | comparable item: Concealer Dark Skin Vex Pro Foundation Wet Wild Co |
| Beauty | 105998881 Makeup Carrying for Teens Toiletries Bottles Organization And Storage  | $139.97 | far above the same kind of item | $99.79 | comparable item: Organizer for Makeup Brushes Big Travel Makeup Org |
| Beauty | 110154792 Make up Girls 10-12 Makeup Pencils Spray Makeup Chocolate Eyes Eyelid  | $139.97 | far above the same kind of item | $12.68 | median price of the same kind of item |
| Beauty | 110537396 Contouring Stick Organic Amazing Concealer Hide Concealer Be Bright Il | $139.97 | far above the same kind of item | $12.68 | median price of the same kind of item |
| Beauty | 110749503 Baby Elastic Hair Ties Smart Sleeper Toddler Scrunchies in Bulk Girl S | $139.97 | far above the same kind of item | $34.99 | comparable item: Clear Hair Rubber Bands Clear Small Hair Elastics  |
| Beauty | 125262616 Baby Suntan Lotion Spray Men's Face Wash for Oily Skin Hydrating Sunbl | $139.97 | far above the same kind of item | $10.32 | median price of the same kind of item |
| Beauty | 126362263 but Puff Individual Use Sponges Beauty Sponges on Deal Face Wash Gel P | $139.97 | far above the same kind of item | $10.79 | median price of the same kind of item |
| Beauty | 129089036 Infallible 24hr Fresh Wear Foundation Banana Low Moisturizing Stick Fo | $139.97 | far above the same kind of item | $93.31 | comparable item: Infallible 24hr Fresh Wear Foundation Banana Low M |
| Beauty | 132158066 Glitter Liner Korean Makeup Highlighter Stick for Eyes Makeup Highligh | $139.97 | far above the same kind of item | $81.29 | comparable item: Glitter Liner Korean Makeup Highlighter Stick for  |
| Beauty | 138390441 Eye Highlighter Pencil under Eye Hydration Photo Focus Concealer Total | $139.97 | far above the same kind of item | $83.61 | comparable item: Eye Highlighter Pencil under Eye Hydration Photo F |
| Beauty | 141572159 Debra Mannequin Head Color Hair Extensions Clamp Mannequin Head Hair f | $139.97 | far above the same kind of item | $77.76 | comparable item: Debra Mannequin Head Color Hair Extensions Clamp M |
| Beauty | 141843721 Face Sunblock Kids Organic Sunblock Travel Size Easy Greasy Drunken El | $139.97 | far above the same kind of item | $32.40 | comparable item: Organic Face Sunblock Sweat Lotion Body Skin Laund |
| Beauty | 145447863 Cover Stick Concealer Oil Cover Stick Concealer Fair Eye Concealer Moi | $139.97 | far above the same kind of item | $69.98 | comparable item: Cover Stick Concealer Oil Cover Stick Concealer Fa |
| Beauty | 146693397 Fine Thin Hair Products Uittey2 Hair Brush No More Frizz for Thin Hair | $139.97 | far above the same kind of item | $83.61 | comparable item: Fine Thin Hair Products Uittey2 Hair Brush No More |
| Beauty | 161584657 Beauty Set Makeup Facial Care for Women Men's Pomade Set Face Stuff fo | $139.97 | far above the same kind of item | $84.98 | comparable item: Mens Facial Care Set Facial Products Skin Care for |
| Beauty | 167813738 Scar Face Makeup Moisturizers for Dry Skin on Face Sunblock Spray Trav | $139.97 | far above the same kind of item | $12.68 | median price of the same kind of item |
| Beauty | 170077990 Liner Sculpting Bar Setting Spray for Makeup Long Lasting Tartiest We  | $139.97 | far above the same kind of item | $62.71 | comparable item: We Decided on Forever Highlighter Makeup Pencil fo |
| Beauty | 178686073 Hair Clips for Girls Wedding Wooden Hair Sticks Hair Care Bundle for T | $139.97 | far above the same kind of item | $38.88 | comparable item: Hair Clips for Girls Wedding Wooden Hair Sticks Ha |
| Beauty | 181919681 Headband Short Hair Satin Hair Wrap for Sleeping Hair Wax Hair Cover f | $139.97 | far above the same kind of item | $62.71 | comparable item: Headband Short Hair Satin Hair Wrap for Sleeping H |
| Beauty | 184582587 Coil Hair Ties Clear Ponytail Elastics Thick Hair Bands for Buns Hair  | $139.97 | far above the same kind of item | $125.44 | comparable item: Coil Hair Ties Clear Ponytail Elastics Thick Hair  |
| Beauty | 187492994 Kids Hair Clips Glitter Colorful Snap Hair Clips Rainbow Hair Bows for | $139.97 | far above the same kind of item | $125.42 | comparable item: Kids Hair Clips Glitter Colorful Snap Hair Clips R |
| Beauty | 199221737 Hair Clips for Girls Wedding Wooden Hair Sticks Hair Care Bundle for T | $139.97 | far above the same kind of item | $38.88 | comparable item: Hair Clips for Girls Wedding Wooden Hair Sticks Ha |
| Beauty | 199637151 B004y960 Crape Erase Fit Glow Beauty Cosmetics J Cat Beauty by Conceal | $139.97 | far above the same kind of item | $69.98 | comparable item: B004y960 Crape Erase Fit Glow Beauty Cosmetics J C |
| Beauty | 546290266 Unique Bargains Body Wave Human Hair Extension 18"20"22" 3 Bundles Rem | $139.97 | far above the same kind of item | $80.49 | comparable item: Unique Bargains Hair Body Wave Human Hair 12-24" 2 |
| Beauty | 564187286 1.75" EMOTICON LIP GLOSS, Case of 72 | $139.68 | far above the same kind of item | $73.50 | comparable item: MONKEY LIP GLOSS, Case of 24 |
| Beauty | 924093829 Virgin Human Hair Straight 12-24" 2-4 Bundles 6A Brazilian Weave Sliky | $138.08 | far above the same kind of item | $105.68 | comparable item: Virgin Human Hair Straight 12-24" 2-4 Bundles 6A B |
| Beauty | 336198428 10 in 1 Stainless Steel Manicure Pedicure Set With Leather Travel Case | $137.45 | far above the same kind of item | $27.98 | comparable item: Professional Stainless Steel Manicure Pedicure Set |
| Beauty | 414530911 10 in 1 Stainless Steel Manicure Pedicure Set With Leather Travel Case | $137.45 | far above the same kind of item | $27.98 | comparable item: Professional Stainless Steel Manicure Pedicure Set |
| Beauty | 233145232 Unique Bargains Body Wave Human Hair Extension 20"22"24" 3 Bundles Rem | $136.85 | far above the same kind of item | $80.49 | comparable item: Unique Bargains Hair Body Wave Human Hair 12-24" 2 |
| Beauty | 27016683 Mason Pearson Junior Military Bristle/Nylon Mix Hair Brush | $135.95 | far above the same kind of item | $89.89 | comparable item: Mason Pearson Universal Military All Nylon Hair Br |
| Beauty | 567301832 Chapstick 38pc SK | $135.24 | far above the same kind of item | $4.27 | median price of the same kind of item |
| Beauty | 888077977 Dual Action Spray Air Brush And Compressor Set For Temporary Tattoo Na | $135.22 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 378289008 Hair 911 Clip In Body Wave Hair Extensions 26" | $134.94 | far above the same kind of item | $71.69 | comparable item: Hair 911 Clip In Body Wave Hair Extensions 16" |
| Beauty | 624268347 Hair 911 Clip In Straight Hair Extensions 26" | $134.94 | far above the same kind of item | $123.03 | comparable item: Hair 911 Clip In Straight Hair Extensions 24" |
| Beauty | 416415840 EMOTICON ICE POP LIP GLOSS, Case of 72 | $134.34 | far above the same kind of item | $73.50 | comparable item: MONKEY LIP GLOSS, Case of 24 |
| Beauty | 205949380 Unique Bargains Loose wave Human Hair Extension 20"22"24" 3 Bundles Re | $133.32 | far above the same kind of item | $119.86 | comparable item: Unique Bargains Loose wave Human Hair Extension 20 |
| Beauty | 52079566 Jerome Russell Spray On Hair Color Thickener, Black, 3.5 Oz | $133.29 | far above the same kind of item | $66.03 | comparable item: Jerome Russell Spray-On Hair Color Thickener, Dark |
| Beauty | 145078399 Jerome Russell Punky Hair Colour, Spring Green, 3.5 Oz | $132.93 | far above the same kind of item | $11.55 | comparable item: Jerome Russell Punky Hair Colour, Plum, 3.5 Oz |
| Beauty | 117947668 Unique Bargains Curly Human Hair Extension 242628 3 Bundles Remy Hair | $131.45 | far above the same kind of item | $84.90 | comparable item: Unique Bargains Curly Human Hair Extension 12"14"1 |
| Beauty | 102855813 Jerome Russell Spray On Hair Color Thickener, Medium Brown, 3.5 Oz | $131.40 | far above the same kind of item | $66.03 | comparable item: Jerome Russell Spray-On Hair Color Thickener, Dark |
| Beauty | 403522274 Unique Bargains Loose Curly Human Hair Extension 22"22"22" 3 Bundles R | $129.95 | far above the same kind of item | $103.05 | comparable item: Unique Bargains Loose Curly Human Hair Extension 1 |
| Beauty | 649721288 Dual Action Spray Air Brush And Compressor Set For Temporary Tattoo Na | $129.86 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 128927523 Erem 249CER 249CER TWEEZERS 130MM | $127.83 | far above the same kind of item | $68.11 | comparable item: EREM 29W30 Tweezers For 0.30Mm Size Wire |
| Beauty | 143759420 Art of Shaving Manicure Set, Black Leather, 7 Ct | $127.74 | far above the same kind of item | $6.17 | comparable item: 10 Piece Manicure Set (Black) |
| Beauty | 897115806 IGIA Premium Electric Silicone Pad EyeLash Curler Tool | $125.99 | far above the same kind of item | $11.99 | comparable item: IGIA Electric Silicone Pad EyeLash Curler Tool |
| Beauty | 143586365 Full Sexy for Men Real Size Scandal Lashes Forbidden Y 11 11 Fresh And | $125.44 | far above the same kind of item | $31.35 | comparable item: Top Load Midnight Madness Men Sexy Full Scandal by |
| Beauty | 162721606 Tip Concealer Boxes Makeup Counselor Makeup Cover Girl Clean Fresh Oil | $125.44 | far above the same kind of item | $81.29 | comparable item: Tip Concealer Boxes Makeup Counselor Makeup Cover  |
| Beauty | 178317262 Lip Bar Tinted Moisturizer The Last Beauty Supercharged Foundation Mak | $125.44 | far above the same kind of item | $89.42 | comparable item: Lip Bar Tinted Moisturizer The Last Beauty Superch |
| Beauty | 195037735 Men Beard Dye For Men With Brush Included For Easy Application With Al | $125.44 | far above the same kind of item | $26.61 | comparable item: Just For Men Mustache & Beard, Beard Dye for Men w |
| Beauty | 101299217 Eye Shadow Pen Afterglow Highlighter Brush Wet & Wild Makeup Stick Mak | $125.42 | far above the same kind of item | $38.89 | comparable item: Inner Eye Highlighter Makeup Korean Highlighter Ma |
| Beauty | 110647696 Vintage Suntan Lotion Sunblock Spray 70 The Inky List Face Sunblock Lo | $125.42 | far above the same kind of item | $99.79 | comparable item: Vintage Suntan Lotion Sunblock Spray 70 The Inky L |
| Beauty | 116689901 Cut Crease Tape Color Makeup for Eye Highlighter Star Highlighter Make | $125.42 | far above the same kind of item | $84.98 | comparable item: Cut Crease Tape Color Makeup for Eye Highlighter S |
| Beauty | 118514369 Beauty Youth Hair Easy Tech Hair Color Speedy 20 Volume Hair Developer | $125.42 | far above the same kind of item | $11.78 | median price of the same kind of item |
| Beauty | 129458413 Headbands for Women 5 Spiral Scrunchies Strong Hold Thin Hair Ties for | $125.42 | far above the same kind of item | $31.35 | comparable item: Fabric Scrunchies Scrunchies Ribbons for Girls Tod |
| Beauty | 132667836 Headbands for Women 5 Spiral Scrunchies Strong Hold Thin Hair Ties for | $125.42 | far above the same kind of item | $31.35 | comparable item: Fabric Scrunchies Scrunchies Ribbons for Girls Tod |
| Beauty | 145750900 Curly Ponytail Holder 70 Scrunchies Small Hair Elastics 2mm Large Pony | $125.42 | far above the same kind of item | $55.44 | comparable item: Curly Ponytail Holder 70 Scrunchies Small Hair Ela |
| Beauty | 168502940 Vintage Suntan Lotion Sunblock Spray 70 The Inky List Face Sunblock Lo | $125.42 | far above the same kind of item | $99.79 | comparable item: Vintage Suntan Lotion Sunblock Spray 70 The Inky L |
| Beauty | 168601837 Infallible 24hr Fresh Wear Foundation Banana Low Moisturizing Stick Fo | $125.42 | far above the same kind of item | $93.31 | comparable item: Infallible 24hr Fresh Wear Foundation Banana Low M |
| Beauty | 173838169 Face Wash for Dry Skin for Face Glow Face Skin Removal Remover for Fac | $125.42 | far above the same kind of item | $81.29 | comparable item: Skin Remover Pen Number 7 Skin Care Products Mens  |
| Beauty | 175618737 Curly Ponytail Holder 70 Scrunchies Small Hair Elastics 2mm Large Pony | $125.42 | far above the same kind of item | $55.44 | comparable item: Curly Ponytail Holder 70 Scrunchies Small Hair Ela |
| Beauty | 185355337 Glow Wand Makeup Dark Eye Foundation Stick Full Coverage Pot Beard Eye | $125.42 | far above the same kind of item | $83.61 | comparable item: Glow Wand Makeup Dark Eye Foundation Stick Full Co |
| Beauty | 185948252 Exfoliating Pads for Face Sebum Remover Facial Stone Puffy Eyes Facial | $125.42 | far above the same kind of item | $10.70 | median price of the same kind of item |
| Beauty | 187476408 Age Rewind Concealer Cool Hydrating Eye Stick 1 Stuff Concealers under | $125.42 | far above the same kind of item | $83.97 | comparable item: Pro Conceal Cover Concealer L Midnight Contouring  |
| Beauty | 187910419 Beauty Youth Hair Easy Tech Hair Color Speedy 20 Volume Hair Developer | $125.42 | far above the same kind of item | $11.78 | median price of the same kind of item |
| Beauty | 192298859 under Eye Concealer under Eye Dark Foundation Makeup Full Coverage Har | $125.42 | far above the same kind of item | $62.71 | comparable item: under Eye Concealer under Eye Dark Foundation Make |
| Beauty | 195922076 Thin Hair Tie Kids Hair Bobbles Scrunchies with Zipper under 5 with Cl | $125.42 | far above the same kind of item | $34.99 | comparable item: Clear Hair Rubber Bands Clear Small Hair Elastics  |
| Beauty | 196863804 Glow Wand Makeup Dark Eye Foundation Stick Full Coverage Pot Beard Eye | $125.42 | far above the same kind of item | $83.61 | comparable item: Glow Wand Makeup Dark Eye Foundation Stick Full Co |
| Beauty | 314595501 PMD Clean Pro Blush with Rose Quartz | $125.30 | far above the same kind of item | $11.37 | median price of the same kind of item |
| Beauty | 284956737 Lancer Triple Peptide Drops with Vitamin E + Niacinamide 1oz/30ml *New | $125.00 | far above the same kind of item | $5.77 | median per-unit price of comparable items |
| Beauty | 502039480 Elizabeth Arden Ceramide Vitamin C Capsules - Radiance Renewal Serum 9 | $125.00 | far above the same kind of item | $11.68 | median price of the same kind of item |
| Beauty | 782834116 Mia Secret Professional Acrylic Nail Kit (KIT-03) | $125.00 | far above the same kind of item | $14.99 | comparable item: Mia Secret Professional Acrylic Nail System Liquid |
| Beauty | 12285065848 Sweethearts Headband | $125.00 | far above the same kind of item | $1.00 | comparable item: Value Headband |
| Beauty | 341642871 Physicians Formula 8pcpf Allstar 11884 | $123.84 | far above the same kind of item | $11.57 | median price of the same kind of item |
| Beauty | 103499374 Lipstick Holder for Purse Womens Makeup Lip Gloss Moisturizing Filler  | $123.44 | far above the same kind of item | $61.73 | comparable item: Lipstick Holder for Purse Womens Makeup Lip Gloss  |
| Beauty | 109463624 Extra Long Nails Tips Full Tip Nails Coffin Short Nails Short Long on  | $123.44 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 111450526 Clear Full Cover Nail Tips Extra Long Nail Acrylic Tips Coffin Oval Sh | $123.44 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 115877117 Neutral Lipstick Frank Color Changing Lip Gloss Mini Lipstick Lip Glos | $123.44 | far above the same kind of item | $82.29 | comparable item: Neutral Lipstick Frank Color Changing Lip Gloss Mi |
| Beauty | 117443746 Pretty Little Thing Makeup Lip Gloss Glitter Base Korean Lip Peel Lip  | $123.44 | far above the same kind of item | $68.57 | comparable item: Pretty Little Thing Makeup Lip Gloss Glitter Base  |
| Beauty | 119736353 Lipstick Battery Five And below Items Sinless Beauty Long Lasting Lip  | $123.44 | far above the same kind of item | $82.29 | comparable item: Lipstick Battery Five And below Items Sinless Beau |
| Beauty | 122841072 Hypnotized Asian Crush 28 Lip Gloss 5 Items And under Lip Care for Dry | $123.44 | far above the same kind of item | $5.47 | median price of the same kind of item |
| Beauty | 124269330 Cordless Nail File 100 Grit Nail File Files for Nails Pack Buffer for  | $123.44 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 124996202 Lipstick Natural Color Earth Lipstick Color Design Lipstick 12 Days of | $123.44 | far above the same kind of item | $82.29 | comparable item: Lipstick Natural Color Earth Lipstick Color Design |
| Beauty | 125755075 Nipper Nails Nails Buffer Shiny Filer for Nails with Acrylic Nail File | $123.44 | far above the same kind of item | $58.91 | comparable item: Nail Buffer 180 Grit Emery Board Pusher Manicure A |
| Beauty | 127003914 Waterline Eye to New Brow Gel Eye Gel Liner Makeup Forever Setting Spr | $123.44 | far above the same kind of item | $61.73 | comparable item: Waterline Eye to New Brow Gel Eye Gel Liner Makeup |
| Beauty | 127504712 Nails Tips Nail Tips round Nail on Coffin Nail Tips Clear Nail Tips Fu | $123.44 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 129218013 Vegan Lip Gloss Base Clear Lip Gel for Girls Lip Gloss Clear Lip Kits  | $123.44 | far above the same kind of item | $82.29 | comparable item: Vegan Lip Gloss Base Clear Lip Gel for Girls Lip G |
| Beauty | 129745620 Full Cover Nail Tips Ballerina Shape Full Cover Nail Tips Short Baller | $123.44 | far above the same kind of item | $61.73 | comparable item: on Acrylic Nails Pack Clear Ballerina Nail Tips Fu |
| Beauty | 132985836 Nail Cuticle Drill Large Rose Nail 4 Nail File 14mm Quartz Nail Pedicu | $123.44 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 133907004 Nail Lot Gel Lens Polish Flashing Glitter Polish Holiday Gel Polish Fr | $123.44 | far above the same kind of item | $61.73 | comparable item: Nail Lot Gel Lens Polish Flashing Glitter Polish H |
| Beauty | 134789981 Lipstick Holder for Purse Womens Makeup Lip Gloss Moisturizing Filler  | $123.44 | far above the same kind of item | $61.73 | comparable item: Lipstick Holder for Purse Womens Makeup Lip Gloss  |
| Beauty | 135032775 Gothic Makeup Makeup Erasers The Longest Line on The Map Eye Pencil Co | $123.44 | far above the same kind of item | $44.19 | comparable item: Cat Eye Stencil Roll on Glitter Gel Liner High End |
| Beauty | 139045547 Girl Lip Plumper Tinted Lip Gloss Lip Gloss Girls Candy Max Lip Gloss  | $123.44 | far above the same kind of item | $82.29 | comparable item: Girl Lip Plumper Tinted Lip Gloss Lip Gloss Girls  |
| Beauty | 139176395 Pretty Little Thing Makeup Lip Gloss Glitter Base Korean Lip Peel Lip  | $123.44 | far above the same kind of item | $68.57 | comparable item: Pretty Little Thing Makeup Lip Gloss Glitter Base  |
| Beauty | 139839483 Heavy Duty Nail File Files for Acrylic Nails Board Jewelry 4 Way Nail  | $123.44 | far above the same kind of item | $58.91 | comparable item: Nail Buffer 180 Grit Emery Board Pusher Manicure A |
| Beauty | 140024562 Eye Brow Gel Tinted Eyebrow Pencils Medium Eyebrow Color for Hair Eyeb | $123.44 | far above the same kind of item | $11.76 | median price of the same kind of item |
| Beauty | 141282596 Sand Bands for Nail Drill Fine Nail for Acrylic Nails with Guard on Ma | $123.44 | far above the same kind of item | $88.00 | comparable item: Nail for Acrylic Nails with Guard Pusher plus Cuti |
| Beauty | 141594548 Nails for Girls Kids Nail Stickers And Decals Jelly Stamper for Nails  | $123.44 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 144061729 Glow in The Dark Lipstick Lip Gloss Scents under 3 Items Jelly Lipstic | $123.44 | far above the same kind of item | $88.00 | comparable item: Glow in The Dark Lipstick Lip Gloss Scents under 3 |
| Beauty | 144269807 Brow Wax Pen Eyebrow Template for Waxing Eye Brow Brush with Eyebrow C | $123.44 | far above the same kind of item | $88.00 | comparable item: Brow Wax Pen Eyebrow Template for Waxing Eye Brow  |
| Beauty | 145219831 Nail Polisher Buffer Nail File Metal Coarse 3 Nail Buffer Nail Buffer  | $123.44 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 152079590 Lip up Plumper Maximum Lip Plumper Glitter Lip Glaze Water Proof Makeu | $123.44 | far above the same kind of item | $61.73 | comparable item: Lip up Plumper Maximum Lip Plumper Glitter Lip Gla |
| Beauty | 152111924 Small Eyelash Curler Individual Eye Lashes Pack Colorful Eyelashes 12d | $123.44 | far above the same kind of item | $61.71 | comparable item: Small Eyelash Curler Individual Eye Lashes Pack Co |
| Beauty | 152729250 Jelly Stamper for Nails Colorful Rhinestones Glitter for Nails Petite  | $123.44 | far above the same kind of item | $61.73 | comparable item: Jelly Stamper for Nails Colorful Rhinestones Glitt |
| Beauty | 153509546 Hypnotized Asian Crush 28 Lip Gloss 5 Items And under Lip Care for Dry | $123.44 | far above the same kind of item | $5.47 | median price of the same kind of item |
| Beauty | 153633894 Brow Mates Fairest Gradient Lipstick Ink The Lip Tint Lip Gloss Suitca | $123.44 | far above the same kind of item | $80.00 | comparable item: Brow Mates Fairest Gradient Lipstick Ink The Lip T |
| Beauty | 153757448 Tinted Lip Gloss for Kids 28 Milk Lip Gloss Blur Lines Lipstick Lipsti | $123.44 | far above the same kind of item | $82.29 | comparable item: Tinted Lip Gloss for Kids 28 Milk Lip Gloss Blur L |
| Beauty | 154086790 Lipstick Natural Color Earth Lipstick Color Design Lipstick 12 Days of | $123.44 | far above the same kind of item | $82.29 | comparable item: Lipstick Natural Color Earth Lipstick Color Design |
| Beauty | 159003498 Lipstick Colors Cosmetics Lipstick Stain Lipstick Lip Gloss Makeup Pro | $123.44 | far above the same kind of item | $80.00 | comparable item: Lipstick Colors Cosmetics Lipstick Stain Lipstick  |
| Beauty | 161988309 Q Tip Lip Stain Makeup Pearls Glitter Lipstick Lip Plumping Lip Gloss  | $123.44 | far above the same kind of item | $82.29 | comparable item: Two Faced Lip Plumper Lip Gloss Plumper Long Lasti |
| Beauty | 172012754 Gel Lip Liner Berry Lip Gloss for Girls 10-12 Natural by Highlighter K | $123.44 | far above the same kind of item | $82.29 | comparable item: Gel Lip Liner Berry Lip Gloss for Girls 10-12 Natu |
| Beauty | 172774482 Coffin Shaped Nail Tips Full Cover Nails Coffin Clear Coffin Nails Sho | $123.44 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 173606997 Lip up Plumper Maximum Lip Plumper Glitter Lip Glaze Water Proof Makeu | $123.44 | far above the same kind of item | $61.73 | comparable item: Lip up Plumper Maximum Lip Plumper Glitter Lip Gla |
| Beauty | 173866277 Jelly Stamper for Nails Colorful Rhinestones Glitter for Nails Petite  | $123.44 | far above the same kind of item | $61.73 | comparable item: Jelly Stamper for Nails Colorful Rhinestones Glitt |
| Beauty | 176691160 Violin Lipstick Peel off Lipstick Static Lipstick Day And Night Lip Pl | $123.44 | far above the same kind of item | $88.00 | comparable item: Violin Lipstick Peel off Lipstick Static Lipstick  |
| Beauty | 177224020 Glitter Liner Gel Liner Asian Makeup Concealer Graphic Liner Grease Ma | $123.44 | far above the same kind of item | $88.00 | comparable item: Glitter Liner Gel Liner Asian Makeup Concealer Gra |
| Beauty | 183178747 Lipstick Colors Cosmetics Lipstick Stain Lipstick Lip Gloss Makeup Pro | $123.44 | far above the same kind of item | $80.00 | comparable item: Lipstick Colors Cosmetics Lipstick Stain Lipstick  |
| Beauty | 185827993 Color for Eyes Makeup Brush Foundation Face Makeup Brushes Korean Foun | $123.44 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 186786155 berry Eyes Max Valentines Mad Shadow Snowflake Makeup Find My Shadow M | $123.44 | far above the same kind of item | $9.01 | median price of the same kind of item |
| Beauty | 187036467 Lipstick Sealer Gloss Make up for Teens Lip Gloss Packaging Boxes Dark | $123.44 | far above the same kind of item | $82.29 | comparable item: Lipstick Sealer Gloss Make up for Teens Lip Gloss  |
| Beauty | 187487527 Lip Liners Shades Lipsticks Bulk Stay on Lipstick with Gloss Lip Liner | $123.44 | far above the same kind of item | $80.00 | comparable item: Lip Liners Shades Lipsticks Bulk Stay on Lipstick  |
| Beauty | 192712380 Vegan Lip Gloss Base Clear Lip Gel for Girls Lip Gloss Clear Lip Kits  | $123.44 | far above the same kind of item | $82.29 | comparable item: Vegan Lip Gloss Base Clear Lip Gel for Girls Lip G |
| Beauty | 193825688 Hard Gel Nail Tips Coffin Nails Short Length Long Acrylic Nails Nail f | $123.44 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 194794621 Long Acrylic Tips Nail Tips Coffin Shape Full Cover Short Gel X Nail T | $123.44 | far above the same kind of item | $61.73 | comparable item: Nails for on Nails Clear Acrylic Nails Painted Sho |
| Beauty | 198487400 Nail Drill Sanding Bands 240 Pedicure Filer Hand Manicure Bowl Battery | $123.44 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 100257562 Small Rhinestones Kids Nail Stickers French Nail Stamper Nail Stand fo | $123.43 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 101256631 Nails Tips Clear False Designed on Nails Coffin Nails Tips Half Long G | $123.43 | far above the same kind of item | $68.57 | comparable item: Short Ballerina Nails Clear on Medium Coffin Nails |
| Beauty | 105060061 15mm Lashes 25 Mm Lashes Whole Velour Lashes 16mm Lashes Lashes 20mm L | $123.43 | far above the same kind of item | $61.71 | comparable item: 15mm Lashes 25 Mm Lashes Whole Velour Lashes 16mm  |
| Beauty | 106567933 Teeth Filler Cute Lip Gloss for Girls Lip Buzzing Lip Oil Light Lip Gl | $123.43 | far above the same kind of item | $61.71 | comparable item: Teeth Filler Cute Lip Gloss for Girls Lip Buzzing  |
| Beauty | 106625227 Lip Tint Korean Max Gloss Coffee Jelly Makeup Artist Must Haves Deep L | $123.43 | far above the same kind of item | $88.00 | comparable item: Lip Tint Korean Max Gloss Coffee Jelly Makeup Arti |
| Beauty | 107276536 Lip up Plumper Maximum Lip Plumper Glitter Lip Glaze Water Proof Makeu | $123.43 | far above the same kind of item | $61.73 | comparable item: Lip up Plumper Maximum Lip Plumper Glitter Lip Gla |
| Beauty | 107811514 Nail Polish Remover Clips Bits for Nail Cutters Tweezers Eyelash Exten | $123.43 | far above the same kind of item | $61.71 | comparable item: Nail Polish Remover Clips Bits for Nail Cutters Tw |
| Beauty | 110196043 Impress Mini Nails Impress Color on Nails Nails for Acrylic Tips Clear | $123.43 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 112044036 Nails of Long Nail Nails Curved Short Clear Coffin Nail Tips False Nai | $123.43 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 112663206 Denounce Makeup Eye Shadow Corner Eye Highlighter Pencil The Shadow Wi | $123.43 | far above the same kind of item | $9.01 | median price of the same kind of item |
| Beauty | 113127399 Nail Dot Pen Manicure Sticks for Nails Acrylic Nail Decorating Small N | $123.43 | far above the same kind of item | $80.00 | comparable item: Nail Dot Pen Manicure Sticks for Nails Acrylic Nai |
| Beauty | 115269192 Clear Lip Gloss in A Tube Cute Lipsticks Long Wear Lip Gloss Beauty Co | $123.43 | far above the same kind of item | $82.29 | comparable item: Clear Lip Gloss in A Tube Cute Lipsticks Long Wear |
| Beauty | 115280230 Pretty Little Thing Makeup Lip Gloss Glitter Base Korean Lip Peel Lip  | $123.43 | far above the same kind of item | $68.57 | comparable item: Pretty Little Thing Makeup Lip Gloss Glitter Base  |
| Beauty | 116011228 Eyelashes False Big Lashes Eyelash Extension Lashes .07 Suitcase Packa | $123.43 | far above the same kind of item | $80.00 | comparable item: Eyelashes False Big Lashes Eyelash Extension Lashe |
| Beauty | 116442521 Glitter Liner Korean Makeup Highlighter Stick for Eyes Makeup Highligh | $123.43 | far above the same kind of item | $81.29 | comparable item: Glitter Liner Korean Makeup Highlighter Stick for  |
| Beauty | 117458750 Gel Polish Holiday Parrot Polish Peel off Base Coat for Nails Top And  | $123.43 | far above the same kind of item | $61.71 | comparable item: Gel Polish Holiday Parrot Polish Peel off Base Coa |
| Beauty | 117685591 Lip Gloss Packs for Teens Super Skin Tint Syrup Cosmetics Lip Plumper  | $123.43 | far above the same kind of item | $61.73 | comparable item: Lip Gloss Packs for Teens Super Skin Tint Syrup Co |
| Beauty | 117733655 28 Makeup Lip Gloss for Kids under 8 Lip Gloss Clear Tube It up Lip Pl | $123.43 | far above the same kind of item | $82.29 | comparable item: 28 Makeup Lip Gloss for Kids under 8 Lip Gloss Cle |
| Beauty | 118098646 Clear Full Cover Nail Tips Extra Long Nail Acrylic Tips Coffin Oval Sh | $123.43 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 118423135 City Clear Plumping Lip Gloss Lip Gloss for Little Girls Scents for Li | $123.43 | far above the same kind of item | $88.00 | comparable item: Lip Glosses for Teens Organic Korean Lipstick Glos |
| Beauty | 119289486 berry Eyes Max Valentines Mad Shadow Snowflake Makeup Find My Shadow M | $123.43 | far above the same kind of item | $9.01 | median price of the same kind of item |
| Beauty | 119389351 Natural Nail Tips Medium Short Nail Tips Coffin Shape Half Cover Short | $123.43 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 120758065 City Clear Plumping Lip Gloss Lip Gloss for Little Girls Scents for Li | $123.43 | far above the same kind of item | $88.00 | comparable item: Lip Glosses for Teens Organic Korean Lipstick Glos |
| Beauty | 121111233 Lip Moisturizer And Plumper 28 Makeup Lip Gloss for Girls 10-12 Real L | $123.43 | far above the same kind of item | $88.00 | comparable item: Lip Moisturizer And Plumper 28 Makeup Lip Gloss fo |
| Beauty | 121202488 Lip Gloss Kits for Kids Mini Fruit Stickers for Lip Gloss Lip Gloss Co | $123.43 | far above the same kind of item | $82.29 | comparable item: Lip Gloss Kits for Kids Mini Fruit Stickers for Li |
| Beauty | 122617392 Eyelashes False Big Lashes Eyelash Extension Lashes .07 Suitcase Packa | $123.43 | far above the same kind of item | $80.00 | comparable item: Eyelashes False Big Lashes Eyelash Extension Lashe |
| Beauty | 123115201 Long Nails Tips Straight Coffin Clear Seal Acrylic Nail Tips with Glue | $123.43 | far above the same kind of item | $61.73 | comparable item: Nails for on Nails Clear Acrylic Nails Painted Sho |
| Beauty | 124041565 Grit Files for Nails 100/180 Nail with Catcher Japan One Minute Manicu | $123.43 | far above the same kind of item | $58.91 | comparable item: Nail Buffer 180 Grit Emery Board Pusher Manicure A |
| Beauty | 124695821 Pads for Tint 25mm Lashes Eyelash Extensions 3d Eyelashes 20mm Anime E | $123.43 | far above the same kind of item | $82.29 | comparable item: Pads for Tint 25mm Lashes Eyelash Extensions 3d Ey |
| Beauty | 125424954 Velour Lashes Make up Concealer for Face Small Smell Proof Container R | $123.43 | far above the same kind of item | $77.76 | comparable item: Velour Lashes Make up Concealer for Face Small Sme |
| Beauty | 125929843 after Pigments Lipstick Lip Gloss And Lipstick Mauve Beauty Mini Lipst | $123.43 | far above the same kind of item | $88.00 | comparable item: after Pigments Lipstick Lip Gloss And Lipstick Mau |
| Beauty | 127145202 Nail Dot Pen Manicure Sticks for Nails Acrylic Nail Decorating Small N | $123.43 | far above the same kind of item | $80.00 | comparable item: Nail Dot Pen Manicure Sticks for Nails Acrylic Nai |
| Beauty | 128976371 Gel on Nails Medium Coffin Coffin Extra Long Nail Tips on Coffin Nails | $123.43 | far above the same kind of item | $28.57 | comparable item: in Nails Clear Nail Gel Short Nail Tips for Acryli |
| Beauty | 132164047 Violin Lipstick Peel off Lipstick Static Lipstick Day And Night Lip Pl | $123.43 | far above the same kind of item | $88.00 | comparable item: Violin Lipstick Peel off Lipstick Static Lipstick  |
| Beauty | 132556335 Names Hydro Liner Vegan Eye Makeup Remover Chocolate Pencil Tear Eye L | $123.43 | far above the same kind of item | $61.73 | comparable item: Wear It like A Eye Liner Stencil Sweet Liner Line  |
| Beauty | 132840047 Clear Nail Full Cover Tips Acrylic Nail Stickers Medium Coffin Nails C | $123.43 | far above the same kind of item | $45.71 | comparable item: Acrylic Nails on Medium Length Daughters of The Je |
| Beauty | 134919764 Gel Nail Covers for Cats Acrylic Nail Forms Reusable Nails Long Length | $123.43 | far above the same kind of item | $61.73 | comparable item: Long Coffin Nails Acrylic Nails Tips Clear And Nat |
| Beauty | 135916045 Lip Gloss Bundles with Candy Lip Conditioner Gloss Candy Doll Makeup G | $123.43 | far above the same kind of item | $80.00 | comparable item: Lip Gloss Bundles with Candy Lip Conditioner Gloss |
| Beauty | 136581406 Lip Liner Retractable Doll 10 Cosmetics Eyebrow Lip Gloss with Lights  | $123.43 | far above the same kind of item | $82.29 | comparable item: Lip Liner Retractable Doll 10 Cosmetics Eyebrow Li |
| Beauty | 136881281 Lipstick Holder for Purse Womens Makeup Lip Gloss Moisturizing Filler  | $123.43 | far above the same kind of item | $61.73 | comparable item: Lipstick Holder for Purse Womens Makeup Lip Gloss  |
| Beauty | 136933138 Eyelashes False Big Lashes Eyelash Extension Lashes .07 Suitcase Packa | $123.43 | far above the same kind of item | $80.00 | comparable item: Eyelashes False Big Lashes Eyelash Extension Lashe |
| Beauty | 138686705 15mm Lashes 25 Mm Lashes Whole Velour Lashes 16mm Lashes Lashes 20mm L | $123.43 | far above the same kind of item | $61.71 | comparable item: 15mm Lashes 25 Mm Lashes Whole Velour Lashes 16mm  |
| Beauty | 138824450 Lip Color Pigment Lip Women's Lip Gloss Dry Rose Petals Doll Clothes L | $123.43 | far above the same kind of item | $8.97 | median price of the same kind of item |
| Beauty | 138920355 Nay Lashes Couture Eyelashes 30mm Lashes Pack Long Wispy Lashes Short  | $123.43 | far above the same kind of item | $8.45 | median price of the same kind of item |
| Beauty | 141406029 All Day Lipstick My Wink Glitter Lip Gloss Korean Lip Gloss That's It  | $123.43 | far above the same kind of item | $61.71 | comparable item: All Day Lipstick My Wink Glitter Lip Gloss Korean  |
| Beauty | 142780922 Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empty 3d Eyelashes 20mm  | $123.43 | far above the same kind of item | $80.00 | comparable item: Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empt |
| Beauty | 142820966 Book 20mm 20 Pairs False Eyelashes Short Lashes Bulk C Curl Lashes Str | $123.43 | far above the same kind of item | $30.86 | comparable item: Eyelash Brush with Cap Strip Lashes Natural Medium |
| Beauty | 144341944 Eyelashes False Big Lashes Eyelash Extension Lashes .07 Suitcase Packa | $123.43 | far above the same kind of item | $82.29 | comparable item: Eyelashes False Big Lashes Eyelash Extension Lashe |
| Beauty | 144605051 Cute Lip Gloss for Teen Girls Clear Mini Suitcase for Lip Gloss Packag | $123.43 | far above the same kind of item | $68.57 | comparable item: Kids Lip Gloss Lip Plumper Lip Gloss Clear Lip Bab |
| Beauty | 144747770 Small Eyelash Curler Individual Eye Lashes Pack Colorful Eyelashes 12d | $123.43 | far above the same kind of item | $61.71 | comparable item: Small Eyelash Curler Individual Eye Lashes Pack Co |
| Beauty | 144947110 All Day Lipstick My Wink Glitter Lip Gloss Korean Lip Gloss That's It  | $123.43 | far above the same kind of item | $61.71 | comparable item: All Day Lipstick My Wink Glitter Lip Gloss Korean  |
| Beauty | 147439349 Acrylic Nail Trainer Coffin Full Nail Tips False Nails Tips Clear Prac | $123.43 | far above the same kind of item | $28.57 | comparable item: False Nail Tips Short Coffin Acrylic Practice Hand |
| Beauty | 147439505 Natural Nail Tips Medium Short Nail Tips Coffin Shape Half Cover Short | $123.43 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 149058624 Dime Beauty 5 Items And under Fiber Color Proof Mega Volume Lashes Str | $123.43 | far above the same kind of item | $8.45 | median price of the same kind of item |
| Beauty | 149147813 All Day Lipstick My Wink Glitter Lip Gloss Korean Lip Gloss That's It  | $123.43 | far above the same kind of item | $61.71 | comparable item: All Day Lipstick My Wink Glitter Lip Gloss Korean  |
| Beauty | 149252060 All Day Lipstick My Wink Glitter Lip Gloss Korean Lip Gloss That's It  | $123.43 | far above the same kind of item | $61.71 | comparable item: All Day Lipstick My Wink Glitter Lip Gloss Korean  |
| Beauty | 149592544 Nail Lot Gel Lens Polish Flashing Glitter Polish Holiday Gel Polish Fr | $123.43 | far above the same kind of item | $61.73 | comparable item: Nail Lot Gel Lens Polish Flashing Glitter Polish H |
| Beauty | 153143786 15mm Lashes 25 Mm Lashes Whole Velour Lashes 16mm Lashes Lashes 20mm L | $123.43 | far above the same kind of item | $61.71 | comparable item: 15mm Lashes 25 Mm Lashes Whole Velour Lashes 16mm  |
| Beauty | 154050525 Lipstick Jihad Lipstick Context Skin Lipstick Baby Lip Gloss Glossed L | $123.43 | far above the same kind of item | $51.84 | comparable item: Lipstick Jihad Lipstick Context Skin Lipstick Baby |
| Beauty | 154712220 Beauty Boxes Lipstick Long Lasting en Soft Gel Gloss Medium Makeup Lip | $123.43 | far above the same kind of item | $82.29 | comparable item: Beauty Boxes Lipstick Long Lasting en Soft Gel Glo |
| Beauty | 155810708 Organic Lipstick Water Lip Stain Lawless Lipstick Lipstick That Stays  | $123.43 | far above the same kind of item | $82.29 | comparable item: Organic Lipstick Water Lip Stain Lawless Lipstick  |
| Beauty | 156328274 after Pigments Lipstick Lip Gloss And Lipstick Mauve Beauty Mini Lipst | $123.43 | far above the same kind of item | $88.00 | comparable item: after Pigments Lipstick Lip Gloss And Lipstick Mau |
| Beauty | 156671286 Lip Moisturizer And Plumper 28 Makeup Lip Gloss for Girls 10-12 Real L | $123.43 | far above the same kind of item | $88.00 | comparable item: Lip Moisturizer And Plumper 28 Makeup Lip Gloss fo |
| Beauty | 157660106 Coffin Nail Clear Tips Long Acrylic Nails Coffin on Short Coffin Nail  | $123.43 | far above the same kind of item | $61.71 | comparable item: Coffin Nail Clear Tips Long Acrylic Nails Coffin o |
| Beauty | 157896035 Coffin on Nails Acrylic Nail Finger False Nail Tips Color Chart Long N | $123.43 | far above the same kind of item | $61.73 | comparable item: Coffin Shaped Nail Tips Half Cover Short Tips on N |
| Beauty | 158816485 Again Beauty Korean Color Happy New Brow Eye for Eyelash Growth 805 La | $123.43 | far above the same kind of item | $10.33 | median price of the same kind of item |
| Beauty | 161680497 Eyelashes with Color on The End Eyelashes Eye Empty Boxes Butterflies  | $123.43 | far above the same kind of item | $28.57 | comparable item: 8d Lashes Individual Glue 25mm Lashes Packages Eye |
| Beauty | 161683430 Lip Stain Lip Stain Peel off Lip Gloss Frosted Lipstick Water Tint Mau | $123.43 | far above the same kind of item | $82.29 | comparable item: Lip Stain Lip Stain Peel off Lip Gloss Frosted Lip |
| Beauty | 162067791 Clear Full Cover Nail Tips Extra Long Nail Acrylic Tips Coffin Oval Sh | $123.43 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 167806755 Retractable Lipstick Brush with Cover Japanese Makeup Beauty Products  | $123.43 | far above the same kind of item | $10.97 | median price of the same kind of item |
| Beauty | 168669533 on Nails Coffin Medium Clear Nail Tips Short Nail Tips Short for Girls | $123.43 | far above the same kind of item | $61.73 | comparable item: on Nails Coffin Medium Clear Nail Tips Short Nail  |
| Beauty | 170070865 Geller Brow Marker Dark Universal Eyebrow Pencil Eyebrow Concealer Wax | $123.43 | far above the same kind of item | $9.54 | median price of the same kind of item |
| Beauty | 170133227 Acrylic Nails Gel Nails Kits with Everything Nail Polishes Not Polish  | $123.43 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 170287558 All Day Lipstick My Wink Glitter Lip Gloss Korean Lip Gloss That's It  | $123.43 | far above the same kind of item | $61.71 | comparable item: All Day Lipstick My Wink Glitter Lip Gloss Korean  |
| Beauty | 170583400 Lip up Plumper Maximum Lip Plumper Glitter Lip Glaze Water Proof Makeu | $123.43 | far above the same kind of item | $61.73 | comparable item: Lip up Plumper Maximum Lip Plumper Glitter Lip Gla |
| Beauty | 171071389 Cargo Lip Liner Lip Monthly 1 Lip Gloss Lipstick with Color Cover Girl | $123.43 | far above the same kind of item | $80.00 | comparable item: Cargo Lip Liner Lip Monthly 1 Lip Gloss Lipstick w |
| Beauty | 171161878 Bottle Lipstick 726 Channel Lip Gloss Caramel Bars Lipstick Sealer Glo | $123.43 | far above the same kind of item | $10.97 | median price of the same kind of item |
| Beauty | 171275810 Long Clear Acrylic Nails Tips Nail Forms for Acrylic Nails Full Nails  | $123.43 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 171284248 Lip Stain Peel off Lip Pumper Plumper Highlighter Pens Makeup Passion  | $123.43 | far above the same kind of item | $82.29 | comparable item: Lip Stain Peel off Lip Pumper Plumper Highlighter  |
| Beauty | 171340650 Cargo Lip Liner Lip Monthly 1 Lip Gloss Lipstick with Color Cover Girl | $123.43 | far above the same kind of item | $80.00 | comparable item: Cargo Lip Liner Lip Monthly 1 Lip Gloss Lipstick w |
| Beauty | 172355384 Makeup Forever Lip Liner Anywhere Summer Lipstick Cute Small Pouch und | $123.43 | far above the same kind of item | $82.29 | comparable item: Makeup Forever Lip Liner Anywhere Summer Lipstick  |
| Beauty | 173336408 Extra Long Nails Tips Full Tip Nails Coffin Short Nails Short Long on  | $123.43 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 173344373 Lipstick Colors Cosmetics Lipstick Stain Lipstick Lip Gloss Makeup Pro | $123.43 | far above the same kind of item | $80.00 | comparable item: Lipstick Colors Cosmetics Lipstick Stain Lipstick  |
| Beauty | 173478810 Lip Gloss Scents Korean Gloss Water Lip Stain Lip Liner Concealer for  | $123.43 | far above the same kind of item | $80.00 | comparable item: Lip Gloss Scents Korean Gloss Water Lip Stain Lip  |
| Beauty | 174583597 Clear Full Cover Nail Tips Extra Long Nail Acrylic Tips Coffin Oval Sh | $123.43 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 175216561 Lip Gloss Lip Plumping Lip Gloss Clear Lip Gloss Base Gel Clear Lip Gl | $123.43 | far above the same kind of item | $61.71 | comparable item: Lip Gloss Lip Plumping Lip Gloss Clear Lip Gloss B |
| Beauty | 175723730 Acrylic Nails Clear Coffin Coffin Full Nail Tips Roofing Tarp Nails Ti | $123.43 | far above the same kind of item | $61.73 | comparable item: on Nails Coffin Medium Clear Nail Tips Short Nail  |
| Beauty | 175951877 Lipstick Chateau Happily after Lip Liner Clear Lip Stick Coat Its Not  | $123.43 | far above the same kind of item | $82.29 | comparable item: Lipstick Chateau Happily after Lip Liner Clear Lip |
| Beauty | 176078423 on Tips Acrylic Nail Tips Natural Long Practice Nails for Acrylic Nail | $123.43 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 176545485 Makeup Contouring Makeup Pads Sponge Power Puff Girls Buffer Pads for  | $123.43 | far above the same kind of item | $62.71 | comparable item: Makeup Puff Washable Makeup Pads under Eye Make up |
| Beauty | 176657963 Full Cover Gel Nail Tips Coffin Nail Acrylic 240 on Coffin Nails 123 G | $123.43 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 177331068 Gel Polish Holiday Parrot Polish Peel off Base Coat for Nails Top And  | $123.43 | far above the same kind of item | $61.71 | comparable item: Gel Polish Holiday Parrot Polish Peel off Base Coa |
| Beauty | 177726197 Lip Hydration Lip Winter Clear Lipstick Lip Filler Lip Gloss Preppy Sh | $123.43 | far above the same kind of item | $82.29 | comparable item: Lip Hydration Lip Winter Clear Lipstick Lip Filler |
| Beauty | 179311987 20mm Lashes 3d Eye Curler for Women Book of Lashes Volume 1 Lashes Bul | $123.43 | far above the same kind of item | $80.00 | comparable item: 20mm Lashes 3d Eye Curler for Women Book of Lashes |
| Beauty | 183050423 Nail Cups for Vegan Dip Nail Lip Gloss Glitter for Lip Gloss Making Ge | $123.43 | far above the same kind of item | $88.00 | comparable item: Nail Cups for Vegan Dip Nail Lip Gloss Glitter for |
| Beauty | 183581413 Full Cover False Nails Gel Nail Tips Full Cover Extra Long Clear Curve | $123.43 | far above the same kind of item | $61.73 | comparable item: Acrylic Nails for Small Nails False Nails Coffin S |
| Beauty | 184697593 Fruit Flavo Lip Gloss Fruit Slices for Lip Gloss Lip Gloss Clear Base  | $123.43 | far above the same kind of item | $61.73 | comparable item: Fruit Flavo Lip Gloss Fruit Slices for Lip Gloss L |
| Beauty | 185484741 Hidden Cosmetics Eye Make up Coastal Scents Inner Eye Highlighter Make | $123.43 | far above the same kind of item | $6.81 | median price of the same kind of item |
| Beauty | 186446427 Nail Polish Remover Clips Bits for Nail Cutters Tweezers Eyelash Exten | $123.43 | far above the same kind of item | $61.71 | comparable item: Nail Polish Remover Clips Bits for Nail Cutters Tw |
| Beauty | 187253309 Lip Gloss Natural Aloe Gel Lip Gloss Base Lip Gloss Base Clear 1 Hard  | $123.43 | far above the same kind of item | $6.96 | median price of the same kind of item |
| Beauty | 188383757 Clear Lip Gloss in A Tube Cute Lipsticks Long Wear Lip Gloss Beauty Co | $123.43 | far above the same kind of item | $82.29 | comparable item: Clear Lip Gloss in A Tube Cute Lipsticks Long Wear |
| Beauty | 188782524 Gel Lip Liner Berry Lip Gloss for Girls 10-12 Natural by Highlighter K | $123.43 | far above the same kind of item | $82.29 | comparable item: Gel Lip Liner Berry Lip Gloss for Girls 10-12 Natu |
| Beauty | 189958775 Roller Rocks And Facial Scrub Pads Nose Hair Remover High Frequency Fa | $123.43 | far above the same kind of item | $77.76 | comparable item: Fine Lines And Eye Scrub Cleansing Pads Exfoliatin |
| Beauty | 190244424 Nail Dip Base Coat Nail Nippers for Nails Metal Nail Form Power Nails  | $123.43 | far above the same kind of item | $9.98 | median price of the same kind of item |
| Beauty | 190457387 New Makeup Plumping Lip Liner Clear Glitter Lipstick Heart Shaped Lips | $123.43 | far above the same kind of item | $80.00 | comparable item: New Makeup Plumping Lip Liner Clear Glitter Lipsti |
| Beauty | 190879164 Trending Items Favorite Things Full List Eyelash Booster X Candy Last  | $123.43 | far above the same kind of item | $8.45 | median price of the same kind of item |
| Beauty | 190897160 Hard Gel Nail Tips Coffin Nails Short Length Long Acrylic Nails Nail f | $123.43 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 191558667 Eye Shadow for Eyes 80s Headband And Wristbands Eye Makeup Neutral Har | $123.43 | far above the same kind of item | $61.73 | comparable item: Eye Shadow for Eyes 80s Headband And Wristbands Ey |
| Beauty | 192244241 Impress Mini Nails Clear Full Cover Nail Tips Ballerina Acrylic Tips L | $123.43 | far above the same kind of item | $30.86 | comparable item: on Nail Tips Coffin Nail Tips Half Cover Extra Lon |
| Beauty | 192603115 Hot Long Lasting Butter Lipstick Color Frisky for Girls Glitter Lip Co | $123.43 | far above the same kind of item | $102.86 | comparable item: Hot Long Lasting Butter Lipstick Color Frisky for  |
| Beauty | 192773883 Highlighter Pens Makeup Makeup Forever Lip Lip Gloss Charms Lip Stuff  | $123.43 | far above the same kind of item | $82.29 | comparable item: Highlighter Pens Makeup Makeup Forever Lip Lip Glo |
| Beauty | 194387666 Pretty Little Thing Makeup Lip Gloss Glitter Base Korean Lip Peel Lip  | $123.43 | far above the same kind of item | $68.57 | comparable item: Pretty Little Thing Makeup Lip Gloss Glitter Base  |
| Beauty | 195313722 100percentpure Products Revolutionary Beauty Stuff Beauty from Eye Lin | $123.43 | far above the same kind of item | $82.29 | comparable item: 100percentpure Products Revolutionary Beauty Stuff |
| Beauty | 195857907 Clear Tips Coffin for Acrylic Nails Nail Tips for Acrylic Nails Short  | $123.43 | far above the same kind of item | $68.57 | comparable item: Short Ballerina Nails Clear on Medium Coffin Nails |
| Beauty | 198294386 Nail Tech Nail Rhinestones Glitter Pack Gel X on Nail Sticky Tabs on N | $123.43 | far above the same kind of item | $82.29 | comparable item: Nail Tech Nail Rhinestones Glitter Pack Gel X on N |
| Beauty | 199621373 Terracotta Lipstick Lip Voltage Plumper Better Lip Stain Every Day Mak | $123.43 | far above the same kind of item | $28.57 | comparable item: Miss Ocean Aloe Lipstick Lip Gloss with Glitter Fr |
| Beauty | 152304875 Handmade Soap Art Neroli Delight Sculpture Rose Beauty Gift Box Set (c | $121.16 | far above the same kind of item | $46.99 | comparable item: Sculpture Rose Chocolate Gift Set |
| Beauty | 261401627 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 325755274 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 447593692 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 508607736 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 576055356 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 641649295 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 671210465 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 715440774 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 785113891 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 965394733 Manicure Acetone Resistant Table Nail Table Beauty Salon Nail Station  | $120.45 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 48600097 Clinique CALYX Exhilarating Fragrance Spray for Women 3.4 oz | $118.18 | far above the same kind of item | $77.07 | median per-unit price of comparable items |
| Beauty | 105686822 Beautify Store Vanity Hair Stencils Foundation Makeup Brush Flat Top f | $117.82 | far above the same kind of item | $80.00 | comparable item: Doll 10 Beauty Brushes Eye Makeup Brushes Hairbrus |
| Beauty | 141258690 Eye Pads for Dry Eyes Eyelid Tape Fine Lines And Eyelash Extension Eye | $117.82 | far above the same kind of item | $10.70 | median price of the same kind of item |
| Beauty | 153870472 Fingernail Emery Rainbow Nail File Nmkl38 Nail Drill Bits Tweezers for | $117.82 | far above the same kind of item | $7.94 | median price of the same kind of item |
| Beauty | 812837613 Gelish Soak-Off Mini Harmony Complete Starter Gel Nail Polish Kit with | $116.99 | far above the same kind of item | $26.43 | comparable item: Gelish Mini Fearless and Fun Kung Fu Flair 6 Pack  |
| Beauty | 110004089 Stretch Hair Bands 100 Scrunchies Hair Ponytail Elastic Hair Bow Ties  | $116.64 | far above the same kind of item | $6.98 | median price of the same kind of item |
| Beauty | 139709802 Pro Conceal Cover Concealer L Midnight Contouring Stick for Makeup Use | $116.64 | far above the same kind of item | $83.97 | comparable item: Pro Conceal Cover Concealer L Midnight Contouring  |
| Beauty | 146636078 Glow Wand Makeup Dark Eye Foundation Stick Full Coverage Pot Beard Eye | $116.64 | far above the same kind of item | $83.61 | comparable item: Glow Wand Makeup Dark Eye Foundation Stick Full Co |
| Beauty | 163008791 Tint Gothic Makeup Gemstones Makeup Highlighter Sustainable Makeup Con | $116.64 | far above the same kind of item | $64.80 | comparable item: Neon Makeup Eye Brightener Stick Highlighter Makeu |
| Beauty | 171733958 Its My Birthday Stickers Really Good Stuff Milk Blur Stick Mini Makeup | $116.64 | far above the same kind of item | $10.73 | median price of the same kind of item |
| Beauty | 190663238 IGIA Flexible Sponge Beauty Blender Foundation Essence Sponges For Liq | $113.10 | far above the same kind of item | $15.99 | comparable item: IGIA Flexible Sponge Beauty Blender Foundation Ess |
| Beauty | 908347144 IGIA Flexible Sponge Beauty Blender Foundation Essence Sponges For Liq | $113.10 | far above the same kind of item | $15.99 | comparable item: IGIA Flexible Sponge Beauty Blender Foundation Ess |
| Beauty | 803195656 Gelish Soak-Off Mini Harmony Complete Starter Gel Nail Polish Kit with | $112.99 | far above the same kind of item | $39.68 | comparable item: Gelish Soak-Off Mini Complete Basix Gel Nail Polis |
| Beauty | 120501365 Lip Moisturizer And Plumper 28 Makeup Lip Gloss for Girls 10-12 Real L | $111.10 | far above the same kind of item | $88.00 | comparable item: Lip Moisturizer And Plumper 28 Makeup Lip Gloss fo |
| Beauty | 1898130761 Q-tips® Cotton Swabs, 750/pack, 12/carton | $109.85 | far above the same kind of item | $34.79 | comparable item: Q-Tips Cotton Swabs, 625 Ct (6 Pack) |
| Beauty | 997416783 1.75" CROWN RING LIP GLOSS, Case of 288 | $108.60 | far above the same kind of item | $85.20 | comparable item: 1.75" CROWN RING LIP GLOSS, Case of 144 |
| Beauty | 882596674 Flexible Sponge Beauty Blender Foundation Essence Sponges For Liquid & | $107.95 | far above the same kind of item | $43.11 | comparable item: Flexible Sponge Beauty Blender Foundation Essence  |
| Beauty | 189250248 Scrunchies for Curly Hair Clear Ponytail Elastics Hair Ties Thick Hair | $104.52 | far above the same kind of item | $6.98 | median price of the same kind of item |
| Beauty | 108624633 Clear Lip Gloss Pack Flavo Clear Lip Gloss Package Lip Gloss Kits with | $103.68 | far above the same kind of item | $88.00 | comparable item: Lip Glosses for Kids at Age 7-8 Lipstick en Tinted |
| Beauty | 159236026 Skin So Soft Oil Makeup Packaging Lip Gloss Mini Lip Gloss Mixer Mini  | $103.68 | far above the same kind of item | $82.29 | comparable item: Lipstick Sealer Gloss Make up for Teens Lip Gloss  |
| Beauty | 166804233 Shea Lip Pencils Clear Gloss Coral Lip Gloss The Man Chocolate Lip Sta | $103.68 | far above the same kind of item | $51.84 | comparable item: Shea Lip Pencils Clear Gloss Coral Lip Gloss The M |
| Beauty | 949171013 CHICIRIS Nail Art Cleaner,10pcs/set Nail UV Gel Polish Remover Clip So | $103.40 | far above the same kind of item | $17.16 | comparable item: DANCINGNAIL 5Pcs Toenail Soak Off Clip Caps Gel Na |
| Beauty | 201560708 Gelish Kung Fu Flair & Sassy Intergalactic Glam Gel Nail Polish Set (2 | $102.99 | far above the same kind of item | $58.89 | comparable item: Gelish Mini Fearless and Fun Kung Fu Flair 9mL Soa |
| Beauty | 101412873 Trays 20-25mm for Packaging Lashes Pack 25 Mm False Eyebrows Light Man | $102.86 | far above the same kind of item | $61.73 | comparable item: Mannequin Head Silicone Eyelash Fan Silicone Pads  |
| Beauty | 105356423 Rhinestones Small for Nails Paper Bead Roller Nail Sticker Rose Nail S | $102.86 | far above the same kind of item | $61.71 | comparable item: Rhinestones Small for Nails Paper Bead Roller Nail |
| Beauty | 110745041 Long Clear on Nails Gel Nail Tip Cute on Nails Clear Coffin Nail Tips  | $102.86 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 113305832 Clear on Nails Short Coffin Medium Ballerina Nails Full Cover with Rhi | $102.86 | far above the same kind of item | $30.86 | comparable item: on Nail Tips Coffin Nail Tips Half Cover Extra Lon |
| Beauty | 114533376 Gee Chin Applicator head Pore Rag Rollers Zit Stick Makeup Brush Sunbo | $102.86 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 114679932 berry Eyes Max Valentines Mad Shadow Snowflake Makeup Find My Shadow M | $102.86 | far above the same kind of item | $9.01 | median price of the same kind of item |
| Beauty | 114791210 Short Full Cover Coffin Nails Clear on Coffin Nails Coffin Clear Tips  | $102.86 | far above the same kind of item | $61.73 | comparable item: Stick on Nails Coffin Shape Nail Clear Tips Coffin |
| Beauty | 116011670 Highlighter Pens Makeup Makeup Forever Lip Lip Gloss Charms Lip Stuff  | $102.86 | far above the same kind of item | $82.29 | comparable item: Highlighter Pens Makeup Makeup Forever Lip Lip Glo |
| Beauty | 116700987 I Am Busy Lip Stain Miss Ocean Aloe Lipstick Makeup Purse Water Contex | $102.86 | far above the same kind of item | $9.22 | median price of the same kind of item |
| Beauty | 118545787 Lip Gloss Filler compatible with Machine Clear Mint Lip Gloss Lip Glos | $102.86 | far above the same kind of item | $80.00 | comparable item: Lip Gloss Filler compatible with Machine Clear Min |
| Beauty | 120337597 Lip Stain Rare Beauty Lipstick Valentines Day Lip Gloss Lip Tint Long  | $102.86 | far above the same kind of item | $88.00 | comparable item: Neutral Lipstick Frank Color Changing Lip Gloss Mi |
| Beauty | 120817515 Lipstick Natural Color Earth Lipstick Color Design Lipstick 12 Days of | $102.86 | far above the same kind of item | $82.29 | comparable item: Lipstick Natural Color Earth Lipstick Color Design |
| Beauty | 123241109 Lip Gloss Kids for Girls 4 Style up Lip Gloss Lip Gloss Roll on Fruit  | $102.86 | far above the same kind of item | $61.73 | comparable item: Roll on Lip Gloss for Kids Things to Make Lip Glos |
| Beauty | 124759235 Lip Gloss Kids for Girls 4 Style up Lip Gloss Lip Gloss Roll on Fruit  | $102.86 | far above the same kind of item | $61.73 | comparable item: Roll on Lip Gloss for Kids Things to Make Lip Glos |
| Beauty | 125233639 Clear Nail Tips Long Coffin Roofing Tarp Nails Extra Long Nail Tips Cl | $102.86 | far above the same kind of item | $63.00 | comparable item: Long Nail Tips Acrylic Practice Hand for Nails wit |
| Beauty | 126404540 Lip Plumping Lipstick Lip Gloss for Kids Tinted Lip Gloss Lip Moisturi | $102.86 | far above the same kind of item | $77.76 | comparable item: Clear Lip Gloss Plumper Peel off Lip Stain Lip Glo |
| Beauty | 127702204 Small Eyelash Curler Individual Eye Lashes Pack Colorful Eyelashes 12d | $102.86 | far above the same kind of item | $61.71 | comparable item: Small Eyelash Curler Individual Eye Lashes Pack Co |
| Beauty | 127877990 Nail Dot Pen Manicure Sticks for Nails Acrylic Nail Decorating Small N | $102.86 | far above the same kind of item | $80.00 | comparable item: Nail Dot Pen Manicure Sticks for Nails Acrylic Nai |
| Beauty | 138721835 Lip Tint Korean Gloss Super Shiny Lip Gloss Gloss Topper Lip Gloss Lip | $102.86 | far above the same kind of item | $82.29 | comparable item: Lip Tint Korean Gloss Super Shiny Lip Gloss Gloss  |
| Beauty | 140092778 Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empty 3d Eyelashes 20mm  | $102.86 | far above the same kind of item | $80.00 | comparable item: Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empt |
| Beauty | 146972237 Highlighter Pens Makeup Makeup Forever Lip Lip Gloss Charms Lip Stuff  | $102.86 | far above the same kind of item | $82.29 | comparable item: Highlighter Pens Makeup Makeup Forever Lip Lip Glo |
| Beauty | 150847027 Nail Dot Pen Manicure Sticks for Nails Acrylic Nail Decorating Small N | $102.86 | far above the same kind of item | $80.00 | comparable item: Nail Dot Pen Manicure Sticks for Nails Acrylic Nai |
| Beauty | 156280582 It Cute Lip Gloss for Girls Womens Beauty Products under 5 Clear Lipst | $102.86 | far above the same kind of item | $82.29 | comparable item: 28 Makeup Lip Gloss for Kids under 8 Lip Gloss Cle |
| Beauty | 160035816 Gel Brush Nail Stuff for Acrylic Nails Nail Brush Holder for Nail Tech | $102.86 | far above the same kind of item | $80.00 | comparable item: Gel Brush Nail Stuff for Acrylic Nails Nail Brush  |
| Beauty | 162094967 Nail Dot Pen Manicure Sticks for Nails Acrylic Nail Decorating Small N | $102.86 | far above the same kind of item | $80.00 | comparable item: Nail Dot Pen Manicure Sticks for Nails Acrylic Nai |
| Beauty | 165958671 Lip Gloss Peel And Reveal Lip Color Lip Gloss with Brush Hot Lip Gloss | $102.86 | far above the same kind of item | $82.29 | comparable item: Lip Gloss Peel And Reveal Lip Color Lip Gloss with |
| Beauty | 175470096 Lipstick Natural Color Earth Lipstick Color Design Lipstick 12 Days of | $102.86 | far above the same kind of item | $82.29 | comparable item: Lipstick Natural Color Earth Lipstick Color Design |
| Beauty | 177816568 Nail Dot Pen Manicure Sticks for Nails Acrylic Nail Decorating Small N | $102.86 | far above the same kind of item | $80.00 | comparable item: Nail Dot Pen Manicure Sticks for Nails Acrylic Nai |
| Beauty | 177845731 Western Nail Stickers Nail Decal Nail Factory Products Eye Rhinestones | $102.86 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 180723885 Violin Lipstick Peel off Lipstick Static Lipstick Day And Night Lip Pl | $102.86 | far above the same kind of item | $88.00 | comparable item: Violin Lipstick Peel off Lipstick Static Lipstick  |
| Beauty | 181195364 Lip Gloss Filler compatible with Machine Clear Mint Lip Gloss Lip Glos | $102.86 | far above the same kind of item | $80.00 | comparable item: Lip Gloss Filler compatible with Machine Clear Min |
| Beauty | 185086418 Acrylic Nails for Kids Age 9 French Tip Wire Nails Clear Nail Charms f | $102.86 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 187727837 Lip up Plumper Maximum Lip Plumper Glitter Lip Glaze Water Proof Makeu | $102.86 | far above the same kind of item | $61.73 | comparable item: Lip up Plumper Maximum Lip Plumper Glitter Lip Gla |
| Beauty | 193799653 Rhinestone on Nails Nail Sponge for French Tip Nail Kits That Come wit | $102.86 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 196695273 Nail Tech Nail Rhinestones Glitter Pack Gel X on Nail Sticky Tabs on N | $102.86 | far above the same kind of item | $82.29 | comparable item: Nail Tech Nail Rhinestones Glitter Pack Gel X on N |
| Beauty | 197645133 Lashes False Eyelashes Natural 30 Lashes for 20 False Eyelashes Natura | $102.86 | far above the same kind of item | $61.71 | comparable item: Long Lashes Individual 3d Eyelash 20 Eyelash Trays |
| Beauty | 199860313 Organic Lipstick Water Lip Stain Lawless Lipstick Lipstick That Stays  | $102.86 | far above the same kind of item | $82.29 | comparable item: Organic Lipstick Water Lip Stain Lawless Lipstick  |
| Beauty | 282159958 LIMITED TIME ONLY 10 Pieces Total Nail Care Manicure/Pedicure Set with | $99.99 | far above the same kind of item | $11.99 | comparable item: NEW 10 Pieces Total Nail Care Manicure/Pedicure Se |
| Beauty | 566680531 Gelish Complete Starter LED Gel Nail Polish Kit & Fearless and Fun Kun | $99.99 | far above the same kind of item | $26.43 | comparable item: Gelish Mini Fearless and Fun Kung Fu Flair 6 Pack  |
| Beauty | 448775000 Professional Portable Manicure Pedicure E-file Kit with Acrylic Fake N | $99.00 | far above the same kind of item | $9.50 | median price of the same kind of item |
| Beauty | 760313105 5.5" MAKE UP LIP GLOSS SET, Case of 24 | $96.90 | far above the same kind of item | $61.94 | comparable item: Make Up Beauty Set In Box 3 Assorted, Case of 24 |
| Beauty | 197551885 SPA Headband | $96.00 | far above the same kind of item | $6.51 | comparable item: Stitch Spa Headband |
| Beauty | 291548170 Flexible Sponge Beauty Blender Foundation Essence Sponges For Liquid & | $95.00 | far above the same kind of item | $17.44 | comparable item: Flexible Sponge Beauty Blender Foundation Essence  |
| Beauty | 152024145 Baby Elastic Hair Ties Smart Sleeper Toddler Scrunchies in Bulk Girl S | $93.31 | far above the same kind of item | $34.99 | comparable item: Clear Hair Rubber Bands Clear Small Hair Elastics  |
| Beauty | 161741101 Swirly Hair Ties Headbands for Short Hair Rubber Bands Hair Ties No Da | $93.31 | far above the same kind of item | $7.30 | median price of the same kind of item |
| Beauty | 175410123 Baby Elastic Hair Ties Smart Sleeper Toddler Scrunchies in Bulk Girl S | $93.31 | far above the same kind of item | $34.99 | comparable item: Clear Hair Rubber Bands Clear Small Hair Elastics  |
| Beauty | 622008122 Chapstick Mixed 24pc | $93.12 | far above the same kind of item | $4.27 | median price of the same kind of item |
| Beauty | 322522301 Dual Action Spray Air Brush And Compressor Set For Temporary Tattoo Na | $91.32 | far above the same kind of item | $17.36 | comparable item: Dual Action Gravity Feed Airbrush Spray Art Paint  |
| Beauty | 9605635 Axis Manicure Set/Foil Travel Kit | $90.00 | far above the same kind of item | $54.77 | comparable item: Axis Rotary Manicure Travel Kit |
| Beauty | 130644139 Elastic Ponytail Holders for Women's Hair Rip 60 Bands Rainbow Spiral  | $89.42 | far above the same kind of item | $31.35 | comparable item: Hair Tie for Women's Hair Non Fabric Ponytail Hold |
| Beauty | 185333135 Stretch Hair Bands 100 Scrunchies Hair Ponytail Elastic Hair Bow Ties  | $89.42 | far above the same kind of item | $6.98 | median price of the same kind of item |
| Beauty | 535871867 Jade Roller & Gua Sha, Face Roller, Facial Beauty Roller Skin Care Too | $89.00 | far above the same kind of item | $10.97 | median price of its category |
| Beauty | 164127444 20 Eyelashes Pack Small Eyelash Curler Wink Lashes 99 Eye 8d Mapping S | $88.36 | far above the same kind of item | $8.45 | median price of the same kind of item |
| Beauty | 101744424 Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empty 3d Eyelashes 20mm  | $88.00 | far above the same kind of item | $80.00 | comparable item: Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empt |
| Beauty | 104465621 Natural Nail Tips Medium Short Nail Tips Coffin Shape Half Cover Short | $88.00 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 110106417 3d Eyelashes Short False False Eyelashes with Applicator Lashes 20mm E | $88.00 | far above the same kind of item | $61.73 | comparable item: Eyelashes Extension Lashes Pack Lashes Lashes with |
| Beauty | 111279476 Clear Lip Gloss in A Tube Cute Lipsticks Long Wear Lip Gloss Beauty Co | $88.00 | far above the same kind of item | $82.29 | comparable item: Clear Lip Gloss in A Tube Cute Lipsticks Long Wear |
| Beauty | 113760242 Diva Nails on Gel Stickers Nail Stickers for on Nails Nail Stickers fo | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 120602174 Clear Acrylic Nail Tips Coffin Ballerina Clear on Nails Coffin Extra L | $88.00 | far above the same kind of item | $61.73 | comparable item: Acrylic Nails for Small Nails False Nails Coffin S |
| Beauty | 121456585 Stuff to Do Nails Nail Buffer And File Ceramic Nail File Toenail Fille | $88.00 | far above the same kind of item | $61.73 | comparable item: Nail Filers for Acrylic Nails Emery for Toenails N |
| Beauty | 122832379 Color Lashes Reusable Self Lashes Individual Lashes C Curl Lashes Stri | $88.00 | far above the same kind of item | $80.00 | comparable item: Salon Lashes 614 20 Mm Lashes 3 Second Lashes Empt |
| Beauty | 126510618 Natural Nail Tips Medium Short Nail Tips Coffin Shape Half Cover Short | $88.00 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 127760133 Peel And Stick Nails Nail Sponge for French Tip Nail Containers for Na | $88.00 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 128652976 Nail Holder for Acrylic Nails Nail Hand Practice under 5 Static Nails  | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 129992470 Peel And Stick Nails Nail Sponge for French Tip Nail Containers for Na | $88.00 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 135076069 Hard Gel Nail Tips Coffin Nails Short Length Long Acrylic Nails Nail f | $88.00 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 136173771 Nail Decals Designer Nail Sticker Polish Glitter Kids Fingernail Polis | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 137240968 Extra Long Clear Acrylic Nail Tips Nail Tech Stuff Full Cover Nail Tip | $88.00 | far above the same kind of item | $61.73 | comparable item: Nails on Long Nail Tips Full Nail Tips Clear Coffi |
| Beauty | 141439878 Coffin Clear Nail Tips Long Heart on Nails Cre8tion Nail Tips 600 Shor | $88.00 | far above the same kind of item | $61.71 | comparable item: on Nails Clear Short Oval Acrylic Nails Tips Coffi |
| Beauty | 142319811 Hard Gel Nail Tips Coffin Nails Short Length Long Acrylic Nails Nail f | $88.00 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 144664267 Nail Polish Remover Clips Bits for Nail Cutters Tweezers Eyelash Exten | $88.00 | far above the same kind of item | $61.71 | comparable item: Nail Polish Remover Clips Bits for Nail Cutters Tw |
| Beauty | 145392408 Nail Tips for Gel Polish Hard Gel Nail Forms French Nail Tips Size 3 I | $88.00 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 146828473 Gel X Short Clear Full Cover Nails Clear Coffin Nail Tips Half Well Fa | $88.00 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 149868525 And Oil Fingernail Files Coarse Grit Glass Toenail File on Manicure Ba | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 151153672 Nails Tips Nail Tips round Nail on Coffin Nail Tips Clear Nail Tips Fu | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 153084497 Extra Long Full Coverage Nails Practice Hand Tips Different Sizes Toen | $88.00 | far above the same kind of item | $30.86 | comparable item: on Nail Tips Coffin Nail Tips Half Cover Extra Lon |
| Beauty | 158718311 Nail Buffer Sanding Acrylic Nail Filer under 10 Nail for Nail Tech Org | $88.00 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 159277496 Acrylic Nail Tips Coffin Half Long Tips Nail Hands to Practice Coffin  | $88.00 | far above the same kind of item | $57.27 | comparable item: Extra Long Nails Coffin Flake Nails for Teens Long |
| Beauty | 168543035 Diva Nails on Gel Stickers Nail Stickers for on Nails Nail Stickers fo | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 170131048 Nail Stuff for Acrylic Nails Comes with Everything Nail Paper Forms Co | $88.00 | far above the same kind of item | $68.57 | comparable item: Short Ballerina Nails Clear on Medium Coffin Nails |
| Beauty | 172091161 Natural Looking Eyelashes Pack 4d Lashes 27mm Stick on Eyelashes Eyela | $88.00 | far above the same kind of item | $61.71 | comparable item: Long Lashes Individual 3d Eyelash 20 Eyelash Trays |
| Beauty | 173282768 Coffin False Nails Clear Full Nail Tips Short Coffin Clear Forms Tips  | $88.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 176074771 Clear Coffin Nails on Nail Tips Acrylic Coffin Shape Cute Nails Medium | $88.00 | far above the same kind of item | $61.71 | comparable item: Coffin Nail Clear Tips Long Acrylic Nails Coffin o |
| Beauty | 176755048 Extra Long Nails Tips Full Tip Nails Coffin Short Nails Short Long on  | $88.00 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 185263609 Cat Eye Lashes Natural Look Small Lashes Thin Lashes Color Extensions  | $88.00 | far above the same kind of item | $8.45 | median price of the same kind of item |
| Beauty | 188568130 Nail Quotes O2 Nails Acrylic Nail Products French Manicure Nail Sticke | $88.00 | far above the same kind of item | $61.73 | comparable item: Nail Sticker Letters Stickers for Nails Rhinestone |
| Beauty | 199910134 Hard Gel Nail Tips Coffin Nails Short Length Long Acrylic Nails Nail f | $88.00 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 46458401 8pc Nail Polish | $87.51 | far above the same kind of item | $3.86 | comparable item: Hello Kitty Nail Polish Set, 8 pc |
| Beauty | 496572171 3D Reusable Ultra Thin Magnetic False Eyelashes - 5 Pair | $86.25 | far above the same kind of item | $52.16 | comparable item: 3D Reusable Ultra Thin Magnetic False Eyelashes -  |
| Beauty | 910464660 3D Reusable Ultra Thin Magnetic False Eyelashes - 5 Pair | $86.25 | far above the same kind of item | $52.16 | comparable item: 3D Reusable Ultra Thin Magnetic False Eyelashes -  |
| Beauty | 847656092 Dual Action Spray Air Brush And Compressor Set For Temporary Tattoo Na | $85.25 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 138268557 Curly Ponytail Holder 70 Scrunchies Small Hair Elastics 2mm Large Pony | $83.97 | far above the same kind of item | $55.44 | comparable item: Curly Ponytail Holder 70 Scrunchies Small Hair Ela |
| Beauty | 446059184 Strong Hair Ties Rubber Scrunchies for Girls Makeup Hair Band Hair Ela | $83.97 | far above the same kind of item | $6.98 | median price of the same kind of item |
| Beauty | 527454561 Coffin Nails Tips Coffin on Nails Medium Length Clear Gel X Nail Gel X | $83.97 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 148555340 Rubber Bands Thick Heavy Duty Hair Band Remover Elastic Small Hair Ban | $83.61 | far above the same kind of item | $32.40 | comparable item: 90s Anime Hair Band Rubber Bands Thick Heavy Duty  |
| Beauty | 151084412 Curly Ponytail Holder 70 Scrunchies Small Hair Elastics 2mm Large Pony | $83.61 | far above the same kind of item | $55.44 | comparable item: Curly Ponytail Holder 70 Scrunchies Small Hair Ela |
| Beauty | 159030861 Headbands for Women 5 Spiral Scrunchies Strong Hold Thin Hair Ties for | $83.61 | far above the same kind of item | $31.35 | comparable item: Fabric Scrunchies Scrunchies Ribbons for Girls Tod |
| Beauty | 169813537 Sponges for Makeup Makeup Pads Exfoliating Make up Sponge Wand but Puf | $83.61 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 190694857 Headbands for Women 5 Spiral Scrunchies Strong Hold Thin Hair Ties for | $83.61 | far above the same kind of item | $31.35 | comparable item: Fabric Scrunchies Scrunchies Ribbons for Girls Tod |
| Beauty | 101860214 Baby Yogurt Melts Baby First Foods Stage 1 Baby Stage One Baby Food Ba | $82.29 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Beauty | 104074980 Letter Nail Stickers Cowboys Sticker with Name Color Street Nails Stri | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 104750195 Toddler Hair Brush One Items A Lot of Makeup Small Makeup Brush Double | $82.29 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 113014988 Sponges Pack Makeup Makeup Pads Disposable Sponges for Face Disposable | $82.29 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 114458461 Clear Full Cover Nail Tips Extra Long Nail Acrylic Tips Coffin Oval Sh | $82.29 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 118048614 Extra Long Nails Tips Full Tip Nails Coffin Short Nails Short Long on  | $82.29 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 119355034 on Nail Display Book Nail on Coffin Shape Long Nail Tips Super Long Ac | $82.29 | far above the same kind of item | $61.73 | comparable item: Coffin Shaped Nail Tips Half Cover Short Tips on N |
| Beauty | 119619375 French Tip Nail Stickers Nail for on Nails on Toe Nails Clear on Nails | $82.29 | far above the same kind of item | $61.73 | comparable item: Charms for Nails Clear Short False Nails Gemstones |
| Beauty | 121598824 Designer Sticker for Nails Design Nail Holiday Stickers Gel Strips Nai | $82.29 | far above the same kind of item | $61.73 | comparable item: French Nail Stickers Toes Wrap Nails Girls Stick o |
| Beauty | 121872608 Clear Practice Hand Nail Tips Brass Nail Covers Practice Nail Tips on  | $82.29 | far above the same kind of item | $28.57 | comparable item: False Nail Tips Short Coffin Acrylic Practice Hand |
| Beauty | 122985638 Acrylic Nails Gel Nails Kits with Everything Nail Polishes Not Polish  | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 124289923 X Long Coffin Nail Tips Coffin Tips on Clear French Nail Tips Acrylic  | $82.29 | far above the same kind of item | $30.86 | comparable item: Clear False Nails Extra Long Nail Hand Rest on Nai |
| Beauty | 124612474 Nail Form Hard Gel Nail Forms Clear Nail Tips for Practice Hand Long C | $82.29 | far above the same kind of item | $28.57 | comparable item: False Nail Tips Short Coffin Acrylic Practice Hand |
| Beauty | 128856276 Wedding Ring under Eye Concealer Brush Advent Calendar Beauty Makeup C | $82.29 | far above the same kind of item | $61.73 | comparable item: Make up Brushes Face Full Size Makeup Lots Denim B |
| Beauty | 129952210 Extended Nail Tips Coffin Nail Coffin Tips Short Straight Nail Tips Lo | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 134450348 Graver Tips Nail for Acrylic Nails Long Clear Nail Tips for Acrylic Na | $82.29 | far above the same kind of item | $30.86 | comparable item: on Nail Tips Coffin Nail Tips Half Cover Extra Lon |
| Beauty | 139128827 Fall Nail Glitter Bling Charms Nail Your Numbers Short Nails on Rhines | $82.29 | far above the same kind of item | $61.73 | comparable item: Fall Nail Glitter Bling Charms Nail Your Numbers S |
| Beauty | 145351654 Peel And Stick Nails Nail Sponge for French Tip Nail Containers for Na | $82.29 | far above the same kind of item | $7.86 | median price of the same kind of item |
| Beauty | 146480399 Realistic Silicone Hand for Acrylic Nails on Nails Clear Coffin Long U | $82.29 | far above the same kind of item | $61.73 | comparable item: Nails for on Nails Clear Acrylic Nails Painted Sho |
| Beauty | 147523023 Acrylic Nail Tips Long False Nails with Designs Coffin Short Acrylic C | $82.29 | far above the same kind of item | $68.57 | comparable item: Short Ballerina Nails Clear on Medium Coffin Nails |
| Beauty | 148157616 Curved Nail Tips Ballerina Acrylic Nails on Kids Acrylic on Nails Long | $82.29 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 156310801 Nails Tips Long Full Cover Nails Long French Form Long Tips Gel Nail E | $82.29 | far above the same kind of item | $68.57 | comparable item: Short Ballerina Nails Clear on Medium Coffin Nails |
| Beauty | 161813227 Coffin Clear Nail Tips Long Heart on Nails Cre8tion Nail Tips 600 Shor | $82.29 | far above the same kind of item | $61.71 | comparable item: on Nails Clear Short Oval Acrylic Nails Tips Coffi |
| Beauty | 162468036 on Long Acrylic Nails Very Nail Stuff Clear Acrylic Nails Oval on Nail | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 162807330 Fame Nails Short in Nails Acrylic Nails File80/80 Full Cover Nails Cof | $82.29 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 165604738 Nails Medium Length Tips Acrylic Polished Nails on Nails Long Coffin w | $82.29 | far above the same kind of item | $61.73 | comparable item: Nails on Long Nail Tips Full Nail Tips Clear Coffi |
| Beauty | 165655926 Gel Nail Brush Set Nail Things Brush for Nails Nail Base Coat Dip Top  | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 165964583 on Long Acrylic Nails Very Nail Stuff Clear Acrylic Nails Oval on Nail | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 172487504 Designer Sticker for Nails Design Nail Holiday Stickers Gel Strips Nai | $82.29 | far above the same kind of item | $61.73 | comparable item: French Nail Stickers Toes Wrap Nails Girls Stick o |
| Beauty | 174568658 Nail Buffer Bits E Filer for Nails Rechargeable Nail File 100 Grit Nai | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 176328158 Long Clear Acrylic Nails Tips Nail Forms for Acrylic Nails Full Nails  | $82.29 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 179096979 on Nail Tips Coffin Nail Tips Half Cover Extra Long Nail Forms Long fo | $82.29 | far above the same kind of item | $30.86 | comparable item: on Nail Tips Coffin Nail Tips Half Cover Extra Lon |
| Beauty | 182969804 on Toe Nails Coffin Long Ballerina Coffin Nails Stick on Acrylic Nails | $82.29 | far above the same kind of item | $61.73 | comparable item: Coffin Shaped Nail Tips Half Cover Short Tips on N |
| Beauty | 186756532 Hypnotized Asian Crush 28 Lip Gloss 5 Items And under Lip Care for Dry | $82.29 | far above the same kind of item | $5.47 | median price of the same kind of item |
| Beauty | 188640946 Kids Fingernail Polish Kid Nail Gel Polish Peel off Nail Lacquer Nail  | $82.29 | far above the same kind of item | $57.27 | comparable item: Kids Fingernail Polish Kid Nail Gel Polish Peel of |
| Beauty | 199239543 False Nail Half Nail Tips Clear Clear Tips for Acrylic Nails Ballerina | $82.29 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 648588402 Nail Pencil Wipes Tweezers with Light Acrylic Nail Stickers Glitter Ma | $82.29 | far above the same kind of item | $44.19 | comparable item: Nail Pencil Wipes Tweezers with Light Acrylic Nail |
| Beauty | 843643739 Portable E Nail File Home Nail Salon Kits 80/80 Grit Nail Files Curved | $82.29 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 100616845 Nail Tips Coffin Shape Half Cover on Nails Handmade Clear Nail Sticks  | $80.00 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 106588616 Practice Finger Nails Tips Full Nail Covers Nails Tips Coffin Ballerin | $80.00 | far above the same kind of item | $63.00 | comparable item: Long Nail Tips Acrylic Practice Hand for Nails wit |
| Beauty | 112904271 French Tip Nail Stickers Nail for on Nails on Toe Nails Clear on Nails | $80.00 | far above the same kind of item | $61.73 | comparable item: Charms for Nails Clear Short False Nails Gemstones |
| Beauty | 119163856 Full Well Nail Tips Natural 500 Nail Tips for Acrylic Nails Nail Pract | $80.00 | far above the same kind of item | $61.73 | comparable item: Stick on Nails Coffin Shape Nail Clear Tips Coffin |
| Beauty | 119431469 Nail Brush Set for Application #8 Nail Tip Set Powe Nail Sanding Bands | $80.00 | far above the same kind of item | $61.71 | comparable item: Fine Glitter for Nails Set Jelly Nails Nail Brush  |
| Beauty | 122511519 Natural Nail Tips Medium Short Nail Tips Coffin Shape Half Cover Short | $80.00 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 128089184 on Nail Tips Coffin Nail Tips Half Cover Extra Long Nail Forms Long fo | $80.00 | far above the same kind of item | $30.86 | comparable item: on Nail Tips Coffin Nail Tips Half Cover Extra Lon |
| Beauty | 128814193 Impress Mini Nails Impress Color on Nails Nails for Acrylic Tips Clear | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 147740573 Diva Nails on Gel Stickers Nail Stickers for on Nails Nail Stickers fo | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 149389801 on Nails Acrylic Look Acrylic Nail Tips Long Coffin Nail Tips Coffin S | $80.00 | far above the same kind of item | $61.71 | comparable item: Long Clear Acrylic Nails Tips Nail Forms for Acryl |
| Beauty | 151327455 Clear Full Cover Nail Tips Extra Long Nail Acrylic Tips Coffin Oval Sh | $80.00 | far above the same kind of item | $61.71 | comparable item: Extra Long Nails Tips Full Tip Nails Coffin Short  |
| Beauty | 158684656 Extra Long Nails Coffin Flake Nails for Teens Long Coffin Nail Tips Cl | $80.00 | far above the same kind of item | $57.27 | comparable item: Extra Long Nails Coffin Flake Nails for Teens Long |
| Beauty | 161837247 Medium on Nails Nail Wraps for Kids Solid Color Christmas Glitter for  | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 162068862 Heart Rhinestones for Nails Nail Stuff French Tip Sponge Nails Rhinest | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 165789070 French Tip Nail Stickers Nail for on Nails on Toe Nails Clear on Nails | $80.00 | far above the same kind of item | $61.73 | comparable item: Charms for Nails Clear Short False Nails Gemstones |
| Beauty | 165957488 Nail Sequins Nail Glitters Nail Stickers Bling Gel for Nails Nail Gens | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 170722825 Foot Rasp Nail Acrylics Coffin Gel X System False Nails Short Length S | $80.00 | far above the same kind of item | $61.73 | comparable item: Hard Gel Nail Tips Coffin Nails Short Length Long  |
| Beauty | 171125946 French Tip Nail Stickers Nail for on Nails on Toe Nails Clear on Nails | $80.00 | far above the same kind of item | $61.73 | comparable item: Charms for Nails Clear Short False Nails Gemstones |
| Beauty | 176002074 Face Nail Clear Gel Nail Tips Ballerina False Fingernails Practice Han | $80.00 | far above the same kind of item | $61.71 | comparable item: Fingernails Coffin Long Nails Clear Short Acrylic  |
| Beauty | 178091938 Coffin Acrylic Nail Tips Clear Full Coverage Nail Tips Long Ballerina  | $80.00 | far above the same kind of item | $61.73 | comparable item: Nails for on Nails Clear Acrylic Nails Painted Sho |
| Beauty | 225512384 Medium Coffin on Nails on Nails Coffin Long Design Nail Tips for Acryl | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 715948602 Nail Medic Groomers Choice Smocks Cute Dampen Dish Emergency Eyebrows  | $80.00 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Beauty | 155068075 Soft Stretch Elastic Braid Scrunchies for Thick Hair Good Design Works | $77.76 | far above the same kind of item | $6.98 | median price of the same kind of item |
| Beauty | 123574058 Cerave Oil Control Value Size Foaming Facial Cleanser, 16 fl oz | $63.79 | far above the same item's other variants | $18.24 | comparable item: CeraVe Hydrating Foaming Oil Facial Cleanser for D |
| Beauty | 409143598 Dual Heads Cotton Swabs Applicator 500x24pcs For Home Hospital | $61.34 | far above the same kind of item | $5.17 | median price of the same kind of item |
| Beauty | 1071192948 Q-tips® Cotton Swabs, Antibactrial, 300/pack, 12/carton | $58.04 | far above the same kind of item | $34.79 | comparable item: Q-Tips Cotton Swabs, 625 Ct (6 Pack) |
| Beauty | 293359645 COTTON BALLS 100 CT JUMBO , Case Pack of 24 | $55.49 | far above the same kind of item | $22.80 | comparable item: Equate Jumbo Cotton Balls, 400 Count |
| Beauty | 49024739 China Glaze Nail Polish With Hardener, Purple Panic 1008 | $50.67 | far above the same item's other variants | $17.66 | comparable item: China Glaze Nail Polish With Hardener, Frostbite 6 |
| Beauty | 6016592844 Alvantor Shampoo Bar Soap for Gray Coverage in All Hair Types, 1.67oz | $49.99 | far above the same item's other variants | $7.67 | comparable item: Alvantor Shampoo Bar Soap, Gray Coverage for All H |
| Beauty | 6027029111 Alvantor Collagen Face Mask, Peel Off Mask with Brush, Hydrating, Firm | $49.99 | far above the same item's other variants | $5.99 | comparable item: Alvantor Collagen Face Mask, Hydrating Peel off Ma |
| Beauty | 6027029129 Alvantor Silicone Scar Gel for C-Section, Stretch Marks, Acne, and Sur | $49.99 | far above the same item's other variants | $23.99 | comparable item: Alvantor Silicone Scar Gel for C-Section, Stretch  |
| Beauty | 20700666339 Alvantor Collagen Face Serum Essence for Instant Face Lift & Anti-Agin | $49.99 | far above the same item's other variants | $10.99 | comparable item: Alvantor Collagen Anti-Aging Face Serum, Instant F |
| Beauty | 20728672676 Alvantor Facial Cleanser, Turmeric Face Wash with Brush for All Skin,  | $49.99 | far above the same item's other variants | $6.49 | comparable item: Alvantor Facial Cleanser, Daily Face Wash for All  |
| Beauty | 20788372756 Alvantor Intensive Tanning Gel, Browning Tan Accelerator for Wheat Col | $49.99 | far above the same item's other variants | $8.77 | comparable item: Alvantor Intensive Tanning Gel, Browning Tan Accel |
| Beauty | 20840704433 Alvantor Brightening Foaming Facial Cleanser with Turmeric and Hyaluro | $49.99 | far above the same item's other variants | $10.99 | comparable item: Alvantor Brightening Foaming Facial Cleanser with  |
| Beauty | 21075458067 Alvantor Instant Tighten Lift Face Serum with Hyaluronic Acid & Vitami | $49.99 | far above the same item's other variants | $8.20 | comparable item: Alvantor Instant Tighten Lift Face Serum with Hyal |
| Beauty | 14116471654 Nexxus Clean and Pure Daily Shampoo, Conditioner, & Heat Protectant Sp | $47.81 | far above the same item's other variants | $8.52 | median per-unit price of comparable items |
| Beauty | 197361845 Revlon Uniq One Coconut Hair & Scalp Conditioning Shampoo 33.8 Fl Oz. | $39.76 | far above the same item's other variants | $83.63 | comparable item: Revlon Uniq One Coconut Hair & Scalp Conditioning  |
| Beauty | 14869252 L'Oreal Paris Visible Lift Serum Foundation Makeup, 157 Classic Tan, 1 | $35.98 | far above the same item's other variants | $18.49 | comparable item: L'Oreal Paris Visible Lift Serum Foundation Makeup |
| Beauty | 14110973491 SheaMoisture Strengthening Bond Repair Amla Oil Shampoo, Conditioner,  | $35.93 | far above the same item's other variants | $10.97 | comparable item: SheaMoisture Bond Repair Conditioner Strengthens A |
| Beauty | 16351461747 Mielle Pomegranate and Honey LeaveIn Conditioner, Curl Mousse, and Coi | $35.91 | far above the same item's other variants | $13.58 | comparable item: Mielle Pomegranate & Honey Coil Sculpting Custard  |
| Beauty | 14033269623 SheaMoisture Moisturizing Intensive Hydration Manuka Honey & Mafura Oi | $34.91 | far above the same item's other variants | $14.66 | comparable item: SheaMoisture Leave-In Conditioner for Curly Hair I |
| Beauty | 10314555 L'Oreal Paris Infallible Never Fail Liquid Makeup with SPF 20, Classic | $34.40 | far above the same item's other variants | $17.99 | comparable item: L'Oreal Paris Infallible Never Fail Liquid Makeup  |
| Beauty | 23703320 Revlon ColorStay Ultimate Suede Lipstick, Longwear Soft, Ultra-Hydrati | $32.99 | far above the same item's other variants | $7.98 | comparable item: Revlon ColorStay Ultimate Suede Lipstick, Longwear |
| Beauty | 14869258 L'Oreal Paris Visible Lift Serum Liquid Foundation, SPF 17, 1 fl oz | $31.96 | far above the same item's other variants | $32.50 | comparable item: L'Oreal Paris Visible Lift Serum Foundation Makeup |
| Beauty | 209369281 Aussie Hair Insurance Leave-In Conditioner w/ Jojoba & Sea Kelp, 8.0 f | $30.69 | far above the same item's other variants | $9.50 | comparable item: Aussie Hair Insurance Leave-In Conditioner w/ Jojo |
| Beauty | 311933492 LOreal Professional Hair Touch Up Root Concealer Spray - Auburn | $30.00 | far above the same item's other variants | $29.74 | comparable item: Style Edit Root Concealer Non-Permanent Touch Up S |
| Beauty | 596665574 Maybelline Dream Radiant Liquid Foundation Makeup, 40 Nude, 1 fl oz | $29.99 | far above the same item's other variants | $14.98 | comparable item: Maybelline Dream Radiant Liquid Foundation Makeup, |
| Beauty | 14869275 L'Oreal Paris Visible Lift Serum Liquid Foundation, SPF 17, 1 fl oz | $28.99 | far above the same item's other variants | $32.50 | comparable item: L'Oreal Paris Visible Lift Serum Foundation Makeup |
| Beauty | 137801752 OGX Fade-Defying + Orchid Oil Moisturizing Daily Shampoo, 13 fl oz | $28.93 | far above the same item's other variants | $14.47 | comparable item: OGX Fade-Defying + Orchid Oil Conditioner, 13.0 FL |
| Beauty | 16375705363 Mielle Organics Rosemary Mint Shampoo and Conditioner with strengethin | $28.91 | far above the same item's other variants | $8.97 | comparable item: Mielle Rosemary Mint Strengthening Conditioner - 1 |
| Beauty | 509682788 Maybelline SuperStay Matte Ink Liquid Lipstick, Coffee Edition, Hazeln | $28.66 | far above the same item's other variants | $8.38 | comparable item: Maybelline SuperStay Matte Ink Liquid Lipstick, Co |
| Beauty | 749273036 Herbal Essences Naked Volume White Grapefruit & Mosa Mint Shampoo and  | $27.63 | far above the same item's other variants | $9.99 | comparable item: Herbal Essences Bio:renew White Grapefruit & Mosa  |
| Beauty | 352743896 Maybelline Dream Urban Cover Full Coverage Foundation, SPF 50, Sun Bei | $26.99 | far above the same item's other variants | $19.99 | comparable item: Maybelline Dream Urban Cover Full Coverage Foundat |
| Beauty | 491360720 Maybelline SuperStay Matte Ink Liquid Lipstick, Coffee Edition, Carame | $26.99 | far above the same item's other variants | $8.38 | comparable item: Maybelline SuperStay Matte Ink Liquid Lipstick, Co |
| Beauty | 5823824607 NYX Professional Makeup Marshmellow Primer & Matte Setting Spray Bundl | $26.94 | far above the same item's other variants | $54.15 | comparable item: NYX Professional Makeup Marshmellow Smoothing Face |
| Beauty | 792542037 OGX Anti-Hair Fall + Coconut Caffeine Strengthening Shampoo with Coffe | $26.21 | far above the same item's other variants | $8.13 | median per-unit price of comparable items |
| Beauty | 520964397 NYX Professional Makeup Studio Finished Studio Finishing Powder, Trans | $25.99 | far above the same item's other variants | $12.70 | comparable item: 6 Pack - NYX Professional Makeup Studio Finishing  |
| Beauty | 172644507 Maybelline Dream Radiant Liquid Foundation Makeup, 20 Classic Ivory, 1 | $25.63 | far above the same item's other variants | $20.00 | comparable item: Maybelline Dream Radiant Liquid Foundation Makeup, |
| Beauty | 879776445 Maybelline Dream Radiant Liquid Foundation Makeup, 120 Caramel, 1 fl o | $25.63 | far above the same item's other variants | $14.98 | comparable item: Maybelline Dream Radiant Liquid Foundation Makeup, |
| Beauty | 998697181 Maybelline Dream Radiant Liquid Foundation Makeup, 90 Honey Beige, 1 f | $25.63 | far above the same item's other variants | $12.62 | comparable item: Maybelline Dream Radiant Liquid Foundation Makeup, |
| Beauty | 554490761 Maybelline Dream Radiant Liquid Foundation Makeup, 05 Vanilla, 1 fl oz | $25.49 | far above the same item's other variants | $14.98 | comparable item: Maybelline Dream Radiant Liquid Foundation Makeup, |
| Beauty | 22156315 Revlon Liquid Lipstick with Clear Lip Gloss by Revlon, ColorStay Face  | $25.10 | far above the same item's other variants | $24.00 | comparable item: Revlon Liquid Lipstick with Clear Lip Gloss by Rev |
| Beauty | 23703311 Revlon ColorStay Ultimate Suede Lipstick, Longwear Soft, Ultra-Hydrati | $24.99 | far above the same item's other variants | $7.98 | comparable item: Revlon ColorStay Ultimate Suede Lipstick, Longwear |
| Beauty | 992069740 OGX Smoothing + Liquid Pearl Shine Enhancing Daily Shampoo, 13 fl oz | $24.99 | far above the same item's other variants | $9.29 | comparable item: OGX Anti-Breakage + Keratin Oil Fortifying Anti-Fr |
| Beauty | 791417397 Maybelline Dream Urban Cover Full Coverage Foundation Makeup, SPF 50,  | $24.98 | far above the same item's other variants | $14.99 | comparable item: Maybelline Dream Urban Cover Full Coverage Foundat |
| Beauty | 622852617 China Glaze Nail Polish, Evening Seduction, 0.5 oz | $24.70 | far above the same item's other variants | $5.00 | comparable item: China Glaze Nail Polish, Agro, 0.5 Oz |
| Beauty | 21089613417 Alvantor Instant Tighten Lift Face Serum with Hyaluronic Acid & Vitami | $23.99 | far above the same item's other variants | $8.20 | comparable item: Alvantor Instant Tighten Lift Face Serum with Hyal |
| Beauty | 43981251 OGX Moisture + Vitamin B5 Conditioner, 13.0 FL OZ | $23.72 | far above the same item's other variants | $14.47 | comparable item: OGX Healing + Vitamin E Conditioner, 13.0 FL OZ |
| Beauty | 823036661 Maybelline Dream Urban Cover Liquid Foundation Makeup, SPF 50, Warm Nu | $23.50 | far above the same item's other variants | $9.24 | comparable item: Maybelline Dream Urban Cover Liquid Foundation Mak |
| Beauty | 10314327 L'Oreal Paris True Match Super Blendable Oil Free Makeup Powder, Shell | $23.20 | far above the same item's other variants | $8.97 | comparable item: L'Oreal Paris True Match Super Blendable Oil Free  |
| Beauty | 16929084 New York Color Sensational Lipstick, Warm Latte | $23.00 | far above the same item's other variants | $7.24 | comparable item: Maybelline NEW YORK Color Sensational Lipstick, |
| Beauty | 10314323 L'Oreal Paris True Match Super Blendable Oil Free Makeup Powder, Cappu | $22.99 | far above the same item's other variants | $8.97 | comparable item: L'Oreal Paris True Match Super Blendable Oil Free  |
| Beauty | 440400926 Head & Shoulders Clinical Strength Dry Scalp Rescue Shampoo 13.5 fl oz | $22.97 | far above the same item's other variants | $20.92 | comparable item: Head and Shoulders Dandruff Shampoo Twin Pack, Cli |
| Beauty | 377140134 Maybelline Dream Urban Cover Liquid Foundation Makeup, SPF 50, Buff Be | $22.88 | far above the same item's other variants | $9.24 | comparable item: Maybelline Dream Urban Cover Liquid Foundation Mak |
| Beauty | 842465434 Sensationail Gel Nail Polish, Nudes Collection, 3 Colors, 0.25 fl oz | $22.86 | far above the same item's other variants | $6.84 | comparable item: SensatioNail Gel Nail Polish (Pink), Pink Party, 0 |
| Beauty | 26978208 SoftSheen-Carson Dark and Lovely Au Naturale Anti-Shrinkage Hydrating  | $22.69 | far above the same item's other variants | $8.82 | comparable item: SoftSheen-Carson Dark and Lovely Au Naturale Moist |
| Beauty | 6138171660 Maui Moisture Scalp Care Clarifying Shampoo, Rejuvenating Conditioner, | $22.24 | far above the same item's other variants | $6.99 | comparable item: Maui Moisture Scalp Care Rejuvenating Conditioner  |
| Beauty | 445620381 Sensationail Gel Nail Polish, Brights Collection, 3 Colors, 0.25 fl oz | $21.57 | far above the same item's other variants | $6.84 | comparable item: SensatioNail Gel Nail Polish (Pink), Pink Party, 0 |
| Beauty | 13265867316 L'Oreal Paris Elvive Total Repair Extreme Renewing Shampoo, Conditione | $20.91 | far above the same item's other variants | $15.36 | comparable item: L'Oreal Paris Elvive Total Repair Extreme Renewing |
| Beauty | 13303005591 L'Oreal Paris Elvive Hyaluron Plump 72H Hydrating Shampoo, Conditioner | $20.91 | far above the same item's other variants | $9.94 | comparable item: L'Oreal Paris Elvive Hyaluron Plump 72H Hydrating  |
| Beauty | 690805949 Pantene Nutrient Blends Hair Volume Multiplier with Bamboo Shampoo For | $20.37 | far above the same item's other variants | $42.35 | comparable item: Pantene Nutrient Blends Hair Volume Multiplier Sil |
| Beauty | 354026143 OGX Purifying + Charcoal Detox Clarifying Daily Conditioner, 13 fl oz | $20.00 | far above the same item's other variants | $16.30 | comparable item: OGX Purifying + Charcoal Detox Shampoo for Buildup |
| Beauty | 110146565 Garnier Fructis Full & Plush Fortifying Conditioner for Fine and Flat  | $19.99 | far above the same item's other variants | $3.21 | comparable item: Garnier Fructis Full & Plush Fortifying Conditione |
| Beauty | 556780171 Suave Tea Tree & Hemp Seed Revitalizing Shampoo 28 fl oz | $19.99 | far above the same item's other variants | $10.39 | comparable item: Suave Shampoo Tea Tree Hemp Seed 18 FO |
| Beauty | 913856542 OGX Anti-Hair Fall + Coconut Caffeine Strengthening Conditioner with C | $19.90 | far above the same item's other variants | $8.08 | median per-unit price of comparable items |
| Beauty | 34121579 Maybelline New York Color Sensational Lipstick (The Buffs), Maple Kiss | $19.75 | far above the same item's other variants | $6.38 | comparable item: Maybelline New York Color Sensational The Buffs Li |
| Beauty | 543340151 Extra Strength Teatree Mint Refreshing Conditioner | $18.99 | far above the same item's other variants | $15.99 | comparable item: Extra Strength Teatree Mint Refreshing Scalp Shamp |
| Beauty | 18099507617 Aussie Miracle Moist Shampoo and Conditioner with 3 Minute Miracle Dee | $18.94 | far above the same item's other variants | $4.97 | comparable item: Aussie 3 Minute Miracle Moist Detangling Deep Cond |
| Beauty | 1287442375 Aussie Instant Freeze Hair Spray Twin Pack for Curly Hair, Straight Ha | $18.53 | far above the same item's other variants | $4.97 | comparable item: Aussie Instant Freeze Hair Spray for Curly Hair, S |
| Beauty | 12443541 Maybelline New York Color Sensational Lipstick, Pinkalicious | $17.99 | far above the same item's other variants | $7.24 | comparable item: Maybelline NEW YORK Color Sensational Lipstick, |
| Beauty | 34121577 Maybelline New York Color Sensational Lipstick (The Buffs), Stormy Sah | $17.99 | far above the same item's other variants | $6.38 | comparable item: Maybelline New York Color Sensational The Buffs Li |
| Beauty | 20688050470 Alvantor Burgundy Instant Hair Dye Shampoo for Gray Coverage, 3.38 fl  | $17.99 | far above the same item's other variants | $6.99 | comparable item: Alvantor 3-in-1 Hair Dye Shampoo, Instant Burgundy |
| Beauty | 21130810260 Alvantor 3-in-1 Red Hair Dye Shampoo, Non-Irritating Gray Coverage, Fo | $17.99 | far above the same item's other variants | $6.99 | comparable item: Alvantor 3-in-1 Red Hair Dye Shampoo, Gentle Non-I |
| Beauty | 133541757 Garnier Whole Blends Shampoo with Moroccan Argan & Camellia Oils Extra | $17.45 | far above the same item's other variants | $4.97 | comparable item: Garnier Whole Blends Shampoo & Conditioner with Mo |
| Beauty | 548283657 NYX Professional Makeup Can't Stop Won't Stop Longwear Brow Kit, Brune | $16.99 | far above the same item's other variants | $9.78 | comparable item: NYX Professional Makeup Can't Stop Won't Stop - Lo |
| Beauty | 817855042 Maybelline Color Sensational Cream Finish Lipstick, Flush Punch | $16.99 | far above the same item's other variants | $5.98 | comparable item: Maybelline Color Sensational Cream Finish Lipstick |
| Beauty | 5144941079 Bodycology Fragrance Body Mist, Peony Blush, 8 fl oz | $16.99 | far above the same item's other variants | $7.57 | comparable item: Bodycology Peony Blush Fragrance Body Mist, 8 fl o |
| Beauty | 225471410 Maybelline New York Color Sensational Matte Metallics Lipstick, Molten | $16.50 | far above the same item's other variants | $9.99 | comparable item: Maybelline New York Color Sensational Matte Metall |
| Beauty | 420011393 Maybelline New York Color Sensational Matte Metallics Lipstick, White  | $16.30 | far above the same item's other variants | $14.47 | comparable item: Maybelline New York Color Sensational Matte Metall |
| Beauty | 236867000 Maybelline New York Color Sensational Matte Metallics Lipstick, 958 Co | $15.99 | far above the same item's other variants | $6.38 | comparable item: Maybelline New York Color Sensational Matte Metall |
| Beauty | 301525101 NYX Professional Makeup Can't Stop Won't Stop Longwear Brow Kit, Choco | $15.99 | far above the same item's other variants | $9.78 | comparable item: NYX Professional Makeup Can't Stop Won't Stop - Lo |
| Beauty | 711312804 Maybelline Color Sensational Cream Finish Lipstick, Wine Rush | $15.99 | far above the same item's other variants | $5.98 | comparable item: Maybelline Color Sensational Cream Finish Lipstick |
| Beauty | 45626118 TRESemmé 3-in-1 Shampoo, Conditioner, & Detangler to Cleanse, Conditio | $15.24 | far above the same item's other variants | $14.13 | comparable item: Tresemme Used by Professionals Clean and Replenish |
| Beauty | 12443538 Maybelline New York Color Sensational Lipstick, 25 Pink Please, 0.15 O | $14.99 | far above the same item's other variants | $4.49 | comparable item: Maybelline New York Color Sensational Lipstick, Pi |
| Beauty | 281073267 L'Oreal Paris Elvive Volume Filler Volumizing Conditioner with Filloxa | $14.99 | far above the same item's other variants | $3.50 | comparable item: L'Oreal Elvive Volume Filler Thickening Conditione |
| Beauty | 786750240 COVERGIRL Exhibitionist Metallic Lipstick, 505 Flushed | $14.91 | far above the same item's other variants | $7.97 | comparable item: COVERGIRL Exhibitionist Metallic Lipstick, 530 Get |
| Beauty | 48932588 Garnier Whole Blends Frizz Control Nourishing Daily Shampoo, All Hair  | $14.35 | far above the same item's other variants | $4.23 | comparable item: Garnier Whole Blends Frizz Control Shampoo, Coconu |
| Beauty | 733042790 Aussie Miracle Waves Anti-Frizz Hemp Paraben-Free Conditioner, 12.1 fl | $14.35 | far above the same item's other variants | $4.65 | comparable item: Aussie Miracle Waves Anti-Frizz Hemp Paraben-Free  |
| Beauty | 103059437 Burts Bees 100% Natural Origin Tinted Lip Balm, Zinnia with Shea Butte | $14.00 | far above the same item's other variants | $4.74 | comparable item: Burt's Bees 100% Natural Tinted Lip Balm, Zinnia w |
| Beauty | 160327890 ChapStick Lip Care Holiday Flavor Collection Lip Balm, 0.15 oz Each, P | $14.00 | far above the same item's other variants | $6.29 | comparable item: ChapStick Holiday Collection 3 Count Candy Cane, P |
| Beauty | 19525146 Sally Hansen Diamond Strength No Chip Nail Color, Aisle Be There, 0.45 | $13.99 | far above the same item's other variants | $5.43 | comparable item: Sally Hansen Diamond Strength No Chip Nail Color,  |
| Beauty | 455096333 Aussie Miracle Waves Anti-Frizz Hemp Paraben-Free Shampoo, 12.1 fl oz | $13.99 | far above the same item's other variants | $4.65 | comparable item: Aussie Miracle Waves Anti-Frizz Hemp Paraben-Free  |
| Beauty | 678384671 Garnier Whole Blends Taming Conditioner with Coconut Oil Cocoa Butter, | $13.80 | far above the same item's other variants | $3.33 | comparable item: Garnier Whole Blends Conditioner with Coconut Oil  |
| Beauty | 5095600585 Suave Ceramide Infusion Age Brilliance Conditioner, Moisturizing & Str | $13.78 | far above the same item's other variants | $4.97 | comparable item: Suave Professionals Biotin Infusion Conditioner wi |
| Beauty | 861795673 Garnier Whole Blends Gentle Repairing Conditioner with Oat Milk Rice C | $13.13 | far above the same item's other variants | $3.88 | comparable item: Garnier Whole Blends Gentle Moisturizing Shampoo,  |
| Beauty | 902311105 Garnier Whole Blends Sulfate Free Remedy Hibiscus and Shea Conditioner | $12.99 | far above the same item's other variants | $7.40 | comparable item: Garnier Whole Blends Sulfate Free Remedy Honey Tre |
| Beauty | 1190109661 Aussie Instant Volume Hair Spray for Wavy Hair and Straight Hair, 10 o | $12.99 | far above the same item's other variants | $4.97 | comparable item: Aussie Instant Volume Hair Spray for Wavy and Stra |
| Beauty | 217269448 Cantu Anti-Dandruff Shampoo with Guava & Ginger, 13.5 fl oz | $12.94 | far above the same item's other variants | $6.57 | comparable item: Fructis 2n1 Anti-dandruff Shampoo |
| Beauty | 1994380942 Aussie Instant Freeze Hair Spray for Curly Hair, Straight Hair, and Wa | $12.77 | far above the same item's other variants | $4.97 | comparable item: Aussie Instant Freeze Hair Spray for Curly Hair, S |
| Beauty | 5098706407 Suave Ceramide Infusion Age Brilliance Shampoo with Pump, Strengthenin | $12.23 | far above the same item's other variants | $4.97 | comparable item: Suave Professionals Keratin Infusion Shampoo with  |
| Beauty | 19888796 Suave Professionals Shampoo, Rosemary & Mint, 12.6 Fl Oz | $10.37 | far above the same item's other variants | $2.24 | comparable item: Suave Professionals Invigorating Shampoo, Rosemary |
| Beauty | 55331810 L.A. COLORS Gel-like Nail Polish, Red Carpet Ready, 0.44 fl oz | $9.99 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55234010 L.A. COLORS Gel-like Nail Polish, Untamed, 0.44 fl oz | $9.79 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331797 L.A. Colors Gel-like Nail Polish, Matchmaker, 0.44 fl oz | $9.40 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 243986111 L.A. COLORS Gel-Like Nail Polish, Topless, 0.44 fl oz | $8.59 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 148986942 L.A. COLORS Gel-like Nail Polish, Chatty, 0.44 fl oz | $8.50 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 15548061384 L.A. COLORS Mermaid Magic Nail Polish, Shimmer Mist, 0.44 fl oz | $8.50 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Mermaid Magic Nail Polish, Mermaid, 0. |
| Beauty | 55331809 L.A. COLORS Gel-like Nail Polish, Ravishing, 0.44 fl oz | $8.19 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 10323231 Sally Hansen Hard As Nails Nail Polish, 0.45 oz | $8.09 | far above the same item's other variants | $3.22 | comparable item: Sally Hansen Hard as Nails Nail Polish, Hard To Ge |
| Beauty | 206333986 Sally Hansen Hard as Nails Nail Polish, Hard To Get 0.45 oz | $8.09 | far above the same item's other variants | $2.80 | comparable item: Sally Hansen Hard as Nails Nail Polish, Hard To Ge |
| Beauty | 231325123 Sally Hansen Hard as Nails Nail Polish, Balck Heart 0.45 oz | $8.09 | far above the same item's other variants | $2.54 | comparable item: Sally Hansen Hard as Nails Nail Polish, Balck Hear |
| Beauty | 700369476 Sally Hansen Hard as Nails Nail Polish, Hard Core Party 0.45 oz | $8.09 | far above the same item's other variants | $2.37 | comparable item: Sally Hansen Hard as Nails Nail Polish, Hard Core  |
| Beauty | 863978404 Sally Hansen Hard as Nails Nail Polish, No Hard Feelings 0.45 oz | $8.09 | far above the same item's other variants | $2.37 | comparable item: Sally Hansen Hard as Nails Nail Polish, No Hard Fe |
| Beauty | 865382397 Sally Hansen Hard as Nails Nail Polish, Rock Bottom 0.45 oz | $8.09 | far above the same item's other variants | $3.26 | comparable item: Sally Hansen Hard as Nails Nail Polish, Rock n' Ro |
| Beauty | 252395706 L.A. COLORS Gel-like Nail Polish, Nudie, 0.44 fl oz | $8.07 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 840999593 L.A. COLORS Gel-like Nail Polish, Teddy Bare, 0.44 fl oz | $8.07 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331803 L.A. COLORS Gel-like Nail Polish, Sassy, 0.44 fl oz | $8.06 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 46334513 L.A. Colors Color Craze Gel Nail Polish, #712 Damsel, 0.44 fl oz | $7.60 | far above the same item's other variants | $0.98 | comparable item: L.A. Colors Color Craze Nail Polish, 0.44 fl oz |
| Beauty | 55331791 L.A. COLORS Gel-like Nail Polish, Jammin, 0.44 fl oz | $7.52 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 48471763 L.A. COLORS Gel-like Nail Polish, Risque, 0.44 fl oz | $7.49 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 994815914 L.A. COLORS Glitter Vibes Nail Polish, Finesse, 0.44 fl oz | $7.49 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Glitter Vibes Nail Polish, Drippin', 0 |
| Beauty | 55234009 L.A. COLORS Gel-like Nail Polish, Knockout, 0.44 fl oz | $7.36 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 938858400 L.A. COLORS Color Mania Nail Polish, Squeeze, 0.44 fl oz | $7.00 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Color Mania Nail Polish, Weekendz, 0.4 |
| Beauty | 48470324 L.A. COLORS Gel-like Nail Polish, Posh, 0.44 fl oz | $6.96 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331792 L.A. COLORS Gel-like Nail Polish, Breezy, 0.44 fl oz | $6.76 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 943521271 Sally Hansen Treatment Maximum Growth®, Clear, Nail Strengthener Polis | $6.64 | far above the same item's other variants | $5.24 | comparable item: Sally Hansen Nail Treatment Maximum Growth, 0.45 o |
| Beauty | 1730274741 L.A. COLORS Metal Nail Polish, Majestic, 0.44 fl oz | $6.64 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Metal Nail Polish, Metallica, 0.44 fl  |
| Beauty | 46334373 L.A. COLORS Gel-like Nail Polish, Stunner, 0.44 fl oz | $6.52 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 46335140 L.A. COLORS Gel-like Nail Polish, Socialite, 0.44 fl oz | $6.21 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55234017 L.A. COLORS Gel-like Nail Polish, Vanilla Latte, 0.44 fl oz | $6.21 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331793 L.A. COLORS Gel-like Nail Polish, Refresh, 0.44 fl oz | $6.21 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331811 L.A. COLORS Gel-like Nail Polish, Envy, 0.44 fl oz | $6.14 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331804 L.A. COLORS Gel-like Nail Polish, Magical, 0.44 fl oz | $6.04 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 10293539 Suave Naturals Shampoo, Tropical Coconut, 22.5 Fl Oz | $5.97 | far above the same item's other variants | $4.50 | comparable item: Suave Naturals Shampoo, Tropical Coconut, 22.5 Fl  |
| Beauty | 10293561 Suave Naturals Strawberry w/Strawberry Extract & Vitamin E Shampoo, 22 | $5.97 | far above the same item's other variants | $1.94 | comparable item: Suave Sun-Ripened Strawberry Shampoo with Strawber |
| Beauty | 9305421505 L.A. COLORS Glitter Vibes Nail Polish, HUGS, Pink Glitter, 0.44 fl oz | $5.97 | far above the same item's other variants | $4.43 | comparable item: L.A. COLORS Glitter Vibes Nail Polish, Pink Bling, |
| Beauty | 18222117154 L.A. COLORS Gel-Like Shine Nail Polish, Mousse, Brown Sugar, 0.44 fl o | $5.93 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Gel-Like Shine Nail Polish, Mousse, Cr |
| Beauty | 55331796 L.A. COLORS Gel-like Nail Polish, Zen, 0.44 fl oz | $5.90 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55234013 L.A. COLORS Gel-like Nail Polish, Daring, 0.44 fl oz | $5.88 | far above the same item's other variants | $2.24 | comparable item: L.A. Colors Gel-like Nail Polish, Darling, 0.44 fl |
| Beauty | 55331808 L.A. COLORS Gel-like Nail Polish, Ice Princess, 0.44 fl oz | $5.85 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Gel-like Nail Polish, Princess Vibes,  |
| Beauty | 170454334 L.A. Colors Craze Nail Polish, Timber, 0.44 fl oz | $5.81 | far above the same item's other variants | $0.98 | comparable item: L.A. Colors Color Craze Nail Polish, 0.44 fl oz |
| Beauty | 1016116446 L.A. COLORS Mermaid Magic Nail Polish, Turtley, 0.44 fl oz | $5.78 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Mermaid Magic Nail Polish, Mermaid, 0. |
| Beauty | 796922886 L.A. COLORS Color Mania Nail Polish, Fanatic, 0.44 fl oz | $5.76 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Color Mania Nail Polish, Weekendz, 0.4 |
| Beauty | 1033059438 L.A. COLORS Mermaid Magic Nail Polish, Sunset Sparkle, 0.44 fl oz | $5.76 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Mermaid Magic Nail Polish, Mermaid, 0. |
| Beauty | 9309166190 L.A. COLORS Gel-Like Shine Nail Polish, True Love, White, 0.44 fl oz | $5.70 | far above the same item's other variants | $2.24 | comparable item: L.A. COLORS Gel Shine Like Nail Polish, Curfew, 0. |
| Beauty | 55234167 L.A. COLORS Color Craze Nail Polish, Bliss CNP528 | $5.61 | far above the same item's other variants | $0.98 | comparable item: L.A. Colors Color Craze CNP549 Dazzle Nail Polish, |
| Beauty | 10293541 Suave Naturals Naturals Shampoo Aloe & Waterlily, 22.5 Fl Oz | $5.01 | far above the same item's other variants | $5.25 | median per-unit price of comparable items |
| Beauty | 690133887 Garnier Whole Blends Legendary Olive Replenishing Conditioner, 22 Fl.  | $0.50 | far below comparable items | $9.30 | comparable item: Garnier Whole Blends Replenishing Conditioner Lege |
| Beauty | 187150854 Puffy Tray Liner, 1 Fl. Oz. | $0.03 | below range | $39.00 | median per-unit price of comparable items |
| Beauty | 17905401744 e.l.f. SKIN Vitamin C+E+Ferulic Serum, Mini | $0.03 | below range | $19.00 | comparable item: e.l.f. SKIN Glass Slick Serum Stick, 0.63 oz |
| Beauty | 17955356667 e.l.f. SKIN Holy Hydration Clean Freak Daily Cleanser Mini | $0.03 | below range | $11.11 | comparable item: e.l.f. SKIN Holy Hydration! Makeup Melting Cleansi |
| Beauty | 21035105 Reckitt Benckiser Clearasil Perfecta Wash Automatic Face Wash Dispense | $0.02 | below range | $10.40 | comparable item: Clearasil PerfectaWash Automatic Face Wash Dispens |
| Beauty | 107754166 Brightstar Distrib Bb 9700 Skins Pk Db | $0.02 | below range | $10.97 | median price of its category |
| Beauty | 22307114 Olay Prox Gift With Purchase Kit | $0.01 | below range | $10.97 | median price of its category |
| Beauty | 130150129 Floepx Women Nylon Cosmetic Bags Makeup Organizer Storage Bag Pouch Ho | $0.01 | below range | $9.99 | comparable item: Cosmetic Bag for Travel and Makeup, Cosmetic Bag f |
| Beauty | 333019137 Hairitage USA Mini Riser-2021 | $0.01 | below range | $10.97 | median price of its category |
| Beauty | 404125051 Paint 1st Md Mk | $0.01 | below range | $9.29 | median price of the same kind of item |
| Beauty | 596834842 YoaNJYGR Human Curly Hair Wigs for Short Wave Head Wig Brown Bangs Str | $0.01 | below range | $18.76 | median price of the same kind of item |
| Beauty | 840101034 Hairitage Medium Riser 2021 | $0.01 | below range | $10.97 | median price of its category |
| Beauty | 877548387 Tulip 8 Slot 4.25 Oz. Tray Liner, 1 Each | $0.01 | below range | $10.97 | median price of its category |
| Beauty | 14394752581 Manic Panic Empty Display | $0.01 | below range | $10.97 | median price of its category |
| Food | 839235108 (30 Pouches) Alpine Spiced Apple Cider Sugar Free Drink Mix | $1,086,833,333,333,333,245,952.00 | above range | $1.98 | comparable item: Alpine Sugar Free Spiced Apple Cider Instant Drink |
| Food | 6703965891 TestProductName ForAutomation | $7,968,296.10 | above range | $6.59 | median price of its category |
| Food | 33311307 Elite Milk Chocoate Bar, 3.5 oz | $161,688.04 | above range | $3.16 | comparable item: Elite Milk Chocolate Bar, 3.5 Oz |
| Food | 55292801 Augason Farms Mega Emergency 1 Year Food Supply Everyday Meal Prep Lar | $33,442.23 | above range | $39.99 | comparable item: Augason Farms 5-Day 1-Person Emergency Food Supply |
| Food | 22985176 Augason Farms Deluxe 1-year, 3-person Em | $7,891.64 | above range | $497.03 | comparable item: Augason Farms 6 Month 1 Person Kit |
| Food | 6157452041 CHR Assorted Chocolate Packaged Candy Laydown Bag Full Module, 1536 ct | $6,900.48 | above range | $7.38 | median price of the same kind of item |
| Food | 46893127 Wise Company 4320 Serving Entre And Brea | $5,930.94 | above range | $6.43 | median price of its category |
| Food | 15086713897 754 pc 754 PC 754PCAST STAN | $5,689.76 | above range | $6.97 | median price of its category |
| Food | 5287616040 840 pc 840PCWM HSHY MC 6PK | $5,443.20 | above range | $59.54 | median per-unit price of comparable items |
| Food | 18882608794 1170 pc AST TWIZ 1170CT | $5,405.00 | above range | $141.22 | median per-unit price of comparable items |
| Food | 558599556 Hershey Assortment 1496p 12pk Hrshy Bts | $4,727.36 | above range | $25.34 | comparable item: Hershey Assortment Hershey Trunk Or Treat Bag |
| Food | 18767774362 622 pc 622 PC MULTI SMORE | $4,602.00 | above range | $7.67 | median price of its category |
| Food | 26958407 ReadyWise 2160 Serving Package of Long Term Emergency Food Supply | $4,599.99 | above range | $6.43 | median price of its category |
| Food | 864065904 Vistar Cheez-It Crackers - Pack of 12 | $4,566.88 | above range | $4.75 | comparable item: CHEEZ IT ORIG |
| Food | 146418972 Nestle Tollhouse 960pcnth Sm Asst Pa | $4,492.80 | above range | $6.43 | median price of its category |
| Food | 26958405 Wise Company Combination Breakfast/Entree & Soup Emergency Food Supply | $4,219.48 | above range | $8.13 | median price of the same kind of item |
| Food | 534245935 4 oz Popcorn Packs Pre-Measured, Movie Theater Style Packets for Popco | $4,185.00 | above range | $1.13 | comparable item: 6 oz Popcorn Packs Pre-Measured, Movie Theater Sty |
| Food | 982136949 Equate Eq Hiperf Cho 192pc | $4,028.00 | above range | $191.62 | median per-unit price of comparable items |
| Food | 1543564471 Twix 800pcsnickers Fun S | $3,776.00 | above range | $10.00 | comparable item: Twix 800pcsnickers Fun S |
| Food | 741756650 Hershey 816pchsy Mlk Giant | $3,688.32 | above range | $7.67 | median price of its category |
| Food | 969019574 Hershey Assortment 1220pccandy Mod | $3,635.60 | above range | $8.48 | comparable item: Hershey Pieces Snack Size Assortment |
| Food | 940366347 M M S 712pcfull $2.78 712 | $3,503.00 | above range | $7.67 | median price of its category |
| Food | 14424814744 Pillsbury Baking Pillsbury 17.5 Oz Sugar Cookie Mix | $3,500.00 | above range | $4.48 | comparable item: Pillsbury Baking Pillsbury 17.5 Oz Sugar Cookie Mi |
| Food | 43803693 Reese's Easter Peanut Butter Egg Candy Snack Bite | $3,317.76 | above range | $12.13 | comparable item: Reese's Easter Peanut Butter Egg Candy, 12 oz, 2 c |
| Food | 35053655 Lindon Farms 4320 Servings Freeze Dried Food Survival Emergency Storag | $3,250.00 | above range | $6.43 | median price of its category |
| Food | 55292803 Augason Farms Deluxe 1-Year 4-Person Emergency Food Supply 336 Large C | $3,032.42 | above range | $25.42 | comparable item: Augason Farms 48-Hour 4-Person Emergency Food Supp |
| Food | 22985173 Augason Farms 1-Year 4-Person Emergency Food Supply | Shelter-in-Place | $2,982.87 | above range | $17.50 | comparable item: Creamy Potato Soup Mix Emergency Food Supply, 36 S |
| Food | 22985175 Augason Farms Superior 1-year, 2-person | $2,940.79 | above range | $50.09 | comparable item: Augason Farms Instant Potatoes 6 Gallon |
| Food | 430929779 Great Value 2304pc Gv Evap Full | $2,810.88 | above range | $6.43 | median price of its category |
| Food | 596291674 Russell Stover 384pcrs Ac Holiday | $2,808.32 | above range | $7.67 | median price of its category |
| Food | 22001496 Augason Farms Basic 4 Person, 1 Year Emergency Food Storage Kit, 330 c | $2,756.63 | above range | $105.08 | comparable item: Augason Farms Breakfast Pack Emergency Food Storag |
| Food | 438604582 Wonderful Pistachios 312pc Wndfl Pist 16z | $2,602.08 | above range | $13.08 | median per-unit price of comparable items |
| Food | 234856138 Planters 350pcplntr Csh Drzl | $2,524.00 | above range | $23.60 | median price of the same kind of item |
| Food | 581982310 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 40) | $2,473.99 | above range | $7.20 | median price of the same kind of item |
| Food | 18875261780 496 pc 496 PC HSY AST TWIZ | $2,292.00 | above range | $7.67 | median price of its category |
| Food | 239911416 48/24/14z SAUCE MIX (36J/12W) RTD | $2,280.96 | above range | $15.33 | comparable item: A Taste of Thai Peanut Sauce Mix, 3.5 oz (Pack of  |
| Food | 19858169379 152 pc 152 PC AST RWB PRTY | $2,256.00 | above range | $177.28 | median per-unit price of comparable items |
| Food | 798529697 Hershey 368pcasst Choc Sub | $2,196.96 | above range | $7.67 | median price of its category |
| Food | 426499493 M And M 432pcm&ms Pn Sup 10 | $2,125.44 | above range | $107.82 | comparable item: M And M 9pcm&ms Pnt Bttr Sup |
| Food | 313611938 M And M 432pcm&m's Mixed Fu | $2,125.00 | above range | $7.67 | median price of its category |
| Food | 161833734 Jolly Rancher Original Fruit Chews, (Pack of 12) | $2,090.88 | above range | $27.90 | comparable item: Mamba Fruit Chews, 0.88 oz, 48 count |
| Food | 55292802 Augason Farms Variety Emergency Food Supply 40-Pail Kit | $2,054.35 | above range | $165.44 | comparable item: Augason Farms Emergency Food Supply Variety Pack,  |
| Food | 409653501 Wonderful Pistachios 192pc192 Wfl Combo | $1,992.96 | above range | $11.98 | median price of the same kind of item |
| Food | 6435154189 Wonderful Pistachios 192pc | $1,954.56 | above range | $11.98 | median price of the same kind of item |
| Food | 19964657349 288 pc Lindt Spring HPLT | $1,953.00 | above range | $7.67 | median price of its category |
| Food | 381157725 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 32) | $1,918.51 | above range | $7.20 | median price of the same kind of item |
| Food | 19429757000 344 pc 344 PC M&MS MXD SUP | $1,885.00 | above range | $107.82 | comparable item: M And M 9pcm&ms Pnt Bttr Sup |
| Food | 55292804 Augason Farm?s Premium Emergency 1-Year Food Supply (1 Person), 138 No | $1,841.14 | above range | $9.18 | median price of the same kind of item |
| Food | 2650681318 Ghirardelli 256pcholiday Half P | $1,838.08 | above range | $7.67 | median price of its category |
| Food | 16557267815 MIXED VARIETY 180CT HPLT D1 WM IDM | $1,793.00 | above range | $189.20 | median per-unit price of comparable items |
| Food | 467767668 Starbucks 140pcsbux Holiday 1 | $1,776.40 | above range | $6.43 | median price of its category |
| Food | 163218569 Starbucks 140pcsbux Fall Disp | $1,753.08 | above range | $6.43 | median price of its category |
| Food | 2091903585 Ghirardelli 512pcholiday Full P | $1,751.91 | above range | $7.67 | median price of its category |
| Food | 16748757514 WM MARS MXD SHR SZ SUP | $1,751.52 | above range | $7.67 | median price of its category |
| Food | 16313774749 MULTI BRAND COOKIES 425 CT | $1,686.50 | above range | $6.97 | median price of the same kind of item |
| Food | 17093309611 Quaker Instant Oatmeal Variety, 48 Count Display | $1,653.12 | above range | $15.99 | comparable item: Quaker Instant Oatmeal, Flavor Variety, 52 Ct |
| Food | 26958406 Wise Foods 1080 Serving Package of Long Term Emergency Food Supply Fre | $1,641.18 | above range | $6.43 | median price of its category |
| Food | 15023971249 ND TR SUB HALF PALL WM 400/9.2oz SHP | $1,588.00 | above range | $4.89 | median per-unit price of comparable items |
| Food | 378296257 Great Value 1296pc Gv Evap Half | $1,581.12 | above range | $6.43 | median price of its category |
| Food | 19858169536 324 pc M&MS SUP WM RWB 324HPLT IDM | $1,549.00 | above range | $11.37 | median price of the same kind of item |
| Food | 632220565 Homestyle Noodles 420pc Essenhaus Ndls | $1,528.80 | above range | $6.88 | median price of the same kind of item |
| Food | 471069326 Pringles 760pcprg 4flv Modx7 | $1,520.00 | above range | $5.38 | median price of the same kind of item |
| Food | 20021974375 400 pc NERDS TROLLI RWB HPLT 400CT | $1,510.00 | above range | $93.68 | median per-unit price of comparable items |
| Food | 14588707082 PEPPERIDGE FARM MILANO COOKIES | $1,505.90 | above range | $7.66 | comparable item: Pepperidge Farm Milano Banana Cookies, 7.0 oz. Bag |
| Food | 155481523 Kamado Joe Big Joe I 24 in. Charcoal Grill in Red with Cart, Side Shel | $1,499.99 | above range | $34.78 | median price of the same kind of item |
| Food | 796141906 Nab Classics 160pcnabisco Ss 20ct | $1,497.00 | above range | $18.30 | median per-unit price of comparable items |
| Food | 523662798 Frito-lay 580pc Mixed Hot Spcy | $1,496.40 | above range | $0.72 | comparable item: BAKEN-ETS HOT & SPCY |
| Food | 105412330 Pringles 728pcprg Core 4 Sup | $1,456.00 | above range | $3.80 | median per-unit price of comparable items |
| Food | 833986669 PEPPERIDGE FARM STUFFING HERB AND CORN | $1,447.20 | above range | $4.03 | comparable item: Pepperidge Farm Corn Bag Stuffing 16 Oz |
| Food | 847901772 Pepperidge Farm 540pc Cube/herb/crn MT2025 | $1,447.20 | above range | $344.25 | median per-unit price of comparable items |
| Food | 601148686 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 24) | $1,442.12 | above range | $7.20 | median price of the same kind of item |
| Food | 476494023 Freshness Guaranteed 144pc 20z Value Nuts | $1,437.12 | above range | $10.05 | comparable item: Great Value Mixed Nuts, 17 oz |
| Food | 18849322454 360 pc 360 PC HSY SS DUMP B | $1,411.00 | above range | $76.46 | median per-unit price of comparable items |
| Food | 704554090 Chip Granola Bars, 60 Ct.Net Wt 52.8 Oz | $1,353.99 | above range | $8.16 | median price of the same kind of item |
| Food | 3250449556 PEPPERIDGE FARM GOLDFISH CRACKERS VARIETY | $1,340.64 | above range | $5.98 | comparable item: PEPPERIDGE FARM CRACKERS VARIETY |
| Food | 214736119 Kathy Kaye Popcorn Ball Full | $1,319.04 | above range | $17.95 | comparable item: Popcorn Ball |
| Food | 55702761 Augason Farms 1-Year 1-Person Emergency Food Storage Pail Kit - 12 Cou | $1,294.78 | above range | $105.08 | comparable item: Augason Farms Breakfast Pack Emergency Food Storag |
| Food | 55292805 Augason Farms Deluxe Emergency 1-Year Food Supply (1 Person), 98 No. 1 | $1,290.99 | above range | $20.50 | median price of the same kind of item |
| Food | 22001495 Augason Farms 1 Year 1 Person Deluxe Kit | $1,285.14 | above range | $497.03 | comparable item: Augason Farms 6 Month 1 Person Kit |
| Food | 17968304404 258 pc WM GMI(9) HNC/YBC/PROT/CNFC/GRNOLA COMU | $1,272.00 | above range | $164.47 | median per-unit price of comparable items |
| Food | 938172501 Coffee Break Lunch Room Furniture FULLY ASSEMBLED "Ready-To-Use" 3pc G | $1,267.97 | above range | $16.20 | median price of the same kind of item |
| Food | 16608802442 272 pc SK FRT SHRSZ SUP D1 | $1,243.00 | above range | $5.34 | median per-unit price of comparable items |
| Food | 18156803834 252 pc WM GMI (2) SPDLC/LC FS COMU | $1,242.36 | above range | $160.65 | median per-unit price of comparable items |
| Food | 440247522 Atkins 165pcsnack Rtd Vrty | $1,221.20 | above range | $125.64 | comparable item: Atkins 18pcsnack Bar Vrty |
| Food | 29304825 Pacific Foods Organic 7 Grain Non-Dairy Beverage, Original, 32-Ounce,  | $1,219.51 | above range | $48.96 | comparable item: Pacific Foods Organic Almond Non-Dairy Beverage, O |
| Food | 51258891 WAL*MART CINNAMON ROLL ICING 42# | $1,217.16 | above range | $209.13 | comparable item: Freshness Guaranteed Mini Cinnamon Rolls, No Icing |
| Food | 295896986 24 PCS PUSH POP CANDY, Case of 24 | $1,208.40 | above range | $7.38 | median price of the same kind of item |
| Food | 18787869979 240 pc JR GUMMIE 240CT | $1,193.00 | above range | $7.67 | median price of its category |
| Food | 18897318444 240 pc AST JR HARD 240CT | $1,193.00 | above range | $81.98 | median per-unit price of comparable items |
| Food | 950136033 Cotail Kit For Tea Lovers | $1,188.99 | above range | $54.99 | comparable item: Tea Lovers Gift |
| Food | 485393064 Heinz Homestyle 420pc Heinz 18oz Gra | $1,184.40 | above range | $8.69 | median per-unit price of comparable items |
| Food | 671278940 Belvita 270pcbvita Fignewt | $1,179.60 | above range | $7.67 | median price of its category |
| Food | 19392617614 270 pc SK GMS MXD SUP WM 270HPLT IDM | $1,141.00 | above range | $129.09 | median per-unit price of comparable items |
| Food | 693494428 Freshness Guaranteed 237pc In-shell Nuts | $1,106.79 | above range | $14.99 | median price of the same kind of item |
| Food | 55292806 Augason Farm’s Deluxe Emergency 1-Year Food Supply (1 Person), 86 #10  | $1,106.58 | above range | $20.50 | median price of the same kind of item |
| Food | 772395557 Frito-lay 248pc Ruff/cheeto | $1,103.54 | above range | $7.67 | median price of its category |
| Food | 405862662 Cheez-it 280pc Chzit 5flvcore | $1,055.60 | above range | $6.74 | median price of the same kind of item |
| Food | 159496165 Sun-Maid® Zante Currants, 10-Oz Box | $1,055.06 | above range | $7.52 | comparable item: Sun-Maid® California Sun-Dried Zante Currants 8oz  |
| Food | 904428226 Starbucks 120pccold Brew 120c | $1,051.44 | above range | $11.99 | median price of its category |
| Food | 246758264 Idahoan® Foods 820pcidhn 4oz Fm Ha | $1,041.40 | above range | $1.83 | median per-unit price of comparable items |
| Food | 129524115 Perugina Italian Baci, Classic Dark, 2 Oz | $1,035.00 | above range | $2.57 | comparable item: Divine Chocolate Dark Chocolate Classic 3.5 Oz |
| Food | 19458318044 360 pc AMOS PEELERZ HLPL 360CT | $1,029.60 | above range | $84.31 | median per-unit price of comparable items |
| Food | 17672572076 Everyday Popcorn Ball | $1,008.00 | above range | $17.95 | comparable item: Popcorn Ball |
| Food | 14424968800 Great Value Instant Mashed Pot 13.75oz | $1,000.00 | above range | $255.24 | comparable item: Great Value Instant Mashed Pot 13.75oz |
| Food | 14425262253 Great Value Chicken Stuffing 6oz | $1,000.00 | above range | $0.97 | comparable item: Great Value Chicken Flavored Stuffing Mix, 6 oz |
| Food | 111586720 98.5-00 DODGE JUICE CTS2 | $999.95 | above range | $6.99 | median price of the same kind of item |
| Food | 741628277 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 16) | $997.90 | above range | $61.22 | comparable item: Tortrix Tacos Creole Sauce 6.34 oz - Salsa Criolla |
| Food | 952570410 Kellogg 144pc3 Flv Pllw Bag | $987.84 | above range | $392.16 | comparable item: Kellogg 300pcrkt 3 Flv Ss 1 |
| Food | 5311559925 Kellogg's Cheez It Crackers 6 Flavors | $948.50 | above range | $8.99 | comparable item: Kellogg's Cheez It Crackers Snack Mix 48oz |
| Food | 858286776 Cheerios 192pcmultigran Cher | $946.56 | above range | $5.00 | median price of the same kind of item |
| Food | 16220651243 Kellogg's Pop-Tarts 5 Flavors | $943.20 | above range | $7.36 | comparable item: Kellogg's Strawberry Pop-Tarts, 16 ct (Pack of 2) |
| Food | 906664211 Fruity Pebbles and Cocoa Pebbles Large Size Variety Pack - Gluten Brea | $935.99 | above range | $14.08 | comparable item: Post Fruity PEBBLES Cereal, Fruity Kids Cereal, Gl |
| Food | 55203432 Russell Stover Assorted Fine Chocolates, 7 oz | $933.70 | above range | $6.87 | comparable item: Russell Stover Fine Assorted Chocolates, 5 Oz. |
| Food | 931399672 General Mills 144pcgmi(3)acc/ckc/ | $925.11 | above range | $6.43 | median price of its category |
| Food | 569002877 San Pelegrino Sp 11.15 8ct Drp240 | $900.00 | above range | $7.98 | median per-unit price of comparable items |
| Food | 22985168 Augason Farms Emergency All-in-one, 30-d | $881.02 | above range | $11.04 | comparable item: Augason Farms Emergency Food Gluten Free |
| Food | 200334932 Cheez-it 285pc Chz-it 4 Flav | $880.80 | above range | $6.74 | median price of the same kind of item |
| Food | 781138222 24 PCS RING POP LOLLIPOP, Case of 24 | $880.80 | above range | $7.60 | median price of the same kind of item |
| Food | 797325821 General Mills 220pcbugles/chex Mix | $871.20 | above range | $23.75 | comparable item: Chex Mix Muddy Buddies, 4.5 Oz., 7 Count |
| Food | 752249901 Mccormick 864pcmc Turkey Grav | $864.00 | above range | $4.85 | median price of its category |
| Food | 284784386 General Mills 216pcgm Fs Monsters | $859.68 | above range | $6.43 | median price of its category |
| Food | 39971042 Gummy Zone Sour Neon Wacky Worms, 1kg/2.2lbs, Bag, {Imported from Cana | $840.00 | above range | $16.78 | median per-unit price of comparable items |
| Food | 920354594 16 PC TRIPLE POWER PUSH POPS, Case of 12 | $828.15 | above range | $52.16 | median per-unit price of comparable items |
| Food | 678766387 36 PCS GIANT CHEWY SWEETARTS, Case of 10 | $824.25 | above range | $77.11 | median per-unit price of comparable items |
| Food | 26958403 Wise Foods 720 Serving Package of Long Term Emergency Food Supply Free | $798.94 | above range | $6.43 | median price of its category |
| Food | 160311211 Gatorade 100pcga Var Display | $798.00 | above range | $1.33 | median per-unit price of comparable items |
| Food | 5102045732 PEPPERIDGE FARM COOKIES VARIETY | $778.40 | above range | $7.30 | comparable item: Grandma's Cookies Variety Pack, 1.22 oz., 10 count |
| Food | 181503635 24 PCS PUSH POP CANDY, Case of 12 | $775.50 | above range | $49.33 | comparable item: 100 PCS COMIC PACK CANDY STICK, Case of 6 |
| Food | 444103472 Doritos 300pc Mixed Sept Nfl | $774.00 | above range | $5.70 | median price of the same kind of item |
| Food | 779628854 Jiffy Corn Muffin Mix, 8.5 oz | $771.12 | above range | $2.78 | comparable item: Jiffy Corn Muffin Mix, 8.5 oz Box |
| Food | 536846989 ZEVIA TEA BLACK PEACH ORGANIC 12 FL OZ | $769.00 | above range | $5.94 | comparable item: Nixie Sparkling Water Peach Black Tea , 12 Fl Oz |
| Food | 380461265 General Mills 192pc Chexmix/gardet | $760.32 | above range | $114.62 | median per-unit price of comparable items |
| Food | 662581002 24 PCS RING POP TWIST, Case of 24 | $752.10 | above range | $15.94 | median price of the same kind of item |
| Food | 455904937 Easy Bake 66pcezb Whoopie | $748.02 | above range | $6.43 | median price of its category |
| Food | 5201416053 Missing Key Attributes : This title does not include any key attribute | $745.50 | above range | $13.21 | median price of its category |
| Food | 210816110 18 PCS BABY BOTTLE POP, Case of 16 | $724.80 | above range | $98.37 | median per-unit price of comparable items |
| Food | 55292814 Augason Farms Deluxe 4-Month 1-Person 10-Pail Kit Emergency Food Suppl | $724.56 | above range | $139.99 | comparable item: Augason Farms 2-Week 1-Person Emergency Food Suppl |
| Food | 19912563533 300 pc FL D82 RWB 1/2 DRP | $720.00 | above range | $200.67 | median per-unit price of comparable items |
| Food | 19934551441 18 pc SHPR WAW Browns | $720.00 | above range | $6.15 | median per-unit price of comparable items |
| Food | 16316069723 Cheetos Wednesday 1/2 DRP | $714.00 | above range | $6.37 | median price of the same kind of item |
| Food | 17195167827 240 pc WM GMI HNC MS LSMU | $712.80 | above range | $153.00 | median per-unit price of comparable items |
| Food | 16545310397 480 Jarritos Pineapple and Mandarin 1.5L | $710.40 | above range | $4.50 | median per-unit price of comparable items |
| Food | 786470286 Hershey 479pcmilk Duds Tb | $708.92 | above range | $7.67 | median price of its category |
| Food | 177115343 Clear American Ca Blkch-pch-kl-mndo | $705.60 | above range | $0.98 | median per-unit price of comparable items |
| Food | 418001077 Clear American Ca Blkch-pch-strw-mn | $705.60 | above range | $0.98 | median per-unit price of comparable items |
| Food | 585983374 Clear American Ca Blkch-pch-strw-pc | $705.60 | above range | $11.99 | median price of its category |
| Food | 404537670 Rice Krispies Treats Rkt Original 40ct | $702.72 | above range | $58.37 | median per-unit price of comparable items |
| Food | 19916618639 348 pc 348 PC NERDS SWT SMM | $702.48 | above range | $13.88 | median price of the same kind of item |
| Food | 55292807 Augason Farms 6-Month 1-Person Emergency Food Supply | Shelter-in-Plac | $698.99 | above range | $6.43 | median price of its category |
| Food | 320277623 Doritos 300pc Mixed Nov | $696.00 | above range | $5.70 | median price of the same kind of item |
| Food | 997633983 J&D Manufacturing- SW2341 Energy Free Livestock Waterers, 22 Gallon, 2 | $692.13 | above range | $14.97 | median price of the same kind of item |
| Food | 16449108936 SHPR WVQ Virginia Tech | $672.00 | above range | $7.66 | median price of its category |
| Food | 911967463 Pepperidge Farm 84pcgld Fsh Blk Chd | $670.32 | above range | $7.67 | median price of its category |
| Food | 393759429 Kathy Kaye Popcorn Ball Half | $670.08 | above range | $17.95 | comparable item: Popcorn Ball |
| Food | 262337372 Kellogg 168pcdisney 3 Flavo | $661.92 | above range | $7.60 | median price of its category |
| Food | 584268338 Deer Park Spring Water, 25 fl oz, Single Aluminum Bottle | $643.68 | above range | $6.31 | comparable item: Deer Park Spring Water, 20 Fl Oz, Single Plastic B |
| Food | 573451302 PEPPERIDGE FARM STUFFING HERB | $643.20 | above range | $1.88 | comparable item: Pepperidge Farm Herb Seasoned Classic Stuffing, 8  |
| Food | 17449350377 252 pc WM PRO PM(4) SOUP RSHP | $624.96 | above range | $8.13 | median price of the same kind of item |
| Food | 471557731 Gatorade 528pcg Zero Vrty Di | $623.04 | above range | $9.28 | median price of the same kind of item |
| Food | 17823561312 126 pc WM GMI(4) LC/HNC/RPPB/CTC FS HPMU | $621.18 | above range | $80.32 | median per-unit price of comparable items |
| Food | 935472208 24 PCS CHEWY SWEETARTS, Case of 12 | $617.55 | above range | $471.31 | comparable item: 24 PCS CHEWY SPREE, Case of 12 |
| Food | 591621172 Nielsen-Massey Tahitian Pure Vanilla Extract, 128 oz | $615.86 | above range | $17.98 | median price of the same kind of item |
| Food | 699011469 SNYDERS OF HANOVER PRETZELS VARIETY | $596.16 | above range | $8.67 | comparable item: Snyder's of Hanover Variety Pack Pretzels, 20 Coun |
| Food | 205523835 Member's Mark Vegetable Oil (3 Quart, 2 Count) | $592.41 | above range | $19.85 | comparable item: Michigan Valley Brand Vegetable Oil, 128.0 FL OZ |
| Food | 501071723 24 PCS RING POP LOLLIPOP, Case of 12 | $588.30 | above range | $7.60 | median price of the same kind of item |
| Food | 37181922 Generic Mushroom Dried Porcini Xf, 16 Oz (pack O | $587.23 | above range | $9.28 | comparable item: Mushroom Dried Porcini Ba, 1 Lb (pack Of |
| Food | 1710867952 Betr Remedies Betr Sidekick 57pc | $585.79 | above range | $147.20 | comparable item: 136 pc HWN King 136ct Sidekick |
| Food | 860341880 2340 PCS DUM DUM POPS BULK, Case of 3 | $585.38 | above range | $7.67 | median price of its category |
| Food | 173175090 Daily Chef 4% Milkfat Minimum Small Curd Regular Cottage Cheese 5 lb T | $578.28 | above range | $9.10 | comparable item: Great Value 4% Milkfat Minimum Small Curd Cottage  |
| Food | 930233912 Expert Grill 117pceg Flavor Mix | $570.96 | above range | $58.42 | median per-unit price of comparable items |
| Food | 38453377 Hot Fudge/Caramel Warmer with 1 Ladle & 1 Stainless Steel Pump | $570.00 | above range | $6.38 | median price of the same kind of item |
| Food | 225451441 Mac N Cheetos 448pcmnc Half Palle | $555.52 | above range | $6.43 | median price of its category |
| Food | 5129617690 PEPPERIDGE FARM GOLDFISH CRACKERS VARIETY | $552.64 | above range | $5.98 | comparable item: PEPPERIDGE FARM CRACKERS VARIETY |
| Food | 10756115 Weber Smokey Mountain Cooker Charcoal Smoker with 22-Inch | $549.00 | above range | $13.21 | median price of its category |
| Food | 15259868572 KFFKFF Synthetic Blooms | $544.99 | above range | $13.21 | median price of its category |
| Food | 170340588 Lucky Charms 136pcgmi(2) Lc Mmo | $541.28 | above range | $5.00 | comparable item: Lucky Charms Gm Lc 20.5oz 2pack |
| Food | 627661914 General Mills 420pcctc/hnc/lc Pou | $537.60 | above range | $5.00 | comparable item: General Mills Gm Ms 3pk Hnc-lc-hnc 36oz |
| Food | 37946746 American Specialties Surface Mounted Hand Dryer, White Enamel, 10.75X1 | $533.26 | above range | $6.43 | median price of its category |
| Food | 100975425 Sparkling Ice Tea Peach Tea 17 Fl Oz (Case of 12) | $530.90 | above range | $9.77 | comparable item: Sparkling Ice Tea Lemon Tea, 17 Fl Oz (Case of 12) |
| Food | 115162593 20PK LTO5 WORM CUSTOM LABELED | $528.76 | above range | $7.67 | median price of its category |
| Food | 989238460 Nielsen-Massey Mexican Pure Vanilla Extract, 128 oz | $527.87 | above range | $17.98 | median price of the same kind of item |
| Food | 588014535 Nielsen-Massey Pure Vanilla Extract 128 fl oz Bottle for Baking and Co | $517.12 | above range | $17.98 | median price of the same kind of item |
| Food | 13798756330 PEPPERIDGE FARM GOLDFISH CRACKERS VARIETY | $510.40 | above range | $5.98 | comparable item: PEPPERIDGE FARM CRACKERS VARIETY |
| Food | 8725323502 Lucano Amaro Zero Non-Alcoholic Italian Dealcoholized Aperitif Elixir  | $510.30 | above range | $243.50 | comparable item: Lucano Amaro Zero Non-Alcoholic Italian Dealcoholi |
| Food | 480628296 Nielsen-Massey Organic Fairtrade Madagascar Bourbon Pure Vanilla Extra | $509.95 | above range | $17.98 | median price of the same kind of item |
| Food | 389589685 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 8) | $505.37 | above range | $30.61 | comparable item: Tortrix Tacos Creole Sauce 6.34 oz - Salsa Criolla |
| Food | 36761043 Syrup Maple Pure Grade A, 1 Ga (pack Of | $501.01 | above range | $14.99 | median price of the same kind of item |
| Food | 481437356 24 PCS RING POP TWIST, Case of 12 | $500.55 | above range | $78.24 | median per-unit price of comparable items |
| Food | 501339169 Sour Patch 60pcsr Patch Kids A | $498.20 | far above the same kind of item | $14.05 | median per-unit price of comparable items |
| Food | 750464669 Habanero Salt | $495.53 | far above the same kind of item | $3.37 | comparable item: Habanero with Sea Salt |
| Food | 2739228017 Kk Bday Cake Std Pw | $480.48 | far above the same kind of item | $8.73 | median price of the same kind of item |
| Food | 5492607701 WM GMI(5) BARS CTC/L | $475.38 | far above the same kind of item | $10.82 | median price of the same kind of item |
| Food | 955786413 8pclt Adjust & Jam | $456.00 | far above the same kind of item | $9.34 | median price of the same kind of item |
| Food | 133320415 Seeds,grain&candy Pecan Halves | $449.40 | far above the same kind of item | $81.67 | comparable item: We Got Nuts Pecan Halves, 7 lbs |
| Food | 2512264612 144pc8ct Cereal Bar | $447.12 | far above the same kind of item | $7.15 | median price of the same kind of item |
| Food | 16279454410 Club Cracker Quarter | $442.68 | far above the same kind of item | $6.47 | median price of the same kind of item |
| Food | 213851250 AIRHEADS 1.50oz BIG BAR STRAWBERRY & WATERMELON, Case of 12 | $436.20 | far above the same kind of item | $1.91 | comparable item: That's It Fruit Bar - Apple And Strawberry - Case  |
| Food | 597035871 24 PCS SOUR PATCH EXTREME, Case of 12 | $436.20 | far above the same kind of item | $61.69 | median per-unit price of comparable items |
| Food | 3668305892 Tapatio Seasoning SH | $430.08 | far above the same kind of item | $12.04 | comparable item: Good Sh*t Seasoning |
| Food | 103129543 Impact Peptide 1.5 Cal Nutritional Formula - NCL97400 | $424.93 | far above the same kind of item | $20.60 | comparable item: Impact Peptide 1.5 Cal Nutritional Formula - NCL97 |
| Food | 5158702153 WM GMI(2) RICE/CORN | $424.44 | far above the same kind of item | $28.99 | comparable item: Vigo Mexican Rice With Corn, 8 oz (Pack of 12) |
| Food | 16583218951 Goldfish 20ct 48pc | $420.48 | far above the same kind of item | $6.23 | median price of the same kind of item |
| Food | 20022372546 Upper Cut Iberico Ham, Whole Leg | $397.00 | far above the same kind of item | $6.01 | median price of the same kind of item |
| Food | 684017736 1.7 oz RING POP GUMMIES, Case of 12 | $395.25 | far above the same kind of item | $9.32 | median per-unit price of comparable items |
| Food | 15573706815 JL 9.2oz Beef Sticks | $395.00 | far above the same kind of item | $20.36 | comparable item: 3OZ JL ORIGINAL BEEF AND PEPPER JACK STICKS 1/1 |
| Food | 482003965 1 Gallon Great Value Purified Drinking Water (128 fluid ounces) | $394.56 | far above the same kind of item | $10.79 | median per-unit price of comparable items |
| Food | 271137636 TOXIC WASTE 1.7OZ ASSORTED SOUR CANDY DRUM, Case of 12 | $383.55 | far above the same kind of item | $13.46 | median per-unit price of comparable items |
| Food | 1062875846 SBC RG & Kcup Displa | $382.56 | far above the same kind of item | $22.36 | median price of the same kind of item |
| Food | 328559195 Skinnypop Popcorn Skinny Pop - White Cheddar , 4.4 Oz | $377.40 | far below comparable items | $2.69 | comparable item: Skinny Pop White Cheddar Popcorn, 4.4 oz (Pack of  |
| Food | 114929975 Seeds,grain&candy Walnut Halves | $374.50 | far above the same kind of item | $3.83 | comparable item: Diamond Walnut Halves 2.25 Oz |
| Food | 135420040 Seeds,grain&candy Cashew Whole Salted | $374.50 | far above the same kind of item | $8.14 | comparable item: Great Value 10oz Whole Cashew |
| Food | 155897984 Seeds,grain&candy Pistachios Salted | $374.50 | far above the same kind of item | $3.99 | comparable item: Nature's Garden PISTACHIOS - SALTED |
| Food | 161897642 Seeds,grain&candy Almond Natural Sliced | $374.50 | far above the same kind of item | $5.97 | comparable item: Produce Unbranded Almond Sliced |
| Food | 175288699 Seeds,grain&candy Almond Whole Natural | $374.50 | far above the same kind of item | $10.09 | comparable item: Blue Diamond, Almond, Whole Natural, 1.5 oz (43g), |
| Food | 244190457 Impact Peptide 1.5 Cal Nutritional Formula - NCL97371 | $372.08 | far above the same kind of item | $20.60 | comparable item: Impact Peptide 1.5 Cal Nutritional Formula - NCL97 |
| Food | 27617775 Roland Fancy Sockeye Red Salmon, 14.75 O | $368.00 | far above the same kind of item | $7.58 | comparable item: Roland Fancy Sockeye Red Salmon, 7.5 Oz |
| Food | 988718528 SKITTLES CHANGEMAKER ORIGINAL .35oz 100ct, Case of 10 | $366.00 | far above the same kind of item | $94.95 | comparable item: SKITTLES ORIGINAL BAG 7.2oz, Case of 2 |
| Food | 991205386 48 PCS YARDSTICK BUBBLE GUM, Case of 2 | $365.03 | far above the same kind of item | $11.94 | comparable item: 216 PCS DUBBLE BUBBLE GUM, Case of 6 |
| Food | 740599380 SMARTIES 10 TABLET ROLLS IN BULK APPX 3500, Case of 2 | $360.15 | far above the same kind of item | $2.85 | comparable item: SMARTIES BOX 160 CT, Case of 16 |
| Food | 318001519 Hives & Honey 24pc24pk Mya/erin C | $359.52 | far above the same kind of item | $79.84 | comparable item: Hives & Honey 8pc8pk Ceramic |
| Food | 101997509 72 PCS SIXLETS CANDIES, Case of 24 | $354.30 | far above the same kind of item | $6.24 | median price of the same kind of item |
| Food | 1884988374 Nescafé® Espresso Whole Bean Coffee, Arabica, 2.2 Lb Bag, 6/carton | $349.23 | far above the same kind of item | $43.98 | median per-unit price of comparable items |
| Food | 284339012 Hard Candy 58pc Halloween Sk | $347.40 | far above the same kind of item | $19.81 | median per-unit price of comparable items |
| Food | 7981124349 General S&d Dark Roast Whole Bean Coffee | $346.36 | far above the same kind of item | $12.96 | comparable item: CharBeanz Dark Roast Whole Bean Coffee, 12 oz |
| Food | 20690740 Buff Bake Buff Bake Protein Cookie, 2.82 oz | $344.97 | far above the same kind of item | $2.08 | comparable item: Buff Bake Snickerdoodle - 12 pack 80g Cookie |
| Food | 35053879 Lindon Farms Emergency Food Storage Seed Kit over 316,000 Seeds RP5099 | $341.99 | far above the same kind of item | $9.18 | median price of the same kind of item |
| Food | 730842425 Cherrybrook Kitchen - Cookie Mix - Chocolate Chip - Case Of 6 - 14.2 O | $333.33 | far below comparable items | $35.44 | comparable item: Cherrybrook Kitchen Chocolate Chip Cookie Mix, 14. |
| Food | 161197784 MINI MAGIC WAND CANDY .46OZ, Case of 18 | $330.90 | far above the same kind of item | $5.52 | median per-unit price of comparable items |
| Food | 973534292 SWEETART ROPES CHERRY PUNCH 1.8oz, Case of 12 | $330.90 | far above the same kind of item | $28.90 | median per-unit price of comparable items |
| Food | 291164122 AIRHEADS 1.50oz BIG BAR BLUE RASPBERRY & CHERRY, Case of 6 | $327.98 | far above the same kind of item | $22.50 | comparable item: Airheads 2-In-1 Big Candy Bar, Blue Raspberry And  |
| Food | 26641125 Benchmark USA 51072H Hot Fudge/Caramel Warmer | $325.60 | far above the same kind of item | $6.38 | median price of the same kind of item |
| Food | 546839740 SBUX NESPRESSO 25CT | $324.25 | far above the same kind of item | $15.94 | median per-unit price of comparable items |
| Food | 163132390 Niagara Bottling Purified Drinking Water | $320.46 | far above the same kind of item | $16.99 | median price of the same kind of item |
| Food | 14155150315 Strawberry Heart Gum | $320.00 | far above the same kind of item | $9.04 | median price of the same kind of item |
| Food | 159891104 2" ZOO ANIMAL LOLLIPOP WITH 4" STICK, Case of 576 | $319.20 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 920644545 LAFFY TAFFY ASSORTED ROPE TUB 48ct, Case of 12 | $313.35 | far above the same kind of item | $69.41 | comparable item: LAFFY TAFFY GRAPE MINI BARS 145ct, Case of 8 |
| Food | 1018102239 GV Tortilla Chip Res | $307.32 | far above the same kind of item | $1.94 | comparable item: Mi Ranchito Tortilla Chip |
| Food | 14541214199 Ultimate Bloody Mary Mix Sampler 26 Pack – Includes George's, Mr & Mrs | $299.98 | far above the same kind of item | $154.98 | comparable item: Ultimate Bloody Mary Mix Sampler 13 Pack – Include |
| Food | 1687976191 Dill Pickle 1/60ct | $298.20 | far above the same kind of item | $10.75 | comparable item: Van Holten Hot Dill Pickle, 12 Ct |
| Food | 408201879 GV 198CT Potato Chip | $297.00 | far above the same kind of item | $6.23 | median price of the same kind of item |
| Food | 817832153 Great Value 198ct Gv Potato Chip | $297.00 | far above the same kind of item | $6.23 | median price of the same kind of item |
| Food | 293386391 Boost® Soothe Strawberry Kiwi Oral Supplement, 8 oz. Carton | $296.88 | far above the same kind of item | $47.43 | comparable item: Boost Plus® Strawberry Oral Supplement, 8 oz. Cart |
| Food | 54388983 Doctor In The Kitchen Flackers Flax Seed Crackers Rosemary -- 5 2 Pc O | $296.67 | far above the same kind of item | $1.19 | median per-unit price of comparable items |
| Food | 257164228 2" SWIRL LOLLIPOP, Case of 576 | $295.80 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 433091413 2" TROPICAL FISH LOLLIPOP WITH 4" STICK, Case of 576 | $295.80 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 967598120 2" SPORTSBALL LOLLIPOP WITH 4" STICK, Case of 576 | $295.80 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 38440889 Hot Fudge/Caramel Warmer with 2 Stainless Steel Pumps | $293.75 | far above the same kind of item | $6.38 | median price of the same kind of item |
| Food | 351106064 TOXIC WASTE 1.7OZ ASSORTED SOUR CANDY DRUM, Case of 6 | $289.95 | far above the same kind of item | $6.73 | median per-unit price of comparable items |
| Food | 410883095 Hives & Honey 12pc12pk Opalkara | $287.76 | far above the same kind of item | $79.84 | comparable item: Hives & Honey 8pc8pk Ceramic |
| Food | 7630772345 Women's Health Gummy | $287.00 | far above the same kind of item | $10.79 | median price of the same kind of item |
| Food | 5300126252 TrustyPup Donut Side | $286.56 | far above the same kind of item | $7.97 | median price of the same kind of item |
| Food | 29472738 Roland 5 Flavor Blend Peppercorns, 15.5 | $280.96 | far above the same kind of item | $10.99 | median price of the same kind of item |
| Food | 911867487 AIRHEADS 1.50oz BIG BAR STRAWBERRY & WATERMELON, Case of 6 | $278.25 | far above the same kind of item | $8.68 | median per-unit price of comparable items |
| Food | 22985167 Augason Farms Freeze Dried Fruit/Vegetable Combo Food Storage Pails, 2 | $277.71 | far above the same kind of item | $31.33 | comparable item: Emergency Essentials Freeze-Dried Vegetable Harves |
| Food | 425296015 2" ZOO ANIMAL LOLLIPOP WITH 4" STICK, Case of 288 | $272.40 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 588485085 2" TROPICAL FISH LOLLIPOP WITH 4" STICK, Case of 288 | $272.40 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 704012585 24 PCS SOUR PATCH EXTREME, Case of 6 | $272.40 | far above the same kind of item | $30.59 | median per-unit price of comparable items |
| Food | 729567091 2" BOWLING LOLLIPOP WITH 4" STICK, Case of 288 | $272.40 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 822769493 2" SPORTSBALL LOLLIPOP WITH 4" STICK, Case of 288 | $272.40 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 5367416909 1oz Takis Dumpbin | $270.00 | far above the same kind of item | $0.70 | median per-unit price of comparable items |
| Food | 55231351 BIOVEA Nutritional Yeast Flakes, 1 lb | $265.53 | far above the same kind of item | $18.69 | comparable item: Anthony's Goods Nutritional Yeast Flakes, 1 lb. |
| Food | 19979162934 106 pc 106 PC REESE'S OREO | $265.00 | far above the same kind of item | $12.79 | median per-unit price of comparable items |
| Food | 927441736 1.7 oz RING POP GUMMIES, Case of 6 | $263.63 | far above the same kind of item | $4.66 | median per-unit price of comparable items |
| Food | 848328122 SMARTIES 10 TABLET ROLLS IN BULK APPX 3500 | $261.68 | far above the same kind of item | $3.42 | median per-unit price of comparable items |
| Food | 287319124 Sensoryfx 90pcasmr Bars | $259.20 | far above the same kind of item | $10.82 | median price of the same kind of item |
| Food | 693128932 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 4) | $257.93 | far above the same kind of item | $15.30 | comparable item: Tortrix Tacos Creole Sauce 6.34 oz - Salsa Criolla |
| Food | 212922412 Adams Gum 100 x 2 units - Chiclets (Pack of 24) | $257.17 | far above the same kind of item | $78.00 | comparable item: Adams Gum 100 x 2 units - Chiclets (Pack of 6) |
| Food | 419585927 Rumi Spice Saffron Gift,2Gm (Pack Of 12) | $256.35 | far above the same kind of item | $7.66 | median price of its category |
| Food | 220216769 72 PCS SIXLETS CANDIES, Case of 12 | $254.85 | far above the same kind of item | $6.24 | median price of the same kind of item |
| Food | 33326367 Wholesome Sweeteners Organic Raw Blue Agave, 5 Gallons | $253.83 | far above the same kind of item | $7.66 | median price of its category |
| Food | 1704059718 Nescafe Ristretto Decaf Coffee - Dark Roast, 35.3 oz | $253.38 | far above the same kind of item | $16.11 | median per-unit price of comparable items |
| Food | 538011013 48 PCS GUMMI PIZZA, Case of 8 | $252.90 | far above the same kind of item | $6.63 | median price of the same kind of item |
| Food | 507684849 44 Servings Freeze-Dried Pineapple Pouch - 6 pack w/bucket | $250.00 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Food | 733383122 SKITTLES CHANGEMAKER ORIGINAL .35oz 100ct, Case of 5 | $249.00 | far above the same kind of item | $94.95 | comparable item: SKITTLES ORIGINAL BAG 7.2oz, Case of 2 |
| Food | 403522037 2" BOWLING LOLLIPOP WITH 4" STICK, Case of 576 | $248.16 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 501049332 Alfajor Cocunut Candy - Dulce De Coco 3.5 Oz 12 Units (Pack of 12) | $247.29 | far above the same kind of item | $23.30 | median per-unit price of comparable items |
| Food | 460457528 Great Northern Popcorn Black All Star Classic Style Popcorn Counter To | $246.00 | far above the same kind of item | $6.22 | median per-unit price of comparable items |
| Food | 252246364 2" SWIRL LOLLIPOP, Case of 288 | $245.84 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 18915311276 96 pc SKITTLES CORE SS 96CT TRY | $245.76 | far above the same kind of item | $23.31 | median per-unit price of comparable items |
| Food | 15067816408 Original Beef Chompl | $245.44 | far above the same kind of item | $9.90 | comparable item: Barbacoa Sabor Beef Jerky, Original, 3 Oz |
| Food | 55292808 Augason Farms Freeze Dried Meat Variety Kit 6-Pack | $244.99 | far above the same kind of item | $7.97 | median price of the same kind of item |
| Food | 18889671632 96 pc M&MS MXD SHRSZ PDQTY WM 96CS | $243.84 | far above the same kind of item | $100.91 | median per-unit price of comparable items |
| Food | 43389488 studio 2,undftd,olive Dra | $243.75 | far above the same kind of item | $7.79 | median price of the same kind of item |
| Food | 112312383 Green Mountain Coffee Roasters®, GMT4162, Coffee | $243.46 | far above the same kind of item | $2.05 | comparable item: Green Mountain Coffee Roasters®, GMT4432, Breakfas |
| Food | 573617751 MINI MAGIC WAND CANDY .46OZ, Case of 9 | $243.15 | far above the same kind of item | $2.73 | median per-unit price of comparable items |
| Food | 158125492 Naturade Weight Gain Single Serve, 12 Ct | $241.08 | far above the same kind of item | $16.02 | median per-unit price of comparable items |
| Food | 875959018 60 Servings Freeze-Dried Blueberries Pouch - 6 pack w/bucket | $240.00 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Food | 8623452074 NM Zero Sugar Gummy | $240.00 | far above the same kind of item | $10.79 | median price of the same kind of item |
| Food | 742173096 MUE 5PC CRACKER SHP | $239.76 | far above the same kind of item | $2.98 | median per-unit price of comparable items |
| Food | 496241378 DUBBLE BUBBLE DUG OUT GUM 2.25 oz, Case of 9 | $238.77 | far above the same kind of item | $34.69 | comparable item: GUM BALLS DUBBLE BUBBLE 5OZ BAG 0, Case Pack of 12 |
| Food | 3858691111 Granola Bars and Dri | $237.60 | far above the same kind of item | $7.19 | comparable item: Great Value Chewy Granola Bars, 15.2 oz |
| Food | 1694456887 Nature Valley Oats/honey Granola Bar - Oat, Honey - 108 / Carton | $234.77 | far above the same kind of item | $26.64 | comparable item: Nature Valley® Granola Bars, Oats And Honey, 1.5 O |
| Food | 1646206420 Gatorade Thirst Quencher Powder Mix - Powder - 1.31 Lb - 2.50 Gal Maxi | $232.70 | far above the same kind of item | $22.00 | median per-unit price of comparable items |
| Food | 1913957810 Gatorade Thirst Quencher Powder Mix - Powder - 1.31 Lb - 2.50 Gal Maxi | $232.70 | far above the same kind of item | $22.00 | median per-unit price of comparable items |
| Food | 238400207 Passage Foods Passage To Vietnam Simmer Sauce, Lemongrass Chicken, 7 O | $232.68 | far above the same kind of item | $4.70 | comparable item: Passage to India Simmer Sauce, Butter Chicken, 7 O |
| Food | 889759273 SWEETART ROPES CHERRY PUNCH 1.8oz, Case of 6 | $231.45 | far above the same kind of item | $6.43 | median per-unit price of comparable items |
| Food | 713719332 TOOTSIE ROLL HEXAGON 280 CT, Case of 8 | $230.28 | far above the same kind of item | $6.30 | median price of the same kind of item |
| Food | 933041169 44 Servings Freeze-Dried Pineapple Pouch - 6 pack | $230.00 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Food | 37181907 Generic Roland Nonpareilles Capers, 1 Gal, (pack | $228.99 | far above the same kind of item | $43.98 | median per-unit price of comparable items |
| Food | 394916280 3D Chocolate Cowboy Bunny | $228.48 | far above the same kind of item | $35.38 | comparable item: 3D Chocolate Golfer Bunny |
| Food | 498023958 Rhino Rush Energy Sweet Puckerade Energy Shot, 6 ct. | $228.13 | far above the same kind of item | $19.74 | comparable item: Rhino Rush Energy Sweet Puckerade Energy Shot, 4 c |
| Food | 799898192 Rhino Rush Energy Just Peachy Energy Shot, 6 ct. | $228.13 | far above the same kind of item | $15.60 | comparable item: Rhino Rush Energy Just Peachy Energy Shot, 4 ct. |
| Food | 13997711 Nescafe 24200 PowerBar, Trail Mix, Individually Wrapped, 15/Box | $226.56 | far above the same kind of item | $34.49 | comparable item: 24100 PowerBar, Mixed Nuts, Individually Wrapped,  |
| Food | 647040749 28 Servings Freeze Dried Peaches - 6 pack w/bucket | $225.76 | far above the same kind of item | $6.47 | median price of the same kind of item |
| Food | 425860823 2" PRINCESS LOLLIPOP, Case of 576 | $225.60 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 439820206 2" BUTTERFLY LOLLIPOP WITH 4" STICK, Case of 576 | $225.60 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 1260191138 Gatorade Foods Powdered Mix Pouches - Powder - 1.31 Lb - 2.50 Gal Maxi | $223.92 | far above the same kind of item | $22.00 | median per-unit price of comparable items |
| Food | 21119765 Ninja Vita Drink Creator, Black Cherry, Pack of 4 | $221.56 | far above the same kind of item | $4.97 | comparable item: Ninja Vita Drink Creator Black Cherry |
| Food | 21119764 Ninja Vita Drink Creator, Berry Pomegranate, Pack of 4 | $220.31 | far above the same kind of item | $23.48 | comparable item: Ninja Vita Drink Creator, Pink Lemonade, Pack of 4 |
| Food | 322123307 Ziyad Butter Ghee,32 Oz (Pack Of 12) | $220.09 | far above the same kind of item | $248.10 | comparable item: Ziyad Brand Butter Ghee, 16 oz, (Pack of 6) |
| Food | 712449371 60 Servings Freeze-Dried Blueberries Pouch - 6 pack | $220.00 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Food | 20511555 Cook's Hickory Smoked Bone-In Whole Shoulder Picnic Pork, 9.0-11.0 lb | $219.78 | far above the same kind of item | $45.32 | comparable item: Sugardale Prestige Hickory Smoked Whole Ham, Fully |
| Food | 177222795 1/4 Choc/wht Iced Cake | $218.98 | far above the same kind of item | $12.02 | median price of the same kind of item |
| Food | 31196477 Wholesome Sweeteners Organic Blue Agave, 5 gal | $217.29 | far above the same kind of item | $7.66 | median price of its category |
| Food | 625728831 0.25 OZ JELLY BELLY, Case of 4 | $215.85 | far above the same kind of item | $2.44 | comparable item: License Jelly Belly |
| Food | 54427503 Urbani White Truffle Oil Dressing 55 ml (Pack Of 12) | $214.99 | far above the same kind of item | $8.79 | median per-unit price of comparable items |
| Food | 14224369682 SKITTLES POP'D 36 CT | $214.56 | far above the same kind of item | $8.74 | median per-unit price of comparable items |
| Food | 444560727 Frontier Orange Flavor, 128 Oz | $214.16 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Food | 311598977 STARBUCKS COCOA;HOT;GOURMET | $214.11 | far above the same kind of item | $18.77 | comparable item: Starbucks Gourmet Hot Cocoa, 1.25oz Packet, 24/Box |
| Food | 44883379 72PCTRIDENT GUM 72CT | $213.12 | far above the same kind of item | $84.00 | comparable item: Trident Original Gum, 3 Count, 3 Pack |
| Food | 766279983 Slim Jim Sj Org/mld Hday 32pc | $212.16 | far above the same kind of item | $7.67 | median price of its category |
| Food | 27617786 Roland Albacore White Tuna In Water, 6.1 | $212.00 | far above the same kind of item | $12.88 | comparable item: Chicken of the Sea Albacore White Tuna in Water, 3 |
| Food | 47336145 Eden Tart Cherry Juice Concentrate, Orga | $211.84 | far above the same kind of item | $26.58 | comparable item: Cheribundi Tart Cherry Juice, 8 fl oz, 4 pack, (Pa |
| Food | 496446407 2" PIRATE LOLLIPOP, Case of 576 | $211.56 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 643784536 LAFFY TAFFY ASSORTED ROPE TUB 48ct, Case of 6 | $210.98 | far above the same kind of item | $34.70 | comparable item: LAFFY TAFFY GRAPE MINI BARS 145ct, Case of 8 |
| Food | 29472841 Roland Pure Sesame Oil In Plastic Bottle | $210.69 | far above the same kind of item | $7.58 | comparable item: Roland Toasted Sesame Oil 12.5 fl oz |
| Food | 401527594 Café Bustelo®, FOL00050CT, Espresso Blend Coffee, 24 / Carton | $210.04 | far above the same kind of item | $72.63 | comparable item: Café Bustelo®, FOL1014, Espresso Coffee, 30 / Cart |
| Food | 811452473 Raw Generation 5-Day Juice Cleanse- 30 Cold-Pressed Juices | Flash-Fro | $209.99 | far above the same kind of item | $6.99 | median price of the same kind of item |
| Food | 443288458 Rhino Rush Energy Rogue Berry Energy Shot, 4 ct. | $209.98 | far above the same kind of item | $10.11 | comparable item: Rhino Rush Energy Rogue Berry Energy Shot, 6 ct. |
| Food | 777423836 Rhino Rush Energy Ghost Energy Shot, 4 ct. | $209.98 | far above the same kind of item | $10.11 | comparable item: Rhino Rush Energy Ghost Energy Shot, 6 ct. |
| Food | 188134286 3X Chemistry 352 Salt Neutralizer - 6 Gallons | $209.48 | far above the same kind of item | $9.12 | median price of the same kind of item |
| Food | 227781218 Sol-ti Peach Lemon CBD+ Tea | $209.30 | far above the same kind of item | $6.43 | comparable item: Snapple Lemon Tea, 32 fl oz bottle |
| Food | 766548334 Deli Component Chicken Carnitas No Sauce | $209.00 | far above the same kind of item | $8.23 | median price of the same kind of item |
| Food | 110473355 Deli Component Exotic Orange Juice | $208.88 | far above the same kind of item | $7.50 | comparable item: Ocean Spray 100% Orange Juice, 32 Fl Oz |
| Food | 384074440 Dry Hidden Valley 120ct Dhv Dips Shppr | $208.80 | far above the same kind of item | $5.11 | median price of the same kind of item |
| Food | 135924537 Seeds,grain&candy Chocolate Maltballs | $208.74 | far above the same kind of item | $3.06 | comparable item: Theo Chocolate, 3 Oz |
| Food | 14424863496 Great Value Chicken Stuffing 6oz | $207.10 | far above the same kind of item | $0.97 | comparable item: Great Value Chicken Flavored Stuffing Mix, 6 oz |
| Food | 15684959987 OG S&S Dipping Sauce | $207.00 | far above the same kind of item | $1.33 | comparable item: Lucas Lucas Dipping Sauce, 5.64 oz |
| Food | 858437029 3000 Piece Bulk Candy Assortment - Edibles - 3000 Pieces | $206.99 | far above the same kind of item | $7.38 | median price of the same kind of item |
| Food | 193382020 Green Mountain Our Blend Classic Ground Coffee | $205.00 | far above the same kind of item | $95.51 | comparable item: Green Mountain Nantucket Blend Ground Coffee |
| Food | 703657206 2" TWIST SWIRL LOLLIPOP, Case of 576 | $202.20 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 470423614 SOUR FACE TWISTERS SOUR CENTER BUBBLE GUM/ CANDY POWDER STICKS, Case P | $201.21 | far above the same kind of item | $7.38 | median price of the same kind of item |
| Food | 182765204 Marketside Five Cheese Ravioli, 9 oz | $200.71 | far above the same kind of item | $3.02 | median per-unit price of comparable items |
| Food | 26632845 Ultimate Professional Cake Decorating Set | $199.99 | far above the same kind of item | $12.00 | comparable item: Wilton 25 Piece Cake Decorating Set |
| Food | 121896501 Seeds,grain&candy Jordan Almond White | $199.50 | far above the same kind of item | $12.58 | comparable item: Streit's Jordan Almond Nuts, 14 Oz |
| Food | 142590393 Seeds,grain&candy M&m | $199.50 | far above the same kind of item | $9.18 | median price of the same kind of item |
| Food | 191495183 Seeds,grain&candy M&m Peanut | $199.50 | far above the same kind of item | $9.18 | median price of the same kind of item |
| Food | 9583309342 TRIDENT GUM 144 CT WM | $197.28 | far above the same kind of item | $19.55 | median per-unit price of comparable items |
| Food | 610649640 Ujido Matcha Green Tea Powder, 4 oz, 8 pack | $197.12 | far above the same kind of item | $40.00 | comparable item: Nature's Truth Matcha Green Tea Powder, 4.0 Oz |
| Food | 34971606 GRAB POP FRUIT FLAVORED CANDY ASSTD FLAVORS IN COUNTER DSPL, Case Pack | $196.99 | far above the same kind of item | $7.38 | median price of the same kind of item |
| Food | 27048610 Gatorade Instant Powder, Variety Pack, 21 oz | $196.80 | far above the same kind of item | $35.38 | comparable item: Carnation Instant Breakfast, Variety Pack |
| Food | 636125429 360 PCS TOOTSIE FROOTIES FRUIT PUNCH, Case of 12 | $196.35 | far above the same kind of item | $13.19 | comparable item: Red Fruit Punch Frooties Tootsie Rolls |
| Food | 1989807860 Gatorade® Original Powdered Drink Mix, Riptide Rush, 21oz Packets, 32/ | $195.15 | far above the same kind of item | $22.04 | median per-unit price of comparable items |
| Food | 47443477 Emergency Essentials Freeze-Dried Shredded Cheese Combo, 6 count | $195.12 | far above the same kind of item | $2.98 | median price of the same kind of item |
| Food | 539820741 On The Go Peach Mango With Caffeine Drink Mix, 10-Packet Box (Pack Of  | $194.48 | far above the same kind of item | $7.44 | comparable item: Crystal Light On The Go Energy Peach Mango Drink M |
| Food | 756859708 Grace Iced Animal Crackers Value Pack of 42 1 Oz - Galletas de Animale | $193.83 | far above the same kind of item | $37.72 | comparable item: Grace Iced Animal Crackers Value Pack of 42 1 Oz - |
| Food | 154408900 (3 Boxes) Yogi Teas Tea Bst Seller 3Flvr Dsp 48Pc 1 DS (Pack of 1) | $192.00 | far below comparable items | $14.28 | median per-unit price of comparable items |
| Food | 289810564 Yogi Teas Tea Bst Seller 3Flvr Dsp 48Pc 1 DS (Pack of 1) | $192.00 | far below comparable items | $14.28 | median per-unit price of comparable items |
| Food | 717434688 General Mills 192pcgm Cereal Cup | $192.00 | far above the same kind of item | $20.79 | comparable item: Cereal Cup, 1.6 Oz (pack Of 12) |
| Food | 756178215 28 Servings Freeze Dried Peaches - 6 pack | $191.55 | far above the same kind of item | $6.47 | median price of the same kind of item |
| Food | 114277142 Seeds,grain&candy Chocolate Peanut Double Dipped | $191.36 | far above the same kind of item | $22.47 | comparable item: Brach's Double Dipped Chocolate Peanuts, 5 Lb. |
| Food | 7024352095 SKITTLES POP VARIETY | $191.00 | far above the same kind of item | $13.40 | comparable item: Takis Variety Pack 18ct 1oz |
| Food | 5104391454 Klass Powdered Drink Mix Variety pack 14.1 oz Refreshing Flavors Bever | $190.80 | far above the same kind of item | $2.28 | comparable item: Klass Powdered Drink Mix, Limeade, 14.1 oz, 6 Pack |
| Food | 908608698 48 PCS YARDSTICK BUBBLE GUM | $190.01 | far above the same kind of item | $7.97 | comparable item: Bubblicious Bubble Gum, 90 Ct |
| Food | 336267509 Dubble Bubble 36" Metal Gumball Machine w/ 200PCS Gumballs | $188.90 | far above the same kind of item | $26.16 | median per-unit price of comparable items |
| Food | 25522427 Sqwincher Sugar-Free Qwik Stik, Peach Tea, 0.11 oz, Pack | $186.63 | far above the same kind of item | $12.95 | median price of the same kind of item |
| Food | 306221926 Specialty Coffee Roblesabana Costa Rica Single Origin Las Lajas Red Ho | $185.93 | far above the same kind of item | $41.92 | comparable item: Specialty Coffee Roblesabana Costa Rica Single Ori |
| Food | 713998773 80ct Doritos PPW | $185.60 | far above the same kind of item | $48.62 | median per-unit price of comparable items |
| Food | 524137120 Adams Gum 100 x 2 units - Chiclets (Pack of 18) | $185.00 | far above the same kind of item | $78.00 | comparable item: Adams Gum 100 x 2 units - Chiclets (Pack of 6) |
| Food | 54309288 Laci Le Beau Tea Herb Spr Diet Organicnl | $182.72 | far above the same kind of item | $31.67 | comparable item: Laci Le Beau Diet Original Herb Tea Samp |
| Food | 55288727 Milk Chocolate Heart Tin, 3.38 oz | $180.00 | far above the same kind of item | $12.58 | comparable item: Batman™ Heart Tin with Milk Chocolate Hearts, 2.54 |
| Food | 643571254 Suja Organic Juice Immunity & Digestion Shot Variety Pack, 2oz, 30 Cou | $179.99 | far above the same kind of item | $21.03 | median per-unit price of comparable items |
| Food | 643825173 Suja Organic Juice Vitamin D and Zinc Shot 2oz, 60 Count | $179.99 | far above the same kind of item | $18.60 | median per-unit price of comparable items |
| Food | 684534926 Hives & Honey 12pc12pk Kyle Carton | $179.76 | far above the same kind of item | $119.88 | comparable item: Hives & Honey 6pc6pk Opal Carton |
| Food | 439066038 8 INCH CHOCOLATE CAKE LAYER | $179.42 | far above the same kind of item | $110.27 | comparable item: 12 INCH CHOCOLATE CAKE LAYER |
| Food | 614704448 Folgers Classic Roast Ground Coffee, 1.5 Oz | $179.20 | far above the same kind of item | $2.30 | comparable item: Folgers Classic Roast Ground Coffee, 11.3oz |
| Food | 150928845 Community Tea Raspberry 4oz | $179.16 | far above the same kind of item | $8.02 | median per-unit price of comparable items |
| Food | 161291597 Community Tea Peach Mango 4oz | $179.16 | far above the same kind of item | $1.83 | median per-unit price of comparable items |
| Food | 132651447 Community Tea Greenw/lemon 4oz | $179.00 | far above the same kind of item | $6.03 | comparable item: Caribbean Dreams Ginger / Lemon Tea 1.35 |
| Food | 866605112 Thinkthin Pumpkin Spice Lean Protein And Fiber Bar, 1.41 Oz, Pack Of 1 | $178.90 | far above the same kind of item | $14.60 | comparable item: Thinkthin Pumpkin Spice Lean Protein And Fiber Bar |
| Food | 44897689 Kitchen Of Love Cucina & Amore Balsamic Vinegar Of Modena - Case of 6  | $178.76 | far above the same kind of item | $4.07 | comparable item: Cucina And Amore Balsamic Vinegar Of Modena - Case |
| Food | 27617798 Purity Farms Ghee Clarified Butter, 13 oz, (Pack of 12) | $177.12 | far above the same kind of item | $161.80 | comparable item: Carrington Farms Ghee Butter Clarified, 12Oz (Pack |
| Food | 1105244779 8pc Jelly Belly Hood | $176.00 | far above the same kind of item | $0.97 | median per-unit price of comparable items |
| Food | 531498991 DUBBLE BUBBLE DUG OUT GUM 2.25 oz, Case of 5 | $175.88 | far above the same kind of item | $34.69 | comparable item: GUM BALLS DUBBLE BUBBLE 5OZ BAG 0, Case Pack of 12 |
| Food | 21090687 Nelson Honey Manuka Bio Active, 10+ Hone | $175.76 | far above the same kind of item | $43.00 | comparable item: Manuka Honey Blend Bio Active 5+, 35.2 Oz |
| Food | 938619950 10 INCH CHOCOLATE CAKE LAYER | $174.11 | far above the same kind of item | $110.27 | comparable item: 12 INCH CHOCOLATE CAKE LAYER |
| Food | 46271042 Pack of 12, Roland Black Truffle Oil, 1.86 oz | $173.59 | far above the same kind of item | $87.88 | comparable item: Roland Oil Truffle Black,3.4Oz (Pack Of 12) |
| Food | 113282153 Legacy Essentials Assorted Freeze-Dried Fruit | $173.10 | far above the same kind of item | $15.30 | median price of the same kind of item |
| Food | 21090528 Gefen Fancy Chunk White Albacore Tuna In | $172.80 | far above the same kind of item | $3.86 | comparable item: Roland Fancy Albacore White Tuna, 6.125 Oz |
| Food | 8556902779 Fever Tree Premium Ginger Ale - Premium Quality Mixer and Soda - Refre | $172.31 | far above the same kind of item | $24.98 | comparable item: Fever Tree Premium Tonic Water - Premium Quality M |
| Food | 5212085594 Richs Cake Heart Yellow | $172.00 | far above the same kind of item | $42.00 | comparable item: Dawn Yellow Heart Cake In Pie |
| Food | 5218332276 Richs Cake Heart Yellow | $172.00 | far above the same kind of item | $42.00 | comparable item: Dawn Yellow Heart Cake In Pie |
| Food | 1822152951 Doritos Gam Mx PPW | $171.20 | far above the same kind of item | $5.70 | median price of the same kind of item |
| Food | 362466101 POWER POWDER LEGS CANDY 1.66OZ, Case of 4 | $171.00 | far above the same kind of item | $3.54 | median per-unit price of comparable items |
| Food | 119227689 Wal-Mart Bakery 8" Round Chocolate Double Layer Cake with Icing, 50 oz | $170.10 | far above the same kind of item | $29.98 | comparable item: Wal-mart Bakery 1/2 Chocolate Cake With Whipped Ic |
| Food | 317889650 Lamb Weston Potato Diced Rosemary Garlic | $167.70 | far above the same kind of item | $19.42 | comparable item: Dean Jacob's Rosemary & Garlic, 1.5 oz (Pack of 6) |
| Food | 105190518 2" PRINCESS LOLLIPOP, Case of 288 | $167.10 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 399896727 2" PIRATE LOLLIPOP, Case of 288 | $167.10 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 638371328 2" BUTTERFLY LOLLIPOP WITH 4" STICK, Case of 288 | $167.10 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 638723845 2" TWIST SWIRL LOLLIPOP, Case of 288 | $167.10 | far above the same kind of item | $7.60 | median price of the same kind of item |
| Food | 664755875 LAFFY TAFFY STRAWBERRY MINI BARS 145ct, Case of 8 | $167.10 | far above the same kind of item | $13.04 | median price of the same kind of item |
| Food | 305900439 Sweet Leaf English Toffee Sweet Drops, 2 Oz | $166.50 | far below comparable items | $2.00 | comparable item: English Toffee, 10 Oz. |
| Food | 643141244 Icee Blue Raspberry, Fcb 5 Gal | $165.75 | far above the same kind of item | $9.45 | median price of the same kind of item |
| Food | 3779280103 Icee Ic Strwbry Lemonade 5g Fcb | $165.75 | far above the same kind of item | $6.76 | median price of the same kind of item |
| Food | 162768595 Deli Component Exotic Orange Juice | $165.62 | far above the same kind of item | $7.50 | comparable item: Ocean Spray 100% Orange Juice, 32 Fl Oz |
| Food | 939871442 34 Servings Freeze-Dried Banana Chips Pouch - 6 pack w/bucket | $165.00 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Food | 675199731 Clorets Gum 60 x 2 units - Chicles (Pack of 24) | $163.71 | far above the same kind of item | $9.04 | median price of the same kind of item |
| Food | 17197250 East Wind Nut Butters Roasted No Salt Cashew Butter, 16 oz | $163.36 | far above the same kind of item | $14.30 | median per-unit price of comparable items |
| Food | 667132331 Wonder Nation 30pc30pk Snacks S | $163.19 | far above the same kind of item | $8.23 | median price of the same kind of item |
| Food | 353670871 Frontier Lemon Flavor, Certified Organic, 128 Oz | $161.28 | far above the same kind of item | $10.68 | median price of the same kind of item |
| Food | 165565583 Sol-ti Goji Strawberry SuperAde | $161.26 | far above the same kind of item | $2.18 | median per-unit price of comparable items |
| Food | 869179776 48 PCS GUMMI PIZZA, Case of 4 | $161.25 | far above the same kind of item | $41.13 | median per-unit price of comparable items |
| Food | 175377119 American Almond Almonds Granulate | $161.14 | far above the same kind of item | $9.60 | comparable item: Island Snacks Almonds, 4 Oz. |
| Food | 932396778 Lido Cremosa Cookies11oz - Galletas (Pack of 24) | $160.73 | far above the same kind of item | $11.45 | comparable item: Lido Cremosa Cookies 11 oz - Galletas |
| Food | 51258893 Wal-mart Bakery Purple Btrcrm Zgtf Icing | $160.32 | far above the same kind of item | $5.99 | median price of the same kind of item |
| Food | 25465689 ReadyWise 60 Serving Freeze Dried Meat Bucket + 20 Servings of Rice | $160.00 | far above the same kind of item | $42.59 | comparable item: ReadyWise Emergency Food Supply Freeze-Dried Bucke |
| Food | 480853480 Deli Component Kit Pasta Penne Con Pollo Salsa Rosada | $159.98 | far above the same kind of item | $5.47 | median price of the same kind of item |
| Food | 36874391 Stevita Stevia Spoonable Packets, 2000 Count | $159.97 | far above the same kind of item | $10.67 | median price of the same kind of item |
| Food | 285662042 8pchot Cheetos Set | $159.84 | far above the same kind of item | $6.37 | median price of the same kind of item |
| Food | 5383062842 Tums Gummy & Large S | $159.68 | far above the same kind of item | $10.79 | median price of the same kind of item |
| Food | 782887376 16pc16 Oatmeal Heat | $159.04 | far above the same kind of item | $8.22 | median price of the same kind of item |
| Food | 27433937 Stornetta Farms Milk, 0.5 gl | $159.00 | far above the same kind of item | $6.97 | median per-unit price of comparable items |
| Food | 298356973 Specialty Coffee Roblesabana Costa Rica Single Origin Las Lajas Red Ho | $158.99 | far above the same kind of item | $41.92 | comparable item: Specialty Coffee Roblesabana Costa Rica Single Ori |
| Food | 971605837 25 Servings Freeze-Dried Apple Slices Pouch - 6 pack w/bucket | $158.71 | far above the same kind of item | $8.92 | median price of the same kind of item |
| Food | 247497314 10 INCH WHITE CAKE LAYER | $158.37 | far above the same kind of item | $117.29 | comparable item: 12 INCH WHITE CAKE LAYER |
| Food | 139958354 Farm Rich Food Aln Uniced 5'' Layer White Cake | $157.00 | far above the same kind of item | $75.00 | comparable item: Farm Rich Food Cake Layer Almond 1/2 |
| Food | 150975065 Farm Rich Food Aln Uniced 5'' Layer Chocolate N & A Fl | $157.00 | far above the same kind of item | $9.29 | median price of the same kind of item |
| Food | 738688076 Mrs Wages 48% Tomato/Pickle Seasoning Mix - Allergen-Free | $154.56 | far above the same kind of item | $5.71 | comparable item: Mrs. Wages Kosher Dill Pickle Seasoning Mix, 6.5 O |
| Food | 22557342 Coombs Maple Syrup Grade B Organic, 12 O | $154.29 | far above the same kind of item | $32.90 | comparable item: Field Day Organic Grade A Maple Syrup, 32 Oz |
| Food | 544901911 288 Whole Powdered Eggs Pouch - 6 pack w/Bucket | $153.33 | far above the same kind of item | $29.47 | comparable item: 48 Whole Powdered Eggs Pouch |
| Food | 37181929 Generic Mushroom Wild Forest, 14.1 Oz (pack Of 2 | $152.91 | far above the same kind of item | $5.01 | median per-unit price of comparable items |
| Food | 553034483 360 PCS TOOTSIE FROOTIES FRUIT PUNCH, Case of 6 | $152.48 | far above the same kind of item | $13.19 | comparable item: Red Fruit Punch Frooties Tootsie Rolls |
| Food | 25577097 Sqwincher Sugar-Free Qwik Stik, Lemonade, 0.11 oz, Tube | $152.18 | far above the same kind of item | $6.76 | median price of the same kind of item |
| Food | 759981725 Augason Farms Vegetable Medley Blend 4 Gallon Pail, Bulk Food Storage, | $151.99 | far above the same kind of item | $4.98 | median price of the same kind of item |
| Food | 548189622 Just Popped – Delicious Gourmet Butter Popcorn – Movie Theater Butter  | $151.80 | far above the same kind of item | $7.23 | median price of the same kind of item |
| Food | 2481314411 Sparling Jell-O Tray | $151.20 | far above the same kind of item | $6.43 | median price of the same kind of item |
| Food | 198205574 9IN 12-SLICE CHOCOLATE OVERLOAD TORTE | $151.10 | far above the same kind of item | $9.29 | median price of the same kind of item |
| Food | 29472666 Spectrum Organic Soy Mayonnaise, 32 Oz, | $151.03 | far above the same kind of item | $48.77 | comparable item: Spectrum Canola Mayonnaise, 32 Oz (pack |
| Food | 364047625 Coca-Cola Cherry Soda Pop Bottle, 13.2 fl oz | $150.00 | far above the same kind of item | $1.38 | comparable item: Coca-Cola Cherry Soda Pop Cans, 12 fl oz, 24 Pack |
| Food | 425708776 Fanta Orange Soda Bottle, 13.2 fl oz | $150.00 | far above the same kind of item | $1.96 | comparable item: Fanta Orange Soda Can, 12 fl oz |
| Food | 504388171 Coca-Cola Zero Sugar Bottle, 13.2 fl oz | $150.00 | far above the same kind of item | $13.73 | median price of the same kind of item |
| Food | 662569141 Coca-Cola Bottle, 13.2 fl oz | $150.00 | far above the same kind of item | $13.73 | median price of the same kind of item |
| Food | 869008174 Adams Gum 100 x 2 units - Chiclets (Pack of 12) | $150.00 | far above the same kind of item | $78.00 | comparable item: Adams Gum 100 x 2 units - Chiclets (Pack of 6) |
| Food | 5096285105 Topo Chico Mineral Water Twist of Grapefruit Bottle, 15.5 fl oz | $150.00 | far above the same kind of item | $2.43 | comparable item: Topo Chico Sparkling Mineral Water Twist Of Grapef |
| Food | 5512375135 Topo Chico Mineral Water Twist of Lime Sparkling Water Bottle, 15.5 fl | $150.00 | far above the same kind of item | $2.25 | comparable item: Topo Chico Sparkling Mineral Water, Twist of Lime, |
| Food | 14594017387 Peace Tea Cherry Vibes Canned Iced Tea, 16 fl oz | $150.00 | far above the same item's other variants | $1.45 | median per-unit price of comparable items |
| Food | 14606414056 Peace Tea Str-Ah-Berry Lemon Canned Iced Tea, 16 fl oz | $150.00 | far above the same item's other variants | $1.45 | median per-unit price of comparable items |
| Food | 124611309 Carterita Secretaria Con Chocolate | $149.97 | far above the same kind of item | $9.29 | median price of the same kind of item |
| Food | 101934891 Seeds,grain&candy Trail Mix Natural | $149.50 | far above the same kind of item | $12.92 | comparable item: Project G Natural Raw Trail Mix |
| Food | 124371976 Seeds,grain&candy California Mix | $149.50 | far above the same kind of item | $25.75 | comparable item: Plentiful Planet California Trail Mix, 10 oz, (Pac |
| Food | 51940526 16 in. x 16 in. x 1.88 in. Paper Lock-Corner Pizza Boxes - White (100/ | $149.31 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Food | 22389403 Butternut Mountain Maple Syrup, Organic, | $149.23 | far above the same kind of item | $16.79 | comparable item: Haddar Organic Maple Syrup, 12 Oz |
| Food | 8200463648 Owen’s Craft Mixers Live Nation Exclusive Cherry Lemonade | $148.98 | far above the same kind of item | $49.98 | comparable item: Owen’s Craft Mixers Live Nation Exclusive Cherry L |
| Food | 8203706637 Owen’s Craft Mixers Live Nation Exclusive Strawberry Lemonade | $148.98 | far above the same kind of item | $10.58 | comparable item: Owen’s Craft Mixers Live Nation Exclusive Strawber |
| Food | 101687455 Fresh Cut Oregano | $148.97 | far above the same kind of item | $2.38 | comparable item: Fresh Cut Sage |
| Food | 383010609 6 INCH CHOCOLATE CAKE LAYER | $148.53 | far above the same kind of item | $110.27 | comparable item: 12 INCH CHOCOLATE CAKE LAYER |
| Food | 411201203 3 Pack - Kerastase Discipline Fondant Fluidealiste Smooth in Motion Ca | $147.98 | far above the same kind of item | $14.95 | median per-unit price of comparable items |
| Food | 29472791 Roland Greek Colossal Black Olives, 4.6 | $147.86 | far above the same kind of item | $47.14 | comparable item: Roland Mt. Pelion Black Olives, 10.5 Oz, |
| Food | 971593712 TOOTSIE ROLL HEXAGON 280 CT, Case of 4 | $146.04 | far above the same kind of item | $6.30 | median price of the same kind of item |
| Food | 109427557 Puratos Chocolate Carat 100 | $146.00 | far above the same kind of item | $90.00 | comparable item: Puratos Mirori Chocolate |
| Food | 16929314096 Richs Cake Layer Funfetti 5" | $146.00 | far above the same kind of item | $5.10 | comparable item: Richs Cake Layer Carrot 5" |
| Food | 21090280 Divina Roasted Yellow Peppers, 5.5 oz, (Pack of 6) | $145.89 | far above the same kind of item | $9.60 | comparable item: Mancini Yellow Roasted Peppers, 12 oz (Pack of 12) |
| Food | 35053949 Lindon Farms 168 Servings Freeze Dried Raspberries | $145.26 | far above the same kind of item | $7.70 | median price of the same kind of item |
| Food | 29472878 Roland Turkey Pitted Kalamata Olives, 4. | $145.20 | far above the same kind of item | $7.79 | median price of the same kind of item |
| Food | 658683007 Mrs. Fields Abundant Sterling Cookie & Brownie Holiday Gift Tower, Cou | $144.99 | far above the same kind of item | $8.87 | median price of the same kind of item |
| Food | 14278711454 Clean Co Non-Alcoholic Vodka Alternative 700ml Bottle | with Premium Q | $144.98 | far above the same kind of item | $5.61 | median price of the same kind of item |
| Food | 28831180 Jelly Belly, Jelly Beans, Assorted Flavors | $144.82 | far above the same kind of item | $7.62 | median price of the same kind of item |
| Food | 418159090 Matcha Love Culinary Matcha Finely Milled Green Tea Leaves, 3.5 oz, 6  | $144.60 | far above the same kind of item | $49.04 | comparable item: Carrington Farms Culinary Matcha Powder Finely Gro |
| Food | 37181898 Generic Roland Mussels In Water, 15 Oz, (pack Of | $143.66 | far above the same kind of item | $140.36 | comparable item: Generic Roland Marinated Mussels, 4.375 Oz, (pac |
| Food | 203164264 Dely-Gely Fruit Jelly - Gelatina De Frutas 25 Units (Pack of 12) | $143.22 | far above the same kind of item | $21.99 | comparable item: Dely-Gely Fruit Jelly - Gelatina De Frutas 25 Unit |
| Food | 36483242 Maeda-en Matcha Green Tea Powder, 1 Oz, | $143.11 | far above the same kind of item | $1.25 | comparable item: Nature's Truth Matcha Green Tea Powder, 4.0 Oz |
| Food | 162300618 Gefen Pink Salmon | $143.01 | far above the same kind of item | $8.06 | comparable item: Goya Pink Salmon 14.75 Oz |
| Food | 145992658 Deli Component Bacon Chips Preckd Diced Farmland | $143.00 | far above the same kind of item | $7.20 | median price of the same kind of item |
| Food | 29472887 Roland White Sunflower Truffle Oil, 8.5 | $142.71 | far above the same kind of item | $16.45 | comparable item: Roland White Truffle with Sunflower Oil, 8.4 Oz |
| Food | 607374962 25 Servings Freeze-Dried Apple Slices Pouch - 6 pack | $142.05 | far above the same kind of item | $8.92 | median price of the same kind of item |
| Food | 820403768 34 Servings Freeze-Dried Banana Chips Pouch - 6 pack | $142.05 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Food | 29472820 Roland Marinated Artichoke Hearts In Oil | $141.77 | far above the same kind of item | $43.97 | comparable item: Artichoke Hearts, Marinated, 12 Oz. (pac |
| Food | 17198305 Old Wisconsin Hardwood Smoked Turkey Sausage Snack Sticks, .5 oz, 10ct | $141.59 | far above the same kind of item | $5.41 | comparable item: Old Wisconsin Turkey Sausage Snack Sticks, 0.5 Oz. |
| Food | 128249498 Laffy Taffy Banana, Cherry, and Sour Apple Flavors Fun Size Pouches 34 | $141.54 | far above the same kind of item | $13.04 | median price of the same kind of item |
| Food | 801249942 Chocolate Rooster Tail | $140.44 | far above the same kind of item | $61.96 | comparable item: Chocolate Rooster - Large |
| Food | 29472796 Roland Jumbo Garlic Kalamata Olives, 42 | $140.13 | far above the same kind of item | $48.14 | comparable item: Roland Barche Kalamata Olives, 10.2 Oz, |
| Food | 27677308 Folgers 2550006546 Coffee Filter Packs- Regular- In-Room Lodging- .6 o | $140.08 | far above the same kind of item | $9.87 | median price of the same kind of item |
| Food | 268284458 Legacy Premium Food Storage - 24 Servings Dehydrated Elbow Macaroni -  | $140.00 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Food | 977622618 40 Serving Chocolate Milk Pouch - 6 pack w/bucket | $140.00 | far above the same kind of item | $5.96 | median price of the same kind of item |
| Food | 1889530061 PW Brown Gravy 144ct | $139.68 | far above the same kind of item | $4.09 | median price of the same kind of item |
| Food | 900961518 LFF Cajun Fish Fry S | $138.96 | far above the same kind of item | $19.49 | comparable item: Fish Fry, 10 oz. (Pack of 12) |
| Food | 188835558 Malher Fruty Dulce Candy Snack 0.70 oz - Dulce de Frutas (Pack of 6) | $138.85 | far above the same kind of item | $25.14 | comparable item: Malher Fruty Dulce Candy Snack 0.70 oz - Dulce de  |
| Food | 21091398 SweetLeaf Lemon Drop Liquid Stevia, 2 fl oz, (Pack of 12) | $138.41 | far above the same kind of item | $9.06 | median per-unit price of comparable items |
| Food | 43942024 Star Wars Assorted Fruit Flavor Candy Pieces, 0.8 oz | $138.24 | far above the same kind of item | $1.00 | comparable item: Galerie Candy Bags - Star Wars |
| Food | 1390510331 Splenda® No Calorie Sweetener Packets, 0.035 Oz Packets, 400/box, 6 Bo | $138.00 | far above the same kind of item | $10.16 | median price of the same kind of item |
| Food | 3449282482 Australian Manuka Honey 1000+ | $137.99 | far above the same kind of item | $64.94 | comparable item: Manuka Honey 60+ 2.2lb |
| Food | 575456301 22 Servings Freeze-Dried Strawberries Pouch - 6 pack w/bucket | $137.88 | far above the same kind of item | $7.68 | median price of the same kind of item |
| Food | 343829065 82ct Doritos PPW | $137.76 | far above the same kind of item | $49.84 | median per-unit price of comparable items |
| Food | 5431559347 Starburst Gummies Sh | $137.52 | far above the same kind of item | $8.43 | median per-unit price of comparable items |
| Food | 746354755 Clorets Gum 60 x 2 units - Chicles (Pack of 18) | $137.41 | far above the same kind of item | $9.04 | median price of the same kind of item |
| Food | 21090177 Cannone Borettane Onions In Balsamic Vin | $136.97 | far above the same kind of item | $6.68 | median price of the same kind of item |
| Food | 579101270 Momofuku Ssäm Sauce Spicy Korean Chili Sauce, 12 oz Bottle (Pack of 2) | $136.85 | far above the same kind of item | $15.88 | comparable item: Momofuku Ssam Sauce Spicy Korean Chili Sauce, 12 o |
| Food | 622035153 Momofuku Ssäm Sauce Original Korean Chili Sauce, 12 oz Bottle (Pack of | $136.85 | far above the same kind of item | $21.89 | comparable item: Momofuku Ssam Sauce Original Korean Chili Sauce, 2 |
| Food | 184557450 Celestial Seasonings 40pccs Sleepy Hrb Te | $136.80 | far above the same kind of item | $7.22 | median price of the same kind of item |
| Food | 279359733 48 Whole Powdered Eggs Pouch - 6 pack | $136.67 | far above the same kind of item | $29.47 | comparable item: 48 Whole Powdered Eggs Pouch |
| Food | 355948612 McCormick Tasty Tangy Seasoning, 2 oz | $136.17 | far above the same kind of item | $3.87 | comparable item: McCormick Tasty Cheesy Seasoning, 1.8 oz |
| Food | 3920995668 Yoplait Foods Yoplait Stwbrr Parfait W/ Granola | $136.00 | far above the same kind of item | $2.89 | comparable item: Yoplait Foods Yoplait Parfait With Granola 23.44lb |
| Food | 17194707 Slim Jim Slim Jim, Original Mild, Canister, 4.5 oz. (Pack of 12) | $135.80 | far above the same kind of item | $72.80 | comparable item: Slim Jim Mild, 1.12 Oz. 12-Count |
| Food | 12939457334 Clean Co Non-Alcoholic Tequila Alternative 700ml Bottle - | with Premi | $134.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Tequila Alternative 700ml B |
| Food | 14271052506 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $134.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 876638768 Dubble Bubble 24" Gumball Machine w/ 200PCS Gumballs | $134.62 | far above the same kind of item | $24.88 | comparable item: 216 PCS DUBBLE BUBBLE GUM, Case of 6 |
| Food | 37182284 Generic Desserts On Us Laceys Macadamia & Milk C | $134.40 | far above the same kind of item | $7.83 | median price of the same kind of item |
| Food | 5441519949 Kraft 13z Caramels 4 | $134.10 | far above the same kind of item | $3.00 | comparable item: Great Value Caramels, 4.25 oz Bag |
| Food | 170954749 Deli Component Alfredo Sauce | $132.48 | far above the same kind of item | $7.52 | comparable item: Rao's Homemade Alfredo Sauce, 15 oz |
| Food | 374065775 Malher Seasoning-Saborin 0.17 oz - Sazonador (Pack of 80) | $132.22 | far above the same kind of item | $13.19 | comparable item: Malher Seasoning-Saborin 8.81 oz - Sazonador Sabor |
| Food | 607815930 JELLY BELLY GUMMI PET DINOSAUR 1.75oz, Case of 2 | $132.00 | far above the same kind of item | $1.86 | comparable item: Jelly Belly Pet Gator Gummi, 3 Oz, (pack |
| Food | 5224410927 SKITTLES GUMMIES MXD | $131.84 | far above the same kind of item | $7.08 | median price of the same kind of item |
| Food | 118962402 1/2 Pumpkin Cake Cream Cheese Filling | $131.76 | far above the same kind of item | $17.50 | comparable item: 1/2 Pumpkin Cake Cream Cheese Filling |
| Food | 823145892 Hemp Big Bears Gummies 50mg | $131.58 | far above the same kind of item | $65.79 | comparable item: Hemp Big Bears Gummies 50mg |
| Food | 2924427175 Fraser Hill Farm Happy Birthday Inflatables Bundle 3 6-ft. Cake with 4 | $131.36 | far above the same kind of item | $2.03 | median per-unit price of comparable items |
| Food | 172037183 30 Serving Parboiled Rice Pouch - 6 pack w/bucket | $131.34 | far above the same kind of item | $9.43 | median price of the same kind of item |
| Food | 941679301 Tortrix Creole Sauce Chips 6.3oz - Salsa Criolla (Pack of 2) | $131.22 | far above the same kind of item | $7.65 | comparable item: Tortrix Tacos Creole Sauce 6.34 oz - Salsa Criolla |
| Food | 54309156 Just Hemp Foods Seeds Hemp Toasted, 16 O | $131.20 | far above the same kind of item | $7.99 | comparable item: NOW Foods Toasted Hemp Seeds 12 Oz |
| Food | 616520662 Alfajor Cocunut Candy - Dulce De Coco 3.5 Oz 12 Units (Pack of 6) | $131.18 | far above the same kind of item | $47.70 | comparable item: Banderita Coconut Candy - Dulce De Coco 3.5 Oz 12  |
| Food | 19407314641 32 pc SKITTLES SUP TRY WM 32CT IDM | $131.00 | far above the same kind of item | $3.86 | median per-unit price of comparable items |
| Food | 21090274 Divina Artichoke Quarters With Piquillo | $130.89 | far above the same kind of item | $7.17 | median price of the same kind of item |
| Food | 14642221829 Minute Maid Aguas Frescas Lime Juice Drink Can, 16 fl oz | $130.12 | far above the same kind of item | $3.16 | comparable item: Minute Maid Fruit Punch Juice Drink Bottles, 16.9  |
| Food | 337486175 49 Servings Steel Cut Oats - 6 pack w/bucket | $130.00 | far above the same kind of item | $9.41 | median price of the same kind of item |
| Food | 15092974014 Slim Jim Monster Siz | $130.00 | far above the same kind of item | $31.78 | comparable item: Slim Jim® Monster Size™ Savag |
| Food | 8536723969 Fever Tree Sparkling Pink Grapefruit Soda - Mixer and Soda - Refreshin | $129.99 | far above the same kind of item | $41.92 | comparable item: Fever Tree Elderflower Tonic Water - Mixer & Soda  |
| Food | 721476852 Mountain High Organics Jasmine White Rice, 6 - 5 lb. Bags (6 Count) | $129.98 | far above the same kind of item | $5.44 | comparable item: Lundberg Family Farms White Basmati Rice - 6 ct |
| Food | 33652806 Louisiana Fish Fry Products Cajun Gift Box, 10 pc (Pack of 6) | $129.94 | far above the same kind of item | $8.01 | median price of the same kind of item |
| Food | 193627224 Acetaia Leonardi Condimento Balsamic Vinegar - 20 Year | $129.84 | far above the same kind of item | $112.96 | comparable item: Vinegar 12 Year Balsamic, 8.5 oz. (Pack of 6) |
| Food | 640606601 6 INCH WHITE CAKE LAYER | $129.65 | far above the same kind of item | $117.29 | comparable item: 12 INCH WHITE CAKE LAYER |
| Food | 110860640 Coffee Filter Packs Regular, 1.05 oz Filter Pack, 40/Carton | $129.47 | far above the same kind of item | $53.96 | comparable item: Folgers Coffee Filter Packs, Regular, 0.9 oz, 40 c |
| Food | 195765825 Puratos Chocolate Silky Smooth | $128.98 | far above the same kind of item | $9.22 | comparable item: Dove Silky Smooth Chocolate, 10.5 Oz. |
| Food | 187821270 Deli Component Exotic Grape Juice | $128.68 | far above the same kind of item | $59.78 | comparable item: Manischewitz Grape Juice, 64 oz, (Pack of 8) |
| Food | 711535831 CHOCOLATE BTRCRME | $128.13 | far above the same kind of item | $3.06 | comparable item: Theo Chocolate, 3 Oz |
| Food | 919159575 8 INCH WHITE CAKE LAYER | $128.03 | far above the same kind of item | $117.29 | comparable item: 12 INCH WHITE CAKE LAYER |
| Food | 383189928 Jelly Bean 12pc Side | $127.68 | far above the same kind of item | $20.19 | comparable item: Jelly Belly Jelly Bean Gift Box, 40 Coun |
| Food | 253819435 Deli Component Kit Lo Mein Vegetales Y Pollo Teriyaki | $127.57 | far above the same kind of item | $8.90 | median price of the same kind of item |
| Food | 153158746 White Cake Iced And Decorated | $127.43 | far above the same kind of item | $50.30 | comparable item: Marble Cake Iced And Decorated |
| Food | 1365060854 Nescafe 12524962 8 oz Pouch Clasico Dark Roast Instant Coffee | $126.08 | far above the same kind of item | $8.80 | comparable item: NESCAFE CLASICO Dark Roast Instant Coffee, 3.5 oz. |
| Food | 8553818140 Marketside Fresh Deli Sub Sandwich Tray, 6' | $126.00 | far above the same kind of item | $4.47 | comparable item: Marketside Turkey Ciabatta Half Sub Sandwich, 6.5  |
| Food | 38056035 Enfamil Human Milk Fortifier - 0.71g Foi | $125.88 | far above the same kind of item | $8.56 | median price of the same kind of item |
| Food | 455074151 Deli Component Sauce Bbq Original Western | $125.68 | far above the same kind of item | $1.24 | comparable item: Great Value Original BBQ Sauce, 18 oz Bottle, 1 Co |
| Food | 645191465 Chocolate Deluxe Buttercreme Icing | $125.41 | far above the same kind of item | $5.99 | median price of the same kind of item |
| Food | 128722932 Pannus Cookie Sugar Trebol | $125.00 | far above the same kind of item | $7.59 | comparable item: SMASHMALLOW Sugar Cookie |
| Food | 5600879083 Coca-Cola Zero Sugar OREO Limited Edition Soda Pop Can, 12 fl oz | $125.00 | far above the same kind of item | $1.55 | comparable item: Coca-Cola Zero Sugar OREO Limited Edition Soda Pop |
| Food | 14609466677 Gold Peak Zero Sugar Raspberry Iced Tea Bottle, 18.5 fl oz | $125.00 | far above the same kind of item | $2.28 | comparable item: Gold Peak Zero Sugar Sweet Tea Bottle, 18.5 fl oz |
| Food | 128775150 Deli Component Marinara Sauce | $124.72 | far above the same kind of item | $47.40 | comparable item: Victoria Marinara Sauce, 25 oz, (Pack of 6) |
| Food | 966802448 Pescanova Breaded Shrimp Bf 16/20 4/3lb | $124.67 | far above the same kind of item | $17.03 | median per-unit price of comparable items |
| Food | 29472782 Roland Greece Sliced Kalamata Olives, 6. | $124.16 | far above the same kind of item | $48.14 | comparable item: Roland Barche Kalamata Olives, 10.2 Oz, |
| Food | 55702760 Augason Farms Vegetable Variety Kit #10 Can 3-Pack | $123.43 | far above the same kind of item | $4.98 | median price of the same kind of item |
| Food | 54427504 Urbani Truffles Drsng Black Truffle Oil, | $123.39 | far above the same kind of item | $9.97 | median price of the same kind of item |
| Food | 867462679 Malher Full Sazon - Sazon Completa 12 Units (Pack of 40) | $122.68 | far above the same kind of item | $80.53 | comparable item: Malher Full Sazon - Sazon Completa 12 Units (Pack  |
| Food | 37181923 Generic Roland All Natural Sliced Mushrooms, 16 | $122.67 | far above the same kind of item | $5.56 | median price of the same kind of item |
| Food | 430966555 Sqwincher 23.83 Ounce Instant Powder Pack Assorted Flavors Electrolyte | $122.58 | far above the same kind of item | $8.97 | median price of the same kind of item |
| Food | 17196630 Weetabix Wholegrain Cereal Biscuits, 37g each, 24 count, (Pack of 12) | $122.28 | far above the same kind of item | $9.64 | comparable item: Weetabix Biscuits Whole Grain Cereal, Wheat Cereal |
| Food | 40771555 BUBBLE GUM DUBBLE BUBBLE PRO- BALL 72PC FLR DISP 4ASST GUM-, Case Pack | $122.22 | far above the same kind of item | $7.87 | comparable item: GUM NUGGET FILLED TRUCK BUBBLE DOZER 3ASST IN 12PC |
| Food | 25576973 Sqwincher Powder Pack Concentrated Activity Drink, Assorted, 32/Carton | $121.68 | far above the same kind of item | $18.52 | median per-unit price of comparable items |
| Food | 40900454 Phipps Bisque 5'2" X 7'6" | $120.97 | far above the same kind of item | $6.71 | median price of the same kind of item |
| Food | 30901452 Sweet Home Farm Non-GMO Granola, Maple Pecan, 20.5 Oz | $120.50 | far above the same kind of item | $6.12 | comparable item: Sweet Home Farm Maple Pecan Granola with Real Mapl |
| Food | 37181969 Generic Roland Green Sushi Wraps, 20 Count, 1.76 | $120.34 | far above the same kind of item | $8.21 | median price of the same kind of item |
| Food | 970632442 Kabosu Marugoto Shibori (Kabosu Juice) - 1 bottle, 25.4 fl oz | $120.30 | far above the same kind of item | $62.09 | comparable item: Sudachi Marguoto Shibori (Sudachi Juice) - 1 bottl |
| Food | 29785513 Hain Celestial Group Imagine Organic Broth, 32 oz | $120.00 | far above the same kind of item | $6.42 | comparable item: Hain Celestial Group Imagine Organic Soup, 17.3 oz |
| Food | 475827048 24 Servings Dehydrated Elbow Macaroni - 6 pack | $120.00 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Food | 668459284 22 Servings Freeze-Dried Strawberries Pouch - 6 pack | $120.00 | far above the same kind of item | $7.68 | median price of the same kind of item |
| Food | 988964421 40 Serving Chocolate Milk Pouch - 6 pack | $120.00 | far above the same kind of item | $5.96 | median price of the same kind of item |
| Food | 8476155405 Stirrings Simple Blood Orange Cocktail Mix 750ml Bottles - Real Juice  | $119.98 | far above the same kind of item | $17.99 | comparable item: Stirrings Simple Blood Orange Cocktail Mix 750ml B |
| Food | 12945965534 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $119.98 | far above the same kind of item | $26.89 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 460772725 Seasonal 12pcval Box W Candy | $119.76 | far above the same kind of item | $18.01 | comparable item: **seasonal Graduation Candy Can |
| Food | 35177015 Olive Queen Pttd 110-120ct, 1 Ga (pack O | $119.37 | far above the same kind of item | $7.79 | median price of the same kind of item |
| Food | 783879459 Basic Organic Vegan & Nut Milk Kit - Includes 2 Nut Milk Bags, Hemp He | $119.20 | far above the same kind of item | $7.83 | median price of the same kind of item |
| Food | 6865706569 NERDS CLUSTERS GUMMY | $119.00 | far above the same kind of item | $1.29 | comparable item: Nerds Gummy Clusters Candy, 3 oz, 12 Ct |
| Food | 21090344 Duff Goldman White Buttercream Icing, 3. | $118.89 | far above the same kind of item | $56.73 | comparable item: Duff Goldman White Buttercream Fondant, 32 oz, (Pa |
| Food | 851193163 Deli Component Ranch Dressing Spread | $118.86 | far above the same kind of item | $9.74 | comparable item: Hidden Valley Original Ranch Dressing, 24 fl oz, P |
| Food | 22557512 Erba Dolce Stevia Sweetener, 3.5 Oz, 100 | $118.80 | far above the same kind of item | $1.93 | comparable item: Complements Stevia Sweetener, 9.8 Oz, 12 Ct |
| Food | 128785147 BeeFree Clay's Chocolate Buzz Warrior Mix, 9 oz, 12 pack | $118.63 | far above the same kind of item | $89.99 | comparable item: BeeFree Paleo Auggy's Original Mix Warrior Mix, 9  |
| Food | 148506554 Deli Component Mayo Premium Kraft | $118.52 | far above the same kind of item | $7.70 | median price of the same kind of item |
| Food | 29473755 Knudsen Just Cranberry Organic Juice, 32 | $118.30 | far above the same kind of item | $6.68 | comparable item: R.W. Knudsen Organic Juice Just Cranberry, 32 Fl O |
| Food | 22557278 Ucreate Celtic Sea Salt Fine Ground Pouch, 1 Lbs | $118.29 | far above the same kind of item | $10.57 | comparable item: Selina Naturally Fine Ground Celtic Sea Salt, 1/2  |
| Food | 150032724 Hellmanns Ranch Dressing Hellmans | $118.02 | far above the same kind of item | $3.41 | comparable item: Hellmans Hellmann's Whipped Dressing |
| Food | 459277701 Raw Generation 3-Day Juice Cleanse - 18 Cold-Pressed Juices | Flash-Fr | $117.41 | far above the same kind of item | $6.99 | median price of the same kind of item |
| Food | 340929344 Pacific Organic Chicken Bone Broth, 32 fl oz, 12 pack | $117.26 | far above the same kind of item | $80.60 | comparable item: Pacific Foods Organic Bone Broth, Original Chicken |
| Food | 21091397 SweetLeaf Chocolate Raspberry Liquid Stevia, 2 fl oz, (Pack of 12) | $116.74 | far above the same kind of item | $101.86 | median per-unit price of comparable items |
| Food | 260161532 Wafer With Milk Candy - Cono Con Cajeta (12 units) (Pack of 12) | $116.74 | far above the same kind of item | $26.45 | comparable item: Wafer With Milk Candy - Cono Con Cajeta (12 units) |
| Food | 620141505 30 Serving Parboiled Rice Pouch - 6 pack | $116.42 | far above the same kind of item | $9.43 | median price of the same kind of item |
| Food | 587830253 Urbani Truffles Drsng White Truffle Oil,55Ml (Pack Of 12) | $115.75 | far above the same kind of item | $8.79 | median per-unit price of comparable items |
| Food | 175566816 Bakery Component Double Chocolate Blondie | $115.50 | far above the same kind of item | $6.30 | comparable item: Buff Bake Cookies Double Chocolate, 1.79 Oz. |
| Food | 17194830 Elite Milk Chocolate Bars, 23ct, (Pack of 15) | $115.43 | far above the same kind of item | $5.97 | median price of the same kind of item |
| Food | 997192315 Raw Generation High-Protein 3-Day Cleanse | 18 Cold-Pressed Juices & S | $114.84 | far above the same kind of item | $6.99 | median price of the same kind of item |
| Food | 402127533 Urbani Truffles Sauce Mushrm Blk Truffle,180 Gm (Pack Of 6) | $114.51 | far above the same kind of item | $52.05 | comparable item: Urbani Truffles Sauce Cream & Truffle, 180 GM (Pac |
| Food | 35501262 Salsa & Sce Gftbx Banditos, 4 Pk (pack O | $114.26 | far above the same kind of item | $5.97 | median price of the same kind of item |
| Food | 579485636 Warrior Candy Premium Beef Jerky Traditional | $114.07 | far above the same kind of item | $101.64 | comparable item: Warrior Candy Premium Beef Jerky Carne Asada |
| Food | 720899806 Warrior Candy Premium Beef Jerky Orange Teriyaki | $114.07 | far above the same kind of item | $4.17 | comparable item: Slim Jim® Teriyaki Premium Beef Jerky 2.9 oz. Bag |
| Food | 826994040 Warrior Candy Premium Beef Jerky Sriracha | $114.07 | far above the same kind of item | $101.64 | comparable item: Warrior Candy Premium Beef Jerky Carne Asada |
| Food | 830720470 Warrior Candy Premium Beef Jerky Sweet & Spicy | $114.07 | far above the same kind of item | $3.87 | comparable item: Field Trip Beef Jerky, Sweet & Spicy, 2.2 Oz |
| Food | 896119008 Warrior Candy Premium Beef Jerky Whiskey | $114.07 | far above the same kind of item | $101.64 | comparable item: Warrior Candy Premium Beef Jerky Carne Asada |
| Food | 23527590 Woosley Bisque Runner 2'3" X 8' | $113.97 | far above the same kind of item | $6.71 | median price of the same kind of item |
| Food | 20114267136 Propel Protein 45ct Variety Pack | $113.91 | far above the same kind of item | $51.24 | median per-unit price of comparable items |
| Food | 1906372019 Bigelow® Green Tea Assortment, Tea Bags, 64/box, 6 Boxes/carton | $113.68 | far above the same kind of item | $24.96 | comparable item: (4 Boxes) Bigelow Green Tea Decafeinated, Tea Bags |
| Food | 37181904 Generic Roland Diced Oven Roasted Tomatoes, 32 O | $113.67 | far above the same kind of item | $16.60 | comparable item: Roland Oven Roasted Tomatoes, 32 Oz |
| Food | 390916115 L'Oreal Frost & Design Highlights H65 Caramel 1 Each (Pack of 6) | $113.59 | far above the same kind of item | $7.28 | median price of the same kind of item |
| Food | 821473769 Malher Full Sazon - Sazon Completa 12 Units (Pack of 36) | $113.29 | far above the same kind of item | $80.53 | comparable item: Malher Full Sazon - Sazon Completa 12 Units (Pack  |
| Food | 532087968 160 Serving Chocolate Milk Bucket | $113.04 | far above the same kind of item | $5.96 | median price of the same kind of item |
| Food | 1595773547 Emirelli Organic Sun-Dried Calimyrna Figs | $113.01 | far above the same kind of item | $7.20 | comparable item: bettergoods Organic Sun-Dried Whole Figs, 8 oz |
| Food | 698371322 Urbani Truffles Drsng Black Truffle Oil,55Ml (Pack Of 12) | $113.00 | far above the same kind of item | $8.79 | median per-unit price of comparable items |
| Food | 585146277 Diet Pepsi Cola Soda Pop, 16.9 fl oz Bottle | $112.36 | far above the same kind of item | $1.08 | comparable item: Diet Pepsi Cola Soda Pop, 16.9 fl oz, 6 Pack Bottl |
| Food | 636739728 Lido Cremosa Cookies11oz - Galletas (Pack of 18) | $112.31 | far above the same kind of item | $11.45 | comparable item: Lido Cremosa Cookies 11 oz - Galletas |
| Food | 125088826 3OZ JELLY BEAN GRASS | $112.00 | far above the same kind of item | $1.82 | comparable item: Galerie Jelly Bean Blaster, 3.3 Oz. |
| Food | 145482936 12" Sugar Message Cookie | $111.72 | far above the same kind of item | $8.88 | comparable item: 12" Sugar Message Cookie |
| Food | 175120224 Deli Component Exotic Piña Juice | $111.72 | far above the same kind of item | $6.99 | median price of the same kind of item |
| Food | 55203424 ***ParentHRT GUMMY ASSORTMENT | $110.91 | far above the same kind of item | $5.31 | median price of the same kind of item |
| Food | 778713346 10 Servings Dehydrated Egg Noodles - 6 pack w/bucket | $110.00 | far above the same kind of item | $6.88 | median price of the same kind of item |
| Food | 903149707 49 Servings Steel Cut Oats - 6 pack | $110.00 | far above the same kind of item | $9.41 | median price of the same kind of item |
| Food | 22001490 Augason Farms Fruit 6 Pack | $109.99 | far above the same kind of item | $8.50 | comparable item: Augason Farms Beef Flavored Vegetarian M |
| Food | 592602979 Spice Select, Minced Garlic, 32 FL OZ | $109.99 | far above the same kind of item | $31.88 | comparable item: Spice Select Minced Garlic ‑ 8 fl oz |
| Food | 998552209 Peanut Candy - Palanqueta De Cacahuate 1.6 Oz (Pack of 12) | $109.99 | far above the same kind of item | $10.65 | median per-unit price of comparable items |
| Food | 8466250551 Stirrings Simple Margarita Cocktail Mix 750ml Bottles - Real Juice No  | $109.98 | far above the same kind of item | $18.08 | comparable item: Stirrings Simple Margarita Cocktail Mix 750ml Bott |
| Food | 8467403375 Stirrings Simple Cosmopolitan Cocktail Mix 750ml Bottles - Real Juice  | $109.98 | far above the same kind of item | $22.49 | comparable item: Stirrings Simple Cosmopolitan Cocktail Mix 750ml B |
| Food | 8468551399 Stirrings Simple Sour Cocktail Mix 750ml Bottles - Real Juice No Prese | $109.98 | far above the same kind of item | $11.16 | median per-unit price of comparable items |
| Food | 904632787 Juven Therapeutic Nutrition Drink Mix Single - Orange | $109.59 | far above the same kind of item | $2.63 | comparable item: Juven Therapeutic Nutrition Drink Powder, Orange,  |
| Food | 849990918 Malher Seasoning-Saborin 0.17 oz - Sazonador (Pack of 64) | $108.99 | far above the same kind of item | $10.55 | comparable item: Malher Seasoning-Saborin 8.81 oz - Sazonador Sabor |
| Food | 589282528 (Pack of 60) Seasoning, Malher Onion Salt 6 g - Sal De Cebolla | $108.89 | far above the same kind of item | $17.10 | comparable item: Malher Onion Salt 100g - Sal de Cebolla (Pack of 3 |
| Food | 629632820 Warrior Candy Premium Bacon Jerky Western BBQ | $108.71 | far above the same kind of item | $101.64 | comparable item: Warrior Candy Premium Beef Jerky Carne Asada |
| Food | 299710817 CANDY ICEE SPRAY OR SQUEEZE IN 2 ASST 2 FLAVORS 72 PC FLR DSPLY, Case  | $108.69 | far above the same kind of item | $45.37 | median per-unit price of comparable items |
| Food | 760296598 Chicks Gum - Chicles Chicks 60 x 4 Pastillas (Pack of 32) | $108.63 | far above the same kind of item | $84.56 | comparable item: Chicks Gum - Chicles Chicks 60 x 4 Pastillas (Pack |
| Food | 8171222202 Owen’s Craft Mixers Live Nation Exclusive Cherry Lemonade | $108.56 | far above the same kind of item | $49.98 | comparable item: Owen’s Craft Mixers Live Nation Exclusive Cherry L |
| Food | 153463263 Cavalier Milk Choco | $108.44 | far above the same kind of item | $39.36 | comparable item: Barebells Choco Milk 325ml 12-pack |
| Food | 34480343 Buff Bake, Cookies Peanut Butter Cup, 1.79 Oz, Pack Of 8 | $108.00 | far above the same kind of item | $8.48 | comparable item: Keebler Chips Deluxe Peanut Butter Cup Cookies 11. |
| Food | 55292813 Augason Farms Corn Chowder Soup Mix 6 Ga | $107.92 | far above the same kind of item | $9.30 | comparable item: Augason Farms Cheesy Broccoli Soup Mix 1 |
| Food | 34480348 Buff Bake, Cookies Double Chocolate, 1.79 Oz, Pack Of 8 | $107.90 | far above the same kind of item | $50.40 | comparable item: Buff Bake Cookies Double Chocolate, 1.79 Oz. |
| Food | 43942018 Disney Frozen Assorted Fruit Flavor Candy Pieces, 0.8 oz | $107.85 | far above the same kind of item | $3.86 | comparable item: Galerie Disney Finding Dory Candy |
| Food | 660638263 Wholesome Sweeteners Molasses Blackstrap Org F,16Oz (Pack Of 12) | $107.76 | far above the same kind of item | $72.48 | comparable item: Sweeteners Molasses, Blackstrap Organic, |
| Food | 51258890 Freshness Guaranteed Walmart Chocolate Cupcakes | $107.50 | far above the same kind of item | $6.88 | comparable item: Freshness Guaranteed Cupcakes Chocolate 24ct |
| Food | 5157407434 36ct Lil Puffs Strw | $107.28 | far above the same kind of item | $21.88 | median per-unit price of comparable items |
| Food | 55292815 Augason Farms Cheesy Broccoli Rice 6 Gal | $107.22 | far above the same kind of item | $9.30 | comparable item: Augason Farms Cheesy Broccoli Soup Mix 1 |
| Food | 620745628 Hunts Sauce Alfredo Rtufrozen | $107.22 | far above the same kind of item | $2.53 | comparable item: Hunts Family Favorites Pizza Sauce |
| Food | 43776208 Office Snax Minneola Farms Maple Oatmeal Bowl | $107.13 | far above the same kind of item | $8.22 | median price of the same kind of item |
| Food | 427716433 Kettlez Fuego Potato Chips, Chili And Lime Artificially Flavored Chips | $107.06 | far above the same kind of item | $5.59 | comparable item: Ruffles Potato Chips Lime & Jalapeno Flavored 8 Ou |
| Food | 29472792 Roland Hearts Of Palm, 28 Oz, (pack Of 1 | $106.97 | far above the same kind of item | $5.18 | comparable item: Roland Organic Hearts Of Palm, 28 Oz, (p |
| Food | 931814414 Jell-O Instant Sugar-Free Fat-Free Chocolate Pudding & Pie Filling, 2  | $106.70 | far above the same kind of item | $7.83 | comparable item: Jell-O Instant Sugar-Free Fat-Free Chocolate Puddi |
| Food | 312977959 (Pack of 36) Seasoning, Malher Garlic Salt 0.21 oz - Sazonador Sal De  | $106.64 | far above the same kind of item | $22.91 | comparable item: (Pack of 1) Malher Garlic Salt 100 g - Sal de Ajo |
| Food | 361522604 Clorets Gum 60 x 2 units - Chicles (Pack of 32) | $105.70 | far above the same kind of item | $9.04 | median price of the same kind of item |
| Food | 367449473 Mountain High Organics Certified Organic Green Lentils, 6 - 5 lb. Bags | $105.66 | far above the same kind of item | $7.33 | median price of the same kind of item |
| Food | 508933037 Gold Medal Wondra Quick Mixing All-Purpose Flour, 32 Oz | $105.59 | far above the same kind of item | $10.03 | comparable item: Gold Medal Wondra Quick Mixing All Purpose Flour,  |
| Food | 101955623 Wholesome Sweetener | $105.15 | far above the same kind of item | $38.53 | comparable item: Wholesome Sweetener |
| Food | 27617653 Cool Fruits Fruit Juice Freezers, 14 Fl | $105.00 | far above the same kind of item | $32.41 | comparable item: SodaStream Goodness Fruit Juice Drink Mix Variety  |
| Food | 33655465 D.L. Jardine's Three Compadres Sampler Dip Set, (Pack of 6) | $105.00 | far above the same kind of item | $5.11 | median price of the same kind of item |
| Food | 268838830 Michael Foods Bett/egg Non-cho99% 15/2# | $105.00 | far above the same kind of item | $9.60 | median per-unit price of comparable items |
| Food | 55292818 Augason Farms Creamy Potato Soup Mix 6 G | $104.98 | far above the same kind of item | $8.95 | median price of the same kind of item |
| Food | 36760946 Cherries Maraschino Wo St, 1 Ga (pack Of | $104.74 | far above the same kind of item | $9.33 | median price of the same kind of item |
| Food | 35500714 Peanut Butter Creamy Org, 16 Oz (pack Of | $104.57 | far above the same kind of item | $2.52 | comparable item: Jif Creamy Peanut Butter, 16 oz (Pack of 4) |
| Food | 36483339 Shasha Co. Original Ginger Snap Cookies, | $104.45 | far above the same kind of item | $31.22 | comparable item: Lucy's Ginger Snap Cookies, 5.5 oz, (Pack of 8) |
| Food | 36483343 Shasha Co. Spelt Ginger Snap Cookies, 12 | $104.45 | far above the same kind of item | $31.22 | comparable item: Lucy's Ginger Snap Cookies, 5.5 oz, (Pack of 8) |
| Food | 161991328 Kashi Cereal Berry | $103.94 | far above the same kind of item | $70.11 | comparable item: Kashi Cereal Promis |
| Food | 47335513 Roland Barchetta Cut Kalamata Olive Halv | $103.64 | far above the same kind of item | $27.78 | comparable item: Roland Olive Stufef |
| Food | 916152229 Chicks Gum - Chicles Chicks 60 x 4 Pastillas (Pack of 30) | $103.60 | far above the same kind of item | $84.56 | comparable item: Chicks Gum - Chicles Chicks 60 x 4 Pastillas (Pack |
| Food | 25576159 Gatorade Thirst Quencher Powder, Fruit Punch, 8.5oz Pouch, Makes 1 gal | $103.04 | far above the same kind of item | $1.51 | comparable item: (16 Packets) Gatorade Thirst Quencher Fruit Punch  |
| Food | 16207609671 Hostess Summer Singl | $102.96 | far above the same kind of item | $3.48 | median price of the same kind of item |
| Food | 51233455 Rockin' Rider Sprinkles Stable Unicorn | $102.95 | far above the same kind of item | $5.52 | comparable item: Wilton Unicorn Sprinkles Mix, 2.12 oz. |
| Food | 55203547 Lindt Lindor Assorted Milk Chocolate Truffle Hearts, 12 Count | $102.92 | far above the same kind of item | $12.61 | median per-unit price of comparable items |
| Food | 44014032 Mussel Wtr Slt Added, 9 Oz (pack Of 24) | $102.51 | far above the same kind of item | $140.70 | median per-unit price of comparable items |
| Food | 44883409 Jolly Rancher 80pchrshy Jly Rnchr | $102.40 | far above the same kind of item | $7.70 | median price of the same kind of item |
| Food | 129363928 Bigelow 30568CT Green Tea Assortment Variety Gift Box: 64 / Box, 6 Box | $102.40 | far above the same kind of item | $9.99 | median price of the same kind of item |
| Food | 651485662 UtyMax Cranberry Drink Mix - NNIUTYMAX | $102.29 | far above the same kind of item | $6.87 | median price of the same kind of item |
| Food | 750367117 Suja Organic 3 Day Juice Cleanse, 21 Juices + 3 Juice Shots | $102.24 | far above the same kind of item | $6.99 | median price of the same kind of item |
| Food | 25523151 Gatorade Original Powdered Drink Mix, Orange, 8.5Oz Packets, 40/Carton | $102.00 | far above the same kind of item | $39.02 | comparable item: Gatorade G Drink Mix, Orange, 21 Oz, 1 Count |
| Food | 25920945 Gatorade Original Powdered Drink Mix Lemon-Lime 8.5oz Packets 40/Carto | $102.00 | far above the same kind of item | $15.03 | comparable item: Great Value Lemon Lime Hydration Powdered Liquid D |
| Food | 51866527 Lindor Lindor Assorted Chocolate Truffles | $101.92 | far above the same kind of item | $9.98 | comparable item: Lindt Lindor Assorted Chocolate Truffles, 6.2 Oz. |
| Food | 43321510 Sqwincher 23.83 Ounce Powder Pack Instant Powder Concentrate Packet As | $101.88 | far above the same kind of item | $8.97 | median price of the same kind of item |
| Food | 47885449 Golden State Fruit The Classic Deluxe Fruit, Cheese, and Nuts Basket G | $101.25 | far above the same kind of item | $63.66 | comparable item: Golden State Fruit Classic Deluxe Christmas Fruit  |
| Food | 102763019 Deli Component Lasagna Cheese | $101.23 | far above the same kind of item | $3.47 | comparable item: Hamburger Helper, Four Cheese Lasagna, 5.5 oz box |
| Food | 457661620 Oreo Crumbs | $100.46 | far above the same kind of item | $12.03 | comparable item: Paskesz Pretzel Crumbs |
| Food | 100901128 Hypermart Vegetable Rice | $99.99 | far above the same kind of item | $5.98 | comparable item: Frankly Fresh Brown Rice & Vegetable |
| Food | 368772467 Spicewalla Kitchen Essentials Spices and Seasonings Set, 18 Spices Gif | $99.99 | far above the same kind of item | $1.32 | median per-unit price of comparable items |
| Food | 555026806 FreshJax Complete Premium Organic Spices Kit | 25 Organic Gourmet Sing | $99.99 | far above the same kind of item | $2.03 | median per-unit price of comparable items |
| Food | 648053826 Theo Organic 45% Milk Chocolate Hazelnut Crisp 3 oz | $99.99 | far above the same kind of item | $3.19 | comparable item: Theo - Organic Pure Milk 45% Milk Chocolate Bar, 3 |
| Food | 860966826 Spiral Sliced Ham | $99.99 | far above the same kind of item | $43.00 | comparable item: Hickory Farms Boneless Spiral Sliced Ham, 3.5 - 4. |
| Food | 14258874297 Clean Co Non-Alcoholic Tequila Alternative 700ml Bottle - | with Premi | $99.98 | far above the same kind of item | $41.82 | comparable item: Clean Co Non-Alcoholic Tequila Alternative 700ml B |
| Food | 14260559958 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $99.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 14271052789 Clean Co Non-Alcoholic Tequila Alternative 700ml Bottle - | with Premi | $99.98 | far above the same kind of item | $45.10 | comparable item: Clean Co Non-Alcoholic Tequila Alternative 700ml B |
| Food | 14275858565 Clean Co Non-Alcoholic Vodka Alternative 700ml Bottle | with Premium Q | $99.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Vodka Alternative 700ml Bot |
| Food | 14275858575 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $99.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 14301315343 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $99.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 734458543 Nestle®, NES25485CT, Rich Chocolate Hot Cocoa Packets, 6 / Carton | $99.90 | far above the same kind of item | $13.18 | comparable item: Nestle Hot Cocoa Mix Rich Milk Chocolate, 4.27 oz, |
| Food | 117369619 Clorets Gum 60 x 2 units - Chicles (Pack of 12) | $99.84 | far above the same kind of item | $9.04 | median price of the same kind of item |
| Food | 8469319378 Stirrings Simple Sour Cocktail Mix 750ml Bottles - Real Juice No Prese | $99.71 | far above the same kind of item | $11.16 | median per-unit price of comparable items |
| Food | 31219552 Mr. Jelly Belly Jelly Bean Machine with Jelly Beans, 1 oz, (Pack of 6) | $99.05 | far above the same kind of item | $4.67 | comparable item: Jelly Belly Bean Boozled Jelly Beans, 1.9 Oz. |
| Food | 105234338 Deli Component Sazon Tu Gusto | $99.00 | far above the same kind of item | $53.27 | comparable item: Deli Component Sazon Accent Original |
| Food | 54370161 Candy Crate Mega Holiday Nostalgic Candy Gift Tower, Red | $98.51 | far above the same kind of item | $48.75 | comparable item: Candy Crate Holiday Chalkboard Nostalgic Candy Gif |
| Food | 34480344 Buff Bake, Cookies Snickerdoodle, 1.79 Oz, Pack Of 8 | $98.31 | far above the same kind of item | $12.82 | comparable item: Enjoy Life Snickerdoodle Cookies, 1 oz (Pack of 24 |
| Food | 1722558862 Nutri Snacks Keto Granola, Low Carb and Ready to Use, 10.5 oz. Reseala | $98.22 | far above the same kind of item | $5.98 | median per-unit price of comparable items |
| Food | 152920392 Dawn Caramel Flaky Roll | $98.21 | far above the same kind of item | $19.98 | comparable item: Dawn 7"chocolate Caramel |
| Food | 161831153 Yoplait Foods Yoplait Smoothie Pro Tropical | $98.00 | far above the same kind of item | $9.12 | median price of the same kind of item |
| Food | 36761002 Wrap Sushi Yellow, 1.76 Oz (pack Of 6) | $97.95 | far above the same kind of item | $4.08 | comparable item: Rice Sushi, 32 Oz (pack Of 4) |
| Food | 54427514 Urbani Truffles Sauce Tomato & Truffle, 180 GM (Pack of 6) | $97.76 | far above the same kind of item | $6.93 | comparable item: Sauce Tomato & Truffle, 180 Gm (pack Of |
| Food | 22389397 Betty Lous Powdereed Peanut Butter, Just | $97.08 | far above the same kind of item | $8.02 | median price of the same kind of item |
| Food | 141871000 Paris Infallible Pro-Last Lip Color, Everlasting Caramel [201] 0.17 oz | $97.03 | far above the same kind of item | $0.75 | median per-unit price of comparable items |
| Food | 50849963 Hard Candy Womens Prescription Glassees, HC31 DBLUE Dark Blue/Pattern | $97.00 | far above the same kind of item | $68.00 | comparable item: Hard Candy Womens Prescription Glassees, HC30 BWN  |
| Food | 50849965 Hard Candy Womens Prescription Glassees, HC32 BWN Brown/Pattern | $97.00 | far above the same kind of item | $68.00 | comparable item: Hard Candy Womens Prescription Glassees, HC30 BWN  |
| Food | 50849969 Hard Candy Womens Prescription Glassees, HC28 RED Red/Pattern | $97.00 | far above the same kind of item | $68.00 | comparable item: Hard Candy Womens Prescription Glassees, HC30 BWN  |
| Food | 50849973 Hard Candy Womens Prescription Glassees, HC29 DPUR Dark Purple/Pattern | $97.00 | far above the same kind of item | $68.00 | comparable item: Hard Candy Womens Prescription Glassees, HC30 BWN  |
| Food | 20093110392 Upper Cut Serrano Ham, Whole Leg | $97.00 | far above the same kind of item | $59.00 | comparable item: Upper Cut Serrano Ham, Half Leg |
| Food | 12941655404 Clean Co Non-Alcoholic Tequila Alternative 700ml Bottle - | with Premi | $96.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Tequila Alternative 700ml B |
| Food | 14248873386 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $96.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 33655309 Castillo de Pinar Tomato Basil Spicy Peri-Peri Finishing Dressing, 5.1 | $96.96 | far above the same kind of item | $9.51 | median per-unit price of comparable items |
| Food | 15555814673 Post Pebbles & Puffs | $96.00 | far above the same kind of item | $3.98 | comparable item: Cheetos Puffs Family Size, 20.5 Oz. |
| Food | 491501246 Almas Gheimeh Bademjoon Stew (Gheimeh Stew with Eggplant) - Pack of 12 | $95.88 | far above the same kind of item | $6.87 | median price of the same kind of item |
| Food | 743128972 Almas Gheimeh Stew - Pack of 12 cans | $95.88 | far above the same kind of item | $6.87 | median price of the same kind of item |
| Food | 27617715 Roland Coarse Cut Artichoke Hearts, 88 O | $95.66 | far above the same kind of item | $29.30 | comparable item: Mezzetta Marinated Artichoke Hearts, 6.5 |
| Food | 54371776 Ziyad Meat Luncheon Chicken & Beef, 12 O | $95.36 | far above the same kind of item | $2.67 | comparable item: Shahia Luncheon Meat, Beef & Chicken, 12 Oz |
| Food | 757829853 Tropiking Aloe Vera Drink 16.9 oz - Bebida de Savila (Pack of 24) | $95.28 | far above the same kind of item | $8.28 | median price of the same kind of item |
| Food | 169845768 Deli Component Soy Sauce La Choy | $95.00 | far above the same kind of item | $7.90 | median price of the same kind of item |
| Food | 8449558231 Stirrings Simple Mule Cocktail Mix 750ml Bottles - Real Juice No Prese | $94.99 | far above the same kind of item | $39.98 | comparable item: Stirrings Simple Mule Cocktail Mix 750ml Bottles - |
| Food | 8454122855 Stirrings Simple Bloody Mary Cocktail Mix 750ml Bottles - Real Juice N | $94.99 | far above the same kind of item | $61.99 | comparable item: Stirrings Simple Bloody Mary Cocktail Mix 750ml Bo |
| Food | 8468551398 Stirrings Simple Paloma Cocktail Mix 750ml Bottles - Real Juice No Pre | $94.99 | far above the same kind of item | $45.99 | comparable item: Stirrings Simple Paloma Cocktail Mix 750ml Bottles |
| Food | 128268818 Alpineaire 7 Day Meal Kit (14 Pouches) | $94.95 | far above the same kind of item | $84.95 | comparable item: Alpineaire 7 Day Meal Kit (14 Pouches) |
| Food | 910039274 Larabar Coconut Kale & Cacao Organic Snack, 1.6 Oz | $94.66 | far above the same kind of item | $2.20 | comparable item: Larabar Organic Hazelnut, Hemp & Cacao |
| Food | 973433663 AFTERSHOCKS POPPING CANDY 1.06OZ, Case of 2 | $94.43 | far above the same kind of item | $1.26 | median per-unit price of comparable items |
| Food | 46249864 Hawaiian Host Nut Macdma Onion Grlc, 4.5 Oz (pack Of 1 | $94.29 | far above the same kind of item | $5.89 | comparable item: Hawaiian Host Nut Macdma Dry Rstd Salt, 4.5 Oz (pa |
| Food | 54308642 Bulldog Vegetable & Fruit Sauce, 16.6 fl oz, (Pack of 10) | $94.26 | far above the same kind of item | $5.20 | median price of the same kind of item |
| Food | 141671946 Deli Component Sauce Hunt Hickory | $93.98 | far above the same kind of item | $17.88 | comparable item: Deli Component Sauce Hunt Hickory |
| Food | 911464843 Deli Component Pork Carnitas No Sauce | $93.98 | far above the same kind of item | $8.04 | comparable item: Isadora Pork Carnitas 8.8 oz |
| Food | 37181865 Generic Cat Cora's Kitchen Herbal Tea With Saffr | $93.43 | far above the same kind of item | $8.77 | median price of the same kind of item |
| Food | 22172344 International Cheese Affair | $93.33 | far above the same kind of item | $4.78 | median price of the same kind of item |
| Food | 948510236 Pirate Brands Booty Puffs, Aged White Cheddar, 12/.5 Oz, Pack Of 12 | $93.33 | far above the same kind of item | $34.02 | comparable item: Pirate Brands Booty Puffs - Aged White Cheddar , 6 |
| Food | 8454072877 Stirrings Simple Old Fashioned Cocktail Mix 750ml Bottles - Real Juice | $92.99 | far above the same kind of item | $59.99 | comparable item: Stirrings Simple Old Fashioned Cocktail Mix 750ml  |
| Food | 37185029 Chef's Banquet 150 Serving Mixed Tropica | $92.86 | far above the same kind of item | $1.94 | median price of the same kind of item |
| Food | 878809905 CHOMP by Nightingale, Mint Chocolate Chip Ice Cream Sandwiches, 4 Ice  | $92.61 | far above the same kind of item | $8.13 | comparable item: Backpacker'S Pantry Freeze-Dried Mint Chocolate Ch |
| Food | 197424530 Malher Chicken Bouillon 0.42 oz - Consome de Pollo (Pack of 32) | $92.03 | far above the same kind of item | $9.52 | comparable item: (Pack of 6) Malher Chicken Bouillon 8 oz - Consome |
| Food | 24182516 Jardines Sauce Sampler, 3 Count, 1 Count | $92.00 | far above the same kind of item | $5.98 | comparable item: Heinz 4 Flavor BBQ Sauce Sampler Pack, 4 ct Pack |
| Food | 8470323652 Stirrings Simple 5 Calorie Margarita Cocktail Mix 750ml Bottles - Real | $91.99 | far above the same kind of item | $39.98 | comparable item: Stirrings Simple 5 Calorie Margarita Cocktail Mix  |
| Food | 25522715 Gatorade G Series Perform Riptide Rush Sports Drink Powder, 50.9 oz | $91.91 | far above the same item's other variants | $53.42 | median per-unit price of comparable items |
| Food | 777047586 Malher Suave Rico Seasoning 0.4 oz - Sazonador (Pack of 40) | $91.73 | far above the same kind of item | $15.52 | comparable item: Malher Seasoning-Saborin 8.81 oz - Sazonador Sabor |
| Food | 320353072 Don Julio Low-Sodium Chicken Bouillon With Parsley - Consome de Pollo  | $91.64 | far above the same kind of item | $21.87 | comparable item: Don Julio Low-Sodium Chicken Bouillon With Parsley |
| Food | 336447785 Welch’s Antioxidant Fruit Blend, 3lbs, (6-Pack) | $91.00 | far above the same kind of item | $137.61 | comparable item: Welch?s Strawberry Blueberry Blend, 12 oz., (8-Pac |
| Food | 27617694 Pirate's Booty Baked Aged White Cheddar, Rice and Corn Puffs, 0.5 oz,  | $90.99 | far above the same kind of item | $24.24 | comparable item: Pirate's Booty Aged White Cheddar Rice and Corn Pu |
| Food | 963507236 24 Pack, Velveeta Shells & Cheese Original Shell Pasta & Cheese Sauce  | $90.96 | far above the same kind of item | $178.33 | comparable item: Velveeta Shells Pasta & Cheese Sauce, 2.39 oz Cups |
| Food | 753391205 Maesri, Satae Sauce, 48 count (Case of 48) | $90.71 | far above the same kind of item | $30.60 | median per-unit price of comparable items |
| Food | 54309017 Gianotti Sauce Pasta Meat, 26 Oz (pack O | $90.59 | far above the same kind of item | $7.75 | comparable item: Sauce Pasta, 32 Oz (pack Of 6) |
| Food | 22557434 Ener G Crackers, Wheat Free, Gluten Free | $90.44 | far above the same kind of item | $34.13 | comparable item: Ener G Pretzels, Wheat Free, Gluten Free |
| Food | 141047317 Nature's Touch Organic Power Fruit Blend, 32 oz., (6-Pack) | $90.04 | far above the same kind of item | $113.74 | comparable item: Nature's Touch Organic Berry Cherry Blend, 10 oz., |
| Food | 259115706 La Cote Premium Cheese Servers Accessories (3 Piece Cheese Knife Set I | $90.00 | far above the same kind of item | $7.42 | median price of the same kind of item |
| Food | 276597327 10 Servings Dehydrated Egg Noodles - 6 pack | $90.00 | far above the same kind of item | $6.88 | median price of the same kind of item |
| Food | 55427151 Amy's, Vegetarian Frozen Entrees, (Pack of 12), Variety of Options to  | $89.99 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Food | 55427154 Amy's, Vegetarian Frozen Entrees, (Pack of 12), Variety of Options to  | $89.99 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Food | 8466300511 Stirrings Simple Paloma Cocktail Mix 750ml Bottles - Real Juice No Pre | $89.98 | far above the same kind of item | $45.99 | comparable item: Stirrings Simple Paloma Cocktail Mix 750ml Bottles |
| Food | 151347862 Deli Component Teriyaki Sauce La Choy | $89.97 | far above the same kind of item | $23.88 | comparable item: Kikkoman Teriyaki Sauce, 5 oz (Pack of 12) |
| Food | 55203418 Tin Can with Candy Gift Set, 3 pc | $89.92 | far above the same kind of item | $16.98 | comparable item: Decorative Drum Shaped Tin Candy Gift Set |
| Food | 111902105 Deli Component Spaguetti Sauce Heinz | $89.88 | far above the same kind of item | $8.23 | median price of the same kind of item |
| Food | 10688500361 PEEPS SLP&HDBD ASMT | $89.88 | far above the same kind of item | $1.74 | median price of the same kind of item |
| Food | 37181886 Generic Goldbaum's Wonder Meals Bone In Chicken | $89.66 | far above the same kind of item | $5.85 | median price of the same kind of item |
| Food | 100174199 Message Brownie | $89.64 | far above the same kind of item | $7.46 | median price of the same kind of item |
| Food | 165541600 9"message Cookie- Chocolate Chip Cookie | $89.64 | far above the same kind of item | $58.56 | comparable item: Heart Chocolate Chip Message Cookie 12ct |
| Food | 23809771 Grandmothers Mincemeat Pie Filling, 28 O | $89.31 | far above the same kind of item | $17.32 | comparable item: Mix Pie Filling Strwbrry, 3.5 Oz (pack |
| Food | 12929913353 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $88.98 | far above the same kind of item | $26.89 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 154994516 Cake Mate Sprinkles Chocolate, 2.5 OZ | $88.84 | far above the same kind of item | $5.22 | comparable item: bettergoods Chocolate Sprinkles, 2.5 oz |
| Food | 46264905 Sauce Cream & Truffle, 180 Gm (pack Of 1 | $88.62 | far above the same kind of item | $8.67 | comparable item: Urbani Truffles Sauce Cream & Truffle, 180 GM (Pac |
| Food | 196084528 Apple & Eve Cookie Monster's Orange Tangerine 100% Juice, 4.23 fl oz,  | $88.46 | far above the same kind of item | $32.16 | comparable item: Apple & Eve Sesame Street Cookie Monster's Orange  |
| Food | 258000593 Malher Chicken Rice Soup 2.1 oz - Sopa de Pollo con Arroz (Pack of 12) | $88.31 | far above the same kind of item | $47.46 | comparable item: Malher Chicken - Pasta Soup 1.07 oz - Sopa De Poll |
| Food | 792776714 Green Mountain Naturals Hot Apple Cider, K-Cup Portion Pack for Keurig | $88.03 | far above the same kind of item | $51.76 | comparable item: Green Mountain Naturals Hot Apple Cider K-Cup Pods |
| Food | 177226459 Lamb Weston Potato Country Syle Wedge | $88.00 | far above the same kind of item | $4.44 | median price of the same kind of item |
| Food | 742093510 Wal-mart Bakery White Buttercreme Mbc Icing | $88.00 | far above the same kind of item | $7.00 | comparable item: Wal-mart Bakery 1/8 White Cake White Whipped Icing |
| Food | 544656925 Mrs. Fields Personal Crimson Cookie Tower | $87.99 | far above the same kind of item | $6.97 | median price of the same kind of item |
| Food | 21090587 Glutino Chocolate Covered Vanilla Wafers, 4.6 Ounce -- 12 per case. | $87.84 | far above the same kind of item | $6.19 | comparable item: Glutino Wafer Cookie Vanilla Milk Chocolate Covere |
| Food | 13517911597 Penn's Cooked Country Ham, 14-21 lbs. | $87.84 | far above the same kind of item | $5.08 | comparable item: Goya Cooked Ham, 16 oz |
| Food | 36760982 Roland Pate With Orange Liqueur, 2.8 Oz, | $87.43 | far above the same kind of item | $1.63 | median per-unit price of comparable items |
| Food | 5111466340 PUFFS 32PC SK | $87.04 | far above the same kind of item | $19.45 | median per-unit price of comparable items |
| Food | 816580340 Divina Castelvetrano Olives - Pitted - 2 Ponds (Case of 4) | $86.99 | far above the same kind of item | $12.99 | comparable item: Divina Castelvetrano Olives, Pitted, 4.2 Oz. (Case |
| Food | 44013982 Sable & Rosenfeld Pastry Party Cup, 64PC (Pack of 10) | $85.89 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Food | 166407677 Green Mountain Naturals Coffee Roasters Gourmet Single Cup Coffee Appl | $85.84 | far above the same kind of item | $25.49 | median per-unit price of comparable items |
| Food | 22001492 Augason Farms Vegetable 6 Pack | $85.59 | far above the same kind of item | $8.50 | comparable item: Augason Farms Beef Flavored Vegetarian M |
| Food | 48614763 Rustichella d'Abruzzo Egg Garganelli 8.8 oz | $85.29 | far above the same kind of item | $2.17 | median per-unit price of comparable items |
| Food | 139856288 JELLY BELLY GUMMI PET DINOSAUR 1.75oz | $85.20 | far above the same kind of item | $0.93 | comparable item: Jelly Belly Pet Gator Gummi, 3 Oz, (pack |
| Food | 55212026 Lakewood Organic Juice, Tart Cherry, 32 Fl Oz, 1 Count | $85.08 | far above the same kind of item | $26.06 | comparable item: Lakewood Tart Cherry Juice Cherry, 12.5 Fl Oz |
| Food | 117980595 Pannus Bakery Pink Cookie Palvoron | $85.00 | far above the same kind of item | $6.97 | median price of the same kind of item |
| Food | 179365198 Pannus Plain Cookies | $85.00 | far above the same kind of item | $5.56 | comparable item: OREO COOKIES |
| Food | 46249865 Trail Mix Coco Nosh Org, 6 Oz (pack Of 1 | $84.96 | far above the same kind of item | $4.07 | comparable item: Trail Mix Mntain Mix, 6 Oz (pack Of 12) |
| Food | 200995437 Goya Coriander & Annatto Seasoning 36 Pack - Sazon Culantro y Achiote  | $84.91 | far above the same kind of item | $42.71 | comparable item: Goya Coriander & Annatto Seasoning 8 Pack - Sazon  |
| Food | 37182214 Generic Unicorn Pop Rainbow Unicorn Lollipop, 1 | $84.82 | far above the same kind of item | $51.26 | comparable item: Unicorn Pop Lollipop, 2.5 oz, (Pack of 36) |
| Food | 55212061 Morton & Bassett San Francisco Bay Leaves, 0.14 oz | $84.62 | far above the same kind of item | $0.66 | median per-unit price of comparable items |
| Food | 55766040 BirthdayExpress White Candy Kit - Party Candy Buffet Table Assortment  | $84.53 | far above the same kind of item | $52.88 | comparable item: White Candy Buffet |
| Food | 29472874 Roland Sundried Tomatoes In Olive Oil, 1 | $84.17 | far above the same kind of item | $8.16 | comparable item: Mediterranean Organic Sundried Tomatoes In Olive O |
| Food | 22557270 Elite Chocolate Badatz Cookie Wafers, 17 | $84.00 | far above the same kind of item | $2.68 | comparable item: Voortman Chocolate Cookie Wafers, 14.1 Oz. |
| Food | 756665552 VUE Electrolyte Boost Drink Mix Packets, Multivitamin Nutrition Supple | $83.99 | far above the same kind of item | $47.99 | comparable item: VUE Electrolyte Boost Drink Mix Packets, Multivita |
| Food | 227058954 vanilla/pastries/donuts/glaze | $83.28 | far above the same kind of item | $2.24 | comparable item: Freshness Guaranteed Valentines Vanilla and Chocol |
| Food | 153452952 Deli Component Beef Stew Carne Guisar | $83.00 | far above the same kind of item | $2.73 | comparable item: Great Value Beef Stew, 24 oz |
| Food | 451527780 VUE Energy Boost Drink Mix Packets, Multivitamin Nutrition Supplement  | $82.97 | far above the same kind of item | $47.99 | comparable item: VUE Energy Boost Drink Mix Packets, Multivitamin N |
| Food | 159688257 Bakery Component Cookie Crunch Bettercrem | $82.67 | far above the same kind of item | $8.79 | comparable item: Dream Pops Crunch, Cookie Dough |
| Food | 21667957 Harry & David Moose Munch Milk Chocolate | $82.46 | far above the same kind of item | $5.97 | median price of the same kind of item |
| Food | 29473435 Lakewood Juice Pure Cranberry, 32 Fl Oz | $82.08 | far above the same kind of item | $7.52 | comparable item: Lakewood Pure Cranberry Juice, 32 Fl Oz |
| Food | 170577949 Deli Component Ceaser Dressing | $82.03 | far above the same kind of item | $2.24 | comparable item: Olde Cape Cod Olde Cape Cod Dressing, 16 oz |
| Food | 154133735 Bakery Component Biz Brownie 1/2 Sheet Uniced Fudge | $82.00 | far above the same kind of item | $7.46 | median price of the same kind of item |
| Food | 39407061 Holiday Boneless Spiral Ham with Petite Smoked Turkey Breast, 2 pc | $81.60 | far above the same kind of item | $41.70 | comparable item: Boneless Petite Smoked Turkey Breast 3 |
| Food | 111152671 Deli Component Turkey Stew Masitas De Pavo | $81.38 | far above the same kind of item | $6.87 | median price of the same kind of item |
| Food | 36483371 Firehook Sundried Tomato Baked Crackers, | $81.23 | far above the same kind of item | $6.82 | comparable item: Firehook Mediterranean Baked Crackers, Sundried To |
| Food | 35053951 Lindon Farms 120 Servings Freeze Dried Corn | $81.00 | far above the same kind of item | $7.20 | median price of the same kind of item |
| Food | 19475282 Reese Queen Olives Stuffed With Minced P | $80.94 | far above the same kind of item | $22.82 | comparable item: Mario® Minced Pimiento Stuffed Queen Olives 80 oz. |
| Food | 35176974 Polenta Medium Wht, 5 Lb (pack Of 4) | $80.80 | far above the same kind of item | $76.13 | comparable item: Roland Polenta Medium, 8.8 oz. (Pack of 12) |
| Food | 570617825 (Pack of 36) Seasoning, Malher Garlic Salt 0.21 oz - Sazonador Sal De  | $80.76 | far above the same kind of item | $22.91 | comparable item: (Pack of 1) Malher Garlic Salt 100 g - Sal de Ajo |
| Food | 5266389946 Hostess SS ZingerDin | $80.64 | far above the same kind of item | $3.48 | median price of the same kind of item |
| Food | 5760172292 Hostess Mystery Flav | $80.64 | far above the same kind of item | $3.48 | median price of the same kind of item |
| Food | 14749424877 Hostess Cupcake Craz | $80.64 | far above the same kind of item | $4.58 | comparable item: Cruz Cupcake |
| Food | 922698914 Community Cappuccino Brown Sugar Cinnamon Swirl | $80.30 | far above the same kind of item | $5.19 | median price of the same kind of item |
| Food | 44391017 Sams Choice Half Spiral Brown Sugar | $80.13 | far above the same kind of item | $5.19 | median price of the same kind of item |
| Food | 29472765 Roland Curry Seasoning Powder Jar, 2 Oz, | $80.06 | far above the same kind of item | $3.47 | comparable item: Simply Organic Seasoning Mix, Curry Powder, 3 Oz |
| Food | 39407060 Smithfield Lean Pork Tenderloins, 3 count | $80.00 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Food | 184120723 Deli Component Potato Regular Fries 3/8 | $80.00 | far above the same kind of item | $11.34 | comparable item: Mrs. Fisher's Regular Potato Chips 24oz |
| Food | 841807305 Celestial Seasonings 32pccelestial Every | $80.00 | far above the same kind of item | $7.22 | median price of the same kind of item |
| Food | 745027798 The 'Bloody Mary Hot Sauce Tour' Gift Set by Thoughtfully | Includes 4 | $79.99 | far above the same kind of item | $29.99 | comparable item: Bloody Mary Cocktail Gift Set with Mason Jar Glass |
| Food | 158281056 Nabisco Oreo Small | $79.98 | far above the same kind of item | $4.99 | comparable item: Oreo Vanilla 6pk |
| Food | 8176453647 Owen’s Craft Mixers Live Nation Exclusive Strawberry Lemonade | $79.98 | far above the same kind of item | $10.58 | comparable item: Owen’s Craft Mixers Live Nation Exclusive Strawber |
| Food | 55204610 Guy Fieri Coffee Hot Fudge Brownie, Single Serve Cup Portion Pack for  | $79.66 | far above the same kind of item | $61.20 | median per-unit price of comparable items |
| Food | 428242979 (0 pack) Al Dente Traditional Garlic Parsley Fettuccine Pasta, 6-Pack | $79.56 | far above the same kind of item | $19.38 | comparable item: Al Dente Garlic Parsley Fettuccine Pasta, 12 oz (P |
| Food | 22389390 American Spoon Salsa, Mango Habanero, 14 | $79.24 | far above the same kind of item | $5.97 | median price of the same kind of item |
| Food | 149389676 Pillsbury Baking Buttermilk Biscuit Southern | $78.98 | far above the same kind of item | $6.28 | median price of the same kind of item |
| Food | 462671121 Lindt Swiss Chocolate Milk Chocolate, 10.58 Oz, 10 Ct | $78.73 | far above the same kind of item | $5.96 | median price of the same kind of item |
| Food | 22389382 Bred Dip Feta & Pink Peppercorn Bread Di | $78.64 | far above the same kind of item | $6.80 | median price of the same kind of item |
| Food | 540600173 Malher Suave Rico Seasoning 0.4 oz - Sazonador (Pack of 32) | $78.11 | far above the same kind of item | $12.42 | comparable item: Malher Seasoning-Saborin 8.81 oz - Sazonador Sabor |
| Food | 152207384 *valentines Day Chocolate Cupcake Kit | $78.00 | far above the same kind of item | $7.07 | comparable item: Great Value Day of The Dead Chocolate Cupcake Kit |
| Food | 170680717 *easter Chocolate Cupcake Kit | $78.00 | far above the same kind of item | $5.97 | comparable item: Great Value Chocolate Cupcake Kit, 16.5oz |
| Food | 8476155409 Stirrings Simple Bloody Mary Cocktail Mix 750ml Bottles - Real Juice N | $77.99 | far above the same kind of item | $61.99 | comparable item: Stirrings Simple Bloody Mary Cocktail Mix 750ml Bo |
| Food | 8483868898 Stirrings Simple Cosmopolitan Cocktail Mix 750ml Bottles - Real Juice  | $77.99 | far above the same kind of item | $22.49 | comparable item: Stirrings Simple Cosmopolitan Cocktail Mix 750ml B |
| Food | 8489413541 Stirrings Simple Mule Cocktail Mix 750ml Bottles - Real Juice No Prese | $77.99 | far above the same kind of item | $39.98 | comparable item: Stirrings Simple Mule Cocktail Mix 750ml Bottles - |
| Food | 36009304 Frabill 1426 Shrimp Shak | $77.76 | far above the same kind of item | $13.96 | comparable item: Ssnng Shrimp, 1.5 Oz (pack Of 6) |
| Food | 185795184 Snappy's Premium Funnel Cake Mix (6 - 5 Lb.) | $77.70 | far above the same kind of item | $22.63 | comparable item: Duff Goldman Premium Zebra Cake Mix, 18 oz, (Pack  |
| Food | 36483366 Firehook Cinnamon Baked Crackers, 7 Oz, | $77.66 | far above the same kind of item | $6.77 | comparable item: Ener-G Cinnamon Crackers, 5.92 oz (Pack of 6) |
| Food | 36483372 Firehook Sea Salt Baked Crackers, 7 Oz, | $77.66 | far above the same kind of item | $10.51 | comparable item: Firehook Baked Crackers, Sea Salt, 5.5 Oz |
| Food | 652556873 One Bite Frozen Pizza Multipack (8 count) | $76.98 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Food | 17804055 Bragg Organic Apple Cider Vinegar, 1GA (Pack of 4) | $76.96 | far above the same kind of item | $28.65 | comparable item: Alessi Organic Apple Cider Vinegar, 17 oz, (Pack o |
| Food | 526712213 0.25 OZ JELLY BELLY0 | $76.91 | far above the same kind of item | $2.44 | comparable item: License Jelly Belly |
| Food | 55212071 Simply Delish Natural Instant Vanilla Pudding - Sugar Free, Non GMO, G | $76.86 | far above the same kind of item | $39.24 | comparable item: Simply Delish Natural Instant Vanilla Pudding - Su |
| Food | 21090589 Glutino Pretzel Twists, 14.1 Oz, (pack O | $76.60 | far above the same kind of item | $8.66 | comparable item: Glutino Pretzel Twists, 8 oz (Pack of 12) |
| Food | 46264917 Sauce Pasta Tmto Basil, 26 Oz (pack Of 1 | $76.39 | far above the same kind of item | $7.75 | comparable item: Sauce Pasta, 32 Oz (pack Of 6) |
| Food | 54370178 Candy Crate Mega Snowman Tower of Nostalgic Candy | $76.32 | far above the same kind of item | $48.75 | comparable item: Candy Crate Holiday Chalkboard Nostalgic Candy Gif |
| Food | 17243109 Food Merchants Brand Traditional Italian Polenta, 18 oz (Pack of 12) | $76.08 | far above the same kind of item | $45.49 | comparable item: Food Merchants Brand Organic Green Chili & Cilantr |
| Food | 24182473 Coconut Dream Vanilla Enriched Coconut M | $76.08 | far above the same kind of item | $6.57 | median price of the same kind of item |
| Food | 8487702813 Stirrings Simple Old Fashioned Cocktail Mix 750ml Bottles - Real Juice | $75.99 | far above the same kind of item | $59.99 | comparable item: Stirrings Simple Old Fashioned Cocktail Mix 750ml  |
| Food | 758572234 Malher Garlic Salt 0.21 oz - Sazonador Sal de Ajo (Pack of 48) | $75.93 | far above the same kind of item | $30.55 | comparable item: (Pack of 1) Malher Garlic Salt 100 g - Sal de Ajo |
| Food | 633366220 Watkins Caramel Flavor 1 Gallon (Shelf Stable Ambient, Liquid, Plastic | $75.90 | far above the same kind of item | $33.09 | median per-unit price of comparable items |
| Food | 23809835 Goya Fancy Pimientos, 6.5 oz, (Pack of 24) | $75.84 | far above the same kind of item | $50.89 | comparable item: GOYA Fancy Pimientos 6.5 Oz |
| Food | 895295900 Enlightened Crisps Sriracha, 4.5 Oz | $75.56 | far above the same kind of item | $8.37 | comparable item: Enlightened Crisps Bbq, 4.5 Oz |
| Food | 27617764 Paskesz Old Fashion Candy Buttons, 1.5 O | $75.52 | far above the same kind of item | $6.60 | comparable item: Primrose Old Fashion Candy Mix |
| Food | 109454834 Jell-O Instant Sugar-Free Fat-Free Pistachio Pudding & Pie Filling 1 o | $75.50 | far above the same kind of item | $3.91 | comparable item: Jell-O Instant Sugar-Free Fat-Free Chocolate Puddi |
| Food | 29472952 Quaker Crunchy Corn Bran Cereal, 15 Oz, | $75.41 | far above the same kind of item | $3.94 | comparable item: Great Value Crunchy Raisin Bran Cereal, 24.8 oz |
| Food | 152217746 Deli Component Dressing Chipotle Ranch | $75.20 | far above the same kind of item | $2.98 | comparable item: Marketside Chipotle Ranch Dressing, 12 Fl Oz (2 pa |
| Food | 182559335 Deli Component Pineapple Chunks Natural | $75.00 | far above the same kind of item | $29.69 | comparable item: YANKEETRADERS Pineapple Chunks - 4 lbs. |
| Food | 15262129 Dixie Superware Sage Paper Plate | $74.99 | far above the same kind of item | $17.23 | comparable item: Dixie Ultra 10 1/16 in Paper Plate 186-count |
| Food | 1132096707 ReadyWise Simple Kitchen Freeze-Dried Seasoned Beef Patty Crumbles, 22 | $74.99 | far above the same kind of item | $128.59 | median per-unit price of comparable items |
| Food | 8476155411 Stirrings Simple 5 Calorie Margarita Cocktail Mix 750ml Bottles - Real | $74.99 | far above the same kind of item | $39.98 | comparable item: Stirrings Simple 5 Calorie Margarita Cocktail Mix  |
| Food | 14260559960 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $74.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 14278561971 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $74.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 14278761378 Clean Co Non-Alcoholic Rum Alternative 700ml Bottle | with Premium Qua | $74.98 | far above the same kind of item | $44.98 | comparable item: Clean Co Non-Alcoholic Rum Alternative 700ml Bottl |
| Food | 55204621 Guy Fieri Coffee Caramel Apple Bread Pudding, Single Serve Cup Portion | $74.88 | far above the same kind of item | $3.97 | median price of the same kind of item |
| Food | 182292883 Snyder's of Hanover Brick Oven Style Pizza Pretzel Sandwiches, 2 oz. ( | $74.88 | far above the same kind of item | $5.52 | comparable item: Snyder's of Hanover Pretzel Sandwiches, Brick Oven |
| Food | 21090478 Gefen Apple Sauce, 6 Count, (pack Of 12) | $74.79 | far above the same kind of item | $48.91 | comparable item: Gefen Natural Unsweetened Apple Sauce, 4 |
| Food | 156994225 Community Bread Pudding | $74.50 | far above the same kind of item | $7.48 | comparable item: Carter's Country Pudding, 40 Oz. |
| Food | 696668509 Jell-O Cook & Serve Chocolate Fudge Pudding & Pie Filling 3.4 oz Box ( | $74.16 | far above the same kind of item | $8.88 | comparable item: Jell-O Cook & Serve Chocolate Fudge Artificially F |
| Food | 44897562 Popcorn Simply Salted, 4.4 Oz (pack Of 1 | $73.60 | far above the same kind of item | $3.26 | comparable item: Popcorn, 4 Oz (pack Of 12) |
| Food | 617740132 Kraft Kool-Aid, Black Cherry, 0.13 Oz, Pack of 192 | $73.60 | far above the same kind of item | $19.91 | comparable item: Zevia Black Cherry Soda, 12 oz, 6ct (Pack of 4) |
| Food | 21091560 Vidalia Onion Blossom Kit, 3 pc, (Pack of 6) | $73.50 | far above the same kind of item | $6.68 | median price of the same kind of item |
| Food | 21090935 Mama Jess Bean Pasta Sauce, 24 oz, 12 oz | $73.31 | far above the same kind of item | $6.11 | comparable item: Mama Jess 5 Vegetable Pasta Sauce, 24 oz, (Pack of |
| Food | 35501074 Vanilla Sugar Mdgscr Pure, 8.5 Oz (pack | $73.20 | far above the same kind of item | $14.08 | comparable item: The Maple Guild, Pure Maple Sugar, 8 oz |
| Food | 27617760 Cavendish & Harvey Fruit Candies, 10.5 O | $73.00 | far above the same kind of item | $17.13 | comparable item: Cavendish & Harvey |
| Food | 165016675 Deli Component Dressing Blue Cheese | $72.98 | far above the same kind of item | $3.28 | comparable item: Kraft Roka Blue Cheese Dressing, 16 fl oz Bottle |
| Food | 17194084 (12 Packs) Pirate's Booty Aged White Cheddar Puffs, 6 Ct per pack | $72.86 | far above the same kind of item | $34.68 | comparable item: Pirate'S Booty Aged White Cheddar Baked Rice & Cor |
| Food | 47335413 Maranatha Sunflower Seed Butter, 12 Oz ( | $72.86 | far above the same kind of item | $5.76 | comparable item: SunButter Creamy Sunflower Seed Butter, 16 oz pack |
| Food | 33652993 Quaker Lower Sugar Instant Oatmeal Variety Pack, 1.23 oz, 10 count, (P | $72.51 | far above the same kind of item | $5.87 | comparable item: Quaker Instant Oatmeal Lower Sugar Variety 1.5 oz, |
| Food | 22389363 Capeachio Crackers, Assorted Specialty C | $72.27 | far above the same kind of item | $39.22 | comparable item: Capeachio Original Water Crackers, 4.4 O |
| Food | 840415772 Black Bar - Organic Dark Chocolate 100% Cacao No Sugar | $72.10 | far above the same kind of item | $12.88 | comparable item: Organic Dark Chocolate 70% Cacao |
| Food | 17193593 Arrowhead Mills Organic Bulgur Wheat, 24 oz (Pack of 12) | $72.00 | far above the same kind of item | $73.21 | comparable item: Arrowhead Mills Organic Bulger Wheat, 24 Oz |
| Food | 178180486 1/4 Sht Ts Bkd Choc Chip Msg Cookie | $72.00 | far above the same kind of item | $6.97 | median price of the same kind of item |
| Food | 190568866 1/4 Sht Ts Bkd Choc Chip Msg Cookie | $72.00 | far above the same kind of item | $6.97 | median price of the same kind of item |
| Food | 224403163 Mccormick 72pcgm Brown Sugar | $72.00 | far above the same kind of item | $24.14 | comparable item: Sugar Brown, 28 Oz (pack Of 4) |
| Food | 5505795688 24pc6in. Gummy Sele | $72.00 | far above the same kind of item | $5.31 | median price of the same kind of item |
| Food | 44785521 cookie Butterscothch, 6. | $71.12 | far above the same kind of item | $33.02 | comparable item: Cookie Penguin, 7.09 Oz (pack Of 12) |
| Food | 579534867 Dawn Foods Dawn White Flat Icing | $71.00 | far above the same kind of item | $8.78 | comparable item: Sweetshop Icing White 2 pack, 8 oz each |
| Food | 19476562 6 In 1 All Purpose Ground Tomatoes, 28 O | $70.92 | far above the same kind of item | $1.98 | comparable item: Cento - All Purpose Crushed Tomatoes, 15 Oz (Pack  |
| Food | 55427152 Amy's, Vegetarian Frozen Entrees, (Pack of 12), Variety of Options to  | $70.83 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Food | 509542885 Santa Eduviges Peperecha Sweet Bread Bar 10 Pack - Panela Bar Peperech | $70.77 | far above the same kind of item | $33.98 | comparable item: Santa Eduviges Peperecha Sweet Bread Bar 10 Pack - |
| Food | 7563569631 Great Scott Cheese, | $70.45 | far above the same kind of item | $3.31 | comparable item: SPAM with Cheese, 12 oz |
| Food | 993510729 Orange Whole Oats Sugar Free Cookies - Galletas de Naranja Sin Azúcar  | $70.09 | far above the same kind of item | $16.28 | comparable item: Orange Whole Oats Sugar Free Cookies - Galletas de |
| Food | 21090949 Mary's Gone Crackers Organic Original Cr | $69.99 | far above the same kind of item | $6.68 | comparable item: Organic Crackers; Caraway |
| Food | 39574611 Candy Sprinkles Snowman | $69.99 | far above the same kind of item | $9.84 | comparable item: Wilton Sprinkles, Candy Cane 2 oz. 710-1107 |
| Food | 305491905 Creative Home Natural White Marble with Mango Wood Trim Set of 2 pcs 1 | $69.98 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Food | 21090491 Gefen Whole Berry Cranberry Sauce, 16 Oz | $69.94 | far above the same kind of item | $1.97 | comparable item: Great Value Whole Berry Cranberry Sauce, 14 oz |
| Food | 21091249 Savory Choice Turkey Flavor Liquid Broth | $69.94 | far above the same kind of item | $4.99 | median price of the same kind of item |
| Food | 19475787 Amore Sun-Dried Tomato Paste, 2.8 oz (Pack of 12) | $69.66 | far above the same kind of item | $17.62 | comparable item: Gia Sun Dried Tomato Paste In Tube 80 Grams |
| Food | 54308906 Duff Decorating Cookie Mix Tie Dye Swirl | $69.57 | far above the same kind of item | $20.33 | comparable item: Duff Decorating Mix Biscuit Beer, 14 Oz |
| Food | 17194608 Mott's Golden Delicious Hot Spiced Cider Drink Mix, 0.74 oz (Pack of 1 | $69.48 | far above the same kind of item | $9.43 | comparable item: Mott's Hot Spiced Caramel Cider Drink Mix, .74 oz  |
| Food | 29472833 Roland Pieces And Stem Straw Mushrooms, | $69.28 | far above the same kind of item | $29.77 | comparable item: Roland Broken Straw Mushrooms, 15 Oz, (p |
| Food | 17771031 Banderita Tortilla, White Corn, 30ct, 27 | $69.09 | far above the same kind of item | $2.35 | comparable item: Great Value Corn Tortilla, 30 Count |
| Food | 33652994 Quaker Lower Sugar Apples & Cinnamon Instant Oatmeal, 1.09 oz, 10 coun | $69.00 | far above the same kind of item | $3.00 | comparable item: Quaker Lower Apples & Cinnamon Instant Oatmeal 10- |
| Food | 17193520 Quaker Instant Cheddar Cheese Flavor Grits, 12ct (Pack of 12) | $68.79 | far above the same kind of item | $51.65 | comparable item: Quaker Instant Grits Flavor Variety, 12ct (Pack of |
| Food | 17338617 Knorr Tomato With Chicken Flavor Bouillon, 24ct (Pack of 36) | $68.76 | far above the same kind of item | $35.28 | comparable item: Knorr Tomato Bouillon With Chicken Flavor |
| Food | 42765662 3.5" Tomato, Pack Of 12. | $68.73 | far above the same kind of item | $29.08 | comparable item: Delallo Tomato Puree, 29 Oz (pack Of 12) |
| Food | 159459450 Deli Component 1000 Island Dressing | $68.57 | far above the same kind of item | $1.97 | comparable item: Kraft Thousand Island Dressing, 8 fl oz Bottle |
| Food | 148439145 Deli Component French Dressing | $68.10 | far above the same kind of item | $4.16 | comparable item: Margaritaville French Dressing, 14 oz |
| Food | 17769890 Kitchen Salsa, Papaya, 16 Oz. (pack Of 1 | $68.04 | far above the same kind of item | $8.47 | comparable item: Salsa Mango, 16 Oz (pack Of 12) |
| Food | 15171962805 Starbucks Brown Sugar Cinnamon, Hot or Iced Coffee, Flavored K-Cup Cof | $67.88 | far above the same kind of item | $5.19 | median price of the same kind of item |
| Food | 22389369 Absolutely Gluten Free Original Crackers | $67.54 | far above the same kind of item | $51.44 | comparable item: Absolutely Gluten-free Original Crackers |
| Food | 326781234 CHOMP by Nightingale, Salted Caramel Ice Cream Sandwiches, 4 Ice Cream | $67.34 | far above the same kind of item | $4.55 | median price of the same kind of item |
| Food | 17768262 Domino Sugar, 100ct (Pack of 12) | $67.20 | far above the same kind of item | $6.71 | median price of the same kind of item |
| Food | 54308852 Dell Alpe Giardiniera Relish Hot, 16 Oz | $67.16 | far above the same kind of item | $5.11 | comparable item: Dell Alpe Mild Giardiniera Relish 16 oz (Pack Of 1 |
| Food | 27617634 Paskesz Trios Fudge Filled Chocolate San | $67.00 | far above the same kind of item | $54.70 | comparable item: Generic Paskesz Trios Fudge Filled Chocolate San |
| Food | 17769602 Bragg Organic Hawaiian Dressing & Marina | $66.88 | far above the same kind of item | $43.92 | comparable item: Bragg Organic Braggberry Dressing & Mari |
| Food | 162284151 Deli Component Italian Dressing | $66.47 | far above the same kind of item | $8.27 | comparable item: Olive Garden Italian Dressing Family Size, 36 fl o |
| Food | 54308913 Duff Decorating Cake Mix Lemon Sublime, | $66.46 | far above the same kind of item | $4.43 | comparable item: Duff Goldman Duff Lemon Sublime Fridge Cake Mix |
| Food | 37182348 Generic Cracker Vintage Santa, 12 Pk (pack Of 6) | $66.26 | far above the same kind of item | $28.74 | comparable item: Digestives The Original Cracker, 14 oz (Pack of 6) |
| Food | 126203291 Kettle Brand Potato Chips, Sea Salt and Vinegar Kettle Chips, Snack Ba | $66.24 | far above the same kind of item | $0.70 | comparable item: Kettle Brand Sea Salt & Vinegar Potato Chips, 1.5  |
| Food | 55212057 Morton & Bassett Cumin Seed, 2 oz | $66.10 | far above the same kind of item | $7.04 | comparable item: Morton & Bassett Cumin Seed, 2 oz, (Pack of 3) |
| Food | 105697311 Deli Component Fat Free 1000 Island Dressing Ind | $65.98 | far above the same kind of item | $36.50 | comparable item: Deli Component Fat Free Ranch Dressing Ind |
| Food | 111998265 Deli Component Fat Free Italian Dressing Ind | $65.98 | far above the same kind of item | $36.50 | comparable item: Deli Component Fat Free Ranch Dressing Ind |
| Food | 164590302 Deli Component Bbq Sauce Dip | $65.98 | far above the same kind of item | $3.98 | comparable item: Kinder's Original BBQ Sauce, Dip, and Glaze, 15.5  |
| Food | 188976413 Deli Component Caesar Salad Dressing Cup | $65.98 | far above the same kind of item | $13.76 | comparable item: Cardini's Salad Dressing, Original Caesar, 32 Fl O |
| Food | 500913368 Jell-O Instant Sugar-Free Cheesecake Pudding & Pie Filling, 1 oz Box ( | $65.74 | far above the same kind of item | $3.91 | comparable item: Jell-O Instant Sugar-Free Fat-Free Chocolate Puddi |
| Food | 29472899 Roland Wild Forest Mushrooms In Jar, 6.5 | $65.66 | far above the same kind of item | $29.77 | comparable item: Roland Broken Straw Mushrooms, 15 Oz, (p |
| Food | 22557567 Consul Sardine Oval Tomato Sauce, 15 Oz, | $65.49 | far above the same kind of item | $3.09 | comparable item: Sauce Tomato Oval, 15 Oz (pack Of 24) |
| Food | 54308662 Carmelina E San Marzano Tomato Ital Whl | $65.28 | far above the same kind of item | $38.64 | comparable item: Carmelina E San Marzano Tomato Ital Chpd |
| Food | 153838676 Freshé Gourmet Canned Tuna Variety Pack (4 Pack of 4.25 oz. Tins) Cont | $64.77 | far above the same kind of item | $11.07 | median per-unit price of comparable items |
| Food | 17771016 La Comadre Corn Tortilla White, 26.25 Oz | $64.74 | far above the same kind of item | $2.43 | comparable item: HERDEZ 5.5 Inch White Corn Tortilla, 16 oz, 18 Cou |
| Food | 22389340 Bechtle Egg Noodles, Spaetzle, 17.6 Oz, | $64.71 | far above the same kind of item | $1.13 | comparable item: Bechtle Spaetzle (Traditional German Egg Noodles)  |
| Food | 388543883 Buenacho Jalapeno Flavored tortilla chips 5.7oz - tortillas de maiz co | $64.21 | far above the same kind of item | $6.79 | comparable item: Buenacho Jalapeno Flavored tortilla chips 5.7oz -  |
| Food | 13979452993 Red Bull Pink Edition Sugarfree Energy Drink, Wild Berries, 12 fl. oz. | $63.88 | far above the same item's other variants | $11.48 | comparable item: Red Bull Pink Edition Sugarfree Energy Drink, Wild |
| Food | 18020416445 Red Bull Summer Edition Sugarfree Energy Drink, Sudachi Lime, 12 fl. o | $63.88 | far above the same item's other variants | $11.48 | comparable item: Red Bull Summer Edition Sugarfree Energy Drink, Su |
| Food | 44014031 Sauce Tmo Oval Pica Pica, 15 Oz (pack O | $63.68 | far above the same kind of item | $12.15 | comparable item: La Sirena Sardines Pica Pica in Spicy Tomato Sauce |
| Food | 22172337 Spanish Cheese Collection | $63.29 | far above the same kind of item | $11.29 | comparable item: Tut's Spanish Cheese 1.25 lb |
| Food | 171991707 MEDIA NOCHE ROLLS | $63.00 | far above the same kind of item | $2.47 | comparable item: Freshness Guaranteed Media Noche Rolls, 18 oz, 6 C |
| Food | 27617600 American Gourmet Mini Butter Gourmet Pre | $62.00 | far above the same kind of item | $5.97 | median price of the same kind of item |
| Food | 17771026 Ole Mexican La Banderita Yellow Tortilla | $61.14 | far above the same kind of item | $39.73 | comparable item: La Banderita Whole Wheat Fajita Tortilla |
| Food | 22557572 Dal Raccolto Fusilli Pugliese Pasta, 17. | $60.98 | far above the same kind of item | $5.57 | median price of the same kind of item |
| Food | 900909309 Wilton Candy Melts Essentials Kit | $60.93 | far above the same kind of item | $6.40 | comparable item: Wilton Candy Melts, Black, 12 oz. |
| Food | 19475850 Dynasty Whole Peeled Straw Mushrooms, 15 | $60.73 | far above the same kind of item | $20.98 | comparable item: Tiger Tiger Whole Peeled Straw Mushrooms |
| Food | 29473312 Mid's Italian Sausage Pasta Sauce With P | $60.48 | far above the same kind of item | $4.18 | comparable item: Mid's Pasta Sauce: Italian Sausage w/Peppers Pasta |
| Food | 243840910 Jell-O Instant Sugar-Free Fat-Free Banana Pudding & Pie Filling 0.9 oz | $60.48 | far above the same kind of item | $3.52 | comparable item: Jell-O Instant Sugar-Free Fat-Free Chocolate Puddi |
| Food | 688430782 Jell-O Instant Sugar-Free Fat-Free Vanilla Pudding & Pie Filling 1 oz  | $60.48 | far above the same kind of item | $3.91 | comparable item: Jell-O Instant Sugar-Free Fat-Free Chocolate Puddi |
| Food | 919201525 Jell-O Instant Sugar-Free Fat-Free Chocolate Pudding & Pie Filling 1.3 | $60.48 | far above the same kind of item | $5.09 | comparable item: Jell-O Instant Sugar-Free Fat-Free Chocolate Puddi |
| Food | 19475826 Las Palmas Whole Mild Green Chiles, 27 O | $60.18 | far above the same kind of item | $4.48 | comparable item: Las Palmas Mild Whole Green Chiles, 27 oz Can |
| Food | 36483198 Imagine Organic Creamy Carrot Almond Sou | $60.00 | far above the same kind of item | $7.88 | median per-unit price of comparable items |
| Food | 347194971 Red Velvet Cupcake Kit | $60.00 | far above the same kind of item | $8.64 | comparable item: Betty Crocker Galaxy Cupcake Kit, 13.9 oz, 12 ct |
| Food | 12769310231 Campbell’s® Holiday Side Dishes Gift Box Set | $60.00 | far above the same kind of item | $2.76 | median price of the same kind of item |
| Food | 441148182 CHOMP by Nightingale, Chocolate Blackout Ice Cream Sandwiches, 4 Ice C | $59.99 | far above the same kind of item | $2.34 | comparable item: Purity Premium Chocolate Ice Cream, 12 Count |
| Food | 532911575 South Beach Diet Chicken Entrees Variety Pack, 10 Ct | $59.99 | far above the same kind of item | $44.99 | comparable item: South Beach Diet Soup Variety Pack 10CT |
| Food | 11150468928 Red Bull Winter Edition Sugarfree Energy Drink, Fuji Apple & Ginger, 1 | $59.98 | far above the same item's other variants | $13.60 | comparable item: Red Bull Winter Edition Sugarfree Energy Drink, Fu |
| Food | 24216793 Ener G Rice Pasta, Wheat Free Gluten Fre | $59.55 | far above the same kind of item | $19.78 | comparable item: Ener G Rice Bran Mix, Gluten Free Wheat |
| Food | 44013979 Bar 5ct Apple Crisp Whlgr, 6.15 Oz (pac | $59.47 | far above the same kind of item | $27.75 | comparable item: Bar Snk Gf Carml Apple, 5 Oz (pack Of 6 |
| Food | 17768464 Shotgun Willie's Texas Chili Seasoning, | $59.36 | far above the same kind of item | $15.96 | comparable item: Meat Church Texas Chili Seasoning |
| Food | 27617788 Roland Sardines In Tomato Sauce With Chi | $58.99 | far above the same kind of item | $2.40 | comparable item: Roland Sardines in Tomato Sauce, 7.5 oz |
| Food | 37182075 Generic Suzie's Vanilla Quinoamilk Beverage, 32 | $58.80 | far above the same kind of item | $5.70 | median price of the same kind of item |
| Food | 147280709 Borlotti Beans | $58.71 | far above the same kind of item | $0.74 | comparable item: Bartolini Italian Borlotti Beans - 17.6 Oz |
| Food | 200262709 Halo Top Pancakes & Waffles Light Ice Cream, 16 fl oz Pint | $58.50 | far above the same item's other variants | $3.88 | comparable item: Halo Top S'mores Light Ice Cream, 16 fl oz Pint |
| Food | 469789298 Halo Top Caramel Macchiato Light Ice Cream Pint, 16 fl oz | $58.50 | far above the same item's other variants | $3.88 | comparable item: Halo Top S'mores Light Ice Cream, 16 fl oz Pint |
| Food | 530475145 Halo Top Pumpkin Pie Light Ice Cream, 16 fl oz Pint | $58.50 | far above the same item's other variants | $3.88 | comparable item: Halo Top S'mores Light Ice Cream, 16 fl oz Pint |
| Food | 827552031 Halo Top Chocolate Covered Banana Light Ice Cream, 16 fl oz Pint | $58.50 | far above the same item's other variants | $4.48 | comparable item: Halo Top Chocolate Mocha Chip Light Ice Cream, 16  |
| Food | 860308848 Halo Top Cinnamon Roll Light Ice Cream, 16 fl oz Pint | $58.50 | far above the same item's other variants | $3.88 | comparable item: Halo Top S'mores Light Ice Cream, 16 fl oz Pint |
| Food | 19476540 Sonoma Dried Tomatoes, 3 oz (Pack of 12) | $58.07 | far above the same kind of item | $22.36 | comparable item: Racconto Sun-Dried Tomatoes, 6.5 oz, (Pack of 6) |
| Food | 24491551 JFC International Inc. Sushi Ginger, 11.5 fl oz, (Pack of 12) | $58.03 | far above the same kind of item | $45.80 | median per-unit price of comparable items |
| Food | 29472826 Roland Natural Sliced Pineapple In Juice | $57.60 | far above the same kind of item | $3.48 | comparable item: Hansen's Natural Pineapple Juice, 64 Fl. Oz. |
| Food | 22557324 Chili Man Chili No Beans, 15 Oz, (pack O | $57.26 | far above the same kind of item | $2.94 | comparable item: Jack Link's Original Chili, No Beans, 15oz Can |
| Food | 44014718 Bar Grnla Apple Cnnmn Om3, 5.3 Oz (pack | $57.26 | far above the same kind of item | $3.86 | median price of the same kind of item |
| Food | 129985997 Evol Chicken and Cheddar Burrito, Frozen Meal, 6 oz. | $57.02 | far above the same kind of item | $2.41 | comparable item: Evol Teriyaki Chicken Frozen Meal, 9 oz (Frozen) |
| Food | 174025447 Evol Cilantro Lime Chicken Burrito, Frozen Meal, 6 oz. | $57.02 | far above the same kind of item | $2.41 | comparable item: Evol Teriyaki Chicken Frozen Meal, 9 oz (Frozen) |
| Food | 47335285 Delallo Imported Italian Lasagna, 9 Oz, | $57.01 | far above the same kind of item | $49.00 | comparable item: Delallo 100% Organic Imported Italian Wh |
| Food | 5557024646 (1 pack) Bush's Original Baked Beans, Canned Beans, 117 oz Can | $56.83 | far above the same item's other variants | $9.97 | comparable item: Bush's Original Baked Beans, Canned Beans, 117 oz  |
| Food | 37181989 Generic Tuna Salad Ylwfin W Veg, 5 Oz (pack Of 2 | $56.64 | far above the same kind of item | $4.04 | comparable item: Dolores Tuna Salad Ylwfin W Veg,5Oz (Pack Of 24) |
| Food | 31222485 Yamabuki Sushi Nori Dspbx Sht, 10PC (Pack of 12) | $55.96 | far above the same kind of item | $5.98 | median price of its category |
| Food | 100559019 Dawn Carrot Cake Mix | $55.88 | far above the same kind of item | $7.29 | comparable item: Manischewitz Cake Mix, Carrot, 11 Oz |
| Food | 17771040 La Fuerza Flour Tortilla 8 Inch , 17 Oz. | $55.74 | far above the same kind of item | $2.32 | median per-unit price of comparable items |
| Food | 17768646 Sweet Baby Ray's Original Barbecue Sauce | $55.20 | far above the same kind of item | $8.94 | comparable item: Sweet Baby Ray's Original Barbecue Sauce, 40 oz (P |
| Food | 906553291 Jell-O Peach Sugar Free Gelatin Mix, 0.3 oz Box (Pack of 6) | $55.19 | far above the same kind of item | $6.72 | comparable item: Great Value Sugar Free Peach Gelatin Dessert, 0.3  |
| Food | 195517265 Campbell Macaroni & Cheese | $55.03 | far above the same kind of item | $3.56 | comparable item: Kraft Macaroni & Cheese Original, 4.1 oz |
| Food | 202741285 Lamb Weston Potato 5/16 Crispy Coated | $54.98 | far above the same kind of item | $4.44 | median price of the same kind of item |
| Food | 374260687 Walmart Deli Mac & Cheese | $54.97 | far above the same kind of item | $5.00 | comparable item: Walmart Deli Mac & Cheese |
| Food | 37181846 Generic Zatarain's Crispy Southern Chicken Fryin | $54.70 | far above the same kind of item | $4.65 | comparable item: Zatarain's Crispy Southern Chicken Breading Mix, 1 |
| Food | 55292830 Augason Farms Potato Variety Kit, 6 pc | $54.52 | far above the same kind of item | $4.44 | median price of the same kind of item |
| Food | 54308663 California Organic Evaporated Milk, 12 oz, (Pack of 12) | $54.30 | far above the same kind of item | $62.16 | comparable item: California Farms Organic Evaporated Milk, 12 Oz |
| Food | 18086815033 Red Bull Summer Edition Energy Drink, Sudachi Lime, 12 fl. oz., 6 x 4  | $54.04 | far above the same item's other variants | $11.48 | comparable item: Red Bull Summer Edition Energy Drink, Sudachi Lime |
| Food | 54309295 La Tortilla Factory Tortilla Ivory Teff (Pack of 10) 6 wraps per bag | $53.95 | far above the same kind of item | $4.05 | median price of the same kind of item |
| Food | 250267607 4505 Cracklins, Chili & Lime, 3 Oz, Pack Of 12 | $53.93 | far above the same kind of item | $118.20 | comparable item: 4505 Chili And Lime Cracklins, 3 Oz. |
| Food | 17196729 Aloha Maid Natural Lilikoi Passion Juice Drink, 6ct (Pack of 4) | $53.80 | far above the same kind of item | $47.94 | comparable item: Aloha Maid Natural Guava Nectar Juice Drinks, 6ct  |
| Food | 19475638 La Preferida Authentic Refried Beans, 7 | $53.76 | far above the same kind of item | $17.83 | comparable item: La Costena Refried Black Beans, 14 Oz (p |
| Food | 15548011362 Wonderful Pistachios, No Shells Roasted & Salted Nuts, 12 Ounce Bag | $53.73 | far below comparable items | $10.75 | comparable item: Wonderful Pistachios, No Shells Roasted & Salted N |
| Food | 21089969 A-grosik Polish Dill Pickles, 30 Fl Oz, | $53.51 | far above the same kind of item | $8.30 | comparable item: Krakus Polish Dill Pickles 30 fl oz |
| Food | 29472902 Rokeach Mushroom Tomato Sauce, Low Salt, | $53.49 | far above the same kind of item | $26.71 | comparable item: Gefen Tomato Sauce, No Salt, 15 Oz, (pac |
| Food | 175697260 Welch’s Antioxidant Fruit Blend, 12 oz., (8-Pack) | $53.04 | far above the same kind of item | $45.87 | comparable item: Welch?s Strawberry Blueberry Blend, 12 oz., (8-Pac |
| Food | 23810151 Maggi Jager Schnitzel Seasoning Mix, 1.0 | $52.80 | far above the same kind of item | $2.84 | median price of the same kind of item |
| Food | 54065314 Nestle Carnation Evaporated Fat Free Milk, vitamins A and D added, 12  | $52.80 | far above the same kind of item | $1.99 | comparable item: CARNATION Fat Free Evaporated Milk 5 fl. oz. Can |
| Food | 36483256 Jovial Brown Rice Pasta Spaghetti, 12 Oz | $52.29 | far above the same kind of item | $4.79 | comparable item: Tinkyada, Pasta Brown Rice Spaghetti, 16 oz |
| Food | 17768644 Mississippi Barbecue Sauce Original Bbq | $52.11 | far above the same kind of item | $0.74 | comparable item: Marketside BBQ Sauce, 2 oz |
| Food | 21667944 Glicks Cooking Spray, | $52.11 | far above the same kind of item | $7.06 | comparable item: Pam Original Cooking Spray, 8 oz (Pack of 2) |
| Food | 21091254 SCHAR, PASTA,SPAGHETTI,GF 12 OZ | $52.00 | far above the same kind of item | $1.16 | comparable item: Skinner 12 oz Spaghetti Pasta |
| Food | 44014818 Stagg White Chili Chicken W Bn, 15 Oz ( | $51.86 | far above the same kind of item | $3.78 | comparable item: Steak N Shake White Chicken Chili with Beans |
| Food | 340940994 Native Forest Organic Simple Coconut Milk | $51.85 | far above the same kind of item | $3.12 | comparable item: Native Forest Organic Unsweetened Coconut Milk |
| Food | 343951371 Nature's Touch Organic Power Fruit Blend, 10 oz., (8-Pack) | $51.82 | far above the same kind of item | $47.39 | comparable item: Nature's Touch Organic Berry Cherry Blend, 10 oz., |
| Food | 17340960 Milnot Original Evaporated Milk, 12 oz (Pack of 24) | $51.77 | far above the same kind of item | $107.05 | comparable item: La Cremosa Evaporated Milk, 12 oz |
| Food | 21090916 Lucini Italia Tuscan Fiery Chili Cinque | $51.09 | far above the same kind of item | $4.02 | median price of the same kind of item |
| Food | 19475533 Mam Papaul's Red Velvet Cake & Frosting | $50.57 | far above the same kind of item | $2.96 | comparable item: Duncan Hines Cake & Frosting Mix Red Velvet Cupcak |
| Food | 17236442 Russa Pappardelle Egg Nest, 8.8 oz. (Pack of 12) | $50.40 | far above the same kind of item | $26.05 | median per-unit price of comparable items |
| Food | 938060035 Velveeta Shells and Cheese with Bacon Meal (10.3 oz Boxes, Pack of 12) | $50.25 | far above the same kind of item | $83.12 | comparable item: Velveeta Original Shells & Cheese, 12 oz Box (Pack |
| Food | 47225915 Maruchan Ramen Noodle Soup, Beef, 2.25 oz, 6 Ct (5 Packs) | $50.00 | far above the same kind of item | $37.50 | comparable item: Maruchan Ramen Noodle Soup, Beef, 3 oz (5 Packs) |
| Food | 47228045 Armour Vienna Sausage, Barbecue, 4.6 Oz, 6 Ct (Pack of 4) | $50.00 | far above the same kind of item | $3.92 | comparable item: Armour Original Vienna Sausage, 4.6 oz Can |
| Food | 47228047 Armour Vienna Sausage Original - 6 CT (Pack of 4) | $50.00 | far above the same kind of item | $1.27 | median price of the same kind of item |
| Food | 127922603 Dawn Angel Cake Mix | $49.97 | far above the same kind of item | $39.72 | comparable item: Kinnikinnick Foods Angel Food Cake Mix, 15.9 oz, ( |
| Food | 5332753575 Red Bull Green Edition Energy Drink, Curuba Elderflower, 12 fl. oz., 6 | $49.97 | far above the same item's other variants | $11.52 | comparable item: Red Bull Green Edition Energy Drink, Curuba Elderf |
| Food | 2476279553 POP Foodies Hostess 4 pack (Cupcakes/ Ding Dongs/ HoHos/ Twinkies) | $49.95 | far above the same kind of item | $3.48 | median price of the same kind of item |
| Food | 47335320 Heinz Curry Canned Beans, 13.7 oz | $49.61 | far above the same kind of item | $1.17 | comparable item: Ranch Style Beans, Canned Beans, 26 oz. |
| Food | 488003500 Love Good Fats Keto Friendly Peanut Butter Chocolatey Snack Bar, 1.38  | $49.39 | far below comparable items | $5.70 | comparable item: Love Good Fats Keto Friendly Plantbased Snack Bars |
| Food | 27617702 Quaker Masa Harina De Maiz Corn Tortilla | $49.09 | far above the same kind of item | $4.05 | median price of the same kind of item |
| Food | 17338544 Campbell's Oyster Stew Condensed Soup, 10.5 oz (Pack of 12) | $47.88 | far above the same item's other variants | $2.92 | comparable item: (6 Cans) Campbell's Condensed Vegetable Soup, 10.5 |
| Food | 17768453 Six Gun Ol' Hired Hand Original Chili, 4 | $47.71 | far above the same kind of item | $4.02 | median price of the same kind of item |
| Food | 24491498 Nature's Path Organic Frosted Chocolate Toaster Pastries, 6 ct (Pack o | $47.66 | far above the same kind of item | $29.20 | median per-unit price of comparable items |
| Food | 24491520 Maggi Sauerbraten Seasoning Mix, 1.62 Oz | $47.43 | far above the same kind of item | $1.52 | comparable item: Lawry's Chili Seasoning Mix, 1.48 Oz (p |
| Food | 485492093 Cast Iron Chili Mac | $47.05 | far above the same kind of item | $6.03 | comparable item: COMPLEATS CHILI MAC 7.5 oz |
| Food | 47913125 Silver Gelatin Sheets - Avg. 350-400 Sheets/box | $47.00 | far above the same kind of item | $1.92 | median price of the same kind of item |
| Food | 19475881 Sun Luck Stir Fry Mixed Vegetables, 10 O | $46.91 | far above the same kind of item | $15.60 | comparable item: Ka Me Mixed Stir-Fry Vegetables, 15 oz, (Pack of 6 |
| Food | 749684676 4505 Meats Chicharrones BBQ Seasoned Fried Pork Rinds 1.1 oz | $46.55 | far above the same kind of item | $1.71 | comparable item: 4505 Chicharrones Fried Pork Rinds, Smokehouse Bbq |
| Food | 580261146 Phillips Pasteurized Canned Lump Crab Meat, 16 oz. | $45.88 | far above the same kind of item | $4.01 | comparable item: Fortune Brand Canned Crab Meat, 6 Oz, 24 Ct |
| Food | 46264997 Duff Purple Rain Cake Mix 18.25 oz | $45.74 | far above the same kind of item | $3.28 | comparable item: Buff Goldman Purple Rain Premium Cake Mix, 18.25 o |
| Food | 19475675 Westbrae Natural Organic Black Beans, 25 | $45.60 | far above the same kind of item | $36.34 | comparable item: Westbrae Natural Garbanzo Beans, 25 Oz ( |
| Food | 23809921 Annie's Homegrown Sour Cream & Onion Che | $45.47 | far above the same kind of item | $6.17 | comparable item: Like Air Puffcorn Sour Cream & Onion Flavor 4oz Ba |
| Food | 15518950772 Mt. Olive Sweet Gherkin Pickles - 16 fl oz jar | $45.37 | far above the same item's other variants | $3.78 | comparable item: Mt. Olive Sweet Gherkin Pickles - 16 fl oz jar |
| Food | 19475912 Allens Medium Green Lima Beans, 15.25 Oz | $45.36 | far above the same kind of item | $1.59 | comparable item: The Allens Green White Lima Beans, 15.25 oz (Pack  |
| Food | 22389302 Arrowhead Mills Stuffing Mix Herb Organi | $45.08 | far above the same kind of item | $3.15 | comparable item: Arrowhead Mills Organic Savory Herb Stuffing Mix,  |
| Food | 54308874 Dollop Gourmet Frosting Peanutbutter Coo | $44.96 | far above the same kind of item | $4.07 | median price of the same kind of item |
| Food | 54308875 Dollop Gourmet Frosting Vanilla Madagasc | $44.96 | far above the same kind of item | $31.96 | comparable item: Stewarts French Vanilla Gourmet Flavorin |
| Food | 24216781 La Comadre Flour Tortilla 8 Inch , 15 Oz | $44.91 | far above the same kind of item | $2.05 | median per-unit price of comparable items |
| Food | 7775851618 Red Bull Iced Edition Sugarfree Energy Drink, Iced Vanilla Berry, 12 f | $44.72 | far above the same item's other variants | $11.48 | comparable item: Red Bull Iced Edition Sugarfree Energy Drink, Iced |
| Food | 11135423861 Red Bull Peach Edition Sugarfree Energy Drink, White Peach, 12 fl. oz. | $44.72 | far above the same item's other variants | $11.48 | comparable item: Red Bull Peach Edition Sugarfree Energy Drink, Whi |
| Food | 13940622412 Red Bull Sea Blue Edition Sugarfree Energy Drink, Juneberry, 12 fl. oz | $44.72 | far above the same item's other variants | $11.48 | comparable item: Red Bull Sea Blue Edition Sugarfree Energy Drink,  |
| Food | 13940672209 Red Bull Apple Edition Energy Drink, Fuji Apple & Ginger, 12 fl. oz.,  | $44.72 | far above the same item's other variants | $11.48 | comparable item: Red Bull Apple Edition Energy Drink, Fuji Apple &  |
| Food | 18093052496 Red Bull Spring Edition Sugarfree Energy Drink, Cherry Sakura, 12 fl.  | $44.72 | far above the same item's other variants | $12.55 | comparable item: Red Bull Spring Edition Sugarfree Energy Drink, Ch |
| Food | 19475903 The Allens Seasoned Turnip Greens, 14 Oz | $44.68 | far above the same kind of item | $1.08 | comparable item: Allens Seasoned Turnip Greens, 14 Oz |
| Food | 31222576 Bush's Best Great Northern Beans, 110 oz, (Pack of 6) | $44.66 | far above the same kind of item | $99.00 | comparable item: Bush's Best Pinto and Great Northern Mixed Beans 1 |
| Food | 55212003 Hatch Mild Red Enchilada Sauce, 15 oz | $44.54 | far above the same kind of item | $2.26 | comparable item: Old El Paso Red Enchilada Sauce, Mild, 14 Oz |
| Food | 11988942 Dunkin’ Midnight Dark Roast Ground Coffee, 11 oz Bag | $44.35 | far above the same item's other variants | $8.33 | comparable item: Dunkin’ Midnight Dark Roast Ground Coffee, 16.5 oz |
| Food | 156382364 Dunkin’ S’mores Artificially Flavored Ground Coffee, 11 oz Bag | $44.35 | far above the same item's other variants | $17.34 | comparable item: Dunkin’ Gingerbread Artificially Flavored Coffee,  |
| Food | 339421819 Dunkin’ Chocolate Covered Strawberry Ground Coffee, 11 oz bag | $44.35 | far above the same item's other variants | $16.49 | comparable item: Dunkin’ Cold Ground Coffee, 10 oz Bag |
| Food | 612781826 Dunkin’ Bold Blend Dark Roast Ground Coffee, 11 oz Bag | $44.35 | far above the same item's other variants | $8.22 | comparable item: Dunkin’ Original Blend Medium Roast Ground Coffee, |
| Food | 696843492 Dunkin’ Caramel Nut Fudge Artificially Flavored Ground Coffee, 11 oz B | $44.35 | far above the same item's other variants | $17.34 | comparable item: Dunkin’ Gingerbread Artificially Flavored Coffee,  |
| Food | 1658828244 Dunkin Holiday Blend Ground Coffee, 11 oz. bag | $44.35 | far above the same item's other variants | $11.20 | comparable item: Coffee - Holiday Blend - Ground - 12oz. |
| Food | 17065118934 Dunkin’ Turtle Love Ground Coffee, 11 oz Bag | $44.35 | far above the same item's other variants | $16.49 | comparable item: Dunkin’ Cold Ground Coffee, 10 oz Bag |
| Food | 19322169566 Dunkin’ Pistachio Artificially Flavored Ground Coffee, 11-oz. Bag | $44.35 | far above the same item's other variants | $17.34 | comparable item: Dunkin’ Gingerbread Artificially Flavored Coffee,  |
| Food | 1834195479 Campbell's Chunky Classic Chicken Noodle Soup - 15.25 Fl Oz - 8 / Cart | $44.25 | far above the same kind of item | $6.76 | comparable item: Campbells Condensed Campbells Chicken Noodle Famil |
| Food | 408527686 Annie's Homegrown Microwavable Gluten-Free Mac & Cheese With Real Aged | $43.89 | far above the same kind of item | $2.19 | comparable item: Annie's Real Aged Cheddar Microwave Mac & Cheese w |
| Food | 24182439 Nature's Path Organic Frosted Strawberry Toaster Pastries, 6 Ct | $43.56 | far above the same kind of item | $4.35 | comparable item: Nature's Path Organic Toaster Pastries, Frosted Wi |
| Food | 54309123 Imagine Gravy Turkey Roasetd Organic, 13 | $42.99 | far above the same kind of item | $34.31 | comparable item: Pacific Organic Turkey Gravy, 13.9 oz, (Pack of 12 |
| Food | 19475711 Eden No Salt Added White Kidney Beans, 1 | $41.52 | far above the same kind of item | $2.77 | median price of the same kind of item |
| Food | 185053584 OliveNation Gourmet Madagascar Vanilla Beans, 10 Beans | $41.45 | far above the same kind of item | $3.59 | median price of the same kind of item |
| Food | 5340366769 Red Bull Iced Edition Energy Drink, Iced Vanilla Berry, 12 fl. oz., 6  | $40.97 | far above the same item's other variants | $8.33 | comparable item: Red Bull Iced Edition Energy Drink, Iced Vanilla B |
| Food | 13965424934 Red Bull Pink Edition Energy Drink, Wild Berries, 12 fl. oz., 6 x 4 Ca | $40.97 | far above the same item's other variants | $11.48 | comparable item: Red Bull Pink Edition Energy Drink, Wild Berries,  |
| Food | 13982958010 Red Bull Peach Edition Energy Drink, White Peach, 12 fl. oz., 6 x 4 Ca | $40.97 | far above the same item's other variants | $11.48 | comparable item: Red Bull Peach Edition Energy Drink, White Peach,  |
| Food | 18098318148 Red Bull Spring Edition Energy Drink, Cherry Sakura, 12 fl. oz., 6 x 4 | $40.97 | far above the same item's other variants | $13.84 | comparable item: Red Bull Spring Edition Energy Drink, Cherry Sakur |
| Food | 21090386 Etnia Merquen Smoked Chili Seasoning, 1 oz, (Pack of 6) | $40.37 | far above the same kind of item | $6.96 | comparable item: Williams Seasoning - Chili, 1 oz. |
| Food | 24491515 Maggi Hackbraten Seasoning Mix, 3.11 Oz, | $40.33 | far above the same kind of item | $17.45 | comparable item: Maggi Sofrito Seasoning Paste, 2.82 Oz, |
| Food | 49909677 Lay's Kettle Cooked 40% Less Fat Cream Cheese & Chive Potato Chips, 8  | $40.02 | far above the same item's other variants | $7.20 | comparable item: Lay's 40% Less Fat Original Kettle Cooked Potato C |
| Food | 33652949 Plum Kids Organic Yo' Drops Berry Blast Crunchable Yogurt, 1.25 oz, (P | $40.00 | far above the same kind of item | $3.53 | median per-unit price of comparable items |
| Food | 52715119 Peas - Early Alaska Seed Packet - Collec | $39.99 | far above the same kind of item | $3.84 | median price of the same kind of item |
| Food | 239281632 Personalized Birthday Countdown Candle | $39.99 | far above the same kind of item | $3.92 | median price of the same kind of item |
| Food | 1095516270 ReadyWise Simple Kitchen Mashed Potatoes 45 Serving Can | $39.99 | far above the same kind of item | $2.38 | median price of the same kind of item |
| Food | 22001483 Augason Farms Freeze Dried Peas Can, Emergency Food Supply, Everyday M | $39.95 | far above the same kind of item | $8.50 | median per-unit price of comparable items |
| Food | 17769435 Walden Farms French Dressing, 12 Oz (pac | $39.59 | far above the same item's other variants | $3.71 | comparable item: Girard's Original French Dressing, 12 oz (Pack of  |
| Food | 194897122 Jell-O Raspberry Sugar Free Gelatin Mix 0.3 oz Box (Pack of 6) | $39.32 | far above the same kind of item | $5.76 | comparable item: Jell-O Raspberry Zero Sugar Gelatin Dessert Mix, F |
| Food | 293059544 Jell-O Lime Sugar Free Gelatin Mix 0.3 oz Box (Pack of 6) | $39.32 | far above the same kind of item | $4.59 | comparable item: Jell-O Lime Instant Gelatin Mix, 3 oz Box (Pack of |
| Food | 408640557 Jell-O Black Cherry Sugar Free Gelatin Mix, 0.3 oz Box (Pack of 6) | $39.32 | far above the same kind of item | $6.72 | comparable item: Great Value Sugar Free Black Cherry Gelatin Desser |
| Food | 617362778 Jell-O Lemon Sugar Free Gelatin Mix 0.3 oz Box (Pack of 6) | $39.32 | far above the same kind of item | $8.88 | comparable item: Jell-O Lemon Zero Sugar Gelatin Dessert Mix, 0.3 o |
| Food | 151546902 Miltons, Chips Gf Green Chli Salsa, 5.5 Oz (Pack Of 12) | $39.24 | far above the same kind of item | $18.45 | median per-unit price of comparable items |
| Food | 14588809 Gatorade Frost Thirst Quencher Riptide Rush Sports Drink, 20 fl oz, 1  | $38.99 | far above the same item's other variants | $5.70 | comparable item: Gatorade Thirst Quencher Frost Sports Drink, Ripti |
| Food | 5332753573 Red Bull Red Edition Sugarfree Energy Drink, Watermelon, 80mg Caffeine | $38.98 | far above the same item's other variants | $2.86 | comparable item: Red Bull Red Edition Sugarfree Energy Drink, Water |
| Food | 17768421 Golden Dipt Extra Crispy Chicken Fry Mix, 8 oz (Pack of 8) | $38.80 | far above the same kind of item | $44.74 | comparable item: McCormick GOLDEN DIPT Seafood Fry Mix, 10.0 oz Box |
| Food | 19476091 Muir Glen Fire-roasted Diced Tomatoes, 2 | $38.68 | far above the same kind of item | $7.03 | comparable item: Muir Glen Organic Tomatoes, Diced, Fire Roasted, 2 |
| Food | 35902758 Lay's Kettle Cooked 40% Less Fat Jalapeno Cheddar Potato Chips, 8 Oz. | $38.51 | far above the same item's other variants | $7.20 | comparable item: Lay's 40% Less Fat Original Kettle Cooked Potato C |
| Food | 33655610 Lynnae's Gourmet Pickles Hot Mama Chips, 16 oz, (Pack of 6) | $38.38 | far above the same kind of item | $34.20 | comparable item: Lynnae's Gourmet Pickles Hot Mama Pickle Spears, 1 |
| Food | 19476537 Carmelina Italian Cannellini Beans, 14.2 | $38.16 | far above the same kind of item | $20.47 | comparable item: Beans, Cannellini, 15.5 Oz. (pack Of 12) |
| Food | 535781005 Purely Elizabeth Banana Nut Butter Grain-Free Granola, 8 oz | $37.76 | far above the same item's other variants | $9.43 | comparable item: Purely Elizabeth Grain-Free Nut Granola, Banana Nu |
| Food | 29472723 Sable & Rosenfeld Mediterranean Olive Bruschetta Gluten-Free Sandwich  | $37.61 | far above the same kind of item | $3.43 | median price of the same kind of item |
| Food | 608580319 McCormick Golden Dipt Fry Easy Seasoned Chicken Fry Mix, Original Home | $37.05 | far above the same kind of item | $67.10 | comparable item: McCormick GOLDEN DIPT Seafood Fry Mix, 10.0 oz Box |
| Food | 22389157 Better Than Bouillon Vegan Base, No Beef | $36.85 | far above the same item's other variants | $0.83 | comparable item: Better than Bouillon Organic Beef Base, 8 oz |
| Food | 15559413729 Maxwell House Original Roast Ground Coffee, 10.3 oz Canister, Medium | $36.85 | far above the same item's other variants | $6.14 | comparable item: Maxwell House Original Roast Ground Coffee, 10.3 o |
| Food | 149522222 Deli Component Tomato Sauce | $36.84 | far above the same kind of item | $0.73 | comparable item: Del Monte Tomato Sauce, 8 oz Can |
| Food | 54309021 Glory Foods String Beans, 27 Oz (pack Of | $36.54 | far above the same kind of item | $1.98 | comparable item: Glory Foods Seasoned Country Style String Beans, 2 |
| Food | 17338393 Campbell's Won Ton Soup, 10.5 oz (Pack of 12) | $36.48 | far above the same item's other variants | $2.76 | median price of the same kind of item |
| Food | 19476064 Westbrae Natural Fresh Cut Green Beans, | $35.88 | far above the same kind of item | $3.32 | median price of the same kind of item |
| Food | 29472974 PET EVAPORATED MILK 12 OZ (Pack Of 4) | $35.52 | far above the same kind of item | $14.21 | comparable item: PET Evaporated Milk, 5 oz |
| Food | 102944712 Nestle Carnation Vitamin D Added Evaporated Milk, 97 fl oz, 96 Serving | $35.20 | far above the same kind of item | $25.61 | comparable item: Nestle Carnation Evaporated Milk, Vitamin D Added, |
| Food | 24491558 Cento Sliced Pimientos, 4 Oz, (pack Of 1 | $35.12 | far above the same kind of item | $1.83 | comparable item: Dromedary Sliced Pimientos, 4 oz |
| Food | 17769440 Walden Farms Asian Calorie-free Dressing | $34.95 | far above the same item's other variants | $4.12 | comparable item: Walden Farms Calorie-Free Russian Dressing, 12 oz  |
| Food | 17339800 Santini Evaporated Milk, 12 oz. (Pack of 24) | $34.77 | far above the same kind of item | $107.05 | comparable item: La Cremosa Evaporated Milk, 12 oz |
| Food | 700286875 Black & White Evaporated Milk, Extra Creamy, 13 Fl Oz, 24 Ct | $34.75 | far above the same kind of item | $1.38 | comparable item: Suiza Creamy Evaporated Milk, 12 Fl Oz Can |
| Food | 19864159146 Deli Component Whole Kernel Corn | $34.73 | far above the same kind of item | $12.44 | comparable item: Deli Component Whole Kernel Corn |
| Food | 21091569 Walnut Acres Maple & Onion Baked Beans, | $34.68 | far above the same kind of item | $18.10 | comparable item: Walnut Acres Baked Beans, 15 Oz (pack Of |
| Food | 17338395 Campbell's Old Fashioned Vegetable Soup, 10.5 oz (Pack of 12) | $33.48 | far above the same item's other variants | $23.76 | comparable item: Campbell's Condensed Old Fashioned Vegetable Soup, |
| Food | 17338565 Campbell's Beef Consomme Condensed Soup, 10.5 oz (Pack of 12) | $33.48 | far above the same item's other variants | $23.76 | comparable item: Campbell's Condensed Beef Consomme Soup, 10.5 oz C |
| Food | 19475970 Delallo Diced Tomatoes With Basil In Hea | $33.48 | far above the same kind of item | $14.92 | comparable item: Diced Tomatoes & Jalapenos, 10 Oz (pack |
| Food | 21667991 La Feria Del Sabor White Corn Tortillas, | $33.45 | far above the same kind of item | $26.57 | comparable item: La Feria Del Sabor White Corn Tortillas, |
| Food | 647568720 Contadina Tomatoes Tomato Paste, 6 Oz | $33.39 | far above the same kind of item | $0.99 | comparable item: Contadina Canned Tomatoes Canned Tomato Paste, 12  |
| Food | 54065316 Nestle Carnation Evaporated Milk, Gluten-Free, 2 Tbsp. (30mL) per Serv | $33.12 | far above the same kind of item | $48.50 | comparable item: CARNATION Fat Free Evaporated Milk 5 fl. oz. Can |
| Food | 19475712 Eden Baked Beans With Sweet Sorghum, 15 | $32.97 | far above the same kind of item | $2.99 | comparable item: Eden Organic Sweet Sorghum Baked Beans, 15 Oz. |
| Food | 55555718 Campbell's Chunky Soup, Microwavable Bow | $32.38 | far above the same kind of item | $2.58 | comparable item: Campbell's Chunky Microwavable Soup, Hearty Cheese |
| Food | 19475893 The Allens Blackeye Peas With Bacon, 15. | $32.32 | far above the same kind of item | $2.96 | median price of the same kind of item |
| Food | 15553607062 mio Lemonade Naturally Flavored with other natural flavor Liquid Water | $32.18 | far above the same item's other variants | $4.02 | comparable item: mio Lemonade Naturally Flavored with other natural |
| Food | 144496242 Ken's Steak House S | $31.94 | far above the same item's other variants | $4.97 | median per-unit price of comparable items |
| Food | 55555719 Campbell's Chunky Soup, Microwavable Bow | $31.48 | far above the same item's other variants | $2.58 | comparable item: Campbell's Chunky Microwavable Soup, Hearty Cheese |
| Food | 55555721 Campbell's Chunky Soup, Microwavable Bow | $31.48 | far above the same kind of item | $2.58 | comparable item: Campbell's Chunky Microwavable Soup, Hearty Cheese |
| Food | 187337610 A.G. Ferrari Seasoning Mix, Truffle Salt, 4 Oz | $31.48 | far above the same kind of item | $9.29 | comparable item: A.G. Ferrari Seasoning Mix, Tuscan Salt, 6 Oz |
| Food | 19475916 Grandma Maud's Bean Meals Blackeyed Peas | $31.08 | far above the same kind of item | $28.28 | comparable item: The Allens Blackeyed Peas, 15.5 Oz (pack |
| Food | 19476560 Hunt's No Salt Added Tomato Paste, 6 Oz | $30.96 | far above the same kind of item | $0.68 | comparable item: Hunt's Tomato Paste No Salt Added, 6 oz |
| Food | 54137703 Velveeta Shells & Cheese Jumbo Shell Pasta & Cheese Sauce Meal, 10.1 O | $30.71 | far above the same kind of item | $18.76 | comparable item: Velveeta Shells Pasta & Cheese Sauce, 2.39 oz Cups |
| Food | 527697906 Lipton Tropical Flavor Iced Tea, 16.9 fl oz, 12 Pack Bottles | $30.70 | far above the same item's other variants | $4.99 | comparable item: Lipton Iced Tea Herbal Orange Blossom Flavor 16.9  |
| Food | 19475972 Eden Diced Tomatoes With Sweet Basil, 14 | $30.17 | far above the same kind of item | $7.83 | comparable item: S&w Diced Tomatoes 102oz |
| Food | 55555717 Campbell's Chunky Soup, Microwavable Bow | $30.14 | far above the same item's other variants | $2.58 | comparable item: Campbell's Chunky Microwavable Soup, Hearty Cheese |
| Food | 29472979 Patak's Tikka Masala Cooking Sauce, 15 O | $30.12 | far above the same item's other variants | $6.92 | comparable item: Sharwood's Tikka Masala Cooking Sauce, 14.1 oz (Pa |
| Food | 29472688 Seasons Club Sardines In Oil, 4.375 Oz, | $29.99 | far above the same kind of item | $1.63 | comparable item: Season Sardines in Sunflower Oil, 4.375 Oz (Pack o |
| Food | 745247914 (Pack of 2) Peeps, Chick Party Easter Candy Pack, 60 Ct | $29.94 | far above the same kind of item | $16.26 | comparable item: PEEPS Chick Party Pack, 60 Chicks |
| Food | 120821474 Mott's Mighty Honeycrisp Apple Applesauce, 3.2 oz, 48 Count Clear Pouc | $29.88 | far above the same item's other variants | $31.88 | comparable item: Mott's Mighty Applesauce Variety Pack, 3.2 oz, 48  |
| Food | 194127697 Mott's No Sugar Added Strawberry Applesauce, 3.2 oz, 48 Count Clear Po | $29.88 | far above the same item's other variants | $9.92 | comparable item: Mott's No Sugar Added Strawberry Applesauce, 3.2 o |
| Food | 241011961 Mott's Applesauce, 3.2 oz, 48 Count Clear Pouches (4 Packs of 12) | $29.88 | far above the same item's other variants | $9.92 | comparable item: Mott's Cinnamon Applesauce, 3.2 oz, 24 Count Clear |
| Food | 527720223 Mott's Strawberry Applesauce, 3.2 oz, 48 Count Clear Pouches (4 Packs  | $29.88 | far above the same item's other variants | $9.92 | comparable item: Mott's Cinnamon Applesauce, 3.2 oz, 24 Count Clear |
| Food | 589788099 Mott's Cinnamon Applesauce, 3.2 oz, 48 Count Clear Pouches (4 Packs of | $29.88 | far above the same item's other variants | $9.92 | comparable item: Mott's Cinnamon Applesauce, 3.2 oz, 24 Count Clear |
| Food | 700502377 Mott's No Sugar Added Applesauce, 3.2 oz, 48 Count Clear Pouches (4 Pa | $29.88 | far above the same item's other variants | $9.92 | comparable item: Mott's No Sugar Added Strawberry Applesauce, 3.2 o |
| Food | 700579787 Mott's No Sugar Added Mixed Berry Applesauce, 3.2 oz, 48 Count Clear P | $29.88 | far above the same item's other variants | $5.67 | comparable item: Mott's No Sugar Added Mixed Berry Applesauce, 3.2  |
| Food | 15177360223 Mott's Mighty Strawberry Peach Applesauce, 3.2 oz, 48 Count Clear Pouc | $29.88 | far above the same item's other variants | $2.32 | comparable item: Mott's Mighty Strawberry Peach Applesauce, 3.2 oz, |
| Food | 17769434 Walden Farms Caesar Dressing, 12 Oz (pac | $29.43 | far above the same item's other variants | $31.55 | comparable item: Newman's Own Caesar Dressing, 16 Oz (pac |
| Food | 21096119 Lipton Tea & Honey Peach Apricot Iced Tea, 16.9 fl oz, 12 count | $29.41 | far above the same item's other variants | $9.41 | comparable item: Lipton Peach Iced Tea, 16.9 fl oz, 12 pack (Pack o |
| Food | 37181977 Generic D'gari Pineapple Gelatin Dessert, 5 Oz, | $29.21 | far above the same kind of item | $1.04 | comparable item: D'gari Pineapple Gelatin Dessert, 6 oz (Pack of 24 |
| Food | 708270617 Sun Maid California Golden Raisins (1 Ounce), 6 Count Boxes | $29.04 | far above the same item's other variants | $6.05 | comparable item: Sun-Maid California Golden Raisins, 1 Oz., 6 Count |
| Food | 23809851 La Preferida Spanish Pimientos, 7.5 Oz, | $28.80 | far above the same kind of item | $18.74 | comparable item: La Preferida Medium Verde Salsa, 16.4 Oz |
| Food | 19475978 Ro*tel Diced Tomatoes With Lime Juice & | $28.63 | far above the same kind of item | $2.49 | median price of the same kind of item |
| Food | 885092913 V8 Energy Black Cherry and Pomegranate Blueberry Energy Drinks, 8 fl o | $28.44 | far above the same item's other variants | $30.95 | comparable item: V8 V-Fusion + Energy Juice, Pomegranate Blueberry, |
| Food | 895803494 V8 Energy Peach Mango and Orange Pineapple Energy Drinks, 8 fl oz Can  | $27.43 | far above the same item's other variants | $4.03 | comparable item: V8 Energy Peach Mango Energy Drink, 8 fl oz Can, 2 |
| Food | 15204372889 (1 pack) Juicy Juice 100% Juice, Fruit Punch, 48 fl oz Bottle | $27.24 | far above the same item's other variants | $3.72 | comparable item: Juicy Juice 100% Juice, Fruit Punch, 48 fl oz Bott |
| Food | 19475987 Rotel Original Diced Tomatoes & Green Ch | $26.72 | far above the same kind of item | $2.77 | comparable item: ROTEL Original Diced Tomatoes and Green Chilies, 2 |
| Food | 19476067 Muir Glen Fire Roasted Diced Tomatoes Wi | $26.56 | far above the same kind of item | $2.49 | median price of the same kind of item |
| Food | 885656187 Bigs Slammer Sunflower Seeds, Ranch, 5.35 Oz | $26.40 | far above the same item's other variants | $2.78 | median per-unit price of comparable items |
| Food | 15569855929 Dole Fruit Bowls Snacks Diced Mango in 100% Juice*, 4 oz Cups (4 Pack) | $25.32 | far above the same item's other variants | $4.22 | comparable item: Dole Fruit Bowls Snacks Diced Mango in 100% Juice* |
| Food | 52627986 Chef Boyardee Pizza Sauce with Cheese, 15 oz, (Pack - 6) | $25.19 | far above the same item's other variants | $6.30 | comparable item: Goldfish Pizza Cheese Crackers, 6.6 oz Bag |
| Food | 19476070 Muir Glen Diced Tomatoes With Basil And | $25.03 | far above the same kind of item | $2.49 | median price of the same kind of item |
| Food | 393659235 Hormel Compleats Beef Tips & Gravy with Mashed Potatoes, 10 oz | $24.60 | far above the same item's other variants | $6.47 | comparable item: Hormel Compleats Roast Beef & Gravy, with Mashed P |
| Food | 180840368 Lawry's Marinade, 3 | $23.81 | far above the same item's other variants | $3.42 | comparable item: Allegro Original Marinade, 12.7 fl oz |
| Food | 1930815350 Rice-A-Roni Heat & Eat 2 Flavor Variety Pack Rice, 6 Count | $23.75 | far above the same kind of item | $3.82 | median per-unit price of comparable items |
| Food | 55555720 Campbell's Chunky Soup, Microwavable Bow | $23.61 | far above the same item's other variants | $2.58 | comparable item: Campbell's Chunky Microwavable Soup, Hearty Cheese |
| Food | 935711540 Mott's No Sugar Added Cinnamon Applesauce, 3.2 oz, 48 Count Clear Pouc | $23.52 | far above the same item's other variants | $2.32 | comparable item: Mott's No Sugar Added Cinnamon Applesauce, 3.2 oz, |
| Food | 714945378 Stagg Silverado Beef Chili with Beans, 15 Oz | $23.44 | far above the same item's other variants | $5.66 | comparable item: Stagg Classic Chili with Beans, 15 oz |
| Food | 1360948133 Fast Twitch by Gatorade Energy Drink, Glacier Freeze, 12 fl oz, 12 Cou | $22.99 | far above the same item's other variants | $23.00 | comparable item: Fast Twitch by Gatorade 3 Flavor Variety Pack Ener |
| Food | 2124414150 Fast Twitch by Gatorade Energy Drink, Strawberry Watermelon, 12 fl oz, | $22.99 | far above the same item's other variants | $61.20 | comparable item: Fast Twitch by Gatorade Energy Drink, Strawberry L |
| Food | 2193721509 Fast Twitch by Gatorade Energy Drink, Cool Blue, 12 fl oz, 12 Count Bo | $22.99 | far above the same item's other variants | $61.20 | comparable item: Fast Twitch by Gatorade Energy Drink, Strawberry L |
| Food | 2207625809 Fast Twitch by Gatorade Energy Drink, Tropical Mango, 12 fl oz, 12 Cou | $22.99 | far above the same item's other variants | $61.20 | comparable item: Fast Twitch by Gatorade Energy Drink, Strawberry L |
| Food | 5290151507 Fast Twitch by Gatorade Grape Flavored Energy Drink, 12 fl oz, 12 Coun | $22.99 | far above the same item's other variants | $61.20 | comparable item: Fast Twitch by Gatorade Energy Drink, Strawberry L |
| Food | 1295868512 Fast Twitch by Gatorade Energy Drink, Orange, 12 fl oz, 12 Count Bottl | $22.98 | far above the same item's other variants | $61.20 | comparable item: Fast Twitch by Gatorade Energy Drink, Strawberry L |
| Food | 17338264 Campbell's Ready To Serve Cream Of Mushroom Soup, 10.5 oz (Pack of 12) | $22.88 | far above the same item's other variants | $23.76 | comparable item: Campbell's Ready to Serve Low Sodium Cream of Mush |
| Food | 5089265990 HORMEL Chili, No Beans, No Artificial Ingredients, 15 Oz | $22.72 | far above the same item's other variants | $3.48 | comparable item: HORMEL 100% Natural Chili With Beans, No Artificia |
| Food | 120745098 Duncan Hines Wilderness Apple Pie Filling and Topping, 21 oz. | $22.40 | far above the same item's other variants | $7.54 | comparable item: Duncan Hines Wilderness Original Caramel Apple Pie |
| Food | 154685732 Better Than Bouillon, Ham Base, 8 Oz, 1 Count | $22.19 | far above the same item's other variants | $4.18 | comparable item: Better Than Bouillon Bouillon Ham Base, 8 Oz |
| Food | 5089265989 HORMEL Chili with Beans, No Artificial Ingredients, 15 Oz | $20.73 | far above the same item's other variants | $3.48 | comparable item: HORMEL 100% Natural Chili With Beans, No Artificia |
| Food | 17769199 Mrs. Renfro's Medium Salsa, 16 Oz (pack | $20.50 | far above the same item's other variants | $2.48 | comparable item: Mrs. renfro's medium salsa, 16 oz (2 Pack) |
| Food | 884541354 Lipton Texas Style Sweet Tea Iced Tea, Bottled Tea Drink, 16.9 fl oz B | $20.34 | far above the same item's other variants | $6.51 | comparable item: Lipton Sweet Iced Tea Bottled Tea Drink, 89 fl oz  |
| Food | 12026619416 Shottys Gelatin Shots Fall/Winter Pack | $19.98 | far above the same kind of item | $3.23 | median per-unit price of comparable items |
| Food | 929568597 Torani Hazelnut Flavored Syrup in Glass Bottle, 25.4 fl oz | $19.96 | far above the same item's other variants | $9.26 | comparable item: Torani Hazelnut Flavored Syrup, 12.7 fl oz |
| Food | 935750442 Great Lakes Gelatin | $19.93 | far above the same kind of item | $1.92 | median price of the same kind of item |
| Food | 101613668 Tonnino Tuna Tuna With Lemon And Pepper, 6.7 Oz | $19.77 | far above the same item's other variants | $1.20 | comparable item: Tonnino Tuna - Tuna W/lemon And Pepper - Case Of 6 |
| Food | 145379980 Better Than Bouillon - Mushroom Base, 8 Ounce | $18.36 | far above the same item's other variants | $3.99 | comparable item: Better Than Bouillon Mushroom Base, 8 Oz |
| Food | 979230675 Sparkling Ice Essence Naturally Flavored Sparkling Water, Peach, 17 Fl | $17.78 | far above the same item's other variants | $1.27 | median per-unit price of comparable items |
| Food | 1598304183 Red Bull Winter Edition Energy Drink, Fig Apple, 80mg Caffeine, Limite | $17.21 | far above the same item's other variants | $2.38 | comparable item: Red Bull Winter Edition Sugarfree Energy Drink, Fu |
| Food | 20907603691 Nature Valley Protein Berry Crunch Bowl Meal Bundle | $17.09 | far above the same item's other variants | $6.27 | median per-unit price of comparable items |
| Food | 20885152651 Poppi Prebiotic Soda, Shirley Temple, 12 oz, 12 Pack Cans | $16.77 | far above the same item's other variants | $28.02 | median per-unit price of comparable items |
| Food | 400273244 Mtn Dew Soda, Voo Dew 2022, 12 fl oz, 12 Count | $16.25 | far above the same item's other variants | $10.61 | comparable item: Mtn Dew Voo Dew Soda Mystery Flavor 2023, 12 fl oz |
| Food | 742037311 Mtn Dew Soda Fruit Quake 12 Fl Oz, 12 Count | $16.25 | far above the same item's other variants | $5.98 | comparable item: Mountain Dew Soda Dragon Fruit 12 fl oz, 12 Count |
| Food | 10034316249 Mountain Dew Game Fuel Soda Citrus Blackberry 12 fl Oz, 12 Pack Cans | $15.64 | far above the same item's other variants | $45.14 | comparable item: Mountain Dew Game Fuel Soda Citrus Blackberry 20 f |
| Food | 918887617 Mtn Dew Soda Baja Mango Gem 12 Fl Oz, 12 Count | $15.60 | far above the same item's other variants | $13.06 | comparable item: Mtn Dew Baja Soda Laguna Lemonade 12 Fl Oz 12 Coun |
| Food | 354655490 Bigs Sunflower Seeds, Old Dill Pickle, 5.35 Oz | $15.04 | far above the same item's other variants | $3.79 | comparable item: Bigs: Vlasic Dill Pickle 5.35 Oz Sunflower Seeds,  |
| Food | 472487731 (24 bottles) POWERADE Orange, ION4 Electrolyte Enhanced Fruit Flavored | $14.99 | far above the same item's other variants | $44.50 | comparable item: POWERADE Fruit Punch, ION4 Electrolyte Enhanced Fr |
| Food | 1034435032 Knorr No Artificial Flavors Cheddar Broccoli Rice Cooks in 7 Minutes,  | $14.88 | far above the same item's other variants | $1.39 | comparable item: Knorr No Artificial Flavors Mushroom Rice Cooks in |
| Food | 973805555 Bigs Sunflower Seeds, Sea Salt & Black Pepper, 5.35 Oz | $14.83 | far above the same item's other variants | $2.24 | comparable item: BIGS Sea Salt & Black Pepper Sunflower Seeds, 5.35 |
| Food | 31954182 (4 Cups) Del Monte Mango Pineapple Tidbits Fruit Cups in Juice, 4 oz | $14.65 | far above the same item's other variants | $14.56 | comparable item: (2 Cups) Del Monte Fruit & Chia Mango in Pineapple |
| Food | 40617444 (4 Cups) Del Monte Pineapple Fruit Cups, Coconut Flavored, 4 oz | $14.65 | far above the same item's other variants | $14.56 | comparable item: (2 Cups) Del Monte Fruit & Chia Mango in Pineapple |
| Food | 7207907629 PLANTERS Special Reserve Peanuts, Plant Based Protein, Crop '23, 12.5  | $13.96 | far above the same item's other variants | $4.35 | comparable item: Planters Chipotle Peanuts, Plant Based Protein, 6  |
| Food | 2360316362 Red Bull Winter Edition Energy Drink, Pear Cinnamon, 80mg Caffeine, Li | $13.95 | far above the same item's other variants | $7.16 | comparable item: Red Bull Winter Edition Pear Cinnamon Energy Drink |
| Food | 10534912 Welch's 100% Juice, White Grape Cherry, 96 fl oz Bottle | $13.11 | far above the same item's other variants | $7.68 | comparable item: Welch's 100% Juice, White Grape Cherry, 64 fl oz B |
| Food | 932010274 McCormick Sesame Teriyaki Speedy Sides Seasoning Mix Kit, 0.87 oz | $12.58 | far above the same item's other variants | $3.94 | comparable item: McCormick Three Cheese Speedy Sides Seasoning Mix  |
| Food | 1267639954 OLIPOP 9g Fiber Prebiotic Soda, Shirley Temple, 12 fl oz, Single, Refr | $12.50 | far above the same item's other variants | $2.28 | comparable item: OLIPOP 9g Fiber Prebiotic Soda, Cream Soda, 12 fl  |
| Food | 47229349 (4 Bags) Snyder's of Hanover Pretzels, Sandwiches, Cheddar Cheese, 8 O | $11.98 | far above the same item's other variants | $3.68 | comparable item: Snyder's of Hanover Cheddar Cheese Filled Pretzel  |
| Food | 10292777 Kool-Aid Unsweetened Lemon Lime Artificially Flavored Powdered Soft Dr | $11.57 | far above the same item's other variants | $6.87 | median price of the same kind of item |
| Food | 44987014 Welch's Apple Cranberry Juice Drink Blend, 10 Fl. Oz., 6 Count | $11.46 | far above the same item's other variants | $23.88 | comparable item: Ocean Spray Cran-Apple Cranberry Apple Juice Drink |
| Food | 5226963090 Halfday Prebiotic Peach Iced Tea | $11.06 | far above the same item's other variants | $1.84 | median per-unit price of comparable items |
| Food | 876551876 Smucker's Natural Blueberry Fruit Spread, 17.25 Ounces | $10.93 | far above the same item's other variants | $4.97 | comparable item: Smucker's Natural Strawberry Fruit Spread, 25 Ounc |
| Food | 120702590 Sparkling Ice Essence Naturally Flavored Sparkling Water, Lemon Lime,  | $10.68 | far above the same item's other variants | $1.27 | median per-unit price of comparable items |
| Food | 17115956098 Lucky Energy Sugar Free Energy Drinks 16 fl oz Can, Watermelon Candy w | $10.54 | far above the same item's other variants | $2.48 | comparable item: Lucky Energy Sugar Free Energy Drinks 16 fl oz Can |
| Food | 168958284 Tostitos Sweet Lime and Sea Salt Flavored Tortilla Chips, 11 oz | $10.50 | far above the same item's other variants | $7.47 | comparable item: LATE JULY Snacks Restaurant Style Sea Salt & Lime  |
| Food | 42391385 Gatorade G Thirst Quencher Tangerine Sports Drink, 28 fl oz, 1 Count B | $10.33 | far above the same item's other variants | $2.69 | comparable item: Gatorade Thirst Quencher Tangerine Mandarina Sport |
| Food | 8595621391 Tostitos Hint Of Queso Bite Sized Rounds Tortilla Chips, 11 oz Bag | $10.30 | far above the same item's other variants | $3.64 | comparable item: Tostitos Bite Size Rounds Tortilla Chips, 12 oz |
| Food | 20723120966 Pasta Night | $10.21 | far above the same item's other variants | $1.36 | comparable item: Great Value Penne Pasta, 16 oz |
| Food | 213919874 Bigs Sunflower Seeds, Salt & Vinegar, 5.35 Oz | $10.15 | far above the same item's other variants | $10.79 | comparable item: Lance Salt&vinegar Sunflower Seeds Tube |
| Food | 9574466668 Kool-Aid Ghoul-Aid Artificially Flavored Drink, 10 Pouches, for School | $10.05 | far above the same item's other variants | $2.97 | comparable item: Kool-Aid Ghoul-Aid Artificially Flavored Drink, 10 |
| Food | 1602460948 Ruffles Honey Habanero Limited Edition Flavor Potato Snack Chips, 8 Ou | $9.99 | far above the same item's other variants | $4.06 | comparable item: Ruffles Potato Chips Honey Habanero, 12.5 oz |
| Food | 479405022 Campbell's Condensed Tomato Packaged Soup Canned 10.75oz Four Pack | $9.93 | far above the same item's other variants | $0.98 | comparable item: Campbell's Condensed Tomato Soup, 10.75 oz. Can |
| Food | 148762724 Sparkling Ice Essence Naturally Flavored Sparkling Water, 17 Fl Oz | $9.78 | far above the same item's other variants | $1.27 | median per-unit price of comparable items |
| Food | 154734590 Sparkling Ice Essence Naturally Flavored Sparkling Water, Tangerine, 1 | $9.78 | far above the same item's other variants | $1.27 | median per-unit price of comparable items |
| Food | 620380396 Lay’s Crispy Taco Flavored Potato Chips, 7.75 oz Bag | $9.60 | far above the same item's other variants | $5.26 | comparable item: Lay's Crispy Taco Flavored Potato Chips, 2 5/8 oz |
| Food | 923285684 Lay's Cheetos Cheese Flavored Potato Chips, 7 3/4 oz | $9.60 | far above the same item's other variants | $21.76 | comparable item: Lay's Cheetos Cheese Flavored Potato Chips, 2.625o |
| Food | 11150718537 Red Bull Winter Edition Sugarfree Energy Drink, Fuji Apple & Ginger, 1 | $9.41 | far above the same item's other variants | $3.14 | comparable item: Red Bull Apple Edition Energy Drink, Fuji Apple &  |
| Food | 17773013048 Lucky Energy Sugar Free Energy Drinks 16 fl oz Can, Cherry Pop with Ma | $9.19 | far above the same item's other variants | $2.48 | comparable item: Lucky Energy Sugar Free Energy Drinks 16 fl oz Can |
| Food | 22002490 Del Monte 50% Less Sodium Golden Sweet Whole Kernel Corn, 15.25 oz Can | $9.18 | far above the same item's other variants | $0.99 | comparable item: Del Monte Fresh Cut Golden Sweet Whole Kernel Corn |
| Food | 10450647 Gatorade G2 Thirst Quencher, Grape, 20 fl oz Bottle | $9.09 | far above the same item's other variants | $1.80 | comparable item: Gatorade Fierce Thirst Quencher Grape, 20 fl oz 6  |
| Food | 5676676198 Kraft Spirals Mac and Cheese, 4 Boxes, for Easy Dinner or Dinner Sides | $9.09 | far above the same item's other variants | $1.24 | comparable item: Kraft Spirals Mac and Cheese, 1 Box, for Easy Dinn |
| Food | 11151204634 Red Bull Winter Edition Sugarfree Energy Drink, Fuji Apple & Ginger, 8 | $9.06 | far above the same item's other variants | $2.64 | comparable item: Red Bull Apple Edition Energy Drink, Fuji Apple &  |
| Food | 42391399 Gatorade G2 Lower Sugar Fruit Punch Sports Drink, 28 fl oz, 1 Count Bo | $8.90 | far above the same item's other variants | $1.29 | comparable item: Gatorade G2 Lower Sugar Fruit Punch Sports Drink,  |
| Food | 16642710548 Gatorade Thirst Quencher Upside Down Citrus Cooler, 28 fl oz, 1 Count  | $8.84 | far above the same item's other variants | $2.69 | comparable item: Gatorade Thirst Quencher Citrus Cooler Sports Drin |
| Food | 17718707805 Gatorade Thirst Quencher Citrus Cooler, 28 fl oz, 1 Count Bottle | $8.84 | far above the same item's other variants | $2.69 | comparable item: Gatorade Thirst Quencher Citrus Cooler Sports Drin |
| Food | 15331874250 OLIPOP Prebiotic Soda Lemon Lime, 12 fl oz | $8.82 | far above the same item's other variants | $1.88 | comparable item: poppi Lemon Lime Prebiotic Soda, 12 fl oz, 1 Pack  |
| Food | 13783708542 Lucky Energy Sugar Free Energy Drinks 16 fl oz Can, Bodacious Berry wi | $8.81 | far above the same item's other variants | $2.48 | comparable item: Lucky Energy Sugar Free Energy Drinks 16 fl oz Can |
| Food | 20531337 Kool-Aid Jammers Peach Mango Flavored Drink, 10 Count Box, 6 fl oz Pou | $8.78 | far above the same item's other variants | $4.08 | comparable item: Kool-Aid Jammers Lemonade Naturally Flavored Soft  |
| Food | 17642609069 Red Bull Spring Edition Sugarfree Energy Drink, Cherry Sakura, 8.4 fl. | $8.77 | far above the same item's other variants | $2.20 | comparable item: Red Bull Spring Edition Sugarfree Energy Drink, Ch |
| Food | 5573179296 Gatorade Thirst Quencher Lightening Blast Sports Drink, 28 fl oz | $8.76 | far above the same item's other variants | $7.98 | comparable item: Gatorade Thirst Quencher Sports Drink, Lemonade, 3 |
| Food | 45720680 Planters Salted Caramel Peanuts, 16 oz Bag | $8.73 | far above the same item's other variants | $9.87 | comparable item: Planters Salted Caramel Peanuts, 6 oz Can |
| Food | 15383965967 OLIPOP Prebiotic Soda Ridge Rush, 12 fl oz | $8.73 | far above the same item's other variants | $2.49 | comparable item: OLIPOP 9g Fiber Prebiotic Soda, Citrus Rush, 12 fl |
| Food | 907560221 Kool-Aid Sour Jammers Shockin' Blue Raspberry Artificially Flavored So | $8.64 | far above the same item's other variants | $7.49 | comparable item: Kool-Aid Jammers Grape Zero Sugar Artificially Fla |
| Food | 45733432 Red Bull Blue Edition Energy Drink, Blueberry, 114mg Caffeine, 12 fl.  | $8.49 | far above the same item's other variants | $2.46 | comparable item: Red Bull Blue Edition Energy Drink, Blueberry, 114 |
| Food | 20155501562 Monster Energy, Vanilla Shot, Energy Drink, 16 Fl Oz | $8.33 | far above the same item's other variants | $2.68 | comparable item: Monster Energy, Zero Sugar Vanilla Shot, Energy Dr |
| Food | 728863904 C4 Ultimate Energy Drink, Fruit Punch, 16 fl oz Single Can | $8.21 | far above the same item's other variants | $8.21 | comparable item: C4 Ultimate Energy Drink, Fruit Punch, 16 fl oz Si |
| Food | 20897621 Quaker Chewy Granola Bars, Oatmeal Raisin 0.84 Oz, 8 Ct | $8.20 | far above the same item's other variants | $23.84 | comparable item: Quaker Chewy Oatmeal Raisin Granola Bars, 0.84 oz, |
| Food | 452955157 (1 Can) Red Bull Energy Drink, Arctic Berry, 8.4 Fl Oz | $8.18 | far above the same item's other variants | $1.75 | comparable item: Red Bull Energy Drink, Arctic Berry, 8.4 fl oz (24 |
| Food | 174937634 Goya Foods White Cargamanto Beans, 15.5 oz | $8.17 | far above the same item's other variants | $3.18 | comparable item: GOYA - WHITE CARGAMANTO BEANS - 16OZ |
| Food | 704278391 C4 Ultimate Energy Drink, Arctic Snow Cone, 16 fl oz Single Can | $8.15 | far above the same item's other variants | $3.00 | median per-unit price of comparable items |
| Food | 13785152736 Lucky Energy Sugar Free Energy Drinks 16 fl oz Can, Orange Drizzle wit | $8.12 | far above the same item's other variants | $2.48 | comparable item: Lucky Energy Sugar Free Energy Drinks 16 fl oz Can |
| Food | 15453715094 Gatorade Thirst Quencher Electric Flash, 28 fl oz | $8.11 | far above the same item's other variants | $1.78 | comparable item: Gatorade Thirst Quencher Orange 28 fl oz Bottle |
| Food | 17682711067 Red Bull Spring Edition Sugarfree Energy Drink, Cherry Sakura, 12 fl.  | $8.04 | far above the same item's other variants | $3.14 | comparable item: Red Bull Spring Edition Sugarfree Energy Drink, Ch |
| Food | 162756450 Great Value Diced Tomatoes 14.5oz | $7.98 | far above the same item's other variants | $1.35 | comparable item: Del Monte Diced Tomatoes, 14.5 Oz |
| Food | 18693359859 Spindrift Raspberry Iced Tea, Real Brewed Black Tea with Real Squeezed | $7.98 | far above the same item's other variants | $1.33 | comparable item: Spindrift Peach Iced Tea, Real Brewed Green Tea wi |
| Food | 23740903 Red Bull Blue Edition Energy Drink, Blueberry, 80mg Caffeine, 8.4 fl.  | $7.95 | far above the same item's other variants | $2.79 | comparable item: Red Bull Blue Edition Energy Drink, Blueberry, 80m |
| Food | 22234354 Lay's 40% Less Fat Applewood Smoked BBQ Kettle Cooked Potato Chips, 8  | $7.93 | far above the same item's other variants | $7.20 | comparable item: Lay's 40% Less Fat Original Kettle Cooked Potato C |
| Food | 43722727 Lay's Kettle Cooked Wasabi Ginger Flavored Potato Chips, 8 Oz. | $7.77 | far above the same item's other variants | $2.62 | comparable item: Lay's Kettle Cooked Wasabi Ginger Flavored Potato  |
| Food | 18696602859 Kool-Aid Jammers Orange Thunder vs Citrus Champs Artificially Flavored | $7.69 | far above the same item's other variants | $4.57 | median per-unit price of comparable items |
| Food | 24939599 LorAnn Oils Super Strength Flavoring - Used For Candy Making, Flavorin | $7.57 | far above the same item's other variants | $2.48 | comparable item: LorAnn Oils Super Strength Flavoring - Used For Ca |
| Food | 44185597 Lay's Kettle Cooked Potato Chips Sea Salt & Cracked Pepper Flavor 8 oz | $7.54 | far above the same item's other variants | $3.68 | comparable item: Lay's Kettle Cooked Potato Chips, Sea Salt & Crack |
| Food | 14561924690 Kool-Aid No Skool-Aid Artificially Flavored Drink, 10 Pouches, for Sch | $7.49 | far above the same item's other variants | $2.97 | comparable item: Kool-Aid Ghoul-Aid Artificially Flavored Drink, 10 |
| Food | 17943558171 Prime Hydration Sports Drink, WWE, 16.9 fl oz, Bottle | $7.43 | far above the same item's other variants | $1.66 | comparable item: Prime Hydration Sports Drink, WWE, 16.9 fl oz, 12  |
| Food | 739063241 Goldfish Disney Mickey Mouse Cheddar Crackers, Snack Crackers, 6.6 oz  | $7.37 | far above the same item's other variants | $2.29 | comparable item: Goldfish Disney Mickey Mouse Cheddar Crackers, Sna |
| Food | 18897819261 Prime Hydration Sports Drink, Sour Watermelon, 16.9 fl oz, Bottle | $7.37 | far above the same item's other variants | $1.68 | comparable item: Prime Hydration Sports Drink, Strawberry Watermelo |
| Food | 13448799 McCormick Bag 'n Season No Artificial Flavors Pork Chops Cooking & Sea | $7.35 | far above the same item's other variants | $2.53 | comparable item: McCormick Bag 'n Season Pork Chops Cooking & Seaso |
| Food | 17681412584 Red Bull Spring Edition Energy Drink, Cherry Sakura, 8.4 fl.oz single  | $7.31 | far above the same item's other variants | $2.42 | comparable item: Red Bull Spring Edition Energy Drink, Cherry Sakur |
| Food | 5303646203 Pillsbury Funfetti Elf on the Shelf Vanilla Swirl Cake Mix, 15.25 oz B | $7.30 | far above the same item's other variants | $2.86 | comparable item: Pillsbury Funfetti The Elf on the Shelf Marshmallo |
| Food | 1874514996 Red Bull Winter Edition Energy Drink, Fig Apple, 80mg Caffeine, Limite | $7.27 | far above the same item's other variants | $2.38 | comparable item: Red Bull Winter Edition Sugarfree Energy Drink, Fu |
| Food | 5757283887 HORMEL Ghost Reaper Chili w/ Bean 12/15 OZ | $7.13 | far above the same item's other variants | $3.68 | comparable item: HORMEL Chili Cilantro Lime No Bean, 15 oz Can (12  |
| Food | 996553789 Red Bull Green Edition Energy Drink, Dragon Fruit, 80mg Caffeine, 8.4  | $7.08 | far above the same item's other variants | $1.90 | comparable item: Red Bull Green Edition Energy Drink, Dragon Fruit, |
| Food | 10450139 Great Value Gv Strawberry Awake Cereal | $7.06 | far above the same item's other variants | $4.82 | comparable item: Great Value Strawberry Awake Cereal, 11.2 oz |
| Food | 11146269242 Red Bull Spring Edition Energy Drink, Grapefruit, 8.4 fl. oz. Can, 80m | $6.96 | far above the same item's other variants | $5.27 | comparable item: Red Bull Spring Edition Energy Drink, Grapefruit,  |
| Food | 16375705362 OLIPOP 6g Fiber Prebiotic Soda, Cream Soda, 12 fl oz, 24 Total Cans | $6.86 | far above the same item's other variants | $2.49 | comparable item: OLIPOP 9g Fiber Prebiotic Soda, Cream Soda, 12 fl  |
| Food | 804323448 Hormel Compleats Dumplings & Chicken, 7.5 Ounce | $6.83 | far above the same item's other variants | $2.26 | comparable item: Hormel Compleats XL Chicken Alfredo, 13 Ounce |
| Food | 51657309 Kikkoman Mongolian Beef Seasoning Mix, 1 oz Packet | $6.74 | far above the same item's other variants | $1.42 | comparable item: Sun Bird Mongolian Beef Seasoning Mix, 1 oz |
| Food | 44474608 Campbell's Chunky Soup, Ready to Serve Pub-Style Chicken Pot Pie Soup, | $6.67 | far above the same item's other variants | $1.61 | comparable item: Campbell's Chunky Soup, Pub-Style Chicken Pot Pie  |
| Food | 14532562 Gatorade Frost Rain Berry Thirst Quencher Sports Drink, 20 fl oz, 1 Co | $6.64 | far above the same item's other variants | $1.27 | median per-unit price of comparable items |
| Food | 46060748 Campbell's Chunky Microwavable Soup, Hearty Pizza with Sausage & Peppe | $6.63 | far above the same item's other variants | $1.85 | comparable item: Campbell's Chunky Soup, Hearty Cheeseburger Soup,  |
| Food | 583959405 Duncan Hines Signature Layer Cake Mix Pink Velvet 15.25 Oz | $6.56 | far above the same item's other variants | $1.48 | comparable item: Duncan Hines Signature Layer Cake Mix Blue Velvet  |
| Food | 1294042553 Prime Hydration Sports Drink Strawberry Watermelon 16.9 fl oz Bottle b | $6.53 | far above the same item's other variants | $1.89 | comparable item: Prime Hydration Sports Drink, KSI The Nightmare, 1 |
| Food | 2724326348 Prime Hydration Sports Drink, Lemonade, 16.9 fl oz, Bottle | $6.53 | far above the same item's other variants | $2.99 | comparable item: Prime Hydration Sports Drink, Lemonade, 16.9 fl oz |
| Food | 545447664 Progresso Soup Traditional Chicken Noodle Soup 19 oz Can | $6.50 | far above the same item's other variants | $1.66 | comparable item: (12 Cans) Progresso Traditional Chicken Noodle Sou |
| Food | 18839553703 Great Value Chile Adobo Flavored Rolled Tortilla Chips, 10 oz | $6.50 | far above the same item's other variants | $2.97 | comparable item: Great Value Chile Limon Flavored Rolled Tortilla C |
| Food | 15182056497 Prime Hydration Sports Drink, Collectors Edition, 16.9 fl oz, Bottle | $6.47 | far above the same item's other variants | $1.66 | comparable item: Prime Hydration Sports Drink, Prime X, 16.9 fl oz, |
| Food | 46060747 Campbell's Chunky Microwavable Soup, Beef Burrito Soup, 15.25 Ounce Bo | $6.45 | far above the same item's other variants | $1.98 | comparable item: Campbell's Chunky Soup, Beef Soup with Country Veg |
| Food | 13533060595 Duncan Hines Dolly Parton's Vanilla Flavored Cake Mix, 15.25 oz. | $6.37 | far above the same item's other variants | $1.97 | comparable item: Duncan Hines Dolly Parton's Strawberry Flavored Ca |
| Food | 24924349 LorAnn Oils Super Strength Flavoring - Used For Candy Making, Flavorin | $6.35 | far above the same item's other variants | $2.48 | comparable item: LorAnn Oils Super Strength Flavoring - Used For Ca |
| Food | 121722762 Pillsbury Funfetti Midnight Black Chocolate Frosting, 15.6 Oz Tub | $6.31 | far above the same item's other variants | $2.18 | comparable item: Pillsbury Funfetti Chocolate Fudge Frosting, 15.6  |
| Food | 1393711132 OLIPOP 9g Fiber Prebiotic Soda, Doctor Goodwin, 12 fl oz, Single, Refr | $6.29 | far above the same item's other variants | $2.49 | comparable item: OLIPOP 9g Fiber Prebiotic Soda, Doctor Goodwin, 12 |
| Food | 943538496 Progresso Traditional Potato Broccoli and Cheese Chowder Soup, 18.5 oz | $6.26 | far above the same item's other variants | $5.57 | comparable item: Progresso Traditional, Potato, Broccoli & Cheese C |
| Food | 20189818384 Yellow Cake Mix, Cream Cheese Frosting & Rainbow Sprinkles Dessert Bun | $6.13 | far above the same item's other variants | $3.45 | comparable item: Betty Crocker Mug Treats Rainbow Chip Cake Mix wit |
| Food | 10308899 McCormick Pure Almond Extract, 1 fl oz | $6.08 | far above the same item's other variants | $1.31 | comparable item: McCormick Pure Almond Extract, 8 fl oz |
| Food | 357672086 McCormick Garden Herb Italian Dressing & Seasoning Mix, 1.0 oz Packet | $6.07 | far above the same item's other variants | $3.04 | comparable item: Good Seasons Italian Dressing & Recipe Seasoning M |
| Food | 20945660984 poppi Cranberry Fizz Prebiotic Soda, 12 fl oz, 1 SIngle Can | $6.03 | far above the same item's other variants | $1.50 | comparable item: poppi Cranberry Fizz Prebiotic Soda, 12 fl oz, 1 S |
| Food | 10307922 Campbell's Chunky Soup, Ready to Serve New England Clam Chowder, 15.25 | $6.02 | far above the same item's other variants | $1.61 | comparable item: Campbell's Chunky Soup, Ready to Serve New England |
| Food | 185677098 Bigs Buffalo Wing Sunflower Seeds, 5.35 oz | $6.01 | far above the same item's other variants | $3.79 | comparable item: Bigs Frank's Redhot Buffalo Wing Sunflower Seeds,  |
| Food | 15171214418 poppi Grape Prebiotic Soda Cold, 12 fl oz Can, Single Can | $6.00 | far above the same item's other variants | $1.88 | comparable item: poppi Grape Prebiotic Soda, 12 fl oz, 1 Pack Can |
| Food | 977829767 Pillsbury Funfetti Holiday Vanilla Flavored Ready-to-Use Frosting Bag, | $5.99 | far above the same item's other variants | $3.90 | comparable item: Pillsbury Funfetti Holiday Vanilla Flavored Frosti |
| Food | 32247089 La Costeña Canned Refried Pinto Beans with Chicharron, 20.5 oz | $5.97 | far above the same item's other variants | $1.83 | comparable item: La Costeña Canned Refried Pinto Beans, 20.5 oz |
| Food | 10448989 Medallion Nacho Cheese Flavor Tortilla Chips, 13oz | $5.89 | far above the same item's other variants | $6.91 | comparable item: Great Value Nacho Cheese Tortilla Chips, 11 oz Bag |
| Food | 47233559 Great Value Meat Flavored Pasta Sauce, 24 oz ( pack of 6) | $5.88 | far above the same item's other variants | $1.97 | comparable item: Great Value Flavored with Meat Pasta Sauce, 24 oz  |
| Food | 5696125804 Nestle Nesquik Ready-to-Drink Milk, DJ Khaled, Another Bun, Cinnamon B | $5.85 | far above the same item's other variants | $1.07 | median per-unit price of comparable items |
| Food | 17460503171 Prime Hydration Sports Drink, Snowball Slushy, 16.9 fl oz, Bottle | $5.82 | far above the same item's other variants | $1.92 | comparable item: Prime Hydration Sports Drink, Snowball Slushy, 16. |
| Food | 15160203753 McCormick Flavor Maker Veggie Topping Seasoning, 2.75 oz Bottle | $5.81 | far above the same item's other variants | $3.46 | comparable item: McCormick Flavor Maker Veggie Topping Seasoning, 5 |
| Food | 15258259738 OLIPOP Prebiotic Soda Cream Soda | $5.81 | far above the same item's other variants | $1.88 | comparable item: poppi Cream Soda Prebiotic Soda, 12 fl oz, 1 Pack  |
| Food | 877746718 Duncan Hines EPIC Fruity Pebbles Flavored Frosting, 14 oz Can | $5.80 | far above the same item's other variants | $5.41 | comparable item: Duncan Hines EPIC Cookie Dough Flavored Frosting,  |
| Food | 21296172 Campbell's Chunky Microwavable Soup, Kickin' Buffalo-Style Chicken Sou | $5.77 | far above the same item's other variants | $1.85 | comparable item: Campbell's Chunky Soup, Kickin' Buffalo-Style Chic |
| Food | 38375867 Swanson Louisiana Cajun Flavor Infused Broth, 32 oz | $5.77 | far above the same item's other variants | $2.48 | comparable item: Swanson Thai Ginger Flavor Infused Broth, 32 oz. |
| Food | 15172802364 poppi Strawberry Lemon Prebiotic Soda Cold, 12 fl oz Can, Single Can | $5.74 | far above the same item's other variants | $2.04 | comparable item: poppi Strawberry Lemon Prebiotic Soda, 12 fl oz, 4 |
| Food | 15191706142 poppi Root Beer Prebiotic Soda Cold, 12 fl oz Can, Single Can | $5.74 | far above the same item's other variants | $1.99 | comparable item: poppi Root Beer Prebiotic Soda , 12 fl oz, 4 Pack  |
| Food | 213049341 Hunt's Fire Roasted Diced Tomatoes, 14.5 Oz. | $5.73 | far above the same item's other variants | $0.98 | comparable item: Hunt's Fire Roasted Diced Tomatoes with Garlic, 14 |
| Food | 14945456962 Prime Hydration Sports Drink, Peso Pluma, 16.9 fl oz, Bottle | $5.73 | far above the same item's other variants | $1.66 | comparable item: Prime Hydration Sports Drink, Prime X, 16.9 fl oz, |
| Food | 42391384 Gatorade Thirst Quencher Fierce Green Apple Bottled Sports Drink, 28 f | $5.71 | far above the same item's other variants | $1.29 | comparable item: Gatorade Fierce Green Apple Thirst Quencher Sports |
| Food | 788485870 Zatarain's Jerk Chicken Rice Dinner Mix, 8 oz | $5.71 | far above the same item's other variants | $1.94 | comparable item: Zatarain's Dirty Rice Dinner Mix, 8 oz |
| Food | 1668216477 Prime Hydration Sports Drink, Meta Moon Flavor, 16.9 fl oz Bottle | $5.67 | far above the same item's other variants | $2.12 | comparable item: Prime Hydration Sports Drink, Meta Moon, 16.9 fl o |
| Food | 13421907455 Duncan Hines PEEPS Yellow Cake Mix, 15.25 oz. | $5.67 | far above the same item's other variants | $1.38 | comparable item: Duncan Hines Classic Yellow Cake Mix, 15.25 oz. |
| Food | 15166857630 Prime Hydration Sports Drink, Sournova, 16.9 fl oz Bottle | $5.67 | far above the same item's other variants | $1.66 | comparable item: Prime Hydration Sports Drink, Sournova, 16.9 fl oz |
| Food | 10321387 Campbell's Chunky Soup, Ready to Serve Baked Potato with Steak and Che | $5.61 | far above the same item's other variants | $1.98 | comparable item: Campbell’s Chunky Soup, Ready to Serve Steak and P |
| Food | 13540472554 Duncan Hines Dolly Parton's Creamy Vanilla Flavored Frosting, 16 oz. | $5.59 | far above the same item's other variants | $1.76 | comparable item: Duncan Hines Dolly Parton's Creamy Strawberry Flav |
| Food | 114050166 BODYARMOR Blackout Berry Electrolyte Sports Drink, 16 fl oz Bottle | $5.57 | far above the same item's other variants | $1.44 | comparable item: BODYARMOR Blackout Berry Electrolyte Sports Drink  |
| Food | 19206603456 Betty Crocker Super Moist Delights Cake Mix, America's Birthday Cake,  | $5.56 | far above the same item's other variants | $1.94 | comparable item: Betty Crocker Delights Super Moist Strawberry Cake |
| Food | 10321706 Campbells Condensed Campbells Oyster Stew | $5.53 | far above the same item's other variants | $4.37 | comparable item: Campbells Condensed Campbell's Soup R&w Yellow Tom |
| Food | 10307998 Campbell's Chunky Soup, Ready to Serve Healthy Request New England Cla | $5.50 | far above the same item's other variants | $1.98 | comparable item: Campbell's Chunky Soup, Ready to Serve New England |
| Food | 16449263220 Pillsbury Funfetti Melted Snowman Blue and White Vanilla Swirl Cake Mi | $5.50 | far above the same item's other variants | $3.12 | comparable item: Pillsbury Funfetti Premium Pink & Blue Swirl Cake  |
| Food | 13983812647 Progresso Pitmaster BBQ Style, Grilled Chicken and Fire Roasted Corn,  | $5.49 | far above the same item's other variants | $2.72 | comparable item: Progresso Pitmaster, Grilled Chicken and Potato wi |
| Food | 14341000149 Campbell’s Chunky Beefy Mac Soup, 18.8 oz Can | $5.49 | far above the same item's other variants | $1.98 | comparable item: Campbell’s Chunky Chili Mac Soup, 18.8 oz Can |
| Food | 16286313648 Skittles Gummies Fuego Gummy Candy - 4.2 oz Bag | $5.48 | far above the same item's other variants | $2.09 | comparable item: Skittles Gummies Fuego Gummy Candy - 5.8 oz Bag |
| Food | 15417356779 Prime Hydration Sports Drink, LA Dodgers 2025, 16.9 fl oz, Bottle | $5.47 | far above the same item's other variants | $1.66 | comparable item: Prime Hydration Sports Drink, Prime X, 16.9 fl oz, |
| Food | 17431751447 Prime Hydration Sports Drink, Kevin Durant, 16.9 fl oz, Bottle | $5.47 | far above the same item's other variants | $1.66 | comparable item: Prime Hydration Sports Drink, Kevin Durant, 16.9 f |
| Food | 10320664 Progresso Rich & Hearty Steak & Roasted Russet Potatoes Soup 18.5 oz | $5.43 | far above the same item's other variants | $1.95 | comparable item: Progresso Soup, Rich & Hearty, Steak and Vegetable |
| Food | 5350181162 Gatorade Thirst Quencher Midnight Ice Sports Drink, 28 fl oz | $5.39 | far above the same item's other variants | $1.38 | comparable item: Gatorade Thirst Quencher Midnight Ice 20 Fl Oz, 8  |
| Food | 21296173 Campbell's Chunky Microwavable Soup, Jammin' Jerk Chicken with Rice &  | $5.37 | far above the same item's other variants | $1.85 | comparable item: Campbell's Chunky Soup, Jammin' Jerk Chicken with  |
| Food | 14803756367 Ryl Iced Tea Peaches n’ Cream, Zero Sugar Black Tea, Antioxidant Super | $5.31 | far above the same item's other variants | $1.87 | comparable item: Ryl Iced Tea Sweet Tea 4 Pack, Zero Sugar Black Te |
| Food | 261823174 McCormick® Honey Garlic Stir Fry One Skillet Seasoning Mix 1.25 oz Env | $5.30 | far above the same item's other variants | $1.48 | comparable item: McCormick Beef Stir Fry & Vegetables One Skillet S |
| Food | 10795067 Campbell's Chunky Microwavable Soup, Chicken Corn Chowder Soup, 15.25  | $5.25 | far above the same item's other variants | $1.61 | comparable item: Campbell's Chunky Soup, Ready to Eat Chicken Corn  |
| Food | 10308951 McCormick No Artificial Flavors Onion Gravy Seasoning Mix, 0.87 oz Pac | $5.21 | far above the same item's other variants | $0.73 | comparable item: McCormick No Artificial Flavors 30% Less Sodium Br |
| Food | 1336949638 BODYARMOR Cherry Lime Electrolyte Sports Drink, 16 fl oz Bottle | $5.16 | far above the same item's other variants | $1.33 | comparable item: BODYARMOR Zero Sugar Cherry Lime Electrolyte Sport |
| Food | 43139048 Campbell's Chunky Soup, Beef Burrito Soup, 18.6 Ounce Can | $5.13 | far above the same item's other variants | $2.48 | comparable item: Campbell's Chunky Soup, Healthy Request Beef with  |
| Food | 728264140 Campbell's Chunky Soup, Healthy Request Chicken Corn Chowder, 18.8 Oun | $5.13 | far above the same item's other variants | $2.26 | comparable item: Campbell's Chunky Soup, Chicken Corn Chowder Soup, |
| Food | 1927172203 Campbell’s Chunky Soup, Loaded Potato Seasoned with Bacon, 15.25 oz Mi | $5.13 | far above the same item's other variants | $5.31 | comparable item: Campbell’s Chunky Soup, Loaded Potato Seasoned wit |
| Food | 6069766383 Halfday Prebiotic Raspberry Iced Tea | $5.13 | far above the same item's other variants | $1.84 | median per-unit price of comparable items |
| Food | 10321429 Campbell’s Chunky Soup, Ready to Serve Sirloin Burger With Country Veg | $5.08 | far above the same item's other variants | $1.24 | comparable item: Campbell’s Chunky Soup, Ready to Serve Sirloin Bur |
| Food | 42391383 Gatorade Fierce Thirst Quencher Blue Cherry Sports Drink, 28 fl oz, 1  | $5.08 | far above the same item's other variants | $2.91 | comparable item: Gatorade Thirst Quencher Fierce Blue Cherry Sports |
| Food | 1692802249 Progresso Chickpea & Noodle Protein Soup, Vegetarian, 18.5 oz. | $5.06 | far above the same item's other variants | $2.72 | comparable item: Progresso Italian-Style Bean and Pasta Protein Sou |
| Food | 329747126 Pillsbury Funfetti Valentine's Cake Mix with Candy Bits, 15.25 oz Box | $5.05 | far above the same item's other variants | $1.94 | comparable item: Pillsbury Funfetti Cake Mix with Candy Bits, 15.25 |
| Food | 2116529166 Campbell's Chunky Creamy Chicken Bacon Carbonara Soup, 18.8 oz Can | $5.04 | far above the same item's other variants | $5.08 | comparable item: Campbell's Chunky Creamy Chicken Bacon Carbonara S |
| Food | 21125864 Progresso Rich and Hearty Steak and Homestyle Noodles Soup, 18.5 oz | $5.02 | far above the same item's other variants | $1.36 | comparable item: Progresso Rich and Hearty Chicken and Homestyle No |
| Food | 10307926 Soup On The Go Campbells On The Go Ne Clam Chowder | $4.97 | far above the same item's other variants | $4.79 | comparable item: Soup On The Go Campbells On The Go Vegetable Beef |
| Food | 13448759 Soup On The Go Campbells On The Go Veg & Mini Noodle | $4.97 | far above the same item's other variants | $4.79 | comparable item: Soup On The Go Campbells On The Go Vegetable Beef |
| Food | 13348062976 Gatorade Thirst Quencher Aqua Blast Sports Drink, 28 fl oz | $4.91 | far above the same item's other variants | $7.98 | comparable item: Gatorade Thirst Quencher Sports Drink, Lemonade, 3 |
| Food | 814364002 Idahoan Smokey Cheese & Bacon Mashed Potatoes, 4 oz Pouch | $4.87 | far above the same item's other variants | $1.61 | comparable item: Idahoan Smokey Cheese & Bacon Mashed Potatoes Side |
| Food | 36343354 Goya Small White Beans, 15.5 oz | $4.79 | far above the same item's other variants | $1.70 | comparable item: Goya Small White Beans, 16 oz (Pack of 24) |
| Food | 194912139 Martha White Pumpkin Spice Flavored Muffin Mix | $4.59 | far above the same item's other variants | $5.14 | comparable item: Simple Mills Pumpkin Muffin Mix, 9Oz (Pack of 6) |
| Food | 347661139 Chef Boyardee Pasta in Butter Sauce, Ready-to-Eat Meal, 15 oz. Can | $4.15 | far above the same item's other variants | $1.48 | comparable item: Chef Boyardee Beef Ravioli in Pasta Sauce, Ready-t |
| Food | 6191716936 Idahoan Dairy-Free Buttery Homestyle Mashed Potatoes, 4oz Pouch | $3.93 | far above the same item's other variants | $1.33 | comparable item: Idahoan Buttery Homestyle Mashed Potatoes, 4 oz Po |
| Food | 16777840 Chef Boyardee Beefaroni In Tomato Sauce, 15 oz | $3.91 | far above the same item's other variants | $0.94 | comparable item: Chef Boyardee Macaroni With Beef In Tomato Sauce B |
| Food | 22600129 Idahoan® Foods Idahoan® Romano White Chs Mashed Potatoes | $3.90 | far above the same item's other variants | $0.49 | comparable item: Idahoan® Original Mashed Potatoes, 8 Oz |
| Food | 10295141 Del Monte Diced Tomatoes Garlic Onion, 14.5 oz Can | $3.86 | far above the same item's other variants | $0.98 | comparable item: Del Monte Quality Diced Tomatoes With Garlic & Oni |
| Food | 137179931 Jell-O Simply Good Mixed Berry Gelatin Mix 3 oz Pouch | $3.80 | far above the same item's other variants | $1.48 | comparable item: JELL-O Simply Good Strawberry Gelatin Mix 3 oz Pou |
| Food | 30989230 Kikkoman Broccoli & Beef Stir-Fry Seasoning Mix, 1 oz Packet | $3.77 | far above the same item's other variants | $1.32 | comparable item: Kikkoman Stir-Fry Seasoning Mix, 1 oz Packet |
| Food | 10295174 Del Monte Petite Diced Tomatoes with Jalapeno & Habanero, 14.5 oz Can | $3.74 | far above the same item's other variants | $0.99 | comparable item: Del Monte Petite Cut Diced Tomatoes, 14.5 oz Can |
| Food | 10321010 Chef Boyardee Overstuffed Italian Sausage Ravioli in Tomato Sauce with | $3.73 | far above the same item's other variants | $0.71 | comparable item: Chef Boyardee Cheese Ravioli in Tomato Sauce, 15 o |
| Food | 10449170 Chef Boyardee Chili Macaroni, Microwave Pasta, 15 Oz | $3.72 | far above the same item's other variants | $1.24 | comparable item: Chef Boyardee Chicken Alfredo Pasta Microwave Past |
| Food | 55325860 Martha White Gladiola Sweet Yellow Cornbread & Muffin Mix | $3.72 | far above the same item's other variants | $1.10 | comparable item: Martha White Sweet Yellow Cornbread & Muffin Mix,  |
| Food | 45830921 JM Smucker Martha White Muffin Mix, 7 oz | $3.64 | far above the same item's other variants | $2.48 | comparable item: JM Smucker Martha White Gluten Free Muffin Mix, 7  |
| Food | 133273497 Pasta Roni Chicken Fettuccine Pasta, 4.7 oz Box | $3.49 | far above the same item's other variants | $1.38 | comparable item: Pasta Roni Fettuccine Alfredo, 4.7 oz Box |
| Food | 6145474937 Great Value Cinnamon Roll Cake Mix, 15.25 oz | $3.43 | far above the same item's other variants | $1.84 | comparable item: Great Value Spice Cake Mix, 15.25 oz |
| Food | 5212491409 Clear American Sparkling Water, Blueberry Pomegranate, 33.8 fl oz | $3.30 | far above the same item's other variants | $11.92 | median price of the same kind of item |
| Food | 902643654 Clear American Strawberry Punch Snow Cone Sparkling Water Beverage, 33 | $3.06 | far above the same item's other variants | $11.92 | median price of the same kind of item |
| Food | 10292774 Kool-Aid: Soft Drink Mix Invisible Watermelon Kiwi Unsweetened, .13 Oz | $2.83 | far above the same item's other variants | $6.87 | median price of the same kind of item |
| Food | 101913072 Manhattan Chocolates Chocolate Leather - Dark Chocolate - Case Of 36 - | $0.48 | far below comparable items | $35.28 | comparable item: Manhattan Chocolates Chocolate Leather - Dark Choc |
| Food | 738227719 Gloria Jean's Hazelnut Coffee, Flavored Keurig K-Cup Pod, Medium Roast | $0.45 | far below comparable items | $45.66 | comparable item: Gloria Jean's Hazelnut Coffee, Flavored Keurig K-C |
| Food | 15673631 MAMA Noodles Pad Thai Instant Spicy Noodles w/ Delicious Thai Flavors, | $0.43 | far below comparable items | $18.28 | median per-unit price of comparable items |
| Food | 161915524 Primo Purified Self-Service Refill Water with Added Minerals, 1 Gallon | $0.39 | far below comparable items | $2.70 | comparable item: Primo Water 5-Gallon Bottle with Water Refill Purc |
| Food | 115047780 Blow Pop Lollipop, Assorted Berry, 100 Count | $0.24 | far below comparable items | $20.23 | comparable item: Charms Blow Pop Assorted - 100 Count |
| Food | 402935973 La Perruche Sugar Cubes, Brown Sugar, 8.8 Oz | $0.24 | far below comparable items | $4.12 | comparable item: La Perruche Sugar Cubes, 8.8 Oz |
| Food | 306530998 Badia Ground Nutmeg, 2 Oz | $0.19 | far below comparable items | $2.46 | comparable item: Badia Ground Nutmeg, 2 oz (Pack of 8) |
| Food | 6943513287 Poppi Classic Cola Prebiotic Soda, 12 oz, 12 Pack Can | $0.18 | far below comparable items | $22.56 | comparable item: poppi Classic Cola Prebiotic Soda, 12 oz, 1 Pack C |
| Food | 538859240 De Cecco Gemelli no.97 Pasta, 16 oz (12 Pack) | $0.17 | far below comparable items | $25.23 | comparable item: De Cecco Gemelli Pasta, 5 lbs |
| Food | 125268073 Tootsie Pops Assorted Flavor Lollipops, 0.6 Oz., 100 Count | $0.12 | far below comparable items | $11.42 | comparable item: Dum Dum Pops Assorted Flavor Lollipops, 10.4 oz.,  |
| Food | 312700364 Toblerone Swiss Milk Chocolate Honey & Almond Nougat Bar, 3.52 Oz | $0.11 | far below comparable items | $3.22 | comparable item: TOBLERONE Milk Chocolate Bar with Honey and Almond |
| Food | 119703102 (288 Count) International Delight Cold Stone Sweet Cream Creamer | $0.07 | below range | $6.88 | comparable item: International Delight Cold Stone Sweet Cream Cream |
| Food | 815455656 Skinnypop Popcorn 100 Calorie Popcorn Bags , .65 Oz | $0.07 | below range | $0.93 | comparable item: Skinnypop Popcorn 100 Calorie Popcorn Bags, .65 Oz |
| Food | 829007865 (288 Count) International Delight Cinnabon Creamer | $0.07 | below range | $5.59 | comparable item: International Delight Original Coffee Creamer Sing |
| Food | 130204721 (288 Count) International Delight Hershey Chocolate caramel Creamer | $0.06 | below range | $76.20 | comparable item: International Delight HERSHEY’S Chocolate Caramel  |
| Food | 135282277 (288 Count) International Delight Irish Cream Creamer | $0.06 | below range | $11.99 | median price of its category |
| Food | 537464914 1907 New Zealand Artesian Water, 67.6 Fl Oz. | $0.05 | below range | $32.08 | comparable item: 1907 New Zealand Artesian Water, 16.9 fl oz, 6 cou |
| Food | 10453055 Knorr Chicken Bouillon Cubes, 2.2 oz; Chicken Bouillon Broth | $0.03 | below range | $1.41 | comparable item: Knorr Chicken Bouillon Cubes, 2.2 oz; Chicken Boui |
| Food | 510494953 General N Joy Sugar Packet | $0.03 | below range | $27.12 | comparable item: Genuine Joe Sugar Packets - Packet - 0.099 Oz (2.8 |
| Food | 551782729 Diamond Crystal Hometown Market Asprtmame Blue Sweetener | $0.03 | below range | $10.16 | median price of the same kind of item |
| Food | 910247393 Diamond Crystal Hometown Market Sugar Sub Pink Sweetener | $0.03 | below range | $10.16 | median price of the same kind of item |
| Food | 207777616 POP without AV | $0.02 | below range | $15.94 | median price of the same kind of item |
| Food | 36282224 Jack Link's Wild Side Teriyaki Sausage, 4 ct, 12 oz | $0.01 | below range | $13.60 | median per-unit price of comparable items |
| Food | 100140315 Fresh Cravings Chunky Mild Salsa 2oz | $0.01 | below range | $5.97 | median price of the same kind of item |
| Food | 114241839 DiLuigi Foods Beef Steak Kabobs with Peppers Onions | $0.01 | below range | $4.85 | median price of its category |
| Food | 139078114 SIMPSON FARMS Ground Beef 85% Lean/ 15% Fat | $0.01 | below range | $10.88 | comparable item: Jensen Ground Beef and Pork Blend Frozen Patties,  |
| Food | 143982970 DiLuigi Chicken Breast Kabobs | $0.01 | below range | $10.20 | comparable item: HORMEL BREAST OF CHICKEN 2/10oz |
| Food | 155698379 Wise Organic & Kosher Free-Range Chicken Drumsticks, 1.0 PACKAGE | $0.01 | below range | $3.82 | comparable item: Field Day Organic Free Range Chicken Broth, 32 Oz |
| Food | 158699169 Wise Organic & Kosher Free-Range Chicken Wings, 1.0 PACKAGE | $0.01 | below range | $6.59 | median price of its category |
| Food | 165824816 Kunzler All Natural Uncured Black Forest Ham | $0.01 | below range | $4.98 | comparable item: Prima Della Black Forest Ham |
| Food | 173972297 Fresh Cravings Pico De Gallo Mild Salsa 2oz | $0.01 | below range | $5.97 | median price of the same kind of item |
| Food | 182977430 The Piggery Pork Chips Dry Rubbed W/ Rosemany + Thyme, 2.0 CT | $0.01 | below range | $7.20 | median price of the same kind of item |
| Food | 192945244 Wise Organic & Kosher Whole Chicken, 1.0 CT | $0.01 | below range | $6.59 | median price of its category |
| Food | 196459912 Shady Brook Farms Young Turkey Breast, 1.0 CT | $0.01 | below range | $6.28 | median price of the same kind of item |
| Food | 201352560 Lunds & Byerlys Uncured Honey Ham 1 ea | $0.01 | below range | $4.98 | comparable item: Prima Della Honey Ham |
| Food | 214944319 Brunckhorst Boars Head Cheese, 1 ea | $0.01 | below range | $4.78 | median price of the same kind of item |
| Food | 268276998 Prairie Fresh Pork Loin Backribs 1 ea | $0.01 | below range | $6.56 | comparable item: Prairie Fresh Prime Cracked Rosemary Pork Loin Fil |
| Food | 288411977 Instant K Cafe Solo Display | $0.01 | below range | $6.43 | median price of its category |
| Food | 308970211 Pride of the Farm Drumsticks Turkey 1 ea | $0.01 | below range | $2.73 | comparable item: Chef-Ko Smoked Turkey Drumsticks |
| Food | 351061195 Purely Inspired Customer Value Program For 12 Inch Bikes | $0.01 | below range | $23.56 | median price of the same kind of item |
| Food | 357582687 Clemens Food Group Hatfield Pork Tenderloin, 1 ea | $0.01 | below range | $6.59 | median price of its category |
| Food | 399053009 Coborn's Boneless Americas Cut Chop Premium Duroc Pork 1 ea | $0.01 | below range | $6.12 | median price of the same kind of item |
| Food | 428702933 Winchester Farms Ground Beef Stuffed Peppers 1 Each | $0.01 | below range | $6.59 | median price of its category |
| Food | 429767900 Services Non Taxable Cvmp | $0.01 | below range | $4.85 | median price of its category |
| Food | 441721276 Lunds & Byerlys Tinga Chicken Empanada 1 ea | $0.01 | below range | $7.60 | median price of its category |
| Food | 514084495 Hormel Always Tender Combo Pork Rib Chops 1 ea Tray | $0.01 | below range | $6.12 | median price of the same kind of item |
| Food | 555920767 Meijer Markets of Meijer Chicken Breast, 1 ea | $0.01 | below range | $6.59 | median price of its category |
| Food | 620674899 Bella Linea Coffee Red Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Food | 635961391 MTN DEW AMP GAME FUEL, 4 Flavor Variety Pack, 16 oz Cans, 12 Count + F | $0.01 | below range | $53.09 | median per-unit price of comparable items |
| Food | 653271293 Pride of the Farm Wings Turkey 1 ea | $0.01 | below range | $6.28 | median price of the same kind of item |
| Food | 661485947 Sugardale Center Slice Smoked Ham 1 ea | $0.01 | below range | $6.01 | median price of the same kind of item |
| Food | 684792813 Hormel Always Tender Hatch Seasoned Pork Rib Chop 1 ea | $0.01 | below range | $6.12 | median price of the same kind of item |
| Food | 687783849 Mitica Marcona Almonds With Skins | $0.01 | below range | $7.38 | comparable item: Nature's Tree Marcona Almonds, 8.5 oz Bag |
| Food | 731096895 N'Joy Saccharin Sugar Substitute, 83024 (21202066) | $0.01 | below range | $57.29 | median per-unit price of comparable items |
| Food | 735833430 DCK 2021 WM CFT 52FT. CDT POP KIT | $0.01 | below range | $15.94 | median price of the same kind of item |
| Food | 759357673 Freshness Guaranteed Chocolate Chip Cookie Topped Donuts, 10 oz, 4 Cou | $0.01 | below range | $21.07 | comparable item: Freshness Guaranteed Chocolate Chip Muffin Minis,  |
| Food | 771705201 Smithfield Smithfield Smokehouse Reserve Ham, 1 ea | $0.01 | below range | $6.01 | median price of the same kind of item |
| Food | 818070456 Boar's Head Vermont Cheddar Cheese | $0.01 | below range | $5.43 | comparable item: Fritz Cheddar Cheese, 16 oz |
| Food | 869515102 Pride of the Farm Thighs Turkey 1 ea | $0.01 | below range | $6.28 | median price of the same kind of item |
| Food | 913604428 Red Smith Pigs Feet | $0.01 | below range | $7.67 | median price of its category |
| Food | 921416426 Lunds & Byerlys Smoked Uncured Ham 1 ea | $0.01 | below range | $9.97 | comparable item: Dietz And Watson D&w Ham Applewood Smoked Uncured  |
| Food | 978507180 Mr Coffee Cafe Barrista Display | $0.01 | below range | $8.50 | median price of the same kind of item |
| Health and Medicine | 114433396 Relief Pak HotSpot Portable Moist Heat Pack - for Spine-Large Size - 1 | $150.00 | far above the same kind of item | $81.65 | comparable item: Relief Pak\xc2\xae HotSpot\xc2\xae Moist Heat Pack |
| Health and Medicine | 497317067 Tellsell Non-invasive & non-surgical Shape-N-Freeze Body Sculpting Bel | $150.00 | far above the same kind of item | $7.50 | comparable item: Professional Non Surgical Body Sculpting Shape N F |
| Health and Medicine | 920556603 Plant Therapy Boronia Absolute Essential Oil 5 mL (1/6 oz) 100% Pure | $149.95 | far above the same kind of item | $21.95 | comparable item: Plant Therapy Yuzu Essential Oil 5 mL (1/6 oz) 100 |
| Health and Medicine | 447910751 Foam Insoles 3-Pack | $148.80 | far above the same kind of item | $36.99 | comparable item: 3-Pack Foam Insoles |
| Health and Medicine | 33944298 Relief Pak\xc2\xae Hot Button\xc2\xae Reusable Instant Hot Compress -  | $148.64 | far above the same kind of item | $18.34 | comparable item: Relief Pak\xc2\xae Hot Button\xc2\xae Reusable Ins |
| Health and Medicine | 33943494 Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Black Urethane Pack - standard | $147.18 | far above the same kind of item | $92.74 | comparable item: Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Black Uret |
| Health and Medicine | 316098547 Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Black Urethane Pack - circular | $147.18 | far above the same kind of item | $13.47 | comparable item: Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Black Uret |
| Health and Medicine | 805083485 Relief Pak Cold n\' Hot elastomer pack, head (3" x 12.5"), case of 12 | $146.84 | far above the same kind of item | $14.52 | comparable item: Relief Pak Cold n\' Hot elastomer pack, head (3" x |
| Health and Medicine | 590216836 Pu Health Bunion Corrector Hallux Valgus Relief Sleeve with Gel Cushio | $146.42 | far above the same kind of item | $21.42 | comparable item: Bunion Corrector, Hallux Valgus Bunion Brace Splin |
| Health and Medicine | 165400571 Optical 20/20 Lubricant - Lubricante Para Ojos 0.6 Oz Azul (Pack of 30 | $146.14 | far above the same kind of item | $120.51 | median per-unit price of comparable items |
| Health and Medicine | 114081880 ThermaCELL ProFLEX Heavy Duty Heated Shoe Insoles with Bluetooth Compa | $145.83 | far above the same kind of item | $113.53 | comparable item: Thermacell Heated Insoles ProFLEX-Large |
| Health and Medicine | 129504247 Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Black Urethane Pack - neck con | $144.14 | far above the same kind of item | $14.11 | comparable item: Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Black Uret |
| Health and Medicine | 495347910 ALLERGY RELIEF 180 | $143.00 | far above the same kind of item | $52.99 | comparable item: Flonase Allergy Relief (144x3) |
| Health and Medicine | 107670095 Plant Therapy Melissa Organic Essential Oil | 100% Pure, USDA Certifie | $142.95 | far above the same kind of item | $12.99 | comparable item: Plant Therapy Organic Lemon Essential Oil 100% Pur |
| Health and Medicine | 170755990 WaxWel Paraffin Wax Bath Accessory Package, Professional Home and Spa  | $142.90 | far above the same item's other variants | $28.85 | comparable item: WaxWel Paraffin Wax Bath Accessory Package, Profes |
| Health and Medicine | 23439719 Medline Nonsterile Woven Gauze Sponges 8 Ply - 4" x 4" - 200/Box - Whi | $142.86 | far above the same kind of item | $101.64 | comparable item: Medline, MIINON25412, Nonsterile Woven Gauze Spong |
| Health and Medicine | 263504767 LIDOCAINE 4% CREAM | $142.71 | far above the same kind of item | $33.66 | comparable item: Anecream 4% Lidocaine Cream 30 g |
| Health and Medicine | 28906542 Vitamin C | $141.79 | far above the same kind of item | $11.68 | median price of the same kind of item |
| Health and Medicine | 1547999825 Band-aid Flexible Fabric adhsve Bandages - 1" - 1200/carton - 100 Per  | $141.31 | far above the same kind of item | $8.97 | comparable item: Band-Aid Brand Flexible Fabric Bandages, 100 Count |
| Health and Medicine | 47363603 Thermacell Heated Insoles ProFLEX-X-Large | $139.99 | far above the same kind of item | $113.53 | comparable item: Thermacell Heated Insoles ProFLEX-Large |
| Health and Medicine | 132831184 Gerbing 3V Heated Insole - S/M | $139.99 | far above the same kind of item | $116.99 | comparable item: Gerbing 3V Heated Insole - L/XL |
| Health and Medicine | 116373127 Face Pore for Men Daily Pads Facial Pore head Facial Cleaning Spatula  | $139.97 | far above the same kind of item | $90.72 | comparable item: Foam Pore Remover Hair Puff Comb Face Wash Facial  |
| Health and Medicine | 144596657 Skin Remover for Body Korean Electronic Remover for Feet Feet Scrapers | $139.97 | far above the same kind of item | $7.80 | median price of the same kind of item |
| Health and Medicine | 152119645 Shuliwen Artibetter Sole Insoles 4CM Height Increase Shoe Lifts for Me | $139.97 | far above the same kind of item | $13.57 | median price of the same kind of item |
| Health and Medicine | 156598834 Whipped Shave Butter Drunken Elephant Skin Care Face Roller Skin Care  | $139.97 | far above the same kind of item | $34.99 | comparable item: Hydro Facial compatible with Machine My Face Clean |
| Health and Medicine | 173405789 C for Face Mens Face Wash Ordinary Face Pore Eraser for Bigger at Home | $139.97 | far above the same kind of item | $10.52 | median price of the same kind of item |
| Health and Medicine | 709502761 Pediatric Aerosol Mask with Nebulizer - WST0312 | $139.43 | far above the same kind of item | $6.94 | median price of the same kind of item |
| Health and Medicine | 772889310 Patented Fat Freezing Tone and Sculpt System (Fat Freezer with 3 Pads  | $136.31 | far above the same kind of item | $12.10 | median price of the same kind of item |
| Health and Medicine | 620818095 Tylenol 20pc Inf Tylmtrn Sdk | $135.48 | far above the same kind of item | $10.47 | median price of the same kind of item |
| Health and Medicine | 1374516482 9pcjs Gauze Top Sol | $134.82 | far above the same kind of item | $7.49 | median price of the same kind of item |
| Health and Medicine | 180896158 Alka-seltzer As Chews Fspw 15pc | $134.55 | far above the same kind of item | $3.28 | median per-unit price of comparable items |
| Health and Medicine | 835649930 Alka-seltzer As Chew Mixed 20pc | $134.40 | far above the same kind of item | $4.38 | median per-unit price of comparable items |
| Health and Medicine | 461306491 Leg Massageing Slow Inflating Therapeutic Pain Reliever Device | $133.70 | far above the same kind of item | $9.50 | median price of the same kind of item |
| Health and Medicine | 44324532 Post-Op Sterile Gauze - NON21442 | $133.32 | far above the same kind of item | $12.77 | comparable item: Post-Op Sterile Gauze - NON21442Z |
| Health and Medicine | 228803980 Relief Pak Cold n\' Hot elastomer pack, eye (3" x 9"), case of 12 | $131.63 | far above the same kind of item | $12.50 | comparable item: Relief Pak Cold n\' Hot elastomer pack, eye (3" x  |
| Health and Medicine | 441526718 Relief Pak\xc2\xae Cold Pack Cover - standard - Case of 12 | $131.10 | far above the same kind of item | $13.31 | comparable item: Relief Pak\xc2\xae Cold Pack Cover - standard |
| Health and Medicine | 103374350 WaxWel Paraffin - 36 x 1-lb Blocks - Rose Blossom Fragrance | $130.94 | far above the same item's other variants | $34.10 | comparable item: WaxWel Paraffin - 6 x 1-lb Blocks - Rose Blossom F |
| Health and Medicine | 29004968 Arthur Andrew Medical, Syntol, 3-in-1 Formula with Probiotics, Prebiot | $129.99 | far above the same kind of item | $65.27 | median per-unit price of comparable items |
| Health and Medicine | 45010383 Reliefband Classic Nausea and Motion Sickness Relief Wristband | $129.99 | far above the same kind of item | $15.44 | comparable item: King Bio Nausea and Motion Sickness, 2 OZ |
| Health and Medicine | 879977058 Elite Fat Freeze System. Patented Fat Freezer Body Sculpting System fo | $129.99 | far above the same kind of item | $101.56 | comparable item: Elite Fat Freeze System. Patented Fat Freezer Body |
| Health and Medicine | 990417356 Pedialyte AdvancedCare Plus Electrolyte Powder, Hydration Station Vari | $129.00 | far above the same kind of item | $11.94 | comparable item: Pedialyte AdvancedCare Plus Electrolyte Powder, Or |
| Health and Medicine | 162463507 Niferex 150 Iron Supplement, 90 Count | $128.48 | far above the same kind of item | $18.54 | comparable item: Feosol Iron Supplement Therapy, 40 count |
| Health and Medicine | 982151738 Extra Thick Cushioned Arch Support Pads for Aching and Painful Feet | $128.00 | far above the same kind of item | $9.81 | comparable item: Extra Thick Cushioned Arch Support Pads for Aching |
| Health and Medicine | 595275634 QTEST (Box of 20) ETG ALCOHOL 80 Hour detection single drug test dip i | $127.99 | far above the same kind of item | $6.99 | comparable item: QTEST ETG ALCOHOL 80 Hour detection single drug te |
| Health and Medicine | 46887151 Dial Professional Dia00115A 0.75 Oz. Skin Care Bar Soap, Cocoa Butter | $124.99 | far above the same kind of item | $1.05 | comparable item: AMBI Cocoa Butter Bar Soap, 3.5 oz |
| Health and Medicine | 642082834 Elite Fat Freeze System. Patented Fat Freezer Body Sculpting System fo | $124.52 | far above the same kind of item | $101.56 | comparable item: Elite Fat Freeze System. Patented Fat Freezer Body |
| Health and Medicine | 119144412 Relief Pak\xc2\xae HotSpot\xc2\xae Moist Heat Pack - neck contour - 7" | $124.50 | far above the same kind of item | $83.83 | comparable item: Relief Pak\xc2\xae HotSpot\xc2\xae Moist Heat Pack |
| Health and Medicine | 33943515 Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Blue Vinyl Pack - circular - 1 | $122.91 | far above the same kind of item | $68.17 | comparable item: Relief Pak\xc2\xae ColdSpot\xe2\x84\xa2 Blue Vinyl |
| Health and Medicine | 23477380 Medline Sterile 12 Ply Cotton Gauze Sponges 12 Ply - 3" x 3" - 80/Box  | $121.58 | far above the same kind of item | $19.16 | comparable item: Medline, MIINON21424, Sterile 12 Ply Cotton Gauze  |
| Health and Medicine | 15826757 Bulkee II Sterile Cotton Gauze Bandages - NON25865 | $121.57 | far above the same kind of item | $30.64 | comparable item: Bulkee II Sterile Cotton Gauze Bandages - NON25850 |
| Health and Medicine | 129655542 Relief Pak HotSpot Moist Heat Pack Cover - 12" Diameter - Circular - 1 | $121.25 | far above the same kind of item | $10.77 | comparable item: Relief Pak\xc2\xae HotSpot\xc2\xae Moist Heat Pack |
| Health and Medicine | 766449656 Corrector and Hallux Valgus Relief Sleeve with liquid Cushion Pads, Be | $120.64 | far above the same kind of item | $11.99 | median price of the same kind of item |
| Health and Medicine | 513902151 Corrector and Hallux Valgus Relief Sleeve with liquid Cushion Pads, Be | $119.99 | far above the same kind of item | $26.39 | comparable item: IGIA Bunion Corrector and Bunion Relief Sleeve wit |
| Health and Medicine | 865845189 Corrector and Hallux Valgus Relief Sleeve with liquid Cushion Pads, Be | $119.99 | far above the same kind of item | $3.55 | median per-unit price of comparable items |
| Health and Medicine | 988637853 Corrector and Hallux Valgus Relief Sleeve with liquid Cushion Pads, Be | $119.99 | far above the same kind of item | $12.00 | comparable item: Bunion Corrector and Orthopedic Hallux Valgus Reli |
| Health and Medicine | 23439718 Medline, MIINON25312, Nonsterile Woven Gauze Sponges, 200 / Box, White | $119.47 | far above the same kind of item | $101.64 | comparable item: Medline, MIINON25412, Nonsterile Woven Gauze Spong |
| Health and Medicine | 55489992 Vvf Amenities Dia06009A 0.75 Oz. Wrapped Basics Bar Soap | $117.48 | far above the same kind of item | $19.50 | comparable item: Dial Amenities Bar Soap Individually Wrapped Scent |
| Health and Medicine | 152267484 3M Transparent Film Dressing Bandage, 4" x 4.75" | $117.00 | far above the same kind of item | $8.53 | comparable item: Cardinal Health Adhesive Bandage Style Transparent |
| Health and Medicine | 135480174 Clean And Clear Face Wash Glam Glow Hand Scrub Hand Food Mens How to G | $116.64 | far above the same kind of item | $10.32 | median price of the same kind of item |
| Health and Medicine | 207603759 AllSource MD 12 Panel Drug Dip Test, 6125 Configuration (25 pack) | $116.13 | far above the same kind of item | $28.95 | comparable item: AllSource MD 5 Panel Dip Drug Test, 254 Configurat |
| Health and Medicine | 43238790 Sterile Bulkee Super Fluff Sponge - NON25852Z | $115.89 | far above the same kind of item | $46.94 | comparable item: Avant Gauze Sterile Drain Sponge - NON256000H |
| Health and Medicine | 282155471 Cobanâ„¢ Latex Cohesive Bandages by 3M Healthcare - MMM1584 | $112.07 | far above the same kind of item | $5.90 | comparable item: Transpore Surgical Tape by 3M healthcare - MMM1527 |
| Health and Medicine | 393355220 AllSource MD 12 Panel Drug Dip Test, 1124 Configuration, 25 pk | $111.85 | far above the same kind of item | $28.95 | comparable item: AllSource MD 5 Panel Dip Drug Test, 254 Configurat |
| Health and Medicine | 596510738 Raw Generation 5-Day Protein Cleanse – High Protein Juice Cleanse with | $109.97 | far above the same kind of item | $9.12 | median price of the same kind of item |
| Health and Medicine | 108627306 Vvf Amenities Dia00194A 1.5 Oz. Deodorant Bar Soap, White | $105.92 | far above the same kind of item | $4.89 | median per-unit price of comparable items |
| Health and Medicine | 133341341 Bath Spa Items Cute Korean Stuff Eyelid Wipes Makeup Stuff Piercing Af | $104.52 | far above the same kind of item | $8.31 | median price of the same kind of item |
| Health and Medicine | 158406515 Bath Spa Items Cute Korean Stuff Eyelid Wipes Makeup Stuff Piercing Af | $104.52 | far above the same kind of item | $8.31 | median price of the same kind of item |
| Health and Medicine | 50212257 Kerlix Bandage Roll Gauze, 3 yds | $104.42 | far above the same kind of item | $2.58 | comparable item: S/B Gauze Bandage 3 X2.5yds |
| Health and Medicine | 15688911216 Alka-Seltzer Efferve | $104.00 | far above the same kind of item | $9.21 | median price of the same kind of item |
| Health and Medicine | 720543551 Alka-seltzer As Mixed 15pc Fspw | $100.80 | far above the same kind of item | $3.28 | median per-unit price of comparable items |
| Health and Medicine | 15235650438 30" Antacid Chew 18 | $100.44 | far above the same kind of item | $6.96 | comparable item: Flanax Antacid 12 oz |
| Health and Medicine | 15319000312 EQ Antacid Chew 30 i | $100.00 | far above the same kind of item | $13.68 | comparable item: EQ ANTACID |
| Health and Medicine | 268483078 South Beach Diet 7 Day Phase 2 Frozen Weight Loss Kit, 21 Meals | $99.99 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Health and Medicine | 704406445 AllSource MD 10 Panel Drug Dip Test, 4104 Configuration, (25 pack) | $99.75 | far above the same kind of item | $28.95 | comparable item: AllSource MD 5 Panel Dip Drug Test, 254 Configurat |
| Health and Medicine | 467098241 AllSource MD 10 Panel Drug Dip Test, 7104 Configuration, (25 pack) | $99.28 | far above the same kind of item | $28.95 | comparable item: AllSource MD 5 Panel Dip Drug Test, 254 Configurat |
| Health and Medicine | 40111240 Sub-Zero Cool Pain Relieving Gel 3.9% Menthol with Cats Claw, 1 Gallon | $98.21 | far above the same kind of item | $9.27 | median price of the same kind of item |
| Health and Medicine | 389909575 No. 1-1/2 Unwrapped Amenity Bar Soap - Fresh Scent (500/Carton) | $95.73 | far above the same kind of item | $6.98 | median price of the same kind of item |
| Health and Medicine | 185165182 Foot Remover Gel Cuticle Remover Gel Pumice Stone Feet Cuticle Care Fo | $93.31 | far above the same kind of item | $62.73 | comparable item: Foot Pumice Stone for Heavy Feet Grader Pretty Han |
| Health and Medicine | 100988891 Liquid Bandage Spray Liquid Skin Bandage Band Liquid Bandage Liquid Ba | $90.72 | far above the same kind of item | $5.09 | comparable item: Curad Liquid Spray Bandage, 40mL |
| Health and Medicine | 176161685 Liquid Bandage Spray Liquid Skin Bandage Band Liquid Bandage Liquid Ba | $89.42 | far above the same kind of item | $5.09 | comparable item: Curad Liquid Spray Bandage, 40mL |
| Health and Medicine | 187894593 Vvf Amenities Dia06010A 1.5 Oz. Wrapped Basics Bar Soap | $88.53 | far above the same kind of item | $38.99 | comparable item: Dial Amenities Bar Soap Individually Wrapped Scent |
| Health and Medicine | 50212364 Tubigrip Cotton Elastic Tubular Support Bandage, Size F, 2 yds | $87.92 | far above the same kind of item | $68.93 | comparable item: Tubigrip Cotton Elastic Tubular Support Bandage, S |
| Health and Medicine | 482378861 EYEGLASS CLEANING CLOTHS 2PK MICROFIBER AST COLOR/MERCH STRIP, Case Pa | $86.68 | far above the same kind of item | $6.30 | median price of the same kind of item |
| Health and Medicine | 32574505 Kleenex Alcohol-Free Foam Hand Sanitizer, 1,000 ml, Clear, 6/Carton | $86.56 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Health and Medicine | 573769972 Co-Flex LF2 Non-Sterile Latex-Free Bandages - MDS089002 | $85.04 | far above the same kind of item | $10.53 | comparable item: Co-Flex LF2 Non-Sterile Latex-Free Bandages - MDS0 |
| Health and Medicine | 146119810 Filler for Deep Instantly Head Strip Nose Pimple Patch Daily Facial Mo | $83.61 | far above the same kind of item | $8.31 | median price of the same kind of item |
| Health and Medicine | 32549161 Kleenex Alcohol-Free Foam Hand Sanitizer, 1,200 ml, Clear, 2/Carton | $82.31 | far above the same kind of item | $15.08 | comparable item: Enriched Foam Alcohol-Free E3 Hand Sanitizer Refil |
| Health and Medicine | 166178286 Skin Remover for Feet Pedicure Liners Disposable Wart Remover for Face | $81.29 | far above the same kind of item | $7.29 | median price of the same kind of item |
| Health and Medicine | 27757152 CURAD Sterile Xeroform Gauze - CUR253590H | $81.25 | far above the same kind of item | $27.36 | comparable item: CURAD Sterile Xeroform Gauze - CUR253440H |
| Health and Medicine | 50212360 Molnlycke 1438 Tubigrip Cotton Tubular Bandage | $81.24 | far above the same kind of item | $65.85 | comparable item: Molnlycke 1437 Tubigrip Cotton Tubular Bandage |
| Health and Medicine | 47075609 Ringside Ultimate Classic Boxing Gauze - 50 Rolls | $79.99 | far above the same kind of item | $69.99 | comparable item: Ringside Super Boxing Gauze - Box of 50 Rolls |
| Health and Medicine | 48938516 Oral Electrolyte Solution For Children & Adults, Hydration Drink, Stra | $79.99 | far above the same kind of item | $44.99 | comparable item: Oral Electrolyte Solution For Children & Adults, H |
| Health and Medicine | 50212362 Molnlycke 1448 Tubigrip Cotton Tubular Bandage | $79.87 | far above the same kind of item | $65.85 | comparable item: Molnlycke 1437 Tubigrip Cotton Tubular Bandage |
| Health and Medicine | 50212392 Molnlycke Lyofoam Max Dressing First Aid Gauze Box 10 Count | $78.90 | far above the same kind of item | $6.27 | median per-unit price of comparable items |
| Health and Medicine | 50212357 Molnlycke 1439 Tubigrip Tubular Bandage Size G Natural 4 1/2 in. x 10M | $78.87 | far above the same kind of item | $65.85 | comparable item: Molnlycke 1437 Tubigrip Cotton Tubular Bandage |
| Health and Medicine | 975505532 AllSource MD 10 Panel Dip Card, 6104 (25 Pack) | $77.38 | far above the same kind of item | $2.40 | comparable item: AllSource MD 2 Panel Buprenorphene / TCA Dip Card |
| Health and Medicine | 835669321 Co-Flex Sterile Latex Bandages - DYNJ086003 | $77.10 | far above the same kind of item | $9.01 | comparable item: Co-Flex Sterile Latex Bandages - DYNJ086004H |
| Health and Medicine | 499031593 Natural Aid For Scabies, Psoriasis, Jock Itch, Ringworm, Herpes - Herb | $74.97 | far above the same kind of item | $27.05 | median per-unit price of comparable items |
| Health and Medicine | 557343407 Natural Aid For Scabies, Psoriasis, Jock Itch, Ringworm, Herpes - Herb | $74.97 | far above the same kind of item | $27.05 | median per-unit price of comparable items |
| Health and Medicine | 43249183 Non-Sterile Matrix Elastic Bandages - MDS087006LF | $74.83 | far above the same kind of item | $60.36 | comparable item: Non-Sterile Matrix Elastic Bandages - MDS087104LF |
| Health and Medicine | 48319539 Acetaminophen Suppository Pediatric Perrigo Pharmaceuticals, 12 ct | $74.54 | far above the same kind of item | $1.77 | median per-unit price of comparable items |
| Health and Medicine | 54135660 Bayer Baby Aspirin Regimen Low Dose Ente | $73.70 | far above the same kind of item | $7.15 | median price of the same kind of item |
| Health and Medicine | 885495939 Easy@Home 10 Panel Instant Drug Test Kits - Testing Marijuana (THC), C | $73.65 | far above the same kind of item | $42.81 | comparable item: Easy@Home 12 Pack - Easy@Home 10 Panel Instant Dru |
| Health and Medicine | 797051566 Co-Flex LF2 Non-Sterile Latex-Free Bandages - MDS089004CP | $73.63 | far above the same kind of item | $10.53 | comparable item: Co-Flex LF2 Non-Sterile Latex-Free Bandages - MDS0 |
| Health and Medicine | 702697829 Co-Flex LF2 Non-Sterile Latex-Free Bandages - MDS089003 | $72.57 | far above the same kind of item | $10.53 | comparable item: Co-Flex LF2 Non-Sterile Latex-Free Bandages - MDS0 |
| Health and Medicine | 220476443 AllSource MD 5 Panel Drug Dip Test, 254 Configuration (25 Pack) | $61.90 | far above the same kind of item | $28.95 | comparable item: AllSource MD 5 Panel Dip Drug Test, 254 Configurat |
| Health and Medicine | 267139473 AllSource MD 5 Panel Drug Dip Test, 754 Configuration (25 Pack) | $61.90 | far above the same kind of item | $28.95 | comparable item: AllSource MD 5 Panel Dip Drug Test, 254 Configurat |
| Health and Medicine | 698648915 Atkins Chocolate Chip Cookie Dough Protein Meal Bar, High Fiber, Low S | $53.88 | far above the same kind of item | $9.70 | comparable item: $2 OFF SlimFast Keto Meal Replacement Bar Chocolat |
| Health and Medicine | 39785136 NOW Essential Oils, Patchouli Oil, Earthy Aromatherapy Scent, Steam Di | $47.98 | far above the same item's other variants | $58.96 | comparable item: NOW Essential Oils, Patchouli Oil, Earthy Aromathe |
| Health and Medicine | 638475636 Atkins Blueberry Greek Yogurt Protein Meal Bar, Fiber Bar, High Protei | $47.88 | far above the same kind of item | $7.98 | comparable item: Atkins Protein-Rich Meal Bar, Blueberry Greek Yogu |
| Health and Medicine | 55109205 Nutrisystem NutriCRUSH Lunch Strawberry Yogurt Bars, 1.8 oz, 5 count | $41.88 | far above the same kind of item | $6.98 | comparable item: Nutrisystem NutriCRUSH Lunch Strawberry Yogurt Bar |
| Health and Medicine | 17856767369 BOOST 20g High Protein Nutritional Drink Shakes, Mixed Flavor Bundle,  | $32.08 | far above the same item's other variants | $9.65 | comparable item: BOOST 20g High Protein Nutritional Drink Shakes, C |
| Health and Medicine | 39493979 NOW Essential Oils, Ylang Ylang Extra Oil, Steam Distilled, 100% Pure, | $27.54 | far above the same item's other variants | $7.98 | comparable item: NOW Essential Oils, Tea Tree Oil, Steam Distilled, |
| Health and Medicine | 666850405 Pedialyte Advanced Rehydration Electrolyte Drink, Orange, 1 Liter, Pac | $19.98 | far above the same item's other variants | $5.98 | comparable item: Pedialyte Advanced Rehydration Electrolyte Drink,  |
| Health and Medicine | 953465850 Pedialyte Advanced Rehydration Electrolyte Drink, Berry Frost, 1 Liter | $19.98 | far above the same item's other variants | $5.98 | comparable item: Pedialyte Advanced Rehydration Electrolyte Drink,  |
| Health and Medicine | 15002352188 Quest Tortilla Style Protein Chips, Salsa Verde Flavored, Baked, 1.1oz | $9.48 | far above the same item's other variants | $2.50 | comparable item: Quest Tortilla Style Protein Chips, Salsa Verde Fl |
| Health and Medicine | 641237589 Premier Protein Shake, Pumpkin Spice, 30g Protein, 11.5 fl oz, 1 Ct | $8.39 | far above the same item's other variants | $2.50 | comparable item: Premier Protein Shake, Pumpkin Spice, 30g Protein, |
| Health and Medicine | 15667503417 Premier Protein Shake, Indulgence Chocolate Strawberry, 30g Protein, 1 | $8.08 | far above the same item's other variants | $2.64 | median per-unit price of comparable items |
| Health and Medicine | 465730824 Sundown Naturals® Echinacea Whole Herb 400 mg, 100 Capsules | $0.73 | far below comparable items | $8.05 | comparable item: Nature's Bounty Echinacea Whole Herb Capsules, 400 |
| Health and Medicine | 129468396 Equate Antibacterial Gauze Pads, 2 in x 2 in, 24 Count | $0.59 | far below comparable items | $6.53 | comparable item: Equate Antibacterial Gauze Pads, 4 in x 4 in, 20 C |
| Health and Medicine | 101959756 Isopure Zero Carb Protein Powder, Strawberries & Cream, 25g Protein, 1 | $0.50 | far below comparable items | $15.00 | comparable item: Isopure Zero Carb Protein Powder, Strawberries & C |
| Health and Medicine | 444003742 LIT™ On-The-Go Pre-Workout, Snow Cone, 16 Ounces | $0.40 | far below comparable items | $5.49 | comparable item: Beyond Raw® LIT™ On-The-Go Pre-Workout, Jolly Ranc |
| Health and Medicine | 525433284 Sundown Melatonin 10 Mg, 90 Capsules | $0.16 | far below comparable items | $7.17 | comparable item: Life Extension Melatonin 1 mg, 60 Capsules |
| Health and Medicine | 641573941 Citracal +D3 Maximum Calcium Citrate Caplets, 120 Ct | $0.09 | below range | $12.41 | comparable item: Citracal Calcium Citrate Maximum Plus Caplets Plus |
| Health and Medicine | 11162655308 Pip Lancets 30G | $0.09 | below range | $3.34 | comparable item: Relion 30g Lancets 200ct |
| Health and Medicine | 390451725 ibuprofen | $0.08 | below range | $6.23 | comparable item: IBUPROFEN |
| Health and Medicine | 15557056062 LORAZEPAM TB ANI 2MG | $0.08 | below range | $17.66 | median price of its category |
| Health and Medicine | 15670901637 GLYCERIN USP M 100ML | $0.08 | below range | $5.37 | comparable item: Pharmacy Glycerin Liqui 473ml |
| Health and Medicine | 15685659367 ORA-PLUS ORAL 473ML | $0.08 | below range | $155.62 | median per-unit price of comparable items |
| Health and Medicine | 295737828 ibuprofen | $0.06 | below range | $6.23 | comparable item: IBUPROFEN |
| Health and Medicine | 103451097 Major Banophen Diphenhydramine Hydrochloride, Pink, 100 ct | $0.05 | below range | $5.97 | comparable item: Major Banophen Diphenhydramine Hydrochloride Mini  |
| Health and Medicine | 343961824 Easy Touch 21G X 1" | $0.04 | below range | $1.85 | median per-unit price of comparable items |
| Health and Medicine | 140282905 Major ProSight Vitamin & Mineral Ascorbic Acid Supplement Tabs, Gray,  | $0.03 | below range | $6.13 | comparable item: Major Certa-Vite Ascorbic Acid Vitamin & Mineral S |
| Health and Medicine | 15523469498 DIAZEPAM TB AURO 2MG | $0.03 | below range | $17.66 | median price of its category |
| Health and Medicine | 15541463002 DIAZEPAM TB AURO 2MG | $0.03 | below range | $17.66 | median price of its category |
| Health and Medicine | 400460056 72 PC SUNGLASS RACK | $0.02 | below range | $17.66 | median price of its category |
| Health and Medicine | 6932716225 INFUSE® for Astigmatism | $0.02 | below range | $99.00 | comparable item: BAUSCH & LOMB INFUSE® |
| Health and Medicine | 10902524938 PRECISION 7 SPHERE TRIAL | $0.02 | below range | $17.66 | median price of its category |
| Health and Medicine | 13101116169 Clariti 1 D MF 3 Trial Add HI | $0.02 | below range | $17.66 | median price of its category |
| Health and Medicine | 19445268635 ACUVUE® OASYS MAX 1-Day Multifocal for Astigmatism | $0.02 | below range | $125.00 | comparable item: ULTRA® Multifocal for Astigmatism |
| Health and Medicine | 251424300 Bausch & Lomb +0.00 EUREKA! DAILY - 90 PACK | $0.01 | below range | $25.97 | comparable item: Mushroom Design Daily |
| Health and Medicine | 564171878 WMD49 2021 Polar Optics Sunglass Header GRAPHIC | $0.01 | below range | $15.00 | median price of its category |
| Health and Medicine | 635487500 Equate Folding Knee Walker with Storage Bag Riser Sample | $0.01 | below range | $138.00 | comparable item: Equate Folding Knee Walker with Adjustable Height  |
| Health and Medicine | 939162041 WMD49 2021 Polar Optics Tower Sunglass Header GRAPHIC | $0.01 | below range | $15.00 | median price of its category |
| Health and Medicine | 9772668018 OMEPRAZOLE 20 MG | $0.01 | below range | $92.99 | comparable item: Equaline Omeprazole 20mg, 42 CT (Pack of 3) |
| Home | 51406417 West Bend CL401V Venti Hot Beverage Maker, Black | $99.99 | far above the same kind of item | $33.34 | comparable item: West Bend CL50024 Cocoa Crazy 24-Ounce Hot Beverag |
| Home | 257302423 KitchenAid Metal Automatic Milk Frother Attachment, Onyx Black, KESMK5 | $99.99 | far above the same kind of item | $79.95 | comparable item: KitchenAid Automatic Milk Frother Attachment, Blac |
| Home | 302350477 Convection Pizza Oven | $99.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 616271196 Dash Everyday Stainless Steel Bread Maker up to 1.5lb Loaf, Programmab | $99.99 | far above the same kind of item | $4.96 | median price of the same kind of item |
| Home | 638590366 Best Automatic Hand Sanitizer Dispenser with Tray 1,200 mL Capacity, 5 | $99.99 | far above the same kind of item | $31.90 | comparable item: Purell CS6 Automatic Hand Sanitizer Dispenser 1200 |
| Home | 778262298 KitchenAid Metal Automatic Milk Frother Attachment, Empire Red, KESMK5 | $99.99 | far above the same kind of item | $56.95 | comparable item: KitchenAid Metal Automatic Milk Frother Attachment |
| Home | 1156984679 Melitta Montalatte Milk Frother Coffee and Hot Chocolate Stainless Ste | $99.99 | far above the same kind of item | $13.90 | comparable item: European Gift & Houseware 12 oz Stainless Steel Mi |
| Home | 1531868672 Dash Everyday Stainless Steel Bread Maker Up to 1.5lb Loaf, Programmab | $99.99 | far above the same kind of item | $4.96 | median price of the same kind of item |
| Home | 5282505519 KFFKFF Insulated Iced and Hot Beverage Server/Dispenser 5 Gallon Bever | $99.99 | far above the same kind of item | $61.90 | comparable item: KFFKFF Beverage Server, Dual 5-Gallon Drink Holder |
| Home | 20220116937 ONSON Food Dehydrator Machine, 8 Stainless Steel Trays, 650W Power, 16 | $99.99 | far above the same kind of item | $7.83 | median price of the same kind of item |
| Home | 20812852360 KFFKFF Commercial Cotton Candy Machine, 1000W Electric Candy Floss Mak | $99.99 | far above the same kind of item | $8.30 | median price of the same kind of item |
| Home | 20818111989 KFFKFF Commercial Cotton Candy Machine, 1000W Electric Candy Floss Mak | $99.99 | far above the same kind of item | $8.30 | median price of the same kind of item |
| Home | 23991112 Newwave Multi Purpose Pizza Maker | $99.98 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 951401574 Cuisinart Automatic Bread Maker CBK-100BK, Black Stainless | $99.95 | far above the same kind of item | $6.80 | median price of the same kind of item |
| Home | 22256102 GOJO® Purell® LTX-7 Touch-Free Hand Sanitizer Dispenser, 700 mL., Blac | $99.39 | far above the same kind of item | $22.95 | comparable item: Purell® Es6 Hand Sanitizer Dispenser |
| Home | 38765843 R-BM-01 2 lbs. Programmable Bread Maker | $99.34 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 277310060 Hamilton Beach 29886 Artisan Dough & Bread Maker | $98.95 | far above the same kind of item | $6.80 | median price of the same kind of item |
| Home | 2150626630 Presto Pizzazz Plus Rotating Pizza Oven, 03432 Black | $98.84 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 5026151188 Granitestone PIEZANO 12 Inch Electric Indoor Pizza Oven Heats up to 80 | $98.80 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 22579509 Oster 2 Pound Bread Maker | $98.48 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 250445741 Home Craft HCPO12BK Convection Pizza Oven with Glass Door and Stone | $97.77 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 187306781 Shun Sora Bread Knife, 9 inch Serrated Stainless Steel Blade, Handcraf | $96.98 | far above the same kind of item | $21.43 | comparable item: MasterPan Masterlon Serrated Bread Knife with Cove |
| Home | 667765019 Wusthof 8 Inch Serrated Bread Knife | Full Tang, High Carbon Stainless | $96.98 | far above the same kind of item | $21.43 | comparable item: MasterPan Masterlon Serrated Bread Knife with Cove |
| Home | 648018132 Tri-Ply Clad 5 Qt Covered Stainless Steel Dutch Oven | $96.00 | far above the same item's other variants | $62.60 | comparable item: Tramontina 5-Qt Stainless Steel Tri-Ply Clad Cover |
| Home | 52224813 DeLonghi Distinta Electric Milk Frother, Metal Body | $95.35 | far above the same kind of item | $8.56 | median price of the same kind of item |
| Home | 23516922 Cuisinart BMKR-200 2-Pound Fully Automatic Compact Bread Maker | $95.17 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 23104314 Westbrass D2175-12 Country Modern Farmhouse Style Kitchen Sink Deck Mo | $95.04 | far above the same kind of item | $56.93 | comparable item: Westbrass D2170P-26 Air Gap Kitchen Sink Soap/Hand |
| Home | 794974383 10 Pack Replacement Range Hood Charcoal Filter fits Whirlpool W1038687 | $95.01 | far above the same kind of item | $48.59 | comparable item: 5 Pack Replacement Range Hood Charcoal Filter fits |
| Home | 458541728 TableTop Chefs Pizzarette Classic 4 Person Indoor Countertop Mini Pizz | $94.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 726772800 Moosoo 2 LB Bread Machine 18-in-1 Automatic Bread Maker with Time Dela | $94.99 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 25618960 Marcato Atlas 180 Roller Manual Pasta Machine, Made in Italy | $94.95 | far above the same kind of item | $43.55 | comparable item: Marcato Atlas Pasta Bike Cutter with Interchangeab |
| Home | 592318421 Coastwide Professional J-Series Automatic Hand Soap Dispenser, 1,200 m | $94.59 | far above the same kind of item | $42.34 | comparable item: Coastwide Professional CWJMS-B-CC 1200 ml J Series |
| Home | 139036946 Gourmia GPM-1300 12" Countertop Crispy Crust Pizza Maker Oven with Rot | $92.84 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 744024184 Renown Fmx-20 Hand Soap Dispenser, Black/Chrome | $92.71 | far above the same kind of item | $14.21 | comparable item: GOJO PRO 2,000 Hand Soap Dispenser, 2,000 mL, 7.06 |
| Home | 976298450 RENOWN FMX-20 HAND SOAP DISPENSER, WHITE/GRAY, per 3 Each | $92.71 | far above the same kind of item | $17.09 | comparable item: Genuine Joe Foam Hand Soap Dispenser, Gray/White |
| Home | 187185502 White Marble Pastry Slab 18x18x.75 | $92.00 | far above the same kind of item | $31.99 | comparable item: Marble Mortar and Pestle - White |
| Home | 148753638 Marcato Atlas 150 Roller Pasta Machine, Made in Italy | $91.56 | far above the same kind of item | $49.95 | comparable item: Pasta Roller Kit Made in Italy |
| Home | 2372076518 LG Genuine OEM AGM73269505 Washer Bleach and Fabric Softener Dispenser | $91.30 | far above the same kind of item | $22.55 | comparable item: LG Genuine OEM 5006ER3014B Washer Fabric Softener  |
| Home | 5286414005 KFFKFF Insulated Iced and Hot Beverage Server/Dispenser 2.5 Gallon Bev | $90.99 | far above the same kind of item | $84.90 | comparable item: KFFKFF Dual 2.1-Gallon Beverage Dispenser for Part |
| Home | 14188551249 KFFKFF Thermal Beverage Holder, 2.5 Gallon, LDPE Material Suitable for | $90.99 | far above the same kind of item | $38.24 | comparable item: KFFKFF Beverage Server, Dual 3-Gallon Dispensers,  |
| Home | 24537635 BoardWalk 285TPK Unwrapped Jumbo Straws, 7 3/4", Plastic, Translucent, | $90.82 | far above the same kind of item | $75.45 | comparable item: BoardWalk 285BLKCT Unwrapped Jumbo Straws, 7 3/4", |
| Home | 117542911 Eco-Products, Inc EP-PW6 Wheat Straw Plate, Compostable, 6" Paper Plat | $90.08 | far above the same kind of item | $3.72 | median price of the same kind of item |
| Home | 21934199 San Jamar Countertop Napkin Dispenser 7 5/8 x 11 x 5 1/2 Capacity: 300 | $90.06 | far above the same kind of item | $8.11 | median price of the same kind of item |
| Home | 213642624 Sencor STX 002 Pasta Maker - Tagliatele Attachment for STM4x | $89.99 | far above the same kind of item | $5.57 | median price of the same kind of item |
| Home | 448389660 Sencor STX 003 Pasta Maker - Linguine Attachment for STM4x | $89.99 | far above the same kind of item | $5.57 | median price of the same kind of item |
| Home | 554524133 Kitchenaid Full Size 24-inch Expandable Dish-Drying Rack in Charcoal | $89.99 | far above the same kind of item | $46.99 | comparable item: Kitchenaid Low Profile Powder Coated Dish Drying R |
| Home | 862988579 Sencor STX 001 Pasta Maker - Lasagne Attachment for STM4x | $89.99 | far above the same kind of item | $5.57 | median price of the same kind of item |
| Home | 616020786 Mr. Coffee 3-in-1 Frappe Frozen Coffeemaker, Sake | $89.96 | far above the same kind of item | $6.12 | median price of the same kind of item |
| Home | 37487319 Bodum Pebo Vacuum Coffee Maker, 34 Ounce, Black | $89.95 | far above the same item's other variants | $52.80 | comparable item: Bodum Bistro Programmable Coffee Maker, 51 Ounce,  |
| Home | 442178945 MOOSOO 3.5LB Bread Machine 15-in-1 Automatic Bread Maker With Gluten-F | $89.92 | far above the same kind of item | $19.08 | median per-unit price of comparable items |
| Home | 5246459170 SKYSHALO Insulated Iced and Hot Beverage Server/Dispenser 2.5 Gallon B | $89.90 | far above the same kind of item | $41.24 | comparable item: SKYSHALO Beverage Server, 3-Gallon Capacity, Party |
| Home | 883399312 Aroma 2-lb. Bread Maker | $89.50 | far above the same kind of item | $13.05 | comparable item: Food For Life Bread, 24 Oz |
| Home | 1055806349 Hamilton Beach 2 lb Bread Maker Machine with 12 Settings Plus Gluten F | $89.00 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 14880148 BoardWalk 2851TCT Jumbo Straws, 7 3/4", Plastic, Translucent, 500/Pack | $88.30 | far above the same kind of item | $51.29 | comparable item: GEN Unwrapped Jumbo Straws 7 3/4" Translucent 225/ |
| Home | 2623229616 LG Genuine OEM ACZ73270501 Washer Bleach Dispenser | $87.80 | far above the same kind of item | $16.67 | comparable item: LG Genuine OEM 5006ER3022A Washer Bleach Dispenser |
| Home | 106863930 Rowenta, DW3182, Steamcare Steam Iron, 1600 Watts, Charcoal | $87.78 | far above the same kind of item | $71.46 | comparable item: Rowenta Iron Steam 1500W Auto Cordreel |
| Home | 14845222838 LammaLoe Electric Pizza Oven Indoor, Crispy Crust 12" Stone Pizza Make | $86.43 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 2090748199 Hamilton Beach 2 lb Bread Maker Machine, 14 Settings, Gluten-Free, Cru | $86.24 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 993804640 6 Layer Acrylic Cosmetic Nail Polish Bottle Storage Holder Display Wal | $86.04 | far above the same kind of item | $56.61 | comparable item: 6 Layer Acrylic Cosmetic Nail Polish Bottle Storag |
| Home | 10575905 PM1005WHGEN Pasta Maker | $85.99 | far above the same kind of item | $26.01 | comparable item: Amav - Pasta Maker |
| Home | 37001714 Ronco Electric Pasta Noodle and Sausage Maker Kitchen Machine, White | $85.99 | far above the same kind of item | $5.57 | median price of the same kind of item |
| Home | 14278302998 KFFKFF Automated Pasta Creation Device, 9 Customizable Density Options | $85.99 | far above the same kind of item | $5.57 | median price of the same kind of item |
| Home | 17545814464 KFFKFF Electric Pizza Oven, Indoor Pizza Maker with 5 Preset Modes, 12 | $85.21 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 100106758 Tojiro Bread Slicer 270mm F-687 | $84.17 | far above the same kind of item | $14.27 | comparable item: 10" Bread Slicer |
| Home | 700378937 Whirlpool W10187307 Bleach Dispenser | $83.78 | far above the same kind of item | $19.08 | comparable item: Whirlpool 8566266 Bleach Dispenser |
| Home | 35074945 CuiZen CPIZ - 2800 - Pizza oven | $82.41 | far above the same kind of item | $48.52 | comparable item: Magic Chef Pizza Oven |
| Home | 25884325 Kingston Brass CC2162 8-3/8 Inch Clawfoot Tub Hanging Soap and Sponge  | $81.59 | far above the same kind of item | $58.70 | comparable item: Kingston Brass CC2161 8-3/8 Inch Clawfoot Tub Hang |
| Home | 113486496 Dart DCC DLW626 Open-Top Dome Lid for 16-24 oz Plastic Cups, Clear, 1. | $81.20 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Home | 4768220 General Electric Professional Pizza Oven | $80.19 | far above the same kind of item | $54.10 | comparable item: ELECTRIC PIZZA MAKER/OVEN |
| Home | 49423662 Bodum Columbia Stainless Steel Double Wall French Press Coffee Maker,  | $80.00 | far above the same item's other variants | $70.00 | comparable item: Bodum Columbia Stainless Steel Double Wall French  |
| Home | 157811034 Revel CTM-660 Tortilla Roti Flat Bread Maker (110V) USA Canada, 8", St | $80.00 | far above the same kind of item | $6.80 | median price of the same kind of item |
| Home | 5340366761 Presto Pizzazz Plus Electric Rotating Pizza Oven Green and Yellow, New | $79.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 8467180 Chef Pepin Juice Extractor | $79.98 | far above the same kind of item | $9.32 | comparable item: Lakewood Lakewood Organic Juice, 32 oz |
| Home | 22848307 Tramontina Gourmet Prima 5-Quart Covered Dutch Oven with Tri-Ply Base | $79.95 | far above the same item's other variants | $60.75 | comparable item: Tramontina Gourmet Prima 3-Quart Covered Casserole |
| Home | 14290013614 16OZ CAMPER MUG AST | $79.68 | far above the same item's other variants | $3.99 | comparable item: Zak Designs 16oz Chucky Ceramic Camper Mug |
| Home | 14308673966 16OZ CAMPER MUG BLU | $79.68 | far above the same item's other variants | $3.99 | comparable item: Zak Designs 16oz Chucky Ceramic Camper Mug |
| Home | 3218 Presto Pizzazz Plus Rotating Pizza Oven, 03430 Black | $79.00 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 37894237 Renown Touch-Free Foam Hand Soap Dispenser, 1,200 Ml, Dove Gray | $78.58 | far above the same kind of item | $50.70 | comparable item: Renown Touch-Free Foam Hand Soap Dispenser, 1,200  |
| Home | 575733440 Professional Series Electric 1450 Watts Indoor Pizza Oven Stainless St | $78.00 | far above the same kind of item | $48.03 | comparable item: Oster Stainless Steel Pizza Oven |
| Home | 5296274391 Dextrus 12" Outdoor Grill Top Pizza Oven with Built in Thermometer, Pi | $78.00 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 29295093 Hamilton Beach Enclosed Pizza Maker, Pizza Oven with Viewing Window, M | $77.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 18652554368 KFFKFF Countertop Electric Pizza Oven, 12-inch, 1500W, 32-572°F Temper | $77.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 25884326 Kingston Brass CC2168 8-3/8 Inch Clawfoot Tub Hanging Soap and Sponge  | $77.97 | far above the same kind of item | $68.14 | comparable item: Kingston Brass CC2167 8-3/8 Inch Clawfoot Tub Hang |
| Home | 29303671 Kingston Brass CC2165 8-3/8 Inch Clawfoot Tub Hanging Soap and Sponge  | $77.97 | far above the same kind of item | $68.14 | comparable item: Kingston Brass CC2167 8-3/8 Inch Clawfoot Tub Hang |
| Home | 18250215245 KFFKFF 12-Inch Electric Pizza Oven, 1200W Pizza Maker with Cordierite  | $77.90 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 11780606824 Dart® Open-Top Dome Lid, Fits 9 Oz To 22 Oz Plastic Cups, Clear, 1.9"  | $77.63 | far above the same kind of item | $3.86 | median per-unit price of comparable items |
| Home | 21093504 Nine Stars Automatic Kitchen Trash Can Combo, 13.2 and 3.2 Gallon Stai | $76.70 | far above the same item's other variants | $74.00 | comparable item: Nine Stars Automatic Kitchen Trash Can Combo, 13.2 |
| Home | 963319914 La Gourmet Pizza Maker | $76.07 | far above the same kind of item | $49.99 | comparable item: Westinghouse Pizza Maker |
| Home | 14875619585 LammaLoe Electric Pizza Oven Indoor, Crispy Crust 12" Stone Pizza Make | $75.63 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 37299947 Ziploc 16 Qt./4 Gal. WeatherShield Storage Box, 6 Pack, Clear | $74.99 | far above the same kind of item | $5.84 | comparable item: Ziploc Slider Storage 2.5 Gal 12ct |
| Home | 46905841 Nesco 12 Program Automatic Bread Maker (BDM-110) | $74.99 | far above the same kind of item | $5.45 | median per-unit price of comparable items |
| Home | 22856244 Tramontina Gourmet Ceramica_01 Deluxe 5-Quart Covered Dutch Oven | $74.95 | far above the same item's other variants | $69.95 | comparable item: Tramontina Gourmet Ceramica_01 Deluxe 6-Quart Cove |
| Home | 450244383 Shun Sora 9" Bread Knife + $25 Gift Card | $74.95 | far above the same kind of item | $6.80 | median price of the same kind of item |
| Home | 551974113 Rozmoz Stainless Steel Bread Machine, 2 lb Bread Maker, Automatic Brea | $74.95 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 23104397 Westbrass D2175-26 Country Modern Farmhouse Style Kitchen Sink Deck Mo | $74.13 | far above the same kind of item | $56.93 | comparable item: Westbrass D2170P-26 Air Gap Kitchen Sink Soap/Hand |
| Home | 32571090 Dial Professional Duo Basics Hand Wash Dispenser Kit, 7 1/4x3 7/8x11 3 | $73.42 | far above the same kind of item | $26.47 | median per-unit price of comparable items |
| Home | 21582287 BLACK+DECKER Bread Maker, Bread Machine, White, BK1015W | $73.34 | far above the same kind of item | $6.80 | median price of the same kind of item |
| Home | 885681423 DELLA 1000g 650W Automatic Programmable Bread Maker Machine 3 Crust Co | $72.05 | far above the same kind of item | $12.02 | median per-unit price of comparable items |
| Home | 23103431 Westbrass D2178-26 Contemporary Kitchen Sink Deck Mounted Liquid Soap/ | $71.99 | far above the same kind of item | $56.93 | comparable item: Westbrass D2170P-26 Air Gap Kitchen Sink Soap/Hand |
| Home | 46645589 Oster 2-Pound Expressbake Bread Machine with 13-Hour Delay Timer | $71.80 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 138130976 Georgia-Pacific Professional, Pacific Blue Ultra? Automated Touchless  | $71.00 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Home | 22856245 Tramontina Gourmet Domus 5-Quart Covered Dutch Oven | $70.99 | far above the same item's other variants | $69.97 | comparable item: Tramontina Gourmet 6.5-Quart Cast Iron Covered Dut |
| Home | 924564628 Wusthof 8 Inch Serrated Bread Knife | Full Tang, High Carbon Stainless | $70.00 | far above the same kind of item | $21.43 | comparable item: MasterPan Masterlon Serrated Bread Knife with Cove |
| Home | 25464611 Atlas 150 Color Home-made Pasta Machine | $69.99 | far above the same kind of item | $43.55 | comparable item: Marcato Atlas Pasta Bike Cutter with Interchangeab |
| Home | 29384682 Presto Stainless Steel Pizza Oven 03436 | $69.99 | far above the same kind of item | $48.03 | comparable item: Oster Stainless Steel Pizza Oven |
| Home | 40159361 Euro Cuisine Yogurt Maker - Makes 2 quarts Yogurt or Greek Yogurt, Gre | $69.99 | far above the same kind of item | $9.24 | median per-unit price of comparable items |
| Home | 14360505283 KFFKFF Bread Crafting Device, Multifunctional 19-Settings 2LB Dough Me | $69.99 | far above the same kind of item | $10.90 | median per-unit price of comparable items |
| Home | 16009971781 ONSON Pizza Maker with Ceramic Stone, Heats up to 800°F, 12 Inch Count | $69.99 | far above the same kind of item | $54.99 | comparable item: ONSON 12-Inch Pizza Maker with Ceramic Stone, Heat |
| Home | 18463663589 KFFKFF 12-Inch Electric Pizza Oven, 1200W Pizza Cooker with Cordierite | $69.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 18477206237 KFFKFF Electric Pizza Oven with Cordierite Stone, Stainless Steel, 15× | $69.99 | far above the same kind of item | $5.98 | median price of the same kind of item |
| Home | 309805513 iTouchless Automatic Hand Soap Dispenser 325mL White (SFD002W) | $69.95 | far above the same kind of item | $44.19 | comparable item: iTouchless Ultraclean Automatic Hand Soap Dispense |
| Home | 169102974 Marcato Atlas Collapsible Pasta Drying Rack, Made In Italy, Red | $69.07 | far above the same kind of item | $43.55 | comparable item: Marcato Atlas Pasta Bike Cutter with Interchangeab |
| Home | 135438698 OVENTE Electric Coffee Grinder with One Touch Push-Button, Maroon CG22 | $68.99 | far above the same item's other variants | $14.99 | comparable item: OVENTE Electric Coffee Grinder with One Touch Push |
| Home | 19466724407 Ultimate Probiotic Yogurt Maker with 8 6 oz Glass Jars, Adjustable Tem | $68.95 | far above the same kind of item | $2.22 | median per-unit price of comparable items |
| Home | 15435975 KitchenAid Pasta Drying Rack (KPDR) | $68.88 | far above the same kind of item | $16.99 | comparable item: Norpro Pasta Drying Rack |
| Home | 32594193 Dial Complete Foam Hand Soap Starter Kit | $68.68 | far above the same kind of item | $17.64 | comparable item: Dial Complete Foaming Hand Soap Refill, Original,  |
| Home | 23000708 Tramontina 5-Qt Stainless Steel Tri-Ply Clad Covered Dutch Oven | $65.97 | far above the same item's other variants | $62.60 | comparable item: Tramontina 5-Qt Stainless Steel Tri-Ply Clad Cover |
| Home | 289772790 Coastwide Professional J Series Manual Hand Soap Dispenser, 1,200 mL B | $65.61 | far above the same kind of item | $42.34 | comparable item: Coastwide Professional CWJMS-B-CC 1200 ml J Series |
| Home | 36779667 Tramontina Gourmet Ceramica_01 Deluxe 5-Quart Covered Dutch Oven | $64.95 | far above the same item's other variants | $69.95 | comparable item: Tramontina Gourmet Ceramica_01 Deluxe 6-Quart Cove |
| Home | 55047941 French Press 8 Cup Coffee Maker - Coffee Blade Grinder - 34 oz. Water  | $63.32 | far above the same item's other variants | $49.20 | comparable item: BODUM 1 Cup Matte Coffee French Press |
| Home | 40159362 Euro Cuisine Yogurt and Greek Yogurt Maker with 2 qt Glass Jar | $62.99 | far above the same kind of item | $39.05 | comparable item: Greek Yogurt Maker |
| Home | 23895746 Tramontina Gourmet Prima 3-Quart Covered Sauce Pan with Tri-Ply Base | $62.84 | far above the same item's other variants | $69.95 | comparable item: Tramontina Gourmet Prima 4-Quart Covered Sauce Pan |
| Home | 45596933 Contigo Autoseal Cortland Water Bottle, 24 oz., Radiant Orchid | $61.67 | far above the same item's other variants | $19.93 | comparable item: Contigo AUTOSEAL Cortland, 24oz, Sangria Water Bot |
| Home | 42859814 RENOWN® TOUCH-FREE FOAM HAND SOAP DISPENSER, 1,200 ML, BLACK | $61.33 | far above the same kind of item | $50.70 | comparable item: Renown Touch-Free Foam Hand Soap Dispenser, 1,200  |
| Home | 38450427 cuisinart pasta maker attachment | $60.12 | far above the same kind of item | $26.01 | comparable item: Amav - Pasta Maker |
| Home | 15207744 Euro Cuisine YM260 Yogurt Maker | $60.00 | far above the same kind of item | $9.24 | median per-unit price of comparable items |
| Home | 38570913 Euro Cuisine YMX650 Digital Yogurt Maker with 7 Glass Jars and 15 hour | $59.99 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 36779666 Tramontina Gourmet Ceramica_01 Deluxe 3-Quart Covered Sauce Pan | $59.95 | far above the same item's other variants | $40.57 | comparable item: Tramontina Gourmet Ceramica_01 Deluxe 1.5-Quart Co |
| Home | 14258211250 KFFKFF Pasta Creation Device, 9 Customizable Density Levels, Metallic  | $58.99 | far above the same kind of item | $35.99 | comparable item: KFFKFF Pasta Creation Device, 9 Customizable Densi |
| Home | 23919493 Tramontina Gourmet Domus Tri-Ply Base Covered Deep Sauce Pan | $57.86 | far above the same item's other variants | $69.43 | comparable item: Tramontina Gourmet Domus Tri-Ply Base Covered Deep |
| Home | 800900022 belle+bella Automatic Yogurt Maker with Bonus Yogurt Starter | $55.84 | far above the same kind of item | $20.00 | comparable item: Belle + Bella - YoMagic Automatic Yogurt Maker |
| Home | 55047934 Bodum Eileen French Press 8 Cup Copper Coffee Maker | $55.00 | far above the same item's other variants | $38.50 | comparable item: Bodum French Press Kenya 8 Cup Coffee Maker, 1.0 C |
| Home | 784401424 BODUM Chambord French Press Coffee Maker with Borosilicate Glass Caraf | $55.00 | far above the same item's other variants | $33.36 | comparable item: Bodum Chambord French Press Coffee Maker with Boro |
| Home | 973682090 Bodum Chambord Locking Lid Borosilicate Glass French Press Coffee Make | $55.00 | far above the same item's other variants | $51.70 | comparable item: Bodum Chambord Locking Lid French Press Coffee Mak |
| Home | 21930450 T-Fal YG2328US Balanced Living - Yogurt maker | $54.12 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 745672712 Dash Greek Yogurt Maker, White and BlueTrim | $54.00 | far above the same kind of item | $34.00 | comparable item: Dash Greek Yogurt Maker, White and BlueTrim |
| Home | 483354825 OVENTE 1.7L Stainless Steel Electric Kettle, 1750W Power, White KS711W | $53.91 | far above the same item's other variants | $29.99 | comparable item: OVENTE 1.7L Stainless Steel Electric Kettle, 1750W |
| Home | 47843559 Preserve Flavored Toothpicks Birch Wood Toothpicks 24 Count, Cinnamint | $53.76 | far above the same kind of item | $4.67 | median price of the same kind of item |
| Home | 513117491 Proctor Silex Yogurt Maker|Model #86300 | $52.90 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 37017676 Greek Yogurt Maker | $52.00 | far above the same kind of item | $39.05 | comparable item: Greek Yogurt Maker |
| Home | 37017715 Dash DGY001WBU-C Greek Yogurt Maker, White With Blue Trim | $52.00 | far above the same kind of item | $34.00 | comparable item: Dash Greek Yogurt Maker, White and Pink Trim |
| Home | 23895758 Tramontina Gourmet Ceramica_01 Deluxe 3-Quart Covered Sauce Pan | $50.77 | far above the same item's other variants | $40.57 | comparable item: Tramontina Gourmet Ceramica_01 Deluxe 1.5-Quart Co |
| Home | 537405609 Bodum Eileen French Press Coffee Maker with Borosilicate Carafe, 34 Ou | $50.00 | far above the same item's other variants | $40.00 | comparable item: BODUM Eileen French Press Coffee Maker with Borosi |
| Home | 744912703 OVENTE 1.7L Stainless Steel Electric Kettle, 1500W Power, White KS777W | $49.99 | far above the same item's other variants | $29.99 | comparable item: OVENTE 1.7L Stainless Steel Electric Kettle, 1750W |
| Home | 37877926 Tribest Yolife YL-210-A Yogurt Maker, Black | $49.95 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 380402500 Tramontina Gourmet 3 Qt. Hard Anodized Aluminum Nonstick Covered Sauce | $49.95 | far above the same item's other variants | $39.97 | comparable item: Tramontina 3-Quart Gourmet Hard Anodized Nonstick  |
| Home | 111690691 Sterilite Large Storage Bin, 18 Gallon Plastic Storage Container with  | $49.92 | far above the same item's other variants | $49.88 | comparable item: Sterilite Large Storage Bin, 18 Gallon Plastic Sto |
| Home | 15923414458 Mr. Coffee Travertine 4 Piece 16 Ounce Stoneware and Stainless Steel T | $49.49 | far above the same item's other variants | $12.28 | comparable item: Mr. Coffee Travertine 16 Ounce Stoneware and Stain |
| Home | 24463241 Tramontina Style 3-Quart Ceramic Nonstick Covered Sauce Pan | $48.88 | far above the same item's other variants | $35.85 | comparable item: Tramontina Style 1.5-Quart Ceramic Nonstick Covere |
| Home | 15207743 Euro Cuisine YM100 Authomatic Yogurt Maker with 7 Glass Jars & 15 hour | $48.00 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 751686559 32 count Ice Pop Sidekick | $47.36 | far above the same kind of item | $3.48 | comparable item: 4 PC SIPPER ICE POP MOLD |
| Home | 50935158 NutriChef PKYM80 - Electronic Yogurt Maker | $46.68 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 23000704 Tramontina 3-Qt Stainless Steel Tri-Ply Clad Sauce Pan with Lid | $46.28 | far above the same item's other variants | $89.95 | comparable item: Tramontina 4-Qt Stainless Steel Tri-Ply Clad Sauce |
| Home | 35609012 Oster Mykonos Greek Digital Homemade Yogurt Maker, 2-Quart | $46.20 | far above the same kind of item | $9.24 | median per-unit price of comparable items |
| Home | 5893631 Total Chef Yogurt Maker, 1L (1.1 qt) with 7 Glass Jars and Lids, White | $45.99 | far above the same kind of item | $4.88 | median per-unit price of comparable items |
| Home | 252523104 Ello Cooper Vacuum Insulated Stainless Steel Water Bottle with Anti-Mi | $45.98 | far above the same item's other variants | $21.89 | median price of the same kind of item |
| Home | 111065227 Gourmia GYM1720 Yogurt Maker | $45.48 | far above the same kind of item | $24.11 | comparable item: Gourmia GYM1610 Yogurt Maker |
| Home | 302028518 Mr. Coffee Traverse 3 Piece 16 Ounce Stainless Steel and Ceramic Trave | $44.00 | far above the same item's other variants | $20.33 | comparable item: Mr. Coffee Traverse 3 Piece 16 Ounce Stainless Ste |
| Home | 269252432 Tri-Ply Clad 3 Qt Covered Stainless Steel Sauce Pan | $43.99 | far above the same item's other variants | $70.19 | comparable item: Tri-Ply Clad 4 Qt Covered Stainless Steel Sauce Pa |
| Home | 50935160 NutriChef Electronic Yogurt Maker | $43.95 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 28862147 Mr. Coffee Traverse 3 Piece 16 Ounce Stainless Steel and Ceramic Trave | $43.49 | far above the same item's other variants | $20.33 | comparable item: Mr. Coffee Traverse 3 Piece 16 Ounce Stainless Ste |
| Home | 797182608 AICOK Yogurt Maker, Automatic LED Yoghurt Maker Machine with 8 Glass J | $40.43 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 807435512 OVENTE 1.7L Stainless Steel Electric Kettle, 1750W Power, Black KS711B | $39.99 | far above the same item's other variants | $29.99 | comparable item: OVENTE 1.7L Stainless Steel Electric Kettle, 1750W |
| Home | 17909122830 Magnavox Digital Yogurt Maker Machine, 8 Glass Jars, Stainless steel | $39.99 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 17772049 Baby Chef Artisan Yogurt Maker | $39.00 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 37016435 7 Jar Yogurt Maker | $39.00 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 968728068 Gourmia GYM1710 Yogurt Maker | $38.98 | far above the same kind of item | $24.11 | comparable item: Gourmia GYM1610 Yogurt Maker |
| Home | 50935159 NutriChef PKYM18 - Electric Yogurt Maker | $36.80 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 15207742 Euro Cuisine YM80 Electric Yogurt maker with 7 glass jars | $36.00 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 14321189 Aroma Housewares AYM-606 8-Cup Digital Yogurt Maker | $35.00 | far above the same kind of item | $2.78 | median price of the same kind of item |
| Home | 748334041 Mainstays 26-Ounce Plastic Tumbler with Straw, Multi Color | $21.75 | far above the same item's other variants | $18.05 | comparable item: Mainstays 26 oz Multi Color Plastic Tumbler with S |
| Home | 146503361 Sterilite 18-Gallon Medium Plastic Storage Tote, Spearmint | $21.09 | far above the same item's other variants | $27.17 | comparable item: Sterilite 30 Gallon Plastic Storage Tote, Green |
| Home | 19606207920 FIFA World Cup 2026 16oz White Brushstroke Stripe Mug | $20.35 | far above the same item's other variants | $16.71 | comparable item: FIFA World Cup 2026 15oz Black Stripe Mug |
| Home | 918156620 Sterilite 17318V08 Lidded Stackable 18 Gal Storage Tote Container, Pur | $17.80 | far above the same item's other variants | $8.64 | comparable item: Sterilite, 30 Gal./114 L Tote Box, Moda Purple |
| Home | 5624762517 (1 pack) Mainstays - Green Round Plastic Tumbler, Ribbed, 18-Ounce | $12.48 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Green Round Plastic Tumbler, 18-Ounce |
| Home | 15564211873 (1 pack) Mainstays 26-Ounce Plastic Swirl Tumbler, Blue | $12.38 | far above the same item's other variants | $2.10 | comparable item: Mainstays - Blue Square Plastic Tumbler, 26-Ounce |
| Home | 1478814077 MS 26OZ TXT TUMBLER WHITE | $9.80 | far above the same item's other variants | $6.27 | comparable item: MS TUMBLER ARCH WHITE |
| Home | 899336061 Mainstays 26-Ounce Acrylic Color Changing Textured Tumbler with Straw, | $9.43 | far above the same item's other variants | $23.61 | comparable item: Mainstays 4-Pack 26-Ounce Color Changing Textured  |
| Home | 167523965 Mainstays 26-Ounce Acrylic Matte Textured Tumbler with Straw, Teal | $9.27 | far above the same item's other variants | $19.98 | comparable item: Mainstays 4-Pack 26-Ounce Textured Tumbler with St |
| Home | 255253111 Mainstays 26-Ounce Acrylic Matte Textured Tumbler with Straw, Blue | $9.27 | far above the same item's other variants | $19.98 | comparable item: Mainstays 4-Pack 26-Ounce Textured Tumbler with St |
| Home | 1045829828 Mainstays 26 oz Double Wall Plastic Ombre Painting Textured Tumbler, O | $9.10 | far above the same item's other variants | $17.63 | comparable item: Mainstays MS 2PK 26oz Double Wall AS Plastic Textu |
| Home | 1289186167 Mainstays 26 oz Double Wall Plastic Ombre Painting Textured Tumbler, P | $9.10 | far above the same item's other variants | $6.94 | comparable item: Holiday Time 26 oz Double Wall Iridescent Textured |
| Home | 1453598231 Mainstays 26 oz Double Wall Plastic Ombre Painting Textured Tumbler, B | $9.10 | far above the same item's other variants | $17.63 | comparable item: Mainstays MS 2PK 26oz Double Wall AS Plastic Textu |
| Home | 995405554 Mainstays MS 26oz Double Wall AS Plastic Textured Tumbler Arctic White | $8.77 | far above the same item's other variants | $14.57 | comparable item: Mainstays MS 2PK 26oz Double Wall AS Plastic Textu |
| Home | 1046183486 Mainstays 26 oz Double Wall Plastic Tinted Tumbler with Straw, Orange | $8.33 | far above the same item's other variants | $26.00 | comparable item: Mainstays 26 oz Rose Gold Luster Double-Wall Plast |
| Home | 1595131042 Mainstays 26 oz Double Wall Plastic Tinted Tumbler with Straw, Green | $8.33 | far above the same item's other variants | $26.00 | comparable item: Mainstays 26 oz Rose Gold Luster Double-Wall Plast |
| Home | 1679833727 Mainstays 26 oz Double Wall Plastic Tinted Tumbler with Straw, Blue | $8.33 | far above the same item's other variants | $26.00 | comparable item: Mainstays 26 oz Rose Gold Luster Double-Wall Plast |
| Home | 5658905019 (1 pack) Mainstays - Blue Round Plastic Tumbler, 18-Ounce | $8.28 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Blue Round Plastic Tumbler, 18-Ounce |
| Home | 50912571 Mainstays 18 Ounce Teal Double Wall Can Tumbler | $7.64 | far above the same item's other variants | $8.03 | comparable item: Mainstays 24 Ounce Teal Double Wall Soda Tumbler |
| Home | 328001815 Mainstays 26 oz Double-Wall AS Plastic Textured Tumbler, Rich Black | $7.50 | far above the same item's other variants | $14.17 | comparable item: Mainstays MS 2PK 26oz Double Wall AS Plastic Textu |
| Home | 3411396655 Mainstays MS 26oz Double Wall Plastic Textured Tumbler Rich Black | $7.43 | far above the same item's other variants | $14.17 | comparable item: Mainstays MS 2PK 26oz Double Wall AS Plastic Textu |
| Home | 18025053402 Better Homes & Gardens Round Cereal Bowl, 36 oz, Olive Beige, Reusable | $6.97 | far above the same item's other variants | $7.53 | comparable item: Better Homes & Gardens 36 oz Round Olive Beige Reu |
| Home | 18035511113 Better Homes & Gardens 36 oz Round Reactive Blue Reusable Dishwasher-S | $6.97 | far above the same item's other variants | $2.48 | comparable item: Better Homes & Gardens 36 oz Round Green Reactive  |
| Home | 18045956348 Better Homes & Gardens 36 oz Round Olive Beige Reusable Dishwasher-Saf | $6.97 | far above the same item's other variants | $7.53 | comparable item: Better Homes & Gardens 36 oz Round Olive Beige Reu |
| Home | 18046918780 Better Homes & Gardens 36 oz Round Reactive Green Reusable Dishwasher- | $6.97 | far above the same item's other variants | $2.48 | comparable item: Better Homes & Gardens 36 oz Round Reactive Blue R |
| Home | 106106423 Mainstays 26-Ounce Acrylic Iridescent Textured Tumbler with Straw, Tea | $6.94 | far above the same item's other variants | $19.98 | comparable item: Mainstays 4-Pack 26-Ounce Acrylic Textured Tumbler |
| Home | 107773586 Mainstays 26-Ounce Acrylic Iridescent Textured Tumbler with Straw, Gre | $6.94 | far above the same item's other variants | $20.79 | comparable item: Mainstays 4-Pack 26-Ounce Acrylic Textured Tumbler |
| Home | 380048853 Mainstays 26-Ounce Acrylic Matte Textured Tumbler with Straw, Green | $6.94 | far above the same item's other variants | $20.55 | comparable item: Mainstays 4-Pack 26-Ounce Textured Tumbler with St |
| Home | 406733117 Mainstays 26-Ounce Acrylic Iridescent Textured Tumbler with Straw, Blu | $6.94 | far above the same item's other variants | $20.79 | comparable item: Mainstays 4-Pack 26-Ounce Acrylic Textured Tumbler |
| Home | 442068453 Mainstays 26-Ounce Acrylic Color Changing Textured Tumbler with Straw, | $6.94 | far above the same item's other variants | $19.98 | comparable item: Mainstays 4-Pack 26-Ounce Color Changing Textured  |
| Home | 511090838 Mainstays 26-Ounce Acrylic Iridescent Textured Tumbler with Straw, Pin | $6.94 | far above the same item's other variants | $20.79 | comparable item: Mainstays 4-Pack 26-Ounce Acrylic Textured Tumbler |
| Home | 534468601 Mainstays 26-Ounce Acrylic Matte Textured Tumbler with Straw, Pink | $6.94 | far above the same item's other variants | $20.55 | comparable item: Mainstays 4-Pack 26-Ounce Textured Tumbler with St |
| Home | 607163331 Mainstays 26-Ounce Acrylic Color Changing Textured Tumbler with Straw, | $6.94 | far above the same item's other variants | $26.26 | comparable item: Mainstays 4-Pack 26-Ounce Color Changing Textured  |
| Home | 692030655 Mainstays 26-Ounce Acrylic Color Changing Textured Tumbler with Straw, | $6.94 | far above the same item's other variants | $31.14 | comparable item: Mainstays 4-Pack 26-Ounce Color Changing Textured  |
| Home | 960445788 Mainstays 26-Ounce Acrylic Iridescent Textured Tumbler with Straw, Cor | $6.94 | far above the same item's other variants | $20.79 | comparable item: Mainstays 4-Pack 26-Ounce Acrylic Textured Tumbler |
| Home | 1534044466 Mainstays 26 oz Double Wall Plastic Ombre Painting Textured Tumbler, G | $6.94 | far above the same item's other variants | $7.40 | comparable item: Mainstays 30oz Textured Tumbler with Straw and Han |
| Home | 1749067716 Mainstays 26 oz Double Wall Plastic Tinted Tumbler with Straw, Pink | $6.94 | far above the same item's other variants | $26.00 | comparable item: Mainstays 26 oz Rose Gold Luster Double-Wall Plast |
| Home | 6851517799 Mainstays 26 oz Plastic Double Wall Textured Tumbler, White Iridescent | $6.94 | far above the same item's other variants | $14.57 | comparable item: Mainstays MS 2PK 26oz Double Wall AS Plastic Textu |
| Home | 2446777196 Mainstays 26 ounce Arch Textured Double Wall Tumbler, Purple | $6.63 | far above the same item's other variants | $11.62 | comparable item: Copco Double Wall Tumbler 16-Ounce, Purple |
| Home | 13328368775 Mainstays 26 oz Sun Ray Textured Plastic Tumbler, Purple | $6.52 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 3724283846 Mainstays 26 ounce Animal Print Textured Double Wall Tumbler, White | $6.47 | far above the same item's other variants | $8.37 | comparable item: Mainstays 24-Ounce Double-Wall Chiller Tumbler, Ik |
| Home | 3787741980 Mainstays 26 ounce Animal Print Textured Double Wall Tumbler, Black | $6.47 | far above the same item's other variants | $8.37 | comparable item: Mainstays 24-Ounce Double-Wall Chiller Tumbler, Ik |
| Home | 5355414739 Mainstays 26-Ounce Plastic Swirl Tumbler, Black | $6.44 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 13342970145 Mainstays 26 oz Sun Ray Textured Tumbler, Green | $6.42 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 5352216363 Mainstays 26-Ounce Plastic Swirl Tumbler, Blue | $6.19 | far above the same item's other variants | $2.10 | comparable item: Mainstays - Blue Square Plastic Tumbler, 26-Ounce |
| Home | 5352609151 Mainstays 26-Ounce Plastic Swirl Tumbler, Purple | $6.19 | far above the same item's other variants | $5.06 | comparable item: Mainstays 30 Ounce Plastic Tumbler with Handle, Pu |
| Home | 5839027167 Mainstays 26 oz Double-Wall Textured Tumbler, Pink Iridescent | $6.17 | far above the same item's other variants | $6.94 | comparable item: Holiday Time 26 oz Double Wall Iridescent Textured |
| Home | 13313519490 Mainstays 26-Ounce Sun Ray Plastic Textured Tumbler, Blue | $6.16 | far above the same item's other variants | $2.09 | comparable item: Mainstays - Blue Square Plastic Tumbler, 26-Ounce |
| Home | 13318100873 Mainstays 26 oz Sun Ray Textured Plastic Tumbler, Pink | $6.12 | far above the same item's other variants | $6.50 | comparable item: Mainstays 30-Ounce Plastic Prism Textured Tumbler  |
| Home | 5345153705 Mainstays 26-Ounce Plastic Swirl Tumbler, Pink | $6.04 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 200873544 Mainstays 26-Ounce Acrylic Color Changing Textured Tumbler with Straw, | $5.98 | far above the same item's other variants | $21.63 | comparable item: Mainstays 4-Pack 26-Ounce Color Changing Textured  |
| Home | 5479562454 Mainstays 26-Ounce Capacity Plastic Double Wall Insulated Iridescent T | $5.96 | far above the same item's other variants | $7.40 | comparable item: Mainstays 30oz Textured Tumbler with Straw and Han |
| Home | 848386440 Mainstays 26-Ounce Plastic Tumbler, Gray | $5.89 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 793763861 Mainstays - Blue Square Plastic Tumbler, 18-Ounce | $5.75 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Blue Square Plastic Tumbler, 18-Ounce |
| Home | 14988760530 Mainstays 18oz Coffee Tumbler, Blush Pink | $5.72 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 5188161474 Mainstays 26oz Diamond Scale Textured Plastic Tumbler with Straw, Ombr | $5.53 | far above the same item's other variants | $7.40 | comparable item: Mainstays 30oz Textured Tumbler with Straw and Han |
| Home | 5188211334 Mainstays 26oz Diamond Scale Textured Plastic Tumbler with Straw, Ombr | $5.53 | far above the same item's other variants | $7.40 | comparable item: Mainstays 30oz Textured Tumbler with Straw and Han |
| Home | 5193166886 Mainstays 26oz Diamond Scale Textured Plastic Tumbler with Straw, Ombr | $5.53 | far above the same item's other variants | $7.40 | comparable item: Mainstays 30oz Textured Tumbler with Straw and Han |
| Home | 1420539880 Mainstays - Orange Square Plastic Tumbler, 18-Ounce | $5.40 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Orange Square Plastic Tumbler, 18-Ounc |
| Home | 897889062 Mainstays Back to College 26 oz Double Wall AS Plastic Textured Tumble | $5.29 | far above the same item's other variants | $8.77 | comparable item: Mainstays MS 26oz Double Wall AS Plastic Textured  |
| Home | 5376909845 Mainstays 26-Ounce Eco-Friendly Recycled Plastic Beverage Tumbler, Bei | $5.16 | far above the same item's other variants | $2.25 | comparable item: Mainstays 26-Ounce Eco-Friendly Recycled Plastic B |
| Home | 14961560593 Mainstays 18oz Plastic To Go Coffee Tumbler, Black Perfect for Your On | $5.16 | far above the same item's other variants | $4.98 | comparable item: Mainstays 18oz Sage Green To-Go Coffee Cup Perfect |
| Home | 20901613442 Mainstays 18OZ Plastic Tumbler, Straw, Dog | $4.97 | far above the same item's other variants | $6.81 | comparable item: Icee Plastic Tumbler with Straw, 22 oz |
| Home | 16349553380 Mainstays 26 oz Round Christmas Holly Tumbler, Green | $4.77 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 16359461092 Mainstays 26 oz Blue Gingerbread Plastic Holiday Tumbler | $4.76 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 3137787285 Mainstays - Cream Square Plastic Tumbler, 18-Ounce | $4.33 | far above the same item's other variants | $2.25 | comparable item: Mainstays - Cream Square Plastic Tumbler, 26-Ounce |
| Home | 14918266118 Mainstays 18oz Plastic To Go Coffee Tumbler, Blue Perfect for Your On- | $4.20 | far above the same item's other variants | $4.98 | comparable item: Mainstays 18oz Sage Green To-Go Coffee Cup Perfect |
| Home | 14924819583 Mainstays 18oz Plastic To Go Coffee Tumbler, Green Perfect for Your On | $4.20 | far above the same item's other variants | $4.98 | comparable item: Mainstays 18oz Sage Green To-Go Coffee Cup Perfect |
| Home | 14972168143 Mainstays 18oz Plastic To Go Coffee Tumbler, Red Perfect for Your On-T | $4.20 | far above the same item's other variants | $4.98 | comparable item: Mainstays 18oz Sage Green To-Go Coffee Cup Perfect |
| Home | 5478419582 Mainstays - Blush Pink Eco-Friendly Recycled Plastic Cereal Bowl, 38-O | $3.97 | far above the same item's other variants | $4.22 | comparable item: Mainstays Blush Pink Eco-Friendly Recycled Plastic |
| Home | 414921276 Mainstays 26-Ounce Recycled Plastic Beverage Tumbler, Vanilla Dream, 1 | $3.70 | far above the same item's other variants | $2.25 | comparable item: Mainstays 26-Ounce Recycled Plastic Beverage Tumbl |
| Home | 14828757433 Mainstays - Purple Round Plastic Cereal Bowl, Wavy Checkered Etched, 3 | $3.61 | far above the same item's other variants | $3.61 | comparable item: Mainstays - Purple Round Plastic Dinner Bowl, Wavy |
| Home | 17956557337 Mainstays 38 oz Round Plastic Cereal Bowl, Blueberries Etched Pattern, | $3.61 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 14791201152 Mainstays - Grey Round Plastic Tumbler, Wavy Checkered Etched, 26-Ounc | $3.59 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 14811950723 Mainstays - Green Round Plastic Cereal Bowl, Wavy Checkered Etched, 38 | $3.59 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 16974816725 Mainstays Blue Round Plastic Tumbler, Easter Egg Etched, 26 oz | $3.59 | far above the same item's other variants | $3.59 | comparable item: Mainstays - Blue Round Plastic Dinner Bowl, Easter |
| Home | 16998122718 Mainstays Cereal Bowl, Blue Round Plastic, Easter Egg Etched, 38 oz | $3.59 | far above the same item's other variants | $3.59 | comparable item: Mainstays - Blue Round Plastic Dinner Bowl, Easter |
| Home | 14791201153 Mainstays - Green Round Plastic Tumbler, Wavy Checkered Etched, 26-Oun | $3.58 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 14820803487 Mainstays - Purple Round Plastic Tumbler, Wavy Checkered Etched, 26-Ou | $3.58 | far above the same item's other variants | $3.61 | comparable item: Mainstays - Purple Round Plastic Dinner Bowl, Wavy |
| Home | 14828757921 Mainstays - Pink Round Plastic Tumbler, Wavy Checkered Etched, 26-Ounc | $3.58 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 17034007470 Mainstays Round Plastic Tumbler, Green, Easter Bunny Etched, 26 oz | $3.58 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 17912521922 Mainstays 38 Ounce Round Green Cereal Bowl with Pear Etched Design | $3.53 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 14810909915 Mainstays - Pink Round Plastic Cereal Bowl, Wavy Checkered Etched, 38- | $3.36 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 16998271624 Mainstays 38 oz Purple Round Plastic Cereal Bowl, Braided Etched Desig | $3.36 | far above the same item's other variants | $3.35 | comparable item: Mainstays Purple Round Plastic Plate, Braided Etch |
| Home | 17036463577 Mainstays Gray Round Polypropylene Tumbler, Braided Etched Matte Finis | $3.34 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 17054356792 Mainstays - Purple Round Plastic Tumbler, Interwoven Braided Etched, 2 | $3.34 | far above the same item's other variants | $3.36 | comparable item: Mainstays - Purple Round Plastic Dinner Bowl, Inte |
| Home | 14851315521 Mainstays - Grey Round Plastic Cereal Bowl, Wavy Checkered Etched, 38- | $3.31 | far above the same item's other variants | $3.62 | comparable item: Mainstays - Grey Plastic Plastic Dinner Bowl, Wavy |
| Home | 16995374208 Mainstays Navy Plastic Tumbler, Interwoven Braided Etched Matte Design | $3.29 | far above the same item's other variants | $3.35 | comparable item: Mainstays 10.5 in Navy Round Polypropylene Plastic |
| Home | 17944103130 Mainstays 38 oz Red Round Plastic Cereal Bowl, Strawberries Etched Des | $3.26 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 13445474235 Mainstays - Blue Round Plastic Swirl Pattern Cereal Bowl, 38-Ounce | $3.23 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 13509621018 Mainstays - Pink Round Plastic Swirl Pattern Cereal Bowl, 38-Ounce | $3.23 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 5038390809 Mainstays - Orange Round Plastic Tumbler, Ribbed, 18-Ounce | $3.22 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 5039232839 Mainstays Ribbed Fuchsia Pink Round Plastic Tumbler, 18-Ounce | $3.22 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 5040628738 Mainstays - Blue Round Plastic Tumbler, Ribbed, 18-Ounce | $3.22 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Blue Round Plastic Tumbler, 18-Ounce |
| Home | 5325397203 Mainstays 26 Ounce Round Plastic Etched Ghost Tumbler, Purple | $3.21 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 5337046656 Mainstays 26 Ounce Round Plastic Etched Halloween Tumbler, Black | $3.21 | far above the same item's other variants | $2.05 | comparable item: Mainstays 26 Ounce Round Plastic Etched Halloween  |
| Home | 5454354399 Mainstays 26 Ounce Round Plastic Etched Pumpkin Tumbler, Orange | $3.21 | far above the same item's other variants | $2.07 | comparable item: Mainstays 26 Ounce Round Plastic Etched Pumpkin Tu |
| Home | 13348012997 Mainstays - Green Round Plastic Swirl Pattern Tumbler, 26-Ounce | $3.21 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 13391707778 Mainstays - Blue Round Plastic Swirl Pattern Tumbler, 26-Ounce | $3.21 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 17037570196 Mainstays Dinnerware 38 oz Navy Round Plastic Cereal Bowl, Braided Etc | $3.13 | far above the same item's other variants | $3.36 | comparable item: Mainstays - Light Grey Round Plastic Cereal Bowl,  |
| Home | 5040539790 Mainstays - Green Round Plastic Tumbler, Ribbed, 18-Ounce | $3.12 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Green Round Plastic Tumbler, 18-Ounce |
| Home | 787361890 Mainstays - Red Square Plastic Tumbler, 26-Ounce | $3.00 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 995963507 Mainstays - Cream Square Plastic Tumbler, 18-Ounce | $2.98 | far above the same item's other variants | $2.25 | comparable item: Mainstays - Cream Square Plastic Tumbler, 26-Ounce |
| Home | 720834883 Mainstays - Green Square Plastic Tumbler, 18-Ounce | $2.82 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 17004169401 Mainstays Pink Round Plastic Cereal Bowl, Flower Etched, 38 oz | $2.80 | far above the same item's other variants | $12.47 | median price of the same kind of item |
| Home | 474863925 Mainstays - Teal Square Plastic Tumbler, 26-Ounce | $2.72 | far above the same item's other variants | $2.09 | comparable item: Mainstays - Teal Square Plastic Tumbler, 26-Ounce |
| Home | 1082184381 Mainstays - Orange Square Plastic Tumbler, 26-Ounce | $2.68 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Orange Square Plastic Tumbler, 18-Ounc |
| Home | 794405186 Mainstays - Orange Tie Dye Round Plastic Tumbler, 18-Ounce | $2.67 | far above the same item's other variants | $17.97 | median price of the same kind of item |
| Home | 596858367 Mainstays - Blue Square Plastic Tumbler, 18-Ounce | $2.64 | far above the same item's other variants | $2.07 | comparable item: Mainstays - Blue Square Plastic Tumbler, 18-Ounce |
| Home | 5169079673 Hamilton Beach 1 cu ft Countertop Microwave Oven, Gray | $0.09 | below range | $79.84 | comparable item: Hamilton Beach 1.1 cu ft Countertop Microwave Oven |
| Home | 16352812095 Mainstays 38 Ounce Round Plastic Etched Holly Bowl, Green | $0.05 | below range | $0.50 | comparable item: Mainstays 38 Ounce Round Plastic Etched Tree Bowl, |
| Home | 135705331 Vendor Name Steamfast Traveliron Non-working Display | $0.04 | below range | $17.96 | median price of its category |
| Home | 165632493 Hamilton Beach Durathon Digital Display | $0.04 | below range | $29.99 | median price of its category |
| Home | 108533019 BLACK+DECKER Professional Steam Iron with Stainless Steel Soleplate an | $0.03 | below range | $49.99 | comparable item: BLACK+DECKER Allure™ Professional Steam Iron, Stai |
| Home | 142359748 Oster 1.3 Cubic Ft./1000 Watt Microwave | $0.03 | below range | $48.89 | median price of the same kind of item |
| Home | 194766243 Hamilton Beach Hb Retrac Cord Iron Display | $0.03 | below range | $27.88 | comparable item: Hamilton Beach 1500W Retractable Cord Iron | Model |
| Home | 202646193 Instant Pot 20 Cup Rice Disp | $0.03 | below range | $39.87 | comparable item: Oster 6 Cup Rice Cooker |
| Home | 213766919 Hamilton Beach Iron/steamer Display | $0.03 | below range | $21.91 | comparable item: Hamilton Beach Steam Iron 14672 |
| Home | 232991387 HOOVER SMARTWASH CARPET CLEANER DISPLAY DUFH52001G | $0.03 | below range | $88.07 | comparable item: Hoover SteamVac SpinScrub Carpet Cleaner, FH50028 |
| Home | 265249041 SHARK IZ340H STICK VAC DISPLAY | $0.03 | below range | $49.86 | comparable item: Shark Bagless Stick Vac |
| Home | 305322098 Cs6916-16 Vtech Display | $0.03 | below range | $29.99 | median price of its category |
| Home | 396358999 BLACK+DECKER™ One Step Steam Iron - SG Display | $0.03 | below range | $58.49 | comparable item: BLACK+DECKER One Step Steam Iron with Nonstick Sol |
| Home | 415788714 Hamilton Beach Retractable Cord Iron Dsp | $0.03 | below range | $27.88 | comparable item: Hamilton Beach 1500W Retractable Cord Iron | Model |
| Home | 437416010 Chi Iron Retractable Cord Display | $0.03 | below range | $69.98 | comparable item: CHI Iron with Retractable Cord | Model# 13106 |
| Home | 558230060 BLACK+DECKER Non-Stick Smart Steam Iron OPP - SG Display | $0.03 | below range | $29.23 | comparable item: Black+Decker Smart Steam Iron, 1100 Watts, Adjusta |
| Home | 669412998 Chicago Cutlery Precision Cut Walnut Handle Block Knife Set, 14 Piece | $0.03 | below range | $52.47 | comparable item: Chicago Cutlery 14-Piece Walnut Knife Set |
| Home | 768982612 My Mini Noodle Cooker Display | $0.03 | below range | $14.00 | comparable item: MY KETO KITCHEN EGG COOKER |
| Home | 798723826 Chicago Cutlery Cc Precision Cut Intgrtd Ss 16pc Set Pp | $0.03 | below range | $14.68 | comparable item: Precision Cut 4pc Steakhouse Set |
| Home | 823434967 Hamilton Beach Durathon Iron Display | $0.03 | below range | $60.53 | comparable item: Hamilton Beach Durathon Nonstick Soleplate Iron Mo |
| Home | 877709102 Hamilton Beach Hb Iron Display For Iron/steamer | $0.03 | below range | $29.99 | median price of its category |
| Home | 925134126 Beautiful White Coffee Maker NON-WORKING DISPLAY | $0.03 | below range | $37.39 | median price of the same kind of item |
| Home | 966650042 BISSELL Little Green NWD | $0.03 | below range | $92.99 | comparable item: BISSELL Little Green 14007 Portable Vacuum Cleaner |
| Home | 1005868999 A10-D Plus NWD Dummy | $0.03 | below range | $67.60 | median price of the same kind of item |
| Home | 1597678711 Ninja Blast Cordless Blender Display, DSPBC100WMP | $0.03 | below range | $84.97 | comparable item: Ninja Blast Cordless Portable Blender, BC200PR |
| Home | 2586091480 PWRHERO11 ZT NWD Dummy | $0.03 | below range | $0.98 | comparable item: S10 ZT NWD Dummy Unit |
| Home | 5108000126 PowerForce Pet Turbo XL NWD | $0.03 | below range | $58.33 | comparable item: Bissell Powerforce Turbo |
| Home | 5108000127 PowerForce Pet XL NWD | $0.03 | below range | $0.98 | comparable item: Pet Hair Eraser DualBrush NWD |
| Home | 19862859913 BISSELL PowerClean DualBrush Stick Vacuum Non-Working Display | $0.03 | below range | $27.49 | comparable item: Bissell 3in1 Stick Vacuum |
| Home | 19866965750 PowerLifter Allergen NWD | $0.03 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 362152140 Hoover Cruise Display | $0.02 | below range | $29.99 | median price of its category |
| Home | 968973054 36IN TIRE RACK | $0.02 | below range | $41.68 | comparable item: Whirlpool 3406839 Rack |
| Home | 1477877746 Chefman Anti-Overflow Belgian Waffle Maker, Black - POP Display | $0.02 | below range | $39.70 | comparable item: CHEFMAN ANTI-OVERFLOW BELGIAN WAFFLE MAKER, TEMPER |
| Home | 14751101561 Thyme & Table Toaster Display | $0.02 | below range | $34.99 | comparable item: Hamilton Beach 22524E Toaster |
| Home | 14754472921 Thyme & Table Espresso Machine Display | $0.02 | below range | $49.99 | comparable item: Espresso and Cappuccino Machine |
| Home | 14769601100 Thyme & Table Countertop Blender Display | $0.02 | below range | $56.84 | comparable item: Nutribullet Countertop Blender |
| Home | 14799904777 Thyme & Table Single Serve Blender Display | $0.02 | below range | $14.88 | comparable item: Hamilton Beach Single-Serve Blender |
| Home | 14803756258 Thyme & Table Slow Cooker Display | $0.02 | below range | $30.15 | comparable item: Hamilton Beach 33171 Slow Cooker |
| Home | 14804202617 Thyme & Table Mini Espresso Machine Display | $0.02 | below range | $48.47 | median price of the same kind of item |
| Home | 14804252237 Thyme & Table Pod Machine Display | $0.02 | below range | $17.80 | median price of the same kind of item |
| Home | 15629322702 Thyme & Table Coffee Backer Card | $0.02 | below range | $25.00 | median price of the same kind of item |
| Home | 15702410434 Thyme & Table Heated Backer Card | $0.02 | below range | $17.80 | median price of the same kind of item |
| Home | 15750754422 Thyme & Table Coffee Holder Display Rack | $0.02 | below range | $14.05 | comparable item: Single Serve Coffee Display Rack |
| Home | 20613753 Mainstays Silicone Red Zigzag Trivet | $0.01 | below range | $3.88 | comparable item: Mainstays Red Silicone Trivet |
| Home | 101634849 Hamilton Beach Hb 8qt Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 103646099 Shark Sh Apex 2.0 Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 103909329 Oster Classic Black Blender Display | $0.01 | below range | $33.69 | comparable item: Oster Classic 3-Speed Blender, Smoothie Blender, B |
| Home | 105703152 Hoover Hv Power Scrub Elite Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 105718023 BISSELL Powerglide Liftoff Pet | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 105887390 Shark Display Rv750wm | $0.01 | below range | $29.99 | median price of its category |
| Home | 106331941 Black & Decker Lithium 2in1 Display | $0.01 | below range | $98.00 | comparable item: Black And Decker 18v Lithium Pivot, Bdh |
| Home | 106551826 Black & Decker B&d Cm2020b Non-working Display Sample | $0.01 | below range | $49.88 | comparable item: Black & Decker CM5050 Coffemaker |
| Home | 111554777 Oster Belgian Waffle Display | $0.01 | below range | $24.97 | comparable item: Oster Waffle Maker Belgian Ss Ost |
| Home | 111966192 BI PET HAIR ERASER SLIM CORDLESS NWD | $0.01 | below range | $6.49 | comparable item: BISSELL Pet Stain Eraser NWD |
| Home | 114077922 BISSELL Bagged Pet Powerlifter | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 115046998 Hamilton Beach Flexbrew Display | $0.01 | below range | $8.07 | comparable item: Hamilton Beach FLEXBREW GEN 4 TRIO DISPLAY |
| Home | 118665244 BISSELL Revolution Pet Pro Vacuum | $0.01 | below range | $28.63 | comparable item: BISSELL Pet Pack Vacuum Attachments, 3260 |
| Home | 121492398 Hamilton Beach 5 Quart Oval Stainless Steel Slow Cooker | $0.01 | below range | $33.43 | comparable item: Chefman 7-Quart Stainless Steel Slow Cooker, Oval |
| Home | 123633892 Hamilton Beach Hb Hand Mixer W/case Display | $0.01 | below range | $19.84 | comparable item: Hamilton Beach Black Hand Mixer with Storage Case |
| Home | 128877236 Black & Decker Bd 2 Sl Blk Ss Toaster Display | $0.01 | below range | $24.97 | comparable item: Black & Decker Bd Dillybean 2s Toaster White |
| Home | 129450982 BISSELL Spotclean Proheat Pet Vacuum Cleaner | $0.01 | below range | $8.51 | comparable item: To Fit BISSELL PROHeat Vacuum Cleaner Belts for BI |
| Home | 130389835 Oster Jellybean 2 Slice Toaster | $0.01 | below range | $34.99 | comparable item: Oster® 2-Slice Toaster |
| Home | 131050906 Eureka Display Simply Clean Upright | $0.01 | below range | $95.10 | comparable item: Eureka Extreme Clean Upright Vacuum |
| Home | 133542987 Black & Decker Bd 400w Juice Extractor Display | $0.01 | below range | $36.30 | comparable item: Black & Decker Fruit & Vegetable Juice Extractor |
| Home | 133577039 Shark Rotator Pla Duoclean Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 138411774 Hoover Hv Spotless Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 140570472 George Foreman 84in Grill Display | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 141168893 Mr Coffee Espresso Maker Ss Display | $0.01 | below range | $50.77 | comparable item: Mr. Coffee 4 Cup Espresso Maker |
| Home | 141936108 Display Krups 4 Slice Toaster Ss | $0.01 | below range | $90.98 | comparable item: Krups Savoy 4 Slice Toaster |
| Home | 142090791 Oster Hand Mixer Display | $0.01 | below range | $20.16 | comparable item: Betty Crocker Hand Mixer |
| Home | 144413136 CO2 Gravity Feeder 18ct | $0.01 | below range | $23.40 | median price of the same kind of item |
| Home | 145330729 Dyson V6 Motorhead Origin Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 146032182 Hoover Hv React Pro Pet Display | $0.01 | below range | $13.97 | comparable item: HV Oxy Pet Portable Form |
| Home | 146964673 Ninja Performance Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 148879301 Hoover Hv Rewind Blue Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 151037691 Hoover Hv React Powered Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 152023284 Electrolux Display Ergorapido Stick | $0.01 | below range | $89.93 | comparable item: Electrolux Ergorapido EL 1010A - Vacuum cleaner -  |
| Home | 152603441 ZD400 DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 156504824 Black & Decker Wifi Slow Cooker Display | $0.01 | below range | $42.99 | median price of the same kind of item |
| Home | 157071869 Eufy RoboVac G30 Display | $0.01 | below range | $29.99 | comparable item: Eufy RoboVac Replacement Kit |
| Home | 157147117 Krups Deep Fryer Display | $0.01 | below range | $2.84 | comparable item: Farberware Deep Fryer Display |
| Home | 163102287 POP DISPLAY 13 PC Cutlery Block Set | $0.01 | below range | $69.38 | comparable item: Ginsu 14 Pc. Natural Block Cutlery Set |
| Home | 163739709 Hamilton Beach Hb Soft Scrapes Hand Mixer Display | $0.01 | below range | $33.98 | comparable item: Hamilton Beach 62635 - Hand mixer - 275 W - black |
| Home | 163835790 Instant Pot Vortex 6Qt Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 165175103 Hoover Hv React Compact Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 166488582 Black & Decker B&d Xl Toaster Oven Display | $0.01 | below range | $28.55 | comparable item: Black & Decker Toaster Oven |
| Home | 168382294 Bissell Crosswave Nwd | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 172650626 INP 5QT AF DISPLAY | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 172863096 Jack Lalanne Power Pressure Cooker 10qt Display | $0.01 | below range | $37.40 | comparable item: Better Chef 6QT Pressure Cooker |
| Home | 174168915 Display Krups Waffle Maker | $0.01 | below range | $35.60 | comparable item: Sunbeam 3864 Waffle Maker |
| Home | 174362573 Dirt Devil Dd Reach Max Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 176042501 Hoover Display Hvr Rewind Bagless Upright | $0.01 | below range | $88.00 | comparable item: Hoover Rewind Bagless Upright Vacuum Cleaner, UH71 |
| Home | 176225359 Hoover Hv Quest 600 Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 179070370 Dirt Devil Dd Power Swerve Disp | $0.01 | below range | $89.99 | comparable item: Dirt Devil Power Swerve 16V Cordless Stick Vacuum, |
| Home | 179921474 Bissell Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 182742914 Bissell Airram Nwd | $0.01 | below range | $1.00 | comparable item: BISSELL CROSSWAVE HF3 NWD |
| Home | 183613517 Bissell Robot Vacuum Nwd | $0.01 | below range | $27.49 | comparable item: Bissell 3in1 Stick Vacuum |
| Home | 184132736 DPLY SLED KEUR BRWR KEXPE BLUE | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 186508055 Shark Rotator Powered Lift-away Speed Display | $0.01 | below range | $71.34 | comparable item: Shark® Rotator® Powered Lift-Away® Speed with Self |
| Home | 188718121 Bissell Spinwave Nwd | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 192577891 Hoover Powerdash Barefloor Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 192677811 Black & Decker Smartech Lift Off Display | $0.01 | below range | $34.00 | comparable item: Black & Decker Digital Advantage D1200 - Steam iro |
| Home | 195064183 Dirt Devil Dd Power Max Xl Disp | $0.01 | below range | $74.00 | comparable item: Dirt Devil Power Max XL Bagless Upright Vacuum Cle |
| Home | 195532998 Bissell Little Green Pro Nwd | $0.01 | below range | $98.00 | comparable item: Bissell Little Green Pro Heat Turbo Pet |
| Home | 196021393 DSPNV150WMP Display | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 196697243 Hoover Hv Power Scrub Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 199064588 Hamilton Beach Hb 12c Easy Access Coffee Maker Display | $0.01 | below range | $49.99 | comparable item: Hamilton Beach? Programmable Easy Access Deluxe Co |
| Home | 199395887 Display Krups 2 Slice Toaster | $0.01 | below range | $90.98 | comparable item: Krups Savoy 4 Slice Toaster |
| Home | 200302381 Samsung 1.4cf Mwo Display | $0.01 | below range | $7.49 | comparable item: Hamilton Beach Display Mwo |
| Home | 200384072 Tax Time Deals! | $0.01 | below range | $17.96 | median price of its category |
| Home | 201251260 Instant Pot Vortex Mini 2Qt Red Display | $0.01 | below range | $49.92 | comparable item: Instant™ Vortex™ Mini Air Fryer 2 Quart 4-in-1, Aq |
| Home | 201419807 Ninja Foodi 8 Qt Display | $0.01 | below range | $24.99 | comparable item: Ninja Foodi 6.5-Qt. Ceramic-Coated Inner Pot 102FY |
| Home | 201886459 DSPCM300WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 202342699 Bissell Bi Powerlifter Pet Rewind Nwd | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 208988311 Kitchenaid 4.5qt Classic Mixer Black Dis | $0.01 | below range | $59.00 | comparable item: Kalorik M 21847 - Mixer - 3.2 qt - 200 W - black/c |
| Home | 210529337 PowerXL Vortex Pro Air Fryer Plus 8 Quart Display | $0.01 | below range | $89.00 | comparable item: PowerXL Vortex Pro 8 Qt Air Fryer |
| Home | 214655836 Hamilton Beach Disply | $0.01 | below range | $17.96 | median price of its category |
| Home | 215150770 Ninja Coffeemaker Black Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 215393493 Floor One S2 NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 217043972 Power Xl Pxl Vortex Air Fryer 10qt Dummy | $0.01 | below range | $89.00 | comparable item: PowerXL Vortex Pro 8 Qt Air Fryer |
| Home | 217411962 Hamilton Beach Hb 1 Liter Kettle Display Ss | $0.01 | below range | $24.99 | comparable item: Hamilton Beach 1.8 Liter Cordless Kettle. |
| Home | 219427125 Hoover Total Home Pet Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 220554925 Mr. Coffee Display,cffemkr,mrc,12c,pg,red | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 220776067 KES6403BM Espresso Display | $0.01 | below range | $16.20 | median price of the same kind of item |
| Home | 221867315 Hamilton Beach Hb Glass Jar Blender Black Ss Display | $0.01 | below range | $49.76 | comparable item: Hamilton Beach Single-Serve Blender with Glass Jar |
| Home | 223892164 Mr. Coffee $89 Espresso Plexi Display | $0.01 | below range | $22.68 | median price of the same kind of item |
| Home | 224409869 Hoover Display Hvr Air Elite Duuh72460 | $0.01 | below range | $29.99 | median price of its category |
| Home | 225462904 Jack Lalanne Juicer Ss Display | $0.01 | below range | $13.43 | comparable item: Hamilton Beach 1.1 MWO SS DISPLAY |
| Home | 228982793 PowerXL Boost Blender Plus Display | $0.01 | below range | $57.99 | comparable item: PowerXL™ Boost Blender Plus™ 4 Speed, 800 Watts, 4 |
| Home | 229290476 SHARK 10" IN LINE VM200 DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 229950762 Oster Big Jar Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 234873070 Cosori 5.8qt Smart Air Fryer Display for Stores | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 236960827 DPLY SHELL KEUR BRWR KSPR BLK DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 237951196 Mr Coffee 5 Cup Coffeemaker Display | $0.01 | below range | $39.99 | comparable item: Mr. Coffee 5 Cup Thermal Coffeemaker |
| Home | 238879193 DPLY SLED KEUR BRWR KEXPE RED DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 240690272 George Foreman Gf Gr2081hm Non-working Display Sample | $0.01 | below range | $19.87 | median price of its category |
| Home | 241668639 DSPBL780WMP DISPLAY | $0.01 | below range | $0.98 | comparable item: Display Crispi four qt, DSPFN100WMP |
| Home | 243780478 Ninja Air Fryer Display | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 246289586 Shark Ion Force Zero-m Stick Vac Display | $0.01 | below range | $49.86 | comparable item: Shark Bagless Stick Vac |
| Home | 246442946 Dyson Light Ball Mf Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 247340008 Beautiful 2SL Toaster WHITE NON-WORKING DISPLAY | $0.01 | below range | $36.95 | median price of the same kind of item |
| Home | 247433325 Dyson - V6 Mtohd Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 247865541 Mr. Coffee Mc Barista Plexi Display | $0.01 | below range | $18.78 | median price of the same kind of item |
| Home | 248327319 Hoover Display Hvr Steam Vac | $0.01 | below range | $29.99 | median price of its category |
| Home | 249989539 Oster Skillet Ost Dm Display Wm | $0.01 | below range | $29.99 | median price of the same kind of item |
| Home | 251347075 George Foreman 60in Grill Display | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 251954134 Presto Kitchen Kettle Display | $0.01 | below range | $38.37 | comparable item: Presto Kitchen Kettle Multi-Cooker |
| Home | 253177211 Emerils Emerillagasse Pressure Airfryer Plus Dis | $0.01 | below range | $17.96 | median price of its category |
| Home | 253871926 Bissell Bi Pet Hair Eraser Slim Corded Nwd | $0.01 | below range | $6.49 | comparable item: BISSELL Pet Stain Eraser NWD |
| Home | 254633452 Mr Coffee 10c Coffeemkr Dis | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 256898138 Fw Air Fryer Display | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 257131502 Hamilton Beach D14pl 1.1 Cf/1000w Microwave Display | $0.01 | below range | $62.42 | comparable item: Emerson .9cf Microwave |
| Home | 257612903 Bissell Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 259691161 Kitchenaid 7cup Food Processor Display | $0.01 | below range | $49.99 | comparable item: kitchenaid 3.5-cup mini food processor |
| Home | 260175382 Shark Rotator Pla Zerom Speed Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 260306520 B 6QT AIRFRY DISPLAY | $0.01 | below range | $0.98 | comparable item: Thyme & Table 6 QT Air Fryer Display |
| Home | 264621838 Black & Decker Bd Souvide Dis | $0.01 | below range | $34.20 | comparable item: Black & Decker Bd 4 In 1 Coffermaker W&g |
| Home | 266567272 Hamilton Beach Hb 2slice Toaster Display | $0.01 | below range | $49.53 | comparable item: Hamilton Beach Hb 6 Slice Toaster Oven |
| Home | 267729592 Mr. Coffee 24oz Single Serve Coffee Dis | $0.01 | below range | $69.00 | comparable item: Mr Coffee 24oz Single Serve Coffee Maker |
| Home | 268547457 Brim Silver Kettle Display | $0.01 | below range | $60.96 | comparable item: Bella 1.2 L Silver Ceramic Kettle |
| Home | 271118068 Bissell Bi Powerforce Powerbrush Pet Nwd | $0.01 | below range | $91.00 | comparable item: Bissell Bi Powerforce Helix Turbo Rewind Nwd |
| Home | 272323596 Bodum 12 Cup Pour Over Coffee Maker with Permanent Filter | $0.01 | below range | $19.82 | comparable item: Bodum 8 Cup Black Pour Over Coffee Maker with Perm |
| Home | 273717714 Sunbeam Stand Mixer Display | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 274017819 CUISINART Automatic Grind & Brew 12-Cup Coffeemaker DISPLAY | $0.01 | below range | $77.72 | comparable item: Restored Cuisinart Grind and Brew 12-Cup Coffeemak |
| Home | 274968747 Mr Coffee 12c Speed Brew Slate Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 276645915 Display Shark Rocket Zero M | $0.01 | below range | $29.99 | median price of its category |
| Home | 276787286 Mainstays 0.7 Cu Ft White Microwave Oven | $0.01 | below range | $65.00 | comparable item: Mainstays 0.7 Cu. Ft. 700W Compact Microwave Oven, |
| Home | 277148543 Oster Personal Blendr Dis | $0.01 | below range | $17.96 | median price of its category |
| Home | 277473536 Bella Copper Waffle Disp | $0.01 | below range | $41.26 | comparable item: Bella Copper Ceramic Coated Waffle Maker |
| Home | 278032626 FW 6QT PRESSURE COOKER NWD | $0.01 | below range | $59.00 | comparable item: FW 6QT PRESSURE COOK |
| Home | 278977533 Oster Griddle Ost Dm Display Wm | $0.01 | below range | $32.45 | median price of the same kind of item |
| Home | 282926744 Bissell Powerforce Bagged Nwd | $0.01 | below range | $36.00 | comparable item: Bissell PowerForce Bagged Upright Vacuum, 71Y7W |
| Home | 283138929 Black & Decker Smartech 2-in-1 Display | $0.01 | below range | $4.05 | comparable item: Black & Decker Trowel Scrubber, Light Duty |
| Home | 283150010 Emeril Lagasse 6 Quart Pressure Air Fryer | $0.01 | below range | $72.99 | comparable item: Sboly 6-Quart Air Fryer |
| Home | 285869767 Shark Cyclone Hand Vac Display | $0.01 | below range | $57.00 | comparable item: Shark VX33 18V Bagless Hand Vac |
| Home | 285871877 CUISINART COMPACT GRIDDLER DISPLAY | $0.01 | below range | $17.96 | median price of its category |
| Home | 286604141 Hoover Hv Pet Upright Disp | $0.01 | below range | $13.97 | comparable item: HV Oxy Pet Portable Form |
| Home | 287083540 Hoover Smartwash Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 287468444 Sharp Countertop Microwave 1.8cf Display | $0.01 | below range | $64.00 | comparable item: Sharp 1.8 Cu. Ft. 1100W Countertop Microwave |
| Home | 289196175 George Foreman Gf 60 Grill Display | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 290013544 Black & Decker Steam Mop Display | $0.01 | below range | $10.00 | comparable item: Black & Decker Steam Iron |
| Home | 290165487 Kitchenaid Deluxe Stand Mixer Slvr Dis | $0.01 | below range | $28.94 | comparable item: KitchenAid Stand Mixer Attachments |
| Home | 303144976 BI PROHEAT PET TURBO NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 304334359 Dyson Dy V6 Cordfree Origin Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 306567595 LA500 DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 307025618 Oster Personal Blendr Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 307461311 Hamilton Beach Hb 4 Slice Toaster Oven Red Display | $0.01 | below range | $49.53 | comparable item: Hamilton Beach Hb 6 Slice Toaster Oven |
| Home | 307647771 Soda Stream Play Kit Display Black | $0.01 | below range | $16.49 | median price of the same kind of item |
| Home | 307796703 Kitchenaid 12cup Coffeemaker Display | $0.01 | below range | $21.99 | comparable item: Magic Chef 12-Cup Coffeemaker |
| Home | 309050064 Bunn 10 Cup Coffeemaker Display | $0.01 | below range | $21.99 | comparable item: Magic Chef 12-Cup Coffeemaker |
| Home | 309449019 Dyson Dc33 Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 309739872 DSPHV370WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 311291200 DSPSS400WM | $0.01 | below range | $17.96 | median price of its category |
| Home | 312439663 Hoover Hv Impulse Stick Vac Display | $0.01 | below range | $65.99 | comparable item: Hoover Presto Stick Vac, BH20095 |
| Home | 313571155 Bissell Bi Powerforce Compact Nwd | $0.01 | below range | $41.52 | comparable item: PowerForce Compact |
| Home | 313595039 Frigidaire Display Frig 1.6 Ss Mwo | $0.01 | below range | $13.43 | comparable item: Hamilton Beach 1.1 MWO SS DISPLAY |
| Home | 313894488 Mr Coffee 3qt Ice Teamakr Display | $0.01 | below range | $18.78 | median price of the same kind of item |
| Home | 314059018 RugDoctor Deep Carpet Cleaner | $0.01 | below range | $19.97 | comparable item: RugDoctor Oxy-Stem Carpet Cleaner, 60 Oz. |
| Home | 314798522 Oster Os Duraceramic Griddle Display | $0.01 | below range | $37.11 | comparable item: Oster DuraCeramic Griddle |
| Home | 315330010 Lime Crime 4 foot empty replacement tray | $0.01 | below range | $29.99 | median price of its category |
| Home | 319515719 SHARK STEAM SCRUB DISPLAY | $0.01 | below range | $99.99 | comparable item: STEAM MOP 4.0 |
| Home | 321765920 SB3651-E6 POP | $0.01 | below range | $16.09 | median price of the same kind of item |
| Home | 323848619 Black & Decker Bd 8cup Food Processor Display | $0.01 | below range | $46.97 | comparable item: Black & Decker Bd 8 Cup Food Processor |
| Home | 327328157 Display Oster Blender 12sp | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 331553518 Cuisinart 4sl Toaster Display | $0.01 | below range | $36.95 | median price of the same kind of item |
| Home | 331980239 Ninja Coffee Maker Display Ss Carafe | $0.01 | below range | $29.71 | comparable item: Coleman Carafe Propane Ss/coffee Maker P |
| Home | 332425027 Hamilton Beach Hb 6qt Probe Display | $0.01 | below range | $48.99 | comparable item: Hamilton Beach 33969 6 qt. Meat Probe Slow Cooker |
| Home | 332876335 Ninja Blender W/cup Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 334539314 Oster Classic Blender Wht Display | $0.01 | below range | $79.98 | comparable item: Classic 3-Speed Oster® Blender |
| Home | 336582368 Cuisinart Stand Mixer Red Display | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 337864027 Presto 3.5l Deepfry Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 340396068 Brim Mainstays 2 Sl Toaster Non-working Disp | $0.01 | below range | $36.95 | median price of the same kind of item |
| Home | 345324864 Bissell Powerlifter Rewind Display | $0.01 | below range | $88.00 | comparable item: Bissell Powerlifter Rewind, 1413 |
| Home | 345488092 Shark Ion Force Corded Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 345583386 BlendJet2 Display- Walmart | $0.01 | below range | $17.96 | median price of its category |
| Home | 346013608 Oster Dfl Convection Oven Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 349360641 Oster Os 12 Speed Blender W/fp Display | $0.01 | below range | $29.00 | comparable item: Oster 12-Speed Blender |
| Home | 349934192 Hamilton Beach Hb Digital Kettle Display | $0.01 | below range | $11.95 | comparable item: Hamilton Beach Hb Digital Microwave |
| Home | 349942383 Farberware Fp3000fbs Non-working Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 353666093 Black & Decker B&d Fp1700b Non-working Display Sample | $0.01 | below range | $17.96 | median price of its category |
| Home | 353944336 Hoover Display Hvr Dual Power Max | $0.01 | below range | $29.99 | median price of its category |
| Home | 355152954 Services Power Liftway Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 355884930 Hamilton Beach Hb 1.1 Mwo | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO BSS DISPLAY |
| Home | 356965855 Pure One Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 357084582 Crock-Pot display 4.5 hinged Blk Pr | $0.01 | below range | $37.75 | median price of the same kind of item |
| Home | 357338320 Hamilton Beach Hb Pw Non Working Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 357486600 Crock-pot Cp Hook Up 2qt Round Display | $0.01 | below range | $50.83 | comparable item: Crock-Pot Hook Up SCCPMD1-CP - Slow cooker - 2 qt  |
| Home | 359710809 Oster Display 4sl Ss Tstr | $0.01 | below range | $29.92 | comparable item: Oster 2sl Ss Design For Life Toaster |
| Home | 361997669 Hamilton Beach Hb 2 In 1 Oven Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 362167420 Galanz 0.7 Retro Blue Mwo Display Sample | $0.01 | below range | $20.62 | median price of its category |
| Home | 362956445 Magic Bullet Nutribullet 600 Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 364659213 Bissell Powerlifter Swivelrewind Nwd | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 365212489 Magic Bullet Display | $0.01 | below range | $7.49 | comparable item: Hamilton Beach Display Mwo |
| Home | 369141527 bubly Towel | $0.01 | below range | $23.79 | median price of the same kind of item |
| Home | 369572515 Hamilton Beach Display For Hb Sodastation | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO BSS DISPLAY |
| Home | 372000611 Hoover Display Dufh51200 For D/p Pro Cw | $0.01 | below range | $29.99 | median price of its category |
| Home | 374950780 B 2SL TOASTER DISPLY | $0.01 | below range | $36.95 | median price of the same kind of item |
| Home | 375652339 Samsung 1.9 Display | $0.01 | below range | $7.49 | comparable item: Hamilton Beach Display Mwo |
| Home | 377697410 NWD_2WCATGRAPHKIT_21 | $0.01 | below range | $29.99 | median price of its category |
| Home | 379453439 Powerxl Vortex Airfryer Plus 7qt Displa | $0.01 | below range | $17.96 | median price of its category |
| Home | 380076131 Instant Pot Duo 6Qt Display | $0.01 | below range | $79.00 | comparable item: Instant Pot Duo 6qt Copper Ss |
| Home | 380549503 Espressotoria Caprista Display White | $0.01 | below range | $99.00 | comparable item: Espressotoria Caprista White Espresso Coffee Pod M |
| Home | 381357526 Ninja 3-in-1 Cook System Dsp Acry Only | $0.01 | below range | $17.96 | median price of its category |
| Home | 382299747 Oster Party Jar Blendr W/ss Cup Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 382394817 Hamilton Beach Hb Single Serve Blender Grey Display | $0.01 | below range | $14.88 | comparable item: Hamilton Beach Single-Serve Blender |
| Home | 386284975 DSPHZ600WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 386981665 Services Sh Stm Pkt | $0.01 | below range | $29.99 | median price of its category |
| Home | 387627698 BD QUIET BLENDER WITH PERSONAL JAR DISPLAY | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 388498947 Kitchenaid Kitchen Aid Stand Mixer Black Display | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 388534288 Hoover High Performance Bagless Upright Display | $0.01 | below range | $12.50 | comparable item: Hoover WindTunnel 3 High Performance Upright Pet V |
| Home | 389454447 Black & Decker Digital Extra-wide Toaster Oven, Gray | $0.01 | below range | $86.87 | comparable item: Black + Decker Extra-Wide Toaster Oven Stainless S |
| Home | 389570223 Jack Lalanne Power Cooker Display 8qt | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 389987258 Dirt Devil Power Max Pet Display | $0.01 | below range | $90.80 | comparable item: Dirt Devil Power Max Pet Upright Vacuum Cleaner, U |
| Home | 391399679 Mr Coffee 5 Cup Coffeemkr Display | $0.01 | below range | $19.36 | comparable item: Mr. Coffee 5 Cup Coffee Maker |
| Home | 393195730 Hoover Display Hvr Air Lift Upright Duuh72510 | $0.01 | below range | $78.55 | comparable item: Restored Hoover Air Lift Bagless Upright Vacuum, U |
| Home | 393362106 Oster Food Processor Ds Odfl | $0.01 | below range | $73.99 | comparable item: Oster Oskar Food Processor |
| Home | 397133700 Jack Lalanne Power Air Fryer Non Working Display | $0.01 | below range | $79.00 | comparable item: Jack Lalanne 3.4 Quart Power Air Fryer |
| Home | 399071797 Keurig Kold Drinkmaker Display | $0.01 | below range | $4.98 | comparable item: Keurig® KOLD™ Fanta® 8 oz, 4/pack |
| Home | 399127500 Mr Coffee 12c Prog Coffee Maker Display | $0.01 | below range | $44.99 | comparable item: Mr. Coffee Coffee Maker |
| Home | 399943910 DSPSS350WM | $0.01 | below range | $17.96 | median price of its category |
| Home | 400268163 Bella Panini Maker Display | $0.01 | below range | $31.77 | comparable item: Bella Panini Maker |
| Home | 400767049 Presto Frydaddy Elite Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 401765242 Mr. Coffee Optimal Brew Plexi Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 402489631 Irobot E6 Robot Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 405381226 Bissell Powerlifter Ion Pet Nwd | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 408069019 Black & Decker Bd 2in1 Stick Vac Display | $0.01 | below range | $49.86 | comparable item: Black & Decker 18V Dustbuster Hand Vac |
| Home | 409624878 Shark Ion Robot Display | $0.01 | below range | $64.94 | comparable item: Shark ION Robot® Series Replenishment Kit |
| Home | 410561891 Instant Pot 8qt Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 412310296 Galanz Ga Digital Microwave | $0.01 | below range | $11.95 | comparable item: Hamilton Beach Hb Digital Microwave |
| Home | 412397772 Bissell Smartclean Robot Nwd | $0.01 | below range | $29.99 | median price of its category |
| Home | 413081263 Oster Double Flip Waffle Red Display | $0.01 | below range | $49.96 | comparable item: Oster Double Flip Red Waffle Maker |
| Home | 413459083 Display Hoover Air Cordless Upright | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 413540224 Black & Decker B&d 4 Slice, 2 Knob, Black Oven Display | $0.01 | below range | $42.00 | comparable item: Black & Decker 4-Slice Toaster Oven |
| Home | 413642000 Black & Decker Bd Quiet Single Serve Blender Display | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 415096684 Bissell Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 417202019 Oster Os Versa Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 419007532 Black & Decker Bd 12cup Coffeemkr Wht Display | $0.01 | below range | $12.66 | comparable item: Black & Decker Bd Jar 5cup Replacement |
| Home | 419284105 Rowenta Rw Iron Prom Dsp | $0.01 | below range | $1.00 | comparable item: New Display RW Ultimate Iron |
| Home | 420006123 Bissell Powerlifter Swivel Pet Nwd | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 420192048 Instant Pot 6qt Air Fryer Display | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 420545802 DSPCFP300WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 421569530 Shark Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 421623954 BISSELL POWERFRESH NWD | $0.01 | below range | $1.00 | comparable item: BISSELL CROSSWAVE HF3 NWD |
| Home | 422864881 DSPOL500 | $0.01 | below range | $17.96 | median price of its category |
| Home | 426382385 Black & Decker Bd 6slice 12" Oven Display | $0.01 | below range | $42.00 | comparable item: Black & Decker 4-Slice Toaster Oven |
| Home | 427670440 Black & Decker B&d 2sl Blk Display | $0.01 | below range | $0.98 | comparable item: Black + Decker Quiet Blender Display |
| Home | 430880868 George Foreman Gf Grp2841r Non-working Display Sample | $0.01 | below range | $19.87 | median price of its category |
| Home | 431137927 Medelco Café Brew Pour Over Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 431410533 Hoover Powerdash Portable Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 431744881 Ninja Food Processor Display | $0.01 | below range | $99.00 | comparable item: Hamilton Beach 70595 Food Processor |
| Home | 431837235 Hamilton Beach Disply | $0.01 | below range | $17.96 | median price of its category |
| Home | 432017770 Yukon Charlies Tray For Max Security Modular | $0.01 | below range | $17.96 | median price of its category |
| Home | 433823298 Bissell Proheat Advanced Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 434899776 Cuisinart 2sl Toaster Display | $0.01 | below range | $36.95 | median price of the same kind of item |
| Home | 434995298 Mainstays 4-Slice Black Toaster Oven | $0.01 | below range | $19.98 | comparable item: Mainstays 4 Slice Toaster Oven, Black |
| Home | 435253201 Memorex Display - Nes Vertuoplus Gray | $0.01 | below range | $17.96 | median price of its category |
| Home | 435978776 Hamilton Beach Hb 2sl Modern Chrome Toaster Display | $0.01 | below range | $42.10 | comparable item: Hamilton Beach Modern Chrome 2 Slice Toaster, 2279 |
| Home | 436174611 Instant Multicooker Disp | $0.01 | below range | $17.96 | median price of its category |
| Home | 436479721 Dirt Devil Display Dd Steam & Spray Mop | $0.01 | below range | $59.00 | comparable item: Dirt Devil Quick Clean Spray & Steam Mop, PD11030U |
| Home | 439198590 BLACK+DECKER 6 Cup Rice Cooker Display | $0.01 | below range | $63.99 | comparable item: Cuckoo 12Cup Rice Cooker Display |
| Home | 441362223 Black & Decker B&d Oven Blk Display | $0.01 | below range | $28.55 | comparable item: Black & Decker Toaster Oven |
| Home | 441547337 Ecovacs Ozmo U2SE Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 446952512 BEAUTIFUL 8QT SLOW COOKER NON-WORKING DISPLAY | $0.01 | below range | $9.82 | comparable item: Pioneer Woman Speckle Design Slow Cooker, Non-Work |
| Home | 448177701 Black & Decker Bd 12 Cup Thermal Coffee Maker Display | $0.01 | below range | $74.99 | comparable item: Black & Decker 8-Cup Thermal Coffee Maker |
| Home | 449045645 BLACK+DECKER Flex 2-in-1 Stick Vacuum | $0.01 | below range | $25.27 | comparable item: Bissell 3-in-1 Stick Vacuum |
| Home | 450716660 SHARK VAC DISPLAY | $0.01 | below range | $42.89 | comparable item: 12 GAL DISPLAY VAC |
| Home | 450846863 DSPQB3000SSWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 451511752 Instant Pot Duo 8Qt Display | $0.01 | below range | $79.00 | comparable item: Instant Pot Duo 6qt Copper Ss |
| Home | 455444369 Shark Sh Rocket Cordless Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 455451588 Farberware Battery Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 456344040 Mr. Coffee Mc 12c Cfemkr Wh Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 457088816 Beautiful 6qt Air Fryer WHITE NON-WORKING DISPLAY | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 457591368 Ninja Blender W/cup Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 458331151 Instant Pot Viva 6qt Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 464678017 Shark Freestyle Crdlss Stick Vac Dsp | $0.01 | below range | $49.86 | comparable item: Shark Bagless Stick Vac |
| Home | 468634919 Iced Coffee Maker Black Display | $0.01 | below range | $49.00 | comparable item: Mr. Coffee TFTX85 - Coffee maker - black |
| Home | 468820817 Nutribullet Full-Size Blender Display - Matte Black | $0.01 | below range | $67.74 | comparable item: nutribullet® Full Size 56 oz. Blender 1000 Watt, M |
| Home | 469220667 CO2 Wire Rack 48ct | $0.01 | below range | $16.99 | comparable item: Wire Rack Display |
| Home | 470653546 Ninja Xl Oven Dsply | $0.01 | below range | $17.96 | median price of its category |
| Home | 471078632 Conair® Turbo ExtremeSteam® — Steam & Iron 2-IN-1 With Turbo Model GS1 | $0.01 | below range | $19.99 | median price of the same kind of item |
| Home | 472126235 Hamilton Beach Ham Beach Immersion Blender Blk Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 472295026 Jack Lalanne Juicer Display | $0.01 | below range | $9.87 | comparable item: Hangrees-The Juicer |
| Home | 474886404 Black & Decker 4 Slice, 9" Pizza Toaster Oven Ss Dis | $0.01 | below range | $42.00 | comparable item: Black & Decker 4-Slice Toaster Oven |
| Home | 476871489 Services Ss Hf Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 477541151 BI VACUUM ACCESSORY DISPLAY | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 477919873 Hamilton Beach Hb Smoothie Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 480317470 Hamilton Beach 10 Spd Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 480484404 Hamilton Beach Dual Bsm | $0.01 | below range | $29.99 | median price of its category |
| Home | 484331348 Mc 10c Coffeemkr Display | $0.01 | below range | $0.98 | comparable item: Mc 5cup Coffeemkr Dp |
| Home | 489991377 Presto Deep Fryer Display | $0.01 | below range | $2.84 | comparable item: Farberware Deep Fryer Display |
| Home | 491939676 Hamilton Beach Hb 12c Prgm Coffee Maker Display | $0.01 | below range | $68.00 | comparable item: HB TRIO COFFEE MAKER |
| Home | 493064118 Bunn Speed Brew Csb2 10 Cup Coffee Displ | $0.01 | below range | $16.07 | comparable item: BUNN 42683 8-Cup Glass Carafe for Phase Brew HG Ho |
| Home | 496130315 nutriBullet® Smart Touch Blender™ 1400W DISPLAY | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 496293267 Pure One S11 Spartan NWD - Final | $0.01 | below range | $29.99 | median price of its category |
| Home | 498151727 Hamilton Beach Display For Hb 2slice Toaster | $0.01 | below range | $49.53 | comparable item: Hamilton Beach Hb 6 Slice Toaster Oven |
| Home | 498297808 Frigidaire Display Frig 1.1 Cu. | $0.01 | below range | $17.96 | median price of its category |
| Home | 499712372 Neato Vacuum Display | $0.01 | below range | $10.99 | comparable item: MagicBag VACUUM |
| Home | 499714086 HART Brushless Stick Vacuum Display | $0.01 | below range | $27.49 | comparable item: Bissell 3in1 Stick Vacuum |
| Home | 500995790 Shark Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 501812817 Presto Big Kettle Display | $0.01 | below range | $48.59 | comparable item: Presto Big Kettle 2.75 Qt. Multi-Cooker/Steamer 06 |
| Home | 504348868 DPLY SLED KEUR BRWR K-SLIM DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 507997499 Hamilton Beach Fullsize Iron Display | $0.01 | below range | $21.91 | comparable item: Hamilton Beach Steam Iron 14672 |
| Home | 509378810 Oster Display Toaster 2 Slice Red | $0.01 | below range | $35.78 | comparable item: Oster Metallic Red 2-Slice Toaster |
| Home | 509392833 Mr Coffee 12c Coffee Maker Wh Dis | $0.01 | below range | $44.99 | comparable item: Mr. Coffee Coffee Maker |
| Home | 511308611 Kitchenaid Deluxe Stand Mixer Blue Dis | $0.01 | below range | $28.94 | comparable item: KitchenAid Stand Mixer Attachments |
| Home | 512880545 DSPBN800 | $0.01 | below range | $17.96 | median price of its category |
| Home | 513112663 Farberware 4.7qt Stand Mixer Display | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 514775243 Mr Coffee 12c Coffee Maker Dis | $0.01 | below range | $44.99 | comparable item: Mr. Coffee Coffee Maker |
| Home | 515235324 Hamilton Beach Hb 2 Slice Digital Toaster Display | $0.01 | below range | $53.00 | comparable item: Hamilton Beach 2 Slice Modern Toaster with Digital |
| Home | 516652590 Presto Dehydrator Display | $0.01 | below range | $63.70 | comparable item: Presto Food Dehydrator |
| Home | 522111593 Mr Coffee Burmill Grndr Display | $0.01 | below range | $18.78 | median price of the same kind of item |
| Home | 523379248 Emerson 1.2 Mwo Display | $0.01 | below range | $7.49 | comparable item: Hamilton Beach Display Mwo |
| Home | 524765073 Hoover Onepwr Evolve Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 527183177 Delonghi Nespresso Vertuo Plus Black Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 528167796 Bissell Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 530795079 Beautiful White 6qt Slow Cooker NON-WORKING DISPLAY | $0.01 | below range | $34.97 | comparable item: Beautiful 4Qt Slow Cooker with Touch-Activated Dis |
| Home | 532525359 Hoover Display Hvr Steamscrub Mop Duwh20440 | $0.01 | below range | $45.53 | median price of the same kind of item |
| Home | 538456938 Mr Coffee Espresso Red Display | $0.01 | below range | $22.68 | median price of the same kind of item |
| Home | 539597757 Display Rowenta Ultimate DW80 Iron | $0.01 | below range | $1.00 | comparable item: New Display RW Ultimate Iron |
| Home | 539662127 Hamilton Beach Hb Flexbrew With Hot Water Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 543466274 Hamilton Beach Hb Glass Jar Blender Chrome Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 551119918 Magic Bullet Nutribullet 600 Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 551976003 Shark Sh Self Empty Rbt Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 553518204 Magic Bullet Nutribullet 900 Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 553652709 Jack Lalanne Power Air Fryer 360 Plus Dummy Display | $0.01 | below range | $79.00 | comparable item: Jack Lalanne 3.4 Quart Power Air Fryer |
| Home | 555083877 Presto Cooldaddy Df Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 558801688 Hamilton Beach Hb Double Breakfast Sandwich Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 559989410 Bissell Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 561236883 Hamilton Beach Dsp Expert Toast | $0.01 | below range | $17.96 | median price of its category |
| Home | 563065148 NV130 SPRING DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 569610708 Puffy Tray Liner, 4.25 Oz. | $0.01 | below range | $29.99 | median price of its category |
| Home | 571913674 Mr. Coffee 14-Cup Coffeemaker Display | $0.01 | below range | $39.87 | comparable item: Mr. Coffee 12-Cup Coffeemaker, 12 5/8"H x 11 13/16 |
| Home | 572239889 BISSELL CROSSWAVE CORDLESS NWD | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 573009626 HART Stick Vacuum Display | $0.01 | below range | $27.49 | comparable item: Bissell 3in1 Stick Vacuum |
| Home | 573362089 Hoover Dual Power Max Pet Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 575544875 Hamilton Beach Hb No Mess Waffle Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 575604193 Black & Decker B & D Can Opener, Smp, Black Display | $0.01 | below range | $19.00 | comparable item: Black & Decker Can Opener |
| Home | 575895840 Instant Pot 6qt Viva Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 576566929 HART 20V High Capacity Cordless Stick Vacuum NWD | $0.01 | below range | $51.47 | comparable item: Eureka Cordless 2-in-1 Stick Vacuum, 95A |
| Home | 578320804 Black & Decker B&d Rice Display | $0.01 | below range | $15.00 | comparable item: Black & Decker 16-Cup Rice Cooker |
| Home | 583204601 Black & Decker B&d Je2200b Non-working Display Sample | $0.01 | below range | $17.96 | median price of its category |
| Home | 584065119 DSPIX140H | $0.01 | below range | $29.99 | median price of its category |
| Home | 584750517 Presto Digital Dehydrator Display | $0.01 | below range | $95.14 | comparable item: Presto Dehydro Digital Electric Food Dehydrator |
| Home | 585025428 Black & Decker B&d 2sl Red Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 586924809 Black & Decker Bd Easy Dial 12 Cup Coffee Maker Display | $0.01 | below range | $51.62 | comparable item: Black & Decker 8 Cup Black Easy Coffee Maker |
| Home | 589310242 Hamilton Beach Hb Bsm Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO BSS DISPLAY |
| Home | 590809559 Hamilton Beach Hb 1.1 Mwo | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO BSS DISPLAY |
| Home | 591043629 Dsp Shark Rocket Deluxe Pro Vac | $0.01 | below range | $29.99 | median price of its category |
| Home | 591311586 GOURMIA Grind & Brew Display | $0.01 | below range | $79.99 | comparable item: Gourmia Automatic Grind and Brew Coffee Maker |
| Home | 594826717 Black & Decker Cm5000b Non-working | $0.01 | below range | $49.88 | comparable item: Black & Decker CM5050 Coffemaker |
| Home | 596102641 SAMSUNG DISPLAY Jet Cordless Stick Vacuum | $0.01 | below range | $51.47 | comparable item: Eureka Cordless 2-in-1 Stick Vacuum, 95A |
| Home | 596582271 Hoover Fusion Stick Vacuum Display | $0.01 | below range | $79.99 | comparable item: Hoover Flair Stick Vacuum With Powered N |
| Home | 601005642 Bissell Spotbot Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 601211825 Mr Coffee 12 Cup Switch Black Display | $0.01 | below range | $30.00 | comparable item: Mr Coffee 12 Cup Switch Black Coffee Maker |
| Home | 601779136 Oster Dfl Xl Toaster Oven Display | $0.01 | below range | $52.86 | comparable item: MS XL TOASTER OVEN |
| Home | 602108945 BI POWERLIFTER PET LIFT-OFF NWD | $0.01 | below range | $80.12 | comparable item: Bissell Lift-Off Floors and More Pet Vacuum, 53Y81 |
| Home | 603229976 Shark Sh Vacmop Robot Nwd | $0.01 | below range | $7.98 | comparable item: Shark VACMOP |
| Home | 603369704 Hoover Floormate Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 605630155 Mr. Coffee 12cup Prg Coffee Maker Disply | $0.01 | below range | $19.36 | comparable item: Mr. Coffee 5 Cup Coffee Maker |
| Home | 606148914 Mr. Coffee® 12-Cup Programmable Coffee Maker with Strong Brew Selector | $0.01 | below range | $29.99 | comparable item: Mr. Coffee 12 Cup Programmable Coffee Maker with S |
| Home | 606207007 Instant Pot Duo80 Nwd | $0.01 | below range | $27.68 | median price of the same kind of item |
| Home | 606510215 HART Pro Upright Vacuum Display | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 609189821 Emerils Emeril Lagasse Pressurecooker8qt Display | $0.01 | below range | $48.26 | comparable item: Emeril Lagasse 2qt Tri-Ply Sauce Pan |
| Home | 610445488 Hamilton Beach Hb Panini Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 616571889 HART Hand Vacuum Display | $0.01 | below range | $18.18 | comparable item: HART 20V Hand Vacuum, HPHV01 |
| Home | 617087743 Mr Coffee Single Serve Brewer Display | $0.01 | below range | $68.77 | comparable item: Mr. Coffee Single Serve Red Coffee Brewer Machine |
| Home | 617335488 Mr. Coffee Mc Glass Ice Tea Maker Display | $0.01 | below range | $23.89 | comparable item: Mr Coffee Ice Tea Maker - Lime |
| Home | 617977106 George Foreman Grill Nw Dis | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 620416009 BISSELL ProHeat 2X Revolution Pet NWD | $0.01 | below range | $0.98 | comparable item: Pet Hair Eraser DualBrush NWD |
| Home | 621032650 Black+decker Smartech Robot Vac Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 622119494 Hoover Display Hvr Dual Power | $0.01 | below range | $29.99 | median price of its category |
| Home | 625723617 Ninja U Auto Iq Blender Display | $0.01 | below range | $89.00 | comparable item: Ninja Auto IQ Single Serve Blender |
| Home | 626914574 Mr. Coffee Mc 12cup Programmable Plexi Display | $0.01 | below range | $34.00 | comparable item: Mr. Coffee 12-cup Programmable Coffeemak |
| Home | 627944922 Dyson Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 627971275 Mr. Coffee 12-Cup Programmable Red Coffee Maker | $0.01 | below range | $67.48 | comparable item: Mr. Coffee 12 Cup Programmable Red Coffee Maker |
| Home | 629074747 Presto Fountain Popper Display | $0.01 | below range | $37.00 | comparable item: Presto Electric Hot Air Fountain Popper |
| Home | 632113508 Instant Pot Duo Mini 7-in-1 - Multi cooker - 3 qt - 700 W | $0.01 | below range | $50.00 | comparable item: Instant Pot DUO60 6 Qt 7-in-1 Multi-Use Programmab |
| Home | 638551525 Better Homes & Gardens Display Better Homes & Gardens Ellis Shutter Ca | $0.01 | below range | $32.87 | median price of the same kind of item |
| Home | 638700995 Oster Werrington Stainless Steel Cutlery Set, 12 Piece | $0.01 | below range | $32.44 | comparable item: Oster 6 Piece Black Stainless Steel Cutlery Set |
| Home | 639130485 Magic Bullet Display | $0.01 | below range | $7.49 | comparable item: Hamilton Beach Display Mwo |
| Home | 641685101 Ninja Product Display | $0.01 | below range | $15.60 | comparable item: American Standard Product 047194-0070A |
| Home | 645466074 Me Turbo Convection Oven - Ds | $0.01 | below range | $17.96 | median price of its category |
| Home | 646516518 Black & Decker B+d 12sp Fusion Blade Ss Blender Display | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 647336827 Jack Lalanne Multi Cooker Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 650079908 Black & Decker Bd Airswivel Lite Display | $0.01 | below range | $40.12 | comparable item: Black & Decker B D Airswivel Lite |
| Home | 650118461 Instant Pot Duo60 Nwd | $0.01 | below range | $27.68 | median price of the same kind of item |
| Home | 650425794 Instant Pot Duo 3Qt Display | $0.01 | below range | $79.00 | comparable item: Instant Pot Duo 6qt Copper Ss |
| Home | 652732947 B 14C COFFEE DISPLAY | $0.01 | below range | $38.98 | comparable item: BonJour Coffee - 2 Pack |
| Home | 652893109 Bella Waffle Maker Display | $0.01 | below range | $40.20 | comparable item: Bella Rotation Waffle Maker |
| Home | 654261866 Tineco Pure One S11 Spartan NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 654489696 Mr. Coffee 3-in-1 Frappe Frozen Coffeemaker Display | $0.01 | below range | $6.12 | median price of the same kind of item |
| Home | 655199002 Hamilton Beach Hb Glass Jar Blender Display Red | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 658722427 Aroma Ar 20c Ss Display | $0.01 | below range | $13.43 | comparable item: Hamilton Beach 1.1 MWO SS DISPLAY |
| Home | 659136575 Hoover Elite Rewind Plus Display | $0.01 | below range | $20.61 | comparable item: Restored Hoover UH71200 Elite Rewind Plus Upright  |
| Home | 660302682 Mr Coffee 12c Speed Brew Red Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 661069550 Icoffee Davinci Coffee Maker Display | $0.01 | below range | $40.00 | comparable item: Hello Kitty Coffee Maker |
| Home | 661962116 Mr Coffee 12c Coffee Maker Bk Dis | $0.01 | below range | $44.99 | comparable item: Mr. Coffee Coffee Maker |
| Home | 664353479 Rowenta Rw Iron Perm Dsp | $0.01 | below range | $10.11 | median price of the same kind of item |
| Home | 677447185 Oster Classic Plus Blender Display | $0.01 | below range | $79.98 | comparable item: Classic 3-Speed Oster® Blender |
| Home | 679964260 Ninja Air Grill Display | $0.01 | below range | $35.93 | median price of the same kind of item |
| Home | 680732209 Services Fusion Juicer Display | $0.01 | below range | $19.99 | median price of the same kind of item |
| Home | 684063061 Frigidaire Display Frig 1.4 Black Ss Mwo | $0.01 | below range | $46.80 | comparable item: MAINSTAYS 2.2 MWO BLACK DISPLAY |
| Home | 684727844 Ninja Steam Oven Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 684748961 Hamilton Beach Hb Xl Oven Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 685147654 Bissell Bi Jetscrub Pet Nwd | $0.01 | below range | $0.98 | comparable item: Pet Hair Eraser DualBrush NWD |
| Home | 687323371 NutriBullet Juicer™ DISPLAY | $0.01 | below range | $9.87 | comparable item: Hangrees-The Juicer |
| Home | 687900534 Instant Pot PW Sweet Rose 6Qt Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 689004935 Hoover High Performance Swivel Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 690920617 BD 6SL AIR FRYER TOASTER OVEN DISPLAY | $0.01 | below range | $84.06 | comparable item: Chefman 18L Toaster Oven Air Fryer, New |
| Home | 692155838 Hoover Power Dash Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 693027577 Delonghi Nespresso Inissia Machine Black Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 695389683 Ninja Digital Touch Blender Display | $0.01 | below range | $34.88 | comparable item: Oster Digital Blender |
| Home | 695472515 Rival Griddle Display | $0.01 | below range | $18.96 | comparable item: Rival Griddle |
| Home | 699578594 Oster Blndr W/prtyjar D | $0.01 | below range | $17.96 | median price of its category |
| Home | 700608064 DSPBN700WMP DISPLAY | $0.01 | below range | $0.98 | comparable item: Display Crispi four qt, DSPFN100WMP |
| Home | 703414869 Oster Waffle Display | $0.01 | below range | $33.43 | comparable item: Oster DuraCeramic Waffle Maker |
| Home | 703840388 Cuisinart Food Processor Display | $0.01 | below range | $52.61 | comparable item: 8-Cup Food Processor |
| Home | 703985328 Mr Coffee 12c Red Coffee Maker Display | $0.01 | below range | $67.48 | comparable item: Mr. Coffee 12 Cup Programmable Red Coffee Maker |
| Home | 709594756 DSPCE250WMP Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 712641438 Mainstays Mainstay Griddle Display | $0.01 | below range | $15.03 | comparable item: Mainstay 11" Griddle, Red |
| Home | 712981007 Instant Pot Pw 6qt Frontier Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 714448911 Mc 12c Programmable Coffee Display Red | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 720241847 Sodastream Exchange Upc | $0.01 | below range | $16.49 | median price of the same kind of item |
| Home | 720414144 Shark Comet 14 Inch Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 724390775 GF 2 SERVING DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 726600425 Hamilton Beach Toaster Display, Black | $0.01 | below range | $22.99 | comparable item: Hamilton Beach Smart Toast Toaster, Black, 22121 |
| Home | 726645200 Shark Sh Ion Robot Iq Display | $0.01 | below range | $64.94 | comparable item: Shark ION Robot® Series Replenishment Kit |
| Home | 733517050 Hamilton Beach Hb Food Processor Black Display | $0.01 | below range | $99.00 | comparable item: Hamilton Beach 70595 Food Processor |
| Home | 739255801 Ninja Kitchen Assistant Blender Display | $0.01 | below range | $24.88 | comparable item: Sunbeam Kitchen Assistant |
| Home | 746298575 Power Xl Vortex Airfryer Plus 5qt Dummy | $0.01 | below range | $17.96 | median price of its category |
| Home | 750373045 Plaid 11 Slot Left Paint Tray, 8 Fl. Oz. | $0.01 | below range | $17.96 | median price of its category |
| Home | 750593948 BLACK+DECKER 3 Cup Rice Cooker Display | $0.01 | below range | $63.99 | comparable item: Cuckoo 12Cup Rice Cooker Display |
| Home | 753659820 Black & Decker B&d Oven Ss Display | $0.01 | below range | $28.55 | comparable item: Black & Decker Toaster Oven |
| Home | 755779412 Bunn Grx-b 10 Cup Coffee Brewer Display | $0.01 | below range | $50.27 | comparable item: Elite 40-Cup Coffee Brewer [CCM-07X] |
| Home | 756590299 Shark Display For Ultralite Power | $0.01 | below range | $29.99 | median price of its category |
| Home | 757735250 BEAUTIFUL TOASTER OVEN/AIR FRYER NON-WORKING DISPLAY | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 758021341 Mainstays 0.7cf/700w Mwo | $0.01 | below range | $14.16 | comparable item: Mainstays Ms 0.7 Cf Blk Mwo Dis |
| Home | 758171869 NJA CREAMI DISPLAY | $0.01 | below range | $0.98 | comparable item: Ninja Creami Display - XNC300BL |
| Home | 761251833 Shark Navigator Lift-away Vacuum Display | $0.01 | below range | $88.13 | comparable item: Refurbished Shark Navigator Lift-Away Upright Vacu |
| Home | 761630260 Gameday Outfitters Tray For 4' Modular | $0.01 | below range | $19.99 | comparable item: Better Homes & Gardens Tray |
| Home | 761692761 CUISINART Coffee Center™ Brew Basics DISPLAY, 64 Oz | $0.01 | below range | $18.78 | median price of the same kind of item |
| Home | 761814730 Oster Classic White Blender Display | $0.01 | below range | $39.00 | comparable item: Oster Classic 3-Speed Blender, Smoothie Blender, W |
| Home | 764213355 Dyson - V6 Slim Blue Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 765778584 Instant Pot Crisp Lite 6Qt Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 766993436 Dyson - Light Ball Animal Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 768238889 Ninja Auto Iq Master System Blender Disl | $0.01 | below range | $90.30 | comparable item: Refurbished Nutri Ninja Blender System with Auto-i |
| Home | 768385860 Mc 5cup Coffee Display Black | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 769495807 Mr. Coffee Ice Tea Maker Display | $0.01 | below range | $23.89 | comparable item: Mr Coffee Ice Tea Maker - Lime |
| Home | 773453480 Black & Decker B&d 12c Coffeemaker Non-working Display | $0.01 | below range | $17.00 | comparable item: Black + Decker 12 Cup Coffeemaker |
| Home | 775583126 JDZDESIGN 3M Scotchgard Down Alternative All Season Comforter Set | $0.01 | below range | $42.99 | comparable item: fangmm 3-Piece All-Season Down Alternative Comfort |
| Home | 776114519 Mrc Steam Espresso Wmt Sled | $0.01 | below range | $17.96 | median price of its category |
| Home | 778211045 JC100 DISPLAY | $0.01 | below range | $17.96 | median price of its category |
| Home | 779423083 Hamilton Beach Hb Roaster Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 781850341 Shark Rotator Lift-away Duoclean Display | $0.01 | below range | $90.80 | comparable item: Shark® APEX™ DuoClean™ Powered Lift-Away®, AX950 |
| Home | 783660722 George Foreman 144 In Grill Display | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 785173079 Mainstays 0.7cf/700w Mwo | $0.01 | below range | $14.16 | comparable item: Mainstays Ms 0.7 Cf Blk Mwo Dis |
| Home | 789821799 Black + Decker Party Jar Blender Display | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 790628771 DISPLAY BLACK+DECKER POWERSERIES+ Cordless Stick Vacuum | $0.01 | below range | $99.99 | comparable item: BLACK+DECKER HFEK520J 3-N-1 Cordless Stick Vacuum |
| Home | 791076790 Black & Decker B&d 4 Slice Toaster Display | $0.01 | below range | $38.25 | comparable item: Black & Decker 2-slice Toaster |
| Home | 791610928 DPLY SLED KEUR BRWR KEXPE BLK DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 794258215 Bissell Crosswave Pet Nwd | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 796093691 Shark Ion Robot Display DSPRV754WM | $0.01 | below range | $64.94 | comparable item: Shark ION Robot® Series Replenishment Kit |
| Home | 799750639 Magic Bullet Nutribullet Veggie Bullet Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 801144022 Presto 20" Griddle Display | $0.01 | below range | $31.73 | comparable item: Presto 20" Electric Griddle |
| Home | 805201599 Shark Sh Navigator Deluxe Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 805655063 Hamilton Beach Hb Slow Cooker Display | $0.01 | below range | $30.15 | comparable item: Hamilton Beach 33171 Slow Cooker |
| Home | 805730342 Dyson Bll Ml Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 807245993 Mr. Coffee Mc Esprsso Plexi Display | $0.01 | below range | $18.78 | median price of the same kind of item |
| Home | 815633223 Shark Ion Robot with Ion Sabre Hand Vacuum | $0.01 | below range | $64.94 | comparable item: Shark ION Robot® Series Replenishment Kit |
| Home | 816075304 Hamilton Beach D14pl 1.1 Cu.ft. Digital | $0.01 | below range | $75.78 | comparable item: Hamilton Beach 1.1 Cu. Ft. Digital White Microwave |
| Home | 816563750 Kitchenaid Culinary Center Dislay | $0.01 | below range | $17.96 | median price of its category |
| Home | 820088302 Dyson - Light Ball Mf Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 826104219 Farberware Royalty Fw Toaster Oven Display | $0.01 | below range | $22.86 | comparable item: Farberware Royalty Farberware 2 Slice Toaster |
| Home | 827738441 Keurig Kold White Drinkmaker Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 829691615 Bissell Proheat 2x Revolution Display Set | $0.01 | below range | $29.99 | median price of its category |
| Home | 832239743 Shark Sh Nav L-a Zerom Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 833777369 Cbella, Eramic Kettle Display | $0.01 | below range | $35.16 | median price of the same kind of item |
| Home | 834478551 Panasonic Mwo 2.2 Cft Display "nn-t945sfdisp" | $0.01 | below range | $17.96 | median price of its category |
| Home | 835410845 Oster 2slice Toaster Ss Display | $0.01 | below range | $34.99 | comparable item: Oster® 2-Slice Toaster |
| Home | 840383420 DSPIZ640HWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 841130993 BI PET STAIN ERASER POWERBRUSH NWD | $0.01 | below range | $6.49 | comparable item: BISSELL Pet Stain Eraser NWD |
| Home | 844152376 Bissell Bi-crosswave Cordless Max Nwd | $0.01 | below range | $21.99 | comparable item: BI CROSSWAVE CORDLESS MAX PET MULTI SURFACE BRUSH  |
| Home | 844446169 Mainstays Display Mwo | $0.01 | below range | $16.30 | comparable item: MAINSTAYS 1.1 MWO DISPLAY |
| Home | 846127136 Dyson V6 Slm Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 847267217 Bella Extra Large Grill Display | $0.01 | below range | $34.78 | median price of the same kind of item |
| Home | 847517216 Oster Stand Mixer Display | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 847526008 Oster Os Classic Blender W/food Process Rd Dis | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 849955814 Oster One Touch Blender Display | $0.01 | below range | $65.00 | comparable item: Oster 6 Cup One Touch Blender in Black |
| Home | 850145128 Crock-pot Cp Hook Up 3.5qt Oval Display | $0.01 | below range | $50.83 | comparable item: Crock-Pot Hook Up SCCPMD1-CP - Slow cooker - 2 qt  |
| Home | 850573944 Freestanding Rack For 54" Yard Goods, 16 | $0.01 | below range | $29.99 | median price of its category |
| Home | 854312257 Galanz Ga 0.7 Retro Cream Mwo Dis | $0.01 | below range | $9.38 | comparable item: Galanz 1.2cf Airfry Mwo Dis |
| Home | 854901872 Sled Display - Acrylic | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 858435306 Ninja Foodi Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 861537068 Ninja Pro Ss Blender Display | $0.01 | below range | $79.08 | comparable item: Ninja Pro Single Serve Blender |
| Home | 864508667 GOURMIA THERMAL COFF DSP | $0.01 | below range | $17.96 | median price of its category |
| Home | 866136387 Brim Ceramic Skillet Display | $0.01 | below range | $29.84 | comparable item: Bella Ceramic Skillet |
| Home | 866632951 Bissell Powerlifter Pet Display | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 866915815 Hamilton Beach Hb Big Mouth Juicer Display | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 867694765 Shark Sh Lift Away Go Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 869335545 BD 4 SL AIR FRY TOASTER OVEN DISPLAY | $0.01 | below range | $84.22 | comparable item: GreenLife Air Fry Toaster Oven | Turquoise |
| Home | 871234713 Cuisinart 5n1 Grill Display | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 871643029 Instant Pot Ib Mini Af Display | $0.01 | below range | $27.68 | median price of the same kind of item |
| Home | 871740677 Powerxl Vortex Air Fryer Slimline 9qt Du | $0.01 | below range | $89.00 | comparable item: PowerXL Vortex Pro 8 Qt Air Fryer |
| Home | 872942573 Hoover Onepwr Blade Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 873123836 Shark Sh Vertex Crdls Nwd | $0.01 | below range | $29.99 | median price of its category |
| Home | 875521732 Mr. Coffee Burr Grinder Plexi Display | $0.01 | below range | $29.99 | comparable item: Mr. Coffee Coffee Grinder |
| Home | 875927096 Mr. Coffee Mc Hot Spot Station Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 876967778 Hoover Display Hvr High Pererforamnce Pet | $0.01 | below range | $29.99 | median price of its category |
| Home | 877883769 Mr Coffee 12 Cup Display | $0.01 | below range | $21.56 | comparable item: Green Mountain Coffee Roasters® K-Cup Coffee |
| Home | 881796407 Shark Sh Lift-away Pro Display | $0.01 | below range | $59.99 | comparable item: Restored Shark Lift-Away Pro Steam Mop with Click  |
| Home | 882495430 Hamilton Beach 1.1 Cf/1000w Microwave | $0.01 | below range | $69.88 | comparable item: Hamilton Beach 0.9 Cf/900w Microwave |
| Home | 883072562 Oster Dfl 4slice Toaster Display | $0.01 | below range | $34.99 | comparable item: Oster® 2-Slice Toaster |
| Home | 886324009 Mainstays 0.7 Cu. Ft. 700W Microwave Oven | $0.01 | below range | $56.98 | comparable item: Mainstays 0.7 cu ft 700W Microwave Oven |
| Home | 889956036 Hamilton Beach HB RETRACTABLE CORD IRON | $0.01 | below range | $27.88 | comparable item: Hamilton Beach 1500W Retractable Cord Iron | Model |
| Home | 890407061 Oster 14sp Blender B Dis | $0.01 | below range | $54.88 | comparable item: Oster Beehive Blender |
| Home | 893675224 Bissell Powerforce Compact Display | $0.01 | below range | $41.52 | comparable item: PowerForce Compact |
| Home | 894099047 Hoover Hv Air Steerable Disp | $0.01 | below range | $99.00 | comparable item: Hoover WindTunnel 3 Air Steerable |
| Home | 894709922 Tramontina Pop Display For 4pc Induction Cooking | $0.01 | below range | $76.90 | comparable item: Tramontina Portable Induction 4 Piece Cooking Syst |
| Home | 896561924 Paula Deen Red Cutlery Display | $0.01 | below range | $0.97 | comparable item: Red Cutlery |
| Home | 897267537 Ninja Duo Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 900677511 Dirt Devil Power Stick Disp | $0.01 | below range | $43.10 | comparable item: Dirt Devil Power Stick Vacuum, M084100RED |
| Home | 901127796 Shark Sh Wandvac Go Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 901232173 Rival 4 Slice Toaster Oven Display | $0.01 | below range | $25.16 | comparable item: Rival 4 Slice Toaster Oven |
| Home | 906080710 SS150 BLENDER DISPLAY | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 909231532 Presto Tilt Griddle Display | $0.01 | below range | $31.73 | comparable item: Presto 20" Electric Griddle |
| Home | 909397398 Oster Dfl 6slice Toaster Oven Display | $0.01 | below range | $69.88 | comparable item: Oster 6 Slice Toaster Oven (6293) - Electric oven |
| Home | 910195803 Oster Os 7cup Blender Display | $0.01 | below range | $99.99 | comparable item: Oster 6 Cup Table Top Blender |
| Home | 912213772 Services Disaply Unit For Hb Pod Coffee Maker | $0.01 | below range | $37.39 | median price of the same kind of item |
| Home | 913622492 Bissell Bi Powerlifter Superlight Disp | $0.01 | below range | $29.99 | median price of its category |
| Home | 916635224 Shark Rotator Lift Away Professional Display | $0.01 | below range | $42.49 | comparable item: Shark NV510 Rotator Professional Lift Away Upright |
| Home | 916943374 Display HB Sandwich Maker | $0.01 | below range | $20.49 | comparable item: Rival Sandwich Maker |
| Home | 922125550 Powerxl Air Fryer Grill Plus Dummy Displ | $0.01 | below range | $89.99 | comparable item: 5QT 6-IN-1 AIR FRYER |
| Home | 924436876 Bissell Bolt Ext Pet Nwd | $0.01 | below range | $89.00 | comparable item: BISSELL 1313W Bolt EXT 2-in-1 Cordless Stick Vacuu |
| Home | 926191047 Bissell Powerforce Powerbrush Disp Unit | $0.01 | below range | $29.99 | median price of its category |
| Home | 927029841 Oster DiamondForce Waffle maker Display | $0.01 | below range | $67.48 | comparable item: Oster® DiamondForce™ Nonstick Flip Waffle Maker |
| Home | 927647612 Shark Sh Rotr L-a Dc Zerom Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 931115683 Hamilton Beach Easy Clean Juice Display | $0.01 | below range | $26.61 | median price of the same kind of item |
| Home | 932620090 Ninja Blender Iq Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 933072185 Jack Lalanne Copper Chef Skillet Display | $0.01 | below range | $29.99 | median price of the same kind of item |
| Home | 934463011 Shark Display Rocket Dlx Vacuum | $0.01 | below range | $49.38 | comparable item: Refurbished Shark Rocket Powerhead Vacuum |
| Home | 934585243 Oster French Door Oven With Air Fryer Display | $0.01 | below range | $100.00 | comparable item: Oster® Compact Countertop Oven With Air Fryer, Sta |
| Home | 938447962 GF 144IN SS GRILL DISPLAY | $0.01 | below range | $54.88 | comparable item: BLACK+DECKER 144" Grill |
| Home | 938562645 Mainstays Personal Blender Display | $0.01 | below range | $13.83 | comparable item: Mainstays Personal Blender |
| Home | 938769435 DSPIG600P | $0.01 | below range | $17.96 | median price of its category |
| Home | 939511946 George Foreman Gf Gr2144p Non-working Display Sample | $0.01 | below range | $19.87 | median price of its category |
| Home | 947691419 Kitchenaid 12cup Coffeemaker Display | $0.01 | below range | $21.99 | comparable item: Magic Chef 12-Cup Coffeemaker |
| Home | 947917117 Hamilton Beach Disply | $0.01 | below range | $17.96 | median price of its category |
| Home | 947943283 George Foreman Gf 84 In Multi-plate Grill Display | $0.01 | below range | $21.35 | comparable item: George Foreman 36-Inch Fixed Plate Grill |
| Home | 948516969 Bissell Bissel Proheat Pet Advanced Display | $0.01 | below range | $19.92 | comparable item: BISSELL Advanced Pet Urine Eliminator, 50 oz. |
| Home | 949366307 Irobot Braava 245 Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 950931894 Bissell Powerforce Helix Nwd | $0.01 | below range | $54.00 | comparable item: Bissell Powerforce Helix-berry |
| Home | 952677741 Bissell Pet Stain Eraser Nwd | $0.01 | below range | $6.28 | median price of the same kind of item |
| Home | 954081285 Keurig K-duo Brewer Display | $0.01 | below range | $13.49 | comparable item: K-Duo™ Brewer 3 Month Care Kit |
| Home | 954759336 Ninja Single Serve Coffee Maker | $0.01 | below range | $22.99 | comparable item: Elite Gourmet Single Serve Coffee Maker |
| Home | 955636486 Cuisinart Coffeemaker Display | $0.01 | below range | $76.49 | comparable item: Cuisinart 14 Cup Programmable Coffeemaker |
| Home | 956943485 Bissell Bi Pf Helix Turbo Nwd | $0.01 | below range | $91.00 | comparable item: Bissell Bi Powerforce Helix Turbo Rewind Nwd |
| Home | 956963972 Emeril Lagasse Power Grill 360 Plus Dummy Display | $0.01 | below range | $29.96 | comparable item: Shaq Power Grill Plus - 4 Serving |
| Home | 957237341 OS BLDNR RED DSPLY | $0.01 | below range | $17.96 | median price of its category |
| Home | 957791312 Instant Brands 10l Air Fry Oven Display | $0.01 | below range | $2.73 | comparable item: MS 0.9 Air Fry Display |
| Home | 958256127 Instant Pot Vortex 10Qt Display | $0.01 | below range | $14.50 | comparable item: Essentials 6Qt 3-in-1 Multi Cooker Display |
| Home | 960085141 Ninja Coffee Brewer Display | $0.01 | below range | $69.30 | comparable item: Refurbished Ninja Coffee Brewer with Auto-iQ, CF02 |
| Home | 960338423 Farberware Royalty Deep Fryer Disp | $0.01 | below range | $1.80 | comparable item: Farberware Royalty Farberware Deep Fryer Display |
| Home | 962833888 Shark Rocket Stick Display | $0.01 | below range | $62.00 | comparable item: Refurbished Shark Rocket Ultra-Light Corded Stick  |
| Home | 966528507 KitchenAid Food Processor Display | $0.01 | below range | $99.99 | comparable item: KitchenAid KFP715 Food Processor |
| Home | 967871257 Dyson - Upright Vacuum | $0.01 | below range | $49.94 | comparable item: Eureka Powerspeed Upright Vacuum |
| Home | 969421423 Irobot Category Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 970155841 George Foreman Gf 100 In Ceramic Grill Display | $0.01 | below range | $39.11 | comparable item: George Foreman 80'' Grill |
| Home | 970790240 Mr Coffee Espresso Dis | $0.01 | below range | $58.98 | comparable item: BonJour Espresso - 2 Pack |
| Home | 971818822 Ninja Foodi Flip Oven Display | $0.01 | below range | $99.99 | comparable item: Ninja® Foodi™ 2-in-1 Flip Toaster, 2-Slice Toaster |
| Home | 973119853 Shark Sh Ionsabre Hand Vac Display | $0.01 | below range | $57.00 | comparable item: Shark VX33 18V Bagless Hand Vac |
| Home | 973821585 iFloor 2 NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 974696034 Aroma Ar 8c Rice Display | $0.01 | below range | $29.80 | median price of the same kind of item |
| Home | 975640322 Mr. Coffee 12-Cup Switch White Coffee Maker | $0.01 | below range | $23.34 | comparable item: Mr. Coffee 12 Cup Switch White Coffee Maker |
| Home | 977639030 Shark Navigator® Lift-Away® XL Upright Vacuum DISPLAY | $0.01 | below range | $88.13 | comparable item: Refurbished Shark Navigator Lift-Away Upright Vacu |
| Home | 980807607 Shark Fuse Lift Away Corded Display | $0.01 | below range | $97.63 | comparable item: Shark Apex UpLight with Lift-Away DuoClean Corded  |
| Home | 981230282 Mr. Coffee Mc Mini Brewer Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 982536975 Power Xl Pxl Microwave Af Oven Dummy | $0.01 | below range | $48.89 | median price of the same kind of item |
| Home | 983709814 Hamilton Beach Hb Flexcook Slow Cooker Display | $0.01 | below range | $30.15 | comparable item: Hamilton Beach 33171 Slow Cooker |
| Home | 985199426 Hamilton Beach D14pl 1.1 Cf/1000w Microwave | $0.01 | below range | $77.86 | comparable item: Hamilton Beach D14pl 1.1cf/1000w Microwave |
| Home | 985494811 B 7SP BLENDER DISPLY | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 986438465 Powerxl Smokeless Grill Display | $0.01 | below range | $64.95 | comparable item: CRUX CRX14726 Smokeless Grill 12" x 16" |
| Home | 987888777 Mc Switch Coffee Display Black | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 990551497 Oster 14sp Blender W Dis | $0.01 | below range | $54.88 | comparable item: Oster Beehive Blender |
| Home | 992734497 Cuisinart Toaster Oven Display | $0.01 | below range | $86.80 | comparable item: Cuisinart Convection Toaster Oven |
| Home | 994735908 GOURMIA HOT/ICE DS | $0.01 | below range | $17.96 | median price of its category |
| Home | 995874252 Puffy 7 Slot Tray Liner, 4.25 Fl. Oz. | $0.01 | below range | $17.96 | median price of its category |
| Home | 997624385 Black & Decker 12-Cup Programmable Coffee Maker | $0.01 | below range | $37.53 | comparable item: Black & Decker 12 Cup Programmable Coffee Maker |
| Home | 999691009 BISSELL POWERFORCE POWERBRUSH PET XL NWD | $0.01 | below range | $0.98 | comparable item: Pet Hair Eraser DualBrush NWD |
| Home | 1026447960 magic bullet Mini Juicer DISPLAY -w/o Cup | $0.01 | below range | $39.99 | comparable item: Magic Bullet Mini Juicer with Cup |
| Home | 1060056464 DSPWD100WMP Display | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 1066875094 1500W 9x15 SMOKELESS GRILL WITH PYRAMID STYLE PLATES & SS DECORATION - | $0.01 | below range | $35.93 | median price of the same kind of item |
| Home | 1084838419 BISSELL Revolution HydroSteam NWD, 3434 | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 1090264287 Display 12" Electric Skillet | $0.01 | below range | $69.98 | comparable item: Presto 7300 Electric Skillet |
| Home | 1111743608 DSPAZ3000WMP Display | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 1151954419 DSPHZ3000WMP Display | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 1163501568 Shark Cordless Stick Vacuum DISPLAY | $0.01 | below range | $51.47 | comparable item: Eureka Cordless 2-in-1 Stick Vacuum, 95A |
| Home | 1199032162 iHome Juno Non-Working Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 1209104477 DSPSE460WMP Display | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 1230663676 Rise By Dash Egg Bite Maker Display | $0.01 | below range | $24.97 | comparable item: Salton Egg Bite Maker - 4 Bite |
| Home | 1268102806 BISSELL PowerForce Rewind Pet NWD, 3333W | $0.01 | below range | $91.00 | comparable item: Bissell Bi Powerforce Helix Turbo Rewind Nwd |
| Home | 1272002069 Beautiful 5.3QT Stand Mixer White Non-Working Display | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 1275448348 BISSELL PowerForce Helix NWD, 3313W | $0.01 | below range | $54.00 | comparable item: Bissell Powerforce Helix-berry |
| Home | 1277813853 Crockpot 8Qt Slow Cooker Rhubarb Display | $0.01 | below range | $22.37 | comparable item: Crockpot 4.5 qt Slow Cooker SCR450-S |
| Home | 1279780695 SS-15P1WMDIS Display | $0.01 | below range | $13.43 | comparable item: Hamilton Beach 1.1 MWO SS DISPLAY |
| Home | 1292598748 BISSELL 3-in-1 & Powerlifter ION NWD 3711W | $0.01 | below range | $85.53 | comparable item: PowerLifter Pet |
| Home | 1383379322 Oster Classic White Blender Display | $0.01 | below range | $39.00 | comparable item: Oster Classic 3-Speed Blender, Smoothie Blender, W |
| Home | 1396523365 Cuisinart 14 Cup Coffee Maker Display, DCC-3200P1WMDIS | $0.01 | below range | $48.00 | comparable item: 12-Cup Coffee Maker |
| Home | 1413341736 Instant Pot RIO Chef 8QT Pressure Cooker - NWD | $0.01 | below range | $79.71 | comparable item: Instant Pot Superior Cooker Chef Series 7.5Qt Slow |
| Home | 1447877686 DPLY DEMO KEU BRWR MINIP EVNG TEAL SHELL | $0.01 | below range | $17.96 | median price of its category |
| Home | 1497448827 Rise By Dash 7" Waffle Maker Displayer | $0.01 | below range | $35.60 | comparable item: Sunbeam 3864 Waffle Maker |
| Home | 1502109190 DSPNC100WMP NINJA DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 1530519110 Display for Aroma 20 Cup Rice Cooker ARC-390NGP-POP | $0.01 | below range | $33.91 | comparable item: Aroma Housewares ARC-730G 20 Cup Rice Cooker |
| Home | 1536230879 Hoover SMARTWASH ESSENTIALS DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 1573377311 HART 20V BIN STICK NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 1585232376 NINJA SIZZ GRILL Display | $0.01 | below range | $35.93 | median price of the same kind of item |
| Home | 1588281586 Hamilton Beach 2 Slice Toaster NWD | $0.01 | below range | $49.99 | comparable item: Hamilton Beach 4 Slice Toaster Oven |
| Home | 1595154687 BISSELL PowerForce Turbo Pet NWD, 3332W | $0.01 | below range | $58.33 | comparable item: Bissell Powerforce Turbo |
| Home | 1627508534 DD MS Reach DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 1638301730 Crockpot 7QT Slow Cooker Grey Display | $0.01 | below range | $22.37 | comparable item: Crockpot 4.5 qt Slow Cooker SCR450-S |
| Home | 1700626825 DD Power Max DISPLAY | $0.01 | below range | $13.00 | comparable item: Dirt Devil Power Max Bagless Upright Vacuum, UD701 |
| Home | 1739629375 DSPWS640WM Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 1757448981 SHARK RV2300 8FT POD DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 1771441537 WALMART HEADER DISPLAY 2023 USA | $0.01 | below range | $17.96 | median price of its category |
| Home | 1827449703 Chefman 4 Slice Panini Press Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 1857958061 DSPNV250WMP Vacuum Display | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 1904399446 ENV150B Nespresso Vertuo Omni Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 1917003389 (Nova S1 Pro/iHRVS1PRO) 8ft POD | $0.01 | below range | $29.99 | median price of its category |
| Home | 1936191576 Display Big Kitchen Kettle | $0.01 | below range | $38.37 | comparable item: Presto Kitchen Kettle Multi-Cooker |
| Home | 1938135893 Rise By Dash Clear View 2-Slice Toaster Displayer | $0.01 | below range | $52.00 | comparable item: Rise by Dash Clear View Window 2-Slice Toaster Blu |
| Home | 1976944010 Mr Coffee 12 Cup Rapid Brew EHX Omni Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 1979872325 eufy LR20 Display for LR20 | $0.01 | below range | $29.99 | median price of its category |
| Home | 1996067928 Instant Vortex 6QT Slim Air Fryer - NWD | $0.01 | below range | $88.58 | comparable item: PowerXL Vortex Pro 6 Qt Air Fryer |
| Home | 2067868586 Shark Carpet Extractor EX200 DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2074708789 Hoover WindTunnel w/ Tanglegaurd DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2089956551 Shark Rotator Pet Upright Vacuum DISPLAY | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 2105708778 DD Multisurface DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2105810666 SHARK ROBOT RV2400WDWM DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2137803752 Ninja Thirsti Shelf Display DSPWC1000WM | $0.01 | below range | $22.48 | median price of its category |
| Home | 2142000501 Instant Pot RIO Chef 6QT Pressure Cooker - NWD | $0.01 | below range | $79.71 | comparable item: Instant Pot Superior Cooker Chef Series 7.5Qt Slow |
| Home | 2166127675 DISPLAY Aroma Professional 20Cup RC ARC1240W | $0.01 | below range | $33.91 | comparable item: Aroma Housewares ARC-730G 20 Cup Rice Cooker |
| Home | 2183861281 Espresso DSP | $0.01 | below range | $58.98 | comparable item: BonJour Espresso - 2 Pack |
| Home | 2190415228 DSPRV2300SWMP DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2199297081 SV1114 WM DISPLAY WMT | $0.01 | below range | $29.99 | median price of its category |
| Home | 2208544211 DPLY SLED KEUR BRWR KICDE GRAY WMT DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 2262419361 Hoover 20v Cleanslate DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2294348698 Shark Upright Vac with Powerfins DISPLAY | $0.01 | below range | $13.18 | comparable item: Mainstays Upright Display |
| Home | 2304947378 Ninja Blend Sense Duo Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 2337019546 Hoover WindTunnel w/ Tangleguard DISPLAY DUUH77110WM | $0.01 | below range | $29.99 | median price of its category |
| Home | 2436874212 Wyze Robot Vacuum Display | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 2445195390 DSPDCT400WMP NINJA OVEN MULTI Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 2445460492 POWER 6QT AIRFRY NWD | $0.01 | below range | $89.99 | comparable item: 5QT 6-IN-1 AIR FRYER |
| Home | 2451558441 XRV2400WD SHARK RV2400WD 8FT POD | $0.01 | below range | $29.99 | median price of its category |
| Home | 2462413329 Bartesian Duet Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 2466788573 Gourmia 4C Multi-Function 5-Bar Espresso Machine DISPLAY | $0.01 | below range | $64.69 | comparable item: Gourmia Espresso 15-Bar, 4-Cup Stainless Steel Aut |
| Home | 2468538421 Display for Aroma 6 Cup Rice Cooker ARC-393NG-POP | $0.01 | below range | $33.91 | comparable item: Aroma Housewares ARC-730G 20 Cup Rice Cooker |
| Home | 2483629378 DD MS Pet DISPLAY | $0.01 | below range | $58.90 | comparable item: DD EXPRESS COMPACT + Pet Powder |
| Home | 2497394268 Shark Rotator Pet Lift-Away ADV DISPLAY, DSPLA700WMP | $0.01 | below range | $71.34 | comparable item: Shark Rotator Lift-Away ADV Upright Vacuum, Pet Fr |
| Home | 2509771719 Shark Robot Display DSPRV2400WSWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 2538454899 BISSELL PowerLifter Turbo Stick Vacuum NWD | $0.01 | below range | $27.49 | comparable item: Bissell 3in1 Stick Vacuum |
| Home | 2631829102 SHARK DSP DSPRV2300WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 2650520454 HB BLENDER RED NWD | $0.01 | below range | $44.99 | comparable item: Hamilton Beach 53206HB 2-Speed Blender |
| Home | 2669354757 Instant Pot 7.5QT Slow Cooker - NWD | $0.01 | below range | $79.71 | comparable item: Instant Pot Superior Cooker Chef Series 7.5Qt Slow |
| Home | 2706562802 Mr. Coffee Speed Brew Stainless Steel Display | $0.01 | below range | $25.00 | median price of the same kind of item |
| Home | 2716756660 ENV90B POP PP WLMT DISPLAY | $0.01 | below range | $16.09 | median price of the same kind of item |
| Home | 2723304214 NINJA OVEN MULTI Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 2761233281 Wyze Cordless Vacuum S Display | $0.01 | below range | $99.98 | comparable item: Wyze S2 Cordless Anti-Tangle Vacuum |
| Home | 2767298310 Little Green HydroSteam NWD | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 2779259893 HOOVER STREAMLINE DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2802592951 DSPHZ700WMP WALMART DISPLAY | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 2847471387 Inspirex Toaster NWD | $0.01 | below range | $34.99 | comparable item: Hamilton Beach 22524E Toaster |
| Home | 2872617118 BlendJet2 Shelf Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 2875494657 GOURM 4QT AIRFRY NWD | $0.01 | below range | $52.90 | comparable item: Gourmia 2.2QT White |
| Home | 2906248354 Shark StainStrike PX200 DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 2977145378 PowerXL Smokeless Grill Elite Plus Non-Working Display | $0.01 | below range | $35.93 | median price of the same kind of item |
| Home | 2979568032 Display Presto Pizza Oven | $0.01 | below range | $16.98 | median price of the same kind of item |
| Home | 2998961333 eufy 25C Robovac Wall Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 3003798298 HB BLENDER BLACK NWD | $0.01 | below range | $50.95 | comparable item: Hamilton Beach 700 W 40 oz Blender, Black |
| Home | 3046610703 COSORI 5.0-Quart Rice Cooker with 9 Cooking Functions, Touch Control,  | $0.01 | below range | $85.32 | comparable item: COSORI 5.0-Quart Rice Cooker with 9 Cooking Functi |
| Home | 3078824710 NINJA 10Q AIRFRY Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 3118274246 eufy G30 Robovac Wall Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 3169663737 NINJA 10Q AIRFRY Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 3388263305 Shark Carpet Extractor EX150 DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 3415147021 SH RV2400WSWD 8FT POD | $0.01 | below range | $29.99 | median price of its category |
| Home | 3574568064 Oster One Touch Blender Display | $0.01 | below range | $65.00 | comparable item: Oster 6 Cup One Touch Blender in Black |
| Home | 3683012134 NINJA 7Q AIRFRY Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 3684733178 eufy L50 Display Wall Display | $0.01 | below range | $81.46 | comparable item: CEP, Wall Display Rack, 1 Each, White |
| Home | 3721794520 Display Kitchen Kettle | $0.01 | below range | $38.37 | comparable item: Presto Kitchen Kettle Multi-Cooker |
| Home | 3737540451 Mr Coffee 14 Cup Stainlees Steel Omni Display | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 3789995088 Pet Hair Eraser Slim Corded NWD | $0.01 | below range | $0.98 | comparable item: Pet Hair Eraser DualBrush NWD |
| Home | 3791655549 Shark Cordless Stick Vacuum AE DISPLAY | $0.01 | below range | $51.47 | comparable item: Eureka Cordless 2-in-1 Stick Vacuum, 95A |
| Home | 3797039266 eufy L50+ Wall Display | $0.01 | below range | $81.46 | comparable item: CEP, Wall Display Rack, 1 Each, White |
| Home | 3825676120 HV Wind Tunnel All Terrain DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 3855622259 HB FOOD PROCESSOR NWD | $0.01 | below range | $99.00 | comparable item: Hamilton Beach 70595 Food Processor |
| Home | 3878197120 Oster Classic Black Blender Display | $0.01 | below range | $33.69 | comparable item: Oster Classic 3-Speed Blender, Smoothie Blender, B |
| Home | 3942656929 Ninja XL Processor DISPLAY | $0.01 | below range | $23.99 | comparable item: Ninja Professional XL Food Processor-Storage Box |
| Home | 3965648399 DD REWIND DISPLAY | $0.01 | below range | $29.99 | median price of its category |
| Home | 3970201516 (Nova S1/iHRVS1-) 8ft POD | $0.01 | below range | $29.99 | median price of its category |
| Home | 3978414164 8FT ROBOT SHARK VACMOP ROBOT RV2300S Dummy | $0.01 | below range | $29.99 | median price of its category |
| Home | 5055219449 Ultima Cosa Soda Maker DSP | $0.01 | below range | $49.99 | comparable item: Ultima Cosa Presto Frizzante Soda Maker- Black |
| Home | 5077879251 CHEFMAN 4-SLICE BELGIAN WAFFLE MAKER DISPLAY | $0.01 | below range | $59.99 | comparable item: Cuisinart 4 Slice Belgian Waffle Maker - Square |
| Home | 5089154478 Black Terra Machine Display | $0.01 | below range | $22.48 | median price of its category |
| Home | 5102884322 Beautiful Perfect Grind Programmable Single Serve Coffee Maker, White  | $0.01 | below range | $79.00 | comparable item: Beautiful by Drew Barrymore Perfect Grind Programm |
| Home | 5106891258 HAMILTON BEACH LONG SLOT TOASTER DISPLAY | $0.01 | below range | $60.00 | comparable item: Hamilton Beach Long Slot Keep Warm Toaster, Model  |
| Home | 5106941727 Hamilton Beach Defrost Slow Cooker Display | $0.01 | below range | $30.15 | comparable item: Hamilton Beach 33171 Slow Cooker |
| Home | 5113183793 HB 12C COFFEE DISPLAY | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 5113233429 Ninja Grand Kitchen System 1200 DISPLAY, DSPKS500WMP | $0.01 | below range | $17.96 | median price of its category |
| Home | 5113283028 Beautiful 5.3qt Stand Mixer, Lavender by Drew Barrymore, NON-WORKING D | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 5126097429 DSPIZ240WMP Cordless Vacuum Display | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 5126097591 HV CLEANSLATE XL NWD DUFH15010VWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 5129878895 Hamilton Beach Artisan Dough & Bread Maker Display, 29985DISW | $0.01 | below range | $6.80 | median price of the same kind of item |
| Home | 5129928169 Beautiful Rotating Waffle Maker, White Icing by Drew Barrymore, NON-WO | $0.01 | below range | $37.46 | comparable item: Beautiful Rotating Belgian Waffle Maker, White Ici |
| Home | 5129928207 Ember 2023 Mug Display | $0.01 | below range | $14.98 | median price of the same kind of item |
| Home | 5129928402 DD Carpet Washer Display DUFD50310WM | $0.01 | below range | $20.67 | median price of its category |
| Home | 5129928454 eufy G50 Wedge Display | $0.01 | below range | $19.95 | comparable item: Wedge Pack |
| Home | 5129928597 DSPIZ560HWMP Vacuum Display | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 5130059950 BARTESIAN COCKTAIL MACHINE DISPLAY | $0.01 | below range | $17.96 | median price of its category |
| Home | 5137123968 HAMILTON BEACH SMOOTHIE BLENDER, WHITE, DISPLAY (50181FDISW) | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 5137123969 Hamilton Beach Single Serve Blender Display (51190FDISW) | $0.01 | below range | $14.88 | comparable item: Hamilton Beach Single-Serve Blender |
| Home | 5137969781 Hamilton Beach Smoothie Smart Blender, 48 Oz. Glass Jar, Display, (562 | $0.01 | below range | $49.88 | comparable item: Hamilton Beach Smoothie Smart Blender, 48 Oz. Glas |
| Home | 5138506547 HB 5C COFFEE DISPLAY | $0.01 | below range | $13.43 | comparable item: HB 1.1 MWO WSS DISPLAY |
| Home | 5144555098 Chi Lava Iron with Retractable Cord Display | $0.01 | below range | $69.98 | comparable item: CHI Iron with Retractable Cord | Model# 13106 |
| Home | 5144555099 CHI 360 Precision Steam Iron with Retractable Cord Display | $0.01 | below range | $69.98 | comparable item: CHI Iron with Retractable Cord | Model# 13106 |
| Home | 5150283323 Hamilton Beach FlexBrew Advanced 5-in-1 Coffee Maker Display WESTROCK  | $0.01 | below range | $93.26 | comparable item: Hamilton Beach FlexBrew Trio Coffee Maker, 56 fl o |
| Home | 5152138474 BLACK+DECKER 4-Slice Toaster with Extra-Wide Slots, Black/Silver, Non- | $0.01 | below range | $27.48 | comparable item: BLACK+DECKER 2-Slice Extra Wide Slot Toaster, Blac |
| Home | 5152138475 BLACK+DECKER 2-Slice Toaster with Extra Wide Slots, Black/Silver, Non- | $0.01 | below range | $27.48 | comparable item: BLACK+DECKER 2-Slice Extra Wide Slot Toaster, Blac |
| Home | 5152138629 BLACK+DECKER Rapid Toast 2-Slice Toaster, Black Stainless Steel, Non-W | $0.01 | below range | $58.44 | comparable item: BLACK+DECKER TR3500SD Rapid Toast 2-Slice Toaster, |
| Home | 5152188071 Black + Decker Pearl Glide Steam Iron with Pearl-Infused Ceramic Solep | $0.01 | below range | $40.92 | comparable item: BLACK+DECKER Pearl Glide Steam Iron for Clothes, 1 |
| Home | 5152188073 i3 Travel Steam Iron - Non Working Display | $0.01 | below range | $15.58 | comparable item: Steamfast SF-707 Mighty Steam Iron for Travel and  |
| Home | 5152509117 Hamilton Beach Air Fry Toaster Oven Display | $0.01 | below range | $84.22 | comparable item: GreenLife Air Fry Toaster Oven | Turquoise |
| Home | 5164703312 Display Presto 16 " Ceramic Skillet | $0.01 | below range | $59.99 | comparable item: 12" Folding Ceramic Skillet |
| Home | 5164703666 DSPHV200WMP Corded Vac Display | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 5164703680 IONVAC LIDAR 4FT POD NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 5164703915 DD Cordless Stick NWD DUBD57010V | $0.01 | below range | $29.99 | median price of its category |
| Home | 5164753121 CUISIN AirFryer TOA 70 NWD | $0.01 | below range | $17.96 | median price of its category |
| Home | 5166665530 DSPMC1100WMP display | $0.01 | below range | $0.98 | comparable item: Display Crispi four qt, DSPFN100WMP |
| Home | 5166665877 DSPRV2300AEWMP Robot Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 5166715091 DSPBU3120WMP Cordless Stick Vacuum Display | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 5166715094 (Nova S1 Pro/iHRVS1PRO) 4ft POD | $0.01 | below range | $29.99 | median price of its category |
| Home | 5166715113 HV ONEPWR Emerge NWD DUBH53610VWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 5166715322 CUISIN 2STOST SS NWD | $0.01 | below range | $17.96 | median price of its category |
| Home | 5169277018 MS 0.7 CF White DISpla | $0.01 | below range | $20.60 | comparable item: MS 1.1 CF DISPLAY |
| Home | 5171696131 Beautiful Countertop Microwave Oven, 1 cu ft, White, Model BFCMS811WES | $0.01 | below range | $79.00 | comparable item: Danby 1.1 Cu. Ft. 1000W Countertop Microwave Oven  |
| Home | 5175790168 DPLY SHELL KEUR BRWR KEXPE PACIFIC BLUE DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 5193278355 Beautiful Espresso Machine, White Icing, WR NON-WORKING DISPLAY | $0.01 | below range | $48.47 | median price of the same kind of item |
| Home | 5195244199 Chefman RJ11 Pop Display | $0.01 | below range | $12.50 | median price of the same kind of item |
| Home | 5195244334 Beautiful Perfect-Grind Single Serve Coffee Maker, White Icing, WR NON | $0.01 | below range | $79.00 | comparable item: Beautiful by Drew Barrymore Perfect Grind Programm |
| Home | 5195359842 DISPLPAY UNIT FOR - 1.5 cu. ft. Countertop Microwave with Smart Invert | $0.01 | below range | $48.89 | median price of the same kind of item |
| Home | 5200191335 DPLY SLED KEU BRWR KEXPE PACIFIC BLU WMT DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 5201411231 HB 0.9 CF SS DISPLAY | $0.01 | below range | $7.79 | comparable item: HB 0.9 CF SS MWO DIS |
| Home | 5201867973 GA 0.9 AIRFRY DISPLAY | $0.01 | below range | $17.96 | median price of its category |
| Home | 5202255728 GA 0.7 RETRO BLU DIS | $0.01 | below range | $17.96 | median price of its category |
| Home | 5202515284 Hamilton Beach Countertop Microwave Oven, 1 cu ft, 700 W, Gray | $0.01 | below range | $79.84 | comparable item: Hamilton Beach 1.1 cu ft Countertop Microwave Oven |
| Home | 5207222838 Display Nespresso VertuoPOP Dark Gray Coffee and Espresso | $0.01 | below range | $84.97 | comparable item: Nespresso VertuoPOP Dark Gray Coffee and Espresso  |
| Home | 5212441985 Chefman RJ38-SQSS-5T2P POP Display | $0.01 | below range | $12.50 | median price of the same kind of item |
| Home | 5212491671 MR. COFFEE 12 CUP SPEEDBREW OMNI DISPLAY | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 5212491672 MR. COFFEE 12CUP PROG WOOD DISPLAY | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 5212491673 MR. COFFEE SWITCH WOOD DISPLAY | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 5212491674 MR. COFFEE 5 CUP WOOD DISPLAY | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 5212541531 Beautiful 14-Cup Programmable Drip Coffee Maker, White Icing, WR NON-W | $0.01 | below range | $69.00 | comparable item: Beautiful by Drew Barrymore 14-Cup Programmable Dr |
| Home | 5212541797 Mr Coffee Brand Signage | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 5212541983 George Foreman 2 Serving Contact Grill Display GR012F-1AGWDIS | $0.01 | below range | $32.98 | comparable item: George Foreman 2-Serving Classic Plate Grill , Bla |
| Home | 5212541991 Chefman ExacTemp 12 Quart Air Fryer w/ Thermometer POP Display | $0.01 | below range | $94.74 | comparable item: Chefman Turbofry Touch Family Size Air Fryer, 8 Qu |
| Home | 5212591274 Gourmia 4C Espresso WestRock Display | $0.01 | below range | $22.68 | median price of the same kind of item |
| Home | 5212591405 XCLBOXCGWM Corrugated Box Comparison DSP | $0.01 | below range | $29.99 | median price of its category |
| Home | 5212591507 nutribullet Pro Display - Matte Black | $0.01 | below range | $95.09 | comparable item: nutribullet Pro 32 oz. 900 Watt Personal Blender,  |
| Home | 5212591647 MR. COFFEE FRAPPE WOOD DISPLAY | $0.01 | below range | $15.74 | median price of the same kind of item |
| Home | 5218232175 DPLY DEMO KEUR BRWR KICDE GRAY SHELL | $0.01 | below range | $29.99 | median price of its category |
| Home | 5219476297 DPLY DEMO KEUR BRWR KEXPE BLK SHELL | $0.01 | below range | $29.99 | median price of its category |
| Home | 5222350385 DPLY SHELL KEUR BRWR KDUOE GEN2 DISPLAY | $0.01 | below range | $0.98 | comparable item: DPLY SLED KEUR BRWR K- CAFÉ DISPLAY |
| Home | 5226729105 DPLY DEMO KEUR BRWR KSLM BLK SHELL | $0.01 | below range | $29.99 | median price of its category |
| Home | 5226743375 Mainstays Single Serve Coffee Maker - NON-WORKING DISPLAY | $0.01 | below range | $22.99 | comparable item: Elite Gourmet Single Serve Coffee Maker |
| Home | 5229769719 Display Presto Ceramic Griddle/Warmer | $0.01 | below range | $45.87 | comparable item: Presto Ceramic Nonstick Electric Griddle/Warmer Pl |
| Home | 5229819274 Chefman Barista Pro Espresso Machine - Black POP Display | $0.01 | below range | $48.47 | median price of the same kind of item |
| Home | 5230946313 DPLY DEMO KEUR BRWR KELIT BRSH SLTE SHELL | $0.01 | below range | $29.99 | median price of its category |
| Home | 5232316310 Chefman Barista Pro Espresso Machine - Black POP Westrock Display | $0.01 | below range | $48.47 | median price of the same kind of item |
| Home | 5258440303 Cuisinart 12 Cup Coffee Maker Display, DCC-1220BKSDIS | $0.01 | below range | $48.00 | comparable item: 12-Cup Coffee Maker |
| Home | 5258440304 Cuisinart 14 Cup Coffee Maker Display, DCC-3200WMDIS | $0.01 | below range | $48.00 | comparable item: 12-Cup Coffee Maker |
| Home | 5258490260 CUISIN Air Fryer TOV-70 NWD | $0.01 | below range | $10.10 | comparable item: Mainstays Air Fryer Nwd |
| Home | 5258490290 CUISIN 2STOST SS NWD | $0.01 | below range | $17.96 | median price of its category |
| Home | 5262667294 ENV120BG OMNI Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 5262667435 AIR FRYER DUAL DSP, DSPSL400WMP | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 5262667436 AIR FRYER DSP, DSPAF180WMP | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 5262667755 Ultima Cosa Semi Automatic Espresso Machine Display with Wooden Base | $0.01 | below range | $48.47 | median price of the same kind of item |
| Home | 5262667780 COFFEE MAKER DSP, XCE250 | $0.01 | below range | $40.00 | comparable item: Hello Kitty Coffee Maker |
| Home | 5265004999 COFFEE MAKER DSP, XCFP300WM | $0.01 | below range | $37.39 | median price of the same kind of item |
| Home | 5265054000 COFFEE MAKER DSP, XCM300WM | $0.01 | below range | $37.39 | median price of the same kind of item |
| Home | 5265054199 Nespresso Pop Blk WR Wood Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 5265054200 Nespresso Next by Delonghi Wood Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 5265533635 CUISIN 4STOST SS NWD | $0.01 | below range | $17.96 | median price of its category |
| Home | 5275804758 DPLY DEMO KEUR BRWR KCFES BLK SHELL | $0.01 | below range | $29.99 | median price of its category |
| Home | 5275954304 INP 7.5QT PRESSURE NWD | $0.01 | below range | $81.05 | comparable item: Instant Pot 6QT Easy 3-in-1 Slow Cooker, Pressure  |
| Home | 5280863450 DPLY DEMO KEUR BRWR KEXPE RED SHELL | $0.01 | below range | $29.99 | median price of its category |
| Home | 5285700144 DSPWD260WMP SHARK HYDROVAC DISPLAY | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 5314190686 Ninja Thirsti Drink System Display POD Rack DSPWCFPWM6 | $0.01 | below range | $10.34 | median price of the same kind of item |
| Home | 5329710759 Display Smart Robot Vacuum with LIDAR | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 5340416056 Display Nespresso VertuoPlus | $0.01 | below range | $17.96 | median price of its category |
| Home | 5347546854 Ninja® Slushi Professional Frozen Drink Maker Display, DSPFS300WMP | $0.01 | below range | $29.92 | comparable item: Ninja Frozen Treat and Drink Maker |
| Home | 5347596849 Cuisinart Elemental 8 Cup Food Processor Display, FP-8SVWMDIS | $0.01 | below range | $99.95 | comparable item: Cuisinart Elemental 8-Cup Food Processor, White (F |
| Home | 5373792356 Beautiful PowerExact 2.0 Blender, White Icing by Drew Barrymore NON-WO | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 5378440035 Beautiful 3.5 QT Stand Mixer, White Icing by Drew Barrymore NON-WORKIN | $0.01 | below range | $69.94 | median price of the same kind of item |
| Home | 5525927838 Beast Blender | Ultimate Blending Bundle (Cloud White) DSP | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 5532480271 nutribullet Ultra NB10500 Display | $0.01 | below range | $93.32 | comparable item: Nutribullet NB-50200 Select 2.0 |
| Home | 5534421021 MC Steam Espresso DISPLAY | $0.01 | below range | $22.68 | median price of the same kind of item |
| Home | 5534528391 Ninja Handheld Blender BC200 DSP | $0.01 | below range | $69.00 | comparable item: Ninja Warrior Handheld Blender |
| Home | 5548787422 MC Steam Espresso WOOD DISPLAY | $0.01 | below range | $22.68 | median price of the same kind of item |
| Home | 5555993878 Chefman Espresso Machine with Grinder Wood Display | $0.01 | below range | $48.47 | median price of the same kind of item |
| Home | 5671224294 MS Certified Glass Blender with Versatile Speeds and Accessories | $0.01 | below range | $11.16 | comparable item: MS GLASS BLENDER DIS |
| Home | 5673571363 Beast Mini® Blender Plus (Sand) DSP | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 5685809422 Beast Blender | Ultimate Blending Bundle (Carbon Black) DSP | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 5689657075 Beast Mini® Blender Plus (Mist) DSP | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 5737469293 Chefman Espresso Machine with Grinder Display | $0.01 | below range | $48.47 | median price of the same kind of item |
| Home | 5878999065 EMERGE ALL TERRAIN PET DISPLAY WMT | $0.01 | below range | $29.99 | median price of its category |
| Home | 5954390113 Shark POWERDETECT Upright Vacuum Cleaner Display, DSPAZ4002WMP | $0.01 | below range | $35.23 | median price of the same kind of item |
| Home | 6005476296 Nutribullet 2FT Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 6245902413 ONEPWR EVOLVE PET ELITE BUNDLE DISPLAY WMT | $0.01 | below range | $29.99 | median price of its category |
| Home | 6315410877 Shark Steam Sweep Mop Display, DSPSD200WMP | $0.01 | below range | $99.99 | comparable item: STEAM MOP 4.0 |
| Home | 6331965951 DISPLPAY UNIT FOR - LG NeoChef™ 1.5 cu. ft. Countertop Microwave with  | $0.01 | below range | $89.99 | comparable item: LG LMC0975ST - 0.9 Cu Ft NeoChef Counter Top Micro |
| Home | 6379954286 Shark Primus Cordless Display, DSPIP1250WMP | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 6471711713 Portable Carpet Cleaner Machine Shark StainStriker HairPro Pet Portabl | $0.01 | below range | $19.06 | median price of the same kind of item |
| Home | 6495613007 Shark Floor Cleaning Machine CarpetXpert HairPro Pet with StainStriker | $0.01 | below range | $14.41 | median price of the same kind of item |
| Home | 6532566297 NWD - Non- George Foreman 4-Serving Removable Plate Grill and Panini,  | $0.01 | below range | $45.82 | comparable item: George Foreman 4-Serving Removable Plate Grill and |
| Home | 6536051238 NWD - Non- George Foreman Beyond Grill 7in1 Electric Indoor Grill and  | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 6551306208 NWD - Non- George Foreman 2 Serving Contact Grill | $0.01 | below range | $44.97 | comparable item: George Foreman 2-In-1 5 Serving Grill |
| Home | 6612614115 NWD - Non- George Foreman Contact Smokeless - Ready Grill, Family Size | $0.01 | below range | $34.78 | median price of the same kind of item |
| Home | 8170053016 GOUR 4.5Q SLWCK NWD | $0.01 | below range | $17.96 | median price of its category |
| Home | 9793372419 TREND POD BACKER | $0.01 | below range | $12.97 | comparable item: TREND POD DISPLAY MASTER DUBH53615VWM |
| Home | 9835918588 Trend Pod Acrylic Stand | $0.01 | below range | $12.97 | comparable item: TREND POD DISPLAY MASTER DUBH53615VWM |
| Home | 12998854355 Ninja Pod Rack Graphic Display Refresh, INSWCFDIS8WM | $0.01 | below range | $17.96 | median price of its category |
| Home | 13035519710 Chef iQ Smart Toaster Oven Air Fryer Display NG | $0.01 | below range | $84.06 | comparable item: Chefman 18L Toaster Oven Air Fryer, New |
| Home | 13052761043 Chef iQ Smart Thermometer 1-Probe Display | $0.01 | below range | $99.67 | comparable item: Chef iQ Smart Thermometer |
| Home | 13067062469 Chef iQ 6 Quart Smart Multicooker Display NG | $0.01 | below range | $17.96 | median price of its category |
| Home | 13106605163 SpinWave SmartSteam NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 13289508019 Black + Decker Food Processor Display | $0.01 | below range | $46.97 | comparable item: Black & Decker Bd 8 Cup Food Processor |
| Home | 13324413786 BJ3 Non-Working Standard Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 13338066927 DPLY SLED KEUR BRWR KEXPE V2 RED WMT | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 13368363377 DPLY SLED KEUR BRWR KEXPE V2 TEAL WMT | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 13377701873 PowerClean FurFinder NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 13388862126 DPLY SLED KEUR BRWR KEXPE V2 BLK WMT | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 13393169935 BISSELL Revolution HydroSteam Upright Deep Cleaner NWD 4126 | $0.01 | below range | $89.01 | comparable item: BISSELL Powersteamer Powerbrush Upright Deep Clean |
| Home | 13393219536 BISSELL CrossWave Edge NWD 4158 | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 13396417284 BISSELL CrossWave OmniEdge NWD 4170 | $0.01 | below range | $1.00 | comparable item: BISSELL CrossWave HydroSteam NWD 3632 |
| Home | 13407954849 BISSELL PowerForce PowerBrush NWD 3956 | $0.01 | below range | $91.00 | comparable item: Bissell Bi Powerforce Helix Turbo Rewind Nwd |
| Home | 13411753859 PowerClean NWD | $0.01 | below range | $1.00 | comparable item: BISSELL CROSSWAVE HF3 NWD |
| Home | 13423210023 BISSELL Little Green Mini Portable Deep Cleaner NWD 4101 | $0.01 | below range | $75.00 | comparable item: Bissell Little Green Select Portable Carpet Cleane |
| Home | 13483066236 GAIA BLACK DISPLAY | $0.01 | below range | $22.48 | median price of its category |
| Home | 13622569141 Nespresso Vertuo POP White Coffee and Espresso Maker | $0.01 | below range | $84.97 | comparable item: Nespresso Vertuo Pop Coffee and Espresso Maker by  |
| Home | 13658407425 eufy IndoorCam C220 Display | $0.01 | below range | $29.99 | median price of its category |
| Home | 13743871453 DISPLAY DUUD76211VWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 13777205136 Ninja Creami Swirl Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 13842116692 DISPLAY DUUH77410VWM | $0.01 | below range | $12.97 | comparable item: TREND POD DISPLAY MASTER DUBH53615VWM |
| Home | 14173473433 Ninja Creami Swirl Display | $0.01 | below range | $0.98 | comparable item: Ninja Creami Display - XNC300BL |
| Home | 14267867363 Ninja Drip/Coffeemaker Display | $0.01 | below range | $30.00 | comparable item: Proctor-Silex 48571 Automatic Drip Coffeemaker |
| Home | 14269255245 PowerXL StirMax Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 14284357312 Ninja Drip/Coffeemaker Display | $0.01 | below range | $30.00 | comparable item: Proctor-Silex 48571 Automatic Drip Coffeemaker |
| Home | 14522524949 Ninja Espresso Display | $0.01 | below range | $64.00 | comparable item: Guidecraft Expressions Book Display in Espresso |
| Home | 14526509827 Ninja Single Serve Brewer Display | $0.01 | below range | $44.99 | comparable item: TRU Single Serve Brewer |
| Home | 14584273355 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14603474727 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14609117856 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14609167619 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14613958917 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14614008894 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14617104925 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14620013239 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14620811860 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14621614137 new display | $0.01 | below range | $29.99 | median price of its category |
| Home | 14692812182 DPLY SLED KEUR BRWR MINIB DUSTY ROSE | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 14717122146 Caffeinator Dual Brew Coffee Maker Display | $0.01 | below range | $37.39 | median price of the same kind of item |
| Home | 14737472657 Chef iQ Smart Thermometer 1 V3 Probe Display | $0.01 | below range | $99.67 | comparable item: Chef iQ Smart Thermometer |
| Home | 14754808945 Caffeinator Dual Brew Coffee Machine | $0.01 | below range | $18.78 | median price of the same kind of item |
| Home | 14760367586 bella 4 QT Slim Air Fryer, Oatmilk, NON-WORKING DISPLAY | $0.01 | below range | $50.51 | comparable item: BELLA 4.6 QT AIR FRYER, BLACK |
| Home | 14768903848 Beautiful 10 in 1 Multi-Cooker, White Icing, NON-WORKING DISPLAY | $0.01 | below range | $11.52 | median price of the same kind of item |
| Home | 14771261728 PowerXL AirMax AirFryer 6.3qt Display | $0.01 | below range | $0.98 | comparable item: PowerXL AirMax AirFryer 8qt Display |
| Home | 14787568015 Chef iQ Mini Oven Display | $0.01 | below range | $69.99 | comparable item: GreenLife Mini Oven, Black |
| Home | 14803255002 Chefman 6 Qt. Stainless Steel Air Fryer Display | $0.01 | below range | $68.57 | median price of the same kind of item |
| Home | 14812315402 Crispinator 8 Qt. Air Fryer Display | $0.01 | below range | $84.49 | comparable item: Chefman Crispinator Air Fryer 1700W, 8 Qt, Concret |
| Home | 15095152018 GOURMIA 7Q PAN AIRFRY NWD | $0.01 | below range | $17.96 | median price of its category |
| Home | 15107716433 Smart Touch 4-Slice Digital Toaster Display | $0.01 | below range | $31.99 | comparable item: Chefman Smart Touch 2 Slice Digital Toaster with 6 |
| Home | 15113322969 DUBH59010VWM DISPLAY | $0.01 | below range | $12.97 | comparable item: TREND POD DISPLAY MASTER DUBH53615VWM |
| Home | 15143911170 GO Slim 150 NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 15145118782 GO Pet 303 NWD | $0.01 | below range | $29.99 | median price of its category |
| Home | 15152559919 Smart Touch 2-Slice Digital Toaster Display | $0.01 | below range | $31.99 | comparable item: Chefman Smart Touch 2 Slice Digital Toaster with 6 |
| Home | 15163562399 DPLY SLED KEUR BRWR KEEPL GRAY WMT | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 15451862031 Magic Bullet 4ft Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 15460306250 Nutribullet 4ft Display | $0.01 | below range | $17.96 | median price of its category |
| Home | 15616507536 Ninja Thirsti 3.0 NWD | $0.01 | below range | $29.98 | comparable item: Ninja Thirsti CO2 60ML Bottle |
| Home | 15779019720 Display MC Pro Sage- DSPMC2000WMP | $0.01 | below range | $11.96 | median price of the same kind of item |
| Home | 15827010325 Display French Door Oven- DSPFO100WMP | $0.01 | below range | $17.96 | median price of its category |
| Home | 15921556088 Ninja Traditional Blender Display- INSMTR8WMP1 | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 15923414312 Ninja Traditional Blender Display- INSMTR12WMP1 | $0.01 | below range | $32.90 | median price of the same kind of item |
| Home | 15931565314 Blender Display | $0.01 | below range | $7.79 | comparable item: Blender Display |
| Home | 16201015739 DUUH77310VWM Windtunnel Upright Display Wmt | $0.01 | below range | $29.99 | median price of its category |
| Home | 16308473709 Shark Navigator Robot-DSPRV2100WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 16336920403 Shark DetectPro with DuoClean Detect and Lift-Away- DSPLA800WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 16340767294 Shark Navigator Robot-DSPRV2100AEWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 16341267341 Shark® PowerDetect™ Corded Stick Vacuum Ultra-Light Display - DSPHZ400 | $0.01 | below range | $99.00 | comparable item: Shark Ultra-Light Corded Stick Vacuum |
| Home | 16353618234 Shark® PowerPro™ Flex Reveal Cordless Vacuum NWD - DSPIZ380HWMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 16360602638 Shark Navigator Robot Display - INSRV2100WM | $0.01 | below range | $29.99 | median price of its category |
| Home | 16365114929 Shark® Cordless PowerDetect™ Clean & Empty System NWD - DSPIP3150WMP | $0.01 | below range | $29.99 | median price of its category |
| Home | 16366456734 FreeStyle Max Cordless Stick Vacuum NWD - DSPSV2000WMP | $0.01 | below range | $77.11 | comparable item: Shark Navigator Freestyle Cordless Stick Vacuum, S |
| Home | 16367510085 StainStriker HX100 Display - DSPHX100WMP | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 16369355719 Shark Detect Lift Away ADV Corded Upright Vacuum with PowerFins Detect | $0.01 | below range | $71.34 | comparable item: Shark Navigator Lift-Away ADV Upright Vacuum Clean |
| Home | 16431016438 PowerLifter Allergen Lift-Off NWD | $0.01 | below range | $53.71 | comparable item: BISSELL 29H3W Lift-Off Floors Bagless Vacuum |
| Home | 16431166954 HV Smartwash XL DIsplay DUFH62010VWM | $0.01 | below range | $29.99 | median price of its category |
| Home | 16526068607 SurfaceSense NWD | $0.01 | below range | $1.00 | comparable item: BISSELL CROSSWAVE HF3 NWD |
| Home | 16654209063 BISSELL SpinWave SmartSteam Scrubbing and Sanitizing Mop NWD 4359 | $0.01 | below range | $19.41 | median price of the same kind of item |
| Home | 17219166491 DSPBN300MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17245971035 DSPBC200MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17260100758 DSPBN400MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17275711936 DSPTB400MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17279613854 DSPJC150MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17284665143 DSPBN75MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17297260603 DSPBC100MTRWM | $0.01 | below range | $17.96 | median price of its category |
| Home | 17699066863 Dolphin (2026 Model) E10 Robotic Pool Vacuum Cleaner All Pools up to 3 | $0.01 | below range | $29.99 | median price of its category |
| Home | 17722219032 Dolphin (2026 Model) Explorer E20 Robotic Pool Vacuum Cleaner Pools up | $0.01 | below range | $29.99 | median price of its category |
| Home | 17763654336 Dolphin (2026 Model) Explorer E25 Wi-Fi Robotic Pool Vacuum Cleaner Po | $0.01 | below range | $29.99 | median price of its category |
| Home | 17777364607 Niya (2026 Model) Sonar Ray Robotic Pool Vacuum Cleaner Pools up to 26 | $0.01 | below range | $29.99 | median price of its category |
| Home | 18830070057 DPLY SLED KEUR BRWR KEXPE V2 STONE DISPLAY | $0.01 | below range | $29.63 | median price of the same kind of item |
| Home | 18956611851 Crockpot 7QT Slow Cooker Programmable Gray DISPLAY | $0.01 | below range | $22.37 | comparable item: Crockpot 4.5 qt Slow Cooker SCR450-S |
| Home | 19000857004 ECP3630 DISPLAY | $0.01 | below range | $17.96 | median price of its category |
| Home | 19180408122 Display Analog Flip Oven - DSPSP050WMP | $0.01 | below range | $17.96 | median price of its category |
| Home | 19195868995 Display Pressure Cooker Sage - DSPPC200WMP | $0.01 | below range | $11.96 | median price of the same kind of item |
| Home | 19196053271 Display Crispi Pro Station - DSPAS100WHWM | $0.01 | below range | $0.98 | comparable item: Ninja Crispi Pro Display - XFN100WMPK |
| Home | 19202452862 Display Digital Flip Oven - DSPSP140 | $0.01 | below range | $17.96 | median price of its category |
| Home | 19955119522 Shark Corded Stick Vacuum Display, DSPTV300WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 19962874942 Ninja Mini Luxe Café | $0.01 | below range | $29.99 | median price of its category |
| Home | 19972350733 Shark Cordless Stick Vacuum Display, DSPBU3620WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 19979417315 Shark Cordless Stick Vacuum Display, DSPIA3140WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 19983302589 Shark Corded Stick Vacuum Display, DSPZS500WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 19983765249 Shark Cordless Stick Display, DSPIP1251WMP | $0.01 | below range | $0.98 | comparable item: Shark Upright Vacuum Display, DSPZU50WMP |
| Home | 19985764550 Shark Cordless Stick Vacuum Display, DSPIZ370HWMP | $0.01 | below range | $77.11 | comparable item: Shark Navigator Freestyle Cordless Stick Vacuum, S |
| Home | 19987411603 Shark Upright Vacuum Display, DSPLA802WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 19991805167 Shark Upright Vacuum Display, DSPLX5002WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 19993218850 Shark Cordless Stick Vacuum Display, DSPBU1620WMP | $0.01 | below range | $39.99 | median price of the same kind of item |
| Home | 20002467900 Shark Robot Display, DSPRVB100Z1WM | $0.01 | below range | $29.99 | median price of its category |
| Home | 20031568320 NINJA 4FT BRAND DSP NWD - INSMTR4WMP1 | $0.01 | below range | $0.98 | comparable item: AIR FRYER DSP, DSPAF140WMP |
| Home Improvement | 27677259 Scott Hand Sanitizer Foam 40.6 fl oz (1200 mL) - Bacteria Remover - Ha | $98.87 | far above the same kind of item | $36.00 | comparable item: Dial Hand Sanitizer Foam Refill 40.6 fl oz (1200 m |
| Home Improvement | 100539248 uOffice Advanced Gel Hand Antiseptic Agent Moisturizing Aloe Vera (24  | $94.44 | far above the same kind of item | $6.43 | comparable item: uOffice Advanced Gel Hand Antiseptic Agent Moistur |
| Home Improvement | 657178324 Soft Care Instant Foam Hand Sanitizer 532 mL Pump Bottle, Clear,Alcoho | $93.58 | far above the same kind of item | $40.10 | comparable item: Enriched Foam Alcohol-Free E3 Hand Sanitizer Refil |
| Home Improvement | 146173448 Hand Sanitizer, 8 Fluid Ounce | $88.99 | far above the same kind of item | $0.88 | comparable item: Equate 8 fl. oz. Hand Sanitizer |
| Home Improvement | 46059217 Kutol Foam Instant Hand Sanitizer, 950 ml Pump, Clear, Pack of 8 | $84.08 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Home Improvement | 305002116 Back to Business Hand Sanitizer package approved by FDA and WHO | $83.08 | far above the same kind of item | $32.00 | comparable item: WHO and FDA approved Bluegrass Distillers Hand San |
| Home Improvement | 952522557 Water Labs Hand Sanitizer 8 oz | $83.08 | far above the same kind of item | $3.71 | comparable item: Suave Hand Sanitizer 8 oz |
| Home Improvement | 459044513 CanDo Hand Sanitizer, 16 oz., Case of 8 | $82.50 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Home Improvement | 534573452 Full Spectrum Hemp Hand Sanitizer Spray | 6 oz. | Fresh Citrus |5-Pack | $79.99 | far above the same kind of item | $39.99 | comparable item: Full Spectrum Hemp Hand Sanitizer Spray | 6 oz. |  |
| Home Improvement | 46059253 Kutol Products 1298172 Alcohol-Free Foaming Hand Sanitizer, 950 ml Pum | $70.28 | far above the same kind of item | $47.41 | comparable item: Kutol Products 1298173 Alcohol-Free Foaming Hand S |
| Home Improvement | 46059496 Kutol Gel Instant Hand Sanitizer, 950 ml Pump, Clear, Pack of 8 | $70.26 | far above the same kind of item | $7.99 | comparable item: MedZone Hand Sanitizer Gel with Pump |
| Home Improvement | 241514938 NuuxSan Instant Antibacterial Hand Sanitizer Gel, 8 fl oz Flip Top Bot | $69.23 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Home Improvement | 434517046 Water Labs Hand Sanitizer 6 oz | $69.23 | far above the same kind of item | $3.71 | comparable item: Suave Hand Sanitizer 8 oz |
| Home Improvement | 46059487 Kutol Products 1329968 Instant Gel Hand Sanitizer, 64 oz Pump, Clear - | $68.99 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Home Improvement | 989910546 Dial, DIA16694, FIT Touch-Free Hand Sanitizer Foam, 3 / Carton, Clear, | $66.99 | far above the same kind of item | $3.59 | comparable item: Dial, DIA01203, Fliptop Hand Sanitizer, 24 / Carto |
| Home Improvement | 277387309 Plant Therapy Essential Oils Unscented Hand Sanitizer 8 oz 8-Pack | $64.95 | far above the same kind of item | $9.92 | comparable item: Plant Therapy Essential Oils Unscented Hand Saniti |
| Home Improvement | 566800817 Plant Therapy Essential Oils Germ Fighter Hand Sanitizer 8 oz 8-Pack | $64.95 | far above the same kind of item | $34.95 | comparable item: Plant Therapy Essential Oils Germ Fighter Hand San |
| Home Improvement | 118269591 Hand Sanitizer with Aloe Vera (1 Gallon) ��� 70% Alcohol Based Liquid  | $61.11 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Home Improvement | 290541164 SC Johnson, SJN55851CT, InstantFOAM Non-Alcohol Hand Sanitizer, 12 / C | $60.36 | far above the same kind of item | $8.20 | median per-unit price of comparable items |
| Home Improvement | 590318401 Celebrations Fix Single Bucket 1ct W/bucket | $0.01 | below range | $15.43 | median price of its category |
| Household Essentials | 25915783 Flowtron Portable Indoor Fly Trap, Outdoor, 500 Sq Ft, Dual Lure, Mosq | $149.99 | far above the same kind of item | $3.89 | median per-unit price of comparable items |
| Household Essentials | 15207441 Solo Cup Company 6RBU Bare Treated Paper Cone Water Cups, 6 Oz, White, | $149.95 | far above the same kind of item | $14.46 | median price of the same kind of item |
| Household Essentials | 790563263 Downy 20pc Dwygain Bead Sk | $149.40 | far above the same kind of item | $15.00 | comparable item: Refresh Your Car 36pc Ryc 36ct Sk |
| Household Essentials | 54891120 Handi-Foil 2061-30-500 6 in. x 8.59 in. x 1.25 in. 1.5 lbs. Capacity A | $148.99 | far above the same kind of item | $8.57 | median price of the same kind of item |
| Household Essentials | 882517594 Zogics Cleaning Wipes, Z1000-4, (4 rolls/case) | $148.95 | far above the same kind of item | $5.19 | comparable item: Whirlpool Cleaning Wipes, 8212510A |
| Household Essentials | 4744592 ER-L515 Lithium Ion Notebook Battery | $147.92 | far above the same kind of item | $118.88 | comparable item: Lithium Ion Notebook Battery |
| Household Essentials | 771456419 Durable 18650 4000mAh 3.7V Original New Rechar geable lii on Battery F | $147.19 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 1158888224 Genuine Joe Heavy-duty Metal Dustpan - 12" Wide - Metal Pan - Black -  | $146.53 | far above the same kind of item | $78.85 | comparable item: Genuine Joe Lobby Dust Pan - 12" Wide - 30" Handle |
| Household Essentials | 596224528 Durable 18650 4000mAh 3.7V Original New Rechar geable lii on Battery F | $146.35 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 21932853 Unger Pro Window Cleaning Kit w/8ft Pole Scrubber Squeegee Scraper Spo | $145.40 | far above the same kind of item | $7.81 | median price of the same kind of item |
| Household Essentials | 1360660714 Genuine Joe Retractable Feather Duster - Plastic Handle - 12 / Carton  | $141.69 | far above the same kind of item | $12.19 | comparable item: Boardwalk Retractable Feather Duster, 9" to 14" Ha |
| Household Essentials | 19647294 Basement Watchdog Emergency Standby Battery, 6 Hours | $139.24 | far above the same kind of item | $12.59 | median price of the same kind of item |
| Household Essentials | 285827808 Durable 18650 4000mAh 3.7V Original New Rechar geable lii on Battery F | $138.99 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 1600441390 Gmt Radial Steel Wool Pads, Grade 2 (coarse): Stripping/scrubbing, 20" | $138.80 | far above the same kind of item | $40.31 | comparable item: Gmt Industrial-Quality Steel Wool Hand Pads, #1 Me |
| Household Essentials | 21489084 Crc Contact Cleaner,Aerosol Can,Alcohol 02130 02130 ZO-G4061163 | $138.62 | far above the same kind of item | $11.96 | median price of the same kind of item |
| Household Essentials | 156784075 Kleenex - Paper towel - 425 ft - white | $136.68 | far above the same kind of item | $70.99 | comparable item: Butcher Paper, 1000 ft x 18", White |
| Household Essentials | 21068443 Duracell Coppertop Battery C Cell Bulk, 72 Per Case | $136.00 | far above the same kind of item | $5.52 | comparable item: Duracell Coppertop 9V Alkaline Battery 1 Each |
| Household Essentials | 1544838636 Impact Products Telescopic Lambswool Duster - 12" Handle Length - 34"  | $136.00 | far above the same kind of item | $11.94 | comparable item: Impact Products Adjustable Lambswool Duster 60" Ov |
| Household Essentials | 857280521 Briggs and Stratton 193463GS Battery | $135.41 | far above the same kind of item | $12.59 | median price of the same kind of item |
| Household Essentials | 298274255 Rechar geable Battery Durable 18650 4000mAh 3.7V Original New Rechar g | $133.84 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 338142749 2017 New Durable 18650 4000mAh 3.7V Original New Rechar geable lii on  | $133.64 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 54891119 Handi-Foil 2060-30-500 5.13 in. x 7.06 in. x 1.69 in. Aluminum Pan wit | $133.54 | far above the same kind of item | $8.57 | median price of the same kind of item |
| Household Essentials | 552441757 1pc 18650 4000mAh 3.7V Original New Rechar geable lii on Battery For F | $133.34 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 174229588 Duracell, DURMN1500B2ZCT, Coppertop Alkaline AA Battery 2-Packs, 112 / | $133.02 | far above the same kind of item | $77.56 | comparable item: Duracell, DURMN2400B8ZCT, Coppertop Alkaline AAA B |
| Household Essentials | 164048525 2017 New Durable 18650 4000mAh 3.7V Original New Rechar geable lii on  | $132.99 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 55149945 Reynolds Wrap Metro Aluminum Foil Roll, Lighter Gauge Standard, 18" x  | $132.18 | far above the same kind of item | $23.49 | comparable item: Reynolds Wrap Aluminum Foil (175 Square Foot Roll, |
| Household Essentials | 418428096 18650 4000mAh 3.7V Rechar geable lii on Battery For Flashlight | $131.98 | far above the same kind of item | $100.75 | comparable item: 18650 4000mAh 3.7V Rechar geable lii on Battery Fo |
| Household Essentials | 480133804 18650 4000Mah 3.7V Rechar geable lii on Battery For Flashlight | $131.98 | far above the same kind of item | $100.75 | comparable item: 18650 4000mAh 3.7V Rechar geable lii on Battery Fo |
| Household Essentials | 466217606 2 PCS 18650 4000mAh 3.7V Rechar geable lii on Battery For Flashlight | $131.97 | far above the same kind of item | $3.00 | comparable item: Rechar geable Battery 4 PCS 14500 3.7V 2300Mah Rec |
| Household Essentials | 927406055 18650 4000mAh 3.7V Rechar geable lii on Battery For Flashlight | $131.97 | far above the same kind of item | $100.75 | comparable item: 18650 4000mAh 3.7V Rechar geable lii on Battery Fo |
| Household Essentials | 118534060 Timemist Classic Metered Aerosol Fragrance Dispenser, White | $131.73 | far above the same kind of item | $62.32 | comparable item: 3.4 in. x 3.4 in. x 8.25 in. Plus Metered Aerosol  |
| Household Essentials | 198050149 Durable 18650 4000mAh 3.7V Original New Rechar geable lii on Battery F | $130.96 | far above the same kind of item | $33.54 | comparable item: 18650 Rechar geable Battery Durable 4000mAh 3.7V O |
| Household Essentials | 47335948 HFA INC Medallion Interfolded Foil Sheets 12 x 10 3/4 500/Box 6 Box/Ca | $129.99 | far above the same kind of item | $9.43 | median price of the same kind of item |
| Household Essentials | 2667949 Lithium Ion Notebook Battery | $129.87 | far above the same kind of item | $118.88 | comparable item: Lithium Ion Notebook Battery |
| Household Essentials | 2667951 Lithium Ion Notebook Battery | $129.87 | far above the same kind of item | $118.88 | comparable item: Lithium Ion Notebook Battery |
| Household Essentials | 48947433 Suede Cleaner Kit, Nubuck Shoe Cleaner with Brush & Towel, Removes Dir | $129.00 | far above the same kind of item | $11.96 | median price of the same kind of item |
| Household Essentials | 4744607 Lithium Ion Notebook Battery | $128.93 | far above the same kind of item | $118.88 | comparable item: Lithium Ion Notebook Battery |
| Household Essentials | 4744608 Lithium Ion Notebook Battery | $128.93 | far above the same kind of item | $118.88 | comparable item: Lithium Ion Notebook Battery |
| Household Essentials | 1821507504 Kleenex Trusted Care Tissues - 2 Ply - 8.20" X 8.40" - White - Soft, S | $128.83 | far above the same kind of item | $8.80 | comparable item: Kleenex Trusted Care Facial Tissues, 4 Flat Boxes, |
| Household Essentials | 41198218 Handi-Foil 206230 5.94 in. x 8.44 in. x 1.81 in. 2.25 lbs. Capacity Al | $128.21 | far above the same kind of item | $8.57 | median price of the same kind of item |
| Household Essentials | 509117799 Suma Break-Up Heavy-Duty Foaming Grease-Release Cleaner 1500Ml Bottle  | $128.09 | far above the same kind of item | $9.35 | comparable item: Suma Break-Up Heavy Duty Foaming Grease-Release Cl |
| Household Essentials | 589945158 Dixie TH207 Heavyweight Teaspoons Plastic Cutlery - White (1000/Carton | $127.12 | far above the same kind of item | $25.43 | comparable item: Dixie Cutlery Combo Box, Heavyweight, Polypropylen |
| Household Essentials | 144069931 PREUP Electric Spin Scrubber, Cordless Bathroom Scrubber with 6 Replac | $126.99 | far above the same kind of item | $42.68 | comparable item: BENTISM Electric Spin Scrubber 360 Cordless Shower |
| Household Essentials | 434325070 SereneLife PSLBZ58 - Electric Bug Zapper - Indoor/Outdoor Mosquito & F | $126.55 | far above the same kind of item | $83.99 | comparable item: Outdoor Bug Zapper Trap, Electric Light Plug-in Pe |
| Household Essentials | 102252763 Guildware Heavyweight Plastic Forks, Black, 1000/Carton | $126.36 | far above the same kind of item | $24.99 | comparable item: Heavyweight Plastic Cutlery Forks, White, 6.41", 5 |
| Household Essentials | 665916913 Dawn Professional HD Degreaser | $126.03 | far above the same kind of item | $8.94 | median price of the same kind of item |
| Household Essentials | 764727211 Downy Coin Vend Liquid Fabric Softener Single-Use Packet April Fresh 1 | $126.02 | far above the same kind of item | $8.08 | median price of the same kind of item |
| Household Essentials | 20251712181 Aenkyo Solar Bug Zapper Outdoor, 2 Pack, 4500V Mosquito & Fly Zapper,  | $125.99 | far above the same kind of item | $65.99 | comparable item: Aenkyo Solar Bug Zapper Outdoor, 4500V Mosquito &  |
| Household Essentials | 900235854 Plink Garbage Disposer Cleaner and Deodorizer Lemon Scent, 40 Use (Pac | $125.80 | far above the same kind of item | $62.24 | comparable item: Plink Garbage Disposer Cleaner and Deodorizer Lemo |
| Household Essentials | 22855969 Rubbermaid Comm. SeBreeze Fragrance Can Refill - RCP5158000000 | $124.99 | far above the same kind of item | $11.61 | median price of the same kind of item |
| Household Essentials | 996072666 Scrub Daddy Sponge Daddy Dual-Sided Sponge 3 3/8 x 5.563 x 2 5/8 Assor | $123.79 | far above the same kind of item | $32.00 | comparable item: Scrub Mommy Dual Sided Sponge & Scrubber 8ct Roll  |
| Household Essentials | 187912817 Cleaning Makeup Brush Spray Clear Glass Spray Bottles Travel Things fo | $123.43 | far above the same kind of item | $10.79 | median price of the same kind of item |
| Household Essentials | 1219911924 Kleenex Naturals Facial Tissue - 8" X 8.40" - White - Virgin Fiber, Fi | $122.82 | far above the same kind of item | $6.58 | median price of the same kind of item |
| Household Essentials | 644342550 Extra Long Electric Spin Scrubber, Handheld Cleaner 6 Replaceable Brus | $122.49 | far above the same kind of item | $12.29 | median price of the same kind of item |
| Household Essentials | 998649296 Webster, WBIHAB6FK100CT, Handi-Bag Flap Tie Tall Kitchen Bags, 600 / C | $122.42 | far above the same kind of item | $12.67 | median per-unit price of comparable items |
| Household Essentials | 120287865 Genuine Joe, GJO0010430CT, Heavyweight White Plastic Forks, 4000 / Car | $122.08 | far above the same kind of item | $24.99 | comparable item: Heavyweight Plastic Cutlery Forks, White, 6.41", 5 |
| Household Essentials | 47440455 Hfa Handi-Foil Medallion Interfolded 12 X10 Foil Sheet, 200 Count, 12  | $121.97 | far above the same kind of item | $9.43 | median price of the same kind of item |
| Household Essentials | 34157189 Bite Shield™ Protector 1/4 Acre Non-Propane Mosquito Trap | $121.06 | far above the same kind of item | $10.99 | median price of the same kind of item |
| Household Essentials | 352916288 Dixie, DXEFH207CT, Heavyweight Plastic Cutlery, 1000 / Carton, White | $121.00 | far above the same kind of item | $9.79 | comparable item: Dixie Plastic Cutlery, Heavyweight Forks, White, 1 |
| Household Essentials | 21936894 Scott High-Capacity Hard Roll 1 Ply - 8" x 1000 ft - 7.87" Roll Diamet | $119.99 | far above the same kind of item | $9.00 | median price of the same kind of item |
| Household Essentials | 1405771925 Reynolds Food Packaging Pactivreynolds Standard Aluminum Foil - 18" Wi | $119.93 | far above the same kind of item | $10.17 | median price of the same kind of item |
| Household Essentials | 1695075753 Lysol ATBC 30CT SK | $119.10 | far above the same kind of item | $59.45 | comparable item: ONEMOP 40-SK |
| Household Essentials | 1055281612 No Tree 4.4 in. Diameter x 4.5 in. h Sugarcane Paper Bowls - Natural ( | $117.74 | far above the same kind of item | $6.50 | median price of the same kind of item |
| Household Essentials | 5007634109 Dynatrap LED Mosquito and Insect Trap for 1 Acre, Outdoor Electric Ins | $116.00 | far above the same kind of item | $39.99 | comparable item: Dynatrap 1/4 Acre Outdoor Mosquito and Insect Trap |
| Household Essentials | 134328557 Pactiv Translucent Plastic Cups, 16 Oz, Clear, 80 Cups Per Pack, Carto | $115.44 | far above the same kind of item | $16.84 | comparable item: Clear Plastic PETE Cups, 16oz, 50/Bag, 10 Bags/Car |
| Household Essentials | 5306628356 Pledge FF SDK 20ct | $113.00 | far above the same kind of item | $6.57 | median price of the same kind of item |
| Household Essentials | 226821188 Air Freshener Refill, 6.6oz, Cinnamon, PK12 | $112.21 | far above the same kind of item | $14.48 | comparable item: TimeWick Air Freshener Refill |
| Household Essentials | 457563520 Pledge 20pcpldg Mxd 20ct S | $111.60 | far above the same kind of item | $6.57 | median price of the same kind of item |
| Household Essentials | 1070525671 World Centric BOPA24 4.4 in. Diameter x 4.4 in. h Paper Bowls - White  | $111.52 | far above the same kind of item | $6.50 | median price of the same kind of item |
| Household Essentials | 1993206857 Solo Plastic Disposable Cups - 12 Fl Oz - 20 / Carton - Clear - Pete P | $109.62 | far above the same kind of item | $50.99 | comparable item: Genuine Joe Clear Plastic Cups - 20 / Pack - 12 Fl |
| Household Essentials | 16374915566 Glade Falliday Aerosol 48ct Walmart Sidekick | $109.00 | far above the same kind of item | $7.03 | median price of the same kind of item |
| Household Essentials | 1277161958 Griots Garage Ceramic Glass Cleaner - 22oz | $107.94 | far above the same kind of item | $82.03 | comparable item: Griots Garage 10959 22 oz Engine Cleaner |
| Household Essentials | 105890545 Microburst 3000 Air Freshener Refill Variety Pack, 2 oz Aerosol | $107.86 | far above the same kind of item | $12.50 | comparable item: Rubbermaid Commercial Microburst 9000 Air Freshene |
| Household Essentials | 1292324719 Rubbermaid Commercial Hygen Disposable Microfiber Pads - 19" Width X 4 | $107.55 | far above the same kind of item | $89.96 | comparable item: Rubbermaid Commercial HYGEN Disposable Microfiber  |
| Household Essentials | 45460357 Seventh Generation, SEV13719CT, 100% Recycled Facial Tissues, 36 / Car | $106.81 | far above the same kind of item | $10.92 | comparable item: Seventh Generation 100% Recycled Facial Tissues, 1 |
| Household Essentials | 1079332253 Kleenex Naturals Facial Tissue - 8" X 8.40" - White - Virgin Fiber, Fi | $106.54 | far above the same kind of item | $6.58 | median price of the same kind of item |
| Household Essentials | 50111863 Cascades Facial Tissue Pocket Packs, 2-Ply, 8.268 x 8.583, 15/Pack, 8/ | $105.50 | far above the same kind of item | $27.42 | comparable item: Cascades White 2-Ply Decor Facial Tissue, 100 shee |
| Household Essentials | 258688753 BRIGHT Air Electric Scented Oil Air Freshener Refill, Linen and Spring | $104.87 | far above the same kind of item | $4.78 | comparable item: Bright Air Electric Scented Oil Air Freshener Refi |
| Household Essentials | 822413895 Rubbermaid® Spill Mop Pads, Complete Kit | $103.63 | far above the same kind of item | $85.18 | median per-unit price of comparable items |
| Household Essentials | 1867465089 Kleenex Trusted Care Tissues - 2 Ply - 8.20" X 8.40" - White - Soft, S | $103.24 | far above the same kind of item | $8.80 | comparable item: Kleenex Trusted Care Facial Tissues, 4 Flat Boxes, |
| Household Essentials | 52775964 RMC Enviro Care All-purpose Cleaner - Concentrate Liquid - 64.2 fl oz  | $102.57 | far above the same kind of item | $11.63 | median per-unit price of comparable items |
| Household Essentials | 1581378350 Pacific Blue Select Cube Box Facial Tissue - 2 Ply - 7.65" X 8.85" - W | $102.01 | far above the same kind of item | $29.80 | comparable item: Genuine Joe 2-ply Facial Tissue - 30 Boxes - 2 Ply |
| Household Essentials | 614373735 OdoBan Germ Control Concentrate, 6-Pack, 64 Ounces Each, Fragrance Fre | $99.99 | far above the same kind of item | $9.00 | median price of the same kind of item |
| Household Essentials | 530735292 GET SERIOUS Grease Trap Treatment Commercial Enzyme Drain Opener, Clea | $99.98 | far above the same kind of item | $29.98 | comparable item: GET SERIOUS Grease Trap Treatment Commercial Enzym |
| Household Essentials | 610669449 Clorox Turbo? Sprayer - 1 Count | $99.98 | far above the same kind of item | $7.78 | median price of the same kind of item |
| Household Essentials | 275066319 Clorox Clean Air Scent Odor Defense Air Spray, CLO31710, 6 Oz | $99.89 | far above the same kind of item | $21.66 | comparable item: Clorox Commercial Solutions Odor Defense, Clean Ai |
| Household Essentials | 30519295 Shower Squeegee with Smooth Handle - Oil Rubbed Bronze | $99.00 | far above the same kind of item | $8.50 | median price of the same kind of item |
| Household Essentials | 1461564580 Lysol Wipes Lemon & Lime Blossom® Bucket 2/800 ct. | $97.21 | far above the same kind of item | $6.97 | median price of the same kind of item |
| Household Essentials | 43620960 Scotch-Brite Lint Roller, Mini, 30 Sheets | $94.21 | far above the same kind of item | $9.68 | comparable item: Scotch-Brite Mini-Travel Lint Roller, 1 Roller, 30 |
| Household Essentials | 163976146 Pledge® Beautify It Orange Furniture Polish Spray, Orange Scent, 9.7 F | $93.21 | far above the same kind of item | $55.51 | median per-unit price of comparable items |
| Household Essentials | 752274256 Dixie KH207 Plastic Cutlery, Heavyweight Knives - White (1000/Carton) | $92.99 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Household Essentials | 1992279486 Dixie BasicÂ® Lightweight Disposable Paper Bowls By Gp Pro - 125 / Pac | $92.76 | far above the same kind of item | $6.50 | median price of the same kind of item |
| Household Essentials | 168131139 Easy Paks All-Purpose Cleaner/Deodorizer, 90 .5 oz Packets/Tub, 2 Tubs | $92.25 | far above the same kind of item | $7.00 | median price of the same kind of item |
| Household Essentials | 44818883 Fresh Products Bio Conqueror 105 Liquid Concentrate, 1 Qt, Cherry Frag | $91.64 | far above the same kind of item | $55.91 | comparable item: Fresh Products Bio Conqueror 105 Liquid Concentrat |
| Household Essentials | 40884637 Microburst 9000 Air Freshener Dispenser, 9 3/8" x 3 3/8", White | $91.56 | far above the same kind of item | $61.67 | comparable item: Settings Metered Air Freshener Dispenser 3.4" x 3. |
| Household Essentials | 43844073 Standard Facial Tissues - NON243275 | $91.49 | far above the same kind of item | $51.36 | comparable item: Standard Facial Tissues - NON243277 |
| Household Essentials | 1311312657 Modernware Designer Paper Bowls - Disposable - White - Paper Body - 28 | $90.73 | far above the same kind of item | $61.40 | comparable item: Genuine Joe Paper Bowls - Disposable - Assorted -  |
| Household Essentials | 1496940094 Genuine Joe Clear Plastic Cups - 50 - 9 Fl Oz - 20 / Carton - Clear -  | $89.64 | far above the same kind of item | $41.57 | comparable item: Genuine Joe Clear Plastic Cups - 20 / Pack - 10 Fl |
| Household Essentials | 36877201 Amrep Halt Liquid Drain Opener, 1 Qt, Case Of 12 | $89.57 | far above the same kind of item | $53.64 | comparable item: Drano Liquid Drain Cleaner & Opener, 32 fl oz |
| Household Essentials | 942192216 Guildware Extra Heavyweight Plastic Cutlery, Teaspoons, Black, 1,000/c | $89.53 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Household Essentials | 44389932 TimeMist Settings Micro Metered Aerosol Refills, Cinnamon Spice, 2oz,  | $87.99 | far above the same kind of item | $26.29 | median per-unit price of comparable items |
| Household Essentials | 1317384752 Genuine Joe Clear Plastic Cups - 20 / Pack - 16 Fl Oz - 20 / Carton -  | $85.03 | far above the same kind of item | $67.99 | comparable item: Genuine Joe Clear Plastic Cups - 20 / Pack - 12 Fl |
| Household Essentials | 39071692 Royal Plain Round Toothpicks, Case of 19,200 | $84.58 | far above the same kind of item | $4.04 | comparable item: Diamond Toothpicks, Round, 250 Ct |
| Household Essentials | 28680574 Premium Metered Air Freshener Refill, Spring Flowers, 6.6 oz Aerosol | $82.99 | far above the same kind of item | $18.53 | comparable item: Zep Premium Metered Air Freshener Refill, Spring F |
| Household Essentials | 28680884 TimeMist® Metered Air Freshener Refill, Bayberry | $82.99 | far above the same kind of item | $8.28 | comparable item: Metered Air Freshener Refill |
| Household Essentials | 111846938 Rubbermaid FG400695 Pump Dispenser Air Freshener with LED - White | $81.26 | far above the same kind of item | $6.22 | comparable item: Genuine Joe, GJO10442, Metered Dispenser Air Fresh |
| Household Essentials | 365395508 Comet® Creme Deodorizing Cleanser, 32 oz Bottle, 10/Carton | $80.76 | far above the same kind of item | $18.83 | comparable item: Comet Procter and Gamble Creme Deodorizing Cleanse |
| Household Essentials | 16352072 Kleenex® Professional Naturals Facial Tissue, Bulk (21272), 2-Ply, Whi | $79.82 | far above the same kind of item | $6.58 | median price of the same kind of item |
| Household Essentials | 55507829 Kleenex White Facial Tissue, 2-Ply, 160/Box, 12 Two-Packs/Carton | $76.28 | far above the same kind of item | $3.47 | comparable item: Kleenex 100 Count 2 Ply Facial Tissue - White |
| Household Essentials | 219023038 Dixie TM207 Heavy Mediumweight Plastic Cutlery Teaspoons - White (1000 | $75.31 | far above the same kind of item | $8.18 | comparable item: Dixie Plastic Cutlery, Heavy Mediumweight Teaspoon |
| Household Essentials | 48420108 Fantastik Ultra Concentrated All-Purpose Cleaner, 1.4 L Bottle - DVO95 | $75.29 | far above the same kind of item | $5.39 | comparable item: Fantastik All-Purpose Cleaner, With Bleach, 32 Fl  |
| Household Essentials | 753768425 All-Purpose Cleaner/Deodorizer, 90 .5 oz Packets/Tub, 2 Tubs/Carton | $75.17 | far above the same kind of item | $7.00 | median price of the same kind of item |
| Household Essentials | 49441115 SUN Color Safe Powder Bleach, Vend Pack, 1 load Box, 100/Carton | $71.85 | far above the same kind of item | $57.99 | comparable item: Color Safe Powder Bleach Vend Pack, 1 load Box, 10 |
| Household Essentials | 857918775 8 oz. Max Odor Eliminator Air Freshener - Meadow Breeze (6/Carton) | $71.17 | far above the same kind of item | $10.24 | comparable item: Max Odor Eliminator Air Freshener Meadow Breeze, 8 |
| Household Essentials | 229023495 Walex OVAASST Portable Ovation Air Freshener - Assorted Scents, 24 Pac | $70.18 | far above the same kind of item | $12.32 | comparable item: Walex Portable Ovation Air Freshener | Lavender Sc |
| Household Essentials | 1835417064 Pacific Blue Select Flat Box Facial Tissue - 2 Ply - 8.33" X 8" - Whit | $69.93 | far above the same kind of item | $29.80 | comparable item: Genuine Joe 2-ply Facial Tissue - 30 Boxes - 2 Ply |
| Household Essentials | 37892586 Renown Green Seal-Certified Facial Tissues, 2-Ply, 8 In. X 8 In., 160  | $69.88 | far above the same kind of item | $6.58 | median price of the same kind of item |
| Household Essentials | 179698184 Joy Ultra Dishwashing Liquid Dish Soap, Lemon, 30 fl oz | $68.99 | far above the same kind of item | $6.80 | comparable item: Joy Ultra Dishwashing Liquid Dish Soap, Lemon, 30  |
| Household Essentials | 251546952 Vend-rite Manufacturing Co Heavy Duty Coin-vend Powdered Chlorine Blea | $66.62 | far above the same kind of item | $6.53 | median price of the same kind of item |
| Household Essentials | 129215174 JAM Paper Party Plastic Cups, 12 oz, Orange, 200/Cups | $65.99 | far above the same item's other variants | $9.16 | comparable item: JAM Paper Plastic Cups, 12 oz, Orange, 20/Pack |
| Household Essentials | 40884665 Professional Lysol Disinfectant Spray, Lavender, 19oz | $57.71 | far above the same item's other variants | $7.49 | comparable item: Professional Lysol Disinfectant Spray, Spring Wate |
| Household Essentials | 6023388337 Alvantor Beeswax Wood Polish & Conditioner 3.38fl.oz - Waterproof Furn | $49.99 | far above the same item's other variants | $8.86 | comparable item: Alvantor Beeswax Wood Polish and Conditioner for F |
| Household Essentials | 2384912768 OdoBan Ready-to-Use Hard Surface Floor Cleaner, Streak Free and Neutra | $49.97 | far above the same item's other variants | $33.79 | comparable item: OdoBan Ready-to-Use Hard Surface Floor Cleaner, St |
| Household Essentials | 441795506 Lysol Lime/Rust Toilet Bowl Cleaner - 24 fl oz (0.8 quart) - Atlantic  | $41.76 | far above the same item's other variants | $13.77 | comparable item: Lysol Hydrogen Peroxide Toilet Cleaner - 24 fl oz  |
| Household Essentials | 258655139 Febreze Unstopables Odor-Eliminating PLUG Air Freshener, Paradise (2)  | $39.99 | far above the same item's other variants | $9.55 | comparable item: Febreze Unstopables Odor-Fighting PLUG Air Freshen |
| Household Essentials | 452972616 Lysol Bleach Toilet Bowl Cleaner - 24 fl oz (0.8 quart) - Bottle - 9 / | $39.52 | far above the same item's other variants | $13.77 | comparable item: Lysol Hydrogen Peroxide Toilet Cleaner - 24 fl oz  |
| Household Essentials | 552100732 Febreze Origins Fade Defy Plug Air Freshener & Odor Fighter, Wood, (3) | $36.99 | far above the same item's other variants | $18.47 | comparable item: Febreze Odor-Eliminating Fade Defy PLUG Air Freshe |
| Household Essentials | 131289670 Reckitt Benckiser Pet High Traffic Foam Carpet And Upholstery Cleaner, | $35.20 | far above the same item's other variants | $6.35 | comparable item: Resolve Pet High Traffic Carpet Foam Cleaner Dual  |
| Household Essentials | 328104252 Dial, DIA35001CT, Lovely Lavender Gel Air Freshener, 12 / Carton, Purp | $32.95 | far above the same item's other variants | $1.18 | comparable item: Renuzit Gel Air Freshener, Original Scent, 7 oz (P |
| Household Essentials | 19990674820 Great Value Disinfectant Spray, Fresh Linen Scent, 19 oz | $28.62 | far above the same item's other variants | $4.97 | comparable item: Great Value Disinfectant Spray, Fresh Linen Scent, |
| Household Essentials | 803218571 Dawn Platinum Powerwash Dish Spray, Dish Soap, Fresh Scent Bundle, 1 s | $27.14 | far above the same item's other variants | $11.93 | comparable item: Dawn Platinum Powerwash Dish Dish Soap, Apple Bund |
| Household Essentials | 44326669 Renuzit Adjustables Air Freshener, Grapefruit Essence and Bergamot, 7  | $26.79 | far above the same item's other variants | $1.52 | comparable item: Renuzit Adjustables Cone Air Freshener - Cotton Br |
| Household Essentials | 773618195 Febreze Odor-Eliminating Fade Defy PLUG Air Freshener Refill, Berry an | $25.99 | far above the same item's other variants | $5.43 | comparable item: Febreze Odor-Eliminating Fade Defy PLUG Air Freshe |
| Household Essentials | 997356872 Renuzit Adjustable Solid Gel Air Freshener Cone, Forever Raspberry, No | $25.39 | far above the same item's other variants | $2.38 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, After t |
| Household Essentials | 367127087 Febreze Odor-Fighting Fade Defy PLUG Air Freshener Honeysuckle, (2) .8 | $22.30 | far above the same item's other variants | $18.47 | comparable item: Febreze Odor-Eliminating Fade Defy PLUG Air Freshe |
| Household Essentials | 949209232 Reckitt Benckiser Disinfectant spry , Crisp Linen Scent, 19 Oz spry | $20.94 | far above the same item's other variants | $6.08 | comparable item: Lysol Disinfectant Spray Crisp Linen Scent 19 Ounc |
| Household Essentials | 13475106813 Downy Holiday Laundry Scent Booster Beads Trio Bundle in the festive S | $20.91 | far above the same item's other variants | $6.97 | comparable item: Downy Cozy Collection In-Wash Scent Booster Laundr |
| Household Essentials | 382826819 Renuzit Adjustable Solid Gel Air Freshener Cone, Forever Raspberry, No | $19.32 | far above the same item's other variants | $2.38 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, After t |
| Household Essentials | 197891880 Clorox Urine Remover for Stains & Odors, 32 Fl Oz Spray Bottle + 1 Gal | $19.12 | far above the same item's other variants | $22.75 | comparable item: Clorox Pet Carpet Stain Remover Refill for Urine S |
| Household Essentials | 5090863475 Lysol Air Sanitizer Spray and Bacterial Odor Elimination, Air Freshene | $18.72 | far above the same item's other variants | $6.97 | comparable item: Lysol Air Sanitizer Spray for Air Sanitization and |
| Household Essentials | 12107003231 Dawn Powerwash Spray, Dish Soap, Dishwashing Liquid, Pumpkin Spice, Cr | $17.82 | far above the same item's other variants | $11.88 | comparable item: Dawn Powerwash Spray, Dish Soap, Dishwashing Liqui |
| Household Essentials | 5338037509 Mrs. Meyer's Clean Day Multi-Surface Everyday Cleaner Concentrate Star | $16.67 | far above the same item's other variants | $4.94 | comparable item: Mrs. Meyer's Clean Day Multi-Surface Everyday Clea |
| Household Essentials | 103208614 Palmolive Ultra Experientials Liquid Dish Soap, Aloe & Citrus Scent -  | $16.15 | far above the same item's other variants | $9.99 | comparable item: Ultra Palmolive Antibacterial Dish Liquid, Citrus  |
| Household Essentials | 17752716457 Mr. Clean All Purpose Cleaner, Floor Cleaner, Mop Soap, Cleaning Liqui | $15.94 | far above the same item's other variants | $5.94 | comparable item: Mr. Clean All Purpose Cleaner, Floor Cleaner, Mop  |
| Household Essentials | 8372972660 Resolve 5in1 Pet Mess Destroyer Carpet Stain Cleaner And Odor Remover  | $15.82 | far above the same item's other variants | $6.30 | comparable item: Resolve Pet Specialist Carpet Cleaner Foam – Heavy |
| Household Essentials | 135308680 Dial Adjustables Air Freshener, Pure Ocean Breeze, 7 Oz Cone | $15.17 | far above the same item's other variants | $1.52 | comparable item: Renuzit Adjustables Cone Air Freshener - Cotton Br |
| Household Essentials | 5153023196 Citrus Magic Odor Absorbing Solid Air Freshener, Bamboo Rainforest, 8- | $14.00 | far above the same item's other variants | $3.98 | comparable item: Citrus Magic For Closets Odor Absorbing Solid Air  |
| Household Essentials | 28212775 Renuzit Adjustable Gel Air Freshener Cones, Tough on Pet Odors, Pure B | $13.33 | far above the same item's other variants | $2.68 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, Tough o |
| Household Essentials | 954912588 Dial Adjustables Air Freshener, Citrus Sunburst, 7 Oz Cone | $13.31 | far above the same item's other variants | $1.52 | comparable item: Renuzit Adjustables Cone Air Freshener - Cotton Br |
| Household Essentials | 36052443 Windex Wndx Outdoor Gray Spray Bottle 24ctplt | $11.71 | far above the same item's other variants | $2.18 | median per-unit price of comparable items |
| Household Essentials | 903240530 Renuzit Adjustable Solid Gel Air Freshener Cones, Lovely Lavender, Non | $11.47 | far above the same item's other variants | $2.38 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, After t |
| Household Essentials | 26959278 Citrus Magic Odor Absorbing Solid Air Freshener, Lavender Escape 8oz | $10.70 | far above the same item's other variants | $3.66 | comparable item: Citrus Magic Odor Absorbing Solid Air Freshener, L |
| Household Essentials | 16664824 Windex Outdoor Multi-Surface Cleaner, Concentrated Sprayer, 32 fl oz | $10.64 | far above the same item's other variants | $4.74 | comparable item: OxiClean 1-Gallon Multi-surface Concentrated Outdo |
| Household Essentials | 51893575 CLOROX | $8.98 | far above the same item's other variants | $10.46 | median per-unit price of comparable items |
| Household Essentials | 15941767593 Downy Liquid Fabric Softener, April Fresh, 24 fl oz, 32 Loads, Liquid  | $7.53 | far above the same item's other variants | $2.34 | comparable item: Downy April Fresh Liquid Fabric Conditioner (Fabri |
| Household Essentials | 16604603750 Glade Odor Fighting Air Freshener Spray, Lemon, 7.3 oz, 1pk | $7.11 | far above the same item's other variants | $2.54 | comparable item: Glade Air Freshener Room Spray, Pet Fresh Scent, P |
| Household Essentials | 15028891 Renuzit Adjustable Solid Gel Air Freshener Cone, Forever Raspberry, No | $6.81 | far above the same item's other variants | $2.38 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, After t |
| Household Essentials | 15028893 Renuzit Adjustable Solid Gel Air Freshener Cones, Apple & Cinnamon, No | $6.81 | far above the same item's other variants | $2.76 | comparable item: Renuzit Apple & Cinnamon Gel Air Freshener, 7 oz ( |
| Household Essentials | 20053358498 Glade® Soft Mist Air Freshener Room Spray, Summer Pops, 7.3oz., 1 coun | $5.91 | far above the same item's other variants | $1.48 | comparable item: Glade® Soft Mist Air Freshener Room Spray, Beach L |
| Household Essentials | 20041962076 Glade® Soft Mist Air Freshener Room Spray, Berries and Cream, 7.3oz.,  | $5.85 | far above the same item's other variants | $1.48 | comparable item: Glade® Soft Mist Air Freshener Room Spray, Beach L |
| Household Essentials | 16603803696 Glade Odor Fighting Air Freshener Spray, Passion Fruit, 7.3 oz, 1pk | $5.79 | far above the same item's other variants | $2.54 | comparable item: Glade Air Freshener Room Spray, Pet Fresh Scent, P |
| Household Essentials | 165863844 Renuzit Adjustable Solid Gel Air Freshener Cones, Hawaiian Sunset, Non | $5.73 | far above the same item's other variants | $2.38 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, After t |
| Household Essentials | 18124617244 Glade® Soft Mist Odor Fighting Aerosol Air Freshener, Coconut Water &  | $5.65 | far above the same item's other variants | $1.48 | comparable item: Glade® Soft Mist Odor Fighting Aerosol Air Freshen |
| Household Essentials | 18154870611 Glade® Soft Mist Odor Fighting Aerosol Air Freshener, Sweet Summertime | $5.65 | far above the same item's other variants | $1.48 | comparable item: Glade® Soft Mist Odor Fighting Aerosol Air Freshen |
| Household Essentials | 18149070614 Glade® Odor Fighting Soft Mist Air Freshener Room Spray, Lemon Zest &  | $5.47 | far above the same item's other variants | $1.81 | comparable item: Glade® Odor Fighting Soft Mist Air Freshener Room  |
| Household Essentials | 27140952 Renuzit Gel Air Freshener, Lovely Lavender, 7.0 Ounce | $5.33 | far above the same item's other variants | $1.48 | comparable item: Renuzit Gel Air Freshener, Hawaiian Oasis, 7.0 Oun |
| Household Essentials | 551791826 Renuzit Gel Air Freshener, After the Rain, 7 Ounce, 12 Count | $4.97 | far above the same item's other variants | $1.76 | comparable item: Renuzit Gel Air Freshener, After the Rain, 7.0 Oun |
| Household Essentials | 861395711 Renuzit Gel Air Freshener, Forever Raspberry, 7 Ounce, 12 Total | $4.97 | far above the same item's other variants | $1.31 | comparable item: Renuzit Gel Air Freshener, Forever Raspberry, 7 Ou |
| Household Essentials | 18182960449 Glade® Odor Fighting Soft Mist Air Freshener Room Spray, Lush Greens & | $4.90 | far above the same item's other variants | $1.81 | comparable item: Glade® Odor Fighting Soft Mist Air Freshener Room  |
| Household Essentials | 20236800306 Glade® Soft Mist Air Freshener Room Spray,Warm Apple & Spices, 7.3oz., | $4.87 | far above the same item's other variants | $6.16 | comparable item: Glade® Odor Fighting Soft Mist Air Freshener Room  |
| Household Essentials | 948555459 Renuzit Scent Swirl Gel Air Freshener, Green Apple, Cherry & Sandalwoo | $4.77 | far above the same item's other variants | $1.18 | comparable item: Renuzit Gel Air Freshener, Original Scent, 7 oz (P |
| Household Essentials | 17904657337 Renuzit Adjustable Air Freshener Cone, Pure Breeze, 7 oz | $4.77 | far above the same item's other variants | $1.24 | comparable item: Renuzit Gel Air Freshener, Pure Breeze, 1 Cone |
| Household Essentials | 20094568249 Glade® Soft Mist Air Freshener Room Spray, Brandied Cherry, 7.3oz., 1  | $4.75 | far above the same item's other variants | $1.48 | comparable item: Glade® Soft Mist Air Freshener Room Spray, Beach L |
| Household Essentials | 16573669836 Glade Odor Fighting Air Freshener Spray, Sea Waves, 7.3 oz, 1pk | $4.51 | far above the same item's other variants | $1.81 | comparable item: Glade Odor Fighting Soft Mist Air Freshener Room S |
| Household Essentials | 3701094801 Renuzit Adjustable Air Freshener, Apple & Cinnamon, 1 Cone | $4.49 | far above the same item's other variants | $1.14 | comparable item: Glade Cone Air Freshener, Apple Cinnamon, 6.0 Oz.  |
| Household Essentials | 14115555072 Renuzit Gel Air Freshener, Forever Raspberry, 7.0 Ounce | $4.20 | far above the same item's other variants | $1.31 | comparable item: Renuzit Gel Air Freshener, Forever Raspberry, 7 Ou |
| Household Essentials | 45743145 Renuzit Lakeside Lemonade Gel Air Freshener, 7 oz | $3.95 | far above the same item's other variants | $1.18 | comparable item: Renuzit Gel Air Freshener, Original Scent, 7 oz (P |
| Household Essentials | 21320732 Renuzit Adjustable Solid Gel Air Freshener Cone, Hawaiian Sunset, Nons | $3.44 | far above the same item's other variants | $2.38 | comparable item: Renuzit Adjustable Gel Air Freshener Cone, After t |
| Household Essentials | 638380636 Pine-Sol Sparkling Wave Multi-Surface Cleaner, 57.6 Oz. | $0.50 | far below comparable items | $14.90 | comparable item: Pine-Sol Multi-Surface Cleaner, Original, 24 oz Bo |
| Household Essentials | 152125824 Mean Green Super Strength Cleaner & Degreaser, 40 fl oz | $0.06 | below range | $2.18 | comparable item: Mean Green Super Strength Cleaner & Degreaser, 1 g |
| Household Essentials | 32636381 BIN DUMP HLF PLT SIZE, 1 EA, (Pack of 1) | $0.03 | below range | $0.97 | median per-unit price of comparable items |
| Household Essentials | 553364584 Refresh Your Car Corrugate Only | $0.03 | below range | $10.99 | median price of its category |
| Household Essentials | 207321507 Dirt Devil Display Dd Spray Mop | $0.01 | below range | $26.46 | comparable item: Dirt Devil Spray Mop |
| Household Essentials | 254761369 Ap and G Inc Catchmaster 812sd Flour and Grain Moth Pantry Pest Traps  | $0.01 | below range | $10.99 | median price of its category |
| Household Essentials | 389400858 Paint 1st Md Pf | $0.01 | below range | $10.99 | median price of its category |
| Household Essentials | 573130848 Little Trees Tray | $0.01 | below range | $19.95 | median price of the same kind of item |
| Household Essentials | 729616804 California Scents 2-sided Fragrance Center (w/r Fc Fd-2s) | $0.01 | below range | $11.61 | median price of the same kind of item |
| Household Essentials | 762498501 NWD PowerPlus Motion Mop Shelf Display | $0.01 | below range | $19.41 | median price of the same kind of item |
| Household Essentials | 771654328 Hoover Display Dd Dry Mop | $0.01 | below range | $19.41 | median price of the same kind of item |
| Household Essentials | 14201314026 City Of Concord City Trash Bag | $0.01 | below range | $3.12 | comparable item: CVP Trash Bag |
| Office Supplies | 627705085 JAM Paper Parchment Legal Size Paper, 8.5 x 14, 24 lb Green Recycled,  | $99.95 | far above the same item's other variants | $23.64 | comparable item: JAM Paper Parchment Legal Size Paper, 8.5 x 14, 24 |
| Office Supplies | 3982618925 LUXPaper Certificate Holders for 8 1/2 x 11 Documents, 100 lb, Nautica | $99.95 | far above the same kind of item | $44.95 | comparable item: LUXPaper Certificate Holders for 8 1/2 x 11 Docume |
| Office Supplies | 54467044 JAM Paper & Envelope Passport Recycled Cardstock, 8.5 x 11, 250 per Pa | $99.13 | far above the same item's other variants | $22.99 | comparable item: JAM Paper & Envelope Passport Recycled Cardstock,  |
| Office Supplies | 54465362 JAM Paper Parchment Cardstock, 8 1/2 x 11, 250/Pack, 65lb White Recycl | $98.88 | far above the same item's other variants | $19.99 | comparable item: JAM Paper Parchment Cardstock, 8 1/2 x 11, 50 per  |
| Office Supplies | 54467081 JAM Paper Cardstock, 8 1/2 x 11, 65lb Blue, 250 per Pack | $98.88 | far above the same item's other variants | $35.14 | comparable item: JAM Paper Legal Cardstock, 8 1/2 x 14, 50 per Pack |
| Office Supplies | 14928697 Hammermill 86700 Great White Recycled Copy Paper, 92 Brightness, 20lb, | $98.60 | far above the same item's other variants | $15.39 | comparable item: Hammermill Great White Recycled Copy Paper, 92 Bri |
| Office Supplies | 2641462694 JAM Paper Cardstock, 8.5 x 14, 65lb, Grocery Bag Brown, 250/Pack | $97.95 | far above the same item's other variants | $27.95 | comparable item: JAM Paper Cardstock, 8.5 x 14, 65lb, Grocery Bag B |
| Office Supplies | 54465354 JAM Paper & Envelope Parchment Cardstock, 8.5 x 11, 250 per Pack, 65lb | $96.88 | far above the same item's other variants | $19.48 | comparable item: JAM Paper & Envelope Parchment Cardstock, 8.5 x 11 |
| Office Supplies | 54465360 JAM Paper & Envelope Parchment Cardstock, 8.5 x 11, 250 per Pack, 65lb | $96.88 | far above the same item's other variants | $19.48 | comparable item: JAM Paper & Envelope Parchment Cardstock, 8.5 x 11 |
| Office Supplies | 1047054139 JAM Paper 8.5 x 11 Cardstock, 110lb, Bronze Metallic, 250/Pack | $96.69 | far above the same item's other variants | $25.05 | comparable item: JAM Paper 8.5 x 11 Cardstock, 110 lb, Bronze Metal |
| Office Supplies | 1904578965 LUXPaper Certificate Holders for 8 1/2 x 11 Documents, 100 lb, Black L | $95.95 | far above the same kind of item | $45.95 | comparable item: LUXPaper Certificate Holders for 8 1/2 x 11 Docume |
| Office Supplies | 2796559300 LUXPaper Certificate Holders with Tuck Tab for 8 1/2 x 11 Papers, Die  | $95.94 | far above the same kind of item | $88.94 | comparable item: LUXPaper Certificate Holders with Tuck Tab for 8 1 |
| Office Supplies | 226632146 JAM Paper & Envelope Vellum Bristol Legal Cardstock, 8.5 x 14, 150 per | $95.17 | far above the same item's other variants | $58.99 | comparable item: JAM Paper Vellum Bristol Cardstock, 8 1/2 x 11, 25 |
| Office Supplies | 54466886 JAM Paper Cardstock, 8 1/2 x 11, 100lb Chocolate Brown, 250 per Pack | $92.99 | far above the same item's other variants | $25.98 | comparable item: JAM Paper Heavyweight 100lb Cardstock, 8 1/2 x 11, |
| Office Supplies | 54467017 JAM Paper Matte 80lb Cardstock, 8 1/2 x 11, , Baby Blue, 250 /Ream | $92.99 | far above the same item's other variants | $22.99 | comparable item: JAM Paper Cardstock, 8 1/2 x 11, 100lb Baby Blue,  |
| Office Supplies | 828572430 JAM Paper & Envelope Cardstock, 8.5 x 11, 80lb Salmon Pink, 250 per Pa | $92.99 | far above the same item's other variants | $22.99 | comparable item: JAM Paper & Envelope Cardstock, 8.5 x 11, 80lb Sal |
| Office Supplies | 929788062 JAM Paper Cardstock, 8.5 x 11, 80lb Black, 250 per Pack | $92.99 | far above the same item's other variants | $23.49 | comparable item: JAM Paper Cardstock, 8.5 x 11, 80lb Black, 50 per  |
| Office Supplies | 15166904451 JAM Paper Solid Colors, 8 1/2 x 11, Smooth Black, 100lb, 250 per Pack | $92.99 | far above the same item's other variants | $23.49 | comparable item: JAM Paper Solid Colors, 8 1/2 x 11, Smooth Black,  |
| Office Supplies | 15171114571 JAM Paper Solid Colors, 8 1/2 x 11, Navy Blue, 100lb, 250 Per Pack | $92.99 | far above the same item's other variants | $39.99 | comparable item: JAM Paper Solid Colors, 8 1/2 x 11, Navy Blue, 32l |
| Office Supplies | 54501179 JAM Paper Legal Paper, 8.5x14, 24lb Yellow, 500/Pack | $92.75 | far above the same item's other variants | $10.73 | comparable item: JAM Paper, 8.5x11, 24lb Yellow, 50/Pack |
| Office Supplies | 207919237 JAM Paper Legal Paper, 8.5x14, 24lb Violet, 500/Pack | $92.75 | far above the same item's other variants | $36.25 | comparable item: JAM Paper Legal Cardstock, 8 1/2 x 14, 50 per Pack |
| Office Supplies | 285470283 JAM Paper Legal Paper, 8.5x14, 24lb Sea Blue, 500/Pack | $92.75 | far above the same item's other variants | $22.99 | comparable item: JAM Paper Legal Paper, 8.5x14, 24lb Sea Blue, 100/ |
| Office Supplies | 446662909 JAM Paper Legal Paper, 8.5 x 14, 32lb, Fuchsia Pink, 500/Pack | $92.75 | far above the same item's other variants | $36.99 | comparable item: JAM Paper Legal Cardstock, 8 1/2 x 14, Fuchsia Pin |
| Office Supplies | 2202802659 JAM Paper 8.5 x 14 Paper, 32lb, Mandarin Orange, 500/Pack | $90.94 | far above the same item's other variants | $51.94 | comparable item: JAM Paper 8.5 x 14 Paper, 32lb Mandarin Orange, 25 |
| Office Supplies | 2261177736 JAM Paper 8.5 x 14 Paper, 32lb, Garnet Red, 500/Pack | $90.94 | far above the same item's other variants | $51.94 | comparable item: JAM Paper 8.5 x 14 Paper, 32lb Garnet Red, 250/Pac |
| Office Supplies | 2430178490 JAM Paper 8.5 x 14 Paper, 32lb, Holiday Green, 500/Pack | $90.94 | far above the same item's other variants | $12.95 | comparable item: JAM Paper 8.5 x 14 Paper, 32lb, Holiday Green, 50/ |
| Office Supplies | 54467045 JAM Paper & Envelope Passport Recycled Cardstock, 8.5 x 11, 250 per Pa | $86.99 | far above the same item's other variants | $18.30 | comparable item: JAM Paper & Envelope Passport Recycled Cardstock,  |
| Office Supplies | 54467054 JAM Paper & Envelope Passport Recycled Cardstock, 8.5 x 11, 250 per Pa | $86.99 | far above the same item's other variants | $19.79 | comparable item: JAM Paper & Envelope Passport Recycled Cardstock,  |
| Office Supplies | 54467063 JAM Paper Linen Cardstock, 8 1/2 x 11, 250 per Pack, 80lb Natural Whit | $86.99 | far above the same item's other variants | $18.89 | comparable item: JAM Paper Strathmore 80lb Cardstock, 8 1/2 x 11, N |
| Office Supplies | 54467067 JAM Paper Laid Cardstock, 8.5 x 11, Natural White, 250 per Pack, 88lb | $86.99 | far above the same item's other variants | $77.55 | comparable item: JAM Paper Laid Cardstock, 8 1/2 x 11, 88lb White,  |
| Office Supplies | 54467068 JAM Paper Wove Cardstock, 8 1/2 x 11, Natural White, 250 per Pack, 88l | $86.99 | far above the same item's other variants | $19.48 | comparable item: JAM Paper Strathmore 80lb Cardstock, 8 1/2 x 11, N |
| Office Supplies | 965014481 72 Rolls 45mm Box Carton Sealing Packing Package Clear Sticky Transpar | $84.80 | far above the same kind of item | $5.12 | median price of the same kind of item |
| Office Supplies | 562015931 72 Rolls 45mm Box Carton Sealing Packing Package Clear Sticky Transpar | $82.76 | far above the same kind of item | $5.12 | median price of the same kind of item |
| Office Supplies | 448067468 JAM Paper Glossy Paper, 8.5x11, 32lb White 2, Sided, 500/Pack | $81.88 | far above the same item's other variants | $17.99 | comparable item: JAM Glossy Paper, 8.5x11, 32lb White 2, Sided, 100 |
| Office Supplies | 977908537 JAM Paper Wove Paper, 8.5x11, 28lb Bright White, 500/Pack | $77.55 | far above the same item's other variants | $19.48 | comparable item: JAM Wove Paper, 8.5x11, 28lb Bright White, 100/Pac |
| Office Supplies | 14922483 Hammermill Punched Copy Paper - For Laser, Inkjet Print - Letter - 8.5 | $76.88 | far above the same item's other variants | $67.09 | comparable item: Domtar Earthchoice Copy & Multipurpose Paper - For |
| Office Supplies | 23157466 Hammermill Colored Copy Paper, 20Lb, 8-1/2"x14", 10 RM/CT, Ivory 10314 | $72.59 | far above the same item's other variants | $26.64 | comparable item: HAMMERMILL PAPERS GROUP Colored Copy Paper, 20Lb,  |
| Office Supplies | 441665019 36 Rolls Premium Carton Sealing Shipping Packing Packaging Box Adhesvi | $72.33 | far above the same kind of item | $45.27 | comparable item: 36 Rolls Premium Carton Sealing Shipping Packing P |
| Office Supplies | 970192690 JAM Paper Laid Paper, 8.5 x 11, 24lb Bright White, 500/Pack | $68.96 | far above the same item's other variants | $12.99 | comparable item: JAM Paper Laid Paper, 8.5 x 11, 24lb Bright White, |
| Office Supplies | 3948271924 LUXPaper #10 Regular Envelopes, 80lb. Black Linen, 50 Pack, 4 1/8 x 9  | $68.84 | far above the same item's other variants | $19.95 | comparable item: LUXPaper #10 Regular Envelopes, 80lb. Black Linen, |
| Office Supplies | 21043168 Business Source, BSN42103, 28 lb. White Catalog Envelopes, 250 / Box,  | $68.38 | far above the same item's other variants | $52.62 | comparable item: Business Source, BSN42102, 28 lb. White Catalog En |
| Office Supplies | 54465334 JAM Parchment 24lb Paper, 8.5 x 11, Antique Gold Recycled, 500 Sheets/ | $67.59 | far above the same item's other variants | $14.99 | comparable item: JAM Parchment 24lb Paper, 8.5 x 11, Antique Gold R |
| Office Supplies | 2323375967 LUXPaper Cardstock, 8.5 x 14, 100lb Wasabi Green, 250/Pack | $67.52 | far above the same item's other variants | $19.56 | comparable item: LUXPaper Cardstock, 8.5 x 14, 100lb Wasabi Green,  |
| Office Supplies | 802464658 Hot 36 Rolls Single-sided Carton Sealing Clear Packing Shipping Box Ta | $63.52 | far above the same kind of item | $5.12 | median price of the same kind of item |
| Office Supplies | 676965492 36 Rolls Single-sided Carton Sealing Clear Packing Shipping Box Tape 2 | $63.15 | far above the same kind of item | $5.12 | median price of the same kind of item |
| Office Supplies | 17424158534 Pen+Gear Copy Paper, 8.5" x 11", 92 Bright White, 20 lb., 10 Ream Case | $62.47 | far above the same item's other variants | $17.14 | comparable item: Pen+Gear Copy Paper, 8.5" x 11", 92 Bright, White, |
| Office Supplies | 463197243 36 Rolls Durable Earthy Yellow Premium Carton Sealing Shipping Packing | $59.53 | far above the same kind of item | $38.33 | comparable item: 36 Rolls Durable Earthy Yellow Premium Carton Seal |
| Office Supplies | 150857650 72 Rolls 45mmx110 Yards Shipping Box Carton Sealing Packing Package Cl | $59.51 | far above the same kind of item | $48.75 | comparable item: 72 Rolls 45mmx110 Yards Shipping Box Carton Sealin |
| Office Supplies | 490909692 Tape,Yellow,36 Rolls Premium Carton Sealing Shipping Packing Packaging | $59.09 | far above the same kind of item | $45.27 | comparable item: 36 Rolls Premium Carton Sealing Shipping Packing P |
| Office Supplies | 3078446588 LUXPaper 13 x 19 Cardstock, 100lb Wasabi Green, 50/Pack | $57.13 | far above the same item's other variants | $19.56 | comparable item: LUXPaper Cardstock, 8.5 x 14, 100lb Wasabi Green,  |
| Office Supplies | 3171069410 LUXPaper Currency Envelopes, 70lb, Authentic Plaid, Red, 2 7/8 x 6 1/2 | $52.95 | far above the same item's other variants | $19.44 | comparable item: LUXPaper Currency Envelopes, 70lb, White with Red  |
| Office Supplies | 234689843 Pen+Gear Copy Paper, 8.5" x 11", 92 Bright White, 20 lb., 10 Ream Case | $49.97 | far above the same item's other variants | $17.14 | comparable item: Pen+Gear Copy Paper, 8.5" x 11", 92 Bright, White, |
| Office Supplies | 619066840 Pen+Gear Copy Paper 10‑Ream Carton 92 Bright 20lb | $49.97 | far above the same item's other variants | $7.72 | comparable item: Pen+Gear Copy Paper, White, 8.5" x 11", 20 lb., 92 |
| Office Supplies | 14717122523 Pen + Gear Copy Paper, 8.5" x 11", 92 Bright, 20 lb., White, 8 Ream Ca | $39.97 | far above the same item's other variants | $28.28 | comparable item: Pen + Gear Copy Paper, 8.5" x 11", 92 Bright, 20 l |
| Office Supplies | 871830775 Barker Creek Computer Paper, Kai Ola Starfish, Decorative Paper, Stati | $32.68 | far above the same item's other variants | $12.60 | comparable item: Barker Creek Designer Computer Paper, Kai Ola Star |
| Office Supplies | 1366781123 Pen+Gear Assorted Neon Card Stock, 8.5" x 11", 65 lb, 300 Sheets | $22.96 | far above the same item's other variants | $33.89 | comparable item: Pen+Gear Assorted Neon Card Stock, 8.5" x 11", 65  |
| Office Supplies | 2161537342 Pen+Gear Assorted Bright Card Stock, 8.5" x 11", 65 lb, 300 Sheets | $22.96 | far above the same item's other variants | $7.45 | comparable item: Pen+Gear Assorted Bright Card Stock, 8.5" x 11", 6 |
| Office Supplies | 5144705708 Pen+Gear Kraft Card Stock Paper, 8.5"x 11", 65 lb, 180 Sheets | $20.88 | far above the same item's other variants | $7.28 | comparable item: Pen+Gear Kraft Card Stock Paper, 8.5 in x 11 in, 6 |
| Office Supplies | 156912155 10PK Halloween Pencil Astm 2 | $0.09 | below range | $1.98 | comparable item: 24PK Halloween Pencil Astm 1 |
| Office Supplies | 36723647 Neon Eraser | $0.05 | below range | $26.06 | comparable item: Ticonderoga Neon Wedge Eraser, 30 Count |
| Office Supplies | 131554105 9-99433 ENVL - 7.25 x 5.5 - WHITE - POCKET - FLAP | $0.05 | below range | $14.13 | median price of its category |
| Office Supplies | 186223964 Services Ticketmaster Ticket | $0.03 | below range | $14.13 | median price of its category |
| Office Supplies | 335155404 Coats & Clark Tray Marker, 4 Feet, 1 Each | $0.03 | below range | $9.97 | median price of the same kind of item |
| Office Supplies | 678678795 Coats & Clark Tray Marker, 8ft, 1 Each | $0.03 | below range | $9.97 | median price of the same kind of item |
| Office Supplies | 15436188 Silly Bandz Fun Shapes - 24 Pack | $0.02 | below range | $23.08 | median price of its category |
| Office Supplies | 322609445 3 IN PDQ BOX | $0.02 | below range | $14.13 | median price of its category |
| Office Supplies | 736893703 24IN PDQ BOX | $0.02 | below range | $14.13 | median price of its category |
| Office Supplies | 3884684 JUMBO PAPER CLIPS | $0.01 | below range | $11.93 | comparable item: Office Impressions Paper Clips, Jumbo, 1000/Pack - |
| Office Supplies | 19340670 Office Impressions Colored Paper, 500 Sh | $0.01 | below range | $5.59 | comparable item: Office Impressions Colored Paper, 500 Sh |
| Office Supplies | 176304993 Scotch Tape Mail Perm Masking Tape Tray | $0.01 | below range | $10.11 | median price of the same kind of item |
| Office Supplies | 189186333 Homedics Demo 6 Sht Micro Cut Shrddr Bd-m600 Disp | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 222427303 Homedics Demo 10 Sht Shredder Bd-10p Disp | $0.01 | below range | $39.76 | comparable item: HoMedics Black & Decker BD-61 Shredder |
| Office Supplies | 262611765 Label Refrigerate APOT 1000 | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 430257767 Homedics Demo 6 Sht Cross Cut Shrddr Bd-s600 Disp | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 580503573 Hairitage Department Manager Envelope | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 595643923 WMT.com Preorder Dummy UPC 19 | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 796069376 Homedics Demo 8 Sht Shredder Cc-800a Disp | $0.01 | below range | $46.05 | median price of the same kind of item |
| Office Supplies | 804138881 Licensed Bts Train - Highlighter | $0.01 | below range | $10.33 | median price of the same kind of item |
| Office Supplies | 841321478 Interactive Commicat Crk Select Card | $0.01 | below range | $39.00 | comparable item: Interactive Commicat Uscell $39 Card |
| Office Supplies | 882625329 Colorbok Wm 28 Slot Paper Rack Display | $0.01 | below range | $23.08 | median price of its category |
| Office Supplies | 934457020 Licensed Bts Train - Marker | $0.01 | below range | $9.97 | median price of the same kind of item |
| Office Supplies | 2744224351 Jabra Walmart 1ft Display | $0.01 | below range | $29.99 | median price of its category |
| Office Supplies | 5853809546 BHG MAGNETIC STRIP RIVER GOLD O/S | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 15616472437 8FT TAPE SIGNAGE 2025 | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 15629123310 4FT TAPE SIGNAGE 2025 | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 15629123311 4FT TAPE BIN STRIP W LTR | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 15645521136 8FT TAPE BIN STRIP W LTR | $0.01 | below range | $14.13 | median price of its category |
| Office Supplies | 16818124328 Winning Ticket Redemption | $0.01 | below range | $14.13 | median price of its category |
| Party & Occasions | 23449654 Dixie Ultra®, GPC92117, 1/8-fold Premium Dinner Napkins, 400 / Carton, | $99.97 | far above the same kind of item | $80.77 | comparable item: Georgia Pacific 20241 Premium C-Fold Paper Towel,  |
| Party & Occasions | 500143366 PAPER PARTY GOODS EASTER SQUARE 8 PK 7&9IN PLATES/16 CT NAPKINS, Case  | $98.22 | far above the same kind of item | $64.73 | comparable item: GRADUATION PARTY STRAWS 20PK W/PAPER ICON 12PC MER |
| Party & Occasions | 471775171 150pc100ct Foil Pns | $98.10 | far above the same kind of item | $53.13 | comparable item: 24pc74ct Foil Tag A |
| Party & Occasions | 641829583 26" Peanuts 2D Pre-Lit Animated Yard Art Décor Snoopy and Woodstock on | $97.99 | far above the same kind of item | $6.16 | median price of the same kind of item |
| Party & Occasions | 20877220873 RUIE 4-Piece Halloween Pop Up Ghosts Decoration with Gate and LED Ligh | $97.99 | far above the same kind of item | $7.98 | median price of the same kind of item |
| Party & Occasions | 46735903 HOSPECO TASKBrand Linen Replacement Napkins, White, 1000 count | $96.83 | far above the same kind of item | $10.13 | comparable item: Great Value Family Napkins, White, 900 Count |
| Party & Occasions | 39071427 Aristocrat Plastic Plates 10 1/4 Inches, White, Round, 125/Pack | $95.20 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Party & Occasions | 1365558957 Genuine Joe 10-1/4" Large Plastic Plates - 125 / Pack - Disposable - W | $95.16 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Party & Occasions | 21779005 Solo Cup Single-sided Poly Hot Cups - 8 fl oz - 1000 / Carton - Beige  | $93.66 | far above the same kind of item | $6.99 | median price of the same kind of item |
| Party & Occasions | 16474716 9" Paper Plates, White (Pack of 75) | $92.34 | far above the same kind of item | $3.95 | comparable item: Paper Plates, 9 in, White, 20ct |
| Party & Occasions | 1548261248 VEVOR 2-Person Ice Fishing Shelter Tent Portable Pop Up House Outdoor  | $91.51 | far above the same kind of item | $7.98 | median price of the same kind of item |
| Party & Occasions | 782906823 JAM Paper Medium Round Plastic Plates, Sea Blue, 9", 200 per Pack | $90.63 | far above the same kind of item | $7.74 | comparable item: JAM Paper Round Plastic Plates, Purple, 7", 20 per |
| Party & Occasions | 40593717 Silhouette Black Plastic Plates | $90.13 | far above the same kind of item | $1.60 | comparable item: 7" Black Plastic Plates, 12ct |
| Party & Occasions | 374604554 Halloween T Frozen Astm | $90.00 | far above the same kind of item | $9.94 | comparable item: Frozen Wig Astm |
| Party & Occasions | 396331611 8pct Frozen 2 Sea D | $90.00 | far above the same kind of item | $60.00 | comparable item: 4pct Frozen 2 Sea D |
| Party & Occasions | 985079647 T Frozen 2 Astm | $90.00 | far above the same kind of item | $9.94 | comparable item: Frozen Wig Astm |
| Party & Occasions | 512349604 Seasonal 30in Foil Blue Wrap | $89.64 | far above the same kind of item | $8.39 | comparable item: Carolina Panthers Gift Bag/Gift Wrap, 2-Pack, Blue |
| Party & Occasions | 46735459 Hoffmaster Dinner Napkins, 2-ply, 15 X 1 | $89.47 | far above the same kind of item | $3.44 | comparable item: Touch of Color Dinner Napkins, 2-Ply, 1/8 Fold, Pu |
| Party & Occasions | 382135088 6in Peeps Bunny Sk | $89.23 | far above the same kind of item | $1.96 | comparable item: YELLOW BUNNY |
| Party & Occasions | 853300314 Northlight Lighted Inflatable Happy Birthday Cake Outdoor Decoration - | $88.33 | far above the same kind of item | $71.67 | comparable item: 4' Inflatable Lighted Happy Birthday Bear Outdoor  |
| Party & Occasions | 698888535 Cascades PRO Select Dinner Napkins, 2-Ply, White, 16 3/4 x 14 3/4, 150 | $88.27 | far above the same kind of item | $46.85 | comparable item: Cascades Decor 1-Ply Dinner Napkins, White, 375 co |
| Party & Occasions | 253967573 (500 pcs) 9" in Round Disposable Plates - Natural Sugarcane Bagasse Ba | $87.34 | far above the same kind of item | $18.99 | comparable item: (100 pcs) 9" in Round Disposable Plates - Natural  |
| Party & Occasions | 186856130 Bone Plastic Coffee Cups - 8oz Square Mugs with Handle - Disposable or | $85.71 | far above the same kind of item | $10.85 | comparable item: White Plastic Coffee Cups - 8oz Square Mugs with H |
| Party & Occasions | 39071452 Genpak Silhouette Black Plastic Plates, 6 Inches, Round, 125/Pack | $85.69 | far above the same kind of item | $19.99 | comparable item: Hanna K Plastic Plates, Round, 10", Black, 50 Ct |
| Party & Occasions | 992973694 Cascades North River ServRite Dispenser Napkins, 1-Ply, 5x6 1/2, White | $85.47 | far above the same kind of item | $77.68 | comparable item: Cascades North River ServRite 1-Ply Dispenser Napk |
| Party & Occasions | 690090223 Safavieh Naka 2 Tier Outdoor Copper Beverage Tub with Stand | $84.99 | far above the same kind of item | $4.93 | median price of the same kind of item |
| Party & Occasions | 17197068 Canel's Rainbow Mix Candy, 48 oz (Pack of 12) | $84.96 | far above the same kind of item | $10.88 | comparable item: Now and Later Original Mix Candy Bag, 22 Oz |
| Party & Occasions | 24405383 Morcon Paper Dinner Napkins, 2-Ply, 15 x 17, White, 100/Pack, 30 Packs | $84.94 | far above the same kind of item | $62.78 | comparable item: Morcon Tissue Morsoft Dispenser Napkins, 1-Ply, 11 |
| Party & Occasions | 834587746 FirsTime & Co. Silver Homestead Outdoor Beverage Tub, Farmhouse, Aged, | $83.86 | far above the same kind of item | $4.93 | median price of the same kind of item |
| Party & Occasions | 453481490 Christmas Airblown Inflatables Animated POP-Up Dog Gift Box, 2.7 ft. | $82.60 | far above the same kind of item | $53.10 | comparable item: Gemmy Airblown Inflatables Christmas Inflatable 9' |
| Party & Occasions | 39893647 Argento Black Plastic Cutlery Set - with White Napkin, Polka Dot Ribbo | $81.78 | far above the same kind of item | $18.75 | comparable item: Design Imports Z02035 Polka Dot Napkin - Red & Whi |
| Party & Occasions | 42450821 Genpak Aristocrat Plastic Plates, 9 Inches, White, Round, 125/Pack | $79.61 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Party & Occasions | 839280842 JAM Paper Small Round Plastic Plates, Purple, 7", 200 per Pack | $78.26 | far above the same kind of item | $7.74 | comparable item: JAM Paper Round Plastic Plates, Purple, 7", 20 per |
| Party & Occasions | 51935230 Genpak Aristocrat Plastic Plates, 6 Inches, White, Round, 125/Pack (70 | $76.86 | far above the same kind of item | $7.05 | median price of the same kind of item |
| Party & Occasions | 788183165 4.5 ft. L Christmas Yard Inflatables Peanuts Snoopy In Airplane Scene | $75.99 | far above the same kind of item | $32.56 | comparable item: Holiday Time Yard Inflatables Peanuts: Snoopy, 5 f |
| Party & Occasions | 228052149 Bulk Patriotic Cardstock Headbands - Apparel Accessories - 144 Pieces | $73.98 | far above the same kind of item | $51.74 | comparable item: Bulk Glitter Patriotic Star Headbands - Apparel Ac |
| Party & Occasions | 940697033 Way To Celebrate 12pcse Ss Peeps T | $71.76 | far above the same kind of item | $4.88 | median price of the same kind of item |
| Party & Occasions | 382855810 Foil Horns With Tassel Pk/100 | $69.99 | far above the same kind of item | $6.98 | comparable item: Beistle 9" Foil Horns Silver 30/Pack 88092-S |
| Party & Occasions | 10982421506 PEEPS IRIDESCENT AST | $65.37 | far above the same kind of item | $4.88 | median price of the same kind of item |
| Party & Occasions | 945124288 Sugarfiber Disposable 7 inch Compostable Natural Round Small Paper Pla | $63.38 | far above the same kind of item | $17.59 | comparable item: Sugarfiber Disposable 7 inch Compostable Natural R |
| Party & Occasions | 239148094 24in Peeps Bunny Asm | $55.43 | far above the same kind of item | $1.96 | comparable item: YELLOW BUNNY |
| Party & Occasions | 302789365 Way to Celebrate 20 count Cello Easter Mini Treat Bags 4"x6" with 20 W | $0.09 | below range | $2.58 | comparable item: Way to Celebrate 20ct Cello Easter Treat Bags 4"x9 |
| Party & Occasions | 710230799 Premium Hard Plastic 9 OZ Party Cups l Old Fashioned Tumblers 9-Ounce  | $0.09 | below range | $17.97 | median price of the same kind of item |
| Party & Occasions | 481025898 Premium Hard Plastic 9 OZ Party Cups l Old Fashioned Tumblers 9-Ounce  | $0.06 | below range | $102.03 | median per-unit price of comparable items |
| Party & Occasions | 126946337 Way To Celebrate Easter Bunny Ears Headband | $0.05 | below range | $2.04 | comparable item: Way To Celebrate Easter Bunny Ears Headband |
| Party & Occasions | 127401259 Celebrations 32h Xl: Hvd White Heart Pink & Red | $0.05 | below range | $2.37 | comparable item: Celebrations 18h Xl: Hvd White Heart Pink & Red |
| Party & Occasions | 203224987 Way To Celebrate Easter Pom Pom Bunny Ear Headband | $0.05 | below range | $1.61 | comparable item: Way To Celebrate Easter Bunny Ear Headband |
| Party & Occasions | 368147709 Way To Celebrate Easter Bunny Ear Headband | $0.05 | below range | $1.38 | comparable item: Way To Celebrate Easter Bunny Ear Headband |
| Party & Occasions | 950407817 Way To Celebrate Easter Gold Tone Crown Headband | $0.05 | below range | $4.88 | comparable item: Way To Celebrate Silver Crown Headband for Easter |
| Party & Occasions | 16361104855 Mainstays Red Bow Round Plastic Plate, 10.5 in | $0.05 | below range | $0.50 | comparable item: Mainstays - Red Round Plastic Plate, 10.5-inch |
| Party & Occasions | 138915089 Seasonal Happy Birthday Printed Streamer | $0.03 | below range | $5.44 | comparable item: Happy Birthday Jointed Banner, 1pk |
| Party & Occasions | 982372034 CARDBOARD 8 PEG SIDEKICK | $0.02 | below range | $12.25 | median price of its category |
| Party & Occasions | 685698692 Greeting Cards* | $0.01 | below range | $13.93 | median price of the same kind of item |
| Party & Occasions | 808660381 Harman Party Box Demo Station | $0.01 | below range | $12.25 | median price of its category |
| Party & Occasions | 944017180 Eero Pdq With Pull Cards | $0.01 | below range | $12.25 | median price of its category |
| Party & Occasions | 5395277452 Trend Pod WOW Header - DAP 5005 | $0.01 | below range | $18.52 | median price of its category |
| Party & Occasions | 5875461851 Wk 27 Trend Pod WOW Header - DAP 5064 | $0.01 | below range | $18.52 | median price of its category |
| Personal Care | 509970023 Equate 1119pc Suncare S2 | $9,961.41 | above range | $11.36 | median price of its category |
| Personal Care | 2699924679 Oral B 371pc Orl-shv Holplt | $8,842.66 | above range | $10.80 | median price of its category |
| Personal Care | 571508302 Equate 964pc Suncare S1 | $7,458.51 | above range | $11.36 | median price of its category |
| Personal Care | 5083752440 Gillette Intimate Electric Pubic Hair Trimmer for Men, Waterproof Body | $6,719.35 | above range | $44.94 | comparable item: Gillette Intimate i3 Men's Pubic Hair Electric Tri |
| Personal Care | 698840638 10" King Organic cotton and wool futon mattress | $3,544.50 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 737041537 8" King Organic cotton and wool futon mattress | $3,053.01 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 797413258 100 Cases of 12 Pink Pearlized Liquid Lotion Hand Wash Soap 800-ml Dis | $2,845.38 | above range | $13.99 | median price of the same kind of item |
| Personal Care | 18871403857 588 pc ICE BREAKER I-CUBE AST H MOD | $2,751.84 | above range | $435.94 | median per-unit price of comparable items |
| Personal Care | 913487169 10" Full Organic cotton and wool futon mattress | $2,385.92 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 717610670 10" Queen Organic cotton and wool futon mattress | $2,371.59 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 796455643 8" Queen Organic cotton and wool futon mattress | $2,212.25 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 768783691 3" King Organic cotton and wool futon mattress | $2,017.55 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 874876709 8" Twin Organic cotton and wool futon mattress | $1,789.67 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 37066098 DreamLine 34 in. D x 60 in. W x 75 5/8 in. H Right Drain Acrylic Showe | $1,589.99 | above range | $836.00 | comparable item: DreamLine 34 in. D x 60 in. W x 76 3/4 in. H Right |
| Personal Care | 37066063 DreamLine 34 in. D x 60 in. W x 75 5/8 in. H Center Drain Acrylic Show | $1,551.77 | above range | $936.00 | comparable item: DreamLine 34 in. D x 60 in. W x 76 3/4 in. H Cente |
| Personal Care | 249083577 3" Twin XL Organic cotton and wool futon mattress | $1,498.98 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 663182840 Equate 144pc Eq Sun Twin Hp | $1,437.12 | above range | $715.54 | comparable item: EQ 20PC SK BTB BARBI |
| Personal Care | 163322686 5" Full Organic cotton and wool futon mattress | $1,422.49 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 845651311 5" Twin XL Organic cotton and wool futon mattress | $1,396.60 | above range | $39.94 | median price of the same kind of item |
| Personal Care | 13474424820 Dove Superbowl End Cap | $1,240.00 | above range | $10.80 | median price of its category |
| Personal Care | 17033618829 80 pc PlusOne Menopause Awareness Month Feature | $1,195.00 | above range | $15.99 | median price of its category |
| Personal Care | 37066080 DreamLine 34 in. D x 60 in. W x 75 5/8 in. H Left Drain Acrylic Shower | $1,159.99 | above range | $936.00 | comparable item: DreamLine 34 in. D x 60 in. W x 76 3/4 in. H Cente |
| Personal Care | 23520843 Portable Cordless Water Flosser – Rechargeable Oral Irrigator with 3 P | $1,143.90 | above range | $35.99 | comparable item: Water Flosser Cordless,Bestller Portable Rechargea |
| Personal Care | 564878001 Intuition Women's Razor System 152Pc Ec F'18 | $1,136.92 | above range | $13.13 | median price of the same kind of item |
| Personal Care | 144189622 Haws AXION MSR Combination Eye/Face Wash And Shower | $1,105.88 | above range | $10.32 | median price of the same kind of item |
| Personal Care | 283406569 Secret 141pc Os Sec Sprayec | $1,003.77 | above range | $38.47 | median per-unit price of comparable items |
| Personal Care | 824611914 Bic Mixed Shave Display | $1,003.30 | above range | $262.08 | comparable item: BIC Mixed Shave Disp |
| Personal Care | 30519002 DreamLine 34 in. D x 60 in. W x 76 3/4 in. H Left Drain Acrylic Shower | $985.99 | above range | $936.00 | comparable item: DreamLine 34 in. D x 60 in. W x 76 3/4 in. H Cente |
| Personal Care | 637056825 Oralb 3d White 120pc Bts Gum Ec Cul | $810.21 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 628106299 Active Wow Natural Gel Formula Kids Toothpaste, Berry Bubblegum, 4 oz | $768.04 | far above the same kind of item | $12.09 | comparable item: Nature's Gate Natural Toothpaste Gel For Kids Cher |
| Personal Care | 3594854654 Sept LE Soap SK | $574.08 | far above the same kind of item | $13.99 | median price of the same kind of item |
| Personal Care | 581311711 Hello Oral Care 108pc Charcoal | $535.16 | far above the same kind of item | $23.09 | median per-unit price of comparable items |
| Personal Care | 176011101 Crest 3d White 70pc Cr Tp/mw Gum Pd | $526.38 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 1837195231 pop up vibe display | $502.92 | far above the same kind of item | $10.48 | median price of the same kind of item |
| Personal Care | 5402497557 Braun Smart IPL Laser Hair Removal for Women, Skin i Expert 7243, Perm | $499.99 | far above the same kind of item | $199.94 | comparable item: Braun IPL Silk-Expert Mini Laser Hair Removal at H |
| Personal Care | 51498571 Straight Razor Horn | $479.78 | far above the same kind of item | $61.75 | comparable item: Straight Razor |
| Personal Care | 5460233641 Back to School Razor | $478.92 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 5338513396 Braun Series 9 PRO+ Men's Face Electric Razor with Shaver Care Cartrid | $459.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 37961661 Hansgrohe Axor 40819820 Starck Soap/Lotion Dispenser Wall-Mounted with | $452.49 | far above the same kind of item | $33.79 | median per-unit price of comparable items |
| Personal Care | 139755787 Straight Razor Horn Handle | $450.00 | far above the same kind of item | $87.67 | comparable item: Shavette Straight Razor |
| Personal Care | 48813361 Remington iLIGHT® Pro PLUS Quartz Intense Pulsed Light Hair Removal Sy | $437.91 | far above the same kind of item | $195.58 | comparable item: Remington i-Light Pro IPL6000 - Hair removal syste |
| Personal Care | 11058109956 Display Folder Liquid Soap – 16oz 2 Flavors (Lavender and Peppermint) | $431.00 | far above the same kind of item | $13.99 | comparable item: Dr. Bronner's Organic Sugar Soap – Peppermint – 24 |
| Personal Care | 5409231083 Braun Silk·expert Pro 5, PL5145 Women & Men’s IPL, At-Home Long Lastin | $419.97 | far above the same kind of item | $229.94 | comparable item: Braun Silk Expert Pro 3 PL3012 Latest Generation I |
| Personal Care | 16508956781 Holiday 2025 Soap Sidekick | $383.04 | far above the same kind of item | $127.04 | comparable item: Dove Winter Holiday - Sidekick |
| Personal Care | 22684989 Hospital Specialty Co. Electronic Vendor Dual Sanitary Napkin/Tampon D | $362.72 | far above the same kind of item | $9.84 | median price of the same kind of item |
| Personal Care | 433655420 Free $50 e-Gift Card with Braun Silk·expert 5 IPL + Gillette Venus Pla | $359.94 | far above the same kind of item | $72.94 | comparable item: Free $30 e-Gift Card with FaceSpa 851 - Mini-Facia |
| Personal Care | 20201672757 Braun 9617S PRO+ Electric Razor for Men, with Precision Trimmer, Silve | $358.89 | far above the same kind of item | $79.97 | comparable item: Braun Electric Razor for Men Series 6, Electric Sh |
| Personal Care | 962682270 Braun Silk Expert Pro 5 PL5117 Latest Generation IPL, Long-Lasting Hai | $349.94 | far above the same kind of item | $229.94 | comparable item: Braun Silk Expert Pro 3 PL3012 Latest Generation I |
| Personal Care | 3113792724 Oral-B Toothbrush, iO Series 10 Rechargeable Electric Toothbrush with  | $349.94 | far above the same kind of item | $39.94 | comparable item: Oral-B iO Toothbrush Heads, Ultimate Clean Replace |
| Personal Care | 448717011 Salient Folding Razor | $342.43 | far above the same kind of item | $14.79 | comparable item: Folding Razor |
| Personal Care | 649159740 TOOTHBRUSH WHITE HEAD | $338.24 | far above the same kind of item | $14.90 | comparable item: Oral-B Ortho Electric Toothbrush Replacement Head, |
| Personal Care | 2734445843 Fresh Falls Bar Soap | $334.88 | far above the same kind of item | $6.38 | comparable item: Lever 2000 Original Bar Soap 4 oz, 6 Bar |
| Personal Care | 3444044771 Pine Tar Bar Soap 56 | $334.88 | far above the same kind of item | $5.16 | comparable item: The Grandpa Soap Pine Tar Bar Soap 4.25 oz |
| Personal Care | 642120718 Home Electrolysis Hair Removal Smooth Skin Home Kit Treatment Pads | $328.63 | far above the same kind of item | $10.70 | median price of the same kind of item |
| Personal Care | 216676264 Home Electrolysis Hair Removal Smooth Skin Home Kit Treatment Pads | $312.98 | far above the same kind of item | $14.94 | median price of the same kind of item |
| Personal Care | 55428730 Braun Gillette Venus Silk-Expert IPL 5001, Face & Body Hair Removal Sy | $310.08 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 33016486 Hansgrohe 40819000 Chrome AX Starck Soap/Lotion Dispenser | $309.49 | far above the same kind of item | $90.52 | comparable item: Delta RP1002 Soap / Lotion Dispenser, Chrome |
| Personal Care | 39448851 Philips Norelco 9300 Razor | $306.15 | far above the same kind of item | $116.83 | comparable item: Norelco 8060x Razor |
| Personal Care | 940335651 IGIA Cordless and Rechargeable Hair, Mustache, and Beard Trimmer | $300.00 | far above the same kind of item | $19.99 | comparable item: Cordless and Rechargeable Hair, Mustache, and Bear |
| Personal Care | 50315482 Gillette Venus Silk-expert IPL 5001 (Intense Pulsed Light) Body Hair R | $299.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 871718465 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $299.95 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 395795320 Oral-B Toothbrush, iO Series 9 Electric Toothbrush with 4 Brush Heads, | $299.94 | far above the same kind of item | $7.50 | median per-unit price of comparable items |
| Personal Care | 597161998 Oral-B Toothbrush, iO Series 9 Electric Toothbrush with 4 Brush Heads, | $299.94 | far above the same kind of item | $7.50 | median per-unit price of comparable items |
| Personal Care | 581982658 Golden Moments Set Featuring Womanizer Premium Pleasure Air and We-Vib | $299.00 | far above the same kind of item | $14.89 | median price of the same kind of item |
| Personal Care | 611256390 Philips Sonicare Diamondclean Smart 9700 Rose Gold Rechargeable Toothb | $294.49 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 119344058 Sisleyum Anti-Age Global Revitalizer - For Normal Skin by Sisley for M | $288.49 | far above the same kind of item | $10.05 | comparable item: Homme Aquatic After Shave Lotion (Normal Skin) by  |
| Personal Care | 676087036 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $281.61 | far above the same kind of item | $26.20 | median per-unit price of comparable items |
| Personal Care | 19237231 Philips Sonicare DiamondClean Electric Rechargeable Toothbrush HX9332, | $279.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 15105098 Braun Series 7 790cc ($40 Instant Coupon Available) Men's Electric Foi | $279.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 5408898189 Braun Series 8 Electric Razor for Men, Electric Shaver, 5in1 SmartCare | $279.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 520320190 Straight Razor Bismark | $275.00 | far above the same kind of item | $87.67 | comparable item: Shavette Straight Razor |
| Personal Care | 681573930 FREE $40 Gift Card with Braun Series 9 9293s Men's Electric Foil Shave | $269.99 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 262773888 Oral-B Toothbrush, iO Series 9 Electric Toothbrush with 4 Brush Heads, | $269.95 | far above the same kind of item | $7.50 | median per-unit price of comparable items |
| Personal Care | 50966555 Straight Razor White | $263.42 | far above the same kind of item | $15.52 | comparable item: Union Razors Straight Edge Razor White |
| Personal Care | 146920138 Lasio Keratin-Infused Treatment One Day Formula 35.27 Fl. Oz | $261.34 | far above the same kind of item | $65.80 | comparable item: Lasio Keratin-Infused Hypersilk Replenishing Shamp |
| Personal Care | 904577991 Braun Series 9 Pro Electric Razor for Men with Clean Station, Recharge | $259.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 863877843 Free $50 Gift Card with Braun Series 9 9290cc Men's Electric Foil Shav | $259.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 14350067480 WM 32pc Shave Oil 6o | $255.00 | far above the same kind of item | $12.45 | median price of the same kind of item |
| Personal Care | 6043662 Norelco 1050x Razor | $251.62 | far above the same kind of item | $116.83 | comparable item: Norelco 8060x Razor |
| Personal Care | 304501047 BONUS $30 eGift Card - Braun Series 9 9290cc Men's Electric Foil Shave | $250.95 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 429781611 Oral-B 8000 Electronic Toothbrush ($20 Rebate Eligible), White, Powere | $249.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 538740199 Oral-B 8000 Electronic Toothbrush, Black, Powered by Braun | $249.99 | far above the same kind of item | $52.47 | median per-unit price of comparable items |
| Personal Care | 848111535 Philips Sonicare Power Flosser & Toothbrush System 7000, HX3921/40 | $249.99 | far above the same kind of item | $89.99 | comparable item: Philips Sonicare Power Flosser 3000, HX3711/20 |
| Personal Care | 992683299 Oral-B Genius 8000 Electronic Rechargeable Toothbrush with 3 Brush Hea | $249.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 2388440037 Braun Silk·expert Pro 3, PL3221 IPL for Women and Men, At-Home Hair Re | $249.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 566483050 FREE $30 Gift Card with Braun Series 9 9290cc Men's Electric Foil Shav | $249.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 572482764 Oral-B Pro 3500 SmartSeries Healthy Whitening Rechargeable Toothbrush  | $249.94 | far above the same kind of item | $14.98 | comparable item: Oral-B Toothbrush Pro Whitening, Soft, 6 Count |
| Personal Care | 884605760 pumkin soap | $247.43 | far above the same kind of item | $9.28 | comparable item: Hawaiian Naturals Soap |
| Personal Care | 305780200 Personal Hygiene Cleanser Bulb | $243.90 | far above the same kind of item | $12.10 | comparable item: Sanitary Bulb Toilet Personal Hygiene Cleanser Bul |
| Personal Care | 2240393264 Toilet Bath Bomb Shi | $240.00 | far above the same kind of item | $5.00 | comparable item: BATH BOMB |
| Personal Care | 390240045 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $239.95 | far above the same kind of item | $6.55 | median per-unit price of comparable items |
| Personal Care | 460484353 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $239.95 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 833551133 Philips Sonicare DiamondClean Smart Electric, Rechargeable toothbrush  | $239.95 | far above the same kind of item | $26.20 | median per-unit price of comparable items |
| Personal Care | 845173579 Philips Sonicare DiamondClean Smart Electric, Rechargeable toothbrush  | $239.95 | far above the same kind of item | $6.55 | median per-unit price of comparable items |
| Personal Care | 867597297 Philips Sonicare ($20 Rebate Available) Diamond Clean Smart Electric R | $239.95 | far above the same kind of item | $6.55 | median per-unit price of comparable items |
| Personal Care | 9231061099 WM Body Lotion Sidew | $239.28 | far above the same kind of item | $15.99 | comparable item: Sophie la girafe Body Lotion |
| Personal Care | 14784055849 WM Shave Oil SDK (24 | $239.00 | far above the same kind of item | $12.45 | median price of the same kind of item |
| Personal Care | 8366163092 GN Oil Pulling 3 oz | $238.56 | far above the same kind of item | $1.71 | median per-unit price of comparable items |
| Personal Care | 265635577 Dollar Shave Club 4-Blade Razor Bundle for All-Terrain Shaving, 1 Hand | $237.12 | far above the same kind of item | $9.88 | comparable item: Dollar Shave Club 4-Blade Razor Bundle for All-Ter |
| Personal Care | 44679863 Philips Sonicare FlexCare Platinum 8 Series Sonic Rechargeable Toothbr | $230.75 | far above the same kind of item | $51.91 | comparable item: Philips Sonicare Plaque Control 2 Series Sonic Too |
| Personal Care | 16731451664 Bubble Bath Sidekick Q3 2025 | $230.38 | far above the same kind of item | $7.98 | comparable item: Burt's Bees Bubble Bath |
| Personal Care | 934073582 SONIC TOOTHBRUSH WHITE | $230.00 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 230938121 FREE $40 Gift Card with Braun Series 9-9290cc Men's Electric Foil Shav | $229.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 164444521 T Razor Black | $229.00 | far above the same kind of item | $16.66 | comparable item: Union Razors Razor Black |
| Personal Care | 5374128869 Womanizer Next 3D Clitoral Stimulator with Climax Control, Powerful Cl | $229.00 | far above the same kind of item | $11.52 | median price of the same kind of item |
| Personal Care | 44679867 Philips Sonicare HX9372/04 Diamond Clean Rechargeable Toothbrush Ameth | $224.97 | far above the same kind of item | $40.96 | comparable item: Philips Sonicare HX9903/01 Toothbrush with HX9052/ |
| Personal Care | 15052902 Philips Norelco Electric Razor, 1 ea | $223.88 | far above the same kind of item | $39.97 | comparable item: Philips Norelco Electric Razor, 1 ea |
| Personal Care | 189209249 Oral-B 7000 SmartSeries Rechargeable Power Toothbrush with 3 Replaceme | $219.97 | far above the same kind of item | $44.97 | median per-unit price of comparable items |
| Personal Care | 254038397 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $219.96 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 627292753 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $219.96 | far above the same kind of item | $26.20 | median per-unit price of comparable items |
| Personal Care | 728960966 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $219.96 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 949014373 Philips Sonicare Diamondclean Smart Electric, Rechargeable Toothbrush  | $219.96 | far above the same kind of item | $6.55 | median per-unit price of comparable items |
| Personal Care | 15061075 Philips Norelco 1250cc Norelco Razor | $219.95 | far above the same kind of item | $116.83 | comparable item: Norelco 8060x Razor |
| Personal Care | 238869304 FC2 Female Condoms 12 ea | $219.00 | far above the same kind of item | $16.87 | comparable item: FC2 Female Condoms, 21 count |
| Personal Care | 6959741 Braun Series 7 760CC - Shaver - cordless | $217.97 | far above the same kind of item | $139.99 | comparable item: Braun Series 5 550 CC - Shaver - cordless - black |
| Personal Care | 28812534 Philips Norelco 8000 series 1290X - Shaver - cordless - black | $217.49 | far above the same kind of item | $120.00 | comparable item: Philips Norelco 8000 series 1290X - Shaver - cordl |
| Personal Care | 9113058633 WM Body Lotion Sidew | $216.00 | far above the same kind of item | $15.99 | comparable item: Sophie la girafe Body Lotion |
| Personal Care | 21672299 Braun 3 Series 350CC-4 Razor Special Value Pack with Bonus Travel Shav | $213.80 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 20159923554 Philips Beauty Set - All-In-One Set For Body and Face, Cordless Wet an | $209.95 | far above the same kind of item | $79.95 | comparable item: Philips Epilator Series 8000 - Cordless Wet and Dr |
| Personal Care | 17117819 Philips Sonicare Flexcare Rechargeable Power Toothbrush with UV Saniti | $207.14 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 51086248 Straight Razor Tortoise | $205.78 | far above the same kind of item | $129.99 | comparable item: Straight Razor Tortoise Inlay |
| Personal Care | 571568509 Philips Norelco SW9700 Star Wars Dark Side - Shaver - cordless | $205.60 | far above the same kind of item | $129.95 | comparable item: Philips Norelco SW6700 Star Wars Rebellion - Shave |
| Personal Care | 22843090 Panasonic ES-LT71-S Arc3 Electric Razor Mens Wet/Dry with Clean&Charge | $204.74 | far above the same kind of item | $89.99 | comparable item: Panasonic Arc3 3-Blade Electric Shaver with Automa |
| Personal Care | 993338342 RAZOR 2PK PERSONNA TWIN BLADE RUBBER GRIP, Case Pack of 288 | $201.96 | far above the same kind of item | $78.00 | comparable item: RAZORS WOMENS TWIN BLADE 10PK PEGGABBLE XTRA CARE, |
| Personal Care | 35059941 BATH SPONGE 2-TONE/TRICOLOR/& 4 SOLIDS 12ASST IN 120PC PVC TUBE, Case  | $201.63 | far above the same kind of item | $5.64 | median price of the same kind of item |
| Personal Care | 47218296 Sonicare FlexCare Platinum Toothbrush with $20 gift card | $200.58 | far above the same kind of item | $20.00 | comparable item: Sonicare FlexCare Platinum Grey w/o sanitizer Toot |
| Personal Care | 846283194 The Art Of Shaving Engraved Fusion Razor, Nickel | $200.00 | far above the same kind of item | $89.99 | comparable item: The Art Of Shaving Fusion Razor, Ivory And Nickel |
| Personal Care | 1855084962 Philips Sonicare 9000 Special Edition Rechargeable Toothbrush, Blue Bl | $199.96 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 5538428884 Philips Sonicare DiamondClean 9000 Special Edition Adult Rechargeable  | $199.96 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 265845874 FREE $25 Gift Card with Braun Series 7 760cc-4 Electric Foil Shaver wi | $199.94 | far above the same kind of item | $17.71 | median price of the same kind of item |
| Personal Care | 384222488 BONUS $30 eGift Card with Braun Series 9 9290cc Men's Electric Foil Sh | $199.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 509771333 Free $25 Gift Card with Braun Series 7 7865cc Men's Electric Foil Shav | $199.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 713405937 FREE $30 Gift Card with Braun Series 7 7865cc Men's Electric Foil Shav | $199.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 5419052297 Axe Fine Fragrance 4 | $199.50 | far above the same kind of item | $7.98 | comparable item: Axe Fine Fragrance Collection Antiperspirant Deodo |
| Personal Care | 48278110 Sonicare Diamond Clean Toothbrush Pink with $20 Gift Card | $199.45 | far above the same kind of item | $20.00 | comparable item: Sonicare Diamond Clean Pink $20 with $20 gift card |
| Personal Care | 37324741 Boker Arbolito Straight Razor Knife | $199.04 | far above the same kind of item | $107.27 | comparable item: Boker King Cutter Straight Razor Knife |
| Personal Care | 5448250271 Old Spice Whole Body | $197.46 | far above the same kind of item | $11.39 | median price of the same kind of item |
| Personal Care | 140402653 Colgate Palmolive CPC50130 0.15 oz Tube Regular Flavor Cavity Protecti | $195.55 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 869836486 Bismarck Straight Razor | $194.73 | far above the same kind of item | $87.67 | comparable item: Shavette Straight Razor |
| Personal Care | 41756207 Razolution Straight Razor | $193.69 | far above the same kind of item | $111.14 | comparable item: Razolution Straight Razor |
| Personal Care | 194715499 Colgate Cavity Protection Travel Toothpaste with Fluoride - 0.85 oz | $192.79 | far above the same kind of item | $0.69 | median per-unit price of comparable items |
| Personal Care | 1409064972 Gold Bond Powder 24 | $191.28 | far above the same kind of item | $8.97 | comparable item: Mo Barcelona Powder |
| Personal Care | 981449430 IPL Permanent Hair Eliminator Razor With Intense Pulsed Light Technolo | $190.61 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 105112797 Straight Razor Carbon | $189.99 | far above the same kind of item | $105.11 | comparable item: Straight Razor Carbon Fiber |
| Personal Care | 10747596 Philips Norelco 1090 arcitec Rechargeable Cordless Tripleheader Electr | $189.97 | far above the same kind of item | $120.00 | comparable item: Norelco Shaver 4500 (AT830) PowerTouch Rechargeabl |
| Personal Care | 1485889590 Braun Electric Razor for Men Series 7, Electric Shaver, 4-in-1 Clean & | $189.97 | far above the same kind of item | $17.36 | comparable item: Braun Series 8 Electric Razor for Men, Electric Sh |
| Personal Care | 48173548 Sonicare Diamond Clean Toothbrush Pink with $15 Gift Card | $189.95 | far above the same kind of item | $20.00 | comparable item: Sonicare Diamond Clean Pink $20 with $20 gift card |
| Personal Care | 48278107 Sonicare Diamond Clean Toothbrush with $20 Gift Card | $189.95 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 48278109 Sonicare Diamond Clean Toothbrush Black with $20 Gift Card | $189.95 | far above the same kind of item | $20.00 | comparable item: Sonicare Diamond Clean Black with $20 gift card |
| Personal Care | 43598944 Straight Razor Carbon | $188.99 | far above the same kind of item | $105.11 | comparable item: Straight Razor Carbon Fiber |
| Personal Care | 2159059386 Philips Sonicare 9000 Special Edition Rechargeable Toothbrush, Black/P | $188.49 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 121082545 Fuel Scents Dildo Realistic No Oil Scent compatible with Machine for H | $186.62 | far above the same kind of item | $93.31 | comparable item: Fuel Scents Dildo Realistic No Oil Scent compatibl |
| Personal Care | 158012533 Stiff Toothbrush Toothbrushes Individually Wrapped Kids Girls Toothbru | $186.62 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 175575808 Toothbrush Boys Toothbrush for Toothbrush Tooth Cap Tongue Cleaning An | $186.62 | far above the same kind of item | $90.72 | comparable item: Toothbrush Boys Toothbrush for Toothbrush Tooth Ca |
| Personal Care | 180502228 Products for Damaged Hair Hair plus Products Hair Restoration Leave in | $186.62 | far above the same kind of item | $139.97 | comparable item: Hair Conditioner for Damaged Hair Curl Leave in Co |
| Personal Care | 184197445 in Shower Moisturizer Face Lotion Men Care Ve Hydrating Moisturizer Cu | $186.62 | far above the same kind of item | $10.72 | median price of the same kind of item |
| Personal Care | 186342579 4100 Disposal Coverings Travel Soft Small Toothbrush Steel Toothbrush  | $186.62 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 765210226 BK, BKEBKWIPES, Hand Sanitizing Wipes, 2400 / Carton, White | $186.14 | far above the same kind of item | $5.78 | comparable item: Nice 'N Clean Sanitizing Hand Wipes, 20 Count |
| Personal Care | 6044721462 42pc165g Bath Bomb | $182.25 | far above the same kind of item | $38.98 | comparable item: 46pc80g Bath Bomb A |
| Personal Care | 6064402634 42pc165g Bath Bomb | $182.25 | far above the same kind of item | $38.98 | comparable item: 46pc80g Bath Bomb A |
| Personal Care | 452516292 Soothe & Cool Bath Oil - MSC090472 | $181.47 | far above the same kind of item | $5.08 | comparable item: Soothe & Cool Moisturizing Body Lotion - MSC095362 |
| Personal Care | 657770644 Straight Razor | $181.16 | far above the same kind of item | $111.14 | comparable item: Razolution Straight Razor |
| Personal Care | 15012008922 Summers Eve Assorted | $180.00 | far above the same kind of item | $5.49 | median price of the same kind of item |
| Personal Care | 524144993 Waterpik Sonic-Fusion 2.0 Flossing Toothbrush, Electric Toothbrush & W | $179.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 44679866 Philips Sonicare FlexCare Platinum Rechargeable Toothbrush | $179.95 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 52396942 Philips Sonicare FlexCare Platinum Sonic Electric Rechargeable Toothbr | $179.95 | far above the same kind of item | $37.50 | comparable item: Philips Sonicare Essence Rechargeable Electric Too |
| Personal Care | 6043659 Philips Norelco arcitec 1050CC Flex & Pivot Action - Shaver - cordless | $179.77 | far above the same kind of item | $17.71 | median price of the same kind of item |
| Personal Care | 5285043056 GN Oil Pulling 8oz P | $179.64 | far above the same kind of item | $4.56 | median per-unit price of comparable items |
| Personal Care | 584813988 Straight Razor | $179.55 | far above the same kind of item | $111.14 | comparable item: Razolution Straight Razor |
| Personal Care | 832062680 Boker King Cutter Straight Razor 3.0 in Blade Polymer Handle | $178.75 | far above the same kind of item | $107.27 | comparable item: Boker King Cutter Straight Razor Knife |
| Personal Care | 962824077 Dollar Shave Club 6-Blade Razor Bundle (Grey) with Shave Butter, 1 Han | $178.56 | far above the same kind of item | $14.88 | comparable item: Dollar Shave Club 6-Blade Razor Bundle (Grey) with |
| Personal Care | 47217308 Sonicare FlexCare Platinum Toothbrush with $20 egift card | $178.01 | far above the same kind of item | $20.00 | comparable item: Sonicare FlexCare Platinum Grey w/o sanitizer Toot |
| Personal Care | 640707163 Fractionated Coconut Oil - 5 Gallons Massage Oil Hair Face Dry Skin Bu | $178.00 | far above the same kind of item | $12.24 | median price of the same kind of item |
| Personal Care | 395752064 The Art of Shaving Lexington Collection 5 Blade Power Razor | $175.00 | far above the same kind of item | $100.00 | comparable item: Lexington Collection |
| Personal Care | 275404096 FREE $40 eGift Card with Braun Series 7 7865cc Men's Electric Foil Sha | $174.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 365096957 FREE $30 eGift Card with Braun Series 7 790cc Men's Electric Foil Shav | $174.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 47218359 Sonicare FlexCare Platinum Toothbrush and a $20 Walmart gift card with | $170.50 | far above the same kind of item | $20.00 | comparable item: Sonicare FlexCare Platinum Grey w/o sanitizer Toot |
| Personal Care | 563336065 Johnson & Johnson 32pc J&j Crm Oil Sdk | $170.24 | far above the same kind of item | $95.11 | comparable item: Polident 36PC SDK |
| Personal Care | 50747955 Straight Razor Black | $170.00 | far above the same kind of item | $112.99 | comparable item: Dovo Straight Razor Black |
| Personal Care | 1018929592 Oral-B iO Series 5 Rechargeable Toothbrush Dual Pack | $169.98 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 963537427 FREE Refill Cartridges with Braun Series 7 7865cc Men's Electric Foil  | $169.94 | far above the same kind of item | $149.97 | comparable item: Braun Series 5 5190cc Electric Foil Shaver with Bo |
| Personal Care | 143013048 VVF Amenities DIA00027 1 oz Restore Body Wash, 288 Per Carton | $167.87 | far above the same kind of item | $8.97 | median price of the same kind of item |
| Personal Care | 726465127 Sensodyne 24pc Sens Gum Sen 24 | $167.52 | far above the same kind of item | $55.89 | median per-unit price of comparable items |
| Personal Care | 498660214 BONUS $30 eGift Card - Braun Series 7-790cc Men's Electric Foil Shaver | $167.43 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 1499230334 GC Soap | Mstr Displ | $167.28 | far above the same kind of item | $13.99 | median price of the same kind of item |
| Personal Care | 103784840 Whipped Bath Soap Water Body Wash for Combination Skin Youth Code Glow | $167.23 | far above the same kind of item | $8.97 | median price of the same kind of item |
| Personal Care | 112606915 Women Hair Products Oil Water Topical Foam Fiber Gel for Nails Anomaly | $167.23 | far above the same kind of item | $14.99 | median price of the same kind of item |
| Personal Care | 113317490 Musical Toothbrush for Adults Expensive Items for Teenagers Sensitive  | $167.23 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 125561714 Oil for Oily Skin Skin Care for Aging Skin Is Active Fit Glow Beauty C | $167.23 | far above the same kind of item | $12.45 | median price of the same kind of item |
| Personal Care | 38335630 Philips Sonicare HX6731/34 HealthyWhite Rechargeable Toothbrush | $166.76 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 133564850 Truefitt & Hill Wellington Razor (Fusion) Horn 1Pc | $165.00 | far above the same kind of item | $101.72 | comparable item: Truefitt & Hill Wellington Razor (FUSION) - # Porc |
| Personal Care | 40714636 Panasonic Razor, ES-LF51-A, Men’s Electric 4-Blade Cordless Shaver, We | $163.00 | far above the same kind of item | $50.00 | comparable item: Panasonic ES-RW30-S 2-Blade Men's Electric Shaver, |
| Personal Care | 319750612 The Art of Shaving Power Collection Power Razor | $160.88 | far above the same kind of item | $6.99 | comparable item: Gillette Razor Collection |
| Personal Care | 10747595 Philips Norelco Razor, 1 ea | $159.97 | far above the same kind of item | $79.49 | comparable item: Philips Norelco Razor, 1 ea |
| Personal Care | 462009384 Braun Series 7 7071cc Flex Electric Razor for Men with SmartCare Cente | $159.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 48173552 Sonicare FlexCare Platinum Grey w/o sanitizer Toothbrush with $15 Gift | $159.95 | far above the same kind of item | $20.00 | comparable item: Sonicare FlexCare Platinum Grey w/o sanitizer Toot |
| Personal Care | 48278120 Sonicare FlexCare Platinum Grey w/o sanitizer Toothbrush with $20 Gift | $159.95 | far above the same kind of item | $20.00 | comparable item: Sonicare FlexCare Platinum Grey w/o sanitizer Toot |
| Personal Care | 13386320424 Billie Body Lotion 1 | $159.52 | far above the same kind of item | $15.99 | comparable item: Sophie la girafe Body Lotion |
| Personal Care | 15608252577 Dwell212 Body Lotion | $159.00 | far above the same kind of item | $15.99 | comparable item: Sophie la girafe Body Lotion |
| Personal Care | 15624356062 Dwell212 Body Wash D | $159.00 | far above the same kind of item | $5.33 | comparable item: Equate Original Body Wash 30 fl. oz. |
| Personal Care | 750023312 Shape & Freeze Non-Surgery Body Sculpting Slimming Device with 4 Repla | $158.26 | far above the same kind of item | $19.82 | comparable item: Professional Unisex Non Surgical Body Sculpting Sl |
| Personal Care | 591761876 Straight Razor Carbon Fiber | $156.40 | far above the same kind of item | $105.11 | comparable item: Straight Razor Carbon Fiber |
| Personal Care | 154758653 Tanners Tasty Paste Teeth Implants Teeth Disclosing Plaque Remover for | $154.75 | far above the same kind of item | $7.99 | median price of the same kind of item |
| Personal Care | 191624664 Oral Mouth for Elderly Dry Mouth Toothpaste for Toddlers ning Gel Toot | $154.75 | far above the same kind of item | $62.99 | comparable item: Forever Clean 9 Sensitive ning Toothpaste Gel Dry  |
| Personal Care | 2805641111 METRO VAGINAL GEL | $152.83 | far above the same kind of item | $16.63 | comparable item: At Last Naturals Vaginal Replenishment Gel 1.5 oz |
| Personal Care | 270803718 Straight Razor | $150.95 | far above the same kind of item | $111.14 | comparable item: Razolution Straight Razor |
| Personal Care | 567383810 LELO Lily 2, Lavender (Lavender & Manuka Honey) | $150.94 | far above the same kind of item | $11.67 | median price of the same kind of item |
| Personal Care | 316445690 Oral-B 7000 SmartSeries Rechargeable Power Toothbrush with 3 Replaceme | $150.16 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 716450722 Truefitt & Hill Wellington Razor Fusion Ebony | $149.99 | far above the same kind of item | $101.72 | comparable item: Truefitt & Hill Wellington Razor (FUSION) - # Porc |
| Personal Care | 36259400 Braun Series 5 5190cc ($20 Mail In Rebate Available) Men's Electric Fo | $149.97 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 166425126 GilletteLabs Heated Razor Starter Kit - 1 Handle, 2 Blade Refills, 1 C | $149.97 | far above the same kind of item | $39.99 | comparable item: GilletteLabs Razor Blade Refills, 8ct Razor Cartri |
| Personal Care | 407062822 FREE $20 Gift Card with Braun Series 5 5190cc Men's Electric Foil Shav | $149.97 | far above the same kind of item | $124.94 | comparable item: FREE $20 eGift Card with Braun Series 5 5190cc Men |
| Personal Care | 23861059 Philips Sonicare Flexcare HX6921/01 Rechargeable Sonic Toothbrush Hand | $149.95 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 900390979 Free $25 Gift Card with Braun Series 5 5190cc Men's Electric Foil Shav | $149.94 | far above the same kind of item | $124.94 | comparable item: FREE $20 eGift Card with Braun Series 5 5190cc Men |
| Personal Care | 140652932 Pearl Tampons Regular, 36/Box, 12 Box/Carton | $148.03 | far above the same kind of item | $59.52 | comparable item: Tampax Pearl Tampons Active Regular, 36 CT (Pack o |
| Personal Care | 15042009452 GN Neem Toothpaste S | $147.76 | far above the same kind of item | $4.50 | comparable item: Dabur Herbal Neem Toothpaste 154G |
| Personal Care | 503126689 Moroccan Black Soap - Vanilla - 5 Kilo | $147.04 | far above the same kind of item | $124.99 | comparable item: Moroccan Black Soap - Eucalyptus - 5 Kilo |
| Personal Care | 988446580 Moroccan Black Soap - Amber Musk - 5 Kilo | $147.04 | far above the same kind of item | $20.00 | comparable item: Moroccan Black Soap Exfoliating Experience - Amber |
| Personal Care | 696200456 EVO IRM-1 Rechargeable Iron Man Sonic Toothbrush with Travel Case for  | $144.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 211458532 Waterpik Sonic-Fusion Flossing Toothbrush, Electric Toothbrush & Water | $144.00 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 242624260 Waterpik Sonic-Fusion Flossing Toothbrush, Electric Toothbrush & Water | $144.00 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 758800056 LOTION-SOAP DUO ASSO | $144.00 | far above the same kind of item | $13.99 | median price of the same kind of item |
| Personal Care | 249345607 Safety Razor African Cowhorn | $143.61 | far above the same kind of item | $41.02 | comparable item: Razolution Safety Razor |
| Personal Care | 121800208 TTL 2PK + GUM TB 2CT | $143.28 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 41069963 Treated Suction Toothbrush Kits | $142.23 | far above the same kind of item | $68.82 | comparable item: Open Suction Catheter Kits - DYND40973 |
| Personal Care | 845301835 Dial Professional DIA33125A Basic Bar Soap - 500 Per Case | $140.67 | far above the same kind of item | $4.86 | comparable item: Herban Cowboy - Dusk Bar Soap - 5 Ounce - 6 Per Ca |
| Personal Care | 100004431 Gillette Labs Men's Heated Razor Starter Kit - 1 Handle, 2 Blade Refil | $139.99 | far above the same kind of item | $29.89 | comparable item: Gillette Labs with Exfoliating Bar Men's Razor - 1 |
| Personal Care | 110160670 Soft Back Brush for Shower Slick Lotion Applicator for Back Parts Wash | $139.97 | far above the same kind of item | $62.71 | comparable item: Soft Back Brush for Shower Slick Lotion Applicator |
| Personal Care | 148484549 Toothbrush Kids 5-7 Soft Toothbrushes Firm Very Expensive Items Toothb | $139.97 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 196705508 Toothbrush Head Gel for Quality Motion All Toothbrush Hotel Toothbrush | $139.97 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 46635105 Philips Sonicare HealthyWhite Plus, Rechargeable toothbrush, HX8911/02 | $136.78 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 115411233 Straight Razor Horn | $136.03 | far above the same kind of item | $61.75 | comparable item: Straight Razor |
| Personal Care | 10652012 Philips Sonicare R710 Healthy White Rechargeable Toothbrush HX6711/02 | $135.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 290820565 BONUS $30 eGift Card with Braun Series 7-790cc Men's Electric Foil Sha | $134.94 | far above the same kind of item | $13.13 | median price of the same kind of item |
| Personal Care | 27676553 Scott, KCC91748, Super-Duty Skin Cleanser, 2 / Carton, Green | $132.60 | far above the same kind of item | $74.02 | comparable item: Scott, KCC41863, Super Duty Skin Cleanser, 2 / Car |
| Personal Care | 44320865 Scott, KCC41864, Super Duty Skin Cleanser, 2 / Carton, Green | $131.88 | far above the same kind of item | $74.02 | comparable item: Scott, KCC41863, Super Duty Skin Cleanser, 2 / Car |
| Personal Care | 54041006 Philips Sonicare 3 Series Rechargeable Sonic Toothbrush, HX6632/18 | $131.40 | far above the same kind of item | $66.00 | comparable item: Philips Sonicare 3 Series gum health Electric rech |
| Personal Care | 48173550 Sonicare FlexCare+ Toothbrush with $15 Gift Card | $129.95 | far above the same kind of item | $34.95 | comparable item: Sonicare Essence Toothbrush with $5 Gift Card |
| Personal Care | 48173551 Sonicare FlexCare+ w/o sanitizer Toothbrush with $15 Gift Card | $129.95 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 48278117 Sonicare FlexCare+ Toothbrush with $20 Gift Card | $129.95 | far above the same kind of item | $34.95 | comparable item: Sonicare Essence Toothbrush with $5 Gift Card |
| Personal Care | 49433071 Braun Silk-Epil 9 Wet & Dry 3-in-1 Spa Epilation & Exfoliation System | $127.98 | far above the same kind of item | $59.57 | comparable item: Braun Silk-epil 5 5-511 - Wet & Dry Cordless Epila |
| Personal Care | 48278118 Sonicare FlexCare+ w/o sanitizer Toothbrush with $20 Gift Card | $123.90 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 1540464439 Tampax® Pearl Tampons, Regular, 36/box, 12 Box/carton | $123.49 | far above the same kind of item | $59.52 | comparable item: Tampax Pearl Tampons Active Regular, 36 CT (Pack o |
| Personal Care | 23157447 Tampax Hospeco Vending Machine Tampons Bulk | $123.08 | far above the same kind of item | $25.66 | comparable item: Tampax Hospeco Vending Machine Tampon Sleeves |
| Personal Care | 36151149 Gojo Shower Up Soap & Shampoo | $122.26 | far above the same kind of item | $8.25 | median price of the same kind of item |
| Personal Care | 50337130 Philips Sonicare HealthyWhite+ Electric Rechargeable Toothbrush w/Tong | $120.95 | far above the same kind of item | $92.00 | comparable item: Philips Sonicare HealthyWhite+ electric rechargeab |
| Personal Care | 313762223 Horny Honey Stimulating Arousal - 144 Piece Display - 2 Cc. Pillow Pac | $120.58 | far above the same kind of item | $10.50 | median price of the same kind of item |
| Personal Care | 1048119669 Oral-B Toothbrush, iO Series 6 Luxe Electric Toothbrush with (1) Brush | $120.00 | far above the same kind of item | $7.50 | median per-unit price of comparable items |
| Personal Care | 105086397 Oral-B Toothbrush, iO Series 6 Electric Toothbrush with (1) Brush Head | $119.97 | far above the same kind of item | $7.50 | median per-unit price of comparable items |
| Personal Care | 250704458 Oral-B Smart 5500 Electric Rechargeable Toothbrush, Black | $119.97 | far above the same kind of item | $79.90 | comparable item: Oral-B Smart 1500 Electric Rechargeable Toothbrush |
| Personal Care | 2112636038 NAIR 12ct MIXED | $119.64 | far above the same kind of item | $2.75 | comparable item: ONE Mixed Pleasures, 96-Count |
| Personal Care | 174136932 Care Ve Numbing Gel Super Sponge Body Lotion for Women Smell Good Fair | $116.64 | far above the same kind of item | $11.56 | median price of the same kind of item |
| Personal Care | 19217612 SCRUBS, ITW92991, Lemon Hand Sanitizer Wipes, 1 Each, Blue,White | $116.12 | far above the same kind of item | $5.82 | median price of the same kind of item |
| Personal Care | 24511364 Oral-B PC1500 Professional Care 1500 Rechargable Toothbrush | $114.33 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 293589493 LOLA SK Tampon 16 Count | $111.68 | far above the same kind of item | $63.98 | comparable item: Axe 80ct SK |
| Personal Care | 948540827 Philips Satinelle Prestige Epilator, Wet & Dry Electric Hair Removal,  | $109.95 | far above the same kind of item | $9.99 | median price of the same kind of item |
| Personal Care | 2143924 Sonicare Elite 7200 Power Toothbrush | $108.32 | far above the same kind of item | $10.85 | comparable item: Smurfs Power Toothbrush 1ct |
| Personal Care | 409737010 BATH BOMB ASSOR | $108.00 | far above the same kind of item | $5.00 | comparable item: BATH BOMB |
| Personal Care | 376867215 Summers Eve Se Mix Wash 24pc | $107.52 | far above the same kind of item | $5.49 | median price of the same kind of item |
| Personal Care | 23215082 RMC, IMP25176488, Naturelle Tampons, 500 / Carton, White | $106.05 | far above the same kind of item | $64.14 | comparable item: Impact Products, IMP25189973, Naturelle Plus Sanit |
| Personal Care | 1322092230 EVO SPM-1 Rechargeable Spider-Man Sonic Toothbrush with Travel Case fo | $104.88 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 442211903 SmartMouth Mouthwash Travel Packets for 24 Hours of Fresh Breath Guara | $103.56 | far above the same kind of item | $69.04 | comparable item: SmartMouth Mouthwash Travel Packets for 24 Hours o |
| Personal Care | 47074141 Oral-B Deep Sweep 5000 Smartseries with Bluetooth Electric Rechargeabl | $102.76 | far above the same kind of item | $49.94 | comparable item: Oral-B Deep Sweep 1000 Electric Rechargeable Power |
| Personal Care | 771261822 Dazzlepro elements sonic toothbrush and uv sanitizing base - silver | $101.23 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 46213239 Dazzlepro elite sonic toothbrush with uv sanitizing charging case sky | $99.99 | far above the same kind of item | $9.38 | median price of the same kind of item |
| Personal Care | 779013103 Bluestone Rechargeable Sonic Toothbrush with UV Sanitizer and 12 Heads | $99.99 | far above the same kind of item | $18.79 | comparable item: Bluestone Rechargeable Sonic Toothbrush with 10 To |
| Personal Care | 916427761 WaterPik Complete Care 7.0 Toothbrush & Flosser | $99.99 | far above the same kind of item | $90.56 | comparable item: Waterpik Complete Care Water Flosser + Sonic Tooth |
| Personal Care | 16019913569 MANSCAPED® Chairman Plus Precision Pack, Men's Electric Foil Shaver fo | $99.97 | far above the same kind of item | $16.76 | median per-unit price of comparable items |
| Personal Care | 3085946578 Oral‑B Toothbrush, iO Series 4 Rechargeable Electric Toothbrush for Ad | $99.94 | far above the same kind of item | $44.97 | comparable item: Oral-B Toothbrush, iO Series 2 Rechargeable Electr |
| Personal Care | 199418530 Bath Scrubbers for Elderly Long Shower Brush for Back Back Scrub Brush | $99.79 | far above the same kind of item | $8.78 | median price of the same kind of item |
| Personal Care | 105732934 Health Toe Instant Beauty Gel Cocoa Butter for Stretch Marks Enhanceme | $93.31 | far above the same kind of item | $8.97 | median price of the same kind of item |
| Personal Care | 169754297 Bath Scrubbers for Elderly Long Shower Brush for Back Back Scrub Brush | $93.31 | far above the same kind of item | $8.78 | median price of the same kind of item |
| Personal Care | 1805456598 Tork Clarity Hand Soap Foam S4 | $88.99 | far above the same kind of item | $3.81 | comparable item: J.R. Watkins Coconut Scent Foam Hand Soap, 9 oz |
| Personal Care | 35501322 Kirk's Original Coco Castile Bar Soap, 4 | $87.09 | far above the same kind of item | $8.29 | comparable item: Kirk's Coco Castile Bar Soap, Fragrance Free, 4 OZ |
| Personal Care | 588283175 WipesPlus, WIP37503, Hand Sanitizer Wipes, 12 / Carton, White | $86.95 | far above the same kind of item | $12.83 | comparable item: Caresour Hand Sanitizer Wipes 50 Wipes W-075 |
| Personal Care | 185345507 Teeth ning for Sensitive Teeth Desensitizing Toothpaste Nose Clean Tee | $86.40 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 374945054 Johnson Diversey 05487. Soft Care Lotionized Hand Soap, 1,000 Ml cartr | $86.18 | far above the same kind of item | $5.08 | median price of the same kind of item |
| Personal Care | 2356038900 Holiday Bath Bomb As | $84.00 | far above the same kind of item | $1.00 | comparable item: BATH BOMB |
| Personal Care | 140595431 Skin Spa Night Organic Oil Summers Eve Feminine Wash Cucumber Melon Sc | $83.61 | far above the same kind of item | $6.19 | median price of the same kind of item |
| Personal Care | 175438457 Baby Belly Button Band under 1 Plaque Remover Items under $5 Water Pic | $82.75 | far above the same kind of item | $7.99 | median price of the same kind of item |
| Personal Care | 863610011 Stain Remover Teeth Tooth Polisher Toothpaste Travel Pack Bio Clean Ha | $82.75 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 51947314 Antimicrobial Foaming Hand Wash | $80.80 | far above the same kind of item | $61.38 | comparable item: Antimicrobial Foaming Hand Wash |
| Personal Care | 412623992 Philips sonicare essence+ gum health & airfloss rechargeable electric  | $79.95 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 55521995 Philips Sonicare Essence+ Gum Health & Airfloss Rechargeable Electric  | $79.72 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 371265548 Sterile Lubricating Jelly - MDS032273Z | $79.44 | far above the same kind of item | $32.58 | comparable item: Sterile Lubricating Jelly - MDS032290Z |
| Personal Care | 37949498 Renown Foam Lotion Hand Soap Refill, Pink, 2,000Ml | $78.89 | far above the same kind of item | $47.11 | comparable item: Renown Counter-Mounted Foam Hand Soap Refill, Pink |
| Personal Care | 46635083 Philips Sonicare 3 Series Gum Health, Hx | $78.66 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 28932935 Dynarex Dentifrice-Flavored Swabsticks, Pleasant Tasting Cotton Swabs  | $77.96 | far above the same kind of item | $5.17 | median price of the same kind of item |
| Personal Care | 145118495 Mint Fresh Mouthwash Fresh Breath Toothpaste for Puppies Toothpaste Ge | $77.37 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 186577050 Three Wishes Mint Toothpaste with Fluoride Opulence Teeth ning Trays T | $77.37 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 199208745 ning Teeth Kids ning Toothpaste Intensive Stain Removal ning Toothpast | $77.37 | far above the same kind of item | $6.67 | median price of the same kind of item |
| Personal Care | 115305363 Dial Antibacterial Deodorant Bar Soap, Floral, Unwrapped, White, 1.5 o | $76.93 | far above the same kind of item | $1.40 | median per-unit price of comparable items |
| Personal Care | 764812279 BATH SPONGE W/STRETCHY SILKY LOOP HANDLE 55GM AST COLORS IN, Case Pack | $75.31 | far above the same kind of item | $5.64 | median price of the same kind of item |
| Personal Care | 451257820 (1 pack) Sensodyne Pronamel Gentle Whitening Sensitive Toothpaste, Alp | $75.28 | far above the same item's other variants | $6.97 | comparable item: Sensodyne Pronamel Gentle Whitening Sensitive Toot |
| Personal Care | 47217515 Sensodyne Pronamel Gentle Whitening Fluoride Toothpaste to Strengthen  | $71.72 | far above the same kind of item | $4.21 | comparable item: Sensodyne Pronamel Fresh Wave Fluoride Toothpaste  |
| Personal Care | 41060534 Dial Complete Foaming Hand Wash Refill | $69.74 | far above the same kind of item | $3.97 | comparable item: Dial Complete Antibacterial Foaming Hand Wash Refi |
| Personal Care | 280725783 Summers Eve 18pcse Astd Cloth S | $68.04 | far above the same kind of item | $3.78 | comparable item: Summers Eve Summer's Eve Sensitive Cloth Bonus 40c |
| Personal Care | 15110836 BODYCOLOGY 6PC CREAM/HAND SANITIZER ACETATE SAMPLER BOX | $65.54 | far above the same kind of item | $2.50 | comparable item: Bodycology 6pc Hand Sanitizer Sampler Set |
| Personal Care | 37976680 Renown Efm Foam Hand Soap, 1,250Ml, Dark Green | $56.13 | far above the same kind of item | $50.70 | comparable item: Renown Touch-Free Foam Hand Soap Dispenser, 1,200  |
| Personal Care | 55490006 Lever 2000 Perfectly Fresh Moisturizing Bar Hand Soap 3.15 oz CB327126 | $55.13 | far above the same kind of item | $3.99 | comparable item: Lever 2000 Bar Soap Original 3.15 oz, 4 Bar |
| Personal Care | 37917687 Renown Foam Hand Soap For Through-The-Counter Dispensers | $53.37 | far above the same kind of item | $47.11 | comparable item: Renown Counter-Mounted Foam Hand Soap Refill, Pink |
| Personal Care | 20732824521 Alvantor Toothache Pain Relief Spray, Soothes Gum and Instant Relief,  | $49.99 | far above the same item's other variants | $15.57 | median price of the same kind of item |
| Personal Care | 20911156617 Dr Teal's 24 Hour Moisture Body Lotion with Lavender Essential Oil & ( | $39.38 | far above the same item's other variants | $13.77 | comparable item: Dr Teal's 24 Hour Moisture Body Lotion with Lavend |
| Personal Care | 20838251880 ( & Dr Teal's Epsom Salt Magnesium Soak, Soothe & Sleep with Lavender, | $37.57 | far above the same item's other variants | $4.65 | comparable item: Dr Teal's Epsom Salt Magnesium Soak, Soothe & Slee |
| Personal Care | 14133208666 Dove Winter Treats Body Wash Variety Set, 20 oz | $34.29 | far above the same item's other variants | $11.64 | median per-unit price of comparable items |
| Personal Care | 16543772991 DOVE BODY WASH DEEP MOISTURE 1(4) 20 OZ./591 ML | $31.96 | far above the same item's other variants | $9.98 | comparable item: Dove Body Wash Deep Moisture - 24oz |
| Personal Care | 16594804059 DOVE BODY WASH SS 1(4) 20 OZ /591 ML | $31.96 | far above the same item's other variants | $1.73 | comparable item: Dove Body Wash |
| Personal Care | 20892807272 ( & Dr Teal's Epsom Salt Magnesium Soak, Relax & Relief with Eucalyptu | $30.97 | far above the same item's other variants | $9.84 | comparable item: Dr Teal's Epsom Salt Magnesium Soak, Relax & Relie |
| Personal Care | 16358068986 Vaseline Intensive Care Body Lotion for Dry Skin Cocoa Radiant Lotion  | $29.94 | far above the same item's other variants | $9.98 | comparable item: Vaseline Intensive Care Body Lotion for Dry Skin C |
| Personal Care | 20898507983 ( & Dr Teal's Foaming Bath with Pure Epsom Salt, Shea Butter & Almond  | $29.35 | far above the same item's other variants | $11.74 | comparable item: Dr Teal's Foaming Bath with Pure Epsom Salt, Shea  |
| Personal Care | 20836559783 Dr Teal's Eucalyptus & Spearmint Body Lotion & ( Bundle | $29.03 | far above the same item's other variants | $7.90 | comparable item: Dr Teal's Eucalyptus & Spearmint Body Lotion, 18 f |
| Personal Care | 3624918760 Duke Cannon Lump Of Coal Activated Charcoal Soap with tactical scrubbe | $28.99 | far above the same item's other variants | $19.99 | comparable item: Duke Cannon Midnight Swim Bar Soap & Tactical Scru |
| Personal Care | 20898457966 Bodycology Pink Vanilla Wish Shea Butter Body Cream & ( Bundle | $28.45 | far above the same item's other variants | $4.97 | comparable item: Bodycology Pink Vanilla Wish Shea Butter Body Crea |
| Personal Care | 20040570624 eos Pink Champagne Body Wash, Body Lotion, & Shave Oil Bundle | $27.92 | far above the same item's other variants | $22.95 | comparable item: eos Shea Better 24H Moisture, Vanilla Cashmere Bod |
| Personal Care | 20065614840 eos Fresh & Cozy Body Wash, Body Lotion, & Shave Oil Bundle | $27.92 | far above the same item's other variants | $9.98 | comparable item: eos Fresh & Cozy Body Wash, Clean Scented Hydratin |
| Personal Care | 3041903756 Secret Clinically Proven Aluminum Free Deodorant Stick for Women Laven | $26.00 | far above the same item's other variants | $15.59 | comparable item: Secret Clinically Proven Aluminum Free Deodorant S |
| Personal Care | 16270400327 Dove Men+Care Holiday Gift Set: Extra Fresh Body & Face Wash, Deodoran | $25.27 | far above the same item's other variants | $6.04 | comparable item: Dove Men Care Fresh Awake Body and Face Wash, 13.5 |
| Personal Care | 358356055 Schmidt's Cedarwood + Juniper Natural Deodorant Stick, 2.65 oz | $23.99 | far above the same item's other variants | $6.97 | comparable item: Schmidt's Natural Deodorant Stick Waves 2.65 OZ |
| Personal Care | 14141318905 Dove x Crumbl Lemon Cookie Body Wash, Scrub, & Deodorant Set | $23.82 | far above the same item's other variants | $13.17 | comparable item: Dove Crumbl Exfoliating Body Scrub Lemon Cookie, 1 |
| Personal Care | 142515927 Dove Ultimate Long Lasting Antiperspirant Deodorant Stick, Peony and R | $22.93 | far above the same item's other variants | $6.84 | comparable item: Dove Ultimate Long Lasting Women's Antiperspirant  |
| Personal Care | 248645581 Dove Ultimate Long Lasting Women's Antiperspirant Deodorant Stick, Coc | $22.93 | far above the same item's other variants | $6.64 | comparable item: Dove Ultimate Long Lasting Female Antiperspirant D |
| Personal Care | 919962656 Old Spice Kraken Figurine Deodorant Holder + Krakengard Anti-Perspiran | $22.32 | far above the same item's other variants | $9.84 | comparable item: Old Spice Anti-Perspirant Deodorant for Men, Night |
| Personal Care | 18197400209 Dr Teal's Magnesium Bath Bundle, Black Cherry & Vanilla | $22.04 | far above the same item's other variants | $5.87 | comparable item: Dr Teal's Epsom Salt Magnesium Soak, Black Cherry  |
| Personal Care | 326007756 Dove Ultimate Long Lasting Women's Antiperspirant Deodorant Stick, Cuc | $21.99 | far above the same item's other variants | $9.48 | comparable item: Dove Ultimate Long Lasting Women's Antiperspirant  |
| Personal Care | 20901068948 Dr Teal's Soothe & Sleep Body Wash with Pure Epsom Salt & Lavender Ess | $21.96 | far above the same item's other variants | $5.87 | comparable item: Dr Teal's Soothe & Sleep Body Wash with Pure Epsom |
| Personal Care | 14111523778 Dove x Crumbl Strawberry Cookie Body Wash, Scrub, & Deodorant Set | $21.91 | far above the same item's other variants | $10.63 | comparable item: Dove Body Scrub Strawberry Cookie 15 OZ |
| Personal Care | 17773274987 Ear and Nose Hair Trimmer for Men, Upgraded Version Professional USB R | $21.01 | far below comparable items | $21.01 | comparable item: Ear and Nose Hair Trimmer for Men, Upgraded Versio |
| Personal Care | 784945219 ($20 Value) Old Spice Holiday Gift Pack Deodorant Holder with Dragonbl | $20.71 | far above the same item's other variants | $9.17 | comparable item: P & G Old Spice Sweat Defense Anti-Perspirant/Deod |
| Personal Care | 10293474 Suave Professionals Frizz Control Shine Enhancing Sleek Daily Shampoo  | $19.84 | far above the same item's other variants | $7.67 | comparable item: Suave Professionals Moisturizing Frizz Control Sle |
| Personal Care | 413299661 Olay Moisture Ribbons Plus Shea + Lavender Oil Women's Body Wash, All  | $19.58 | far above the same item's other variants | $6.97 | comparable item: Olay Body Wash, Moisture Ribbons Plus Shea and Lav |
| Personal Care | 18197350651 Dr Teal's Magnesium Bath Bundle, Snowy Night | $18.61 | far above the same item's other variants | $5.87 | comparable item: Dr Teal's Epsom Salt Magnesium Soak, Snowy Night,  |
| Personal Care | 952884100 Colgate Kids Toothpaste, Manual and Battery Kids Toothbrushes with Too | $16.47 | far above the same item's other variants | $15.04 | comparable item: Colgate Kids Toothbrush Set with Toothpaste, Batma |
| Personal Care | 857573383 Crest Mouthwash 3D White Fresh Whitening, Great Tasting Whitening Guar | $16.10 | far above the same item's other variants | $4.00 | comparable item: Crest Mouthwash 3D White Fresh Whitening, Great Ta |
| Personal Care | 20104214087 Dr Teal's Foaming Bath with Pure Epsom Salt, Soothe & Sleep with Laven | $14.84 | far above the same item's other variants | $13.07 | median per-unit price of comparable items |
| Personal Care | 971543582 Colgate Kids Toothpaste, Manual and Battery Kids Toothbrushes with Too | $14.10 | far above the same item's other variants | $16.99 | comparable item: Colgate Kids Toothbrush Set with Toothpaste, Unico |
| Personal Care | 309830586 Colgate Kids Toothpaste, Manual and Battery Kids Toothbrushes with Too | $14.03 | far above the same item's other variants | $16.99 | comparable item: Colgate Kids Toothbrush Set with Toothpaste, Unico |
| Personal Care | 19673808914 Listerine Total Care 500ml Mouthwash & Total Care Kids Berry 500ml Mou | $12.86 | far above the same item's other variants | $4.88 | comparable item: Listerine Total Care Kids Alcohol-Free Anticavity  |
| Personal Care | 19927700641 Scent Theory Underwater Friends Hand Sanitizer Spray Gift Set, 3 Spray | $12.46 | far above the same item's other variants | $5.12 | median per-unit price of comparable items |
| Personal Care | 277577931 Crest Kid's Toothpaste featuring Disney & Pixar's The Incredibles 2 (c | $10.33 | far above the same item's other variants | $2.54 | comparable item: Crest Kid's Toothpaste featuring Disney & Pixar's  |
| Personal Care | 1459024304 Suave Invisible Solid Antiperspirant Deodorant, Cocoa Shea Butter, Uni | $9.98 | far above the same item's other variants | $5.85 | comparable item: Suave Invisible Solid Antiperspirant Deodorant, Po |
| Personal Care | 16243807309 Colgate Minecraft Kids Toothbrush and Toothpaste Bundle | $9.42 | far above the same item's other variants | $9.42 | comparable item: Colgate Bluey Kids Toothbrush and Toothpaste Bundl |
| Personal Care | 778112637 Summer’s Eve Active Daily Perfomance Feminine Spray, 2 oz | $7.99 | far above the same item's other variants | $7.15 | comparable item: Summer's Eve Ultra Daily Active Feminine Spray, 2  |
| Personal Care | 11149005555 Crest Advanced Kid's Fluoride Toothpaste, Strawberry Flavor, Two Tubes | $7.49 | far above the same item's other variants | $3.97 | comparable item: Crest Toothpaste, Advanced Kid's Fluoride Toothpas |
| Personal Care | 970062075 Crest 3D White Whitening Toothpaste, Arctic Fresh, 4.2 oz | $7.48 | far above the same item's other variants | $4.43 | comparable item: Crest 3D White, Whitening Toothpaste Arctic Fresh, |
| Personal Care | 381696151 Crest Kid's Cavity Protection Toothpaste Pump featuring Disney's Froze | $6.50 | far above the same item's other variants | $3.82 | comparable item: Crest Kid's Cavity Protection Toothpaste Pump feat |
| Personal Care | 32595610 Softsoap Antibacterial Liquid Hand Soap, Fresh Citrus - 7.5 fl oz | $6.10 | far above the same item's other variants | $0.80 | comparable item: Softsoap Antibacterial Liquid Hand Soap Refill, Fr |
| Personal Care | 17033868858 Suave Antiperspirant Deodorant For Women, Invisible 48hr Protection, C | $6.09 | far above the same item's other variants | $1.98 | comparable item: Suave Antiperspirant Deodorant For Women, 48hr Pro |
| Personal Care | 839802357 Suave Fresh Vibes Deodorant Stick Berry Bliss, 1.2 OZ | $5.95 | far above the same item's other variants | $2.21 | comparable item: Suave Fresh Vibes Berry Bliss 48 Hour Odor Protect |
| Personal Care | 169051651 Suave Deodorant, Antiperspirant & Deodorant Stick, Powder, 1.2 oz | $5.70 | far above the same item's other variants | $6.33 | comparable item: Suave Powder Antiperspirant Deodorant, 1.4 oz |
| Personal Care | 966761008 Suave Antiperspirant Deodorant, Tropical Paradise, Unisex, 1.2 oz | $5.13 | far above the same item's other variants | $4.84 | comparable item: Suave Tropical Paradise Antiperspirant Deodorant,  |
| Personal Care | 5819223046 Softsoap Limited Edition Peppermint Liquid Hand Soap, 7.5 fl oz | $5.07 | far above the same item's other variants | $1.24 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Cool Pe |
| Personal Care | 895520870 Suave Fresh Vibes Deodorant Stick Awesome Blossom, 1.2 OZ | $5.05 | far above the same item's other variants | $1.59 | comparable item: Suave Deodorant Antiperspirant & Deodorant Stick,  |
| Personal Care | 10323323 Softsoap Liquid Hand Soap, Black Raspberry and Vanilla - 7.5 fl oz | $4.95 | far above the same item's other variants | $2.15 | comparable item: Softsoap Liquid Hand Soap, Black Raspberry and Van |
| Personal Care | 17721668270 Softsoap Limited Edition Liquid Hand Soap, Cherry Blossom Scent, 7.5 f | $4.73 | far above the same item's other variants | $5.47 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Cherry  |
| Personal Care | 5094916479 Softsoap Limited Edition Candied Apple Liquid Hand Soap, 7.5 fl oz Pum | $4.68 | far above the same item's other variants | $4.66 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Golden  |
| Personal Care | 17963356257 Softsoap Limited Edition Liquid Hand Soap, Meyer Lemon Scent, 7.5 fl o | $4.63 | far above the same item's other variants | $3.43 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Meyer L |
| Personal Care | 17797374369 Softsoap Limited Edition Liquid Hand Soap, Watermelon Scent, 7.5 fl oz | $4.57 | far above the same item's other variants | $6.16 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Waterme |
| Personal Care | 2294474736 Softsoap Limited Edition Liquid Hand Soap, Cherry Blossom, 7.5 Fluid O | $4.56 | far above the same item's other variants | $1.20 | comparable item: Softsoap Limited Edition Liquid Hand Soap Refill,  |
| Personal Care | 2830838016 Softsoap Limited Edition Liquid Hand Soap, Blueberry, 7.5 Fluid Ounce  | $4.56 | far above the same item's other variants | $1.14 | comparable item: Softsoap Limited Edition Liquid Hand Soap Refill,  |
| Personal Care | 3541252812 Softsoap Limited Edition Liquid Hand Soap, Golden Apple, 7.5 Fluid Oun | $4.56 | far above the same item's other variants | $4.66 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Golden  |
| Personal Care | 17791110992 Softsoap Limited Edition Liquid Hand Soap, Kiwi Scent, 7.5 fl oz Pump  | $4.53 | far above the same item's other variants | $6.16 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Waterme |
| Personal Care | 17763804931 Softsoap Limited Edition Liquid Hand Soap, Golden Apple Scent, 7.5 fl  | $4.47 | far above the same item's other variants | $4.66 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Golden  |
| Personal Care | 15738014462 Softsoap Limited Edition Holiday Cookie Liquid Hand Soap, Kitchen or B | $4.43 | far above the same item's other variants | $1.16 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Kitchen |
| Personal Care | 17738705729 Softsoap Limited Edition Liquid Hand Soap, Blueberry Scent, 7.5 fl oz  | $4.31 | far above the same item's other variants | $7.04 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Blueber |
| Personal Care | 17774704000 Softsoap Limited Edition Liquid Hand Soap, Mango Scent, 7.5 fl oz Pump | $4.27 | far above the same item's other variants | $6.16 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Waterme |
| Personal Care | 15738206431 Softsoap Limited Edition Candied Apple Liquid Hand Soap, 7.5 fl oz Pum | $4.09 | far above the same item's other variants | $4.66 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Golden  |
| Personal Care | 17842165594 Softsoap Limited Edition Liquid Hand Soap, Coconut Scent, 7.5 fl oz Pu | $4.03 | far above the same item's other variants | $5.30 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Coconut |
| Personal Care | 3403170119 Softsoap Limited Edition Liquid Hand Soap, Meyer Lemon, 7.5 Fluid Ounc | $3.90 | far above the same item's other variants | $1.05 | comparable item: Softsoap Limited Edition Liquid Hand Soap Refill,  |
| Personal Care | 15725662476 Softsoap Limited Edition Sweet Pine Liquid Hand Soap, 7.5 fl oz Pump B | $3.42 | far above the same item's other variants | $6.16 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Waterme |
| Personal Care | 15696450500 Softsoap Limited Edition Coco Ginger Liquid Hand Soap, 7.5 fl oz Pump  | $3.39 | far above the same item's other variants | $6.16 | comparable item: Softsoap Limited Edition Liquid Hand Soap, Waterme |
| Personal Care | 101175539 Softsoap Liquid Hand Soap, Fresh Breeze - 7.5 fl oz | $3.22 | far above the same item's other variants | $1.24 | comparable item: Softsoap Liquid Hand Soap, Kitchen and Bathroom Ha |
| Personal Care | 10323292 Softsoap Liquid Hand Soap, Crisp Cucumber and Melon - 7.5 fl oz | $3.18 | far above the same item's other variants | $0.81 | comparable item: Softsoap Liquid Hand Soap Refill, Cucumber and Mel |
| Personal Care | 10323299 Softsoap Liquid Hand Soap, Cherry Blossom - 7.5 fl oz | $3.18 | far above the same item's other variants | $1.28 | comparable item: Softsoap Liquid Hand Soap, Cherry Blossom - 11.25  |
| Personal Care | 10323319 Softsoap Liquid Hand Soap, Lavender & Chamomile - 7.5 fl oz | $3.18 | far above the same item's other variants | $3.27 | comparable item: Softsoap Liquid Hand Soap, Lavender & Chamomile -  |
| Personal Care | 32584606 Softsoap Antibacterial Liquid Hand Soap, Crisp Clean - 7.5 fl oz | $3.18 | far above the same item's other variants | $3.09 | comparable item: Softsoap Antibacterial Liquid Hand Soap, Crisp Cle |
| Personal Care | 34720572 Softsoap Liquid Hand Soap, Pomegranate and Mango - 7.5 fl oz | $3.18 | far above the same item's other variants | $1.82 | comparable item: Softsoap Liquid Hand Soap, Pomegranate and Mango - |
| Personal Care | 175432420 Loofah Soap Exfoliating Scrub Soap Bar Beach Breeze | $0.10 | far below comparable items | $3.26 | median per-unit price of comparable items |
| Personal Care | 22614745 Free His/her Gillette Razors Courtesy Of | $0.02 | below range | $23.54 | comparable item: His n Hers Razors Assortment Pack |
| Personal Care | 21472859 Suave Water Pebble | $0.01 | below range | $32.23 | median price of the same kind of item |
| Personal Care | 862981383 Magic Bullet Veggie Bullet Compact Display | $0.01 | below range | $15.99 | median price of its category |
| Pets | 155730056 Clear For Life 500T Rectangle Acrylic Aquarium - Sapphire Blue Back | $6,816.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 165889819 Clear For Life 500T Rectangle Acrylic Aquarium - Black Back | $6,816.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 931921923 Clear For Life 500T Rectangle Acrylic Aquarium - Blue Back | $6,816.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 185405164 Clear For Life 500T Rectangle Acrylic Aquarium - Clear Back | $6,402.00 | above range | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 138280983 Clear For Life 360T Rectangle Acrylic Aquarium - Black Back | $5,394.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 182974550 Clear For Life 360T Rectangle Acrylic Aquarium - Blue Back | $5,358.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 195798721 Clear For Life 360T Rectangle Acrylic Aquarium - Sapphire Blue Back | $5,358.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 163473746 Clear For Life 360T Rectangle Acrylic Aquarium - Clear Back | $4,930.00 | above range | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 902559603 135 Gallon Glass Fish Tank Aquarium with LED Light and Stand Bundle | $4,482.75 | above range | $151.82 | median price of the same kind of item |
| Pets | 403173815 ALLGREEN Pet 15 x 95 FT Artificial Grass for Pet Dog Potty Training In | $4,397.25 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 922318087 MegaGrass MegaPet Pro 15 x 100 ft Artificial Grass for Pet Dog Potty I | $3,930.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 428541025 MegaGrass MegaPet Pro 15 x 99 ft Artificial Grass for Pet Dog Potty In | $3,885.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 54192108 Heel O Matic Heelomatic Trainer | $3,876.83 | above range | $18.90 | median price of its category |
| Pets | 802963376 MegaGrass MegaPet Pro 15 x 98 ft Artificial Grass for Pet Dog Potty In | $3,852.06 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 703228956 Cute kittyAutomation generated BV title | $3,836.67 | above range | $18.90 | median price of its category |
| Pets | 711114891 MegaGrass MegaPet Pro 15 x 96 ft Artificial Grass for Pet Dog Potty In | $3,786.26 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 474231293 MegaGrass MegaPet Pro 15 x 95 ft Artificial Grass for Pet Dog Potty In | $3,684.06 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 717372786 MegaGrass MegaPet Pro 15 x 94 ft Artificial Grass for Pet Dog Potty In | $3,650.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 448822623 MegaGrass MegaPet Pro 15 x 93 ft Artificial Grass for Pet Dog Potty In | $3,616.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 228304876 MegaGrass MegaPet Pro 15 x 92 ft Artificial Grass for Pet Dog Potty In | $3,584.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 476833062 MegaGrass MegaPet Pro 15 x 91 ft Artificial Grass for Pet Dog Potty In | $3,551.06 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 100833784 MegaGrass MegaPet Pro 15 x 90 ft Artificial Grass for Pet Dog Potty In | $3,518.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 875952827 MegaGrass MegaPet Pro 15 x 87 ft Artificial Grass for Pet Dog Potty In | $3,419.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 136925329 Clear For Life 270S Rectangle Acrylic Aquarium - Black Back | $3,406.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 746053200 Clear For Life 270S Rectangle Acrylic Aquarium - Blue Back | $3,406.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 600888021 MegaGrass MegaPet Pro 15 x 86 ft Artificial Grass for Pet Dog Potty In | $3,385.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 170119891 Clear For Life 270S Rectangle Acrylic Aquarium - Sapphire Blue Back | $3,384.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 996694168 MegaGrass MegaPet Pro 15 x 84 ft Artificial Grass for Pet Dog Potty In | $3,320.06 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 121318023 MegaGrass MegaPet Platinum 15 x 75 ft Artificial Grass for Pet Dog Pot | $3,301.20 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 193240255 MegaGrass MegaPet Pro 15 x 83 ft Artificial Grass for Pet Dog Potty In | $3,287.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 983973870 ALLGREEN Pet 15 x 97 FT Artificial Grass for Pet Dog Potty Training In | $3,242.57 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 933887556 MegaGrass MegaPet Pro 15 x 81 ft Artificial Grass for Pet Dog Potty In | $3,220.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 639474940 ALLGREEN Pet 15 x 96 FT Artificial Grass for Pet Dog Potty Training In | $3,209.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 439879922 MegaGrass MegaPet Pro 15 x 80 ft Artificial Grass for Pet Dog Potty In | $3,188.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 969533554 MegaGrass MegaPet Pro 15 x 79 ft Artificial Grass for Pet Dog Potty In | $3,154.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 439250102 ALLGREEN Pet 15 x 94 FT Artificial Grass for Pet Dog Potty Training In | $3,142.29 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 264286414 MegaGrass MegaPet Platinum 15 x 100 ft Artificial Grass for Pet Dog Po | $3,067.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 158952688 Clear For Life 300T Rectangle UniQuarium - Sapphire Blue Back | $3,060.00 | above range | $870.00 | comparable item: Clear For Life 75R Rectangle UniQuarium - Sapphire |
| Pets | 471962083 Clear For Life 300T Rectangle UniQuarium - Black Back | $3,060.00 | above range | $18.90 | median price of its category |
| Pets | 507937393 Clear For Life 300T Rectangle UniQuarium - Blue Back | $3,060.00 | above range | $18.90 | median price of its category |
| Pets | 354456563 ALLGREEN Pet 15 x 91 FT Artificial Grass for Pet Dog Potty Training In | $3,042.00 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 704651856 ALLGREEN Pet 15 x 70 FT Artificial Grass for Pet Dog Potty Training In | $3,042.00 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 405288182 MegaGrass MegaPet Platinum 15 x 99 ft Artificial Grass for Pet Dog Pot | $3,034.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 498774847 MegaGrass MegaPet Platinum 15 x 98 ft Artificial Grass for Pet Dog Pot | $3,008.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 159573450 Clear For Life 270S Rectangle Acrylic Aquarium - Clear Back | $2,988.00 | above range | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 793857281 MegaGrass MegaPet Platinum 15 x 97 ft Artificial Grass for Pet Dog Pot | $2,982.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 981973628 ALLGREEN Pet 15 x 89 FT Artificial Grass for Pet Dog Potty Training In | $2,975.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 697484616 MegaGrass MegaPet Platinum 15 x 96 ft Artificial Grass for Pet Dog Pot | $2,956.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 848462326 ALLGREEN Pet 15 x 88 FT Artificial Grass for Pet Dog Potty Training In | $2,941.71 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 724393189 MegaGrass MegaPet Platinum 15 x 95 ft Artificial Grass for Pet Dog Pot | $2,930.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 249660305 ALLGREEN Pet 15 x 87 FT Artificial Grass for Pet Dog Potty Training In | $2,908.29 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 407475027 MegaGrass MegaPet Platinum 15 x 94 ft Artificial Grass for Pet Dog Pot | $2,904.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 407080978 MegaGrass MegaPet Platinum 15 x 93 ft Artificial Grass for Pet Dog Pot | $2,878.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 722843993 MegaGrass MegaPet Pro 15 x 72 ft Artificial Grass for Pet Dog Potty In | $2,853.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 848375615 MegaGrass MegaPet Platinum 15 x 92 ft Artificial Grass for Pet Dog Pot | $2,852.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 942835443 ALLGREEN Pet 15 x 85 FT Artificial Grass for Pet Dog Potty Training In | $2,841.43 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 229122722 MegaGrass MegaPet Platinum 15 x 91 ft Artificial Grass for Pet Dog Pot | $2,826.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 218742084 MegaGrass MegaPet Pro 15 x 71 ft Artificial Grass for Pet Dog Potty In | $2,821.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 513619872 ALLGREEN Pet 15 x 84 FT Artificial Grass for Pet Dog Potty Training In | $2,808.00 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 179382952 MegaGrass MegaPet Platinum 15 x 90 ft Artificial Grass for Pet Dog Pot | $2,799.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 356314278 MegaGrass MegaPet Pro 15 x 97 ft Artificial Grass for Pet Dog Potty In | $2,788.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 174122618 MegaGrass MegaPet Platinum 15 x 89 ft Artificial Grass for Pet Dog Pot | $2,773.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 515050037 MegaGrass MegaPet Pro 15 x 69 ft Artificial Grass for Pet Dog Potty In | $2,755.86 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 797650666 MegaGrass MegaPet Platinum 15 x 88 ft Artificial Grass for Pet Dog Pot | $2,747.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 444922423 ALLGREEN Pet 15 x 82 FT Artificial Grass for Pet Dog Potty Training In | $2,741.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 676310623 MegaGrass MegaPet Platinum 15 x 87 ft Artificial Grass for Pet Dog Pot | $2,721.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 765831998 ALLGREEN Pet 15 x 81 FT Artificial Grass for Pet Dog Potty Training In | $2,707.71 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 304702571 MegaGrass MegaPet Platinum 15 x 86 ft Artificial Grass for Pet Dog Pot | $2,695.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 491951927 MegaGrass MegaPet Pro 15 x 67 ft Artificial Grass for Pet Dog Potty In | $2,688.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 659651203 ALLGREEN Pet 15 x 80 FT Artificial Grass for Pet Dog Potty Training In | $2,674.29 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 260198524 MegaGrass MegaPet Platinum 15 x 85 ft Artificial Grass for Pet Dog Pot | $2,669.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 333276793 MegaGrass MegaPet Pro 15 x 66 ft Artificial Grass for Pet Dog Potty In | $2,656.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 808852706 ALLGREEN Pet 15 x 79 FT Artificial Grass for Pet Dog Potty Training In | $2,640.86 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 409074057 ALLGREEN Pet 15 x 78 FT Artificial Grass for Pet Dog Potty Training In | $2,607.43 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 645088281 MegaGrass MegaPet Platinum 15 x 84 ft Artificial Grass for Pet Dog Pot | $2,593.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 856784125 MegaGrass MegaPet Pro 15 x 64 ft Artificial Grass for Pet Dog Potty In | $2,590.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 755342933 MegaGrass MegaPet Platinum 15 x 83 ft Artificial Grass for Pet Dog Pot | $2,567.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 739268703 MegaGrass MegaPet Pro 15 x 89 ft Artificial Grass for Pet Dog Potty In | $2,549.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 803358004 MegaGrass MegaPet Platinum 15 x 82 ft Artificial Grass for Pet Dog Pot | $2,541.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 144864096 Clear For Life 300T Rectangle Acrylic Aquarium - Black Back | $2,526.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 146629448 Clear For Life 300T Rectangle Acrylic Aquarium - Sapphire Blue Back | $2,526.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 721476117 Clear For Life 240S Rectangle Acrylic Aquarium - Black Back | $2,526.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 731111534 Clear For Life 240S Rectangle Acrylic Aquarium - Sapphire Blue Back | $2,526.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 930506443 Clear For Life 240S Rectangle Acrylic Aquarium - Blue Back | $2,526.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 995759081 Clear For Life 300T Rectangle Acrylic Aquarium - Blue Back | $2,526.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 963280815 MegaGrass MegaPet Pro 15 x 62 ft Artificial Grass for Pet Dog Potty In | $2,523.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 361435358 MegaGrass MegaPet Platinum 15 x 81 ft Artificial Grass for Pet Dog Pot | $2,515.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 768444649 ALLGREEN Pet 15 x 75 FT Artificial Grass for Pet Dog Potty Training In | $2,507.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 792616110 Clear For Life 240R Rectangle UniQuarium - Blue Back | $2,491.00 | above range | $18.90 | median price of its category |
| Pets | 805979229 MegaGrass MegaPet Platinum 15 x 80 ft Artificial Grass for Pet Dog Pot | $2,488.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 103754630 Clear For Life 240R Rectangle UniQuarium - Black Back | $2,478.00 | above range | $409.00 | comparable item: Clear For Life 29R Rectangle UniQuarium - Black Ba |
| Pets | 647406199 MegaGrass MegaPet Platinum 15 x 79 ft Artificial Grass for Pet Dog Pot | $2,462.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 220269747 MegaGrass MegaPet Pro 15 x 60 ft Artificial Grass for Pet Dog Potty In | $2,457.66 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 894187851 MegaGrass MegaPet Pro 15 x 85 ft Artificial Grass for Pet Dog Potty In | $2,455.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 614972540 ALLGREEN Pet 15 x 73 FT Artificial Grass for Pet Dog Potty Training In | $2,440.29 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 861969235 MegaGrass MegaPet Platinum 15 x 78 ft Artificial Grass for Pet Dog Pot | $2,436.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 189792642 Clear For Life 225S Rectangle Acrylic Aquarium - Black Back | $2,421.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 460899858 MegaGrass MegaPet Platinum 15 x 77 ft Artificial Grass for Pet Dog Pot | $2,410.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 157395096 Clear For Life 225S Rectangle Acrylic Aquarium - Sapphire Blue Back | $2,406.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 663556359 Clear For Life 225S Rectangle Acrylic Aquarium - Blue Back | $2,406.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 170268007 MegaGrass MegaPet Platinum 15 x 76 ft Artificial Grass for Pet Dog Pot | $2,384.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 295121111 MegaGrass MegaPet Pro 15 x 82 ft Artificial Grass for Pet Dog Potty In | $2,384.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 491109225 ALLGREEN Pet 15 x 71 FT Artificial Grass for Pet Dog Potty Training In | $2,373.43 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 702432320 MegaGrass MegaPet Platinum 15 x 74 ft Artificial Grass for Pet Dog Pot | $2,332.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 297939828 ALLGREEN Pet 15 x 69 FT Artificial Grass for Pet Dog Potty Training In | $2,306.57 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 216512939 MegaGrass MegaPet Platinum 15 x 73 ft Artificial Grass for Pet Dog Pot | $2,306.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 197958537 MegaGrass MegaPet Pro 15 x 78 ft Artificial Grass for Pet Dog Potty In | $2,290.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 111994118 MegaGrass MegaPet Platinum 15 x 72 ft Artificial Grass for Pet Dog Pot | $2,280.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 594737903 Clear For Life 200R Rectangle UniQuarium - Sapphire Blue Back | $2,262.00 | above range | $1,920.00 | comparable item: Clear For Life 180R Rectangle UniQuarium - Sapphir |
| Pets | 803251194 MegaGrass MegaPet Pro 15 x 56 ft Artificial Grass for Pet Dog Potty In | $2,256.06 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 578677106 MegaGrass MegaPet Platinum 15 x 71 ft Artificial Grass for Pet Dog Pot | $2,254.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 466846039 Clear For Life 200R Rectangle UniQuarium - Blue Back | $2,250.00 | above range | $1,920.00 | comparable item: Clear For Life 180R Rectangle UniQuarium - Blue Ba |
| Pets | 670556461 Clear For Life 200R Rectangle UniQuarium - Black Back | $2,250.00 | above range | $18.90 | median price of its category |
| Pets | 399713603 ALLGREEN Pet 15 x 67 FT Artificial Grass for Pet Dog Potty Training In | $2,239.71 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 618243479 MegaGrass MegaPet Platinum 15 x 70 ft Artificial Grass for Pet Dog Pot | $2,227.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 545119415 MegaGrass MegaPet Pro 15 x 55 ft Artificial Grass for Pet Dog Potty In | $2,222.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 235739970 MegaGrass MegaPet Pro 15 x 77 ft Artificial Grass for Pet Dog Potty In | $2,216.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 464774611 ALLGREEN Pet 10 x 99 FT Artificial Grass for Pet Dog Potty Training In | $2,206.29 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 408580409 MegaGrass MegaPet Platinum 15 x 69 ft Artificial Grass for Pet Dog Pot | $2,201.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 243963390 MegaGrass MegaPet Pro 15 x 54 ft Artificial Grass for Pet Dog Potty In | $2,190.26 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 129432931 Clear For Life 180S Rectangle Acrylic Aquarium - Black Back | $2,187.00 | above range | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 151239666 Clear For Life 180S Rectangle Acrylic Aquarium - Sapphire Blue Back | $2,187.00 | above range | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 104284986 Clear For Life 300T Rectangle Acrylic Aquarium - Clear Back | $2,185.00 | above range | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 205686937 ALLGREEN Pet 10 x 98 FT Artificial Grass for Pet Dog Potty Training In | $2,184.00 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 812571852 MegaGrass MegaPet Platinum 15 x 68 ft Artificial Grass for Pet Dog Pot | $2,175.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 954051405 Clear For Life 180S Rectangle Acrylic Aquarium - Blue Back | $2,172.00 | above range | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 316843926 ALLGREEN Pet 10 x 97 FT Artificial Grass for Pet Dog Potty Training In | $2,161.71 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 423330474 Clear For Life 225S Rectangle Acrylic Aquarium - Clear Back | $2,153.00 | above range | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 413095486 MegaGrass MegaPet Platinum 15 x 67 ft Artificial Grass for Pet Dog Pot | $2,149.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 628872331 MegaGrass MegaPet Pro 15 x 74 ft Artificial Grass for Pet Dog Potty In | $2,145.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 987966450 ALLGREEN Pet 10 x 96 FT Artificial Grass for Pet Dog Potty Training In | $2,139.43 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 474135585 MegaGrass MegaPet Pro 15 x 52 ft Artificial Grass for Pet Dog Potty In | $2,124.46 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 557701802 MegaGrass MegaPet Platinum 15 x 66 ft Artificial Grass for Pet Dog Pot | $2,123.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 818794205 MegaGrass MegaPet Pro 15 x 73 ft Artificial Grass for Pet Dog Potty In | $2,122.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 507123900 ALLGREEN Pet 10 x 95 FT Artificial Grass for Pet Dog Potty Training In | $2,117.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 775952120 ALLGREEN Pet 15 x 63 FT Artificial Grass for Pet Dog Potty Training In | $2,106.00 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 24503041 ShelterLogic 24 x 22 x 13 ft Green Run-In Shelter | $2,098.99 | above range | $18.90 | median price of its category |
| Pets | 154035957 Clear For Life 240S Rectangle Acrylic Aquarium - Clear Back | $2,092.00 | above range | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 310483513 ALLGREEN Pet 15 x 62 FT Artificial Grass for Pet Dog Potty Training In | $2,072.57 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 455719568 ALLGREEN Pet 10 x 93 FT Artificial Grass for Pet Dog Potty Training In | $2,072.57 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 247525821 MegaGrass MegaPet Pro 15 x 70 ft Artificial Grass for Pet Dog Potty In | $2,051.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 923175936 MegaGrass MegaPet Platinum 15 x 65 ft Artificial Grass for Pet Dog Pot | $2,047.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 990710076 ALLGREEN Pet 15 x 61 FT Artificial Grass for Pet Dog Potty Training In | $2,039.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 479797292 ALLGREEN Pet 10 x 91 FT Artificial Grass for Pet Dog Potty Training In | $2,028.00 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 769148528 MegaGrass MegaPet Platinum 15 x 64 ft Artificial Grass for Pet Dog Pot | $2,021.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 839455099 ALLGREEN Pet 15 x 43 FT Artificial Grass for Pet Dog Potty Training In | $2,012.40 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 627336877 MegaGrass MegaPet Pro 15 x 68 ft Artificial Grass for Pet Dog Potty In | $2,004.00 | above range | $560.00 | comparable item: MegaGrass MegaPet Pro 15 x 11 ft Artificial Grass  |
| Pets | 162772768 50” Stainless Steel Large Dog Grooming Bath Tub Kit, Pet Bathing Stati | $1,999.99 | above range | $862.99 | comparable item: CO-Z 50 Stainless Steel Dog Grooming Bath Tub Kit, |
| Pets | 418586257 135 Gallon Fish Tank Aquarium with LED Light and Stand Bundle Pump Cur | $1,999.00 | above range | $151.82 | median price of the same kind of item |
| Pets | 726804955 MegaGrass MegaPet Platinum 15 x 63 ft Artificial Grass for Pet Dog Pot | $1,995.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 6919561332 coop Smart Coop for 4 to 6 Chickens with Steel Run, 100-000 | $1,995.00 | above range | $1,695.00 | comparable item: coop Smart Coop for 4 to 6 Chickens with Elevated  |
| Pets | 726313439 ALLGREEN Pet 10 x 89 FT Artificial Grass for Pet Dog Potty Training In | $1,983.43 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 306904982 ALLGREEN Pet 15 x 59 FT Artificial Grass for Pet Dog Potty Training In | $1,972.29 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 121236957 MegaGrass MegaPet Platinum 15 x 62 ft Artificial Grass for Pet Dog Pot | $1,969.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 162186932 ALLGREEN Pet 10 x 88 FT Artificial Grass for Pet Dog Potty Training In | $1,961.14 | above range | $1,626.86 | comparable item: ALLGREEN Pet 10 x 73 FT Artificial Grass for Pet D |
| Pets | 645616531 MegaGrass MegaPet Platinum 15 x 61 ft Artificial Grass for Pet Dog Pot | $1,943.00 | above range | $1,812.00 | comparable item: MegaGrass MegaPet Platinum 15 x 56 ft Artificial G |
| Pets | 147940469 Clear For Life 180S Rectangle Acrylic Aquarium - Clear Back | $1,935.00 | far above the same kind of item | $989.00 | comparable item: Clear For Life 150R Rectangle Acrylic Aquarium - C |
| Pets | 29418454 Lucky Dog European Style Modular Kennel for Dogs | $1,931.15 | far above the same kind of item | $108.95 | median per-unit price of comparable items |
| Pets | 16393209850 VL Holiday Plush Dog Toys HP | $1,647.00 | far above the same kind of item | $9.64 | comparable item: Holiday Time Plush Dog Toys, Brown, 3 pack |
| Pets | 546671021 Purina Beggin' Strip 168pc Purina Beggin' Str | $1,624.56 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Pets | 159790096 Clear For Life 240R Rectangle Acrylic Aquarium - Sapphire Blue Back | $1,604.00 | far above the same kind of item | $582.00 | comparable item: Clear For Life 90R Rectangle Acrylic Aquarium - Sa |
| Pets | 186974934 Clear For Life 240R Rectangle Acrylic Aquarium - Black Back | $1,596.00 | far above the same kind of item | $150.00 | comparable item: Clear For Life 10R Rectangle Acrylic Aquarium - Bl |
| Pets | 276239483 Clear For Life 240R Rectangle Acrylic Aquarium - Blue Back | $1,596.00 | far above the same kind of item | $294.00 | comparable item: Clear For Life 55S Rectangle Acrylic Aquarium - Bl |
| Pets | 301990079 Vibrant Life Holiday Plush Dog Toy | $1,588.00 | far above the same kind of item | $11.99 | comparable item: Hyper Pet Holiday Donkey Plush Dog Toy |
| Pets | 5261873902 Milk-Bone + Jif Pean | $1,523.20 | far above the same kind of item | $11.48 | median price of the same kind of item |
| Pets | 29418652 Lucky Dog 10' Steel Modular Kennel for Dogs with Swing Gate | $1,508.48 | far above the same kind of item | $108.95 | median per-unit price of comparable items |
| Pets | 204109085 EcoPlus Commercial Grade Water Chiller 1HP | $1,499.99 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 328007679 Prevue Pet Products Large Stainless Steel Playtop Bird Cage in Silver  | $1,494.99 | far above the same kind of item | $74.06 | comparable item: Prevue Pet Products Lotus Stainless Steel Bird Cag |
| Pets | 2310569708 BENTISM 62" Professional Pet Grooming Bath Tub 304 Stainless Steel Was | $1,477.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 29418453 Lucky Dog™ 6'H x 10'W x 10'L Euro Style Kennel | $1,448.00 | far above the same kind of item | $228.89 | comparable item: Lucky Dog Boxed Chain Link Kennel, 10' L X 5' W X  |
| Pets | 29418643 Jewett Cameron Durable 2-Door 5' Pet Kennels & Crates for Dogs | $1,444.63 | far above the same kind of item | $53.84 | median price of the same kind of item |
| Pets | 48046968 Lucky Dog Welded Wire Outdoor Dog Kennel, Black, 10'L x 10'W x 6'H | $1,419.00 | far above the same kind of item | $500.00 | comparable item: Lucky Dog Heavy Duty Outdoor Dog Kennel, Black, 10 |
| Pets | 916196772 Prevue Pet Products Prevue Pet Products Imperial Extra Large Stainless | $1,399.99 | far above the same kind of item | $63.24 | comparable item: Prevue Pet Products Extra Large Bird Cage Cover 12 |
| Pets | 55680980 KingFurt 16.5 Ft Automatic Retractable Dog Leash Pet Walking Collar No | $1,373.00 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 900747331 Surefit 3/4'' Biothane E-Bungee Collar XL 18''-32'' Neck Size Or Doubl | $1,311.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 3619887655 BENTISM Professional Stainless Steel Pet Grooming Bath Tub Electric Li | $1,299.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 16667215905 KFFKFF Stainless Steel Pet Grooming Tub, 61-Inch Washing Station with  | $1,299.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 35944776 8004836 Black Play Top Bird Cage, by A&E Cage Company | $1,292.76 | far above the same kind of item | $880.82 | comparable item: 8003628 White Play Top Bird Cage, by A&E Cage Comp |
| Pets | 5579863899 Purina 28 Day Challe | $1,215.00 | far above the same kind of item | $16.97 | median price of the same kind of item |
| Pets | 3125684894 Vibrant Life Halloween 6in Squeaky Plush Dog Toy | $1,191.00 | far above the same kind of item | $3.97 | comparable item: Vibrant Life Halloween 7in Squeaky Plush Dog Toy,  |
| Pets | 39577518 Prevue Pet Products Empire Extra Large Bird Cage - Black Hammertone | $1,149.99 | far above the same kind of item | $379.99 | comparable item: Prevue Pet Products Extra-Large Wrought Iron Fligh |
| Pets | 3435738521 Garmin Alpha 300 Handheld, Advanced Dog Tracking and Training Handheld | $1,149.99 | far above the same kind of item | $15.77 | comparable item: Garmin DC 40 - Collar for navigator - for Garmin D |
| Pets | 785885642 Capsule Feeders Bad Ass Auger-Tripod Feeder Filler | $1,147.52 | far above the same kind of item | $23.40 | median price of the same kind of item |
| Pets | 1965503985 BENTISM 50\" Pet Grooming Bath Tub Electric Lift Leakage-Proof Dog Cat | $1,132.43 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 3791332472 Bundle: NUTRO Grain Free Wet Cat Food Cuts in Gravy Beef, Tuna, & Chic | $1,124.50 | far above the same kind of item | $0.99 | comparable item: Nutro Wholesome Essentials Indoor Dry Cat Food, Ch |
| Pets | 654099122 EcoPlus Commercial Grade Water Chiller 1/2 HP | $1,099.99 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 165222306 United Welding Services 2-Door 48" Aluminum Crate for Dogs | $1,095.03 | far above the same kind of item | $176.99 | comparable item: MidWest Homes for Pets 2-Door 48" Crate for Dogs w |
| Pets | 946656891 IAMS DD 15LB Display | $1,078.80 | far above the same kind of item | $54.76 | median per-unit price of comparable items |
| Pets | 16265301746 KFFKFF Stainless Steel Pet Grooming Tub, 62-Inch Washing Station with  | $1,049.90 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 17650341 A and E Cage Co. Enormous Dome Top Bird Cage - White | $1,010.44 | far above the same kind of item | $149.63 | comparable item: A&E Cage Co Dome Top Bird Cage - Platinum |
| Pets | 48302170 Lucky Dog Welded Wire Outdoor Kennel, Black, 10'L x 5'W x 6'H | $1,009.00 | far above the same kind of item | $500.00 | comparable item: Lucky Dog Heavy Duty Outdoor Dog Kennel, Black, 10 |
| Pets | 14223804 Prevue Pet Products Wrought Iron Silverado Macaw Dometop Bird Cage, Si | $999.99 | far above the same kind of item | $192.53 | comparable item: Prevue Hendryx Parkway Wrought Iron Bird Cage |
| Pets | 9128769837 KFFKFF Tennis Ball Launcher, Compact Automatic Ball Machine for Tennis | $999.99 | far above the same kind of item | $18.99 | median price of the same kind of item |
| Pets | 17650411 A and E Cage Co. Large Split Level Play Top Bird Cage-Black | $983.54 | far above the same kind of item | $383.12 | comparable item: A and E Cage Co. Elegant Style Flight Bird Cage-Bl |
| Pets | 17650464 CC3232 Black Large Corner Bird Cage, by A&E Cage Compamy | $928.81 | far above the same kind of item | $493.76 | comparable item: 4030FL Black Extra Large Flight Bird Cage, by A&E  |
| Pets | 365010618 Greenies Gingerbread | $926.08 | far above the same kind of item | $5.50 | comparable item: Gingerbread |
| Pets | 17650466 CC3232 Platinum Large Corner Bird Cage, by A&E Cage Company | $925.32 | far above the same kind of item | $529.98 | comparable item: 4030FL Platinum Extra Large Flight Bird Cage, by A |
| Pets | 16341770776 Emeprev Tablets, 160 mg | $923.04 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 16037321838 KFFKFF Stainless Steel Pet Grooming Tub, 62 inch Washing Station with  | $909.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 821275917 Holistic Select Natural Wet Grain Free Canned Cat Food, Turkey P?t? Re | $885.07 | far above the same kind of item | $70.14 | comparable item: Holistic Select Natural Wet Grain Free Canned Cat  |
| Pets | 580478901 Meow Mix 53pcbv1139 Cat Sol | $870.97 | far above the same kind of item | $8.30 | median price of the same kind of item |
| Pets | 14117121529 Fancy Feast Gems/4 C | $861.00 | far above the same kind of item | $4.60 | comparable item: Aqua Culture Aqua Glass Gems, 14 oz |
| Pets | 249162713 Dakota 283 Hero Dog Kennel - Coyote Granite | $859.00 | far above the same kind of item | $593.99 | comparable item: Dakota 283 T1 Dog Kennel - Coyote Granite |
| Pets | 805073316 Dakota 283 Hero Dog Kennel - Dark Granite | $859.00 | far above the same kind of item | $509.00 | comparable item: Dakota 283 T1 Dog Kennel - Dark Granite |
| Pets | 55680982 KingFurt 16.5 Ft Automatic Retractable Dog Leash Pet Walking Collar No | $854.39 | far above the same kind of item | $10.00 | comparable item: Retractable Dog Leash 16ft Pet Walking Leash with  |
| Pets | 33709829 Lucky Dog European Style Modular Kennel | $851.74 | far above the same kind of item | $219.99 | comparable item: Lucky Dog Modular Outdoor Chain Link Pet Kennel, 1 |
| Pets | 8576214889 KFFKFF Mobile Tennis Ball Launcher, Automatic Ball Thrower with Capaci | $829.99 | far above the same kind of item | $50.37 | median price of the same kind of item |
| Pets | 5390960367 Cat Chow Tidy Cats P | $812.88 | far above the same kind of item | $7.99 | comparable item: Dental Fresh Original for Cats, 8 fl oz |
| Pets | 43380796 Power Pet Automatic Power Pet Door for Patio Doors with Dual Pane Low- | $809.99 | far above the same kind of item | $63.15 | median price of the same kind of item |
| Pets | 42713209 SportDOG Brand® TEK Series 2.0 GPS + E-Collar | $799.95 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 142515357 Dragon Pet Door For Sliding Glass Doors | Pet Friendly Dog Door For Bl | $792.00 | far above the same kind of item | $63.15 | median price of the same kind of item |
| Pets | 324852999 CatastrophiCreations Cat Tree & Condo Scratching Post Tower, English C | $785.95 | far above the same kind of item | $22.37 | comparable item: Mllieroo 17-in Cat Tree & Condo Scratching Post To |
| Pets | 907150755 REPTIZOO Reptile Terrarium 72L×24D×24H Bottom | $770.00 | far above the same kind of item | $67.36 | comparable item: REPTIZOO 3.5 Gallon Reptile Glass Terrarium Tank |
| Pets | 16051517470 KFFKFF Stainless Steel Pet Grooming Tub, 50 inch Wash Station with Ram | $769.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 15350207597 Battle of the Beggin | $752.00 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Pets | 1333286001 Beggin Crowdsourced | $751.68 | far above the same kind of item | $97.44 | comparable item: Beggin Hlwn Tray |
| Pets | 5429465861 BEGGIN Mixed FP Disp | $751.68 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Pets | 3539632143 Apoquel 3.6MG Tablets- Single Tablet | $745.00 | far above the same kind of item | $22.76 | comparable item: Truprofen 100 mg tablet, 30 count |
| Pets | 375280469 Owens Products, Inc. XL Collapsible Working Dog Crate, Gray | $731.71 | far above the same kind of item | $53.84 | median price of the same kind of item |
| Pets | 159352637 YankeeDoodle Durable Chewable Dog Toy for All Sizes | $728.08 | far above the same kind of item | $9.99 | comparable item: Old Goldie Durable Chewable Dog Toy for All Sizes |
| Pets | 661928700 Holistic Select Natural Wet Grain Free Canned Cat Food, Chicken P?t? R | $725.76 | far above the same kind of item | $70.14 | comparable item: Holistic Select Natural Wet Grain Free Canned Cat  |
| Pets | 931216608 Holistic Select Natural Wet Grain Free Canned Cat Food, Chicken Liver  | $725.76 | far above the same kind of item | $245.63 | comparable item: Holistic Select Natural Wet Grain Free Canned Dog  |
| Pets | 915124939 Blue Buffalo 45pc Blue6-lbendcap | $719.10 | far above the same kind of item | $24.18 | median price of the same kind of item |
| Pets | 6195203401 Milk-Bone Spooky Pai | $718.08 | far above the same kind of item | $11.48 | median price of the same kind of item |
| Pets | 943830211 MLD AQUARIUM WIDE BLK 180GL | $701.42 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 16030801555 KFFKFF Stainless Steel Pet Grooming Tub, 50 inch Dog Washing Station w | $699.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 14622314004 Litter-Robot 4 Automatic Self-Cleaning Cat Litter Box with Step, Black | $699.00 | far above the same kind of item | $65.00 | comparable item: Litter-Robot 4 Ramp for Automatic Litter Box, Whit |
| Pets | 14628420540 Litter-Robot 4 Automatic Self-Cleaning Cat Litter Box with Step, White | $699.00 | far above the same kind of item | $65.00 | comparable item: Litter-Robot 4 Ramp for Automatic Litter Box, Whit |
| Pets | 855301605 PureBites Grain-Free Chicken Breast & Lamb Freeze Dried Cat Treat, 0.9 | $680.78 | far above the same kind of item | $3.49 | comparable item: PureBites Chicken Breast & Lamb Recipe Limited Ing |
| Pets | 2159395634 Apoquel 16Mg Tablet- Single Tablet | $675.00 | far above the same kind of item | $22.76 | comparable item: Truprofen 100 mg tablet, 30 count |
| Pets | 1295414253 Vibrant Life Spring Stuffed Plush Dog Toy | $670.95 | far above the same kind of item | $6.53 | comparable item: Vibrant Life Spring 10-inch Stuffed Plush Bone Dog |
| Pets | 855570203 VEVOR 38 inch Dog Grooming Tub Stainless Steel Professional Pet Bathin | $668.00 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 128998220 ExoFit™ Tower Climbing Harness | $667.99 | far above the same kind of item | $19.51 | median price of the same kind of item |
| Pets | 19341148 Dogtra 1 Mile 4 Dog Training Collar | $664.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 16365714780 Emeprev Tablets, 60 mg | $663.30 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 281275539 Rein WPS0514 OE Quality Water Pump Replacement Kit with Upgraded Metal | $647.68 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 611799311 IAMS 13.5lb End Cap | $647.28 | far above the same kind of item | $14.35 | comparable item: Toy Doggie Cap M |
| Pets | 34250657 DOGGIE DESIGN Dog Harness Ombre Collection - Limestone Gray | $644.99 | far above the same kind of item | $19.51 | median price of the same kind of item |
| Pets | 3515934623 Dubbin Self Cleaning Automatic Litter Box for Cats, 3.3~22lbs - Contro | $641.99 | far above the same kind of item | $170.23 | median per-unit price of comparable items |
| Pets | 16365714782 Emeprev Tablets, 160 mg | $615.36 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 292284459 PETKIT Pura x Smart Litter Box for Cat Including Wifi, Ultra Automatic | $599.00 | far above the same kind of item | $42.61 | median price of the same kind of item |
| Pets | 5398869212 PAWBBY Self Cleaning Litter Box, Automatic Cat Litter Box Self Cleanin | $599.00 | far above the same kind of item | $8.27 | comparable item: MeoWant Self-Cleaning Cat Litter Box, 75L Extra La |
| Pets | 563032274 New Age Pet ECOFLEX® Homestead Sliding Barn Door Dog Crate-Grey | $593.58 | far above the same kind of item | $199.97 | comparable item: New Age Pet Ecoflex Homestead Sliding Barn Door Do |
| Pets | 326948033 150XH RR AQUARIUM BLK 48X24X30 | $571.73 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 219026305 Holistic Select Natural Wet Grain Free Canned Cat Food, Turkey P?t? Re | $568.56 | far above the same kind of item | $38.26 | comparable item: Holistic Select Natural Wet Grain Free Canned Cat  |
| Pets | 789937751 Adjustable Faux Leather Dog Cat Pet Personalized Rhinestone Name Colla | $555.56 | far above the same kind of item | $5.32 | comparable item: Adjustable Faux Leather Dog Cat Pet Personalized R |
| Pets | 6840866655 DIGGS Evolv Dog Crate, Safe, Durable Kennel with Removable Ceiling Pan | $549.00 | far above the same kind of item | $239.20 | comparable item: DIGGS Evolv Dog Crate, Safe, Durable Kennel with R |
| Pets | 844498383 Dogtra 2700T&B 1 Mile 2 Dog Remote Training Collar with Beeper System | $539.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 19341150 Dogtra 1 Mile 3 Dog Training Collar | $536.77 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 198933001 SUGIFT Automatic Cat Litter Box APP Control, Secure, Self-Cleaning Cat | $529.99 | far above the same kind of item | $125.33 | median per-unit price of comparable items |
| Pets | 15169417729 WM MPC Iams Cat Heal | $527.00 | far above the same kind of item | $15.01 | median price of the same kind of item |
| Pets | 6327967953 Milk-Bone Holiday Bi | $518.44 | far above the same kind of item | $8.30 | comparable item: Foppers 8P Holiday |
| Pets | 464444547 Vibrant Life Fetch Buddy Ball Treat Roller Dog Toy, Color May Vary | $510.00 | far above the same kind of item | $3.97 | comparable item: Vibrant Life Fetch Buddy Spikey Ball Dog Toy, Colo |
| Pets | 429738584 Practical Automatic Chicken Feeder Auto Treadle Self Opening Aluminium | $506.22 | far above the same kind of item | $43.39 | comparable item: Practical Automatic Chicken Feeder Auto Treadle Se |
| Pets | 480776941 Coralife LED Biocube Marine or Freshwater Aquarium Kit 32 | $499.99 | far above the same kind of item | $229.99 | comparable item: Coralife Biocube LED Canopy 14/16 |
| Pets | 5212441456 REPTI ZOO Full Tempered Reptile Glass 48 x 24 x48 inches | $499.99 | far above the same kind of item | $21.98 | median price of the same kind of item |
| Pets | 5478658004 New Age Pet® ECOFLEX® Extra Large 60" Wide Reptile Enclosure, Glass Fr | $499.99 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 5493766409 New Age Pet® ECOFLEX® Extra Large 60" Wide Reptile Enclosure, Glass Fr | $499.99 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 613126430 123.6" Large Outdoor Wooden Chicken Coop Poultry Cage Rabbit Hutch Sma | $499.00 | far above the same kind of item | $395.99 | comparable item: Anysun 73.6" Large Wooden Chicken Coop Small Anima |
| Pets | 803679571 RW8 Cordless Reef Coral Fish Tank Wireless Linkage Wavemaker Aquarium  | $497.11 | far above the same kind of item | $86.26 | comparable item: RW8 Cordless Reef Coral Fish Tank Wireless Linkage |
| Pets | 571168676 VEVORbrand 34" Pet Grooming Tub for Dogs with Removable Door & Ladder, | $489.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 231494465 SmartyKat Skitter Stash (Set of 12) Catnip Cat Toy Holiday | $489.60 | far above the same kind of item | $16.00 | comparable item: SmartyKat Merry Medley (Set of 16) Holiday Soft Pl |
| Pets | 2358448021 SmartyKat Spout 'N Spin Motion Cat Toy with Twirling Feathers & Ribbon | $489.60 | far above the same kind of item | $8.36 | median price of the same kind of item |
| Pets | 22471989 Zeniquin Tablets | $484.68 | far above the same kind of item | $93.32 | comparable item: Anipryl Tablets |
| Pets | 49036927 Educator PE-903 Three Dog Pro 1/2 Mile E-Collar Remote Dog Training Co | $479.99 | far above the same kind of item | $219.99 | comparable item: E-Collar ET-400 Mini Educator Remote Dog Training  |
| Pets | 729745511 Two Floors 62" Wooden Outdoor Indoor Roof Waterproof Bunny Hutch Rabbi | $479.98 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 2343100470 BENTISM 34" Pet Grooming Tub Dog Wash Station Stainless Steel with Acc | $475.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 699916737 OASE BioMaster Thermo 850 External Aquarium Filter with Built-in Heate | $465.99 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 6944902662 Uforic 110" Catio Outdoor Cat Enclosure Large Wooden Cat House with wi | $461.55 | far above the same kind of item | $29.48 | median price of the same kind of item |
| Pets | 701071971 VEVOR 34" Pet Grooming Tub, Stainless Steel Dog Wash Station Pet Washi | $460.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 15190024536 KFFKFF Lake Oxygenator, 550W Capacity, 5.2CFM Suitable for 1 Acre 50'  | $456.46 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 17750512 DOGTRA COMPANY 3502NCP Dogtra SupX 2Dog Collar | $454.87 | far above the same kind of item | $170.33 | comparable item: DOGTRA COMPANY 300M Dogtra Element Collar |
| Pets | 16364964820 Catit Pixi Vision Smart Feeder | $452.48 | far above the same kind of item | $111.85 | comparable item: Catit Pixi Smart Feeder |
| Pets | 3863350842 BENTISM Pet Grooming Tub Dog Wash Station 34\" Stainless Steel with Ac | $449.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 5212441418 REPTI ZOO 48x24x24 Reptile PVC Terrariums with Glass Sliding Door & To | $449.99 | far above the same kind of item | $79.99 | comparable item: REPTI ZOO Reptile Glass Terrarium Habitat Cages, 2 |
| Pets | 16366756517 Emeprev Tablets, 60 mg | $442.20 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 781181812 Walk-In Animal Enclosure Made from Durable Powder-Coated Steel for Chi | $438.53 | far above the same kind of item | $18.95 | median price of the same kind of item |
| Pets | 434325482 Holistic Select Natural Wet Grain Free Canned Cat Food, Salmon & Shrim | $437.39 | far above the same kind of item | $38.26 | comparable item: Holistic Select Natural Wet Grain Free Canned Cat  |
| Pets | 16365714781 Emeprev Tablets, 24 mg | $436.08 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 702533308 Greenies 12oz Val SK | $431.52 | far above the same kind of item | $19.96 | comparable item: Greenies 6oz SK 18ct |
| Pets | 331198505 Lifegard Aquatics Compact Aquarium Filtration System | $431.41 | far above the same kind of item | $79.85 | comparable item: Lifegard Aquatics CustomFlo Aquarium Water System  |
| Pets | 601852251 Dogtra PATHFINDER GPS Tracking & Dog Training Collar 9-Mile 21-Dog Exp | $429.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 19918209203 Smart Automatic Self-Cleaning Cat Litter Box with Wide Opening, WiFi A | $419.99 | far above the same kind of item | $199.00 | comparable item: Smart Cat Litter Box, Self-Cleaning with WiFi App  |
| Pets | 19341156 Dogtra Advance 2 Dog Training Collar | $419.98 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 424701835 (2) PONDMASTER 2400 GPH Mag Drive Pond Garden Aquarium Max Flow Pumps  | $418.53 | far above the same kind of item | $44.12 | comparable item: (2) PONDMASTER Model 1.5 Mag Drive 140 GPH Aquariu |
| Pets | 19341147 Dogtra 1 Mile 2 Dog Training Collar | $414.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 16554109064 Euroco Large Outdoor Cat Enclosure with Sleeping Houses, Climbing Plat | $404.52 | far above the same kind of item | $245.00 | comparable item: Euroco Large Outdoor Cat Enclosure with Sleeping H |
| Pets | 365915448 OASE BioMaster 850 External Aquarium Filter | $403.99 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 26365337 Dogtra EDGE Remote Trainer (Up To 4 Dogs) Correction Shock Collar Syst | $400.99 | far above the same kind of item | $163.99 | comparable item: Dogtra Edge RT Trainer Extra Collar - Orange |
| Pets | 649411579 Fluval 45 Bow LED Aquarium Kit | $400.16 | far above the same kind of item | $205.99 | comparable item: Fluval 26-Gallon Bow LED Aquarium Starter Kit |
| Pets | 425992778 Roman Cat Fort - Onyx/Charcoal Gray | $400.00 | far above the same kind of item | $160.05 | comparable item: Deluxe Cat Playplace - Onyx/Charcoal Gray |
| Pets | 22047861 E-Collar "The Boss" Educator ET-802 Dog Training Collar with Remote, B | $399.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 22072442 E‑Collar UL‑1202 2‑Dog Upland Remote Trainer – 1 Mile Hunting/Training | $399.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 174591124 Pathfinder GPS E-Collar | $399.99 | far above the same kind of item | $23.99 | comparable item: Dogtra Dummy Collar Dummy Collar |
| Pets | 14843162346 KennelMaster Ranch Coop with Run, 73.3" x 40" x 58", Spacious and Elev | $399.99 | far above the same kind of item | $1,856.99 | comparable item: KennelMaster Walk In Chicken Coop With Run, 98L x  |
| Pets | 388911183 Instachew Purrclean Self-Cleaning Automatic Cat Litter Box with App Co | $399.00 | far above the same kind of item | $23.27 | median price of the same kind of item |
| Pets | 20969372844 Smart Cat Litter Box Cat Litter Box Wide Opening | $395.90 | far above the same kind of item | $48.49 | comparable item: Cat Litter Box |
| Pets | 520772797 Large Metal Chicken Coop Cage Walk-in Enclosure Poultry Hen Run House  | $390.83 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 49038484 E-Collar PE-902 2Dog Educator Pro Remote Dog Training E-Collar - 1/2 M | $389.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 701257901 ECOFLEX Kitty Kase Cat Play Tower | $387.86 | far above the same kind of item | $131.04 | comparable item: ecoFLEX Kitty Kube Cat House with Scratch Pad, Gra |
| Pets | 20046473044 Smart Cat Litter Box Cat Litter Box Wide Opening | $387.20 | far above the same kind of item | $48.49 | comparable item: Cat Litter Box |
| Pets | 915063772 Lifegard Aquatics In-Line Module Aquarium Filtration System | $384.86 | far above the same kind of item | $79.85 | comparable item: Lifegard Aquatics CustomFlo Aquarium Water System  |
| Pets | 728717736 VEVOR 8.5L Water Chiller CW-5200DG Water Cooling Chiller Industrial Wa | $383.12 | far above the same kind of item | $4.57 | median per-unit price of comparable items |
| Pets | 633047446 110 AQUARIUM BLK 48X18X30 BS | $382.69 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 19488516873 90.5" Wooden Rabbit Hutch Bunny Cage Pet Playpen House Enclosure with  | $381.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 159711842 ECOFLEX Kitty Kase Cat Play Tower | $380.77 | far above the same kind of item | $131.04 | comparable item: ecoFLEX Kitty Kube Cat House with Scratch Pad, Gra |
| Pets | 243796691 Geba 100% New Water Pump, New | $380.50 | far above the same kind of item | $173.90 | comparable item: Geba 100% New Water Pump |
| Pets | 22068496 Educator WF-1202 Two Dog Waterfowl Hunting 1 Mile E-Collar Remote Dog  | $379.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 18149972957 KFFKFF 38-Inch Stainless Steel Pet Grooming Tub with Faucet, Showerhea | $379.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 9754470150 Revolution (Selamectin) Topical Solution for Dogs, 40.1-85 lbs, (Teal  | $379.04 | far above the same kind of item | $29.93 | comparable item: Revolution (Selamectin) Topical Solution for Dogs, |
| Pets | 212053134 Pierburg OE Replacement - 100% New Water Pump | $377.80 | far above the same kind of item | $158.18 | comparable item: Motorcraft OE Replacement - 100% New Water Pump |
| Pets | 20185604691 Smart Automatic Cat Litter Box, UVC Light & Gel Dual Purification Self | $372.23 | far above the same kind of item | $23.27 | median price of the same kind of item |
| Pets | 5262667254 REPTI ZOO 48x18x18 Reptile PVC Terrariums with Glass Sliding Door & To | $369.99 | far above the same kind of item | $79.99 | comparable item: REPTI ZOO Reptile Glass Terrarium Habitat Cages, 2 |
| Pets | 20203665122 90.5" Wooden Rabbit Hutch Bunny Cage Pet Playpen House Enclosure with  | $366.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 24253028 Little Giant 4-MDQX-SC 115-Volt, 1/10 HP, 1225 GPH, Magnetic Drive Aqu | $366.95 | far above the same kind of item | $180.00 | comparable item: Little Giant 2-MDQX-SC 115-Volt, 1/30 HP, 640 GPH  |
| Pets | 20087359419 90.5" Wooden Rabbit Hutch Bunny Cage Pet Playpen House Enclosure with  | $366.09 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 19341152 Dogtra Surestim Low-High 2 dog Training Collar | $361.10 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 42392606 Dogtra Edge Expandable Remote Training Collar System, Black | $359.99 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 20082050024 Neakasa M1 Plus Open Top Self-Cleaning Cat Litter Box | $359.99 | far above the same kind of item | $99.88 | comparable item: Littermaid® Plus Self-Cleaning Cat Litter Box |
| Pets | 8346803782 New Age Pet® ECOFLEX® Extra Large 60" Wide Reptile Enclosure, Glass Fr | $359.77 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 25302431 Petmate Vari Extra Large Plastic Portable Dog Kennel Airline Friendly  | $359.49 | far above the same kind of item | $161.95 | comparable item: Petmate Vari Large Plastic Portable Dog Kennel Air |
| Pets | 5201901268 VETIQ Supplement Sid | $359.40 | far above the same kind of item | $24.00 | median price of the same kind of item |
| Pets | 9756500183 Revolution (Selamectin) Topical Solution for Dogs, 10.1-20 lbs, (Brown | $359.21 | far above the same kind of item | $29.93 | comparable item: Revolution (Selamectin) Topical Solution for Dogs, |
| Pets | 856118614 Wooden Pet House, Honey Oak & Green | $358.53 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 988630634 Pop It Ball Sidekick | $357.84 | far above the same kind of item | $24.73 | median price of the same kind of item |
| Pets | 16250855737 KFFKFF Stainless Steel Pet Grooming Tub, 38 inch Dog Washing Station w | $351.50 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 603019404 Dogtra 1900S Black Remote Dog Training Collar Ergonomic 1-Mile IPX9K W | $350.00 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 682897632 Sky Track - Onyx/Charcoal Gray | $350.00 | far above the same kind of item | $98.00 | comparable item: Large Fabric Raceway - Onyx/Charcoal Gray |
| Pets | 3603311041 Garmin Alpha TT 25 GPS Dog Tracking Collar | $349.99 | far above the same kind of item | $15.77 | comparable item: Garmin DC 40 - Collar for navigator - for Garmin D |
| Pets | 801037585 PetSafe YardMax Battery-Operated In-Ground Dog Fence, Easy DIY, Waterp | $349.95 | far above the same kind of item | $18.99 | median price of the same kind of item |
| Pets | 9767252472 Revolution (Selamectin) Topical Solution for Dogs, 5.1-10lbs, (Purple  | $349.88 | far above the same kind of item | $23.37 | comparable item: Revolution (Selamectin) Topical Solution for Dogs, |
| Pets | 16317121043 Emeprev Tablets, 16 mg | $347.74 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 531176454 PERFECTO AQUARIUM BLACK 125 | $346.95 | far above the same kind of item | $143.15 | comparable item: PERFECTO AQUARIUM BLACK 65 |
| Pets | 14897549 CALIFORNIA AQUARIUM SUPPLY CRP | $339.00 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 454910623 Miller by Honeywell Universal Revolution Full Body Style Harness With  | $334.43 | far above the same kind of item | $19.51 | median price of the same kind of item |
| Pets | 19341162 Dogtra Hunter 2 Dog Training Collar Platinum System 282 NCP | $329.99 | far above the same kind of item | $210.99 | comparable item: Hunter 1 Dog Training Collar Platinum System |
| Pets | 22071608 E-Collar Technologies ET-302TS-L ET-302TS-L 1-2 Mile Remote Training S | $329.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 30581506 Dog Expedition TC1 Add-on Border Patrol Collar | $329.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 47728672 Dogtra 282C Remote Dog Training Collar Waterproof Rechargeable 1/2-Mil | $329.99 | far above the same kind of item | $214.99 | comparable item: Dogtra 280C Remote Dog Training Collar Waterproof  |
| Pets | 318422202 Premier Pet Wireless Dog Fence System (Save $25 with collar bundle) | $320.88 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 14659102675 Flea & Tick Shampoo/ | $320.00 | far above the same kind of item | $16.99 | comparable item: Paw Earth Flea&Tick Shampoo 17 Oz |
| Pets | 20664452473 K9 Advantix II Monthly Flea & Tick Prevention for Small Dogs 4-10 lbs, | $319.96 | far above the same kind of item | $79.99 | comparable item: K9 Advantix II Monthly Flea & Tick Prevention for  |
| Pets | 424995136 Two Floors 62" Wooden Outdoor Indoor Roof Waterproof Bunny Hutch Rabbi | $319.90 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 742843199 Chinese Rosewood 5 Leg Fishbowl Display Stand - Honey - Size 15.5 in.  | $319.00 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 824501938 OASE BioMaster Thermo 350 External Aquarium Filter with Built-in Heate | $319.00 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 539375831 ANYSUN Rabbit Hutch with Ramp - Wooden Frame Chicken Coop Pet Supplies | $317.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 20234706277 Small Animals Cage,3 Tier Pet Cage,Wooden Hamster Cage | $317.99 | far above the same kind of item | $106.99 | comparable item: Small Animal Habitat Cage, Hamster Cage Pet Cage |
| Pets | 20100520130 Smart Automatic Cat Litter Box with Wide Opening, Self-Cleaning Electr | $317.98 | far above the same kind of item | $179.29 | comparable item: Self-Cleaning Automatic Cat Litter Box with Wide O |
| Pets | 720835318 New Age Pet® ECOFLEX® Large 48" Wide Reptile Enclosure, Glass Front Te | $317.22 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 20113221144 Small Animals Cage,3 Tier Pet Cage,Wooden Hamster Cage | $317.09 | far above the same kind of item | $106.99 | comparable item: Small Animal Habitat Cage, Hamster Cage Pet Cage |
| Pets | 22071607 E-Collar ET-402 2Dog Mini Educator Remote Training E-Collar - 3/4 Mile | $316.85 | far above the same kind of item | $219.99 | comparable item: E-Collar ET-400 Mini Educator Remote Dog Training  |
| Pets | 19341164 DOGTRA COMPANY 3500NCP Dogtra SupX 1Dog Collar | $314.66 | far above the same kind of item | $170.33 | comparable item: DOGTRA COMPANY 300M Dogtra Element Collar |
| Pets | 656818808 New Age Pet® ECOFLEX® Large 48" Wide Reptile Enclosure, Glass Front Te | $312.77 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 286623167 Rabbit House,Chicken Coop Cats,Hamster,Kitten,Pets House Accessories w | $312.31 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 1779956646 Aukfa 4 -Tier 32"Small Animal Metal Hamster Cage for Rabbit Chinchilla | $312.00 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 866168179 OASE BioMaster 600 External Filter - Aquarium Filter | $311.86 | far above the same kind of item | $76.16 | comparable item: OASE FiltoSmart 60 - Grey External Aquarium Filter |
| Pets | 22056274 E-Collar Mini Educator ET-302 Remote Dog Training Collar, Yellow | $309.99 | far above the same kind of item | $219.99 | comparable item: E-Collar ET-300 Mini Educator Remote Dog Training  |
| Pets | 54459540 Dogtra 202C Waterproof ½-Mile One-Handed Operation 2-Dog Remote Traini | $309.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 647137061 Wildgame Innovations Digital Directional Power Control Fish Feeder Uni | $308.99 | far above the same kind of item | $108.99 | comparable item: Wildgame Innovations Digital Power Control Wildlif |
| Pets | 49406067 Tatco Dog Waste Station - Rust Proof - Powder Coated Aluminum - Green | $308.72 | far above the same kind of item | $18.95 | median price of the same kind of item |
| Pets | 828672173 120XH AQUARIUM BLK 60X18X26 | $308.59 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 16375655880 Emeprev Tablets, 160 mg | $307.68 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 17634400 TRIXIE Pet Products natura Rabbit Hutch 2-in-1 with Attic | $304.36 | far above the same kind of item | $16.11 | median price of the same kind of item |
| Pets | 1986661286 Rein Oil Pan | $301.67 | far above the same kind of item | $117.36 | comparable item: Rein Oil Pan |
| Pets | 1052371705 Pierburg Auxiliary Water Pump | $301.43 | far above the same kind of item | $166.00 | comparable item: Pierburg Auxiliary Water Pump |
| Pets | 55007597 Garmin Sport Pro Electronic Dog Training Collar | $299.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 543024304 PetSafe ScoopFree Crystal Smart Front-Entry Self-Cleaning Cat Litter B | $299.99 | far above the same kind of item | $229.99 | comparable item: PetSafe ScoopFree Crystal Pro Legacy Front-Entry S |
| Pets | 2951611766 Garmin Alpha T 20 GPS Dog Tracking Collar | $299.99 | far above the same kind of item | $15.77 | comparable item: Garmin DC 40 - Collar for navigator - for Garmin D |
| Pets | 1290620430 Rein Auxiliary Water Pump | $299.31 | far above the same kind of item | $166.00 | comparable item: Pierburg Auxiliary Water Pump |
| Pets | 16922868 SCD Probiotics ProBio Equine Digestive Health, 5 Gallon | $299.00 | far above the same kind of item | $21.39 | median price of the same kind of item |
| Pets | 20216102559 2 in 1 Wood Bookshelf Cat House, Cat Tree Display Case with Storage, C | $296.99 | far above the same kind of item | $182.99 | comparable item: Leumius Modern 2 IN 1 Wood Bookshelf Cat House, Ca |
| Pets | 332655165 PERFECTO AQUARIUM BLACK 75 | $292.88 | far above the same kind of item | $143.15 | comparable item: PERFECTO AQUARIUM BLACK 65 |
| Pets | 20227319895 2‑Pack Stainless Steel Cat Litter Box, High‑Sided Odor‑Resistant Metal | $292.66 | far above the same kind of item | $188.96 | comparable item: Stainless Steel Cat Litter Box, High-Side Leak-Pro |
| Pets | 16358068581 Emeprev Tablets, 24 mg | $290.72 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 17314374836 PetSafe Guardian GPS Add-A-Dog Collar, Replacement or Extra Collar, Wa | $289.99 | far above the same kind of item | $54.99 | comparable item: PetSafe Yard & Park Add-A-Dog Receiver Training Co |
| Pets | 147046872 New Age Pet® ECOFLEX® Litter Loo® Bench - Odor & Moisture Resistant Ca | $289.92 | far above the same kind of item | $17.36 | median price of the same kind of item |
| Pets | 20168124640 83"L Outdoor Rabbit Hutch, Guinea Pig Cage Indoor Outdoor Wooden Bunny | $287.99 | far above the same kind of item | $134.09 | comparable item: Elevated Wooden Rabbit Hutch, Indoor Outdoor Bunny |
| Pets | 20144017839 83"L Outdoor Rabbit Hutch, Guinea Pig Cage Indoor Outdoor Wooden Bunny | $287.09 | far above the same kind of item | $134.09 | comparable item: Elevated Wooden Rabbit Hutch, Indoor Outdoor Bunny |
| Pets | 11224354556 Adams F&T Collar Plu | $287.00 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 589529997 EcoPlus Pro 100 Linear Air Pump, Aerates Water, 2200 GPH | $285.56 | far above the same kind of item | $199.99 | comparable item: EcoPlus Pro 40 Linear Air Pump, Aerates Water, 800 |
| Pets | 121440278 SummerHawk Ranch Victorian Teak Barn Chicken Coop | $285.48 | far above the same kind of item | $499.99 | comparable item: Prevue Pet Products Red Barn Chicken Coop |
| Pets | 47728675 Dogtra 1900S Remote Dog Training Collar Ergonomic 3/4-Mile IPX9K Water | $284.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 20159751640 Egg Laying Boxes, Metal Chicken Nesting Boxes | $281.99 | far above the same kind of item | $129.09 | comparable item: Chicken Nesting Boxes for Laying Eggs, Hen Egg-lay |
| Pets | 945726008 Rein Oil Pan, Includes Sealant | $281.67 | far above the same kind of item | $19.99 | median price of the same kind of item |
| Pets | 19341143 Dogtra 1 Mile 1 Dog Training Collar | $281.30 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 492845001 REPTIZOO 3 In 1 Reptile Habitat, 18 by 18 by 30-Inch | $281.18 | far above the same kind of item | $21.98 | median price of the same kind of item |
| Pets | 19499874527 83"L Outdoor Rabbit Hutch, Guinea Pig Cage Indoor Outdoor Wooden Bunny | $280.99 | far above the same kind of item | $134.09 | comparable item: Elevated Wooden Rabbit Hutch, Indoor Outdoor Bunny |
| Pets | 5277640867 PetSafe Guardian GPS Add-A-Dog Collar | $280.45 | far above the same kind of item | $79.99 | comparable item: PetSafe Elite Add-A-Dog Collar for Little Dogs |
| Pets | 22064576 E-Collar UL-1200 Upland Educator Remote Trainer - 1 Mile - 100 Safe Ta | $279.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 22069462 E-Collar ET-800 "The Boss" Educaror Remote Trainer E-Collar - 1 Mile R | $279.99 | far above the same kind of item | $219.99 | comparable item: E-Collar ET-400 Mini Educator Remote Dog Training  |
| Pets | 1342543003 CO-Z Professional Elevated 34" Stainless Steel Dog Bath Tub & Pet Groo | $279.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 758564624 New Age Pet® ECOFLEX® Litter Loo® Bench - Durable Composite Cat Litter | $279.96 | far above the same kind of item | $17.36 | median price of the same kind of item |
| Pets | 20483005849 Advantage II Vet-Recommended Flea Prevention for Small Cats 5-9 lbs, 6 | $279.96 | far above the same kind of item | $55.99 | comparable item: Advantage II Vet-Recommended Flea Prevention for S |
| Pets | 20623172092 Advantage II Vet-Recommended Flea Prevention for Large Cats 9 lbs+, 6- | $279.88 | far above the same item's other variants | $69.97 | comparable item: Advantage II Vet-Recommended Flea Prevention for L |
| Pets | 1600443446 Rein Auxiliary Water Pump | $278.25 | far above the same kind of item | $166.00 | comparable item: Pierburg Auxiliary Water Pump |
| Pets | 391191711 Pet Supplies Wooden House Chicken Coop for Small Animals with Sliding  | $276.92 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 20153118258 39 Inch Hamster Cage Habitat with Window & Openable Top, Oak | $276.09 | far above the same kind of item | $106.99 | comparable item: Small Animal Habitat Cage, Hamster Cage Pet Cage |
| Pets | 1051926705 INA CA - Archived 538 0360 100 Engine Water Pump | $275.03 | far above the same kind of item | $25.07 | comparable item: SKP SK1442040 Engine Water Pump |
| Pets | 19341159 Dogtra 2300NCP Remote Dog Training Collar Professional Grade High-Outp | $274.99 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 425601228 Curio Modern Cat Litter Box In Walnut + Pattern | $274.99 | far above the same kind of item | $184.99 | comparable item: Curio Modern Cat Litter Box In Maple |
| Pets | 661829503 New Age Pet® ECOFLEX® Medium 36" Wide Reptile Enclosure, Glass Front T | $274.97 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 20135465328 Hamster Cage, 31" Gerbil Cage with Glass Basin, Ramps, Platforms, Hut, | $273.09 | far above the same kind of item | $44.83 | comparable item: 5-Tier Hamster Cage with Exercise Wheel, Tubes, Ra |
| Pets | 20163722022 83"L Outdoor Rabbit Hutch, Guinea Pig Cage Indoor Outdoor Wooden Bunny | $270.99 | far above the same kind of item | $134.09 | comparable item: Elevated Wooden Rabbit Hutch, Indoor Outdoor Bunny |
| Pets | 20187220122 Cat Litter Box Enclosure with Drawers, 39" x 18" x 31.5" | $270.99 | far above the same kind of item | $141.99 | comparable item: Litter Box Enclosure,Cat Litter Box Enclosure |
| Pets | 837869668 Rabbit/Guinea Pig Hutch Hutches Wood Rabbit Hutch Outdoor Pet House Ch | $270.77 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 127455784 EcoPlus Eco 4950 Fixed Flow Submersible/Inline Water Pump 4490 GPH | $270.74 | far above the same kind of item | $38.99 | comparable item: EcoPlus Eco 396 Fixed Flow Submersible/Inline Wate |
| Pets | 20137450440 83"L Outdoor Rabbit Hutch, Guinea Pig Cage Indoor Outdoor Wooden Bunny | $270.09 | far above the same kind of item | $134.09 | comparable item: Elevated Wooden Rabbit Hutch, Indoor Outdoor Bunny |
| Pets | 17334614242 Automatic Smart Cat Litter Box, Large Capacity Self-Cleaning Litter Bo | $270.00 | far above the same kind of item | $23.27 | median price of the same kind of item |
| Pets | 49032445 E-Collar Technologies PE-900 Pro Educator Remote Dog Training Collar | $269.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 404693827 New Age Pet® ECOFLEX® Medium 36" Wide Reptile Enclosure, Glass Front T | $269.99 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 19655317121 BaPiPro Smart Automatic Cat Litter Box with Wi-Fi App Control, Self-Cl | $269.99 | far above the same kind of item | $23.27 | median price of the same kind of item |
| Pets | 507007320 PetSafe ScoopFree Crystal Smart Self-Cleaning Cat Litter Box, Phone Ap | $269.98 | far above the same kind of item | $99.00 | comparable item: PetSafe ScoopFree Crystal Classic Self-Cleaning Ca |
| Pets | 383139888 OASE BioMaster Thermo 250 External Aquarium Filter with Built-in Heate | $269.97 | far above the same kind of item | $24.86 | median price of the same kind of item |
| Pets | 374032627 Two Floors Wooden Outdoor Indoor Roof Waterproof Bunny Hutch Rabbit Ca | $266.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 964960464 Two Floors Wooden Outdoor Indoor Roof Waterproof Bunny Hutch Rabbit Ca | $266.99 | far above the same kind of item | $163.79 | comparable item: Wooden Rabbit Hutch, Waterproof Outdoor Indoor Pet |
| Pets | 20140864485 Stainless Steel Cat Litter Box, High Side Leak-Proof Litter Pan, Odor- | $266.77 | far above the same kind of item | $188.96 | comparable item: Stainless Steel Cat Litter Box, High-Side Leak-Pro |
| Pets | 3089596791 REPTIZOO Reptile Glass Tank - 48 x 18 x 18 Inches Knock Down Full View | $264.94 | far above the same kind of item | $219.48 | comparable item: REPTIZOO Reptile Glass Tank - 36 x 18 x 18 inches  |
| Pets | 54718053 All Power 3" Semi-Trash Water Pump | $264.00 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 702109694 Motorcraft OE Replacement - 100% New Water Pump | $262.44 | far above the same kind of item | $136.06 | comparable item: Motorcraft OE Replacement - 100% New Water Pump |
| Pets | 1287892775 Rein Auxiliary Water Pump | $261.35 | far above the same kind of item | $166.00 | comparable item: Pierburg Auxiliary Water Pump |
| Pets | 22077922 E-Collar Technologies Einstein HD Waterfowl 1 Mile Remote Trainer for  | $259.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 8345669065 New Age Pet® ECOFLEX® Large 48" Wide Reptile Enclosure, Glass Front Te | $259.99 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 8362868945 New Age Pet® ECOFLEX® Medium 36" Wide Reptile Enclosure, Glass Front T | $259.99 | far above the same kind of item | $169.99 | comparable item: New Age Pet® ECOFLEX® Small 24" Wide Reptile Enclo |
| Pets | 16327605656 KFFKFF 34-Inch Stainless Steel Pet Grooming Tub with Faucet, Showerhea | $259.99 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 25287783 SportDOG Brand® TEK Series 1.0 GPS Tracking Add-A-Dog® Collar | $259.95 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 25574872 SportDOG Brand® TEK Series 1.0 GPS + E-Collar Add-A-Dog® Collar | $259.95 | far above the same kind of item | $139.95 | comparable item: SportDOG Brand® FieldTrainer® 425S Add-A-Dog® Coll |
| Pets | 379489643 16 Panel Pet Cage Playpen Dog Exercise Fence Large Kennel Yard Outdoor | $259.56 | far above the same kind of item | $123.47 | comparable item: 16 Panel Pet Cage Playpen Dog Exercise Fence Large |
| Pets | 17632101 Prevue Pet Products Four-Story Hamster Animal Cage on Casters | $257.50 | far above the same kind of item | $37.20 | comparable item: Prevue Pet Products Two Story Hamster Cage |
| Pets | 14528897 Majestic Pet 48" Kitty Cat Jungle Gym By | $256.62 | far above the same kind of item | $102.69 | comparable item: 45 in. Kitty Cat Jungle Gym |
| Pets | 42392594 Dogtra Advanced Tech Training Electronic Collar and Remote for Dogs 15 | $254.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 16237161028 Cerenia (Maropitant Citrate) for Dogs, 24 mg (Purple), 40 Tablets, Mot | $251.30 | far above the same kind of item | $50.26 | comparable item: Cerenia (Maropitant Citrate) for Dogs, 24 mg (Purp |
| Pets | 955831924 PupGrade Digestive Support for Dogs with Prebiotics, Probiotics, and E | $251.29 | far above the same kind of item | $7.46 | comparable item: PupGrade Digestive Health Soft Chews for Dogs with |
| Pets | 19341155 Dogtra 302M Element 1/2 Mile Two Dog Training Collar | $251.19 | far above the same kind of item | $193.62 | comparable item: Dogtra 200C Remote Dog Training Collar Waterproof  |
| Pets | 928013607 PERFECTO AQUARIUM BLACK 90 | $250.95 | far above the same kind of item | $143.15 | comparable item: PERFECTO AQUARIUM BLACK 65 |
| Pets | 735501099 Pounce & Fetch Water Bowl | $250.92 | far above the same kind of item | $21.99 | median price of the same kind of item |
| Pets | 5708208718 Alden Design 53″ H Rolling Metal Parrot Birdcage with 3 Perches & 4 Fe | $250.69 | far above the same kind of item | $129.82 | comparable item: Alden Design Metal 52" Large Rolling Bird Cage wit |
| Pets | 22177747 DT Systems H2O 1820 PLUS Camo Dog Training Collar | $249.99 | far above the same kind of item | $210.99 | comparable item: Dt Systems H2o 1810 Plus Remote Training |
| Pets | 34776869 Braid Harness 30800 Power Play Harness | $249.99 | far above the same kind of item | $19.51 | median price of the same kind of item |
| Pets | 289138420 Dogtra Handsfree Collar With Remote Controller Arc With Handsfree Remo | $249.99 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 545129537 Dogtra Pathfinder RX Orange GPS Dog Collar - Orange | $249.99 | far above the same kind of item | $16.48 | comparable item: Dogtra Extra Dog Collar Strap Orange 1" x 32" 7446 |
| Pets | 554069964 Curio Modern Cat Litter Box In Walnut | $249.99 | far above the same kind of item | $184.99 | comparable item: Curio Modern Cat Litter Box In Maple |
| Pets | 678079411 DOGTRA PATHFINDER RX EXTRA COLLAR BLUE | $249.99 | far above the same kind of item | $18.20 | comparable item: Dogtra Extra Dog Collar Strap Blue 1 X 24 |
| Pets | 819963648 Dogtra PATHFINDER-RX-BLUE Pathfinder Extra Collar Blue | $249.99 | far above the same kind of item | $18.20 | comparable item: Dogtra Extra Dog Collar Strap Blue 1 X 24 |
| Pets | 913793059 Dogtra Pathfinder Extra Collar Green | $249.99 | far above the same kind of item | $178.95 | comparable item: EDGE 1 Mile Extra Collar Green |
| Pets | 2804346376 OiiBO White Full Tempered Glass Reptile Terrairum | $249.99 | far above the same kind of item | $21.98 | median price of the same kind of item |
| Pets | 55555648 Bird Cage Large Play Top Bird Parrot Finch Cage Macaw Cockatoo Pet Sup | $249.95 | far above the same kind of item | $72.25 | comparable item: Yaheetech 53" Large Play Top Birdcage for Parrot,  |
| Pets | 143884419 SummerHawk Ranch Vintage Red Barn Chicken Coop | $249.00 | far above the same kind of item | $499.99 | comparable item: Prevue Pet Products Red Barn Chicken Coop |
| Pets | 471353176 PetSafe Stay & Play Dog and Cat Wireless Fence with Replaceable Batter | $249.00 | far above the same kind of item | $149.95 | comparable item: PetSafe Stay & Play Wireless Fence with Replaceabl |
| Pets | 15400217373 Miniyam 79.5 inch Extra Large Bunny Cage, Waterproof Roof Pet Supplies | $247.96 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 20751117 Garmin DC 40 GPS Dog Tracking Collar - GPS tracking device | $247.37 | far above the same kind of item | $15.77 | comparable item: Garmin DC 40 - Collar for navigator - for Garmin D |
| Pets | 659811082 Dogtra ARC Hands free Collar | $247.08 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 951158239 Holiday Time Dog Toys, 3 Pack | $246.12 | far above the same kind of item | $7.97 | comparable item: Holiday Dog Toys Stocking |
| Pets | 20181021058 Pet Feeder Station, Storage Cabinet Dog Food Storage Container with Ra | $245.99 | far above the same kind of item | $220.88 | comparable item: Pet Feeder Station Storage Cabinet, Dog Food Stora |
| Pets | 20186819286 Pet Feeder Station, Storage Cabinet Dog Food Storage Container with Ra | $245.99 | far above the same kind of item | $220.88 | comparable item: Pet Feeder Station Storage Cabinet, Dog Food Stora |
| Pets | 436031135 Aukfa Waterproof Two Floors Wooden Outdoor Indoor Bunny Hutch Rabbit C | $243.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 20187270088 Hamster Cage, Extra Large Wooden Hamster Cage | $241.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 323468284 In-Ground Electric Dog Fence Waterproof Hidden System 2 Wireless Shock | $241.40 | far above the same kind of item | $83.24 | comparable item: Electric Dog Fence Waterproof Hidden System 2 Wire |
| Pets | 599668357 New Age Pet® ECOFLEX® Kitty Katio Cat House with 4 Cubes, 2 Shelf Indo | $240.90 | far above the same kind of item | $16.93 | median price of the same kind of item |
| Pets | 2341704689 REPTIZOO Full Tempered Glass Reptile Terrarium Reptile Habitat- 35.5in | $239.99 | far above the same kind of item | $21.98 | median price of the same kind of item |
| Pets | 20630462070 K9 Advantix II Monthly Flea & Tick Prevention for Small Dogs 4-10 lbs, | $239.97 | far above the same kind of item | $79.99 | comparable item: K9 Advantix II Monthly Flea & Tick Prevention for  |
| Pets | 992466166 Dogtra GPS Tracking and E-Collar for Remote DOG Training-Blue Pathfind | $239.79 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 13663919518 Milk-Bone Peanut But | $239.00 | far above the same kind of item | $11.48 | median price of the same kind of item |
| Pets | 467712116 Vibrant Life Summer Dog Toy | $238.56 | far above the same kind of item | $8.16 | comparable item: Vibrant Life Summer Dog Toy, Green Popsicle |
| Pets | 20207100373 31" Extra Large Hamster Cage with Tube Tunnel, Small Animal Cage for D | $237.99 | far above the same kind of item | $98.09 | comparable item: 18.5" 5 Tier Hamster Cage with Tubes and Tunnels,  |
| Pets | 20143903388 31" Extra Large Hamster Cage with Tube Tunnel, Small Animal Cage for D | $237.09 | far above the same kind of item | $98.09 | comparable item: 18.5" 5 Tier Hamster Cage with Tubes and Tunnels,  |
| Pets | 19343919961 Euroco 2 in 1 Wood Bookshelf Cat House, Modern Cat Tree Display Case w | $236.99 | far above the same kind of item | $182.99 | comparable item: Leumius Modern 2 IN 1 Wood Bookshelf Cat House, Ca |
| Pets | 19386264908 Euroco 2 in 1 Wood Bookshelf Cat House, Modern Cat Tree Display Case w | $236.99 | far above the same kind of item | $182.99 | comparable item: Leumius Modern 2 IN 1 Wood Bookshelf Cat House, Ca |
| Pets | 2568515727 Midwest Homes for Pets Deluxe Rabbit & Guinea Pig Cage, XX-Large, Whit | $236.24 | far above the same kind of item | $104.99 | comparable item: Midwest Homes for Pets Deluxe Rabbit & Guinea Pig  |
| Pets | 155567248 Dogtra ARC Remote Training Collar System, Black | $234.99 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 235319756 Dogtra ARC Low to Medium Output Remote Dog Training Collar | $234.99 | far above the same kind of item | $214.99 | comparable item: Dogtra ARC Remote Dog Training Collar |
| Pets | 20237310745 Small Animals Cage, Large Acrylic Hamster Cage Guinea Pig Cage | $232.99 | far above the same kind of item | $152.30 | comparable item: 4-Tier Wooden Guinea Pig Cage & Hamster Cage with  |
| Pets | 14528898 Majestic Pet 51" Kitty Cat Jungle Gym By | $232.00 | far above the same kind of item | $102.69 | comparable item: 45 in. Kitty Cat Jungle Gym |
| Pets | 16317121042 Emeprev Tablets, 16 mg | $231.82 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 388586289 GMB 100% New Water Pump | $231.12 | far above the same kind of item | $97.30 | comparable item: GMB 100% New Water Pump |
| Pets | 19341154 Dogtra Surestim Low-high Training Collar | $231.00 | far above the same kind of item | $18.20 | comparable item: Dogtra 744622340099 Dogtra 1 X 24 Collar Strap |
| Pets | 20187270120 Outdoor Egg Laying Boxes, Metal Nesting Boxes, Chicken Nesting Boxes | $230.99 | far above the same kind of item | $129.09 | comparable item: Chicken Nesting Boxes for Laying Eggs, Hen Egg-lay |
| Pets | 869583916 Anysun Rabbit Hutch Bunny Cage - Wooden Pet House Indoor Outdoor - Hon | $230.97 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 297496737 Dogtra 1900S Handsfree Training Collar | $230.47 | far above the same kind of item | $5.97 | comparable item: 8790 18IN. TRAINING COLLAR |
| Pets | 764503748 SmokeHouse Braided Pizzle Beef Dog Treats, 5 Inch | $229.99 | far above the same kind of item | $11.25 | comparable item: SmokeHouse Braided Pizzle Dog Treats, 9 " |
| Pets | 842142653 Dogtra Pathfinder TRX GPS Only Collar RX Black | $229.99 | far above the same kind of item | $22.59 | median price of the same kind of item |
| Pets | 5023779702 OiiBO Hamster Cage, Large Glass Enclosure for Hamster Gerbils Mice Lem | $229.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 17592656191 REPTI ZOO Double Stacked Reptile Tank, 24" x 18" x 44" Tall Reptiles T | $229.99 | far above the same kind of item | $199.99 | comparable item: REPTI ZOO Double Stacked Reptile Tank, 24" x 18" x |
| Pets | 676007971 Rabbit Hutch Bunny Hutch Rabbit Cage Guinea Pig Coop on Wheels, Waterp | $229.08 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 365444669 Barking Buddha 6" Thick Bully Stick Grain Free Small Breed Beef Bully  | $226.90 | far above the same kind of item | $107.61 | comparable item: Barking Buddha 4" Mini Braided Bully Stick Grain F |
| Pets | 476116996 American Farms Natural Jumbo Beef Large Breed Bone Dog Treat | $226.02 | far above the same kind of item | $44.62 | comparable item: Farms Natural Jumbo Beef Large Breed Bone Dog Trea |
| Pets | 923646831 MSA Medium Advantage 4000 Single Port Hycar Facepiece With Nosecup, Wi | $225.81 | far above the same kind of item | $19.51 | median price of the same kind of item |
| Pets | 755525320 NOK OUT Multipurpose Odor Eliminator, 32 Fl Oz Spray, 12-Pack | $223.99 | far above the same kind of item | $13.96 | median price of the same kind of item |
| Pets | 428002670 Double Decker Rabbit/Guinea Pig Hutch Hutches Wood Rabbit Hutch Outdoo | $223.08 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 16347558740 Emeprev Tablets, 60 mg | $221.10 | far above the same kind of item | $10.26 | comparable item: Emeprev Tablets, 160 mg |
| Pets | 536615947 Chinese Rosewood 5 Leg Fishbowl Display Stand - Honey - Size 12.5 in.  | $219.00 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 20148654996 Rabbit Hutch, Outdoor Rabbit Cage or Guinea Pig Cage with Asphalt Roof | $216.09 | far above the same kind of item | $88.48 | comparable item: Small Wooden Rabbit Hutch Bunny Guinea Pig Cage wi |
| Pets | 20237310534 Spacious Small Animals Cage, Hamster Cage with Three Ramps Pet Cage | $213.99 | far above the same kind of item | $106.99 | comparable item: Small Animal Habitat Cage, Hamster Cage Pet Cage |
| Pets | 954263549 DOG TOY CHRISTMAS VINYL 4 ASST SNOMAN/SKATE/GINGER/PENGUIN W/, Case Pa | $212.96 | far above the same kind of item | $10.96 | median price of the same kind of item |
| Pets | 16403753508 KFFKFF Durable PVC Whelping Box for Dogs, 93.3x48.4x18.1 inch, Adjusta | $210.99 | far above the same kind of item | $9.90 | median price of the same kind of item |
| Pets | 18180658504 Kffkff Whelping Box for Dogs PVC 93.3x48.4x18.1 inch Two-Room Adjustab | $210.99 | far above the same kind of item | $9.90 | median price of the same kind of item |
| Pets | 50021409 New Age Pet® ECOFLEX® Litter Loo® Standard & Jumbo Sizes, 4 Colors, Od | $210.21 | far above the same kind of item | $129.99 | comparable item: New Age Pet® ECOFLEX® Litter Loo® Standard & Jumbo |
| Pets | 20436362812 Advantage II Vet-Recommended Flea Prevention for Small Cats 5-9 lbs, 6 | $209.97 | far above the same kind of item | $55.99 | comparable item: Advantage II Vet-Recommended Flea Prevention for S |
| Pets | 20666711137 Advantage II Vet-Recommended Flea Prevention for Large Cats 9 lbs+, 6- | $209.91 | far above the same item's other variants | $69.97 | comparable item: Advantage II Vet-Recommended Flea Prevention for L |
| Pets | 218870763 Nerf Dog Solid Foam Sonic Ball Dog Toy, Green, 2.5 inch | $208.00 | far above the same kind of item | $9.99 | comparable item: Nerf Dog Green and Orange Solid Foam Sonic Ball, 2 |
| Pets | 20224805352 2-Tier Wooden Hamster Cage, Small Animals Hutch,Natural | $206.99 | far above the same kind of item | $92.99 | comparable item: 3-Tier Wooden Hamster Cage Mice and Rat Cage Small |
| Pets | 351081069 Aukfa Wood Rabbit Hutch Bunny Cage with Tray Small Pet House for Guine | $205.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 496480314 Grtsunsea Cat Kitten Litter Tray Litter Pan Cat Toilet | $205.23 | far above the same kind of item | $51.26 | comparable item: White Large Flip Design Cat Litter Box Toilet With |
| Pets | 590762978 Grtsunsea Cat Kitten Litter Tray Litter Pan Cat Toilet | $205.23 | far above the same kind of item | $51.26 | comparable item: White Large Flip Design Cat Litter Box Toilet With |
| Pets | 937167663 Grtsunsea Cat Kitten Litter Tray Litter Pan Cat Toilet | $205.23 | far above the same kind of item | $51.26 | comparable item: White Large Flip Design Cat Litter Box Toilet With |
| Pets | 405606294 Double Decker Rabbit/Guinea Pig Hutch Hutches Chicken Coop Rabbit Hutc | $203.08 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 20096774194 Extra Large Wooden Hamster Cage, Gerbil Cage, and Other Small Animal H | $202.09 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 20143853381 Spacious Pet Cage, Hamster Cage, Hedgehogs Cage with a Removable Slidi | $201.09 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 50021411 New Age Pet® ECOFLEX® Litter Loo® Standard & Jumbo Sizes, 4 Colors, Od | $199.99 | far above the same kind of item | $129.99 | comparable item: New Age Pet® ECOFLEX® Litter Loo® Standard & Jumbo |
| Pets | 409072171 Krolik XXL Rabbit & Guinea Pig Cage | $199.99 | far above the same kind of item | $91.99 | comparable item: Ferplast Cavie Guinea Pig Cage 80 |
| Pets | 2037427921 Aukfa 4 -Tier 32"Small Animal Metal Hamster Cage for Rabbit Chinchilla | $199.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 2130064753 Aukfa 4 -Tier 32"Small Animal Metal Hamster Cage for Rabbit Chinchilla | $199.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 20198408776 Hamster Cage, 23.5" Gerbil Cage with Glass Basin, Ramps, Platforms, Hu | $199.99 | far above the same kind of item | $44.83 | comparable item: 5-Tier Hamster Cage with Exercise Wheel, Tubes, Ra |
| Pets | 20237310512 Wooden Hamster Cage, Extra Large Gerbil Cage, Multi-Layer Small Animal | $199.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 20144017858 Wooden Hamster Cage, Extra Large Gerbil Cage, Multi-Layer Small Animal | $199.09 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 16372274387 KFFKFF Durable Whelping Box for Dogs, 60 x 60 x 24 inch, Plastic PVC P | $198.90 | far above the same kind of item | $9.90 | median price of the same kind of item |
| Pets | 19501551303 Extra Large Wooden Hamster Cage, Gerbil Cage, and Other Small Animal H | $197.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 684389751 Pet House, Honey Oak & Green - Chinese Fir Wood, Pexigla Honey Oak & G | $195.80 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 132928959 Wood Pet House Rabbit Hutch Chicks Coop Pet Cage Guinea Pig House for  | $192.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 23598511 Gravy Train Chunks In Gravy With Chicken Chunks Wet Dog Food, 22 Oz. C | $192.95 | far above the same kind of item | $13.17 | comparable item: Gravy Train Chunks in Gravy with Chicken Chunks We |
| Pets | 813979307 Large 3-Tier Wooden Hamster Cage House Rodent Mouse Pet Animal Kit Wit | $192.05 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 20148754058 Spacious Small Animal Cage Wooden Hamster Cage Pet Cage | $191.09 | far above the same kind of item | $106.99 | comparable item: Small Animal Habitat Cage, Hamster Cage Pet Cage |
| Pets | 880113895 Guinea Pig House Wooden Small Pet Nesting Box Living Wooden House | $190.77 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 504167059 Aukfa Wood Rabbit Hutch Bunny Cage Guinea Pig House with Wheels Indoor | $189.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 19544608352 Wooden Hamster Cage with Storage Shelf, Large Hamster Cage Including S | $189.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 1769221721 Reveal Natural Wet Cat Food Sidekick | $189.60 | far above the same kind of item | $1.80 | comparable item: Reveal Pet Food Natural Wet Cat Food Ocean Fish in |
| Pets | 9741071945 Revolution (Selamectin) Topical Solution for Dogs, 40.1-85 lbs, (Teal  | $189.52 | far above the same kind of item | $29.93 | comparable item: Revolution (Selamectin) Topical Solution for Dogs, |
| Pets | 1130490395 ANYSUN Cat House Outdoor Kitty Shelter Indoor Cat Condo Waterproof wit | $187.99 | far above the same kind of item | $16.93 | median price of the same kind of item |
| Pets | 1903321739 ANYSUN Cat House Outdoor Kitty Shelter Indoor Cat Condo Waterproof wit | $187.99 | far above the same kind of item | $16.93 | median price of the same kind of item |
| Pets | 520610449 Triumph Meals of Victory Turkey Recipe Wet Dog Food, 3.5 Oz, 15 Pack | $187.65 | far above the same kind of item | $14.84 | comparable item: Halo Natural Wet Dog Food, Turkey & Salmon Recipe, |
| Pets | 30332141 Caitec TitanEze 75 Gallon Powder Coated, Square Steel Tubing Tank Stan | $187.58 | far above the same kind of item | $18.95 | median price of the same kind of item |
| Pets | 20096774521 Rabbit Hutch, Outdoor Bunny Cage with Waterproof Roof, Removable Pull  | $187.09 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 190271702 SummerHawk Ranch Chicken Coop | $186.22 | far above the same kind of item | $1,533.99 | comparable item: Chicken Coop |
| Pets | 808867513 Purina FortiFlora Nutritional Supplement for Cats, 6 Pack | $185.94 | far above the same kind of item | $92.97 | comparable item: Purina FortiFlora Nutritional Supplement for Cats, |
| Pets | 2305300251 "I and love and you" Treat Meow Sidekick Lickable Cat Treats | $185.76 | far above the same kind of item | $35.76 | comparable item: "I and love and you" Treat Meow Squeeze & Thank Yo |
| Pets | 187823059 The Kitty Pass Interior Cat Door | $185.54 | far above the same kind of item | $29.94 | comparable item: The Kitty Pass, Interior Cat Door |
| Pets | 391620114 3 Tiers Layler 3 Pet Hamster Cage Home With Ladder Wooden Natural Larg | $184.31 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 699012602 Wood Rabbit Hutch Guinea Pig Coop Rabbit House for Small Animals with  | $184.13 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 19499824585 Large Rabbit Hutch Outdoor, 2-Tier 61" L Rabbit Cage with Run Feeding  | $182.99 | far above the same kind of item | $16.38 | median price of the same kind of item |
| Pets | 17991559260 KFFKFF Pet Waste Management System with Sanitizer Dispenser, Industria | $182.90 | far above the same kind of item | $9.12 | median price of the same kind of item |
| Pets | 19557902947 58" Wooden Outdoor Indoor Roof Waterproof Bunny Hutch Rabbit Cage Guin | $180.99 | far above the same kind of item | $163.79 | comparable item: Wooden Rabbit Hutch, Waterproof Outdoor Indoor Pet |
| Pets | 502611645 Stick Barbell 5" Dog Treats, Case of 50 | $179.99 | far above the same kind of item | $11.90 | comparable item: Stick Barbell 5" Dog Treats, 3 count |
| Pets | 15855957394 Kitty City Wooden Cat Tower and Hideaway House | $179.99 | far above the same kind of item | $117.87 | comparable item: Elegant Home Fashions Cat Tower House |
| Pets | 13912418793 Coral Ruff Sidekick Durable Dog Toy | $179.00 | far above the same kind of item | $10.00 | comparable item: BARK Acornucopia Durable Dog Toy for Active Dogs |
| Pets | 15778868538 Playology Dog Toys S | $179.00 | far above the same kind of item | $20.77 | comparable item: Pet Zone Flappy Dog Toys, 2-Pack |
| Pets | 15417106204 KFFKFF Dual Cat Privacy Station, Concealed Litter Tray Furniture with  | $178.48 | far above the same kind of item | $17.36 | median price of the same kind of item |
| Pets | 215541097 Pet Cat /Puppy /Rabbit /Guinea Pig Wooden Hide House Natural Wood Hous | $178.46 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 770496240 Pet Puppy Rabbit Wooden Hide House Natural Wood House Pet Supplies Sma | $178.46 | far above the same kind of item | $14.41 | median price of the same kind of item |
| Pets | 8109023747 SAVD IAMS 3.5LB ENDC | $178.00 | far above the same kind of item | $24.38 | median per-unit price of comparable items |
| Pets | 26957920 API Stress Coat Water Conditioner & Dechlorinator, 16 fl oz with Pump  | $177.73 | far above the same kind of item | $7.58 | comparable item: API Stress Coat Water Conditioner & Dechlorinator, |
| Pets | 9759365291 Revolution (Selamectin) Topical Solution for Dogs, 5.1-10lbs, (Purple  | $174.94 | far above the same kind of item | $23.37 | comparable item: Revolution (Selamectin) Topical Solution for Dogs, |
| Pets | 14829817731 KFFKFF Pet Waste Management System with Sanitizer Dispenser, Industria | $173.75 | far above the same kind of item | $9.12 | median price of the same kind of item |
| Pets | 448676762 Earth Animal No-Hide 11" Chicken Chew Dog Treat, 1 Ct | $169.99 | far above the same kind of item | $11.27 | comparable item: Earth Animal No-Hide 7" Chicken Chew Dog Treat, 1  |
| Pets | 864911894 PetSafe Automatic Dog Toy Ball Launcher - Interactive for Dogs, Indoor | $169.95 | far above the same kind of item | $10.96 | median price of the same kind of item |
| Pets | 525567417 Chinese Rosewood 5 Leg Fishbowl Display Stand - Honey - Size 11.5 in.  | $169.00 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 15418517502 Stufurhome 55in Cat Wheel 6-in-1 Cat Exercise Wheel,Upgraded Cat Wheel | $169.00 | far above the same kind of item | $8.36 | median price of the same kind of item |
| Pets | 863592520 Barking Buddha 6" Jumbo Bully Stick Grain Free Medium Breed Beef Bully | $168.26 | far above the same kind of item | $94.84 | comparable item: Barking Buddha 9" Curly Bully Stick Grain Free Med |
| Pets | 338611289 16 Panel Pet Cage Playpen Dog Exercise Fence Large Kennel Yard Outdoor | $166.44 | far above the same kind of item | $142.67 | comparable item: 16 Panel Pet Cage Playpen Dog Exercise Fence Large |
| Pets | 20198408757 3 Height Adjustable Raised Dog Bowls, Dog Feeder Station for Large Med | $159.99 | far above the same kind of item | $98.99 | comparable item: Dog Feeding Station with 3 Height Adjustable Raise |
| Pets | 24261725 Lafeber Company Original Avi Cakes for Macaws and Cockatoos, 20 Lb | $159.95 | far above the same kind of item | $204.80 | comparable item: Lafeber Company Avi?Cakes Parrot Treat, 12-Oz |
| Pets | 802131106 DOG TOY VINYL CHICKEN WITH SQUEAKER 13-1/4 INCH ON CHAIN, Case Pack of | $159.67 | far above the same kind of item | $86.24 | comparable item: DOG TOY VINYL W/SQUEAKER 2 STYLE ASSORTMENT ON CHA |
| Pets | 156199026 Black 16 Panel Pet Cage Playpen Dog Exercise Fence Large Kennel Yard O | $151.64 | far above the same kind of item | $142.67 | comparable item: 16 Panel Pet Cage Playpen Dog Exercise Fence Large |
| Pets | 15570222969 KFFKFF Canine Refuse Station, Business-grade Dog Excrement Station, 11 | $150.29 | far above the same kind of item | $9.12 | median price of the same kind of item |
| Pets | 45681411 API Tap Water Conditioner, 8 fl oz - Super-Concentrated Dechlorinator  | $149.83 | far above the same kind of item | $1.73 | comparable item: API Tap Water Conditioner, 16 fl oz - Super-Concen |
| Pets | 16403703400 KFFKFF Plastic Whelping Box for Dogs, 48 x 48 x 18.1 inch, Durable PVC | $148.00 | far above the same kind of item | $9.90 | median price of the same kind of item |
| Pets | 328160785 DODO DOG BOWLS ASST | $140.88 | far above the same kind of item | $12.98 | median price of the same kind of item |
| Pets | 268454219 Lentek Smartphone-Controlled Pet Treat Dispenser with Camera and Two-W | $139.88 | far above the same kind of item | $4.46 | median per-unit price of comparable items |
| Pets | 353236307 50-Pack 9.5 inch Dog Puppy Fun Thrower Chucker Launcher Play Training  | $139.88 | far above the same kind of item | $10.99 | median price of the same kind of item |
| Pets | 308692637 DOG TOY DOUBLE KNOTTED ROPE/ RUBBER CHEWS 3 STYLES 3 COLORS, Case Pack | $139.64 | far above the same kind of item | $4.87 | comparable item: Rubber and Rope Dog Toy, Assorted Colors |
| Pets | 973809058 Chinese Rosewood 5 Leg Fishbowl Display Stand - Honey - Size 10.5 in.  | $139.00 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 528331900 Irene Inevent 80" Solid Sisal Rope Cat Tree Stable Cat Climber Cute Ca | $138.99 | far above the same kind of item | $58.49 | comparable item: 36" Solid Cute Sisal Rope Plush Cat Climb Tree Cat |
| Pets | 679432869 50-Pack Dog Puppy Fun Thrower Chucker Launcher Play Training 9.5 inch  | $138.99 | far above the same kind of item | $10.99 | median price of the same kind of item |
| Pets | 940101746 50-Pack Dog Puppy Fun Thrower Chucker Launcher Play Training Diameter  | $138.99 | far above the same kind of item | $10.99 | median price of the same kind of item |
| Pets | 15009009278 Pedigree Drizzlers S | $134.00 | far above the same kind of item | $10.19 | median price of the same kind of item |
| Pets | 179510127 HuggleHounds Dog Toy - HuggleFleece Mat XX Large (37 x 54") | $132.81 | far above the same kind of item | $88.99 | comparable item: HuggleHounds Dog Toy - HuggleFleece Mat Large (26  |
| Pets | 54159162 DOG TOY VINYL W/SQUEAKER 2 ASST NEWSPAPER & DUMBELL ON CHAIN, Case Pac | $132.44 | far above the same kind of item | $86.24 | comparable item: DOG TOY VINYL W/SQUEAKER 2 STYLE ASSORTMENT ON CHA |
| Pets | 953273696 Dogness SMRCAMTRTBLU Pet Treat Dispenser with Camera - Blue | $129.97 | far above the same kind of item | $11.69 | median price of the same kind of item |
| Pets | 834867591 Dog Treat Dispenser with Camera Wifi Full HD Pet Monitor 2-Way Audio N | $129.95 | far above the same kind of item | $6.25 | median per-unit price of comparable items |
| Pets | 337472191 iFetch Frenzy Interactive Dog Toy, Self Fetch Mini Tennis Ball Machine | $126.57 | far above the same kind of item | $10.96 | median price of the same kind of item |
| Pets | 125453151 PetSafe Automatic Dog Toy Ball Launcher, Interactive for Dogs, Indoor  | $125.99 | far above the same kind of item | $10.96 | median price of the same kind of item |
| Pets | 30369748 PetKing Small White Rawhide Bones (Case of 72) | $125.13 | far above the same kind of item | $10.28 | median price of the same kind of item |
| Pets | 5890618647 Pedigree Canine Cook | $125.00 | far above the same kind of item | $10.19 | median price of the same kind of item |
| Pets | 13286008246 Beggin Nutcracker Po | $125.00 | far above the same kind of item | $9.96 | median price of the same kind of item |
| Pets | 596880077 Tetra Goldfish Glass LED Kit, 20 Gallon, Aquarium Kit with LED Lightin | $124.99 | far above the same kind of item | $10.62 | median price of the same kind of item |
| Pets | 44044099 DOG TOY VINYL NEWSPAPER/ROPE 0, Case Pack of 80 | $123.42 | far above the same kind of item | $65.40 | comparable item: DOG TOY CHRISTMAS VINYL WITH SQUEAKER, Case Pack o |
| Pets | 51494060 Tetra Aquarium, 20 Gallon, Complete Tropical Fish Tank Kit with LED Li | $119.14 | far above the same item's other variants | $199.94 | comparable item: Aqueon Aquarium Starter Kit, 10 Gallon Glass Fish  |
| Pets | 26126361 Vita Flex E-5000 Premium Quality Vitamin E Supplement for Horses 128 D | $117.97 | far above the same kind of item | $30.99 | comparable item: Vita Flex E and Selenium Supplement for Horses, Ba |
| Pets | 16413257189 KFFKFF Durable PVC Whelping Box for Dogs, 38.6 x 38.6 x 18.1 inches, A | $115.99 | far above the same kind of item | $9.90 | median price of the same kind of item |
| Pets | 14421858728 KFFKFF Feline Activity Wheel, Spacious Indoor Cat Exercise Device, 43. | $115.69 | far above the same kind of item | $83.18 | comparable item: KFFKFF Feline Activity Wheel, Spacious Indoor Cat  |
| Pets | 821248086 Chinese Rosewood 5 Leg Fishbowl Display Stand - Honey - Size 9.5 in. B | $114.23 | far above the same kind of item | $7.26 | median price of the same kind of item |
| Pets | 6615771944 TRIXIE Anna Plush & Jute 50" Cat Tree Scratching Posts Condos Hammocks | $112.53 | far above the same kind of item | $8.36 | median price of the same kind of item |
| Pets | 5085224387 Icelandic+ Cod Skin Short Chew Sticks 5" - 24 Pack Bag - Dog Treats, H | $103.47 | far above the same kind of item | $21.98 | comparable item: Icelandic+ Long Chew Sticks: Cod Skin - 2Piece 10" |
| Pets | 974454052 Temptations Multiple Flavors Cat Treats for Adult Cats Holiday Pack, 6 | $101.76 | far above the same kind of item | $12.98 | comparable item: Temptations Advent Calendar Holiday Treats For Adu |
| Pets | 344144128 RelaxoPet PRO Vibration Relaxation Cat Toys Device with Noise Motion S | $99.95 | far above the same kind of item | $8.36 | median price of the same kind of item |
| Pets | 451791075 Pooper Scooper for Large & Medium, Small Dogs, Foldable Long Handle, S | $99.00 | far above the same kind of item | $18.63 | comparable item: Pooper Scooper for Large & Medium, Small Dogs, Fol |
| Pets | 956207440 Pooper Scooper for Large & Medium, Small Dogs, Foldable Long Handle, S | $99.00 | far above the same kind of item | $19.27 | comparable item: Pooper Scooper for Large & Medium, Small Dogs, Fol |
| Pets | 20186769801 85.5" Cat Tree Height Adjustable Floor-to-Ceiling 4-Tier Kitty Climbin | $96.99 | far above the same kind of item | $8.36 | median price of the same kind of item |
| Pets | 600737507 CAT TOY ASST ON MERCH STRIP 6 STYLES PER STRIP 4 STRIPS PER, Case Pack | $91.97 | far above the same kind of item | $68.21 | comparable item: CAT TOY MERCH STRIP G ASSORTMENT 6 STYLES PER STRI |
| Pets | 1525759374 Icelandic+ Cod Skin Long Chew Sticks 10" - 12 Pack Bag - Dog Treats, H | $91.34 | far above the same kind of item | $21.98 | comparable item: Icelandic+ Long Chew Sticks: Cod Skin - 2Piece 10" |
| Pets | 6615571532 TRIXIE Anna Plush & Sisal 50" Cat Tree Scratching Posts Condos Hammock | $87.86 | far above the same kind of item | $69.99 | comparable item: TRIXIE Malaga Sisal 3-Level 43" Cat Tree with Scra |
| Pets | 251104255 CAT TOY ASST ON MERCH STRIP 6 STYLES PER STRIP 4 STRIPS PER, Case Pack | $86.99 | far above the same kind of item | $68.21 | comparable item: CAT TOY MERCH STRIP G ASSORTMENT 6 STYLES PER STRI |
| Pets | 43731396 Wellness CORE Puppy Dry Dog Food, Small Breed, Grain Free, High Protei | $79.98 | far above the same item's other variants | $20.98 | comparable item: Wellness CORE Puppy Dry Dog Food, Small Breed, Gra |
| Pets | 17654021712 Vibrant Life 8-Panel Plastic Playpen for Dogs, Dark Gray, 24" | $79.97 | far above the same kind of item | $44.97 | comparable item: Vibrant Life 4-Panel Plastic Playpen for Dogs, Dar |
| Pets | 17700705539 Vibrant Life 8-Panel Plastic Playpen for Dogs, Black 24" | $79.97 | far above the same kind of item | $44.97 | comparable item: Vibrant Life 4-Panel Plastic Playpen for Dogs, Bla |
| Pets | 283442774 Wellness CORE Dry Dog Food, Grain Free, High Protein, Natural, Origina | $77.98 | far above the same item's other variants | $15.99 | comparable item: Wellness CORE Dry Dog Food, Grain Free, High Prote |
| Pets | 322407275 Wellness CORE Dry Dog Food, Small Breed, Grain Free, High Protein, Nat | $77.98 | far above the same item's other variants | $20.98 | comparable item: Wellness CORE Dry Dog Food, Small Breed, Grain Fre |
| Pets | 7224763812 INABA Churu Cat Treats, Lickable, Squeezable Creamy Purée with Vitamin | $58.48 | far above the same item's other variants | $6.24 | median price of the same kind of item |
| Pets | 7198115714 INABA Churu Cat Treats, Lickable, Squeezable Creamy Purée with Vitamin | $49.99 | far above the same item's other variants | $6.24 | median price of the same kind of item |
| Pets | 7224763822 INABA Churu Lickable Cat Treats, Grain‑Free Creamy Purée, Chicken Vari | $46.70 | far above the same item's other variants | $6.24 | median price of the same kind of item |
| Pets | 35373043 Blue Buffalo Freedom Chicken Pate Wet Dog Food for Adult Dogs, Grain-F | $42.99 | far above the same item's other variants | $3.25 | comparable item: Blue Buffalo Freedom Grain Free Natural Adult Wet  |
| Pets | 137027499 Blue Buffalo Wilderness High-Protein Adult Cat 7+ Wet Food, Chicken, 5 | $42.17 | far above the same item's other variants | $24.18 | median price of the same kind of item |
| Pets | 35328814 Blue Buffalo Basics Grain Free Adult Wet Dog Food, Skin & Stomach Care | $41.76 | far above the same item's other variants | $3.48 | comparable item: Blue Buffalo Basics Grain Free Adult Wet Dog Food, |
| Pets | 940506313 Blue Buffalo Wilderness High Protein Trout and Chicken Wet Dog Food fo | $39.49 | far above the same item's other variants | $2.28 | comparable item: Blue Buffalo Wilderness High Protein Grain Free, N |
| Pets | 101986251 Blue Buffalo Freedom Lamb Pate Wet Dog Food for Adult Dogs, Grain-Free | $39.00 | far above the same item's other variants | $2.79 | comparable item: Blue Buffalo Freedom Grain Free Natural Adult Wet  |
| Pets | 663467265 Vibrant Life Hog Grower & Finisher Pellet Feed, 40 lbs | $37.70 | far above the same item's other variants | $19.97 | comparable item: Vibrant Life Hog Grower & Finisher Pellet Feed, 40 |
| Pets | 762269673 Tiki Cat Hookena Luau Grain-Free Ahi Tuna & Chicken Wet Cat Food, 6 oz | $37.60 | far above the same item's other variants | $3.88 | comparable item: Tiki Cat Hookena Luau Ahi Tuna & Chicken Wet Cat F |
| Pets | 331751837 Purina Fancy Feast Medleys Seafood Recipe Variety Collection Wet Cat F | $34.49 | far above the same item's other variants | $1.10 | comparable item: Purina Fancy Feast Medleys Seafood Collection Wet  |
| Pets | 48820502 Tiki Cat Hanalei Luau Grain-Free Wild Salmon Wet Cat Food, 2.8 oz | $31.98 | far above the same item's other variants | $1.67 | comparable item: Tiki Cat Hanalei Luau Wild Salmon in Consomme Wet  |
| Pets | 303184218 Blue Buffalo Wilderness Wild Delights High Protein Chicken and Trout F | $31.53 | far above the same item's other variants | $1.18 | comparable item: Blue Buffalo Wilderness Wild Delights Chicken & Tr |
| Pets | 13135954238 Iams Perfect Portions Healthy Adult Pate Wet Cat Food, Variety Recipe, | $30.98 | far above the same item's other variants | $1.29 | comparable item: Iams Perfect Portions Healthy Adult Pate, Variety  |
| Pets | 900531388 Ol' Roy High Protein Beef & Lamb Flavor Dry Dog Food, 15 lbs | $28.70 | far above the same item's other variants | $10.51 | comparable item: Ol' Roy High Protein with Beef & Lamb Flavor Dry D |
| Pets | 43471270 Purina Fancy Feast Medleys Salmon Primavera Wet Cat Food, 3 oz Can | $28.08 | far above the same item's other variants | $1.06 | comparable item: Purina Fancy Feast Medleys Cat Food, Wet Cat Food, |
| Pets | 45470013 Purina Fancy Feast Medleys Tuna Primavera Wet Cat Food, 3 oz Can | $28.08 | far above the same item's other variants | $1.17 | comparable item: Purina Fancy Feast Medleys Food, Wet Cat Food, Tun |
| Pets | 818831533 Purina Fancy Feast Medleys Turkey Primavera Wet Cat Food, 3 oz Can | $28.08 | far above the same item's other variants | $1.10 | comparable item: Purina Fancy Feast Medleys Turkey Primavera Wet Ca |
| Pets | 178964926 Pedigree Ground Dinner Chopped Beef Wet Dog Food, 13.2 oz | $27.60 | far above the same item's other variants | $1.82 | comparable item: Pedigree Chopped Ground Dinner Wet Dog Food With B |
| Pets | 476475902 Tiki Cat Napili Luau Grain-Free Wild Salmon & Chicken Wet Cat Food, 2. | $27.36 | far above the same item's other variants | $1.65 | comparable item: Tiki Cat Napili Luau Grain-Free Wild Salmon & Chic |
| Pets | 530208557 Tiki Cat Puka Puka Luau Grain-Free Succulent Chicken Wet Cat Food, 6 o | $25.76 | far above the same item's other variants | $4.69 | comparable item: Tiki Cat Puka Puka Luau Grain-Free Succulent Chick |
| Pets | 826526942 Purina Fancy Feast Medleys Wet Cat Food, Chicken Florentine & Cheese,  | $25.44 | far above the same item's other variants | $2.61 | comparable item: Purina Fancy Feast Medleys Wet Cat Food, Chicken F |
| Pets | 779333966 Tiki Cat Gourmet Carnivore Grain-Free Chicken & Liver Wet Cat Food, 2. | $24.96 | far above the same item's other variants | $16.68 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 49447404 Tiki Cat Hookena Luau Grain-Free Ahi Tuna & Chicken Wet Cat Food, 2.8  | $23.88 | far above the same item's other variants | $1.81 | comparable item: Tiki Cat Hookena Luau Ahi Tuna & Chicken Wet Cat F |
| Pets | 43407062 Purina Fancy Feast Chicken Feast in Gravy Sliced Wet Cat Food, 3 oz Ca | $23.04 | far above the same item's other variants | $1.63 | comparable item: Purina Fancy Feast Sliced Kitten Food, Wet Cat Foo |
| Pets | 975467633 Iams Perfect Portions Optimal Metabolism Adult Grain Free Wet Cat Food | $23.04 | far above the same item's other variants | $0.93 | comparable item: IAMS PERFECT PORTIONS Grain Free Adult Wet Cat Foo |
| Pets | 258707229 Tiki Cat Gourmet Carnivore Grain-Free Beef Liver & Chicken Wet Cat Foo | $22.93 | far above the same item's other variants | $22.93 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 518321875 Tiki Cat Gourmet Carnivore Grain-Free Beef & Liver Wet Cat Food, 6 oz | $22.93 | far above the same item's other variants | $22.93 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 885766600 Tiki Cat Gourmet Carnivore Grain-Free Bonito Tuna Wet Cat Food, 6 oz | $22.93 | far above the same item's other variants | $22.93 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 798071436 Tiki Cat Hanalei Luau Grain-Free Wild Salmon Wet Cat Food, 6 oz | $22.65 | far above the same item's other variants | $3.54 | comparable item: Tiki Cat Napili Luau Grain-Free Wild Salmon & Chic |
| Pets | 819229869 Tiki Cat Gourmet Carnivore Grain-Free Tilapia Wet Cat Food, 6 oz | $22.65 | far above the same item's other variants | $22.93 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 906740934 Tiki Cat Gourmet Carnivore Grain-Free Seabass Wet Cat Food, 6 oz | $22.65 | far above the same item's other variants | $22.93 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 48820496 Tiki Dog Lomi Lomi Luau Wild Salmon & Chicken Wet Dog Food, 2.8 oz | $19.99 | far above the same item's other variants | $4.55 | comparable item: Tiki Cat Luau Wet Cat Food, Wild Salmon & Chicken, |
| Pets | 43710162 Purina Fancy Feast Gravy Lovers Wet Cat Food, Whitefish & Tuna in Grav | $19.92 | far above the same item's other variants | $0.96 | comparable item: Purina Fancy Feast Gravy Lovers Wet Cat Food, Whit |
| Pets | 43730098 Purina Fancy Feast Gravy Lovers Wet Cat Food, Beef in Gravy, 3 oz Can | $19.92 | far above the same item's other variants | $0.96 | comparable item: Purina Fancy Feast Gravy Lovers Wet Cat Food, Beef |
| Pets | 48820504 Tiki Cat Hawaiian Grill Grain-Free Ahi Tuna Wet Cat Food, 2.8 oz | $19.32 | far above the same item's other variants | $1.79 | comparable item: Tiki Hawaiian Grill Ahi Tuna Wet Cat Food, 2.8 oz. |
| Pets | 758479726 Tiki Cat Koolina Luau Grain-Free Succulent Chicken Wet Cat Food, 2.8 o | $18.96 | far above the same item's other variants | $2.19 | comparable item: Tiki Cat Puka Puka Luau Grain-Free Succulent Chick |
| Pets | 715099664 Tiki Cat Gourmet Carnivore Grain-Free Chicken & Liver Wet Cat Food, 6  | $18.80 | far above the same item's other variants | $22.93 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 18888461235 Tiki Cat After Dark Soft Pate Wet Cat Food, Dark Rabbit & Chicken Live | $18.47 | far above the same item's other variants | $4.34 | comparable item: Tiki Cat After Dark Soft Pate Wet Cat Food, Chicke |
| Pets | 8944767874 Tiki Cat After Dark Whole Foods Wet Cat Food, Chicken & Beef, 5.5 oz.  | $18.20 | far above the same item's other variants | $8.39 | comparable item: Tiki Cat After Dark Whole Foods Wet Cat Food, Chic |
| Pets | 906242611 Tiki Cat Lanai Luau Grain-Free Tuna in Crab Surimi Wet Cat Food, 6 oz | $18.16 | far above the same item's other variants | $15.15 | comparable item: Tiki Cat Lanai Luau Grain-Free Tuna in Crab Surimi |
| Pets | 8964574952 Tiki Cat Luau Wet Cat Food, Chicken & Egg, 6 oz. Can | $17.67 | far above the same item's other variants | $9.84 | comparable item: Tiki Cat Luau Wet Cat Food, Chicken & Egg, 2.8 oz. |
| Pets | 15553607038 Pedigree Chopped Ground Dinner Chicken & Rice Dinner Adult Soft Wet Do | $17.48 | far above the same item's other variants | $1.46 | comparable item: Pedigree Chopped Ground Dinner Chicken & Rice Dinn |
| Pets | 501322556 Wellness CORE Simply Shreds Natural Grain Free Wet Cat Food Mixer Or T | $17.42 | far above the same item's other variants | $1.32 | comparable item: Wellness CORE Simply Shreds Natural Grain Free Wet |
| Pets | 791515547 Wellness CORE Simply Shreds Natural Grain Free Wet Cat Food Mixer Or T | $17.42 | far above the same item's other variants | $1.32 | comparable item: Wellness CORE Simply Shreds Natural Grain Free Wet |
| Pets | 854967884 Tiki Dog Pipeline Luau Ahi Tuna Wet Dog Food, 2.8 oz | $17.21 | far above the same item's other variants | $8.76 | median price of the same kind of item |
| Pets | 757964921 Blue Buffalo Tastefuls Adult Cat Wet Food, Flaked Entrées in Gravy, 5. | $17.18 | far above the same item's other variants | $24.18 | median price of the same kind of item |
| Pets | 196068207 Tiki Cat Gourmet Carnivore Grain-Free Beef & Liver Wet Cat Food, 2.8 o | $16.68 | far above the same item's other variants | $16.68 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 200848054 Tiki Cat Gourmet Carnivore Grain-Free Beef Liver & Chicken Wet Cat Foo | $16.68 | far above the same item's other variants | $16.68 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 334685520 Tiki Cat Gourmet Carnivore Grain-Free Seabass Wet Cat Food, 2.8 oz | $16.48 | far above the same item's other variants | $16.68 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 356257275 Tiki Cat Gourmet Carnivore Grain-Free Beef Liver & Lamb Wet Cat Food,  | $16.48 | far above the same item's other variants | $16.68 | comparable item: Tiki Cat Gourmet Carnivore Grain-Free Chicken with |
| Pets | 593012100 Tiki Cat Grill Wet Cat Food, Sardine Cutlets Recipe in Sardine Consomm | $15.75 | far above the same item's other variants | $4.01 | comparable item: Tiki Cat Grill Wet Cat Food, Sardine Cutlets Recip |
| Pets | 485402103 Tiki Cat Makaha Luau Grain-Free Mackerel & Sardine Wet Cat Food, 6 oz | $15.41 | far above the same item's other variants | $5.04 | comparable item: Tiki Cat Makaha Luau Grain-Free Mackerel & Sardine |
| Pets | 757598471 Tiki Cat Waimea Luau Tuna Wet Cat Food, 6 oz | $15.41 | far above the same item's other variants | $2.51 | comparable item: Tiki Cat Hookena Luau Tuna & Chicken Wet Cat Food, |
| Pets | 863669824 Tiki Cat Hawaiian Grill Grain-Free Ahi Tuna Wet Cat Food, 6 oz | $15.41 | far above the same item's other variants | $2.39 | comparable item: Tiki Cat Hawaiian Grill Ahi Tuna Wet Cat Food, 6 o |
| Pets | 909491548 Tiki Cat Tahitian Grill Grain-Free Sardine Cutlets Wet Cat Food, 6 oz | $15.41 | far above the same item's other variants | $3.84 | comparable item: Tiki Cat Grill Wet Cat Food, Sardine Cutlets, 2.8  |
| Pets | 988861476 Tiki Cat Waikiki Luau Tuna Wet Cat Food, 6 oz | $15.23 | far above the same item's other variants | $2.51 | comparable item: Tiki Cat Hookena Luau Tuna & Chicken Wet Cat Food, |
| Pets | 15716619 Fancy Feast Gravy Wet Cat Food, Marinated Morsels Chicken Feast in Gra | $14.97 | far above the same item's other variants | $1.06 | median per-unit price of comparable items |
| Pets | 847918850 Jinx All Natural Chicken & Sweet Potato Jerky Treats for Dogs, 5 oz Ba | $14.97 | far above the same item's other variants | $4.98 | comparable item: Jinx All Natural Slow-Smoked Chicken & Sweet Potat |
| Pets | 134834101 Purina Fancy Feast Gourmet Naturals Wet Cat Food Chicken, Grain-Free,  | $14.04 | far above the same item's other variants | $1.17 | comparable item: Purina Fancy Feast Gourmet Naturals Wet Cat Food C |
| Pets | 827750313 Purina Fancy Feast Gourmet Naturals Pate Wet Cat Food, Alaskan Salmon, | $14.04 | far above the same item's other variants | $1.11 | comparable item: Purina Fancy Feast Gourmet Naturals Pate Wet Cat F |
| Pets | 917446418 CESAR Wet Dog Food Classic Loaf in Sauce Filet Mignon Flavor Multipack | $13.94 | far above the same item's other variants | $1.04 | comparable item: Cesar Classic Loaf in Sauce Filet Mignon Flavor Ad |
| Pets | 22234385 Purina Friskies Wet Cat Food Tasty Treasures Pate With Liver and Beef | $12.96 | far above the same item's other variants | $1.76 | median per-unit price of comparable items |
| Pets | 509876026 Tiki Cat Grill Wet Cat Food, Ahi Tuna, & Prawns, 6 oz. Can | $12.67 | far above the same item's other variants | $7.56 | comparable item: Tiki Cat Grill Wet Cat Food, Ahi Tuna, & Prawns, 2 |
| Pets | 3312057281 Tiki Cat Grill Wet Cat Food, Ahi Tuna, 6 oz. Can | $12.67 | far above the same item's other variants | $8.29 | comparable item: Tiki Cat Grill Wet Cat Food, Ahi Tuna, 2.8 oz. Can |
| Pets | 139237049 Tiki Cat Friends Wet Cat Food, Tuna & Pumpkin, 5.5 oz. Can | $12.60 | far above the same item's other variants | $2.99 | comparable item: Tiki Cat Friends Wet Cat Food, Tuna & Pumpkin, 2.8 |
| Pets | 814457257 Pedigree Traditional Ground Chopped Beef Wet Dog Food, 13.2 oz | $12.41 | far above the same item's other variants | $1.82 | comparable item: Pedigree Chopped Ground Dinner Wet Dog Food With B |
| Pets | 277203083 Tiki Cat Waikiki Luau Tuna Wet Cat Food, 2.8 oz | $11.56 | far above the same item's other variants | $4.01 | comparable item: Tiki Cat Luau Wet Cat Food, Ahi Tuna, & Mackerel,  |
| Pets | 828072389 Tiki Cat Tahitian Grill Grain-Free Sardine Cutlets Wet Cat Food, 2.8 o | $11.56 | far above the same item's other variants | $1.79 | comparable item: Tiki Cat Grill Wet Cat Food, Sardine Cutlets, 2.8  |
| Pets | 921893125 Tiki Cat After Dark Whole Foods Wet Cat Food, Chicken & Quail Egg, 2.8 | $11.47 | far above the same item's other variants | $2.33 | comparable item: Tiki Cat After Dark Whole Foods Wet Cat Food, Chic |
| Pets | 8936508006 Tiki Cat After Dark Pate Wet Cat Food, Wild Venison & Beef Liver, 3 oz | $11.47 | far above the same item's other variants | $4.14 | comparable item: Tiki Cat After Dark Pate Wet Cat Food, Lamb & Beef |
| Pets | 8944817787 Tiki Cat After Dark Pate Wet Cat Food, Duck & Chicken Liver, 3 oz. Can | $11.47 | far above the same item's other variants | $2.29 | comparable item: Tiki Cat After Dark Pate Wet Cat Food, Rabbit & Ch |
| Pets | 8958955266 Tiki Cat After Dark Pate Wet Cat Food, Turkey & Turkey Liver, 3 oz. Ca | $11.47 | far above the same item's other variants | $2.53 | comparable item: Tiki Cat After Dark Soft Pate Wet Cat Food, Turkey |
| Pets | 8959055078 Tiki Cat After Dark Pate Wet Cat Food, Beef & Beef Liver, 3 oz. Can | $11.47 | far above the same item's other variants | $4.14 | comparable item: Tiki Cat After Dark Pate Wet Cat Food, Lamb & Beef |
| Pets | 18826866175 Tiki Cat After Dark Velvet Mousse Wet Cat Food, Chicken, 2.8 oz. Pouch | $11.47 | far above the same item's other variants | $3.83 | comparable item: Tiki Cat After Dark Velvet Mousse Wet Cat Food, Ch |
| Pets | 18882858857 Tiki Cat After Dark Pate+ Wet Cat Food, Chicken, 2.8 oz. Can | $11.47 | far above the same item's other variants | $2.13 | comparable item: Tiki Cat After Dark Pate+ Wet Cat Food, Chicken, 5 |
| Pets | 18903357013 Tiki Cat After Dark Shreds Whole Foods Wet Cat Food, Rabbit & Chicken  | $11.47 | far above the same item's other variants | $2.29 | comparable item: Tiki Cat After Dark Shreds Whole Foods Wet Cat Foo |
| Pets | 142890777 Pedigree High Protein Beef & Bison Flavor Adult Soft Wet Dog Food, 13. | $10.60 | far above the same item's other variants | $10.60 | comparable item: Pedigree High Protein Beef & Lamb flavor In Gravy  |
| Pets | 391448217 PEDIGREE Turkey & Bacon Flavor Chopped Ground Dinner Wet Dog Food for  | $10.08 | far above the same item's other variants | $1.82 | comparable item: Pedigree Chopped Ground Dinner Turkey & Bacon Flav |
| Pets | 20425773482 Reveal Pet Food Entrees Natural Wet Cat Food Tuna with Salmon Pate in  | $6.73 | far above the same item's other variants | $3.68 | comparable item: Reveal Pet Food Entrees Natural Wet Cat Food Chick |
| Pets | 15641966686 Reveal Pet Food Entrees Natural Wet Cat Food Tuna with Salmon Pate in  | $6.43 | far above the same item's other variants | $3.68 | comparable item: Reveal Pet Food Entrees Natural Wet Cat Food Chick |
| Pets | 863396224 FANCY FEAST MEDLEYS BEEF LOMO SALTADO 3OZ | $5.84 | far above the same item's other variants | $1.17 | comparable item: Purina Fancy Feast Medleys, Beef Ragu & Pasta Cat  |
| Pets | 34203124 Fancy Feast Gravy Wet Cat Food, Marinated Morsels Beef Feast in Gravy, | $5.37 | far above the same item's other variants | $0.96 | median per-unit price of comparable items |
| Pets | 51251287 Friskies Wet Cat Food, Cat Concoctions With Cod in Cheesy Bacon Flavor | $5.37 | far above the same item's other variants | $1.76 | median per-unit price of comparable items |
| Pets | 23601910 Ol' Roy Cuts in Gravy T-Bone Flavor Wet Dog Food, 13.2 Oz | $5.05 | far above the same item's other variants | $1.32 | comparable item: Ol' Roy T-Bone Flavor Cuts in Gravy Wet Dog Food,  |
| Pets | 55298812 Pedigree Chopped Ground Dinner Filet Mignon Flavor Adult Wet Dog Food, | $4.93 | far above the same item's other variants | $7.51 | comparable item: PEDIGREE Chopped Ground Dinner Filet Mignon Flavor |
| Pets | 22234384 Friskies Pate Wet Cat Food, Tasty Treasures With Chicken & Ocean Fish  | $4.80 | far above the same item's other variants | $1.76 | median per-unit price of comparable items |
| Pets | 24191033 Fancy Feast Gravy Wet Cat Food, Medleys Whitefish & Shrimp Recipe With | $4.80 | far above the same item's other variants | $1.06 | comparable item: Fancy Feast Gravy Wet Cat Food, Medleys Whitefish  |
| Pets | 34207057 Purina Fancy Feast Medleys Shredded Turkey Fare with Spinach Wet Cat F | $4.74 | far above the same item's other variants | $1.17 | comparable item: Purina Fancy Feast Medleys Cat Food, Wet Cat Food, |
| Pets | 21668260 Fancy Feast Gravy Wet Cat Food, Medleys Tuna & Shrimp Recipe With Wild | $4.23 | far above the same item's other variants | $1.06 | comparable item: Fancy Feast Gravy Wet Cat Food, Medleys Tuna & Shr |
| Pets | 19461306572 Purina Pro Plan Vital Systems Tuna Entree Wet Cat Food Pate 4-in-1 Bra | $4.17 | far above the same item's other variants | $4.17 | comparable item: Purina Pro Plan Vital Systems Tuna Entree Wet Cat  |
| Pets | 24217532 Ol' Roy Cuts In Gravy Rottiserie Chicken Wet Dog Food, 13.2 Oz | $4.09 | far above the same item's other variants | $2.49 | comparable item: Ol' Roy Hearty Cuts In Gravy With Chicken Wet Dog  |
| Pets | 20426324570 Delectables Lickable Cat Treats - Bisque Tuna & Chicken, 1.4 Oz. | $4.05 | far above the same item's other variants | $4.05 | comparable item: Delectables Lickable Cat Treats - Bisque Tuna & Ch |
| Pets | 20454658282 Delectables Lickable Cat Treats - Bisque Tuna & Chicken, 1.4 Oz. | $4.05 | far above the same item's other variants | $4.05 | comparable item: Delectables Lickable Cat Treats - Bisque Tuna & Ch |
| Pets | 20493456806 Delectables Lickable Cat Treats - Bisque Tuna & Chicken, 1.4 Oz. | $4.05 | far above the same item's other variants | $4.05 | comparable item: Delectables Lickable Cat Treats - Bisque Tuna & Ch |
| Pets | 47244060 Ol' Roy Strips In Gravy New York Strip Flavor Wet Dog Food, 13.2 Oz (P | $3.72 | far above the same item's other variants | $1.07 | comparable item: Ol' Roy Strips in Gravy New York Strip Flavor Wet  |
| Pets | 5000026155 Temptations Tasty Chicken Flavor Bites In Gravy Wet Cat Food For Adult | $3.47 | far above the same item's other variants | $0.74 | comparable item: Temptations Bites in Gravy Catnip Fever Flavor Adu |
| Pets | 764711726 Cesar Classic Loaf in Sauce Dry-Aged Ribeye Flavor Adult Wet Dog Food, | $3.25 | far above the same item's other variants | $1.04 | comparable item: Cesar Classic Loaf in Sauce Filet Mignon Flavor Ad |
| Pets | 20464613771 Purina Beneful Small Breed Wet Dog Food in Gravy, IncrediBites With Re | $2.88 | far above the same item's other variants | $0.97 | comparable item: Purina Beneful Small Breed Wet Dog Food in Gravy,  |
| Pets | 20480204495 Purina Beneful Small Breed Wet Dog Food in Gravy, IncrediBites With Re | $2.88 | far above the same item's other variants | $0.97 | comparable item: Purina Beneful Small Breed Wet Dog Food in Gravy,  |
| Pets | 35953104 Friskies Wet Cat Food, SauceSations Chicken & Turkey Dinner in Cheesy  | $2.18 | far above the same item's other variants | $0.92 | comparable item: Friskies Wet Cat Food, SauceSations Chicken & Turk |
| Pets | 978675949 Cone Protective Collar for Pet Dogs Cats Wound Healing Protection Cove | $1.12 | far below comparable items | $22.59 | median price of the same kind of item |
| Pets | 130545773 Purina Pro Plan Urinary Tract Health Wet Cat Food Ocean Whitefish, 3 o | $0.89 | far below comparable items | $42.72 | comparable item: Purina Pro Plan Urinary Tract Health, Ocean Whitef |
| Pets | 21668251 Purina Fancy Feast Grilled Kitten Food, Wet Cat Food, Turkey & Giblets | $0.76 | far below comparable items | $21.12 | comparable item: Purina Fancy Feast Grilled Kitten Food, Wet Cat Fo |
| Pets | 47242717 Friskies Pate Turkey & Giblets Dinner Wet Cat Food, 5.5 Oz, 24 Count | $0.54 | far below comparable items | $10.15 | comparable item: Friskies Pate Turkey & Giblets Dinner Wet Cat Food |
| Pets | 14871856 Ol' Roy Soft & Moist Beef Flavor Dog Food Pouches | $0.44 | far below comparable items | $14.08 | median per-unit price of comparable items |
| Pets | 14871858 Ol Roy Soft & Moist Beef & Cheese Flavor Dog Food Pouches | $0.34 | far below comparable items | $12.51 | median per-unit price of comparable items |
| Pets | 24107892 Feline Fresh Natural Pine Cat Litter, 7-lb | $0.34 | far below comparable items | $7.09 | median per-unit price of comparable items |
| Pets | 1880266829 Feline Fresh Natural Pine Cat Litter, 7-lb | $0.34 | far below comparable items | $7.09 | median per-unit price of comparable items |
| Pets | 40618709 9Lives Meaty Paté With Real Beef Wet Cat Food, 13-Ounce | $0.17 | far below comparable items | $2.32 | comparable item: 9Lives Meaty Paté with Real Beef Wet Cat Food, 13  |
| Pets | 47220708 Free Litter! Littermaid 980 Multi-Cat Self-Cleaning Litter Box with Fr | $0.06 | below range | $109.97 | comparable item: Free Litter! Littermaid 980 Multi-Cat Self-Cleanin |
| Pets | 10318939 Pedigree Little Champions Chicken Flavor Wet Dog Food, 5.3 Oz | $0.04 | below range | $0.98 | comparable item: Pedigree Little Champions Variety Pack Chicken,Tur |
| Pets | 158097545 Fantasy Aquarium (Nintendo DS) | $0.03 | below range | $151.82 | median price of the same kind of item |
| Pets | 16401748 Iams Puppy Pack - free with purchase of any Iams Puppy food item | $0.01 | below range | $15.01 | median price of the same kind of item |
| Pets | 480559506 Voyager Step-In Air Dog Harness - All Weather Mesh, Step in Vest Harne | $0.01 | below range | $12.99 | comparable item: Voyager Step-in Air Dog Harness - All Weather Mesh |
| Pets | 758450316 Serta Gel Ortho Quilted Couch-D-MOF | $0.01 | below range | $18.90 | median price of its category |
| Pets | 974087509 .com Toy Dog (duplicate Upc #) | $0.01 | below range | $11.98 | median price of the same kind of item |
| Pets | 1978409147 PowerLifter Pet Rewind NWD 3405 | $0.01 | below range | $18.90 | median price of its category |
| Pets | 19250571762 PET HONESTY DOG ASSORTMENT PDQ 9X40X11 - PERMANENT On Shelf PDQ Tray - | $0.01 | below range | $24.00 | median price of the same kind of item |
| Pets | 19269412271 PET HONESTY CAT ASSORTMENT PDQ 7X25X11 - PERMANENT On Shelf PDQ Tray - | $0.01 | below range | $24.00 | median price of the same kind of item |
| Premium Beauty | 520230632 Grapefruit Body Cream by Jo Malone for Unisex - 5.9 oz Body Cream | $149.96 | far above the same kind of item | $25.50 | comparable item: Akerat 10 by Avene for Unisex - 6.7 oz Body Cream |
| Premium Beauty | 253398241 4 Pack - BareMinerals Butter Drench Restorative Rich Cr eam 1.7 oz | $148.64 | far above the same kind of item | $105.62 | comparable item: 2 Pack - BareMinerals Butter Drench Restorative Ri |
| Premium Beauty | 175568868 The Reparative Face Sun Lotion SPF 30 High by La Mer for Unisex - 1.7  | $144.91 | far above the same kind of item | $26.56 | comparable item: Ultimate Sun Protector Lotion SPF 50 by Shiseido f |
| Premium Beauty | 151120152 Creed Virgin Island Water for Men and Women 2.5 oz | $143.70 | far above the same kind of item | $54.19 | median per-unit price of comparable items |
| Premium Beauty | 285123763 Victoria's Secret Gift Set Dream Angel 3 Piece Perfume & Body Cream | $139.57 | far above the same kind of item | $4.36 | comparable item: Bodycology Assorted 6 Piece Body Cream Gift Set |
| Premium Beauty | 30913053 La Prairie Cellular Energizing Body Spray, 3.3 Oz | $138.64 | far above the same kind of item | $71.53 | median per-unit price of comparable items |
| Premium Beauty | 49691514 Sisley Botanical Restorative Facial Cream, Shea Butter, 1.6 Oz | $135.00 | far above the same kind of item | $17.34 | comparable item: Sisley Botanical Gentle Facial Buffing Cream, 1.4  |
| Premium Beauty | 103574622 Clinique Best Sellers Treatment Set Clinique 3 Pc Set Moisture Surge E | $135.00 | far above the same kind of item | $56.43 | comparable item: Clinique Moisture Surge Extended Thirst Relief, 2. |
| Premium Beauty | 574549530 Nocturne Air Professional Performance Hairdryer by GHD for Women - 1 P | $132.98 | far above the same kind of item | $39.47 | comparable item: GHD Wanderlust Air Professional Hair Dryer, Limite |
| Premium Beauty | 932610517 Sisley Floral Body Spray for Women, 4.2 Oz | $131.92 | far above the same kind of item | $1.92 | comparable item: Sofia Vergara Body Spray for Women, 8 oz |
| Premium Beauty | 166606531 Wanted Blush - 01 Glowing Peach by Helena Rubinstein for Women - 0.17  | $127.87 | far above the same kind of item | $50.82 | comparable item: Wanted Blush - 04 Glowing Sand by Helena Rubinstei |
| Premium Beauty | 264874888 Thalgo Prodige des Océans Body Cream | $120.00 | far above the same kind of item | $11.86 | median price of the same kind of item |
| Premium Beauty | 658423281 Lancer Lift & Plump Sheet Mask | $120.00 | far above the same kind of item | $35.00 | comparable item: Lancer Lift & Plump Sheet Mask |
| Premium Beauty | 52076699 Valmont LElixir Des Glaciers Swiss Poly-Active Bi-Phase Eye Makeup Rem | $117.02 | far above the same kind of item | $63.25 | comparable item: Valmont LElixir Des Glaciers Swiss Poly-Active Cle |
| Premium Beauty | 51746056 PRADA CANDY FLORALE 2.7 EDT SP FOR WOMEN | $111.48 | far above the same kind of item | $69.34 | comparable item: Prada Candy Florale By Prada Edt Spray 1.0 Oz (30  |
| Premium Beauty | 680353207 Prada Candy Gift Set for Women, 3 Pieces | $105.00 | far above the same kind of item | $37.97 | comparable item: Paris Hilton Can Can Gift Set for Women, 4 Pieces |
| Premium Beauty | 180829403 BOND NO. 9 HIGH LINE by Bond No. 9 , BODY WASH 6.8 OZ | $96.58 | far above the same kind of item | $12.61 | comparable item: Giorgio Beverly Hills Body Wash 6.7 Oz./ 200 Ml fo |
| Premium Beauty | 452761423 Dr. Brandt needles no more? NECK SCULPTING CREAM with GUA SHA Techniqu | $95.00 | far above the same kind of item | $89.00 | comparable item: Dr. Brandt Skincare Needles No More® Wrinkle Smoot |
| Premium Beauty | 571808706 Body Fantasies Signature Twilight Mist Body Spray for Women, 3.2 Oz | $95.00 | far above the same kind of item | $57.50 | comparable item: Body Fantasies Signature Coconut Fantasy Body Spra |
| Premium Beauty | 893576418 Cambridge Knight English Laundry Cambridge Knight 3 Pc. Gift Set For M | $90.00 | far above the same kind of item | $26.67 | comparable item: Riviera English Laundry Riviera 3 Pc. Gift Set For |
| Premium Beauty | 37653324 L'Homme La Nuit Frozen Men by YSL 3.3 oz EDC | $87.40 | far above the same kind of item | $53.96 | median per-unit price of comparable items |
| Premium Beauty | 904013329 Caramel Latte Ti nted Moistu rizer Sp f 25 (Light To Medium), 1.2 Ounc | $86.64 | far above the same kind of item | $7.89 | comparable item: Eminence Vanilla Latte Tin ted Moistu rizer SP F 2 |
| Premium Beauty | 958044241 Sisley Phyto Lip Balm Twist # 1 Nude, .08oz | $68.00 | far above the same kind of item | $43.26 | comparable item: Sisley Paris Phyto Lip Twist - 16 Balm |
| Premium Beauty | 529017868 It's a 10 Potion 10 Repair Shampoo 10 oz, Potion 10 Repair Conditioner | $57.38 | far above the same item's other variants | $62.47 | comparable item: It's a 10 Potion 10 Instant Repair Leave-In 4 oz |
| Premium Beauty | 300420575 Chi Iron Professional Display | $0.03 | below range | $57.00 | comparable item: Hot Tools Professional Flat Iron |
| Premium Beauty | 13473124207 GSI200WM Display | $0.01 | below range | $29.00 | median price of its category |
| Premium Beauty | 13512655387 GS13WM Display | $0.01 | below range | $29.00 | median price of its category |
| Premium Beauty | 13568805609 CHI STEAMPRESS DISPLAY | $0.01 | below range | $29.00 | median price of its category |
| Premium Beauty | 14619963568 new display | $0.01 | below range | $29.00 | median price of its category |
| Seasonal | 39746633 1/2 Carat T.g.w. Sapphire Diamond-accent | $89.00 | far above the same kind of item | $8.04 | median price of the same kind of item |
| Seasonal | 108975112 Celebrations Lrg Shp Valentine's Day Marquee | $0.05 | below range | $5.76 | comparable item: Celebrations Shp Happy Valentine's Day |
| Seasonal | 339211939 1Strand Painted Glass Round Bead Strands Baking Paint Light Green 6mm  | $0.01 | below range | $10.33 | median price of the same kind of item |
| Toys | 561193689 Annual Plug-ins And Support Plan For Pro Tools (renewal) | $99.00 | far above the same kind of item | $8.68 | median price of the same kind of item |
| Toys | 1538224949 "Peeps 24 inch Peeps Bunny" | $96.00 | far above the same kind of item | $27.91 | comparable item: Peeps 24 inch Peeps Bunny, Rainbow |
| Toys | 832296284 CAT TOY G ASST ON MERCH STRIP 6 STYLES PER STRIP 4 STRPS PER, Case Pac | $91.97 | far above the same kind of item | $68.21 | comparable item: CAT TOY MERCH STRIP G ASSORTMENT 6 STYLES PER STRI |
| Toys | 8035500898 BC PEEPS BUNNIES BUI | $79.52 | far above the same kind of item | $26.74 | comparable item: Zoomer Bunnies |
| Toys | 576271954 Salusen Hand Sanitizer Wipes 75% Alcohol Based Antibacterial Wet Wipe, | $79.27 | far above the same kind of item | $19.23 | comparable item: Salusen Hand Sanitizer Wipes 75% Alcohol Based Ant |
| Toys | 1832889642 "Peeps Emo Peeps Bunny" | $77.88 | far above the same kind of item | $8.02 | comparable item: Peeps Emo Peeps Bunny, Pink |
| Toys | 263324281 95 pcs 14G J Bend 220mm x 2mm Bike Bicycle Spokes with Nipples Steel S | $27.63 | far above the same item's other variants | $16.38 | comparable item: 95pcs 14G J Bend 245mm x 2mm Bike Bicycle Spokes N |
| Toys | 47222329 Buzz Bee Walking Dead Abraham's M16 Blaster Bundle with 14 Ultra Tek L | $0.04 | below range | $6.93 | comparable item: Buzz Bee Toys Air Warriors 20 Count Ultra-Tek Dart |
| Toys | 187019861 One Direction Micro Assortment | $0.03 | below range | $11.59 | comparable item: Assortment |
| Toys | 411336022 Cs6124 Vtech Display | $0.03 | below range | $23.99 | median price of the same kind of item |
| Toys | 447202812 Cd1153 Vtech Display | $0.03 | below range | $23.99 | median price of the same kind of item |
| Toys | 827324690 Display Razor Rampage E100 Blue Elec Sct | $0.03 | below range | $97.69 | comparable item: Razor Black Label E90 Pk Elec Sct |
| Toys | 843382779 Cs6919-2 Vtech Display | $0.03 | below range | $23.99 | median price of the same kind of item |
| Toys | 14170354542 D72 Fall-2024 Apple iPad EOTF Table Signing Kit | $0.03 | below range | $17.80 | median price of the same kind of item |
| Toys | 10759933 Polly Pocket Pop n' Swap | $0.02 | below range | $22.88 | comparable item: Polly Pocket Pop 'N Swap Fashion Frenzy - Dance |
| Toys | 11331753 G.I. Joe Comic Book Duke | $0.01 | below range | $9.97 | comparable item: B/W Comic Book Michelangelo |
| Toys | 121263808 Disney Pixar Onward Figure Assortment | $0.01 | below range | $13.82 | comparable item: Disney Toy Story 2" Figure 5-Pack Assortment |
| Toys | 129578759 Display - Pay Doh Dump Bin | $0.01 | below range | $14.97 | median price of its category |
| Toys | 144285250 Shop All Toys | $0.01 | below range | $8.88 | comparable item: L.O.L. Surprise! Shop |
| Toys | 155264727 Display 12v Yamaha Raptor Atv | $0.01 | below range | $17.99 | median price of its category |
| Toys | 155402341 Display Monster Jam Grave Digger Replica | $0.01 | below range | $32.99 | comparable item: 1:15 R/C Full-Function Monster Jam Grave Digger |
| Toys | 155635979 Disney 24V Cinderella Carriage Powered Ride-On | $0.01 | below range | $59.87 | comparable item: Disney Cinderella 6volt Quad Ride-on |
| Toys | 164428934 Display 24v Halo Warthog | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 169312843 6v Disney Princess Convertible Display | $0.01 | below range | $5.75 | comparable item: Disney Princess |
| Toys | 169525037 Disney - Disney Ec-1415, 12v New Frozen Suv | $0.01 | below range | $99.00 | comparable item: 6v Disney Frozen 3whl Scooter |
| Toys | 207626740 Vtech Display,leapster Explorer Gaming Pop Dis | $0.01 | below range | $23.99 | median price of the same kind of item |
| Toys | 210771956 Fisher Price Power Wheels Dune Racer Extreme Display | $0.01 | below range | $0.98 | comparable item: Power Wheels Dune Racer Dummy Display |
| Toys | 229077082 Disney Princess 6v Mercedes Princess Display | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 242516906 John Deere Peg Perego Display Jd Gator Xuv | $0.01 | below range | $29.99 | comparable item: JOHN DEERE 825I XUV GATOR 1:16 Scale |
| Toys | 283892544 Play-Doh In Line Header | $0.01 | below range | $12.76 | median price of the same kind of item |
| Toys | 312401359 Leap Frog Gaming Display - Leappad | $0.01 | below range | $8.49 | comparable item: LEAP FROG |
| Toys | 346547821 Magic Bullet Compact Display | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 363191158 Leap Frog Gaming Display - Explorer | $0.01 | below range | $8.49 | comparable item: LEAP FROG |
| Toys | 380796234 Display Rollplay 6v Ice Cream Truck | $0.01 | below range | $32.80 | comparable item: Kinetic Sand Ice Cream Truck with 8oz of Kinetic S |
| Toys | 384293152 Monster Jam Dtr Display El Toro Monster Truck | $0.01 | below range | $77.00 | comparable item: 6V El Toro Loco Monster Jam Monster Truck Powered  |
| Toys | 404564191 WMT.com Preorder Dummy UPC 18 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 407360574 DISPLAY, 12V Corvette C8 Red | $0.01 | below range | $19.97 | comparable item: 1:16 Rc Corvette, Red |
| Toys | 424784763 Spiderman-marvel 6v Spiderman Supercar Display | $0.01 | below range | $14.27 | comparable item: Spiderman-marvel Spider-man Spiderman 3 |
| Toys | 482452628 Fisher Price Display - Power Wheels Corvette 6v | $0.01 | below range | $19.62 | comparable item: Fisher Price - Thomas & |
| Toys | 501604890 Display Honda Talon | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 504300875 Hasbro Avenger Marvel Header | $0.01 | below range | $5.22 | comparable item: Hot Wheels Marvel Avenger Assortment |
| Toys | 520401726 Phillips Philips1; Wake-up Disp2 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 528129293 WMT.com Preorder Dummy UPC 11 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 535126253 Hot Wheels 1980 Dodge Macho Power Wagon Vehicle | $0.01 | below range | $12.10 | comparable item: Hot Wheels 80 Dodge Macho Power Wagon |
| Toys | 548335956 Leap Frog Display,leapster Explorer | $0.01 | below range | $35.00 | comparable item: Leap Frog Leapster Explorer Pet Pals 2 |
| Toys | 605718594 Disney Pixar Cars Golden Diecast Lightning Mcqueen Car Play Vehicle | $0.01 | below range | $6.42 | comparable item: Disney Pixar Cars Cruisin' Lightning McQueen Car P |
| Toys | 622673715 Display Razor Pc100 Bl Aluminum Deck | $0.01 | below range | $43.50 | median price of the same kind of item |
| Toys | 645304174 Minnie Mouse Display 12v Minnie Mercedes | $0.01 | below range | $17.99 | median price of its category |
| Toys | 652566493 6V MINNIE CONVERTIBLE 2021 - DISPLAY SAMPLE | $0.01 | below range | $17.99 | median price of its category |
| Toys | 662328343 WMT.com Preorder Dummy UPC 46 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 709476318 Fisher Price Display - 12v Power Wheels Wild Thing | $0.01 | below range | $69.23 | comparable item: Power Wheels VW Beetle Hot Wheels |
| Toys | 711244049 Fisher Price Display 12v Barbie Camper | $0.01 | below range | $14.34 | median price of the same kind of item |
| Toys | 769136194 Display 12v Minnie Mouse Mercedes | $0.01 | below range | $17.99 | median price of its category |
| Toys | 800900485 WMT.com Preorder Dummy UPC 35 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 824439330 Display Razor Black Label E90 Electric S | $0.01 | below range | $93.72 | comparable item: Razor Black Label 3.0 Scooter |
| Toys | 836692286 DISPLAY 6V SPIDER-MAN SUPERCAR | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 865123594 Display Pulse Burner Pro Plus Scooter | $0.01 | below range | $21.55 | comparable item: Pulse Performance Products Burner Pro Plus Freesty |
| Toys | 867705443 Display 24v Disney Princess Carriage | $0.01 | below range | $4.60 | comparable item: Sofia The First Sofia Carriage |
| Toys | 874747398 Display 6v Bmw I8 Concept Car | $0.01 | below range | $13.69 | comparable item: Lexus 1:24 Futuristic Concept Car |
| Toys | 884511806 Fisher Price Displayer For Fjj63 F-150 Raptor Extreme | $0.01 | below range | $14.34 | comparable item: Fisher-Price Imaginext Raptor |
| Toys | 966008563 DISPLAY, 12V Ford F-150 Raptor, GRAY | $0.01 | below range | $15.07 | comparable item: Adventure Wheels Ford Raptor |
| Toys | 1075899990 TINY LOVE 4-in-1 MAC, Tiny Farmland DISPLAY DNP | $0.01 | below range | $17.99 | median price of its category |
| Toys | 1536867174 Power Wheels Jurassic World Dino Racer Display | $0.01 | below range | $23.23 | comparable item: Jurassic World Mini Dino 3-Pack #1 |
| Toys | 1983991300 Power Wheels 12V Rubicorn Display | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 2092777007 Power Wheels 6V Jeep F23 Display | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 2172002708 Display Razor IconBL | $0.01 | below range | $43.50 | median price of the same kind of item |
| Toys | 2739531764 Display Razor RAMB16 | $0.01 | below range | $43.50 | median price of the same kind of item |
| Toys | 2744944254 Power Wheels 12V Jeep F23 Display | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 2820939560 DISPLAY Jetson Ryder PRO E-Scooter | $0.01 | below range | $49.99 | comparable item: Radio Flyer Pro Flyer Scooter |
| Toys | 5113283045 MONSTER FLAT DISPLAY | $0.01 | below range | $0.98 | comparable item: ARKITEC DISPLAY |
| Toys | 5310933881 John Deere Ground Force Display | $0.01 | below range | $31.56 | comparable item: John Deere Ground Force Mobile Play Set |
| Toys | 5318328719 Trend Pod Header - DAP 4695 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 5395277713 DISPLAY PW BARB JEEP | $0.01 | below range | $17.99 | median price of its category |
| Toys | 5493850395 24V RAZOR DIRT QUAD Display | $0.01 | below range | $43.50 | median price of the same kind of item |
| Toys | 5493876579 Creator Model Box 6517380 | $0.01 | below range | $10.80 | comparable item: LEGO Creator Snowman 30645 |
| Toys | 5495392041 Gaming Model Box 6517385 | $0.01 | below range | $20.48 | comparable item: DC GAMING |
| Toys | 7775111063 October Trend Pod Header - DAP 5112 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 11143969653 Disney Jr signage kit | $0.01 | below range | $17.99 | median price of its category |
| Toys | 14233309581 WMT Jan 2025 Header - DAP 5385 | $0.01 | below range | $17.99 | median price of its category |
| Toys | 19874207065 PD NONSALEABLE DUMP BIN - EMPTY | $0.01 | below range | $17.99 | median price of its category |

## Placeholder listings (19401): barcode lookup only, not in typed search
Names that identify no product ("Merchandise", a brand alone, "Discontinued", "coming soon", a supplier code); kept so a scan of the barcode still prices the item, named from another listing with the same UPC or Open Facts when possible. Test listings and store displays are not carried (rejects above). Names filled: {'none': 4858, 'open_facts': 24, 'walmart_listing': 58}. First examples:
- 878650 UPC 00311017104507 Health and Medicine: Discontinued Item by Supplier -> (name not provided) ($10.53)
- 879169 UPC 00011017314066 Health and Medicine: Discontinued Item by supplier -> (name not provided) ($3.81)
- 893370 UPC 00311017110751 Health and Medicine: Discontinued Item by Supplier -> (name not provided) ($10.96)
- 893371 UPC 00311017111208 Health and Medicine: Discontinued item by supplier -> (name not provided) ($11.44)
- 893372 UPC 00011017101406 Health and Medicine: Discontinued Item by supplier -> (name not provided) ($0.98)
- 893375 UPC 00011017231509 Health and Medicine: Discontinued item by supplier -> (name not provided) ($5.97)
- 1086737 UPC 00039414509014 Health and Medicine: Airborne -> (name not provided) ($17.47)
- 1115510 UPC 00311017100424 Health and Medicine: Discontinued item by supplier -> (name not provided) ($6.77)
- 1115513 UPC 00011017322603 Health and Medicine: Discontinued Item by supplier -> (name not provided) ($4.17)
- 1115514 UPC 00011017322610 Health and Medicine: Discontinued Item by supplier -> (name not provided) ($3.92)
- 2255579 UPC 00733905100260 Health and Medicine: Acuvue -> (name not provided) ($25.92)
- 2255622 UPC 00733905110153 Health and Medicine: ACUVUE -> (name not provided) ($25.92)
- 4213533 UPC 00080006109389 Health and Medicine: Merchandise -> (name not provided) ($34.88)
- 4901359 UPC 00765563212795 Health and Medicine: Merchandise -> (name not provided) ($27.25)
- 4901378 UPC 00765563211569 Health and Medicine: Merchandise -> (name not provided) ($27.25)

## Category labels in the sample review: 6.8% judged wrong
- 10983845: Beverages -> Toys, Books & Games
- 124165796: Beverages -> Toys, Books & Games
- 148437291: Beauty -> Pasta, Rice & Dry Goods
- 19907751937: Frozen Foods -> Kitchen & Dining
- 169186408: Pet Food & Supplies -> Home
- 19325304249: Lawn, Garden & Floral -> Kitchen & Dining
- 35609948: Lawn, Garden & Floral -> Kitchen & Dining
- 1707780971: Lawn, Garden & Floral -> Toys, Books & Games
- 3345688723: Household Supplies -> Seasonal & Party
- 336141455: Personal Care -> Home
- 277447361: Personal Care -> Home
- 10314922: Condiments, Sauces & Spreads -> Canned & Jarred Foods
- 100934609: Snacks & Candy -> Home
- 17479700731: Bread & Bakery -> Pasta, Rice & Dry Goods
- 172339662: Health & Medicine -> Pet Food & Supplies
- 258270785: Lawn, Garden & Floral -> Automotive
- 193040110: Kitchen & Dining -> Household Supplies
- 6004810022: Beverages -> Beauty
- 5488768753: Beverages -> Toys, Books & Games
- 888772904: Health & Medicine -> Toys, Books & Games
- 827381244: Health & Medicine -> Electronics
- 44726589: Household Supplies -> Toys, Books & Games
- 959099250: Household Supplies -> Toys, Books & Games
- 44145956: Beauty -> Seasonal & Party
- 5014524616: Health & Medicine -> Baby
- 5022557264: Toys, Books & Games -> Kitchen & Dining
- 510564843: Seasonal & Party -> Baking, Spices & Oils
- 552683013: Household Supplies -> Seasonal & Party
- 899302302: Electronics -> School, Office & Crafts
- 883564063: Lawn, Garden & Floral -> Household Supplies
- 55375709: Electronics -> Home
- 739670097: Electronics -> Toys, Books & Games
- 47234900: Pasta, Rice & Dry Goods -> Canned & Jarred Foods
- 409034145: Seasonal & Party -> Kitchen & Dining
- 3807423529: Lawn, Garden & Floral -> Seasonal & Party
- 5262667417: Home -> Kitchen & Dining
- 960182302: Personal Care -> Beauty
- 50694859: Kitchen & Dining -> Household Supplies
- 915524601: Home -> Kitchen & Dining

## Live price differences (worst 25 of 320 checked)
- 873092978 Godzilla King of Monsters Battlepack featuring 6" action figures: snapshot 9.97 -> live not found
- 46892773 Poolmaster Yellow Suntanner Mattress: snapshot 31.96 -> live not found
- 596987520 Garnier Fructis Sleek & Shine Shampoo & Conditioner, Frizzy, Dry, Unmanageable Hair, 33.8 fl. oz.: snapshot 9.06 -> live not found
- 432533857 No7 Serums: snapshot 20.0 -> live not found
- 284835141 PureBaby Sound Sleepers Portable Sound Machine & Star Projector - Plush Sleep Aid for Baby and Toddlers with Soothing Night Light Display, 10 Lullabies, White Noise, and Heartbeat Sounds (Polar Bear): snapshot 29.99 -> live not found
- 809503304 OGX Bodifying Bamboo Collection: snapshot 6.03 -> live not found
- 352323369 Spray ‘n Wash Laundry Stain Removers: snapshot 2.92 -> live not found
- 3071489399 B.E Bio Eyes Womens Cateye Reading Glasses Made from Recycled Plastic Hazel +2.00 in Black: snapshot 12.97 -> live not found
- 720368779 PlayWorld Toolbench Time! Take-A Part Carrier Tool Box With Racing Car And Lights & Sounds: snapshot 45.89 -> live not found
- 811279650 [35% Off] Screen Shades Mother's Day Bundle - Blue Light Blocking Computer Glasses - SS202 Sand & SS602 Red Fade - UV Protection - Relieve Eye Strain and Prevent Headaches From Device Use and Gaming: snapshot 74.98 -> live not found
- 672666522 PlayWorld Giddyup! Buck's Toy Archery Bow And Arrow Set for Kids With Suction Cup Arrows And Target - Multicolor: snapshot 46.99 -> live not found
- 602741462 Screen Shades Mother's Day Bundle - Blue Light Blocking Computer Glasses - SS201 Grey/Blue; SS601 Blue Fade - UV Protection - Relieve Eye Strain and Prevent Headaches From Device Use and Gaming: snapshot 67.23 -> live not found
- 365565311 L'Oreal Paris Brow Stylist Definer Waterproof Eyebrow Mechanical Pencil, Brunette, 2 Pack: snapshot 15.94 -> live not found
- 871783046 PlayWorld Robowonder Dancing Futuristic being With Light & Sound - White: snapshot 28.14 -> live not found
- 881028558 Palmer’s Coconut Oil Formula Body Care Collection: snapshot 4.75 -> live not found
- 872789929 Great Value Everyday Strong Paper Towels, Split Sheets, 3 Triple Rolls: snapshot 4.28 -> live not found
- 5401758797 Lemme Debloat - Digestive & Gut Health Gummies with 2 Clinically Studied Probiotics & Prebiotic, Vegetarian, Gluten Free, BlackBerry Flavor, 60 Count: snapshot 29.97 -> live not found
- 118656615 [35% Off] Screen Shades Mother's Day Bundle - Blue Light Blocking Computer Glasses - SS201 Grey/Blue & SS601 Blue Fade - UV Protection - Relieve Eye Strain and Prevent Headaches From Device Use and Gaming: snapshot 74.98 -> live not found
- 389234698 Shop all Ziploc® Accessory Products: snapshot 4.98 -> live not found
- 5212491433 Funko Bitty POP Singles: Marvel Mini Vinyl Figure Blind Bag: snapshot 3.44 -> live 11.99
- 517056711 Handi-Foil 8" x 8" Aluminum Square Cake Pan, 2 Count: snapshot 4.94 -> live 12.97
- 16456602135 As I Am Rosemary Leave In Conditioner Scalp Treatment for Hair Density and Thinning Hair Hydrating Growth Support Spray 8 fl oz with Biotin, Saw Palmetto & Melatonin: snapshot 8.99 -> live 17.94
- 9682768840 Tide Laundry Detergent Liquid Plus a Boost of Ultra Downy, April Fresh Scent, 73 fl oz, 52 Loads: snapshot 12.97 -> live 23.22
- 191929784 Biosilk Silk Therapy Original Leave In Treatment 5.64 Oz: snapshot 28.97 -> live 14.27
- 388779448 URO Parts 61667264145 Windshield Washer Fluid Reservoir Cap: snapshot 20.88 -> live 11.64

## Unit-price outliers (worst 25)
- 1390264874 FLUZONE QIV 0.5ML: 6952.6627/fl oz vs median 0.2046 (x33981.733627), cat 14
- 325874115 TimeMist Settings Fragrance Dispenser Black 3 2/5"W x 3 2/5"D x 8 1/4"H 1047811EA: 0.0001/ct vs median 2.5 (x4e-05), cat 30
- 779549756 Taylor Precision Products 55814072F 400lb-capacity Digital Glass Body Analyzer & UPG AAA 50 Pack: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 27
- 940971158 Taylor Precision Products 55804072F 440lb-capacity Digital Glass Body Analyzer & UPG AAA 50 Pack: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 27
- 1432550670 BENTISM Rubber Curb Ramp Driveway Ramp for Curb 4.25" Rise 19.7" Wide 33069 lbs: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 1915291114 BENTISM Rubber Curb Ramp Driveway Ramp for Curb 3.7" Rise 39.4" Wide 33069lbs Load: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 2984313755 BENTISM Curb Ramp Rubber Driveway Ramp 2.6" Rise 15 tons Capacity Threshold Ramp: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 3084973264 BENTISM Rubber Curb Ramp Driveway Ramp for Curb 6" Rise 19.3" Wide 33069 lbs Load: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 3992026852 VEVOR Rubber Curb Ramp Driveway Ramp for Curb 2 Pack 6" Rise 19.3" Wide 33069lbs: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 5550793769 KFFKFF Rubber Threshold Ramp Door Ramp 3" Rise 33069 lbs Load Rubber Curb Ramp: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 5729715760 KFFKFF Rubber Threshold Ramp Door Ramp 1" Rise 33069 lbs Load Rubber Curb Ramp: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 14336422198 KFFKFF Enhanced Rubber Incline Ramp, 4" Height Doorway Ramp with Single Channel, Pure Rubber Vehicle Ramp with Anti-Slip Grainy Surface, 33069 lbs Weight Tolerance Sidewalk Ramp for Wheelchair: 0.0001/oz vs median 2.1496 (x4.7e-05), cat 14
- 34052351 Baseline Tactile monofilament evaluator, 1.65 (0.008 gram) Semmes-Weinstein: 65200.0/oz vs median 3.6333 (x17945.118763), cat 14
- 16622243 OFF! Clip-On Mosquito Repellent Starter Kit 0.0016 Ounces: 10706.25/oz vs median 0.7106 (x15067.553304), cat 16
- 34052350 Baseline Tactile monofilament evaluator, 2.36 (0.02 gram) Semmes-Weinstein: 27942.8571/oz vs median 2.1496 (x12999.096157), cat 14
- 38250800 Shieldme 2015 6ml Lens Cleaning Pen Pop: 112.0749/fl oz vs median 0.0113 (x9918.132743), cat 16
- 16553034 OFF! Clip-On Mosquito Repellent Starter Kit, 0.0016 oz: 5456.25/oz vs median 0.7106 (x7678.910703), cat 16
- 678102390 Breakthrough Clean Technologies® Anti-Fog Lens Gel Kit, 10ml Tube & Cloth: 65.0104/fl oz vs median 0.0113 (x5753.132743), cat 16
- 989466932 Super cost-effective 1/2 pcs Adjustable 10-40 KG Therapy Exerciser Hand Strengthener Hand Gripper: 0.0004/oz vs median 2.1592 (x0.000185), cat 14
- 21642316 Europa Sports Prod. Super Amino 4800gm 450 Capsules: 0.0004/oz vs median 2.056 (x0.000195), cat 14
- 401570121 Habitrol Nicotine Transdermal System Stop Smoking Aid, Steps 1, 2, and 3, 8 Week Kit, 56 Patches: 9998.0/oz vs median 2.1408 (x4670.216741), cat 14
- 21854516 PHYSICIANSCARE Bandage, Beige, Plastic, PK50 90242G: 0.0011/oz vs median 4.275 (x0.000257), cat 14
- 46120310 Loratadine usp 10 mg antihistamine allergy relief tablets by OHM - 500 Each: 0.0001/ct vs median 0.3555 (x0.000281), cat 14
- 615847970 Get Rid of Warts Fast, Removal Pro, Facial, Genital Warts, Natural Healing Cistotelo 1ml: 295.5621/fl oz vs median 0.0863 (x3424.821553), cat 14
- 17300524 ZINSSER 60101 House Cleaner & Mildew Killer, 1 G: 713.881/oz vs median 0.2916 (x2448.151578), cat 16

## Price changes > 50% (first 50)
- 872053 Energizer 123 3V Lithium Photo Batteries (2 Pack), CR123A High Power Lithium Batteries Compatible with Cameras, Flashlights, Electronics and More: 8.17 -> 14.37
- 2304278 Great Value Grapette Grape Soda Pop, 12 fl oz, 12 Pack Cans: 2.46 -> 4.84
- 5983299 FreeStyle Lite Blood Glucose Test Strips, 50 Count: 39.82 -> 92.33
- 9886242 Calvin Klein Obsession Eau de Toilette, Cologne for Men, 2.5 fl oz: 54.0 -> 90.0
- 10105152 Carex Soft Grip Derby Folding Cane for Adults and Seniors, Black: 9.37 -> 22.95
- 10291039 Ragu Old World Style Mushroom Pasta Sauce, 24 oz: 5.31 -> 2.53
- 10291253 San Giorgio 16 oz Lasagna Pasta: 5.63 -> 2.42
- 10291529 Nature Made Vitamin C 500 mg Tablets, Dietary Supplement for Immune Support, 250 Count: 12.42 -> 18.99
- 10291622 Fresca Citrus Soda Pop Fridge Pack Cans, 12 fl oz, 12 Pack: 4.88 -> 7.57
- 10291623 Barq's Zero Sugar Root Beer Soda Pop Fridge Pack Cans, 12 fl oz, 12 Pack: 4.68 -> 8.42
- 10291814 Kraft Green Goddess Dressing, 16 fl oz Bottle: 6.63 -> 3.28
- 10292719 CHIPS AHOY! Minis Original Fudgy Chocolate Chip Cookies, 8 oz: 1.98 -> 2.98
- 10293986 HALLS Defense Assorted Citrus Throat Drops, Vitamin C Dietary Supplements, 30 Drops: 1.78 -> 2.71
- 10294743 Gerber 3rd Foods Mealtime for Baby Lil' Sticks, Turkey, 2.5 oz, Jar: 3.04 -> 4.98
- 10294766 Hawaiian Punch Lemonade Juice, 1 Gal, Bottle: 7.37 -> 3.32
- 10295145 Del Monte Very Cherry Mixed Fruit in Extra Light Syrup, Canned Fruit, 15 oz Can: 1.48 -> 2.82
- 10295268 Contadina Tomato Sauce, Canned Tomatoes, 15 oz Can: 0.98 -> 1.53
- 10295382 Kraft Asian Toasted Sesame Dressing, 16 fl oz Bottle: 2.12 -> 3.28
- 10295416 Jergens All Purpose Face Cream, Deep Cleansing Moisturizer, Lotion for Dry Skin, 15 fl oz: 5.38 -> 9.87
- 10295678 Kraft Classic Catalina Fat Free Dressing, 16 fl oz Bottle: 6.73 -> 3.28
- 10295713 Kraft Cucumber Ranch Salad Dressing, 16 fl oz Bottle: 1.98 -> 3.28
- 10295780 Kraft Caesar Vinaigrette with Parmesan, 16 fl oz Bottle: 2.12 -> 3.28
- 10295783 Kraft Ranch Dressing with Bacon, 16 fl oz Bottle: 6.63 -> 3.28
- 10295801 Kraft Three Cheese Ranch Salad Dressing, 16 fl oz Bottle: 1.98 -> 3.28
- 10304329 Dole Crushed Pineapple in Heavy Syrup, 20 oz Can: 1.48 -> 2.22
- 10306794 Bush's Canned Pinto Beans, Canned Beans, 16 oz Can: 1.53 -> 2.42
- 10307538 Ken's Steak House® Creamy Italian Salad Dressing 16 fl oz: 7.18 -> 3.47
- 10308841 McCormick Hot Taco Seasoning Mix, 1.25 oz: 4.19 -> 1.46
- 10308887 McCormick Gluten Free Yellow Food Color, 1.0 fl oz Box: 6.52 -> 2.38
- 10308942 SCHILLING Original Taco Seasoning Mix 1.25 OZ: 4.06 -> 1.46
- 10308974 Open Pit Thick And Tangy Original BBQ Sauce, 18 oz.: 0.98 -> 1.58
- 10308986 McCormick Guacamole Seasoning Mix, 1.0 oz Packet: 5.79 -> 0.97
- 10309036 McCormick Hollandaise Sauce Mix, 1.25 oz Packet: 3.17 -> 1.46
- 10309245 Ben & Jerry's Chubby Hubby Vanilla Ice Cream Kosher Milk Cage-Free Eggs, 1 Pint: 3.0 -> 4.87
- 10311739 Colgate MaxFresh Cool Mint Toothpaste, Travel Toothpaste, 1.0 oz: 0.97 -> 1.47
- 10312262 Lindt Lindor 60% Extra Dark Chocolate Candy Truffles, 5.1 oz, Bag: 3.78 -> 6.88
- 10312298 Lindt LINDOR Stracciatella Truffles, 5.1 oz Bag: 4.27 -> 6.88
- 10312566 Archway Cookies, Soft Molasses Cookies, 9.5 oz: 3.01 -> 4.64
- 10313102 Hollywood Beauty Olive Oil for Hair, Scalp, and Skin, 2 fl oz , All Hair Type: 8.18 -> 3.48
- 10313415 Jell-O Blackberry Fusion Gelatin Dessert Mix, 3 oz Box: 3.61 -> 1.48
- 10313555 Zep Enforcer 34-2050CVA Country Vet Metered Fly Control Spray, Refill, 30 Day Supply, Brown/A: 18.31 -> 29.55
- 10313619 SoftSheen Carson Dark and Lovely Triple Nourished Hair Relaxer, Regular Strength: 9.01 -> 22.9
- 10314150 L'OREAL BARE NATURALE LUMINOUS LENGTHENING MASCARA #800 BLACK: 9.0 -> 15.99
- 10314323 L'Oreal Paris True Match Super Blendable Oil Free Makeup Powder, Cappuccino, 0.33 oz: 14.99 -> 22.99
- 10315057 Nickles Bakery Giant White Bread, 20-Ounce Loaf.: 4.7 -> 2.08
- 10315224 Great Value 98% Fat Free Cream of Celery Condensed Soup, 10.5 oz: 0.78 -> 1.46
- 10315270 Great Value Light Syrup Extra Cherry Fruit Mix, 15 oz: 1.08 -> 2.08
- 10315492 Great Value Fruit Cocktail in Heavy Syrup, 15.25 oz: 1.08 -> 2.08
- 10315846 Great Value Apple Manzana Soda Pop, 12 fl oz, 12 Pack Cans: 9.69 -> 4.84
- 10316712 Great Value Sugar Free Peach Gelatin Dessert, 0.3 oz: 0.52 -> 1.12
