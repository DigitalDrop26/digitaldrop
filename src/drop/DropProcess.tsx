import { useRef } from "react";
import { useReveal, Reveal } from "./hooksAndUi";

// Process — horizontal-scroll-feel timeline (4 steps) with sticky title
export function DropProcess() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const steps = [
    { n: '01', t: 'Ascolto', d: 'Veniamo da te, in cascina, in stabilimento, in vigna. Capiamo persone, processi, prodotto.' },
    { n: '02', t: 'Discovery', d: 'Audit di brand, comunicazione e mercato. Restituiamo una foto netta — niente fumo.' },
    { n: '03', t: 'Strategia', d: 'Posizionamento, piano editoriale, brand identity. Un solo documento operativo, condiviso.' },
    { n: '04', t: 'Esecuzione', d: 'Produciamo, lanciamo, misuriamo. Sempre con due metriche: valore reale e tempo.' },
  ];

  return (
    <section ref={rootRef} className="section" style={{ background: 'var(--paper-tint)' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2.2fr)', gap: 'clamp(40px, 6vw, 80px)' }} className="proc-grid">
          {/* Sticky title */}
          <div style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <Reveal delay={0}>
              <span className="eyebrow">05 — Processo</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display display-md" style={{ marginTop: 28, marginBottom: 0 }}>
                Quattro<br/>passi<br/>
                <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>fondamentali</em>.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ marginTop: 24, color: 'var(--teal-500)', fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
                Un metodo collaudato in quasi 30 anni di lavoro fianco a fianco con agricoltori,
                allevatori e PMI del food.
              </p>
            </Reveal>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i} className="step-card" style={{
                padding: 'clamp(28px, 3vw, 44px)',
                background: i === 1 ? 'var(--drop-teal)' : 'white',
                color: i === 1 ? 'white' : 'inherit',
                display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'start',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 999,
                  border: i === 1 ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(0,80,119,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 18,
                  color: i === 1 ? 'white' : 'var(--drop-teal)',
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                }}>{s.n}</div>
                <div>
                  <h3 className="display" style={{ fontSize: 'clamp(28px, 3vw, 42px)', margin: 0, color: i === 1 ? 'white' : 'var(--drop-teal)', letterSpacing: '-0.025em', lineHeight: 1 }}>{s.t}</h3>
                  <p style={{ marginTop: 14, marginBottom: 0, fontSize: 16, lineHeight: 1.6, color: i === 1 ? 'rgba(255,255,255,0.78)' : 'var(--ink)', fontWeight: 500, maxWidth: '52ch' }}>{s.d}</p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
                  color: i === 1 ? 'rgba(255,255,255,0.45)' : 'var(--teal-500)',
                  textTransform: 'uppercase',
                  marginTop: 8,
                  whiteSpace: 'nowrap',
                }} className="proc-week">
                  Settimana {i === 0 ? '1' : i === 1 ? '2' : i === 2 ? '3-4' : '5+'}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .proc-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .proc-grid > div:first-child { position: relative !important; top: 0 !important; }
          .step-card { grid-template-columns: auto 1fr !important; }
          .proc-week { grid-column: 2; margin-top: 4px !important; }
        }
      `}</style>
    </section>
  );
}
