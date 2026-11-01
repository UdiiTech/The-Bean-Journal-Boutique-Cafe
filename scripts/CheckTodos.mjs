import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const file = fileURLToPath(new URL("../src/data/site.js", import.meta.url));
const relative = "src/data/site.js";
const lines = (await readFile(file, "utf8")).split(/\r?\n/);
const hits = [];

lines.forEach((line, index) => {
  const trimmed = line.trim();
  if (!trimmed.includes("TODO")) return;
  if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) {
    return;
  }
  if (trimmed.startsWith("const TODO")) return;
  hits.push({ line: index + 1, text: trimmed });
});

if (hits.length === 0) {
  console.log(`No TODO values left in ${relative}.`);
} else {
  console.log(`${hits.length} TODO values remaining in ${relative}:\n`);
  hits.forEach((hit) => {
    console.log(`${relative}:${hit.line}  ${hit.text}`);
  });
  console.log("\nReplace each value with confirmed business information.");
}
