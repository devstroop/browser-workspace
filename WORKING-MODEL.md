# Working Model and Repository Responsibilities

- Status: Proposed baseline
- Last reviewed: 2026-10-25

## Two repositories

### 1. Browser product repository

The browser repository owns the shipped product and its production implementation. It is responsibility-driven and has stricter change controls.

It should contain product source, product tests, build and release configuration, product documentation, architecture decisions needed by contributors, and product CI.

Its structure must reflect actual subsystem responsibilities. Do not create empty modules merely to make the repository appear complete.

### 2. Parent workspace repository

The workspace repository includes the browser repository as a Git submodule and hosts flexible development-only materials, such as:

- Upstream/reference research.
- Technical spikes and disposable experiments.
- Cross-project gap analysis.
- Compatibility matrices and benchmarks.
- Research scripts, CI orchestration, and generated reports.
- Prototype code not yet accepted into the product.

Workspace tooling must not silently become a runtime or build dependency of the shipped browser. If a workspace tool becomes product-critical, move or intentionally package it through a reviewed product issue and PR.

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
- Branch naming can be adjusted to team conventions, but branch purpose must remain clear.

## PR expectations

Every product PR must:

1. Link to one or more relevant issues.
2. Have a clearly bounded scope and explicit acceptance criteria.
3. Contain its own coherent set of commits.
4. Be complete for the scope claimed by that PR; do not use a PR to disguise unfinished unrelated work.
5. Include relevant tests, documentation, migration notes, or an explanation of why they are not applicable.
6. Receive one review before merging, as the minimum agreed review rule.
7. Pass required CI checks.
8. State known limitations and follow-up issues.

A single review is the minimum workflow requirement, not a reason to bypass extra review for security-sensitive, high-risk, or architecture-wide changes.

## Issue-driven work

Important work should be represented by an issue in the repository responsible for it. Research findings, experiments, CI alerts, and upstream changes should link to issues when they require action.

A higher-level issue may exist before all child work is known. Decompose it progressively. Do not block unrelated work simply because an epic is still being scoped.

## Git submodule policy

- Pin the browser submodule to a specific commit.
- Update the pointer through a workspace PR or commit with a meaningful explanation.
- Do not assume a workspace branch automatically updates the submodule.
- Keep product history and workspace history independent.
- Document the exact upstream URL and expected default branch in the workspace README or submodule notes.
- CI should explicitly initialize and update the submodule, and should fail clearly if it is missing.

## Cross-repository issue routing

- Product implementation, product bugs, product security defects, and product acceptance criteria belong in the browser repository.
- Research tooling, comparative analysis, experiments, and workspace CI belong in the workspace repository.
- If a workspace finding identifies a product gap, create or link a product issue and include evidence. Avoid duplicating the same task in both repositories.
- For work spanning both repositories, designate one issue as the coordination issue and link the other issue(s).
