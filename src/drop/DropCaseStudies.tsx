import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getHomepageFeaturedProjects } from "./dropProjects";
import { DropProjectCard } from "./DropProjectCard";
import { useReveal, MarqueeRow, Reveal } from "./hooksAndUi";

// CaseStudies — asymmetric grid with hover scale
export function DropCaseStudies() {
  const rootRef = useRef(null);
  useReveal(rootRef);
  const [hovered, setHovered] = useState<string | null>(null);
  const cases = getHomepageFeaturedProjects();

  return (
    <section id="progetti" ref={rootRef} className="section" style={{ background: '#ffffff' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(48px, 6vw, 80px)' }} className="cs-head">
          <Reveal delay={0}>
            <span className="eyebrow">07 — Progetti</span>
            <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
              Progetti veri,<br/>per <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>persone vere</em>.
            </h2>
          </Reveal>
          <Reveal delay={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/projects" className="ulink" style={{ fontSize: 15, fontWeight: 600 }}>
              tutti i progetti
              <span className="ulink-bar2"></span>
            </Link>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(16px, 2vw, 28px)' }} className="cs-grid">
          {cases.map((c, i) => (
            <DropProjectCard
              key={c.id}
              project={c}
              delay={i}
              hovered={hovered === c.id}
              onHover={setHovered}
              height={c.height}
              style={{ gridColumn: c.span }}
            />
          ))}
        </div>

        {/* Logo strip — clients */}
        <div style={{ marginTop: 'clamp(72px, 10vw, 120px)', paddingTop: 40, borderTop: '1px solid rgba(0,80,119,0.15)' }}>
          <Reveal delay={0} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <span className="eyebrow">Hanno scelto Drop</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--teal-500)' }}>47 brand · 8 regioni · 25 anni</span>
          </Reveal>
          <MarqueeRow>
            {['Caseificio Roero', '•', 'AliveXperiences', '•', 'Cooperativa Verde', '•', 'Conserve Toscane', '•', 'ITS Agroalimentare', '•', 'Olio Pugliese DOP', '•', 'Salumi del Po', '•', 'Cantine Etna', '•'].map((t, i) => (
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
