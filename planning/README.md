# Planning

This directory holds issue-ready drafts, the label vocabulary, the issue manifest, and the issue map.

- [`LABELS.md`](LABELS.md) — label vocabulary and milestone proposal.
- [`manifest.tsv`](manifest.tsv) — machine-readable issue index.
- [`ISSUE-MAP.md`](ISSUE-MAP.md) — human-readable status and links.
- [`issues/`](issues/) — issue bodies used to file or update GitHub issues.

## Rules

- One issue per file, named `<KEY>-<slug>.md`.
- Keep the issue body self-contained. Public product issues must not depend on private workspace links.
- Record estimates as ranges with assumptions and confidence.
- Separate research/investigation from implementation.
- Update `manifest.tsv` and `ISSUE-MAP.md` when an issue is filed, closed, or superseded.
- Do not file duplicate issues. Search first, then link or update.
- Do not create a milestone until its exit criteria are written.

## Filing

Labels are documented in `LABELS.md` and created in both repositories. Use `gh issue create --title ... --body-file ... --label ...` from the target repository, or file through the issue templates.

The body files intentionally start with `## Context` rather than a duplicate title. The title and labels come from `manifest.tsv`.
