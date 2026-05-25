import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { MarqueeRow, Reveal, useReveal } from "./hooksAndUi";

// Sectors — Agri / Food / Formazione three big tiles + circular badges
export function DropSectors() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const sectors = [
    {
      key: 'agri',
      num: '01',
      title: 'Agri',
      tag: 'Agricoltori, cooperative, consorzi',
      img: bundleResources.imgWheat900,
      tags: ['Cerealicoltura', 'Vino', 'Olio', 'Ortofrutta'],
    },
    {
      key: 'food',
      num: '02',
      title: 'Food',
      tag: 'Trasformatori, distributori, DOP',
      img: bundleResources.imgCheese,
      tags: ['Caseifici', 'Pasta', 'Conserve', 'Salumi'],
    },
    {
      key: 'formazione',
      num: '03',
      title: 'Formazione',
      tag: 'Enti, scuole, istituti professionali',
      img: bundleResources.imgClass,
      tags: ['ITS', 'CFP', 'Master', 'Workshop AI'],
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
            <span className="eyebrow on-dark">03 — Settori</span>
            <h2 className="display display-lg" style={{ color: 'white', marginTop: 28, marginBottom: 0 }}>
              Tre mondi,<br/>una sola <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>lingua</em>.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', fontWeight: 500, margin: 0, maxWidth: 440, marginLeft: 'auto' }}>
              Agri, Food, Formazione. Tre settori interconnessi del comparto primario italiano —
              ognuno con un suo lessico, una sua filiera, una sua urgenza.
            </p>
          </Reveal>
        </div>

        {/* Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px, 2vw, 32px)' }} className="sectors-grid">
          {sectors.map((s, i) => (
            <Reveal key={s.key} delay={i} className="sector-tile" data-cursor="hover">
              <img src={s.img} alt={s.title} />
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: 20, left: 20,
                width: 80, height: 80,
                borderRadius: 999,
                background: 'var(--drop-orange)',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em',
                zIndex: 2,
                transition: 'transform .55s var(--ease)',
              }}>{s.title}</div>
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
          ))}
        </div>

        {/* Marquee row */}
        <div style={{ marginTop: 'clamp(48px, 8vw, 96px)' }}>
          <Reveal delay={0}>
            <MarqueeRow>
              {['Filiere corte', '·', 'Cooperative', '·', 'DOP', '·', 'IGP', '·', 'Biologico', '·', 'Agricoltura rigenerativa', '·', 'Zootecnia', '·', 'Foodtech', '·', 'Wine', '·', 'Olio EVO', '·', 'Latte e formaggi', '·'].map((t, i) => (
                <span key={i} style={{
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  letterSpacing: '-0.02em',
                  color: t === '·' ? 'var(--drop-orange)' : 'rgba(255,255,255,0.55)',
                  fontStyle: t.length > 4 && i % 3 === 0 ? 'italic' : 'normal',
                  fontFamily: t.length > 4 && i % 3 === 0 ? '"Times New Roman", serif' : 'inherit',
                  fontWeight: t === '·' ? 700 : (t.length > 4 && i % 3 === 0 ? 400 : 600),
                }}>{t}</span>
              ))}
            </MarqueeRow>
          </Reveal>
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
