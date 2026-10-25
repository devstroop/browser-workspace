# Security, Privacy, and Third-Party Reuse

- Status: Working policy; no legal review completed
- Last reviewed: 2026-10-25

This document records verified findings and proposed controls. It is not legal advice. A qualified reviewer must assess distribution, codec, patent, trademark, and copyleft obligations before any release.

## Third-party code

Before copying, linking, vendoring, or redistributing any component:

1. Identify its canonical source and exact version/commit.
2. Read the repository license and relevant file-level notices.
3. Review licenses of transitive and bundled dependencies, including binaries.
4. Record attribution, notice, source-offer, patent, trademark, and modification obligations where applicable.
5. Identify incompatible or unclear terms and escalate before integration.
6. Preserve notices and document local modifications.
7. Track the component and its update/security advisories.

Do not assume all files in a repository have identical terms or that public availability grants unrestricted reuse.

## Verified license findings

| Component | Verified finding | Evidence | Immediate implication |
|---|---|---|---|
| Lightpanda | AGPL-3.0 **or later** according to source headers; GitHub reports `AGPL-3.0` | `LICENSE`; `src/main.zig`, `src/cli.zig`, `src/rust/render/lib.rs` headers | Strong network-copyleft obligations. Not suitable for a proprietary visible browser without counsel approval. |
| Servo | MPL-2.0 | `servo/servo` `LICENSE` | File-level copyleft; modified MPL files must remain MPL and source must be available. |
| Brave core | MPL-2.0, with Chromium components | GitHub license metadata; Chromium root license | File-level obligations plus Chromium third-party notices. |
| WebKit | No top-level license; BSD-2-Clause and LGPL-2.1 per-file texts | `Source/WebCore/LICENSE-APPLE`, `Source/WebCore/LICENSE-LGPL-2.1`; no root `LICENSE` | File-level inventory required; LGPL affects relinking and reverse-engineering rights. |
| Firefox | MPL-2.0; root notice points to a generated inventory | Root `LICENSE`; GitHub reports `NOASSERTION` | Do not treat "MPL-2.0" as the complete dependency inventory. |
| Chromium | BSD-3-Clause root license plus third-party notices | Root `LICENSE` | Ship a generated notice file; codec and patent terms need separate review. |
| CEF | BSD-3-Clause for CEF; Chromium/third-party terms still apply | `LICENSE.txt`; README | CEF is not a complete Chromium license grant. |
| Native SDK | Apache-2.0 | Repository license metadata; CEF is a separate runtime | Apache-2.0 does not relicense CEF/Chromium. |
| Wry | Apache-2.0 OR MIT | `LICENSE-MIT`; GitHub reports Apache-2.0 | Choose and record one option; preserve notices. |
| Electron | MIT; bundles Chromium and Node.js | Repository license metadata; distribution model | MIT covers Electron's own code, not all bundled components. |
| Web Platform Tests | BSD-3-Clause | `LICENSE.md` | Compatible with test use; preserve notice. |
| Playwright / Puppeteer | Apache-2.0 | Repository license metadata | Compatible with test tooling; preserve notices. |

### Key correction from the initial audit

The initial working note described Lightpanda as "AGPL-3.0-only." The repository source headers say "either version 3 of the License, or (at your option) any later version." Treat the project as **AGPL-3.0-or-later** unless counsel determines that the `LICENSE` file alone controls. This distinction matters for compliance planning and should be recorded in any dependency inventory.

## Verified CEF sandbox finding

Native SDK v0.11.0's macOS CEF host disables the Chromium sandbox unconditionally:

```cpp
// /Users/itsalfredakku/native-sdk/src/platform/macos/cef_host.mm:291 (v0.11.0)
CefSettings settings;
settings.no_sandbox = true;
```

Evidence status: **Verified source inspection** at tag `v0.11.0` (`16f2957`). This was not runtime-tested, and it does not establish that CEF itself is unsandboxed. It establishes that this particular host configures CEF without the Chromium sandbox.

Implications:

- A browser rendering arbitrary web content must not adopt this host unchanged.
- Enabling the sandbox is not a one-line change: it interacts with process launch, helper executables, signing, entitlements, crash handling, and the host's embedded-process model.
- The sandbox configuration must be verified at runtime (renderer process isolation, compromised-renderer behavior, file access, IPC) before any claim of isolation.
- If the host cannot support a sandbox, it should be treated as a prototype-only shell, not a security boundary.

## Security baseline for the browser

The threat model should eventually cover:

- Malicious websites and renderer compromise.
- Cross-origin data exposure and process isolation.
- Downloads, file access, external protocol handlers, and clipboard access.
- Certificates, TLS, mixed content, and insecure navigation.
- Extensions and injected scripts.
- Local profile data, credentials, cookies, and tokens.
- AI prompts, page content, tool calls, and agent-induced actions.
- Update integrity, supply-chain attacks, and compromised dependencies.
- Platform integration: helper processes, IPC, entitlements, and crash reporting.

Minimum questions before selecting an engine/shell:

1. What is the process model, and which processes are sandboxed by default?
2. How are site isolation and cross-origin boundaries enforced?
3. How quickly can Chromium/Gecko/WebKit security fixes be shipped?
4. What is the update mechanism, and does it verify signatures and roll back safely?
5. What telemetry or remote services are enabled by default?
6. What third-party binaries, codecs, and services ship with the runtime?
7. What is the vulnerability disclosure and advisory process?

## Current security posture

| Control | Verified state (2026-10-25) |
|---|---|
| Product and workspace security policy | `SECURITY.md` exists in both repositories |
| Private vulnerability reporting | Enabled on `devstroop/browser` |
| Workspace vulnerability reporting | API returned 404 / unavailable at audit time; do not claim a reporting channel |
| Branch protection | Not configured on product; unavailable for private workspace on current plan |
| Required reviews | Not enforced |
| CODEOWNERS | Not configured |
| Signed commits | Not required |
| Dependency update automation | Not configured |
| Secret scanning / push protection | Not verified as enabled |
| CI token permissions | Workflows declare `contents: read`; repository default is read-only workflow permissions |
| CI execution | Product hygiene check passed (run `40175022540`); workspace workflow blocked by private-repository Actions billing/spending limit (run `40175789838`); local checker passes |
| GitHub Actions policy | All actions allowed; SHA pinning not required. Workflows in this baseline pin action commits manually. |
| Release signing / notarization | Not implemented |
| Update integrity | Not implemented |

These are repository settings and source facts, not a claim that the product is secure. Verify settings again before relying on them.

## Supply chain

- Pin GitHub Actions to full commit SHAs and keep the version in a comment.
- Keep workflow permissions minimal.
- Do not expose repository secrets to pull requests from forks.
- Generate and review a dependency/license inventory before distribution.
- Track security advisories for the engine, embedded runtime, and packaging tools.
- Do not publish exploit details or private user data in public issues.

## AI and agent safety

- Page content is untrusted input, not privileged instruction.
- Agents must use browser-enforced permissions and APIs.
- High-impact actions need explicit user authorization or a narrowly defined policy.
- Keep secrets out of model context unless essential and explicitly authorized.
- Record the data sent to remote model providers and provide meaningful controls.
- Separate browsing data by profile/context and apply retention limits.
- Do not equate a model's judgment with a security boundary.
- Prompt injection is a security issue, not only a product-quality issue.

## Reporting

Product vulnerabilities: use the private reporting link in the product repository's [SECURITY.md](https://github.com/devstroop/browser/blob/main/SECURITY.md) or GitHub Security Advisories for `devstroop/browser`. Do not open a public issue with exploit details.

Workspace/tooling security issues: contact the maintainers privately. No workspace-specific private reporting channel is verified as configured.

## Open legal and security questions

- Will the product be proprietary, open source, or mixed? Which license?
- Is AGPL code categorically excluded, or only from the shipped runtime?
- Will the product ship its own Chromium/CEF build, or rely on OS WebViews?
- Are proprietary codecs, DRM, or Widevine required? Under what agreements?
- What patent and trademark review is needed for browser branding and codec distribution?
- What data leaves the device for AI features, telemetry, crash reporting, and updates?
- What security review is required before handling untrusted web content?
- Who owns vulnerability response, and what response targets are promised?
