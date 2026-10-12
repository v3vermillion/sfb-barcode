// app.js — UI controller. One screen, two ways in (type / scan), one result sheet.
// Everything heavy (index, search, lookups) lives in db-worker.js; this file only renders.

import { DbClient } from "./db-client.js";
import { classifyCode, formatGtin } from "./barcode.js";
import { resolveCode, fromItem, kindLabel, titleOf, splitTitle, sizeText, fmtNum, notesFor, livePlausible } from "./resolve.js";
import { tokenize } from "./tokenize.js";
import { stalenessLevel, stalenessText, daysSince } from "./staleness.js";

// ------------------------------------------------------------------ setup
const $ = (id) => document.getElementById(id);
const el = Object.fromEntries(["top", "main", "dock", "status", "statusText", "tallyBtn", "tallyCount", "tallyTotal", "settingsBtn", "progress", "progressBar", "stale", "home", "results", "list", "resultsMeta", "recent", "recentList", "q", "clearBtn", "scanBtn", "searchForm", "sheet", "tallySheet", "settings", "scanner", "video", "overlay", "scanClose", "torchBtn", "reticle", "scanHint", "scanTypeForm", "scanTypeInput", "scanTypeBtn", "toasts", "quick", "heroEyebrow", "readyCard", "statusLive", "tallyStrip", "tallyStripText", "tallyStripTotal"].map((k) => [k, $(k)]));

const LIVE_URL = (document.querySelector('meta[name="sfb-live-check"]')?.content || "").trim().replace(/\/$/, "");
const BUILD = document.querySelector('meta[name="sfb-build"]')?.content || "dev";
const PREFS_KEY = "sfb.prefs", TALLY_KEY = "sfb.tally", RECENT_KEY = "sfb.recent";

const readJson = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const writeJson = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } };
const prefs = Object.assign({ theme: "auto", haptics: true, live: true }, readJson(PREFS_KEY, {}));
let tally = readJson(TALLY_KEY, []);
let recent = readJson(RECENT_KEY, []);

const perf = { boot: { start: performance.now() }, keystrokes: [], scans: [], opens: [] };
const state = {
  query: "", seq: 0, last: null, codeHit: null, pending: null, sheetRes: null, qty: 1,
  scan: null, scanOpen: false, scanGen: 0, scanPausedByVisibility: false, engine: "", source: null, pendingReload: false,
  openScannerAfterSheet: false, closeScannerAfterSheet: false, focusSearchAfterSheet: false,
  stale: "fresh", staleBusy: false, persisted: undefined,
};

const db = new DbClient();
window.__sfb = { db, perf, state, prefs, resolveCode: (c, f) => resolveCode(db, c, f), openCode, openRank, openScanner, closeScanner, runSearch, version: BUILD };

// ------------------------------------------------------------------ helpers
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (cents) => (cents == null ? "—" : (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" }));
const bigMoney = (cents) => {
  if (cents == null) return `<span class="price-big is-none">No saved price</span>`;
  const d = Math.floor(cents / 100), c = String(cents % 100).padStart(2, "0");
  return `<span class="price-big">$${d.toLocaleString("en-US")}<span class="cents">.${c}</span></span>`;
};
const fmtInt = (n) => Number(n || 0).toLocaleString("en-US");
const fmtDate = (iso, long = false) => { if (!iso) return ""; const d = new Date(`${iso}T12:00:00`); return d.toLocaleDateString(undefined, long ? { month: "long", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" }); };
const fmtTime = (iso) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "" : d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }); };
const icon = (name, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const haptic = (ms = 12) => { if (prefs.haptics && navigator.vibrate) { try { navigator.vibrate(ms); } catch { /* ignore */ } } };
const priceDate = () => db.manifest?.priceDate || db.manifest?.published?.slice(0, 10) || "";
const storeLabel = () => db.manifest?.store?.label || "Strongsville Walmart";
const anyModalOpen = () => el.sheet.open || el.tallySheet.open || el.settings.open;

function highlight(text, toks) {
  const t = String(text ?? "");
  const words = toks.filter((w) => w.length >= 2 || /\d/.test(w));
  if (!words.length) return esc(t);
  const re = new RegExp(`(^|[^a-z0-9])(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  let out = "", last = 0;
  for (const m of t.matchAll(re)) {
    const start = m.index + m[1].length;
    out += esc(t.slice(last, start)) + `<mark>${esc(m[2])}</mark>`;
    last = start + m[2].length;
  }
  return out + esc(t.slice(last));
}

function toast(text, { action, onAction, ms = 4200, iconName = "check" } = {}) {
  const t = document.createElement("div");
  t.className = "toast"; t.setAttribute("role", "status");
  t.innerHTML = `${icon(iconName)}<span>${esc(text)}</span>${action ? `<button type="button">${esc(action)}</button>` : ""}`;
  t.querySelector("button")?.addEventListener("click", () => { onAction?.(); dismiss(); });
  const dismiss = () => { if (!t.isConnected) return; t.classList.add("is-out"); setTimeout(() => t.remove(), 220); };
  el.toasts.appendChild(t);
  while (el.toasts.children.length > 3) el.toasts.firstChild.remove();
  if (ms) setTimeout(dismiss, ms);
  return dismiss;
}

// ------------------------------------------------------------------ theme / viewport
function applyTheme() {
  const root = document.documentElement;
  if (prefs.theme === "auto") delete root.dataset.theme; else root.dataset.theme = prefs.theme;
  const dark = prefs.theme === "dark" || (prefs.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.content = dark ? "#0a0d0b" : "#f7f5f0"; });
}
applyTheme();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

const vv = window.visualViewport;
/** True while a text field has the focus: the only time a phone keyboard can be on screen. */
const typing = () => { const a = document.activeElement; return !!a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA"); };
function keyboardInset() {
  if (!vv) return;
  // The inset and the pan are read from the visual viewport ONLY while a text field is focused. Safari in the browser
  // (not installed) also shrinks and shifts the visual viewport when its toolbars collapse, on a rubber-band scroll and
  // after a rotation: with nothing to type into, those are not a keyboard, and following them moved the header down the
  // page and lifted the dock off the bottom. A pinch-zoomed page is not a keyboard either.
  const zoomed = vv.scale > 1.01;
  const keyboard = typing() && !zoomed;
  const inset = keyboard ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : 0;
  // iOS opens the keyboard by panning the page up (offsetTop) instead of resizing it: the fixed header and the top of the
  // results would sit above the screen, out of reach of any scroll. Everything fixed follows the visible area instead.
  const top = keyboard ? Math.max(0, Math.round(vv.offsetTop)) : 0;
  document.documentElement.style.setProperty("--kb", `${inset}px`);
  document.documentElement.style.setProperty("--vv-top", `${top}px`);
}
vv?.addEventListener("resize", keyboardInset);
vv?.addEventListener("scroll", keyboardInset);
document.addEventListener("focusin", keyboardInset);
document.addEventListener("focusout", () => setTimeout(keyboardInset, 0));
// Safari can come back from a rotation with the page left zoomed in; the only remedy is to pin the scale for one frame
const viewportMeta = document.querySelector('meta[name="viewport"]');
function resetZoomAfterRotation() {
  setTimeout(() => {
    if (!vv || !viewportMeta || vv.scale <= 1.01) return;
    const content = viewportMeta.content;
    viewportMeta.content = `${content}, maximum-scale=1`;
    requestAnimationFrame(() => { viewportMeta.content = content; keyboardInset(); });
  }, 350);
}
window.addEventListener("orientationchange", resetZoomAfterRotation);
screen.orientation?.addEventListener?.("change", resetZoomAfterRotation);

// ------------------------------------------------------------------ modal stack (dialogs + scanner share history)
// Every open pushes a history entry so the phone's Back closes the top-most layer. A close that owns the top
// entry goes through history.back() and finishes in popstate; anything that must follow a close (open the
// scanner, close the scanner, focus the search box) runs from the dialog's "closed" event, never in the same
// task as the pending back().
const modals = {
  open(dlg, html) {
    if (dlg._closeTimer) { clearTimeout(dlg._closeTimer); dlg._closeTimer = 0; dlg.classList.remove("is-closing"); if (dlg.open) dlg.close(); }
    dlg.innerHTML = html;
    if (!dlg.open) dlg.showModal();
    history.pushState({ modal: dlg.id, n: (history.state?.n || 0) + 1 }, "");
    dlg.querySelector(".sheet-inner").scrollTop = 0;
    dlg.querySelector(".x-btn")?.addEventListener("click", () => modals.close(dlg));
    grabToDismiss(dlg);
  },
  close(dlg, { fromPop = false } = {}) {
    if (!dlg.open || dlg._closeTimer) return;
    if (!fromPop && history.state?.modal === dlg.id) { history.back(); return; }   // popstate finishes the close
    const finish = () => { dlg._closeTimer = 0; dlg.classList.remove("is-closing"); if (dlg.open) dlg.close(); dlg.dispatchEvent(new CustomEvent("closed")); };
    if (matchMedia("(prefers-reduced-motion: no-preference)").matches) { dlg.classList.add("is-closing"); dlg._closeTimer = setTimeout(finish, 220); } else finish();
  },
};
for (const dlg of [el.sheet, el.tallySheet, el.settings]) {
  dlg.addEventListener("cancel", (e) => { e.preventDefault(); modals.close(dlg); });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) modals.close(dlg); });
}
window.addEventListener("popstate", () => {
  const top = history.state?.modal;
  const openDlg = [el.sheet, el.tallySheet, el.settings].find((d) => d.open && !d._closeTimer);
  if (openDlg && top !== openDlg.id) { modals.close(openDlg, { fromPop: true }); return; }
  if (state.scanOpen && top !== "scanner") closeScanner({ fromPop: true });
});
// a reload keeps the previous entry's state: never start with a stale "a modal is open" marker
if (history.state?.modal) history.replaceState(null, "", location.href);

function grabToDismiss(dlg) {
  const inner = dlg.querySelector(".sheet-inner"), grab = dlg.querySelector(".grab");
  if (!grab) return;
  let y0 = null;
  grab.addEventListener("pointerdown", (e) => { y0 = e.clientY; grab.setPointerCapture(e.pointerId); dlg.style.transition = "none"; });
  // `translate`, not `transform`: on wide screens the sheet is centred with transform: translateX(-50%)
  grab.addEventListener("pointermove", (e) => { if (y0 == null) return; const dy = Math.max(0, e.clientY - y0); dlg.style.translate = `0 ${dy}px`; });
  const end = (e) => {
    if (y0 == null) return;
    const dy = e.clientY - y0; y0 = null;
    dlg.style.transition = ""; dlg.style.translate = "";
    if (dy > 90) modals.close(dlg); else inner.scrollTop = 0;
  };
  grab.addEventListener("pointerup", end); grab.addEventListener("pointercancel", end);
}

// ------------------------------------------------------------------ status / progress
function setStatus(stateName, html) {
  const changed = el.status.dataset.state !== stateName;
  el.status.dataset.state = stateName;
  el.statusText.innerHTML = html;
  // a screen reader hears a change of state once, never every download percentage
  if (changed && el.statusLive) el.statusLive.textContent = `Prices: ${el.statusText.textContent}`;
}
function setProgress(frac) {
  if (frac == null) { el.progress.hidden = true; el.progressBar.style.width = "0"; return; }
  el.progress.hidden = false; el.progressBar.style.width = `${Math.round(Math.min(1, Math.max(0, frac)) * 100)}%`;
}
function readyText() {
  const m = db.manifest; if (!m) return "Ready";
  // the date is what a volunteer needs (the wide header says "Prices"); food and household come first, and until the
  // other departments arrive the header says so
  const more = db.storageFull ? " · storage full" : db.more ? ` · more ${navigator.onLine ? "loading" : "when online"}` : "";
  return `${navigator.onLine ? "" : "Offline · "}<span class="n">Prices </span>${esc(fmtDate(priceDate()))}${more}`;
}

/** The card at the top of the home screen: is this phone ready to price a donation, in one glance. Tapping it opens Settings. */
function renderReadyCard() {
  const c = el.readyCard; if (!c) return;
  const m = db.manifest;
  let tone = "ready", ico = "check", title = "", sub = "";
  if (m) {
    const date = fmtDate(priceDate(), true);
    title = "Prices ready"; sub = `${sourceText()} · ${date}${db.more ? " · More departments loading" : " · Works offline"}`;
    if (db.storageFull) { tone = "problem"; ico = "info"; title = "Phone storage is full"; sub = `Free about ${db.storageFull.needMB} MB to finish downloading prices.`; }
  } else if (db.state === "downloading") { tone = "busy"; ico = "refresh"; title = "Downloading prices"; sub = "A one-time download. The app works offline after this."; }
  else if (db.state === "loading" || db.state === "idle") { tone = "busy"; ico = "refresh"; title = "Opening prices"; sub = "One moment."; }
  else if (db.state === "offline-empty") { tone = "problem"; ico = "wifi-off"; title = "No prices on this phone yet"; sub = "Connect to the internet once. Prices stay on the phone after that."; }
  else { tone = "problem"; ico = "info"; title = state.dbErrorStorage ? "Phone storage is full" : state.dbErrorNetwork ? "Download interrupted" : "Prices could not be opened"; sub = state.dbErrorNetwork ? "Resumes automatically when the connection returns." : "Tap for details."; }
  c.dataset.tone = tone;
  c.innerHTML = `<span class="rc-ico">${icon(ico)}</span><span class="rc-text"><b>${esc(title)}</b><span class="sub">${esc(sub)}</span></span>${icon("back", "ico chev")}`;
}

db.addEventListener("state", (e) => {
  const d = e.detail;
  switch (d.state) {
    case "downloading": setStatus("downloading", "Downloading prices"); break;
    case "loading": setStatus("loading", "Opening prices"); break;
    case "ready": setStatus("ready", readyText()); setProgress(null); break;
    case "offline-empty": setStatus("offline", "Offline · no prices yet"); setProgress(null); if (state.query.trim()) runSearch(state.query); break;
    case "error":
      setProgress(null); state.dbError = d.message; state.dbErrorNetwork = !!d.network; state.dbErrorStorage = !!d.storage;
      if (d.network) {
        // the connection dropped mid-download: say so, and try again on our own (also on the "online" event)
        setStatus("offline", "Waiting for a connection");
        clearTimeout(state.retryTimer);
        state.retryTimer = setTimeout(() => { if (!db.version && navigator.onLine) db.start().catch(() => {}); }, 30_000);
      } else if (d.storage) setStatus("error", "Storage full · tap for details");
      else setStatus("error", "Prices unavailable · tap for details");
      if (state.query.trim()) runSearch(state.query);
      break;
  }
  renderStale();
  renderReadyCard();
});
// a full phone during a background download (other departments, a weekly update): the header says so until a later
// download succeeds; the prices already on the phone keep working
for (const ev of ["storage-full", "storage-ok"]) db.addEventListener(ev, () => { if (db.version) setStatus("ready", readyText()); renderReadyCard(); });
db.addEventListener("progress", (e) => {
  const d = e.detail;
  if (d.phase === "download") {
    setProgress(d.totalBytes ? d.doneBytes / d.totalBytes : 0);
    if (!d.background) setStatus("downloading", `Downloading prices · ${Math.round((d.doneBytes / (d.totalBytes || 1)) * 100)}%`);
  } else if (!db.version) setProgress(0.9 + 0.1 * (d.done / d.total));
});
db.addEventListener("ready", () => {
  performance.mark("sfb:db-ready");
  perf.boot.dbReadyMs = Math.round(performance.now());
  perf.boot.loadMs = db.stats?.loadMs; perf.boot.wallMs = db.stats?.wallMs; perf.boot.downloadMs = db.stats?.downloadMs ?? null;
  requestAnimationFrame(() => { performance.mark("sfb:interactive"); perf.boot.interactiveMs = Math.round(performance.now()); document.documentElement.dataset.ready = "1"; });
  pruneRecent();
  dropSampleLines();
  if (state.query.trim()) runSearch(state.query);
  if (new URLSearchParams(location.search).get("scan") === "1" && !state.scanOpen) { history.replaceState(null, "", location.pathname); openScanner(); }
});
db.addEventListener("more", () => {
  // the other departments joined the search: refresh the header and whatever is on screen
  setProgress(null);
  if (db.version) setStatus("ready", readyText());
  renderReadyCard();
  if (state.query.trim()) runSearch(state.query);
  if (el.settings.open) refreshSettings();
});
db.addEventListener("more-paused", () => { setProgress(null); if (db.version) setStatus("ready", readyText()); renderReadyCard(); });
db.addEventListener("progress", (e) => {
  const d = e.detail;
  if (d.phase === "download" && d.tier === "more" && db.version) setStatus("ready", `${readyText()} ${Math.round((d.doneBytes / (d.totalBytes || 1)) * 100)}%`);
});
db.addEventListener("update-available", () => { setProgress(null); maybeApplyPending(true); });
/** Apply a downloaded snapshot when nothing is in progress; otherwise offer it once and retry at the next idle moment. */
function maybeApplyPending(offer = false) {
  if (!db.pendingUpdate) return;
  const idle = !anyModalOpen() && !state.scanOpen && !state.query.trim();
  const apply = () => db.applyUpdate().then(() => { setStatus("ready", readyText()); toast(`Prices updated to ${fmtDate(db.manifest?.priceDate, true)}`); }).catch(() => toast("Could not switch to the new prices. The saved prices remain in use.", { iconName: "info" }));
  if (idle) apply();
  else if (offer) toast("Newer prices are ready", { action: "Use now", onAction: apply, ms: 8000, iconName: "refresh" });
}
window.addEventListener("online", () => {
  if (db.version) setStatus("ready", readyText());
  renderStale();
  (db.version ? db.checkForUpdate() : db.start()).catch(() => {});
});
window.addEventListener("offline", () => { if (db.version) setStatus("ready", readyText()); renderStale(); toast("Offline · scanning and search still work", { iconName: "wifi-off" }); });
// an installed app (Android's "Add to Home screen") is what makes Chrome grant persistent storage: ask again right then
window.addEventListener("appinstalled", () => { db.requestPersistence({ force: true }).catch(() => {}); hideInstallHint(); });

// ------------------------------------------------------------------ "Add to Home Screen" (first runs, in the browser)
// Safari deletes a website's saved data after about a week without a visit; an app on the Home Screen keeps its prices.
// Android's Chrome offers its own install prompt, kept here and shown as a button.
const INSTALL_KEY = "sfb.installHint";
const standalone = () => navigator.standalone === true || matchMedia("(display-mode: standalone)").matches;
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
let installPrompt = null;
function hideInstallHint() { const h = $("installHint"); if (h) { h.hidden = true; h.innerHTML = ""; } }
function showInstallHint() {
  const h = $("installHint");
  if (!h || standalone() || readJson(INSTALL_KEY, null)?.dismissed) return;
  if (!isIOS && !installPrompt) return;
  const how = isIOS
    ? `Tap ${icon("share")} <b>Share</b>, then <b>Add to Home Screen</b>. The app opens full screen and keeps its prices.`
    : "Opens full screen and keeps its prices on the phone.";
  h.innerHTML = `<span class="rc-ico">${icon(isIOS ? "share" : "plus")}</span><div><b>${isIOS ? "Add to Home Screen" : "Install the app"}</b><span class="sub">${how}</span></div>${installPrompt ? `<button class="btn btn--sm" type="button" data-act="install">Install</button>` : ""}<button class="x-btn" type="button" data-act="dismiss" aria-label="Don't show again">${icon("x")}</button>`;
  h.hidden = false;
}
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installPrompt = e; showInstallHint(); });
$("installHint")?.addEventListener("click", async (e) => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (act === "install" && installPrompt) { const p = installPrompt; installPrompt = null; p.prompt(); const r = await p.userChoice.catch(() => null); if (r?.outcome === "accepted") hideInstallHint(); else showInstallHint(); }
  if (act === "dismiss") { writeJson(INSTALL_KEY, { dismissed: Date.now() }); hideInstallHint(); }
});

// ------------------------------------------------------------------ prices-as-of banner (amber from 14 days, red from 45)
// Sits under the header, above the content; the dock never moves. Re-evaluated on every database state change,
// when the app comes back to the foreground, when the network comes and goes, and once an hour for a phone left open.
let staleHtml = "";
function renderStale() {
  const date = priceDate();
  const level = db.version ? stalenessLevel(date) : "fresh";
  state.stale = level;
  el.status.dataset.stale = level;
  if (level === "fresh") {
    if (!el.stale.hidden) { el.stale.hidden = true; el.stale.innerHTML = ""; staleHtml = ""; }
    syncBannerInset();
    return;
  }
  const hint = navigator.onLine ? "" : " Connect to the internet, then tap Update now.";
  const html = `${icon("clock")}<div class="stale-text"><b>${esc(stalenessText(level, daysSince(date)))}</b><span>Checked ${esc(fmtDate(date, true))}.${hint}</span></div><button class="btn btn--sm" type="button" data-act="update"${state.staleBusy ? " disabled" : ""}>${state.staleBusy ? "Checking…" : "Update now"}</button>`;
  // only touch the DOM when the words change: a re-render would drop focus from the button
  if (html !== staleHtml) { el.stale.innerHTML = html; staleHtml = html; }
  el.stale.dataset.level = level;
  el.stale.hidden = false;
  syncBannerInset();
}
/** The banner is fixed under the header, so the content below is pushed down by its measured height (0 when hidden). */
function syncBannerInset() { document.documentElement.style.setProperty("--banner-h", el.stale.hidden ? "0px" : `${el.stale.offsetHeight}px`); }
if ("ResizeObserver" in window) new ResizeObserver(syncBannerInset).observe(el.stale);
el.stale.addEventListener("click", (e) => { if (e.target.closest("[data-act=update]")) checkNow(); });
document.addEventListener("visibilitychange", () => { if (!document.hidden) renderStale(); });
setInterval(renderStale, 3600_000);

/** Settings' "Check for new prices" and the banner's "Update now" share one path: check, download, apply, say what happened. */
async function checkNow(btn = null) {
  if (!navigator.onLine) { toast("Offline · will check when the connection returns", { iconName: "wifi-off" }); return; }
  if (state.staleBusy) { toast("Already checking"); return; }
  const wasStale = state.stale !== "fresh";
  state.staleBusy = true; if (btn) btn.disabled = true; renderStale();
  const d = toast("Checking for new prices", { ms: 0, iconName: "refresh" });
  try {
    const r = await db.checkForUpdate({ apply: true });
    d();
    toast(r.upToDate ? (wasStale ? "No newer prices have been published yet" : "Prices are up to date") : r.applied || r.installed ? `Prices as of ${fmtDate(priceDate(), true)}` : r.busy ? "Already checking" : "No newer prices yet");
    if (db.version) setStatus("ready", readyText());
    if (el.settings.open) refreshSettings();
  } catch (err) { d(); toast(`Could not check: ${err.message}`, { iconName: "info" }); }
  finally { state.staleBusy = false; if (btn?.isConnected) btn.disabled = false; renderStale(); }
}

// ------------------------------------------------------------------ search
el.q.addEventListener("input", () => {
  const q = el.q.value;
  el.clearBtn.hidden = !q;
  state.query = q;
  if (!q.trim()) { showHome(); return; }
  cancelMore();
  runSearch(q);
});
el.clearBtn.addEventListener("click", () => { el.q.value = ""; el.clearBtn.hidden = true; state.query = ""; showHome(); el.q.focus(); });
el.searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = el.q.value.trim();
  if (!q) return;
  // a keyboard-wedge scanner types digits + Enter faster than the worker answers: resolve the text itself
  if (classifyCode(q).kind !== "text") { openCode(q, { source: "typed" }); return; }
  if (state.pending) await state.pending;              // make sure the rows belong to this query
  if (state.query.trim() !== q) return;
  const first = state.last?.items?.[0];
  if (first) openRank(first.rank, { closest: !!state.last.relaxed });
});
el.quick.addEventListener("click", (e) => {
  const b = e.target.closest("[data-q]"); if (!b) return;
  el.q.value = b.dataset.q; el.q.dispatchEvent(new Event("input")); el.q.focus({ preventScroll: true });
});

function showHome() {
  state.seq++;
  el.results.hidden = true; el.home.hidden = false;
  el.list.innerHTML = ""; el.resultsMeta.textContent = "";
  state.last = null; state.codeHit = null; state.pending = null; state.shownQuery = null;
  renderRecent();
  homeToTop();
  maybeApplyPending();
}
/** Home reads top-down (status, tally, headline, common items, Recent) and always comes back at the top. */
function homeToTop() { requestAnimationFrame(() => { if (!el.home.hidden) window.scrollTo(0, 0); }); }
/** The best match sits at the bottom of the bottom-anchored results. scrollHeight lands there whether the engine counts
 *  a column-reverse scroller's offset from the bottom (0, negative upward) or from the top. */
function resultsToBest() { el.results.scrollTop = el.results.scrollHeight; }

async function runSearch(q) {
  const t0 = performance.now();
  const seq = ++state.seq;
  state.last = null; state.codeHit = null;
  if (!db.version) {
    el.home.hidden = true; el.results.hidden = false;
    const msg = db.state === "offline-empty" ? "Prices have not been downloaded yet. Connect to the internet once; they stay on this phone."
      : db.state === "error" && state.dbErrorNetwork ? "The download was interrupted. It resumes automatically when the phone is back online."
      : db.state === "error" ? "Prices could not be opened. Open Settings and tap Check for new prices." : "Opening prices";
    el.list.innerHTML = `<li class="empty">${msg}</li>`;
    el.resultsMeta.textContent = "";
    state.shownQuery = null; resultsToBest();
    return;
  }
  const cls = classifyCode(q);
  const p = Promise.all([db.search(q, 40), cls.kind === "text" ? null : resolveCode(db, q).catch(() => null)]);
  state.pending = p;
  const [res, code] = await p;
  if (seq !== state.seq) return;       // a newer keystroke won
  const t1 = performance.now();
  state.last = res; state.codeHit = code; state.pending = null;
  renderResults(res, code, q);
  const t2 = performance.now();
  requestAnimationFrame(() => perf.keystrokes.push({ q, workerMs: res.ms, roundtripMs: Math.round((t1 - t0) * 10) / 10, renderMs: Math.round((t2 - t1) * 10) / 10, totalMs: Math.round((performance.now() - t0) * 10) / 10, n: res.items.length }));
}

function rowHtml(it, toks) {
  const { pre, brand, rest } = splitTitle(it);
  const title = brand ? `${highlight(pre, toks)}<b>${highlight(brand, toks)}</b>${highlight(rest, toks)}` : highlight(rest, toks);
  const tags = [sizeText(it), it.pack > 1 ? `Pack of ${it.pack}` : "", it.storeBrand ? "Store brand" : "", it.retired ? "Older barcode" : "", it.unavailable ? "Out of stock when checked" : ""].filter(Boolean);
  const sub = it.basis === "lb" ? "<small>per lb</small>" : it.pack > 1 ? `<small>${money(Math.round(it.priceCents / it.pack))} each</small>` : "";
  const value = it.priceWithheld ? `<small>Equivalent value</small>` : sub;
  return `<li><button class="row${it.retired ? " is-retired" : ""}" type="button" data-rank="${it.rank}"><span class="name">${title}</span><span class="price">${money(it.priceCents)}${value}</span><span class="meta">${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span></button></li>`;
}
function codeRowHtml(res) {
  const sub = res.unit === "lb" ? "<small>per lb</small>" : "";
  return `<li><button class="row row--code" type="button" data-code="${esc(res.code)}"><span class="name"><span class="kind" data-kind="${res.kind}">${esc(kindLabel(res))}</span><span class="code-title">${esc(res.title)}</span></span><span class="price">${money(res.priceCents)}${sub}</span><span class="meta"><span class="tag mono">${esc(res.gtin ? formatGtin(res.gtin) : res.code)}</span></span></button></li>`;
}

const FIRST_ROWS = 12;   // painted synchronously (more than a phone screen); the rest arrive on the next idle slice
let moreTimer = 0;
function cancelMore() { if (!moreTimer) return; ("cancelIdleCallback" in window ? cancelIdleCallback : clearTimeout)(moreTimer); moreTimer = 0; }
function renderResults(res, code, q) {
  const entering = el.results.hidden;
  el.home.hidden = true; el.results.hidden = false;
  const toks = tokenize(q);
  // a number that is a priced code is shown as the first row; an unknown code is not shouted over real matches
  const showCode = code && (code.priceCents != null || !res.items.length);
  let html = showCode ? codeRowHtml(code) : "";
  const first = res.items.slice(0, FIRST_ROWS), rest = res.items.slice(FIRST_ROWS);
  for (const it of first) html += rowHtml(it, toks);
  if (!html) html = `<li class="empty">No results for <b>${esc(q)}</b>. Try fewer words, the brand name, or scan the barcode.</li>`;
  el.list.innerHTML = html;
  cancelMore();
  if (rest.length) {
    const seq = state.seq;
    const append = () => { moreTimer = 0; if (seq !== state.seq) return; el.list.insertAdjacentHTML("beforeend", rest.map((it) => rowHtml(it, toks)).join("")); };
    // the remaining rows arrive when the main thread is idle, so a fast typist never pays for them between keystrokes
    moreTimer = "requestIdleCallback" in window ? requestIdleCallback(append, { timeout: 400 }) : setTimeout(append, 150);
  }
  let meta = "";
  if (res.notReady) meta = "Opening prices";
  else if (res.items.length) {
    meta = `<b>${fmtInt(res.total)}</b> ${res.total === 1 ? "match" : "matches"} · best match nearest the search box`;
    if (res.fuzzy) meta += " · spelling adjusted";
    if (res.relaxed) meta = `<span class="warn">Closest matches</span> · no item had every word${res.dropped?.length ? ` (“${esc(res.dropped.join(" "))}” ignored)` : ""}`;
  }
  el.resultsMeta.innerHTML = meta;
  // a new or refined query starts at its best match; the same query re-run (the database finished opening, more
  // departments arrived) keeps the volunteer where they had scrolled to
  if (entering || state.shownQuery !== q) resultsToBest();
  state.shownQuery = q;
  if (entering) { el.list.classList.add("is-entering"); clearTimeout(state.enterTimer); state.enterTimer = setTimeout(() => el.list.classList.remove("is-entering"), 600); }
}

el.list.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-rank], button[data-code]"); if (!b) return;
  if (b.dataset.code != null) { if (state.codeHit) openResolution(state.codeHit, { source: "typed" }); return; }
  openRank(Number(b.dataset.rank), { closest: !!state.last?.relaxed });
});

async function openRank(rank, { closest = false, source = "search" } = {}) {
  const item = await db.item(rank);
  if (!item) return;
  openResolution(fromItem(item, { closest, query: state.query, dropped: state.last?.dropped || [] }), { source });
}
async function openCode(raw, { source = "typed", format, scanned = false, preferId = null } = {}) {
  const res = await resolveCode(db, raw, format, { scanned, preferId });
  if (!res) { toast("That is not a barcode number", { iconName: "info" }); return null; }
  openResolution(res, { source });
  return res;
}

// ------------------------------------------------------------------ result sheet
function unitCents(res) { return res.unitCents ?? res.priceCents; }
function lineTotal(res) { return Math.round(unitCents(res) * state.qty); }

function sheetHtml(res) {
  const it = res.item;
  const label = kindLabel(res);
  const basis = res.priceCents == null ? "" : res.unit === "lb" ? "per lb" : res.kind === "store-label" ? "on the label" : it && it.pack > 1 ? (res.unitCents != null && res.unitCents !== res.priceCents ? `1 of ${it.pack}` : "whole pack") : "each";
  const chips = [];
  if (it && (res.kind === "exact" || res.kind === "closest")) {
    const s = sizeText(it); if (s) chips.push(s);
    if (it.pack > 1) chips.push(`Pack of ${it.pack}`);
    if (it.catName) chips.push(it.catName);
    if (it.storeBrand) chips.push("Store brand");
  }
  if (res.kind === "plu") { chips.push(`PLU ${res.code}`); chips.push(res.unit === "lb" ? "Sold by weight" : "Sold each"); }
  if (res.kind === "equivalent") { const e = res.equiv; if (e.quantity) chips.push(e.quantity); chips.push(e.confidence === "high" ? "Close match" : e.confidence === "medium" ? "Fair match" : e.confidence === "rough" ? "Rough estimate" : "Rough match"); }
  if (res.kind === "store-label") chips.push(res.label.verified ? "Price read from the label" : res.label.needsConfirm ? "Check against the label" : "Price digits checked");
  if (res.gtin && res.kind !== "plu" && res.kind !== "unknown" && res.kind !== "not-ready") chips.push(`<span class="mono">${esc(formatGtin(res.gtin))}</span>`);
  const notes = notesFor(res, { priceDateLong: fmtDate(priceDate(), true) });
  const title = res.kind === "exact" || res.kind === "closest" ? boldTitle(it) : res.kind === "live" ? boldTitle({ brand: res.brand, name: res.name }) : esc(res.title);
  const checked = res.kind === "live" ? `${liveSource(res.live)} price, checked ${res.live?.checkedAt ? `at ${fmtTime(res.live.checkedAt)}` : "today"}`
    : res.kind === "store-label" ? "Price read from the store's scale label"
    : res.kind === "plu" && res.entry.source === "typical" ? "Typical Walmart price"
    : res.kind === "not-ready" ? "Prices are still opening"
    : res.priceCents == null ? "No price on file for this barcode"
    : res.livePrice != null ? `${liveSource(res.live)} price, checked ${res.live?.checkedAt ? `at ${fmtTime(res.live.checkedAt)}` : "today"}`
    : it?.storePrice ? `${storeLabel()} shelf price, as of ${fmtDate(priceDate(), true)}`
    : `Walmart.com price, checked ${fmtDate(priceDate(), true)}`;

  // a loose single from a multipack is an exact item too: let the volunteer price one of the pack
  const packSeg = it && it.pack > 1 && res.unit !== "lb" && res.priceCents != null
    ? `<div class="seg pack-seg" role="group" aria-label="Price the whole pack or one item"><button type="button" data-pack="whole" aria-pressed="${res.unitCents == null || res.unitCents === res.priceCents}">Whole pack · ${money(res.priceCents)}</button><button type="button" data-pack="one" aria-pressed="${res.unitCents != null && res.unitCents !== res.priceCents}">1 of ${it.pack} · ${money(Math.round(res.priceCents / it.pack))}</button></div>`
    : "";
  const liveRow = (LIVE_URL && prefs.live && res.gtin && res.kind !== "store-label" && res.kind !== "plu" && res.kind !== "not-ready") ? `<div class="live-row" data-state="idle" hidden></div>` : "";

  const stepper = res.priceCents == null ? "" : res.unit === "lb"
    ? `<div class="stepper" role="group" aria-label="Weight"><button class="st-btn" type="button" data-step="-0.25" aria-label="Less weight">${icon("minus")}</button><span class="st-val counting" aria-live="polite" aria-atomic="true"><span id="qtyVal">${fmtNum(state.qty)}</span> <small>lb</small></span><button class="st-btn" type="button" data-step="0.25" aria-label="More weight">${icon("plus")}</button></div>`
    : `<div class="stepper" role="group" aria-label="Quantity"><button class="st-btn" type="button" data-step="-1" aria-label="One fewer">${icon("minus")}</button><span class="st-val counting" aria-live="polite" aria-atomic="true"><span id="qtyVal">${state.qty}</span> <small>${state.qty === 1 ? "item" : "items"}</small></span><button class="st-btn" type="button" data-step="1" aria-label="One more">${icon("plus")}</button></div>`;

  const primary = res.kind === "not-ready"
    ? `<button class="btn btn--accent btn--block" type="button" data-act="close">Try again in a moment</button>`
    : res.priceCents == null
      ? `<button class="btn btn--accent btn--block" type="button" data-act="find">${icon("search")} Find it by name</button>`
      : res.kind === "store-label" && res.label.needsConfirm
        ? `<button class="btn btn--accent btn--block" type="button" data-act="add" autofocus>${icon("check")} Confirm <span id="addTotal" class="counting">${money(lineTotal(res))}</span> and add to tally</button>`
        : `<button class="btn btn--accent btn--block" type="button" data-act="add" autofocus>${icon("receipt")} Add <span id="addTotal" class="counting">${money(lineTotal(res))}</span> to tally</button>`;
  const secondary = state.source === "scan"
    ? `<button class="btn btn--ghost" type="button" data-act="scan">${icon("scan")} Scan next</button><button class="btn btn--ghost" type="button" data-act="close">Done scanning</button>`
    : `<button class="btn btn--ghost" type="button" data-act="scan">${icon("scan")} Scan</button><button class="btn btn--ghost" type="button" data-act="close">Back to search</button>`;

  const also = res.others?.length ? `<section class="also"><h2 class="h2">Same barcode, other listings</h2><ol class="list list--compact">${res.others.map((o) => rowHtml(o, [])).join("")}</ol></section>` : "";
  const basisCard = res.kind === "equivalent" && res.equiv.basis ? basisCardHtml("Priced from this Walmart item", res.equiv.basis)
    : res.kind === "plu" && res.item ? basisCardHtml("Priced from this Walmart listing", res.item) : "";

  const facts = [];
  if (res.gtin && res.kind !== "not-ready") facts.push(["Barcode", `<span class="mono">${esc(formatGtin(res.gtin))}</span>`]);
  if (it) {
    facts.push(["Walmart item", esc(String(it.id))]);
    if (it.catName) facts.push(["Department", esc(it.catName)]);
  }
  facts.push(["Prices as of", esc(fmtDate(priceDate(), true) || "—")]);

  return `<div class="sheet-inner">
    <div class="grab" aria-hidden="true"></div>
    <div class="sheet-head"><span class="kind" data-kind="${esc(res.kind)}">${esc(label)}</span><button class="x-btn" type="button" aria-label="Close">${icon("x")}</button></div>
    <div class="price-block">${bigMoney(res.priceCents == null ? null : unitCents(res))}${basis ? `<span class="price-basis">${basis}</span>` : ""}</div>
    <p class="price-note">${esc(checked)}</p>
    <h2 class="item-title" id="sheetTitle">${title}</h2>
    ${chips.length ? `<div class="chips">${chips.map((c) => `<span class="t">${c}</span>`).join("")}</div>` : ""}
    ${notes.map((n) => `<p class="note${n.tone ? ` note--${n.tone}` : ""}">${esc(n.text)}</p>`).join("")}
    ${liveRow}
    ${packSeg}
    ${stepper}
    <div class="actions">${primary}${secondary}</div>
    ${basisCard}${also}
    <ul class="facts">${facts.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join("")}</ul>
  </div>`;
}

function boldTitle(item) {
  const { pre, brand, rest } = splitTitle(item);
  return brand ? `${esc(pre)}<b>${esc(brand)}</b>${esc(rest)}` : esc(rest);
}
function basisCardHtml(heading, item) {
  return `<section class="also"><h2 class="h2">${esc(heading)}</h2><button class="basis-card" type="button" data-rank="${item.rank}"><span><span class="name">${boldTitle(item)}</span><span class="sub">${esc([sizeText(item), item.pack > 1 ? `Pack of ${item.pack}` : ""].filter(Boolean).join(" · ") || item.catName || "")}</span></span><span class="price">${money(item.priceCents)}${item.basis === "lb" ? "<small>per lb</small>" : ""}</span></button></section>`;
}

function openResolution(res, { source = "search" } = {}) {
  const t0 = performance.now();
  state.sheetRes = res; state.source = source; state.qty = 1;
  modals.open(el.sheet, sheetHtml(res));
  wireSheet(el.sheet, res);
  pushRecent(res);
  requestAnimationFrame(() => perf.opens.push({ kind: res.kind, source, ms: Math.round((performance.now() - t0) * 10) / 10 }));
  if (res.priceCents != null) haptic(8);
  liveCheck(res).catch(() => {});
}
function rerenderSheet(res) {
  state.sheetRes = res;
  el.sheet.innerHTML = sheetHtml(res);
  el.sheet.querySelector(".x-btn")?.addEventListener("click", () => modals.close(el.sheet));
  grabToDismiss(el.sheet); wireSheet(el.sheet, res);
  el.sheet.querySelector(".sheet-inner").scrollTop = 0;
}
function refreshPrice(dlg, res) {
  const pb = dlg.querySelector(".price-block");
  if (pb) pb.innerHTML = `${bigMoney(unitCents(res))}<span class="price-basis">${res.unit === "lb" ? "per lb" : res.item && res.item.pack > 1 ? (res.unitCents != null && res.unitCents !== res.priceCents ? `1 of ${res.item.pack}` : "whole pack") : "each"}</span>`;
  const tot = dlg.querySelector("#addTotal"); if (tot) tot.textContent = money(lineTotal(res));
  const add = dlg.querySelector("[data-act=add]"); if (add) add.setAttribute("aria-label", `Add ${money(lineTotal(res))} to tally`);
}

function wireSheet(dlg, res) {
  dlg.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => {
    const step = Number(b.dataset.step);
    const min = res.unit === "lb" ? 0.25 : 1, max = res.unit === "lb" ? 200 : 99;
    state.qty = Math.min(max, Math.max(min, Math.round((state.qty + step) * 100) / 100));
    const v = dlg.querySelector("#qtyVal"); if (v) v.textContent = res.unit === "lb" ? fmtNum(state.qty) : String(state.qty);
    const small = v?.nextElementSibling; if (small && res.unit !== "lb") small.textContent = state.qty === 1 ? "item" : "items";
    refreshPrice(dlg, res);
    haptic(5);
  }));
  dlg.querySelectorAll("[data-pack]").forEach((b) => b.addEventListener("click", () => {
    res.unitCents = b.dataset.pack === "one" ? Math.round(res.priceCents / res.item.pack) : res.priceCents;
    res.packOne = b.dataset.pack === "one";
    dlg.querySelectorAll("[data-pack]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    refreshPrice(dlg, res);
    haptic(5);
  }));
  dlg.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
    const act = b.dataset.act;
    if (act === "add") { addToTally(res); if (state.source !== "scan") { el.q.value = ""; el.clearBtn.hidden = true; state.query = ""; showHome(); } modals.close(dlg); }
    else if (act === "scan") { if (!state.scanOpen) state.openScannerAfterSheet = true; modals.close(dlg); }
    else if (act === "find") { if (state.scanOpen) state.closeScannerAfterSheet = true; state.focusSearchAfterSheet = true; el.q.value = ""; state.query = ""; showHome(); el.q.placeholder = "Type the name and size from the label"; modals.close(dlg); }
    else if (act === "close") { if (state.scanOpen && state.source === "scan") state.closeScannerAfterSheet = true; modals.close(dlg); }
  }));
  dlg.querySelectorAll("[data-rank]").forEach((b) => b.addEventListener("click", async () => {
    const item = await db.item(Number(b.dataset.rank));
    if (item) { const r = fromItem(item); state.qty = 1; rerenderSheet(r); liveCheck(r).catch(() => {}); }
  }));
}
el.sheet.addEventListener("closed", () => {
  if (state.closeScannerAfterSheet) { state.closeScannerAfterSheet = false; closeScanner(); }
  else if (state.openScannerAfterSheet) { state.openScannerAfterSheet = false; openScanner(); return; }
  else if (state.scanOpen) { if (el.scanTypeForm.hidden) resumeScan(); return; }
  if (state.focusSearchAfterSheet || !state.scanOpen) { state.focusSearchAfterSheet = false; el.q.focus({ preventScroll: true }); }
  maybeApplyPending();
});
el.tallySheet.addEventListener("closed", () => maybeApplyPending());
el.settings.addEventListener("closed", () => maybeApplyPending());

// ------------------------------------------------------------------ live Walmart check (public, rate-limited Worker route; no token in the client)
const liveSource = (j) => (j?.priceSource === "store" ? storeLabel() : "Walmart.com");
async function liveCheck(res) {
  const row = el.sheet.querySelector(".live-row");
  if (!row || !LIVE_URL || !prefs.live || !res.gtin) return;
  if (!navigator.onLine) { row.hidden = false; row.dataset.state = "off"; row.innerHTML = `${icon("wifi-off")}<span>Offline · showing the saved price</span>`; return; }
  row.hidden = false; row.dataset.state = "checking";
  row.innerHTML = `${icon("refresh")}<span>Checking the current Walmart price</span>`;
  const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 8000);
  const unavailable = () => { row.dataset.state = "error"; row.innerHTML = `${icon("info")}<span>Live price check unavailable. Showing the saved price.</span>`; };
  try {
    const r = await fetch(`${LIVE_URL}/v1/price/${res.gtin}`, { signal: ctrl.signal, headers: { accept: "application/json" }, cache: "no-store" });
    clearTimeout(timer);
    if (state.sheetRes !== res || !el.sheet.open) return;
    if (r.status === 429) { row.dataset.state = "error"; row.innerHTML = `${icon("info")}<span>Live price check is busy. Showing the saved price.</span>`; return; }
    const j = await r.json().catch(() => null);
    if (r.status >= 500 || !j) { unavailable(); return; }
    if (!r.ok || !j.ok) {
      if (j?.reason === "not found" || j?.reason === "not sold by walmart") { row.dataset.state = "none"; row.innerHTML = `${icon("info")}<span>Walmart.com has no current price for this barcode.</span>`; }
      else unavailable();
      return;
    }
    // several listings can share a barcode: compare with the one on screen when the route lists them
    const listing = (j.listings || []).find((l) => res.item && String(l.itemId) === String(res.item.id)) || j;
    const live = Math.round(Number(listing.price) * 100);
    if (!Number.isFinite(live)) throw new Error("bad price");
    const when = j.checkedAt ? `at ${fmtTime(j.checkedAt)}` : "today";
    const src = liveSource(j);
    // the same sanity the pipeline applies to saved prices: a feed error never reaches a tally
    const verdict = livePlausible(live, res.kind === "unknown" ? null : res.priceCents);
    if (verdict !== "ok") {
      row.dataset.state = "none";
      row.innerHTML = `${icon("info")}<span>${esc(src)} lists <b>${money(live)}</b> right now, which ${verdict === "far" ? "is far from the saved price" : "is not a believable price"}. ${res.kind === "unknown" ? "Find it by name instead." : "The saved price is kept."}</span>`;
      return;
    }
    if (res.kind === "unknown") {
      // the saved database didn't know it, Walmart does: show the live listing as the result
      const lr = { ...res, kind: "live", priceCents: live, name: j.name || "Walmart item", brand: j.brand || "", title: [j.brand, j.name].filter(Boolean).join(" "), live: j, key: `v:${res.gtin}` };
      state.qty = 1;
      rerenderSheet(lr);
      const r2 = el.sheet.querySelector(".live-row"); if (r2) { r2.hidden = false; r2.dataset.state = "ok"; r2.innerHTML = `${icon("bolt")}<span>Found at ${esc(src)}, checked ${when}${j.stock ? ` · ${esc(j.stock)}` : ""}</span>`; }
      pushRecent(lr); haptic(8);
      return;
    }
    const diff = live - res.priceCents;
    row.dataset.state = "ok";
    if (diff === 0) row.innerHTML = `${icon("bolt")}<span>${esc(src)} ${when}: <b>${money(live)}</b> · matches the saved price</span>`;
    else {
      row.innerHTML = `${icon("bolt")}<span>${esc(src)} ${when}: <b>${money(live)}</b></span><span class="delta ${diff > 0 ? "up" : "down"}">${diff > 0 ? "+" : "−"}${money(Math.abs(diff))}</span><button class="btn btn--ghost btn--sm" type="button">Use it</button>`;
      row.querySelector("button").addEventListener("click", () => {
        res.priceCents = live; res.livePrice = live; res.live = j;
        if (res.packOne && res.item?.pack > 1) res.unitCents = Math.round(live / res.item.pack); else res.unitCents = live;
        refreshPrice(el.sheet, res);
        const pn = el.sheet.querySelector(".price-note"); if (pn) pn.textContent = `${src} price, checked ${when}`;
        row.innerHTML = `${icon("check")}<span>Using the ${esc(src)} price, <b>${money(live)}</b></span>`;
      });
    }
  } catch {
    clearTimeout(timer);
    if (state.sheetRes !== res) return;
    unavailable();
  }
}

// ------------------------------------------------------------------ tally
function renderTallyPill() {
  const count = tally.reduce((a, t) => a + (t.unit === "lb" ? 1 : t.qty), 0);
  const total = tally.reduce((a, t) => a + t.cents, 0);
  el.tallyBtn.hidden = tally.length === 0;
  el.tallyCount.textContent = String(count);
  el.tallyTotal.textContent = money(total);
  el.tallyBtn.setAttribute("aria-label", `Tally: ${count} ${count === 1 ? "item" : "items"}, ${money(total)}`);
  if (el.tallyStrip) {
    el.tallyStripText.textContent = tally.length ? `Tally · ${count} ${count === 1 ? "item" : "items"}` : "Tally is empty";
    el.tallyStripTotal.textContent = money(total);
    el.tallyStrip.dataset.empty = String(tally.length === 0);
  }
}
function addToTally(res) {
  const cents = lineTotal(res);
  const base = res.kind === "exact" || res.kind === "closest" ? titleOf(res.item) : res.title;
  const title = res.packOne && res.item?.pack > 1 ? `${base} (1 of ${res.item.pack})` : base;
  tally.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title, unitCents: unitCents(res), qty: state.qty, unit: res.unit, kind: res.kind, cents, at: Date.now(), key: res.key, ...(db.manifest?.fixture ? { sample: true } : {}) });
  writeJson(TALLY_KEY, tally);
  renderTallyPill();
  haptic(15);
  toast(`Added ${money(cents)} · tally ${money(tally.reduce((a, t) => a + t.cents, 0))}`, { action: "View", onAction: openTally, ms: 2600 });
}
function tallyHtml() {
  const total = tally.reduce((a, t) => a + t.cents, 0);
  const rows = tally.slice().reverse().map((t) => `<li><span class="tn">${esc(t.title)}<small>${t.unit === "lb" ? `${fmtNum(t.qty)} lb × ${money(t.unitCents)}` : `${t.qty} × ${money(t.unitCents)}`} · ${esc(kindLabel({ kind: t.kind }))}</small></span><span class="tp">${money(t.cents)}</span><button class="x-btn" type="button" data-remove="${t.id}" aria-label="Remove ${esc(t.title)}">${icon("trash")}</button></li>`).join("");
  return `<div class="sheet-inner"><div class="grab" aria-hidden="true"></div>
    <div class="sheet-head"><h2 class="h2" id="tallyTitle">Tally</h2><button class="x-btn" type="button" aria-label="Close">${icon("x")}</button></div>
    ${tally.length ? `<ul class="tally-list">${rows}</ul>` : `<p class="empty">The tally is empty. Open an item and tap <b>Add to tally</b>.</p>`}
    <div class="tally-total-row"><span>${tally.length} ${tally.length === 1 ? "line" : "lines"}</span><b class="counting">${money(total)}</b></div>
    <div class="actions"><button class="btn btn--accent" type="button" data-act="share" ${tally.length ? "" : "disabled"}>${icon("share")} Share</button><button class="btn btn--danger" type="button" data-act="clear" ${tally.length ? "" : "disabled"}>${icon("trash")} Clear</button></div>
    <p class="fine">Stays on this phone until cleared. Totals use Walmart prices as of ${esc(fmtDate(priceDate(), true) || "the last check")}.</p>
    <p class="verse">1 John 4:19</p>
  </div>`;
}
function openTally() { modals.open(el.tallySheet, tallyHtml()); }
el.tallySheet.addEventListener("click", (e) => {
  const rm = e.target.closest("[data-remove]");
  if (rm) {
    tally = tally.filter((t) => t.id !== rm.dataset.remove); writeJson(TALLY_KEY, tally); renderTallyPill();
    const y = el.tallySheet.querySelector(".sheet-inner")?.scrollTop || 0;   // removing a line deep in the list keeps the place
    el.tallySheet.innerHTML = tallyHtml(); el.tallySheet.querySelector(".sheet-inner").scrollTop = y;
    el.tallySheet.querySelector(".x-btn")?.addEventListener("click", () => modals.close(el.tallySheet)); grabToDismiss(el.tallySheet); haptic(5); return;
  }
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (act === "clear") { if (confirm(`Clear ${tally.length} ${tally.length === 1 ? "line" : "lines"} from the tally?`)) { tally = []; writeJson(TALLY_KEY, tally); renderTallyPill(); modals.close(el.tallySheet); toast("Tally cleared"); } }
  else if (act === "share") shareTally();
});
async function shareTally() {
  const total = tally.reduce((a, t) => a + t.cents, 0);
  const lines = tally.map((t) => `${t.unit === "lb" ? `${fmtNum(t.qty)} lb` : `${t.qty}×`} ${t.title} — ${money(t.cents)}`);
  const text = `Strongsville Emergency Food Bank · Donation value · ${new Date().toLocaleDateString()}\n${lines.join("\n")}\nTotal: ${money(total)}\nWalmart prices as of ${fmtDate(priceDate(), true)}\n1 John 4:19`;
  try {
    if (navigator.share) await navigator.share({ title: "Donation value", text });
    else { await navigator.clipboard.writeText(text); toast("Tally copied"); }
  } catch (err) { if (err?.name !== "AbortError") { try { await navigator.clipboard.writeText(text); toast("Tally copied"); } catch { toast("Sharing is not available on this device", { iconName: "info" }); } } }
}
el.tallyBtn.addEventListener("click", openTally);
el.tallyStrip?.addEventListener("click", openTally);
renderTallyPill();

// ------------------------------------------------------------------ recent (reopened by barcode, never by a snapshot's row number)
function pushRecent(res) {
  if (res.priceCents == null) return;
  const entry = {
    key: res.key, kind: res.kind, title: res.kind === "exact" || res.kind === "closest" ? titleOf(res.item) : res.title, priceCents: res.priceCents, unit: res.unit,
    code: res.code || null, id: res.item?.id ?? null, rank: res.item?.rank ?? null, version: db.version, brand: res.brand || null, name: res.name || null, at: Date.now(),
    ...(db.manifest?.fixture ? { sample: true } : {}),
  };
  recent = [entry, ...recent.filter((r) => r.key !== res.key)].slice(0, 8);
  writeJson(RECENT_KEY, recent);
  renderRecent();
}
/** Sample (fixture) prices never mix with real ones: when the real snapshot arrives, tally lines and recents priced from
 * the sample go, and the volunteer is told once. */
function dropSampleLines() {
  if (!db.manifest || db.manifest.fixture) return;
  const t = tally.filter((x) => !x.sample), r = recent.filter((x) => !x.sample);
  if (t.length === tally.length && r.length === recent.length) return;
  tally = t; recent = r; writeJson(TALLY_KEY, tally); writeJson(RECENT_KEY, recent);
  renderTallyPill(); renderRecent();
  toast("Prices were updated. Earlier tally lines and recent items were cleared.", { iconName: "info", ms: 7000 });
}
/** Rows that can only be reopened by row number belong to one snapshot: drop them when the snapshot changes. */
function pruneRecent() {
  const before = recent.length;
  recent = recent.filter((r) => r.code || r.version === db.version);
  if (recent.length !== before) { writeJson(RECENT_KEY, recent); renderRecent(); }
}
function renderRecent() {
  el.recent.hidden = recent.length === 0;
  const how = $("howtoCard"); if (how) how.hidden = recent.length > 0;   // the first-launch steps give way to Recent
  el.recentList.innerHTML = recent.slice(0, 4).map((r, i) => `<li><button class="row" type="button" data-recent="${i}"><span class="name">${esc(r.title)}</span><span class="price">${money(r.priceCents)}${r.unit === "lb" ? "<small>per lb</small>" : ""}</span><span class="meta"><span class="tag">${esc(kindLabel({ kind: r.kind }))}</span></span></button></li>`).join("");
}
el.recentList.addEventListener("click", async (e) => {
  const b = e.target.closest("[data-recent]"); if (!b) return;
  const r = recent[Number(b.dataset.recent)]; if (!r) return;
  if (r.kind === "live" && r.code) {
    // the saved database never knew this one: show what Walmart said, then refresh it live when online
    openResolution({ kind: "live", code: r.code, gtin: r.code, title: r.title, name: r.name || r.title, brand: r.brand || "", priceCents: r.priceCents, unit: r.unit, key: r.key, live: null }, { source: "recent" });
    return;
  }
  if (r.code) { openCode(r.code, { source: "recent", preferId: r.id }); return; }
  if (r.rank != null && r.version === db.version) openRank(r.rank, { source: "recent" });
  else toast("That item is from an older price list", { iconName: "info" });
});
renderRecent();
homeToTop();

// ------------------------------------------------------------------ settings
// What a volunteer can change (appearance, buzz, live check), what they need to know about the prices (date, source,
// whether the phone keeps them), the two actions (check for new prices, reset), and an About fold for everything else.
const sourceText = () => (db.manifest?.storePriced ? `${storeLabel()} shelf prices, otherwise Walmart.com` : "Walmart.com prices");
const mb = (bytes) => `${(bytes / 1048576).toFixed(bytes >= 10 * 1048576 ? 0 : 1)} MB`;
function settingsHtml() {
  const m = db.manifest;
  const seg = ["auto", "light", "dark"].map((t) => `<button type="button" data-theme="${t}" aria-pressed="${prefs.theme === t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("");
  const notes = [];
  if (db.pendingUpdate) notes.push(`<p class="note">Newer prices (${esc(fmtDate(db.pendingUpdate.manifest?.priceDate, true))}) are downloaded and will be applied when the app is idle.</p>`);
  if (db.skipped?.length) notes.push(`<p class="note">Not stored on this phone (memory limit): ${esc(db.skipped.map((s) => s.name).join(", "))}. Those items are priced live when online.</p>`);
  notes.push(`<p class="note" id="storageNote"${state.persisted === false ? "" : " hidden"}>The phone may clear the prices to free space; they download again when online. Adding the app to the Home Screen keeps them.</p>`);
  const problem = state.dbError ? (state.dbErrorPlain || state.dbErrorStorage ? state.dbError : `The database couldn't be opened: ${state.dbError}`)
    : db.state === "offline-empty" ? "Prices have not been downloaded yet. Connect to the internet once; they stay on this phone." : "Prices are still loading.";
  const card = m
    ? `<div class="data-head">${icon("check", "ico data-ico")}<div><h3 class="data-title">Prices as of ${esc(fmtDate(priceDate(), true))}</h3><p class="data-sub">${esc(sourceText())} · ${mb(db.installedBytes() || m.totalGzBytes)} on this phone · Works offline</p></div></div>`
    : `<div class="data-head data-head--warn">${icon("info", "ico data-ico")}<div><h3 class="data-title">${db.state === "offline-empty" ? "No prices on this phone yet" : state.dbError ? "Prices could not be opened" : "Downloading prices"}</h3><p class="data-sub">${esc(problem)}</p></div></div>`;
  const legend = [["exact", "Exact item", "Found in the Walmart price list by barcode or name"], ["store-label", "Store price label", "A store scale label (meat, deli, bakery) that carries its own price"],
    ["plu", "Produce code", "The four-digit sticker on produce, priced by the pound or each"], ["equivalent", "Equivalent value", "Not sold at Walmart, so priced at the closest Walmart item"],
    ["closest", "Closest match", "No item matched every word typed; check the type and size"], ["live", "Live Walmart price", "Not in the saved list; found on Walmart.com just now"]]
    .map(([k, l, t]) => `<li><span class="kind" data-kind="${k}">${l}</span><span>${t}</span></li>`).join("");
  return `<div class="sheet-inner"><div class="grab" aria-hidden="true"></div>
    <div class="sheet-head"><h2 class="h2" id="settingsTitle">Settings</h2><button class="x-btn" type="button" aria-label="Close">${icon("x")}</button></div>
    <div class="setting"><div class="lab">Appearance<small>Auto matches the phone</small></div><div class="seg" role="group" aria-label="Appearance">${seg}</div></div>
    <div class="setting"><div class="lab">Vibrate on scan<small>A short vibration when a barcode is read</small></div><button class="switch" type="button" role="switch" aria-checked="${prefs.haptics}" data-pref="haptics" aria-label="Vibrate on scan"></button></div>
    ${LIVE_URL ? `<div class="setting"><div class="lab">Live price check<small>When online, compare a scanned item with Walmart's current price</small></div><button class="switch" type="button" role="switch" aria-checked="${prefs.live}" data-pref="live" aria-label="Live price check"></button></div>` : ""}
    <h2 class="h2">Prices</h2>
    <section class="data-card" aria-label="Price database">${card}${notes.join("")}
      <button class="btn btn--ghost btn--block" type="button" data-act="update">${icon("refresh")} Check for new prices</button>
    </section>
    <h2 class="h2">How to use</h2>
    <ol class="howto">
      <li>Scan the barcode, or type the item name and size.</li>
      <li>Check the item and price, then tap <b>Add to tally</b>.</li>
      <li>Share the tally once the donation is valued.</li>
    </ol>
    <details class="about">
      <summary><span>About</span>${icon("back", "ico chev")}</summary>
      <ul class="legend-list" aria-label="What the labels mean">${legend}</ul>
      <p class="fine">SFB Value is the donation valuation tool of the Strongsville Emergency Food Bank. Prices are the Strongsville Walmart Supercenter's shelf prices (8585 Pearl Rd) where Walmart reports one, otherwise Walmart.com prices; the note under each price says which. Prices are refreshed weekly and the app updates itself when online. Barcodes Walmart does not sell are identified with Open Food Facts, Open Beauty Facts and Open Products Facts data (ODbL). Barcode reading by zxing-cpp (Apache-2.0).</p>
      <p class="fine verse-full">“We love because he first loved us.” — 1 John 4:19</p>
      <p class="fine mono">Version ${esc(BUILD)}${m ? ` · prices ${esc(m.version)}` : ""}</p>
    </details>
    <button class="btn btn--danger btn--block" type="button" data-act="reset">${icon("trash")} Reset app data</button>
  </div>`;
}
function fillStorage() {
  db.persistenceStatus().then((p) => {
    state.persisted = p;
    const note = el.settings.querySelector("#storageNote"); if (note) note.hidden = p !== false;
  }).catch(() => {});
}
function openSettings() { modals.open(el.settings, settingsHtml()); fillStorage(); }
function refreshSettings() { const y = el.settings.querySelector(".sheet-inner")?.scrollTop || 0; el.settings.innerHTML = settingsHtml(); el.settings.querySelector(".sheet-inner").scrollTop = y; el.settings.querySelector(".x-btn")?.addEventListener("click", () => modals.close(el.settings)); grabToDismiss(el.settings); fillStorage(); }
el.settings.addEventListener("click", async (e) => {
  const th = e.target.closest("[data-theme]");
  if (th) { prefs.theme = th.dataset.theme; writeJson(PREFS_KEY, prefs); applyTheme(); el.settings.querySelectorAll("[data-theme]").forEach((b) => b.setAttribute("aria-pressed", String(b === th))); return; }
  const sw = e.target.closest("[data-pref]");
  if (sw) { const k = sw.dataset.pref; prefs[k] = !prefs[k]; writeJson(PREFS_KEY, prefs); sw.setAttribute("aria-checked", String(prefs[k])); haptic(5); return; }
  const actBtn = e.target.closest("[data-act]"), act = actBtn?.dataset.act;
  if (act === "update") await checkNow(actBtn);
  else if (act === "reset") {
    if (!confirm("Remove the downloaded prices, tally and recent items from this phone? Prices download again when online.")) return;
    await db.reset(); tally = []; recent = [];
    for (const k of [TALLY_KEY, RECENT_KEY, PREFS_KEY]) { try { localStorage.removeItem(k); } catch { /* ignore */ } }
    location.reload();   // the app shell stays cached, so this works offline too
  }
});
el.settingsBtn.addEventListener("click", openSettings);
el.status.addEventListener("click", openSettings);
el.readyCard?.addEventListener("click", openSettings);

// ------------------------------------------------------------------ scanner
let scannerMod = null;
function setBackgroundInert(on) { for (const n of [el.top, el.main, el.dock, el.toasts]) if (n) n.inert = on; }
async function openScanner() {
  if (state.scanOpen) return;
  state.scanOpen = true;
  const gen = ++state.scanGen;
  el.scanner.hidden = false; el.scanner.classList.remove("is-hit");
  el.scanHint.textContent = "Center the barcode in the frame";
  el.scanTypeForm.hidden = true; el.scanTypeBtn.hidden = false; el.torchBtn.hidden = true; el.torchBtn.setAttribute("aria-pressed", "false");
  el.scanner.querySelector(".scan-denied")?.remove(); el.reticle.hidden = false;
  setBackgroundInert(true);
  history.pushState({ modal: "scanner", n: (history.state?.n || 0) + 1 }, "");
  el.scanClose.focus({ preventScroll: true });
  await startCamera(gen);
}
async function startCamera(gen) {
  if (!navigator.mediaDevices?.getUserMedia || !window.isSecureContext) { scanDenied("The camera needs a secure (https) page. Enter the barcode manually."); return; }
  try {
    scannerMod ||= await import("./scanner.js");
    const scan = await scannerMod.startScanner(el.video, el.overlay, (hit) => { if (gen === state.scanGen) onScanHit(hit); }, (info) => {
      if (gen !== state.scanGen) return;
      if (info.engine) state.engine = info.engine;
      if (info.torch != null) el.torchBtn.hidden = !info.torch;
      if (info.fatal) { console.warn("scanner:", info.error); state.scan?.stop(); state.scan = null; scanDenied("The barcode reader could not start on this phone. Enter the barcode manually."); }
      else if (info.error) console.warn("scanner:", info.error);
    });
    if (gen !== state.scanGen || !state.scanOpen) { scan.stop(); return; }   // closed (or reopened) while the camera was starting
    state.scan?.stop();
    state.scan = scan;
    if (!el.scanTypeForm.hidden || el.sheet.open) scan.pause();
  } catch (err) {
    if (gen !== state.scanGen) return;
    console.warn("camera", err);
    scanDenied(err?.name === "NotAllowedError" ? "Camera access is turned off for this site. Allow it in the browser's site settings, or enter the barcode manually." : err?.name === "NotFoundError" ? "No camera was found on this device. Enter the barcode manually." : "The camera could not start. Enter the barcode manually.");
  }
}
function scanDenied(msg) {
  el.reticle.hidden = true; el.scanHint.textContent = "Enter the digits printed under the barcode";
  el.scanner.querySelector(".scan-denied")?.remove();
  const d = document.createElement("div"); d.className = "scan-denied"; d.innerHTML = `<p>${esc(msg)}</p>`;
  el.scanner.insertBefore(d, el.scanner.querySelector(".scan-bottom"));
  showScanType();
}
function showScanType() { el.scanTypeForm.hidden = false; el.scanTypeBtn.hidden = true; el.scanTypeInput.value = ""; state.scan?.pause(); el.scanTypeInput.focus(); }
function closeScanner({ fromPop = false } = {}) {
  if (!state.scanOpen) return;
  if (!fromPop && history.state?.modal === "scanner") { history.back(); return; }
  state.scanOpen = false; state.scanGen++;
  state.scan?.stop(); state.scan = null;
  el.scanner.hidden = true;
  el.scanner.querySelector(".scan-denied")?.remove();
  el.torchBtn.setAttribute("aria-pressed", "false");
  setBackgroundInert(false);
  if (!el.sheet.open) el.scanBtn.focus({ preventScroll: true });
}
function resumeScan() {
  if (!state.scanOpen || !state.scan) return;
  el.scanner.classList.remove("is-hit"); el.scanHint.textContent = "Center the barcode in the frame";
  state.scan.resume();
}
async function onScanHit(hit) {
  const t0 = performance.now();
  haptic(20);
  el.scanner.classList.add("is-hit");
  el.scanHint.textContent = `Read ${formatGtin(hit.gtin?.gtin14 || hit.raw)}`;
  let res = null;
  try { res = await resolveCode(db, hit.raw, hit.format, { scanned: true }); } catch (err) { console.warn("resolve", err); }
  if (!state.scanOpen) return;
  if (!res) { el.scanHint.textContent = "That barcode is not a product code"; setTimeout(resumeScan, 900); return; }
  if (res.kind === "not-ready") { el.scanHint.textContent = "Prices are still loading"; setTimeout(resumeScan, 1200); return; }
  state.source = "scan";
  openResolution(res, { source: "scan" });
  requestAnimationFrame(() => perf.scans.push({ code: hit.raw, kind: res.kind, decodeMs: hit.ms, engine: hit.engine, toPriceMs: Math.round((performance.now() - t0) * 10) / 10 }));
}
el.scanBtn.addEventListener("click", openScanner);
el.scanClose.addEventListener("click", () => closeScanner());
el.torchBtn.addEventListener("click", async () => { const on = await state.scan?.setTorch(!state.scan.torch); el.torchBtn.setAttribute("aria-pressed", String(!!on)); });
el.scanTypeBtn.addEventListener("click", showScanType);
el.scanTypeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const v = el.scanTypeInput.value.trim(); if (!v) return;
  if (!db.version) { toast("Prices are still loading. Try again in a moment.", { iconName: "info" }); return; }
  const res = await openCode(v, { source: "scan" });
  if (res) { state.source = "scan"; el.scanTypeInput.value = ""; }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // release the camera at once; the history bookkeeping can wait for the app to come back
    if (state.scan) { state.scan.stop(); state.scan = null; state.scanPausedByVisibility = state.scanOpen; }
  } else if (state.scanPausedByVisibility) {
    state.scanPausedByVisibility = false;
    if (state.scanOpen) startCamera(++state.scanGen);
  }
});

// ------------------------------------------------------------------ scrolling the results from anywhere
// While a search is up the results are the only thing that scrolls. A wheel or trackpad over the header, the banner,
// the dock or the margins of a wide screen scrolls them too, instead of nothing.
const resultsScrollable = () => !el.results.hidden && !anyModalOpen() && !state.scanOpen;
document.addEventListener("wheel", (e) => {
  if (e.ctrlKey || !resultsScrollable() || el.results.contains(e.target) || e.target.closest?.(".toasts")) return;
  const dy = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * el.results.clientHeight : e.deltaY;
  if (!dy) return;
  e.preventDefault();
  el.results.scrollTop += dy;
}, { passive: false });
// Page Up / Page Down from the search box page through the results (the caret keeps the arrows and Home/End)
el.q.addEventListener("keydown", (e) => {
  if ((e.key !== "PageUp" && e.key !== "PageDown") || !resultsScrollable()) return;
  e.preventDefault();
  el.results.scrollTop += (e.key === "PageUp" ? -1 : 1) * Math.round(el.results.clientHeight * 0.85);
});
// dragging the list on a phone puts the keyboard away, as native lists do: the whole list is then in reach
let touchY = null;
el.results.addEventListener("touchstart", (e) => { touchY = e.touches.length === 1 ? e.touches[0].clientY : null; }, { passive: true });
el.results.addEventListener("touchmove", (e) => {
  if (touchY == null || document.activeElement !== el.q) return;
  if (Math.abs(e.touches[0].clientY - touchY) > 12) { touchY = null; el.q.blur(); }
}, { passive: true });

// ------------------------------------------------------------------ keyboard (desktop testing, external scanners that type digits + Enter)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && state.scanOpen && !anyModalOpen()) { e.preventDefault(); closeScanner(); return; }
  if (e.key === "/" && document.activeElement !== el.q && !anyModalOpen() && !state.scanOpen) { e.preventDefault(); el.q.focus(); }
});

// ------------------------------------------------------------------ service worker + boot
if ("serviceWorker" in navigator && !new URLSearchParams(location.search).has("nosw")) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("./sw.js");
      const offerUpdate = () => toast("An app update is ready", { action: "Reload", ms: 0, iconName: "refresh", onAction: () => { state.pendingReload = true; (reg.waiting || reg.installing)?.postMessage({ type: "SKIP_WAITING" }); } });
      if (reg.waiting && navigator.serviceWorker.controller) offerUpdate();   // an update that was already waiting from a previous visit
      reg.addEventListener("updatefound", () => {
        const nw = reg.installing; if (!nw) return;
        nw.addEventListener("statechange", () => { if (nw.state === "installed" && navigator.serviceWorker.controller) offerUpdate(); });
      });
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (state.pendingReload) location.reload(); });
    } catch (err) { console.warn("sw", err); }
  });
}

setStatus("loading", "Starting");
renderReadyCard();
keyboardInset();
showInstallHint();
if (typeof DecompressionStream === "undefined") {
  // the price database is unpacked with DecompressionStream: Safari 16.4 (iOS 16.4, March 2023) and Chrome 80 or newer
  setStatus("error", "Update required · tap for details");
  state.dbErrorPlain = true;
  state.dbError = isIOS ? "This iPhone's software is too old to keep prices offline. Update to iOS 16.4 or later (Settings › General › Software Update), then open the app again."
    : "This browser is too old to keep prices offline. Update Chrome or the phone's browser, then open the app again.";
  db.state = "error"; renderReadyCard();
} else db.start();
perf.boot.scriptMs = Math.round(performance.now());
