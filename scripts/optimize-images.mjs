#!/usr/bin/env node
/**
 * Compresses images referenced via @Immagini/... in src/.
 * Run from repo root: npm run optimize:images
 * Safe to re-run — skips files already within target dimensions and size budget.
 */
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

let ffmpegBin = "ffmpeg";
try {
  const mod = await import("ffmpeg-static");
  if (mod.default) ffmpegBin = mod.default;
} catch {
  /* optional */
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMMAGINI = path.join(ROOT, "Immagini");
const SRC = path.join(ROOT, "src");

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const VIDEO_RE = /\.(mp4|mov|webm)$/i;

/** Longest edge caps by path pattern (first match wins). */
const RULES = [
  { test: /trattore\.jpe?g$/i, max: 1400, quality: 82 },
  { test: /Drop_hero|_hero\.|Agrovit_hero|Anafibj_hero|Fiera Cremona\.jpg$/i, max: 2400, quality: 82 },
  { test: /PERSONAGGI PNG/i, max: 1100, png: true },
  { test: /\/social\//i, max: 960, quality: 80 },
  { test: /brand identity|Marketing strategico|Piani di comunicazione|creazione contenuti|AI_Drop/i, max: 1100, quality: 82 },
  { test: /food-sector|agrovit_testata/i, max: 1200, quality: 82 },
  { test: /adv stampa|mockup/i, max: 1800, quality: 82 },
  { test: /Anafibj\/(cell|CLAIM|anafibj01|anafibj09|laptop)/i, max: 1400, quality: 82 },
  { test: /Alleva PR|Fiera Cremona|Agrovit|Anafibj/i, max: 1920, quality: 82 },
];

const DEFAULT = { max: 1600, quality: 82 };

function collectReferencedAssets() {
  const paths = new Set();
  const re = /from\s+["']@Immagini\/(.+?)["']/g;

  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (/\.(tsx?|jsx?)$/.test(ent.name)) {
        const text = fs.readFileSync(full, "utf8");
        let m;
        while ((m = re.exec(text))) {
          const rel = m[1].replace(/\?url$/, "");
          paths.add(rel);
        }
      }
    }
  }

  walk(SRC);
  return [...paths].map((rel) => path.join(IMMAGINI, rel));
}

function ruleFor(filePath) {
  const rel = path.relative(IMMAGINI, filePath);
  for (const r of RULES) {
    if (r.test.test(rel)) return r;
  }
  return DEFAULT;
}

function fmt(bytes) {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function optimizeImage(filePath, opts) {
  const before = fs.statSync(filePath).size;
  const meta = await sharp(filePath).metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  const needsResize = longest > opts.max;

  const tmp = `${filePath}.opt.tmp`;
  const ext = path.extname(filePath).toLowerCase();
  let pipeline = sharp(filePath, { failOn: "none" });
  if (needsResize) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? opts.max : undefined,
      height: meta.height > meta.width ? opts.max : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const hasAlpha = meta.hasAlpha === true;

  if (ext === ".png" || opts.png) {
    if (hasAlpha) {
      await pipeline.png({ compressionLevel: 9, palette: false, effort: 10 }).toFile(tmp);
    } else {
      // Large photo PNGs without alpha → JPEG at same path would break imports; compress PNG hard.
      await pipeline.png({ compressionLevel: 9, palette: longest > 800, effort: 10 }).toFile(tmp);
    }
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: opts.quality, effort: 6 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality: opts.quality, mozjpeg: true }).toFile(tmp);
  }

  const after = fs.statSync(tmp).size;
  // Keep original if optimization didn't help meaningfully (<8% or larger)
  if (after >= before * 0.92) {
    fs.unlinkSync(tmp);
    return { before, after: before, skipped: true };
  }

  try {
    fs.unlinkSync(filePath);
  } catch {
    /* ignore */
  }
  fs.renameSync(tmp, filePath);
  return { before, after, skipped: false };
}

function hasFfmpeg() {
  try {
    execFileSync(ffmpegBin, ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function optimizeVideo(filePath) {
  const before = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();
  const tmp = `${filePath}.opt.tmp${ext}`;
  const args = [
    "-y",
    "-i",
    filePath,
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-vf",
    "scale='min(1080,iw)':-2",
    "-an",
    "-movflags",
    "+faststart",
    tmp,
  ];
  const r = spawnSync(ffmpegBin, args, { stdio: "pipe" });
  if (r.status !== 0 || !fs.existsSync(tmp)) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    return { before, after: before, skipped: true, error: true };
  }
  const after = fs.statSync(tmp).size;
  if (after >= before * 0.9) {
    fs.unlinkSync(tmp);
    return { before, after: before, skipped: true };
  }
  try {
    fs.unlinkSync(filePath);
  } catch {
    /* original may already be gone */
  }
  fs.renameSync(tmp, filePath);
  return { before, after, skipped: false };
}

async function main() {
  const files = collectReferencedAssets();
  const missing = files.filter((f) => !fs.existsSync(f));
  if (missing.length) {
    console.warn("Missing files:", missing.map((f) => path.relative(ROOT, f)).join("\n  "));
  }

  const images = files.filter((f) => fs.existsSync(f) && IMAGE_RE.test(f));
  const videos = files.filter((f) => fs.existsSync(f) && VIDEO_RE.test(f));

  let savedImages = 0;
  let savedVideos = 0;

  console.log(`\nOptimizing ${images.length} images…\n`);

  for (const file of images) {
    const rel = path.relative(ROOT, file);
    const opts = ruleFor(file);
    try {
      const { before, after, skipped } = await optimizeImage(file, opts);
      if (skipped) {
        console.log(`  skip  ${rel} (${fmt(before)})`);
      } else {
        savedImages += before - after;
        console.log(`  ok    ${rel}  ${fmt(before)} → ${fmt(after)}`);
      }
    } catch (err) {
      console.error(`  FAIL  ${rel}:`, err.message);
    }
  }

  if (videos.length) {
    if (!hasFfmpeg()) {
      console.log(`\nSkipping ${videos.length} videos (ffmpeg not installed).`);
      console.log("  Install ffmpeg and re-run for reel compression.\n");
    } else {
      console.log(`\nOptimizing ${videos.length} videos…\n`);
      for (const file of videos) {
        const rel = path.relative(ROOT, file);
        try {
          const { before, after, skipped, error } = optimizeVideo(file);
          if (error) console.error(`  FAIL  ${rel}: ffmpeg error`);
          else if (skipped) console.log(`  skip  ${rel} (${fmt(before)})`);
          else {
            savedVideos += before - after;
            console.log(`  ok    ${rel}  ${fmt(before)} → ${fmt(after)}`);
          }
        } catch (err) {
          console.error(`  FAIL  ${rel}:`, err.message);
        }
      }
    }
  }

  const totalSaved = savedImages + savedVideos;
  console.log("\n---");
  console.log(`Images saved: ${fmt(savedImages)}`);
  console.log(`Videos saved: ${fmt(savedVideos)}`);
  console.log(`Total saved:  ${fmt(totalSaved)}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
