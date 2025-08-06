// fix-tsx-in-jsx.js
const fs = require("fs");
const path = require("path");

const targetDir = "./src/components/ui"; // Change this to scan another folder

function scanDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".jsx")) {
      fixJSXFile(fullPath);
    }
  });
}

function fixJSXFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");

  const original = code;

  // Remove TypeScript type annotations like : string, : ReactNode, etc.
  code = code.replace(/:\s*[\w[\]<>|]+\s*/g, "");

  // Remove TypeScript generic parameters in components (e.g., React.forwardRef<...>)
  code = code.replace(/React\.forwardRef<[^>]+>\s*\(/g, "React.forwardRef(");

  // Remove ComponentProps type usage (e.g., React.ComponentProps<...>)
  code = code.replace(/React\.ComponentProps(?:WithoutRef)?<[^>]+>/g, "any");

  // Remove TypeScript-style imports like: import type { X }
  code = code.replace(/import\s+type\s+{[^}]+}\s+from\s+['"][^'"]+['"];?/g, "");

  // Optionally remove TS-only syntax like "as const"
  code = code.replace(/\s+as\s+const/g, "");

  if (code !== original) {
    fs.writeFileSync(filePath, code, "utf8");
    console.log(`✔ Fixed: ${filePath}`);
  }
}

scanDir(targetDir);
