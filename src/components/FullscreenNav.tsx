import { useEffect, useRef } from "react";
import styles from "./FullscreenNav.module.css";

type FullscreenNavProps = {
  open: boolean;
  onClose: () => void;
};

const LINKS = [
  { href: "#inspire", label: "Inspire" },
  { href: "#action", label: "Action" },
  { href: "#year1998", label: "1998" },
  { href: "#projects", label: "Projects" },
] as const;

const RING_COUNT = 5;

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.07H7.9v-2.87h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.87h-2.34V22C18.34 21.2 22 17.06 22 12.06Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
    </svg>
  );
}

export function FullscreenNav({ open, onClose }: FullscreenNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    el?.querySelector<HTMLElement>("a")?.focus();
  }, [open]);

  return (
    <div
      ref={panelRef}
      id="site-menu"
      className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
      aria-hidden={!open}
    >
      <div
        className={`${styles.rippleField} ${open ? styles.rippleFieldOpen : ""}`}
        aria-hidden
      >
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <span key={i} className={styles.ring} data-index={i} />
        ))}
      </div>

      <div className={styles.closeArea}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Chiudi menu">
          ×
        </button>
      </div>

      <div className={styles.menuCenter}>
        <nav aria-label="Principale">
          <ul className={styles.navList}>
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.navLink}
                  onClick={() => {
                    onClose();
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.footer}>
        <div className={styles.social}>
          <a
            className={styles.socialLink}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
          >
            <IconFacebook />
          </a>
          <a
            className={styles.socialLink}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
          >
            <IconInstagram />
          </a>
        </div>
        <div className={`${styles.contact} text-small`}>
          <div>Strada 28, Ovest Arborea - 09092 (OR)</div>
          <div>
            <a href="mailto:info@digitaldrop.eu">info@digitaldrop.eu</a>
          </div>
        </div>
      </div>
    </div>
  );
}
