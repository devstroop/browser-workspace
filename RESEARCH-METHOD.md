# Research and Evidence Method

## Purpose

Make research reproducible and actionable. Research should reduce uncertainty, guide architecture, identify gaps, and create implementation issues—not produce unsupported claims or endless notes.

## Evidence labels

Use these labels in reports:

- **Verified:** directly confirmed from source, documentation, or a reproducible test.
- **Observed:** seen during an experiment, with environment and steps recorded.
- **Inferred:** a reasoned conclusion supported by evidence, but not directly confirmed.
- **Hypothesis:** plausible and testable, not yet verified.
- **Unknown:** evidence is insufficient.
- **Outdated:** once valid, but not rechecked against current source or behavior.

Include a source URL, commit/version, access date, and relevant file/section for technical claims whenever possible.

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
10. Create/link actionable GitHub Issues in the correct repository.

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

## Automation rules

Automated reports should:
- Be reproducible and include tool/version metadata.
- Link to logs and source evidence.
- Avoid storing credentials, session cookies, private browsing data, or personal data.
- Avoid creating duplicate issues for identical findings.
- Label findings as unverified until triaged.
- Fail visibly when upstream data cannot be fetched or a test environment is incomplete.
