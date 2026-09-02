import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gtmPageView, initGtm } from "./gtm";

/** Inizializza GTM e invia page_view ad ogni cambio route. */
export function GtmPageView() {
  const location = useLocation();

  useEffect(() => {
    initGtm();
  }, []);

  useEffect(() => {
    gtmPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location]);

  return null;
}
