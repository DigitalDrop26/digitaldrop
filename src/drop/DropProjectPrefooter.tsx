import { Link, useLocation } from "react-router-dom";
import { getNextProject, getPreviousProject, type DropProject } from "./dropProjects";
import { Reveal } from "./hooksAndUi";

function PrefooterNavLink({
  project,
  direction,
}: {
  project: DropProject & { detailPath: string };
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  const label = isPrev ? "Progetto precedente" : "Prossimo progetto";

  const copy = (
    <span className="drop-project-prefooter-link-copy">
      <span className="drop-project-prefooter-link-label">{label}</span>
      <span className="drop-project-prefooter-link-title">{project.title}</span>
    </span>
  );

  const thumb = (
    <span className="drop-project-prefooter-link-thumb" aria-hidden>
      <img src={project.img} alt="" loading="lazy" decoding="async" draggable={false} />
    </span>
  );

  const arrow = (
    <span className="drop-project-prefooter-link-arrow" aria-hidden>
      {isPrev ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M13 7H1M1 7L6 2M1 7L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7H13M13 7L8 2M13 7L8 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      )}
    </span>
  );

  return (
    <Link
      to={project.detailPath}
      className={`drop-project-prefooter-link drop-project-prefooter-link--${direction}`}
      aria-label={`${label}: ${project.title}`}
    >
      {isPrev ? (
        <>
          {arrow}
          {thumb}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {thumb}
          {arrow}
        </>
      )}
    </Link>
  );
}

/** Navigazione tra progetti — fine pagina case study. */
export function DropProjectPrefooter() {
  const { pathname } = useLocation();
  const previousProject = getPreviousProject(pathname);
  const nextProject = getNextProject(pathname);
  const showNav = Boolean(previousProject?.detailPath || nextProject?.detailPath);

  if (!showNav) return null;

  return (
    <>
      <section id="progetto-nav" className="section drop-project-nav" aria-label="Altri progetti">
        <div className="container-wide">
          <Reveal delay={0}>
            <nav className="drop-project-prefooter-nav" aria-label="Navigazione tra i progetti">
              {previousProject?.detailPath ? (
                <PrefooterNavLink project={previousProject} direction="prev" />
              ) : (
                <span aria-hidden />
              )}
              {nextProject?.detailPath ? (
                <PrefooterNavLink project={nextProject} direction="next" />
              ) : (
                <span aria-hidden />
              )}
            </nav>
          </Reveal>
        </div>
      </section>

      <style>{`
        .drop-project-nav {
          background: var(--paper-warm);
          padding-top: clamp(48px, 8vw, 80px);
          padding-bottom: clamp(64px, 10vw, 112px);
        }
        .drop-project-prefooter-nav {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(16px, 2.5vw, 24px);
          text-align: left;
        }
        .drop-project-prefooter-link {
          display: flex;
          align-items: center;
          gap: clamp(14px, 2vw, 20px);
          padding: clamp(14px, 2vw, 18px);
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid rgba(0, 44, 66, 0.08);
          color: inherit;
          text-decoration: none;
          transition:
            transform 0.45s var(--ease),
            box-shadow 0.45s var(--ease),
            border-color 0.45s var(--ease);
        }
        .drop-project-prefooter-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -24px rgba(0, 44, 66, 0.28);
          border-color: rgba(0, 44, 66, 0.14);
        }
        .drop-project-prefooter-link--prev {
          justify-self: start;
        }
        .drop-project-prefooter-link--next {
          justify-self: end;
          text-align: right;
        }
        .drop-project-prefooter-link-thumb {
          flex-shrink: 0;
          width: clamp(88px, 10vw, 112px);
          aspect-ratio: 4 / 3;
          border-radius: 14px;
          overflow: hidden;
          line-height: 0;
          background: var(--teal-100);
        }
        .drop-project-prefooter-link-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s var(--ease);
        }
        .drop-project-prefooter-link:hover .drop-project-prefooter-link-thumb img {
          transform: scale(1.06);
        }
        .drop-project-prefooter-link-copy {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .drop-project-prefooter-link-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--drop-orange);
        }
        .drop-project-prefooter-link-title {
          font-family: var(--font-display, inherit);
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--drop-teal);
        }
        .drop-project-prefooter-link-arrow {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: var(--paper-warm);
          color: var(--drop-teal);
          box-shadow: none;
          transition: background 0.35s var(--ease), color 0.35s var(--ease);
        }
        .drop-project-prefooter-link:hover .drop-project-prefooter-link-arrow {
          background: var(--drop-orange);
          color: #ffffff;
        }
        @media (max-width: 820px) {
          .drop-project-prefooter-nav {
            grid-template-columns: 1fr;
          }
          .drop-project-prefooter-link--prev,
          .drop-project-prefooter-link--next {
            justify-self: stretch;
            text-align: left;
          }
          .drop-project-prefooter-link--next .drop-project-prefooter-link-copy {
            order: 1;
          }
          .drop-project-prefooter-link--next .drop-project-prefooter-link-thumb {
            order: 0;
          }
          .drop-project-prefooter-link--next .drop-project-prefooter-link-arrow {
            order: 2;
            margin-left: auto;
          }
        }
      `}</style>
    </>
  );
}
