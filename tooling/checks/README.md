# Workspace Check

Validates the workspace baseline without network access or third-party dependencies.

## Usage

```bash
node tooling/checks/check-workspace.mjs
node tooling/checks/check-workspace.mjs --require-submodule
```

From the repository root. The script resolves the root from its own path, so it can also be invoked from elsewhere.

## What it checks

1. Required baseline files exist and are non-empty.
2. All JSON files parse; the reference snapshot has 16 entries with full 40-character SHAs.
3. `tooling/reference-audit/references.tsv` has 16 unique, well-formed entries.
4. Relative Markdown links resolve to existing files/directories (external links and anchors are ignored).
5. Known placeholder patterns are absent from docs, YAML, JSON, TSV, shell, and source.
6. Obvious credential patterns are absent.
7. Reports include a report date, scope, limitations, and linked/related issues.
8. The initial audit includes date, scope, method, per-project findings, and limitations.
9. `.gitmodules` declares `browser` at `https://github.com/devstroop/browser.git`, the gitlink is pinned, and the checked-out submodule matches when initialized.
10. The issue manifest and issue map contain the same eight baseline issues.

With `--require-submodule`, an uninitialized submodule is an error and the product seed files must be present. CI uses this mode after checking out submodules.

## Exit codes

- `0`: no errors. Warnings may still be present.
- `1`: one or more errors.

## What it does not check

- Product build, tests, behavior, or release artifacts.
- Upstream repository claims or revisions over the network.
- License compatibility or legal obligations.
- Security properties, sandbox behavior, or vulnerability status.
- GitHub settings such as branch protection, secret scanning, or Actions policy.
- Link anchors within documents; only the target path is checked.

## CI

`.github/workflows/workspace-check.yml` runs the checker with submodule checkout and `--require-submodule`. The workflow has read-only permissions and pins its action to a commit SHA.

A green check means the workspace is structurally consistent. It does not mean the browser is usable or secure.

## Maintenance

- Update the required-file list when a baseline document is intentionally added, renamed, or removed.
- Keep the checker dependency-free unless a reviewed need justifies a dependency.
- Do not weaken the submodule check to hide a missing or mismatched pin.
- If a placeholder is intentionally retained in a template, exclude that template or narrow the pattern; do not disable the check.
- Re-run locally before pushing documentation changes.
