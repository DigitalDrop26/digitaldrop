import { Fragment, useEffect, useRef } from "react";
import astaHeroBg from "@Immagini/Fiera Cremona/Fiera Cremona.jpg?url";
import astaGallery1 from "@Immagini/Fiera Cremona/FieraCremona_1.jpg?url";
import astaGallery2 from "@Immagini/Fiera Cremona/FieraCremona_2.png?url";
import astaSolutionImage from "@Immagini/Fiera Cremona/Fiera Cremona ibrida globale.png?url";
import astaEvent01 from "@Immagini/Fiera Cremona/Fiera globale ibrida/asta2022_10.jpg?url";
import astaEvent02 from "@Immagini/Fiera Cremona/Fiera globale ibrida/asta2022_17.jpg?url";
import astaEvent03 from "@Immagini/Fiera Cremona/Fiera globale ibrida/Copia di asta2022_19.jpg?url";
import astaEvent04 from "@Immagini/Fiera Cremona/Fiera globale ibrida/Copia di asta2022_23.jpeg?url";
import astaEvent05 from "@Immagini/Fiera Cremona/Fiera globale ibrida/Copia di asta2022_29.jpg?url";
import astaEvent06 from "@Immagini/Fiera Cremona/Fiera globale ibrida/Copia di asta2022_46.jpg?url";
import astaMetamorfosi from "@Immagini/Fiera Cremona/Metamorfosi.png?url";
import astaAppPhone from "@Immagini/Fiera Cremona/asta in diretta.png?url";
import astaCharity from "@Immagini/Fiera Cremona/for charity.png?url";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectBackFab } from "./DropProjectBackFab";
import { DropProjectPrefooter } from "./DropProjectPrefooter";
import { CursorFollower, DropProjectHeroYearLine, Reveal, useReveal, useScrollY } from "./hooksAndUi";

const PROJECT_NAME = "Fiera Zootecnica Internazionale di Cremona";

const bodyStyle = {
  fontSize: 17,
  lineHeight: 1.72,
  fontWeight: 500,
  color: "var(--ink)",
  maxWidth: "52ch",
  margin: 0,
} as const;

const astaProgettoGallery = [
  { src: astaGallery1, alt: "Fiera Zootecnica di Cremona, European Sale at Cremona — box bestiame in fiera" },
  { src: astaGallery2, alt: "Fiera Zootecnica di Cremona, preparazione del bestiame in anello" },
] as const;

const astaEventGrid = [
  { src: astaEvent01, alt: "Fiera Zootecnica di Cremona, catalogo e materiali dell'asta live" },
  { src: astaEvent02, alt: "Fiera Zootecnica di Cremona, anello d'asta con pubblico in arena" },
  { src: astaEvent03, alt: "Fiera Zootecnica di Cremona, bestiame in presentazione" },
  { src: astaEvent04, alt: "Fiera Zootecnica di Cremona, palco con schermo dell'asta live" },
  { src: astaEvent05, alt: "Fiera Zootecnica di Cremona, team sul palco dell'evento" },
  { src: astaEvent06, alt: "Fiera Zootecnica di Cremona, regia e streaming dell'asta" },
] as const;

const astaAppCards = [
  {
    n: "01",
    title: "Portata globale",
    body: "Compratori da ogni angolo del mondo partecipano all'asta in diretta, senza più barriere geografiche.",
    dark: false,
  },
  {
    n: "02",
    title: "Trasparenza & equità",
    body: "Offerte tracciate in tempo reale: un processo chiaro che rafforza la fiducia dei partecipanti.",
    dark: true,
  },
  {
    n: "03",
    title: "Esperienza ibrida",
    body: "Ring fisico e piattaforma digitale convivono: chi è in fiera e chi è da remoto vive la stessa asta.",
    dark: false,
  },
] as const;

/** Pagina progetto — Fiera Zootecnica Internazionale di Cremona. */
export function DropProjectAstaCremonaPage() {
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
          className="asta-hero alive-project-hero-fold"
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
            backgroundColor: "var(--ink-deep)",
            backgroundImage: `url(${astaHeroBg})`,
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
                "linear-gradient(165deg, rgba(0, 19, 40, 0.82) 0%, rgba(0, 26, 52, 0.68) min(48%, 560px), rgba(0, 19, 40, 0.76) 100%)",
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
                    Fiera Zootecnica Internazionale di Cremona
                  </p>
                  <h1
                    className="display display-lg"
                    style={{
                      marginTop: 20,
                      marginBottom: 0,
                      letterSpacing: "-0.038em",
                      lineHeight: 1.04,
                      color: "#ffffff",
                      maxWidth: "14ch",
                    }}
                  >
                    Innovare un settore{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>tradizionale.</em>
                  </h1>
                  <DropProjectHeroYearLine
                    categories="Strategia · Comunicazione"
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
            <div className="asta-progetto-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">01 · Il progetto</span>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    AstaCR è la{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>European Sale di Cremona</strong>: l&apos;asta
                    internazionale di bovine da latte che anima le Fiere Zootecniche Internazionali di Cremona. Un
                    appuntamento storico del settore, da sempre legato alla fisicità del ring — animali, allevatori e
                    compratori riuniti nello stesso spazio. La sfida: portarne il cuore, l&apos;asta, nell&apos;era digitale senza
                    perderne il valore.
                  </p>
                </Reveal>
              </div>

              <aside className="asta-progetto-aside">
                <Reveal delay={1}>
                  <div className="asta-meta-block">
                    <h3 className="asta-meta-label">Attività</h3>
                    <ul className="asta-meta-list">
                      <li>Strategia digitale</li>
                      <li>Sviluppo app dedicata</li>
                      <li>Visual &amp; concept</li>
                      <li>Asta di beneficenza</li>
                    </ul>
                  </div>
                  <div className="asta-meta-block" style={{ marginTop: 32 }}>
                    <h3 className="asta-meta-label">Deliverables</h3>
                    <ul className="asta-meta-list">
                      <li>App per l&apos;asta live</li>
                      <li>Concept &ldquo;Metamorfosi&rdquo;</li>
                      <li>Campagna social evento</li>
                      <li>Iniziativa @CR for Charity</li>
                    </ul>
                  </div>
                </Reveal>
              </aside>
            </div>

            <div className="asta-duo-gallery" role="list" aria-label={`Immagini ${PROJECT_NAME}`}>
              {astaProgettoGallery.map((item, i) => (
                <Reveal key={item.src} delay={i} role="listitem" className="asta-media-card">
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
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Digitalizzare</em> il cuore
                  dell&apos;evento.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Le fiere zootecniche sono eventi immersivi: i partecipanti vivono un&apos;esperienza diretta con animali,
                  attrezzature e prodotti del settore. La Fiera di Cremona voleva però{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>innovare l&apos;esperienza</strong>,
                  digitalizzando una parte fondamentale dell&apos;evento: l&apos;asta.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="progetto-soluzione" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div className="asta-split-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">03 · La soluzione</span>
                  <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Un&apos;asta</em> ibrida e globale.
                  </h2>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    La risposta a questa sfida è stata l&apos;implementazione di una soluzione ibrida: lo sviluppo di
                    un&apos;{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>applicazione dedicata</strong> che ha
                    permesso la partecipazione all&apos;asta, abbattendo le barriere geografiche e culturali. Incorporando i{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>valori della zootecnia</strong>, abbiamo
                    organizzato{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>raccolte fondi</strong> per supportare
                    associazioni e progetti sociali virtuosi, dimostrando un impegno concreto verso il sociale.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={1} className="asta-split-media">
                <div className="asta-media-card">
                  <img
                    src={astaSolutionImage}
                    alt="Fiera Zootecnica di Cremona, asta ibrida e globale in arena con pubblico live"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="progetto-evento" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <Reveal delay={0}>
              <div className="asta-video-placeholder" aria-label={`Video showcase ${PROJECT_NAME}`}>
                <span>Video</span>
              </div>
            </Reveal>

            <div className="asta-event-grid" role="list" aria-label={`Galleria evento ${PROJECT_NAME}`}>
              {astaEventGrid.map((item, i) => (
                <Reveal key={item.src} delay={1 + (i % 3)} role="listitem" className="asta-media-card">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-visual" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">04 · Visual &amp; concept</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Metamorfosi</em>: un evento che si
                  trasforma.
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Abbiamo rivoluzionato il visual e il concept dell&apos;asta, presentando un&apos;immagine rinnovata che riflette
                  l&apos;innovazione e l&apos;apertura internazionale dell&apos;evento. Un rinnovamento che non migliora solo
                  l&apos;estetica, ma comunica con efficacia{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>l&apos;evoluzione del settore.</strong>
                </p>
              </Reveal>
            </div>

            <Reveal delay={1}>
              <div className="asta-feature-card asta-media-card" style={{ marginTop: "clamp(48px, 7vw, 80px)" }}>
                <img
                  src={astaMetamorfosi}
                  alt="Fiera Zootecnica di Cremona, key visual Metamorfosi con bestiame e farfalle"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="progetto-app" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div className="asta-split-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">05 · L&apos;app dedicata</span>
                  <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>L&apos;asta</em> in diretta,{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>in tasca</em> a chiunque.
                  </h2>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    Con l&apos;app dedicata, AstaCR ha ampliato la sua portata, attirando partecipanti da tutto il mondo e
                    migliorando la qualità dell&apos;esperienza d&apos;asta. La tecnologia ha reso il processo{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>più trasparente ed equo</strong>,
                    rafforzando fiducia e soddisfazione tra gli utenti.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={1} className="asta-split-media">
                <div className="asta-media-card">
                  <img
                    src={astaAppPhone}
                    alt="Fiera Zootecnica di Cremona, app mobile per l'asta live"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </Reveal>
            </div>

            <div className="asta-value-cards">
              {astaAppCards.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={i}
                  className={`asta-value-card${card.dark ? " asta-value-card--dark" : ""}`}
                >
                  <div className="asta-value-card-index">{card.n}</div>
                  <h3 className="display asta-value-card-title">{card.title}</h3>
                  <p className="asta-value-card-body">{card.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-charity" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">06 · L&apos;asta di beneficenza</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>@CR for Charity:</em> l&apos;asta che fa
                  del bene.
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Una componente fondamentale della strategia è stata l&apos;introduzione di un&apos;iniziativa di beneficenza,
                  che ha raccolto fondi per associazioni e progetti sociali virtuosi. Un impegno concreto verso il sociale, che
                  ha arricchito l&apos;esperienza dell&apos;asta di{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>un valore aggiunto significativo.</strong>
                </p>
              </Reveal>
            </div>

            <Reveal delay={1}>
              <div className="asta-feature-card asta-media-card" style={{ marginTop: "clamp(48px, 7vw, 80px)" }}>
                <img
                  src={astaCharity}
                  alt="Fiera Zootecnica di Cremona, campagna @CR for Charity"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="progetto-conclusione" className="section asta-conclusion" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <Reveal delay={0}>
              <div className="asta-conclusion-inner">
                <h2 className="display display-md" style={{ margin: 0, color: "var(--drop-teal)" }}>
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>
                    Ast@CR ha riscritto le regole
                  </em>
                  <br />
                  delle aste zootecniche.
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 48px)", maxWidth: "42ch", marginLeft: "auto", marginRight: "auto" }}>
                  Le abbiamo portate nell&apos;era digitale. Aiutiamo imprese e istituzioni del settore primario a
                  innovare, comunicare e crescere con il mercato.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <DropProjectPrefooter />
        <DropNewsletter />
      </main>

      <style>{`
        .alive-project-hero-fold {
          min-height: 100vh;
          min-height: 100dvh;
        }
        .asta-media-card {
          border-radius: 24px;
          overflow: hidden;
          line-height: 0;
          background: var(--teal-100);
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.22);
        }
        .asta-media-card img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 1.4s var(--ease);
        }
        .asta-media-card:hover img {
          transform: scale(1.02);
        }
        .asta-progetto-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: clamp(36px, 5vw, 72px);
          align-items: start;
        }
        .asta-meta-label {
          margin: 0 0 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--drop-orange);
        }
        .asta-meta-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .asta-meta-list li {
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          color: var(--drop-teal);
        }
        .asta-duo-gallery {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        .asta-duo-gallery .asta-media-card img {
          aspect-ratio: 16 / 10;
        }
        .asta-split-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(36px, 5vw, 80px);
          align-items: center;
        }
        .asta-split-media {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
        .asta-split-media .asta-media-card {
          width: min(100%, 620px);
        }
        .asta-split-media .asta-media-card img {
          aspect-ratio: 16 / 10;
        }
        .asta-video-placeholder {
          min-height: clamp(280px, 42vw, 520px);
          border: 2px solid var(--drop-orange);
          border-radius: 24px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.55);
        }
        .asta-video-placeholder span {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--drop-orange);
          font-family: Georgia, "Times New Roman", serif;
        }
        .asta-event-grid {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        .asta-event-grid .asta-media-card img {
          aspect-ratio: 16 / 10;
        }
        .asta-feature-card img {
          width: 100%;
          height: auto;
        }
        .asta-value-cards {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 2.5vw, 28px);
          align-items: stretch;
        }
        .asta-value-card {
          border-radius: 28px;
          padding: clamp(32px, 3.5vw, 40px) clamp(28px, 3vw, 36px);
          min-height: 100%;
          background: #ffffff;
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.25);
          transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
        }
        .asta-value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px -28px rgba(0, 44, 66, 0.35);
        }
        .asta-value-card--dark {
          background: var(--drop-teal);
        }
        .asta-value-card-index {
          margin: 0 0 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1;
          color: var(--drop-orange);
        }
        .asta-value-card-title {
          margin: 0 0 16px;
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: var(--drop-teal);
        }
        .asta-value-card--dark .asta-value-card-title {
          color: #ffffff;
        }
        .asta-value-card-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 500;
          color: var(--ink);
          max-width: 36ch;
        }
        .asta-value-card--dark .asta-value-card-body {
          color: rgba(255, 255, 255, 0.82);
        }
        .asta-conclusion {
          padding-top: clamp(80px, 12vw, 120px);
          padding-bottom: clamp(80px, 12vw, 120px);
        }
        .asta-conclusion-inner {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
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
          .asta-progetto-grid,
          .asta-split-grid {
            grid-template-columns: 1fr;
          }
          .asta-duo-gallery,
          .asta-event-grid,
          .asta-value-cards {
            grid-template-columns: 1fr;
          }
          .asta-split-media {
            justify-content: flex-start;
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
