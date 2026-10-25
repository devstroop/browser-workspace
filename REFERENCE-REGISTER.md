# Reference Register

- Status: Audited point-in-time register; not a legal opinion
- Audit date: 2026-10-25
- Snapshot: [`research/references/upstream-metadata-2026-10-25.json`](research/references/upstream-metadata-2026-10-25.json)
- Detailed audit: [`research/references/2026-10-25-initial-audit.md`](research/references/2026-10-25-initial-audit.md)
- Reproducer: [`tooling/reference-audit/collect.sh`](tooling/reference-audit/collect.sh)

This register is a research index, not an endorsement or a claim that a project is suitable for direct reuse. Each entry was inspected at the exact revision shown, primarily through repository documentation, manifests, license files, and selected source. **No upstream project was built, executed, or benchmarked for this audit.** Licenses of bundled dependencies, codecs, and platform SDKs require separate review.

## Audited references

| Project | Canonical repository and pinned revision | Release inspected | Reported license | Assessed use | Disposition |
|---|---|---|---|---|---|
| Lightpanda | [`lightpanda-io/browser`](https://github.com/lightpanda-io/browser/tree/f9cfcba603427a3d4d4bb29964222f271aacbcd6) `f9cfcba60342` | `1.0.2` | AGPL-3.0 (source headers say version 3 **or later**) | Headless automation, DOM/JS research | **Reference only.** Not a visible-browser engine; AGPL obligations incompatible with a proprietary product without legal review. |
| Native SDK | [`vercel-labs/native`](https://github.com/vercel-labs/native/tree/ff108d0a86468deafbf93f4184355984f8e088c0) `ff108d0a8646` | `v0.11.0` (`16f2957`) | Apache-2.0 | Native shell prototype; optional system WebView or macOS CEF | **Monitor / prototype candidate.** macOS-only CEF; CEF host disables the Chromium sandbox; no updater for CEF. Do not adopt as-is. |
| Tauri | [`tauri-apps/tauri`](https://github.com/tauri-apps/tauri/tree/1fc6d9c85c7d9c79f44afc408853e4b5d3ac1e42) `1fc6d9c85c7d` | `tauri-v2.12.5`; CLI `v2.12.4` | Apache-2.0 | Desktop framework around system WebViews | **Prototype candidate** for a system-WebView shell; not a browser and not an engine decision. |
| Wry | [`tauri-apps/wry`](https://github.com/tauri-apps/wry/tree/713aee46beffba6c49577380cd7cdc52b474f336) `713aee46beff` | `wry-v0.57.1` | Apache-2.0 OR MIT | Cross-platform system WebView embedding | **Component candidate** for a system-WebView spike. Platform behavior differs by OS. |
| Chromium | [`chromium/chromium`](https://github.com/chromium/chromium/tree/3f5a9191384c982c4baea0a3c78cdb2874a34bb8) `3f5a9191384c` | No GitHub release; source revision | BSD-3-Clause plus third-party notices | Full browser platform, process model, sandbox, GPU, networking | **Reference / long-term fork option.** Not an MVP dependency; build and maintenance burden is extreme. |
| Brave browser | [`brave/brave-browser`](https://github.com/brave/brave-browser/tree/f91a6cfb3041c8fa0c1dff417dbbfb36bd4f7363) `f91a6cfb3041` | `v1.98.60` stable; `v1.100.31` latest prerelease | MPL-2.0 | Product, release, and issue-structure reference | **Reference only.** This repository is not the product source. |
| Brave core | [`brave/brave-core`](https://github.com/brave/brave-core/tree/1e6f00267d382150bac8f87266a163d36e609eb8) `1e6f00267d38` | No GitHub release | MPL-2.0; Chromium components also apply | Chromium-based product integration patterns | **Reference only.** File-level MPL obligations and Chromium third-party terms apply. |
| Servo | [`servo/servo`](https://github.com/servo/servo/tree/3043596ce5d69a4d7d43c70bcb534479d892bbd7) `3043596ce5d6` | `v0.7.0` | MPL-2.0 | Independent embeddable engine research | **Monitor.** Upstream says work to make Servo consumable as a WebView library is still ongoing. |
| Ladybird | [`LadybirdBrowser/ladybird`](https://github.com/LadybirdBrowser/ladybird/tree/b7b781e8de0460166e6eb0c00d7dc380f4ff0278) `b7b781e8de04` | No GitHub release; pre-alpha | BSD-2-Clause | Independent engine architecture research | **Monitor.** Pre-alpha, developer-only; macOS/Linux alpha still upcoming. Not an MVP option. |
| WebKit | [`WebKit/WebKit`](https://github.com/WebKit/WebKit/tree/291e79a4ca63bb9eea0073dd937e123b7c1c099b) `291e79a4ca63` | No GitHub release | No top-level license; BSD-2-Clause and LGPL-2.1 per file | Safari engine, JavaScriptCore, system WebView reference | **Reference / OS-provided system engine.** Direct embedding is not an MVP path; per-file licensing requires review. |
| Firefox | [`mozilla-firefox/firefox`](https://github.com/mozilla-firefox/firefox/tree/efd2d1e6f77570ae6bc5294731a68101e45c81a3) `efd2d1e6f775` | No GitHub release | MPL-2.0; root notice defers to generated license inventory | Gecko/SpiderMonkey and full browser reference | **Reference only.** A Gecko fork is not viable for the MVP. |
| Web Platform Tests | [`web-platform-tests/wpt`](https://github.com/web-platform-tests/wpt/tree/68d964a5f292bc4b2c2eba2f21e2b916190b6ad2) `68d964a5f292` | No semantic release; tag `merge_pr_64156` | BSD-3-Clause | Cross-browser conformance testing | **Adopt** for a selected test subset; full-suite execution is not an MVP gate. |
| Playwright | [`microsoft/playwright`](https://github.com/microsoft/playwright/tree/91a765d1681cb3eeb0d0fb89fefec3cf0d21bd9b) `91a765d1681c` | `v1.64.1` | Apache-2.0 | End-to-end and compatibility automation | **Adopt/prototype** where the chosen engine exposes a supported protocol. Not a browser engine. |
| Puppeteer | [`puppeteer/puppeteer`](https://github.com/puppeteer/puppeteer/tree/08e7b1aebe60462b6f7834e9dfe0f6c70464247c) `08e7b1aebe60` | `puppeteer-v25.16.0`; `browsers-v3.2.6` | Apache-2.0 | CDP/WebDriver BiDi automation | **Adopt** for CDP/BiDi-driven tests where supported; protocol coverage varies by engine. |
| CEF | [`chromiumembedded/cef`](https://github.com/chromiumembedded/cef/tree/e537569ecda2e3f23ffdac559ecf7f80b8e59467) `e537569ecda2` | No GitHub release; external binary distributions | BSD-3-Clause for CEF; Chromium and third-party terms apply | Embedding Chromium in a native shell | **Prototype candidate** with mandatory sandbox, process-model, update, and licensing review. |
| Electron | [`electron/electron`](https://github.com/electron/electron/tree/96a2dc1f28a4e4a32fdc19d54ba0af36c7f2c536) `96a2dc1f28a4` | `v45.0.0`; `v46.0.0-alpha.1` | MIT; Chromium and Node.js third-party terms apply | Rapid Chromium desktop prototype/control | **Reference/control only.** Bundles Node.js and Chromium; not the target browser architecture. |

## What the dispositions mean

- **Adopt:** acceptable to use for the stated testing/support role, subject to normal review.
- **Prototype candidate:** worth a time-boxed experiment; not a product decision.
- **Component candidate:** a library or pattern that may be used inside a spike.
- **Monitor:** track upstream progress; do not depend on it now.
- **Reference only:** useful for design, security, or product comparison; do not import code.
- **Reject:** not recorded as a disposition for any entry because this audit did not evaluate every possible use. Lightpanda is rejected **for the visible-browser engine role**, not for all automation research.

## Cross-cutting license findings

| Finding | Evidence | Consequence |
|---|---|---|
| Lightpanda is AGPL-3.0-or-later, not a permissive license. | `LICENSE`; source headers such as `src/main.zig` say "either version 3 of the License, or (at your option) any later version." GitHub reports `AGPL-3.0`. | Embedding, linking, or modifying it in a distributed browser triggers AGPL source and license obligations. Network use can also trigger section 13 obligations. Treat as incompatible with a proprietary product unless counsel approves. |
| Servo and Brave core are MPL-2.0. | `servo/servo` `LICENSE`; `brave/brave-core` GitHub license metadata. | MPL is file-level copyleft. Modified MPL files must remain MPL and source must be made available. Larger works can remain under other terms if the MPL files stay separate. |
| WebKit has no single top-level license. | Root contents have no `LICENSE`; `Source/WebCore/LICENSE-APPLE` (BSD-2-Clause) and `Source/WebCore/LICENSE-LGPL-2.1` exist. GitHub reports `NOASSERTION`. | A file-level inventory is required. LGPL obligations can affect relinking and reverse-engineering rights. |
| Firefox's root `LICENSE` is a pointer, not the full inventory. | Root `LICENSE` says to see `toolkit/content/license.html`; GitHub reports `NOASSERTION`. | Do not treat "MPL-2.0" as a complete dependency inventory. |
| CEF is BSD-3-Clause, but it is not a complete Chromium license grant. | `LICENSE.txt`; README states CEF tracks Chromium and inherits Chromium security vulnerabilities. | Chromium's third-party notices, codec/patent terms, and binary distribution obligations still apply. |
| Chromium's BSD-3-Clause root license does not cover all bundled components. | Root `LICENSE` plus third-party notices. | A shipped browser needs a generated notice file and a dependency/license inventory. |
| Native SDK is Apache-2.0, but its optional CEF runtime is separately licensed and configured. | Native SDK `README`/license metadata; `third_party/cef/README.md`; CEF license. | Apache-2.0 does not relicense CEF/Chromium. The CEF runtime must be inventoried and its notices shipped. |
| Wry is dual-licensed Apache-2.0 OR MIT. | `LICENSE-MIT`; GitHub reports Apache-2.0. | Choose and record one compatible option; preserve notices. |
| Electron is MIT, but bundles Chromium and Node.js. | Repository license metadata and Electron distribution model. | MIT covers Electron's own code, not all bundled components. |

## Security and platform notes that affect disposition

- Native SDK's macOS CEF host sets `settings.no_sandbox = true` (`src/platform/macos/cef_host.mm`, v0.11.0). This is a verified source-level configuration, not a runtime test. A browser rendering untrusted web content cannot adopt this host without remediating sandboxing.
- Native SDK supports system WebView on macOS, Linux, and Windows, but bundled CEF only on macOS. Its updater supports only the macOS system host; CEF, Windows, and Linux updates are pending.
- CEF tracks Chromium releases and inherits Chromium CVEs. A shipped CEF browser needs a rapid update cadence and a tested rollback path.
- System WebViews reduce bundle size but move engine version and patch level to the OS. Rendering and web-platform behavior vary by OS version.
- Servo's own book says embedding is still in progress; recommended current paths are `servoshell`, `tauri-runtime-verso`, or `servo-gtk`.
- Ladybird describes itself as pre-alpha and developer-only; its site says the first macOS/Linux alpha is still upcoming.
- Lightpanda's own renderer source says it has no layout engine; screenshots are a text-only rasterization of page text. It is not a candidate for a general-purpose visible browser.

## Per-reference audit fields still required before adoption

For any project that moves from monitor/reference to prototype or adoption, record:

- Exact commit/tag and build environment.
- Complete license and notice inventory, including transitive dependencies and binaries.
- Build system, toolchain versions, and reproducibility.
- Supported platforms and minimum OS versions.
- Process model, sandbox, site isolation, and update mechanism.
- Known vulnerabilities and upstream response history.
- Integration API stability and upgrade cost.
- Measured behavior on the MVP site/test set.
- Decision, owner, date, and linked issue.

## Method and limitations

Metadata was collected with [`tooling/reference-audit/collect.sh`](tooling/reference-audit/collect.sh) on 2026-10-25. Revisions are default-branch heads or the release named in the table. Release endpoints can be misleading: for example, Tauri's "latest" endpoint returned a CLI release while a newer framework release existed, Brave's newest published release was a prerelease, and WPT's newest tag was an automated merge tag. The table records what was inspected, not a claim that it is the newest possible revision.

License conclusions are based on repository license files and selected source headers. They are not legal advice. No upstream code was executed or built. See the [initial audit](research/references/2026-10-25-initial-audit.md) for per-project evidence and limitations.
