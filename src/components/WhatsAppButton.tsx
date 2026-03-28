import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20MR%20Traders%20LED%20bulbs."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-bounce-in"
    aria-label="Chat on WhatsApp"
  >
    {/* Pulse ring */}
    <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-pulse-ring opacity-40" />
    <MessageCircle className="h-6 w-6 text-foreground relative z-10" />
  </a>
);

export default WhatsAppButton;
