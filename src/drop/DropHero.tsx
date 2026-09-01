import { useEffect, useRef } from "react";
import dropHeroSrc from "@Immagini/Drop_hero.png?url";
import trattoreSrc from "@Immagini/trattore.jpeg?url";
import { DropHeroBackground } from "./DropHeroBackground";
import { useReveal, useScrollY, Btn } from "./hooksAndUi";

/** Dopo overlay intro (~2200ms) mentre l’hero diventa leggibile (DropHomepageApp). */
const HERO_TITLE_REVEAL_START_MS = 2380;
const HERO_TITLE_STAGGER_MS = 92;

export function DropHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  useReveal(rootRef);
  const y = useScrollY();

  /** Titolo: .hero-line-reveal è escluso da IntersectionObserver; servono is-in dopo intro. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heroRoot = root;
    let cancelled = false;
    const ids: ReturnType<typeof setTimeout>[] = [];

    function revealLines() {
      if (cancelled) return;
      const lines = [...heroRoot.querySelectorAll<HTMLElement>(".hero-line-reveal")];
      lines.sort(
        (a, b) =>
          Number(a.getAttribute("data-idx") ?? 99) -
          Number(b.getAttribute("data-idx") ?? 99),
      );
      lines.forEach((el) => {
        const idx = Number(el.getAttribute("data-idx") ?? 0);
        ids.push(
          window.setTimeout(() => {
            if (!cancelled) el.classList.add("is-in");
          }, Math.max(0, idx * HERO_TITLE_STAGGER_MS)),
        );
      });
    }

    ids.push(window.setTimeout(revealLines, HERO_TITLE_REVEAL_START_MS));

    const failSafeMs = HERO_TITLE_REVEAL_START_MS + 12 * HERO_TITLE_STAGGER_MS;
    ids.push(
      window.setTimeout(() => {
        if (!cancelled) {
          heroRoot.querySelectorAll<HTMLElement>(".hero-line-reveal").forEach((el) => el.classList.add("is-in"));
        }
      }, failSafeMs),
    );

    return () => {
      cancelled = true;
      ids.forEach(clearTimeout);
    };
  }, []);

  /** Mobile: 100dvh su iOS può essere più basso del frame visibile → gap sotto la fold. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia("(max-width: 900px)");
    const syncViewportHeight = () => {
      if (!mq.matches) {
        root.style.removeProperty("--hero-vh");
        return;
      }
      const h = window.visualViewport?.height ?? window.innerHeight;
      root.style.setProperty("--hero-vh", `${Math.round(h)}px`);
    };

    syncViewportHeight();
    window.visualViewport?.addEventListener("resize", syncViewportHeight);
    window.addEventListener("resize", syncViewportHeight);
    window.addEventListener("orientationchange", syncViewportHeight);
    mq.addEventListener("change", syncViewportHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", syncViewportHeight);
      window.removeEventListener("resize", syncViewportHeight);
      window.removeEventListener("orientationchange", syncViewportHeight);
      mq.removeEventListener("change", syncViewportHeight);
      root.style.removeProperty("--hero-vh");
    };
  }, []);

  const titleTransform = `translate3d(0, ${Math.min(y * -0.08, 60)}px, 0)`;
  const fadeOnScroll = Math.max(0, 1 - y / 600);
  const cardParallax = Math.min(70, y * 0.12);

  return (
    <section id="top" ref={rootRef} className="hero-fold" style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'visible',
      backgroundColor: 'var(--paper-warm)',
    }}>
      <DropHeroBackground src={dropHeroSrc} priority />
      <div aria-hidden className="hero-wash" />

      {/* Contenuti: colonna che occupa tutta l'altezza utile viewport */}
      <div className="container-wide hero-inner" style={{
        position: 'relative',
        zIndex: 5,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        justifyContent: 'space-between',
      }}>
        {/* Titolo centrato nell'area disponibile */}
        <div className="hero-title-area" style={{
          position: 'relative',
          zIndex: 5,
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 0,
          transform: titleTransform,
          willChange: 'transform',
        }}>
          <div className="hero-head">
            <h1 className="display display-xxl hero-title-fold" style={{ margin: 0, color: 'var(--drop-teal)' }}>
              <div className="line-reveal hero-line-reveal" data-idx={1}>
                <span>Parliamo</span>
              </div>
              <div className="line-reveal hero-line-reveal hero-line-reveal--indent" data-idx={2}>
                <span>la lingua</span>
              </div>
              <div className="line-reveal hero-line-reveal" data-idx={3}>
                <span>
                  <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>del</em>{" "}settore
                </span>
              </div>
              <div className="line-reveal hero-line-reveal" data-idx={4}>
                <span>agrifood.</span>
              </div>
            </h1>

            <div
              className="hero-claim-card"
              style={{
                flexShrink: 0,
                transform: `translate3d(0, ${-cardParallax}px, 0)`,
                willChange: 'transform',
              }}
            >
              <div
                className="reveal hero-claim-card-inner"
                data-idx="5"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: 'var(--teal-100)',
                  boxShadow: '0 24px 60px rgba(0,26,52,0.22)',
                }}
              >
                <img
                  src={trattoreSrc}
                  alt="Trattore in semina al tramonto"
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lead block + meta — piede fisso della fold */}
        <div className="hero-bottom hero-bottom-panel" style={{
            marginTop: 0,
            flexShrink: 0,
            position: 'relative',
            zIndex: 5,
          }}>
          <div className="reveal" data-idx="6" style={{ maxWidth: 560 }}>
            <p className="hero-lead">
              DROP è l'agenzia di comunicazione e marketing strategico per imprese
              agroalimentari, zootecniche e filiere. <span className="hero-lead-accent">Concreto, gentile, su misura</span> —
              da oltre 25 anni dentro al settore.
            </p>
            <div className="hero-cta-row">
              <Btn variant="primary" href="#contatti" onClick={(e) => { e.preventDefault(); document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Iniziamo un progetto
              </Btn>
              <Btn variant="ghost" href="#progetti" onClick={(e) => { e.preventDefault(); document.getElementById('progetti')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Vedi i progetti
              </Btn>
            </div>
          </div>

        </div>

        {/* Invito allo scroll — sotto copy + CTAs */}
        <div
          className="hero-scroll-hint"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            alignSelf: "flex-end",
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "var(--teal-500)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: fadeOnScroll,
            transition: "opacity 0.3s linear",
          }}
        >
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>

      </div>

      <style>{`
        .hero-wash {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            rgba(250, 247, 242, 0.88) 0%,
            rgba(250, 247, 242, 0.72) min(42vw, 52%),
            rgba(250, 247, 242, 0.42) 68%,
            rgba(250, 247, 242, 0.12) 100%
          );
        }
        .hero-fold {
          box-sizing: border-box;
          min-height: 100vh;
          min-height: 100dvh;
          padding-top: clamp(100px, 12vh, 180px);
          padding-bottom: clamp(28px, 5vh, 64px);
        }
        .hero-fold .container-wide {
          flex: 1;
          min-height: 0;
        }
        .hero-inner {
          gap: clamp(16px, 3vh, 32px);
        }
        .hero-lead {
          font-size: clamp(16px, 1.3vw, 20px);
          line-height: 1.55;
          color: var(--ink);
          font-weight: 500;
          margin: 0;
        }
        .hero-lead-accent {
          color: var(--drop-orange);
          font-weight: 700;
        }
        .hero-cta-row {
          margin-top: clamp(20px, 3vh, 36px);
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-scroll-hint {
          margin-top: clamp(16px, 3vh, 44px);
          align-self: flex-end;
        }
        .hero-scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(180deg, var(--drop-orange) 0%, transparent 100%);
          animation: scrollLine 1.8s ease-in-out infinite;
        }
        .hero-head {
          display: flex;
          align-items: center;
          gap: clamp(32px, 5vw, 80px);
          width: 100%;
        }
        .hero-head h1 { flex: 1 1 auto; min-width: 0; }
        .hero-line-reveal--indent {
          margin-left: clamp(24px, 6vw, 120px);
        }
        .hero-claim-card {
          width: clamp(440px, 48vw, 820px);
          aspect-ratio: 3 / 2;
          margin-right: calc(-1 * var(--page-gutter) - 110px);
        }
        .hero-claim-card-inner {
          transition: transform .6s var(--ease);
        }
        .hero-claim-card:hover .hero-claim-card-inner {
          transform: rotate(5deg);
        }
        @media (max-width: 960px) {
          .hero-claim-card { display: none; }
        }
        @media (max-width: 900px) {
          .hero-wash {
            background: linear-gradient(
              180deg,
              rgba(250, 247, 242, 0.94) 0%,
              rgba(250, 247, 242, 0.9) 52%,
              rgba(250, 247, 242, 0.98) 100%
            );
          }
          .hero-fold {
            height: var(--hero-vh, 100svh);
            min-height: var(--hero-vh, 100svh);
            max-height: var(--hero-vh, 100svh);
            overflow: hidden;
            padding-top: calc(72px + env(safe-area-inset-top, 0px));
            padding-bottom: max(16px, env(safe-area-inset-bottom, 0px));
          }
          .hero-inner {
            gap: clamp(10px, 2dvh, 16px);
            height: 100%;
          }
          .hero-title-area {
            flex: 1 1 auto;
            min-height: 0;
            justify-content: flex-start;
            padding-top: clamp(4px, 1dvh, 12px);
            overflow: hidden;
          }
          .hero-head {
            align-items: flex-start;
          }
          .hero-head .hero-line-reveal--indent {
            margin-left: clamp(12px, 4vw, 28px);
          }
          .hero-bottom-panel {
            position: relative;
            z-index: 6;
            margin-inline: calc(-1 * var(--page-gutter));
            padding-inline: var(--page-gutter);
            padding-top: clamp(14px, 3dvh, 22px);
          }
          .hero-bottom-panel::before {
            content: "";
            position: absolute;
            left: calc(-1 * var(--page-gutter));
            right: calc(-1 * var(--page-gutter));
            top: -28px;
            bottom: -4px;
            background: linear-gradient(
              180deg,
              rgba(250, 247, 242, 0) 0%,
              rgba(250, 247, 242, 0.78) 32%,
              rgba(250, 247, 242, 0.94) 100%
            );
            pointer-events: none;
            z-index: -1;
          }
          .hero-lead {
            font-size: clamp(14px, 3.6vw, 16px);
            line-height: 1.48;
            color: var(--ink);
            font-weight: 600;
          }
          .hero-lead-accent {
            text-shadow: 0 1px 10px rgba(250, 247, 242, 0.9);
          }
          .hero-cta-row {
            margin-top: clamp(12px, 2.5dvh, 18px);
            gap: 10px;
          }
          .hero-scroll-hint {
            margin-top: clamp(8px, 1.6dvh, 14px);
          }
          .hero-scroll-line {
            height: clamp(28px, 5dvh, 40px);
          }
        }
        @media (max-height: 740px) and (max-width: 900px) {
          .hero-fold {
            padding-top: calc(64px + env(safe-area-inset-top, 0px));
          }
          .hero-cta-row .btn {
            padding-top: 14px;
            padding-bottom: 14px;
          }
        }
      `}</style>
    </section>
  );
}
