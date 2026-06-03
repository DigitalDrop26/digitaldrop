/** Link verso home + sezione; utile dalle sottopagine con base Vite (`/digitaldrop/` su GitHub Pages). */
export function homeHash(fragmentId: string): string {
  const id = fragmentId.replace(/^#/, "");
  return `${import.meta.env.BASE_URL}#${id}`;
}

/** Percorso pagina Chi siamo (compatibile con `BASE_URL` su GitHub Pages). */
export function chiSiamoPath(): string {
  const base = import.meta.env.BASE_URL;
  if (base === "/" || base === "./") return "/chi-siamo";
  const root = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${root}/chi-siamo`;
}
