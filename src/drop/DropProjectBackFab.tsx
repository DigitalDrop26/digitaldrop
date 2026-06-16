import { Link } from "react-router-dom";

/** Pulsante floating — torna all'archivio progetti. */
export function DropProjectBackFab() {
  return (
    <Link to="/projects" className="project-back-fab" aria-label="Torna ai progetti">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M17 10H3M3 10L8 5M3 10L8 15"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span>Torna ai progetti</span>
    </Link>
  );
}
