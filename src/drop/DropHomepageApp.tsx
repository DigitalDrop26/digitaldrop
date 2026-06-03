import { useEffect, Fragment, useState, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { bundleResources } from "./bundleResources";
import { CursorFollower } from "./hooksAndUi";
import { DropCaseStudies } from "./DropCaseStudies";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropHero } from "./DropHero";
import { DropNewsletter } from "./DropNewsletter";
import { DropProcess } from "./DropProcess";
import { DropSectors } from "./DropSectors";
import { DropServices } from "./DropServices";

export function DropHomepageApp() {
  const [intro, setIntro] = useState(true);
  const location = useLocation();
  const introStackRef = useRef<HTMLDivElement>(null);
  const introSubtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const stack = introStackRef.current;
    const subtitle = introSubtitleRef.current;
    if (!stack || !subtitle) return;

    const fitSubtitle = () => {
      const maxWidth = stack.clientWidth;
      if (maxWidth <= 0) return;

      subtitle.style.whiteSpace = "nowrap";
      let min = 8;
      let max = 96;
      while (min < max) {
        const mid = Math.ceil((min + max) / 2);
        subtitle.style.fontSize = `${mid}px`;
        if (subtitle.scrollWidth <= maxWidth) min = mid;
        else max = mid - 1;
      }
      subtitle.style.fontSize = `${min}px`;
    };

    fitSubtitle();
    const ro = new ResizeObserver(fitSubtitle);
    ro.observe(stack);
    void document.fonts?.ready.then(fitSubtitle);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (intro) {
      document.body.classList.add("is-intro-loading");
    } else {
      document.body.classList.remove("is-intro-loading");
    }
    return () => {
      document.body.classList.remove("is-intro-loading");
    };
  }, [intro]);

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

  /** Scroll alla sezione quando si arriva da sottopagine con hash (es. menu header archivio). */
  useEffect(() => {
    if (intro) return;
    const id = location.hash.replace(/^#/, "");
    if (!id) return;
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
  }, [intro, location.hash]);

  return (
    <Fragment>
      <CursorFollower />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10300,
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
          ref={introStackRef}
          style={{
            width: "min(88vw, 440px)",
            margin: "0 auto",
            textAlign: "center",
            color: "white",
            opacity: intro ? 1 : 0,
            transform: intro ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity .6s var(--ease), transform .8s var(--ease)",
          }}
        >
          <div
            className="intro-splash-logo"
            style={{
              position: "relative",
              width: "100%",
              lineHeight: 0,
            }}
          >
            {/* Cerchi pulsanti sulla O — centro da viewBox SVG 385.57 × 111.49 */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: `${(245.98 / 385.57) * 100}%`,
                top: `${(55.74 / 111.49) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: `${(111.48 / 385.57) * 100}%`,
                aspectRatio: "1",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className={`intro-o-ripple intro-o-ripple--${i}`} />
              ))}
            </div>
            <img
              src={bundleResources.logoWhiteOrange}
              alt="Drop"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "auto",
                display: "block",
                animation: "introIn 1.1s cubic-bezier(.2,.7,.2,1) both",
              }}
            />
          </div>
          <p
            ref={introSubtitleRef}
            className="intro-splash-subtitle"
            style={{
              width: "100%",
              marginTop: 24,
              marginBottom: 0,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
              opacity: 0,
              animation: "introIn 1.1s cubic-bezier(.2,.7,.2,1) .4s both",
            }}
          >
            Marketing e comunicazione
          </p>
        </div>
      </div>

      <DropHeader />

      <main>
        <DropHero />
        <DropSectors />
        <DropServices />
        <DropProcess />
        <DropCaseStudies />
        <DropNewsletter />
      </main>

      <DropFooter />

      <style>{`
        @keyframes introIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes introORippleWave {
          0% {
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0.65;
          }
          70% { opacity: 0.12; }
          100% {
            transform: translate(-50%, -50%) scale(3.8);
            opacity: 0;
          }
        }
        .intro-o-ripple {
          position: absolute;
          left: 50%;
          top: 50%;
          box-sizing: border-box;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 2px solid rgba(233, 74, 49, 0.48);
          transform: translate(-50%, -50%);
          animation: introORippleWave 2.15s cubic-bezier(0.28, 0.45, 0.32, 0.95) infinite;
          pointer-events: none;
        }
        .intro-o-ripple--0 { animation-delay: 0s; }
        .intro-o-ripple--1 { animation-delay: 0.55s; }
        .intro-o-ripple--2 { animation-delay: 1.1s; }
      `}</style>
    </Fragment>
  );
}
