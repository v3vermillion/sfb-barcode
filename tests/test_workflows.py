"""Workflow settings that a mistake would break silently: the deploy's inputs and the test workflow's token."""
import re
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
try:
    import yaml
except ImportError:  # pragma: no cover - tests.yml installs pyyaml
    yaml = None


def _load(name):
    d = yaml.safe_load((REPO / ".github" / "workflows" / name).read_text())
    return d, d.get("on", d.get(True))   # pyyaml reads the bare key `on` as True


@unittest.skipUnless(yaml, "needs pyyaml")
class Workflows(unittest.TestCase):
    def test_every_data_file_the_pack_builder_reads_triggers_and_keys_a_deploy(self):
        # audit F-W11-01 (2026-10-21): a change to data/brands.json or data/store.json changes the pack, so it must
        # start a deploy and change the build key, or phones keep the old brand list until an unrelated change
        src = (REPO / "app" / "tools" / "build-db.mjs").read_text()
        files = sorted(set(re.findall(r'path\.join\(APP, "\.\.", "data", "([\w.-]+)"\)', src)))
        self.assertIn("brands.json", files)
        d, on = _load("deploy-app.yml")
        paths = on["push"]["paths"]
        key = next(s["run"] for s in d["jobs"]["build-deploy"]["steps"] if s.get("id") == "code")
        for f in files:
            self.assertIn(f"data/{f}", paths, f"data/{f} is read by build-db.mjs but does not trigger deploy-app")
            self.assertIn(f"HEAD:data/{f}", key, f"data/{f} is read by build-db.mjs but is not in the deploy build key")

    def test_only_the_report_job_can_write_issues(self):
        # audit F-W11-11: the jobs that run pip and npm installs get a read-only token
        d, _ = _load("tests.yml")
        self.assertNotIn("issues", d.get("permissions", {}))
        self.assertEqual(d["jobs"]["report"].get("permissions"), {"contents": "read", "issues": "write"})
        for name, job in d["jobs"].items():
            if name != "report":
                self.assertNotEqual((job.get("permissions") or {}).get("issues"), "write", name)


if __name__ == "__main__":
    unittest.main()
