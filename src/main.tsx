import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { initLenis } from "./drop/hooksAndUi";
import { initIubendaLenisBridge } from "./drop/iubendaLenis";
import "./styles/drop-homepage.css";

initIubendaLenisBridge();
initLenis();

const container = document.getElementById("root");
if (!container) {
  throw new Error('Elemento "#root" non trovato in index.html');
}

/** Il commento <!--app-html--> in dev non è markup: in quel caso si monta da zero. */
function rootHasServerMarkup(root: HTMLElement): boolean {
  return Array.from(root.childNodes).some((node) => node.nodeType === Node.ELEMENT_NODE);
}

try {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (rootHasServerMarkup(container)) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
} catch (err) {
  console.error(err);
  container.innerHTML =
    '<p style="font-family:system-ui;padding:2rem;color:#005279">Si è verificato un errore avviando l’app. Apri la console del browser (F12) per i dettagli.</p>';
}
