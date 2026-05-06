import { Logo } from "./Logo";
import styles from "./Footer.module.css";

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.07H7.9v-2.87h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.87h-2.34V22C18.34 21.2 22 17.06 22 12.06Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <Logo variant="mono" className={styles.logo} />
          </div>
          <div>
            <h2 className={styles.colTitle}>Contatti</h2>
            <div className={styles.contact}>
              <div>Strada 28, Ovest Arborea - 09092 (OR)</div>
              <div>
                <a href="mailto:info@digitaldrop.eu">info@digitaldrop.eu</a>
              </div>
            </div>
          </div>
          <div>
            <h2 className={styles.colTitle}>Social</h2>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
