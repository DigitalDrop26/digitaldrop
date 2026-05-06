import styles from "./VisionSection.module.css";

const INSPIRE_SERVICES = [
  "Consulenza digitale",
  "Strategia & Marketing digitale",
  "Supporto alla transizione digitale",
] as const;

const OTHER_ITEMS = [
  { id: null as string | null, label: "Action" },
  { id: "year1998", label: "1998" },
] as const;

export function VisionSection() {
  return (
    <section id="action" className={`section ${styles.section}`}>
      <div className="container">
        <header className={styles.head}>
          <h2 className="h1-visual">
            Da visione a realtà, con un tocco di creatività
          </h2>
        </header>
        <div className={styles.circles}>
          <div className={styles.circleWrap}>
            <button
              type="button"
              className={`${styles.circle} ${styles.circleInspire}`}
              aria-label={`Inspire. ${INSPIRE_SERVICES.join(". ")}`}
            >
              <span className={styles.circleLabel}>Inspire</span>
              <ul className={styles.inspireList}>
                {INSPIRE_SERVICES.map((line) => (
                  <li key={line} className={styles.inspireItem}>
                    {line}
                  </li>
                ))}
              </ul>
            </button>
          </div>
          {OTHER_ITEMS.map(({ id, label }) => (
            <div key={label} className={styles.circleWrap} {...(id ? { id } : {})}>
              <div className={styles.circle} tabIndex={0} role="group" aria-label={label}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
