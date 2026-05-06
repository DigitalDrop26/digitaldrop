import styles from "./QuoteSection.module.css";

export function QuoteSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="quote-heading">
      <div className="container">
        <div className={styles.wrap}>
          <blockquote className={styles.quote} lang="it">
            <h1 id="quote-heading" className={styles.quoteText}>
              Crediamo che il lavoro di squadra, l&apos;innovazione e l&apos;impegno siano la chiave
              per creare valore duraturo.
            </h1>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
