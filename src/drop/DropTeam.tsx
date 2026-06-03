import { useRef } from "react";
import { Reveal, useReveal } from "./hooksAndUi";

const FOUNDERS = [
  { name: "Claudio", initials: "C" },
  { name: "Iosef", initials: "I" },
  { name: "Alessandro", initials: "A" },
] as const;

/** Sezione team — tre founder (foto placeholder). */
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
                Tre persone.
                <br />
                Un solo <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>obiettivo</em>.
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
              Siamo{" "}
              <strong style={{ color: "var(--drop-orange)", fontWeight: 700 }}>
                Claudio, Iosef e Alessandro
              </strong>
              . Tre professionisti che hanno scelto di mettere insieme esperienze, competenze e visioni
              diverse per fare una cosa sola: aiutare le imprese dell&apos;agrifood a comunicare meglio e
              crescere di più.
            </p>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(20px, 2vw, 32px)",
          }}
          className="team-grid"
        >
          {FOUNDERS.map((founder, i) => (
            <Reveal key={founder.name} delay={i} className="team-founder-card">
              <div className="team-founder-photo" aria-hidden="true">
                <span>{founder.initials}</span>
              </div>
              <h3
                className="display"
                style={{
                  marginTop: 24,
                  marginBottom: 0,
                  fontSize: "clamp(24px, 2.2vw, 32px)",
                  color: "var(--drop-teal)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {founder.name}
              </h3>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .team-founder-card {
          background: var(--paper-tint);
          border-radius: 28px;
          padding: clamp(20px, 2.5vw, 28px);
          box-shadow: 0 24px 50px -28px rgba(0, 44, 66, 0.2);
          transition: transform .55s var(--ease), box-shadow .55s var(--ease);
        }
        .team-founder-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 32px 64px -24px rgba(0, 44, 66, 0.28);
        }
        .team-founder-photo {
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 4 / 5;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(145deg, var(--teal-100) 0%, rgba(0, 80, 119, 0.12) 100%);
          border: 1px dashed rgba(0, 80, 119, 0.22);
        }
        .team-founder-photo span {
          font-size: clamp(40px, 5vw, 56px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(0, 80, 119, 0.28);
        }
        @media (max-width: 900px) {
          .team-head { grid-template-columns: 1fr !important; }
          .team-head p { margin-left: 0 !important; max-width: none !important; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
