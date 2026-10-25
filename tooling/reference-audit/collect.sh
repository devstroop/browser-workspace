#!/usr/bin/env bash
# Collect pinned upstream metadata for the reference register.
#
# Requirements: gh (authenticated), jq, network access.
# Output contains public repository metadata only; no credentials are written.
# The output is a point-in-time snapshot, not a claim of a complete audit.
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
input="${1:-$script_dir/references.tsv}"
output="${2:-$script_dir/../../research/references/upstream-metadata-$(date -u +%Y-%m-%d).json}"
audit_date="${AUDIT_DATE:-$(date -u +%Y-%m-%d)}"

command -v gh >/dev/null || { echo "error: gh is required" >&2; exit 1; }
command -v jq >/dev/null || { echo "error: jq is required" >&2; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "error: gh is not authenticated" >&2; exit 1; }

tmp="$(mktemp "${TMPDIR:-/tmp}/reference-audit.XXXXXX")"
trap 'rm -f "$tmp"' EXIT
printf '[\n' >"$tmp"
first=1

while IFS=$'\t' read -r slug repo role url; do
  [[ -z "${slug:-}" || "$slug" == \#* ]] && continue

  echo "collecting $repo" >&2
  meta="$(gh api "repos/$repo")"
  branch="$(jq -r '.default_branch' <<<"$meta")"
  commit="$(gh api "repos/$repo/commits/$branch")"
  languages="$(gh api "repos/$repo/languages")"
  stable="$(gh api "repos/$repo/releases/latest" 2>/dev/null || true)"
  [[ -n "$stable" ]] || stable="null"
  release="$(gh api "repos/$repo/releases?per_page=1" | jq '.[0] // null')"

  [[ $first -eq 1 ]] || printf ',\n' >>"$tmp"
  first=0
  jq -n \
    --arg audit_date "$audit_date" \
    --arg slug "$slug" \
    --arg repo "$repo" \
    --arg role "$role" \
    --arg url "$url" \
    --argjson meta "$meta" \
    --arg branch "$branch" \
    --argjson commit "$commit" \
    --argjson languages "$languages" \
    --argjson stable "$stable" \
    --argjson release "$release" \
    '{
      slug: $slug,
      repo: $repo,
      canonical_url: $url,
      role: $role,
      audit_date: $audit_date,
      default_branch: $branch,
      revision: {
        sha: $commit.sha,
        committed_at: $commit.commit.committer.date,
        message: ($commit.commit.message | split("\n")[0])
      },
      latest_stable_release: (if $stable == null then null else {
        tag: $stable.tag_name,
        published_at: $stable.published_at
      } end),
      latest_published_release: (if $release == null then null else {
        tag: $release.tag_name,
        published_at: $release.published_at,
        prerelease: $release.prerelease
      } end),
      license: {
        spdx: ($meta.license.spdx_id // "NOASSERTION"),
        name: ($meta.license.name // "No license detected by GitHub"),
        file: ($meta.license.path // null)
      },
      language: ($meta.language // null),
      languages: $languages,
      stars: $meta.stargazers_count,
      forks: $meta.forks_count,
      open_issues: $meta.open_issues_count,
      archived: $meta.archived,
      created_at: $meta.created_at,
      pushed_at: $meta.pushed_at,
      size_kb: $meta.size,
      description: ($meta.description // "")
    }' >>"$tmp"
done <"$input"

printf '\n]\n' >>"$tmp"
mkdir -p "$(dirname "$output")"
mv "$tmp" "$output"
chmod 644 "$output"
trap - EXIT
echo "wrote $output" >&2
