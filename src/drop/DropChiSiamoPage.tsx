import { Fragment, useEffect, useRef } from "react";
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
  useReveal(mainRef);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Chi siamo · Drop";
    return () => {
      document.title = prev;
    };
  }, []);

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

      <DropFooter anchorsResolveHome />
    </Fragment>
  );
}
