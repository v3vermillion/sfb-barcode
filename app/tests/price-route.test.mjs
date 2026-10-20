// The pipeline Worker's public live-price route, exercised with a stubbed Walmart API and stubbed bindings.
import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";

const pem = `-----BEGIN PRIVATE KEY-----\n${Buffer.from(generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey.export({ type: "pkcs8", format: "der" })).toString("base64")}\n-----END PRIVATE KEY-----`;

function harness({ walmart, limits = { per: Infinity, all: Infinity }, bindings = true } = {}) {
  const store = new Map();
  globalThis.caches = { default: { async match(k) { const r = store.get(k.url); return r ? r.clone() : undefined; }, async put(k, r) { store.set(k.url, r); } } };
  const calls = [];
  globalThis.fetch = async (url) => { calls.push(url); return walmart(url); };
  let per = 0, all = 0;
  const env = {
    WM_PRIVATE_KEY: pem, WM_CONSUMER_ID: "cid", ADMIN_TOKEN: "secret",
    ...(bindings ? { PRICE_LIMITER: { async limit() { return { success: ++per <= limits.per }; } }, PRICE_GLOBAL_LIMITER: { async limit() { return { success: ++all <= limits.all }; } } } : {}),
  };
  const ctx = { waitUntil: (p) => p };
  return {
    calls, counts: () => ({ per, all }),
    async hit(path, method = "GET") {
      const mod = await import("../../pipeline/src/index.js");
      const r = await mod.default.fetch(new Request("https://w.example" + path, { method }), env, ctx);
      return { status: r.status, cors: r.headers.get("access-control-allow-origin"), cache: r.headers.get("x-cache"), cc: r.headers.get("cache-control"), retry: r.headers.get("retry-after"), body: r.status === 204 ? null : await r.json() };
    },
  };
}
const ok = (items) => new Response(JSON.stringify({ items }), { status: 200 });
const corn = { itemId: 1, upc: "078742054261", name: "Great Value Corn", brandName: "Great Value", salePrice: 0.87, marketplace: false, sellerInfo: "Walmart.com", stock: "Available" };

test("a Walmart-sold item is returned with every listing, cached, and never cached by the phone", async () => {
  const h = harness({ walmart: (u) => (u.includes("upc=078742054261") ? ok([{ ...corn, marketplace: true, sellerInfo: "Other" }, corn, { ...corn, itemId: 2, salePrice: 9.96, name: "Great Value Corn 12-pack" }]) : new Response("{}", { status: 404 })) });
  const a = await h.hit("/v1/price/078742054261");
  assert.equal(a.status, 200); assert.equal(a.body.ok, true); assert.equal(a.body.itemId, 1); assert.equal(a.body.price, 0.87);
  assert.deepEqual(a.body.listings.map((l) => l.itemId), [1, 2]);
  assert.equal(a.cors, "*"); assert.equal(a.cache, "miss"); assert.equal(a.cc, "no-store");
  const b = await h.hit("/v1/price/078742054261");
  assert.equal(b.cache, "hit"); assert.equal(b.cc, "no-store"); assert.equal(b.body.itemId, 1);
  assert.equal(h.calls.length, 1, "one Walmart call for two requests");
  assert.deepEqual(h.counts(), { per: 1, all: 1 }, "limits charged only on the Walmart call");
  assert.match(h.calls[0], /\/items\?upc=078742054261$/);
});

test("marketplace-only, not found, throttled and failed upstreams are distinguishable", async () => {
  const h = harness({ walmart: (u) => u.includes("012345678905") ? ok([{ itemId: 2, salePrice: 5, marketplace: true, sellerInfo: "Some Seller" }]) : u.includes("036000291452") ? new Response("", { status: 429 }) : u.includes("5000112637922") ? new Response("", { status: 500 }) : new Response("{}", { status: 404 }) });
  assert.deepEqual((await h.hit("/v1/price/012345678905")).body, { ok: false, reason: "not sold by walmart", gtin: "00012345678905" });
  const t = await h.hit("/v1/price/036000291452");
  assert.equal(t.status, 503); assert.equal(t.body.reason, "walmart unavailable"); assert.equal(t.retry, "30");
  const t2 = await h.hit("/v1/price/036000291452");
  assert.equal(t2.cache, "hit", "a throttled answer is remembered briefly so the key is not hammered");
  assert.equal((await h.hit("/v1/price/5000112637922")).status, 503);
  assert.match(h.calls.find((c) => c.includes("5000112637922")), /items\?gtin=05000112637922$/, "EAN-13 goes through the 14-digit gtin parameter");
  assert.equal((await h.hit("/v1/price/096385074")).status, 400);   // not a valid code
});

test("rate limits, validation, CORS preflight and the admin gate", async () => {
  const h = harness({ walmart: () => ok([corn]), limits: { per: 2, all: Infinity } });
  assert.equal((await h.hit("/v1/price/078742054261")).status, 200);
  assert.equal((await h.hit("/v1/price/5000112637922")).status, 200);
  const lim = await h.hit("/v1/price/036000291452");
  assert.equal(lim.status, 429); assert.equal(lim.retry, "60");
  assert.equal((await h.hit("/v1/price/078742054261")).cache, "hit", "cached barcodes still answer while limited");
  assert.equal((await h.hit("/v1/price/078742054262")).status, 400);   // bad check digit
  assert.equal((await h.hit("/v1/price/201234928759")).status, 400);   // store label is not a catalog item
  assert.equal((await h.hit("/v1/price/078742054261", "OPTIONS")).status, 204);
  assert.equal((await h.hit("/health")).status, 401);
  const g = harness({ walmart: () => ok([corn]), limits: { per: Infinity, all: 1 } });
  assert.equal((await g.hit("/v1/price/078742054261")).status, 200);
  assert.equal((await g.hit("/v1/price/5000112637922")).status, 429, "the aggregate cap protects the shared key");
});

test("without the rate-limit bindings the route fails closed", async () => {
  const h = harness({ walmart: () => ok([corn]), bindings: false });
  const r = await h.hit("/v1/price/078742054261");
  assert.equal(r.status, 503); assert.equal(r.body.reason, "not configured");
  assert.equal(h.calls.length, 0);
});

test("a plain listing comes before a \"(N pack)\" bundle listing of the same barcode", async () => {
  const bundle = { ...corn, itemId: 3, salePrice: 5.22, name: "(6 pack) Great Value Corn" };
  const h = harness({ walmart: () => ok([bundle, corn]) });
  const a = await h.hit("/v1/price/078742054261");
  assert.equal(a.body.itemId, 1); assert.equal(a.body.price, 0.87);
  assert.deepEqual(a.body.listings.map((l) => l.itemId), [1, 3], "every listing is still returned, the bundle after the plain one");
});

// ---------------------------------------------------------------- shared remembered matches: /v1/learned
// The Durable Object is run for real against a tiny SQL shim (the subset of exec() the class uses), so the vote rules are
// tested; the route is tested with the binding stubbed the way Cloudflare presents it (idFromName/get -> stub.fetch).
function sqlShim() {
  const rows = new Map();   // gtin -> row
  const sorted = () => [...rows.values()].sort((a, b) => b.at - a.at);
  return { exec(q, ...a) {
    const arr = (() => {
      if (q.startsWith("CREATE")) return [];
      if (q.startsWith("SELECT gtin, upc, title, n, at FROM learned WHERE")) { const r = rows.get(a[0]); return r ? [{ ...r }] : []; }
      if (q.startsWith("SELECT gtin, upc, title, n, at FROM learned ORDER")) return sorted().map((r) => ({ ...r }));
      if (q.startsWith("SELECT upc, n")) { const r = rows.get(a[0]); return r ? [{ upc: r.upc, n: r.n }] : []; }
      if (q.startsWith("INSERT")) { rows.set(a[0], { gtin: a[0], upc: a[1], title: a[2], n: 1, at: a[3] }); return []; }
      if (q.startsWith("UPDATE learned SET n = n + 1")) { const r = rows.get(a[2]); r.n += 1; r.title = a[0]; r.at = a[1]; return []; }
      if (q.startsWith("UPDATE learned SET upc")) { const r = rows.get(a[3]); Object.assign(r, { upc: a[0], title: a[1], n: 1, at: a[2] }); return []; }
      if (q.startsWith("UPDATE learned SET n = n - 1")) { rows.get(a[0]).n -= 1; return []; }
      if (q.startsWith("DELETE FROM learned WHERE gtin = ?")) { rows.delete(a[0]); return []; }
      if (q.startsWith("DELETE FROM learned WHERE gtin IN")) { for (const r of sorted().slice(5000)) rows.delete(r.gtin); return []; }
      throw new Error("unexpected SQL in test: " + q);
    })();
    return { toArray: () => arr };
  } };
}
async function learnedHarness({ binding = true, limit = Infinity } = {}) {
  const mod = await import("../../pipeline/src/index.js");
  const obj = new mod.Learned({ storage: { sql: sqlShim() } }, {});
  let per = 0;
  const env = { ADMIN_TOKEN: "secret", PRICE_LIMITER: { async limit() { return { success: ++per <= limit }; } },
    ...(binding ? { LEARNED: { idFromName: (n) => n, get: () => ({ fetch: (r) => obj.fetch(r) }) } } : {}) };
  return async (method, body) => {
    const r = await mod.default.fetch(new Request("https://w.example/v1/learned", { method, ...(body ? { body: JSON.stringify(body), headers: { "content-type": "application/json" } } : {}) }), env, { waitUntil: (p) => p });
    return { status: r.status, cors: r.headers.get("access-control-allow-origin"), methods: r.headers.get("access-control-allow-methods"), body: r.status === 204 ? null : await r.json() };
  };
}

test("a remembered match is shared, votes strengthen or replace it, Undo takes a vote back", async () => {
  const hit = await learnedHarness();
  assert.deepEqual((await hit("GET")).body, { ok: true, count: 0, learned: [] });
  const a = await hit("POST", { gtin: "096619261574", upc: "0078742054261", title: "  Great Value   Corn ", n: 99 });
  assert.equal(a.status, 200); assert.equal(a.body.gtin, "00096619261574");
  assert.equal(a.body.learned.upc, "0078742054261"); assert.equal(a.body.learned.title, "Great Value Corn"); assert.equal(a.body.learned.n, 1);
  assert.equal((await hit("POST", { gtin: "00096619261574", upc: "0078742054261", title: "Great Value Corn" })).body.learned.n, 2, "the same match again: a second vote");
  const other = await hit("POST", { gtin: "00096619261574", upc: "0078742054278", title: "Other" });
  assert.equal(other.body.learned.upc, "0078742054261"); assert.equal(other.body.learned.n, 1, "a different match weakens the standing one");
  const replaced = await hit("POST", { gtin: "00096619261574", upc: "0078742054278", title: "Other" });
  assert.equal(replaced.body.learned.upc, "0078742054278"); assert.equal(replaced.body.learned.n, 1, "outvoted: the newer match stands");
  assert.equal((await hit("POST", { gtin: "00096619261574", upc: "0078742054261", forget: true })).body.learned.upc, "0078742054278", "Undo of a match that no longer stands changes nothing");
  assert.equal((await hit("POST", { gtin: "00096619261574", upc: "0078742054278", forget: true })).body.learned, null, "Undo of the standing match removes it");
  await hit("POST", { gtin: "00096619261574", upc: "0078742054261", title: "x".repeat(300) });
  const list = (await hit("GET")).body;
  assert.equal(list.count, 1); assert.equal(list.learned[0].title.length, 120); assert.equal(list.learned[0].gtin, "00096619261574");
});

test("/v1/learned validates, rate-limits, answers preflight, and fails closed without its binding", async () => {
  const hit = await learnedHarness({ limit: 0 });
  assert.equal((await hit("POST", { gtin: "123", upc: "0078742054261" })).status, 400);
  assert.equal((await hit("POST", { gtin: "00096619261574", upc: "abc" })).status, 400);
  assert.equal((await hit("POST", { gtin: "00096619261574", upc: "00096619261574" })).status, 400, "a barcode is never remembered as itself");
  const limited = await hit("POST", { gtin: "00096619261574", upc: "0078742054261" });
  assert.equal(limited.status, 429, "the limit is charged for a valid write, not for the rejected ones");
  const pre = await hit("OPTIONS");
  assert.equal(pre.status, 204); assert.equal(pre.cors, "*"); assert.match(pre.methods, /POST/);
  assert.equal((await hit("PUT")).status, 405);
  const none = await learnedHarness({ binding: false });
  assert.equal((await none("GET")).status, 503);
  assert.equal((await none("POST", { gtin: "00096619261574", upc: "0078742054261" })).status, 503);
});
