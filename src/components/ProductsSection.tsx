import { useScrollFade } from "@/hooks/useScrollFade";
import { useTilt } from "@/hooks/useTilt";
import { Button } from "@/components/ui/button";

import bulb1 from "@/assets/led-bulb-1.jpg";
import bulb2 from "@/assets/led-bulb-2.jpg";
import bulb3 from "@/assets/led-bulb-3.jpg";
import bulb4 from "@/assets/led-bulb-4.jpg";
import bulb5 from "@/assets/led-bulb-5.jpg";
import bulb6 from "@/assets/led-bulb-6.jpg";

interface Product {
  image: string;
  name: string;
  voltage: string;
  wattage: string;
  category: string;
  description: string;
}

const products: Product[] = [
  { image: bulb3, name: "MR‑5W Low Voltage", voltage: "12V – 48V DC", wattage: "5W", category: "Low Voltage", description: "Compact LED ideal for solar & battery systems." },
  { image: bulb6, name: "MR‑7W Low Voltage", voltage: "12V – 48V DC", wattage: "7W", category: "Low Voltage", description: "Efficient low-voltage bulb for off-grid use." },
  { image: bulb1, name: "MR‑9W Standard", voltage: "110V – 220V AC", wattage: "9W", category: "Standard Voltage", description: "Versatile bulb for homes and offices." },
  { image: bulb5, name: "MR‑12W Standard", voltage: "110V – 220V AC", wattage: "12W", category: "Standard Voltage", description: "Bright output with energy savings." },
  { image: bulb2, name: "MR‑15W High Voltage", voltage: "220V – 480V AC", wattage: "15W", category: "High Voltage", description: "Heavy-duty bulb for industrial use." },
  { image: bulb4, name: "MR‑18W High Voltage", voltage: "220V – 480V AC", wattage: "18W", category: "High Voltage", description: "Maximum brightness for large spaces." },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const tilt = useTilt({ maxTilt: 6, scale: 1.03 });
  const whatsappMsg = encodeURIComponent(`Hi, I'd like to inquire about the ${product.name} (${product.wattage}, ${product.voltage}).`);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={tilt.onMouseEnter}
      data-stagger
      className="group rounded-lg border border-border glass glass-hover tilt-glare light-sweep overflow-hidden transition-all duration-500 ease-in-out hover:border-accent/40 hover:glow-sm opacity-0 will-change-transform"
      style={{ animationDelay: `${index * 120}ms`, transformStyle: "preserve-3d" }}
    >
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="p-5 space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-accent font-medium">{product.category}</span>
        <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-accent/10 text-accent px-3 py-0.5 font-medium">{product.voltage}</span>
          <span className="text-muted-foreground">{product.wattage}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2 btn-press light-sweep transition-all duration-300 hover:glow-sm"
          asChild
        >
          <a href={`https://wa.me/919876543210?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
            Inquire Now
          </a>
        </Button>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const ref = useScrollFade({ staggerChildren: true, staggerDelay: 120 });

  return (
    <section id="products" className="py-24 border-t border-border relative z-10">
      <div ref={ref} className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-accent font-display">Our Products</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            LED Bulbs for Every Voltage
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our range of LED bulbs designed for low, standard, and high voltage applications.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
