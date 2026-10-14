# Data workflow

Goal: the volunteer scans or types the item in their hand and gets the exact item and its current price, offline,
never a blank. Everything below serves that.

## Architecture
- **Crawler, gates and publishing: GitHub Actions** (`.github/workflows/pipeline.yml`, code in `crawler/`). Runs for
  hours at no cost on a public repository; working data lives on the `data-store` branch, compacted to one commit after
  every publish so the repository never grows.
- **Live price check and schedule watchdog: Cloudflare Worker** (`pipeline/`). Signs Walmart requests for the app's
  online lookups; its cron starts a pipeline run whenever GitHub's scheduler has gone quiet.
- **The app: offline PWA** (`app/`, see `app/README.md`). A database pack per department, search and a barcode scanner on
  the phone; deployed to Cloudflare by `.github/workflows/deploy-app.yml` after every publish.

## Pipeline
Every run does one job, chosen by `crawler/ci.py decide()` from a few small state files read through the GitHub API, in
this order of priority:

1. **Size** every department once a month (one call each), so a crawl that ends early is noticed.
2. **Crawl** the departments whose refresh interval has passed (`state/cadence.json`), every page, first-party listings
   only (`soldByWmt=true`: marketplace prices run five to ten times higher). The cursor is saved after every page; a run
   that reaches its time budget starts the next one itself; a run throttled by Walmart backs off and resumes.
3. **Normalise and build** (`crawler/normalize.py`, `crawler/process.py`): size and pack from the product name (Walmart's
   size field is unreliable), variant words, per-unit price for consumables, the store category (`crawler/classify.py`,
   docs/CATEGORIES.md), barcodes as GTIN-14. Retired barcodes are kept and flagged, since donors give old stock. A
   clearance or flash price keeps the last normal price. Listings that are not products, and departments a food bank
   never receives, are left out.
4. **Gate** the candidate (`crawler/qa.py`, thresholds in `data/gates.json`): every department finished, every sentinel
   item priced, a live check of sampled prices against Walmart, size parsing, per-unit outliers, item and category counts
   against the previous snapshot, price drift, the 330-query search gold set, and a sample review of the rows the last
   reviewed snapshot did not have, judged on evidence. A held snapshot opens a `[gates-hold]` issue with the report;
   the previous snapshot stays live.
5. **Publish** to `data-store:build/published/` with a manifest; the price history records what changed
   (docs/HISTORY.md); the newest three publishes are kept as GitHub Releases for rollback. The app deploys itself next.
6. **Audit** the published prices against Walmart every week, per department; the measured drift sets each department's
   refresh interval (`crawler/cadence.py`) within the Walmart quota.
7. **Identify** barcodes Walmart does not sell (`crawler/identify.py`, monthly) from Open Food, Beauty and Products Facts,
   matched to the closest Walmart item for an equivalent value with a confidence level.
8. **Store prices** (`crawler/storeprice.py`): the Strongsville Supercenter's own shelf price and stock for consumable
   rows, on the tiers in `data/store.json`.

## Schedule
- A scheduled run every 30 minutes, plus the Worker's cron watchdog, plus a run that chains its successor while work
  remains. A run with nothing due ends in under a minute.
- Each department is re-crawled on its own measured interval, between 5 and 120 days, never more often than the floors
  (consumable 7 days, durable 30) until its drift has been measured.
- Store prices: food, household, personal care and health every 28 days; baby, pets, beauty and pharmacy every 56.
- The pipeline slows to 3 calls a minute on weekday mornings (`volunteer_hours`), when volunteers may be using the live
  check that shares the same Walmart key.

## How the app resolves an item (decision 2026-10-06)
1. **Barcode → exact Walmart item**, retired barcodes and single units from multipacks included.
2. **Store-printed labels** (meat, deli, bakery; barcodes starting with 2) carry their price and are decoded directly;
   produce stickers (PLU codes) give the item and its price per pound or each.
3. **A barcode Walmart does not sell** (Aldi, Giant Eagle, Marc's, Meijer, Target, Dollar General, Kirkland, regional
   brands) is identified offline and valued at the closest Walmart equivalent, labelled "equivalent value" with the
   basis item shown.
4. **Typed search** shows brand, variant, size, pack and price; the volunteer taps the exact one.
5. **Live check**: when the phone is online, an unknown barcode is priced through the Worker.
6. **Last resort**: the same product type at the same size, per unit, flagged. Never blank, never unpriced.

Used goods show the new retail price; whether to adjust for condition is food-bank policy.
