/* sw.js — app shell service worker.
   The shell (HTML, CSS, JS, fonts, wasm, icons) is precached per build and served cache-first, so the app
   opens with no network. Database packs are NOT handled here: db-client.js keeps them in its own Cache
   Storage buckets per snapshot version. `db/current.json` is network-first so a new snapshot is noticed. */

const VERSION = "__BUILD__";
const SHELL = `sfb-shell-${VERSION}`;
const DYN = "sfb-dyn";
const ASSETS = __ASSETS__;

self.addEventListener("install", (e) => {
  // bypass the browser's HTTP cache: a new build must precache the bytes on the server, never a year-old copy
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: "reload" })))));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const n of await caches.keys()) if (n.startsWith("sfb-shell-") && n !== SHELL) await caches.delete(n);
    await self.clients.claim();
  })());
});

self.addEventListener("message", (e) => { if (e.data?.type === "SKIP_WAITING") self.skipWaiting(); });

const scope = new URL(self.registration.scope);
const INDEX = scope.href;                                         // the page lives at the scope root (see build-site.mjs)

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== scope.origin) return;                       // live-check Worker etc. go straight out
  if (url.pathname.startsWith(scope.pathname + "db/")) {
    if (url.pathname.endsWith("/current.json")) e.respondWith(networkFirst(req));
    return;                                                       // pack files: handled by db-client
  }
  if (req.mode === "navigate") {
    // The privacy page is a page of its own (linked from About; the Play listing's privacy policy). Cloudflare answers
    // /privacy.html with a redirect to /privacy (html_handling "auto-trailing-slash"), so the precached copy is a
    // redirected response, which a navigation must not be answered with: it is re-wrapped. Every other navigation is
    // the app. (Audit W9-01, 2026-10-21: the app opened instead of the privacy page.)
    const rel = url.pathname.slice(scope.pathname.length);
    if (rel === "privacy.html" || rel === "privacy") {
      e.respondWith(caches.match(new URL("privacy.html", scope).href, { ignoreSearch: true })
        .then((r) => (r ? new Response(r.body, { status: 200, statusText: "OK", headers: r.headers }) : fetch(req))));
      return;
    }
    e.respondWith(caches.match(INDEX, { ignoreSearch: true }).then((r) => r || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req)));
});

async function networkFirst(req) {
  const dyn = await caches.open(DYN);
  try {
    const res = await fetch(req, { cache: "no-store" });
    if (res.ok) dyn.put(req, res.clone());
    return res;
  } catch {
    const cached = await dyn.match(req);
    return cached || new Response(JSON.stringify({ error: "offline" }), { status: 503, headers: { "content-type": "application/json" } });
  }
}
