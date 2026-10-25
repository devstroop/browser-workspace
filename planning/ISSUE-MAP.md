# Issue Map

- Last updated: 2026-10-25
- Source of truth for titles/labels: [`manifest.tsv`](manifest.tsv)
- Filing state: **8 issues filed on 2026-10-25**

## Workspace repository — `devstroop/browser-workspace`

| Key | Title | Labels | State | Issue |
|---|---|---|---|---|
| WS-01 | Establish workspace evidence baseline and traceability | `type: epic`, `area: workspace`, `priority: p1` | Open | [#1](https://github.com/devstroop/browser-workspace/issues/1) |
| WS-02 | Enforce workspace CI and repository governance | `type: task`, `area: ci`, `area: workspace`, `priority: p0` | Open | [#2](https://github.com/devstroop/browser-workspace/issues/2) |
| WS-03 | Establish a reference-audit refresh and advisory-watch cadence | `type: research`, `area: research`, `priority: p2` | Open | [#3](https://github.com/devstroop/browser-workspace/issues/3) |

## Product repository — `devstroop/browser`

| Key | Title | Labels | State | Issue |
|---|---|---|---|---|
| BR-01 | Define MVP scope, target platforms, and acceptance criteria | `type: epic`, `area: product`, `priority: p0` | Open | [#1](https://github.com/devstroop/browser/issues/1) |
| BR-02 | Time-boxed engine/shell spike: system WebView vs CEF vs Electron | `type: research`, `area: product`, `area: research`, `priority: p0` | Open | [#2](https://github.com/devstroop/browser/issues/2) |
| BR-03 | Security and license baseline for engine/shell options | `type: research`, `area: security`, `priority: p0` | Open | [#3](https://github.com/devstroop/browser/issues/3) |
| BR-04 | Bootstrap product repository governance and release readiness | `type: epic`, `area: product`, `priority: p0` | Open | [#4](https://github.com/devstroop/browser/issues/4) |
| BR-05 | Build visible browser prototype and MVP test harness | `type: epic`, `area: product`, `priority: p1`, `status: blocked` | Blocked | [#5](https://github.com/devstroop/browser/issues/5) |

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

## Current blockers

| Blocker | Affected issues | State |
|---|---|---|
| No product license decision | BR-04; external contributions and distribution | Open |
| No engine/shell decision | BR-02, BR-05 | Open; spike not run |
| No MVP site/test list | BR-01, BR-02, BR-05 | Open |
| Workspace required status check not configured | WS-02, WS-01 CI enforcement | CI passes; branch protection/rulesets unavailable on current private-repo plan |
| Product branch protection not configured | BR-04 | Open |
| No legal/security review | BR-03, BR-04 | Open |
| NATIVE SDK CEF sandbox disabled | BR-02, BR-03 | Verified source finding; remediation unknown |

## Filing notes

- Public product issues are self-contained. They cite public upstream sources and do not use private workspace links as the only evidence.
- The issue bodies remain in [`issues/`](issues/) as the reviewable source.
- Update this map and [`manifest.tsv`](manifest.tsv) when an issue is closed, superseded, or split.
- Do not close WS-01 merely because the issue was filed; close it when its acceptance criteria are met.
