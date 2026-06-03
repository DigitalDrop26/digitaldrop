import { Fragment, useEffect, useRef, useState } from "react";
import agrovitMascotte01 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-01.png?url";
import agrovitMascotte02 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-02.png?url";
import agrovitMascotte03 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-03.png?url";
import agrovitMascotte04 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-04.png?url";
import agrovitHeroTestata from "@Immagini/Agrovit/agrovit_testata.png?url";
import agrovitCartaceoRivista1 from "@Immagini/Agrovit/Cartaceo/mockup-rivista-1.png?url";
import agrovitCartaceoRivista2 from "@Immagini/Agrovit/Cartaceo/mockup-rivista-2.png?url";
import agrovitCartaceoPosterAlleato from "@Immagini/Agrovit/Cartaceo/poster-alleato.jpg?url";
import agrovitCartaceoPosterSacco from "@Immagini/Agrovit/Cartaceo/poster-sacco.jpg?url";
import agrovitSocialAcidex from "@Immagini/Agrovit/Social/post-acidex.jpg?url";
import agrovitSocialBooster from "@Immagini/Agrovit/Social/post-booster.jpg?url";
import agrovitSocialImmunofeet from "@Immagini/Agrovit/Social/post-immunofeet.jpg?url";
import agrovitSocialInsilati from "@Immagini/Agrovit/Social/post-insilati.jpg?url";
import agrovitSocialQualitalatte from "@Immagini/Agrovit/Social/post-qualitalatte.jpg?url";
import agrovitSocialTransizione from "@Immagini/Agrovit/Social/post-transizione.jpg?url";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectBackFab } from "./DropProjectBackFab";
import { DropProjectMediaMasonry, type MediaMasonryRow } from "./DropProjectMediaMasonry";
import { CursorFollower, Reveal, useReveal, useScrollY } from "./hooksAndUi";

const agrovitCarouselSlides = [
  agrovitMascotte01,
  agrovitMascotte02,
  agrovitMascotte03,
  agrovitMascotte04,
] as const;

/** Griglia cartaceo — orizzontali a colonna intera, verticali su 2 colonne. */
const agrovitCartaceoRows: MediaMasonryRow[] = [
  {
    type: "full",
    item: {
      src: agrovitCartaceoRivista1,
      alt: "Agrovit, mockup rivista — campagna cartacea",
    },
  },
  {
    type: "split",
    columns: 2,
    items: [
      {
        src: agrovitCartaceoPosterAlleato,
        alt: "Agrovit, poster verticale — Dentro Agrovit c'è un tuo alleato",
      },
      {
        src: agrovitCartaceoPosterSacco,
        alt: "Agrovit, poster verticale — sacco prodotti",
      },
    ],
  },
  {
    type: "full",
    item: {
      src: agrovitCartaceoRivista2,
      alt: "Agrovit, mockup rivista — doppia pagina",
    },
  },
];

/** Griglia social — post verticali, 3 colonne per riga. */
const agrovitSocialRows: MediaMasonryRow[] = [
  {
    type: "split",
    columns: 3,
    items: [
      { src: agrovitSocialAcidex, alt: "Agrovit, post social Acidex" },
      { src: agrovitSocialBooster, alt: "Agrovit, post social Booster" },
      { src: agrovitSocialImmunofeet, alt: "Agrovit, post social Immunofeet" },
    ],
  },
  {
    type: "split",
    columns: 3,
    items: [
      { src: agrovitSocialInsilati, alt: "Agrovit, post social Insilati" },
      { src: agrovitSocialQualitalatte, alt: "Agrovit, post social Qualità Latte" },
      { src: agrovitSocialTransizione, alt: "Agrovit, post social Transizione" },
    ],
  },
];

/** Durata (ms) di permanenza di ogni mascotte nello showcase auto-play. */
const AGROVIT_MASCOT_INTERVAL_MS = 4000;

/** Mascotte che si alternano come un breve filmato (crossfade, zoom lento, 5s ciascuna). */
function AgrovitMascotShowcase() {
  const [active, setActive] = useState(0);
  const slides = agrovitCarouselSlides;

  useEffect(() => {
    const prefersReduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AGROVIT_MASCOT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div
      role="group"
      aria-roledescription="filmato mascotte"
      aria-label={`Mascotte Agrovit — ${active + 1} di ${slides.length}`}
      style={{ width: "100%" }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
        {/* alone tenue dietro la mascotte, senza creare un box */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 45%, rgba(0, 122, 153, 0.1) 0%, rgba(0, 122, 153, 0) 62%)",
          }}
        />
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === active ? `Mascotte Agrovit ${i + 1} di ${slides.length}` : ""}
            aria-hidden={i === active ? undefined : true}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1)" : "scale(1.06)",
              transition: "opacity 1.1s var(--ease), transform 4.2s linear",
              filter: "drop-shadow(0 24px 28px rgba(0, 26, 52, 0.16))",
            }}
          />
        ))}
      </div>

      <div
        aria-hidden
        style={{
          marginTop: "clamp(12px, 2vw, 20px)",
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {slides.map((src, i) => (
          <button
            key={`dot-${src}`}
            type="button"
            aria-label={`Vai alla mascotte ${i + 1}`}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 34 : 11,
              height: 11,
              padding: 0,
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
              background: i === active ? "var(--drop-orange)" : "rgba(0, 80, 119, 0.3)",
              transition: "width .5s var(--ease), background .5s var(--ease)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Pagina progetto — Agrovit · Visual, Content & Social. */
export function DropProjectAgrovitPage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);
  const yHero = useScrollY();
  const heroScrollFade = Math.max(0, 1 - yHero / 600);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Agrovit · Progetto · Drop";
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
      <DropHeader logoSubtitle="Progetti" projectName="Agrovit" />

      <main id="top" ref={mainRef}>
        <section
          className="alive-project-hero-fold"
          aria-label="Hero progetto Agrovit"
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
            backgroundImage: `url(${agrovitHeroTestata})`,
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
                "linear-gradient(165deg, rgba(0, 19, 40, 0.78) 0%, rgba(0, 26, 52, 0.62) min(48%, 560px), rgba(0, 19, 40, 0.72) 100%)",
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
                      color: "#ffffff",
                      maxWidth: "22ch",
                    }}
                  >
                    Agro
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>vit</em>
                  </h1>
                  <p
                    className="alive-project-hero-kicker-line"
                    style={{
                      marginTop: 20,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    Visual / Content / Social — 2025
                  </p>
                  <p
                    className="alive-project-hero-meta-line"
                    style={{ marginTop: 14, fontWeight: 500, color: "rgba(255,255,255,0.82)" }}
                  >
                    Un mondo di personaggi per dare voce al brand Agrovit
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
                color: "rgba(255,255,255,0.88)",
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
                  Un brand agro che{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>parla alle persone</em>.
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
                  Agrovit aveva bisogno di un&apos;identità capace di distinguersi in un settore{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>tecnico e affollato</strong>, parlando in modo
                  caldo e diretto a un pubblico ampio. La sfida: trasformare prodotti e competenze in un racconto riconoscibile,
                  capace di costruire una relazione quotidiana sui canali digitali.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="progetto-soluzione"
          className="section"
          style={{ background: "var(--paper-tint)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
        >
          <div className="container-wide">
            <div className="agrovit-solution-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">Progetto · La soluzione</span>
                  <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                    Un cast di{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>personaggi</em>.
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
                    Abbiamo costruito un{" "}
                    <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>mondo visivo</strong> attorno a una famiglia di
                    mascotte: forme semplici, colori vivaci e un tratto coerente che rendono il brand immediatamente riconoscibile.
                    Ogni personaggio porta un carattere diverso, pronto a raccontare prodotti, valori e momenti di Agrovit.
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
                    Sul fronte <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>content</strong> abbiamo definito tono di
                    voce, format e piano editoriale; sul fronte{" "}
                    <strong style={{ fontWeight: 700, color: "var(--drop-orange)" }}>social</strong> abbiamo dato vita a una presenza
                    coerente e continuativa, dove i personaggi diventano il filo conduttore di ogni contenuto.
                  </p>
                </Reveal>
              </div>

              <div className="agrovit-solution-media">
                <Reveal delay={1}>
                  <AgrovitMascotShowcase />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="progetto-cartaceo" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">Progetto · Cartaceo</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Il brand{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>in stampa</em>.
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
                  Riviste di settore, poster e materiali point-of-sale portano le mascotte fuori dal digitale: layout puliti,
                  gerarchie chiare e un sistema visivo che funziona anche su grande formato.
                </p>
              </Reveal>
            </div>

            <DropProjectMediaMasonry rows={agrovitCartaceoRows} ariaLabel="Materiali cartacei Agrovit" />
          </div>
        </section>

        <section id="progetto-social" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">Progetto · Social</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Contenuti che{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>restano in campo</em>.
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
                  Ogni post traduce prodotti e temi tecnici in format immediati: i personaggi guidano il messaggio, i colori
                  del brand tengono unita la presenza sui canali social.
                </p>
              </Reveal>
            </div>

            <DropProjectMediaMasonry rows={agrovitSocialRows} ariaLabel="Post social Agrovit" />
          </div>
        </section>

        {/* Contatti — stessa sezione della homepage */}
        <DropNewsletter />
      </main>

      <style>{`
        .agrovit-solution-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(36px, 5vw, 80px);
          align-items: center;
        }
        .agrovit-solution-media {
          width: 100%;
          max-width: 598px;
          margin-left: auto;
        }
        @media (max-width: 900px) {
          .agrovit-solution-grid {
            grid-template-columns: 1fr;
            gap: clamp(32px, 8vw, 48px);
          }
          .agrovit-solution-media {
            margin-left: auto;
            margin-right: auto;
            max-width: 483px;
          }
        }
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
