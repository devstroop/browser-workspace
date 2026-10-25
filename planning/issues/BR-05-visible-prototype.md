## Context

This epic covers the first visible browser and the test harness needed to judge it. It is intentionally blocked until the MVP definition, engine/shell spike, and governance/license baseline produce decisions.

The initial audit recommends a macOS-first prototype. The engine may be a system WebView, CEF, or another option accepted in the ADR. This issue does not predetermine that choice.

## Desired outcome

A runnable macOS browser prototype that opens a window, navigates the MVP site set, accepts ordinary input, and produces repeatable evidence of pass/fail, startup, memory, and crashes. The prototype is not a release.

## Scope

In scope (after decisions):

- Native window and browser shell.
- Address bar, back/forward, reload, stop, error page.
- Navigation lifecycle and visible web content.
- Tabs or windows for the agreed MVP count.
- Input, scrolling, links, forms, and basic keyboard behavior.
- Minimal diagnostics: console/crash log capture.
- A repeatable local development build.
- A smoke-test suite over the MVP site list.
- A selected Web Platform Tests subset where feasible.
- Automation via Playwright/Puppeteer or a native harness where the engine supports it.
- CI for build + smoke tests on the agreed platform.

Out of scope:

- Profiles, sync, bookmarks, history, downloads, extensions, and settings beyond the MVP definition.
- Release signing/notarization (tracked in governance), except a dry-run feasibility check.
- Windows/Linux until the macOS result is accepted.
- Engine changes that are not justified by measured failures.

## Acceptance criteria

- [ ] The prototype builds from a clean checkout with documented commands.
- [ ] The window launches and navigates the MVP site list.
- [ ] Back/forward, reload, stop, input, scrolling, links, and forms work for the agreed journeys.
- [ ] Tabs/windows work for the agreed concurrency target.
- [ ] Site pass/fail results are recorded with failure reasons and screenshots/logs where useful.
- [ ] Startup, memory, and crash metrics are captured with repetitions and environment metadata.
- [ ] The smoke suite runs in CI on the agreed platform.
- [ ] Known limitations and engine boundaries are documented.
- [ ] No security, compatibility, or performance claim exceeds the evidence.
- [ ] Prototype code is either accepted as product code through review or explicitly discarded.

## Estimate and confidence

- Estimate: 4–8 engineer-weeks after the decisions, assuming one to two engineers and macOS only.
- Confidence: Low–medium; depends on engine choice, signing, and site failures.
- Assumptions: MVP definition and site list exist; build/signing environment available; no profile/downloads scope creep.

## Dependencies and blockers

- Blocked by: MVP definition; engine/shell spike; product governance/license decision; security/license baseline.
- CI platform and signing access.
- A test-site list with stable fixtures.

## Evidence

This issue is self-contained. Internal roadmap and architecture material is maintained in a private workspace; it does not replace the public acceptance criteria above.

- MVP definition issue: #1
- Engine/shell spike issue: #2
- Security/license baseline issue: #3
- Product governance issue: #4
- WPT: https://github.com/web-platform-tests/wpt
- Playwright: https://playwright.dev/
- Puppeteer: https://pptr.dev/

## Definition of done

A reviewer can run the prototype and the smoke suite from documented commands, see the measured results, and decide whether the MVP path is credible. The epic closes only when the evidence is accepted, not when a window first opens.
