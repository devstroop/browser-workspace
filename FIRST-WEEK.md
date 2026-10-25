# Workspace Setup Checklist

- Status: Bootstrap baseline; several controls remain open
- Last verified: 2026-10-25

## Repository bootstrap

- [x] Create the workspace repository — `devstroop/browser-workspace` (private).
- [x] Create the browser product repository — `devstroop/browser` (public).
- [x] Add the browser repository as a Git submodule — pinned to `077c98f`.
- [x] Add the core docs and adapt placeholders — baseline docs committed as `4a6de69`.
- [x] Decide where workspace and product issues should be filed.
- [x] File the eight baseline issues and record their URLs — workspace #1–#3, product #1–#5.
- [ ] Configure branch protection and PR review rules in the browser repository — not configured; product is public, so rulesets are available, but the settings were not changed in this pass.
- [ ] Configure branch protection in the workspace repository — current private-repository plan returns "Upgrade to GitHub Pro" for branch protection/rulesets.
- [x] Add minimal workspace CI — `.github/workflows/workspace-check.yml`.
- [x] Add minimal product repository hygiene CI — `.github/workflows/repository-check.yml` in the product seed.
- [x] Verify workspace CI on GitHub — run `40176621704` passed 55/55. An earlier attempt (`40175789838`) failed before job start due to the private-repository Actions billing/spending limit.
- [x] Verify product repository hygiene CI — run `40175022540` succeeded.
- [ ] Add a submodule credential strategy if the product repository becomes private — currently public, so anonymous fetch is possible.

## Product direction

- [ ] Create a top-level product vision/roadmap issue in the browser repository.
- [x] File an MVP definition issue with measurable acceptance criteria — [product #1](https://github.com/devstroop/browser/issues/1); scope still to be completed.
- [x] Create a reference audit baseline in the workspace.
- [x] Draft an engine/native-GUI feasibility research issue and an ADR proposal — [product #2](https://github.com/devstroop/browser/issues/2); [ADR-0001](decisions/ADR-0001-browser-engine-and-shell-strategy.md).
- [x] Record the security and third-party license baseline.
- [x] Record current assumptions and unresolved questions.
- [ ] Decide the product license and contribution policy.
- [ ] Decide target platforms and minimum OS versions.

## Research baseline

- [x] Verify exact Lightpanda repository/revision and current capabilities.
- [x] Identify the exact Vercel Zig GUI project and license — `vercel-labs/native`, Apache-2.0.
- [x] Compare Tauri/Wry, Chromium/CEF, Servo, Ladybird, WebKit, and Electron against MVP needs at documentation/source level.
- [ ] Select a small representative set of websites and tests.
- [ ] Define how benchmark results will be reproduced.
- [ ] Run the engine/shell spike and record measured results.

## Planning discipline

- [x] Agree issue labels and milestone conventions — labels documented; milestones not created.
- [x] Use parent issues for broad outcomes and child issues for actionable work.
- [x] Record estimates as ranges when uncertainty is high.
- [x] Link findings to issues in the repository responsible for the work.
- [ ] Review the plan periodically; no review cadence has been agreed.
- [ ] Configure CODEOWNERS or an equivalent review ownership map.

## Next five working days

1. Confirm the product license intent: proprietary, open source, or mixed. Until decided, do not accept external code contributions.
2. Accept or revise the MVP target platforms and site/test set. Start with macOS only unless there is a written reason to add platforms.
3. Run the system-WebView vs CEF vs Electron spike on macOS; capture startup, memory, navigation, input, sandbox, packaging, and update evidence.
4. Remediate or explicitly reject the Native SDK CEF host because it disables the sandbox.
5. Add branch/ruleset protection to the public product repository and require the repository-check workflow.
6. Add a workspace submodule check to CI and confirm the pinned commit resolves.
7. Decide whether to keep the product repository public; if yes, publish only self-contained issues and avoid private workspace links as sole evidence.
8. Record the engine/shell outcome in ADR-0001 (accept, revise, or reject) before opening implementation PRs.

## Do not do yet

- Do not import an upstream browser/engine codebase.
- Do not announce supported platforms or performance claims.
- Do not promise update, sandbox, or privacy guarantees that are not implemented and tested.
- Do not treat this checklist as evidence that a control is enforced.
