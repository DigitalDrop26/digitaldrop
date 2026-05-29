import { useRef } from "react";
import { useReveal, CountUp, Reveal } from "./hooksAndUi";

/* Numbers — big stats with count-up */
export function DropNumbers() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const stats = [
    { to: 25, suffix: "+", label: "Anni di lavoro nel settore primario italiano", sub: "dal 1998" },
    { to: 180, suffix: "", label: "Brand agroalimentari accompagnati alla crescita", sub: "in 8 regioni" },
    { to: 94, suffix: "%", label: "Clienti che ci scelgono di nuovo dopo il primo progetto", sub: "retention 2024" },
    { to: 12, suffix: "", label: "Persone, tra strateghi, designer, content e dev", sub: "sede Milano + Parma" },
  ];

  return (
    <section
      ref={rootRef}
      className="section"
      style={{
        background: "var(--paper-tint)",
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
      }}
    >
      <div className="container-wide">
        <Reveal delay={0} style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <span className="eyebrow">04 — Numeri</span>
          <h2 className="display display-md" style={{ marginTop: 24, marginBottom: 0, maxWidth: "18ch" }}>
            Risultati condivisi,
            <br />
            <em className="italic-serif" style={{ color: "var(--drop-orange)" }}>
              concreti
            </em>
            , misurabili.
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(20px, 2.5vw, 40px)",
          }}
          className="num-grid"
        >
          {stats.map((s, i) => (
            <Reveal
              key={i}
              delay={i}
              style={{
                padding: "32px 0 0 0",
                borderTop: "1px solid rgba(0,80,119,0.2)",
              }}
            >
              <div className="big-number" style={{ fontSize: "clamp(56px, 7vw, 120px)" }}>
                <CountUp to={s.to} suffix={s.suffix} duration={2000} />
              </div>
              <div style={{ marginTop: 20, fontSize: 14, lineHeight: 1.55, color: "var(--ink)", fontWeight: 500, maxWidth: "20ch" }}>
                {s.label}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--teal-500)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s.sub}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .num-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media (max-width: 600px) { .num-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
