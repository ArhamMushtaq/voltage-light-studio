import { useScrollFade } from "@/hooks/useScrollFade";

const AboutSection = () => {
  const ref = useScrollFade();

  return (
    <section id="about" className="py-24 border-t border-border relative z-10">
      <div ref={ref} className="container mx-auto px-4 max-w-3xl text-center space-y-6">
        <p className="text-xs uppercase tracking-widest text-accent font-display">About Us</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Specialized in LED Lighting Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          MR Traders is a specialized LED bulb manufacturing company focused on delivering reliable and energy‑efficient lighting solutions. Our products are designed to perform across different voltage ranges, ensuring durability and consistent performance.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
