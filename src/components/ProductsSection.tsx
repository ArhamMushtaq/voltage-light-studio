import { Link } from "react-router-dom";
import { useScrollFade } from "@/hooks/useScrollFade";
import { useTilt } from "@/hooks/useTilt";
import { LedButton } from "@/components/ui/led-button";
import StockBadge from "@/components/StockBadge";
import { products } from "@/data/products";

const featured = products.slice(0, 3);

const ProductCard = ({ product, index }: { product: (typeof products)[0]; index: number }) => {
  const tilt = useTilt({ maxTilt: 6, scale: 1.03 });
  const whatsappMsg = encodeURIComponent(
    `Hello, I am interested in the product: ${product.name}, Voltage: ${product.voltage}, Wattage: ${product.wattage}. Please share details.`
  );

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
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-accent font-medium">
            {product.category}
          </span>
          <StockBadge status={product.stockStatus} />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-accent/10 text-accent px-3 py-0.5 font-medium">
            {product.voltage}
          </span>
          <span className="text-muted-foreground">{product.wattage}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <LedButton
          className="w-full mt-2"
          as="a"
          href={`https://wa.me/923XXXXXXXXX?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Inquire Now
        </LedButton>
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
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <div className="text-center" data-stagger>
          <LedButton size="lg" as="a" href="/products">
            View More Products
          </LedButton>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
