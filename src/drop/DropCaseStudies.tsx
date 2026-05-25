import { useRef, useState } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, MarqueeRow, Reveal } from "./hooksAndUi";

// CaseStudies — asymmetric grid with hover scale
export function DropCaseStudies() {
  const rootRef = useRef(null);
  useReveal(rootRef);
  const [hovered, setHovered] = useState<string | null>(null);

  const cases = [
    {
      id: 'caseificio-roero',
      client: 'Caseificio Roero',
      title: 'Un caseificio piemontese diventa brand nazionale',
      sector: 'Food · DOP',
      year: '2024',
      img: bundleResources.imgCheese,
      kpi: '+187% retail',
      span: 'span 7',
      height: 560,
    },
    {
      id: 'vino-bianconi',
      client: 'Bianconi Wines',
      title: 'Rebrand di una cantina toscana per il mercato US',
      sector: 'Agri · Vino',
      year: '2024',
      img: bundleResources.imgVineyard,
      kpi: '+3.2× export',
      span: 'span 5',
      height: 560,
    },
    {
      id: 'cooperativa-verde',
      client: 'Cooperativa Verde',
      title: 'Piattaforma digitale per 240 soci agricoltori',
      sector: 'Agri · Filiere',
      year: '2023',
      img: bundleResources.imgWheat900,
      kpi: '240 soci · 8 regioni',
      span: 'span 5',
      height: 420,
    },
    {
      id: 'its-agroalimentare',
      client: 'ITS Agroalimentare',
      title: 'Formazione AI per 600 studenti tra Parma e Modena',
      sector: 'Formazione',
      year: '2024',
      img: bundleResources.imgCode1200,
      kpi: '600 studenti · 14 corsi',
      span: 'span 7',
      height: 420,
    },
  ];

  return (
    <section id="lavori" ref={rootRef} className="section" style={{ background: 'var(--paper-warm)' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(48px, 6vw, 80px)' }} className="cs-head">
          <Reveal delay={0}>
            <span className="eyebrow">07 — Lavori</span>
            <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
              Cose vere,<br/>per <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>persone vere</em>.
            </h2>
          </Reveal>
          <Reveal delay={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#archive" className="ulink" style={{ fontSize: 15, fontWeight: 600 }}>
              Archivio completo (47)
              <span className="ulink-bar2"></span>
            </a>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(16px, 2vw, 28px)' }} className="cs-grid">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i}
              className="case-card"
              data-cursor="hover"
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                gridColumn: c.span,
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                background: 'var(--teal-100)',
                height: c.height,
                cursor: 'pointer',
              }}>
              <img src={c.img} alt={c.title} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 1.4s var(--ease), filter .6s var(--ease)',
                transform: hovered === c.id ? 'scale(1.06)' : 'scale(1)',
                filter: hovered === c.id ? 'brightness(0.65)' : 'brightness(0.85)',
              }} />
              {/* Top meta */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                padding: '28px 28px 0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                color: 'white',
              }}>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)' }}>
                  {c.sector}
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', opacity: 0.8 }}>{c.year}</div>
              </div>
              {/* Bottom content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: 28,
                color: 'white',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--drop-orange)', letterSpacing: '0.06em', marginBottom: 8 }}>{c.client}</div>
                    <h3 className="display" style={{ margin: 0, fontSize: 'clamp(20px, 2vw, 28px)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '20ch' }}>
                      {c.title}
                    </h3>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Risultato</div>
                    <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{c.kpi}</div>
                  </div>
                </div>
                <div style={{
                  marginTop: 24,
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, fontWeight: 600,
                  opacity: hovered === c.id ? 1 : 0,
                  transform: hovered === c.id ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity .45s var(--ease), transform .45s var(--ease)',
                }}>
                  Leggi il case study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Logo strip — clients */}
        <div style={{ marginTop: 'clamp(72px, 10vw, 120px)', paddingTop: 40, borderTop: '1px solid rgba(0,80,119,0.15)' }}>
          <Reveal delay={0} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <span className="eyebrow">Hanno scelto Drop</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--teal-500)' }}>47 brand · 8 regioni · 25 anni</span>
          </Reveal>
          <MarqueeRow>
            {['Caseificio Roero', '•', 'Bianconi Wines', '•', 'Cooperativa Verde', '•', 'Conserve Toscane', '•', 'ITS Agroalimentare', '•', 'Olio Pugliese DOP', '•', 'Salumi del Po', '•', 'Cantine Etna', '•'].map((t, i) => (
              <span key={i} style={{
                fontSize: 'clamp(22px, 2.6vw, 36px)',
                fontWeight: t === '•' ? 700 : 600,
                color: t === '•' ? 'var(--drop-orange)' : 'var(--teal-500)',
                letterSpacing: '-0.02em',
              }}>{t}</span>
            ))}
          </MarqueeRow>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .cs-grid { grid-template-columns: 1fr !important; }
          .case-card { grid-column: 1 !important; height: 380px !important; }
          .cs-head { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
