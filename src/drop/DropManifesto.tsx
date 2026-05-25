import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, LineReveal, Reveal } from "./hooksAndUi";

// Manifesto — sticky title with revealed body
export function DropManifesto() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section id="manifesto" ref={rootRef} className="section" style={{ background: 'var(--paper-warm)' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: 'clamp(40px, 8vw, 120px)' }} className="manifesto-grid">
          {/* Sticky left — kicker + label */}
          <div style={{ position: 'sticky', top: 120, alignSelf: 'start', paddingTop: 8 }}>
            <Reveal delay={0}>
              <span className="eyebrow">01 — Manifesto</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display display-md" style={{ marginTop: 28, marginBottom: 0 }}>
                Non siamo "un'agenzia".
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ marginTop: 24, color: 'var(--teal-500)', fontSize: 14, lineHeight: 1.6, maxWidth: 340 }}>
                Lavoriamo dentro al settore agroalimentare e zootecnico italiano. Conosciamo le filiere
                perché ne facciamo parte.
              </p>
            </Reveal>
            <Reveal delay={3} className="manifesto-image" style={{ marginTop: 48, borderRadius: 20, overflow: 'hidden', maxWidth: 380, height: 260 }}>
              <img src={bundleResources.imgCow900} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Reveal>
          </div>

          {/* Right — big manifesto copy */}
          <div style={{ maxWidth: 880 }}>
            <h3 className="display" style={{
              fontSize: 'clamp(32px, 4.8vw, 76px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--drop-teal)',
              margin: 0,
            }}>
              <LineReveal delay={0}>Aiutiamo imprese</LineReveal>
              <LineReveal delay={1}>agroalimentari e zootecniche</LineReveal>
              <LineReveal delay={2}>a <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>crescere</em> e</LineReveal>
              <LineReveal delay={3}>comunicare con il mercato.</LineReveal>
            </h3>

            <div style={{ marginTop: 'clamp(48px, 6vw, 80px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="manifesto-twocol">
              <Reveal delay={0}>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500, margin: 0 }}>
                  Supportiamo le aziende che vogliono dialogare con agricoltori, allevatori e
                  filiere. Con un marketing <strong style={{ color: 'var(--drop-teal)', fontWeight: 700 }}>gentile,
                  concreto e su misura</strong>, trasformiamo le imprese in brand
                  riconosciuti, affidabili e competitivi.
                </p>
              </Reveal>
              <Reveal delay={1}>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500, margin: 0 }}>
                  Conosciamo il settore perché ne facciamo parte, da oltre 25 anni.
                  Non cerchiamo la viralità: <strong style={{ color: 'var(--drop-orange)', fontWeight: 700 }}>cerchiamo valore reale</strong> per
                  filiere, persone e territori.
                </p>
              </Reveal>
            </div>

            {/* Signature row */}
            <Reveal delay={2} style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(0,80,119,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--drop-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
                  <img src={bundleResources.logoColor} alt="Drop" style={{ height: 24, filter: 'brightness(0) invert(1)' }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--drop-teal)' }}>Il team Drop</div>
                  <div style={{ fontSize: 13, color: 'var(--teal-500)', fontWeight: 500 }}>Strateghi, designer, contadini digitali.</div>
                </div>
              </div>
              <a href="#chi-siamo" className="ulink" style={{ display: 'inline-block', fontWeight: 600, fontSize: 15 }}>
                Conosci il team
                <span className="ulink-bar2"></span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .manifesto-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .manifesto-grid > div:first-child { position: relative !important; top: 0 !important; }
          .manifesto-twocol { grid-template-columns: 1fr !important; }
          .manifesto-image { display: none; }
        }
      `}</style>
    </section>
  );
}
