import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { Reveal, useReveal } from "./hooksAndUi";

// Values — three cards, middle one dark, asymmetric grid
export function DropValues() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const values = [
    {
      n: '01',
      t: 'Radici e Innovazione',
      d: 'Tradizione contadina e strumenti digitali nella stessa stanza. La terra cambia ogni anno: la comunicazione anche.',
      img: bundleResources.imgHands800,
    },
    {
      n: '02',
      t: 'Strategia Sostenibile',
      d: 'Pensiamo a lungo termine. Costruiamo brand che durano oltre la stagione, oltre il trend, oltre l\'algoritmo.',
      img: bundleResources.imgCow800,
      dark: true,
    },
    {
      n: '03',
      t: 'Alleanza Trasparente',
      d: 'Niente jargon, niente reportistica oscura. Una sola dashboard condivisa, decisioni prese insieme.',
      img: bundleResources.imgWheat900,
    },
  ];

  return (
    <section id="valori" ref={rootRef} className="section" style={{ background: 'var(--paper-warm)' }}>
      <div className="container-wide">
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)', maxWidth: 880 }}>
          <Reveal delay={0}><span className="eyebrow">06 — Valori</span></Reveal>
          <Reveal delay={1}>
            <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
              Tre <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>principi</em><br/>
              non negoziabili.
            </h2>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px, 2vw, 32px)', alignItems: 'start' }} className="values-grid">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i} className={`value-card ${v.dark ? 'dark' : ''}`} style={{
              transform: i === 1 ? 'translateY(40px)' : 'translateY(0)',
            }}>
              <div style={{
                fontSize: 12, fontWeight: 500, letterSpacing: '0.16em',
                color: v.dark ? 'rgba(255,255,255,0.5)' : 'var(--teal-500)',
                marginBottom: 18,
              }}>{v.n} / 03</div>

              <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={v.img} alt={v.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <h3 className="display" style={{
                marginTop: 28, marginBottom: 14,
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                color: v.dark ? 'white' : 'var(--drop-teal)',
                letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>{v.t}</h3>

              <p style={{
                margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 500,
                color: v.dark ? 'rgba(255,255,255,0.78)' : 'var(--ink)',
              }}>{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .values-grid .value-card { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
