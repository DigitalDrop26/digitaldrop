import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bundleResources } from "./bundleResources";
import { getDropContactLinks } from "./dropContactLinks";
import { useScrollY } from "./hooksAndUi";

const NAV_LINKS = [
  { id: "settori", label: "Settori", num: "01" },
  { id: "servizi", label: "Servizi", num: "02" },
  { id: "progetti", label: "Progetti", num: "03" },
  { id: "chi-siamo", label: "Chi siamo", num: "04" },
] as const;

type DropHeaderProps = {
  /** Sostituisce il sottotitolo marketing accanto al logo (es. archivio / case study). */
  logoSubtitle?: string;
  /** Nome progetto mostrato in colore accento, preceduto da «/». */
  projectName?: string;
};

export function DropHeader({ logoSubtitle, projectName }: DropHeaderProps = {}) {
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

  /** Pagine scheda progetto (/projects/…) — nav hero trasparente, testi bianchi fino allo scroll. */
  const isProjectDetailPage = location.pathname.startsWith("/projects/");
  const heroOverlayNav = isProjectDetailPage && !scrolled;
  const contactLinks = getDropContactLinks();

  const navTextColor = heroOverlayNav ? "#ffffff" : "var(--drop-teal)";
  const navHoverBg = heroOverlayNav ? "rgba(255,255,255,0.12)" : "rgba(0,80,119,0.08)";
  const logoSrc = heroOverlayNav ? bundleResources.logoWhiteOrange : bundleResources.logoColor;
  const subtitleColor = heroOverlayNav ? "rgba(255,255,255,0.92)" : "var(--drop-teal)";
  const subtitleDivider = heroOverlayNav ? "rgba(255,255,255,0.32)" : "rgba(0,80,119,0.25)";

  const headerBackground = isProjectDetailPage
    ? scrolled
      ? "rgba(255,255,255,0.62)"
      : "transparent"
    : scrolled
      ? "rgba(255,255,255,0.42)"
      : "rgba(255,255,255,0.22)";
  const headerBorder = heroOverlayNav
    ? "1px solid transparent"
    : scrolled
      ? "1px solid rgba(0,26,52,0.1)"
      : "1px solid rgba(0,26,52,0.06)";
  const headerShadow = heroOverlayNav
    ? "none"
    : scrolled
      ? "0 8px 32px rgba(0,26,52,0.12)"
      : "0 2px 12px rgba(0,26,52,0.05)";
  const headerBackdrop = heroOverlayNav ? "none" : "saturate(180%) blur(22px)";

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

    if (id === "chi-siamo") {
      if (location.pathname === "/chi-siamo") {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate("/chi-siamo");
      }
      return;
    }

    if (id === "progetti") {
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

    if (id === "contatti") {
      if (scrollToSection(id)) return;
      navigate({ pathname: "/", hash: id });
      return;
    }

    if (scrollToSection(id)) return;

    navigate({ pathname: "/", hash: id });
  }

  function goToContatti() {
    go("contatti");
  }

  const logoMark = (
    <img
      src={logoSrc}
      alt="Drop"
      className="drop-header-logo"
    />
  );

  return (
    <Fragment>
      <header
        className="drop-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10100,
          padding: scrolled ? "14px 0" : "24px 0",
          background: headerBackground,
          backdropFilter: headerBackdrop,
          WebkitBackdropFilter: headerBackdrop,
          borderBottom: headerBorder,
          transition:
            "padding .45s var(--ease), background .45s var(--ease), border-color .45s var(--ease), box-shadow .45s var(--ease), backdrop-filter .45s var(--ease)",
          boxShadow: headerShadow,
        }}
      >
        <div className="drop-header-inner container-wide">
          <div className="drop-header-brand">
            {logoSubtitle ? (
              <Link to="/" className="drop-header-brand-link">
                {logoMark}
                <span className="drop-header-divider" style={{ background: subtitleDivider }} />
                <span className="drop-header-subtitle" style={{ color: subtitleColor }}>
                  {logoSubtitle}
                  {projectName ? (
                    <span style={{ color: "var(--drop-orange)" }}>
                      {" / "}
                      {projectName}
                    </span>
                  ) : null}
                </span>
              </Link>
            ) : (
              <a
                href="#top"
                className="drop-header-brand-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.__lenis) {
                    window.__lenis.scrollTo(0, { duration: 1.2 });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {logoMark}
              </a>
            )}
          </div>

          <nav className="drop-header-nav hide-mobile">
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
                  color: navTextColor,
                  letterSpacing: "-0.005em",
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 8,
                  transition: "background .35s var(--ease), color .35s var(--ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = navHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: 10, color: "var(--drop-orange)", fontWeight: 500 }}>{l.num}</span>
                {l.label}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-primary btn-compact"
              onClick={goToContatti}
              style={{ marginLeft: 8, flexShrink: 0 }}
            >
              <span className="btn-fill" aria-hidden />
              <span style={{ position: "relative" }}>Iniziamo un progetto</span>
            </button>
          </nav>

          <button
            type="button"
            className="drop-header-burger"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d="M0 1H18M0 7H18M0 13H12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10150,
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
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
          aria-hidden={!open}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(560px, 100vw)",
            background: "var(--drop-teal)",
            color: "white",
            transform: open ? "translateX(0)" : "translateX(100%)",
            visibility: open ? "visible" : "hidden",
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={goToContatti}
              style={{
                marginTop: 32,
                alignSelf: "flex-start",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `opacity .6s var(--ease) ${0.2 + NAV_LINKS.length * 0.06}s, transform .6s var(--ease) ${0.2 + NAV_LINKS.length * 0.06}s`,
              }}
            >
              Iniziamo un progetto
            </button>
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
              {contactLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="footer-link"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="footer-link"
                    onClick={() => setOpen(false)}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>
        </aside>
      </div>
    </Fragment>
  );
}
