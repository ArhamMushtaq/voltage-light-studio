import { useScrollFade } from "@/hooks/useScrollFade";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const ref = useScrollFade();

  return (
    <footer className="border-t border-border bg-card py-12">
      <div ref={ref} className="container mx-auto px-4 opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="MR Traders Logo" className="h-10 w-auto rounded" />
            </div>
            <p className="text-sm text-muted-foreground">Reliable LED Solutions for Every Voltage</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {["Home", "About", "Products", "Features", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-underline w-fit hover:text-foreground transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-foreground text-sm">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>info@mrtraders.com</span>
              <span>+91 98765 43210</span>
              <span>Industrial Area, New Delhi, India</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MR Traders. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
