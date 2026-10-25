# Browser Submodule Notes

- Submodule path: `browser/`
- Canonical repository: https://github.com/devstroop/browser
- Visibility: Public
- Expected default branch: `main`
- Current pinned commit: `077c98f5c96c7c4cb51acb2df1492e7e44eec146`
- Pinned content: governance seed only; no browser implementation
- Last verified: 2026-10-25

The submodule keeps product history independent from workspace history. The workspace records a pointer; it does not absorb the product repository's history.

## Clone and initialize

```bash
git clone --recurse-submodules https://github.com/devstroop/browser-workspace.git
cd browser-workspace
git submodule status
```

If the workspace was cloned without submodules:

```bash
git submodule update --init --recursive
```

The workspace is private, so cloning it requires organization access. The product repository is currently public, so the submodule itself can be fetched anonymously.

## Verify the pin

```bash
git submodule status
git -C browser rev-parse HEAD
git ls-tree HEAD browser
```

The gitlink SHA in `git ls-tree` must match the checked-out submodule commit. The checker in `tooling/checks/` validates the declaration and pin without requiring a network fetch.

## Updating the pinned browser revision

```bash
git -C browser fetch origin
git -C browser checkout <REVIEWED_COMMIT>
git add browser
git commit -m "chore(workspace): update browser submodule to <short-sha>"
```

Prefer a reviewed, explicit commit over blindly tracking a moving branch. If the product repository's branch policy requires PRs, update the submodule pointer only after the product change has merged or the target commit has been approved.

Do not rewrite product history from the workspace. Do not assume a workspace branch automatically updates the submodule pointer.

## CI behavior

- Workspace CI checks `.gitmodules`, the declared path/URL, and the gitlink commit.
- A GitHub-hosted checkout can fetch the public product submodule anonymously.
- If the product repository becomes private, configure a narrowly scoped credential and do not expose it to untrusted pull requests.
- Product CI runs in the product repository. Workspace CI does not replace product required checks.

## Access and disclosure

The product repository is public and the workspace is private. A public product commit is visible to everyone, even though the pointer lives in a private repository. Do not put private research, credentials, customer data, or vulnerability details in the product repository.

## Troubleshooting

**`browser/` is empty or missing**

```bash
git submodule update --init --recursive
```

**The checkout is at the wrong commit**

```bash
git submodule update --init --recursive
git -C browser checkout <pinned-sha>
```

**CI cannot fetch the submodule**

- Confirm the URL in `.gitmodules`.
- Confirm the product repository visibility.
- If private, verify the credential is available to the workflow and is not exposed to fork pull requests.
- Do not weaken the check by silently skipping the submodule.

**The gitlink is staged but the submodule has uncommitted changes**

Commit or discard changes inside `browser/` first. A dirty submodule is not a reviewable pin.
