# Browser Initiative: Vision and Product Intent

- Status: Working draft
- Audience: Founders, engineering, research, product, security
- Last reviewed: 2026-10-25

## Current baseline

The initiative is at the end of Phase 0, not at an implementation milestone. The product repository exists but contains governance documentation only. No engine or shell has been selected. See [ADR-0001](decisions/ADR-0001-browser-engine-and-shell-strategy.md) (Proposed) and the [architecture feasibility report](reports/2026-10-25-architecture-feasibility.md).

The next decision is not "which engine do we fork?" It is "what is the smallest credible browser we can ship, and which shell/engine combination lets us validate it without taking on an unsustainable maintenance or licensing burden?"

## Vision

Build a sophisticated, mainstream-capable browser platform that can evolve continuously toward the breadth, compatibility, privacy, performance, and user experience associated with leading browsers such as Chrome, Brave, Firefox, Safari, and AI-oriented browsers.

Those products define direction and observable outcomes; they do not require feature parity before the first release.

## Strategy

Ship a useful MVP, validate it with real users and real websites, and expand capability in phases. Reuse public prior art where it creates leverage, while keeping the architecture sufficiently modular to replace components as the project matures.

The long-term destination may include greater ownership of the browser engine and rendering stack. That destination must not prevent delivery of an early, credible browser.

## Product principles

1. **Useful early:** prioritize a real, usable browser over a large collection of incomplete subsystems.
2. **Compatibility is measured:** validate behavior against real websites and public conformance tests, not intuition alone.
3. **Own the boundaries:** keep engine, native shell, rendering surface, networking, storage, security, and intelligence behind documented interfaces where practical.
4. **Reuse deliberately:** evaluate code, dependencies, licenses, maturity, platform support, and replacement cost before adopting upstream components.
5. **Security is foundational:** AI features must not bypass browser permission checks or security boundaries.
6. **Privacy is a product decision:** clearly document data collection, telemetry, local processing, remote processing, and user controls.
7. **Evidence before claims:** benchmark and compatibility claims require reproducible methods and disclosed limitations.
8. **Evolution is expected:** architecture, roadmap, and implementation can change as evidence accumulates.
9. **No false certainty:** distinguish confirmed facts, assumptions, hypotheses, and unresolved questions.

## MVP outcome

The MVP should be a useful desktop browser that can navigate a defined set of real websites, render common web content, execute JavaScript, handle ordinary interactions, maintain a user profile, and provide credible security and update practices.

Exact platforms, engine choice, supported standards, and release criteria must be decided in tracked issues and technical decision records.

## Non-goals for the first MVP

Unless a decision or issue explicitly changes scope, do not make these prerequisites for the first usable release:

- Complete parity with every mainstream browser.
- Full extension ecosystem parity.
- Universal support for all media, DRM, codecs, and platform-specific integrations.
- A complete independently implemented web engine before any user-facing MVP can ship.
- AI functionality that is required for ordinary browsing.

## Open product decisions

- Target platforms and minimum OS versions for the first release.
- Whether the product is proprietary, open source, or mixed, and under which license.
- Which engine/shell approach is tested first and what evidence would change the choice.
- Required codecs, DRM, extensions, accessibility level, and distribution channels.
- Whether AI/agent features are in the MVP or a later phase.
- What telemetry, crash reporting, and remote processing are acceptable.

These are tracked as issues in the repository responsible for the work. They are not settled by this document.

## Measures of progress

Track progress using evidence such as:

- Percentage of agreed MVP acceptance tests passing.
- Results on selected Web Platform Tests and real-site smoke tests.
- Startup, navigation, memory, responsiveness, and crash-recovery measurements.
- Severity and age of known security issues.
- Number of unresolved architectural or licensing blockers.
- Issue estimate accuracy and age of blocked work.
- User-reported failures on representative websites.

Targets must be set only after baseline measurements exist.
