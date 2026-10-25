#!/usr/bin/env node
/**
 * Workspace validation.
 *
 * Scope:
 *   - required baseline files
 *   - relative Markdown links
 *   - JSON parseability and reference-snapshot shape
 *   - placeholder and obvious-secret patterns
 *   - submodule declaration and pin
 *   - report metadata and issue-plan consistency
 *
 * This does not validate product behavior, upstream claims, licenses, or security.
 *
 * Usage:
 *   node tooling/checks/check-workspace.mjs
 *   node tooling/checks/check-workspace.mjs --require-submodule
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const requireSubmodule = process.argv.includes("--require-submodule");
const skipDirs = new Set([".git", "browser", "node_modules", "dist", "build", "out", "target", ".zig-cache", "zig-out"]);

let passed = 0;
let warnings = 0;
let errors = 0;

const pass = (msg) => {
  passed += 1;
  console.log(`PASS  ${msg}`);
};
const warn = (msg) => {
  warnings += 1;
  console.log(`WARN  ${msg}`);
};
const fail = (msg) => {
  errors += 1;
  console.log(`FAIL  ${msg}`);
};
const rel = (abs) => path.relative(root, abs) || ".";

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      out.push(...walk(abs));
    } else if (entry.isFile()) {
      out.push(abs);
    }
  }
  return out;
}

function read(abs) {
  return fs.readFileSync(abs, "utf8");
}

function stripCode(text) {
  const lines = text.split(/\r?\n/);
  let fence = null;
  const kept = [];
  for (const line of lines) {
    const match = line.match(/^\s*(```|~~~)/);
    if (match) {
      if (!fence) fence = match[1];
      else if (fence === match[1]) fence = null;
      continue;
    }
    if (!fence) kept.push(line);
  }
  return kept.join("\n").replace(/`[^`\n]*`/g, "");
}

function checkRequiredFiles() {
  const required = [
    "README.md",
    "VISION.md",
    "WORKING-MODEL.md",
    "ROADMAP.md",
    "REFERENCE-REGISTER.md",
    "RESEARCH-METHOD.md",
    "SECURITY-AND-LICENSES.md",
    "FIRST-WEEK.md",
    "SUBMODULE.md",
    "CONTRIBUTING.md",
    ".gitmodules",
    ".github/workflows/workspace-check.yml",
    "decisions/ADR-0001-browser-engine-and-shell-strategy.md",
    "planning/ISSUE-MAP.md",
    "planning/LABELS.md",
    "planning/manifest.tsv",
    "planning/README.md",
    "research/references/2026-10-25-initial-audit.md",
    "research/references/upstream-metadata-2026-10-25.json",
    "reports/2026-10-25-workspace-baseline.md",
    "reports/2026-10-25-reference-audit.md",
    "reports/2026-10-25-architecture-feasibility.md",
    "reports/2026-10-25-risks-and-open-questions.md",
    "reports/2026-10-25-issue-plan.md",
    "tooling/reference-audit/README.md",
    "tooling/reference-audit/collect.sh",
    "tooling/reference-audit/references.tsv",
    "tooling/checks/README.md",
    "tooling/checks/check-workspace.mjs",
  ];

  for (const file of required) {
    const abs = path.join(root, file);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile() || fs.statSync(abs).size === 0) {
      fail(`missing or empty required file: ${file}`);
    } else {
      pass(`required file exists: ${file}`);
    }
  }
}

function checkJson() {
  const files = walk(root).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    warn("no JSON files found to validate");
    return;
  }
  for (const abs of files) {
    try {
      JSON.parse(read(abs));
      pass(`JSON parses: ${rel(abs)}`);
    } catch (error) {
      fail(`invalid JSON: ${rel(abs)} (${error.message})`);
    }
  }

  const snapshotPath = path.join(root, "research/references/upstream-metadata-2026-10-25.json");
  if (!fs.existsSync(snapshotPath)) return;
  try {
    const snapshot = JSON.parse(read(snapshotPath));
    if (!Array.isArray(snapshot) || snapshot.length !== 16) {
      fail(`reference snapshot must be an array of 16 projects, found ${Array.isArray(snapshot) ? snapshot.length : "not an array"}`);
      return;
    }
    const requiredFields = ["slug", "repo", "canonical_url", "revision", "license"];
    let bad = 0;
    for (const item of snapshot) {
      for (const field of requiredFields) {
        if (item[field] === undefined || item[field] === null) {
          fail(`reference snapshot entry ${item.slug ?? "<unknown>"} missing ${field}`);
          bad += 1;
        }
      }
      if (!item.revision?.sha || !/^[0-9a-f]{40}$/.test(item.revision.sha)) {
        fail(`reference snapshot entry ${item.slug ?? "<unknown>"} has no full 40-character SHA`);
        bad += 1;
      }
    }
    if (bad === 0) pass("reference snapshot has 16 entries with full SHAs and required fields");
  } catch {
    // JSON parse failure already reported above.
  }
}

function checkReferenceList() {
  const tsvPath = path.join(root, "tooling/reference-audit/references.tsv");
  if (!fs.existsSync(tsvPath)) return;
  const rows = read(tsvPath)
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith("#"));
  if (rows.length !== 16) {
    fail(`references.tsv must contain 16 data rows, found ${rows.length}`);
    return;
  }
  const slugs = [];
  for (const [index, row] of rows.entries()) {
    const cols = row.split("\t");
    if (cols.length !== 4) {
      fail(`references.tsv row ${index + 1} has ${cols.length} columns, expected 4`);
      continue;
    }
    const [slug, repo, role, url] = cols;
    if (!/^[a-z0-9-]+$/.test(slug)) fail(`references.tsv row ${index + 1} has invalid slug: ${slug}`);
    if (!/^[^/\s]+\/[^/\s]+$/.test(repo)) fail(`references.tsv row ${index + 1} has invalid repo: ${repo}`);
    if (!role.trim()) fail(`references.tsv row ${index + 1} has empty role`);
    if (!url.startsWith("https://github.com/")) fail(`references.tsv row ${index + 1} has non-GitHub URL: ${url}`);
    slugs.push(slug);
  }
  if (new Set(slugs).size !== slugs.length) fail("references.tsv contains duplicate slugs");
  if (new Set(slugs).size === slugs.length && slugs.length === 16) pass("references.tsv has 16 unique, well-formed entries");
}

function checkLinks() {
  const mdFiles = walk(root).filter((f) => f.endsWith(".md"));
  let checked = 0;
  let broken = 0;

  for (const abs of mdFiles) {
    const text = stripCode(read(abs));
    const regex = /!?\[[^\]]*\]\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      let target = match[1].trim();
      if (!target) continue;
      if (target.startsWith("<")) {
        const end = target.indexOf(">");
        target = end > 0 ? target.slice(1, end) : target.slice(1);
      } else {
        target = target.split(/\s+/)[0];
      }
      target = target.replace(/^['"]|['"]$/g, "");
      if (!target || target.startsWith("#")) continue;
      if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(target)) continue;
      if (target.includes("{{") || target.includes("<")) continue;

      let decoded;
      try {
        decoded = decodeURIComponent(target);
      } catch {
        decoded = target;
      }
      const withoutFragment = decoded.split("#")[0].split("?")[0];
      if (!withoutFragment) continue;

      const resolved = withoutFragment.startsWith("/")
        ? path.join(root, withoutFragment)
        : path.resolve(path.dirname(abs), withoutFragment);
      checked += 1;
      if (!fs.existsSync(resolved)) {
        fail(`broken relative link in ${rel(abs)}: ${target}`);
        broken += 1;
      }
    }
  }

  if (broken === 0) pass(`relative Markdown links resolve (${checked} checked across ${mdFiles.length} files)`);
}

function checkPlaceholders() {
  const files = walk(root).filter((f) => /\.(md|ya?ml|json|tsv|sh|mjs)$/.test(f) && !f.endsWith("check-workspace.mjs"));
  const patterns = [
    { name: "owner/repository placeholder", regex: /OWNER\/REPO/g },
    { name: "REPLACE_ME placeholder", regex: /REPLACE_ME/g },
    { name: "CHANGEME placeholder", regex: /CHANGEME/g },
    { name: "workspace URL placeholder", regex: /<WORKSPACE_REPOSITORY_URL>/g },
  ];
  let found = 0;
  for (const abs of files) {
    const text = stripCode(read(abs));
    for (const { name, regex } of patterns) {
      if (regex.test(text)) {
        fail(`${name} found in ${rel(abs)}`);
        found += 1;
      }
    }
  }
  if (found === 0) pass("no known placeholder patterns in docs, YAML, JSON, TSV, shell, or checker source");
}

function checkSecrets() {
  const files = walk(root).filter((f) => {
    const ext = path.extname(f);
    return ![".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip", ".gz", ".tar"].includes(ext);
  });
  const patterns = [
    /ghp_[A-Za-z0-9]{30,}/,
    /github_pat_[A-Za-z0-9_]{30,}/,
    /AKIA[0-9A-Z]{16}/,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /xox[baprs]-[A-Za-z0-9-]{20,}/,
  ];
  let found = 0;
  for (const abs of files) {
    let text;
    try {
      text = read(abs);
    } catch {
      continue;
    }
    if (text.includes("\u0000")) continue;
    for (const regex of patterns) {
      if (regex.test(text)) {
        fail(`possible credential material in ${rel(abs)} (${regex})`);
        found += 1;
      }
    }
  }
  if (found === 0) pass("no obvious credential patterns found");
}

function checkReports() {
  const reportFiles = walk(path.join(root, "reports")).filter((f) => f.endsWith(".md") && !f.endsWith("README.md"));
  if (reportFiles.length === 0) {
    fail("no report files found");
    return;
  }
  for (const abs of reportFiles) {
    const text = read(abs);
    const checks = [
      ["report date", /- Report date:\s*\d{4}-\d{2}-\d{2}/],
      ["scope", /## Scope/],
      ["limitations", /## Limitations/],
      ["issue link or reference", /## (?:Linked issues|Related issues)/],
    ];
    let ok = true;
    for (const [label, regex] of checks) {
      if (!regex.test(text)) {
        fail(`${rel(abs)} is missing ${label}`);
        ok = false;
      }
    }
    if (ok) pass(`report metadata present: ${rel(abs)}`);
  }

  const audit = path.join(root, "research/references/2026-10-25-initial-audit.md");
  if (fs.existsSync(audit)) {
    const text = read(audit);
    const checks = [
      ["audit date", /- Audit date:\s*\d{4}-\d{2}-\d{2}/],
      ["scope", /## Scope/],
      ["method", /## Method/],
      ["limitations", /## Limitations/],
      ["per-project findings", /## Per-project findings/],
    ];
    let ok = true;
    for (const [label, regex] of checks) {
      if (!regex.test(text)) {
        fail(`initial audit is missing ${label}`);
        ok = false;
      }
    }
    if (ok) pass("initial audit includes date, scope, method, per-project findings, and limitations");
  }
}

function checkSubmodule() {
  const gitmodules = path.join(root, ".gitmodules");
  if (!fs.existsSync(gitmodules)) {
    fail("missing .gitmodules");
    return;
  }

  const config = read(gitmodules);
  const pathMatch = config.match(/^\s*path\s*=\s*(.+)\s*$/m);
  const urlMatch = config.match(/^\s*url\s*=\s*(.+)\s*$/m);
  const declaredPath = pathMatch?.[1]?.trim();
  const declaredUrl = urlMatch?.[1]?.trim();

  if (declaredPath !== "browser") fail(`.gitmodules path is ${declaredPath ?? "missing"}, expected browser`);
  else pass("submodule path is browser");

  if (!declaredUrl || !/^https:\/\/github\.com\/devstroop\/browser(?:\.git)?$/.test(declaredUrl)) {
    fail(`.gitmodules URL is ${declaredUrl ?? "missing"}, expected https://github.com/devstroop/browser.git`);
  } else {
    pass("submodule URL points to devstroop/browser");
  }

  let indexLine = "";
  try {
    indexLine = execFileSync("git", ["ls-files", "--stage", "--", "browser"], { cwd: root, encoding: "utf8" }).trim();
  } catch (error) {
    fail(`could not read git index for browser submodule: ${error.message}`);
    return;
  }
  const match = indexLine.match(/^160000 ([0-9a-f]{40}) 0\tbrowser$/);
  if (!match) {
    fail(`browser is not staged as a gitlink at the repository root: ${indexLine || "<none>"}`);
    return;
  }
  const pinned = match[1];
  pass(`submodule gitlink pinned at ${pinned.slice(0, 12)}`);

  const browserDir = path.join(root, "browser");
  const initialized = fs.existsSync(path.join(browserDir, ".git"));
  if (!initialized) {
    const msg = "submodule content is not initialized; run git submodule update --init --recursive";
    if (requireSubmodule) fail(msg);
    else warn(msg);
    return;
  }

  try {
    const head = execFileSync("git", ["-C", browserDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    if (head !== pinned) {
      fail(`submodule HEAD ${head.slice(0, 12)} does not match gitlink ${pinned.slice(0, 12)}`);
    } else {
      pass(`submodule HEAD matches gitlink (${head.slice(0, 12)})`);
    }
    const dirty = execFileSync("git", ["-C", browserDir, "status", "--porcelain"], { encoding: "utf8" }).trim();
    if (dirty) warn(`submodule has uncommitted or untracked content:\n${dirty}`);
    else pass("submodule working tree is clean");
  } catch (error) {
    fail(`could not inspect submodule HEAD: ${error.message}`);
  }

  if (requireSubmodule) {
    const productFiles = [
      "browser/README.md",
      "browser/CONTRIBUTING.md",
      "browser/SECURITY.md",
      "browser/.github/workflows/repository-check.yml",
    ];
    for (const file of productFiles) {
      const abs = path.join(root, file);
      if (!fs.existsSync(abs) || fs.statSync(abs).size === 0) fail(`required product seed file missing: ${file}`);
      else pass(`product seed file exists: ${file}`);
    }
  }
}

function checkIssuePlanning() {
  const manifestPath = path.join(root, "planning/manifest.tsv");
  const mapPath = path.join(root, "planning/ISSUE-MAP.md");
  if (!fs.existsSync(manifestPath) || !fs.existsSync(mapPath)) return;

  const rows = read(manifestPath)
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith("#"));
  const header = rows.shift();
  if (!header || !header.startsWith("key\trepository\ttitle\tlabels\tfile\tissue")) {
    fail("planning/manifest.tsv header is invalid");
    return;
  }

  const keys = new Set();
  const mapText = read(mapPath);
  for (const [index, row] of rows.entries()) {
    const cols = row.split("\t");
    if (cols.length !== 6) {
      fail(`manifest row ${index + 2} has ${cols.length} columns, expected 6`);
      continue;
    }
    const [key, repo, title, labels, file] = cols;
    if (keys.has(key)) fail(`duplicate manifest key: ${key}`);
    keys.add(key);
    if (!/^(WS|BR)-\d{2}$/.test(key)) fail(`manifest key has unexpected format: ${key}`);
    if (!["devstroop/browser-workspace", "devstroop/browser"].includes(repo)) fail(`manifest ${key} has unexpected repository: ${repo}`);
    if (!title.trim()) fail(`manifest ${key} has an empty title`);
    if (!labels.includes("type: ")) fail(`manifest ${key} is missing a type label`);
    const issueFile = path.join(root, file);
    if (!fs.existsSync(issueFile) || fs.statSync(issueFile).size === 0) fail(`manifest ${key} references missing issue file: ${file}`);
    if (!mapText.includes(key)) fail(`ISSUE-MAP.md does not mention ${key}`);
  }
  if (keys.size !== 8) fail(`manifest should contain 8 baseline issues, found ${keys.size}`);
  if (keys.size === 8) pass("manifest and issue map contain 8 consistent issue entries");

  const issueMapRows = (mapText.match(/^\| (WS|BR)-\d{2} \|/gm) ?? []).length;
  if (issueMapRows !== 8) fail(`ISSUE-MAP.md has ${issueMapRows} issue rows, expected 8`);
  else pass("ISSUE-MAP.md has 8 issue rows");
}

function main() {
  console.log("Workspace validation");
  console.log(`Root: ${root}`);
  console.log(`Mode: ${requireSubmodule ? "require submodule content" : "allow uninitialized submodule"}`);
  console.log("");

  checkRequiredFiles();
  checkJson();
  checkReferenceList();
  checkLinks();
  checkPlaceholders();
  checkSecrets();
  checkReports();
  checkSubmodule();
  checkIssuePlanning();

  console.log("");
  console.log(`Summary: ${passed} passed, ${warnings} warning(s), ${errors} error(s)`);
  console.log("Scope: workspace structure and hygiene only; product behavior, upstream claims, licenses, and security are not validated.");
  process.exitCode = errors > 0 ? 1 : 0;
}

main();
