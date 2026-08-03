/** Link verso home + sezione; utile dalle sottopagine con base Vite (`/digitaldrop/` su GitHub Pages). */
export function homeHash(fragmentId: string): string {
  const id = fragmentId.replace(/^#/, "");
  return `${import.meta.env.BASE_URL}#${id}`;
}

function pagePath(route: string): string {
  const normalized = route.startsWith("/") ? route : `/${route}`;
  const base = import.meta.env.BASE_URL;
  if (base === "/" || base === "./") return normalized;
  const root = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${root}${normalized}`;
}

/** Percorso pagina Chi siamo (compatibile con `BASE_URL` su GitHub Pages). */
export function chiSiamoPath(): string {
  return pagePath("/chi-siamo");
}

/** Percorso archivio progetti. */
export function projectsPath(): string {
  return pagePath("/projects");
}

/** Sezione sulla pagina Chi siamo (es. team, valori). */
export function chiSiamoHash(fragmentId: string): string {
  const id = fragmentId.replace(/^#/, "");
  return `${chiSiamoPath()}#${id}`;
}
