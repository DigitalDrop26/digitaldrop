/** Selettori DOM di modali / banner Iubenda (iniettati a runtime). */
const IUBENDA_ROOT_SELECTOR = [
  "#iubenda-iframe",
  "#iubenda-iframe-popup",
  "#iubenda-cs-banner",
  ".iubenda-cs-container",
  "#iubenda-iframe-wrapper",
  '[id^="iubenda-"]',
].join(", ");

export function isIubendaScrollNode(node: EventTarget | null): boolean {
  if (!(node instanceof HTMLElement)) return false;
  return Boolean(node.closest(IUBENDA_ROOT_SELECTOR));
}

/** Applica fix scroll su modale policy / preferenze cookie. */
export function patchIubendaScrollTargets(): void {
  document.querySelectorAll(IUBENDA_ROOT_SELECTOR).forEach((el) => {
    if (el instanceof HTMLElement) {
      el.setAttribute("data-lenis-prevent", "");
    }
  });

  const popup = document.getElementById("iubenda-iframe-popup");
  if (popup instanceof HTMLElement) {
    popup.setAttribute("data-lenis-prevent", "");
    popup.style.overflowY = "auto";
    popup.style.maxHeight = "min(900px, 99vh)";
    popup.style.setProperty("-webkit-overflow-scrolling", "touch");
  }

  syncLenisWithIubendaOverlay();
}

function syncLenisWithIubendaOverlay(): void {
  const lenis = window.__lenis;
  if (!lenis) return;

  const modalOpen = Boolean(document.getElementById("iubenda-iframe"));
  const bannerOpen = Boolean(document.getElementById("iubenda-cs-banner"));

  if (modalOpen || bannerOpen) lenis.stop();
  else lenis.start();
}

function tagIubendaScrollRoots(root: ParentNode): void {
  root.querySelectorAll(IUBENDA_ROOT_SELECTOR).forEach((el) => {
    if (el instanceof HTMLElement && !el.hasAttribute("data-lenis-prevent")) {
      el.setAttribute("data-lenis-prevent", "");
    }
  });
}

let bridgeStarted = false;

/**
 * Iubenda inietta modali/iframe dopo il load: Lenis intercetta wheel/touch
 * salvo esclusione esplicita (vedi issue Lenis #451).
 */
export function initIubendaLenisBridge(): void {
  if (typeof document === "undefined" || bridgeStarted) return;
  bridgeStarted = true;

  tagIubendaScrollRoots(document);

  const observer = new MutationObserver((mutations) => {
    let iubendaChanged = false;

    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(IUBENDA_ROOT_SELECTOR) || isIubendaScrollNode(node)) {
          iubendaChanged = true;
        }
        tagIubendaScrollRoots(node);
      });

      mutation.removedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(IUBENDA_ROOT_SELECTOR) || node.id?.startsWith("iubenda")) {
          iubendaChanged = true;
        }
      });
    }

    if (iubendaChanged) patchIubendaScrollTargets();
  });

  const startObserver = () => {
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.body) startObserver();
  else document.addEventListener("DOMContentLoaded", startObserver);
}

declare global {
  interface Window {
    /** Callback richiamabile dallo snippet Iubenda in index.html */
    __patchIubendaScroll?: () => void;
  }
}

if (typeof window !== "undefined") {
  window.__patchIubendaScroll = patchIubendaScrollTargets;
}
