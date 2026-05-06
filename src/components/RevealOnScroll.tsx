import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./RevealOnScroll.module.css";

export type RevealMode = "up" | "down" | "left" | "right" | "scale" | "soft" | "rotate";

const REVEAL_MODES: RevealMode[] = [
  "up",
  "down",
  "left",
  "right",
  "scale",
  "soft",
  "rotate",
];

const DIR_CLASS: Record<RevealMode, string> = {
  up: styles.dirUp,
  down: styles.dirDown,
  left: styles.dirLeft,
  right: styles.dirRight,
  scale: styles.dirScale,
  soft: styles.dirSoft,
  rotate: styles.dirRotate,
};

function pickRandomMode(): RevealMode {
  return REVEAL_MODES[Math.floor(Math.random() * REVEAL_MODES.length)]!;
}

type RevealOnScrollProps = {
  children: ReactNode;
  delayMs?: number;
  mode?: RevealMode;
  randomTiming?: boolean;
  rootMargin?: string;
  className?: string;
};

export function RevealOnScroll({
  children,
  delayMs = 0,
  mode: modeProp,
  randomTiming,
  rootMargin = "0px 0px -6% 0px",
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const choiceRef = useRef<{ mode: RevealMode; extraDelay: number } | null>(null);
  if (choiceRef.current === null) {
    const mode = modeProp ?? pickRandomMode();
    const useRandomTiming = randomTiming ?? modeProp === undefined;
    const extraDelay = useRandomTiming ? Math.floor(Math.random() * 35) : 0;
    choiceRef.current = { mode, extraDelay };
  }

  const { mode, extraDelay } = choiceRef.current;
  const totalDelay = delayMs + extraDelay;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            ob.unobserve(e.target);
          }
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );

    ob.observe(el);
    return () => ob.disconnect();
  }, [rootMargin]);

  const dirClass = DIR_CLASS[mode];

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${dirClass} ${visible ? styles.visible : ""} ${className ?? ""}`}
      style={
        visible && totalDelay > 0
          ? ({ transitionDelay: `${totalDelay}ms` } satisfies CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
