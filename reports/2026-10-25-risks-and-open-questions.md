# Risks and Open Questions

- Report date: 2026-10-25
- Status: Initial register; review cadence not agreed
- Scope: Product, architecture, security, licensing, delivery, and repository governance
- Evidence: [Reference audit](../research/references/2026-10-25-initial-audit.md), [feasibility report](2026-10-25-architecture-feasibility.md), [workspace baseline](2026-10-25-workspace-baseline.md), verified repository settings
- Related issues: See [planning/ISSUE-MAP.md](../planning/ISSUE-MAP.md)

## Scope

Included: product, architecture, security, licensing, delivery, and repository-governance risks visible at the baseline.

Excluded: runtime findings, incident history, legal conclusions, and risks that require team/budget information not available at the audit date.

## Risk rating

- **Likelihood:** High / Medium / Low
- **Impact:** Critical / High / Medium / Low
- Ratings are initial judgments, not measurements.

## Top risks

| ID | Risk | Likelihood | Impact | Evidence | Mitigation | Issue |
|---|---|---|---|---|---|---|
| R-01 | Engine/shell choice is made by intuition or prototype lock-in rather than measured evidence. | High | Critical | No runtime comparison; ADR Proposed | Time-boxed spike with fixed criteria; ADR acceptance gate | Engine/shell spike |
| R-02 | CEF is adopted with an unsandboxed host, exposing users to renderer compromise. | Medium | Critical | Native SDK `no_sandbox = true` verified | Require sandbox/process-model review; reject host if not remediated | Security/license baseline |
| R-03 | Chromium update cadence outpaces the team, leaving known CVEs shipped. | Medium–High | Critical | CEF inherits Chromium CVEs; Native SDK updater lacks CEF | Define update ownership/SLA before CEF adoption; automate patching | Security/license baseline |
| R-04 | Product license is undecided, blocking contributions and creating redistribution ambiguity. | High | High | No license file in product repo | Decide license; legal review; add notices | Product governance |
| R-05 | AGPL code (Lightpanda) contaminates a proprietary product. | Medium | High | AGPL-3.0-or-later headers | Exclude from shipped runtime; counsel review for any use | Security/license baseline |
| R-06 | MPL/LGPL obligations are missed when modifying Servo/Brave/WebKit. | Medium | High | MPL/LGPL findings | File-level inventory; notice/source process; legal review | Security/license baseline |
| R-07 | System WebView fragmentation produces unacceptable site failures. | High | High | OS-versioned engines; no site tests | Fixed 20-site MVP set; record platform failures; consider CEF if gate fails | MVP definition |
| R-08 | CEF binary size, memory, or packaging burden makes distribution impractical. | Medium | High | CEF/Chromium footprint documented | Measure in spike; define size/memory budgets | Engine/shell spike |
| R-09 | No updater for CEF/Windows/Linux in Native SDK; shipping without updates is unsafe. | High | High | Native SDK updates docs | Build/choose update mechanism; test signing and rollback | Product governance |
| R-10 | Product repository is public while workspace is private, causing broken evidence links or disclosure mistakes. | High | Medium | Verified visibility asymmetry | Self-contained public issues; disclosure review; avoid private links as sole evidence | Workspace CI/governance |
| R-11 | Branch protection/required reviews are absent; unreviewed changes can merge. | High | High | Product protection not configured; workspace plan blocks it | Configure product rulesets; upgrade workspace plan or change visibility | Workspace CI/governance |
| R-12 | CI is assumed to pass or enforce more than it does. | Medium | Medium | Workflow added but not yet run; checks are hygiene-only | Verify run status; document scope; add required checks after pass | Workspace CI/governance |
| R-13 | GitHub Actions supply chain: unpinned actions or broad permissions. | Medium | High | SHA pinning not required; all actions allowed | Pin actions by SHA; least privilege; review workflows | Workspace CI/governance |
| R-14 | No threat model or security test suite; security claims outpace implementation. | High | High | No product code/tests | Threat model before MVP; security tests; avoid claims | Security/license baseline |
| R-15 | Codec/DRM/patent requirements are discovered late. | Medium | High | No codec/DRM review | Product requirements decision; legal/technical review | MVP definition |
| R-16 | Accessibility is deferred and becomes expensive to retrofit. | Medium | Medium | No accessibility target or tests | Set target (e.g., WCAG 2.2 AA) and test plan early | MVP definition |
| R-17 | Effort estimates are treated as commitments. | High | Medium | Ranges are assumptions; no team input | Label estimates; review after spike; track actuals | Issue plan |
| R-18 | AI/agent features create prompt-injection or data-exfiltration paths. | Medium | High | Vision includes AI; no design | Treat page content as untrusted; permissioned tools; data-flow review | Future AI safety issue (not yet filed) |
| R-19 | Upstream reference data goes stale and decisions rely on old revisions. | High | Medium | Point-in-time snapshot | Refresh cadence; monitor releases/advisories | Reference-audit cadence |
| R-20 | Submodule pointer drifts or CI cannot fetch it after a visibility change. | Medium | Medium | Public product/private workspace | Checker; documented credential strategy; re-review on visibility change | Workspace CI/governance |

## Detailed concerns

### Security

The largest security risk is not a missing feature; it is adopting a shell that cannot isolate untrusted web content. Native SDK's CEF host is a concrete example: the sandbox is disabled in source. A prototype may look fine while providing no meaningful renderer containment. Any CEF path must demonstrate:

- Renderer processes are sandboxed and least-privileged.
- A compromised renderer cannot read arbitrary files or invoke privileged host APIs.
- IPC validates messages and origins.
- Navigation, downloads, external protocols, and permissions are brokered by the browser process.
- Updates are signed and rollback-safe.

None of these were tested in this baseline.

### Licensing

The product cannot accept external contributions or distribute binaries safely until the license is decided. The audit found AGPL, MPL, LGPL, BSD, Apache, and MIT components, plus Chromium third-party terms. "Open source" is not a sufficient license conclusion. A file-level inventory and notice-generation process are required.

### Product scope

The MVP is not defined. Without target platforms, a site list, and acceptance thresholds, every architecture looks equally plausible. The spike should use a fixed, written test set so results are comparable.

### Repository governance

The workspace is private and its current plan rejects branch protection/rulesets. The product repository is public and has rulesets available, but none are configured. The baseline should not be described as "protected" or "reviewed by default." Those controls must be configured and verified.

### Public/private asymmetry

The product repository is public. A public issue that links only to a private workspace report is not usable by the public and may disclose that private material exists. Public issues should summarize actionable, non-sensitive evidence. Security details belong in private reporting channels.

## Open questions

### Product

1. What platforms and minimum OS versions are required for the first release?
2. What 20 sites/tests define MVP compatibility?
3. Is the product proprietary, open source, or mixed? Which license?
4. Are tabs, profiles, bookmarks, history, downloads, extensions, and sync in the MVP?
5. What accessibility standard is required?
6. What distribution channels are targeted (direct, Mac App Store, Microsoft Store, Linux packages)?
7. Is AI/agent functionality in the MVP or later?
8. What telemetry, crash reporting, and remote processing are acceptable?

### Architecture

9. Is system WebView sufficient for the MVP site set?
10. If CEF, who owns Chromium updates and sandbox integration?
11. Is a Chromium fork ever intended, or only a bundled runtime?
12. Does the product need codecs/DRM? Which ones, and under what agreements?
13. What is the engine boundary, and what would a later engine switch require?
14. What are the startup, memory, and binary-size budgets?

### Security and legal

15. What threat model applies to the MVP?
16. Who is responsible for vulnerability response, and what targets are promised?
17. Is AGPL code excluded categorically?
18. What patent/trademark review is needed for branding and codecs?
19. What data leaves the device, and under what user controls?
20. What security review is required before rendering untrusted content?

### Delivery

21. Team size, skills, and available time?
22. Budget for signing certificates, CI hardware, and distribution?
23. Who owns the product roadmap and issue triage?
24. What is the review cadence for this risk register?

## Limitations

- Risks are based on documentation/source inspection, not runtime testing.
- Likelihood/impact ratings are subjective initial judgments.
- No legal, privacy, or security review has been completed.
- Repository settings can change; re-verify before relying on them.
- Some risks depend on unknown team size, budget, and timeline.

## Linked issues

See the [issue map](../planning/ISSUE-MAP.md). The highest-priority open issues are the engine/shell spike, security/license baseline, MVP definition, product governance, and workspace CI/governance.
