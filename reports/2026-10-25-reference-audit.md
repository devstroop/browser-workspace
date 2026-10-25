# Reference Audit Summary

- Report date: 2026-10-25
- Status: Findings ready; no runtime validation
- Scope: 16 upstream projects relevant to engine, shell, testing, and architecture
- Detailed evidence: [Initial audit](../research/references/2026-10-25-initial-audit.md)
- Register: [REFERENCE-REGISTER.md](../REFERENCE-REGISTER.md)
- Metadata: [upstream-metadata-2026-10-25.json](../research/references/upstream-metadata-2026-10-25.json)
- Related issues: See [planning/ISSUE-MAP.md](../planning/ISSUE-MAP.md)

## Scope

Included: 16 upstream projects relevant to engine, shell, testing, and architecture; exact revisions, releases, licenses, platform/maturity findings, and dispositions.

Excluded: builds, execution, benchmarks, runtime security testing, full transitive license inventories, and legal conclusions.

## What was asked

Which upstream projects are credible inputs to a Devstroop browser MVP, and what are the license, platform, security, and maintenance consequences of using them?

## What was found

1. **No project is a drop-in browser.** CEF, Electron, Tauri/Wry, Native SDK, and Chromium provide parts; none provides a complete browser product with tabs, profiles, permissions, downloads, updates, and security response.
2. **The MVP choice is a shell/engine trade-off.** System WebView is fastest and smallest but OS-versioned. CEF gives Chromium consistency but a large binary, update burden, and sandbox integration. Electron is a fast control prototype, not a target architecture.
3. **A Chromium fork is not an MVP path.** It requires a sustained browser team and infrastructure. Brave is a reference for product structure, not a shortcut.
4. **Independent engines are not ready.** Servo says WebView embedding is still in progress. Ladybird is pre-alpha. WebKit/Gecko are full platform forks, not embeddable shortcuts.
5. **Lightpanda is not a visible-browser engine.** It is headless, has no layout engine, and renders text-only PNG/PDF. Its AGPL-3.0-or-later license is a major redistribution constraint.
6. **Native SDK's CEF host disables the Chromium sandbox.** This is a verified source-level finding at v0.11.0; it makes that host unsuitable for untrusted web content without remediation.
7. **Licensing is not resolved.** AGPL, MPL, LGPL, Chromium third-party terms, codecs, patents, and trademarks all require review before distribution. WebKit and Firefox do not have simple top-level license files.

## Dispositions

| Disposition | Projects |
|---|---|
| Prototype candidate | Tauri, CEF, Native SDK (system WebView path), Wry as component |
| Control prototype/reference | Electron |
| Adopt for testing | WPT (subset), Playwright, Puppeteer (where protocols are supported) |
| Monitor | Servo, Ladybird |
| Reference only | Chromium, Brave, Brave core, WebKit, Firefox, Lightpanda (visible-browser role) |
| Reject for visible-browser role | Lightpanda |

## Evidence status

- **Verified:** repository existence, exact revisions, release metadata, license files/headers, selected source facts (including the Native SDK sandbox setting and Lightpanda renderer comment).
- **Documented:** platform support, embedding status, update limitations, and project maturity claims from official docs/READMEs.
- **Inferred:** relative effort and MVP suitability.
- **Unknown:** runtime performance, sandbox behavior, real-site compatibility, full dependency/license inventory, accessibility, codec/DRM feasibility.

## Limitations

- No upstream build or execution.
- No benchmark or compatibility run.
- No legal review.
- Selected source inspection, not a full audit.
- GitHub metadata and release endpoints have caveats; see the detailed audit.
- Effort ranges are planning assumptions.

## Recommendation

Run the time-boxed system-WebView vs CEF vs Electron spike in [ADR-0001](../decisions/ADR-0001-browser-engine-and-shell-strategy.md). Do not commit to a final engine from documentation alone. Require a sandbox/process-model review before CEF adoption and a license decision before distribution or external contributions.

## Linked issues

- Reference-audit refresh cadence.
- Engine/shell spike.
- Security and license baseline.
- MVP definition.

See the [issue map](../planning/ISSUE-MAP.md) for current status and URLs.
