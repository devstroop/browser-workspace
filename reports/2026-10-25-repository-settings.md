# Repository Settings and CI Verification

- Report date: 2026-10-25
- Status: Point-in-time verification; proposed controls are **not applied**
- Scope: GitHub settings, CI run status, and proposed branch/ruleset controls for `devstroop/browser-workspace` and `devstroop/browser`
- Evidence: GitHub CLI/API responses, Actions run pages, local checker output
- Related issues: [WS-02](https://github.com/devstroop/browser-workspace/issues/2), [BR-04](https://github.com/devstroop/browser/issues/4)

## Linked issues

- [WS-02](https://github.com/devstroop/browser-workspace/issues/2) — workspace CI/governance enforcement
- [BR-04](https://github.com/devstroop/browser/issues/4) — product governance and release readiness

## Scope

Included:

- Repository visibility and default branches.
- Branch protection and ruleset availability.
- Private vulnerability reporting status.
- GitHub Actions permission and SHA-pinning settings.
- CI run outcomes for the baseline commits.
- Proposed protection settings, explicitly marked as not enforced.

Excluded:

- Organization-level policy, SSO, IP allowlists, or enterprise controls.
- Secret scanning/push protection and Dependabot status (not verified here).
- Signed-commit enforcement.
- Penetration testing or product security validation.
- Any settings change beyond issue labels and issues.

## Verified state

| Setting | `devstroop/browser-workspace` | `devstroop/browser` |
|---|---|---|
| Visibility | Private | Public |
| Default branch | `main` | `main` |
| Branch protection | API 403: "Upgrade to GitHub Pro or make this repository public" | API 404: "Branch not protected" |
| Rulesets | API 403: unavailable on current private-repo plan | API returns `[]` (available, none configured) |
| Private vulnerability reporting | API 404 / unavailable | Enabled |
| Actions enabled | Yes | Yes |
| Allowed actions | All | All |
| Actions SHA pinning required | No | No |
| Default workflow permissions | Read-only | Read-only |
| Workflow can approve PR reviews | Yes | Yes |

The `devstroop/browser-workspace` repository is private. On the current plan, GitHub rejects branch protection and ruleset APIs with an upgrade-required response. This is a platform constraint, not a repository misconfiguration.

## CI verification

| Run | Repository | Result | Notes |
|---|---|---|---|
| `40175022540` | `devstroop/browser` | **Success** | `repository-check` hygiene workflow passed in 8 seconds |
| `40175789838` | `devstroop/browser-workspace` | **Failure before job start** | "The job was not started because recent account payments have failed or your spending limit needs to be increased" |

Local workspace validation on 2026-10-25:

- `node tooling/checks/check-workspace.mjs --require-submodule`: **55 passed, 0 warnings, 0 errors**.
- Submodule HEAD matches the gitlink at `077c98f5c96c7c4cb51acb2df1492e7e44eec146`.

The workspace workflow cannot be claimed as passing. Its failure is a billing/spending-limit blocker, not evidence that the checker fails.

## Proposed controls (not applied)

### Product repository (`devstroop/browser`)

Proposed ruleset for `main`:

- Require a pull request before merging.
- Require one approving review.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution.
- Require the `repository-check` status check to pass.
- Block force pushes.
- Block branch deletion.
- Do not allow bypass except for a documented emergency process.

Proposed repository settings:

- Enable secret scanning and push protection if available for the repository.
- Enable Dependabot alerts and security updates.
- Add CODEOWNERS once ownership is assigned.
- Require signed commits only if the team can support the workflow.
- Keep workflow permissions read-only by default.
- Pin third-party actions to full commit SHAs. The two baseline workflows already do this manually; the repository policy does not require it.

### Workspace repository (`devstroop/browser-workspace`)

Proposed controls, contingent on a plan upgrade or a visibility decision:

- Require a pull request and one review for `main`.
- Require the `workspace-check` status check.
- Block force pushes and deletion.
- Enable private vulnerability reporting if the feature becomes available.
- Keep the submodule pin check required, not advisory.

Do not describe these as active until the settings are applied and verified through the API or UI.

## Why the settings were not changed

- The task scope was reconnaissance and planning with minimal, reviewable CI/governance. Changing repository protection or visibility is an administrative decision with team-wide effects.
- The workspace repository's plan rejects the relevant APIs.
- The product repository's required check name and review ownership need an explicit team decision, even though the workflow itself passes.
- Applying a ruleset without an emergency/bypass policy can block urgent security fixes.

## Limitations

- Settings were read through the GitHub API at one point in time; they can change.
- The API does not expose every organization-level policy or UI-only setting.
- Secret scanning, push protection, Dependabot, and signed-commit status were not verified.
- CI execution for the workspace is blocked by billing, so the workflow has not been validated on a GitHub-hosted runner.
- Proposed controls are recommendations, not commitments or legal/security guarantees.

## Next actions

1. Decide whether to upgrade the GitHub plan, make the workspace public, or accept the workspace protection gap.
2. Apply and verify the product `main` ruleset, including the `repository-check` requirement.
3. Add CODEOWNERS and a release/security owner.
4. Verify secret scanning, push protection, and Dependabot availability.
5. Re-run the workspace workflow after the billing issue is resolved; record the run URL.
