import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Zap, Sun, Gauge } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { LedButton } from "@/components/ui/led-button";
import StockBadge from "@/components/StockBadge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircuitBackground from "@/components/CircuitBackground";
import WhatsAppButton from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <Navigate to="/products" replace />;

  const whatsappMsg = encodeURIComponent(
    `Hello, I am interested in the product: ${product.name}, Voltage: ${product.voltage}, Wattage: ${product.wattage}. Please share details.`
  );

  return (
    <>
      <CircuitBackground />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden border border-border glass">
                <img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={`${product.name} - Image ${activeImage + 1}`}
                  className="w-full h-full object-cover animate-fade-in"
                  width={800}
                  height={800}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300",
                      i === activeImage
                        ? "border-accent glow-sm scale-105"
                        : "border-border hover:border-accent/40 hover:scale-105"
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.35s" }}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-accent font-medium">
                    {product.category}
                  </span>
                  <StockBadge status={product.stockStatus} />
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-border glass p-4 text-center space-y-1">
                  <Zap className="h-5 w-5 text-accent mx-auto" />
                  <p className="text-xs text-muted-foreground">Voltage</p>
                  <p className="font-display font-semibold text-sm text-foreground">{product.voltage}</p>
                </div>
                <div className="rounded-lg border border-border glass p-4 text-center space-y-1">
                  <Gauge className="h-5 w-5 text-accent mx-auto" />
                  <p className="text-xs text-muted-foreground">Wattage</p>
                  <p className="font-display font-semibold text-sm text-foreground">{product.wattage}</p>
                </div>
                <div className="rounded-lg border border-border glass p-4 text-center space-y-1">
                  <Sun className="h-5 w-5 text-accent mx-auto" />
                  <p className="text-xs text-muted-foreground">Lumens</p>
                  <p className="font-display font-semibold text-sm text-foreground">{product.lumen}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-foreground">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <LedButton
                  size="lg"
                  className="flex-1"
                  as="a"
                  href={`https://wa.me/923XXXXXXXXX?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inquire on WhatsApp
                </LedButton>
                <LedButton size="lg" variant="outline" as="a" href="/products">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Products
                </LedButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default ProductDetail;
