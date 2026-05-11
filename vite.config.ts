import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages (repository `digitaldrop`): https://<org>.github.io/digitaldrop/ */
const GITHUB_PAGES_BASE = "/digitaldrop/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? GITHUB_PAGES_BASE : "/",
  plugins: [react()],
}));
