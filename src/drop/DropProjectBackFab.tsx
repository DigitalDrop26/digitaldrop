import { Link } from "react-router-dom";

/** Pulsante floating — torna all'archivio progetti. */
export function DropProjectBackFab() {
  return (
    <Link to="/projects" className="project-back-fab" aria-label="Tutti i progetti" title="Tutti i progetti">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M17 10H3M3 10L8 5M3 10L8 15"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </Link>
  );
}
