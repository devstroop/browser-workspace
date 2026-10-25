# Workspace Baseline Report

- Report date: 2026-10-25
- Status: Baseline established; enforcement and runtime validation incomplete
- Scope: Workspace repository, product repository seed, submodule, documentation, reference audit, CI/check tooling
- Related issues: See [planning/ISSUE-MAP.md](../planning/ISSUE-MAP.md)
- Evidence: Git history, repository files, GitHub API metadata, local checker output

## Scope

Included: workspace structure, product repository seed, submodule, documentation, reference audit, planning, and CI/check tooling.

Excluded: browser implementation, engine selection, upstream builds, runtime benchmarks, legal review, and product release controls.

## Executive summary

The workspace was bootstrapped from a 28-file starter archive into a traceable engineering baseline:

- Local Git repository initialized with the starter content preserved in baseline commit `d962032`.
- Public product repository created at `devstroop/browser` and seeded with governance-only content at `077c98f`.
- Private workspace repository created at `devstroop/browser-workspace` and connected as `origin`.
- Product repository added as a submodule at `browser/`, pinned to the seed commit.
- 16 upstream references audited and pinned; metadata snapshot and reproducible collector added.
- Architecture feasibility analysis and a **Proposed** ADR added; no final engine decision.
- Issue drafts, labels, an issue map, workspace validation, and GitHub Actions workflow added.

The baseline is intentionally not a browser implementation. No product source, engine import, or architecture commitment exists.

## Starting state

- Working directory: `/Volumes/EXT2/browser-workspace`
- The directory was not a Git repository.
- 28 starter files, including templates and placeholder documentation.
- No browser submodule, `.gitmodules`, or remote.
- No product repository found on GitHub at the start of the investigation.
- Starter archive preserved at `/Volumes/EXT2/browser-workspace-starter.zip`.

## Work performed

### 1. Repository baseline

- Initialized Git on `main`.
- Committed all starter files unchanged as `d962032` (`chore: import browser workspace starter baseline`).
- Preserved the starter content rather than rewriting it in the initial import.

### 2. Repository creation and wiring

The user created two GitHub repositories during the work:

- `devstroop/browser-workspace` (private)
- `devstroop/browser` (public)

Actions taken after creation:

- Added `origin` to the workspace: `https://github.com/devstroop/browser-workspace.git`.
- Seeded the empty product repository with a governance commit: `077c98f`.
- Added the product repository as a submodule: `browser/`.

The product seed contains README, CONTRIBUTING, SECURITY, issue/PR templates, `.gitignore`, and a repository hygiene workflow. It contains no browser implementation, engine choice, or license grant.

### 3. Reference audit

- Pinned 16 projects in `tooling/reference-audit/references.tsv`.
- Implemented `tooling/reference-audit/collect.sh` using `gh` and `jq`.
- Collected the snapshot `research/references/upstream-metadata-2026-10-25.json`.
- Wrote the detailed audit `research/references/2026-10-25-initial-audit.md`.
- Rewrote `REFERENCE-REGISTER.md` with exact revisions, release caveats, licenses, dispositions, and limitations.

### 4. Architecture analysis

- Compared system WebView, CEF, Electron, Chromium fork, independent engine, and Lightpanda paths.
- Recorded verified platform/security findings, including Native SDK's `no_sandbox = true` CEF configuration.
- Wrote ADR-0001 as **Proposed**, with a spike rather than a final engine selection.
- Wrote the architecture feasibility and risk reports.

### 5. Planning and governance

- Added `CONTRIBUTING.md` and updated the working model, roadmap, first-week checklist, security/license policy, and submodule notes.
- Added issue-ready drafts and a label vocabulary.
- Created labels and filed eight baseline issues (workspace #1–#3, product #1–#5); recorded them in the issue map and manifest.
- Removed the invalid owner/repository placeholder from the workspace issue template config and replaced it with the product security reporting link.
- Added issue/PR template improvements where needed.

### 6. CI and validation

- Added `tooling/checks/check-workspace.mjs` (Node built-ins only).
- Added `.github/workflows/workspace-check.yml`.
- Added a product repository hygiene workflow in the seed.
- The checker validates required files, relative Markdown links, JSON parsing, placeholder/secret patterns, and submodule declaration/pin.

## Verified repository state

| Item | State |
|---|---|
| Workspace remote | `https://github.com/devstroop/browser-workspace.git` |
| Workspace visibility | Private |
| Workspace branch | `main` |
| Product remote | `https://github.com/devstroop/browser.git` |
| Product visibility | Public |
| Product default branch | `main` |
| Product seed commit | `077c98f5c96c7c4cb51acb2df1492e7e44eec146` |
| Workspace baseline commit | `4a6de6965f78db3c3d70ba00603e13ee674787e0` pushed to `main` |
| Issues | 8 filed: workspace #1–#3, product #1–#5 |
| Submodule path | `browser/` |
| Submodule pin | `077c98f` |
| Product license | None granted |
| Product private vulnerability reporting | Enabled (verified) |
| Workspace private vulnerability reporting | API returned 404/unavailable at audit time |
| Product branch protection | Not configured |
| Workspace branch protection/rulesets | Rejected by current private-repo plan (upgrade required) |
| GitHub Actions SHA pinning policy | Not required; workflows pin action commits manually |
| Default workflow token permissions | Read-only; workflows declare `contents: read` |
| Product CI | Repository hygiene workflow succeeded (run `40175022540`) |
| Workspace CI | GitHub workflow passed 55/55 (run `40176621704`); first attempt `40175789838` failed before job start due to private-repository Actions billing |

## What is not done

- No engine or shell selected; ADR-0001 remains Proposed.
- No product implementation.
- No upstream build, runtime test, benchmark, or compatibility run.
- No complete transitive license/notice inventory.
- No product license decision.
- No branch protection, required reviews, CODEOWNERS, or signed-commit requirement.
- No release, signing, notarization, or update mechanism.
- No product threat model or security test suite.
- No workspace required-status-check enforcement; the CI workflow passes, but branch protection/rulesets remain unavailable on the current private-repo plan.
- No milestone or project-board configuration.

## Validation

Local validation commands:

```bash
node tooling/checks/check-workspace.mjs --require-submodule
git submodule status
git ls-tree HEAD browser
jq empty research/references/upstream-metadata-2026-10-25.json
```

Results on 2026-10-25:

- Workspace checker: **55 passed, 0 warnings, 0 errors**.
- Submodule: clean, HEAD `077c98f5c96c7c4cb51acb2df1492e7e44eec146`, matching the gitlink.
- Product repository hygiene workflow: **success** (run `40175022540`).
- Workspace workflow: **success, 55/55 checks** (run `40176621704`). The first attempt (`40175789838`) failed before job start due to the private-repository Actions billing/spending limit; it was retried after the billing condition cleared. Subsequent docs-only commits also passed (including run `40177057138`). The workflow emits a Node.js 20 deprecation annotation for the pinned action versions; it does not fail the job.

A passing workspace check does not validate product behavior, upstream claims, or security properties.

## Limitations

- The audit is documentation/source-manifest level, not a full code review.
- No upstream code was executed; the "untrusted upstream" policy was followed.
- GitHub API metadata is point-in-time and can lag or misreport releases/licenses.
- Effort estimates are assumptions, not measured results.
- Repository settings were observed through the GitHub API; they can change and should be re-verified before reliance.
- The product repository is public while the workspace is private; public documentation must remain self-contained.

## Linked issues

See the [issue map](../planning/ISSUE-MAP.md). The eight baseline issues were filed on 2026-10-25:

- Workspace baseline and traceability — [WS-01 / #1](https://github.com/devstroop/browser-workspace/issues/1)
- Workspace CI/governance enforcement — [WS-02 / #2](https://github.com/devstroop/browser-workspace/issues/2)
- Reference-audit refresh cadence — [WS-03 / #3](https://github.com/devstroop/browser-workspace/issues/3)
- Product repository bootstrap and delivery governance — [BR-04 / #4](https://github.com/devstroop/browser/issues/4)
- MVP definition — [BR-01 / #1](https://github.com/devstroop/browser/issues/1)
- Engine/shell spike — [BR-02 / #2](https://github.com/devstroop/browser/issues/2)
- Security/license baseline — [BR-03 / #3](https://github.com/devstroop/browser/issues/3)
- Visible prototype and test harness — [BR-05 / #5](https://github.com/devstroop/browser/issues/5)
