## Context

The workspace now has a validation script and a GitHub Actions workflow. A workflow file is not an enforced control: it must run successfully, be required by branch protection/rulesets, and be maintained against supply-chain risk.

The workspace repository is private. The current GitHub plan rejects branch protection and repository rulesets for it with an "Upgrade to GitHub Pro" response. That is a verified platform constraint, not a reason to skip governance.

## Goal

Make workspace CI and review controls real, or record an explicit accepted alternative where the platform prevents them.

## Scope

In scope:

- Verify the `workspace-check` workflow runs and passes on `main`.
- Check the product submodule declaration and pin in CI.
- Decide and document required status checks.
- Configure branch protection/rulesets for the workspace if the plan permits; otherwise record the blocker and options.
- Pin GitHub Actions to full commit SHAs and document the policy.
- Verify secret scanning/push protection and dependency alerts, or file follow-up work.
- Add CODEOWNERS or an equivalent review-ownership map.
- Keep workflow permissions read-only unless a step needs more.

Out of scope:

- Product build/test CI.
- Changing repository visibility without an explicit decision.
- Purchasing a GitHub plan.
- Adding third-party CI services.

## Acceptance criteria

- [ ] The `workspace-check` workflow has a successful run on `main`, linked from this issue. The first run (`40175789838`) failed before job start because of the private-repository Actions billing/spending limit; local checks pass.
- [ ] The workflow validates required files, relative links, JSON, placeholder/secret patterns, and the submodule declaration/pin.
- [ ] A required status check is configured for `main`, or the platform blocker and accepted alternative are documented.
- [ ] Actions are pinned to full commit SHAs; the policy is recorded.
- [ ] Workflow token permissions are minimal (`contents: read`).
- [ ] Secret scanning/push protection status is verified and recorded; gaps have issues.
- [ ] CODEOWNERS or an ownership map is added, or the reason it is deferred is recorded.
- [ ] No workflow claims to validate product behavior or security.

## Estimate and confidence

- Estimate: 0.5–1 engineer-day after the GitHub plan/visibility decision.
- Confidence: High for checks and SHA pinning; medium for platform settings.
- Assumptions: an organization admin can change repository settings.

## Dependencies and blockers

- GitHub plan or visibility decision for private-repo branch protection.
- Private-repository Actions billing/spending limit; the workflow cannot start until resolved.
- Organization admin access.
- Product governance issue for rules on the public product repository.

## Evidence

- `.github/workflows/workspace-check.yml`
- `tooling/checks/check-workspace.mjs`
- `SUBMODULE.md`
- GitHub API: workspace branch protection/rulesets returned an upgrade-required response on 2026-10-25.
- GitHub API: default workflow permissions are read-only; Actions SHA pinning is not required.

## Definition of done

A new commit to `main` cannot merge without the intended checks, or the platform limitation is explicitly accepted and tracked. The workflow run URL is recorded here.
