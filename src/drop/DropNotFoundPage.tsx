import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { notFoundSeo } from "../seo/routes";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { CursorFollower } from "./hooksAndUi";

/** Catch-all. GitHub Pages serve dist/404.html con status 404. */
export function DropNotFoundPage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = notFoundSeo.title;

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    const prevRobots = robots.content;
    robots.content = "noindex";

    return () => {
      document.title = prevTitle;
      if (!robots) return;
      if (created) robots.remove();
      else robots.content = prevRobots;
    };
  }, []);

  return (
    <Fragment>
      <CursorFollower />
      <DropHeader logoSubtitle="Pagina non trovata" />
      <main
        id="top"
        style={{
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "clamp(140px, 22vh, 240px) 0 clamp(80px, 12vh, 140px)",
          background: "var(--paper-warm)",
        }}
      >
        <div className="container-wide" style={{ maxWidth: 760 }}>
          <h1 className="display display-lg" style={{ margin: 0, color: "var(--drop-teal)" }}>
            Pagina non trovata
          </h1>
          <p
            style={{
              marginTop: 24,
              marginBottom: 32,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.55,
              color: "var(--ink)",
              fontWeight: 500,
            }}
          >
            {notFoundSeo.description}
          </p>
          <Link to="/" style={{ color: "var(--drop-orange)", fontWeight: 600, fontSize: 18 }}>
            Torna alla home
          </Link>
        </div>
      </main>
      <DropFooter />
    </Fragment>
  );
}
