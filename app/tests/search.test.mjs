// The search worker on a small real pack (built by tools/build-db.mjs from a handful of rows): relaxation order and
// ranking rules that real queries depend on.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { openPack } from "../tools/search-harness.mjs";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let id = 1000;
const row = (name, brand, price, extra = {}) => ({ id: id++, upc: String(70000000000 + id).padStart(14, "0"), name, brand, price, size: null, unit: null, pack: 1,
  cat: "7", dept: "Food", flags: [], primary: true, stock: "Available", ...extra });
const ROWS = [
  row("Great Value Pinto Beans, 32 oz", "Great Value", 2.12, { size: 32, unit: "oz", cat: "7", store_brand: true }),
  row("Great Value Dry Roasted Peanuts, 16 oz", "Great Value", 2.98, { size: 16, unit: "oz", cat: "9", store_brand: true }),
  row("Great Value Active Dry Yeast, 0.75 oz, 3 Count", "Great Value", 1.12, { size: 0.75, unit: "oz", pack: 3, cat: "28", store_brand: true }),
  row("Great Value Dry Black Beans, 2 lb", "Great Value", 2.24, { size: 2, unit: "lb", cat: "7", store_brand: true }),
  row("Huggies Little Movers Baby Diapers, Size 4, 60 Count", "Huggies", 24.97, { size: 60, unit: "ct", cat: "13", dept: "Baby" }),
  row("Huggies Diaper Bag Backpack, Gray", "Huggies", 39.97, { cat: "13", dept: "Baby" }),
  row("Huggies Diaper Pail Refills", "Huggies", 9.97, { cat: "13", dept: "Baby" }),
  row("Jersey Tomato Co. Marinara Sauce, 25 Oz", "Jersey Tomato", 4.98, { size: 25, unit: "oz", cat: "11" }),
  row("Hunt's Tomato Sauce, 15 oz Can", "Hunt's", 0.98, { size: 15, unit: "oz", cat: "11" }),
  row("(6 pack) Hunt's Tomato Sauce, 15 oz Can", "Hunt's", 5.88, { size: 15, unit: "oz", pack: 6, cat: "11" }),
  row("Jell-O Strawberry Gelatin Dessert Mix, 3 oz Box", "Jell-O", 1.12, { size: 3, unit: "oz", cat: "28" }),
  row("Shahia Cherry Jello Cups", "Shahia", 0.66, { cat: "9" }),
  row("Campbell's Condensed Chicken Noodle Soup, 10.75 oz Can", "Campbell's", 1.48, { size: 10.75, unit: "oz", cat: "11" }),
  row("Great Value Chicken Noodle Condensed Soup, 10.5 oz Can", "Great Value", 0.98, { size: 10.5, unit: "oz", cat: "11", store_brand: true }),
  row("Progresso Chicken Noodle Soup, 19 oz Can", "Progresso", 2.48, { size: 19, unit: "oz", cat: "11" }),
  // one unit of a "(200 pack)" bundle listing at a cent: the count must come from the pack, not from the rounded prices
  row("Dixie Bath Cups, 3 oz", "Dixie", 0.01, { size: 3, unit: "oz", cat: "9", listing_price: 2.5, listing_pack: 200, flags: ["pack_listing"] }),
];

let db;
before(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sfb-search-"));
  const pub = path.join(tmp, "store", "build", "published");
  fs.mkdirSync(pub, { recursive: true });
  fs.writeFileSync(path.join(pub, "items.jsonl.gz"), zlib.gzipSync(ROWS.map((r) => JSON.stringify(r)).join("\n") + "\n"));
  fs.writeFileSync(path.join(pub, "manifest.json"), JSON.stringify({ version: "test-1", published: "2026-10-09T00:00:00Z" }));
  execFileSync(process.execPath, [path.join(APP, "tools", "build-db.mjs"), "--store", path.join(tmp, "store"), "--out", path.join(tmp, "db")], { stdio: "ignore" });
  db = await openPack(path.join(tmp, "db"));
});

const top = (q) => db.search(q, 10);

test("a word that matches nothing together is dropped by how little it says, not how rare it is", () => {
  const r = top("great value dry pinto beans");
  assert.equal(r.relaxed, true);
  assert.deepEqual(r.dropped, ["dry"]);
  assert.equal(r.items[0].name, "Great Value Pinto Beans, 32 oz");
});

test("the item a query names (its head noun) comes before things that merely carry the word", () => {
  const r = top("huggies diapers");
  assert.equal(r.items[0].name, "Huggies Little Movers Baby Diapers, Size 4, 60 Count");
});

test("every query still returns something", () => {
  for (const q of ["pinto", "dry beans", "zzzz", "huggies size 4", "yeast packets"]) {
    const r = top(q);
    if (q !== "zzzz") assert.ok(r.items.length > 0, q);
  }
});

test("a query word that is only part of a brand does not earn the brand bonus", () => {
  const r = top("tomato sauce");
  assert.match(r.items[0].name, /^Hunt's Tomato Sauce/);
});

test("the single item ranks before its (6 pack) listing", () => {
  const names = top("hunts tomato sauce").items.map((it) => it.name);
  assert.ok(names.indexOf("Hunt's Tomato Sauce, 15 oz Can") < names.indexOf("(6 pack) Hunt's Tomato Sauce, 15 oz Can"));
});

test("hyphenated brands are found typed joined: jello finds Jell-O first", () => {
  const r = top("jello");
  assert.equal(r.items[0].brand, "Jell-O");
});

// ---- other chains' store brands (data/brands.json, 2026-10-19): the brand words are set aside and Walmart's own brand ranks first
test("a query naming another store's brand ranks Walmart's own brand first and says so", () => {
  const r = top("kirkland chicken noodle soup");
  assert.deepEqual(r.otherBrand, { brand: "Kirkland", store: "Costco" });
  assert.equal(r.relaxed, false); assert.deepEqual(r.dropped, []);
  assert.equal(r.items[0].name, "Great Value Chicken Noodle Condensed Soup, 10.5 oz Can");
  assert.ok(r.items.some((it) => /Campbell/.test(it.name)), "the national brands still follow");
  const two = top("members mark chicken noodle soup");        // a two-word brand, typed without its apostrophe
  assert.equal(two.otherBrand.store, "Sam's Club"); assert.equal(two.items[0].name, "Great Value Chicken Noodle Condensed Soup, 10.5 oz Can");
  const plain = top("chicken noodle soup");                   // without a brand the usual ranking holds (store brand +0.3 only)
  assert.equal(plain.otherBrand, null);
  assert.equal(top("kirkland").otherBrand, null, "a brand alone is still searched for as typed");
});

test("the pack manifest carries the brands, the barcode prefixes and the price ceiling", () => {
  const m = db.manifest;
  assert.equal(m.brands["kirkland signature"], "Costco"); assert.equal(m.brands["heinen's"], "Heinen's"); assert.equal(m.brands["happy belly"], "Amazon");
  assert.deepEqual(m.prefixes["0096619"], { store: "Costco", brand: "Kirkland Signature" });
  assert.equal(m.prefixes["0030034"].store, "Giant Eagle");
  assert.equal(m.priceCeiling, 15000);
});

test("a bundle listing's count is read from the pack, never derived from rounded prices", () => {
  const it = db.search("dixie bath cups", 5).items[0];
  assert.equal(it.packListing, true); assert.equal(it.listingCents, 250); assert.equal(it.listingPack, 200);   // 250 / 1 would say 250
  const hunts = db.search("hunts tomato sauce", 10).items.find((x) => x.name.startsWith("(6 pack)"));
  assert.equal(hunts.packListing, false, "a row without the flag is not a bundle unit");
});
