# Issue Map

- Last updated: 2026-10-25
- Source of truth for titles/labels: [`manifest.tsv`](manifest.tsv)
- Filing state: **Drafts prepared; not yet filed** (update after GitHub issue creation)

## Workspace repository — `devstroop/browser-workspace`

| Key | Title | Labels | State | Issue |
|---|---|---|---|---|
| WS-01 | Establish workspace evidence baseline and traceability | `type: epic`, `area: workspace`, `priority: p1` | Draft | — |
| WS-02 | Enforce workspace CI and repository governance | `type: task`, `area: ci`, `area: workspace`, `priority: p0` | Draft | — |
| WS-03 | Establish a reference-audit refresh and advisory-watch cadence | `type: research`, `area: research`, `priority: p2` | Draft | — |

## Product repository — `devstroop/browser`

| Key | Title | Labels | State | Issue |
|---|---|---|---|---|
| BR-01 | Define MVP scope, target platforms, and acceptance criteria | `type: epic`, `area: product`, `priority: p0` | Draft | — |
| BR-02 | Time-boxed engine/shell spike: system WebView vs CEF vs Electron | `type: research`, `area: product`, `area: research`, `priority: p0` | Draft | — |
| BR-03 | Security and license baseline for engine/shell options | `type: research`, `area: security`, `priority: p0` | Draft | — |
| BR-04 | Bootstrap product repository governance and release readiness | `type: epic`, `area: product`, `priority: p0` | Draft | — |
| BR-05 | Build visible browser prototype and MVP test harness | `type: epic`, `area: product`, `priority: p1` | Draft; blocked | — |

## Sequence

```text
WS-01 (baseline) ──► WS-02 (CI/governance)
        │
        └──► WS-03 (audit refresh)

BR-01 (MVP) ──┬──► BR-02 (engine/shell spike) ──► BR-05 (prototype)
              │
BR-03 (security/license) ──┘
              │
BR-04 (product governance) ──┘
```

- BR-01 defines the test basis for BR-02.
- BR-02 produces the evidence for the ADR and unblocks BR-05.
- BR-03 gates CEF/engine adoption and distribution.
- BR-04 gates external contributions and releases.
- WS-02 and BR-04 are separate because workspace controls and product controls differ.

## Filing notes

- Create labels before filing; use the names in [`LABELS.md`](LABELS.md).
- Public product issues must be self-contained. Cite public upstream sources; do not use private workspace links as the only evidence.
- After filing, replace `—` with the issue URL and `Draft` with `Open`/`Blocked`/`Closed`.
- Update `manifest.tsv` with the issue number.
- Do not close WS-01 merely because the issue was filed; close it when its acceptance criteria are met.
