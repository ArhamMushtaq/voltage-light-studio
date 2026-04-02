import { useEffect, useState } from "react";
import { LedButton } from "@/components/ui/led-button";
import heroBulb from "@/assets/hero-bulb.jpg";

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background with depth layers */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offsetY * 0.35}px)` }}>
        <img src={heroBulb} alt="LED bulb glowing" width={1920} height={1080} className="w-full h-full object-cover opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Foreground parallax layer (slower) */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${offsetY * 0.1}px)` }}>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs text-muted-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-accent led-glow" />
            LED Bulb Manufacturer
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            MR Traders – High‑Quality{" "}
            <span className="text-accent">LED Bulb</span> Manufacturer
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            We produce durable, energy‑efficient LED bulbs in multiple voltage ranges for residential and commercial use.
          </p>
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
            <LedButton size="lg" onClick={() => scrollTo("#products")}>
              View Products
            </LedButton>
            <LedButton size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
              Contact Us
            </LedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
