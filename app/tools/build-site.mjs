// build-site.mjs — copy public/ into dist/, stamp the service worker with a content hash + precache list,
// and inject deploy-time config (the live-check Worker URL) into index.html. dist/db is left alone.
//   node tools/build-site.mjs [--live https://sfb-pipeline.example.workers.dev] [--out dist]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true] : [])).filter((x) => x.length));
const OUT = path.resolve(APP, args.out || "dist");
const LIVE = (args.live ?? process.env.LIVE_CHECK_URL ?? "").toString().trim();
const PUB = path.join(APP, "public");

function walk(dir, base = dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, base, acc); else acc.push(path.relative(base, p).split(path.sep).join("/"));
  }
  return acc;
}

const files = walk(PUB).sort();
fs.mkdirSync(OUT, { recursive: true });
const hash = crypto.createHash("sha256");
for (const f of files) {
  const src = path.join(PUB, f), dst = path.join(OUT, f);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  if (f !== "sw.js") hash.update(f).update(fs.readFileSync(src));
}
hash.update(LIVE);
const BUILD = hash.digest("hex").slice(0, 10);

// index.html: config stamps
const idx = path.join(OUT, "index.html");
let html = fs.readFileSync(idx, "utf8");
const metaLive = `<meta name="sfb-live-check" content="${LIVE.replace(/"/g, "")}">`;
const metaBuild = `<meta name="sfb-build" content="${BUILD}">`;
html = html.includes('name="sfb-live-check"') ? html.replace(/<meta name="sfb-live-check"[^>]*>/, metaLive) : html.replace("</head>", `  ${metaLive}\n</head>`);
html = html.includes('name="sfb-build"') ? html.replace(/<meta name="sfb-build"[^>]*>/, metaBuild) : html.replace("</head>", `  ${metaBuild}\n</head>`);
fs.writeFileSync(idx, html);

// the stylesheet and the app script carry the build too, so a page can tell it was given parts of two versions (app.js)
const cssPath = path.join(OUT, "app.css");
fs.writeFileSync(cssPath, `${fs.readFileSync(cssPath, "utf8")}\n:root { --shell-build: "${BUILD}"; }\n`);
const jsPath = path.join(OUT, "js", "app.js");
fs.writeFileSync(jsPath, fs.readFileSync(jsPath, "utf8").replace("__SHELL_BUILD__", BUILD));

// sw.js: version + precache list (everything in the shell except the worker itself). The page is cached under
// its root URL "./" only: Cloudflare's auto-trailing-slash handling redirects /index.html to /, and a redirected
// response must never be served for a navigation. The iOS launch screens (splash/, 62 images) are not precached:
// iOS fetches only its own device's image, once, when the app is added to the Home Screen.
const assets = ["./", ...files.filter((f) => f !== "sw.js" && f !== "index.html" && !f.endsWith(".LICENSE") && !f.startsWith("splash/")).map((f) => `./${f}`)];
const swPath = path.join(OUT, "sw.js");
fs.writeFileSync(swPath, fs.readFileSync(swPath, "utf8").replace("__BUILD__", BUILD).replace("__ASSETS__", JSON.stringify(assets)));

// Cloudflare static-asset headers. Rules that match the same path are joined, so the immutable rule is scoped to
// the versioned pack directories and never overlaps current.json. Shell files use the default revalidation; the
// service worker precaches them with cache: "reload" anyway.
fs.writeFileSync(path.join(OUT, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(self), geolocation=()
/
  Cache-Control: no-cache
/sw.js
  Cache-Control: no-cache
/db/current.json
  Cache-Control: no-cache
/build.json
  Cache-Control: no-cache
/db/:version/*
  Cache-Control: public, max-age=31536000, immutable
`);

// Google Play (RUNBOOK "Google Play"): a Trusted Web Activity shows the app without a browser bar only when the site vouches
// for the Android app in /.well-known/assetlinks.json. The statement is the repository variable ANDROID_ASSET_LINKS (the
// JSON array Play Console or PWABuilder gives, with the signing key's SHA-256); without it nothing is written.
const links = (process.env.ANDROID_ASSET_LINKS || "").trim();
if (links) {
  let parsed;
  try { parsed = JSON.parse(links); } catch (e) { throw new Error(`ANDROID_ASSET_LINKS is not JSON: ${e.message}`); }
  if (!Array.isArray(parsed) || !parsed.every((x) => x && x.target && x.target.package_name)) throw new Error("ANDROID_ASSET_LINKS must be an array of asset-link statements");
  fs.mkdirSync(path.join(OUT, ".well-known"), { recursive: true });
  fs.writeFileSync(path.join(OUT, ".well-known", "assetlinks.json"), JSON.stringify(parsed, null, 2) + "\n");
  fs.appendFileSync(path.join(OUT, "_headers"), `/.well-known/assetlinks.json
  Content-Type: application/json
  Cache-Control: no-cache
`);
}

const shellFiles = files.filter((f) => f !== "sw.js" && !f.startsWith("splash/"));     // what a phone downloads (precache)
const shellBytes = shellFiles.reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0);
const splash = files.filter((f) => f.startsWith("splash/"));
const hasDb = fs.existsSync(path.join(OUT, "db", "current.json"));
console.log(`site: ${shellFiles.length} shell files, ${(shellBytes / 1024).toFixed(0)} KB (incl. ${(fs.statSync(path.join(OUT, "vendor", "zxing_reader.wasm")).size / 1024).toFixed(0)} KB wasm), build ${BUILD}, ${splash.length} iOS launch screens (not precached), live-check ${LIVE || "(off)"}, asset links ${links ? "written" : "(off)"}, db ${hasDb ? "present" : "MISSING — run build:db"} -> ${path.relative(APP, OUT)}`);
