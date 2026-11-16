type DropHeroBackgroundProps = {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  /** Solo per LCP homepage — una immagine per pagina al massimo. */
  priority?: boolean;
};

/** Sfondo hero come `<img>`: niente lazy, è la prima schermata. */
export function DropHeroBackground({ src, alt, srcSet, sizes, priority = false }: DropHeroBackgroundProps) {
  return (
    <img
      src={src}
      alt={alt}
      {...(srcSet ? { srcSet, sizes } : {})}
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
