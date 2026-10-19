// resolve.js — turns a scanned/typed code or a chosen search hit into a priced resolution, following
// docs/WORKFLOW.md: exact item (incl. retired UPCs) → store-printed price label → produce PLU →
// equivalent value (basis item shown) → closest match (flagged). A resolution always carries a price unless
// the code is simply unknown, in which case the UI offers the name search and the live Walmart check.

import { classifyCode, formatGtin, toGtin14 } from "./barcode.js";

export const KIND_LABEL = {
  exact: "Exact item",
  closest: "Closest match",
  "store-label": "Store price label",
  plu: "Produce code",
  equivalent: "Equivalent value",
  live: "Live Walmart price",
  unknown: "Not in price list",
  "not-ready": "Price list loading",
};

export function kindLabel(res) {
  return KIND_LABEL[res.kind] || res.kind;
}

/** Walmart names usually already start with the brand ("Great Value Peanut Butter…"); never print it twice. */
export function splitTitle(item) {
  const brand = (item.brand || "").trim(), name = (item.name || "").trim();
  if (!brand) return { pre: "", brand: "", rest: name };
  const i = name.toLowerCase().indexOf(brand.toLowerCase());
  if (i >= 0) return { pre: name.slice(0, i), brand: name.slice(i, i + brand.length), rest: name.slice(i + brand.length) };   // "(2 pack) Great Value …"
  return { pre: "", brand, rest: ` ${name}` };
}
export function titleOf(item) {
  const { pre, brand, rest } = splitTitle(item);
  return (pre + brand + rest).trim();
}

export function sizeText(item) {
  if (item.size && item.unit) return `${fmtNum(item.size)} ${item.unit}`;
  return "";
}

function moneyText(cents) {
  return "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtNum(n) {
  if (n == null || Number.isNaN(n)) return "";
  const r = Math.round(n * 100) / 100;
  return Number.isInteger(r) ? String(r) : String(r).replace(/0+$/, "");
}

/** The store whose company prefix a barcode starts with (data/brands.json via the manifest: {prefix: {store, brand}}),
 * or null. The prefix is compared with the 13-digit form of the code. */
export function storeOfCode(gtin14, prefixes) {
  if (!gtin14 || !prefixes) return null;
  const ean = String(gtin14).padStart(14, "0").slice(1);
  let best = null;
  for (const [p, v] of Object.entries(prefixes)) if (ean.startsWith(p) && (!best || p.length > best.p.length)) best = { p, v };
  return best ? { store: best.v.store, brand: best.v.brand, prefix: best.p } : null;
}

/** Resolution from a search hit the volunteer tapped (or the listing a barcode found). otherBrand: the other chain's
 * store brand the query named (the item is Walmart's equivalent); learned: a match remembered on this phone. */
export function fromItem(item, { closest = false, query = "", dropped = [], otherBrand = null, learned = null } = {}) {
  if (item.priceWithheld) {
    // Walmart's own price for this listing is implausible (data/gates.json price_sanity): the snapshot values it at an
    // equivalent instead, so the volunteer still gets a sensible value and sees where it came from
    return {
      kind: "equivalent", code: item.upc, gtin: item.upc, item, others: [],
      equiv: { withheld: true, rawCents: item.rawPriceCents, confidence: item.valueConfidence, basis: item.valueBasis },
      priceCents: item.priceCents, unit: item.basis === "lb" ? "lb" : "each", title: titleOf(item),
      key: item.upc ? `g:${item.upc}` : `r:${item.rank}`, query, dropped,
    };
  }
  return {
    kind: closest || otherBrand || learned ? "closest" : "exact",
    code: item.upc, gtin: item.upc, item, others: [],
    priceCents: item.priceCents,
    unit: item.basis === "lb" ? "lb" : "each",
    title: titleOf(item),
    key: item.upc ? `g:${item.upc}` : `r:${item.rank}`,
    query, dropped,
    ...(otherBrand ? { otherBrand } : {}), ...(learned ? { learned } : {}),
    // Walmart listed the item only as a "(N pack)" bundle: the price is one unit of it; the bundle's own price is the
    // alternate the sheet offers (a volunteer may hold the whole bundle)
    ...(item.packListing && item.listingCents > 0 && item.listingPack > 1 ? { listing: { cents: item.listingCents, n: item.listingPack } } : {}),
  };
}

// Walmart's bundle listings start with "(N pack)" / "(N pk)" / "(N-Pack)" and are priced for all N units (the crawler's
// normalize.pack_listing rule, measured 2026-10-19). The live check applies the same reading to the listings Walmart
// returns, so a live bundle price is never compared with, or used as, the price of one unit.
const PACK_LISTING_RX = /^\s*(?:\(\s*\d+\s*-?\s*(?:pack|pk)\s*\)\s*)+/i;
export function packListingOf(name) {
  const m = PACK_LISTING_RX.exec(String(name ?? ""));
  if (!m) return null;
  const counts = [...m[0].matchAll(/\(\s*(\d+)\s*-?\s*(?:pack|pk)\s*\)/gi)].map((x) => Number(x[1]));
  const n = Math.max(0, ...counts);
  return n > 1 ? { n, name: String(name).slice(m[0].length).trim() } : null;
}
/** A live listing's price for one unit: its price, or a bundle listing's price divided by its count. */
export function liveUnitCents(listing) {
  const cents = Math.round(Number(listing?.price) * 100);
  if (!Number.isFinite(cents)) return NaN;
  const w = packListingOf(listing?.name);
  return w ? Math.round(cents / w.n) : cents;
}

/** Pick the listing for a barcode: the one whose Walmart id the caller wants, else the primary (first). */
function pickListing(items, preferId) {
  if (preferId != null) { const i = items.findIndex((it) => String(it.id) === String(preferId)); if (i > 0) return [items[i], ...items.filter((_, k) => k !== i)]; }
  // a listing with Walmart's own (plausible) price beats one whose price was withheld
  if (items.length > 1 && items[0].priceWithheld) { const i = items.findIndex((it) => !it.priceWithheld); if (i > 0) return [items[i], ...items.filter((_, k) => k !== i)]; }
  return items;
}

/**
 * Resolve any code (scanned or typed digits). Returns null when the text isn't a code at all.
 * @param {{lookupPlu:Function, lookupUpc:Function}} db
 * @param {object} [opts] scanned: the code came from the camera (no typed-input heuristics); preferId: Walmart id to prefer among listings;
 *   prefixes: the manifest's barcode company prefixes ({prefix: {store, brand}}); learned: gtin14 -> {key, title, at} | null,
 *   the matches remembered on this phone (a barcode nothing knew, matched by a search by name and added to the tally)
 */
export async function resolveCode(db, raw, format, { scanned = false, preferId = null, prefixes = null, learned = null } = {}) {
  const cls = classifyCode(raw, format, { scanned });
  if (cls.kind === "text") return null;

  if (cls.kind === "plu") {
    const e = await db.lookupPlu(cls.plu);
    if (e?.notReady) return { kind: "not-ready", code: cls.digits, title: "The price list is still loading", priceCents: null, unit: "each", key: `n:${cls.digits}` };
    if (e) {
      return {
        kind: "plu", code: cls.digits, plu: cls, entry: e, item: e.item || null,
        priceCents: Math.round(e.price * 100), unit: e.unit === "lb" ? "lb" : "each",
        title: (cls.organic ? "Organic " : "") + e.name, key: `p:${cls.digits}`,
      };
    }
    return { kind: "unknown", code: cls.digits, codeType: "PLU", title: `Produce code ${cls.digits}`, priceCents: null, unit: "each", key: `u:${cls.digits}` };
  }

  if (cls.kind === "store-label") {
    if (cls.priceCents == null) {
      // a digit does not check out: no price is better than a wrong one
      return { kind: "unknown", code: cls.digits, codeType: "store-label", badDigits: true, noPrice: true, title: `Label ${formatGtin(cls.digits)}`, priceCents: null, unit: "each", key: `u:${cls.digits}` };
    }
    if (cls.priceCents > 0) {
      return {
        kind: "store-label", code: cls.digits, label: cls, priceCents: cls.priceCents, unit: "each",
        title: "Store-priced item (meat, deli, bakery or weighed produce)", key: `l:${cls.digits}`,
      };
    }
    // a 2-prefix code with no price encoded is a manufacturer's variable-measure code: try the catalog, never show $0.00
    const g = toGtin14(cls.digits, undefined, { scanned: true });
    const r = g ? await db.lookupUpc(g.key) : null;
    if (r?.notReady) return { kind: "not-ready", code: cls.digits, title: "The price list is still loading", priceCents: null, unit: "each", key: `n:${cls.digits}` };
    if (r?.items?.length) { const [item, ...others] = pickListing(r.items, preferId); return { ...fromItem(item), others, gtin: g.gtin14, code: cls.digits, scanned: g }; }
    return { kind: "unknown", code: cls.digits, gtin: g?.gtin14 || null, codeType: "store-label", noPrice: true, title: `Label ${formatGtin(cls.digits)}`, priceCents: null, unit: "each", key: `u:${cls.digits}` };
  }

  // GTIN (try the alternate 8-digit interpretation too, so UPC-E and EAN-8 keyed rows are both found)
  let r = await db.lookupUpc(cls.key);
  if (r?.notReady) return { kind: "not-ready", code: cls.digits, gtin: cls.gtin14, title: "The price list is still loading", priceCents: null, unit: "each", key: `n:${cls.gtin14}` };
  let gtin = cls.gtin14;
  if (!r?.items?.length && !r?.equivalent && cls.altKey) {
    const r2 = await db.lookupUpc(cls.altKey);
    if (r2?.items?.length || r2?.equivalent) { r = r2; gtin = String(cls.altKey).padStart(14, "0"); }
  }
  if (r?.items?.length) {
    const [item, ...others] = pickListing(r.items, preferId);
    return { ...fromItem(item), others, gtin, code: cls.digits, scanned: cls };
  }
  if (r?.equivalent) {
    const e = r.equivalent;
    const title = titleOf({ brand: e.brand, name: e.name }) + (e.quantity ? `, ${e.quantity}` : "");   // the brand once
    return { kind: "equivalent", code: cls.digits, gtin, equiv: e, priceCents: e.estCents, unit: "each", title, key: `e:${gtin}`, scanned: cls };
  }
  // a barcode this phone matched before (a search by name, added to the tally): the same Walmart item, by its own barcode
  const mem = typeof learned === "function" ? learned(cls.gtin14) : learned?.[cls.gtin14];
  if (mem?.key) {
    const r3 = await db.lookupUpc(mem.key);
    if (r3?.items?.length) {
      const [item, ...others] = pickListing(r3.items, null);
      return { ...fromItem(item, { learned: mem }), others, gtin: cls.gtin14, code: cls.digits, scanned: cls, key: `g:${cls.gtin14}` };
    }
  }
  const store = storeOfCode(cls.gtin14, prefixes);
  return {
    kind: "unknown", code: cls.digits, gtin: cls.gtin14, codeType: cls.type, checkOk: cls.checkOk, ...(store ? { store } : {}),
    title: store ? `${store.brand} item (${store.store})` : `Barcode ${formatGtin(cls.gtin14)}`, priceCents: null, unit: "each", key: `u:${cls.gtin14}`, scanned: cls,
  };
}

/** Human notes that explain the price's provenance; shown under the title. */
export function notesFor(res, ctx = {}) {
  const notes = [];
  const it = res.item;
  if (res.otherBrand) {
    notes.push({ tone: "equiv", text: `${res.otherBrand.brand} is ${res.otherBrand.store}'s own brand, which Walmart does not sell. This Walmart item is its equivalent, and Walmart's own brand is the same price tier.` });
  }
  if (res.learned) {
    notes.push({ tone: "equiv", text: `This barcode is not in the price list. It was matched to this Walmart item on this phone${res.learned.at ? ` on ${new Date(res.learned.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : ""} by a search by name. Not the right item? Search by name again.` });
  }
  if (res.kind === "closest" && !res.learned && (res.dropped?.length || !res.otherBrand)) {
    notes.push({ tone: "warn", text: `No item matched every word of “${res.query}”${res.dropped?.length ? `; “${res.dropped.join(" ")}” was ignored` : ""}. Check the type and size against the donated item.` });
  }
  if (res.kind === "equivalent" && res.equiv.withheld) {
    const e = res.equiv;
    const how = e.basis ? "the closest comparable Walmart item" : e.confidence === "rough" ? "the typical price of items in its category" : "the typical per-unit price of comparable items";
    notes.push({ tone: "equiv", text: `Walmart's listed price${e.rawCents != null ? ` (${moneyText(e.rawCents)})` : ""} is outside the normal range for this kind of item, so it is valued at ${how} instead.` });
  } else if (res.kind === "equivalent") {
    const e = res.equiv;
    notes.push({ tone: "equiv", text: `Not sold at Walmart. Valued at the price of the closest Walmart equivalent by type and size (${e.confidence === "high" ? "close match" : e.confidence === "medium" ? "fair match" : e.confidence === "rough" ? "rough estimate" : "rough match"}).` });
    if (!e.basis) notes.push({ tone: "warn", text: "The Walmart item this estimate was based on is no longer listed, so the value is approximate." });
  }
  if (res.kind === "store-label") {
    // the price line already says the scale printed it; a note appears only when the label needs a second look
    if (res.label.needsConfirm) notes.push({ tone: "warn", text: "This label's price has no check digit of its own. Compare it with the price printed on the label before adding." });
    else if (res.label.checkOk === false) notes.push({ tone: "warn", text: "The barcode's check digit does not match, but the price digits are valid. Compare it with the price printed on the label." });
  }
  if (res.kind === "plu") {
    if (res.entry.source === "typical") notes.push({ tone: "warn", text: "This produce code is not in the current price list. The price shown is the typical Walmart price." });
    if (res.plu.organic) notes.push({ tone: "", text: "Organic (9-prefix). Priced as the conventional item." });
  }
  if (res.kind === "not-ready") {
    notes.push({ tone: "warn", text: "The price list is still loading on this phone. Try again when it is ready." });
  }
  if (res.kind === "unknown") {
    if (res.codeType === "PLU") notes.push({ tone: "warn", text: "This produce code is not in the price list. Search by the produce name instead." });
    else if (res.badDigits) notes.push({ tone: "warn", text: "This label failed its check-digit test, so no price can be read from it. Re-enter the number under the barcode, or search by name." });
    else if (res.noPrice) notes.push({ tone: "warn", text: "This label has no encoded price and is not in the price list. Use the price printed on the label, or search by name." });
    else if (res.store) {
      notes.push({ tone: "equiv", text: `This barcode belongs to ${res.store.store}'s ${res.store.brand} brand, which Walmart does not sell, and it is not on file. Search by name to value it at Walmart's own-brand equivalent; this phone remembers the match for the next scan.` });
      if (res.checkOk === false) notes.push({ tone: "warn", text: "The check digit does not match, so a digit may have been mistyped." });
    } else {
      notes.push({ tone: "warn", text: "This barcode is not in the price list and has no equivalent on file. Search by the name and size on the label; this phone remembers the match for the next scan." });
      if (res.checkOk === false) notes.push({ tone: "warn", text: "The check digit does not match, so a digit may have been mistyped." });
    }
  }
  if (res.scanned?.checkOk === null && (res.kind === "exact" || res.kind === "equivalent" || res.kind === "unknown")) {
    notes.push({ tone: "warn", text: "Entered without its check digit, so the barcode cannot be verified. Confirm that the name matches the package." });
  }
  if (it) {
    if (it.retired) notes.push({ tone: "", text: "This is an older barcode for this item. The price shown is the current price." });
    if (it.carried) notes.push({ tone: "", text: `Walmart did not list a price in the ${ctx.priceDateLong || "latest"} update, so the previous price is shown.` });
    if (it.promo) notes.push({ tone: "", text: "This was a Rollback or sale price at the last update." });
    // Walmart's online stock says nothing about a grocery (88% of the list is "not available" online: store-only goods),
    // so only the store's own shelf is worth a note (2026-10-19)
    if (it.unavailable && it.storePrice) notes.push({ tone: "", text: "Not on the store's shelf at the last update. The price is the store's last one." });
    if (it.unitSuspect) notes.push({ tone: "warn", text: "This price is far from similar items of the same size, so the listing may be a case or multipack. Compare the size and count with the item in your hand." });
    if (it.sizeConflict) notes.push({ tone: "", text: "Walmart's listing shows two sizes. The one in the title is used." });
    if (it.discontinued) notes.push({ tone: "", text: "Walmart marks this item as discontinued. The price is the last one listed." });
    if (it.upc && !it.primary && (res.kind === "exact" || res.kind === "closest")) notes.push({ tone: "", text: "Walmart lists this barcode under more than one item. This is an alternate item." });
    if (res.listing) notes.push({ tone: "", text: `Walmart lists this item only as a pack of ${res.listing.n} (${moneyText(res.listing.cents)}). The price shown is for one.` });
  }
  return notes;
}

// A live price goes through the same believability check as a saved one (crawler/valuation.py): between $0.10 and
// the price list's ceiling (the manifest's priceCeiling: nothing above it is in the list, data/categories.json max_price;
// $10,000 when the pack states none), and within 20x of the saved price when there is one. "ok" | "implausible" | "far".
export function livePlausible(liveCents, savedCents, ceilingCents = 1_000_000) {
  if (!Number.isFinite(liveCents) || liveCents < 10 || liveCents > (ceilingCents || 1_000_000)) return "implausible";
  if (savedCents > 0 && (liveCents * 20 < savedCents || liveCents > savedCents * 20)) return "far";
  return "ok";
}
