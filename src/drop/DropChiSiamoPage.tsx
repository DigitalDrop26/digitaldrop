import { Fragment, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropManifesto } from "./DropManifesto";
import { DropNewsletter } from "./DropNewsletter";
import { DropPageHero } from "./DropPageHero";
import { DropTeam } from "./DropTeam";
import { DropValues } from "./DropValues";
import { CursorFollower, useReveal } from "./hooksAndUi";

/** Pagina Chi siamo — manifesto e principi non negoziabili. */
export function DropChiSiamoPage() {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();
  useReveal(mainRef);

  useEffect(() => {
    const prev = document.title;
    document.title = "Chi siamo · Drop";
    return () => {
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    const id = location.hash.replace(/^#/, "");
    if (!id) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const t = window.setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <Fragment>
      <CursorFollower />
      <DropHeader logoSubtitle="Chi siamo" />

      <main id="top" ref={mainRef}>
        <DropPageHero
          title={
            <>
              <div className="line-reveal" data-idx={0}>
                <span>Dentro al settore</span>
              </div>
              <div className="line-reveal" data-idx={1}>
                <span>
                  da <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>sempre</em>.
                </span>
              </div>
            </>
          }
          subtitle={
            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 20px)",
                lineHeight: 1.55,
                color: "var(--ink)",
                fontWeight: 500,
                margin: 0,
              }}
            >
              DROP è l&apos;agenzia di marketing e comunicazione che parla la lingua dell&apos;agrifood. Non
              perché l&apos;abbiamo studiata — perché ci siamo dentro dal{" "}
              <span style={{ color: "var(--drop-orange)", fontWeight: 700 }}>1998</span>.
            </p>
          }
        />
        <DropTeam />
        <DropValues />
        <DropManifesto />
        <DropNewsletter />
      </main>

      <DropFooter />
    </Fragment>
  );
}
