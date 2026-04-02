import { Factory, Layers, CheckCircle2, BadgeDollarSign, Handshake } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const reasons = [
  { icon: Factory, title: "Specialized Manufacturer", desc: "Focused exclusively on LED bulb production." },
  { icon: Layers, title: "Multiple Voltage Options", desc: "Products for low, standard, and high voltage needs." },
  { icon: CheckCircle2, title: "Quality Control", desc: "Every bulb tested before dispatch." },
  { icon: BadgeDollarSign, title: "Competitive Pricing", desc: "Factory-direct pricing without middlemen." },
  { icon: Handshake, title: "Trusted Supplier", desc: "Reliable partnerships with distributors nationwide." },
];

const WhyChooseSection = () => {
  const ref = useScrollFade({ staggerChildren: true, staggerDelay: 100 });

  return (
    <section id="why-us" className="py-24 border-t border-border relative z-10">
      <div ref={ref} className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-accent font-display">Why Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Why Choose MR Traders
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              data-stagger
              className="group flex items-start gap-4 p-5 rounded-lg border border-border glass glass-hover light-sweep transition-all duration-500 ease-in-out hover:border-accent/40 hover:glow-sm hover:-translate-y-1 opacity-0"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/20">
                <r.icon className="h-5 w-5 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(45,100%,60%)]" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
