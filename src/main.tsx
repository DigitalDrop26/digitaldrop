import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/tokens.css";
import "./styles/global.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error('Elemento "#root" non trovato in index.html');
}

try {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (err) {
  console.error(err);
  container.innerHTML =
    '<p style="font-family:system-ui;padding:2rem;color:#005279">Si è verificato un errore avviando l’app. Apri la console del browser (F12) per i dettagli.</p>';
}
