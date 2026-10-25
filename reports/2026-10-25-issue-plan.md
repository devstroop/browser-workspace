# Issue Plan

- Report date: 2026-10-25
- Status: Eight issues filed on 2026-10-25; status tracked in [ISSUE-MAP.md](../planning/ISSUE-MAP.md)
- Scope: Baseline decomposition for workspace, product definition, architecture, security/licensing, governance, and prototype
- Evidence: [Workspace baseline](2026-10-25-workspace-baseline.md), [feasibility](2026-10-25-architecture-feasibility.md), [risks](2026-10-25-risks-and-open-questions.md)
- Related issues: See the [issue map](../planning/ISSUE-MAP.md)

## Scope

Included: decomposition of the baseline into workspace and product issues, sequencing, estimates, and definitions of ready/done.

Excluded: implementation, assignment, scheduling, and issues that depend on undecided product/engine/license choices.

## Approach

The baseline is decomposed into eight issues: three in the private workspace and five in the public product repository. The split follows responsibility, not convenience:

- Workspace issues cover evidence, CI, and recurring research.
- Product issues cover MVP definition, architecture spike, security/license baseline, governance, and the visible prototype.

Research and implementation are separated. BR-02 and BR-03 are investigations; BR-05 is blocked implementation. WS-03 is a process/research task. No implementation issue assumes an engine choice.

## Issue summary

| Key | Repository | Type | Priority | Estimate | Depends on | Issue |
|---|---|---|---|---|---|---|
| WS-01 | Workspace | Epic | p1 | 2–4 engineer-days remaining | Reviewer, CI run | [#1](https://github.com/devstroop/browser-workspace/issues/1) |
| WS-02 | Workspace | Task | p0 | 0.5–1 engineer-day | GitHub plan/visibility decision | [#2](https://github.com/devstroop/browser-workspace/issues/2) |
| WS-03 | Workspace | Research | p2 | 1–2 engineer-days | Owner assignment | [#3](https://github.com/devstroop/browser-workspace/issues/3) |
| BR-01 | Product | Epic | p0 | 3–5 engineer-days | Product direction | [#1](https://github.com/devstroop/browser/issues/1) |
| BR-02 | Product | Research | p0 | 4–6 calendar weeks | BR-01 site list, build/signing, security review | [#2](https://github.com/devstroop/browser/issues/2) |
| BR-03 | Product | Research | p0 | 5–8 engineer-days + legal | BR-02 artifacts, counsel | [#3](https://github.com/devstroop/browser/issues/3) |
| BR-04 | Product | Epic | p0 | 3–5 engineer-days | License decision, admin access | [#4](https://github.com/devstroop/browser/issues/4) |
| BR-05 | Product | Epic | p1 (blocked) | 4–8 engineer-weeks | BR-01, BR-02, BR-03, BR-04 | [#5](https://github.com/devstroop/browser/issues/5) |

## Why these eight

- **WS-01** closes the documentation/evidence loop and prevents "the repo exists" from being mistaken for a baseline.
- **WS-02** turns CI from a file into an enforced control, or records why the platform prevents it.
- **WS-03** prevents the audit from becoming stale.
- **BR-01** creates a testable MVP target; without it, architecture comparison is subjective.
- **BR-02** produces the runtime evidence the ADR needs.
- **BR-03** resolves the security/license gates that can invalidate an otherwise good architecture.
- **BR-04** makes contribution, release, and vulnerability handling real.
- **BR-05** is the first implementation epic, deliberately blocked until the decisions exist.

## Deferred child issues

The following are intentionally deferred until a decision or evidence exists:

- **Update/signing strategy:** depends on the engine/shell choice; can become a child of BR-04.
- **Profile/storage/downloads/permissions:** depends on BR-01 scope.
- **AI/agent safety architecture:** depends on whether AI is in the MVP; should be a separate threat-model issue.
- **Accessibility conformance plan:** depends on the target standard.
- **Cross-platform Windows/Linux prototype:** depends on the macOS result.
- **Chromium/Gecko/Servo/Ladybird evaluation:** depends on a measured need; not an MVP default.
- **Legal review engagement:** depends on license intent and distribution model.

## Definition of ready

An issue is ready when it has:

- A clear outcome or research question.
- Scope and non-goals.
- Acceptance criteria that can be observed.
- Evidence status and links.
- Estimate range, confidence, assumptions, and dependencies.
- The correct repository and labels.
- No private-only evidence as the sole basis for a public claim.

## Definition of done

- The acceptance criteria are met and evidenced.
- Follow-up work is linked, not hidden.
- The issue map and manifest are updated.
- Any architecture/license/security decision is recorded in an ADR or policy document.
- No unverified claim is promoted to a product statement.

## Filing status

All eight baseline issues were filed on 2026-10-25. Filing is tracked in [ISSUE-MAP.md](../planning/ISSUE-MAP.md). The issue bodies remain in [`planning/issues/`](../planning/issues/). Labels are documented in [`planning/LABELS.md`](../planning/LABELS.md).

If an issue is closed, split, or superseded, update the map and manifest. Do not claim an issue exists without a URL.

## Linked issues

- Workspace: [WS-01 #1](https://github.com/devstroop/browser-workspace/issues/1), [WS-02 #2](https://github.com/devstroop/browser-workspace/issues/2), [WS-03 #3](https://github.com/devstroop/browser-workspace/issues/3)
- Product: [BR-01 #1](https://github.com/devstroop/browser/issues/1), [BR-02 #2](https://github.com/devstroop/browser/issues/2), [BR-03 #3](https://github.com/devstroop/browser/issues/3), [BR-04 #4](https://github.com/devstroop/browser/issues/4), [BR-05 #5](https://github.com/devstroop/browser/issues/5)

## Limitations

- Estimates are planning ranges, not measured productivity or commitments.
- The decomposition assumes a macOS-first MVP; a different platform decision changes the spike and prototype scope.
- No issue has been assigned or scheduled.
- All eight issues were filed, but none has been assigned, scheduled, or accepted for implementation.
- The issue set does not cover every future subsystem; deferred work is listed above.
- Public product issues cannot rely on private workspace links as their only evidence.

## Review cadence

Proposed:

- Weekly: update issue map, blockers, and estimates after new evidence.
- At each phase gate: re-check the roadmap exit criteria.
- On a major upstream release or security advisory: trigger WS-03.
- After the spike: revisit BR-01 scope and BR-05 estimate.

No cadence is enforced yet; this is a proposal.
