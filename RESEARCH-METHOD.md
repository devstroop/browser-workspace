# Research and Evidence Method

- Status: Baseline method
- Last reviewed: 2026-10-25

## Purpose

Make research reproducible and actionable. Research should reduce uncertainty, guide architecture, identify gaps, and create implementation issues—not produce unsupported claims or endless notes.

## Evidence labels

Use these labels in reports and issues:

- **Verified:** directly confirmed from source, documentation, or a reproducible test.
- **Observed:** seen during an experiment, with environment and steps recorded.
- **Inferred:** a reasoned conclusion supported by evidence, but not directly confirmed.
- **Hypothesis:** plausible and testable, not yet verified.
- **Unknown:** evidence is insufficient.
- **Outdated:** once valid, but not rechecked against current source or behavior.

Include a source URL, commit/version, access date, and relevant file/section for technical claims whenever possible. A vendor claim is evidence of what the vendor says, not independent verification of behavior.

## Research workflow

1. Frame the question and why it matters to the browser.
2. State what decision the research should inform.
3. List assumptions and competing hypotheses.
4. Inspect primary sources first: source code, official documentation, standards, tests, release notes, and issue trackers.
5. Record exact repository revisions and the environment.
6. Run a minimal experiment when documentation cannot answer the question.
7. Separate results from interpretation.
8. Record limitations, confounders, and unanswered questions.
9. Recommend an outcome: adopt, adapt, prototype, defer, reject, or investigate further.
10. Create or link actionable GitHub issues in the correct repository.

## Upstream code is untrusted

Upstream repositories are evidence, not trusted build inputs.

- Inspect before executing. Do not run `curl | sh`, install scripts, build scripts, or test harnesses without reviewing what they do and what they can access.
- Pin commits or releases. Record the exact revision and any submodules or downloaded binaries.
- Prefer a disposable environment, container, or VM for builds and experiments.
- Do not expose credentials, tokens, cookies, SSH agents, or personal browser profiles to upstream build/test processes.
- Treat downloaded binaries and build artifacts as untrusted until verified by hash or signature where the upstream provides one.
- Do not clone or build an upstream project merely to fill a report. Build only when it produces material evidence for a stated decision.
- Disclose any upstream code execution, network access, and generated artifacts in the report.

This baseline did **not** build or execute any upstream project.

## Evidence snapshots

- Store point-in-time metadata separately from human analysis. The current snapshot is [`research/references/upstream-metadata-2026-10-25.json`](research/references/upstream-metadata-2026-10-25.json).
- Record the collection command, tool versions, date, and input list.
- Do not overwrite a snapshot silently. Add a new dated file and record why it was refreshed.
- Treat GitHub license detection as a pointer, not a legal conclusion.
- Review the diff before committing a refreshed snapshot.

## Comparing projects fairly

- Compare equivalent versions and equivalent workloads.
- Use the same machine, operating system, configuration, network conditions, and test data where practical.
- Repeat performance tests; report median and spread rather than a single best result.
- Distinguish cold start from warm start and idle memory from active workload memory.
- Include failures and unsupported features; do not silently exclude them.
- Preserve commands, scripts, logs, and environment details.
- Avoid treating one synthetic benchmark as a proxy for overall browser quality.

## Gap analysis

For every capability, record:

- Requirement or test case.
- Expected behavior and why it matters.
- Current product behavior.
- Evidence and reproducible steps.
- Severity/user impact.
- Candidate upstream implementation(s).
- Proposed remedy and alternatives.
- Confidence and effort range.
- Linked issue and status.

## Estimates

Use ranges, not single-point promises, when uncertainty is material. State:

- Assumptions (team size, experience, platform count, scope boundaries).
- Confidence: high, medium, or low.
- Dependencies and blockers.
- Discovery work still needed.
- Whether the estimate covers investigation, implementation, validation, or all three.

Do not convert an investigation estimate into a delivery commitment.

## Issue conventions

- File product work in `devstroop/browser`; file research tooling and cross-project work in `devstroop/browser-workspace`.
- Use the label vocabulary in [`planning/LABELS.md`](planning/LABELS.md).
- Separate epics, research, tasks, and bugs.
- Link a report to its parent issue and its actionable child issues.
- Do not file duplicate issues for the same finding. Search first, then link or update.
- Public product issues must be self-contained; do not make private workspace access a prerequisite for understanding them.

## AI-assisted work

AI tools may assist with collection, drafting, and code changes, but they do not create evidence.

- Verify generated commands and source citations.
- Do not claim a test ran because a tool suggested it.
- Do not invent URLs, issue numbers, credentials, or policy settings.
- Clearly separate generated drafts from reviewed conclusions.
- A human reviewer remains responsible for merged work and published claims.

## Automation rules

Automated reports should:

- Be reproducible and include tool/version metadata.
- Link to logs and source evidence.
- Avoid storing credentials, session cookies, private browsing data, or personal data.
- Avoid creating duplicate issues for identical findings.
- Label findings as unverified until triaged.
- Fail visibly when upstream data cannot be fetched or a test environment is incomplete.

## Reporting checklist

Every report states:

- Scope and question.
- Date, revision(s), and environment.
- Method and evidence.
- Findings with evidence status and confidence.
- Limitations and what was not tested.
- Recommendation and next actions.
- Linked issue(s).
