import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    _iub?: { load?: () => void };
  }
}

/** Riesegue il binding degli embed Iubenda dopo navigazione SPA. */
export function useIubendaEmbed() {
  const location = useLocation();

  useEffect(() => {
    window._iub?.load?.();
  }, [location.pathname, location.hash]);
}
