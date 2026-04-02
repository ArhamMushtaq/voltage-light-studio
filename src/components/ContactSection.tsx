import { useState } from "react";
import { LedButton } from "@/components/ui/led-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const ContactSection = () => {
  const ref = useScrollFade();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 border-t border-border relative z-10">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <p className="text-xs uppercase tracking-widest text-accent font-display">Get in Touch</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Contact Us</h2>
          <p className="text-muted-foreground">Contact us via WhatsApp or Email</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <p className="text-muted-foreground">
              Have questions about our LED products? Reach out and we'll respond promptly.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: "info@mrtraders.com", href: "mailto:info@mrtraders.com" },
                { icon: Phone, text: "+92 3XX XXXXXXX", href: "tel:+923XXXXXXXXX" },
                { icon: MessageCircle, text: "Chat on WhatsApp", href: "https://wa.me/923XXXXXXXXX?text=Hello%2C%20I%20am%20interested%20in%20your%20LED%20bulbs.%20Please%20share%20details." },
                { icon: MapPin, text: "Industrial Area, Pakistan", href: undefined },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-muted-foreground group transition-all duration-300 hover:translate-x-1">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                    <item.icon className="h-4 w-4 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(45,100%,60%)]" />
                  </div>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="hover:text-foreground transition-colors duration-300">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 glass rounded-lg p-6">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground input-glow transition-all duration-300"
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground input-glow transition-all duration-300"
            />
            <Textarea
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={5}
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none input-glow transition-all duration-300"
            />
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 led-glow btn-press light-sweep transition-all duration-300">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
