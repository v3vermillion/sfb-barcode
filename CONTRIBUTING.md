# Contributing

Thank you for helping a food bank value its donations well.

- **Decisions live in [docs/DECISIONS.md](docs/DECISIONS.md)**, dated, and that file wins on conflict. A change that alters
  what the app shows, what is crawled or how a snapshot is judged gets an entry there in the same pull request.
- **Scope and rules are data**: `data/categories.json` (departments, categories), `data/sentinels.json` (items every
  snapshot must contain), `data/gates.json` (acceptance thresholds), `data/schedule.json` (cadence). Editing them is a
  pull request like any other; the pipeline re-evaluates a held snapshot when they change.
- **Tests must pass**: `python -m unittest discover tests` and `cd app && npm test`. A change to the crawler must resume
  the live crawl fixture (`tests/fixtures/run-live.json`); a change to the category rules is measured against the
  hand-labelled gold set.
- **Never commit a secret.** Keys live outside the repository; see [SECURITY.md](SECURITY.md).
- **Pull requests** are small and say what changes for a volunteer or for the pipeline, not only what changes in the code.
  Operational pull requests are opened by the automation itself and reviewed by the repository owner.
