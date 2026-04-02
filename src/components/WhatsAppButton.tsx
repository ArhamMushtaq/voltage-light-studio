import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/923XXXXXXXXX?text=Hello%2C%20I%20am%20interested%20in%20your%20LED%20bulbs.%20Please%20share%20details."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_25px_hsl(142,70%,45%,0.5)] transition-all duration-300 animate-bounce-in"
    aria-label="Chat on WhatsApp"
  >
    <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-pulse-ring opacity-40" />
    <MessageCircle className="h-6 w-6 text-foreground relative z-10" />
  </a>
);

export default WhatsAppButton;
