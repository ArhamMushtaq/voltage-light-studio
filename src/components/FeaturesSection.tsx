import { Zap, Clock, Activity, Sun, Shield } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const features = [
  { icon: Zap, title: "Energy Efficient", desc: "Lower power consumption with maximum light output." },
  { icon: Clock, title: "Long Lifespan", desc: "Built to last 25,000+ hours of operation." },
  { icon: Activity, title: "Voltage Stable", desc: "Consistent performance across voltage fluctuations." },
  { icon: Sun, title: "High Brightness", desc: "Superior lumen output for clear illumination." },
  { icon: Shield, title: "Durable Build", desc: "Industrial-grade materials for lasting quality." },
];

const FeaturesSection = () => {
  const ref = useScrollFade({ staggerChildren: true, staggerDelay: 100 });

  return (
    <section id="features" className="py-24 border-t border-border">
      <div ref={ref} className="container mx-auto px-4 space-y-12 opacity-0">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-accent font-display">Specifications</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Product Features
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-stagger
              className="rounded-lg border border-border bg-card p-6 text-center space-y-3 transition-all duration-500 ease-in-out hover:border-accent/40 hover:glow-sm hover:-translate-y-2 opacity-0"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
