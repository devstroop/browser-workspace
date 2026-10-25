# Initial Upstream Reference Audit

- Status: Findings ready for review
- Audit date: 2026-10-25
- Auditor: Workspace baseline (AI-assisted, human review required)
- Scope: Architecture, platform, license, and maturity reconnaissance for 16 reference projects
- Related decision: [ADR-0001](../../decisions/ADR-0001-browser-engine-and-shell-strategy.md) (Proposed)
- Related reports: [Reference audit summary](../../reports/2026-10-25-reference-audit.md), [architecture feasibility](../../reports/2026-10-25-architecture-feasibility.md)
- Issues: See [planning/ISSUE-MAP.md](../../planning/ISSUE-MAP.md)

## Executive summary

No reference project is a drop-in browser. The credible MVP paths are:

1. A native shell around a **system WebView** (Tauri/Wry or a native host).
2. A native shell around a pinned **CEF/Chromium** runtime.
3. An **Electron** control prototype to learn quickly, not as the target architecture.

Chromium, Gecko, WebKit, Servo, and Ladybird are not MVP shortcuts. A Chromium fork is an organization-level commitment. Servo's embedding story is still in progress. Ladybird is pre-alpha. Lightpanda is headless and does not have a layout engine. WebKit and Firefox are better understood as platform/reference engines than as embeddable product engines for this team.

The most important technical finding is that **Native SDK's macOS CEF host disables the Chromium sandbox**. That makes it unsuitable as evidence of a secure CEF architecture without remediation. The most important licensing finding is that **Lightpanda is AGPL-3.0-or-later**, not a permissive dependency.

**Recommendation:** run the time-boxed system-WebView vs CEF vs Electron spike described in ADR-0001. Do not select a final engine from this document alone.

## Scope

Included:

- Canonical repository identification for 16 projects.
- Exact revision, release, license metadata, primary language, and activity snapshot.
- Documentation and selected source inspection for browser-relevant capabilities.
- Platform support, embedding status, and maintenance signals where publicly documented.
- License red flags relevant to redistribution.

Excluded:

- Building or running any upstream project.
- Runtime benchmarks, compatibility runs, fuzzing, or security testing.
- Full transitive dependency and codec/patent inventories.
- Legal review.
- Product implementation or a final engine decision.

## Method

1. Pin each project in [`tooling/reference-audit/references.tsv`](../../tooling/reference-audit/references.tsv).
2. Collect GitHub metadata with [`collect.sh`](../../tooling/reference-audit/collect.sh) into [`upstream-metadata-2026-10-25.json`](upstream-metadata-2026-10-25.json).
3. Read repository READMEs, license files, manifests, and selected source/docs at the pinned revision.
4. Record verified facts separately from interpretation.
5. Compare options against the criteria in ADR-0001.
6. Record limitations and unresolved questions.

Environment: macOS workstation, GitHub CLI authenticated to a public account, no upstream build or execution. Metadata is a point-in-time snapshot; upstream branches move.

## Summary table

| Project | Pin | Release | License | Primary language | Disposition |
|---|---|---|---|---|---|
| Lightpanda | `f9cfcba` | 1.0.2 | AGPL-3.0-or-later | Zig | Reference only; not a visible engine |
| Native SDK | `ff108d0` | v0.11.0 | Apache-2.0 | Zig | Monitor/prototype; macOS CEF only, sandbox disabled |
| Tauri | `1fc6d9c` | v2.12.5 | Apache-2.0 | Rust | Prototype candidate for system WebView shell |
| Wry | `713aee4` | 0.57.1 | Apache-2.0 OR MIT | Rust | Component candidate |
| Chromium | `3f5a919` | none | BSD-3 + third-party | C++ | Reference/future fork |
| Brave browser | `f91a6cf` | 1.98.60 | MPL-2.0 | — | Reference only |
| Brave core | `1e6f002` | none | MPL-2.0 | C++ | Reference only |
| Servo | `3043596` | 0.7.0 | MPL-2.0 | Rust | Monitor |
| Ladybird | `b7b781e` | none | BSD-2 | C++ | Monitor |
| WebKit | `291e79a` | none | BSD-2/LGPL-2.1 per file | JavaScript/C++ | Reference/OS engine |
| Firefox | `efd2d1e` | none | MPL-2.0 | JavaScript/C++ | Reference only |
| WPT | `68d964a` | merge tag | BSD-3 | HTML/Python | Adopt for subset |
| Playwright | `91a765d` | 1.64.1 | Apache-2.0 | TypeScript | Adopt/prototype |
| Puppeteer | `08e7b1a` | 25.16.0 | Apache-2.0 | TypeScript | Adopt for CDP/BiDi |
| CEF | `e537569` | none | BSD-3 + Chromium | C++ | Prototype with security review |
| Electron | `96a2dc1` | 45.0.0 | MIT + third-party | C++ | Control prototype/reference |

## Per-project findings

### 1. Lightpanda

- **Canonical repository:** https://github.com/lightpanda-io/browser
- **Revision inspected:** `f9cfcba603427a3d4d4bb29964222f271aacbcd6` (2026-10-25)
- **Release:** 1.0.2 (2026-10-23)
- **License:** AGPL-3.0-or-later (GitHub reports AGPL-3.0)
- **Language/build:** Zig 0.17; V8 dependency; build manifest at `build.zig.zon`
- **Verified capabilities:** Headless browser for AI agents and automation; CDP and WebDriver BiDi servers; `fetch`, `serve`, agent mode; no native Windows binary (WSL2 path documented).
- **Rendering limits:** README describes PNG/PDF as "a text-only rendering of the page." `src/rust/render/lib.rs` states: "Lightpanda has no layout engine, so a 'screenshot' is the page's text content flowed into blocks." The renderer uses parley/skrifa/tiny-skia for text layout and painting, not a CSS layout engine.
- **Missing/unknown:** No general visual rendering; no evidence of full CSS layout, compositing, or browser chrome integration. Runtime performance claims are vendor benchmarks and were not reproduced.
- **Integration options:** Use as automation/reference backend via CDP/BiDi; do not embed as the visible browser engine.
- **License risk:** AGPL network-copyleft; source headers allow later versions. Treat as incompatible with a proprietary distributed browser without counsel approval.
- **Disposition:** **Reference only** for visible browser; possible research tool for automation.

### 2. Vercel Native SDK

- **Canonical repository:** https://github.com/vercel-labs/native
- **Revision inspected:** `ff108d0a86468deafbf93f4184355984f8e088c0` (upstream `main`, 2026-10-19); release tag `v0.11.0` = `16f2957`
- **License:** Apache-2.0
- **Language/build:** Zig 0.16; native UI toolkit with optional WebView content.
- **Verified capabilities (docs/source at v0.11.0):**
  - Native desktop hosts for macOS, Linux, and Windows.
  - System WebView: WKWebView (macOS), WebKitGTK (Linux), WebView2 (Windows).
  - Bundled Chromium through CEF **on macOS only**; Linux/Windows Chromium builds fail early.
  - CEF default pinned version `144.0.6+g5f7e671+chromium-144.0.7559.59` (`src/tooling/cef.zig`).
  - Child WebViews default `bridge: false`; global cap of 16 child WebViews.
  - Main-frame navigation allowlist; unknown navigations blocked unless external-link policy handles them.
  - Signed macOS updater for the system host only.
- **Security finding:** `src/platform/macos/cef_host.mm:291` sets `settings.no_sandbox = true;` unconditionally. Verified at `v0.11.0`; not runtime-tested.
- **Platform limits:** macOS CEF does not implement native child views or `gpu_surface` compositing. Updater does not support CEF, Windows, or Linux.
- **Missing/unknown:** No browser chrome (tabs, history, downloads, profiles), no cross-platform CEF hosts, no independent security review, no runtime benchmarks.
- **Integration options:** Use the system-WebView host as a shell prototype; use the CEF host only to study ergonomics, not as a secure CEF baseline.
- **Disposition:** **Monitor/prototype candidate**; do not adopt as-is.

### 3. Tauri

- **Canonical repository:** https://github.com/tauri-apps/tauri
- **Revision inspected:** `1fc6d9c85c7d9c79f44afc408853e4b5d3ac1e42` (2026-10-24)
- **Release:** `tauri-v2.12.5` published; GitHub's "latest" endpoint returned `tauri-cli-v2.12.4`
- **License:** Apache-2.0
- **Language/build:** Rust; system WebView via Wry.
- **Verified capabilities:** Desktop app framework, window lifecycle, IPC, permissions/capabilities, packaging, updater ecosystem. It is not a browser and does not ship an engine.
- **Missing/unknown:** No browser UI, tabs, profile model, permission prompts, download manager, or site isolation. The security model is app-oriented, not browser-oriented.
- **Integration options:** Use as the native shell for a system-WebView spike; build browser chrome and browser-specific security on top.
- **Disposition:** **Prototype candidate** for Option A.

### 4. Wry

- **Canonical repository:** https://github.com/tauri-apps/wry
- **Revision inspected:** `713aee46beffba6c49577380cd7cdc52b474f336` (2026-10-23)
- **Release:** `wry-v0.57.1`
- **License:** Apache-2.0 OR MIT (`LICENSE-MIT` present; GitHub reports Apache-2.0)
- **Language/build:** Rust; WKWebView, WebView2, WebKitGTK.
- **Verified capabilities:** Cross-platform system WebView embedding, custom protocols, IPC, navigation handlers.
- **Missing/unknown:** Platform behavior and available APIs differ; no browser chrome; no guarantee of identical engine versions.
- **Integration options:** Use directly or through Tauri in a shell spike.
- **Disposition:** **Component candidate**.

### 5. Chromium

- **Canonical repository:** https://github.com/chromium/chromium
- **Revision inspected:** `3f5a9191384c982c4baea0a3c78cdb2874a34bb8` (2026-10-25)
- **Release:** No GitHub release; source revision only
- **License:** BSD-3-Clause root plus extensive third-party notices
- **Language/build:** C++; GN/Ninja; very large checkout and build.
- **Verified capabilities:** Full browser platform: Blink, V8, GPU/compositor, network stack, process model, site isolation, sandbox, DevTools protocol.
- **Missing/unknown:** Not designed as an embeddable library; embedding is normally via CEF or a fork. Build infrastructure and update cadence are major costs.
- **Integration options:** Reference for architecture/security; long-term fork option only with a dedicated team.
- **Disposition:** **Reference / future fork**, not an MVP dependency.

### 6. Brave browser repository

- **Canonical repository:** https://github.com/brave/brave-browser
- **Revision inspected:** `f91a6cfb3041c8fa0c1dff417dbbfb36bd4f7363` (2026-10-23)
- **Release:** `v1.98.60` stable; `v1.100.31` latest published prerelease
- **License:** MPL-2.0 (metadata)
- **Verified role:** Issues, releases, wiki, and product shell repository; it is not the product source. Brave's source lives in `brave/brave-core`.
- **Missing/unknown:** Do not treat this repository as a code dependency.
- **Disposition:** **Reference only** for product/release structure.

### 7. Brave core

- **Canonical repository:** https://github.com/brave/brave-core
- **Revision inspected:** `1e6f00267d382150bac8f87266a163d36e609eb8` (2026-10-23)
- **Release:** No GitHub release
- **License:** MPL-2.0; Chromium components also apply
- **Language/build:** C++; Chromium build integration.
- **Verified role:** Brave product source layered on Chromium; useful reference for privacy features, patches, and Chromium integration.
- **Missing/unknown:** No build attempted; full dependency/notice inventory not audited.
- **Disposition:** **Reference only**; MPL file-level obligations apply if code is reused.

### 8. Servo

- **Canonical repository:** https://github.com/servo/servo
- **Revision inspected:** `3043596ce5d69a4d7d43c70bcb534479d892bbd7` (2026-10-25)
- **Release:** `v0.7.0` (2026-10-05)
- **License:** MPL-2.0
- **Language/build:** Rust; 64-bit macOS/Linux/Windows, Android, OpenHarmony.
- **Verified status:** Servo Book says "Work is still ongoing to make Servo consumable as a webview library." Recommended current paths: `servoshell`, `tauri-runtime-verso`, or `servo-gtk`.
- **Missing/unknown:** Embedding API stability, site compatibility, media/DRM, accessibility, and product-grade process isolation are not established for this use.
- **Integration options:** Monitor `tauri-runtime-verso`; prototype only after a stable embedding contract.
- **Disposition:** **Monitor**; not an MVP engine.

### 9. Ladybird

- **Canonical repository:** https://github.com/LadybirdBrowser/ladybird
- **Revision inspected:** `b7b781e8de0460166e6eb0c00d7dc380f4ff0278` (2026-10-25)
- **Release:** No GitHub release; pre-alpha
- **License:** BSD-2-Clause
- **Language/build:** C++ with Rust components; multi-process architecture (UI, WebContent, ImageDecoder, RequestServer).
- **Verified status:** README: "Ladybird is in a pre-alpha state, and only suitable for use by developers." Website: first macOS/Linux alpha "coming later this year" (as of 2026-10-25).
- **Platforms:** Linux, macOS, Windows via WSL2, other Unix-like systems.
- **Missing/unknown:** No stable embedding API; pre-alpha compatibility and security posture; not suitable for product dependency.
- **Disposition:** **Monitor**; not an MVP option.

### 10. WebKit

- **Canonical repository:** https://github.com/WebKit/WebKit
- **Revision inspected:** `291e79a4ca63bb9eea0073dd937e123b7c1c099b` (2026-10-25)
- **Release:** No GitHub release
- **License:** No top-level license file; per-file BSD-2-Clause and LGPL-2.1 texts (e.g., `Source/WebCore/LICENSE-APPLE`, `Source/WebCore/LICENSE-LGPL-2.1`); GitHub reports `NOASSERTION`
- **Language/build:** C++/JavaScript; CMake; platform-specific ports.
- **Verified capabilities:** Safari engine, JavaScriptCore, WKWebView on Apple platforms; WebKitGTK on Linux.
- **Missing/unknown:** Direct embedding outside platform WebViews is complex; per-file license inventory required; Windows support is not a simple native path.
- **Integration options:** Use the OS-provided WKWebView/WebKitGTK through a shell; do not embed the full engine for the MVP.
- **Disposition:** **Reference/OS engine**; not a direct MVP embed.

### 11. Firefox

- **Canonical repository:** https://github.com/mozilla-firefox/firefox
- **Revision inspected:** `efd2d1e6f77570ae6bc5294731a68101e45c81a3` (2026-10-24)
- **Release:** No GitHub release
- **License:** MPL-2.0; root `LICENSE` defers to a generated license inventory
- **Language/build:** C++/Rust/JavaScript; Gecko/SpiderMonkey; large build.
- **Verified role:** Canonical Firefox source. `mozilla/gecko-dev` is archived/superseded.
- **Missing/unknown:** No embedding path evaluated; full build not attempted.
- **Disposition:** **Reference only**; a Gecko fork is not an MVP path.

### 12. Web Platform Tests

- **Canonical repository:** https://github.com/web-platform-tests/wpt
- **Revision inspected:** `68d964a5f292bc4b2c2eba2f21e2b916190b6ad2` (2026-10-25)
- **Release:** No semantic release; newest tag was `merge_pr_64156`
- **License:** BSD-3-Clause
- **Verified role:** Cross-browser conformance suite; `wpt.fyi` stores results.
- **Missing/unknown:** Full-suite execution is not an MVP gate; test selection, browser harness integration, and result triage are still needed.
- **Integration options:** Select a small, relevant subset for the MVP engine; record expected failures.
- **Disposition:** **Adopt** for a defined subset.

### 13. Playwright

- **Canonical repository:** https://github.com/microsoft/playwright
- **Revision inspected:** `91a765d1681cb3eeb0d0fb89fefec3cf0d21bd9b` (2026-10-24)
- **Release:** `v1.64.1`
- **License:** Apache-2.0
- **Language/build:** TypeScript/Node.js.
- **Verified capabilities:** Browser automation for Chromium, Firefox, and WebKit builds; test runner, tracing, assertions.
- **Missing/unknown:** It does not make an arbitrary engine automatable; the engine must expose a compatible protocol or a Playwright browser implementation.
- **Integration options:** Use for end-to-end and compatibility tests where supported; fall back to CDP/BiDi or native harness otherwise.
- **Disposition:** **Adopt/prototype** for test automation.

### 14. Puppeteer

- **Canonical repository:** https://github.com/puppeteer/puppeteer
- **Revision inspected:** `08e7b1aebe60462b6f7834e9dfe0f6c70464247c` (2026-10-24)
- **Release:** `puppeteer-v25.16.0`; `browsers-v3.2.6`
- **License:** Apache-2.0
- **Language/build:** TypeScript/Node.js.
- **Verified capabilities:** CDP and WebDriver BiDi automation; Chrome/Chromium focus; Lightpanda documents Puppeteer use via `browserWSEndpoint`.
- **Missing/unknown:** Protocol coverage varies by engine; not a browser or compatibility guarantee.
- **Disposition:** **Adopt** for CDP/BiDi tests where supported.

### 15. CEF

- **Canonical repository:** https://github.com/chromiumembedded/cef
- **Revision inspected:** `e537569ecda2e3f23ffdac559ecf7f80b8e59467` (2026-10-23)
- **Release:** No GitHub release; binary distributions via `cef-builds.spotifycdn.com`
- **License:** BSD-3-Clause for CEF; Chromium and third-party terms apply
- **Language/build:** C++; tracks Chromium branches; binary distributions and source builds.
- **Verified capabilities:** Embed Chromium in native apps; C/C++ API; off-screen rendering; custom schemes; navigation/resource control; broad platform support in upstream CEF.
- **Security:** CEF inherits Chromium CVEs; README explicitly says applications should keep CEF up to date. Sandboxing is a host integration responsibility.
- **Missing/unknown:** No browser chrome; update mechanism, crash handling, permissions, profiles, downloads, and site isolation must be built/reviewed. Binary size and signing burden are significant.
- **Integration options:** Prototype with official CEF binaries and a sandbox-capable host; do not treat Native SDK's sandbox-disabled host as the baseline.
- **Disposition:** **Prototype candidate** with mandatory security review.

### 16. Electron

- **Canonical repository:** https://github.com/electron/electron
- **Revision inspected:** `96a2dc1f28a4e4a32fdc19d54ba0af36c7f2c536` (2026-10-24)
- **Release:** `v45.0.0`; `v46.0.0-alpha.1`
- **License:** MIT; bundles Chromium and Node.js with third-party terms
- **Language/build:** C++/TypeScript; Chromium + Node.js runtime.
- **Verified capabilities:** Rapid desktop Chromium app development; packaging, crash reporting, auto-update ecosystem; large community.
- **Security:** Node.js integration and renderer privileges must be locked down; the Electron security checklist is relevant even for a control prototype.
- **Missing/unknown:** Not a browser; no tabs/profile/permission model by default. Bundle size and process count are high.
- **Integration options:** Use as a control prototype for UX/performance comparison; do not adopt as the target architecture without a separate decision.
- **Disposition:** **Reference/control only**.

## Cross-cutting findings

### Licensing

- **AGPL:** Lightpanda. Strong network-copyleft. Source headers say "or later," which is broader than "AGPL-3.0-only." Exclude from a proprietary shipped browser unless counsel approves.
- **MPL-2.0:** Servo, Brave core, Firefox. File-level copyleft; modified MPL files must remain MPL and source must be available.
- **LGPL-2.1:** Parts of WebKit. Relinking and reverse-engineering obligations; file-level inventory required.
- **BSD/Apache/MIT:** Chromium, CEF, Wry, Tauri, Native SDK, Electron, WPT, Playwright, Puppeteer. Permissive but notice/patent/trademark obligations remain; bundled third-party components are not automatically covered.
- **No top-level license:** WebKit, and Firefox's root notice is a pointer. Do not infer a complete license from GitHub metadata.

### Platform and engine control

| Approach | Engine version control | Platform consistency | Bundle size | Update burden | MVP speed |
|---|---|---|---|---|---|
| System WebView | OS-controlled | Low–medium | Small | OS/vendor | Fast |
| CEF | Product-controlled | High with same build | Large | Product-owned Chromium cadence | Medium |
| Electron | Electron-controlled | High | Large | Electron cadence | Fastest |
| Chromium fork | Full | Full | Large | Very high | Very slow |
| Servo/Ladybird | Upstream | Unknown | Medium | Upstream + product | Slow/unknown |

### Maturity signals

Stars and commit activity are not quality measures, but they indicate ecosystem scale. The snapshot records stars, forks, open issues, and last push for each project. Interpretation:

- Chromium, Electron, Tauri, Playwright, Puppeteer, and Servo have large communities.
- CEF has a smaller repository footprint but a long-lived commercial embedding ecosystem.
- Ladybird has high attention but explicitly pre-alpha status.
- Lightpanda is fast-moving and release-active but not a general browser engine.
- Native SDK is young (v0.11.0) and should be treated as a fast-moving dependency, not a stable platform.

### Release metadata caveats

- GitHub's `releases/latest` endpoint is not always the newest published release. Tauri returned a CLI release while a framework release existed; Brave's newest published release was a prerelease; WPT's tags are automated merge tags.
- "No release" does not mean inactive. Chromium, CEF, WebKit, Firefox, Ladybird, and Brave core use other release processes.
- The table records what was inspected, not a guarantee that no newer revision exists.

## Risks and unknowns

- No runtime evidence: startup, memory, input, rendering, sandbox behavior, and crash recovery are untested.
- No compatibility evidence on a real site set.
- No build feasibility evidence for Chromium, Gecko, WebKit, Servo, or Ladybird.
- No complete dependency/license/notice inventory for any option.
- No codec/DRM/patent review.
- No accessibility review.
- No update-signing or rollback implementation.
- No team-size or budget input; effort ranges are assumptions.
- Native SDK's CEF sandbox finding may be remediable, but remediation effort is unknown.
- Public product repository / private workspace asymmetry affects what evidence can be linked publicly.

## Recommendation

1. **Do not select a final engine from this audit.**
2. Run the spike in ADR-0001: system WebView vs CEF vs Electron control, macOS first, same site/test set.
3. Treat system WebView + engine boundary as the working hypothesis for the MVP.
4. Exclude Lightpanda from the visible-browser path; keep it as an automation research reference only.
5. Require a sandbox/process-model review before any CEF adoption.
6. Decide the product license before accepting contributions.
7. Re-audit licenses and upstream revisions before distribution.

## Limitations

- Documentation/source-manifest audit only; no build, execution, or benchmark.
- Selected source inspection is not a full code review.
- License findings are not legal advice and do not cover all transitive dependencies, binaries, codecs, or patents.
- GitHub metadata is point-in-time and may lag upstream.
- Effort ranges are planning estimates, not measured productivity.
- The audit was AI-assisted; human review is required before decisions.

## Next actions

- [ ] File/confirm the engine/shell spike issue and assign an owner.
- [ ] Define the 20-site MVP test list.
- [ ] Build the system-WebView spike.
- [ ] Build the CEF spike with a sandbox plan.
- [ ] Build the Electron control prototype.
- [ ] Record measured results and update ADR-0001.
- [ ] Complete a legal/license review for the chosen path.
- [ ] Publish a public, non-sensitive summary if the product repository remains public.

## References

Primary sources are linked in the [reference register](../../REFERENCE-REGISTER.md). Metadata snapshot: [`upstream-metadata-2026-10-25.json`](upstream-metadata-2026-10-25.json). Collection tool: [`tooling/reference-audit/collect.sh`](../../tooling/reference-audit/collect.sh).
