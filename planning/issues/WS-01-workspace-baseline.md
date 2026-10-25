## Context

The workspace was bootstrapped from a starter archive into a traceable baseline: repository history, a product submodule, an audited reference register, a proposed ADR, reports, issue drafts, and CI/check tooling. This epic tracks the remaining work needed to make that baseline complete and reviewable.

## Desired outcome

A new contributor can understand what exists, what is verified, what is still unknown, and which issue owns each next step without reading private chat history or guessing at repository state.

## Scope

In scope:

- Root documentation that reflects actual repository state.
- A pinned reference audit with reproducible metadata collection.
- A proposed architecture decision with explicit limitations.
- Baseline reports covering workspace state, reference audit, feasibility, and risk.
- Issue-ready planning and an issue map.
- A workspace checker and CI workflow.

Out of scope:

- Product implementation or engine selection.
- Upstream builds, benchmarks, or runtime security testing.
- Legal review.
- Branch protection or GitHub plan changes.

## Acceptance criteria

- [ ] Root docs distinguish verified state from proposed controls.
- [ ] `REFERENCE-REGISTER.md` lists exact revisions, releases, licenses, dispositions, and limitations for all 16 references.
- [ ] `research/references/2026-10-25-initial-audit.md` records scope, method, evidence, and per-project findings.
- [ ] ADR-0001 is explicitly **Proposed**, not Accepted.
- [ ] Reports state date, scope, evidence, limitations, and linked issues.
- [ ] `planning/ISSUE-MAP.md` maps each baseline issue to its repository and status.
- [ ] `node tooling/checks/check-workspace.mjs` passes locally.
- [ ] The workspace CI workflow passes on `main`. Currently blocked before job start by the private-repository Actions billing/spending limit (run `40175789838`); the local checker passes 55/55.
- [ ] Remaining governance gaps are split into tracked issues rather than hidden in prose.

## Estimate and confidence

- Estimate: 2–4 engineer-days for the remaining review and corrections.
- Confidence: High for documentation/check work; medium for issue decomposition.
- Assumptions: one reviewer familiar with the initiative; no new upstream research beyond the pinned snapshot.

## Dependencies and blockers

- GitHub Actions run verification.
- A reviewer for evidence and licensing claims.
- Product/license decisions are tracked separately; they do not block closing this documentation epic.

## Evidence

- `README.md`, `WORKING-MODEL.md`, `ROADMAP.md`, `REFERENCE-REGISTER.md`
- `research/references/2026-10-25-initial-audit.md`
- `reports/2026-10-25-workspace-baseline.md`
- `decisions/ADR-0001-browser-engine-and-shell-strategy.md`
- `tooling/checks/check-workspace.mjs`

## Definition of done

The checker passes, CI passes on `main`, a reviewer has confirmed the verified/proposed distinction, and every open gap has a linked issue.
