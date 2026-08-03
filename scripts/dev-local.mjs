/**
 * Avvia Vite da una copia locale del progetto (fuori Dropbox/iCloud).
 * Dropbox blocca spesso le letture file → ETIMEDOUT su `npm run dev`.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(os.homedir(), "Projects", "digitaldrop-dev");

const rsyncArgs = [
  "-a",
  "--delete",
  "--exclude",
  "node_modules",
  "--exclude",
  "dist",
  "--exclude",
  ".git",
  "--exclude",
  ".tmp-*",
  `${root}/`,
  `${target}/`,
];

console.log(`\n→ Sincronizzo il progetto in:\n  ${target}\n  (cartella locale, fuori da Dropbox)\n`);

mkdirSync(path.dirname(target), { recursive: true });

const rsync = spawnSync("rsync", rsyncArgs, { stdio: "inherit" });
if (rsync.status !== 0) {
  console.error("\nErrore rsync. Verifica che rsync sia installato (macOS: xcode-select --install).\n");
  process.exit(rsync.status ?? 1);
}

if (!existsSync(path.join(target, "node_modules"))) {
  console.log("\n→ Prima esecuzione: npm ci nella cartella locale…\n");
  const ci = spawnSync("npm", ["ci"], { cwd: target, stdio: "inherit", shell: true });
  if (ci.status !== 0) process.exit(ci.status ?? 1);
}

console.log("\n→ Avvio Vite dalla copia locale…\n");

const dev = spawn("npm", ["run", "dev"], {
  cwd: target,
  stdio: "inherit",
  shell: true,
});

dev.on("exit", (code) => process.exit(code ?? 0));
