import { Button } from "@/components/ui/button";
import heroBulb from "@/assets/hero-bulb.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBulb} alt="LED bulb glowing" width={1920} height={1080} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
            LED Bulb Manufacturer
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            MR Traders – High‑Quality{" "}
            <span className="text-accent">LED Bulb</span> Manufacturer
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            We produce durable, energy‑efficient LED bulbs in multiple voltage ranges for residential and commercial use.
          </p>
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 glow-sm" onClick={() => scrollTo("#products")}>
              View Products
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary" onClick={() => scrollTo("#contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
