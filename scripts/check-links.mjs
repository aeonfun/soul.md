#!/usr/bin/env node
// Verifies that relative links and image sources in the repo's maintained
// docs resolve to real files. This catches the kind of dangling reference
// that has slipped in before (e.g. a README pointing at a file that no longer
// exists). External URLs and same-page anchors are out of scope here —
// markdownlint handles link *syntax*; this handles link *targets*.
//
// Scope: hand-maintained docs only. examples/*/data/ holds raw, third-party
// source material whose internal links point at their original repo layouts,
// and the persona files (SOUL/STYLE/MEMORY, examples/*.md) contain sample links
// inside illustrative output — neither is ours to keep resolvable.
//
// Usage: node scripts/check-links.mjs

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

const ROOT = resolve(process.cwd());

const mdIn = (dir) => {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => (dir ? `${dir}/${f}` : f));
};

// Root templates/specs, community docs, the folder guides, and the per-example
// entry points a reader actually navigates from.
const exampleDirs = readdirSync(join(ROOT, "examples"), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const docs = [
  ...mdIn(""),
  ...mdIn(".github"),
  "examples/_GUIDE.md",
  "data/_GUIDE.md",
  ...exampleDirs.flatMap((name) =>
    ["README.md", "QUICKSTART.md"].map((f) => `examples/${name}/${f}`),
  ),
].filter((rel) => existsSync(join(ROOT, rel)));

// Markdown inline links: [text](target)   and HTML attrs: src="..." href="..."
const MD_LINK = /\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)/g;
const HTML_ATTR = /(?:src|href)\s*=\s*["']([^"']+)["']/g;

function isExternal(target) {
  return /^(https?:|mailto:|tel:|data:|#)/i.test(target);
}

// Template placeholders such as examples/<name>/ or {{ slug }} are illustrative,
// not real paths — skip them.
function isPlaceholder(target) {
  return /[<>{}]/.test(target);
}

function extract(content) {
  const targets = [];
  for (const re of [MD_LINK, HTML_ATTR]) {
    let m;
    while ((m = re.exec(content)) !== null) {
      let t = m[1].trim();
      if (t.startsWith("<") && t.endsWith(">")) t = t.slice(1, -1); // <url> autolink form
      targets.push(t);
    }
  }
  return targets;
}

const broken = [];
let checked = 0;

for (const doc of docs) {
  const filePath = join(ROOT, doc);
  const content = readFileSync(filePath, "utf8");
  for (const raw of extract(content)) {
    if (!raw || isExternal(raw) || isPlaceholder(raw)) continue;
    // Drop any #fragment and ?query suffix; keep the path part.
    const pathPart = raw.split("#")[0].split("?")[0];
    if (!pathPart) continue;
    checked++;
    const abs = resolve(dirname(filePath), pathPart);
    if (!existsSync(abs)) {
      broken.push({ doc, target: raw });
    }
  }
}

if (broken.length > 0) {
  console.error(`✖ ${broken.length} broken link(s) found:\n`);
  for (const b of broken) console.error(`  ${b.doc} → ${b.target}`);
  process.exit(1);
}

console.log(`✓ ${checked} relative link(s) across ${docs.length} doc(s) resolve.`);
