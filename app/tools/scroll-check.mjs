// scroll-check.mjs — the scrolling rules of the real app, checked in a browser: the results open (and every refined
// search reopens) at the best match by the search box; a wheel scrolls them from the header, the dock and the margins of
// a wide screen; they can be scrolled all the way up, also when iOS pans the page for the keyboard; the page behind an
// open sheet never scrolls; removing a tally line keeps the place; Home comes back at its thumb end.
// Exit code 1 when any check fails. --browser webkit runs the same checks in iPhone's engine.
//   node tools/scroll-check.mjs [--browser chromium|webkit] [--url http://127.0.0.1:8787/]
import { chromium, webkit } from "playwright";

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true] : [])).filter((x) => x.length));
const BROWSER = String(args.browser || "chromium").toLowerCase();
if (BROWSER !== "chromium" && BROWSER !== "webkit") { console.error(`scroll-check: --browser must be chromium or webkit (got ${args.browser})`); process.exit(2); }
const URL_ = new URL(args.url || "http://127.0.0.1:8787/");
URL_.searchParams.set("nosw", "1");
const exe = process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {};
const browser = BROWSER === "chromium" ? await chromium.launch({ args: ["--no-sandbox"], ...exe }) : await webkit.launch();

let failed = 0;
const check = (name, ok, detail = "") => { console.log(`${ok ? "ok  " : "FAIL"} ${BROWSER} ${name}${detail ? ` — ${detail}` : ""}`); if (!ok) failed++; };
const settle = (page, ms = 250) => page.waitForTimeout(ms);

async function open(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => check("no page errors", false, e.message));
  await page.goto(URL_.href, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("html[data-ready='1']", { timeout: 180000 });
  return { ctx, page };
}
const scrollTop = (page) => page.evaluate(() => document.getElementById("results").scrollTop);
/** Is the best row (first in the DOM, drawn right above the dock) fully on screen between the header and the dock? */
const bestVisible = (page) => page.evaluate(() => {
  const row = document.querySelector("#list .row"), meta = document.getElementById("resultsMeta"), top = document.getElementById("top");
  if (!row) return false;
  const r = row.getBoundingClientRect();
  return r.top >= top.getBoundingClientRect().bottom - 1 && r.bottom <= meta.getBoundingClientRect().top + 1;
});
/** Is the top-most row (last in the DOM) fully below the header? */
const topRowVisible = (page) => page.evaluate(() => {
  const rows = document.querySelectorAll("#list .row"), top = document.getElementById("top").getBoundingClientRect();
  const r = rows[rows.length - 1].getBoundingClientRect();
  return r.top >= top.bottom - 1 && r.bottom <= innerHeight;
});
async function search(page, q) { await page.fill("#q", q); await page.waitForFunction((q) => window.__sfb.state.shownQuery === q, q); await settle(page, 600); }

try {
  // ---------------------------------------------------------------- phone
  {
    const { ctx, page } = await open(390, 844);
    await search(page, "peanut butter");
    check("results open at the best match", (await scrollTop(page)) === 0 && (await bestVisible(page)));
    await page.mouse.move(195, 400);
    await page.mouse.wheel(0, -300); await settle(page);
    const up = await scrollTop(page);
    check("wheel up scrolls the results", up < -200, `scrollTop ${up}`);
    for (let i = 0; i < 30; i++) await page.mouse.wheel(0, -500);
    await settle(page, 400);
    check("the results scroll all the way up", await topRowVisible(page));
    await page.evaluate(() => window.__sfb.runSearch(window.__sfb.state.query)); await settle(page, 600);
    check("the same search re-run keeps the place", (await scrollTop(page)) < -200);
    await search(page, "peanut butter creamy");
    check("a refined search reopens at its best match", (await scrollTop(page)) === 0 && (await bestVisible(page)));
    for (const [where, y] of [["header", 20], ["dock", 815]]) {
      await page.evaluate(() => { document.getElementById("results").scrollTop = 0; });
      await page.mouse.move(195, y); await page.mouse.wheel(0, -200); await settle(page);
      check(`wheel over the ${where} scrolls the results`, (await scrollTop(page)) < 0);
    }
    // iOS opens the keyboard by panning the page up; the visible area is what the fixed layout must follow
    await page.evaluate(() => document.documentElement.style.setProperty("--vv-top", "300px"));
    const pan = await page.evaluate(() => ({ header: document.getElementById("top").getBoundingClientRect().top, results: document.getElementById("results").getBoundingClientRect().top }));
    check("with the page panned for the keyboard, the header and the top of the results stay in view", pan.header === 300 && pan.results > 300, JSON.stringify(pan));
    await page.evaluate(() => document.documentElement.style.setProperty("--vv-top", "0px"));
    await ctx.close();
  }
  // ---------------------------------------------------------------- wide screen
  {
    const { ctx, page } = await open(1280, 800);
    await search(page, "peanut butter");
    await page.mouse.move(60, 400); await page.mouse.wheel(0, -300); await settle(page);
    check("wide screen: wheel over the margin scrolls the results", (await scrollTop(page)) < 0);
    await page.evaluate(() => { document.getElementById("results").scrollTop = 0; });
    await page.focus("#q"); await page.keyboard.press("PageUp"); await settle(page);
    check("Page Up in the search box scrolls the results", (await scrollTop(page)) < 0);
    await page.evaluate(() => { document.getElementById("results").scrollTop = 0; });
    await page.locator("#list .row").first().click(); await page.waitForSelector("#sheet[open]"); await settle(page, 700);
    const box = await page.locator("#sheet").boundingBox(), g = await page.locator("#sheet .grab").boundingBox();
    await page.mouse.move(g.x + g.width / 2, g.y + 5); await page.mouse.down(); await page.mouse.move(g.x + g.width / 2, g.y + 45);
    const during = await page.locator("#sheet").boundingBox(); await page.mouse.up(); await settle(page, 300);
    check("wide screen: dragging the sheet's handle keeps it centred", Math.abs(during.x - box.x) < 1, `${box.x} -> ${during.x}`);
    await ctx.close();
  }
  // ---------------------------------------------------------------- small phone: home, tally, page behind sheets
  {
    const { ctx, page } = await open(360, 640);
    for (const q of ["peanut butter", "canned corn", "toothpaste", "rice", "beans", "cereal", "soup", "pasta", "tuna", "coffee", "milk", "flour"]) {
      await search(page, q);
      await page.locator("#list .row").first().click(); await page.waitForSelector("#sheet[open]"); await settle(page, 300);
      await page.click("#sheet [data-act=add]"); await page.waitForSelector("#sheet:not([open])", { state: "attached" }); await settle(page, 300);
    }
    const home = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight }));
    check("Home comes back at its thumb end", home.max <= 0 || Math.abs(home.y - home.max) <= 1, JSON.stringify(home));
    await page.click("#tallyBtn"); await page.waitForSelector("#tallySheet[open]"); await settle(page, 700);
    await page.mouse.move(180, 500); await page.mouse.wheel(0, 300); await settle(page, 300);
    const before = await page.evaluate(() => document.querySelector("#tallySheet .sheet-inner").scrollTop);
    await page.locator("#tallySheet [data-remove]").nth(6).click(); await settle(page, 300);
    const after = await page.evaluate(() => document.querySelector("#tallySheet .sheet-inner").scrollTop);
    check("removing a tally line keeps the place", before > 0 && Math.abs(after - before) <= 2, `${before} -> ${after}`);
    const y0 = await page.evaluate(() => scrollY);
    await page.mouse.move(180, 15); await page.mouse.wheel(0, -400); await settle(page, 300);
    check("the page behind an open sheet doesn't scroll", (await page.evaluate(() => scrollY)) === y0);
    await ctx.close();
  }
} catch (err) {
  check("run", false, err?.stack || String(err));
} finally {
  await browser.close();
}
console.log(failed ? `scroll-check: ${failed} failed (${BROWSER})` : `scroll-check: all passed (${BROWSER})`);
process.exit(failed ? 1 : 0);
