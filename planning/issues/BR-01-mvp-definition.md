## Context

The product has no written MVP definition. Without target platforms, a fixed site/test set, and measurable acceptance criteria, every engine and shell looks equally plausible. The initial reference audit and feasibility assessment deliberately stopped short of choosing an architecture for this reason.

This issue defines the product target; it does not implement it.

## Desired outcome

A reviewed MVP definition that lets engineering compare engine/shell options against the same requirements and lets a reviewer decide whether a prototype is sufficient.

## Scope

In scope:

- Target platforms and minimum OS versions for the first release. Recommendation: macOS first unless a written requirement says otherwise.
- Primary user journeys: launch, navigate, back/forward, tabs/windows, input, forms, downloads, settings, error handling.
- A fixed representative site/test list (target: 20 sites) covering static content, JavaScript-heavy apps, media, authentication, and accessibility.
- Explicit non-goals for the first MVP.
- Measurable acceptance thresholds: site pass rate, startup time, memory, crash-free sessions, accessibility target, security baseline.
- Supported media/codecs/DRM posture (including "not supported in MVP").
- Telemetry, crash reporting, and remote-processing posture.
- Distribution channels and update expectations.

Out of scope:

- Final engine/shell selection.
- Detailed implementation design.
- Extension ecosystem parity.
- Universal site compatibility.
- A full threat model (tracked separately).

## Acceptance criteria

- [ ] Target platforms and minimum OS versions are listed.
- [ ] The 20-site list is written down with stable URLs and the behavior being tested.
- [ ] MVP user journeys and explicit non-goals are listed.
- [ ] Acceptance thresholds are measurable and have an owner/method.
- [ ] Security, privacy, accessibility, codec/DRM, and update expectations are stated or explicitly deferred.
- [ ] The definition is reviewed by product and engineering.
- [ ] The engine/shell spike can use the same site list and thresholds without modification.

## Estimate and confidence

- Estimate: 3–5 engineer-days, including site-list curation and review.
- Confidence: Medium.
- Assumptions: product owner available; no new user research required for the first draft.

## Dependencies and blockers

- Product direction and target-market decision.
- License/distribution intent may affect codec and store requirements.
- Accessibility target decision.

## Evidence

- Product vision and roadmap in the private workspace.
- Public upstream platform constraints: WKWebView, WebView2, WebKitGTK, CEF, Electron.
- Initial reference audit (2026-10-25).

## Definition of done

The MVP definition is merged in the product repository, linked from the roadmap, and accepted by the engine/shell spike as its test basis.
