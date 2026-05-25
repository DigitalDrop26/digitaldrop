import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "extracted-bundle", "assets");
const OUT = path.join(ROOT, "src", "drop");

const FILES = [
  { file: "469f5554-6296-453b-8d0f-16bb0456a599.js", local: "DropHeader.tsx", fn: "Header", ex: "DropHeader", hooks: ["useScrollY"] },
  { file: "71fe2869-db27-4900-b6b3-c6c63433854e.js", local: "DropHero.tsx", fn: "Hero", ex: "DropHero", hooks: ["useReveal", "useScrollY", "Btn", "CountUp"] },
  { file: "4472f697-5649-46a2-8e2a-e8eed2d500fe.js", local: "DropManifesto.tsx", fn: "Manifesto", ex: "DropManifesto", hooks: ["useReveal", "LineReveal"] },
  { file: "ba1027d2-ae62-460b-8a53-fea1e4318124.js", local: "DropServices.tsx", fn: "Services", ex: "DropServices", hooks: ["useReveal", "SectionHead", "Btn"] },
  { file: "b6fbc7bc-0d0a-469d-84b7-07eae601893d.js", local: "DropSectors.tsx", fn: "Sectors", ex: "DropSectors", hooks: ["useReveal", "SectionHead", "MarqueeRow"] },
  { file: "6eada4e2-5c95-4e39-8da2-fb1cf3525bfd.js", local: "DropNumbers.tsx", fn: "Numbers", ex: "DropNumbers", hooks: ["useReveal", "SectionHead", "CountUp"] },
  { file: "28917f5e-88e9-4bcf-880f-33f3b2f0a5ef.js", local: "DropProcess.tsx", fn: "Process", ex: "DropProcess", hooks: ["useReveal", "SectionHead"] },
  { file: "bcd46247-4e25-41e2-9dee-d94b9466a15f.js", local: "DropValues.tsx", fn: "Values", ex: "DropValues", hooks: ["useReveal", "SectionHead"] },
  { file: "08a5b908-4432-4500-a6e9-21724e499aca.js", local: "DropCaseStudies.tsx", fn: "CaseStudies", ex: "DropCaseStudies", hooks: ["useReveal", "MarqueeRow", "SectionHead"] },
  { file: "42542fb5-8540-488e-829e-2ff33824e847.js", local: "DropNewsletter.tsx", fn: "Newsletter", ex: "DropNewsletter", hooks: ["useReveal", "LineReveal", "Btn"] },
  { file: "4f3cad60-8cb8-41a7-adc5-cc6ff9dfe97e.js", local: "DropFooter.tsx", fn: "Footer", ex: "DropFooter", hooks: ["useReveal"] },
];

function transformBody(body, { fn, ex }) {
  let c = body;
  c = c.replace(/^const \{[^}]+\} = React;\r?\n/m, "");
  c = c.replace(/\buseStateH\b/g, "useState");
  c = c.replace(/\buseEffectH\b/g, "useEffect");
  c = c.replace(/\buseRefH\b/g, "useRef");
  c = c.replace(/window\.__resources/g, "bundleResources");
  c = c.replace(/React\.useRef/g, "useRef");
  c = c.replace(/React\.useState/g, "useState");
  c = c.replace(/React\.useEffect/g, "useEffect");
  c = c.replace(/React\.Fragment/g, "Fragment");
  c = new RegExp(`function ${fn}\\(`).test(c)
    ? c.replace(new RegExp(`function ${fn}\\(`), `export function ${ex}(`)
    : c;
  c = c.replace(/window\.Drop[A-Za-z]+\s*=\s*[A-Za-z]+;\r?\n?/g, "");
  return c.trim() + "\n";
}

function makeImports(hooks) {
  const base = [`import React, { useEffect, useRef, useState, Fragment } from "react";`, `import { bundleResources } from "./bundleResources";`];
  if (hooks.length) {
    base.push(`import { ${hooks.join(", ")} } from "./hooksAndUi";`);
  }
  return base.join("\n") + "\n\n";
}

for (const job of FILES) {
  const raw = fs.readFileSync(path.join(SRC, job.file), "utf8");
  const body = transformBody(raw, job);
  fs.writeFileSync(path.join(OUT, job.local), makeImports(job.hooks) + body);
  console.log("wrote", job.local);
}

console.log("done");
