import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "./App";

export { notFoundSeo, publicRoutes, SITE_ORIGIN } from "./seo/routes";
export { redirects } from "./seo/redirects";

/** HTML della pagina per il prerender. Niente fetch a runtime: solo stringa statica. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
