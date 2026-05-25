import { useEffect, useRef, useState } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, Reveal } from "./hooksAndUi";

// Footer — dark, big wordmark, links, legal
export function DropFooter() {
  const rootRef = useRef(null);
  useReveal(rootRef);
  const [time, setTime] = useState(formatTime(new Date()));

  function formatTime(d: Date) {
    return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' });
  }

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <footer ref={rootRef} style={{
      background: 'var(--drop-teal)',
      color: 'white',
      padding: 'clamp(60px, 8vw, 100px) 0 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container-wide">
        {/* Top: 4-col link grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 'clamp(32px, 4vw, 64px)', marginBottom: 'clamp(60px, 8vw, 100px)' }} className="ft-grid">
          <Reveal delay={0}>
            <img src={bundleResources.logoFullWhite} alt="Drop" style={{ height: 56, display: 'block', marginBottom: 28 }} />
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: 340, margin: 0, fontWeight: 500 }}>
              Agenzia di comunicazione e marketing strategico per il settore primario italiano.
              Dal 1999, dentro alle filiere.
            </p>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
                Milano · {time} CET — Disponibili
              </span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Studio</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="#manifesto" className="footer-link">Chi siamo</a>
              <a href="#team" className="footer-link">Team</a>
              <a href="#carriere" className="footer-link">Carriere</a>
              <a href="#stampa" className="footer-link">Stampa</a>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Servizi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="#servizi" className="footer-link">Strategia</a>
              <a href="#servizi" className="footer-link">Brand identity</a>
              <a href="#servizi" className="footer-link">Contenuti digitali</a>
              <a href="#servizi" className="footer-link">Formazione AI</a>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Contatti</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="mailto:ciao@drop.it" className="footer-link">ciao@drop.it</a>
              <a href="tel:+390212345678" className="footer-link">+39 02 1234 5678</a>
              <a href="#instagram" className="footer-link">Instagram</a>
              <a href="#linkedin" className="footer-link">LinkedIn</a>
            </div>
          </Reveal>
        </div>

        {/* Huge logo — splash */}
        <Reveal delay={0} style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 60, marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
          <img
            src={bundleResources.logoWhiteOrange}
            alt="Drop"
            style={{
              width: '100%',
              maxWidth: 1400,
              height: 'auto',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </Reveal>

        {/* Legal row */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
          fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500,
        }}>
          <div>© 2026 Drop Srl · P.IVA 03123450123 · Via dei Filari 12, 20100 Milano</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#privacy" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy</a>
            <a href="#cookies" style={{ color: 'rgba(255,255,255,0.5)' }}>Cookie policy</a>
            <a href="#colofone" style={{ color: 'rgba(255,255,255,0.5)' }}>Colofone</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
