## Context

The initial audit compared system WebView, CEF, Electron, Chromium fork, independent engines, and Lightpanda at documentation/source level. That is enough to eliminate some options, but not enough to choose an MVP architecture.

The highest-risk unknowns are runtime and integration behavior:

- Does the MVP site set work on the OS WebView?
- What does a sandboxed CEF integration require?
- How much shell work is common across options?
- What are the real packaging, memory, startup, and update costs?

A verified finding from the audit: Native SDK v0.11.0's macOS CEF host sets `settings.no_sandbox = true`. That host can be used to study ergonomics, but not as evidence of a secure CEF architecture.

## Research question

Which engine/shell approach gives the smallest credible macOS browser for the MVP site set, with an acceptable security, update, licensing, and maintenance burden?

## Scope

Compare three options with the same shell features and the same test set:

- **A. System WebView** (Tauri/Wry or a native host).
- **B. CEF** (official CEF or a sandbox-capable host; not the sandbox-disabled Native SDK host as the security baseline).
- **C. Electron** as a control prototype.

Common shell features:

- Window, address bar, back/forward, reload, stop.
- Tabs or windows for 5–10 concurrent pages.
- Input, scrolling, links, forms, basic error page.
- A fixed 20-site list from the MVP definition.
- Basic diagnostics (console/crash log capture).

Measure and record:

- Startup time (cold/warm), idle memory, 5–10 tab memory, navigation latency.
- Site pass/fail with failure reasons.
- Process model and sandbox observations; entitlements and helper processes.
- Packaging: bundle/framework layout, size, signing/notarization feasibility.
- Update path: signed update, verification, rollback; what is missing.
- License/notice inventory for shipped artifacts.
- Build/debug/CI ergonomics.

Out of scope:

- Product-grade tabs, profiles, downloads, permissions, sync, extensions.
- Windows/Linux implementation. Cross-platform work follows the macOS result.
- Chromium/Gecko fork builds.
- A final architecture decision. The deliverable is evidence and a recommendation.

## Expected deliverable

A spike report in the workspace (or a public, non-sensitive summary in the product repository) containing:

- Environment, exact revisions, and commands.
- Raw measurements and pass/fail results.
- Sandbox/process evidence.
- Packaging/update evidence.
- License/notice findings.
- Comparison against the MVP criteria.
- Recommendation with confidence, limitations, and follow-up issues.
- An updated ADR: Accepted, Revised, or Rejected.

## Acceptance criteria

- [ ] All three options are exercised on the same macOS environment and test list.
- [ ] The 20-site results are recorded with failure reasons.
- [ ] Startup, memory, and navigation measurements include repetitions and spread.
- [ ] Sandbox/process behavior is observed, not inferred from documentation alone.
- [ ] Packaging and signing feasibility are tested or explicitly blocked with evidence.
- [ ] The update path is tested or the missing pieces are documented.
- [ ] License/notice obligations for spike artifacts are listed.
- [ ] The ADR is updated with a decision or an explicit "continue investigating."
- [ ] Spike code is discarded or retained intentionally; it is not silently promoted to product code.

## Estimate and confidence

- Estimate: 4–6 calendar weeks with 1–2 engineers.
- Confidence: Low–medium; CEF sandbox and signing are the largest unknowns.
- Assumptions: macOS-first; 20-site list available; a signing identity or an accepted unsigned-prototype path; CEF binary can be acquired and verified.

## Dependencies and blockers

- MVP definition and site list.
- macOS build environment and signing/notarization access.
- Security review for sandbox experiments.
- License review for CEF/Chromium/Electron artifacts.

## Evidence

This issue is self-contained. Internal comparative analysis is maintained in a private workspace; the public sources below support the spike scope.

- Native SDK: https://github.com/vercel-labs/native
- Native SDK CEF host (v0.11.0): https://github.com/vercel-labs/native/blob/v0.11.0/src/platform/macos/cef_host.mm
- Native SDK web-engine docs: https://github.com/vercel-labs/native/blob/main/docs/content/docs/web-engines.mdx
- CEF: https://chromiumembedded.github.io/cef/
- Tauri: https://v2.tauri.app/
- Wry: https://github.com/tauri-apps/wry
- Electron security: https://www.electronjs.org/docs/latest/tutorial/security
- WKWebView: https://developer.apple.com/documentation/webkit/wkwebview

## Related issues

- MVP definition and site list: #1
- Security/license baseline: #3
- Visible prototype: #5

## Definition of done

A reviewed comparison report and ADR update exist. A product implementation issue can cite measured evidence rather than assumptions.
