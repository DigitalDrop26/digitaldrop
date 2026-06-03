import { Fragment, useEffect, useRef } from "react";
import giocoCar01 from "@Immagini/Gioco di squadra/01.png?url";
import giocoCar02 from "@Immagini/Gioco di squadra/02.png?url";
import giocoCar04 from "@Immagini/Gioco di squadra/04.png?url";
import giocoCar07 from "@Immagini/Gioco di squadra/07.png?url";
import giocoCar08 from "@Immagini/Gioco di squadra/08.png?url";
import giocoCar11 from "@Immagini/Gioco di squadra/11.png?url";
import { bundleResources } from "./bundleResources";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectBackFab } from "./DropProjectBackFab";
import { DropProjectCarousel } from "./DropProjectCarousel";
import { CursorFollower, Reveal, useReveal, useScrollY } from "./hooksAndUi";

const giocoCarouselSlides = [
  giocoCar01,
  giocoCar02,
  giocoCar04,
  giocoCar07,
  giocoCar08,
  giocoCar11,
] as const;

/** Pagina progetto — Gioco di Squadra · Boehringer Ingelheim Animal Health. */
export function DropProjectGiocoDiSquadraPage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);
  const yHero = useScrollY();
  const heroScrollFade = Math.max(0, 1 - yHero / 600);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Gioco di Squadra · Progetto · Drop";
    return () => {
      document.title = prev;
    };
  }, []);

  const scrollToSfida = () => {
    const el = document.getElementById("progetto-sfida");
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Fragment>
      <CursorFollower />
      <DropHeader logoSubtitle="Progetti" projectName="Gioco di Squadra" />

      <main id="top" ref={mainRef}>
        <section
          className="alive-project-hero-fold"
          aria-label="Hero progetto Gioco di Squadra"
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
            backgroundImage: `url(${bundleResources.imgCow900})`,
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
            <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div aria-hidden style={{ flex: "3 0 0%", minHeight: 0 }} />
              <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "flex-start", minHeight: 0 }}>
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
                    Gioco di{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Squadra</em>
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
                    Strategy / Communication / Omnichannel — 2025
                  </p>
                  <p className="alive-project-hero-meta-line" style={{ marginTop: 14, fontWeight: 500, color: "var(--ink)" }}>
                    Progetto realizzato per Boehringer Ingelheim Animal Health Italia S.p.A.
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
                onClick={scrollToSfida}
              >
                Scroll
              </button>
            </div>
          </div>
        </section>

        <section id="progetto-sfida" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">Progetto · La sfida</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Una famiglia di vaccini,{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>un messaggio chiaro</em>.
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
                  Boehringer Ingelheim voleva portare in Italia il concetto di{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>famiglia di vaccini</strong> per la prevenzione
                  e gestione di patologie bovine come BVD, diarrea neonatale e IBR, parlando in modo chiaro ad allevatori e veterinari.
                  La sfida: creare un progetto omnicanale che trasformasse un concetto tecnico in un messaggio immediato e memorabile.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="progetto-soluzione" className="section" style={{ background: "var(--paper-tint)", paddingBottom: "clamp(64px, 10vw, 120px)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">Progetto · La soluzione</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Ogni vaccino fa{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>squadra</em>.
                </h2>
                <p
                  style={{
                    marginTop: "clamp(32px, 5vw, 56px)",
                    fontSize: 17,
                    lineHeight: 1.72,
                    fontWeight: 500,
                    color: "var(--ink)",
                    maxWidth: "52ch",
                    marginBottom: 0,
                  }}
                >
                  Abbiamo scelto il linguaggio dello sport: ogni vaccino è un{" "}
                  <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>giocatore</strong> che fa squadra per proteggere
                  la mandria. Il concept <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>Gioco di squadra</strong> ha
                  preso vita su social, ADV, eventi, fiere e community, rafforzando la percezione di una protezione completa e coordinata.
                </p>
              </Reveal>
            </div>
          </div>

          <DropProjectCarousel
            slides={giocoCarouselSlides}
            trackId="gioco-carousel-track"
            ariaLabel="Galleria campagna Gioco di Squadra"
            altPrefix="Gioco di Squadra, Boehringer Ingelheim"
          />
        </section>

        {/* Contatti — stessa sezione della homepage */}
        <DropNewsletter />
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
      <DropProjectBackFab />
    </Fragment>
  );
}
