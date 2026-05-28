import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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

type DropProjectCarouselProps = {
  slides: readonly string[];
  trackId: string;
  ariaLabel: string;
  altPrefix: string;
};

/** Galleria orizzontale full-bleed per pagine progetto (loop, drag, frecce, rotella). */
export function DropProjectCarousel({ slides, trackId, ariaLabel, altPrefix }: DropProjectCarouselProps) {
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselLoopPxRef = useRef(0);
  const carouselDragRef = useRef({ pid: -1 as number, startX: 0, startScroll: 0 });
  const carouselSmoothStateRef = useRef({ rafId: 0, lerping: false, targetScroll: 0 });
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
  }, [slides]);

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

  const carouselArrowNudgePx = () => {
    const t = carouselTrackRef.current;
    if (!t) return 280;
    return Math.max(200, Math.min(t.clientWidth * 0.78, 560));
  };

  const carouselPrev = () => {
    carouselNudgeSmoothRef.current(-carouselArrowNudgePx());
  };

  const carouselNext = () => {
    carouselNudgeSmoothRef.current(carouselArrowNudgePx());
  };

  return (
    <>
      <div
        className="alive-carousel-fullscreen"
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
      >
        <div className="alive-carousel-viewport-wrap" data-lenis-prevent>
          <button
            type="button"
            className="alive-carousel-arrow alive-carousel-arrow--left"
            aria-controls={trackId}
            aria-label="Indietro nella galleria (loop ciclico)"
            onClick={carouselPrev}
          >
            <svg className="alive-carousel-arrow-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="alive-carousel-arrow alive-carousel-arrow--right"
            aria-controls={trackId}
            aria-label="Avanti nella galleria (loop ciclico)"
            onClick={carouselNext}
          >
            <svg className="alive-carousel-arrow-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            ref={carouselTrackRef}
            id={trackId}
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
            {slides.map((src, idx) => (
              <div
                key={src}
                className="alive-carousel-slide"
                aria-roledescription="slide"
                aria-label={`Immagine ${idx + 1} di ${slides.length}`}
              >
                <img
                  src={src}
                  alt={`${altPrefix}, materiale grafico ${idx + 1} di ${slides.length}`}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  onDragStart={(ev) => ev.preventDefault()}
                />
              </div>
            ))}
            {slides.map((src) => (
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
    </>
  );
}
