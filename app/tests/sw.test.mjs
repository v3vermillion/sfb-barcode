// The app shell's service worker (public/sw.js), run with the browser globals stubbed: which page a navigation gets.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function loadSw(cached) {
  const listeners = {};
  const self = { addEventListener: (t, f) => (listeners[t] = f), registration: { scope: "https://app.test/" }, clients: { claim: async () => {} } };
  // a fresh Response each time, as the browser gives
  const caches = { match: async (u) => cached.get(typeof u === "string" ? u : u.url)?.() || null, open: async () => ({ put: async () => {}, match: async () => null }), keys: async () => [] };
  const fetched = [];
  const fetchStub = async (req) => { fetched.push(req.url || String(req)); return new Response("network", { status: 200 }); };
  const src = fs.readFileSync(new URL("../public/sw.js", import.meta.url), "utf8").replace("__BUILD__", "test").replace("__ASSETS__", "[]");
  new Function("self", "caches", "fetch", "Response", "URL", src)(self, caches, fetchStub, Response, URL);
  const navigate = async (url) => {
    let p = null;
    listeners.fetch({ request: { method: "GET", url, mode: "navigate" }, respondWith: (x) => (p = x) });
    return p && (await p);
  };
  return { navigate, fetched };
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
