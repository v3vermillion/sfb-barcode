// scroll-check.mjs — the scrolling rules of the real app, checked in a browser: the results open (and every refined
// search reopens) at the best match by the search box; a wheel scrolls them from the header, the dock and the margins of
// a wide screen; they can be scrolled all the way up, also when iOS pans the page for the keyboard; the page behind an
// open sheet never scrolls; removing a tally line keeps the place; Home comes back at the top.
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

async function open(width, height, { touch = false, tour = "0" } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, ...(touch ? { hasTouch: true, isMobile: true } : {}) });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => check("no page errors", false, e.message));
  const u = new URL(URL_.href); u.searchParams.set("tour", tour);
  await page.goto(u.href, { waitUntil: "domcontentloaded" });
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
    await search(page, "peanut butter");   // enough rows to scroll on any fixture size (the refined search may fit one screen)
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
    check("Home comes back at the top", home.y === 0, JSON.stringify(home));
    await page.click("#tallyCard"); await page.waitForSelector("#tallySheet[open]"); await settle(page, 700);   // home shows the tally card (the header pill is for results)
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
  // ---------------------------------------------------------------- touch phone: the root never bounces; the walkthrough replays
  {
    const { ctx, page } = await open(390, 844, { touch: true, tour: "1" });
    // the page itself never rubber-bands: on iOS a bounce of the root drags the fixed header and search bar with it.
    // Only the root element's value reaches the viewport (body's does not propagate).
    const ob = await page.evaluate(() => getComputedStyle(document.documentElement).overscrollBehaviorY);
    check("the page never bounces (root overscroll-behavior)", ob === "none", ob);
    await page.waitForSelector("#tour:not([hidden])"); await settle(page, 400);
    await page.tap("#tourCard [data-tour=skip]"); await page.waitForSelector("#tour[hidden]", { state: "attached" }); await settle(page, 400);
    const replay = async (label) => {
      await page.tap("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 700);
      await page.locator("#settings [data-act=tour]").scrollIntoViewIfNeeded(); await settle(page, 200);
      await page.tap("#settings [data-act=tour]"); await settle(page, 1500);
      const st = await page.evaluate(() => ({ tour: !document.getElementById("tour").hidden, settings: document.getElementById("settings").open, step: document.getElementById("tourStep")?.textContent, history: history.state }));
      check(`Settings › Replay the walkthrough opens it (${label})`, st.tour && !st.settings && /Step 1/.test(st.step || ""), JSON.stringify(st));
      if (st.tour) { await page.tap("#tourCard [data-tour=skip]"); await settle(page, 600); }
      check(`the replayed walkthrough closes (${label})`, await page.evaluate(() => document.getElementById("tour").hidden));
    };
    // a sheet closes by a drag on its header (the title, not only the handle); a short drag springs back
    const drag = async (dy, ms) => {
      const t = await page.locator("#settings .sheet-title").boundingBox();
      await page.mouse.move(t.x + 10, t.y + 8); await page.mouse.down();
      for (let i = 1; i <= 12; i++) { await page.mouse.move(t.x + 10, t.y + 8 + (dy * i) / 12); await page.waitForTimeout(ms); }
      await page.mouse.up(); await settle(page, 700);
      return page.evaluate(() => ({ open: document.getElementById("settings").open, translate: document.getElementById("settings").style.translate }));
    };
    await page.tap("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 700);
    const short = await drag(40, 40);
    check("a short drag on the Settings header springs back", short.open && !short.translate, JSON.stringify(short));
    const long = await drag(260, 20);
    check("a drag on the Settings header closes it", !long.open && !long.translate, JSON.stringify(long));
    await replay("home, after the first-launch walkthrough");
    await replay("home, a second time");
    await search(page, "peanut butter");
    await replay("over search results");
    await ctx.close();
  }
} catch (err) {
  check("run", false, err?.stack || String(err));
} finally {
  await browser.close();
}
console.log(failed ? `scroll-check: ${failed} failed (${BROWSER})` : `scroll-check: all passed (${BROWSER})`);
process.exit(failed ? 1 : 0);
