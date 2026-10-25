# ADR-0001: Browser Engine and Shell Strategy

- Status: **Proposed** (not accepted)
- Date: 2026-10-25
- Owners/reviewers: Unassigned; product and security review required
- Related issues: engine/shell spike; MVP definition; security and license baseline
- Supersedes / superseded by: None

## Context

The initiative needs a credible desktop browser, but no engine or shell has been selected. The choice determines:

- How quickly a visible browser can be built.
- Which web-platform behavior can be guaranteed.
- The process-isolation and sandbox model.
- The update cadence and vulnerability response burden.
- Bundle size, platform coverage, and distribution constraints.
- Licensing and third-party notice obligations.
- How reversible the choice is if the product evolves.

The reference audit found that every option is a bundle of trade-offs, not a free shortcut:

- System WebViews are small and platform-native but versioned by the OS.
- CEF provides Chromium behavior but adds a large binary, a Chromium update cadence, and a sandbox/process-model integration burden.
- Electron is fast to prototype but bundles Node.js and Chromium and is not a browser architecture by itself.
- Chromium/Gecko forks provide the most control but require a sustained browser-engineering organization.
- Servo and Ladybird are promising independent engines but are not ready to serve as the MVP engine.
- Lightpanda is headless and text-rendering only; it is not a visible-browser engine.

The immediate risk is not choosing the "wrong" engine. It is choosing an engine without measuring the shell, security, update, and licensing work it implies.

## Decision drivers

- **Time to a visible, usable browser.** A prototype must render real sites and accept input, not merely launch a window.
- **Compatibility.** The MVP needs a defined site/test set, not universal parity.
- **Security.** Untrusted web content requires a credible process isolation and sandbox story.
- **Updateability.** Security fixes must ship faster than the threat landscape; the update path must be testable.
- **Platform coverage.** macOS, Windows, and Linux are not equivalent for any option.
- **Licensing.** AGPL, MPL, LGPL, Chromium third-party terms, codecs, and notices must be understood before distribution.
- **Team and maintenance cost.** A fork is an organization-level commitment, not a sprint.
- **Reversibility.** The shell should keep engine-facing boundaries documented so a later change is possible.
- **Product differentiation.** Privacy, AI, and UX features must not depend on unsupported engine hooks.

## Options considered

### Option A — System WebView shell (Tauri/Wry or Native SDK)

Use WKWebView on macOS, WebView2 on Windows, and WebKitGTK on Linux, hosted by a native shell.

**Benefits**

- Smallest bundle and fastest path to visible content.
- Platform-native rendering, input, accessibility, and power behavior.
- Tauri/Wry provide mature windowing, IPC, packaging, and permission patterns.
- No Chromium build or binary redistribution.
- Lowest initial licensing complexity (platform WebView terms still apply).

**Costs and risks**

- Engine version and patch level follow the OS; behavior differs by platform and OS version.
- Limited control over rendering, process model, and engine-specific features.
- WebView2 runtime dependency on older Windows; WebKitGTK packaging differs by distribution.
- A browser shell (tabs, profiles, downloads, permissions, updates) still has to be built.
- Native SDK's CEF path is not relevant here; its system-WebView path is a separate host.

**Evidence status:** Documentation-level comparison; no runtime benchmark.

### Option B — CEF embedded in a native shell

Ship a pinned Chromium runtime via CEF and build the browser chrome natively.

**Benefits**

- Consistent Chromium behavior across platforms when the same CEF build ships.
- Full web-platform compatibility and DevTools/protocol ecosystem.
- Control over the pinned engine version and update cadence.
- CEF provides a stable embedding API and binary distributions.

**Costs and risks**

- Large bundle and memory footprint.
- Chromium security cadence becomes the product's cadence; delayed updates are a material risk.
- Sandbox, helper processes, signing, entitlements, crash handling, and IPC must be integrated correctly.
- Native SDK's macOS CEF host disables the sandbox (`no_sandbox = true`), so it is not a safe default for untrusted content.
- CEF is macOS-only in Native SDK; Linux/Windows hosts are not wired.
- Native SDK's updater does not support CEF/Windows/Linux.
- Chromium third-party notices, codecs, and patent terms require review.

**Evidence status:** Source/docs inspection; sandbox finding verified in Native SDK source; no runtime test.

### Option C — Electron control prototype

Use Electron to assemble a Chromium window quickly and test product flows.

**Benefits**

- Fastest path to a working Chromium-backed window.
- Mature packaging, crash reporting, and update tooling.
- Useful as a control for comparing UX and performance assumptions.

**Costs and risks**

- Bundles Chromium and Node.js; the security surface is larger than a browser-only shell.
- Not a browser architecture; tabs, profiles, permissions, and chrome must be built.
- Electron's release cadence and breaking changes add maintenance.
- Easy to accidentally treat a prototype as the product architecture.

**Evidence status:** Documentation-level; no prototype built.

### Option D — Chromium fork (Brave-style)

Fork Chromium and own the browser product layer.

**Benefits**

- Maximum control over rendering, process model, networking, and product integration.
- Proven path for privacy/differentiation features.
- Can track upstream security fixes with a dedicated team.

**Costs and risks**

- Enormous build and infrastructure burden.
- Requires sustained browser engineers, release engineering, security response, and merge capacity.
- Chromium's third-party and codec obligations still apply; Brave core is MPL-2.0.
- Not compatible with a small team's MVP timeline.

**Evidence status:** Architecture/product reference only; no build attempted.

### Option E — Independent engine embedding (Servo, Ladybird, WebKit, Gecko)

Embed or fork an independent engine and build the browser around it.

**Benefits**

- Potential long-term independence from Chromium.
- Differentiated architecture and licensing posture.
- Servo offers a Rust, parallel engine with an embedding path under development.
- Ladybird offers a from-scratch, multi-process engine.

**Costs and risks**

- Servo's own documentation says embedding as a WebView library is still in progress; recommended paths are servoshell, `tauri-runtime-verso`, or `servo-gtk`.
- Ladybird is pre-alpha and developer-only; macOS/Linux alpha is still upcoming.
- WebKit has per-file BSD/LGPL obligations and platform-specific embedding complexity.
- Gecko is a full browser platform; forking it is not an MVP path.
- Compatibility and site coverage are unproven for the MVP set.

**Evidence status:** Upstream documentation/source inspection; no build or compatibility run.

### Option F — Lightpanda as the visible engine

**Rejected for this role.** Lightpanda is headless, has no layout engine, and its PNG/PDF output is a text-only rasterization. It is AGPL-3.0-or-later. It may be useful for automation research, but it cannot render a general-purpose browser UI.

**Evidence status:** Verified from README and renderer source.

### Option G — System WebView MVP with an engine-facing boundary

Ship the MVP on a system WebView, keep engine-facing interfaces documented, and revisit bundled Chromium or an independent engine when measured needs justify it.

**Benefits**

- Fastest credible MVP with the smallest security/update surface.
- Preserves the option to move to CEF or another engine later.
- Forces the team to define browser-owned behavior (tabs, profiles, permissions, updates) independently of the engine.

**Costs and risks**

- Platform inconsistency is a product-quality issue from day one.
- Some sites/features may be unavailable on older OS WebViews.
- A later engine switch is still expensive; the boundary must be real, not aspirational.

**Evidence status:** Inferred from platform documentation; needs a spike.

## Decision

**Proposed:** Do not select a final engine now. Adopt a two-stage process:

1. **Run a time-boxed spike** comparing Option A (system WebView), Option B (CEF), and Option C (Electron control) on macOS first. Use the same shell features and site/test set. Measure startup, memory, navigation, input, packaging, sandbox/process behavior, update feasibility, and license inventory.
2. **Choose the MVP approach** after the spike, record the result in this ADR (or a successor), and only then open product implementation issues.

The working hypothesis is **Option G**: a system-WebView MVP with a documented engine boundary, unless the spike shows that a specific MVP requirement cannot be met. This is a hypothesis, not an accepted architecture.

The spike must not use Native SDK's CEF host as evidence of a secure CEF integration, because it disables the sandbox. If CEF is tested through that host, the result is valid only for prototype ergonomics, not for the security decision.

## Consequences

### Positive

- Avoids committing the product to a multi-year engine fork before measuring the alternatives.
- Produces comparable evidence for the security, update, and licensing decisions.
- Keeps the first implementation small enough to learn from real sites.

### Negative

- Delays a final architecture decision by the spike duration.
- Requires discipline to keep the shell engine-agnostic.
- A system-WebView MVP may expose platform inconsistencies that a bundled engine would hide.

### Operational

- The spike needs a macOS build environment, signing identity (or an explicit no-signing prototype), and a repeatable test script.
- CEF testing needs a pinned binary, notice inventory, and a sandbox plan.
- Results must be stored with environment and revision metadata.

### Security/privacy

- A system WebView inherits the OS engine's patch level; the product cannot ship an out-of-band engine fix.
- A CEF browser must own Chromium updates and sandbox integration; a delayed update is a product vulnerability.
- Electron's Node.js surface must be locked down if used beyond a control prototype.

### Compatibility

- The MVP site/test set, not a generic benchmark, decides whether the chosen engine is sufficient.
- Platform-specific behavior must be recorded as known limitations, not averaged away.

### Migration/reversibility

- Replacing a system WebView with CEF or an independent engine is a major project, not a configuration change.
- The engine boundary should isolate navigation, permissions, storage, downloads, and DevTools/protocol access where practical.
- Do not promise engine replaceability without an interface and a migration test.

## Validation plan

**Spike duration:** 4–6 calendar weeks with 1–2 engineers, assuming macOS-first scope and access to a signing identity or an accepted unsigned-prototype path.

**Minimum evidence:**

- Window launch and navigation to a fixed 20-site list, with failures recorded.
- Input, scrolling, links, forms, tabs/windows, and basic error pages.
- Startup time, idle memory, and memory with 5–10 tabs; median and spread over repeated runs.
- Process model and sandbox observations (process list, entitlements, renderer behavior).
- Packaging: app bundle, framework/resource layout, signing/notarization feasibility.
- Update path: can a signed update be produced and verified? What is missing?
- License/notice inventory for everything shipped.
- Developer experience: build time, debugger, crash logs, CI feasibility.

**Exit criteria:**

- A written comparison against the same criteria for A, B, and C.
- A recommendation with confidence and unresolved risks.
- This ADR updated to Accepted, Revised, or Rejected.
- Product issues created for the chosen path; spike code either discarded or explicitly retained as a tool.

**Estimated effort:**

| Work | Range | Confidence | Assumptions |
|---|---|---|---|
| System WebView spike (macOS) | 2–4 engineer-weeks | Medium | Tauri/Wry or Native SDK host; 20-site list; no profile/downloads |
| CEF spike (macOS) | 3–6 engineer-weeks | Low–medium | Pinned CEF binary; sandbox experiment; signing path available |
| Electron control spike | 1–2 engineer-weeks | Medium | No product hardening; comparison only |
| Cross-platform hardening (post-decision) | 8–16 engineer-weeks | Low | macOS + Windows + Linux; signing, updates, crash recovery |
| Chromium fork first branded build | 6–12 engineer-months | Low | Experienced browser team; infrastructure budget; not an MVP path |
| Servo embedding demo | 6–12 engineer-weeks | Low | Upstream APIs stabilize; limited site set; not product quality |
| Ladybird product embedding | Not estimated | Unknown | Pre-alpha; no stable embedding contract |

These are planning ranges, not measured results or commitments.

## Revisit triggers

Reconsider this decision if:

- The MVP requires a site/feature that system WebViews cannot support.
- The product must guarantee a specific engine version or patch level.
- The security model requires bundled-engine isolation that the OS WebView cannot provide.
- CEF sandbox integration becomes practical in the chosen shell, with runtime evidence.
- Servo or Ladybird reaches a stable embedding contract and acceptable compatibility.
- The product license changes in a way that makes a copyleft engine viable or excludes it.
- Target platforms, team size, or release timeline change materially.
- A major Chromium/WebKit/Gecko security event changes the update-risk calculus.

## References

- [Reference register](../REFERENCE-REGISTER.md)
- [Initial reference audit](../research/references/2026-10-25-initial-audit.md)
- [Architecture feasibility report](../reports/2026-10-25-architecture-feasibility.md)
- [Security and licenses](../SECURITY-AND-LICENSES.md)
- Native SDK web engines: https://github.com/vercel-labs/native/blob/main/docs/content/docs/web-engines.mdx
- Native SDK platform support: https://github.com/vercel-labs/native/blob/main/docs/content/docs/platform-support.mdx
- Native SDK CEF sandbox setting: `src/platform/macos/cef_host.mm` at `v0.11.0`
- CEF: https://chromiumembedded.github.io/cef/
- Tauri: https://v2.tauri.app/
- Wry: https://github.com/tauri-apps/wry
- Electron security: https://www.electronjs.org/docs/latest/tutorial/security
- Servo Book: https://book.servo.org/
- Ladybird: https://ladybird.org/
- WebKit: https://webkit.org/
- Lightpanda renderer: `src/rust/render/lib.rs` at `1.0.2`
