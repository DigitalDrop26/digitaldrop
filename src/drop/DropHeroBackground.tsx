type DropHeroBackgroundProps = {
  src: string;
  /** Solo per LCP homepage — una immagine per pagina al massimo. */
  priority?: boolean;
};

/** Sfondo hero come `<img>` per lazy load, fetchpriority e migliore LCP rispetto a CSS background. */
export function DropHeroBackground({ src, priority = false }: DropHeroBackgroundProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
