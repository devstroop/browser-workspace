## Context

The product repository exists with a governance seed, but the controls are not yet real:

- No license has been granted, so external contributions cannot be accepted and redistribution rights are undefined.
- Branch protection/rulesets are not configured.
- No required checks or CODEOWNERS exist.
- The security policy exists and private vulnerability reporting is enabled, but response ownership and targets are undefined.
- No release, signing, notarization, or update process exists.
- The repository is public while the workspace is private.

This epic turns the bootstrap documents into verified delivery controls.

## Desired outcome

A contributor can tell what is allowed, what must be reviewed, how a change becomes a release, and how a vulnerability is handled. A maintainer can enforce those rules.

## Scope

In scope:

- Product license decision and contribution policy.
- Branch model and rulesets: protected `main`, required review, required checks, no direct pushes.
- Required CI checks and their scope.
- CODEOWNERS or an equivalent ownership map.
- Issue labels, milestones, and triage ownership.
- Security policy: supported versions, reporting route, response owner, disclosure expectations.
- Dependency/license inventory policy and notice generation.
- Release/signing/notarization strategy.
- Update strategy, including the CEF/Windows/Linux gap if applicable.
- Public/private disclosure rules.

Out of scope:

- Implementing the browser.
- Choosing the engine (separate spike).
- Purchasing certificates, Apple Developer accounts, or GitHub plans.
- A full legal review (tracked as an input).

## Acceptance criteria

- [ ] Product license is decided and recorded; `LICENSE` and notices are added if applicable.
- [ ] Contribution policy matches the license decision.
- [ ] `main` is protected with required review and required checks.
- [ ] Required checks are documented and actually run.
- [ ] CODEOWNERS or an ownership map is committed.
- [ ] Security reporting route is tested; response owner and targets are documented.
- [ ] Dependency/license inventory and notice process are defined.
- [ ] Release, signing, and rollback process is documented and dry-run tested when code exists.
- [ ] Update ownership is assigned; CEF/Windows/Linux gaps are tracked.
- [ ] Public/private disclosure rules are recorded.

## Estimate and confidence

- Estimate: 3–5 engineer-days for policy and settings; release/signing dry run depends on code and accounts.
- Confidence: Medium.
- Assumptions: organization admin available; license intent decided; no procurement delays.

## Dependencies and blockers

- Product license decision.
- Security/license baseline findings.
- Team roles and release ownership.
- GitHub plan/features for private repositories (workspace only; product is public).

## Evidence

This issue is self-contained. Internal workspace policy is maintained privately; the public repository files and platform documentation below define the controls.

- Product `README.md`, `CONTRIBUTING.md`, `SECURITY.md`.
- GitHub API: private vulnerability reporting enabled; branch protection not configured; Actions SHA pinning not required.
- GitHub rulesets: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets
- GitHub security advisories: https://docs.github.com/en/code-security/security-advisories
- GitHub Actions security hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions

## Related issues

- MVP definition: #1
- Engine/shell spike: #2
- Security/license baseline: #3
- Visible prototype: #5

## Definition of done

The controls are configured, verified, and documented; the repository does not claim protections it does not have.
