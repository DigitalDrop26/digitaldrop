import { useRef, useEffect } from "react";
import styles from "./CTASection.module.css";

const PARALLAX_SPEED = 0.22;
const CTA_BG_SRC = "/cta-sea.jpg";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const offset = rect.top * PARALLAX_SPEED;
      img.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      img.style.transform = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="cta-heading"
    >
      <div className={styles.bgClip} aria-hidden>
        <img
          ref={imgRef}
          className={styles.parallaxImg}
          src={CTA_BG_SRC}
          alt=""
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="container">
        <div className={styles.inner}>
          <h2 id="cta-heading" className={`text-display ${styles.heading}`}>
            Puoi reinventare il tuo business oggi, perché aspettare domani?
          </h2>
          <a href="mailto:info@digitaldrop.eu" className={`btn btn--accent ${styles.cta}`}>
            Contattaci
          </a>
        </div>
      </div>
    </section>
  );
}
