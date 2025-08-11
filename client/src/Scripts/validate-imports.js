// scripts/validate-imports.js
// Usage: node scripts/validate-imports.js [<clientSrcDir>]
// Default clientSrcDir: ./client/src

import fs from "fs/promises";
import path from "path";

const rootArg = process.argv[2] || "client/src";
const srcRoot = path.resolve(process.cwd(), rootArg);
const exts = [".js", ".jsx", ".ts", ".tsx", "/index.js", "/index.jsx", "/index.ts", "/index.tsx"];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(js|jsx|ts|tsx)$/.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

function extractImports(content) {
  const re = /(?:import\s+(?:[\s\S]*?)\s+from\s+|export\s+[\s\S]*?\s+from\s+|require\()\s*['"]([^'"]+)['"]/g;
  const matches = [];
  let m;
  while ((m = re.exec(content))) matches.push(m[1]);
  return matches;
}

async function existsAny(base) {
  for (const e of exts) {
    try {
      await fs.access(e.startsWith("/") ? base + e : base + e);
      return true;
    } catch {}
  }
  try {
    await fs.access(base); // exact
    return true;
  } catch {}
  return false;
}

// Try to suggest correct-cased path by walking directories case-insensitively
async function suggestCasing(targetPath) {
  const parts = targetPath.split(path.sep).filter(Boolean);
  let cur = path.isAbsolute(targetPath) ? path.sep : "";
  for (const part of parts) {
    const parent = path.join(cur || ".", ...[]);
    try {
      const entries = await fs.readdir(parent || ".", { withFileTypes: true });
      const found = entries.find((en) => en.name.toLowerCase() === part.toLowerCase());
      if (!found) return null;
      cur = path.join(parent, found.name);
    } catch {
      return null;
    }
  }
  return cur;
}

(async () => {
  console.log(`Scanning files under ${srcRoot} ...`);
  const allFiles = await walk(srcRoot);
  let totalImports = 0;
  let missing = 0;

  for (const file of allFiles) {
    const content = await fs.readFile(file, "utf8");
    const imports = extractImports(content);
    for (const imp of imports) {
      totalImports++;
      // skip bare modules
      if (!imp.startsWith(".") && !imp.startsWith("/") && !imp.startsWith("@/")) continue;

      // resolve path
      let resolved;
      if (imp.startsWith("@/")) {
        const rel = imp.slice(2);
        resolved = path.join(srcRoot, rel);
      } else {
        resolved = path.resolve(path.dirname(file), imp);
      }

      if (!(await existsAny(resolved))) {
        missing++;
        console.log("---------------");
        console.log(`Missing import in: ${path.relative(process.cwd(), file)}`);
        console.log(`  import '${imp}'  -> resolved to: ${resolved}`);
        const suggestion = await suggestCasing(resolved);
        if (suggestion && (await existsAny(suggestion))) {
          console.log(`  Possible correct path (casing): ${path.relative(process.cwd(), suggestion)}`);
        } else {
          // search for similarly named file under components/ui or components
          const candidateDirs = ["components", "components/ui", "pages", "hooks", "lib"].map(d =>
            path.join(srcRoot, d)
          );
          for (const d of candidateDirs) {
            try {
              const entries = await fs.readdir(d);
              const base = path.basename(resolved).toLowerCase();
              const match = entries.find((n) => n.toLowerCase().includes(base));
              if (match) {
                console.log(`  Nearby file suggestion: ${path.relative(process.cwd(), path.join(d, match))}`);
                break;
              }
            } catch {}
          }
        }
      }
    }
  }

  console.log("===============");
  console.log(`Total imports scanned: ${totalImports}`);
  console.log(`Missing / unresolved imports: ${missing}`);
  process.exit(missing > 0 ? 1 : 0);
})();
