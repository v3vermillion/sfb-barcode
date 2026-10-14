# Plan and origin

The original plan (October 2026) with each step's outcome. Current decisions are in DECISIONS.md; current operations in
RUNBOOK.md.

## Problem
Volunteers receiving donations valued items from memory. Paid barcode apps cost about $100 a month, which a food bank
cannot justify. Donations can be almost anything, mostly food, drinks and household goods.

## Solution
A fully offline progressive web app with a barcode scanner and a search bar: the price database lives on the phone,
nothing is written back, and a live check covers unknown barcodes when there is signal.

## Phases
| Phase | Outcome |
|---|---|
| 1 Walmart I/O access from a Cloudflare Worker | Done |
| 2 Map the scope to Walmart departments (`data/categories.json`) | Done: 15 departments, categories decided by rules in `crawler/classify.py` |
| 3 Crawl the product catalog | Done: resumable crawler on GitHub Actions, working data on the `data-store` branch |
| 4 Normalise sizes, packs and prices | Done: `crawler/normalize.py`, measured by unit tests and a hand-labelled gold set |
| 5 The app, shipped as versioned compressed packs | Done: `app/`, see `app/README.md` |
| 6 Pilot with a real donation batch and a shelf spot-check | Pending: see READINESS.md |
| 7 Refresh on a schedule | Done, measured instead of fixed: each department is re-crawled on the interval its own price drift justifies |
| 8 Other stores' brands (Aldi, Giant Eagle, Meijer) | Done through Open Food, Beauty and Products Facts: an equivalent value with a confidence level |

## App requirements (all met)
- Offline-first, installed to the Home Screen (iOS evicts storage for uninstalled sites after a week).
- Barcode scanner that works offline: GTIN lookup with UPC-E and EAN-13 normalisation and retired barcodes.
- Store-printed price labels decoded directly; produce codes with weight or count entry.
- Non-Walmart barcodes valued at a labelled equivalent with the basis item shown.
- Typed search tolerant of abbreviations (GV, pb, oz, pk, ct); results show brand, variant, size, pack and price.
- Never blank: the same product type at the same size, per unit, flagged, as a last resort.
- Live Walmart check for scanned items when online.
- The price source and date on every result; the database as versioned packs updated in the background.
- Open Food Facts attribution (ODbL) under About.

## Questions the food bank answered
- After a lookup the item goes on a running tally on the phone, shared as text; nothing is stored centrally.
- Volunteers use their own phones, installed from the food bank's own address.
- The repository owner runs the service and approves pricing policy; the food bank's manager hands the app to volunteers.
