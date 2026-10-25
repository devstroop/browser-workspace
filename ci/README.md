# Workspace CI

Workspace CI may validate submodule state, run research scripts, compare upstream revisions, execute selected experiments, and publish reports.

## Suggested initial checks

1. Workspace structure and required files.
2. Submodule initialized and pinned commit available.
3. Markdown and link checks where reliable.
4. Research scripts have deterministic output and clear failure states.
5. Reports contain revision and environment metadata.
6. Secrets and private user data are not emitted into logs or artifacts.

## Research automation guardrails

- Pin tool versions where practical.
- Rate-limit upstream polling.
- Cache responsibly and show when data is stale.
- Distinguish network failure from a genuine upstream change.
- Avoid automatic issue creation until deduplication and triage rules are proven.
- Use least-privilege tokens and never store secrets in the repository.
- Keep product CI in the browser repository; workspace CI may invoke it but should not silently replace its required checks.
