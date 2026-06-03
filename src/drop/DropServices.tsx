import { useRef } from "react";
import { bundleResources } from "./bundleResources";
import { Btn, Reveal, useReveal } from "./hooksAndUi";

// Services — line-by-line list with hover image preview (motto-style)
export function DropServices() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const services = [
    {
      title: "Brand Identity",
      tag: 'Naming · Logo · Payoff · Brand book · Tone of voice',
      img: bundleResources.imgCheese,
      desc: 'Costruiamo identità solide e riconoscibili, che parlano al cuore del tuo pubblico e rendono il tuo marchio memorabile.',
    },
    {
      title: "Marketing strategico",
      tag: 'Analisi di mercato · Posizionamento · Piano strategico · Budget · KPI',
      img: bundleResources.imgTractor,
      desc: 'Analizziamo mercato e obiettivi per creare piani strategici mirati, capaci di generare valore reale e misurabile.',
    },
    {
      title: "Piani di comunicazione",
      tag: 'Media mix · Calendario editoriale · Messaggi chiave · Canali · Campagne',
      img: bundleResources.imgPaint,
      desc: 'Definiamo messaggi, canali e tempistiche per raggiungere il tuo target in modo chiaro, efficace e coordinato.',
    },
    {
      title: "Creazione contenuti",
      tag: 'Copywriting · Fotografia · Video · Social media · Grafiche',
      img: bundleResources.imgPaint,
      desc: 'Produciamo contenuti creativi e di qualità. Testi, immagini, video per raccontare il tuo brand e coinvolgere il pubblico. Spaziamo dalle campagne ADV, ai Social, ai chatbot AI.',
    },
    {
      title: 'Alta formazione AI',
      tag: 'Workshop · Prompt design · Automazioni · Strumenti AI · Casi pratici',
      img: bundleResources.imgCode900,
      desc: "Formiamo aziende e professionisti all'uso strategico dell'AI, con percorsi pratici pensati per innovare e crescere.",
    },
  ];

  return (
    <section id="servizi" ref={rootRef} className="section" style={{ background: 'var(--paper-warm)' }}>
      <div className="container-wide">
        {/* Heading */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 'clamp(48px, 8vw, 120px)' }} className="svc-head">
          <Reveal delay={0}>
            <span className="eyebrow">03 — Servizi</span>
            <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
              Di cosa<br/>ci <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>occupiamo</em>.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', fontWeight: 500, margin: 0, maxWidth: 420, marginLeft: 'auto' }}>
              Cinque pratiche connesse, una sola filosofia: trasformare le imprese in{" "}
              <strong style={{ color: 'var(--drop-teal)', fontWeight: 700 }}>brand riconosciuti, affidabili e competitivi</strong>.
            </p>
          </Reveal>
        </div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <Reveal key={`${s.title}-${i}`} delay={i} className="svc-row" data-cursor="hover">
              <div className="num">[{String(i + 1).padStart(2, '0')}]</div>
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
                <img src={s.img} alt={s.title.replace(/\s*\n\s*/g, " ")} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0} style={{ marginTop: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <Btn variant="primary" href="#contatti" onClick={(e) => { e.preventDefault(); document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Iniziamo un progetto
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
