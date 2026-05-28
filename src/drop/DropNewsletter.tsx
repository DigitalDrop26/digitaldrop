import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, LineReveal, Btn, Reveal } from "./hooksAndUi";

// Contatti — blocco dark, headline + dirette
export function DropNewsletter() {
  const rootRef = useRef(null);
  useReveal(rootRef);
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
            <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>in campo?</em>
          </LineReveal>
          <LineReveal delay={2}>Parliamone.</LineReveal>
        </h2>

        <div style={{ marginTop: 'clamp(64px, 10vw, 120px)' }}>
          {/* Contatti diretti */}
          <Reveal delay={0}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 0, marginBottom: 28 }}>
              Scrivici direttamente
            </h3>

            <a href="mailto:info@digitaldrop.eu" className="magnetic" style={{
              display: 'block',
              fontSize: 'clamp(28px, 3.4vw, 48px)',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: 8,
            }}>info@digitaldrop.eu</a>

            <div style={{ fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em' }}>
              <a href="tel:+393475571187" style={{ color: 'inherit', textDecoration: 'none' }}>+39 347 557 1187</a>
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
    </section>
  );
}
