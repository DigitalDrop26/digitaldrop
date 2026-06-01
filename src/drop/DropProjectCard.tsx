import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./hooksAndUi";
import type { DropProject } from "./dropProjects";
import { PROJECT_CATEGORY_LABELS } from "./dropProjects";

type DropProjectCardProps = {
  project: DropProject;
  delay?: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
  /** Altezza card (px). Default 420 per griglia archivio. */
  height?: number;
  className?: string;
  style?: CSSProperties;
};

/** Card progetto — stile case study home, riutilizzabile in archivio e homepage. */
export function DropProjectCard({
  project,
  delay = 0,
  hovered,
  onHover,
  height = 420,
  className = "case-card",
  style,
}: DropProjectCardProps) {
  const revealProps = {
    delay,
    className,
    "data-cursor": project.detailPath ? ("hover" as const) : undefined,
    onMouseEnter: () => onHover(project.id),
    onMouseLeave: () => onHover(null),
    style: {
      position: "relative" as const,
      borderRadius: 24,
      overflow: "hidden" as const,
      background: "var(--teal-100)",
      height,
      cursor: project.detailPath ? "pointer" : "default",
      textDecoration: "none",
      color: "inherit",
      display: "block",
      ...style,
    },
    ...(project.detailPath !== undefined ? { as: Link, to: project.detailPath } : {}),
  };

  return (
    <Reveal {...revealProps}>
      <img
        src={project.img}
        alt={project.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 1.4s var(--ease), filter .6s var(--ease)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          filter: hovered ? "brightness(0.65)" : "brightness(0.85)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "28px 28px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.categories.map((cat) => (
            <div
              key={cat}
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {PROJECT_CATEGORY_LABELS[cat]}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", opacity: 0.8 }}>{project.year}</div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, color: "white" }}>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--drop-orange)",
              letterSpacing: "0.06em",
              marginBottom: 8,
            }}
          >
            {project.client}
          </div>
          <h3
            className="display"
            style={{
              margin: 0,
              fontSize: "clamp(20px, 2vw, 28px)",
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: "24ch",
            }}
          >
            {project.title}
          </h3>
        </div>
        {project.detailPath ? (
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              fontWeight: 600,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity .45s var(--ease), transform .45s var(--ease)",
            }}
          >
            Leggi il case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
