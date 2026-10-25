# Working Model and Repository Responsibilities

- Status: Baseline; some controls are proposed rather than enforced
- Last reviewed: 2026-10-25

## Two repositories

### 1. Browser product repository

- URL: https://github.com/devstroop/browser
- Visibility: Public (verified 2026-10-25)
- Default branch: `main`
- Current content: governance seed commit `077c98f`; no product source

The product repository owns the shipped browser and its production implementation. It is responsibility-driven and has stricter change controls.

It contains, or will contain when real work exists:

- Product source and product tests.
- Build, packaging, signing, update, and release configuration.
- Product documentation and contributor-facing architecture decisions.
- Product security policy, dependency inventory, and product CI.
- Release notes and supported-version statements.

Its structure must reflect actual subsystem responsibilities. Do not create empty modules merely to make the repository appear complete.

### 2. Parent workspace repository

- URL: https://github.com/devstroop/browser-workspace
- Visibility: Private (verified 2026-10-25)
- Default branch: `main`

The workspace includes the product repository as a Git submodule and hosts development-only material:

- Upstream/reference research.
- Technical spikes and disposable experiments.
- Cross-project gap analysis.
- Compatibility matrices and benchmarks.
- Research scripts, CI orchestration, and generated reports.
- Prototype code not accepted into the product.

Workspace tooling must not silently become a runtime or build dependency of the shipped browser. If a workspace tool becomes product-critical, move or intentionally package it through a reviewed product issue and PR.

## Visibility asymmetry

The product repository is public; the workspace is private. This has consequences:

- Public product issues must be self-contained. Do not link to private workspace files as the only evidence for a public claim.
- Do not put credentials, customer data, private vulnerability details, or internal-only analysis in public issues, commits, or CI logs.
- Cross-repository issue links are allowed, but public issues should summarize the actionable evidence and cite public upstream sources where possible.
- If the product repository becomes private, or the workspace becomes public, re-review disclosure and submodule access assumptions.

## Git flow for the browser repository

```text
main
  └── develop
        ├── feature/<issue>-short-name
        ├── fix/<issue>-short-name
        ├── research/<issue>-short-name
        └── refactor/<issue>-short-name
```

- `main`: stable and release-ready.
- `develop`: integration branch for reviewed changes.
- Working branches: focused changes with an issue as their scope anchor.
- Do not merge directly to protected branches.

This is the target model. `develop` does not exist yet, and branch protection is not configured. The current default branch is `main` only.

## PR expectations

Every product PR must:

1. Link to one or more relevant issues.
2. Have a clearly bounded scope and explicit acceptance criteria.
3. Contain its own coherent set of commits.
4. Be complete for the scope claimed by that PR; do not use a PR to disguise unfinished unrelated work.
5. Include relevant tests, documentation, migration notes, or an explanation of why they are not applicable.
6. Receive one review before merging, as the minimum proposed review rule.
7. Pass required CI checks that are actually configured.
8. State known limitations and follow-up issues.

A single review is the minimum workflow requirement, not a reason to bypass extra review for security-sensitive, high-risk, or architecture-wide changes.

Review count, required checks, and merge restrictions are not yet enforced because branch protection/rulesets are not configured. This gap is tracked as a repository-governance issue; do not describe the target rules as active controls.

## Issue-driven work

Important work should be represented by an issue in the repository responsible for it. Research findings, experiments, CI alerts, and upstream changes should link to issues when they require action.

A higher-level issue may exist before all child work is known. Decompose it progressively. Do not block unrelated work simply because an epic is still being scoped.

### Issue routing

- Product implementation, product bugs, product security defects, release engineering, and product acceptance criteria belong in `devstroop/browser`.
- Research tooling, comparative analysis, experiments, workspace CI, and reference audits belong in `devstroop/browser-workspace`.
- If a workspace finding identifies a product gap, create or link a product issue and include public, non-sensitive evidence. Avoid duplicating the same task in both repositories.
- For work spanning both repositories, designate one coordination issue and link the others.

### Labels and evidence

The label vocabulary is documented in [planning/LABELS.md](planning/LABELS.md). Every issue should state:

- The decision or outcome it serves.
- Scope and non-goals.
- Evidence status (verified, observed, inferred, hypothesis, unknown).
- Estimate range and confidence when an estimate is meaningful.
- Dependencies, blockers, and discovery still needed.
- Acceptance criteria that can be observed.

## Git submodule policy

- Pin the browser submodule to a specific reviewed commit.
- Update the pointer through a workspace PR or commit with a meaningful explanation.
- Do not assume a workspace branch automatically updates the submodule.
- Keep product history and workspace history independent.
- Document the exact upstream URL and expected default branch in [SUBMODULE.md](SUBMODULE.md).
- CI should verify the declared submodule URL and pinned gitlink. Content checkout depends on repository visibility and credentials.

The product repository is public, so a GitHub-hosted workflow can fetch the submodule anonymously even though the workspace is private. If the product repository becomes private, the workflow needs an appropriately scoped credential, and that credential must not be exposed to pull requests from forks.

## Current control status

| Control | Status |
|---|---|
| Product repository exists | Verified |
| Workspace repository exists | Verified |
| Submodule declared and pinned | Verified locally; CI verification depends on the workflow run |
| Product governance files | Present in seed commit |
| Product CI | Repository hygiene check passed (run `40175022540`); no product build/test CI |
| Workspace CI | Local checker passes 55/55; GitHub-hosted run blocked by private-repository Actions billing/spending limit (run `40175789838`) |
| Issues | 8 baseline issues filed (workspace #1–#3, product #1–#5) |
| Branch protection / rulesets | Not configured for the product repository (public rulesets available); unavailable for the private workspace on the current plan |
| Required reviews | Not enforced |
| CODEOWNERS | Not configured |
| License decision | Not made |
| Security policy | Product and workspace `SECURITY.md` present; private reporting enabled on the public product repository; no workspace-specific reporting channel verified |
| Release/signing/update process | Not defined |

Settings evidence and proposed controls: [Repository settings and CI verification](reports/2026-10-25-repository-settings.md).
