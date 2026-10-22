// ui-check.mjs — the layout, status and walkthrough rules of the real app, checked in a browser. Every check carries the
// id of the defect it guards (docs/UI-AUDIT.md lists them), so a regression names what broke. It runs the built site
// (dist/ with a fixture or real pack) at phone, tablet and landscape sizes with emulated safe areas, and drives the
// price states (downloading, offline, server error, stale, unsupported browser) by routing and by the page clock.
// Exit code 1 when any check fails.
//   node tools/ui-check.mjs [--url http://127.0.0.1:8787/] [--only F15,F24] [--json build/ui-check.json]
// CHROMIUM_EXECUTABLE points at a preinstalled Chromium when Playwright's own browser is not downloaded.
import { chromium, devices } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true] : [])).filter((x) => x.length));
const BASE = new URL(args.url || "http://127.0.0.1:8787/");
const ONLY = args.only ? new Set(String(args.only).split(",").map((s) => s.trim())) : null;
const exe = process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {};
const browser = await chromium.launch({ args: ["--no-sandbox"], ...exe });
const IPHONE_UA = devices["iPhone 14"]?.userAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const ANDROID_UA = devices["Pixel 7"]?.userAgent || "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

const results = [];
const check = (id, name, ok, detail = "") => {
  results.push({ id, name, ok: !!ok, detail });
  console.log(`${ok ? "ok  " : "FAIL"} ${id} ${name}${detail ? ` — ${detail}` : ""}`);
};
const want = (...ids) => !ONLY || ids.some((id) => ONLY.has(id));
const settle = (page, ms = 300) => page.waitForTimeout(ms);
const PORTRAIT_SAFE = { top: 47, bottom: 34, left: 0, right: 0 };
const LANDSCAPE_SAFE = { top: 0, bottom: 21, left: 47, right: 47 };
const DAY = 86_400_000;

/** A fresh context and page (empty storage, so the pack downloads), with optional safe areas, screen size, clock and routes. */
async function open({ w = 390, h = 844, safe = undefined, scheme = "light", query = "tour=0", init = null, routes = null, wait = true, clock = null, ios = false, android = false, screen = null, offline = false } = {}) {
  const phone = Math.min(w, h) < 600;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: phone, hasTouch: true, colorScheme: scheme, ...(ios ? { userAgent: IPHONE_UA } : android ? { userAgent: ANDROID_UA } : {}) });
  await ctx.addInitScript(() => addEventListener("unhandledrejection", (e) => console.error(`Unhandled promise rejection: ${e.reason?.message || e.reason}`)));
  if (init) await ctx.addInitScript(init.fn, init.arg);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|ERR_|net::/.test(m.text())) errors.push(m.text()); });
  const insets = safe === undefined ? (phone ? (w > h ? LANDSCAPE_SAFE : PORTRAIT_SAFE) : null) : safe;
  const cdp = await ctx.newCDPSession(page);
  if (insets) await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets });
  if (screen) await cdp.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true, screenWidth: screen.w, screenHeight: screen.h });
  if (clock) await page.clock.install({ time: clock });
  if (routes) for (const [pattern, handler] of routes) await page.route(pattern, handler);
  if (offline) await ctx.setOffline(true);
  const u = new URL(BASE.href); u.search = `nosw=1&${query}`;
  await page.goto(u.href, { waitUntil: "domcontentloaded" });
  if (wait) await page.waitForSelector("html[data-ready='1']", { timeout: 60000 });
  await settle(page);
  return { ctx, page, errors, cdp };
}
/** Run one scenario; a scenario that throws is a failed check of its own, and the context always closes. */
async function scenario(ids, name, fn) {
  if (!want(...ids)) return;
  let env = null;
  try { await fn((e) => (env = e)); }
  catch (err) { check(ids[0], `${name} (scenario)`, false, String(err?.message || err).split("\n")[0]); }
  finally {
    if (env?.errors?.length) check("E0", `${name}: no page errors`, false, env.errors.slice(0, 3).join(" | "));
    await env?.ctx?.close().catch(() => {});
  }
}
const rect = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; }, sel);
const vp = (page) => page.evaluate(() => ({ w: innerWidth, h: innerHeight }));
const fmt = (r) => (r ? `${Math.round(r.l)},${Math.round(r.t)}–${Math.round(r.r)},${Math.round(r.b)}` : "none");
const inside = (r, v, m = 0) => r && r.l >= -0.5 + m && r.t >= -0.5 && r.r <= v.w + 0.5 - m && r.b <= v.h + 0.5;
const overlap = (a, b) => a && b && a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
const tourNext = (page) => page.evaluate(() => document.querySelector("#tourCard [data-tour=next]").click());
const tourOpen = (page) => page.evaluate(() => !document.getElementById("tour").hidden);
/** True when the element sits in an inert subtree (or is inert itself). */
const isInert = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; for (let n = e; n; n = n.parentElement) if (n.inert) return true; return false; }, sel);
const visibleText = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e && e.getClientRects().length ? e.innerText.replace(/\s+/g, " ").trim() : ""; }, sel);

// ---------------------------------------------------------------- walkthrough geometry at every size and orientation
const TOUR_SIZES = [[390, 844], [375, 667], [320, 568], [360, 780], [430, 932], [768, 1024], [1280, 800], [844, 390], [740, 360], [667, 375], [568, 320]];
for (const [w, h] of TOUR_SIZES) {
  await scenario(["F15", "F3"], `walkthrough ${w}x${h}`, async (set) => {
    const env = set(await open({ w, h, query: "tour=1" }));
    const { page } = env;
    await page.waitForSelector("#tour:not([hidden])");
    const v = await vp(page);
    for (let step = 1; step <= 4; step++) {
      await settle(page, 350);
      const card = await rect(page, "#tourCard"), next = await rect(page, "#tourCard [data-tour=next]"), spot = await rect(page, "#tourSpot");
      check("F15", `${w}x${h} step ${step}: card and Next on screen`, inside(card, v) && inside(next, v), `card ${fmt(card)} next ${fmt(next)} vp ${v.w}x${v.h}`);
      if (spot) {
        check("F3", `${w}x${h} step ${step}: spotlight inside the screen`, inside(spot, v), `spot ${fmt(spot)}`);
        check("F15", `${w}x${h} step ${step}: card clear of the spotlight`, !overlap(card, spot), `card ${fmt(card)} spot ${fmt(spot)}`);
      }
      if (step < 4) await tourNext(page);
    }
  });
}

await scenario(["F4", "F5", "F6", "F7", "F20"], "walkthrough card details", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])");
  await settle(page, 350);
  check("F4", "step 1: no keyboard focus ring drawn on Next after an automatic open", !(await page.evaluate(() => document.querySelector("#tourCard [data-tour=next]").matches(":focus-visible"))));
  const s1 = await page.evaluate(() => { const d = document.querySelector(".tour-dots").getBoundingClientRect(); const n = document.querySelector("[data-tour=next]").getBoundingClientRect(); return { dots: d.left, next: n.left }; });
  const align = await page.evaluate(() => {
    const t = document.getElementById("tourTitle").getBoundingClientRect().left;
    const skip = document.querySelector("[data-tour=skip]"); const range = document.createRange(); range.selectNodeContents(skip);
    return { title: t, skipText: range.getBoundingClientRect().left };
  });
  check("F5", "Skip's label lines up with the card text", Math.abs(align.title - align.skipText) <= 1, `title x ${align.title.toFixed(1)} skip text x ${align.skipText.toFixed(1)}`);
  await tourNext(page); await settle(page, 350);
  const s2 = await page.evaluate(() => { const d = document.querySelector(".tour-dots").getBoundingClientRect(); const n = document.querySelector("[data-tour=next]").getBoundingClientRect(); return { dots: d.left, next: n.left }; });
  check("F5", "dots and Next keep their place from step 1 to step 2", Math.abs(s1.dots - s2.dots) <= 0.5 && Math.abs(s1.next - s2.next) <= 0.5, `dots ${s1.dots.toFixed(1)}→${s2.dots.toFixed(1)} next ${s1.next.toFixed(1)}→${s2.next.toFixed(1)}`);
  check("F6", "step 2 illustration uses the real Add to tally button (receipt icon)", await page.evaluate(() => !!document.querySelector('#tourCard .tour-demo use[href="#i-receipt"]')));
  check("F7", "step 2 copy reads cleanly", !/there when there/i.test(await visibleText(page, "#tourText")));
  const focus = await page.evaluate(() => { const a = document.activeElement; return { id: a?.id, labelled: a?.getAttribute("aria-labelledby"), title: document.getElementById("tourTitle")?.textContent }; });
  check("F20", "a new step moves focus to the step itself, so a screen reader reads its title and text", focus.id === "tourCard" && focus.labelled === "tourTitle", JSON.stringify(focus));
});

await scenario(["F16"], "walkthrough replayed over search results", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.fill("#q", "peanut"); await settle(page, 500);
  await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 600);
  await page.click("#settings [data-act=tour]");
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 400);
  for (let s = 1; s <= 4; s++) {
    const spot = await rect(page, "#tourSpot");
    if (s >= 3 || s === 1) check("F16", `replay step ${s}: its subject is on screen and spotlit`, !!spot, `spot ${fmt(spot)}`);
    if (s < 4) { await tourNext(page); await settle(page, 350); }
  }
});

await scenario(["F18"], "Escape after tapping the card text", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 300);
  await page.click("#tourText");
  await page.keyboard.press("Escape"); await settle(page, 400);
  check("F18", "Escape closes the walkthrough wherever the focus is", !(await tourOpen(page)));
});

await scenario(["F19", "F11"], "background while the walkthrough is open", async (set) => {
  const env = set(await open({ query: "tour=1", clock: Date.now() + 60 * DAY }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 300);
  check("F19", "Skip to search link is out of reach", await isInert(page, ".skip"));
  check("F19", "prices banner is out of reach", await isInert(page, "#stale"));
  check("F11", "toasts stay usable above the walkthrough", (await isInert(page, "#toasts")) === false);
});

await scenario(["F47", "F11"], "background while the scanner is open", async (set) => {
  const env = set(await open({ clock: Date.now() + 60 * DAY }));
  const { page } = env;
  await page.click("#scanBtn"); await page.waitForSelector("#scanner:not([hidden])"); await settle(page, 800);
  check("F47", "Skip to search link is out of reach behind the scanner", await isInert(page, ".skip"));
  check("F47", "prices banner is out of reach behind the scanner", await isInert(page, "#stale"));
  check("F11", "toasts stay usable above the scanner", (await isInert(page, "#toasts")) === false);
});

await scenario(["F21"], "focus after the first-launch walkthrough", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])");
  for (let i = 0; i < 4; i++) { await tourNext(page); await settle(page, 300); }
  const a = await page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id }));
  check("F21", "focus lands on the page content, not nowhere", a.tag !== "BODY" && a.tag != null, JSON.stringify(a));
  check("F21", "focus does not open the keyboard", a.id !== "q");
});

await scenario(["F23"], "Back then Forward during the walkthrough", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 300);
  await page.goBack(); await settle(page, 400);
  check("F23", "Back closes the walkthrough", !(await tourOpen(page)));
  await page.goForward(); await settle(page, 400);
  const st = await page.evaluate(() => ({ modal: history.state?.modal || null, open: !document.getElementById("tour").hidden }));
  check("F23", "Forward leaves no dead history entry", st.open || st.modal !== "tour", JSON.stringify(st));
});

await scenario(["F12"], "Scan shortcut on a first launch", async (set) => {
  const env = set(await open({ query: "scan=1" }));
  const { page } = env;
  await page.waitForSelector("#scanner:not([hidden])", { timeout: 10000 }); await settle(page, 600);
  check("F12", "the scanner opens without the walkthrough on top", !(await tourOpen(page)));
  await page.click("#scanClose"); await settle(page, 500);
  check("F12", "closing the scanner leaves the screen usable", (await isInert(page, "#main")) === false && !(await tourOpen(page)));
});

await scenario(["F8"], "tapping the spotlit Scan button", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 400);
  const b = await rect(page, "#scanBtn");
  await page.mouse.click(b.l + b.w / 2, b.t + b.h / 2); await settle(page, 700);
  const st = await page.evaluate(() => ({ tour: !document.getElementById("tour").hidden, scanner: !document.getElementById("scanner").hidden }));
  check("F8", "a tap on the spotlit Scan button opens the scanner and ends the walkthrough", !st.tour && st.scanner, JSON.stringify(st));
});

await scenario(["F10"], "spotlight follows its subject", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])");
  await tourNext(page); await tourNext(page); await settle(page, 400);
  const sel = await page.evaluate(() => (document.getElementById("tallyStrip") ? "#tallyStrip" : "#tallyCard"));
  await page.evaluate(() => { const d = document.createElement("div"); d.style.height = "60px"; d.id = "pushdown"; document.getElementById("home").prepend(d); });
  await settle(page, 600);
  const t = await rect(page, sel), s = await rect(page, "#tourSpot");
  check("F10", "the spotlight moves with the element it points at", t && s && Math.abs((s.t + s.b) / 2 - (t.t + t.b) / 2) <= 1, `target ${fmt(t)} spot ${fmt(s)}`);
});

// ---------------------------------------------------------------- geometry: header, banner, dock, toasts, scanner
await scenario(["F24"], "header and what sits under it", async (set) => {
  const env = set(await open({ clock: Date.now() + 60 * DAY }));
  const { page } = env;
  await page.waitForSelector("#stale:not([hidden])");
  const top = await rect(page, "#top"), stale = await rect(page, "#stale");
  check("F24", "the prices banner starts at the header's bottom edge", top && stale && Math.abs(stale.t - top.b) <= 0.5, `header bottom ${top?.b} banner top ${stale?.t}`);
  await page.evaluate(() => { document.getElementById("progress").hidden = false; });
  const prog = await rect(page, "#progress");
  check("F24", "the progress bar sits on the header's bottom edge", prog && Math.abs(prog.t - top.b) <= 0.5, `progress top ${prog?.t}`);
  await page.fill("#q", "peanut"); await settle(page, 500);
  const res = await rect(page, "#results"), s2 = await rect(page, "#stale");
  check("F24", "the results start below the banner", res && s2 && res.t >= s2.b - 0.5, `results top ${res?.t} banner bottom ${s2?.b}`);
});

for (const [w, h] of [[768, 1024], [1280, 800], [844, 390]]) {
  await scenario(["F42"], `toast position ${w}x${h}`, async (set) => {
    const env = set(await open({ w, h }));
    const { page } = env;
    await page.evaluate(() => dispatchEvent(new Event("offline"))); await settle(page, 500);
    // centred on the app's column (the dock's centre; a desktop scrollbar gutter is not page)
    const t = await rect(page, ".toast"), d = await rect(page, "#dock");
    check("F42", `${w}x${h}: toast centred and on screen`, t && d && t.l >= 0 && Math.abs((t.l + t.r) / 2 - (d.l + d.r) / 2) <= 1, `toast ${fmt(t)} column ${fmt(d)}`);
  });
}

await scenario(["F43", "F44"], "scanner in phone landscape", async (set) => {
  const env = set(await open({ w: 844, h: 390 }));
  const { page } = env;
  await page.click("#scanBtn"); await page.waitForSelector("#scanner:not([hidden])"); await settle(page, 1200);
  // a phone with a camera shows the reticle and the "Enter the barcode manually" button (headless has no camera, so the
  // denied state is put back to the camera layout before measuring)
  await page.evaluate(() => { document.querySelector(".scan-denied")?.remove(); document.getElementById("reticle").hidden = false; document.getElementById("scanTypeForm").hidden = true; document.getElementById("scanTypeBtn").hidden = false; document.getElementById("scanHint").textContent = "Center the barcode in the frame"; });
  await settle(page, 200);
  const v = await vp(page);
  const ret = await rect(page, "#reticle"), bottom = await rect(page, ".scan-bottom"), topBar = await rect(page, ".scan-top");
  check("F43", "the reticle fits between the controls in landscape", ret && bottom && topBar && ret.t >= topBar.b - 0.5 && ret.b <= bottom.t + 0.5 && bottom.b <= v.h + 0.5, `reticle ${fmt(ret)} top bar ${fmt(topBar)} bottom ${fmt(bottom)}`);
  const ctl = await page.evaluate(() => [...document.querySelectorAll("#scanner button, #scanner input")].filter((e) => e.getClientRects().length && !e.closest("[hidden]")).map((e) => { const r = e.getBoundingClientRect(); return { id: e.id || e.className, l: r.left, t: r.top, r: r.right, b: r.bottom }; }));
  const off = ctl.filter((r) => !inside(r, v));
  check("F43", "every scanner control is on screen in landscape", ctl.length > 0 && off.length === 0, off.map((r) => `${r.id} ${fmt(r)}`).join("; ") || `${ctl.length} controls`);
  const notch = ctl.filter((r) => r.l < 47 - 0.5 || r.r > v.w - 47 + 0.5);
  check("F44", "no scanner control under the side safe areas", notch.length === 0, notch.map((r) => `${r.id} ${fmt(r)}`).join("; "));
});

await scenario(["F9", "F48"], "dock and results", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  check("F48", "the search bar is not announced as the page footer", await page.evaluate(() => { const d = document.getElementById("dock"); return d.tagName !== "FOOTER" && d.getAttribute("role") !== "contentinfo"; }));
  await page.fill("#q", "peanut"); await settle(page, 500);
  const res = await rect(page, "#results"), dock = await rect(page, "#dock");
  check("F9", "the results end where the dock starts", res && dock && Math.abs(res.b - dock.t) <= 0.5, `results bottom ${res?.b} dock top ${dock?.t}`);
});

const FAKE_VV = {
  fn: () => {
    const fake = new EventTarget(); let h = null, top = 0;
    Object.defineProperties(fake, { height: { get: () => h ?? innerHeight }, width: { get: () => innerWidth }, offsetTop: { get: () => top }, offsetLeft: { get: () => 0 }, pageTop: { get: () => 0 }, scale: { get: () => 1 } });
    window.__setVV = (nh, nt = 0) => { h = nh; top = nt; fake.dispatchEvent(new Event("resize")); };
    Object.defineProperty(window, "visualViewport", { get: () => fake, configurable: true });
  },
};
await scenario(["F45"], "keyboard open on an iPhone", async (set) => {
  const env = set(await open({ init: FAKE_VV }));
  const { page } = env;
  await page.focus("#q"); await settle(page, 100);
  const ih = (await vp(page)).h;
  await page.evaluate((nh) => window.__setVV(nh), ih - 300); await settle(page, 400);
  const d = await page.evaluate(() => { const e = document.getElementById("dock"); const r = e.getBoundingClientRect(); return { pb: getComputedStyle(e).paddingBottom, bottom: r.bottom }; });
  check("F45", "no home-indicator padding above the keyboard", d.pb === "10px", `padding-bottom ${d.pb}`);
  check("F45", "the dock sits on the keyboard", Math.abs(d.bottom - (ih - 300)) <= 1, `dock bottom ${d.bottom} keyboard top ${ih - 300}`);
});

// iOS 26 (WebKit 301108) gives a Home Screen app a viewport one status bar short while the page is shorter than the
// screen, and paints nothing below that edge, so anything placed past it is cut off. Chromium cannot produce the short
// viewport; what is checked here is the remedy's two halves: in standalone mode the page is made as tall as the screen
// (the rule that makes iOS give the full viewport), and nothing fixed is ever laid out past the viewport's edge.
const standaloneRule = (page) => page.evaluate(() => {
  for (const sh of document.styleSheets) for (const r of sh.cssRules) {
    if (r.media && /display-mode:\s*standalone/.test(r.media.mediaText) && /min-height:\s*min\(100lvh,\s*calc\(100% \+ env\(safe-area-inset-top/.test(r.cssText) && /\bhtml\b/.test(r.cssText)) return true;
  }
  return false;
});
await scenario(["F1", "F2", "F13"], "iPhone Home Screen app (standalone)", async (set) => {
  const env = set(await open({ ios: true, init: { fn: () => Object.defineProperty(navigator, "standalone", { get: () => true }) }, query: "tour=1" }));
  const { page, cdp } = env;
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "display-mode", value: "standalone" }] });
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 400);
  check("F1", "standalone: the page is made as tall as the screen, so iOS 26 gives it the full viewport", await standaloneRule(page));
  const v = await vp(page), dock = await rect(page, "#dock"), tour = await rect(page, "#tour");
  check("F1", "the dock ends at the viewport's edge, never past it (iOS draws nothing lower)", dock && Math.abs(dock.b - v.h) <= 0.5, `dock bottom ${dock?.b} viewport ${v.h}`);
  check("F2", "the walkthrough dims exactly the viewport", tour && Math.abs(tour.b - v.h) <= 0.5 && tour.t <= 0.5, `dim ${fmt(tour)} viewport ${v.h}`);
  await page.keyboard.press("Escape"); await settle(page, 300);
  const sc = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  check("F13", "standalone: the home screen does not scroll when its content fits", sc <= 0, `overflow ${sc}px`);
  await page.focus("#q"); await settle(page, 300);
  const d = await rect(page, "#dock");
  check("R8", "standalone: the dock stays on the viewport's edge while the search box has the focus (hardware keyboard)", d && Math.abs(d.b - v.h) <= 0.5, `dock bottom ${d?.b}`);
});

// A page given parts of two builds (the previous page with this stylesheet, say) reloads once, and never loops
await scenario(["U1"], "page and stylesheet from different builds", async (set) => {
  const env = set(await open({ wait: false, init: { fn: () => { try { sessionStorage.setItem("loads", String(+(sessionStorage.getItem("loads") || 0) + 1)); } catch { /* none */ } } }, routes: [["**/app.css", async (route) => { const r = await route.fetch(); route.fulfill({ response: r, body: `${await r.text()}\n:root { --shell-build: "0000000000"; }\n` }); }]] }));
  const { page } = env;
  await page.waitForSelector("html[data-ready='1']", { timeout: 60000 }); await settle(page, 800);
  const { stamped, loads } = await page.evaluate(() => ({ stamped: sessionStorage.getItem("sfb.buildReload"), loads: +sessionStorage.getItem("loads") }));
  check("U1", "the mismatch is noticed and the page reloads once", !!stamped && loads === 2, `page loads ${loads}, noted ${stamped}`);
  check("U1", "a mismatch that persists after the reload does not loop; the app still starts", await page.evaluate(() => document.documentElement.dataset.ready === "1"));
});

// A camera with a light: the flashlight shows while it runs, and never outlives it. Leaving the app releases the camera;
// iOS can refuse the restart on return, and the button then had no camera behind it (owner's iPhone, 2026-10-19).
const FAKE_CAMERA = {
  fn: () => {
    window.__camAllow = true; window.__torch = [];
    navigator.mediaDevices.getUserMedia = async () => {
      if (!window.__camAllow) throw new DOMException("denied", "NotAllowedError");
      const c = document.createElement("canvas"); c.width = 640; c.height = 480; c.getContext("2d").fillRect(0, 0, 640, 480);
      const stream = c.captureStream(5), track = stream.getVideoTracks()[0];
      track.getCapabilities = () => ({ torch: true, zoom: { min: 1, max: 3, step: 0.1 } });
      const apply = track.applyConstraints.bind(track);
      window.__zoom = [];
      track.applyConstraints = async (k) => { const t = k?.advanced?.[0]?.torch, z = k?.advanced?.[0]?.zoom; if (t !== undefined) { window.__torch.push(t); return; } if (z !== undefined) { window.__zoom.push(z); return; } return apply(k).catch(() => {}); };
      return stream;
    };
    let hidden = false;
    Object.defineProperty(document, "hidden", { get: () => hidden, configurable: true });
    window.__setHidden = (h) => { hidden = h; document.dispatchEvent(new Event("visibilitychange")); };
  },
};
await scenario(["F53", "F54"], "scanner: automatic zoom for a small barcode; no selection on a long press", async (set) => {
  const env = set(await open({ init: FAKE_CAMERA }));
  const { page } = env;
  await page.click("#scanBtn"); await page.waitForSelector("#scanner:not([hidden])"); await settle(page, 1500);
  const early = await page.evaluate(() => ({ zoom: window.__zoom.slice(), ctl: !!document.getElementById("zoomBtn") }));
  check("F53", "nothing zooms while a read may still come, and there is no 2x control to find", early.zoom.length === 0 && !early.ctl, JSON.stringify(early));
  await settle(page, 3200);
  const late = await page.evaluate(() => ({ zoom: window.__zoom.slice(), hint: document.getElementById("scanHint").textContent }));
  check("F53", "after four seconds without a read the camera zooms in by itself and the hint says so", late.zoom[0] === 2 && /Zoomed in for a small barcode/.test(late.hint), JSON.stringify(late));
  const sel = await page.evaluate(() => ({ view: getComputedStyle(document.getElementById("overlay")).userSelect, hint: getComputedStyle(document.getElementById("scanHint")).userSelect, input: getComputedStyle(document.getElementById("scanTypeInput")).userSelect }));
  check("F54", "a long press on the camera view selects nothing; the typed number still can be", sel.view === "none" && sel.hint === "none" && sel.input === "text", JSON.stringify(sel));
});

await scenario(["S1"], "scanner flashlight", async (set) => {
  const env = set(await open({ init: FAKE_CAMERA }));
  const { page } = env;
  await page.click("#scanBtn"); await page.waitForSelector("#scanner:not([hidden])"); await settle(page, 1500);
  const shown = await page.evaluate(() => !document.getElementById("torchBtn").hidden);
  check("S1", "the flashlight shows while a camera with a light runs", shown);
  if (shown) {
    await page.click("#torchBtn"); await settle(page, 200);
    const st = await page.evaluate(() => ({ pressed: document.getElementById("torchBtn").getAttribute("aria-pressed"), calls: window.__torch }));
    check("S1", "tapping it turns the light on", st.pressed === "true" && st.calls.at(-1) === true, JSON.stringify(st));
  }
  await page.evaluate(() => { window.__setHidden(true); }); await settle(page, 200);
  await page.evaluate(() => { window.__camAllow = false; window.__setHidden(false); }); await settle(page, 800);
  const after = await page.evaluate(() => ({ torch: !document.getElementById("torchBtn").hidden, denied: !!document.querySelector("#scanner .scan-denied") }));
  check("S1", "back from the background with the camera refused: no flashlight without a camera", after.denied && !after.torch, JSON.stringify(after));
});

// Sheets close by a drag on their whole header, not only the 21px handle; a short drag springs back without moving the
// content; a tap on the header is a tap; a re-render mid-drag (Settings refreshes its price card) is harmless.
const touchDrag = async (cdp, page, x, y0, y1, { steps = 8, ms = 16, hold = false } = {}) => {
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: y0 }] });
  for (let i = 1; i <= steps; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y0 + ((y1 - y0) * i) / steps }] }); await page.waitForTimeout(ms); }
  if (!hold) await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
};
await scenario(["S4"], "dragging a sheet down by its header", async (set) => {
  const env = set(await open({}));
  const { page, cdp } = env;
  const openSettings = async () => { await page.tap("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 700); };
  const isOpen = () => page.evaluate(() => document.getElementById("settings").open);
  await openSettings();
  const title = await rect(page, "#settings .sheet-title"), grab = await rect(page, "#settings .grab");
  check("S4", "the drag area is the whole header, not the handle alone", title && grab && title.t > grab.b - 1, `handle ${fmt(grab)} title ${fmt(title)}`);
  // a slow drag from the title, past a quarter of the sheet
  await touchDrag(cdp, page, title.l + 10, title.t + 8, title.t + 260, { steps: 20, ms: 20 }); await settle(page, 700);
  check("S4", "a drag from the title closes Settings", !(await isOpen()));
  check("S4", "the close leaves no history entry behind", await page.evaluate(() => history.state?.modal == null), JSON.stringify(await page.evaluate(() => history.state)));
  // a quick flick, shorter than the distance threshold
  await openSettings();
  await touchDrag(cdp, page, 195, title.t + 8, title.t + 70, { steps: 3, ms: 8 }); await settle(page, 700);
  check("S4", "a quick downward flick closes it", !(await isOpen()));
  // a short slow drag springs back; the content keeps its scroll position
  await openSettings();
  await page.evaluate(() => { document.querySelector("#settings .sheet-inner").scrollTop = 200; }); await settle(page, 100);
  const y0 = await page.evaluate(() => document.querySelector("#settings .sheet-inner").scrollTop);
  await touchDrag(cdp, page, 195, title.t + 8, title.t + 48, { steps: 10, ms: 40 }); await settle(page, 600);
  const back = await page.evaluate(() => ({ open: document.getElementById("settings").open, tr: document.getElementById("settings").style.translate, y: document.querySelector("#settings .sheet-inner").scrollTop }));
  check("S4", "a short drag springs back and stays open, at the same scroll position", back.open && !back.tr && Math.abs(back.y - y0) <= 1, JSON.stringify({ ...back, before: y0 }));
  check("S4", "at rest the sheet gives its layer back (no full-screen bitmap held while it sits open)", await page.evaluate(() => getComputedStyle(document.getElementById("settings")).willChange === "auto"));
  // a tap on the header is not a drag; the close button still closes
  await page.touchscreen.tap(title.l + 10, title.t + 8); await settle(page, 500);
  check("S4", "a tap on the header leaves the sheet open", await isOpen());
  // a re-render while the finger is down
  await touchDrag(cdp, page, 195, title.t + 8, title.t + 60, { steps: 6, ms: 20, hold: true });
  // moved without its own layer, every frame repainted the whole screen and the drag stuttered on the iPhone
  check("S4", "while dragged the sheet is on its own compositing layer", await page.evaluate(() => getComputedStyle(document.getElementById("settings")).willChange === "transform"));
  await page.evaluate(() => window.__sfb.refreshSettings());
  for (let i = 1; i <= 8; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: title.t + 60 + i * 30 }] }); await page.waitForTimeout(20); }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await settle(page, 700);
  check("S4", "a re-render mid-drag does not strand the sheet: the drag still closes it", !(await isOpen()) && await page.evaluate(() => !document.getElementById("settings").style.translate && !document.getElementById("settings").style.willChange));
  await openSettings();
  await page.tap("#settings .x-btn"); await settle(page, 600);
  check("S4", "the close button still closes", !(await isOpen()));
});

await scenario(["F13"], "home screen height", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  const sc = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  check("F13", "the home screen does not scroll when its content fits (390x844)", sc <= 0, `overflow ${sc}px`);
});

// ---------------------------------------------------------------- price status: one story in the pill, card, dot and announcement
const probe = (page, cssVar) => page.evaluate((v) => { const d = document.createElement("div"); d.style.background = `var(${v})`; document.body.append(d); const c = getComputedStyle(d).backgroundColor; d.remove(); return c; }, cssVar);
await scenario(["F25", "F26"], "prices 60 days old", async (set) => {
  const env = set(await open({ clock: Date.now() + 60 * DAY }));
  const { page } = env;
  await page.waitForSelector("#stale:not([hidden])");
  const dot = await page.evaluate(() => getComputedStyle(document.querySelector("#status .dot")).backgroundColor);
  check("F25", "the status dot turns red", dot === (await probe(page, "--danger")), `dot ${dot}`);
  const home = await visibleText(page, "#home");
  check("F26", "nothing on the home screen calls old prices ready", !/Prices ready/i.test(home), home.slice(0, 120));
});

const TALLY3 = { fn: () => localStorage.setItem("sfb.tally", JSON.stringify([1, 2, 3].map((i) => ({ id: `t${i}`, title: `Item ${i}`, unitCents: 123456, qty: 1, unit: "each", kind: "exact", cents: 123456, at: Date.now() })))) };
for (const [w, h] of [[320, 568], [360, 780], [390, 844], [430, 932]]) {
  await scenario(["F27"], `status pill ${w}x${h}`, async (set) => {
    const env = set(await open({ w, h, init: TALLY3 }));
    const { page } = env;
    for (const where of ["home", "results"]) {
      if (where === "results") { await page.fill("#q", "peanut"); await settle(page, 500); }
      const s = await page.evaluate(() => { const st = document.getElementById("status"), t = document.getElementById("statusText"); const shown = t.getClientRects().length > 0 && t.clientWidth > 0; return { shown, sw: t.scrollWidth, cw: t.clientWidth, text: t.textContent, label: st.getAttribute("aria-label") || "" }; });
      const ok = s.shown ? s.sw <= s.cw + 1 : /\d/.test(s.label);
      check("F27", `${w}x${h} ${where}: the pill's text is whole (or a deliberate dot with a full label)`, ok && !/%/.test(s.text), JSON.stringify(s));
    }
  });
}

await scenario(["F28", "F27"], "other departments cannot download", async (set) => {
  // the core shards download; every file of a "more" shard fails, so the background download stops (more-paused)
  // read from the served site, so the check works from any directory and against --url (audit W10-08)
  const cur = await (await fetch(new URL("db/current.json", BASE))).json();
  const manifest = await (await fetch(new URL(`db/${cur.version}/manifest.json`, BASE))).json();
  const moreFiles = new Set(manifest.shards.filter((s) => s.tier === "more").flatMap((s) => [s.files.cols, s.files.upc, s.files.tokens, ...s.files.strings]).map((f) => f.path.split("/").pop()));
  const env = set(await open({ routes: [["**/db/files/**", (route) => (moreFiles.has(route.request().url().split("/").pop()) ? route.abort("failed") : route.continue())]] }));
  const { page } = env;
  await page.waitForTimeout(9000);
  const pill = await visibleText(page, "#status"), home = await visibleText(page, "#home");
  check("F28", "after the download stops, nothing claims it is still loading", !/loading/i.test(pill) && !/loading/i.test(home), `pill "${pill}" home "${home.slice(0, 160)}"`);
  check("F27", "no download percentage in the pill", !/%/.test(pill), pill);
  await env.ctx.setOffline(true); await settle(page, 500);
  const home2 = await visibleText(page, "#home");
  check("F28", "offline, the home screen says the rest arrives when online", !/loading/i.test(home2), home2.slice(0, 160));
});

await scenario(["F29"], "progress bar and a background update", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.evaluate(() => window.__sfb.db.dispatchEvent(new CustomEvent("progress", { detail: { phase: "download", background: true, tier: "all", doneBytes: 5, totalBytes: 10 } })));
  await settle(page, 200);
  check("F29", "a background update download does not show the progress bar", await page.evaluate(() => document.getElementById("progress").hidden));
});

await scenario(["F30"], "price server errors", async (set) => {
  const env = set(await open({ routes: [["**/db/files/**", (route) => route.fulfill({ status: 503, body: "busy" })]], wait: false }));
  const { page } = env;
  await page.waitForFunction(() => /error|offline/.test(document.getElementById("status").dataset.state || ""), null, { timeout: 45000 });
  await settle(page, 300);
  const pill = await visibleText(page, "#status"), card = await visibleText(page, "#home");
  check("F30", "a server error is not reported as a lost connection", !/connection/i.test(pill + card), `pill "${pill}" card "${card.slice(0, 140)}"`);
});

await scenario(["F31"], "search worker failure after the prices opened", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.evaluate(() => window.__sfb.db.dispatchEvent(new CustomEvent("state", { detail: { state: "error", message: "worker failed" } })));
  await settle(page, 300);
  const st = await page.evaluate(() => ({ pill: document.getElementById("status").dataset.state, card: document.getElementById("readyCard")?.dataset.tone, cardShown: !!document.getElementById("readyCard")?.getClientRects().length }));
  check("F31", "the pill and the card tell the same story", st.pill === "error" && st.cardShown && st.card === "problem", JSON.stringify(st));
});

await scenario(["F32"], "browser too old for offline prices", async (set) => {
  let fetched = 0;
  const env = set(await open({ init: { fn: () => { delete window.DecompressionStream; } }, wait: false, routes: [["**/db/current.json", (route) => { fetched++; route.continue(); }]] }));
  const { page } = env;
  await settle(page, 800);
  await page.evaluate(() => { dispatchEvent(new Event("offline")); dispatchEvent(new Event("online")); });
  await settle(page, 800);
  const pill = await visibleText(page, "#status");
  check("F32", "coming back online keeps “Update required”", /update required/i.test(pill) && fetched === 0, `pill "${pill}" current.json fetched ${fetched}x`);
});

// ---------------------------------------------------------------- Android: the same app, in its own words
// Every iPhone browser is WebKit and every Android browser that matters is Chromium (the engine these checks run in), so the
// layout is the same; what differs is the wording that names the platform (install steps, camera permission, what to update).
const IOS_WORDS = /iPhone|iOS|Safari|Add to Home Screen/;
await scenario(["F55"], "Android phone: no iPhone words, the install steps for its browser, the vibration setting", async (set) => {
  const env = set(await open({ w: 360, h: 780, android: true }));
  const { page } = env;
  const body = await visibleText(page, "body");
  check("F55", "nothing on the home screen speaks of an iPhone or Safari", !IOS_WORDS.test(body), body.match(IOS_WORDS)?.[0] || "");
  const hint = await visibleText(page, "#installHint");
  check("F55", "an Android browser without an install prompt is told the menu steps", /Install the app/.test(hint) && /menu/.test(hint) && /Add to Home screen/.test(hint), hint.slice(0, 120));
  await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 600);
  await page.evaluate(() => { document.querySelector("#settings details.about").open = true; }); await settle(page, 200);
  const settings = await visibleText(page, "#settings");
  check("F55", "Settings offers the vibration switch where the browser can vibrate", /Vibrate on scan/.test(settings) === (await page.evaluate(() => typeof navigator.vibrate === "function")));
  check("F55", "About names both platforms", /iPhone \(iOS 16\.4 or later\) and Android/.test(settings));
});
await scenario(["F56"], "Android phone on a browser too old for the app", async (set) => {
  const env = set(await open({ w: 360, h: 780, android: true, init: { fn: () => { delete window.DecompressionStream; } }, wait: false }));
  const { page } = env;
  await settle(page, 800);
  const card = await visibleText(page, "#readyCard");
  check("F56", "the status card tells an Android phone to update its browser from the Play Store, not iOS", /Update Chrome/.test(card) && /Play Store/.test(card) && !IOS_WORDS.test(card), card.slice(0, 160));
  const pill = await visibleText(page, "#status");
  check("F56", "the pill says Update required", /update required/i.test(pill), pill);
});
await scenario(["F56"], "iPhone on a browser too old for the app", async (set) => {
  const env = set(await open({ ios: true, init: { fn: () => { delete window.DecompressionStream; } }, wait: false }));
  const { page } = env;
  await settle(page, 800);
  const card = await visibleText(page, "#readyCard");
  check("F56", "the status card tells an iPhone to update iOS", /iOS 16\.4/.test(card) && !/Play Store/.test(card), card.slice(0, 160));
});
await scenario(["F56"], "a browser that unpacks the database but cannot draw the layout is told to update too", async (set) => {
  const env = set(await open({ android: true, init: { fn: () => { const sup = CSS.supports.bind(CSS); CSS.supports = (a, b) => (/oklch/.test(String(a) + String(b)) ? false : sup(a, b)); } }, wait: false }));
  const { page } = env;
  await settle(page, 800);
  const pill = await visibleText(page, "#status");
  check("F56", "no oklch colours: Update required, nothing downloaded", /update required/i.test(pill), pill);
});

// ---------------------------------------------------------------- a first open that stalls is never an endless spinner
await scenario(["F57"], "download that stops making progress: the card says so, offers a retry, and the page retries itself once", async (set) => {
  const env = set(await open({ wait: false, clock: Date.now(), routes: [["**/db/files/**", () => new Promise(() => {})]] }));   // pack files never arrive
  const { page } = env;
  await settle(page, 600);
  check("F57", "while files still arrive the card shows the download", /Downloading prices/.test(await visibleText(page, "#readyCard")), await visibleText(page, "#readyCard"));
  await page.clock.runFor(36_000); await settle(page, 300);
  const card = await visibleText(page, "#readyCard"), pill = await visibleText(page, "#status");
  check("F57", "after 30 s without progress the card says it is taking longer and offers a retry", /Taking longer than expected/.test(card) && /Tap to retry/.test(card), card.slice(0, 160));
  check("F57", "the pill says so too (its long or short label)", /Taking longer than expected|Retry/.test(pill), pill);
  const diag = await page.evaluate(() => JSON.parse(localStorage.getItem("sfb.boot.log") || "[]").join(" | "));
  check("F57", "the diagnostics log records the stall", /no progress for 3\d s in state downloading/.test(diag), diag.slice(-200));
  const retried = await page.evaluate(() => sessionStorage.getItem("sfb.bootRetry"));
  check("F57", "no reload before two minutes", retried === null, String(retried));
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15_000 }).catch(() => null), page.clock.runFor(95_000)]);
  await settle(page, 500);
  check("F57", "after two minutes the page reloaded itself once", (await page.evaluate(() => sessionStorage.getItem("sfb.bootRetry"))) === "1");
});

// ---------------------------------------------------------------- audit follow-ups (2026-10-21)
await scenario(["F59"], "Reset app data also removes the barcode matches remembered on this phone (privacy page)", async (set) => {
  const seed = { "00096619261574": { key: 78742054261, title: "Great Value Corn", at: 1 } };
  const env = set(await open({ init: { fn: (s) => { if (!sessionStorage.getItem("seeded")) { sessionStorage.setItem("seeded", "1"); localStorage.setItem("sfb.learned.v1", JSON.stringify(s)); } }, arg: seed } }));
  const { page } = env;
  check("F59", "the seeded match is on the phone before Reset", await page.evaluate(() => !!JSON.parse(localStorage.getItem("sfb.learned.v1") || "{}")["00096619261574"]));
  await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 500);
  await page.click("#settings [data-act=reset]"); await settle(page, 300);
  const q = await visibleText(page, "#resetQ");
  check("F59", "the confirmation names the remembered matches", /barcode matches/.test(q), q);
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("#settings [data-act=reset-yes]")]);
  await page.waitForSelector("html[data-ready='1']", { timeout: 60000 });
  const own = await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem("sfb.learned.v1") || "{}")).filter((m) => !m.shared).length);
  check("F59", "after Reset no match made on this phone remains", own === 0, `${own} left`);
});
await scenario(["F60"], "two open copies of the app keep each other's tally lines", async (set) => {
  const env = set(await open());
  const { page, ctx } = env;
  const b = await ctx.newPage();
  const u = new URL(BASE.href); u.search = "nosw=1&tour=0";
  await b.goto(u.href, { waitUntil: "domcontentloaded" }); await b.waitForSelector("html[data-ready='1']", { timeout: 60000 }); await settle(b);
  const add = async (p, rank) => { await p.evaluate((r) => window.__sfb.openRank(r), rank); await p.waitForSelector("#sheet[open]"); await settle(p, 400); await p.click("#sheet [data-act=add]"); await settle(p, 600); };
  await add(page, 0);
  await add(b, 1);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("sfb.tally") || "[]").length);
  check("F60", "both lines are stored", stored === 2, `${stored} stored`);
  const card = await visibleText(page, "#tallyCardSub");
  check("F60", "the first copy shows the line the second added", /2 items/.test(card), card);
  await b.close();
});
await scenario(["F61"], "offline with no prices yet: the toast does not promise search", async (set) => {
  const env = set(await open({ wait: false, routes: [["**/db/**", (r) => r.abort()]] }));
  const { page } = env;
  await settle(page, 1500);
  await page.evaluate(() => dispatchEvent(new Event("offline"))); await settle(page, 400);
  const t = await visibleText(page, ".toast");
  check("F61", "no pack: the offline toast says prices download when the connection returns", /download when the connection returns/.test(t) && !/search continue/.test(t), t);
});
await scenario(["F61"], "offline with prices: scanning and search keep working", async (set) => {
  const env = set(await open());
  const { page } = env;
  await page.evaluate(() => dispatchEvent(new Event("offline"))); await settle(page, 400);
  const t = await visibleText(page, ".toast");
  check("F61", "with a pack: the offline toast says search keeps working", /search continue to work/.test(t), t);
});
await scenario(["F62"], "Settings: departments left out by the memory limit are described as they work", async (set) => {
  const env = set(await open());
  const { page } = env;
  await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 500);
  await page.evaluate(() => { window.__sfb.db.skipped = [{ id: "home", name: "Home", items: 1 }]; window.__sfb.refreshSettings(); });
  await settle(page, 300);
  const t = await visibleText(page, "#settings");
  check("F62", "the note says search by name does not find them and a scanned barcode is checked live", /search by name does not find/.test(t) && /scanned barcode/.test(t) && !/priced live when online/.test(t), (t.match(/Not stored on this phone[^.]*\.[^.]*\./) || [""])[0]);
});

await scenario(["F63"], "iOS launch screens: served with the page, not precached by the service worker (owner, 2026-10-22)", async (set) => {
  const env = set(await open());
  const { page } = env;
  const links = await page.evaluate(() => [...document.querySelectorAll('link[rel="apple-touch-startup-image"]')].map((l) => ({ href: l.href, media: l.media })));
  check("F63", "the page names a launch image for every iPhone and iPad size, light and dark", links.length === 62 && links.filter((l) => /prefers-color-scheme: dark/.test(l.media)).length === 31, `${links.length} links`);
  const sample = [links[0], links.find((l) => /device-width: 402px/.test(l.media) && /dark/.test(l.media))].filter(Boolean);
  const got = await Promise.all(sample.map(async (l) => { const r = await fetch(l.href); return `${r.status} ${r.headers.get("content-type")}`; }));
  check("F63", "the launch images are served as PNG", got.length === 2 && got.every((g) => /^200 image\/png/.test(g)), got.join(", "));
  const sw = await (await fetch(new URL("sw.js", BASE))).text();
  check("F63", "the service worker precaches none of them (iOS fetches its own once, when the app is added)", !/splash\//.test(sw) && /icons\/icon-512\.png/.test(sw), sw.match(/splash\/[^"]+/)?.[0] || "none listed");
});

await scenario(["F58"], "a box: one of its pieces, and the product's other sizes in the sheet (owner, 2026-10-21)", async (set) => {
  const env = set(await open({ w: 390, h: 844 }));
  const { page } = env;
  // an item counted in pieces (eggs, 6 ct) whose product comes in other sizes
  const found = await page.evaluate(async () => {
    for (let i = 0; i < 3000; i++) {
      const it = await window.__sfb.db.item(i);
      if (!it || it.pack !== 1 || !(it.pieces > 1) || it.priceCents == null || it.priceWithheld || it.basis === "lb") continue;
      const sizes = await window.__sfb.db.sizes(i);
      if (sizes.length) return { i, pieces: it.pieces, name: it.name, other: sizes[0].name };
    }
    return null;
  });
  check("F58", "the sample pack has a counted item with other sizes", !!found, JSON.stringify(found));
  if (!found) return;
  await page.evaluate((i) => window.__sfb.openRank(i), found.i); await page.waitForSelector("#sheet[open]"); await settle(page, 900);
  const seg = await visibleText(page, "#sheet .pack-seg");
  check("F58", `the sheet offers one of its ${found.pieces}`, new RegExp(`1 of ${found.pieces}`).test(seg), seg);
  await page.click("#sheet [data-pack=one]"); await settle(page, 300);
  const basis = await visibleText(page, "#sheet .price-basis");
  check("F58", "pricing one piece says so beside the price", basis === `1 of ${found.pieces}`, basis);
  const head = await visibleText(page, "#sheet .sizes-slot h2");
  const rows = await page.evaluate(() => document.querySelectorAll("#sheet .sizes-slot [data-rank]").length);
  check("F58", "the sheet lists the product's other sizes", /Other sizes/i.test(head) && rows >= 1, `${head} · ${rows} rows`);
  const o = await page.evaluate(() => { const i = document.querySelector("#sheet .sheet-inner"); return i.scrollWidth - i.clientWidth; });
  check("F58", "the list never scrolls the sheet sideways", o <= 0, `overflow ${o}px`);
  const order = await page.evaluate(() => [...document.querySelectorAll("#sheet .sizes-slot [data-rank]")].map((b) => b.getBoundingClientRect().top));
  check("F58", "the sizes read top-down, smallest count first", order.every((t, i) => i === 0 || t > order[i - 1]), JSON.stringify(order.map(Math.round)));
  await page.click("#sheet .sizes-slot [data-rank]"); await settle(page, 700);
  const title = await visibleText(page, "#sheetTitle");
  check("F58", "tapping another size opens it in the sheet", title && title !== found.name && !/1 of/.test(await visibleText(page, "#sheet .price-basis")), title);
});

await scenario(["F33", "F34"], "Recent", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  const items = await page.evaluate(async () => [await window.__sfb.db.item(0), await window.__sfb.db.item(1)]);
  await page.evaluate(() => window.__sfb.openRank(0)); await page.waitForSelector("#sheet[open]"); await settle(page, 500);
  await page.keyboard.press("Escape"); await settle(page, 500);
  await page.evaluate(() => window.__sfb.openRank(1)); await page.waitForSelector("#sheet[open]"); await settle(page, 500);
  await page.keyboard.press("Escape"); await settle(page, 600);
  const first = await page.evaluate(() => { const rows = [...document.querySelectorAll("#recentList .row")]; rows.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top); return rows[0]?.querySelector(".name")?.textContent || ""; });
  check("F33", "the newest Recent item is shown first", first && items[1] && first.includes(items[1].name.slice(0, 20)), `first "${first}" newest "${items[1]?.name}"`);
  // a recent saved under an older snapshot with an old price shows today's price
  await page.evaluate((it) => { localStorage.setItem("sfb.recent", JSON.stringify([{ key: `g:${it.upc}`, kind: "exact", title: it.name, priceCents: 1, unit: "each", code: it.upc, id: it.id, rank: null, version: "old-snapshot", at: Date.now() }])); }, items[0]);
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForSelector("html[data-ready='1']"); await settle(page, 800);
  const price = await visibleText(page, "#recentList .price");
  const wantPrice = (items[0].priceCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  check("F34", "a Recent item shows the current price, not the one saved weeks ago", price.startsWith(wantPrice), `shown "${price}" current ${wantPrice}`);
});

await scenario(["F49", "F50", "F51"], "Recent: swipe left to remove, Clear", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  const items = await page.evaluate(async () => [await window.__sfb.db.item(0), await window.__sfb.db.item(1)]);
  await page.evaluate((its) => localStorage.setItem("sfb.recent", JSON.stringify(its.map((it) => ({ key: `g:${it.upc}`, kind: "exact", title: it.name, priceCents: it.priceCents, unit: "each", code: it.upc, id: it.id, rank: it.rank, version: window.__sfb.db.version, at: Date.now() })))), items);
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForSelector("html[data-ready='1']"); await settle(page, 800);
  const before = await page.evaluate(() => document.querySelectorAll("#recentList .row").length);
  const box = await page.evaluate(() => { const r = document.querySelector("#recentList .row").getBoundingClientRect(); return { x: r.left + r.width * 0.7, y: r.top + r.height / 2 }; });
  await page.mouse.move(box.x, box.y); await page.mouse.down(); await page.mouse.move(box.x - 60, box.y, { steps: 6 }); await page.mouse.move(box.x - 140, box.y, { steps: 6 }); await page.mouse.up(); await settle(page, 400);
  const revealed = await page.evaluate(() => { const li = document.querySelector("#recentList .swipe[data-open]"); if (!li) return null; const rm = li.querySelector(".swipe-remove").getBoundingClientRect(), row = li.querySelector(".row").getBoundingClientRect(); return { removeRight: rm.right, rowRight: row.right, w: rm.width }; });
  check("F49", "a swipe left on a Recent row uncovers a Remove button of a thumb's width", !!revealed && revealed.rowRight <= revealed.removeRight - revealed.w + 1 && revealed.w >= 44, JSON.stringify(revealed));
  await page.click("#recentList .swipe[data-open] .swipe-remove"); await settle(page, 400);
  const after = await page.evaluate(() => document.querySelectorAll("#recentList .row").length);
  const toastText = await visibleText(page, "#toasts .toast");
  check("F50", "Remove takes the row off the home screen, with an Undo toast", after === before - 1 && /Removed .* from Recent/.test(toastText) && /Undo/.test(toastText), `rows ${before} -> ${after}, toast "${toastText}"`);
  await page.click("#recentClear"); await settle(page, 400);
  const cleared = await page.evaluate(() => ({ rows: document.querySelectorAll("#recentList .row").length, hidden: document.getElementById("recent").hidden, empty: !document.getElementById("homeEmpty").hidden }));
  check("F51", "Clear empties Recent and the home screen shows its empty state", cleared.rows === 0 && cleared.hidden && cleared.empty, JSON.stringify(cleared));
  await page.click("#toasts .toast button"); await settle(page, 400);
  check("F51", "Undo brings the cleared rows back", (await page.evaluate(() => document.querySelectorAll("#recentList .row").length)) === after);
});

await scenario(["F52"], "no page zoom", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  const meta = await page.evaluate(() => document.querySelector('meta[name="viewport"]')?.content || "");
  check("F52", "the viewport pins the scale, so rapid taps or a pinch cannot zoom the home-screen app", /maximum-scale=1/.test(meta) && /user-scalable=no/.test(meta), meta);
  // a browser tab ignores that meta: two quick taps on plain text are swallowed before Safari can zoom
  const swallowed = await page.evaluate(() => new Promise((res) => {
    const h = document.querySelector("#homeEmpty h2, #homeEmpty .h1, #homeEmpty") || document.body;
    const fire = () => { const e = new Event("touchend", { bubbles: true, cancelable: true }); h.dispatchEvent(e); return e.defaultPrevented; };
    const first = fire(); setTimeout(() => res({ first, second: fire() }), 60);
  }));
  check("F52", "the second of two quick taps on plain text is swallowed; the first is not", swallowed.first === false && swallowed.second === true, JSON.stringify(swallowed));
  const onButton = await page.evaluate(() => new Promise((res) => {
    const b = document.getElementById("scanBtn") || document.querySelector("button");
    const fire = () => { const e = new Event("touchend", { bubbles: true, cancelable: true }); b.dispatchEvent(e); return e.defaultPrevented; };
    fire(); setTimeout(() => res(fire()), 60);
  }));
  check("F52", "quick taps on a button are never swallowed", onButton === false);
});

await scenario(["F35"], "tapping the logo", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  let navs = 0;
  page.on("framenavigated", (f) => { if (f === page.mainFrame()) navs++; });
  await page.fill("#q", "peanut"); await settle(page, 400);
  await page.click(".brand"); await settle(page, 700);
  const st = await page.evaluate(() => ({ home: !document.getElementById("home").hidden, q: document.getElementById("q").value }));
  check("F35", "the logo returns home without reloading the app", navs === 0 && st.home && st.q === "", `navigations ${navs} ${JSON.stringify(st)}`);
});

await scenario(["F36"], "status announcements", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  const live = await page.evaluate(() => document.getElementById("statusLive").textContent);
  check("F36", "the announcement does not repeat “Prices”", !/Prices:?\s+Prices/i.test(live), live);
  await env.ctx.setOffline(true); await settle(page, 500);
  const live2 = await page.evaluate(() => document.getElementById("statusLive").textContent);
  check("F36", "going offline is announced", /offline/i.test(live2), live2);
});

for (const [w, h] of [[320, 568], [360, 780], [390, 844]]) {
  await scenario(["F38", "F9b", "F14", "F39", "F41", "C1"], `home screen content ${w}x${h}`, async (set) => {
    const env = set(await open({ w, h }));
    const { page } = env;
    const org = await page.evaluate(() => { const e = document.querySelector("#heroEyebrow > :first-child"); return e ? { h: e.getBoundingClientRect().height, lh: parseFloat(getComputedStyle(e).lineHeight) || 18 } : null; });
    check("F38", `${w}: the food bank's name sits on one line`, org && org.h <= org.lh * 1.25, JSON.stringify(org));
    const names = await page.evaluate(() => [...document.querySelectorAll("#home button")].filter((b) => b.getClientRects().length).map((b) => ({ label: b.getAttribute("aria-label") || "", text: b.innerText.replace(/\s+/g, " ").trim() })));
    const bad = names.filter((n) => n.label && n.text && !n.label.toLowerCase().includes(n.text.split(" ")[0].toLowerCase()));
    check("F9b", `${w}: home buttons are announced with their visible words`, bad.length === 0, JSON.stringify(bad));
    const date = await page.evaluate(() => { const iso = window.__sfb.db.manifest.priceDate; const d = new Date(`${iso}T12:00:00`); return [d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), d.toLocaleDateString(undefined, { month: "long", day: "numeric" })]; });
    const shown = await page.evaluate((ds) => [...document.querySelectorAll("#top, #home")].map((e) => e.innerText).join(" \n ").split(/\n/).filter((line) => ds.some((d) => line.includes(d))).length, date);
    check("F14", `${w}: the price date appears once`, shown === 1, `${shown} lines carry the date`);
    check("F39", `${w}: no name on an unnamed container`, await page.evaluate(() => ![...document.querySelectorAll("div[aria-labelledby], span[aria-labelledby]")].some((e) => !e.getAttribute("role"))));
    const pill = await visibleText(page, "#statusText");
    if (w >= 360) check("F41", `${w}: the pill says the price list's date`, /^Prices /.test(pill), pill);
    const text = await visibleText(page, "#home");
    const casual = ["even offline", "works offline", "common items", "tally is empty", "one moment", "here, even"].filter((p) => text.toLowerCase().includes(p));
    check("C1", `${w}: no sample shortcuts or casual wording on the home screen`, casual.length === 0 && !(await page.evaluate(() => document.getElementById("quick"))), casual.join(", "));
  });
}

await scenario(["F17"], "walkthrough while prices download", async (set) => {
  let release;
  const gate = new Promise((r) => (release = r));
  const env = set(await open({ query: "tour=1", wait: false, routes: [["**/db/files/**", async (route) => { await gate; route.continue(); }]] }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])");
  for (let i = 0; i < 3; i++) { await tourNext(page); await settle(page, 300); }
  const text = await visibleText(page, "#tourText"), spot = await rect(page, "#tourSpot");
  check("F17", "step 4 points at something on screen and its words fit any price state", !!spot && !/this card shows the date/i.test(text), `spot ${fmt(spot)} text "${text}"`);
  release();
});

// ---------------------------------------------------------------- independent review findings (R = code, A = accessibility, D = design)
await scenario(["R1"], "header between 441 and 520px with the tally pill", async (set) => {
  for (const w of [441, 460, 500]) {
    const env = set(await open({ w, h: 900, init: TALLY3 }));
    const { page } = env;
    await page.fill("#q", "peanut"); await settle(page, 500);
    const st = await page.evaluate(() => { const r = (e) => e && e.getClientRects().length ? e.getBoundingClientRect() : null; const wm = r(document.querySelector(".wordmark")), s = r(document.getElementById("status")); return { wm: wm && [wm.left, wm.right], s: s && [s.left, s.right] }; });
    check("R1", `${w}: the wordmark never runs under the status pill`, !st.wm || st.wm[1] <= st.s[0], JSON.stringify(st));
    await env.ctx.close();
  }
});

await scenario(["R2"], "Recent after a refresh changes an entry's kind", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  const it = await page.evaluate(async () => window.__sfb.db.item(2));
  await page.evaluate((it) => localStorage.setItem("sfb.recent", JSON.stringify([{ key: `v:${it.upc}`, kind: "live", title: it.name, priceCents: 1, unit: "each", code: it.upc, id: null, rank: null, version: "old", at: Date.now() }])), it);
  await page.reload({ waitUntil: "domcontentloaded" }); await page.waitForSelector("html[data-ready='1']"); await settle(page, 800);
  await page.evaluate((c) => window.__sfb.openCode(c, { source: "recent" }), it.upc); await page.waitForSelector("#sheet[open]"); await settle(page, 400);
  await page.keyboard.press("Escape"); await settle(page, 600);
  const n = await page.evaluate(() => document.querySelectorAll("#recentList .row").length);
  check("R2", "reopening a refreshed Recent item leaves one row, not two", n === 1, `${n} rows`);
});

await scenario(["R4"], "walkthrough: a tap on the spotlit search box", async (set) => {
  const env = set(await open({ query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 400);
  const f = await rect(page, "#searchForm");
  await page.mouse.click(f.l + 40, f.t + f.h / 2); await settle(page, 600);
  const st = await page.evaluate(() => ({ focus: document.activeElement?.id, tour: !document.getElementById("tour").hidden, modal: history.state?.modal || null }));
  check("R4", "the search box has the focus in the same tap and the walkthrough is gone", st.focus === "q" && !st.tour && st.modal !== "tour", JSON.stringify(st));
});

await scenario(["R5"], "search worker failure before the prices open", async (set) => {
  let release;
  const gate = new Promise((r) => (release = r));
  const env = set(await open({ wait: false, routes: [["**/db/files/**", async (route) => { await gate; route.continue().catch(() => {}); }]] }));
  const { page } = env;
  await settle(page, 1200);
  await page.evaluate(() => window.__sfb.db.worker.onerror({ message: "worker crashed" }));
  await settle(page, 300);
  const st = await page.evaluate(() => ({ pill: document.getElementById("status").dataset.state, card: document.getElementById("readyCard").dataset.tone }));
  check("R5", "the pill and card say the price list could not be opened", st.pill === "error" && st.card === "problem", JSON.stringify(st));
  release();
});

await scenario(["R6", "R7"], "browser too old: Settings", async (set) => {
  let dbRequests = 0;
  const env = set(await open({ init: { fn: () => { delete window.DecompressionStream; } }, wait: false, routes: [["**/db/**", (route) => { dbRequests++; route.continue(); }]] }));
  const { page } = env;
  await settle(page, 800);
  await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 600);
  const sub = await visibleText(page, "#settings .data-sub");
  check("R7", "Settings explains it once", (sub.match(/update/gi) || []).length <= 2 && !/Details:/.test(sub), sub);
  await page.click("#settings [data-act=update]"); await settle(page, 1500);
  check("R6", "Check for new prices downloads nothing on a browser that cannot unpack it", dbRequests === 0, `${dbRequests} requests`);
});

await scenario(["R9", "A2"], "keyboard flow: type a code, Enter, then Tab", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.click("#q"); await page.keyboard.type("201234928751"); await page.keyboard.press("Enter");
  await page.waitForSelector("#sheet[open]"); await settle(page, 600);
  const st = await page.evaluate(() => { const b = document.querySelector("#sheet [data-act=add]"); return { kbd: document.documentElement.hasAttribute("data-kbd"), focused: document.activeElement === b, outline: b && getComputedStyle(b).outlineStyle, label: b?.getAttribute("aria-label") }; });
  check("R9", "typing and the keyboard's Go key do not turn the focus rings on (a phone)", !st.kbd && st.focused && st.outline === "none", JSON.stringify(st));
  check("A2", "the Add button's name is its visible words", !st.label, JSON.stringify(st));
  await page.keyboard.press("Tab"); await settle(page, 200);
  const t = await page.evaluate(() => ({ kbd: document.documentElement.hasAttribute("data-kbd"), outline: getComputedStyle(document.activeElement).outlineStyle }));
  check("R9", "Tab turns them on: the focused control is ringed", t.kbd && t.outline !== "none", JSON.stringify(t));
});

await scenario(["V1"], "Add to tally: the confirmation outlives the sheet", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.evaluate(() => window.__sfb.openRank(0)); await page.waitForSelector("#sheet[open]"); await settle(page, 500);
  await page.click("#sheet [data-act=add]"); await settle(page, 700);
  const t = await rect(page, "#toasts .toast"), txt = await visibleText(page, "#toasts .toast");
  check("V1", "the Added toast with Undo is on screen after the sheet closed", !!t && /Added/.test(txt) && /Undo/.test(txt), `${fmt(t)} "${txt}"`);
  await page.click("#toasts .toast button"); await settle(page, 300);
  check("V1", "Undo takes the line back out", (await page.evaluate(() => JSON.parse(localStorage.getItem("sfb.tally") || "[]").length)) === 0);
});

await scenario(["V2", "V4"], "tally: toasts in the sheet", async (set) => {
  const env = set(await open({ init: TALLY3 }));
  const { page } = env;
  await page.click("#tallyCard"); await page.waitForSelector("#tallySheet[open]"); await settle(page, 700);
  await page.locator("#tallySheet [data-remove]").first().click(); await settle(page, 300);
  await page.locator("#tallySheet [data-remove]").first().click(); await settle(page, 300);
  const x = await rect(page, "#tallySheet .x-btn"), toasts = await page.evaluate(() => [...document.querySelectorAll("#tallySheet .toasts-dlg .toast")].map((t) => { const r = t.getBoundingClientRect(); return { t: r.top, b: r.bottom, l: r.left, r: r.right }; }));
  check("V4", "toasts in a sheet leave its close button clear", toasts.length > 0 && toasts.every((r) => !overlap(r, x)), `${toasts.length} toasts, close ${fmt(x)}`);
  check("V4", "both removals keep their Undo", toasts.length === 2, `${toasts.length} toasts`);
  for (const b of await page.$$("#tallySheet .toasts-dlg .toast button")) await b.click();
  await settle(page, 300);
  check("V4", "both lines come back", (await page.evaluate(() => JSON.parse(localStorage.getItem("sfb.tally")).length)) === 3);
  await page.click("#tallySheet [data-act=clear]"); await settle(page, 200);
  await page.click("#tallySheet [data-act=clear-yes]"); await settle(page, 800);
  const txt = await visibleText(page, "#toasts");
  check("V2", "Tally cleared is shown after the sheet closed", /Tally cleared/.test(txt), `"${txt}"`);
});

await scenario(["V3"], "Settings: Check for new prices", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 600);
  await page.focus("#settings [data-act=update]"); await page.keyboard.press("Enter"); await settle(page, 1500);
  const st = await page.evaluate(() => ({ toast: [...document.querySelectorAll("#settings .toasts-dlg .toast")].map((t) => t.textContent).join(" | "), focus: document.activeElement?.dataset?.act || document.activeElement?.tagName }));
  check("V3", "the result toast stays and the focus stays on the button", /up to date|price list/i.test(st.toast) && st.focus === "update", JSON.stringify(st));
});

await scenario(["V6"], "result sheet in phone landscape shows the item and the button together", async (set) => {
  const env = set(await open({ w: 844, h: 390 }));
  const { page } = env;
  await page.evaluate(() => window.__sfb.openRank(0)); await page.waitForSelector("#sheet[open]"); await settle(page, 800);
  const t = await rect(page, "#sheetTitle"), add = await rect(page, "#sheet [data-act=add]"), v = await vp(page);
  check("V6", "the item's title and Add to tally are both on screen and apart", inside(t, v) && inside(add, v) && !overlap(t, add), `title ${fmt(t)} add ${fmt(add)}`);
});

await scenario(["V8"], "no results shown once", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.fill("#q", "zzqqxx"); await settle(page, 600);
  const n = await page.evaluate(() => (document.getElementById("results").innerText.match(/No results/g) || []).length);
  check("V8", "the message appears once on screen", n === 1, `${n} times`);
});

await scenario(["A3"], "Update now keeps the focus", async (set) => {
  const env = set(await open({ clock: Date.now() + 60 * DAY }));
  const { page } = env;
  await page.waitForSelector("#stale:not([hidden])");
  await page.focus("#stale [data-act=update]"); await page.keyboard.press("Enter"); await settle(page, 300);
  const st = await page.evaluate(() => ({ act: document.activeElement?.dataset?.act || document.activeElement?.tagName }));
  check("A3", "the focus stays on the banner's button while it checks", st.act === "update", JSON.stringify(st));
});

await scenario(["A6", "D4"], "results: announcements and the meta line", async (set) => {
  const env = set(await open({}));
  const { page } = env;
  await page.fill("#q", "zzqqxx"); await settle(page, 1100);
  check("A6", "no results is announced", /No results/.test(await page.evaluate(() => document.getElementById("resultsLive").textContent)));
  await page.fill("#q", "corn 99 oz"); await settle(page, 900);
  const m = await rect(page, "#resultsMeta"), r = await rect(page, "#results");
  check("D4", "the closest-match line is not clipped by the dock", m && r && m.b <= r.b + 0.5, `meta bottom ${m?.b} results bottom ${r?.b}`);
});

for (const [w, h] of [[320, 568], [390, 844]]) {
  await scenario(["D1", "D2"], `settings ${w}x${h}`, async (set) => {
    const env = set(await open({ w, h }));
    const { page } = env;
    await page.click("#settingsBtn"); await page.waitForSelector("#settings[open]"); await settle(page, 700);
    const o = await page.evaluate(() => { const i = document.querySelector("#settings .sheet-inner"); return i.scrollWidth - i.clientWidth; });
    check("D1", `${w}: Settings never scrolls sideways`, o <= 0, `overflow ${o}px`);
    await page.evaluate(() => { document.querySelector("#settings .sheet-inner").scrollTop = 400; }); await settle(page, 200);
    const x = await rect(page, "#settings .x-btn"), sh = await rect(page, "#settings");
    check("D2", `${w}: the close button stays in view while Settings scrolls`, x && sh && x.t >= sh.t - 0.5 && x.b <= sh.b, `x ${fmt(x)} sheet ${fmt(sh)}`);
  });
}

await scenario(["D3", "D16"], "result sheet in phone landscape", async (set) => {
  const env = set(await open({ w: 844, h: 390 }));
  const { page } = env;
  const idx = await page.evaluate(async () => { for (let i = 0; i < 200; i++) { const it = await window.__sfb.db.item(i); if (it && it.priceCents < 100) return i; } return 0; });
  await page.evaluate((i) => window.__sfb.openRank(i), idx); await page.waitForSelector("#sheet[open]"); await settle(page, 800);
  const add = await rect(page, "#sheet [data-act=add]"), v = await vp(page);
  check("D3", "Add to tally is on screen without scrolling the sheet", inside(add, v), `add ${fmt(add)}`);
  check("D16", "a price under $1 is one size (no small cents)", await page.evaluate(() => !document.querySelector("#sheet .price-big .cents")));
});

await scenario(["D7", "A1", "D6"], "tally sheet", async (set) => {
  const env = set(await open({ init: TALLY3 }));
  const { page } = env;
  await page.click("#tallyCard"); await page.waitForSelector("#tallySheet[open]"); await settle(page, 700);
  check("D7", "the tally counts items, as the home card does", /3 items/.test(await visibleText(page, "#tallySheet .tally-total-row")));
  await page.locator("#tallySheet [data-remove]").first().click(); await settle(page, 400);
  const toastIn = await page.evaluate(() => { const t = document.querySelector("#tallySheet .toasts-dlg .toast"); if (!t) return null; let inert = false; for (let n = t; n; n = n.parentElement) if (n.inert) inert = true; return { text: t.textContent, inert }; });
  check("A1", "a toast while the tally is open shows inside it, reachable", toastIn && !toastIn.inert, JSON.stringify(toastIn));
  await page.click("#tallySheet .toasts-dlg .toast button"); await settle(page, 400);
  check("D6", "Undo puts the removed line back", (await page.evaluate(() => JSON.parse(localStorage.getItem("sfb.tally")).length)) === 3);
  await page.click("#tallySheet [data-act=clear]"); await settle(page, 200);
  check("D6", "Clear asks inside the sheet before clearing", await page.evaluate(() => !!document.querySelector("#tallySheet .confirm-row") && JSON.parse(localStorage.getItem("sfb.tally")).length === 3));
});

// ---------------------------------------------------------------- summary
const failed = results.filter((r) => !r.ok);
const ids = [...new Set(results.map((r) => r.id))].sort();
console.log(`\n${results.length - failed.length}/${results.length} checks passed; ${failed.length ? `failing ids: ${[...new Set(failed.map((r) => r.id))].join(", ")}` : "all ids pass"} (${ids.length} ids)`);
if (args.json) { fs.mkdirSync(path.dirname(path.resolve(args.json)), { recursive: true }); fs.writeFileSync(path.resolve(args.json), JSON.stringify(results, null, 2)); }
await browser.close();
process.exit(failed.length ? 1 : 0);
