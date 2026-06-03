import { useRef } from "react";
import { Reveal, useReveal } from "./hooksAndUi";

const TESTIMONIALS = [
  {
    quote:
      "Drop ha capito la nostra filiera prima ancora di presentare una proposta. Finalmente un'agenzia che parla la nostra lingua — e sa tradurla in risultati concreti.",
    name: "Marco Bellini",
    role: "Direttore marketing",
    company: "Caseificio artigianale, Piemonte",
  },
  {
    quote:
      "Ci hanno accompagnato nel rebranding con metodo e ascolto. Oggi il nostro marchio è riconoscibile, coerente e soprattutto credibile davanti ai clienti.",
    name: "Laura Ferretti",
    role: "Responsabile comunicazione",
    company: "Cooperativa agricola, Emilia-Romagna",
  },
  {
    quote:
      "Professionalità, disponibilità e visione di lungo periodo. Con Drop abbiamo costruito una comunicazione che valorizza il prodotto senza mai tradire la nostra identità.",
    name: "Andrea Sanna",
    role: "Amministratore delegato",
    company: "Azienda zootecnica, Sardegna",
  },
] as const;

/** Recensioni clienti — sezione Chi siamo, dopo il manifesto. */
export function DropTestimonials() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section id="recensioni" ref={rootRef} className="section" style={{ background: "#ffffff" }}>
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "end",
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
          className="testimonials-head"
        >
          <div style={{ maxWidth: 720 }}>
            <Reveal delay={0}>
              <span className="eyebrow">Recensioni</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                Clienti felici
                <br />
                di <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>Drop</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--ink)",
                fontWeight: 500,
                margin: 0,
                maxWidth: 420,
                marginLeft: "auto",
              }}
            >
              Chi lavora con noi racconta cosa significa avere un partner che conosce il settore — e sa
              trasformarlo in valore.
            </p>
          </Reveal>
        </div>

        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(20px, 2vw, 32px)",
            alignItems: "stretch",
          }}
        >
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i} className="testimonial-card">
              <span className="testimonial-quote-mark" aria-hidden>
                &ldquo;
              </span>
              <blockquote style={{ margin: 0, padding: 0, border: "none" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(16px, 1.2vw, 18px)",
                    lineHeight: 1.65,
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {item.quote}
                </p>
              </blockquote>
              <footer style={{ marginTop: "clamp(28px, 3vw, 36px)", paddingTop: 24, borderTop: "1px solid rgba(0,80,119,0.12)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--drop-teal)", letterSpacing: "-0.01em" }}>
                  {item.name}
                </div>
                <div style={{ marginTop: 6, fontSize: 13, fontWeight: 500, color: "var(--teal-500)", lineHeight: 1.5 }}>
                  {item.role}
                  <br />
                  {item.company}
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--paper-tint);
          border-radius: 28px;
          padding: clamp(28px, 3vw, 40px);
          box-shadow: 0 24px 50px -28px rgba(0, 44, 66, 0.18);
          transition: transform .55s var(--ease), box-shadow .55s var(--ease);
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 32px 64px -24px rgba(0, 44, 66, 0.24);
        }
        .testimonial-quote-mark {
          display: block;
          margin-bottom: 12px;
          font-size: clamp(40px, 4vw, 56px);
          line-height: 1;
          font-weight: 700;
          color: var(--drop-orange);
          font-family: Georgia, "Times New Roman", serif;
        }
        @media (max-width: 1000px) {
          .testimonials-head { grid-template-columns: 1fr !important; }
          .testimonials-head p { margin-left: 0 !important; max-width: none !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
