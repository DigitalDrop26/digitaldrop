import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { getDropContactLinks } from "./dropContactLinks";
import { homeHash } from "./sitePaths";
import { useReveal, Reveal } from "./hooksAndUi";

type DropFooterProps = { anchorsResolveHome?: boolean };

// Footer — dark, big wordmark, links, legal
export function DropFooter({ anchorsResolveHome = false }: DropFooterProps) {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const h = (fragmentId: string) => (anchorsResolveHome ? homeHash(fragmentId) : `#${fragmentId.replace(/^#/, "")}`);
  const contactLinks = getDropContactLinks(anchorsResolveHome);
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
              Dal 1998, dentro alle filiere.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Studio</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={h("manifesto")} className="footer-link">Chi siamo</a>
              <a href={h("team")} className="footer-link">Team</a>
              <a href={h("carriere")} className="footer-link">Carriere</a>
              <a href={h("stampa")} className="footer-link">Stampa</a>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Servizi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={h("servizi")} className="footer-link">Strategia</a>
              <a href={h("servizi")} className="footer-link">Brand identity</a>
              <a href={h("servizi")} className="footer-link">Contenuti digitali</a>
              <a href={h("servizi")} className="footer-link">Formazione AI</a>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Contatti</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer-link">{link.label}</a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Legal row */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
          fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500,
        }}>
          <div>© 2026 Drop s.r.l. • P. Iva 01253030959 • Strada 28, Ovest Arborea - 09092 (OR)</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href={h("privacy")} style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy</a>
            <a href={h("cookies")} style={{ color: 'rgba(255,255,255,0.5)' }}>Cookie policy</a>
            <a href={h("colofone")} style={{ color: 'rgba(255,255,255,0.5)' }}>Colofone</a>
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
