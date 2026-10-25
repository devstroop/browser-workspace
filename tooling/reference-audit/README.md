# Reference Audit Metadata Collector

Collects point-in-time GitHub metadata for the projects in the
[reference register](../../REFERENCE-REGISTER.md). It records the default
branch, exact commit SHA and date, latest stable release, latest published
release (including prereleases), license reported by GitHub, language byte
counts, activity fields, and repository description.

## Purpose and limits

This tool makes the metadata in the reference audit reproducible. It does
**not** audit source code, build the project, verify runtime behavior, or
establish that a license is compatible with redistribution. Those require the
project-specific review described in
[`templates/UPSTREAM-AUDIT-TEMPLATE.md`](../../templates/UPSTREAM-AUDIT-TEMPLATE.md).

GitHub's license detection can be incomplete, especially for repositories with
per-file licensing or large third-party trees. Treat the `license` field as a
pointer to the authoritative license file, not as a legal conclusion.

## Requirements

- `gh` authenticated for the public GitHub API
- `jq`
- Network access

## Run

```bash
./tooling/reference-audit/collect.sh
```

Optional arguments:

```bash
./tooling/reference-audit/collect.sh path/to/references.tsv path/to/output.json
```

Set `AUDIT_DATE=YYYY-MM-DD` to label a re-run with the date the evidence was
collected. The default output path is
`research/references/upstream-metadata-<UTC-date>.json`.

The script fails on a missing tool, missing authentication, or an API error. It
does not retry silently: stale or partial data should be visible, not mistaken
for a fresh audit. Review the diff before committing a refreshed snapshot.

## Data handling

Only public repository metadata is requested. The script never prints the
GitHub token. Do not add tokens, private repository names, or private issue
content to the input list.
