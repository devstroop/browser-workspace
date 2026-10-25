# Security Policy

- Status: Baseline policy
- Last reviewed: 2026-10-25

This repository contains workspace research, planning, and tooling. It is not the shipped browser.

## Product vulnerabilities

Report suspected vulnerabilities in the browser product through the public product repository's private reporting channel:

https://github.com/devstroop/browser/security/advisories/new

Do not open a public issue with exploit details, private user data, or credentials.

## Workspace vulnerabilities

No workspace-specific private vulnerability reporting channel is verified as configured. For a suspected vulnerability in workspace tooling or scripts:

- Do not open a public issue with exploit details.
- Contact the repository maintainers privately through the organization.
- Include the affected file/commit, impact, reproduction steps, and any suggested fix.
- Do not include credentials, tokens, personal data, or third-party confidential information.

## Scope

Workspace scope includes:

- Validation and metadata-collection scripts.
- CI workflows and repository automation.
- Research artifacts that could mislead a product security decision.
- Accidental disclosure of secrets or private data in tracked files.

## No commitments yet

No response-time SLA, bounty program, supported-version window, or disclosure timeline is currently promised. Those commitments require a separate decision and owner.

## Limitations

- The workspace check is structural and hygiene-focused; it does not perform security testing.
- Upstream projects are treated as untrusted; see [RESEARCH-METHOD.md](RESEARCH-METHOD.md).
- Product security is governed by the product repository's [SECURITY.md](https://github.com/devstroop/browser/blob/main/SECURITY.md).
