// Rules about app.js that a unit test cannot reach (app.js runs only in a page): checked against its source.
// The behaviour each guards is also exercised in the browser by tools/ui-check.mjs where a page can show it.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const src = fs.readFileSync(new URL("../public/js/app.js", import.meta.url), "utf8");

test("every chip in the item sheet is escaped: an equivalent's quantity is third-party text (audit P2-001)", () => {
  const chips = src.match(/chips\.map\(\(c\) => `[^`]*`\)/g) || [];
  assert.ok(chips.length >= 1, "the chips template is where this test expects it");
  for (const c of chips) assert.match(c, /\$\{esc\(c\)\}/, c);
});

test("Reset app data removes the barcode matches remembered on this phone (privacy page; audit F-W01-002)", () => {
  const reset = src.match(/act === "reset-yes"[\s\S]{0,400}?location\.reload\(\)/)?.[0] || "";
  assert.match(reset, /LEARNED_KEY/);
  assert.match(fs.readFileSync(new URL("../public/privacy.html", import.meta.url), "utf8"), /barcode matches remembered on the phone[^.]*\. Reset app data in Settings removes them/);
});
