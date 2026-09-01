#!/usr/bin/env node
/** GitHub Pages: serve index.html for unknown paths via 404.html (SPA client routing). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const index = path.join(dist, "index.html");
const fallback = path.join(dist, "404.html");

if (!fs.existsSync(index)) {
  console.error("copy-spa-fallback: dist/index.html not found — run vite build first.");
  process.exit(1);
}

fs.copyFileSync(index, fallback);
console.log("copy-spa-fallback: dist/404.html ← index.html");
