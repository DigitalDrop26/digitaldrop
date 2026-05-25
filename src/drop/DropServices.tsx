import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { Btn, Reveal, useReveal } from "./hooksAndUi";

// Services — line-by-line list with hover image preview (motto-style)
export function DropServices() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const services = [
    {
      num: '01',
      title: 'Strategia di Marketing & Comunicazione',
      tag: 'Audit · Posizionamento · Piani editoriali',
      img: bundleResources.imgTractor,
      desc: 'Piani di comunicazione cuciti su filiere e prodotti agroalimentari, con KPI concreti e tempi reali.',
    },
    {
      num: '02',
      title: 'Brand Identity & Packaging',
      tag: 'Naming · Logo · Packaging · Linee guida',
      img: bundleResources.imgCheese,
      desc: 'Brand riconoscibili che parlano alla terra e al mercato: identità coerenti dal campo allo scaffale.',
    },
    {
      num: '03',
      title: 'Contenuti & Tool digitali',
      tag: 'Siti · App · Foto · Video · Social',
      img: bundleResources.imgPaint,
      desc: 'Contenuti utili, mai decorativi: produciamo siti, app, video e immagini per filiere e community.',
    },
    {
      num: '04',
      title: 'Formazione AI pratica',
      tag: 'Workshop · Toolkit · Adoption',
      img: bundleResources.imgCode900,
      desc: 'Portiamo l\'intelligenza artificiale nei team agricoli e zootecnici, con casi d\'uso veri e mani sulla tastiera.',
    },
  ];

  return (
    <section id="servizi" ref={rootRef} className="section" style={{ background: 'var(--paper-warm)' }}>
      <div className="container-wide">
        {/* Heading */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(48px, 8vw, 120px)' }} className="svc-head">
          <Reveal delay={0}>
            <span className="eyebrow">02 — Servizi</span>
            <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
              Di cosa<br/>ci <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>occupiamo</em>.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500, margin: 0, maxWidth: 420, marginLeft: 'auto' }}>
              Quattro pratiche connesse, una sola filosofia: trasformare imprese del settore
              primario in <strong style={{ color: 'var(--drop-teal)', fontWeight: 700 }}>brand riconosciuti, affidabili e competitivi</strong>.
            </p>
          </Reveal>
        </div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i} className="svc-row" data-cursor="hover">
              <div className="num">[{s.num}]</div>
              <div>
                <div className="title">{s.title}</div>
                <div style={{ marginTop: 14, color: 'var(--teal-500)', fontSize: 14, fontWeight: 500, letterSpacing: '0.02em', maxWidth: 540 }}>
                  {s.desc}
                </div>
              </div>
              <div className="meta">
                {s.tag.split('·').map((t, j) => (
                  <div key={j} style={{ lineHeight: 1.7 }}>{t.trim()}</div>
                ))}
              </div>
              <div className="preview">
                <img src={s.img} alt={s.title} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0} style={{ marginTop: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <p style={{ fontSize: 16, color: 'var(--teal-500)', fontWeight: 500, maxWidth: 480, margin: 0 }}>
            Ogni progetto inizia con un audit gratuito di 45 minuti. Capiamo se possiamo aiutarti,
            senza impegni.
          </p>
          <Btn variant="primary" href="#contatti" onClick={(e) => { e.preventDefault(); document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Prenota un audit
          </Btn>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .svc-head { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
