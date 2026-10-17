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
async function open({ w = 390, h = 844, safe = undefined, scheme = "light", query = "tour=0", init = null, routes = null, wait = true, clock = null, ios = false, screen = null, offline = false } = {}) {
  const phone = Math.min(w, h) < 600;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: phone, hasTouch: true, colorScheme: scheme, ...(ios ? { userAgent: IPHONE_UA } : {}) });
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

await scenario(["F1", "F2", "F13"], "iPhone Home Screen app launched with a short viewport", async (set) => {
  const env = set(await open({ w: 390, h: 797, ios: true, screen: { w: 390, h: 844 }, init: { fn: () => Object.defineProperty(navigator, "standalone", { get: () => true }) }, query: "tour=1" }));
  const { page } = env;
  await page.waitForSelector("#tour:not([hidden])"); await settle(page, 400);
  const dock = await rect(page, "#dock"), tour = await rect(page, "#tour");
  check("F1", "the dock reaches the bottom of the screen (844) despite the 797px viewport", dock && Math.abs(dock.b - 844) <= 1, `dock bottom ${dock?.b}`);
  check("F2", "the walkthrough dims the whole screen", tour && tour.b >= 843.5, `dim bottom ${tour?.b}`);
  await page.keyboard.press("Escape"); await settle(page, 300);
  const sc = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  check("F13", "the home screen does not scroll when its content fits", sc <= 0, `overflow ${sc}px`);
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
  const manifest = JSON.parse(fs.readFileSync(path.resolve("dist/db", JSON.parse(fs.readFileSync("dist/db/current.json", "utf8")).version, "manifest.json"), "utf8"));
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
    if (w >= 360) check("F41", `${w}: the pill says when the price list was updated`, /^Updated /.test(pill), pill);
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

// ---------------------------------------------------------------- summary
const failed = results.filter((r) => !r.ok);
const ids = [...new Set(results.map((r) => r.id))].sort();
console.log(`\n${results.length - failed.length}/${results.length} checks passed; ${failed.length ? `failing ids: ${[...new Set(failed.map((r) => r.id))].join(", ")}` : "all ids pass"} (${ids.length} ids)`);
if (args.json) { fs.mkdirSync(path.dirname(path.resolve(args.json)), { recursive: true }); fs.writeFileSync(path.resolve(args.json), JSON.stringify(results, null, 2)); }
await browser.close();
process.exit(failed.length ? 1 : 0);
