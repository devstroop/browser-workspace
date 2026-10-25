# Roadmap: Phased Evolution

- Status: Initial outline; not a committed schedule
- Last reviewed: 2026-10-25

This roadmap describes sequencing, not fixed dates. Convert each phase into GitHub milestone(s) and parent issues once the scope is sufficiently understood. Estimate known work and explicitly mark uncertain discovery work.

## Phase 0 — Workspace and feasibility

Outcomes:
- Establish repositories, submodule workflow, issue templates, PR template, and CI conventions.
- Audit reference projects, source licenses, dependencies, platform coverage, and maintenance activity.
- Define initial product requirements and an MVP acceptance-test set.
- Record major uncertainties and initial architecture decisions.

Exit criteria:
- No unresolved licensing blocker for the selected MVP approach.
- Engine and native UI options have been compared against written criteria.
- A runnable proof-of-concept plan has an owner, issue, and measurable acceptance criteria.

## Phase 1 — Visible browser prototype

Outcomes:
- Native window and browser shell.
- Navigation lifecycle and visible web content.
- Input, scrolling, links, forms, and basic error handling.
- A repeatable local development build.

Exit criteria:
- A defined smoke-test suite passes.
- Engine/rendering boundaries and known limitations are documented.

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

## Planning rules

- Every phase should have a parent issue and observable exit criteria.
- Dates are not commitments until scope, dependencies, and capacity are reviewed.
- Track scope confidence separately from effort estimates.
- A phase may contain parallel workstreams.
- Revisit this roadmap when a major technical assumption changes.
