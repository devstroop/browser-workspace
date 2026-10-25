# Browser Workspace

The engineering headquarters for researching, planning, experimenting on, and evolving the Devstroop browser initiative.

The workspace is intentionally flexible. It hosts research, experiments, cross-project analysis, benchmarks, and engineering automation. The production browser repository remains responsible for product implementation, product quality gates, and releases.

## Start here

1. Read [VISION.md](VISION.md) for the destination and guiding principles.
2. Read [WORKING-MODEL.md](WORKING-MODEL.md) for repository boundaries, issue-driven planning, and PR expectations.
3. Review [REFERENCE-REGISTER.md](REFERENCE-REGISTER.md) and record exact upstream repositories and versions before relying on them.
4. Use [RESEARCH-METHOD.md](RESEARCH-METHOD.md) for evidence-backed research.
5. Record durable technical choices as ADRs in `decisions/`.
6. Turn actionable findings into GitHub Issues in the repository responsible for the work.

## Suggested layout

```text
browser-workspace/
├── browser/                     # Git submodule: product repository
├── README.md
├── VISION.md
├── WORKING-MODEL.md
├── ROADMAP.md
├── REFERENCE-REGISTER.md
├── RESEARCH-METHOD.md
├── SECURITY-AND-LICENSES.md
├── research/
│   ├── README.md
│   ├── references/
│   └── standards/
├── experiments/
│   ├── README.md
│   └── _template/
├── gap-analysis/
│   ├── README.md
│   └── matrices/
├── benchmarks/
│   └── README.md
├── decisions/
│   ├── README.md
│   └── ADR-TEMPLATE.md
├── reports/
│   └── README.md
├── tooling/
│   └── README.md
├── ci/
│   └── README.md
└── .github/
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md
```

This is a starting point, not a mandate to create empty directories. Keep a directory only when it has a real purpose.

## Core rule

Research can be exploratory; product changes must be deliberate, tested, reviewed, and traceable. Every actionable finding should link to an issue. Avoid treating generated reports as authoritative until their evidence and limitations have been reviewed.
