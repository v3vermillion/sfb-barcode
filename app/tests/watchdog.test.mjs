// The pipeline Worker's schedule watchdog: dispatches a `continue` run when GitHub's own schedule has gone quiet.
import { test } from "node:test";
import assert from "node:assert/strict";

const NOW = Date.parse("2026-10-14T19:00:00Z");
const ago = (min, status = "completed") => ({ status, created_at: new Date(NOW - min * 60000).toISOString(), run_started_at: new Date(NOW - min * 60000).toISOString() });

function harness({ runs = [], listStatus = 200, dispatchStatus = 204, env: extra = {} } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || "GET", headers: init.headers || {}, body: init.body ? JSON.parse(init.body) : null });
    if (String(url).endsWith("/dispatches")) return new Response(null, { status: dispatchStatus });
    return new Response(JSON.stringify({ workflow_runs: runs }), { status: listStatus });
  };
  const env = { GH_DISPATCH_TOKEN: "ghp_test", GH_REPO: "o/r", GH_BRANCH: "main", WATCHDOG_GAP_MIN: "40", ADMIN_TOKEN: "secret", ...extra };
  return { calls, env };
}

async function mod() { return import("../../pipeline/src/index.js"); }

test("decision: an active run, a fresh run, or an old run", async () => {
  const { watchdogDecision } = await mod();
  assert.equal(watchdogDecision([ago(90), ago(10, "in_progress")], NOW).action, "none");
  assert.equal(watchdogDecision([ago(5, "queued")], NOW).action, "none");
  assert.equal(watchdogDecision([ago(39), ago(300)], NOW).action, "none");
  assert.equal(watchdogDecision([ago(41), ago(300)], NOW).action, "dispatch");
  assert.equal(watchdogDecision([ago(41), ago(300)], NOW, 60).action, "none", "the gap is configurable");
  assert.equal(watchdogDecision([], NOW).action, "dispatch");
  assert.equal(watchdogDecision([{ status: "completed", created_at: "junk" }], NOW).action, "dispatch");
  assert.equal(watchdogDecision([{ status: "completed", created_at: new Date(NOW - 50 * 60000).toISOString() }], NOW).action, "dispatch", "created_at is enough");
});

test("the cron dispatches a continue run when the pipeline sat idle for 40 minutes", async () => {
  const { calls, env } = harness({ runs: [ago(55), ago(400)] });
  const m = await mod();
  const res = await m.watchdog(env, { now: NOW });
  assert.equal(res.dispatched, true); assert.equal(res.action, "dispatch"); assert.equal(res.age_min, 55);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://api.github.com/repos/o/r/actions/workflows/pipeline.yml/runs?per_page=5");
  assert.equal(calls[0].headers.authorization, "Bearer ghp_test"); assert.ok(calls[0].headers["user-agent"]);
  assert.equal(calls[1].method, "POST"); assert.equal(calls[1].url, "https://api.github.com/repos/o/r/actions/workflows/pipeline.yml/dispatches");
  assert.deepEqual(calls[1].body, { ref: "main", inputs: { plan: "continue" } });
  // the scheduled handler is the same code
  calls.length = 0;
  await m.default.scheduled({ cron: "*/20 * * * *" }, env, {});
  assert.equal(calls.length, 2);
});

test("nothing is dispatched while a run is active, soon after a run, without a token, or on a GitHub error", async () => {
  const m = await mod();
  let h = harness({ runs: [ago(10, "in_progress"), ago(100)] });
  assert.equal((await m.watchdog(h.env, { now: NOW })).dispatched, false); assert.equal(h.calls.length, 1);
  h = harness({ runs: [ago(20)] });
  assert.equal((await m.watchdog(h.env, { now: NOW })).dispatched, false); assert.equal(h.calls.length, 1);
  h = harness({ runs: [ago(500)], env: { GH_DISPATCH_TOKEN: "" } });
  const res = await m.watchdog(h.env, { now: NOW });
  assert.equal(res.configured, false); assert.equal(res.action, "none"); assert.equal(h.calls.length, 0, "no GitHub call without a token");
  h = harness({ runs: [ago(500)], listStatus: 401 });
  assert.equal((await m.watchdog(h.env, { now: NOW })).github_status, 401); assert.equal(h.calls.length, 1);
  h = harness({ runs: [ago(500)], dispatchStatus: 422 });
  const r2 = await m.watchdog(h.env, { now: NOW });
  assert.equal(r2.dispatched, false); assert.equal(r2.github_status, 422);
  const { env } = harness();
  globalThis.fetch = async () => { throw new Error("boom"); };
  const r3 = await m.watchdog(env, { now: NOW });
  assert.equal(r3.action, "none"); assert.match(r3.reason, /could not list runs/);
});

test("/watchdog is token-gated and dry=1 only reports; /health shows whether the watchdog is configured", async () => {
  const { calls, env } = harness({ runs: [ago(55)] });
  const m = await mod();
  const hit = (path) => m.default.fetch(new Request("https://w.example" + path), env, { waitUntil: (p) => p });
  assert.equal((await hit("/watchdog")).status, 401);
  const dry = await (await hit("/watchdog?token=secret&dry=1")).json();
  assert.equal(dry.action, "dispatch"); assert.equal(dry.dispatched, false); assert.equal(dry.dry, true);
  assert.equal(calls.filter(c => c.method === "POST").length, 0);
  const live = await (await hit("/watchdog?token=secret")).json();
  assert.equal(live.dispatched, true);
  const health = await (await hit("/health?token=secret")).json();
  assert.equal(health.GH_DISPATCH_TOKEN, true); assert.equal(health.GH_REPO, "o/r");
});
