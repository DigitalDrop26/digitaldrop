import { useRef } from "react";
import { Link } from "react-router-dom";
import { bundleResources } from "./bundleResources";
import { getDropContactLinks } from "./dropContactLinks";
import { DropIubendaLegalLinks } from "./DropIubendaLegalLinks";
import { useReveal, Reveal } from "./hooksAndUi";

const HOME_SECTIONS = {
  settori: { pathname: "/", hash: "#settori" },
  servizi: { pathname: "/", hash: "#servizi" },
  contatti: { pathname: "/", hash: "#contatti" },
} as const;

const CHI_SIAMO_SECTIONS = {
  team: { pathname: "/chi-siamo", hash: "#team" },
  valori: { pathname: "/chi-siamo", hash: "#valori" },
  manifesto: { pathname: "/chi-siamo", hash: "#manifesto" },
} as const;

// Footer — dark, big wordmark, links, legal
export function DropFooter() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const contactLinks = getDropContactLinks();

  const serviceLinks = [
    "Brand Identity",
    "Marketing strategico",
    "Piani di comunicazione",
    "Creazione contenuti",
    "Formazione AI e innovazione",
  ] as const;

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
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Navigazione</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to={HOME_SECTIONS.settori} className="footer-link">Settori</Link>
              <Link to={HOME_SECTIONS.servizi} className="footer-link">Servizi</Link>
              <Link to="/projects" className="footer-link">Progetti</Link>
              <Link to="/chi-siamo" className="footer-link">Chi siamo</Link>
              <Link to={CHI_SIAMO_SECTIONS.team} className="footer-link">Team</Link>
              <Link to={CHI_SIAMO_SECTIONS.valori} className="footer-link">Valori</Link>
              <Link to={CHI_SIAMO_SECTIONS.manifesto} className="footer-link">Manifesto</Link>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Servizi</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {serviceLinks.map((label) => (
                <Link key={label} to={HOME_SECTIONS.servizi} className="footer-link">{label}</Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={3}>
            <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Contatti</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {contactLinks.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-link"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                ),
              )}
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
          <DropIubendaLegalLinks />
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
