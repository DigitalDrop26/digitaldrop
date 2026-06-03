import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DropHomepageApp } from "./drop/DropHomepageApp";
import { DropProjectAgrovitPage } from "./drop/DropProjectAgrovitPage";
import { DropProjectAlivePage } from "./drop/DropProjectAlivePage";
import { DropProjectGiocoDiSquadraPage } from "./drop/DropProjectGiocoDiSquadraPage";
import { DropProjectsArchivePage } from "./drop/DropProjectsArchivePage";

/** Normalizza `import.meta.env.BASE_URL` (es. `/digitaldrop/` → `/digitaldrop`). */
function basenameFromEnv(): string | undefined {
  const raw = import.meta.env.BASE_URL;
  if (raw === "/" || raw === "./") return undefined;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

/**
 * BrowserRouter richiede che `pathname` cominci col basename configurato dal build.
 * In anteprima o su server serviti sulla root è possibile aprire `/` mentre il build
 * ha ancora `base: '/digitaldrop/'`: in quel caso NON passiamo basename così `/` coincide con la route `/`.
 * In produzione su GitHub Pages l’URL reale sarà comunque `/digitaldrop/…` e basename resta corretto.
 */
function routerBasename(): string | undefined {
  const configured = basenameFromEnv();
  if (!configured) return undefined;
  if (typeof window === "undefined") return configured;
  const { pathname } = window.location;
  if (pathname === configured || pathname.startsWith(`${configured}/`)) return configured;
  return undefined;
}

export default function App() {
  const basename = routerBasename();

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<DropHomepageApp />} />
        <Route path="/projects" element={<DropProjectsArchivePage />} />
        <Route path="/projects/alive" element={<DropProjectAlivePage />} />
        <Route path="/projects/gioco-di-squadra" element={<DropProjectGiocoDiSquadraPage />} />
        <Route path="/projects/agrovit" element={<DropProjectAgrovitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
