#!/usr/bin/env node
/**
 * Dopo la build client (dist/) e la build SSR (dist-ssr/), scrive un HTML
 * completo per ogni pagina pubblica, i redirect statici, la 404 e la sitemap.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

process.env.NODE_ENV = "production";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

if (!fs.existsSync(ssrEntry)) {
  console.error("prerender: dist-ssr/entry-server.js missing — run the SSR build first.");
  process.exit(1);
}

const templatePath = path.join(dist, "index.html");
const template = fs.readFileSync(templatePath, "utf8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  console.error("prerender: index.html is missing <!--app-html--> or <!--app-head-->.");
  process.exit(1);
}

const { render, publicRoutes, redirects, SITE_ORIGIN, notFoundSeo } = await import(pathToFileURL(ssrEntry).href);

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function escapeText(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function absoluteUrl(pathname) {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    throw new Error(`Invalid path: ${pathname}`);
  }
  return new URL(pathname, `${SITE_ORIGIN}/`).href;
}

function absoluteAsset(url) {
  if (/^https?:\/\//i.test(url)) return url;
  return new URL(url, `${SITE_ORIGIN}/`).href;
}

function replaceTitle(html, title) {
  const next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`);
  const count = next.match(/<title>[\s\S]*?<\/title>/g)?.length ?? 0;
  if (count !== 1) throw new Error(`Expected 1 <title>, found ${count}`);
  return next;
}

function replaceDescription(html, description) {
  const re = /<meta\b[^>]*\bname=["']description["'][^>]*>/i;
  if (!re.test(html)) throw new Error("Template is missing meta description");
  const tag = `<meta name="description" content="${escapeAttr(description)}" />`;
  const next = html.replace(re, tag);
  const count = next.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi)?.length ?? 0;
  if (count !== 1) throw new Error(`Expected 1 meta description, found ${count}`);
  return next;
}

function injectHead(html, tags) {
  if (!html.includes("<!--app-head-->")) throw new Error("Missing <!--app-head-->");
  return html.replace("<!--app-head-->", tags.join("\n    "));
}

function pageFile(routePath) {
  if (routePath === "/") return path.join(dist, "index.html");
  const rel = routePath.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!rel || rel.includes("..")) throw new Error(`Bad route path: ${routePath}`);
  return path.join(dist, rel, "index.html");
}

function writeInsideDist(file, contents) {
  const resolved = path.resolve(file);
  if (resolved !== dist && !resolved.startsWith(`${dist}${path.sep}`)) {
    throw new Error(`Refusing to write outside dist: ${resolved}`);
  }
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, contents);
}

function socialTags({ title, description, canonical, image }) {
  return [
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
}

function renderPage(url, { title, description, canonical, image, robots }) {
  const appHtml = render(url);
  if (!appHtml.includes("<h1")) throw new Error(`Rendered HTML has no H1 for ${url}`);
  let html = template.replace("<!--app-html-->", appHtml);
  if (html.includes("<!--app-html-->")) throw new Error("<!--app-html--> was not replaced");
  html = replaceTitle(html, title);
  html = replaceDescription(html, description);
  const tags = [];
  if (canonical && image) tags.push(...socialTags({ title, description, canonical, image }));
  if (robots) tags.push(`<meta name="robots" content="${escapeAttr(robots)}" />`);
  html = injectHead(html, tags);
  const iubendaInTemplate = template.match(/cdn\.iubenda\.com/g)?.length ?? 0;
  const iubendaInPage = html.match(/cdn\.iubenda\.com/g)?.length ?? 0;
  if (iubendaInPage !== iubendaInTemplate) {
    throw new Error(`Iubenda scripts duplicated or dropped for ${url}`);
  }
  return html;
}

function assetPathFromUrl(url) {
  const pathname = new URL(url, `${SITE_ORIGIN}/`).pathname;
  return decodeURIComponent(pathname);
}

function ensureReferencedAssets(html) {
  const urls = new Set();
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) urls.add(match[1]);
  for (const match of html.matchAll(/content=["']([^"']*\/assets\/[^"']+)["']/g)) urls.add(match[1]);
  for (const url of urls) {
    if (!url.includes("/assets/")) continue;
    const rel = assetPathFromUrl(url).replace(/^\//, "");
    const dest = path.join(dist, rel);
    if (fs.existsSync(dest)) continue;
    const fromSsr = path.join(root, "dist-ssr", rel);
    if (!fs.existsSync(fromSsr)) throw new Error(`Missing asset in dist: /${rel}`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(fromSsr, dest);
    console.log(`prerender: copied /${rel} from SSR build`);
  }
}

const publicPaths = new Set(publicRoutes.map((route) => route.path));

for (const route of publicRoutes) {
  const canonical = absoluteUrl(route.path);
  const html = renderPage(route.path, {
    title: route.title,
    description: route.description,
    canonical,
    image: absoluteAsset(route.ogImage),
  });
  ensureReferencedAssets(html);
  writeInsideDist(pageFile(route.path), html);
  console.log(`prerender: ${route.path} → ${path.relative(root, pageFile(route.path))}`);
}

const notFoundHtml = renderPage("/__pagina-non-trovata", {
  title: notFoundSeo.title,
  description: notFoundSeo.description,
  robots: "noindex",
});
ensureReferencedAssets(notFoundHtml);
writeInsideDist(path.join(dist, "404.html"), notFoundHtml);
console.log("prerender: /__pagina-non-trovata → dist/404.html");

for (const redirect of redirects) {
  if (publicPaths.has(redirect.from)) throw new Error(`Redirect overlaps a public route: ${redirect.from}`);
  if (!redirect.from.endsWith("/") || redirect.from === "/") throw new Error(`Bad redirect path: ${redirect.from}`);
  const target = absoluteUrl(redirect.to);
  const href = escapeAttr(target);
  const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8" />
<link rel="canonical" href="${href}" />
<meta http-equiv="refresh" content="0; url=${href}" />
<script>location.replace(${JSON.stringify(target)})</script>
<title>Reindirizzamento</title>
</head>
<body>
<p><a href="${href}">Vai alla pagina</a></p>
</body>
</html>
`;
  if (/iubenda|googletagmanager|gtag/i.test(html)) {
    throw new Error(`Redirect HTML picked up third-party scripts: ${redirect.from}`);
  }
  const file = pageFile(redirect.from);
  writeInsideDist(file, html);
  console.log(`prerender: redirect ${redirect.from} → ${target}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .map((route) => `  <url>\n    <loc>${escapeText(absoluteUrl(route.path))}</loc>\n  </url>`)
  .join("\n")}
</urlset>
`;
writeInsideDist(path.join(dist, "sitemap.xml"), sitemap);
console.log("prerender: dist/sitemap.xml");

const cname = path.join(dist, "CNAME");
if (!fs.existsSync(cname)) {
  console.error("prerender: dist/CNAME missing — Vite should copy public/CNAME.");
  process.exit(1);
}
console.log(`prerender: CNAME → ${fs.readFileSync(cname, "utf8").trim()}`);
