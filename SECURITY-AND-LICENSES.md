# Security, Privacy, and Third-Party Reuse

- Status: Working policy; legal review may be needed before distribution

## Third-party code

Before copying, linking, vendoring, or redistributing any component:

1. Identify its canonical source and exact version/commit.
2. Read the repository license and relevant file-level notices.
3. Review licenses of transitive and bundled dependencies.
4. Record attribution, notice, source-offer, patent, trademark, and modification obligations where applicable.
5. Identify incompatible or unclear terms and escalate before integration.
6. Preserve notices and document local modifications.
7. Track the component and its update/security advisories.

Do not assume all files in a repository have identical terms or that public availability grants unrestricted reuse.

## Security baseline

The browser's threat model should eventually cover:
- Malicious websites and renderer compromise.
- Cross-origin data exposure and process isolation.
- Downloads, file access, external protocol handlers, and clipboard access.
- Certificates, TLS, mixed content, and insecure navigation.
- Extensions and injected scripts.
- Local profile data, credentials, cookies, and tokens.
- AI prompts, page content, tool calls, and agent-induced actions.
- Update integrity, supply-chain attacks, and compromised dependencies.

## AI and agent safety

- Page content is untrusted input, not privileged instruction.
- Agents must use browser-enforced permissions and APIs.
- High-impact actions need explicit user authorization or a narrowly defined policy.
- Keep secrets out of model context unless essential and explicitly authorized.
- Record the data sent to remote model providers and provide meaningful controls.
- Separate browsing data by profile/context and apply retention limits.
- Do not equate a model's judgment with a security boundary.

## Reporting

Security-sensitive issues should use the product repository's private reporting mechanism where appropriate. Do not publish exploit details or sensitive user data in ordinary issues before responsible disclosure has been considered.
