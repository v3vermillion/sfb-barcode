// The app shell's service worker (public/sw.js), run with the browser globals stubbed: which page a navigation gets.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function loadSw(cached, others = new Map()) {
  const listeners = {};
  const self = { addEventListener: (t, f) => (listeners[t] = f), registration: { scope: "https://app.test/" }, clients: { claim: async () => {} } };
  // a fresh Response each time, as the browser gives; `cached` is this build's shell cache ("sfb-shell-test"), `others`
  // maps other cache names to their own url -> response maps (the next build's precache, say)
  const lookup = (map) => async (u) => map.get(typeof u === "string" ? u : u.url)?.() || null;
  const allMaps = [...others.values(), cached];   // the other caches first, as an engine may order them
  const caches = {
    match: async (u) => { for (const m of allMaps) { const r = await lookup(m)(u); if (r) return r; } return null; },
    open: async (name) => ({ put: async () => {}, match: name === "sfb-shell-test" ? lookup(cached) : lookup(others.get(name) || new Map()) }),
    keys: async () => ["sfb-shell-test", ...others.keys()],
  };
  const fetched = [];
  const fetchStub = async (req) => { fetched.push(req.url || String(req)); return new Response("network", { status: 200 }); };
  const src = fs.readFileSync(new URL("../public/sw.js", import.meta.url), "utf8").replace("__BUILD__", "test").replace("__ASSETS__", "[]");
  new Function("self", "caches", "fetch", "Response", "URL", src)(self, caches, fetchStub, Response, URL);
  const request = async (url, mode) => {
    let p = null;
    listeners.fetch({ request: { method: "GET", url, mode }, respondWith: (x) => (p = x) });
    return p && (await p);
  };
  const navigate = (url) => request(url, "navigate");
  const asset = (url) => request(url, "no-cors");
  return { navigate, asset, fetched };
}
// what Cloudflare's auto-trailing-slash leaves in the precache for ./privacy.html: a redirected response
const redirected = (body) => { const r = new Response(body, { status: 200, headers: { "content-type": "text/html" } }); Object.defineProperty(r, "redirected", { value: true }); return r; };

test("the privacy page opens as itself, not the app, for /privacy.html and /privacy (audit W9-01)", async () => {
  const cached = new Map([["https://app.test/", () => new Response("APP")], ["https://app.test/privacy.html", () => redirected("PRIVACY")]]);
  const sw = loadSw(cached);
  for (const u of ["https://app.test/privacy.html", "https://app.test/privacy", "https://app.test/privacy.html?x=1"]) {
    const r = await sw.navigate(u);
    assert.equal(await r.text(), "PRIVACY", u);
    assert.equal(r.redirected, false, "a navigation is never answered with a redirected response");
    assert.equal(r.status, 200);
  }
  assert.equal(sw.fetched.length, 0, "served from the shell cache, offline too");
});

test("every other navigation opens the app; an uncached privacy page comes from the network", async () => {
  const sw = loadSw(new Map([["https://app.test/", () => new Response("APP")]]));
  assert.equal(await (await sw.navigate("https://app.test/?source=pwa")).text(), "APP");
  assert.equal(await (await sw.navigate("https://app.test/anything")).text(), "APP");
  assert.equal(await (await sw.navigate("https://app.test/privacy.html")).text(), "network");
});

test("a worker reads its own build's cache only: the next build's precache, installed but not yet active, is never mixed in", async () => {
  const next = new Map([["https://app.test/", () => new Response("NEW APP")], ["https://app.test/app.css", () => new Response("NEW CSS")], ["https://app.test/boot.js", () => new Response("NEW FILE")]]);
  const sw = loadSw(new Map([["https://app.test/", () => new Response("APP")], ["https://app.test/app.css", () => new Response("CSS")]]), new Map([["sfb-shell-next", next]]));
  assert.equal(await (await sw.navigate("https://app.test/")).text(), "APP", "the page comes from this build");
  assert.equal(await (await sw.asset("https://app.test/app.css")).text(), "CSS", "the stylesheet comes from this build");
  assert.equal(await (await sw.asset("https://app.test/boot.js")).text(), "network", "a file this build never had is fetched, never taken from the other cache");
});
