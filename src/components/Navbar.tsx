import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { LedButton } from "@/components/ui/led-button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "glass border-b border-border shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#home" className="flex items-center gap-2 group" onClick={() => handleClick("#home")}>
          <Zap className="h-6 w-6 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(45,100%,60%)] group-hover:scale-110" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            MR Traders
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="nav-underline text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 pb-1"
            >
              {link.label}
            </button>
          ))}
          <LedButton size="sm" onClick={() => handleClick("#contact")}>
            Get a Quote
          </LedButton>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground transition-transform duration-200 active:scale-90" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-b border-border animate-fade-in">
          <div className="container mx-auto flex flex-col gap-4 py-6 px-4">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </button>
            ))}
            <LedButton
              className="w-full opacity-0 animate-fade-up"
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
              onClick={() => handleClick("#contact")}
            >
              Get a Quote
            </LedButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
