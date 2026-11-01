import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("src");
const EXTS = [".js", ".jsx", ".ts", ".tsx", ".css", ".json"];

function fixSpec(baseDir, spec) {
  const parts = spec.split("/");
  let dir = baseDir;
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p === "." || p === "..") {
      dir = path.resolve(dir, p);
      out.push(p);
      continue;
    }
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return null;
    const names = fs.readdirSync(dir);
    let m = names.find((n) => n === p) || names.find((n) => n.toLowerCase() === p.toLowerCase());
    if (m) {
      out.push(m);
      dir = path.join(dir, m);
      continue;
    }
    if (i === parts.length - 1) {
      for (const e of EXTS) {
        const hit = names.find((n) => n.toLowerCase() === (p + e).toLowerCase());
        if (hit) {
          out.push(hit.slice(0, hit.length - e.length));
          return out.join("/");
        }
      }
    }
    return null;
  }
  return out.join("/");
}

function walk(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, list);
    else if (/\.(js|jsx|ts|tsx)$/.test(name)) list.push(full);
  }
  return list;
}

const re = /(from\s+|import\s*\(\s*|import\s+)(["'])(\.{1,2}\/[^"']+)\2/g;
let changed = 0;
let broken = 0;

for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, "utf8");
  const next = text.replace(re, (all, pre, q, spec) => {
    const fixed = fixSpec(path.dirname(file), spec);
    if (fixed === null) {
      broken++;
      console.log("NOT FOUND:", path.relative(process.cwd(), file), "->", spec);
      return all;
    }
    if (fixed !== spec) {
      changed++;
      console.log("FIXED:", path.relative(process.cwd(), file), spec, "->", fixed);
      return pre + q + fixed + q;
    }
    return all;
  });
  if (next !== text) fs.writeFileSync(file, next);
}
console.log(`Done. Fixed ${changed} import(s). Not found: ${broken}.`);
process.exit(broken ? 1 : 0);