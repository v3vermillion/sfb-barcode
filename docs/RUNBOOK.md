# Runbook

## Walmart I/O auth
Each request carries four headers:
- WM_CONSUMER.ID
- WM_CONSUMER.INTIMESTAMP — epoch milliseconds
- WM_SEC.KEY_VERSION
- WM_SEC.AUTH_SIGNATURE — base64 RSA-SHA256 (PKCS#1 v1.5) signature of `consumerId\ntimestamp\nkeyVersion\n`

Public key format accepted by the portal: base64 body only (no BEGIN/END lines).

## Deploying the pipeline Worker (phone-only)
1. Cloudflare → Workers & Pages → Create → Continue with GitHub → select v3vermillion/sfb-valuation.
2. Root directory: `pipeline`. Deploy command: `npx wrangler deploy` (default).
3. Worker → Settings → Variables and Secrets → add (type Secret):
   - WM_PRIVATE_KEY — full PEM from password manager (BEGIN/END lines included)
   - WM_CONSUMER_ID — Prod Consumer ID from walmart.io
   - ADMIN_TOKEN — any long random string; required on every request
   - GH_DISPATCH_TOKEN — the schedule watchdog's GitHub token (see "Schedule" below): a fine-grained personal access
     token (GitHub → Settings → Developer settings → Personal access tokens → Fine-grained) for this repository only,
     permission *Actions: Read and write*, the longest expiry offered; the `[schedule-gap]` issue says when it is
     missing or has expired. Without it the watchdog does nothing.
   WM_KEY_VERSION=1, GH_REPO, GH_BRANCH and WATCHDOG_GAP_MIN are set in wrangler.toml.
4. Redeploy (or push any commit) so secrets apply. `/watchdog?token=<ADMIN_TOKEN>&dry=1` shows what the watchdog sees.
5. Nothing else to create: the Durable Object behind /v1/learned comes from the migration in wrangler.toml on the first
   deploy that carries it (2026-10-20). `/health` should show `LEARNED: true` and `STORE_ID: "2266"` (until 2026-10-20 the
   store id sat under `[triggers]`, where wrangler ignores it, so the live check answered with Walmart.com's price).

## Endpoints
- GET /v1/price/<gtin> — PUBLIC (no token): live Walmart price for the app, the Strongsville store's own price
  (`STORE_ID` in wrangler.toml; `priceSource` "store"). Rate limited 30/min per IP and
  20 Walmart calls/min in total (`[[ratelimits]]` bindings PRICE_LIMITER and PRICE_GLOBAL_LIMITER in
  wrangler.toml; charged only on a cache miss), 6 h edge cache per GTIN, CORS GET only.
  Returns `{ok:true, price, name, brand, upc, stock, listings[], checkedAt}` or `{ok:false, reason}`;
  429 when limited, 503 (`retry-after`) when Walmart throttles/fails or the bindings are missing.
  Local dev without bindings: set `ALLOW_UNLIMITED_DEV=1` in `.dev.vars` (never in production).
- GET|POST /v1/learned — PUBLIC (no token): the volunteers' shared remembered matches (a barcode nothing knew, matched to a
  Walmart item by a search by name on one phone). GET returns `{ok, count, learned:[{gtin, upc, title, n, at}]}` (newest
  first, at most 5,000); POST `{gtin, upc, title}` adds a vote for the match (`forget: true` takes one back: the app's
  Undo), rate limited 30/min per IP (PRICE_LIMITER). The table lives in the SQLite-backed Durable Object `Learned`
  (`[[durable_objects.bindings]]` + `[[migrations]]` in wrangler.toml, created on deploy; the Free plan allows SQLite-backed
  objects). Without the binding the route answers 503 and every phone keeps only its own matches.
- GET /health?token=ADMIN_TOKEN — config check, never prints secret values (shows STORE_ID and whether LEARNED is bound)
- GET /taxonomy?token=ADMIN_TOKEN — signed Walmart Taxonomy call; top-level departments
- GET /taxonomy/<id>?token=ADMIN_TOKEN — children of one category node
- GET /items/<id>?token=ADMIN_TOKEN&pages=N&raw=1 — test pull of product catalog for a node (read-only)
- GET /search?token=ADMIN_TOKEN&q=TEXT[&category=ID] — coverage spot-check

## Rotating keys
Generate new pair → upload public key on walmart.io (key version increments) → update WM_PRIVATE_KEY and WM_KEY_VERSION.

## Data pipeline (GitHub Actions)
Required repository secrets (Settings → Secrets and variables → Actions):
- WM_PRIVATE_KEY — full PEM from the password manager
- WM_CONSUMER_ID — Prod Consumer ID
- ANTHROPIC_API_KEY — used only by the sample review before a publish (console.anthropic.com → API keys): up to 600 rows in
  calls of 300, drawn (`sample_review.new_rows_only`) from the rows the last reviewed snapshot did not have, since a refresh
  changes prices, not rows a reviewer already judged; fewer than `min_new_rows` (50) new rows means no review and no spend
  (the gate says so). A snapshot approved by hand or published under the grace was not reviewed, so the next candidate is
  judged in full. About $0.25 a review at 2026 Sonnet prices; a few dollars a year.
  Without it a finished snapshot holds and the `[review-key-invalid]` (the review API call was rejected: 401 invalid or revoked key, or 403 no permission -> replace the secret), `[review-credits]` (out of Anthropic credits -> add credits; auto-reload is off), `[review-key-missing]`, `[review-model]` (the review model is retired and no replacement could be listed -> set the `SFB_REVIEW_MODEL` variable) issue says so; `sample_review.required=false` in
  `data/gates.json` waives the review. Nothing holds forever: after `sample_review.unavailable_grace_days` (21) of the review
  being unable to run at all, a candidate that passes every deterministic gate publishes without it and the review issue stays
  open (`state/review-outage.json` on the data-store branch records since when). A retired review model (HTTP 404) is replaced by the newest
  `claude-sonnet-*` the key lists (`GET /v1/models`), recorded as `model_fallback` in the verdict.
Optional variables: WM_KEY_VERSION (default 1), SFB_REVIEW_MODEL (default claude-sonnet-5-5).

### How it runs
`pipeline.yml` runs `plan=continue` at 17 and 47 past every hour. A peek step reads only `state/run.json`, the published
manifest, `sizing.json`, `audit/latest.json` and the candidate `gates.json` through the GitHub API and ends the run when nothing
is due (no data-branch checkout). Otherwise `crawler/ci.py` runs ONE Walmart job per run, in this order: sizing pass (one call per
department, every 30 days) > crawl resume (300-minute budget, then chains `continue`) > build + gates + publish > weekly live
audit > identify refresh > store prices. Only one run executes at a time (concurrency group `pipeline`); a crawl paused by Walmart
429s (after the 45-minute back-off cap) chains the next run too, so the crawl never waits on the schedule, which stays as the
backstop. Cadence: `data/schedule.json` (per-department intervals from `state/cadence.json`, see "Refresh cadence"; floors
refresh.fixed_days 30 since 2026-10-19, with full_every_days and core_every_days 30 as the fallback; audit_every_days 7, identify_every_days 30, sizing_every_days 30, stale_days 45,
budget_min 300).

### Acceptance gates (`data/gates.json`; a null threshold = measure only)
departments_complete (every department done, kept > 0, pages within 30% of `sizing.json`), sentinels (every one of data/sentinels.json found and priced; 114 since Electronics and the Rain-X auto-care sentinel left on 2026-10-12),
live_match (500 random items re-checked live in 25 calls: ≥ 90% of the rows Walmart still lists within 5% of the snapshot price, consumable and durable rates reported; rows no longer listed are counted separately and never a wrong price, `live_missing_max` null), size_parse (≥ 92% of Food rows sized: a parsed size, sold by the pound, or sold each; 92.7% measured 2026-10-08),
unit_outliers (< 0.5% of unit-priced rows outside 10× of their category median), the existing drift and count gates, and
sample_review (300 random rows judged against `data/review-criteria.md`; systematic junk or > 5% junk holds). All pass → publish;
otherwise hold + `[gates-hold]` issue with the report. `plan=approve` publishes a held candidate after the owner has read the report.
Editing `data/gates.json`, `data/sentinels.json` or `data/categories.json` makes the next run re-evaluate a held candidate.

### Alerts (GitHub issues, label `pipeline-alert`)
One open issue per kind, updated in place, closed automatically when the condition clears. Watch the repository (or just
its issues) in the GitHub app for phone notifications.

| Issue | Meaning | What to do |
|---|---|---|
| `[pipeline-failed]` | a run crashed | read the failing step in the run; the next successful run closes it |
| `[gates-hold]` | the candidate snapshot is held; the report is in the issue | fix a rule or threshold, or run `plan=approve` |
| `[review-key-missing]` | `ANTHROPIC_API_KEY` is not set | add the secret, or set `sample_review.required` false |
| `[review-key-invalid]` | the key was rejected (401) or lacks permission (403) | replace the secret |
| `[review-credits]` | the Anthropic account is out of credits | add credits (auto-reload is off) |
| `[review-model]` | the review model is gone and no replacement could be listed | set the `SFB_REVIEW_MODEL` variable |
| `[schedule-gap]` | pipeline runs more than 3 h apart while idle | add or renew the Worker's `GH_DISPATCH_TOKEN` ("Schedule") |
| `[audit-regression]` | the weekly audit found the published prices drifting (off while `audit_match_min` is null, since 2026-10-19) | nothing if a refresh is due; else lower the cadence cap |
| `[audit-failed]` | the audit could not reach Walmart | a 401/403 means the `WM_*` secrets no longer match |
| `[accuracy-budget]` | the refresh plan cannot hold the target within the quota | adjust `refresh.*` in data/schedule.json |
| `[stale-prices]` | no publish for `stale_days` while idle | look at the latest runs and the other open issues |
| `[throttled]` | three consecutive runs ended on Walmart rate limiting | nothing; the pace adapts; it closes when a run completes |
| `[crawl-truncated]` | a department ended far short of Walmart's page count, or its id was refused | give it a `split` or fix the node id ("Crawl scope edits") |
| `[data-store-size]` | the data-store branch passed 1 GB | decide where raw pages move (the issue carries the proposal) |
| `[snapshot-archive]` | a publish could not be kept as a GitHub Release | nothing; the publish stands and the next one retries |
| `[search-gold]` | the search gold set fell below 95% on a deploy | fix the ranking or a wrong expectation |
| `[deploy-failed]`, `[deploy-mismatch]` | the app deploy failed or the live build does not match | check the Cloudflare deployment and re-run deploy-app |
| `[tests-failed]` | the test suite failed on main | fix the test or the code |

### Pacing (`state.pace`, data-store `throttle/`)
Every request and every 429 sleep is logged to `throttle/<run>.events.jsonl`; at the end of each crawl invocation
`crawler/throttle.py` infers whether Walmart limits per second or per minute and at what rate, writes
`throttle/<run>.analysis.json`, and sets `state.pace = {per_min, inferred, updated, run_id}`: the next run paces under that cap
(0.85× the inferred limit after 3+ 429s; +10% after a clean run; −15% after a costly one; unchanged when 429s cost under 2%;
clamped 6–48/min on top of the 1.25 s floor). A cap is never lowered on a single 429, on a run under 2 minutes, or on 429s that
came after fewer requests than a clean minute (an outage, not the cap) costing under 10%. Within a run, each 429 also lowers the
cap 15% (not below 6) and every 50 successes raise it 10% back towards the starting cap. The job summary prints one pace line per crawl.
Read a log by hand: `python -m crawler.throttle store/throttle/<run>.events.jsonl --cap <per_min>`.

### Holds and retries
A held candidate stands until `data/gates.json`, `data/sentinels.json` or `data/categories.json` changes (the candidate's
`gates.json` carries their hash). A hold marked `transient` (live check or review unavailable: key missing or rejected, credits, model, API) is rechecked after 6 hours.
`peek` prints `work=inspect` when `state/run.json` is unreadable so the full job runs and fails loudly. The pipeline-failed issue
is resolved only by a run whose Run step succeeded (a peek-only run clears nothing). Alerts from Finish win over Run over peek.
`identify/latest.json` is a marker written by the identify plan (git keeps no file times). A skipped audit (no eligible rows) is
remembered in `audit/latest.json` and waits a full period; an audit that errored writes nothing and retries next run.
Rows whose per-unit price is more than 10× off their category+unit median keep their item price but lose the per-unit price
and carry the flag `unit_price_suspect`; the `unit_outliers` gate reports the raw share (measure-only until parsing improves).

### Schedule
The schedule fires, though GitHub delays and drops scheduled runs, so they come hours apart rather than every 30 minutes
(2026-10-14: five hours between scheduled runs, and nothing for 3.5 h after a failed run, which does not chain). A
scheduled run that arrives while a crawl is running waits in the `pipeline` concurrency group and is cancelled when the crawl's
chained run takes its place (cancelled runs with 0 jobs in the Actions tab): by design.

**Watchdog.** The pipeline Worker (`pipeline/src/index.js`, cron `*/20 * * * *` in `pipeline/wrangler.toml`) is the second
trigger: every 20 minutes it lists the newest pipeline runs through the GitHub API and, when none is queued or running and
the newest started more than `WATCHDOG_GAP_MIN` (40) minutes ago, dispatches `plan=continue`. A run with nothing due stops
after its peek, so an unneeded kick costs seconds. It needs the Worker secret `GH_DISPATCH_TOKEN` (above). The peek of every
pipeline run measures the idle gaps between runs over the last 24 h and opens `[schedule-gap]` when one exceeds 3 h
(`ci.SCHEDULE_GAP_HOURS`); the issue closes itself once runs arrive close together. If the watchdog is not set up, start
`plan=continue` from the Actions tab when a run ends with nothing chained.

### Store prices (Strongsville, store #2266)
`data/store.json` names the store. A row the store does not carry (about 60% of consumable rows) is asked again after
`not_carried_every_days` (90), not the tier's 28 or 56 days, so each pass is less than half the size and carried rows get
their shelf price refreshed sooner. After a publish, when no crawl, build, audit or identify is due, `decide()` runs the
`store` job: `crawler/storeprice.py refresh` asks Walmart for the store's own price and stock of every barcode row of the
snapshot, 20 per call, consumable departments first and the oldest check first, within the crawl budget, and chains the
next run while rows remain (`store_prices/2266.jsonl.gz`, `store_prices/latest.json`). The next build shows the store
price of every row checked within `max_age_days` (21), keeps Walmart.com's in `online_price`, and flags it `store_price`;
the app labels it "Strongsville Walmart shelf price". The live_match gate and the weekly audit compare store-priced rows
with the store's live price. Manual: Actions → pipeline → plan `store`. At about 8 calls a minute a pass over a million
rows takes several days of pipeline time; consumable departments come first so food and household items are covered
soonest. `store-price-probe.yml` (manual, read-only) re-checks which store id the API returns near a ZIP code.
Chunks Walmart cannot serve: an HTTP 400 "Results not found" or a 502 on every attempt (certain ids make the store lookup
fail server-side; runs 58-61 died on the same 20 ids) splits the chunk in halves down to single ids, with one retry per
call during the split. A single id refused with 400 is recorded as gone; one that still fails with a server error is
recorded with `e` (the status) and asked again after 7 days (`ERROR_RETRY_DAYS`) so it is neither shown as a store price
nor first in line every run. Two whole chunks in a row failing on server errors is an outage: the pass stops with
`Unavailable`, what it priced is saved, the run ends normally and the schedule retries later; it does not open an issue.

### Search gold set
`data/gold-search.json` holds 330 queries as volunteers type them, each with the words the right item must contain (and a
size when the query states one). deploy-app runs `app/tools/gold.mjs` on every real pack (not the fixture): the summary
lists every miss with the top 3 found; below 95% opens `[search-gold]`, below 90% the step fails and the live site keeps
the previous build. Locally: `node --max-old-space-size=6144 app/tools/gold.mjs --db app/dist/db`. When a volunteer
reports a wrong result, add it as a query first, then fix the ranking (app/public/js/db-worker.js) until it passes.

### Crawl scope edits, split departments, early ends
An edit of `data/categories.json` applies to the crawl in progress (`crawl.sync`, printed as `scope:` lines in the run log):
a department removed from `departments` is `dropped`; one given a `split` (a list of Walmart child node ids) is re-crawled
as those nodes, each with its own cursor, under `raw/<run>/<dept>/<node>/`; other finished departments are untouched.
Sizing covers each node and records the department as their sum. Walmart has ended department listings early (Home stopped
at page 1,830 of 31,781): an end with many hits left is retried from the next cursor, and a crawl that still ends short of
(1 − `dept_size_tolerance`) of Walmart's page count is `truncated`; a category id Walmart refuses is `failed`. Both open
`[crawl-truncated]` and hold the snapshot at the departments_complete gate; fix the scope in `data/categories.json`.

### Other automation
- `keepalive.yml` (weekly): re-enables the scheduled workflows through the API and touches `.github/keepalive` when main has
  had no commit for 45 days, so GitHub never disables the schedules after 60 quiet days.
- `tests.yml`: Python and app unit tests on every pull request and push to main; failures on main open `[tests-failed]`.
- Price history: `data-store:history/` (`baseline-<run>.jsonl.gz`, `changes-<run>.jsonl.gz`, `index.json`); see docs/HISTORY.md.
- Weekly audit results: `data-store:audit/<date>.json` and `audit/latest.json`.
- Department sizes: `data-store:sizing.json`.
- Merge rule while a crawl runs: `tests/fixtures/run-live.json` (the live state) must resume through `decide()` and `continue`
  in the suite, and the scratch dry run must replay a copy of the real data-store through the new code without an exception.

Run manually: Actions tab → pipeline → Run workflow → plan (continue | core | full | approve | identify | audit | size | status | rollback | store).
Working data: branch `data-store` (state/, raw/, build/, identify/, history/, audit/, sizing.json). Report for the latest build:
`data-store:build/candidate/report.md`. Published snapshot: `data-store:build/published/`.

## Google Play (optional: the same app as an Android listing)
The PWA installs from Chrome on Android today (the Install hint on the home screen). A Google Play listing wraps the same
site in a Trusted Web Activity (TWA): an Android app that opens the site full screen, no browser bar, updating with every
deploy. Owner actions, all from a phone or a browser:
1. A Google Play developer account (one-time fee, identity check) and a package name, e.g. `org.strongsvillefoodbank.sfbvalue`.
2. Package the app with PWABuilder (pwabuilder.com → the app's URL → Android → "Generate"): it reads the manifest (name, icons,
   `orientation: any`, colours) and produces the signed .aab plus the signing key's SHA-256 fingerprint and an
   `assetlinks.json`. Keep the signing key in the password manager.
3. Set the repository variable `ANDROID_ASSET_LINKS` to that `assetlinks.json` content (a JSON array naming the package and
   fingerprint). The next deploy writes it to `APP_URL/.well-known/assetlinks.json`; without it the TWA shows a browser bar.
   When Play's own signing replaces the upload key, add Play Console's fingerprint to the same array.
4. Upload the .aab in Play Console. Listing needs: the privacy policy URL `APP_URL/privacy.html` (the app stores everything
   on the phone; only the barcode leaves it, for the live check and the shared matches), the camera permission declared as
   "barcode scanning", icons (`app/public/icons/`) and screenshots (`docs/screens/`). Data safety: no personal data collected.
5. Volunteers who installed from Chrome keep working; the Play app and the browser install share nothing (separate storage),
   so a phone should use one or the other.
The app's own address must be final first (moving the site to the food bank's domain invalidates the asset links and the
offline data alike; READINESS step 24).

## App (Cloudflare Workers static assets, deployed by GitHub Actions)
Code: `app/`. Workflow: `.github/workflows/deploy-app.yml` (runs on app changes, after every pipeline run, or manually).
Every build carries a build key in `$APP_URL/build.json` (a hash of the app code, the repo's build inputs, the published
snapshot and the equivalents table). After a pipeline run it deploys only when that key differs from the live one, and every
deploy is verified by polling `build.json` and `db/current.json` for the new build; mismatches open `[deploy-mismatch]`,
failures `[deploy-failed]`. Deploys queue rather than cancel each other. The pack version is `<snapshot>-<hash>`, so an
equivalents refresh or a builder change reaches phones as a new version.
Optional repository variable: APP_URL — the app's address (default `https://sfb-value.forgetraining.workers.dev`); change it
when the Worker moves to the food bank's account and custom domain.
Required repository secrets (Settings → Secrets and variables → Actions):
- CLOUDFLARE_API_TOKEN — API token with "Workers Scripts: Edit" (Cloudflare dashboard → My Profile → API Tokens → Edit Cloudflare Workers template)
- CLOUDFLARE_ACCOUNT_ID — Workers & Pages → Overview → Account ID
Optional repository variable: LIVE_CHECK_URL — the pipeline Worker URL (e.g. `https://sfb-valuation.<account>.workers.dev`).
Without it the app hides the live check and says "Not configured" in Settings.

Data source: the published snapshot on `data-store` (`build/published/items.jsonl.gz` + `identify/equivalents.jsonl.gz`).
If none is published yet the workflow builds the synthetic 760k fixture and the app shows "sample data".
Manual run: Actions → deploy-app → Run workflow → data = auto | fixture | snapshot, deploy = true/false.

After the first deploy the app is at `https://sfb-value.<account>.workers.dev` (rename or add a custom domain in the
Cloudflare dashboard). Volunteers open it once online and "Add to Home Screen"; everything then works offline.
The app checks `db/current.json` on each launch and downloads a new snapshot in the background. It shows the price date,
turns the banner amber after 40 days without new prices and red after 60 (the list is rebuilt monthly), with an "Update now" button; it asks the browser for
persistent storage on every platform. There is no Web Push (iOS cannot refresh data in the background from a push).

Local: `cd app && npm run fixture && npm run build && npm run serve` → http://127.0.0.1:8787/.
Tests: `npm test`. Performance numbers: `npm run measure` (Playwright, 4× CPU throttle; add `--video build/barcode.y4m`
for a fake camera, made by `node tools/make-barcode-clip.mjs`). Screenshots: `npm run shots`. Both take `--browser webkit`
(iPhone's engine). From the phone: Actions → app-browsers → Run workflow compares Chromium and WebKit on the 760k fixture
(summary table plus screenshot artifacts; nothing is deployed).

### Rate limit bindings for the live check
`pipeline/wrangler.toml` declares two `[[ratelimits]]` bindings (PRICE_LIMITER per IP, PRICE_GLOBAL_LIMITER for
the whole key). On the first deploy after this change Cloudflare creates them automatically; nothing to configure
in the dashboard. `namespace_id` only has to be unique within the account. `/health` reports whether both are bound;
without them the public route answers 503 instead of spending the Walmart key without a cap.

### Refresh cadence (since 2026-10-14; fixed at 30 days since 2026-10-19)

**Since 2026-10-19 `refresh.fixed_days` (30) in data/schedule.json puts every department on one 30-day interval**: the
planner below writes that interval for every department, always "fits", and `[accuracy-budget]` cannot open; the weekly
audit still measures drift (`audit_match_min` is null, so it only measures). Set `fixed_days` to 0 to return to the measured
intervals. With everything due together, each refresh is a full crawl (about four days at 8 calls a minute), followed by the
gates, the publish and deploy-app; phones pick the new price list up on their next launch online, when they come online,
or when the app is brought back to the foreground (every four hours at most).

Each department is re-crawled on its own interval, `state/cadence.json`, written by the weekly audit from the drift it
measured (`audit/drift.json`: per department, the share of prices still within tolerance and the age of the rows). The
planner (crawler/cadence.py) keeps every department's cycle-average accuracy at `refresh.target_close_rate` with the
fewest calls that fit `refresh.crawl_share` of the daily Walmart quota; until a department has `prior_weight` row-days of
evidence it is never crawled more often than the legacy cadence (consumable 7 days, durable 30); intervals run from
`refresh.min_days` (5) to `refresh.max_days` (120, raised from 60 on 2026-10-14 so a department measured as static is
crawled four times a year, not six). The run summary of
every audit prints the plan; `[accuracy-budget]` opens when the target does not fit the quota. `plan=core` and
`plan=full` from the Actions tab still crawl by hand. `volunteer_hours` in data/schedule.json (time zone, days, from, to,
per_min) caps the pipeline's pace while volunteers may be using the app's live check, which shares the Walmart key:
set the food bank's real hours there.

Store prices (data/store.json `tiers`): only the listed departments are priced, on their tier's cycle, and only Walmart's
own in-stock offer counts; `store_prices/latest.json` `by_dept` shows how often the store price differed from
Walmart.com's in the last pass.

### Rollback (last three published snapshots)
Every publish uploads `build/published/*` (shards as they are) to a GitHub Release tagged `snapshot-<version>` (not marked
latest) and deletes all but the newest three (`crawler/releases.py`). To put an earlier one back from a phone: Actions →
pipeline → Run workflow → plan `rollback`, `rollback_to` = `previous` (the newest kept snapshot that is not live; run it
again to go forward) or a version from the repo's Releases page. The run downloads it, checks the manifest and that every
item reads back, replaces `data-store:build/published/` (manifest gains `rolled_back` {from, to, at}) and pushes; deploy-app
then ships it, and phones treat any live version other than their own as an update (older or newer), so it arrives through
the normal "Update now" banner. The crawl state and any candidate are untouched. After a rollback, new crawls (start-core /
start-full) wait `core_every_days` so the restored prices stay live while the cause is fixed; a crawl already running
continues, and its publish would replace the rollback, so fix the cause (rules, thresholds) first or run plan=core/full when
ready. A refused rollback (unknown version, incomplete download) changes nothing.

### Data-store size (GitHub limits)
GitHub rejects any pushed file over 100 MB and warns over 50 MB. `store.write_jsonl_gz` writes any `.jsonl.gz` whose
compressed size passes 45 MB as shards `<name>.s000`, `<name>.s001`, ... (each a complete gzip stream; concatenated they
are one valid stream), and every reader (`store.iter_jsonl_gz`, `app/tools/build-db.mjs`) accepts either form. The first
real snapshot (773k items) is already 57 MB, so it is sharded from the first publish. `store.checkpoint` refuses to commit
or push when any file passes 95 MB and names it. Every pipeline run prints the branch size by top-level folder in its
summary and opens `[data-store-size]` past 1 GB.

