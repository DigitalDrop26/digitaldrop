import { useEffect, useLayoutEffect, useRef, useState } from "react";
import sfondoHeroSrc from "@Immagini/Sfondo_hero.jpg?url";
import { useReveal, useScrollY } from "./hooksAndUi";

const ARCHIVE_PLACES = [
  "in cantina",
  "in stalla",
  "in campo",
  "in caseificio",
  "in frantoio",
  "in vigna",
  "in cooperativa",
  "in mangimificio",
  "in serra",
  "in oleificio",
  "in salumificio",
  "in distilleria",
] as const;

const PLACE_TICK_MS = 4000;

function formatPlaceLabel(raw: string) {
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function ArchivePlaceTicker() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [stepPx, setStepPx] = useState(0);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      setStepPx(Math.ceil(el.getBoundingClientRect().height));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || stepPx <= 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ARCHIVE_PLACES.length);
    }, PLACE_TICK_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, stepPx]);

  const place = formatPlaceLabel(ARCHIVE_PLACES[index]);
  const lineStyle = stepPx > 0 ? { height: stepPx } : undefined;

  if (reduceMotion) {
    return (
      <span className="archive-hero-line archive-hero-line--place" style={lineStyle}>
        <em className="italic-serif archive-place-word" style={{ color: "var(--drop-orange)" }}>
          {formatPlaceLabel(ARCHIVE_PLACES[0])}
        </em>
      </span>
    );
  }

  return (
    <span
      className="archive-hero-line archive-hero-line--place archive-place-ticker"
      aria-live="polite"
      style={lineStyle}
    >
      <span ref={measureRef} className="archive-place-ticker-measure" aria-hidden>
        <span className="archive-place-ticker-line">
          <em className="italic-serif archive-place-word" style={{ color: "var(--drop-orange)" }}>
            {formatPlaceLabel("in mangimificio")}
          </em>
        </span>
      </span>

      <span className="archive-place-ticker-viewport" style={lineStyle}>
        <span
          className="archive-place-ticker-track"
          style={{
            transform: stepPx > 0 ? `translate3d(0, -${index * stepPx}px, 0)` : undefined,
          }}
        >
          {ARCHIVE_PLACES.map((line) => (
            <span key={line} className="archive-place-ticker-line" style={lineStyle}>
              <em className="italic-serif archive-place-word" style={{ color: "var(--drop-orange)" }}>
                {formatPlaceLabel(line)}
              </em>
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">{place}</span>
    </span>
  );
}

/** Hero archivio progetti — fold con titolo animato. */
export function DropProjectsArchiveHero() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);
  const y = useScrollY();

  const titleTransform = `translate3d(0, ${Math.min(y * -0.08, 60)}px, 0)`;
  const fadeOnScroll = Math.max(0, 1 - y / 600);

  return (
    <section
      ref={rootRef}
      className="hero-fold archive-hero-fold"
      aria-label="Intro archivio progetti"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        paddingTop: "clamp(100px, 12vh, 180px)",
        paddingBottom: "clamp(28px, 5vh, 64px)",
        overflowX: "hidden",
        overflowY: "visible",
        backgroundColor: "var(--paper-warm)",
        backgroundImage: `url(${sfondoHeroSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(105deg, rgba(250,247,242,0.88) 0%, rgba(250,247,242,0.72) min(42vw, 52%), rgba(250,247,242,0.42) 68%, rgba(250,247,242,0.12) 100%)",
        }}
      />

      <div
        className="container-wide"
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          justifyContent: "space-between",
          gap: "clamp(16px, 3vh, 32px)",
        }}
      >
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
            transform: titleTransform,
            willChange: "transform",
          }}
        >
          <div className="reveal" data-idx={0}>
            <span className="eyebrow">Archivio · Progetti</span>
          </div>
          <h1 className="display display-lg archive-hero-title reveal" data-idx={1}>
            <span className="archive-hero-line">
              Quello che facciamo.
            </span>
            <ArchivePlaceTicker />
            <span className="archive-hero-line">e in agenzia.</span>
          </h1>
        </div>

        <div className="hero-bottom reveal" data-idx={2} style={{ flexShrink: 0, maxWidth: 560 }}>
          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Case study, campagne e identità per il settore primario — filtra per area di competenza.
          </p>
        </div>

        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: "clamp(20px, 3.5vh, 44px)",
            color: "var(--teal-500)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: fadeOnScroll,
            transition: "opacity 0.3s linear",
          }}
        >
          <div
            style={{
              width: 1,
              height: 56,
              background: "linear-gradient(180deg, var(--drop-orange) 0%, transparent 100%)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
