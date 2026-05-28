import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bundleResources } from "./bundleResources";
import { getDropContactLinks } from "./dropContactLinks";
import { useScrollY } from "./hooksAndUi";

const NAV_LINKS = [
  { id: "manifesto", label: "Chi siamo", num: "01" },
  { id: "settori", label: "Settori", num: "02" },
  { id: "servizi", label: "Servizi", num: "03" },
  { id: "progetti", label: "Progetti", num: "04" },
  { id: "contatti", label: "Contatti", num: "05" },
] as const;

type DropHeaderProps = {
  /** Sostituisce il sottotitolo marketing accanto al logo (es. archivio / case study). */
  logoSubtitle?: string;
};

export function DropHeader({ logoSubtitle }: DropHeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const y = useScrollY();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setScrolled(y > 40);
  }, [y]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isHome = location.pathname === "/";
  const contactLinks = getDropContactLinks(!isHome);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return false;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return true;
  }

  function go(id: string) {
    setOpen(false);

    if (id === "progetti" && location.pathname.startsWith("/projects")) {
      if (location.pathname === "/projects") {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate("/projects");
      }
      return;
    }

    if (isHome && scrollToSection(id)) return;

    navigate({ pathname: "/", hash: id });
  }

  const logoMark = (
    <img
      src={bundleResources.logoWhiteOrange}
      alt="Drop"
      style={{ height: 36, width: "auto", maxWidth: "min(220px, 42vw)", display: "block" }}
    />
  );

  const logoSubtitleStyle = {
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(255,255,255,0.88)",
    letterSpacing: "0.06em",
    lineHeight: 1.2,
    maxWidth: logoSubtitle ? 220 : 200,
  } as const;

  return (
    <Fragment>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10100,
          padding: scrolled ? "14px 0" : "24px 0",
          background: "var(--drop-teal)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.08)",
          transition: "padding .45s var(--ease), border-color .45s var(--ease)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,26,52,0.18)" : "none",
        }}
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          {logoSubtitle ? (
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
              {logoMark}
              <span style={{ display: "inline-block", height: 22, width: 1, background: "rgba(255,255,255,0.28)" }} />
              <span style={logoSubtitleStyle}>{logoSubtitle}</span>
            </Link>
          ) : (
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                if (window.__lenis) {
                  window.__lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              {logoMark}
              <span style={{ display: "inline-block", height: 22, width: 1, background: "rgba(255,255,255,0.28)" }} />
              <span style={logoSubtitleStyle}>
                Marketing &amp; Comunicazione
                <br />
                per il settore primario
              </span>
            </a>
          )}

          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hide-mobile">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px 18px",
                  borderRadius: 999,
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: "-0.005em",
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 8,
                  transition: "background .35s var(--ease), color .35s var(--ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 10, color: "var(--drop-orange)", fontWeight: 500 }}>{l.num}</span>
                {l.label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menu"
              style={{
                background: "var(--drop-orange)",
                color: "white",
                border: "none",
                cursor: "pointer",
                width: 52,
                height: 52,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background .35s var(--ease), transform .35s var(--ease)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--orange-400)";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--drop-orange)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path d="M0 1H18M0 7H18M0 13H12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10150,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,19,40,0.5)",
            opacity: open ? 1 : 0,
            transition: "opacity .45s var(--ease)",
          }}
        />
        <aside
          className="nav-drawer"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(560px, 92vw)",
            background: "var(--drop-teal)",
            color: "white",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform .7s var(--ease)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img
              src={bundleResources.logoWhiteOrange}
              alt="Drop"
              style={{ height: 28, width: "auto", maxWidth: "min(200px, 55vw)", display: "block" }}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                cursor: "pointer",
                width: 48,
                height: 48,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background .35s var(--ease), border-color .35s var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--drop-orange)";
                e.currentTarget.style.borderColor = "var(--drop-orange)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <nav style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "12px 0",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  fontFamily: "inherit",
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .6s var(--ease) ${0.2 + i * 0.06}s, transform .6s var(--ease) ${0.2 + i * 0.06}s, color .3s var(--ease)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--drop-orange)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "white";
                }}
              >
                <span style={{ fontSize: 12, color: "var(--drop-orange)", fontWeight: 600, letterSpacing: "0.08em" }}>
                  {l.num}
                </span>
                {l.label}
              </button>
            ))}
          </nav>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 20,
              }}
            >
              Contatti
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </Fragment>
  );
}
