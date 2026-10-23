// The iOS launch screens (tools/icon/make_splash.py): iOS uses an apple-touch-startup-image only when its media query
// names the device's exact CSS size and pixel ratio and the image has exactly that many pixels, so a wrong size is
// silently a white screen again. Each image is the page's boot screen (index.html #boot) rendered at that size, so its
// corners are the layer's own field and its middle holds the icon over its bloom. These checks read
// index.html and decode the PNGs themselves; nothing runs in a browser.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const PUB = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const html = fs.readFileSync(path.join(PUB, "index.html"), "utf8");
const links = [...html.matchAll(/<link rel="apple-touch-startup-image" href="\.\/([^"]+)" media="([^"]+)">/g)].map(([, href, media]) => {
  const n = (k) => Number((media.match(new RegExp(`\\(${k}: ([\\d.]+)(?:px)?\\)`)) || [])[1]);
  return { href, media, w: n("device-width"), h: n("device-height"), r: n("-webkit-device-pixel-ratio"),
    orient: (media.match(/\(orientation: (\w+)\)/) || [])[1], dark: media.includes("(prefers-color-scheme: dark)") };
});
// the boot screen's field at the top corners: a deep green under its vignette in dark, the paper's mint in light
const CORNER = { dark: ([r, g, b]) => g >= 14 && g <= 70 && r < g / 2 && b < g / 2, light: ([r, g, b]) => r > 200 && g > 205 && b > 195 && g >= r };

/** Width, height and a pixel reader for an 8-bit, non-interlaced PNG (RGB, RGBA or palette), decoded from its chunks. */
function png(file) {
  const b = fs.readFileSync(file);
  assert.equal(b.subarray(1, 4).toString(), "PNG", `${file} is a PNG`);
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20), depth = b[24], type = b[25], interlace = b[28];
  assert.equal(depth, 8, `${file}: 8 bits per sample`); assert.equal(interlace, 0, `${file}: not interlaced`);
  let palette = null; const idat = [];
  for (let i = 8; i < b.length;) {
    const len = b.readUInt32BE(i), kind = b.subarray(i + 4, i + 8).toString(), data = b.subarray(i + 8, i + 8 + len);
    if (kind === "PLTE") palette = data;
    if (kind === "IDAT") idat.push(data);
    i += 12 + len;
  }
  const bpp = type === 2 ? 3 : type === 6 ? 4 : type === 3 ? 1 : null;
  assert.ok(bpp, `${file}: colour type ${type} is RGB, RGBA or palette`);
  const raw = zlib.inflateSync(Buffer.concat(idat)), stride = w * bpp, out = Buffer.alloc(h * stride);
  for (let y = 0, p = 0; y < h; y++) {
    const f = raw[p++], row = y * stride, prev = row - stride;
    for (let x = 0; x < stride; x++, p++) {
      const a = x >= bpp ? out[row + x - bpp] : 0, u = y ? out[prev + x] : 0, c = x >= bpp && y ? out[prev + x - bpp] : 0;
      let v = raw[p];
      if (f === 1) v += a; else if (f === 2) v += u; else if (f === 3) v += (a + u) >> 1;
      else if (f === 4) { const q = a + u - c, pa = Math.abs(q - a), pb = Math.abs(q - u), pc = Math.abs(q - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? u : c; }
      out[row + x] = v & 255;
    }
  }
  const px = (x, y) => { const i = y * stride + x * bpp; return type === 3 ? [palette[out[i] * 3], palette[out[i] * 3 + 1], palette[out[i] * 3 + 2]] : [out[i], out[i + 1], out[i + 2]]; };
  return { w, h, px };
}
const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

test("every launch screen has the exact pixels its media query names and is the boot screen", () => {
  assert.equal(links.length, 62, "13 iPhone sizes in portrait and 9 iPad sizes in both orientations, light and dark");
  for (const l of links) {
    const f = path.join(PUB, l.href);
    assert.ok(fs.existsSync(f), l.href);
    const p = png(f);
    const [pw, ph] = l.orient === "landscape" ? [l.h * l.r, l.w * l.r] : [l.w * l.r, l.h * l.r];
    assert.deepEqual([p.w, p.h], [pw, ph], `${l.href}: ${l.media}`);
    // the corners are the layer's field (the image is the boot screen, not a logo on a page background)
    const corner = CORNER[l.dark ? "dark" : "light"];
    for (const [x, y] of [[0, 0], [pw - 1, 0]]) assert.ok(corner(p.px(x, y)), `${l.href}: the ${l.dark ? "dark" : "light"} field at (${x}, ${y}): ${p.px(x, y)}`);
    // the icon sits above the centre over its bloom: the bloom is lit against the corner, the icon's bars are white
    const iconY = (ph >> 1) - Math.round((0.03 * (l.orient === "landscape" ? l.w : l.h) + (l.w >= 700 ? 48 : 36)) * l.r);
    const edge = lum(p.px(0, 0)), bloom = lum(p.px((pw >> 1) + Math.round(100 * l.r), iconY));
    assert.ok(l.dark ? bloom > edge + 20 : bloom < edge - 2, `${l.href}: the bloom beside the icon (${bloom.toFixed(0)}) differs from the corner (${edge.toFixed(0)})`);
    // the layer fills the screen: a desktop-style scrollbar gutter once left a 15 px strip of page down the right edge
    const patch = (x0) => { let t = 0; for (let x = x0; x < x0 + 8; x++) for (let y = (ph >> 1) - 4; y < (ph >> 1) + 4; y++) t += lum(p.px(x, y)); return t / 64; };
    const [lft, rgt] = [patch(0), patch(pw - 8)];   // 8x8 means: the dithering moves single pixels by a few levels
    assert.ok(Math.abs(lft - rgt) <= 4, `${l.href}: the left and right edges match at mid height (${lft.toFixed(1)} vs ${rgt.toFixed(1)})`);
    let bars = 0;
    for (let x = (pw >> 1) - 30 * l.r; x <= (pw >> 1) + 30 * l.r; x++) bars = Math.max(bars, lum(p.px(x, iconY - 18 * l.r)));
    assert.ok(bars > 180, `${l.href}: the icon's white bars across its middle (brightest ${bars.toFixed(0)})`);
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
