import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, LineReveal, Reveal } from "./hooksAndUi";

// Manifesto — lead copy + two columns + signature
export function DropManifesto() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section id="manifesto" ref={rootRef} className="section" style={{ background: 'var(--paper-tint)' }}>
      <div className="container-wide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Lead copy */}
        <div style={{ maxWidth: 880, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 className="display" style={{
            fontSize: 'clamp(32px, 4.8vw, 76px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--drop-teal)',
            margin: 0,
            textAlign: 'center',
          }}>
            <LineReveal delay={0}>
              La nostra esperienza è la vostra{" "}
              <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>forza</em>.
            </LineReveal>
          </h3>

          <div style={{ marginTop: 'clamp(48px, 6vw, 80px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="manifesto-twocol">
              <Reveal delay={0}>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500, margin: 0 }}>
                  Dal 1998, anticipiamo le{" "}
                  <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>sfide</strong>, le raccogliamo e le
                  superiamo insieme a voi, con la{" "}
                  <strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>creatività</strong>{" "}
                  e l&apos;<strong style={{ fontWeight: 700, color: "var(--drop-teal)" }}>entusiasmo</strong> che ci caratterizza
                  da sempre.
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

          <Reveal delay={2} style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(0,80,119,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(24px, 4vw, 48px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--drop-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
                  <img src={bundleResources.logoColor} alt="Drop" style={{ height: 24, filter: 'brightness(0) invert(1)' }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--drop-teal)' }}>Il team Drop</div>
                  <div style={{ fontSize: 13, color: 'var(--teal-500)', fontWeight: 500 }}>Strateghi, designer, contadini digitali.</div>
                </div>
              </div>
            </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .manifesto-twocol { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
