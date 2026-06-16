import { Fragment, useEffect, useRef } from "react";
import allevaHeroBg from "@Immagini/Alleva PR/AllevaPR_hero.png?url";
import allevaGallery01 from "@Immagini/Alleva PR/amber-kipp-Q9n1qsws8ZY-unsplash.jpg?url";
import allevaGallery02 from "@Immagini/Alleva PR/caroline-roose-HgbKnsaAu_0-unsplash (1).jpg?url";
import allevaGallery03 from "@Immagini/Alleva PR/elio-santos-0AIb6bBdgXc-unsplash.jpg?url";
import allevaWarehouse from "@Immagini/Alleva PR/Magazzino_Parmigiano.jpg?url";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectBackFab } from "./DropProjectBackFab";
import { DropProjectPrefooter } from "./DropProjectPrefooter";
import { CursorFollower, DropProjectHeroYearLine, Reveal, useReveal, useScrollY } from "./hooksAndUi";

const PROJECT_NAME = "Alleva PR";

const bodyStyle = {
  fontSize: 17,
  lineHeight: 1.72,
  fontWeight: 500,
  color: "var(--ink)",
  maxWidth: "52ch",
  margin: 0,
} as const;

const allevaProgettoGallery = [
  { src: allevaGallery01, alt: "Alleva PR, allevamento bovino nella filiera del Parmigiano Reggiano" },
  { src: allevaGallery02, alt: "Alleva PR, lavorazione del formaggio in caseificio" },
  { src: allevaGallery03, alt: "Alleva PR, forme e spicchi di Parmigiano Reggiano" },
] as const;

const allevaSolutionCards = [
  {
    n: "01",
    title: "Dialogo aperto",
    body: "Da comunicazione a senso unico a confronto reale: ogni membro può ascoltare, rispondere e proporre.",
    dark: false,
  },
  {
    n: "02",
    title: "Formazione continua",
    body: "Un luogo dove le competenze circolano: aggiornamento, buone pratiche e crescita condivisa della filiera.",
    dark: true,
  },
  {
    n: "03",
    title: "Scambio di idee",
    body: "Conoscenze, esperienze e risorse messe in comune, per raccogliere i desiderata di allevatori e tecnici.",
    dark: false,
  },
] as const;

/** Pagina progetto — Alleva PR · Consorzio del Formaggio Parmigiano Reggiano. */
export function DropProjectAllevaPrPage() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);
  const yHero = useScrollY();
  const heroScrollFade = Math.max(0, 1 - yHero / 600);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = `${PROJECT_NAME} · Progetto · Drop`;
    return () => {
      document.title = prev;
    };
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById("progetto-contenuto");
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
      <DropHeader logoSubtitle="Progetti" projectName={PROJECT_NAME} />

      <main id="top" ref={mainRef}>
        <section
          className="alleva-hero alive-project-hero-fold"
          aria-label={`Hero progetto ${PROJECT_NAME}`}
          style={{
            position: "relative",
            flexShrink: 0,
            paddingTop: "clamp(92px, 11vh, 150px)",
            paddingBottom: "clamp(18px, 3.5vh, 44px)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundColor: "#000000",
            backgroundImage: `url(${allevaHeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
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
                "linear-gradient(165deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.38) min(42%, 520px), rgba(0, 0, 0, 0.68) 100%)",
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
                  <p
                    className="alive-project-hero-kicker-line"
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    Consorzio del Formaggio Parmigiano Reggiano
                  </p>
                  <h1
                    className="display display-lg"
                    style={{
                      marginTop: 20,
                      marginBottom: 0,
                      letterSpacing: "-0.038em",
                      lineHeight: 1.04,
                      color: "#ffffff",
                      maxWidth: "16ch",
                    }}
                  >
                    Connessioni e dialogo per{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>innovare la filiera DOP.</em>
                  </h1>
                  <DropProjectHeroYearLine
                    categories="Community · Piano di comunicazione"
                    year="2023"
                    style={{
                      marginTop: 20,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  />
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
                onClick={scrollToContent}
              >
                Scroll
              </button>
            </div>
          </div>
        </section>

        <section id="progetto-contenuto" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div className="alleva-progetto-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">01 · Il progetto</span>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    AllevaPR riunisce gli{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>
                      allevatori e i tecnici della filiera del Parmigiano Reggiano
                    </strong>
                    : il mondo che, stalla dopo stalla, garantisce la qualità di uno dei prodotti più riconosciuti al
                    mondo. Una filiera fatta di competenze, tradizione e persone — ma con un dialogo interno ancora a
                    senso unico, dove le esigenze di chi lavora ogni giorno faticavano a emergere e a circolare.
                  </p>
                </Reveal>
              </div>

              <aside className="alleva-progetto-aside">
                <Reveal delay={1}>
                  <div className="alleva-meta-block">
                    <h3 className="alleva-meta-label">Attività</h3>
                    <ul className="alleva-meta-list">
                      <li>Analisi dei bisogni della filiera</li>
                      <li>Progettazione della community</li>
                      <li>Piano di comunicazione bidirezionale</li>
                      <li>Formazione &amp; scambio di idee</li>
                    </ul>
                  </div>
                  <div className="alleva-meta-block" style={{ marginTop: 32 }}>
                    <h3 className="alleva-meta-label">Obiettivi</h3>
                    <ul className="alleva-meta-list">
                      <li>Prima community della filiera PR</li>
                      <li>Punto d&apos;incontro digitale</li>
                      <li>Strategia di dialogo aperto</li>
                      <li>Spazi di condivisione risorse</li>
                    </ul>
                  </div>
                </Reveal>
              </aside>
            </div>

            <div className="alleva-trio-gallery" role="list" aria-label={`Immagini ${PROJECT_NAME}`}>
              {allevaProgettoGallery.map((item, i) => (
                <Reveal key={item.src} delay={i} role="listitem" className="alleva-media-card">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-sfida" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">02 · La sfida</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Dare voce a chi fa il Parmigiano Reggiano,{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>ogni giorno.</em>
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  AllevaPR doveva superare i limiti di una{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>comunicazione unidirezionale</strong>,
                  che non favoriva un vero scambio di idee e opinioni all&apos;interno della filiera del Parmigiano
                  Reggiano. Serviva un dialogo bidirezionale per raccogliere i desiderata di allevatori e tecnici.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="progetto-soluzione" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">03 · La soluzione</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Un luogo{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>dove dialogare.</em>
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Abbiamo dato alla filiera ciò che le mancava: un{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>punto d&apos;incontro digitale</strong>.
                  La prima community dedicata al Parmigiano Reggiano, dove conoscenze, esperienze e risorse circolano
                  liberamente tra tutti i membri.
                </p>
              </Reveal>
            </div>

            <div className="alleva-value-cards">
              {allevaSolutionCards.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={i}
                  className={`alleva-value-card${card.dark ? " alleva-value-card--dark" : ""}`}
                >
                  <div className="alleva-value-card-index">{card.n}</div>
                  <h3 className="display alleva-value-card-title">{card.title}</h3>
                  <p className="alleva-value-card-body">{card.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-chiusura" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <Reveal delay={0}>
              <div className="alleva-media-card alleva-feature-card">
                <img
                  src={allevaWarehouse}
                  alt="Alleva PR, magazzino di forme di Parmigiano Reggiano in stagionatura"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h2
                className="display display-md"
                style={{
                  marginTop: "clamp(48px, 7vw, 80px)",
                  marginBottom: 0,
                  color: "var(--drop-teal)",
                  maxWidth: "22ch",
                }}
              >
                Dialogo aperto, innovazione condivisa:{" "}
                <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>la community avvicina.</em>
              </h2>
            </Reveal>
          </div>
        </section>

        <DropProjectPrefooter />
        <DropNewsletter />
      </main>

      <style>{`
        .alleva-media-card {
          border-radius: 24px;
          overflow: hidden;
          line-height: 0;
          background: var(--teal-100);
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.22);
        }
        .alleva-media-card img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 1.4s var(--ease);
        }
        .alleva-media-card:hover img {
          transform: scale(1.02);
        }
        .alleva-progetto-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: clamp(36px, 5vw, 72px);
          align-items: start;
        }
        .alleva-meta-label {
          margin: 0 0 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--drop-orange);
        }
        .alleva-meta-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .alleva-meta-list li {
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          color: var(--drop-teal);
        }
        .alleva-trio-gallery {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        .alleva-trio-gallery .alleva-media-card img {
          aspect-ratio: 4 / 5;
        }
        .alleva-value-cards {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 2.5vw, 28px);
          align-items: stretch;
        }
        .alleva-value-card {
          border-radius: 28px;
          padding: clamp(32px, 3.5vw, 40px) clamp(28px, 3vw, 36px);
          min-height: 100%;
          background: #ffffff;
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.25);
          transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
        }
        .alleva-value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px -28px rgba(0, 44, 66, 0.35);
        }
        .alleva-value-card--dark {
          background: var(--drop-teal);
        }
        .alleva-value-card-index {
          margin: 0 0 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1;
          color: var(--drop-orange);
        }
        .alleva-value-card-title {
          margin: 0 0 16px;
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: var(--drop-teal);
        }
        .alleva-value-card--dark .alleva-value-card-title {
          color: #ffffff;
        }
        .alleva-value-card-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 500;
          color: var(--ink);
          max-width: 36ch;
        }
        .alleva-value-card--dark .alleva-value-card-body {
          color: rgba(255, 255, 255, 0.82);
        }
        .alleva-feature-card img {
          width: 100%;
          height: auto;
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
        @media (max-width: 900px) {
          .alleva-progetto-grid {
            grid-template-columns: 1fr;
          }
          .alleva-trio-gallery,
          .alleva-value-cards {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 720px) {
          .alive-project-hero-meta-line,
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
