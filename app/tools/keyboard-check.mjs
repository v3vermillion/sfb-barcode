// keyboard-check.mjs — the keyboard and visual-viewport rules of the real app, checked in a browser against a model
// of iOS. Chromium has no on-screen keyboard and never pans the visual viewport, so the page gets a scripted
// visualViewport (installed before the app runs) that behaves as iOS does: the keyboard shrinks the visual viewport
// over several frames, iOS may pan the layout viewport to reveal the focused field (offsetTop), the user can pan it
// further by dragging, a final resize event can go missing, and window.scrollTo(0, 0) brings the pan back to 0 (in
// WebKit window.scrollY is the visual viewport's position). Every scenario asserts the same invariants in visual
// coordinates (layout coordinates minus the pan): the header's top edge is the visible top, the dock's bottom edge is
// the keyboard's top, the panel between them (home or results) fills exactly that room, and nothing is drawn outside.
// Exit code 1 when any check fails.
//   node tools/keyboard-check.mjs [--url http://127.0.0.1:8787/] [--browser chromium|webkit] [--only S1,S4]
import { chromium, webkit } from "playwright";

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true] : [])).filter((x) => x.length));
const BROWSER = String(args.browser || "chromium").toLowerCase();
const BASE = new URL(args.url || "http://127.0.0.1:8787/");
const ONLY = args.only ? new Set(String(args.only).split(",").map((s) => s.trim())) : null;
const exe = process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {};
const browser = BROWSER === "webkit" ? await webkit.launch() : await chromium.launch({ args: ["--no-sandbox"], ...exe });
const IPHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

let failed = 0;
const check = (id, name, ok, detail = "") => { console.log(`${ok ? "ok  " : "FAIL"} ${id} ${name}${detail ? ` — ${detail}` : ""}`); if (!ok) failed++; };
const settle = (page, ms = 250) => page.waitForTimeout(ms);

/** The iOS model, installed before any script of the page runs. */
const IOS_VV = () => {
  const st = { h: 0, top: 0, scale: 1, raf: null };
  const fake = new EventTarget();
  const H = () => window.innerHeight;
  Object.defineProperties(fake, {
    width: { get: () => window.innerWidth }, height: { get: () => (st.h || H()) },
    offsetTop: { get: () => st.top }, offsetLeft: { get: () => 0 },
    pageTop: { get: () => st.top }, pageLeft: { get: () => 0 }, scale: { get: () => st.scale },
    onresize: { value: null, writable: true }, onscroll: { value: null, writable: true },
  });
  Object.defineProperty(window, "visualViewport", { get: () => fake, configurable: true });
  const fire = (t) => fake.dispatchEvent(new Event(t));
  const log = [];
  window.__ios = {
    log,
    get state() { return { h: fake.height, top: st.top, innerHeight: H() }; },
    /** The keyboard of height k opens over `frames` animation frames; iOS pans by `pan` at once (0 = no reveal pan);
     *  with silentLast the final resize event is never delivered (the value changes, nothing says so). */
    open(k, { frames = 5, pan = 0, silentLast = false } = {}) {
      return new Promise((resolve) => {
        const from = fake.height, to = H() - k; let i = 0;
        if (pan) { st.top = Math.min(pan, k); fire("scroll"); }
        const step = () => {
          i++;
          st.h = Math.round(from + (to - from) * (i / frames));
          log.push(["resize", st.h, st.top]);
          if (i < frames || !silentLast) fire("resize");
          if (i < frames) requestAnimationFrame(step); else resolve();
        };
        requestAnimationFrame(step);
      });
    },
    /** The keyboard goes; the pan goes with it. */
    close({ frames = 4 } = {}) {
      return new Promise((resolve) => {
        const from = fake.height, to = H(); let i = 0;
        const step = () => { i++; st.h = Math.round(from + (to - from) * (i / frames)); if (i === frames) { st.h = 0; st.top = 0; fire("scroll"); } fire("resize"); if (i < frames) requestAnimationFrame(step); else resolve(); };
        requestAnimationFrame(step);
      });
    },
    /** The user drags: the visual viewport pans within the layout viewport, as far as the keyboard's height. */
    pan(dy) { const max = Math.max(0, H() - fake.height); st.top = Math.max(0, Math.min(Math.max(max, dy), st.top + dy)); log.push(["pan", st.top]); fire("scroll"); },
  };
  // WebKit: window.scrollTo moves the visual viewport when the layout viewport has nowhere to go
  const scrollTo = window.scrollTo.bind(window);
  window.scrollTo = (x, y) => { let top = y; if (x && typeof x === "object") top = x.top; if (top === 0 && st.top !== 0) { st.top = 0; log.push(["scrollTo0"]); fire("scroll"); } return scrollTo(typeof x === "object" ? x : x, typeof x === "object" ? undefined : y); };
  Object.defineProperty(window, "scrollY", { get: () => st.top, configurable: true });
  Object.defineProperty(window, "pageYOffset", { get: () => st.top, configurable: true });
};

async function open(width = 393, height = 852) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: IPHONE_UA });
  await ctx.addInitScript(IOS_VV);
  await ctx.addInitScript(() => Object.defineProperty(navigator, "standalone", { get: () => true }));
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const u = new URL(BASE.href); u.searchParams.set("nosw", "1"); u.searchParams.set("tour", "0");
  await page.goto(u.href, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("html[data-ready='1']", { timeout: 120000 });
  await settle(page, 300);
  return { ctx, page, errors };
}

/** Everything in visual coordinates: layout rect minus the pan. */
const geometry = (page) => page.evaluate(() => {
  const { top: pan, h: vvh } = window.__ios.state;
  const r = (sel) => { const e = document.querySelector(sel); if (!e || e.hidden || !e.getClientRects().length) return null; const b = e.getBoundingClientRect(); return { t: b.top - pan, b: b.bottom - pan, l: b.left, r: b.right }; };
  const cs = getComputedStyle(document.documentElement);
  const rows = [...document.querySelectorAll("#list .row")].map((e) => { const b = e.getBoundingClientRect(); return { t: b.top - pan, b: b.bottom - pan }; });
  return { pan, vvh, ih: innerHeight, kb: cs.getPropertyValue("--kb").trim(), vvTop: cs.getPropertyValue("--vv-top").trim(),
    top: r("#top"), dock: r("#dock"), results: r("#results"), home: r("#home"), main: r("#main"), empty: r("#home .empty, #home .prompt, #home h2, #home .empty-title"), input: r("#q"),
    rows, bestRow: rows.length ? rows.reduce((a, b) => (b.b > a.b ? b : a)) : null, scrollTop: document.getElementById("results").scrollTop, active: document.activeElement?.id || document.activeElement?.tagName };
});
const near = (a, b, tol = 1) => a != null && b != null && Math.abs(a - b) <= tol;
/** The invariants that hold whenever the keyboard is up (kb > 0) in every scenario. */
function invariants(id, label, g) {
  const panel = g.results || g.main;
  check(id, `${label}: the header's top edge is the visible top`, g.top && near(g.top.t, 0), `header top ${g.top?.t} (pan ${g.pan})`);
  check(id, `${label}: the dock's bottom edge is the keyboard's top`, g.dock && near(g.dock.b, g.vvh), `dock bottom ${g.dock?.b} keyboard top ${g.vvh} (--kb ${g.kb}, --vv-top ${g.vvTop})`);
  check(id, `${label}: the search box is on screen above the keyboard`, g.input && g.input.b <= g.vvh + 0.5 && g.input.t >= (g.top?.b ?? 0) - 0.5, `input ${g.input?.t}-${g.input?.b}`);
  check(id, `${label}: the panel between header and dock fills exactly that room`, panel && near(panel.t, g.top.b, 1.5) && near(panel.b, g.dock.t, 1.5), `panel ${panel?.t}-${panel?.b} header bottom ${g.top?.b} dock top ${g.dock?.t}`);
  if (g.results && g.scrollTop === 0) check(id, `${label}: the best match is drawn inside the results box, by the dock`, g.bestRow && g.bestRow.b <= g.results.b + 0.5 && g.bestRow.t >= g.results.t - 0.5, `best row ${g.bestRow?.t}-${g.bestRow?.b} box ${g.results?.t}-${g.results?.b}`);
}

const scenarios = [];
const scenario = (id, name, fn) => scenarios.push({ id, name, fn });

scenario("S1", "the keyboard opens without a pan: the dock rises onto it", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 400);
  invariants("S1", "open", await geometry(page));
});
scenario("S2", "iOS reveals the field by panning the page the whole keyboard height", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336, { pan: 336 })); await settle(page, 600);
  const g = await geometry(page);
  invariants("S2", "panned open", g);
  check("S2", "the app brings the pan back to zero, so nothing underneath can slide", g.pan === 0, `pan ${g.pan}`);
});
scenario("S3", "the final resize event never arrives", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336, { silentLast: true })); await settle(page, 900);
  invariants("S3", "silent final frame", await geometry(page));
});
scenario("S4", "typing shows results; the user drags and the page is panned; nothing visible moves", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 300);
  await page.type("#q", "pea"); await page.waitForSelector("#results:not([hidden]) .row", { timeout: 20000 }); await settle(page, 500);
  invariants("S4", "results up", await geometry(page));
  await page.evaluate(() => window.__ios.pan(120)); await settle(page, 400);
  const g = await geometry(page);
  invariants("S4", "after a 120px pan", g);
  check("S4", "the pan is undone at once", g.pan === 0, `pan ${g.pan}`);
  await page.evaluate(() => window.__ios.pan(336)); await settle(page, 400);
  invariants("S4", "after a pan to the limit", await geometry(page));
});
scenario("S5", "rapid typing and backspacing to nothing: home returns in place, the dock stays on the keyboard", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 300);
  await page.type("#q", "peanut butter", { delay: 20 });
  for (let i = 0; i < 13; i++) await page.keyboard.press("Backspace");
  await settle(page, 800);
  const g = await geometry(page);
  check("S5", "home is back with no results box", !g.results && !!g.main, JSON.stringify({ results: !!g.results, main: !!g.main }));
  invariants("S5", "home after backspacing", g);
  await page.evaluate(() => window.__ios.pan(200)); await settle(page, 400);
  invariants("S5", "home after a drag", await geometry(page));
});
scenario("S6", "the keyboard closes: everything returns to the screen's edges", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 300);
  await page.evaluate(() => document.activeElement.blur());
  await page.evaluate(() => window.__ios.close()); await settle(page, 500);
  const g = await geometry(page);
  check("S6", "the dock is back on the bottom edge and the header on the top", near(g.dock.b, g.ih) && near(g.top.t, 0) && g.kb === "0px" && g.vvTop === "0px", JSON.stringify({ dock: g.dock, top: g.top, kb: g.kb, vvTop: g.vvTop }));
});
scenario("S7", "the keyboard stays up while no field has the focus (the accessory bar, a stray tap): the dock still sits on it", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 300);
  await page.evaluate(() => document.activeElement.blur()); await settle(page, 300);
  invariants("S7", "keyboard up, nothing focused", await geometry(page));
});

scenario("S8", "results scrolled up, then the keyboard opens: the row under the thumb stays, nothing is pushed above the screen", async (page) => {
  await page.focus("#q"); await page.type("#q", "pea"); await page.waitForSelector("#results:not([hidden]) .row", { timeout: 20000 }); await settle(page, 400);
  await page.evaluate(() => document.activeElement.blur()); await settle(page, 200);
  const scrolled = await page.evaluate(() => { const r = document.getElementById("results"); r.scrollTop = -400; return r.scrollTop; });
  check("S8", "the list can be scrolled up away from the best match", scrolled < -100, `scrollTop ${scrolled}`);
  const anchor = () => page.evaluate(() => { const box = document.getElementById("results").getBoundingClientRect(); const row = [...document.querySelectorAll("#list .row")].filter((r) => { const b = r.getBoundingClientRect(); return b.bottom > box.top && b.top < box.bottom; }).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0]; return row ? { id: row.dataset.rank ?? row.textContent.slice(0, 30), top: Math.round(row.getBoundingClientRect().top - box.top) } : null; });
  const before = await anchor();
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 600);
  const after = await anchor();
  invariants("S8", "keyboard up over scrolled results", await geometry(page));
  check("S8", "the row the reader was on is still where it was, relative to the box", before && after && before.id === after.id && Math.abs(before.top - after.top) <= 2, JSON.stringify({ before, after }));
});
scenario("S9", "a drag on the results puts the keyboard away: the rows do not run from the finger", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336)); await settle(page, 300);
  await page.type("#q", "pea"); await page.waitForSelector("#results:not([hidden]) .row", { timeout: 20000 }); await settle(page, 400);
  await page.evaluate(() => { document.getElementById("results").scrollTop = -700; });   // further up than the keyboard is tall, so the list has room to hold the row
  const anchor = () => page.evaluate(() => { const box = document.getElementById("results").getBoundingClientRect(); const row = [...document.querySelectorAll("#list .row")].filter((r) => { const b = r.getBoundingClientRect(); return b.bottom > box.top && b.top < box.bottom; }).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0]; return row ? { id: row.textContent.slice(0, 30), top: Math.round(row.getBoundingClientRect().top - box.top) } : null; });
  const before = await anchor();
  // the drag: a touch that moves 40px (the app blurs the field after 12px); iOS then takes the keyboard down
  await page.evaluate(() => { const r = document.getElementById("results"); const t = (type, y) => r.dispatchEvent(new TouchEvent(type, { bubbles: true, touches: type === "touchend" ? [] : [new Touch({ identifier: 1, target: r, clientX: 180, clientY: y })] })); t("touchstart", 300); t("touchmove", 280); t("touchmove", 260); t("touchend", 260); });
  await settle(page, 100);
  const blurred = await page.evaluate(() => document.activeElement !== document.getElementById("q"));
  check("S9", "the drag took the focus off the field", blurred);
  await page.evaluate(() => window.__ios.close()); await settle(page, 600);
  const after = await anchor();
  const g = await geometry(page);
  check("S9", "the keyboard is gone and the dock is back on the bottom edge", near(g.dock.b, g.ih) && g.kb === "0px", JSON.stringify({ dock: g.dock, kb: g.kb }));
  check("S9", "the row the reader was on is still where it was, relative to the box", before && after && before.id === after.id && Math.abs(before.top - after.top) <= 2, JSON.stringify({ before, after }));
});
scenario("S10", "the keyboard closes but iOS leaves the page panned (iOS 26.0 left 24 px): the pan is undone", async (page) => {
  await page.focus("#q"); await settle(page, 100);
  await page.evaluate(() => window.__ios.open(336, { pan: 336 })); await settle(page, 500);
  await page.evaluate(() => document.activeElement.blur());
  await page.evaluate(() => window.__ios.close({ frames: 3 })); await page.evaluate(() => window.__ios.pan(24)); await settle(page, 600);
  const g = await geometry(page);
  check("S10", "no pan is left behind, and the dock and header sit on the screen's edges", g.pan === 0 && near(g.dock.b, g.ih) && near(g.top.t, 0), JSON.stringify({ pan: g.pan, dock: g.dock, top: g.top }));
});

for (const s of scenarios) {
  if (ONLY && !ONLY.has(s.id)) continue;
  let env = null;
  try { env = await open(); await s.fn(env.page); if (env.errors.length) check(s.id, `${s.name}: no page errors`, false, env.errors.slice(0, 2).join(" | ")); }
  catch (err) { check(s.id, `${s.name} (scenario)`, false, String(err?.message || err).split("\n")[0]); }
  finally { await env?.ctx?.close().catch(() => {}); }
}
await browser.close();
console.log(failed ? `keyboard-check: ${failed} failed (${BROWSER})` : `keyboard-check: all passed (${BROWSER})`);
process.exit(failed ? 1 : 0);
