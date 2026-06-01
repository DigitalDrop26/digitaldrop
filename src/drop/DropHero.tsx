import { useEffect, useRef } from "react";
import sfondoHeroSrc from "@Immagini/Sfondo_hero.jpg?url";
import { bundleResources } from "./bundleResources";
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

  const titleTransform = `translate3d(0, ${Math.min(y * -0.08, 60)}px, 0)`;
  const fadeOnScroll = Math.max(0, 1 - y / 600);
  const cardParallax = Math.min(70, y * 0.12);

  return (
    <section id="top" ref={rootRef} className="hero-fold" style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      paddingTop: 'clamp(100px, 12vh, 180px)',
      paddingBottom: 'clamp(28px, 5vh, 64px)',
      overflowX: 'hidden',
      overflowY: 'visible',
      backgroundColor: 'var(--paper-warm)',
      backgroundImage: `url(${sfondoHeroSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Velatura sopra foto `@Immagini/Sfondo_hero.jpg` (import Vite `?url`) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(105deg, rgba(250,247,242,0.88) 0%, rgba(250,247,242,0.72) min(42vw, 52%), rgba(250,247,242,0.42) 68%, rgba(250,247,242,0.12) 100%)',
        }}
      />

      {/* Contenuti: colonna che occupa tutta l'altezza utile viewport */}
      <div className="container-wide" style={{
        position: 'relative',
        zIndex: 5,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        justifyContent: 'space-between',
        gap: 'clamp(16px, 3vh, 32px)',
      }}>
        {/* Titolo centrato nell'area disponibile */}
        <div style={{
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
              <div className="line-reveal hero-line-reveal" data-idx={2} style={{ marginLeft: 'clamp(24px, 6vw, 120px)' }}>
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
              className="reveal hero-claim-card"
              data-idx="5"
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                flexShrink: 0,
                background: 'var(--teal-100)',
                boxShadow: '0 24px 60px rgba(0,26,52,0.22)',
                transform: `translate3d(0, ${-cardParallax}px, 0)`,
                willChange: 'transform',
              }}
            >
              <img
                src={bundleResources.imgWheat1600}
                alt="Campo di grano al tramonto"
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

        {/* Lead block + meta — piede fisso della fold */}
        <div style={{
            marginTop: 0,
            flexShrink: 0,
            position: 'relative',
            zIndex: 5,
          }} className="hero-bottom">
          <div className="reveal" data-idx="6" style={{ maxWidth: 560 }}>
            <p style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 1.55,
              color: 'var(--ink)',
              fontWeight: 500,
              margin: 0,
            }}>
              DROP è l'agenzia di comunicazione e marketing strategico per imprese
              agroalimentari, zootecniche e filiere. <span style={{ color: 'var(--drop-orange)', fontWeight: 700 }}>Concreto, gentile, su misura</span> —
              da oltre 25 anni dentro al settore.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
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

      <style>{`
        .hero-fold {
          min-height: 100vh;
          min-height: 100dvh;
        }
        .hero-head {
          display: flex;
          align-items: center;
          gap: clamp(32px, 5vw, 80px);
          width: 100%;
        }
        .hero-head h1 { flex: 1 1 auto; min-width: 0; }
        .hero-claim-card {
          width: clamp(440px, 48vw, 820px);
          aspect-ratio: 3 / 2;
          margin-right: calc(-1 * var(--page-gutter) - 110px);
        }
        @media (max-width: 960px) {
          .hero-claim-card { display: none; }
        }
      `}</style>
    </section>
  );
}
