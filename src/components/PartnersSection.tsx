import { useRef, useEffect, useCallback } from "react";
import styles from "./PartnersSection.module.css";

const PARTNER_COUNT = 8;
/** px per frame (~60fps → ~24px/s con increment0.4) */
const AUTO_SCROLL_STEP = 0.4;
const MANUAL_PAUSE_MS = 4500;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d={dir === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverPausedRef = useRef(false);
  const manualPauseUntilRef = useRef(0);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    manualPauseUntilRef.current = performance.now() + MANUAL_PAUSE_MS;
    const card = el.querySelector<HTMLElement>("[data-partner-tile]");
    const gapStr = getComputedStyle(el).gap;
    const gapParsed = gapStr ? parseFloat(gapStr) : NaN;
    const gap = Number.isFinite(gapParsed) ? gapParsed : 24;
    const delta = (card?.offsetWidth ?? 160) + gap;
    el.scrollBy({ left: direction * delta, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const el = trackRef.current;
      if (el) {
        const now = performance.now();
        const manualPause = now < manualPauseUntilRef.current;
        if (!hoverPausedRef.current && !manualPause) {
          const half = el.scrollWidth / 2;
          if (half > 1) {
            el.scrollLeft += AUTO_SCROLL_STEP;
            if (el.scrollLeft >= half - 1) {
              el.scrollLeft -= half;
            }
          }
        }
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = Array.from({ length: PARTNER_COUNT * 2 }, (_, i) => (
    <div key={i} data-partner-tile className={styles.logoCard} aria-hidden />
  ));

  return (
    <section className={`section ${styles.section}`} aria-labelledby="partners-heading">
      <div className="container">
        <h2 id="partners-heading" className={`h2-visual ${styles.head}`}>
          Un viaggio condiviso
        </h2>
        <div
          className={styles.trackWrap}
          onMouseEnter={() => {
            hoverPausedRef.current = true;
          }}
          onMouseLeave={() => {
            hoverPausedRef.current = false;
          }}
        >
          <button
            type="button"
            className={styles.arrowBtn}
            aria-label="Scorri partner indietro"
            onClick={() => scrollByCard(-1)}
          >
            <Chevron dir="left" />
          </button>
          <div
            ref={trackRef}
            className={styles.track}
            aria-label="Loghi partner, scorrimento automatico"
          >
            {tiles}
          </div>
          <button
            type="button"
            className={styles.arrowBtn}
            aria-label="Scorri partner avanti"
            onClick={() => scrollByCard(1)}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
