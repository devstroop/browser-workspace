# Architecture Feasibility Assessment

- Report date: 2026-10-25
- Status: Feasibility assessment complete; architecture **undecided**
- Scope: Desktop browser shell and engine strategy for an MVP on macOS, with Windows/Linux as later targets
- Related decision: [ADR-0001](../decisions/ADR-0001-browser-engine-and-shell-strategy.md) (Proposed)
- Evidence: [Initial audit](../research/references/2026-10-25-initial-audit.md), [reference register](../REFERENCE-REGISTER.md), source/docs inspection
- Related issues: See [planning/ISSUE-MAP.md](../planning/ISSUE-MAP.md)

## Scope

Included: desktop shell and engine strategy for a macOS-first MVP, compared against Windows/Linux as later targets; documentation/source evidence for the audited references.

Excluded: a final engine decision, product implementation, runtime benchmarks, upstream builds, legal review, and cross-platform implementation.

## Executive summary

The team can reach a visible macOS browser fastest with a system WebView or Electron. The strategic question is not speed alone:

- A **system WebView** shell is the smallest, most native, and most reversible MVP. It inherits OS engine behavior and patch levels.
- A **CEF** shell gives Chromium consistency and control but adds a large binary, a browser-scale update cadence, and a sandbox/process integration burden.
- **Electron** is the fastest control prototype but is not a browser architecture and carries a larger runtime/security surface.
- A **Chromium fork** is the only path to full engine control, but it is an organization-level commitment, not an MVP plan.
- **Servo/Ladybird** are not ready for product dependency; **WebKit/Gecko** are platform/full-browser references, not simple embeds.
- **Lightpanda** cannot render a general-purpose browser.

**Recommendation:** Spike system WebView, CEF, and Electron on macOS with the same shell features and site set. Use system WebView + a documented engine boundary as the working hypothesis. Record the outcome in ADR-0001 before implementation.

## Decision criteria

| Criterion | Why it matters | Weight for MVP |
|---|---|---|
| Time to visible browser | Validate demand and UX with real sites | High |
| Compatibility | The MVP site set must work | High |
| Security isolation | Untrusted content is the core threat | High |
| Updateability | Browser security depends on fast patches | High |
| Platform coverage | macOS first; Windows/Linux later | Medium (macOS first) |
| Engine control | Differentiation and predictable behavior | Medium |
| Bundle size | Distribution and memory expectations | Medium |
| Licensing | Redistribution and contribution model | High (gate) |
| Maintenance burden | Team size and long-term cost | High |
| Reversibility | Avoid a dead-end architecture | Medium |

## Options

### A. System WebView shell

**Shape:** Native window + WKWebView (macOS), WebView2 (Windows), WebKitGTK (Linux), hosted via Tauri/Wry or a native toolkit.

**Strengths**

- Smallest bundle; no Chromium build or redistribution.
- Native input, accessibility, power, and platform integration.
- Fastest path to a visible, usable browser.
- Mature shell frameworks (Tauri/Wry) for windowing, IPC, packaging, and permissions.
- Lowest initial licensing/notice burden, subject to platform WebView terms.

**Weaknesses**

- Engine version and patch level follow the OS.
- Rendering and feature behavior differ across platforms and OS versions.
- Limited engine-level control and DevTools/protocol access.
- WebView2 runtime dependency on older Windows; WebKitGTK distribution differences.
- Browser chrome, profiles, downloads, permissions, and updates still need to be built.

**MVP fit:** Strong, if the target site set works on current macOS WebKit.

**Effort:** 2–4 engineer-weeks for a macOS shell spike; 8–16 engineer-weeks for cross-platform hardening after a decision. Confidence: medium.

### B. CEF shell

**Shape:** Native shell + pinned CEF/Chromium runtime.

**Strengths**

- Chromium compatibility and consistent behavior when the same build ships.
- Control over the pinned engine version and update cadence.
- Mature embedding API, binary distributions, and protocol ecosystem.
- Path to differentiated Chromium-level features.

**Weaknesses**

- Large bundle and memory footprint.
- Product owns Chromium security updates; delay is a vulnerability.
- Sandbox, helper processes, signing, entitlements, crash handling, and IPC are non-trivial.
- Native SDK's macOS CEF host disables the sandbox; it is not a secure baseline.
- Native SDK supports CEF only on macOS; Linux/Windows hosts are not wired.
- Native SDK's updater does not cover CEF/Windows/Linux.
- Chromium third-party notices, codecs, and patent terms require review.

**MVP fit:** Medium. Viable if the team can own Chromium updates and sandbox integration; otherwise a liability.

**Effort:** 3–6 engineer-weeks for a macOS spike; 12–24 engineer-weeks for a hardened cross-platform baseline. Confidence: low–medium.

### C. Electron control

**Shape:** Electron main/renderer processes with Chromium and Node.js.

**Strengths**

- Fastest path to a Chromium-backed window.
- Mature packaging, crash reporting, and update tooling.
- Useful control for UX/performance assumptions.

**Weaknesses**

- Bundles Chromium and Node.js; larger attack surface.
- Not a browser architecture; tabs, profiles, permissions, and chrome are custom.
- Electron release cadence and breaking changes.
- Risk of prototype lock-in.

**MVP fit:** Good as a control, weak as the target.

**Effort:** 1–2 engineer-weeks for a prototype. Confidence: medium.

### D. Chromium fork

**Shape:** Chromium source + product layer (Brave-style).

**Strengths**

- Maximum control over engine, process model, networking, and UX.
- Proven differentiation path.
- Can track upstream security fixes with a dedicated team.

**Weaknesses**

- Build infrastructure, merge capacity, release engineering, and security response are full-time functions.
- Chromium third-party/codec/trademark obligations remain.
- Brave core is MPL-2.0; file-level obligations apply.
- Not compatible with a small-team MVP timeline.

**MVP fit:** Poor.

**Effort:** 6–12 engineer-months to a first branded build; ongoing multi-FTE maintenance. Confidence: low; based on public browser-team scale, not a measured estimate.

### E. Independent engine (Servo, Ladybird, WebKit, Gecko)

**Servo:** MPL-2.0; Rust; platforms include macOS/Linux/Windows. Servo Book: embedding as a WebView library is still in progress; recommended paths are `servoshell`, `tauri-runtime-verso`, or `servo-gtk`.

**Ladybird:** BSD-2; pre-alpha; multi-process architecture; first macOS/Linux alpha still upcoming as of the audit. Not a product dependency.

**WebKit:** No top-level license; BSD-2/LGPL-2.1 per file; best used through OS WKWebView/WebKitGTK, not direct embedding for this MVP.

**Gecko:** MPL-2.0; full browser platform; not an embedding shortcut.

**MVP fit:** Poor to unknown.

**Effort:** Servo demo 6–12 engineer-weeks; product quality 6+ months and uncertain. Ladybird not estimated. Confidence: low.

### F. Lightpanda

Headless, no layout engine, text-only PNG/PDF, AGPL-3.0-or-later. Rejected for the visible-browser role. Possible automation research only.

## Comparison

| Criterion | System WebView | CEF | Electron | Chromium fork | Servo/Ladybird |
|---|---|---|---|---|---|
| Time to visible browser | Fast | Medium | Fastest | Very slow | Slow/unknown |
| Chromium consistency | No | Yes (same build) | Yes | Yes | No |
| Engine control | Low | High | Medium | Full | Upstream-dependent |
| Security/update burden | OS/vendor | Product-owned | Electron/Chromium | Very high | Upstream + product |
| Bundle size | Small | Large | Large | Large | Medium |
| macOS-first MVP | Strong | Medium | Strong | Weak | Weak |
| Windows/Linux | Good (system) | Native SDK: macOS only | Good | Good | Varies |
| Licensing complexity | Low–medium | Medium–high | Medium | High | Medium–high |
| Reversibility | Medium | Medium | Low | Very low | Low |
| Team fit (small) | Strong | Weak–medium | Medium (prototype) | Very weak | Very weak |

## Recommendation

1. **Run the spike before choosing.** Compare A, B, and C on macOS with:
   - The same 20-site list.
   - The same shell features: window, address bar, back/forward, tabs/windows, input, error page.
   - Startup, idle memory, 5–10 tab memory, navigation latency, crash behavior.
   - Process/sandbox observations and packaging/signing feasibility.
   - License/notice inventory.
2. **Use system WebView + engine boundary as the working hypothesis.** It is the most credible small-team MVP path unless the site set proves otherwise.
3. **Do not adopt Native SDK's CEF host for security evidence.** It disables the sandbox. Use official CEF or a sandbox-capable host for the CEF spike.
4. **Defer Chromium fork and independent-engine work.** Revisit only with measured need, team capacity, and a licensing decision.
5. **Record the outcome in ADR-0001.** Accepted, revised, or rejected; no silent drift.

## What would change the recommendation

- A must-have site or feature fails on system WebViews.
- The product requires a guaranteed engine patch level or bundled-engine isolation.
- CEF sandbox integration becomes practical and update automation is proven.
- The team grows enough to sustain a Chromium fork.
- Servo/Ladybird reaches a stable embedding contract and acceptable compatibility.
- Licensing changes make a copyleft engine viable or exclude a permissive one.
- Target platforms or distribution channels impose engine constraints.

## Effort summary

| Work | Range | Confidence | Assumptions |
|---|---|---|---|
| Workspace baseline | 1–2 engineer-days | High | Documentation/CI only; no product code |
| Reference audit | 2–3 engineer-days | Medium | Public sources; no builds |
| System WebView spike | 2–4 engineer-weeks | Medium | macOS; 20 sites; no profile/downloads |
| CEF spike | 3–6 engineer-weeks | Low–medium | Pinned binary; sandbox experiment; signing path |
| Electron control | 1–2 engineer-weeks | Medium | Prototype only |
| Cross-platform hardening | 8–16 engineer-weeks | Low | macOS+Windows+Linux; signing/updates |
| Chromium fork first build | 6–12 engineer-months | Low | Experienced team; infrastructure |
| Servo embedding demo | 6–12 engineer-weeks | Low | Upstream APIs; limited sites |

Ranges are planning inputs, not commitments. They exclude legal review, design, product management, and ongoing security response.

## Limitations

- No prototype was built; performance and compatibility claims are unmeasured.
- Platform behavior may differ from documentation.
- Sandbox behavior was not runtime-tested.
- License/codec/patent review is incomplete.
- Team size, budget, and target date are unknown.
- The product repository is public while the workspace is private; some evidence cannot be linked publicly.

## Linked issues

- MVP definition — [BR-01 #1](https://github.com/devstroop/browser/issues/1)
- Engine/shell spike — [BR-02 #2](https://github.com/devstroop/browser/issues/2)
- Security/license baseline — [BR-03 #3](https://github.com/devstroop/browser/issues/3)
- Product governance — [BR-04 #4](https://github.com/devstroop/browser/issues/4)
- Visible prototype and test harness — [BR-05 #5](https://github.com/devstroop/browser/issues/5)

See also the [issue map](../planning/ISSUE-MAP.md).
