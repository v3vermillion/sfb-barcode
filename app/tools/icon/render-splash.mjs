// render-splash.mjs — screenshots of the page's boot screen (index.html #boot, held by ?splash=1) at every launch-screen
// size, for tools/icon/make_splash.py, which decides the sizes, quantizes the images and writes the <link> tags.
//   node tools/icon/render-splash.mjs <jobs.json> <outdir>
// jobs.json: [{ "file", "w", "h", "r", "orient", "theme" }] — CSS size in portrait, pixel ratio, orientation, light|dark.
// Serves public/ itself (tools/serve.mjs) on a local port and renders in Chromium, light and dark by colour scheme.
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const [jobsFile, outDir] = process.argv.slice(2);
if (!jobsFile || !outDir) { console.error("usage: node tools/icon/render-splash.mjs <jobs.json> <outdir>"); process.exit(2); }
const jobs = JSON.parse(fs.readFileSync(jobsFile, "utf8"));
fs.mkdirSync(outDir, { recursive: true });

const PORT = 8793;
const server = spawn(process.execPath, [path.join(APP, "tools", "serve.mjs"), path.join(APP, "public"), String(PORT)], { stdio: ["ignore", "ignore", "inherit"] });
const BASE = `http://127.0.0.1:${PORT}/`;
for (let i = 0; ; i++) {
  try { await fetch(BASE, { method: "HEAD" }); break; } catch { if (i > 50) { console.error("the local server did not answer"); process.exit(1); } await new Promise((r) => setTimeout(r, 100)); }
}
const exe = process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {};   // a preinstalled Chromium
const browser = await chromium.launch({ args: ["--no-sandbox"], ...exe });
try {
  for (const j of jobs) {
    const [w, h] = j.orient === "landscape" ? [j.h, j.w] : [j.w, j.h];
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: j.r, colorScheme: j.theme, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(`${BASE}?splash=1&tour=0`, { waitUntil: "load" });
    // the wordmark's font and the icon are what the screenshot must not miss
    await page.evaluate(() => Promise.all([document.fonts.ready, new Promise((r) => { const i = document.querySelector(".boot-icon"); i.complete ? r() : i.addEventListener("load", r, { once: true }); })]));
    await page.waitForSelector("html[data-splash='1'] #boot"); await page.waitForTimeout(120);
    await page.screenshot({ path: path.join(outDir, j.file), type: "png" });
    await ctx.close();
    process.stdout.write(`${j.file}\n`);
  }
} finally {
  await browser.close();
  server.kill();
}
