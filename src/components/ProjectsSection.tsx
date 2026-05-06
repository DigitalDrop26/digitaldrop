import { useState, useCallback } from "react";
import styles from "./ProjectsSection.module.css";

/** Dati minimi per ogni voce portfolio (estendi con href, immagine, excerpt, ecc.) */
export type PortfolioPreview = {
  id: string;
  title: string;
};

const PLACEHOLDERS: PortfolioPreview[] = [
  { id: "p1", title: "Progetto uno" },
  { id: "p2", title: "Progetto due" },
  { id: "p3", title: "Progetto tre" },
  { id: "p4", title: "Progetto quattro" },
];

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d={dir === "next" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectsSection() {
  const items = PLACEHOLDERS;
  const slideCount = items.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + slideCount) % slideCount);
    },
    [slideCount],
  );

  const featured = items[index];
  const liveLabel = `In evidenza: ${featured.title}. In anteprima: ${items[(index + 1) % slideCount].title}.`;

  return (
    <section id="projects" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 className="h2-visual">Progetti</h2>
            <h3 className="h1-visual">L&apos;ispirazione incontra l&apos;azione</h3>
            <p>
              Esplora alcuni dei nostri progetti: idee trasformate in realtà che hanno avuto un
              impatto reale. Ogni progetto è un esempio del nostro impegno a creare soluzioni che
              lasciano il segno e fanno la differenza.
            </p>
          </div>
          <div className={styles.carouselCol}>
            <div className={styles.carousel}>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={() => go(-1)}
                aria-label="Progetti precedenti"
              >
                <ArrowIcon dir="prev" />
              </button>
              <div className={styles.viewport}>
                <div
                  className={styles.track}
                  style={{
                    width: `${slideCount * 100}%`,
                    transform: `translateX(-${(index * 100) / slideCount}%)`,
                  }}
                  aria-live="polite"
                  aria-label={liveLabel}
                >
                  {items.map((feat, i) => {
                    const peek = items[(i + 1) % slideCount];
                    return (
                      <div
                        key={feat.id}
                        className={styles.slide}
                        style={{ width: `${100 / slideCount}%` }}
                      >
                        <article
                          className={`${styles.card} ${styles.cardFeatured}`}
                          aria-label={feat.title}
                        />
                        <article
                          className={`${styles.card} ${styles.cardPeek}`}
                          aria-label={`Anteprima: ${peek.title}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={() => go(1)}
                aria-label="Progetti successivi"
              >
                <ArrowIcon dir="next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
