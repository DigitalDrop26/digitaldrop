import { useRef } from "react";
import { Reveal, useReveal } from "./hooksAndUi";

/** Sezione team — intro founder. */
export function DropTeam() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section id="team" ref={rootRef} className="section" style={{ background: "#ffffff" }}>
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "end",
            marginBottom: "clamp(48px, 6vw, 80px)",
          }}
          className="team-head"
        >
          <div style={{ maxWidth: 720 }}>
            <Reveal delay={0}>
              <span className="eyebrow">Il team</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display display-lg" style={{ marginTop: 28, marginBottom: 0 }}>
                Tre persone,
                <br />
                un <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>obiettivo</em> comune.
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
                maxWidth: 480,
                marginLeft: "auto",
              }}
            >
              Competenze, esperienze e punti di vista diversi convergono in una direzione condivisa.
              Intorno a{" "}
              <strong style={{ color: "var(--drop-orange)", fontWeight: 700 }}>DROP</strong> cresce un
              gruppo di professionisti che lavora insieme per aiutare le imprese dell&apos;agri-food a
              comunicare meglio e crescere in modo concreto.
            </p>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .team-head { grid-template-columns: 1fr !important; }
          .team-head p { margin-left: 0 !important; max-width: none !important; }
        }
      `}</style>
    </section>
  );
}
