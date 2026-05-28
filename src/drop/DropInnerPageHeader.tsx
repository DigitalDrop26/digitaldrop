import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bundleResources } from "./bundleResources";
import { useScrollY } from "./hooksAndUi";

/** Header fisso stile home, con link SPA verso home per sottopagine (progetti). */
export function DropInnerPageHeader() {
  const [scrolled, setScrolled] = useState(false);
  const y = useScrollY();
  useEffect(() => {
    setScrolled(y > 40);
  }, [y]);

  const pill = {
    padding: "11px 18px",
    borderRadius: 999,
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.005em",
    textDecoration: "none",
    transition: "background .35s var(--ease), color .35s var(--ease)",
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    color: "white",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.06)",
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
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.08)",
          transition: "padding .45s var(--ease), border-color .45s var(--ease)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,26,52,0.18)" : "none",
        }}
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
          >
            <img
              src={bundleResources.logoWhiteOrange}
              alt="Drop"
              style={{ height: 36, width: "auto", maxWidth: "min(220px, 42vw)", display: "block" }}
            />
            <span style={{ display: "inline-block", height: 22, width: 1, background: "rgba(255,255,255,0.28)" }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "0.06em",
                lineHeight: 1.2,
                maxWidth: 220,
              }}
            >
              Progetti &amp; case study
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <Link to="/projects" style={pill}>
              <span style={{ fontSize: 10, color: "var(--drop-orange)", fontWeight: 500 }}>←</span>
              Torna ai progetti
            </Link>
          </nav>
        </div>
      </header>

    </Fragment>
  );
}
