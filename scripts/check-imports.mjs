import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const srcRoot = path.join(root, "src");
const extensions = [".js", ".jsx"];

const failures = [];
let importCount = 0;
let fileCount = 0;

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function displayPath(absolutePath) {
  return toPosix(path.relative(root, absolutePath)) || ".";
}

function lineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
    } else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
      files.push(absolutePath);
    }
  }

  return files.sort();
}

function findSpecifiers(source) {
  const results = [];
  const patterns = [
    /\bfrom\s*["']([^"']+)["']/g,
    /\bimport\s*["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      results.push({
        specifier: match[1],
        index: match.index,
      });
    }
  }

  return results.sort((a, b) => a.index - b.index);
}

function candidatesFor(specifier, importerDirectory) {
  const clean = specifier.split(/[?#]/, 1)[0];
  const base = clean.startsWith("/")
    ? path.join(root, clean.slice(1))
    : path.resolve(importerDirectory, clean);
  const extension = path.extname(base);
  const candidates = [];

  if (extension) {
    candidates.push(base);
  } else {
    for (const suffix of extensions) candidates.push(`${base}${suffix}`);
    for (const suffix of extensions) {
      candidates.push(path.join(base, `index${suffix}`));
    }
    candidates.push(base);
  }

  return [...new Set(candidates)];
}

async function exactFileCheck(absolutePath) {
  const relative = path.relative(root, absolutePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return { ok: false, reason: "path is outside the project root" };
  }

  const segments = relative.split(path.sep).filter(Boolean);
  let current = root;

  for (const segment of segments) {
    let entries;
    try {
      entries = await readdir(current);
    } catch {
      return {
        ok: false,
        reason: `cannot read directory '${displayPath(current)}'`,
      };
    }

    if (!entries.includes(segment)) {
      const caseMatch = entries.find(
        (entry) => entry.toLowerCase() === segment.toLowerCase(),
      );
      return {
        ok: false,
        reason: caseMatch
          ? `case mismatch: '${segment}' should be '${caseMatch}'`
          : `missing path segment '${segment}'`,
      };
    }

    current = path.join(current, segment);
  }

  try {
    const details = await stat(current);
    if (!details.isFile()) {
      return { ok: false, reason: "resolved path is not a file" };
    }
  } catch {
    return { ok: false, reason: "resolved path is not a file" };
  }

  return { ok: true };
}

function shouldCheck(specifier) {
  return (
    specifier.startsWith("./") ||
    specifier.startsWith("../") ||
    specifier.startsWith("/")
  );
}

async function checkImport(file, line, specifier, importerDirectory) {
  importCount += 1;
  const candidates = candidatesFor(specifier, importerDirectory);
  const reasons = [];

  for (const candidate of candidates) {
    const result = await exactFileCheck(candidate);
    if (result.ok) return;
    reasons.push(`${displayPath(candidate)}: ${result.reason}`);
  }

  failures.push({
    file,
    line,
    specifier,
    reasons,
  });
}

async function checkSourceFile(absolutePath) {
  const source = await readFile(absolutePath, "utf8");
  fileCount += 1;
  const importerDirectory = path.dirname(absolutePath);

  for (const { specifier, index } of findSpecifiers(source)) {
    if (!shouldCheck(specifier)) continue;
    await checkImport(
      displayPath(absolutePath),
      lineNumber(source, index),
      specifier,
      importerDirectory,
    );
  }
}

async function checkIndexHtml() {
  const htmlPath = path.join(root, "index.html");
  let html;
  try {
    html = await readFile(htmlPath, "utf8");
  } catch {
    return;
  }

  fileCount += 1;
  const pattern = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    const specifier = match[1];
    if (!shouldCheck(specifier)) continue;
    await checkImport(
      "index.html",
      lineNumber(html, match.index),
      specifier,
      root,
    );
  }
}

const sourceFiles = await collectFiles(srcRoot);
for (const file of sourceFiles) {
  await checkSourceFile(file);
}
await checkIndexHtml();

if (failures.length === 0) {
  console.log(
    `Checked ${importCount} relative imports across ${fileCount} files. All paths match the exact on-disk case.`,
  );
  process.exit(0);
}

console.error(
  `Found ${failures.length} import path problem${
    failures.length === 1 ? "" : "s"
  }:\n`,
);

for (const failure of failures) {
  console.error(
    `${failure.file}:${failure.line}  ${failure.specifier}`,
  );
  for (const reason of failure.reasons) {
    console.error(`  tried ${reason}`);
  }
  console.error("");
}

process.exit(1);
