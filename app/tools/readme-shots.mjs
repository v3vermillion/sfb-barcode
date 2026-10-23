// readme-shots.mjs — the README's four screens (home with Recent, results, the item sheet, the tally), dark, at iPhone
// 15/16 size, taken from the live site with its real price list (the synthetic fixture has made-up items).
//   node tools/readme-shots.mjs [out-dir, default ../docs/screens] [--url https://sfb-value.forgetraining.workers.dev/]
// CHROMIUM_EXECUTABLE points at a preinstalled Chromium; HTTPS_PROXY, when set, is used for the page's requests.
import { chromium } from "playwright";
import fs from "node:fs";
const argv = process.argv.slice(2);
const urlAt = argv.indexOf("--url");
const URL_ = urlAt >= 0 ? argv[urlAt + 1] : "https://sfb-value.forgetraining.workers.dev/";
const OUT = argv.find((a, i) => !a.startsWith("--") && argv[i - 1] !== "--url") || "../docs/screens";
fs.mkdirSync(OUT, { recursive: true });
const proxy = process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {};
const exe = process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {};
const b = await chromium.launch({ args: ["--no-sandbox"], ...exe, ...proxy });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: "dark" });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("pageerror", e.message));
const t0 = Date.now();
const u = new URL(URL_); u.searchParams.set("tour", "0");
await page.goto(u.href, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForSelector("html[data-ready='1']", { timeout: 600000 });
console.log("ready in", Math.round((Date.now() - t0) / 1000), "s", await page.evaluate(() => document.getElementById("statusText")?.textContent));
// the other departments open behind the core ones: wait for the progress bar to finish
await page.waitForFunction(() => { const p = document.getElementById("progress"); return !p || p.hidden || getComputedStyle(p).display === "none"; }, null, { timeout: 300000 }).catch(() => console.log("progress still up"));
await page.waitForTimeout(1500);
const quiet = () => page.waitForFunction(() => !document.querySelector("#toasts .toast, .toasts-dlg .toast"), null, { timeout: 15000 }).catch(() => {});
const shot = async (n) => { await page.screenshot({ path: `${OUT}/dark-390x844-${n}.png` }); console.log("shot", n); };
await page.fill("#q", "dawn dish soap"); await page.waitForSelector("#results:not([hidden]) .row"); await page.waitForTimeout(900);
await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(500);
await shot("2-results");
await page.locator("#list .row").first().click(); await page.waitForSelector("#sheet[open]"); await page.waitForTimeout(2500);   // the live check answers
await shot("3-sheet");
await page.click("#sheet [data-act=add]"); await page.waitForTimeout(500);
for (const q of ["great value whole kernel corn", "cheerios"]) {
  await page.fill("#q", q); await page.waitForSelector("#results:not([hidden]) .row"); await page.waitForTimeout(600);
  await page.locator("#list .row").first().click(); await page.waitForSelector("#sheet[open]"); await page.waitForTimeout(700);
  await page.click("#sheet [data-act=add]"); await page.waitForTimeout(500);
}
await page.fill("#q", ""); await page.evaluate(() => document.activeElement.blur()); await quiet(); await page.waitForTimeout(600);
await shot("10-home-recent");
await page.click("#tallyCard"); await page.waitForSelector("#tallySheet[open]"); await page.waitForTimeout(900);
await shot("8-tally");
await b.close();
