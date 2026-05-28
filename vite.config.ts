import path from "node:path";
import os from "node:os";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages (repository `digitaldrop`): https://<org>.github.io/digitaldrop/ */
const GITHUB_PAGES_BASE = "/digitaldrop/";

/** Keep esbuild/transform cache OFF Dropbox — cloud sync locking often wedges Vite (connects hang, no HTTP bytes). */
const VITE_CACHE_DIR = path.join(os.tmpdir(), "digitaldrop-site-vite-cache");

export default defineConfig(({ command, isPreview }) => ({
  cacheDir: VITE_CACHE_DIR,
  /** Dev: `/`. Build + `vite preview`: same base as GitHub Pages so local preview matches production. */
  base: command === "build" || isPreview ? GITHUB_PAGES_BASE : "/",
  resolve: {
    alias: {
      /** Cartella progetto `@Immagini/...` (es. `@Immagini/Sfondo_hero.jpg`). */
      "@Immagini": path.resolve(__dirname, "Immagini"),
    },
  },
  plugins: [react()],
  server: {
    /** `true`: risponde sia su localhost (IPv6 (::1)) che su 127.0.0.1 — evita “non carica” solo con uno dei due hostname. */
    host: true,
    port: 5173,
    strictPort: false,
    fs: {
      cachedChecks: false,
    },
    /** Dropbox/iCloud/network drives — polling stabilizza il watcher. */
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
  },
}));
