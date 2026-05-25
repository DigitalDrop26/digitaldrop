import { useEffect, useRef, useState } from "react";
import { bundleResources } from "./bundleResources";
import { useReveal, useScrollY, Btn, CountUp } from "./hooksAndUi";

export function DropHero() {
  const rootRef = useRef(null);
  const [time, setTime] = useState(() => formatTime(new Date()));
  useReveal(rootRef);
  const y = useScrollY();

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  function formatTime(d: Date) {
    return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' });
  }

  // Parallax for image
  const imgY = Math.min(y * 0.25, 320);
  const titleTransform = `translate3d(0, ${Math.min(y * -0.08, 60)}px, 0)`;
  const fadeOnScroll = Math.max(0, 1 - y / 600);

  return (
    <section id="top" ref={rootRef} style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: 'clamp(140px, 18vh, 220px)',
      paddingBottom: 'clamp(60px, 8vh, 120px)',
      overflow: 'hidden',
      background: 'var(--paper-warm)',
    }}>
      {/* Background image — full-bleed photo with mask */}
      <div style={{
        position: 'absolute',
        right: 'clamp(-80px, -5vw, -40px)',
        top: 'clamp(80px, 15vh, 200px)',
        width: 'min(48vw, 720px)',
        height: 'min(70vh, 820px)',
        borderRadius: 24,
        overflow: 'hidden',
        zIndex: 1,
        transform: `translate3d(0, ${imgY}px, 0)`,
        willChange: 'transform',
      }}>
        <img
          src={bundleResources.imgWheat1600}
          alt="Wheat field"
          className="wipe-in"
          style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center 30%' }}
          onError={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, var(--teal-500), var(--teal-700))'; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,40,65,0.05) 0%, rgba(0,40,65,0.0) 50%, rgba(0,40,65,0.3) 100%)',
        }}/>
        {/* Goccia pattern overlay */}
        <div style={{
          position: 'absolute', right: -40, bottom: -40,
          width: 280, height: 280,
          opacity: 0.18,
        }} className="spin-slow">
          <img src={bundleResources.patternGoccia} alt="" style={{ width: '100%', height: '100%' }}/>
        </div>
      </div>

      {/* Eyebrow corner labels */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 5 }}>
        <div className="reveal-fade" data-idx="0" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 'clamp(40px, 8vh, 80px)',
          opacity: fadeOnScroll,
          transition: 'opacity .3s linear',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="pulse-dot"></span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--drop-teal)' }}>Edizione 2026 — Vol. 25</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--teal-500)', letterSpacing: '0.06em', textAlign: 'right' }}>
            Milano · {time}<br/>
            <span style={{ color: 'var(--teal-400)' }}>43.6839° N, 10.3914° E</span>
          </div>
        </div>

        {/* The hero type */}
        <div style={{ position: 'relative', zIndex: 5, transform: titleTransform, willChange: 'transform' }}>
          <h1 className="display display-xxl" style={{ margin: 0, color: 'var(--drop-teal)' }}>
            <div className="line-reveal" data-idx="1"><span>Parliamo</span></div>
            <div className="line-reveal" data-idx="2" style={{ marginLeft: 'clamp(40px, 8vw, 200px)' }}>
              <span>la lingua</span>
            </div>
            <div className="line-reveal" data-idx="3" style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 40px)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 40px)' }}>
                <em className="italic-serif" style={{ color: 'var(--drop-orange)' }}>del</em>
                {/* Inline thumbnail */}
                <span style={{
                  display: 'inline-block',
                  width: 'clamp(80px, 9vw, 160px)',
                  height: 'clamp(60px, 6vw, 110px)',
                  borderRadius: 999,
                  overflow: 'hidden',
                  verticalAlign: 'middle',
                  position: 'relative',
                  top: 'clamp(-8px, -0.5vw, -4px)',
                }}>
                  <img src={bundleResources.imgSheep600} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </span>
                <span>settore</span>
              </span>
            </div>
            <div className="line-reveal" data-idx="4"><span>primario.</span></div>
          </h1>
        </div>

        {/* Lead block + meta */}
        <div style={{
          marginTop: 'clamp(64px, 10vh, 120px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: 'clamp(32px, 6vw, 120px)',
          alignItems: 'end',
          position: 'relative',
          zIndex: 5,
        }} className="hero-bottom">
          <div className="reveal" data-idx="6" style={{ maxWidth: 560 }}>
            <p style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 1.55,
              color: 'var(--ink)',
              fontWeight: 500,
              margin: 0,
            }}>
              DROP è l'agenzia di comunicazione e marketing strategico per imprese
              agroalimentari, zootecniche e filiere. <span style={{ color: 'var(--drop-orange)', fontWeight: 700 }}>Concreto, gentile, su misura</span> —
              da oltre 25 anni dentro al settore.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Btn variant="primary" href="#contatti" onClick={(e) => { e.preventDefault(); document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Iniziamo un progetto
              </Btn>
              <Btn variant="ghost" href="#lavori" onClick={(e) => { e.preventDefault(); document.getElementById('lavori')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Vedi i lavori
              </Btn>
            </div>
          </div>

          <div className="reveal" data-idx="7" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            paddingTop: 32,
            borderTop: '1px solid rgba(0,80,119,0.18)',
          }}>
            <div>
              <div style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, color: 'var(--drop-teal)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <CountUp to={25} suffix="+" />
              </div>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 500, color: 'var(--teal-500)', letterSpacing: '0.04em' }}>
                anni nel<br/>settore primario
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, color: 'var(--drop-teal)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <CountUp to={180} suffix="" />
              </div>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 500, color: 'var(--teal-500)', letterSpacing: '0.04em' }}>
                progetti realizzati<br/>per brand del food
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          left: 'clamp(20px, 4vw, 56px)',
          bottom: -40,
          display: 'flex', alignItems: 'center', gap: 12,
          color: 'var(--teal-500)',
          fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
          opacity: fadeOnScroll,
          transition: 'opacity .3s linear',
        }}>
          <div style={{
            width: 1, height: 56,
            background: 'linear-gradient(180deg, var(--drop-orange) 0%, transparent 100%)',
            animation: 'scrollLine 1.8s ease-in-out infinite',
          }}/>
          <span>Scroll</span>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0.2); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.01% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0.2); transform-origin: bottom; }
        }
        @media (max-width: 900px) {
          .hero-bottom { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
