import { useRef } from "react";
import { Reveal } from "./hooksAndUi";

export type SocialMasonryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Post quadrato o reel verticale. */
  variant: "post" | "reel";
};

type DropProjectSocialMasonryProps = {
  columns: SocialMasonryItem[][];
  ariaLabel: string;
};

function SocialMasonryCard({ item }: { item: SocialMasonryItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  };

  const pauseVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className={`social-masonry-card social-masonry-card--${item.variant}`}
      onMouseEnter={item.type === "video" ? playVideo : undefined}
      onMouseLeave={item.type === "video" ? pauseVideo : undefined}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
        />
      ) : (
        <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
      )}
    </div>
  );
}

/** Feed social — 3 colonne masonry con post quadrati e reel verticali. */
export function DropProjectSocialMasonry({ columns, ariaLabel }: DropProjectSocialMasonryProps) {
  return (
    <>
      <div className="social-masonry" role="list" aria-label={ariaLabel} style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
        {columns.map((col, colIdx) => (
          <div key={`col-${colIdx}`} className="social-masonry-col" role="presentation">
            {col.map((item, itemIdx) => (
              <Reveal
                key={`${colIdx}-${itemIdx}-${item.src}`}
                delay={colIdx + itemIdx}
                role="listitem"
                className="social-masonry-item"
              >
                <SocialMasonryCard item={item} />
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .social-masonry {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(12px, 1.4vw, 18px);
          align-items: start;
        }
        .social-masonry-col {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.4vw, 18px);
          min-width: 0;
        }
        .social-masonry-item {
          width: 100%;
        }
        .social-masonry-card {
          border-radius: 16px;
          overflow: hidden;
          line-height: 0;
          width: 100%;
        }
        .social-masonry-card img,
        .social-masonry-card video {
          width: 100%;
          height: auto;
          display: block;
          vertical-align: middle;
          transition: transform 1.4s var(--ease), filter 0.6s var(--ease);
        }
        .social-masonry-card:hover img,
        .social-masonry-card:hover video {
          transform: scale(1.02);
        }
        @media (max-width: 900px) {
          .social-masonry {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px) {
          .social-masonry {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
