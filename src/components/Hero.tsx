import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inspire" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.canvas} aria-hidden>
        <span className={styles.drop} />
        <span className={styles.ripple} />
        <span className={styles.ripple} />
        <span className={styles.ripple} />
        <span className={styles.ripple} />
      </div>
      <div className={styles.inner}>
        <h2 id="hero-title" className={styles.title}>
          Inspire Action
        </h2>
        <a href="#action" className={`btn btn--accent ${styles.cta}`}>
          OUR ACTIONS
        </a>
      </div>
      <a
        href="#action"
        className={styles.scrollCue}
        aria-label="Scorri alla sezione successiva"
      >
        <span className={styles.scrollCueRings} aria-hidden>
          <span className={styles.scrollRing} />
          <span className={styles.scrollRing} />
          <span className={styles.scrollRing} />
        </span>
        <span className={styles.scrollArrow} aria-hidden>
          <svg width="30.03" height="30.03" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
