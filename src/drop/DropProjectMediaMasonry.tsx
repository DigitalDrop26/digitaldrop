import { Reveal } from "./hooksAndUi";

export type MediaMasonryItem = {
  src: string;
  alt: string;
};

/** Riga intera — immagini orizzontali, una colonna. */
export type MediaMasonryFullRow = {
  type: "full";
  item: MediaMasonryItem;
};

/** Riga a griglia — immagini verticali su 2 o 3 colonne. */
export type MediaMasonrySplitRow = {
  type: "split";
  columns: 2 | 3;
  items: MediaMasonryItem[];
};

export type MediaMasonryRow = MediaMasonryFullRow | MediaMasonrySplitRow;

type DropProjectMediaMasonryProps = {
  rows: MediaMasonryRow[];
  ariaLabel: string;
};

function MediaCard({ item, className = "" }: { item: MediaMasonryItem; className?: string }) {
  return (
    <div className={`project-media-card ${className}`.trim()}>
      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
    </div>
  );
}

/** Griglia ordinata — orizzontali a colonna intera, verticali su 2 colonne, angoli uniformi. */
export function DropProjectMediaMasonry({ rows, ariaLabel }: DropProjectMediaMasonryProps) {
  return (
    <>
      <div
        className="project-media-masonry"
        role="list"
        aria-label={ariaLabel}
        style={{ marginTop: "clamp(40px, 6vw, 64px)" }}
      >
        {rows.map((row, rowIdx) => {
          if (row.type === "full") {
            return (
              <Reveal
                key={row.item.src}
                delay={rowIdx}
                role="listitem"
                className="project-media-row project-media-row--full"
              >
                <MediaCard item={row.item} />
              </Reveal>
            );
          }

          return (
            <div
              key={row.items.map((item) => item.src).join("|")}
              className="project-media-row project-media-row--split"
              data-columns={row.columns}
              role="presentation"
            >
              {row.items.map((item) => (
                <Reveal key={item.src} delay={rowIdx} role="listitem" className="project-media-cell">
                  <MediaCard item={item} />
                </Reveal>
              ))}
            </div>
          );
        })}
      </div>

      <style>{`
        .project-media-masonry {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 24px);
        }
        .project-media-row--full,
        .project-media-row--split {
          width: 100%;
        }
        .project-media-row--split {
          display: grid;
          gap: clamp(16px, 2vw, 24px);
          align-items: stretch;
        }
        .project-media-row--split[data-columns="2"] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .project-media-row--split[data-columns="3"] {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .project-media-cell {
          min-width: 0;
          height: 100%;
        }
        .project-media-card {
          border-radius: 24px;
          overflow: hidden;
          line-height: 0;
          height: 100%;
        }
        .project-media-card img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 1.4s var(--ease), filter 0.6s var(--ease);
        }
        .project-media-card:hover img {
          transform: scale(1.02);
        }
        @media (max-width: 900px) {
          .project-media-row--split[data-columns="3"] {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .project-media-row--split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
