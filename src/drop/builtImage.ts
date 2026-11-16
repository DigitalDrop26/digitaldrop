/** Immagine emessa dal plugin di build (`?img`): WebP e, se serve, srcset. */
export type BuiltImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

export type ImageShot = {
  src: string;
  srcSet?: string;
  alt: string;
  objectPosition?: string;
};

export function imageShot(image: string | BuiltImage, alt: string, objectPosition?: string): ImageShot {
  if (typeof image === "string") {
    return objectPosition ? { src: image, alt, objectPosition } : { src: image, alt };
  }
  return {
    src: image.src,
    ...(image.srcSet ? { srcSet: image.srcSet } : {}),
    alt,
    ...(objectPosition ? { objectPosition } : {}),
  };
}
