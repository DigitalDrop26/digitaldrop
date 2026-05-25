import { Fragment, useEffect, useState } from "react";
import { bundleResources } from "./bundleResources";
import { useScrollY } from "./hooksAndUi";

export function DropHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const y = useScrollY();

  useEffect(() => { setScrolled(y > 40); }, [y]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { id: 'manifesto', label: 'Chi siamo', num: '01' },
    { id: 'servizi', label: 'Servizi', num: '02' },
    { id: 'settori', label: 'Settori', num: '03' },
    { id: 'lavori', label: 'Lavori', num: '04' },
    { id: 'contatti', label: 'Contatti', num: '05' },
  ];

  function go(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <Fragment>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '14px 0' : '24px 0',
        background: scrolled ? 'rgba(250, 247, 242, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 80, 119, 0.08)' : '1px solid transparent',
        transition: 'padding .45s var(--ease), background .45s var(--ease), border-color .45s var(--ease)',
      }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          {/* Logo */}
          <a href="#top" onClick={(e) => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }); }}
             style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={bundleResources.logoColor} alt="Drop" style={{ height: 36, width: 'auto', display: 'block' }} />
            <span style={{ display: 'inline-block', height: 22, width: 1, background: 'rgba(0,80,119,0.2)' }}></span>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--teal-500)', letterSpacing: '0.06em', lineHeight: 1.2, maxWidth: 200 }}>
              Marketing &amp; Comunicazione<br/>per il settore primario
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hide-mobile">
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '12px 18px', borderRadius: 999,
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                color: 'var(--drop-teal)', letterSpacing: '-0.005em',
                display: 'inline-flex', alignItems: 'baseline', gap: 8,
                transition: 'background .35s var(--ease), color .35s var(--ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,80,119,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ fontSize: 10, color: 'var(--drop-orange)', fontWeight: 500 }}>{l.num}</span>
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--teal-500)', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em' }}>
              <span className="pulse-dot"></span>
              Disponibili per nuovi progetti
            </div>
            <button onClick={() => setOpen(true)} aria-label="Menu" style={{
              background: 'var(--drop-teal)', color: 'white', border: 'none', cursor: 'pointer',
              width: 52, height: 52, borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .35s var(--ease)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--drop-orange)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--drop-teal)'}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1H18M0 7H18M0 13H12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        pointerEvents: open ? 'auto' : 'none',
      }}>
        <div onClick={() => setOpen(false)} style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,19,40,0.5)',
          opacity: open ? 1 : 0,
          transition: 'opacity .45s var(--ease)',
        }}/>
        <aside style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: 'min(560px, 92vw)',
          background: 'var(--drop-teal)',
          color: 'white',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .7s var(--ease)',
          display: 'flex', flexDirection: 'column',
          padding: '32px clamp(28px, 4vw, 56px)',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={bundleResources.logoFullWhite} alt="Drop" style={{ height: 28 }} />
            <button onClick={() => setOpen(false)} aria-label="Close" style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white',
              cursor: 'pointer', width: 48, height: 48, borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .35s var(--ease), border-color .35s var(--ease)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--drop-orange)'; e.currentTarget.style.borderColor = 'var(--drop-orange)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5"/></svg>
            </button>
          </div>

          <nav style={{ marginTop: 80, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map((l, i) => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: 'transparent', border: 'none', color: 'white', cursor: 'pointer',
                textAlign: 'left', padding: '12px 0',
                display: 'flex', alignItems: 'baseline', gap: 20,
                fontFamily: 'inherit', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700,
                letterSpacing: '-0.03em', lineHeight: 1.05,
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity .6s var(--ease) ${0.2 + i * 0.06}s, transform .6s var(--ease) ${0.2 + i * 0.06}s, color .3s var(--ease)`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--drop-orange)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.08em' }}>{l.num}</span>
                {l.label}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Sede</div>
              <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>Via dei Filari 12<br/>20100 Milano, Italia</div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Contatti</div>
              <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>ciao@drop.it<br/>+39 02 1234 5678</div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </Fragment>
  );
}
