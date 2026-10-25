## Context

Every engine/shell option carries security and licensing obligations that are not resolved by "it is open source." The initial audit found AGPL, MPL, LGPL, BSD, Apache, and MIT components, plus Chromium third-party terms, codecs, and platform WebView terms.

The product repository is public. Detailed vulnerability analysis and exploit-specific notes must stay private; public artifacts should contain non-sensitive architecture and license findings.

## Research question

What security and license obligations must be satisfied before the MVP can render untrusted web content, and which engine/shell option is viable under those obligations?

## Scope

Security:

- Threat model for a desktop browser rendering untrusted content.
- Process model and sandbox per option: renderer/browser/GPU/network/utility processes, site isolation, IPC, entitlements.
- Compromise impact: file access, credential access, native bridge, downloads, external protocols.
- Update model: who ships engine fixes, how fast, signature verification, rollback.
- Permission model: camera, microphone, geolocation, notifications, clipboard, file picker.
- Telemetry, crash reporting, and remote services enabled by default.
- Supply chain: build provenance, binary verification, dependency advisories.

Licensing:

- File-level license inventory for everything shipped or linked.
- AGPL/MPL/LGPL obligations and compatibility with the intended product license.
- Chromium/CEF third-party notices, codecs, patents, and trademarks.
- WebKit per-file BSD/LGPL and platform WebView terms.
- Notice-generation and source-offer process.
- Contribution/license policy implications.

Out of scope:

- A full penetration test or fuzzing campaign.
- Legal advice; external counsel is required for conclusions.
- Codec/DRM licensing negotiation.
- Final engine selection.

## Expected deliverable

- A threat model with assets, trust boundaries, attackers, and abuse cases.
- A security comparison matrix for system WebView, CEF, and Electron.
- A license/notice inventory for spike artifacts and the intended MVP distribution.
- A list of blocking obligations and accepted risks.
- A public, non-sensitive summary plus a private detailed annex if needed.
- Inputs to the ADR and product governance issues.

## Acceptance criteria

- [ ] Threat model covers renderer compromise, cross-origin data, downloads, IPC, updates, profile data, and AI/agent actions.
- [ ] Sandbox/process claims are tied to runtime evidence or marked unknown.
- [ ] Update ownership and patch cadence are explicit for each option.
- [ ] License inventory includes transitive/bundled components, not just the root repository.
- [ ] AGPL/MPL/LGPL obligations are described in plain language and flagged for counsel.
- [ ] Codec/DRM/patent and trademark questions are listed.
- [ ] No public artifact contains exploit details or private user data.
- [ ] The ADR records which security/license constraints are gating.

## Estimate and confidence

- Estimate: 5–8 engineer-days for the internal analysis; external legal review is additional and unscheduled.
- Confidence: Medium for the framework; low for legal conclusions.
- Assumptions: access to the spike artifacts, CEF/Chromium license files, and counsel.

## Dependencies and blockers

- Engine/shell spike artifacts and measurements.
- Product license intent.
- Legal counsel.
- Security reviewer.

## Evidence

- `SECURITY-AND-LICENSES.md`
- `REFERENCE-REGISTER.md`
- `research/references/2026-10-25-initial-audit.md`
- Native SDK CEF sandbox source finding.
- Upstream license files and Chromium/CEF notices.

## Definition of done

The threat model and license inventory are reviewed, blocking obligations are linked to product issues, and the ADR can state the security/license constraints with evidence.
