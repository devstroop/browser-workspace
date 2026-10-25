# Workspace Setup Checklist

## Repository bootstrap
- [ ] Create the workspace repository.
- [ ] Add the browser repository as a Git submodule.
- [ ] Add the core docs and adapt placeholders.
- [ ] Decide where workspace and product issues should be filed.
- [ ] Configure branch protection and PR review rules in the browser repository.
- [ ] Configure minimum CI checks in both repositories.

## Product direction
- [ ] Create a top-level product vision/roadmap issue in the browser repository.
- [ ] Create an MVP definition issue with measurable acceptance criteria.
- [ ] Create a reference audit epic in the workspace repository.
- [ ] Create an engine/native-GUI feasibility epic.
- [ ] Create a security and third-party license audit issue.
- [ ] Record the current assumptions and unresolved questions.

## Research baseline
- [ ] Verify exact Lightpanda repository/revision and current capabilities.
- [ ] Identify the exact Vercel Zig GUI project and license.
- [ ] Compare Tauri/Wry, Chromium/CEF, Servo, Ladybird, and WebKit against MVP needs.
- [ ] Select a small representative set of websites and tests.
- [ ] Define how benchmark results will be reproduced.

## Planning discipline
- [ ] Agree issue labels and milestone conventions.
- [ ] Use parent issues for broad outcomes and child issues for actionable work.
- [ ] Record estimates as ranges when uncertainty is high.
- [ ] Link findings to issues in the repository responsible for the work.
- [ ] Review the plan periodically; do not invent dates before dependencies and capacity are understood.
