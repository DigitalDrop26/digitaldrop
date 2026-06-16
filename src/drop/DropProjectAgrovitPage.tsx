import { Fragment, useEffect, useRef, useState } from "react";
import agrovitMascotte01 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-01.png?url";
import agrovitLogoAnimation from "@Immagini/Agrovit/prova animazione.mov?url";
import agrovitMascotte02 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-02.png?url";
import agrovitMascotte03 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-03.png?url";
import agrovitMascotte04 from "@Immagini/Agrovit/Mascotte/mascotte_agrovit-04.png?url";
import agrovitHeroTestata from "@Immagini/Agrovit/adv stampa/agrovit_testata.png?url";
import agrovitContesto1 from "@Immagini/Agrovit/Agrovit_1.jpg?url";
import agrovitContesto2 from "@Immagini/Agrovit/Agrovit 2.png?url";
import agrovitContesto3 from "@Immagini/Agrovit/Agrovit 3.jpg?url";
import agrovitOfflineAdvMockup03 from "@Immagini/Agrovit/adv stampa/adv mockup-03.jpg?url";
import agrovitOfflineAdvMockup04 from "@Immagini/Agrovit/adv stampa/adv mockup-04.jpg?url";
import agrovitOfflineAdvMockup05 from "@Immagini/Agrovit/adv stampa/adv mockup-05.jpg?url";
import agrovitOfflineRivistaTavolo from "@Immagini/Agrovit/adv stampa/ChatGPT Image 1 giu 2026, 16_01_53.png?url";
import agrovitOfflinePosterAlleato from "@Immagini/Agrovit/adv stampa/agrovit MARZO-APRILE-39.jpg?url";
import agrovitOfflinePosterSacco from "@Immagini/Agrovit/adv stampa/agrovit MARZO-APRILE-40.jpg?url";
import agrovitSocial06 from "@Immagini/Agrovit/social/06.02.png?url";
import agrovitSocial09 from "@Immagini/Agrovit/social/09.12_Tavola disegno 2 copia 14-21.png?url";
import agrovitSocial10 from "@Immagini/Agrovit/social/10.06-01.jpg?url";
import agrovitSocial12 from "@Immagini/Agrovit/social/12.02.jpg?url";
import agrovitSocial14 from "@Immagini/Agrovit/social/14.01.jpg?url";
import agrovitSocial17 from "@Immagini/Agrovit/social/17.04_Tavola disegno 2 copia 15.jpg?url";
import agrovitSocial20 from "@Immagini/Agrovit/social/20.07_Tavola disegno 2 copia 17.jpg?url";
import agrovitSocial21 from "@Immagini/Agrovit/social/21.10_01.jpg?url";
import agrovitSocial24 from "@Immagini/Agrovit/social/24.06-08.jpg?url";
import agrovitSocial25 from "@Immagini/Agrovit/social/25.02.jpg?url";
import agrovitSocial26 from "@Immagini/Agrovit/social/26.11.jpg?url";
import agrovitSocial28 from "@Immagini/Agrovit/social/28.01.jpg?url";
import agrovitSocialAgronia from "@Immagini/Agrovit/social/agronia.jpg?url";
import agrovitSocialAsciutta from "@Immagini/Agrovit/social/agrovit MARZO-APRILE_Tavola disegno 2 copia 14.jpg?url";
import agrovitSocialLiveYeast from "@Immagini/Agrovit/social/LIVE YEAST STB.jpg?url";
import agrovitReel1R from "@Immagini/Agrovit/social/reel/1R.mp4?url";
import agrovitReel2D from "@Immagini/Agrovit/social/reel/2D-valore e visione.mp4?url";
import agrovitReel2M from "@Immagini/Agrovit/social/reel/2M.mp4?url";
import agrovitReel3E from "@Immagini/Agrovit/social/reel/3E.mp4?url";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectPrefooter } from "./DropProjectPrefooter";
import { DropProjectBackFab } from "./DropProjectBackFab";
import { DropProjectMediaMasonry, type MediaMasonryRow } from "./DropProjectMediaMasonry";
import { DropProjectSocialMasonry, type SocialMasonryItem } from "./DropProjectSocialMasonry";
import { CursorFollower, DropProjectHeroYearLine, Reveal, useReveal, useScrollY } from "./hooksAndUi";

const agrovitCarouselSlides = [
  agrovitMascotte01,
  agrovitMascotte02,
  agrovitMascotte03,
  agrovitMascotte04,
] as const;

const agrovitContestoGallery = [
  {
    src: agrovitContesto1,
    alt: "Agrovit, palletizzazione sacchi in stabilimento industriale",
  },
  {
    src: agrovitContesto2,
    alt: "Agrovit, sede a vista aerea",
  },
  {
    src: agrovitContesto3,
    alt: "Agrovit, sacco prodotti in ambiente industriale",
    objectPosition: "center bottom",
  },
] as const;

const agrovitLogoCards = [
  {
    n: "01",
    title: "Concept",
    body: "Un'idea guida: gli integratori come alleati. Ogni molecola, ogni fase del ciclo produttivo ha un suo personaggio dedicato.",
    dark: false,
  },
  {
    n: "02",
    title: "Carattere",
    body: "Bozzetti, espressioni, pose e accessori: re, scienziato, detective, atleta. Un cast costruito tratto dopo tratto.",
    dark: true,
  },
  {
    n: "03",
    title: "Obiettivo",
    body: "Palette, tono di voce e pattern goccia mandano in sincrono packaging, social e stampa — sempre riconoscibili.",
    dark: false,
  },
] as const;

const agrovitSocialSteps = [
  {
    n: "01",
    title: "Awareness",
    body: "Far conoscere il brand e i suoi valori, presidiando il feed con continuità e coerenza.",
  },
  {
    n: "02",
    title: "Produzione contenuti",
    body: "Post, caroselli e format ricorrenti che traducono la tecnica in messaggi chiari.",
  },
  {
    n: "03",
    title: "Shooting",
    body: "Servizi fotografici in stabilimento e in stalla: prodotto, persone e mandria reali.",
  },
  {
    n: "04",
    title: "Produzione video",
    body: "Sigle animate e pillole di prodotto per dare ritmo e voce al racconto.",
  },
] as const;

/** Griglia materiale offline — 3 mockup, hero rivista, 3 poster. */
const agrovitOfflineRows: MediaMasonryRow[] = [
  {
    type: "split",
    columns: 3,
    items: [
      {
        src: agrovitOfflineAdvMockup03,
        alt: "Agrovit, mockup pagina rivista di settore",
      },
      {
        src: agrovitOfflineAdvMockup04,
        alt: "Agrovit, griglia flyer e brochure coordinate",
      },
      {
        src: agrovitOfflineAdvMockup05,
        alt: "Agrovit, biglietti da visita e materiali POS",
      },
    ],
  },
  {
    type: "full",
    item: {
      src: agrovitOfflineRivistaTavolo,
      alt: "Agrovit, rivista aperta su tavolo in stalla",
    },
  },
  {
    type: "split",
    columns: 3,
    items: [
      {
        src: agrovitOfflinePosterSacco,
        alt: "Agrovit, poster — mi piace un sacco",
      },
      {
        src: agrovitOfflinePosterAlleato,
        alt: "Agrovit, poster — Dentro Agrovit c'è un tuo alleato",
      },
      {
        src: agrovitOfflinePosterSacco,
        alt: "Agrovit, poster — mi piace un sacco",
      },
    ],
  },
];

/** Feed social — 3 colonne masonry (ordine wireframe). */
const agrovitSocialColumns: SocialMasonryItem[][] = [
  [
    { type: "image", src: agrovitSocial21, alt: "Agrovit, post social — Cosa facciamo", variant: "post" },
    { type: "image", src: agrovitSocial24, alt: "Agrovit, post social — Transizione", variant: "post" },
    { type: "image", src: agrovitSocial28, alt: "Agrovit, post social — Safemold Plus E", variant: "post" },
    { type: "video", src: agrovitReel1R, alt: "Agrovit, reel — stabilimento e prodotti", variant: "reel" },
    { type: "image", src: agrovitSocial09, alt: "Agrovit, post social — Chelati", variant: "post" },
    { type: "image", src: agrovitSocial12, alt: "Agrovit, post social — Vitelli in stalla", variant: "post" },
  ],
  [
    { type: "video", src: agrovitReel2D, alt: "Agrovit, reel — valore e visione", variant: "reel" },
    { type: "image", src: agrovitSocial25, alt: "Agrovit, post social — GS Manze", variant: "post" },
    { type: "image", src: agrovitSocialAgronia, alt: "Agrovit, post social — Agro Nia Chol XC", variant: "post" },
    { type: "video", src: agrovitReel2M, alt: "Agrovit, reel — magazzino e team", variant: "reel" },
    { type: "image", src: agrovitSocial06, alt: "Agrovit, post social — Amino K Plus", variant: "post" },
    { type: "image", src: agrovitSocialAsciutta, alt: "Agrovit, post social — Asciutta", variant: "post" },
  ],
  [
    { type: "image", src: agrovitSocial20, alt: "Agrovit, post social — Stress da caldo", variant: "post" },
    { type: "image", src: agrovitSocial26, alt: "Agrovit, post social — GS Lattazione", variant: "post" },
    { type: "image", src: agrovitSocial17, alt: "Agrovit, post social — Qualità del latte", variant: "post" },
    { type: "video", src: agrovitReel3E, alt: "Agrovit, reel — prodotto in campo", variant: "reel" },
    { type: "image", src: agrovitSocial10, alt: "Agrovit, post social — Insilati", variant: "post" },
    { type: "image", src: agrovitSocial14, alt: "Agrovit, post social — Stalla e mandria", variant: "post" },
    { type: "image", src: agrovitSocialLiveYeast, alt: "Agrovit, post social — Live Yeast STB", variant: "post" },
  ],
];

const bodyStyle = {
  fontSize: 17,
  lineHeight: 1.72,
  fontWeight: 500,
  color: "var(--ink)",
  maxWidth: "52ch",
  margin: 0,
} as const;

/** Durata (ms) di permanenza di ogni mascotte nello showcase auto-play. */
const AGROVIT_MASCOT_INTERVAL_MS = 4000;

/** Mascotte che si alternano come un breve filmato (crossfade, zoom lento). */
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

  const scrollToContent = () => {
    const el = document.getElementById("progetto-contesto");
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
                    Agrovit
                  </p>
                  <h1
                    className="display display-lg"
                    style={{
                      marginTop: 16,
                      marginBottom: 0,
                      letterSpacing: "-0.038em",
                      lineHeight: 1.06,
                      color: "#ffffff",
                      maxWidth: "16ch",
                    }}
                  >
                    Un brand agro che{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>parla alle persone.</em>
                  </h1>
                  <DropProjectHeroYearLine
                    categories="Visual - Content - Social"
                    separator=" - "
                    year="2025"
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

        <section id="progetto-contesto" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div className="agrovit-contesto-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">01 · Contesto</span>
                  <p
                    style={{
                      ...bodyStyle,
                      marginTop: "clamp(32px, 5vw, 56px)",
                    }}
                  >
                    Agrovit è un&apos;azienda di{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>
                      integratori e nuclei minerali vitaminici
                    </strong>{" "}
                    per la zootecnia da oltre 30 anni. Un&apos;azienda fatta di persone per le persone, vicina ai territori,
                    attenta al benessere animale e alla redditività dell&apos;allevatore — focalizzata sull&apos;offerta di prodotti
                    sani, naturali e sicuri, ad alto valore aggiunto.
                  </p>
                </Reveal>
              </div>

              <aside className="agrovit-contesto-aside">
                <Reveal delay={1}>
                  <div className="agrovit-meta-block">
                    <h3 className="agrovit-meta-label">Focus</h3>
                    <ul className="agrovit-meta-list">
                      <li>Brand Identity</li>
                      <li>Comunicazione offline</li>
                      <li>Comunicazione online</li>
                      <li>Social media strategy</li>
                    </ul>
                  </div>
                  <div className="agrovit-meta-block" style={{ marginTop: 32 }}>
                    <h3 className="agrovit-meta-label">Outcome</h3>
                    <ul className="agrovit-meta-list">
                      <li>Sistema di icone e fregi</li>
                      <li>Creatività materiale offline</li>
                      <li>ADV cartaceo</li>
                      <li>Social feed</li>
                    </ul>
                  </div>
                </Reveal>
              </aside>
            </div>

            <div className="agrovit-contesto-gallery" role="list" aria-label="Contesto Agrovit">
              {agrovitContestoGallery.map((item, i) => (
                <Reveal key={item.src} delay={i} role="listitem" className="agrovit-contesto-gallery-item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={"objectPosition" in item ? { objectPosition: item.objectPosition } : undefined}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-sfida" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">02 · Sfida</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Dare voce a un partner tecnico{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>per gli allevatori.</em>
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Agrovit aveva la necessità di creare un brand coerente e riconoscibile dalla mano del proprio partner di
                  riferimento: l&apos;allevatore. Un brand che si ponesse al di sopra dell&apos;offerta di settore, basata su
                  parametri di{" "}
                  <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>
                    qualità, servizio tecnico e amichevolezza del brand.
                  </strong>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="progetto-soluzione"
          className="section"
          style={{ background: "#ffffff", paddingBottom: "clamp(64px, 10vw, 120px)" }}
        >
          <div className="container-wide">
            <div className="agrovit-solution-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">03 · Soluzione</span>
                  <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                    Un alleato{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>riconoscibile.</em>
                  </h2>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    Abbiamo costruito una strategia di comunicazione integrata, per dare coerenza e riconoscibilità al brand.
                    L&apos;alleato ideale, colui che vive con loro ogni giornata e ne conosce le dinamiche ed esigenze. Una figura
                    — anzi un ufficio sportivo — capace di porsi come un&apos;estensione del brand.
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

        <section id="progetto-logo" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div className="agrovit-logo-grid">
              <div>
                <Reveal delay={0}>
                  <span className="eyebrow">04 · Logo</span>
                  <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                    Il pittogramma Agrovit{" "}
                    <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>diventa corpo.</em>
                  </h2>
                  <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                    La forma del cerchio — la goccia rovesciata di Agrovit — si trasforma in un nuovo personaggio che dà vita al
                    brand, creando una{" "}
                    <strong style={{ color: "var(--drop-teal)", fontWeight: 700 }}>famiglia coerente</strong> capace di raccontare
                    i diversi valori e servizi dell&apos;azienda. Non più solo un logo, ma un progetto che si anima e parla
                    direttamente con l&apos;utente.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={1} className="agrovit-logo-visual">
                <div className="agrovit-logo-visual-card">
                  <video
                    src={agrovitLogoAnimation}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-label="Animazione mascotte Agrovit — concept dal pittogramma del brand"
                  />
                </div>
              </Reveal>
            </div>

            <div className="agrovit-logo-cards">
              {agrovitLogoCards.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={i}
                  className={`agrovit-logo-card${card.dark ? " agrovit-logo-card--dark" : ""}`}
                >
                  <div className="agrovit-logo-card-index">{card.n}</div>
                  <h3 className="display agrovit-logo-card-title">{card.title}</h3>
                  <p className="agrovit-logo-card-body">{card.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="progetto-offline" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">05 · Materiale offline</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Dalla pagina di rivista{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>alla brochure.</em>
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Abbiamo ideato sussidi di comunicazione per i tecnici e i rivenditori, con un&apos;impostazione grafica pulita,
                  chiara e coordinata, per dare valore ai prodotti e alla qualità del brand.
                </p>
              </Reveal>
            </div>

            <DropProjectMediaMasonry rows={agrovitOfflineRows} ariaLabel="Materiali offline Agrovit" />
          </div>
        </section>

        <section id="progetto-social" className="section" style={{ background: "var(--paper-tint)" }}>
          <div className="container-wide">
            <div style={{ maxWidth: 980 }}>
              <Reveal delay={0}>
                <span className="eyebrow">06 · Social media</span>
                <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                  Un piano editoriale{" "}
                  <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>che parla agli allevatori.</em>
                </h2>
                <p style={{ ...bodyStyle, marginTop: "clamp(32px, 5vw, 56px)" }}>
                  Dalla strategia alla produzione contenuti, per un feed editoriale coerente e un&apos;immagine coordinata per dare
                  valore alla brand identity.
                </p>
              </Reveal>
            </div>

            <div className="agrovit-social-steps" aria-label="Fasi del piano editoriale Agrovit">
              {agrovitSocialSteps.map((step, i) => (
                <Reveal key={step.n} delay={i} className="agrovit-social-step">
                  <span className="eyebrow agrovit-social-step-index">{step.n}</span>
                  <h3 className="display agrovit-social-step-title">{step.title}</h3>
                  <p className="agrovit-social-step-body">{step.body}</p>
                </Reveal>
              ))}
            </div>

            <DropProjectSocialMasonry columns={agrovitSocialColumns} ariaLabel="Feed social Agrovit" />
          </div>
        </section>

        <DropProjectPrefooter />

        <DropNewsletter />
      </main>

      <style>{`
        .agrovit-contesto-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: clamp(36px, 5vw, 72px);
          align-items: start;
        }
        .agrovit-meta-label {
          margin: 0 0 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--drop-orange);
        }
        .agrovit-meta-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .agrovit-meta-list li {
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          color: var(--drop-teal);
        }
        .agrovit-contesto-gallery {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        .agrovit-contesto-gallery-item {
          border-radius: 24px;
          overflow: hidden;
          line-height: 0;
          background: var(--teal-100);
        }
        .agrovit-contesto-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 5;
          display: block;
          transition: transform 1.4s var(--ease);
        }
        .agrovit-contesto-gallery-item:hover img {
          transform: scale(1.02);
        }
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
        .agrovit-logo-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(36px, 5vw, 72px);
          align-items: center;
        }
        .agrovit-logo-visual {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
        }
        .agrovit-logo-visual-card {
          width: min(100%, clamp(480px, 44vw, 620px));
          border-radius: 28px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.25);
          line-height: 0;
        }
        .agrovit-logo-visual-card video {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        .agrovit-logo-cards {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 2.5vw, 28px);
          align-items: stretch;
        }
        .agrovit-logo-card {
          border-radius: 28px;
          padding: clamp(32px, 3.5vw, 40px) clamp(28px, 3vw, 36px);
          min-height: 100%;
          background: #ffffff;
          box-shadow: 0 30px 60px -30px rgba(0, 44, 66, 0.25);
          transition: transform 0.55s var(--ease), box-shadow 0.55s var(--ease);
        }
        .agrovit-logo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px -28px rgba(0, 44, 66, 0.35);
        }
        .agrovit-logo-card--dark {
          background: var(--drop-teal);
        }
        .agrovit-logo-card-index {
          margin: 0 0 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1;
          color: var(--drop-orange);
        }
        .agrovit-logo-card-title {
          margin: 0 0 16px;
          font-size: clamp(28px, 2.8vw, 36px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.08;
          color: var(--drop-teal);
        }
        .agrovit-logo-card--dark .agrovit-logo-card-title {
          color: #ffffff;
        }
        .agrovit-logo-card-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 500;
          color: var(--ink);
          max-width: 36ch;
        }
        .agrovit-logo-card--dark .agrovit-logo-card-body {
          color: rgba(255, 255, 255, 0.82);
        }
        .agrovit-social-steps {
          margin-top: clamp(48px, 7vw, 80px);
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(24px, 3vw, 40px);
          align-items: start;
        }
        .agrovit-social-step {
          min-width: 0;
        }
        .agrovit-social-step-index {
          margin: 0 0 18px;
        }
        .agrovit-social-step-title {
          margin: 0 0 16px;
          font-size: clamp(22px, 2.2vw, 28px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: var(--drop-teal);
        }
        .agrovit-social-step-body {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 500;
          color: var(--ink);
        }
        .alive-project-hero-fold {
          min-height: 100vh;
          min-height: 100dvh;
        }
        .alive-project-hero-meta-line {
          white-space: nowrap;
          font-size: clamp(11px, 0.92vw, 14px);
          line-height: 1.3;
        }
        .alive-project-hero-kicker-line {
          white-space: nowrap;
          max-width: none;
          line-height: 1.3;
          font-size: clamp(11px, 0.92vw, 14px);
        }
        @media (max-width: 900px) {
          .agrovit-contesto-grid,
          .agrovit-solution-grid,
          .agrovit-logo-grid {
            grid-template-columns: 1fr;
          }
          .agrovit-solution-media {
            margin-left: auto;
            margin-right: auto;
            max-width: 483px;
          }
          .agrovit-contesto-gallery {
            grid-template-columns: 1fr;
          }
          .agrovit-contesto-gallery-item img {
            aspect-ratio: 16 / 10;
          }
          .agrovit-logo-cards {
            grid-template-columns: 1fr;
          }
          .agrovit-social-steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .alive-project-hero-meta-line,
          .alive-project-hero-kicker-line {
            white-space: normal;
          }
          .agrovit-social-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <DropFooter anchorsResolveHome />
      <DropProjectBackFab />
    </Fragment>
  );
}
