# Security

**Reporting.** If you find a vulnerability, open a GitHub issue titled "security" without the details, or email the repository
owner through their GitHub profile; you will get a reply with a private channel. Please do not post exploit details publicly
before a fix is out.

**What is public.** This repository holds code, rules and documentation only. Credentials live in GitHub Actions secrets,
Cloudflare Worker secrets and the owner's password manager, never in the repository; `.env.example` lists names, not values.
The `data-store` branch holds crawled product listings and prices from a public retail API, nothing personal.

**What the app stores.** The app keeps the price database, the volunteer's running tally and recent lookups on the phone
only. It sends nothing anywhere except, when online and enabled, a barcode to the live price check, which forwards it to
Walmart and keeps no record beyond a six-hour cache of the answer.
