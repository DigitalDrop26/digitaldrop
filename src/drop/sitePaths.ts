/** Link verso home + sezione; utile dalle sottopagine con base Vite (`/digitaldrop/` su GitHub Pages). */
export function homeHash(fragmentId: string): string {
  const id = fragmentId.replace(/^#/, "");
  return `${import.meta.env.BASE_URL}#${id}`;
}
