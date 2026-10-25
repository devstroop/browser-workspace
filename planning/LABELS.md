# Issue Labels

- Status: Baseline vocabulary; labels are created in both repositories
- Last reviewed: 2026-10-25

Use a small, consistent vocabulary. Do not invent a new label for every issue.

## Type

| Label | Color | Use |
|---|---|---|
| `type: epic` | `5319E7` | Broad outcome spanning multiple issues or workstreams |
| `type: research` | `1D76DB` | Question or investigation that reduces uncertainty; not an implementation commitment |
| `type: task` | `0E8A16` | Bounded implementation, documentation, or operations work |
| `type: bug` | `D73A4A` | Reproducible defect or observed capability gap |

## Status

| Label | Color | Use |
|---|---|---|
| `status: blocked` | `B60205` | Cannot proceed until a named dependency is resolved |
| `status: needs-decision` | `D93F0B` | Requires a product, architecture, legal, or security decision |

## Priority

| Label | Color | Use |
|---|---|---|
| `priority: p0` | `B60205` | Blocks the current gate or creates an unacceptable security/licensing risk |
| `priority: p1` | `D93F0B` | Required for the next milestone; schedule now |
| `priority: p2` | `FBCA04` | Useful, but not on the critical path |

## Area

| Label | Color | Use |
|---|---|---|
| `area: workspace` | `C5DEF5` | Workspace repository, research process, or planning |
| `area: product` | `1D76DB` | Product repository, product behavior, or release |
| `area: security` | `B60205` | Threat model, sandbox, vulnerability response, supply chain |
| `area: research` | `5319E7` | Upstream audit, feasibility, or comparative analysis |
| `area: ci` | `0E8A16` | Build, test, or repository automation |

## Rules

- Every issue should have one `type:` label.
- Add `status:` only when it conveys actionable state; do not use it as a substitute for comments.
- Use `priority:` sparingly. A board with everything at p0 has no priority.
- Use one or more `area:` labels; avoid overlapping area labels unless the work genuinely spans them.
- Do not encode estimates, owners, or dates in labels.
- Keep label names lowercase and stable; renaming labels breaks saved searches and automation.
- GitHub default labels (`bug`, `documentation`, `enhancement`, etc.) may remain, but project issues should use the vocabulary above.

## Milestones

No milestones are created yet. Proposed milestone sequence:

1. `M0 — Baseline` (workspace, audit, governance)
2. `M1 — Decision` (MVP definition, engine/shell spike, security/license baseline)
3. `M2 — Visible prototype` (shell, navigation, smoke tests)
4. `M3 — MVP` (profile, tabs, permissions, updates, acceptance suite)

Do not create a milestone until its exit criteria are written.
