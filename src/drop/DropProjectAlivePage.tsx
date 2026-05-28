import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import aliveHeroRollupSrc from "@Immagini/aliveX/Rebranding AliveXperiences_ Lusso Su Misura nel Travel Trade_files/Free_Roll_up_Mockup_3_cf1eef6ee9.png?url";
import aliveCar01 from "@Immagini/aliveX/carosello/01.png?url";
import aliveCar03 from "@Immagini/aliveX/carosello/03.png?url";
import aliveCar04 from "@Immagini/aliveX/carosello/04.png?url";
import aliveCar05 from "@Immagini/aliveX/carosello/05.png?url";
import aliveCar06 from "@Immagini/aliveX/carosello/06.png?url";
import aliveCar07 from "@Immagini/aliveX/carosello/07.png?url";
import aliveCar08 from "@Immagini/aliveX/carosello/08.png?url";
import { DropFooter } from "./DropFooter";
import { DropInnerPageHeader } from "./DropInnerPageHeader";
import { Btn, CursorFollower, Reveal, useReveal, useScrollY } from "./hooksAndUi";
import { homeHash } from "./sitePaths";

/** Con strip duplicata (stesso gruppo ripetuto): riporta `scrollLeft` nel range fisico con salti ±loopPx sulla sutura clone/originale — nessun modulo “fantasma”, riparte come se continuasse a scorrere. */
function reconcileCarouselDuplicateLoop(
  desiredScrollLeft: number,
  loopPx: number,
  maxScrollPx: number,
): { next: number; crossedSeam: boolean } {
  const max = Math.max(0, maxScrollPx);
  if (loopPx <= 8 || max <= 4) return { next: Math.max(0, Math.min(max, desiredScrollLeft)), crossedSeam: false };

  let x = desiredScrollLeft;
  let crossedSeam = false;
  const tol = 4;

  while (x >= loopPx - tol) {
    x -= loopPx;
    crossedSeam = true;
  }
  while (x < 0) {
    x += loopPx;
    crossedSeam = true;
  }
  x = Math.max(0, Math.min(max, x));
  return { next: x, crossedSeam };
}

/** Pagina progetto — contenuti placeholder ispirati al case AliveXperiences sul sito Drop. */
export function DropProjectAlivePage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);
  const yHero = useScrollY();
  const heroScrollFade = Math.max(0, 1 - yHero / 600);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  /** Larghezza (px) della prima sequenza (= seconda è clone): `scrollWidth/2` dopo doppietta nel DOM. */
  const carouselLoopPxRef = useRef(0);
  const carouselDragRef = useRef({ pid: -1 as number, startX: 0, startScroll: 0 });
  /** Stato RAF per rotella/trackpad sul carosello (scorrimento orizzontale dolce). */
  const carouselSmoothStateRef = useRef({ rafId: 0, lerping: false, targetScroll: 0 });
  /** Impostata dall'effect sul track: `(deltaPx) => void` per frecce. */
  const carouselNudgeSmoothRef = useRef<(deltaPx: number) => void>(() => {});
  const [carouselPointerDown, setCarouselPointerDown] = useState(false);
  const carouselPointerDraggingRef = useRef(false);

  const cancelCarouselSmoothWheel = useCallback(() => {
    const s = carouselSmoothStateRef.current;
    if (s.rafId) cancelAnimationFrame(s.rafId);
    s.rafId = 0;
    s.lerping = false;
  }, []);

  const carouselPointerDownCb = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      const track = carouselTrackRef.current;
      if (!track) return;
      cancelCarouselSmoothWheel();
      carouselPointerDraggingRef.current = true;
      carouselSmoothStateRef.current.targetScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      carouselDragRef.current = { pid: e.pointerId, startX: e.clientX, startScroll: track.scrollLeft };
      setCarouselPointerDown(true);
    },
    [cancelCarouselSmoothWheel],
  );

  const carouselPointerMoveCb = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const { pid, startX, startScroll } = carouselDragRef.current;
    if (pid !== e.pointerId) return;
    const el = e.currentTarget;
    const loopPx = carouselLoopPxRef.current;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const dx = e.clientX - startX;
    const desired = startScroll - dx;
    const { next } = reconcileCarouselDuplicateLoop(desired, loopPx, maxScroll);
    el.scrollLeft = next;
    carouselSmoothStateRef.current.targetScroll = next;
  }, []);

  const carouselPointerEndCb = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (carouselDragRef.current.pid !== e.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    carouselDragRef.current = { pid: -1, startX: 0, startScroll: 0 };
    carouselPointerDraggingRef.current = false;
    setCarouselPointerDown(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Alive Xperience · Progetto · Drop";
    return () => {
      document.title = prev;
    };
  }, []);

  /** Metà strip = ciclo contenuti (lista duplicata nel DOM → loop sulla sutura). */
  useLayoutEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const measure = () => {
      carouselLoopPxRef.current = Math.max(16, Math.round(track.scrollWidth / 2));
    };

    measure();
    const imgs = [...track.querySelectorAll("img")] as HTMLImageElement[];

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    imgs.forEach((img) => ro.observe(img));
    imgs.forEach((img) => img.addEventListener("load", measure));

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", measure);
        ro.unobserve(img);
      });
      ro.unobserve(track);
      ro.disconnect();
    };
  }, []);

  /** Rotella/trackpad sul carosello: scorrimento orizzontale continuo senza snap, con interpola RAF. Lenis escluso su `data-lenis-prevent` del contenitore. */
  useEffect(() => {
    const el = carouselTrackRef.current;
    if (!el) return;

    const trackEl = el;

    const s = carouselSmoothStateRef.current;
    s.targetScroll = trackEl.scrollLeft;

    function snapPhysicalToDuplicateSeam() {
      const maxScroll = Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
      const loopPx = carouselLoopPxRef.current;
      const { next } = reconcileCarouselDuplicateLoop(trackEl.scrollLeft, loopPx, maxScroll);
      if (Math.abs(trackEl.scrollLeft - next) > 0.75) {
        trackEl.scrollLeft = next;
      }
      s.targetScroll = next;
    }

    const clampTarget = () => {
      const max = Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
      s.targetScroll = Math.max(0, Math.min(max, s.targetScroll));
    };

    const step = () => {
      s.lerping = true;
      clampTarget();
      const cur = trackEl.scrollLeft;
      const diff = s.targetScroll - cur;
      if (Math.abs(diff) < 0.35) {
        trackEl.scrollLeft = s.targetScroll;
        s.rafId = 0;
        s.lerping = false;
        snapPhysicalToDuplicateSeam();
        return;
      }
      trackEl.scrollLeft = cur + diff * 0.16;
      s.rafId = requestAnimationFrame(step);
    };

    const bump = () => {
      if (!s.rafId) s.rafId = requestAnimationFrame(step);
    };

    carouselNudgeSmoothRef.current = (deltaPx: number) => {
      cancelCarouselSmoothWheel();
      const maxScroll = Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
      const loopPx = carouselLoopPxRef.current;
      const raw = trackEl.scrollLeft + deltaPx;
      const prefersReduceMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { next, crossedSeam } = reconcileCarouselDuplicateLoop(raw, loopPx, maxScroll);
      s.targetScroll = next;

      if (prefersReduceMotion || crossedSeam) {
        trackEl.scrollLeft = next;
        return;
      }

      bump();
    };

    function onWheel(e: WheelEvent) {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const dominantX = absX >= absY * 1.02;
      let dx = dominantX ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (dx === 0 || e.ctrlKey) return;

      e.preventDefault();
      let mul = 1;
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) mul = 14;
      else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) mul = Math.max(trackEl.clientWidth * 0.85, 1);
      const delta = dx * mul;
      const prefersReduceMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const maxScroll = Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
      const loopPx = carouselLoopPxRef.current;
      const rawNext = s.targetScroll + delta;
      const { next, crossedSeam } = reconcileCarouselDuplicateLoop(rawNext, loopPx, maxScroll);

      if (prefersReduceMotion || crossedSeam) {
        cancelCarouselSmoothWheel();
        trackEl.scrollLeft = next;
        s.targetScroll = next;
        return;
      }

      s.targetScroll = next;
      bump();
    }

    function onScroll() {
      if (s.lerping || carouselPointerDraggingRef.current) return;
      snapPhysicalToDuplicateSeam();
    }

    trackEl.addEventListener("wheel", onWheel, { passive: false });
    trackEl.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      carouselNudgeSmoothRef.current = () => {};
      if (s.rafId) cancelAnimationFrame(s.rafId);
      s.rafId = 0;
      s.lerping = false;
      trackEl.removeEventListener("wheel", onWheel);
      trackEl.removeEventListener("scroll", onScroll);
    };
  }, [cancelCarouselSmoothWheel]);

  const aliveCarouselSlides = [
    aliveCar01,
    aliveCar04,
    aliveCar03,
    aliveCar05,
    aliveCar06,
    aliveCar07,
    aliveCar08,
  ] as const;

  const carouselArrowNudgePx = () => {
    const t = carouselTrackRef.current;
    if (!t) return 280;
    return Math.max(200, Math.min(t.clientWidth * 0.78, 560));
  };

  /** Frecce: stesso scroll incrementale degli altri controlli, con modulo loop sui bordi. */
  const carouselPrev = () => {
    carouselNudgeSmoothRef.current(-carouselArrowNudgePx());
  };

  const carouselNext = () => {
    carouselNudgeSmoothRef.current(carouselArrowNudgePx());
  };

  return (
    <Fragment>
      <CursorFollower />
      <DropInnerPageHeader />

      <main id="top" ref={mainRef}>
        {/* Hero — mockup rollup AliveXperiences (fullscreen fold + scroll cue) */}
        <section
          className="alive-project-hero-fold"
          aria-label="Hero progetto Alive Xperience"
          style={{
            position: "relative",
            flexShrink: 0,
            paddingTop: "clamp(92px, 11vh, 150px)",
            paddingBottom: "clamp(18px, 3.5vh, 44px)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundColor: "var(--paper-warm)",
            backgroundImage: `url(${aliveHeroRollupSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                "linear-gradient(165deg, rgba(250,247,242,0.94) 0%, rgba(250,247,242,0.78) min(52%, 620px), rgba(250,247,242,0.35) 72%, rgba(0,62,93,0.22) 100%)",
            }}
          />
          <div
            className="container-wide alive-project-hero-inner"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
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
                minHeight: 0,
              }}
            >
              {/* ~3/4 altezza “vuota”: il contenuto sta nel quartile inferiore della fold */}
              <div aria-hidden style={{ flex: "3 0 0%", minHeight: 0 }} />
              <div
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  minHeight: 0,
                }}
              >
                <Reveal delay={0}>
                <h1
                  className="display display-lg"
                  style={{
                    margin: 0,
                    letterSpacing: "-0.038em",
                    lineHeight: 1.03,
                    color: "var(--drop-teal)",
                    maxWidth: "22ch",
                  }}
                >
                  Alive{" "}
                  <strong style={{ fontWeight: 700, color: "var(--drop-orange)" }}>X</strong>
                  perience
                </h1>
                <p
                  className="alive-project-hero-kicker-line"
                  style={{
                    marginTop: 20,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--teal-500)",
                  }}
                >
                  Strategy / Advertising / Brand Identity — 2025
                </p>
                <p className="alive-project-hero-meta-line" style={{ marginTop: 14, fontWeight: 500, color: "var(--ink)" }}>
                  Progetto realizzato da Drop per Alive Xperience
                </p>
                </Reveal>
              </div>
            </div>

            <div
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: "clamp(8px, 2vh, 24px)",
                color: "var(--teal-500)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                opacity: heroScrollFade,
                transition: "opacity 0.3s linear",
              }}
            >
              <div aria-hidden style={{ display: "flex", alignItems: "center", height: 56 }}>
                <div
                  style={{
                    width: 1,
                    height: "100%",
                    background: "linear-gradient(180deg, var(--drop-orange) 0%, transparent 100%)",
                    animation: "scrollLine 1.8s ease-in-out infinite",
                  }}
                />
              </div>
              <button
                type="button"
                aria-label="Scorri al contenuto del progetto"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  letterSpacing: "inherit",
                  textTransform: "inherit",
                  color: "inherit",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const el = document.getElementById("progetto-sfida");
                  if (!el) return;
                  const lenis = window.__lenis;
                  if (lenis) {
                    lenis.scrollTo(el, { offset: -80, duration: 1.2 });
                  } else {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Scroll
              </button>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section id="progetto-sfida" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">Progetto · La sfida</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Un marchio che{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>racconta</em>
                  {" "}il lusso.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p
                  style={{
                    marginTop: "clamp(32px, 5vw, 56px)",
                    fontSize: 17,
                    lineHeight: 1.65,
                    fontWeight: 500,
                    color: "var(--ink)",
                    maxWidth: "52ch",
                    marginBottom: 0,
                  }}
                >
                  Nel competitivo panorama del{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>travel trade</strong>, AliveXperiences aveva bisogno
                  di un&apos;identità più attuale, capace di esprimere in modo chiaro l&apos;impegno sul{" "}
                  <strong style={{ color: "var(--drop-orange)", fontWeight: 700 }}>lusso tailor-made</strong> e sulla cura dei
                  dettagli in ogni fase del viaggio.
                </p>
                <p
                  style={{
                    marginTop: 24,
                    fontSize: 17,
                    lineHeight: 1.65,
                    fontWeight: 500,
                    color: "var(--ink)",
                    maxWidth: "52ch",
                    marginBottom: 0,
                  }}
                >
                  L&apos;obiettivo era un rebranding che modernizzasse l&apos;immagine del marchio e rafforzasse rapporti autentici
                  con clienti e partner nel trade — con un sistema visivo più coerente e riconoscibile su presentazioni, cartaceo e digitale.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section
          id="progetto-soluzione"
          className="section"
          style={{ background: "var(--paper-tint)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
        >
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">Progetto · La soluzione</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Lusso <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>tailor-made</em>, reso leggibile ovunque.
                </h2>
                <p
                  style={{
                    marginTop: "clamp(32px, 5vw, 56px)",
                    fontSize: 17,
                    lineHeight: 1.72,
                    fontWeight: 500,
                    color: "var(--ink)",
                    maxWidth: "52ch",
                    marginBottom: 20,
                  }}
                >
                  Abbiamo impostato un rebranding centrato sulla promessa{" "}
                  <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>lusso tailor-made</strong>: sistema tipografico su misura, segno
                  riconoscibile e gerarchie chiare per cartaceo, digitale e presentazioni ai partner trade.
                </p>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.72,
                    fontWeight: 500,
                    color: "var(--ink)",
                    maxWidth: "52ch",
                    margin: 0,
                  }}
                >
                  Palette e grafica di supporto lavorano su <strong>sensazioni di esclusività</strong>, affidabilità e accoglienza — spazio qui per
                  immagini finali dell&apos;Atlante brand quando disponibili. La nuova identità guida tutte le attività di comunicazione garantendo{" "}
                  <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>coerenza</strong> e riconoscibilità nei contesti più diversi.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Galleria: altezza fissa 500px, gap 0, trascina il puntatore */}
          <div
            className="alive-carousel-fullscreen"
            role="region"
            aria-roledescription="carousel"
            aria-label="Galleria identità Alive Xperience"
          >
            <div className="alive-carousel-viewport-wrap" data-lenis-prevent>

              <button
                type="button"
                className="alive-carousel-arrow alive-carousel-arrow--left"
                aria-controls="alive-carousel-track"
                aria-label="Indietro nella galleria (loop ciclico)"
                onClick={carouselPrev}
              >
                <svg className="alive-carousel-arrow-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 18l-6-6 6-6"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="alive-carousel-arrow alive-carousel-arrow--right"
                aria-controls="alive-carousel-track"
                aria-label="Avanti nella galleria (loop ciclico)"
                onClick={carouselNext}
              >
                <svg className="alive-carousel-arrow-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 18l6-6-6-6"
                  />
                </svg>
              </button>

              <div
                ref={carouselTrackRef}
                id="alive-carousel-track"
                className={`alive-carousel-track${carouselPointerDown ? " alive-carousel-track--dragging" : ""}`}
                tabIndex={0}
                aria-label="Galleria orizzontale — trascina, rotella del mouse o tastiera"
                onPointerDown={carouselPointerDownCb}
                onPointerMove={carouselPointerMoveCb}
                onPointerUp={carouselPointerEndCb}
                onPointerCancel={carouselPointerEndCb}
                onLostPointerCapture={() => {
                  carouselDragRef.current = { pid: -1, startX: 0, startScroll: 0 };
                  carouselPointerDraggingRef.current = false;
                  setCarouselPointerDown(false);
                }}
                style={{ cursor: carouselPointerDown ? "grabbing" : "grab" }}
              >
                {aliveCarouselSlides.map((src, idx) => (
                  <div
                    key={src}
                    className="alive-carousel-slide"
                    aria-roledescription="slide"
                    aria-label={`Immagine ${idx + 1} di ${aliveCarouselSlides.length}`}
                  >
                    <img
                      src={src}
                      alt={`Alive Xperience, materiale grafico ${idx + 1} di ${aliveCarouselSlides.length}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      onDragStart={(ev) => ev.preventDefault()}
                    />
                  </div>
                ))}
                {/* Seconda sequenza identica — la sutura a metà permette ripristini invisibili di `scrollLeft` (loop continuo). */}
                {aliveCarouselSlides.map((src) => (
                  <div key={`${String(src)}__loop`} className="alive-carousel-slide" aria-hidden tabIndex={-1}>
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onDragStart={(ev) => ev.preventDefault()}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="container-wide">
            <Reveal delay={40}>
              <p
                style={{
                  marginTop: "clamp(40px, 6vw, 64px)",
                  marginBottom: "clamp(32px, 5vw, 56px)",
                  fontSize: 17,
                  lineHeight: 1.72,
                  fontWeight: 500,
                  color: "var(--ink)",
                  maxWidth: 720,
                }}
              >
                La nuova identità visiva guiderà tutte le attività di comunicazione, garantendo una coerenza che rafforza il riconoscimento del
                brand. Il logo e gli elementi grafici verranno utilizzati in modo versatile, adattandosi a diversi contesti, dalle presentazioni
                commerciali agli eventi del settore, sottolineando sempre l&apos;impegno del brand nel creare viaggi su misura che lasciano un
                segno indelebile nei ricordi dei clienti.
              </p>
            </Reveal>
          </div>

          <style>{`
            .alive-carousel-fullscreen {
              --alive-carousel-height: 500px;
              margin-top: clamp(48px, 7vw, 80px);
              width: 100vw;
              margin-left: calc(50% - 50vw);
              margin-right: calc(50% - 50vw);
              position: relative;
              padding-bottom: 8px;
            }
            .alive-carousel-viewport-wrap {
              position: relative;
              height: var(--alive-carousel-height);
            }
            /* Frecce: nascoste finché non passi sulla striscia galleria (o focus da tastiera su track/pulsanti). */
            .alive-carousel-viewport-wrap:hover .alive-carousel-arrow,
            .alive-carousel-viewport-wrap:focus-within .alive-carousel-arrow,
            .alive-carousel-arrow:focus-visible {
              opacity: 1;
              visibility: visible;
              pointer-events: auto;
            }
            .alive-carousel-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              z-index: 4;
              width: clamp(42px, 6vw, 52px);
              height: clamp(42px, 6vw, 52px);
              padding: 0;
              margin: 0;
              display: grid;
              place-items: center;
              border-radius: 999px;
              border: 1.5px solid rgba(255, 255, 255, 0.42);
              background: rgba(0, 50, 80, 0.42);
              color: white;
              cursor: pointer;
              opacity: 0;
              visibility: hidden;
              pointer-events: none;
              box-shadow: 0 6px 20px rgba(0, 30, 50, 0.28), 0 1px 0 rgba(255, 255, 255, 0.2) inset;
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
              transition:
                opacity 0.28s ease,
                visibility 0.28s ease,
                transform 0.2s ease,
                background-color 0.2s ease,
                border-color 0.2s ease,
                box-shadow 0.2s ease;
            }
            .alive-carousel-viewport-wrap:hover .alive-carousel-arrow:hover,
            .alive-carousel-viewport-wrap:focus-within .alive-carousel-arrow:hover {
              border-color: rgba(255, 255, 255, 0.65);
              background: rgba(0, 62, 95, 0.58);
              box-shadow:
                0 10px 26px rgba(0, 30, 50, 0.36),
                0 1px 0 rgba(255, 255, 255, 0.28) inset;
            }
            .alive-carousel-arrow:active {
              transform: translateY(-50%) scale(0.96);
            }
            .alive-carousel-arrow:focus-visible {
              outline: 2px solid white;
              outline-offset: 3px;
            }
            .alive-carousel-arrow--left {
              left: clamp(10px, 2vw, 24px);
            }
            .alive-carousel-arrow--right {
              right: clamp(10px, 2vw, 24px);
            }
            .alive-carousel-arrow-svg {
              display: block;
              flex-shrink: 0;
            }
            .alive-carousel-arrow-svg path {
              stroke: #ffffff;
              stroke-width: 2.25px;
            }
            @media (hover: none) {
              .alive-carousel-arrow {
                opacity: 0.95;
                visibility: visible;
                pointer-events: auto;
              }
            }
            .alive-carousel-track {
              display: flex;
              flex-flow: row nowrap;
              gap: 0;
              margin: 0;
              padding: 0;
              height: var(--alive-carousel-height);
              box-sizing: border-box;
              align-items: center;
              overflow-x: auto;
              overflow-y: hidden;
              scroll-snap-type: none;
              -webkit-overflow-scrolling: touch;
              overscroll-behavior-x: contain;
              overscroll-behavior-y: auto;
              scrollbar-width: none;
              -ms-overflow-style: none;
              scroll-behavior: auto;
            }
            .alive-carousel-track::-webkit-scrollbar {
              display: none;
              width: 0;
              height: 0;
            }
            .alive-carousel-track:focus-visible {
              outline: 2px solid var(--drop-orange);
              outline-offset: 4px;
            }
            .alive-carousel-track--dragging {
              user-select: none;
              scroll-behavior: auto;
              cursor: grabbing !important;
            }
            .alive-carousel-slide {
              flex: 0 0 auto;
              display: flex;
              height: 100%;
              align-items: center;
            }
            .alive-carousel-slide img {
              display: block;
              height: auto;
              width: auto;
              max-height: var(--alive-carousel-height);
              max-width: none;
              -webkit-user-drag: none;
            }
          `}</style>
        </section>

        {/* CTA contatti */}
        <section id="progetto-contatti" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <Reveal delay={0} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span className="eyebrow">Progetto · Contatti</span>
              <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0, textAlign: "center", maxWidth: "18ch" }}>
                Pronto a dare{" "}
                <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>nuova vita</em>
                <br />
                al tuo brand?
              </h2>
              <p
                style={{
                  marginTop: 28,
                  fontSize: 17,
                  lineHeight: 1.65,
                  fontWeight: 500,
                  maxWidth: 620,
                  marginBottom: 28,
                  textAlign: "center",
                  color: "var(--ink)",
                }}
              >
                Scopri come possiamo accompagnarti in un rebranding memorabile.
              </p>
              <Btn variant="primary" href={homeHash("contatti")}>
                Prenota un appuntamento
              </Btn>
            </Reveal>
          </div>
        </section>
      </main>

      <style>{`
        .alive-project-hero-fold {
          min-height: 100vh;
          min-height: 100dvh;
        }
        .alive-project-hero-meta-line {
          white-space: nowrap;
          font-size: clamp(13px, 1.08vw, 17px);
          line-height: 1.35;
        }
        .alive-project-hero-kicker-line {
          white-space: nowrap;
          max-width: none;
          line-height: 1.3;
          font-size: clamp(11px, 0.92vw, 14px);
        }
        @media (max-width: 720px) {
          .alive-project-hero-meta-line {
            white-space: normal;
          }
          .alive-project-hero-kicker-line {
            white-space: normal;
          }
        }
      `}</style>

      <DropFooter anchorsResolveHome />
    </Fragment>
  );
}
