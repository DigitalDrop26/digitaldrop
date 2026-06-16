import { Fragment, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import anafibjHeroBg from "@Immagini/Anafibj/Anafibj_hero.png?url";
import anafibjGalleryBarn from "@Immagini/Anafibj/anafibj09.png?url";
import anafibjSolutionApp from "@Immagini/Anafibj/cell anafibj-04.png?url";
import anafibjPlatformLaptop from "@Immagini/Anafibj/Anafibij_laptop.png?url";
import anafibjSocial01 from "@Immagini/Anafibj/anafibj01_mobile.png?url";
import anafibjSocial02 from "@Immagini/Anafibj/CLAIM.png?url";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectBackFab } from "./DropProjectBackFab";
import { DropProjectPrefooter } from "./DropProjectPrefooter";
import { CursorFollower, DropProjectHeroYearLine, Reveal, useReveal, useScrollY } from "./hooksAndUi";

const PROJECT_NAME = "Anafibj";

const bodyStyle = {
  fontSize: 17,
  lineHeight: 1.72,
  fontWeight: 500,
  color: "var(--ink)",
  maxWidth: "52ch",
  margin: 0,
} as const;

const anafibjSocialGallery = [
  { src: anafibjSocial01, alt: "Anafibj, campagna social Your cow our future con mucca e vitello" },
  { src: anafibjSocial02, alt: "Anafibj, key visual campagna Your cow our future" },
] as const;

const anafibjPlatformCards = [
  {
    n: "01",
    title: "App personalizzata",
    body: "Una piattaforma costruita sui processi reali dell'associazione: contatti, regioni, servizi e consensi in un colpo d'occhio.",
    dark: false,
  },
  {
    n: "02",
    title: "WhatsApp Business",
    body: "Il canale primario di contatto: messaggi e broadcast su uno strumento che gli allevatori usano ogni giorno.",
    dark: true,
  },
  {
    n: "03",
    title: "Dialogo bidirezionale",
    body: "Non più solo annunci: un flusso di comunicazione personalizzato, in entrata e in uscita, con ogni socio.",
    dark: false,
  },
] as const;

function AnafibjSocialGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLImageElement>(null);

  const syncGalleryHeight = useCallback(() => {
    const landscape = landscapeRef.current;
    const gallery = galleryRef.current;
    if (!landscape || !gallery) return;

    if (window.matchMedia("(max-width: 900px)").matches) {
      gallery.style.removeProperty("--anafibj-duo-height");
      return;
    }

    const height = landscape.getBoundingClientRect().height;
    if (height <= 0) {
      gallery.style.removeProperty("--anafibj-duo-height");
      return;
    }

    gallery.style.setProperty("--anafibj-duo-height", `${height}px`);
  }, []);

  useLayoutEffect(() => {
    syncGalleryHeight();

    const landscape = landscapeRef.current;
    if (!landscape) return;

    const onLoad = () => syncGalleryHeight();
    landscape.addEventListener("load", onLoad);

    const ro = new ResizeObserver(syncGalleryHeight);
    ro.observe(landscape);

    const mq = window.matchMedia("(max-width: 900px)");
    const onMqChange = () => syncGalleryHeight();
    mq.addEventListener("change", onMqChange);
    window.addEventListener("resize", syncGalleryHeight);

    return () => {
      ro.disconnect();
      landscape.removeEventListener("load", onLoad);
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("resize", syncGalleryHeight);
    };
  }, [syncGalleryHeight]);

  return (
    <div ref={galleryRef} className="anafibj-duo-gallery" role="list" aria-label={`Campagna social ${PROJECT_NAME}`}>
      <Reveal delay={0} role="listitem" className="anafibj-media-card anafibj-duo-gallery__item anafibj-duo-gallery__item--portrait">
        <img
          src={anafibjSocialGallery[0].src}
          alt={anafibjSocialGallery[0].alt}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </Reveal>
      <Reveal delay={1} role="listitem" className="anafibj-media-card anafibj-duo-gallery__item anafibj-duo-gallery__item--landscape">
        <img
          ref={landscapeRef}
          src={anafibjSocialGallery[1].src}
          alt={anafibjSocialGallery[1].alt}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </Reveal>
    </div>
  );
}

/** Pagina progetto — Anafibj · ANAFIJ. */
export function DropProjectAnafibjPage() {
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
          className="anafibj-hero alive-project-hero-fold"
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
            backgroundImage: `url(${anafibjHeroBg})`,
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
                "linear-gradient(165deg, rgba(0, 19, 40, 0.82) 0%, rgba(0, 26, 52, 0.58) min(48%, 560px), rgba(0, 19, 40, 0.76) 100%)",
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
                    Associazione Nazionale Allevatori della razza Frisona, Bruna e Jersey Italiana
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
                    Mettere in connessione{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>
                      gli allevatori di tutta Italia.
                    </em>
                  </h1>
                  <DropProjectHeroYearLine
                    categories="Digital Transformation · App · Identity"
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
            <div className="anafibj-progetto-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">01 · Il progetto</span>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    Anafibj è l&apos;{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>
                      Associazione Nazionale Allevatori della razza Frisona, Bruna e Jersey Italiana
                    </strong>
                    : il punto di riferimento per la selezione genetica e i servizi tecnici alle stalle da latte del Paese.
                    Una rete capillare di soci allevatori, dalle grandi aziende alle realtà familiari, distribuiti su tutto
                    il territorio. Il valore è enorme — ma raggiungere e ingaggiare ogni socio resta una sfida quotidiana.
                  </p>
                </Reveal>
              </div>

              <aside className="anafibj-progetto-aside">
                <Reveal delay={1}>
                  <div className="anafibj-meta-block">
                    <h3 className="anafibj-meta-label">Attività</h3>
                    <ul className="anafibj-meta-list">
                      <li>Analisi dei bisogni dei soci</li>
                      <li>Sviluppo web application</li>
                      <li>Integrazione WhatsApp Business</li>
                      <li>Identità visiva &amp; strategia social</li>
                    </ul>
                  </div>
                  <div className="anafibj-meta-block" style={{ marginTop: 32 }}>
                    <h3 className="anafibj-meta-label">Deliverables</h3>
                    <ul className="anafibj-meta-list">
                      <li>Prima community della filiera PR</li>
                      <li>Punto d&apos;incontro digitale</li>
                      <li>Strategia di dialogo aperto</li>
                      <li>Spazi di condivisione risorse</li>
                    </ul>
                  </div>
                </Reveal>
              </aside>
            </div>

            <Reveal delay={2}>
              <div className="anafibj-media-card anafibj-feature-card" style={{ marginTop: "clamp(48px, 7vw, 80px)" }}>
                <img
                  src={anafibjGalleryBarn}
                  alt="Anafibj, allevamento bovino in moderna stalla"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="progetto-sfida" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">02 · La sfida</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Un <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>target</em> difficile da
                  raggiungere.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Nel settore zootecnico, Anafibj ha affrontato una sfida cruciale:{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>
                    migliorare e intensificare la comunicazione
                  </strong>{" "}
                  con i soci allevatori. Un pubblico difficile da raggiungere, a causa di barriere comunicative persistenti.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="progetto-soluzione" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div className="anafibj-split-grid">
              <div className="anafibj-split-copy">
                <Reveal delay={0}>
                  <span className="eyebrow">03 · La soluzione</span>
                  <h2
                    className="display display-lg"
                    style={{ marginTop: 28, marginBottom: 0, maxWidth: "14ch" }}
                  >
                    Una comunicazione{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>bidirezionale.</em>
                  </h2>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    Abbiamo implementato un approccio innovativo, usando la tecnologia per facilitare una comunicazione{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>bidirezionale e personalizzata</strong>.
                    Dall&apos;analisi dei bisogni degli allevatori, l&apos;associazione ha rivisto e potenziato i suoi canali
                    digitali.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={1} className="anafibj-split-media">
                <div className="anafibj-media-card">
                  <img
                    src={anafibjSolutionApp}
                    alt="Anafibj, app mobile per la comunicazione con gli allevatori"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={2}>
              <div className="anafibj-media-card anafibj-feature-card" style={{ marginTop: "clamp(48px, 7vw, 80px)" }}>
                <img
                  src={anafibjPlatformLaptop}
                  alt="Anafibj, piattaforma web e dashboard per la gestione della comunicazione"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="progetto-piattaforma" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <h2 className="display display-lg" style={{ marginTop: 0, marginBottom: 0 }}>
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Una piattaforma su misura,</em>{" "}
                  WhatsApp come porta d&apos;ingresso.
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Abbiamo sviluppato un&apos;{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>applicazione dedicata</strong> e adottato{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>WhatsApp Business</strong> come touch point
                  primario, per valorizzare e facilitare il rapporto tra l&apos;associazione e gli allevatori. Un canale
                  familiare, immediato, già nelle mani di tutti.
                </p>
              </Reveal>
            </div>

            <div className="anafibj-value-cards">
              {anafibjPlatformCards.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={1 + i}
                  className={`anafibj-value-card${card.dark ? " anafibj-value-card--dark" : ""}`}
                >
                  <div className="anafibj-value-card-index">{card.n}</div>
                  <h3 className="display anafibj-value-card-title">{card.title}</h3>
                  <p className="anafibj-value-card-body">{card.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-social" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">04 · Strategia di comunicazione</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  &ldquo;
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Your</em> cow,
                  <br />
                  our <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>future</em>.&rdquo;
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Anafibj ha rivoluzionato l&apos;approccio ai social media, sviluppando un&apos;identità visiva coerente e un
                  nuovo claim: &laquo;your cow, our future&raquo;. Il messaggio mette al centro la relazione tra allevatore,
                  mandria e futuro della razza.
                </p>
              </Reveal>
            </div>

            <AnafibjSocialGallery />
          </div>
        </section>

        <section id="progetto-chiusura" className="section anafibj-conclusion" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <Reveal delay={0}>
              <h2 className="display display-md" style={{ margin: 0, color: "var(--drop-teal)", maxWidth: "22ch" }}>
                Quando la digital transformation diventa realtà,{" "}
                <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>tutto si semplifica.</em>
              </h2>
            </Reveal>
          </div>
        </section>

        <DropProjectPrefooter />
        <DropNewsletter />
      </main>

      <style>{`
        .anafibj-media-card {
          border-radius: 24px;
          overflow: hidden;
          line-height: 0;
          background: var(--teal-100);
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.22);
        }
        .anafibj-media-card img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 1.4s var(--ease);
        }
        .anafibj-media-card:hover img {
          transform: scale(1.02);
        }
        .anafibj-progetto-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: clamp(36px, 5vw, 72px);
          align-items: start;
        }
        .anafibj-meta-label {
          margin: 0 0 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--drop-orange);
        }
        .anafibj-meta-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .anafibj-meta-list li {
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          color: var(--drop-teal);
        }
        .anafibj-feature-card img {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 8;
        }
        .anafibj-split-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(48px, 6vw, 96px);
          align-items: center;
        }
        .anafibj-split-copy {
          min-width: 0;
        }
        .anafibj-split-media {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          min-width: 0;
        }
        .anafibj-split-media .anafibj-media-card {
          width: min(90%, 558px);
        }
        .anafibj-split-media .anafibj-media-card img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        .anafibj-value-cards {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 2.5vw, 28px);
          align-items: stretch;
        }
        .anafibj-value-card {
          border-radius: 28px;
          padding: clamp(32px, 3.5vw, 40px) clamp(28px, 3vw, 36px);
          min-height: 100%;
          background: #ffffff;
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.25);
          transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
        }
        .anafibj-value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px -28px rgba(0, 44, 66, 0.35);
        }
        .anafibj-value-card--dark {
          background: var(--drop-teal);
        }
        .anafibj-value-card-index {
          margin: 0 0 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1;
          color: var(--drop-orange);
        }
        .anafibj-value-card-title {
          margin: 0 0 16px;
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: var(--drop-teal);
        }
        .anafibj-value-card--dark .anafibj-value-card-title {
          color: #ffffff;
        }
        .anafibj-value-card-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 500;
          color: var(--ink);
          max-width: 36ch;
        }
        .anafibj-value-card--dark .anafibj-value-card-body {
          color: rgba(255, 255, 255, 0.82);
        }
        .anafibj-duo-gallery {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: clamp(16px, 2vw, 24px);
          align-items: start;
        }
        .anafibj-duo-gallery__item {
          min-width: 0;
        }
        .anafibj-duo-gallery__item--portrait {
          width: fit-content;
          max-width: min(42vw, 100%);
          justify-self: start;
        }
        .anafibj-duo-gallery .anafibj-media-card img {
          object-fit: contain;
        }
        .anafibj-duo-gallery__item--landscape img {
          width: 100%;
          height: auto;
          display: block;
        }
        .anafibj-duo-gallery__item--portrait img {
          height: var(--anafibj-duo-height, auto);
          width: auto;
          max-width: 100%;
          display: block;
        }
        .anafibj-conclusion {
          padding-top: clamp(80px, 12vw, 120px);
          padding-bottom: clamp(80px, 12vw, 120px);
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
          .anafibj-progetto-grid,
          .anafibj-split-grid {
            grid-template-columns: 1fr;
          }
          .anafibj-split-media {
            justify-content: flex-start;
          }
          .anafibj-duo-gallery {
            grid-template-columns: 1fr;
          }
          .anafibj-duo-gallery__item--portrait {
            width: 100%;
            max-width: none;
          }
          .anafibj-duo-gallery__item--portrait img,
          .anafibj-duo-gallery__item--landscape img {
            width: 100%;
            height: auto;
          }
          .anafibj-value-cards {
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
