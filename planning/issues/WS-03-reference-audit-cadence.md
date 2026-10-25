## Context

The reference register is a point-in-time snapshot. Browser engines, licenses, releases, and security advisories change continuously. Without a refresh process, architecture decisions will rely on stale evidence.

The initial snapshot is dated 2026-10-25 and covers 16 projects.

## Research question

What cadence, triggers, and evidence-update procedure keep the reference register trustworthy without turning it into an unbounded polling project?

## Scope

In scope:

- Define scheduled refresh cadence (for example, quarterly full metadata refresh).
- Define event triggers: major engine release, security advisory, license change, repository move/archive, or a change in product direction.
- Define who reviews a refreshed snapshot and how diffs are approved.
- Define stale-data labeling and how decisions record the revision they relied on.
- Identify advisory sources for Chromium/CEF, WebKit, Gecko, Servo, Ladybird, and Native SDK.
- Add a short refresh runbook to `tooling/reference-audit/`.
- Decide whether to automate change detection without automatic issue creation.

Out of scope:

- Continuous full-text monitoring of every upstream commit.
- Auto-filing issues from unverified changes.
- Legal review of every release.
- Building or running upstream projects.

## Expected deliverable

A refresh runbook with:

- Cadence and triggers.
- Owner/reviewer roles.
- Exact commands and snapshot naming.
- Diff review checklist.
- Advisory sources and escalation path.
- Stale-evidence rules for reports and ADRs.
- A recorded next refresh date.

## Acceptance criteria

- [ ] Cadence and event triggers are written down.
- [ ] A named owner/reviewer is recorded (or the role is explicitly unassigned).
- [ ] Refresh commands produce a new dated snapshot without overwriting the old one.
- [ ] The runbook explains how to review license/release/activity changes.
- [ ] Advisory sources are listed with URLs.
- [ ] The process says how a decision records the revision it used.
- [ ] No automatic issue creation is enabled without a deduplication/triage rule.

## Estimate and confidence

- Estimate: 1–2 engineer-days to write and validate the runbook.
- Confidence: High for the process; medium for advisory-source coverage.
- Assumptions: the existing collector remains sufficient; no new API access is required.

## Dependencies and blockers

- None for the runbook. A recurring owner depends on team assignment.

## Evidence

- `tooling/reference-audit/collect.sh`
- `tooling/reference-audit/references.tsv`
- `research/references/upstream-metadata-2026-10-25.json`
- `REFERENCE-REGISTER.md`
- `RESEARCH-METHOD.md`

## Definition of done

The runbook is committed, a dry-run refresh is reviewed, and the next refresh date is recorded.
