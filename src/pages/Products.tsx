import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { products, type StockStatus } from "@/data/products";
import { useTilt } from "@/hooks/useTilt";
import { useScrollFade } from "@/hooks/useScrollFade";
import { LedButton } from "@/components/ui/led-button";
import StockBadge from "@/components/StockBadge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircuitBackground from "@/components/CircuitBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Product } from "@/data/products";

type CategoryFilter = "All" | "Low Voltage" | "Standard Voltage" | "High Voltage";
type StatusFilter = "All" | StockStatus;

const categories: CategoryFilter[] = ["All", "Low Voltage", "Standard Voltage", "High Voltage"];
const statuses: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "All" },
  { label: "In Stock", value: "in-stock" },
  { label: "Out of Stock", value: "out-of-stock" },
  { label: "Coming Soon", value: "coming-soon" },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const tilt = useTilt({ maxTilt: 6, scale: 1.03 });
  const whatsappMsg = encodeURIComponent(
    `Hi, I'd like to inquire about the ${product.name} (${product.wattage}, ${product.voltage}).`
  );

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={tilt.onMouseEnter}
      data-stagger
      className="group rounded-lg border border-border glass glass-hover tilt-glare light-sweep overflow-hidden transition-all duration-500 ease-in-out hover:border-accent/40 hover:glow-sm opacity-0 will-change-transform"
      style={{ animationDelay: `${index * 100}ms`, transformStyle: "preserve-3d" }}
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
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold text-foreground hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-accent/10 text-accent px-3 py-0.5 font-medium">
            {product.voltage}
          </span>
          <span className="text-muted-foreground">{product.wattage}</span>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="flex gap-2 mt-2">
          <LedButton
            className="flex-1"
            as="a"
            href={`https://wa.me/923XXXXXXXXX?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Inquire on WhatsApp
          </LedButton>
          <LedButton variant="outline" as="a" href={`/products/${product.slug}`}>
            Details
          </LedButton>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const ref = useScrollFade({ staggerChildren: true, staggerDelay: 100 });

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (status === "All" || p.stockStatus === status)
      ),
    [category, status]
  );

  return (
    <>
      <CircuitBackground />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              All Products
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Browse our complete range of LED bulbs for low, standard, and high voltage applications.
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Mobile filter toggle */}
            <button
              className="md:hidden inline-flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-lg px-4 py-2"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-4 w-4" /> Filters
            </button>

            <div className={`${filtersOpen ? "block" : "hidden"} md:flex flex-wrap gap-6`}>
              {/* Category */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 border ${
                        category === c
                          ? "bg-accent text-accent-foreground border-accent glow-sm"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Stock Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setStatus(s.value)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 border ${
                        status === s.value
                          ? "bg-accent text-accent-foreground border-accent glow-sm"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div ref={ref}>
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-20">
                No products match the selected filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Products;
