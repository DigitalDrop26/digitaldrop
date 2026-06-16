import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getHomepageFeaturedProjects } from "./dropProjects";
import { DropProjectCard } from "./DropProjectCard";
import { useReveal, MarqueeRow, Reveal } from "./hooksAndUi";

const DROP_CLIENTS = [
  "Boehringer Ingelheim Animal Health Italia S.p.A.",
  "Cremona Fiere S.P.A.",
  "Agrovit Srl",
  "milkrite | InterPuls",
  "Consorzio del Formaggio Parmigiano Reggiano",
  "ARIENTI & C. SRL",
  "Associazione Nazionale Allevatori della Razza Frisona, Bruna e Jersey Italiana",
  "Genesi Project srl",
  "Commercial Dairy Farmers",
  "DairyLens",
  "Quartomoro di Sardegna snc",
  "gruppo 3A",
  "CAI Nutrizione S.P.A.",
] as const;

const clientMarqueeItems = DROP_CLIENTS.flatMap((name) => [name, "•"]);

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
            <span className="eyebrow">03 — Progetti</span>
            <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
              Quello che<br />
              <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>facciamo</em>
            </h2>
          </Reveal>
          <Reveal delay={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              to="/projects"
              className="ulink"
              style={{ fontSize: "clamp(19px, 1.35vw, 22px)", fontWeight: 600, color: "var(--drop-orange)" }}
            >
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
            {clientMarqueeItems.map((t, i) => (
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
