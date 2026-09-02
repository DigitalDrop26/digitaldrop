declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Override con `.env.local`: VITE_GTM_ID=GTM-… (default: container Drop). */
export const GTM_ID =
  import.meta.env.VITE_GTM_ID?.trim() || "GTM-5HR85JBC";

export function isGtmEnabled(): boolean {
  return /^GTM-[A-Z0-9]+$/i.test(GTM_ID);
}

export function initGtm(): void {
  if (!isGtmEnabled() || typeof document === "undefined") return;
  if (document.getElementById("gtm-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  if (!document.getElementById("gtm-noscript")) {
    const noscript = document.createElement("noscript");
    noscript.id = "gtm-noscript";
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}

/** Page view su navigazione client-side (React Router). */
export function gtmPageView(pagePath: string): void {
  if (!isGtmEnabled()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: pagePath,
  });
}
