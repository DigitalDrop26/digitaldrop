import Lenis from "lenis";
import React, { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

declare global {
  interface Window {
    __lenis: Lenis | null;
  }
}

/** Call once from main.tsx before createRoot so children see window.__lenis. */
export function initLenis(): void {
  if (typeof window === "undefined") return;
  window.__lenis?.destroy();
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  window.__lenis = lenis;
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

export function useReveal(rootRef: React.RefObject<HTMLElement | null>, opts: Record<string, unknown> = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const selector =
      (opts.selector as string) || ".reveal, .reveal-fade, .line-reveal:not(.hero-line-reveal), .char-line";
    const els = root.querySelectorAll(selector);
    const stagger = (opts.stagger as number) ?? 70;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const i = Number(el.getAttribute("data-idx") || 0);
            setTimeout(() => el.classList.add("is-in"), i * stagger);
            io.unobserve(el);
          }
        });
      },
      {
        threshold: (opts.threshold as number) ?? 0.15,
        rootMargin: (opts.rootMargin as string) || "0px 0px -8% 0px",
      },
    );
    els.forEach((el, i) => {
      if (el.classList.contains("is-in")) return;
      if (!el.getAttribute("data-idx")) el.setAttribute("data-idx", String(i % 10));
      io.observe(el);
    });
    return () => io.disconnect();
    // refreshKey: riesegue l'observer quando il DOM `.reveal` cambia (es. filtri archivio progetti)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshKey è opzionale volutamente
  }, [rootRef, opts.selector, opts.stagger, opts.threshold, opts.rootMargin, opts.refreshKey]);
}

export function useInView(ref: React.RefObject<Element | null>, opts: { threshold?: number; rootMargin?: string } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: opts.threshold ?? 0.2, rootMargin: opts.rootMargin || "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, opts.threshold, opts.rootMargin]);
  return inView;
}

export function useElementScroll(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function update() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
    }
    update();
    const lenis = window.__lenis;
    if (lenis) {
      const unsub = lenis.on("scroll", update);
      return () => unsub();
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return progress;
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    function update() {
      const lenis = window.__lenis;
      setY(lenis ? lenis.scroll : window.scrollY || document.documentElement.scrollTop);
    }
    update();
    const lenis = window.__lenis;
    if (lenis) {
      const unsub = lenis.on("scroll", update);
      return () => unsub();
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return y;
}

type RevealProps = { as?: ElementType; children?: ReactNode; className?: string; delay?: number } & Record<string, unknown>;
export function Reveal({ as: Tag = "div", children, className = "", delay = 0, ...rest }: RevealProps) {
  return (
    <Tag className={`reveal ${className}`} data-idx={delay} {...rest}>
      {children}
    </Tag>
  );
}

type LineRevealProps = { as?: ElementType; children?: ReactNode; className?: string; delay?: number } & Record<string, unknown>;
export function LineReveal({ as: Tag = "span", children, className = "", delay = 0, ...rest }: LineRevealProps) {
  return (
    <Tag className={`line-reveal ${className}`} data-idx={delay} {...rest}>
      <span>{children}</span>
    </Tag>
  );
}

export function SplitWords({
  text,
  className = "",
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, wi) => (
        <span key={wi} className="line-reveal" data-idx={startDelay + wi} style={{ display: "inline-block" }}>
          <span>
            {w}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    }
    function onLeave() {
      const el = ref.current;
      if (!el) return;
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
      el.style.transition = "transform .55s var(--ease)";
      setTimeout(() => {
        const node = ref.current;
        if (node) node.style.transition = "";
      }, 600);
    }
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return (
    <span className={`magnetic ${className}`} ref={ref}>
      {children}
    </span>
  );
}

export function CountUp({
  to,
  from = 0,
  duration = 1800,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(from);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          function step(now: number) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(from + (to - from) * eased));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function Parallax({ children, speed = 0.15, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    function update() {
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      const yOff = (center - vh / 2) * -speed;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const n = ref.current;
        if (!n) return;
        n.style.transform = `translate3d(0, ${yOff.toFixed(2)}px, 0)`;
      });
    }
    update();
    const lenis = window.__lenis;
    if (lenis) {
      const unsub = lenis.on("scroll", update);
      window.addEventListener("resize", update);
      return () => {
        unsub();
        window.removeEventListener("resize", update);
        cancelAnimationFrame(raf);
      };
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

export function MarqueeRow({ children, reverse = false, className = "" }: { children: ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`marquee ${reverse ? "reverse" : ""} ${className}`}>
      <div className="marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}

export function CursorFollower() {
  useLayoutEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }
    let frame = 0;
    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    }
    loop();
    function onOver(e: MouseEvent) {
      const t = e.target as Node;
      if (t instanceof Element && t.closest("a, button, .magnetic, .svc-row, .sector-tile, [data-cursor=hover]")) {
        ring.classList.add("is-hover");
      } else {
        ring.classList.remove("is-hover");
      }
    }
    function onDown() {
      ring.classList.add("is-press");
    }
    function onUp() {
      ring.classList.remove("is-press");
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      dot.remove();
      ring.remove();
    };
  }, []);
  return null;
}

type BtnProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost" | "light";
  href?: string;
  children?: ReactNode;
  className?: string;
};
export function Btn({ variant = "primary", href = "#", children, onClick, className = "", ...rest }: BtnProps) {
  const cls = variant === "primary" ? "btn btn-primary" : variant === "ghost" ? "btn btn-ghost" : "btn btn-light";
  return (
    <a href={href} onClick={onClick} className={`${cls} ${className}`} {...rest}>
      <span className="btn-fill"></span>
      <span style={{ position: "relative" }}>{children}</span>
      <span className="arrow" style={{ position: "relative" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M1 7H13M13 7L8 2M13 7L8 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
    </a>
  );
}

type SectionHeadProps = {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  kickerNum?: ReactNode;
  theme?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};
export function SectionHead({ kicker, title, lead, kickerNum, theme = "light", align = "left", className = "" }: SectionHeadProps) {
  const textColor = theme === "dark" ? "white" : "var(--drop-teal)";
  return (
    <div className={`reveal ${className}`} style={{ textAlign: align, color: textColor }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: align === "center" ? "center" : "flex-start",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <span className={`eyebrow ${theme === "dark" ? "on-dark" : ""}`}>{kicker}</span>
        {kickerNum && (
          <span style={{ fontSize: 12, letterSpacing: "0.18em", color: theme === "dark" ? "rgba(255,255,255,0.4)" : "var(--teal-500)", fontWeight: 500 }}>
            {kickerNum}
          </span>
        )}
      </div>
      <h2 className="display display-lg" style={{ color: textColor, maxWidth: "12ch", marginTop: 0 }}>
        {title}
      </h2>
      {lead && (
        <p
          style={{
            marginTop: 28,
            maxWidth: "52ch",
            fontSize: 18,
            lineHeight: 1.55,
            color: theme === "dark" ? "rgba(255,255,255,0.78)" : "var(--ink)",
            fontWeight: 500,
          }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
