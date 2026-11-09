/** Link verso home + sezione; utile dalle sottopagine con base Vite (`/digitaldrop/` su GitHub Pages). */
export function homeHash(fragmentId: string): string {
  const id = fragmentId.replace(/^#/, "");
  return `${import.meta.env.BASE_URL}#${id}`;
}

/** Confronta path con o senza slash finale. La root resta `/`. */
export function withoutTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname;
}

/** Scheda progetto (`/projects/agrovit/`), non l'archivio `/projects/`. */
export function isProjectDetailPath(pathname: string): boolean {
  return withoutTrailingSlash(pathname).startsWith("/projects/");
}

function pagePath(route: string): string {
  let normalized = route.startsWith("/") ? route : `/${route}`;
  if (!normalized.endsWith("/")) normalized = `${normalized}/`;
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
