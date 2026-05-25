import { useEffect, Fragment, useState } from "react";
import { CursorFollower } from "./hooksAndUi";
import { DropCaseStudies } from "./DropCaseStudies";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropHero } from "./DropHero";
import { DropManifesto } from "./DropManifesto";
import { DropNewsletter } from "./DropNewsletter";
import { DropNumbers } from "./DropNumbers";
import { DropProcess } from "./DropProcess";
import { DropSectors } from "./DropSectors";
import { DropServices } from "./DropServices";
import { DropValues } from "./DropValues";

export function DropHomepageApp() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    if (intro) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [intro]);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Fragment>
      <CursorFollower />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "var(--drop-teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: intro ? "auto" : "none",
          transform: intro ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 1.1s cubic-bezier(.76,0,.24,1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            opacity: intro ? 1 : 0,
            transform: intro ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity .6s var(--ease), transform .8s var(--ease)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(80px, 18vw, 200px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              position: "relative",
            }}
          >
            <span style={{ display: "inline-block", animation: "introIn 1.1s cubic-bezier(.2,.7,.2,1) both" }}>
              dr<span style={{ color: "var(--drop-orange)" }}>o</span>p
            </span>
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              opacity: 0,
              animation: "introIn 1.1s cubic-bezier(.2,.7,.2,1) .4s both",
            }}
          >
            Agenzia · Marketing &amp; Comunicazione · Settore primario
          </div>
        </div>
      </div>

      <DropHeader />

      <main>
        <DropHero />
        <DropManifesto />
        <DropServices />
        <DropSectors />
        <DropNumbers />
        <DropProcess />
        <DropValues />
        <DropCaseStudies />
        <DropNewsletter />
      </main>

      <DropFooter />

      <style>{`
        @keyframes introIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Fragment>
  );
}
