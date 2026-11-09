import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DropChiSiamoPage } from "./drop/DropChiSiamoPage";
import { DropHomepageApp } from "./drop/DropHomepageApp";
import { DropNotFoundPage } from "./drop/DropNotFoundPage";
import { DropProjectAgrovitPage } from "./drop/DropProjectAgrovitPage";
import { DropProjectAllevaPrPage } from "./drop/DropProjectAllevaPrPage";
import { DropProjectAnafibjPage } from "./drop/DropProjectAnafibjPage";
import { DropProjectAstaCremonaPage } from "./drop/DropProjectAstaCremonaPage";
import { DropProjectsArchivePage } from "./drop/DropProjectsArchivePage";
import { GtmPageView } from "./drop/GtmPageView";

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

export function AppRoutes() {
  return (
    <>
      <GtmPageView />
      <Routes>
        <Route path="/" element={<DropHomepageApp />} />
        <Route path="/chi-siamo" element={<DropChiSiamoPage />} />
        <Route path="/projects" element={<DropProjectsArchivePage />} />
        <Route path="/projects/agrovit" element={<DropProjectAgrovitPage />} />
        <Route path="/projects/fiera-cremona" element={<DropProjectAstaCremonaPage />} />
        <Route path="/projects/alleva-pr" element={<DropProjectAllevaPrPage />} />
        <Route path="/projects/anafibj" element={<DropProjectAnafibjPage />} />
        <Route path="*" element={<DropNotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  const basename = routerBasename();

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}
