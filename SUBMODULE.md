# Browser Submodule Notes

Before finalizing this file, replace placeholders with the canonical browser repository URL and chosen branch.

## Initial setup

```bash
git clone <WORKSPACE_REPOSITORY_URL>
cd <WORKSPACE_DIRECTORY>
git submodule update --init --recursive
```

## Updating the pinned browser revision

```bash
git -C browser fetch origin
git -C browser checkout <REVIEWED_COMMIT_OR_BRANCH>
git add browser
git commit -m "chore(workspace): update browser submodule"
```

Prefer a reviewed, explicit commit over blindly tracking a moving branch. If the product repository's branch policy requires PRs, update the submodule pointer only after the product change has merged or the target commit has been approved.

## CI

Ensure checkout uses submodules, for example with the equivalent of `submodules: recursive` in the chosen CI provider. Validate that the pinned commit is present and that product CI is run from the intended revision.
