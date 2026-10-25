# Devstroop Browser Workspace

- Status: Engineering baseline established; browser architecture undecided
- Baseline date: 2026-10-25
- Last verified: 2026-10-25

The engineering headquarters for the Devstroop browser initiative. This repository hosts research, comparative analysis, experiments, benchmarks, planning, and workspace automation. It is not the shipped browser.

The product repository is a Git submodule at [`browser/`](browser/) and is pinned to a reviewed commit. Product source, product tests, build/release configuration, and product CI belong there.

## Current state

| Item | Verified state (2026-10-25) |
|---|---|
| Workspace repository | Private GitHub repository: `devstroop/browser-workspace`; default branch `main` |
| Product repository | Public GitHub repository: `devstroop/browser`; default branch `main` |
| Product seed | Commit `077c98f` contains governance documentation and hygiene CI only; no browser code |
| Submodule | `browser/` pinned to `077c98f`; lifecycle remains independent |
| Architecture | No engine or shell selected; [ADR-0001](decisions/ADR-0001-browser-engine-and-shell-strategy.md) is **Proposed** |
| Reference audit | 16 projects pinned and audited at documentation/source-manifest level; no upstream build or runtime test |
| Workspace CI | Check workflow committed; see [tooling/checks](tooling/checks/README.md) |
| Issues | 8 baseline issues drafted; filing status in [planning/ISSUE-MAP.md](planning/ISSUE-MAP.md) |
| Branch protection | Not configured. The workspace repository is private and the current GitHub plan rejects branch protection/rulesets for it. |
| License | No license has been granted for either repository. Product reuse and external contributions are blocked pending a decision. |

The public product repository and the private workspace have different audiences. Public issues must be self-contained and must not disclose private research, credentials, or security details.

## Start here

1. [VISION.md](VISION.md) — destination, principles, MVP intent.
2. [WORKING-MODEL.md](WORKING-MODEL.md) — repository boundaries, review model, issue routing.
3. [ROADMAP.md](ROADMAP.md) — phased sequencing and current gate.
4. [REFERENCE-REGISTER.md](REFERENCE-REGISTER.md) — audited upstream projects, revisions, licenses, dispositions.
5. [RESEARCH-METHOD.md](RESEARCH-METHOD.md) — evidence labels, reproducibility, untrusted-code handling.
6. [SECURITY-AND-LICENSES.md](SECURITY-AND-LICENSES.md) — verified license/security findings and open obligations.
7. [FIRST-WEEK.md](FIRST-WEEK.md) — bootstrap checklist and next actions.
8. [CONTRIBUTING.md](CONTRIBUTING.md) — workspace contribution rules.

## Repository layout

```text
browser-workspace/
├── browser/                      # Git submodule: public product repository
├── decisions/
│   └── ADR-0001-browser-engine-and-shell-strategy.md
├── planning/
│   ├── ISSUE-MAP.md
│   ├── LABELS.md
│   ├── manifest.tsv
│   └── issues/                   # Issue-ready drafts and filed-issue bodies
├── research/
│   └── references/               # Audits and pinned metadata snapshots
├── reports/                      # Baseline, feasibility, risk, and issue-plan reports
├── tooling/
│   ├── checks/                   # Workspace validation
│   └── reference-audit/          # Reproducible GitHub metadata collection
├── templates/                    # Research, experiment, upstream-audit templates
├── .github/workflows/            # Workspace CI
├── README.md
├── VISION.md
├── WORKING-MODEL.md
├── ROADMAP.md
├── REFERENCE-REGISTER.md
├── RESEARCH-METHOD.md
├── SECURITY-AND-LICENSES.md
├── SUBMODULE.md
├── FIRST-WEEK.md
└── CONTRIBUTING.md
```

Empty scaffolding directories are not created without a purpose. Experiments, benchmarks, gap analysis, and standards research are added when real work exists.

## Quick start

The workspace is private. Clone access requires an organization credential.

```bash
git clone --recurse-submodules https://github.com/devstroop/browser-workspace.git
cd browser-workspace
node tooling/checks/check-workspace.mjs
```

If the submodule is not initialized:

```bash
git submodule update --init --recursive
```

Refresh the point-in-time upstream metadata snapshot:

```bash
./tooling/reference-audit/collect.sh
```

No package installation is required for the workspace checker; it uses Node.js built-ins only.

## Scope and limitations

- This baseline is reconnaissance and planning, not a browser implementation.
- No upstream project was built, executed, or benchmarked for this audit.
- Metadata is a point-in-time GitHub snapshot; licenses require file-level and legal review before reuse.
- Effort ranges are planning estimates with stated assumptions, not commitments.
- CI validates workspace structure and hygiene only. It does not validate product behavior or security.
- The workspace is not a runtime or build dependency of the product.

## Related records

- [Initial reference audit](research/references/2026-10-25-initial-audit.md)
- [Workspace baseline report](reports/2026-10-25-workspace-baseline.md)
- [Architecture feasibility report](reports/2026-10-25-architecture-feasibility.md)
- [Risk register](reports/2026-10-25-risks-and-open-questions.md)
- [Issue plan](reports/2026-10-25-issue-plan.md)
- [Submodule notes](SUBMODULE.md)
