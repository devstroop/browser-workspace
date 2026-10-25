# Reference Register

- Status: Initial candidate list; audit required
- Last reviewed: 2026-10-25

This register is a research index, not an endorsement or a claim that a project is suitable for direct reuse. Verify current repositories, maintainers, licenses, supported platforms, activity, dependencies, and capabilities before relying on any entry.

| Reference | Candidate use | Initial questions |
|---|---|---|
| [Lightpanda](https://github.com/lightpanda-io/browser) | Headless browsing, automation, JS/DOM and performance research | Which visual rendering capabilities exist? Which APIs and components are reusable? What are current feature gaps? |
| Vercel Zig native GUI | Native browser shell and presentation | What is the exact public repository/project? License? Platform and GPU support? Stability? |
| [Tauri](https://github.com/tauri-apps/tauri) | Native app integration, lifecycle, packaging, permissions, updater | Which patterns apply if the product is not a conventional WebView app? |
| [Wry](https://github.com/tauri-apps/wry) | Platform WebView integration | What are platform differences and constraints? What does this imply for an MVP? |
| [Chromium](https://github.com/chromium/chromium) | Compatibility, process model, sandbox, GPU, networking, DevTools | Which components can be embedded? Build and update burden? License/dependency inventory? |
| [Brave](https://github.com/brave/brave-browser) | Product differentiation, privacy features, Chromium integration | Which features are upstream vs Brave-specific? Which licenses and services apply? |
| [Firefox source](https://github.com/mozilla-firefox/firefox) | Independent engine, Gecko/SpiderMonkey, privacy and tooling | Repository accuracy, source layout, implementation and build complexity? |
| [WebKit](https://github.com/WebKit/WebKit) | Layout/rendering, JavaScriptCore, Safari engine reference | Platform constraints, licensing, integration effort, required dependencies? |
| [Servo](https://github.com/servo/servo) | Modular engine, embedding, parallelism | Current compatibility, supported features, embedder APIs, maturity? |
| [Ladybird](https://github.com/LadybirdBrowser/ladybird) | Independent browser-engine architecture | Current engine coverage, dependencies, project direction, reuse terms? |
| [Web Platform Tests](https://github.com/web-platform-tests/wpt) | Standards compatibility testing | How to select and run a relevant subset? |
| [Playwright](https://github.com/microsoft/playwright) | Browser automation and test design | Can it drive our chosen engine? What adapter or protocol is needed? |
| [Puppeteer](https://github.com/puppeteer/puppeteer) | DevTools Protocol and automation | Which protocols are useful for our debugging and test needs? |
| [CEF](https://github.com/chromiumembedded/cef) | Chromium embedding | Packaging, platform support, update and integration trade-offs? |
| [Electron](https://github.com/electron/electron) | Desktop Chromium integration patterns | Security, packaging, update, and process model lessons? |

## Per-reference audit fields

For each candidate, record:

- Canonical repository URL and exact commit/tag/date inspected.
- License for the repository and significant bundled dependencies.
- Primary language, build system, target platforms, architecture.
- Maintainer/project activity and release cadence.
- Relevant modules and public APIs.
- Verified capabilities, missing capabilities, and unknowns.
- Build and runtime dependency footprint.
- Security model and known limitations.
- Integration/reuse options and estimated effort range.
- Decision: adopt, adapt, monitor, use as reference only, or reject.
- Evidence links, date checked, reviewer, and follow-up issue(s).

Never infer that a dependency is permissively licensed just because the main repository is open source. Record license conclusions only after reviewing authoritative license files and applicable dependency terms.
