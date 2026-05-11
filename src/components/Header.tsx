import { Logo } from "./Logo";
import { BurgerIcon } from "./BurgerIcon";
import styles from "./Header.module.css";

/** Logo in evidenza con header trasparente: sostituisci il file in `public/logo-navbar-prescroll.svg` (o cambia estensione e aggiorna qui). */
const NAV_LOGO_PRE_SCROLL_SRC = `${import.meta.env.BASE_URL}logo-navbar-prescroll.svg`;

type HeaderProps = {
  scrolled: boolean;
  menuOpen: boolean;
  onMenuToggle: () => void;
};

export function Header({ scrolled, menuOpen, onMenuToggle }: HeaderProps) {
  const headerClass = scrolled ? styles.headerScrolled : styles.headerTransparent;

  return (
    <header className={`${styles.header} ${headerClass}`}>
      <div className={styles.headerInner}>
        <a href="#inspire" className={styles.logoLink}>
          {scrolled ? (
            <Logo variant="mono" className={styles.logo} />
          ) : (
            <img
              src={NAV_LOGO_PRE_SCROLL_SRC}
              alt="Digital Drop"
              className={`${styles.logo} ${styles.logoImg}`}
              width={386}
              height={112}
              decoding="async"
            />
          )}
        </a>
        <button
          type="button"
          className={styles.menuToggle}
          onClick={onMenuToggle}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          <span className="sr-only">{menuOpen ? "Chiudi menu" : "Apri menu"}</span>
          <BurgerIcon open={menuOpen} aria-hidden />
        </button>
      </div>
    </header>
  );
}
