import { Fragment, useEffect, useRef, useState } from "react";
import {
  PROJECT_CATEGORY_FILTERS,
  filterProjectsByCategory,
  type ProjectCategoryId,
} from "./dropProjects";
import { DropFooter } from "./DropFooter";
import { DropHeader } from "./DropHeader";
import { DropNewsletter } from "./DropNewsletter";
import { DropProjectCard } from "./DropProjectCard";
import { DropProjectsArchiveHero } from "./DropProjectsArchiveHero";
import { CursorFollower, Reveal, useReveal } from "./hooksAndUi";

/** Archivio progetti — hero + griglia filtrabile per categoria. */
export function DropProjectsArchivePage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>("tutti");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = filterProjectsByCategory(activeCategory);
  const filterRefreshKey = `${activeCategory}:${filtered.map((p) => p.id).join(",")}`;

  useReveal(mainRef, { refreshKey: filterRefreshKey });

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Tutti i progetti · Drop";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <Fragment>
      <CursorFollower />
      <DropHeader logoSubtitle="Progetti & case study" />

      <main id="top" ref={mainRef}>
        <DropProjectsArchiveHero />

        <section id="archive" className="section" style={{ background: "#ffffff" }}>
          <div className="container-wide">
            <Reveal delay={0}>
              <div
                className="projects-archive-filters"
                role="tablist"
                aria-label="Filtra progetti per categoria"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {PROJECT_CATEGORY_FILTERS.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        fontFamily: "inherit",
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        padding: "11px 18px",
                        borderRadius: 999,
                        border: active ? "1.5px solid var(--drop-teal)" : "1.5px solid rgba(0, 80, 119, 0.18)",
                        background: active ? "var(--drop-teal)" : "transparent",
                        color: active ? "white" : "var(--drop-teal)",
                        cursor: "pointer",
                        transition: "background .35s var(--ease), color .35s var(--ease), border-color .35s var(--ease)",
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <p
              aria-live="polite"
              style={{
                marginTop: 20,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--teal-500)",
              }}
            >
              {filtered.length} {filtered.length === 1 ? "progetto" : "progetti"}
              {activeCategory !== "tutti"
                ? ` · ${PROJECT_CATEGORY_FILTERS.find((c) => c.id === activeCategory)?.label}`
                : ""}
            </p>

            <div
              className="projects-archive-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "clamp(16px, 2vw, 28px)",
                marginTop: "clamp(24px, 4vw, 40px)",
              }}
            >
              {filtered.map((project, i) => (
                <DropProjectCard
                  key={project.id}
                  project={project}
                  delay={i}
                  hovered={hovered === project.id}
                  onHover={setHovered}
                  height={440}
                  style={{ gridColumn: "span 6" }}
                />
              ))}
            </div>

            {filtered.length === 0 ? (
              <Reveal delay={0}>
                <p style={{ marginTop: 48, fontSize: 17, color: "var(--teal-500)", fontWeight: 500 }}>
                  Nessun progetto in questa categoria al momento.
                </p>
              </Reveal>
            ) : null}
          </div>
        </section>

        <DropNewsletter />
      </main>

      <style>{`
        @media (max-width: 900px) {
          .projects-archive-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-archive-grid .case-card {
            grid-column: 1 !important;
          }
        }
      `}</style>

      <DropFooter anchorsResolveHome />
    </Fragment>
  );
}
