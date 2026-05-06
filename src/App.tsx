import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FullscreenNav } from "./components/FullscreenNav";
import { Hero } from "./components/Hero";
import { VisionSection } from "./components/VisionSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { QuoteSection } from "./components/QuoteSection";
import { PartnersSection } from "./components/PartnersSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { RevealOnScroll } from "./components/RevealOnScroll";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <Header
        scrolled={scrolled}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
      />
      <FullscreenNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <RevealOnScroll rootMargin="120px 0px -12% 0px">
          <Hero />
        </RevealOnScroll>
        <RevealOnScroll>
          <VisionSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ProjectsSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <QuoteSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <PartnersSection />
        </RevealOnScroll>
        <RevealOnScroll mode="up">
          <CTASection />
        </RevealOnScroll>
      </main>
      <RevealOnScroll rootMargin="0px 0px -5% 0px">
        <Footer />
      </RevealOnScroll>
    </>
  );
}
