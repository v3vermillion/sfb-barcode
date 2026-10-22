// The iOS launch screens (tools/icon/make_splash.py): iOS uses an apple-touch-startup-image only when its media query
// names the device's exact CSS size and pixel ratio and the image has exactly that many pixels, so a wrong size is
// silently a white screen again. These checks read index.html and the PNG headers; nothing runs in a browser.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUB = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const html = fs.readFileSync(path.join(PUB, "index.html"), "utf8");
const links = [...html.matchAll(/<link rel="apple-touch-startup-image" href="\.\/([^"]+)" media="([^"]+)">/g)].map(([, href, media]) => {
  const n = (k) => Number((media.match(new RegExp(`\\(${k}: ([\\d.]+)(?:px)?\\)`)) || [])[1]);
  return { href, media, w: n("device-width"), h: n("device-height"), r: n("-webkit-device-pixel-ratio"),
    orient: (media.match(/\(orientation: (\w+)\)/) || [])[1], dark: media.includes("(prefers-color-scheme: dark)") };
});

/** Width, height and the palette (RGB triples, for an indexed PNG) from the file's own chunks. */
function png(file) {
  const b = fs.readFileSync(file);
  assert.equal(b.subarray(1, 4).toString(), "PNG", `${file} is a PNG`);
  const out = { w: b.readUInt32BE(16), h: b.readUInt32BE(20), palette: null };
  for (let i = 8; i < b.length;) {
    const len = b.readUInt32BE(i), type = b.subarray(i + 4, i + 8).toString();
    if (type === "PLTE") out.palette = new Set(Array.from({ length: len / 3 }, (_, k) => b.subarray(i + 8 + 3 * k, i + 11 + 3 * k).toString("hex")));
    i += 12 + len;
  }
  return out;
}

test("every launch screen has the exact pixels its media query names, on the page's own background", () => {
  assert.equal(links.length, 62, "13 iPhone sizes in portrait and 9 iPad sizes in both orientations, light and dark");
  for (const l of links) {
    const f = path.join(PUB, l.href);
    assert.ok(fs.existsSync(f), l.href);
    const p = png(f);
    const [pw, ph] = l.orient === "landscape" ? [l.h * l.r, l.w * l.r] : [l.w * l.r, l.h * l.r];
    assert.deepEqual([p.w, p.h], [pw, ph], `${l.href}: ${l.media}`);
    if (p.palette) assert.ok(p.palette.has(l.dark ? "030604" : "f8f6f2"), `${l.href} carries the ${l.dark ? "dark" : "light"} page background`);
  }
  const files = fs.readdirSync(path.join(PUB, "splash"));
  assert.equal(files.length, links.length, "no image without a link");
  // Cloudflare answers a path with "@" (or another character it re-encodes) with a 307 to the encoded form; a launch
  // image must be served directly (2026-10-22: the first deploy named them 402x874@3x-portrait.png)
  for (const l of links) assert.match(l.href, /^splash\/[a-z0-9-]+\.png$/, `${l.href}: a plain file name`);
});

test("current and older iPhones are covered, in portrait; iPads in both orientations", () => {
  const phone = (w, h, r) => links.some((l) => !l.dark && l.w === w && l.h === h && l.r === r && l.orient === "portrait");
  for (const [w, h, r] of [[440, 956, 3], [402, 874, 3], [420, 912, 3], [430, 932, 3], [393, 852, 3], [390, 844, 3],
    [428, 926, 3], [375, 812, 3], [414, 896, 3], [414, 896, 2], [414, 736, 3], [375, 667, 2], [320, 568, 2]]) {
    assert.ok(phone(w, h, r), `iPhone ${w}x${h}@${r}x`);
  }
  for (const l of links.filter((x) => x.r === 2 && x.w >= 744)) {
    assert.ok(links.some((m) => m.w === l.w && m.h === l.h && m.dark === l.dark && m.orient !== l.orient), `iPad ${l.w}x${l.h} in both orientations`);
  }
});

test("dark images come after every light one and only add the colour-scheme condition", () => {
  const firstDark = links.findIndex((l) => l.dark);
  assert.ok(firstDark > 0 && links.slice(firstDark).every((l) => l.dark), "light first, then dark: an iOS that ignored the condition still shows the light image");
  assert.ok(links.slice(0, firstDark).every((l) => !l.media.includes("prefers-color-scheme")));
  for (const d of links.slice(firstDark)) {
    assert.ok(links.some((l) => !l.dark && l.media + " and (prefers-color-scheme: dark)" === d.media), `${d.href} pairs with a light image`);
  }
});
