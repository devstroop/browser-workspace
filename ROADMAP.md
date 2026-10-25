# Roadmap: Phased Evolution

- Status: Initial outline; not a committed schedule
- Last reviewed: 2026-10-25

This roadmap describes sequencing, not fixed dates. Convert each phase into GitHub milestones and parent issues once scope is sufficiently understood. Estimate known work and explicitly mark uncertain discovery work.

Phase 0 is partially complete. The workspace baseline, reference audit, product repository seed, and ADR proposal exist. The architecture decision, MVP acceptance criteria, and enforceable governance do not.

## Phase 0 — Workspace and feasibility

Outcomes:

- Establish repositories, submodule workflow, issue templates, PR template, and CI conventions.
- Audit reference projects, source licenses, dependencies, platform coverage, and maintenance activity.
- Define initial product requirements and an MVP acceptance-test set.
- Record major uncertainties and initial architecture decisions.

Current status (2026-10-25):

| Outcome | Status | Evidence / issue |
|---|---|---|
| Repositories and submodule | Done | Workspace, public product repo, submodule pin `077c98f` |
| Workspace CI | Local checker and GitHub workflow pass (55/55) | `.github/workflows/workspace-check.yml`, run `40176621704` |
| Reference audit | Done at documentation/source-manifest level | [Reference register](REFERENCE-REGISTER.md), [audit](research/references/2026-10-25-initial-audit.md) |
| MVP requirements | Not defined | MVP issue |
| Engine/shell comparison | Research complete; empirical spike pending | [ADR-0001](decisions/ADR-0001-browser-engine-and-shell-strategy.md) |
| Governance enforcement | Partial | Product seed only; branch protection unavailable for workspace on current plan |

Exit criteria:

- No unresolved licensing blocker for the selected MVP approach.
- Engine and native UI options have been compared against written criteria.
- A runnable proof-of-concept plan has an owner, issue, and measurable acceptance criteria.

Current assessment: the exit criteria are **not met**. The largest unresolved item is the engine/shell choice and its security/update consequences, not the absence of repositories.

## Phase 1 — Visible browser prototype

Outcomes:

- Native window and browser shell.
- Navigation lifecycle and visible web content.
- Input, scrolling, links, forms, and basic error handling.
- A repeatable local development build.

Exit criteria:

- A defined smoke-test suite passes.
- Engine/rendering boundaries and known limitations are documented.

Gate: do not start product implementation until the engine/shell spike has produced evidence and the MVP issue has accepted target platforms and test criteria.

## Phase 2 — Useful MVP

Potential capabilities:

- Tabs and navigation controls.
- Bookmarks and history.
- Persistent profile, cookies, and site storage.
- Downloads and ordinary file handling.
- HTTPS/certificate behavior, permission controls, safe updates, and an initial isolation model.
- Basic developer diagnostics.
- Automated unit, integration, and browser tests.

Exit criteria:

- MVP acceptance tests pass on agreed target platforms.
- Known critical security issues are addressed.
- Release, rollback, and update processes are tested.

## Phase 3 — Reliability and compatibility

Outcomes:

- Broader real-site coverage.
- Standards and interoperability testing.
- Better crash recovery, accessibility, media support, performance, and diagnostics.
- A triaged compatibility backlog and regression suite.

## Phase 4 — Differentiation

Potential capabilities:

- Privacy protections and content controls.
- Advanced workspaces and productivity features.
- AI assistant and controlled agent automation.
- Improved resource management and browser-level developer features.

## Phase 5 — Engine evolution

Outcomes:

- Replace or extend engine components based on measured benefit.
- Expand rendering and standards support.
- Maintain an explicit compatibility matrix and migration plan.
- Keep engine replacement decisions evidence-based.

Engine ownership is a possible long-term destination, not a Phase 1 requirement. A Chromium, Gecko, WebKit, Servo, or Ladybird fork/embedding decision must not be used to delay a credible MVP unless the MVP's security or licensing constraints require it.

## Planning rules

- Every phase should have a parent issue and observable exit criteria.
- Dates are not commitments until scope, dependencies, and capacity are reviewed.
- Track scope confidence separately from effort estimates.
- A phase may contain parallel workstreams.
- Revisit this roadmap when a major technical assumption changes.
- Separate investigation issues from implementation issues; a spike is not a delivery commitment.
