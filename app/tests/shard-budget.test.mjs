// The search worker holds every open shard in memory, so the durable departments are opened only while the estimate
// stays under a budget for the phone (db-client.js pickShards / memoryBudget). Core departments always open.
import { test } from "node:test";
import assert from "node:assert/strict";

globalThis.Worker = class { postMessage() {} terminate() {} };
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
Object.defineProperty(globalThis, "navigator", { configurable: true, value: { onLine: true } });
const { pickShards, memoryBudget, BYTES_PER_ITEM } = await import("../public/js/db-client.js");

const MB = 1048576;
const manifest = {
  shards: [
    { id: "food", name: "Food", tier: "core", items: 300_000 },
    { id: "baby", name: "Baby", tier: "core", items: 100_000 },
    { id: "home", name: "Home", tier: "more", items: 600_000 },
    { id: "toys", name: "Toys", tier: "more", items: 400_000 },
    { id: "jewelry", name: "Jewelry", tier: "more", items: 700_000 },
    { id: "party", name: "Party & Occasions", tier: "more", items: 100_000 },
  ],
};

test("memoryBudget: 400 MB when the browser does not say, else ~100 MB per GB within 250–640 MB", () => {
  assert.equal(memoryBudget(undefined), 400 * MB);
  assert.equal(memoryBudget("nope"), 400 * MB);
  assert.equal(memoryBudget(2), 250 * MB, "a 2 GB phone is clamped up to the floor");
  assert.equal(memoryBudget(4), 400 * MB);
  assert.equal(memoryBudget(8), 640 * MB, "Chrome caps deviceMemory at 8");
});

test("pickShards: core always opens; more shards in manifest order while the estimate fits; the rest are named", () => {
  // core = 400k items = 56 MB; a 215 MB budget leaves room for Home (84 MB) and Toys (56 MB), not Jewelry (98 MB);
  // the smaller Party shard after it still fits
  const r = pickShards(manifest, 215 * MB);
  assert.deepEqual(r.open, ["food", "baby", "home", "toys", "party"]);
  assert.deepEqual(r.skipped, [{ id: "jewelry", name: "Jewelry", items: 700_000 }]);
});

test("pickShards: core opens even when it alone exceeds the budget", () => {
  const r = pickShards(manifest, 10 * MB);
  assert.deepEqual(r.open, ["food", "baby"]);
  assert.equal(r.skipped.length, 4);
});

test("pickShards: a budget that exactly fits opens everything (the boundary is <=); a format-2 pack is one core shard", () => {
  assert.deepEqual(pickShards(manifest, manifest.shards.reduce((a, s) => a + s.items, 0) * BYTES_PER_ITEM).skipped, []);
  assert.deepEqual(pickShards({ items: 760_000, files: {} }, 1), { open: ["all"], skipped: [] });
});
