/**
 * In build, i JPG/PNG importati con ?url diventano WebP (qualità 80).
 * Con ?img, se il file è largo, emette anche gli srcset più piccoli.
 * In dev ?img riusa il file originale, così l'anteprima non cambia.
 */
import path from "node:path";
import sharp from "sharp";

const SRCSET_WIDTHS = [480, 768, 1080, 1440, 1920];

function isRaster(file) {
  return /\.(png|jpe?g)$/i.test(file);
}

export function webpImages(command) {
  return {
    name: "webp-images",
    enforce: "pre",
    async load(id) {
      const qIndex = id.indexOf("?");
      if (qIndex === -1) return null;
      const file = id.slice(0, qIndex);
      const params = new URLSearchParams(id.slice(qIndex + 1));
      const wantsImg = params.has("img");
      const wantsUrl = params.has("url");
      if (!wantsImg && !wantsUrl) return null;
      if (!isRaster(file)) return null;

      if (command !== "build") {
        if (!wantsImg) return null;
        return `import src from ${JSON.stringify(`${file}?url`)};
export default { src, srcSet: "", width: 0, height: 0 };`;
      }

      const meta = await sharp(file).metadata();
      const width = meta.width ?? 0;
      const height = meta.height ?? 0;
      const stem = path.basename(file, path.extname(file));
      const full = await sharp(file).webp({ quality: 80 }).toBuffer();
      const fullRef = this.emitFile({
        type: "asset",
        name: `${stem}.webp`,
        source: full,
      });
      const fullUrl = `__VITE_ASSET__${fullRef}__`;

      if (!wantsImg) return `export default "${fullUrl}";`;

      const candidates = SRCSET_WIDTHS.filter((w) => w + 80 < width);
      if (candidates.length === 0) {
        return `export default { src: "${fullUrl}", srcSet: "", width: ${width}, height: ${height} };`;
      }

      const parts = [];
      for (const w of candidates) {
        const buf = await sharp(file)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        const ref = this.emitFile({
          type: "asset",
          name: `${stem}-${w}.webp`,
          source: buf,
        });
        parts.push(`__VITE_ASSET__${ref}__ ${w}w`);
      }
      parts.push(`${fullUrl} ${width}w`);
      return `export default { src: "${fullUrl}", srcSet: "${parts.join(", ")}", width: ${width}, height: ${height} };`;
    },
  };
}
