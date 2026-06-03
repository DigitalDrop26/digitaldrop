import { useRef } from "react";
import agrovitIndustriaImg from "@Immagini/Agrovit/agrovit_testata.png?url";
import { bundleResources } from "./bundleResources";
import { Reveal, useReveal } from "./hooksAndUi";

type Sector = {
  key: string;
  num: string;
  title: string;
  tag: string;
  img: string;
  video?: string;
  darkOverlay?: boolean;
  tags: string[];
};

// Sectors — Agri / Food / Formazione three big tiles
export function DropSectors() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const sectors: Sector[] = [
    {
      key: 'agri',
      num: '01',
      title: 'Agri',
      tag: 'Allevatori, cooperative, associazioni di categoria',
      img: bundleResources.imgWheat900,
      tags: ['Zootecnia', 'Cerealicoltura', 'Vino', 'Olio', 'Ortofrutta'],
    },
    {
      key: 'food',
      num: '02',
      title: 'Food',
      tag: 'Trasformatori, consorzi DOP/IGP, brand alimentari',
      img: bundleResources.imgCheese,
      tags: ['Caseifici', 'Pasta', 'Conserve', 'Salumi'],
    },
    {
      key: 'industria',
      num: '03',
      title: 'Industria',
      tag: 'Farmaceutici, produttori di macchinari, fornitori di servizi',
      img: agrovitIndustriaImg,
      darkOverlay: true,
      tags: ['Farmaceutiche', 'Nutrizione animale', 'Tecnologie di stalla', 'Agri-software'],
    },
  ];

  return (
    <section id="settori" ref={rootRef} className="section" style={{ background: 'var(--drop-teal)', color: 'white' }}>
      {/* Pattern bg */}
      <div style={{ position: 'absolute', top: '8%', right: '-6%', width: 480, height: 480, opacity: 0.06, pointerEvents: 'none' }} className="spin-slow">
        <img src={bundleResources.patternGoccia} alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        {/* Heading */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(48px, 8vw, 96px)' }} className="sec-head">
          <Reveal delay={0}>
            <span className="eyebrow on-dark">02 — Settori</span>
            <h2 className="display display-lg" style={{ color: 'white', marginTop: 28, marginBottom: 0 }}>
              Tre mondi,<br/>una sola <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>lingua</em>.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', fontWeight: 500, margin: 0, maxWidth: 440, marginLeft: 'auto' }}>
              Agri, Food, Industria. Tre anelli della stessa catena — ognuno con il suo lessico, la sua logica, i suoi interlocutori.
            </p>
          </Reveal>
        </div>

        {/* Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px, 2vw, 32px)' }} className="sectors-grid">
          {sectors.map((s, i) => (
            <SectorTile key={s.key} s={s} delay={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .sectors-grid { grid-template-columns: 1fr !important; }
          .sec-head { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/** Tile settore — immagine o video (fermo immagine, play all'hover). */
function SectorTile({ s, delay }: { s: Sector; delay: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function playVideo() {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  }

  function pauseVideo() {
    const v = videoRef.current;
    if (v) v.pause();
  }

  return (
    <Reveal
      delay={delay}
      className={`sector-tile${s.darkOverlay ? " sector-tile--dark" : ""}`}
      data-cursor="hover"
      onMouseEnter={s.video ? playVideo : undefined}
      onMouseLeave={s.video ? pauseVideo : undefined}
    >
      {s.video ? (
        <video
          ref={videoRef}
          src={s.video}
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <img src={s.img} alt={s.title} />
      )}
      {s.darkOverlay ? <div className="sector-tile-shade" aria-hidden /> : null}
      {/* Num */}
      <div style={{
        position: 'absolute',
        top: 30, right: 24,
        fontSize: 13, fontWeight: 500,
        color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em',
        zIndex: 2,
      }}>{s.num}</div>
      {/* Label */}
      <div className="label">
        <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>{s.tag}</div>
        <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'white' }}>{s.title}</div>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {s.tags.map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '0.03em',
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(255,255,255,0.15)', color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
