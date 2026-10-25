# Contributing to the Workspace

- Status: Baseline contribution rules
- Last reviewed: 2026-10-25

The workspace is a private research and planning repository. It is not the product repository. Product implementation belongs in [`browser/`](browser/) and is governed by the product repository's contribution policy.

## Before contributing

- Confirm you have organization access to `devstroop/browser-workspace`.
- Read [RESEARCH-METHOD.md](RESEARCH-METHOD.md) and [SECURITY-AND-LICENSES.md](SECURITY-AND-LICENSES.md).
- Check [planning/ISSUE-MAP.md](planning/ISSUE-MAP.md) and search existing issues before creating a new one.
- Do not add third-party code, binaries, datasets, or generated artifacts without a license review and a linked issue.
- Do not commit credentials, private user data, customer data, or sensitive vulnerability details.

No license has been granted for this repository's contents. Do not assume that contributing or publishing grants reuse rights.

## Issue-first workflow

1. Create or select an issue with a clear question, scope, and acceptance criteria.
2. Keep the change bounded to that issue.
3. Link the pull request or commit to the issue.
4. Record evidence, limitations, and follow-up work.

Research can be exploratory, but a merged report must state what was verified, what was inferred, and what remains unknown.

## Branch and commit conventions

Proposed:

```text
main
  └── research/<issue>-short-name
  └── docs/<issue>-short-name
  └── tooling/<issue>-short-name
  └── chore/<issue>-short-name
```

- `main` is the integration branch.
- Use one coherent commit series per change.
- Explain why the change is needed, not only what changed.
- Do not rewrite shared history without coordination.
- Do not update the product submodule pointer as a side effect of an unrelated change.

Branch protection is not currently enforced on the workspace. Do not treat that as permission to bypass review.

## What belongs here

- Upstream/reference research and audits.
- Comparative architecture and feasibility analysis.
- Experiments and disposable prototypes.
- Compatibility matrices, benchmarks, and gap analysis.
- Planning, issue drafts, ADRs, and reports.
- Tooling that supports the above.

## What does not belong here

- Shipped product code or product release configuration.
- Product security fixes.
- Secrets, credentials, signing keys, or private user data.
- A second copy of product source that can drift from the submodule.
- Unreviewed binaries or large datasets.
- Claims that a test ran when it did not.

## Evidence and reports

Use [templates/RESEARCH-TEMPLATE.md](templates/RESEARCH-TEMPLATE.md) or [templates/UPSTREAM-AUDIT-TEMPLATE.md](templates/UPSTREAM-AUDIT-TEMPLATE.md). Every report must include:

- Scope and question.
- Date, revisions, and environment.
- Method and sources.
- Findings with evidence status and confidence.
- Limitations and what was not tested.
- Recommendation and next actions.
- Linked issue(s).

Do not invent URLs, issue numbers, credentials, release dates, or completed work.

## Tooling

- Prefer deterministic scripts with clear exit codes.
- Document inputs, outputs, dependencies, and failure modes.
- Do not require network access for checks that can run offline.
- Pin tool versions where practical.
- Do not create issues automatically from unverified findings.
- Keep workspace tooling out of the product runtime unless a product issue explicitly adopts it.

## Review expectations

- One review is the proposed minimum.
- Security-sensitive, licensing-sensitive, or architecture-wide changes need additional review.
- Reviewers verify evidence and scope, not only prose quality.
- A reviewer may ask for a smaller change or a separate issue.
- Do not merge with unresolved blockers merely to keep a schedule.

## Updating the product submodule

Follow [SUBMODULE.md](SUBMODULE.md). Pin a reviewed commit, explain the update, and do not combine it with unrelated workspace changes.

## Security

Do not report product vulnerabilities in public issues. Follow the product repository's [security policy](https://github.com/devstroop/browser/blob/main/SECURITY.md).

Workspace tooling vulnerabilities should be reported privately to the maintainers. No workspace-specific private reporting channel is verified as configured.

## AI-assisted contributions

AI assistance is allowed, but the contributor remains responsible for:

- Verifying every command, citation, and claim.
- Not fabricating evidence, URLs, issue numbers, or test results.
- Reviewing generated code for security, licensing, and correctness.
- Disclosing material AI involvement when it affects how the work should be reviewed.
