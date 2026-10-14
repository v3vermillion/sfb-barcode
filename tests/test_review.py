"""Claude sample review with every HTTP call mocked: pass, fail, malformed JSON, missing key, retries, truncation."""
import json, os, unittest
from unittest import mock

import requests

from _fixtures import StoreCase, snapshot_rows, RUN_ID

KEY = "sk-ant-test-key-000"


def api_response(text, stop_reason="end_turn", status=200, usage=None):
    r = mock.Mock()
    r.status_code = status
    r.text = text if status != 200 else ""
    r.json.return_value = {"id": "msg_1", "type": "message", "role": "assistant", "model": "m", "stop_reason": stop_reason,
                           "content": [{"type": "thinking", "thinking": ""}, {"type": "text", "text": text}],
                           "usage": usage or {"input_tokens": 1234, "output_tokens": 56}}
    return r


GOOD = json.dumps({"systematic_junk": False, "junk_rate": 0.01, "junk_examples": [{"id": 1001, "why": "odd size"}], "notes": "Looks clean."})


def models_response(ids, status=200):
    """GET /v1/models: ids given oldest first; created_at rises with the position."""
    r = mock.Mock(); r.status_code = status; r.text = "" if status == 200 else "{}"
    r.json.return_value = {"data": [{"type": "model", "id": m, "display_name": m, "created_at": f"2026-01-{i + 1:02d}T00:00:00Z"}
                                    for i, m in enumerate(ids)], "has_more": False}
    return r


class Review(StoreCase, unittest.TestCase):
    def setUp(self):
        self.setup_store()
        self.rows = snapshot_rows()
        self.write_candidate(self.rows)
        self.sample = self.review.write_sample(self.rows, RUN_ID, n=300)
        os.environ["ANTHROPIC_API_KEY"] = KEY
        self.sleeps = []

    def tearDown(self):
        self.teardown_store()

    def run_review(self, *responses, side_effect=None):
        with mock.patch("crawler.review.requests.post", side_effect=side_effect or list(responses)) as post:
            verdict = self.review.run(sleep=self.sleeps.append)
        return verdict, post

    def verdict_file(self):
        return self.store.read_json(self.qa.CAND / "review-verdict.json")

    def test_write_sample(self):
        self.assertEqual(len(self.sample), len(self.rows))
        lines = (self.qa.CAND / "review-sample.jsonl").read_text().splitlines()
        self.assertEqual(len(lines), len(self.rows))
        first = json.loads(lines[0])
        self.assertEqual(set(first) <= set(self.review.SAMPLE_FIELDS) | {"category"}, True)
        self.assertEqual(first["category"], "Canned & Jarred Foods"); self.assertNotIn("variants", first); self.assertNotIn("flags", first, "empty lists are dropped")
        small = self.review.write_sample(self.rows, RUN_ID, n=20, path=self.root / "s.jsonl")
        again = self.review.write_sample(self.rows, RUN_ID, n=20, path=self.root / "s2.jsonl")
        other = self.review.write_sample(self.rows, "other-run", n=20, path=self.root / "s3.jsonl")
        self.assertEqual(len(small), 20); self.assertEqual(small, again); self.assertNotEqual(small, other)
        self.assertEqual(self.review.read_sample(self.root / "s.jsonl"), small)
        self.assertEqual(self.review.read_sample(self.root / "nope.jsonl"), [])

    def test_pass(self):
        verdict, post = self.run_review(api_response(GOOD))
        self.assertEqual(verdict["status"], "pass"); self.assertFalse(verdict["systematic_junk"]); self.assertEqual(verdict["model_junk_rate"], 0.01); self.assertEqual(verdict["junk_count"], 2, "1 listed, 0.01 x 181 rows implies 2"); self.assertEqual(verdict["junk_rate"], round(2 / 181, 4))
        self.assertEqual(verdict["junk_examples"], [{"id": 1001, "why": "odd size"}]); self.assertEqual(verdict["notes"], "Looks clean.")
        self.assertEqual(verdict["run_id"], RUN_ID); self.assertEqual(verdict["model"], "claude-sonnet-5-5"); self.assertEqual(verdict["max_junk_rate"], 0.05)
        self.assertEqual(verdict["usage"], {"input_tokens": 1234, "output_tokens": 56}); self.assertEqual(verdict["sample_rows"], len(self.rows))
        self.assertEqual(self.verdict_file(), verdict)
        post.assert_called_once()
        args, kwargs = post.call_args
        self.assertEqual(args[0], "https://api.anthropic.com/v1/messages")
        self.assertEqual(kwargs["headers"], {"content-type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01"})
        body = kwargs["json"]
        self.assertEqual(body["model"], "claude-sonnet-5-5"); self.assertEqual(body["max_tokens"], 12000)
        self.assertIn("systematic junk", body["system"]); self.assertIn("Sample review criteria", body["system"])
        self.assertEqual(body["messages"][0]["role"], "user"); self.assertIn('"id":15544057', body["messages"][0]["content"])
        self.assertIn(f"Here are {len(self.rows)} rows", body["messages"][0]["content"])
        self.assertEqual(kwargs["timeout"], 300)
        self.assertNotIn(KEY, json.dumps(verdict), "the key never reaches the verdict")
        # the gate accepts it: check (which clears the verdict), review again, finalize
        price = {str(r["id"]): r["price"] for r in self.rows}
        self.qa.check(wm=mock.Mock(get_items=lambda ids: [{"itemId": int(i), "salePrice": price[str(i)]} for i in ids]))
        self.assertFalse((self.qa.CAND / "review-verdict.json").exists())
        self.run_review(api_response(GOOD))
        self.assertEqual(self.qa.finalize(), "ready")

    def test_hold_thresholds_are_pinned(self):
        """docs/DECISIONS.md 2026-10-13: held on evidence (one-sided 95% Wilson lower bound above the 5% target),
        on systematic junk, or at the 10% hard cap; never on a point estimate a little above the target."""
        sr = {"max_junk_rate": 0.05, "hard_max_junk_rate": 0.10, "confidence": 0.95}
        d = self.review.decide
        self.assertTrue(d(38, 600, False, sr)["ok"]); self.assertFalse(d(39, 600, False, sr)["ok"], "39 of 600 holds")
        self.assertTrue(d(21, 300, False, sr)["ok"]); self.assertFalse(d(22, 300, False, sr)["ok"], "22 of 300 holds")
        self.assertTrue(d(16, 300, False, sr)["ok"], "16 of 300 (issue #20) is not evidence of more than 5%")
        self.assertIn("lower bound", d(39, 600, False, sr)["why"])
        self.assertAlmostEqual(d(39, 600, False, sr)["lower_bound"], 0.0503, places=4); self.assertLess(d(38, 600, False, sr)["lower_bound"], 0.05)
        # the hard cap: a small sample whose bound proves nothing still holds at 10% junk
        self.assertFalse(d(2, 20, False, sr)["ok"]); self.assertIn("hard cap", d(2, 20, False, sr)["why"])
        self.assertTrue(d(1, 20, False, sr)["ok"])
        # systematic junk holds whatever the count; a null target measures only
        self.assertEqual(d(0, 600, True, sr)["why"], "systematic junk")
        self.assertTrue(d(300, 600, False, {"max_junk_rate": None})["ok"]); self.assertFalse(d(0, 600, True, {"max_junk_rate": None})["ok"])
        self.assertEqual(self.review.review_config({"max_junk_rate": 0.05})["hard_max_junk_rate"], 0.1, "default hard cap: twice the target")
        self.assertEqual(self.review.review_config({})["batch_size"], 300)
        # the count never trusts a lazy list below the stated rate
        self.assertEqual(self.review.junk_count(2, 0.10, 181), 18); self.assertEqual(self.review.junk_count(5, 0.01, 181), 5)
        self.assertEqual(self.review.wilson_lower(0, 600), 0.0); self.assertEqual(self.review.wilson_lower(3, 0), 0.0)

    def test_batches_are_pooled(self):
        self.write_gates(sample_review={"batch_size": 100})
        first = json.dumps({"systematic_junk": False, "junk_rate": 0.02, "junk_examples": [{"id": 1, "why": "a"}, {"id": 2, "why": "b"}], "notes": "first"})
        second = json.dumps({"systematic_junk": False, "junk_rate": 0.0, "junk_examples": [{"id": 2, "why": "b again"}, {"id": 3, "why": "c"}], "notes": "second"})
        v, post = self.run_review(api_response(first), api_response(second))
        self.assertEqual(post.call_count, 2)
        sizes = [c.kwargs["json"]["messages"][0]["content"].split(" rows")[0].rsplit(" ", 1)[-1] for c in post.call_args_list]
        self.assertEqual(sizes, ["100", "81"])
        self.assertEqual(v["status"], "pass"); self.assertEqual(v["sample_rows"], 181)
        self.assertEqual([b["rows"] for b in v["batches"]], [100, 81]); self.assertEqual([b["junk_count"] for b in v["batches"]], [2, 2])
        self.assertEqual(v["junk_count"], 4); self.assertEqual(v["junk_listed"], 3, "an example listed by both batches counts once in the list")
        self.assertEqual(v["junk_rate"], round(4 / 181, 4)); self.assertEqual(v["notes"], "first | second")
        self.assertEqual(v["usage"], {"input_tokens": 2468, "output_tokens": 112}); self.assertEqual(v["hold_reason"], "ok")
        # a cut-off first batch is retried once; the second batch still runs
        cut = '{"junk_rate": 0.01, "systematic_junk": false, "junk_examples": [], "notes": "cut'
        v, post = self.run_review(api_response(cut, stop_reason="max_tokens"), api_response(first), api_response(second))
        self.assertEqual(post.call_count, 3); self.assertEqual(v["status"], "pass"); self.assertEqual(v["max_tokens"], 20000)
        # one batch reporting systematic junk holds the whole sample
        bad = json.dumps({"systematic_junk": True, "junk_rate": 0.0, "junk_examples": [], "notes": "all bundles"})
        v, _ = self.run_review(api_response(first), api_response(bad))
        self.assertEqual((v["status"], v["hold_reason"]), ("fail", "systematic junk"))
        # a lazy list: the model says 10% but lists two rows; the count follows the rate and the bound holds it
        lazy = json.dumps({"systematic_junk": False, "junk_rate": 0.10, "junk_examples": [{"id": 1, "why": "a"}, {"id": 2, "why": "b"}]})
        v, _ = self.run_review(api_response(lazy), api_response(lazy))
        self.assertEqual(v["junk_count"], 18); self.assertEqual(v["junk_listed"], 2); self.assertEqual(v["status"], "fail")
        self.assertIn("lower bound", v["hold_reason"])
        # an API failure on the second batch is an error that names the batch
        v, post = self.run_review(api_response(first), api_response("nonsense"))
        self.assertEqual(v["status"], "error"); self.assertEqual(len(v["batches"]), 2); self.assertIn("error", v["batches"][1])

    def test_model_from_environment(self):
        os.environ["SFB_REVIEW_MODEL"] = "claude-opus-5-5"
        verdict, post = self.run_review(api_response(GOOD))
        self.assertEqual(post.call_args.kwargs["json"]["model"], "claude-opus-5-5"); self.assertEqual(verdict["model"], "claude-opus-5-5")

    def test_fail_verdicts(self):
        v, _ = self.run_review(api_response(json.dumps({"systematic_junk": True, "junk_rate": 0.02, "junk_examples": [], "notes": "every Beauty row is a bundle"})))
        self.assertEqual(v["status"], "fail"); self.assertTrue(v["systematic_junk"])
        v, _ = self.run_review(api_response(json.dumps({"systematic_junk": False, "junk_rate": 0.2, "junk_examples": []})))
        self.assertEqual(v["status"], "fail"); self.assertEqual(v["model_junk_rate"], 0.2)
        self.write_gates(sample_review={"max_junk_rate": 0.3, "hard_max_junk_rate": None})
        v, _ = self.run_review(api_response(json.dumps({"systematic_junk": False, "junk_rate": 0.2, "junk_examples": []})))
        self.assertEqual(v["status"], "pass", "the limit comes from data/gates.json when the candidate has no gates.json yet")
        self.assertEqual(v["max_junk_rate"], 0.3)
        # once qa.check recorded thresholds for this candidate, those win (an edit applies at the next check)
        price = {str(r["id"]): r["price"] for r in self.rows}
        self.qa.check(wm=mock.Mock(get_items=lambda ids: [{"itemId": int(i), "salePrice": price[str(i)]} for i in ids]))
        self.write_gates(sample_review={"max_junk_rate": 0.1})
        v, _ = self.run_review(api_response(json.dumps({"systematic_junk": False, "junk_rate": 0.2, "junk_examples": []})))
        self.assertEqual(v["status"], "pass"); self.assertEqual(v["max_junk_rate"], 0.3)
        self.write_gates(sample_review={"max_junk_rate": None})
        self.qa.check(wm=mock.Mock(get_items=lambda ids: [{"itemId": int(i), "salePrice": price[str(i)]} for i in ids]))
        v, _ = self.run_review(api_response(json.dumps({"systematic_junk": False, "junk_rate": 0.9, "junk_examples": []})))
        self.assertEqual(v["status"], "pass", "null max_junk_rate: only systematic junk fails"); self.assertIsNone(v["max_junk_rate"])

    def test_robust_parsing(self):
        fenced = "Here is my assessment:\n```json\n" + GOOD + "\n```\nLet me know."
        v, _ = self.run_review(api_response(fenced))
        self.assertEqual(v["status"], "pass"); self.assertEqual(v["model_junk_rate"], 0.01)
        v, _ = self.run_review(api_response('{"systematic_junk": "false", "junk_rate": "3%", "junk_examples": {"id": 5, "why": "x"}, "notes": null}'))
        self.assertEqual(v["status"], "pass"); self.assertEqual(v["model_junk_rate"], 0.03); self.assertEqual(v["junk_examples"], [{"id": 5, "why": "x"}]); self.assertEqual(v["notes"], "")
        v, _ = self.run_review(api_response('{"systematic_junk": false, "junk_rate": 2, "junk_examples": ["a string"]}'))
        self.assertEqual(v["model_junk_rate"], 0.02, "a percentage given as a number"); self.assertEqual(v["junk_examples"], [{"id": None, "why": "a string"}])
        v, _ = self.run_review(api_response('Prose first {"junk_rate": 0.0, "systematic_junk": false} prose after'))
        self.assertEqual(v["status"], "pass")
        echoed = '```\n{"id": 5, "why": "album"}\n```\n```json\n{"systematic_junk": true, "junk_rate": 0.2}\n```'
        v, _ = self.run_review(api_response(echoed))
        self.assertEqual(v["status"], "fail", "the verdict after an echoed example object is found")
        self.assertEqual(v["model_junk_rate"], 0.2)

    def test_malformed_answers_are_errors(self):
        v, _ = self.run_review(api_response("The sample looks fine to me."))
        self.assertEqual(v["status"], "error"); self.assertIn("unparseable", v["reason"]); self.assertEqual(self.verdict_file()["status"], "error")
        v, _ = self.run_review(api_response('{"systematic_junk": false}'))
        self.assertIn("junk_rate missing", v["reason"])
        v, _ = self.run_review(api_response('{"junk_rate": 0.5}'))
        self.assertIn("systematic_junk missing", v["reason"])
        v, _ = self.run_review(api_response('{"junk_rate": 7.5, "systematic_junk": false}'))
        self.assertEqual(v["model_junk_rate"], 0.075, "a number between 1 and 100 is read as a percentage")
        v, _ = self.run_review(api_response('{"junk_rate": 150, "systematic_junk": false}'))
        self.assertIn("out of range", v["reason"])
        v, _ = self.run_review(api_response('{"junk_rate": -0.1, "systematic_junk": false}'))
        self.assertIn("out of range", v["reason"])
        v, _ = self.run_review(api_response('{"junk_rate": 0.1, "systematic_junk": "maybe"}'))
        self.assertIn("not a boolean", v["reason"])
        v, _ = self.run_review(api_response(""))
        self.assertEqual(v["status"], "error")
        cut = '{"junk_rate": 0.01, "systematic_junk": false, "junk_examples": [], "notes": "cut'
        v, post = self.run_review(api_response(cut, stop_reason="max_tokens"), api_response(cut, stop_reason="max_tokens"))
        self.assertEqual(v["status"], "error"); self.assertIn("truncated at max_tokens=20000", v["reason"]); self.assertEqual(post.call_count, 2)
        v, _ = self.run_review(api_response("", stop_reason="refusal"))
        self.assertIn("refused", v["reason"])

    def test_answer_cut_off_at_max_tokens_is_retried_once_with_more_room(self):
        cut = '{"junk_rate": 0.01, "systematic_junk": false, "junk_examples": [], "notes": "cut'
        v, post = self.run_review(api_response(cut, stop_reason="max_tokens"), api_response(GOOD))
        self.assertEqual(v["status"], "pass"); self.assertEqual(post.call_count, 2); self.assertEqual(self.sleeps, [])
        self.assertEqual([c.kwargs["json"]["max_tokens"] for c in post.call_args_list], [12000, 20000])
        self.assertEqual(v["max_tokens"], 20000)
        # a complete answer that merely stopped at max_tokens is not retried
        v, post = self.run_review(api_response(GOOD, stop_reason="max_tokens"))
        self.assertEqual(v["status"], "pass"); self.assertEqual(post.call_count, 1); self.assertEqual(v["max_tokens"], 12000)

    def test_missing_key_is_skipped_without_a_request(self):
        del os.environ["ANTHROPIC_API_KEY"]
        with mock.patch("crawler.review.requests.post") as post:
            v = self.review.run()
        post.assert_not_called()
        self.assertEqual(v, self.verdict_file()); self.assertEqual(v["status"], "skipped"); self.assertEqual(v["reason"], "ANTHROPIC_API_KEY missing")
        self.assertEqual(v["run_id"], RUN_ID)
        os.environ["ANTHROPIC_API_KEY"] = "   "
        self.assertEqual(self.review.run()["status"], "skipped")

    def test_retries_on_server_errors_and_network_failures(self):
        v, post = self.run_review(api_response("overloaded", status=529), api_response(GOOD))
        self.assertEqual(v["status"], "pass"); self.assertEqual(post.call_count, 2); self.assertEqual(self.sleeps, [10])
        self.sleeps.clear()
        v, post = self.run_review(side_effect=[requests.ConnectionError("reset"), api_response("rate limited", status=429), api_response(GOOD)])
        self.assertEqual(v["status"], "pass"); self.assertEqual(post.call_count, 3); self.assertEqual(self.sleeps, [10, 30])
        self.sleeps.clear()
        v, post = self.run_review(side_effect=[requests.Timeout("t"), requests.Timeout("t"), requests.Timeout("t")])
        self.assertEqual(v["status"], "error"); self.assertIn("gave up after 3", v["reason"]); self.assertIn("Timeout", v["reason"]); self.assertEqual(post.call_count, 3)
        self.assertNotIn(KEY, json.dumps(v))

    def test_client_errors_are_not_retried(self):
        v, post = self.run_review(api_response('{"type":"error","error":{"type":"invalid_request_error","message":"bad model"}}', status=400))
        self.assertEqual(v["status"], "error"); self.assertIn("HTTP 400", v["reason"]); self.assertIn("bad model", v["reason"]); self.assertEqual(post.call_count, 1)
        v, post = self.run_review(api_response('{"type":"error"}', status=401))
        self.assertEqual(post.call_count, 1); self.assertIn("HTTP 401", v["reason"])

    def test_auth_and_credit_errors_are_named(self):
        err = lambda t, m: json.dumps({"type": "error", "error": {"type": t, "message": m}})
        cases = [(401, err("authentication_error", "invalid x-api-key"), "auth"),
                 (403, err("permission_error", "not allowed for this model"), "permission"),
                 (402, err("billing_error", "add credits"), "credits"),
                 (400, err("invalid_request_error", "Your credit balance is too low to access the Anthropic API."), "credits"),
                 (400, err("invalid_request_error", "bad model"), "api"),
                 (404, err("not_found_error", "model: claude-old"), "model")]
        for status, body, kind in cases:
            with mock.patch("crawler.review.requests.get", return_value=models_response([])):   # no replacement model
                v, post = self.run_review(api_response(body, status=status))
            self.assertEqual((v["status"], v["error_kind"]), ("error", kind), body)
            self.assertEqual(post.call_count, 1, "never retried")
            self.assertEqual(self.verdict_file()["error_kind"], kind)
            self.assertNotIn(KEY, json.dumps(self.verdict_file()), "the key never reaches the verdict")
        self.assertEqual(self.review.error_kind(401, "not json"), "auth")
        self.assertEqual(self.review.error_kind(402, ""), "credits")

    def test_a_retired_model_is_replaced_by_the_newest_current_model_of_its_family(self):
        gone = api_response(json.dumps({"type": "error", "error": {"type": "not_found_error", "message": "model: claude-sonnet-5-5"}}), status=404)
        listed = ["claude-haiku-5-5", "claude-sonnet-5-5", "claude-sonnet-6", "claude-opus-6", "claude-sonnet-6-5", "claude-opus-7"]
        with mock.patch("crawler.review.requests.get", return_value=models_response(listed)) as get:
            v, post = self.run_review(gone, api_response(GOOD))
        self.assertEqual(v["status"], "pass")
        self.assertEqual(v["model"], "claude-sonnet-6-5", "the newest sonnet the key lists, not the newest model")
        self.assertEqual(v["model_fallback"]["requested"], "claude-sonnet-5-5"); self.assertIn("404", v["model_fallback"]["reason"])
        self.assertEqual(post.call_count, 2); self.assertEqual(get.call_count, 1)
        self.assertEqual(post.call_args_list[1].kwargs["json"]["model"], "claude-sonnet-6-5")
        self.assertEqual(self.verdict_file()["model"], "claude-sonnet-6-5")
        # no sonnet at all: the newest model of any family; nothing listed: a "model" error for the alert
        with mock.patch("crawler.review.requests.get", return_value=models_response(["claude-haiku-9", "claude-opus-9"])):
            self.assertEqual(self.review.fallback_model(KEY, "claude-sonnet-5-5"), "claude-opus-9")
        with mock.patch("crawler.review.requests.get", return_value=models_response(["claude-sonnet-5-5"])):
            with self.assertRaises(self.review.ReviewError) as cm:
                self.review.fallback_model(KEY, "claude-sonnet-5-5")
            self.assertEqual(cm.exception.kind, "model")
        with mock.patch("crawler.review.requests.get", return_value=models_response([], status=401)):
            with self.assertRaises(self.review.ReviewError) as cm:
                self.review.fallback_model(KEY, "claude-sonnet-5-5")
            self.assertEqual(cm.exception.kind, "auth")
        # a 404 on a later batch (after a good first one) is not retried with another model
        self.write_gates(sample_review={"batch_size": 150})
        with mock.patch("crawler.review.requests.get") as get:
            v, post = self.run_review(api_response(GOOD), gone)
        self.assertEqual((v["status"], v["error_kind"]), ("error", "model")); self.assertEqual(get.call_count, 0)

    def test_non_json_200_is_an_error(self):
        r = mock.Mock(); r.status_code = 200; r.text = "<html>"; r.json.side_effect = ValueError("x")
        v, _ = self.run_review(r)
        self.assertEqual(v["status"], "error"); self.assertIn("not JSON", v["reason"])

    def test_empty_sample_is_an_error(self):
        (self.qa.CAND / "review-sample.jsonl").unlink()
        with mock.patch("crawler.review.requests.post") as post:
            v = self.review.run()
        post.assert_not_called(); self.assertEqual(v["status"], "error"); self.assertIn("sample", v["reason"])

    def test_cli_exit_code_is_zero_even_on_error(self):
        with mock.patch("crawler.review.requests.post", return_value=api_response("nonsense")):
            self.assertEqual(self.review.main(["run"]), 0)
        self.assertEqual(self.verdict_file()["status"], "error")
        with mock.patch("crawler.review.requests.post", return_value=api_response(GOOD)):
            self.assertEqual(self.review.main(["run"]), 0)
        self.assertEqual(self.verdict_file()["status"], "pass")


if __name__ == "__main__":
    unittest.main()
