import { useRef, type ReactNode } from "react";
import sfondoHeroSrc from "@Immagini/Sfondo_hero.jpg?url";
import { useReveal, useScrollY } from "./hooksAndUi";

type DropPageHeroProps = {
  title: ReactNode;
  subtitle: ReactNode;
};

/** Hero fold — stesso layout della home, contenuti configurabili. */
export function DropPageHero({ title, subtitle }: DropPageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);
  const y = useScrollY();

  const titleTransform = `translate3d(0, ${Math.min(y * -0.08, 60)}px, 0)`;
  const fadeOnScroll = Math.max(0, 1 - y / 600);

  return (
    <section
      ref={rootRef}
      className="hero-fold"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        paddingTop: "clamp(100px, 12vh, 180px)",
        paddingBottom: "clamp(28px, 5vh, 64px)",
        overflowX: "hidden",
        overflowY: "visible",
        backgroundColor: "var(--paper-warm)",
        backgroundImage: `url(${sfondoHeroSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(105deg, rgba(250,247,242,0.88) 0%, rgba(250,247,242,0.72) min(42vw, 52%), rgba(250,247,242,0.42) 68%, rgba(250,247,242,0.12) 100%)",
        }}
      />

      <div
        className="container-wide"
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          justifyContent: "space-between",
          gap: "clamp(16px, 3vh, 32px)",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 5,
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
            transform: titleTransform,
            willChange: "transform",
          }}
        >
          <div className="hero-head">
            <h1 className="display display-xxl hero-title-fold" style={{ margin: 0, color: "var(--drop-teal)" }}>
              {title}
            </h1>
          </div>
        </div>

        <div
          style={{
            marginTop: 0,
            flexShrink: 0,
            position: "relative",
            zIndex: 5,
          }}
          className="hero-bottom"
        >
          <div className="reveal" data-idx="2" style={{ maxWidth: 620 }}>
            {subtitle}
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: "clamp(20px, 3.5vh, 44px)",
            color: "var(--teal-500)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: fadeOnScroll,
            transition: "opacity 0.3s linear",
          }}
        >
          <div
            style={{
              width: 1,
              height: 56,
              background: "linear-gradient(180deg, var(--drop-orange) 0%, transparent 100%)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
          <span>Scroll</span>
        </div>
      </div>

      <style>{`
        .hero-fold {
          min-height: 100vh;
          min-height: 100dvh;
        }
        .hero-head {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .hero-head h1 { flex: 1 1 auto; min-width: 0; max-width: 14ch; }
      `}</style>
    </section>
  );
}
