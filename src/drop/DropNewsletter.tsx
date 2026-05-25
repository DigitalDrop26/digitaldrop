import { Fragment, type FormEvent, useRef, useState } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, LineReveal, Btn, Reveal } from "./hooksAndUi";

// Newsletter + CTA — big dark block, massive type, email field
export function DropNewsletter() {
  const rootRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useReveal(rootRef);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="contatti" ref={rootRef} className="section" style={{
      background: 'var(--ink-deep)',
      color: 'white',
      paddingTop: 'clamp(100px, 14vw, 180px)',
      paddingBottom: 'clamp(100px, 14vw, 180px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Big goccia pattern bg */}
      <div style={{
        position: 'absolute',
        left: '-12%', bottom: '-20%',
        width: 720, height: 720,
        opacity: 0.07,
        pointerEvents: 'none',
      }} className="spin-slow">
        <img src={bundleResources.patternGoccia} alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        <Reveal delay={0}>
          <span className="eyebrow on-dark">08 — Iniziamo</span>
        </Reveal>

        <h2 className="display display-xl" style={{ color: 'white', maxWidth: '14ch', marginTop: 32, marginBottom: 0 }}>
          <LineReveal delay={0}>Hai un progetto</LineReveal>
          <LineReveal delay={1}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 32px)' }}>
              <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>nel campo?</em>
              <span style={{
                display: 'inline-block',
                width: 'clamp(80px, 8vw, 130px)',
                height: 'clamp(60px, 6vw, 90px)',
                borderRadius: 999,
                overflow: 'hidden',
                verticalAlign: 'middle',
              }}>
                <img src={bundleResources.imgHands400} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </span>
            </span>
          </LineReveal>
          <LineReveal delay={2}>Parliamone.</LineReveal>
        </h2>

        <div style={{
          marginTop: 'clamp(64px, 10vw, 120px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 100px)',
        }} className="news-grid">
          {/* Left: email signup */}
          <Reveal delay={0}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 0, marginBottom: 28 }}>
              Newsletter mensile
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 500, color: 'rgba(255,255,255,0.85)', maxWidth: 480, marginTop: 0 }}>
              Una mail al mese con un caso reale del settore primario, un trend digitale tradotto in pratica
              e un esperimento dal nostro studio. <span style={{ color: 'var(--drop-orange)' }}>Niente fuffa</span>.
            </p>
            <form onSubmit={onSubmit} style={{ marginTop: 40, maxWidth: 540 }}>
              {!submitted ? (
                <Fragment>
                  <div className="field">
                    <input
                      type="email"
                      placeholder="la-tua-mail@esempio.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" style={{
                      background: 'var(--drop-orange)', color: 'white', border: 'none',
                      borderRadius: 999, padding: '12px 22px', fontWeight: 600, fontSize: 14,
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                      transition: 'background .35s var(--ease), transform .35s var(--ease)',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--orange-400)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--drop-orange)'}>
                      Iscriviti
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5"/></svg>
                    </button>
                  </div>
                  <div style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                    Privacy: GDPR-compliant. Disiscrivi quando vuoi.
                  </div>
                </Fragment>
              ) : (
                <div style={{
                  padding: '22px 28px',
                  borderRadius: 999,
                  background: 'rgba(233, 74, 49, 0.12)',
                  border: '1px solid rgba(233, 74, 49, 0.35)',
                  color: 'white', fontSize: 15, fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--drop-orange)' }}></span>
                  Grazie. Ci sentiamo presto.
                </div>
              )}
            </form>
          </Reveal>

          {/* Right: direct contact */}
          <Reveal delay={1}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 0, marginBottom: 28 }}>
              Scrivici direttamente
            </h3>

            <a href="mailto:ciao@drop.it" className="magnetic" style={{
              display: 'block',
              fontSize: 'clamp(28px, 3.4vw, 48px)',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: 8,
            }}>ciao@drop.it</a>

            <div style={{ fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em' }}>
              +39 02 1234 5678
            </div>

            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn variant="light" href="#calendly">
                Prenota un call
              </Btn>
              <a href="#wp" className="btn" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                <span style={{ position: 'relative' }}>Scrivici su WhatsApp</span>
                <span className="arrow" style={{ position: 'relative' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5"/></svg>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .news-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
}
