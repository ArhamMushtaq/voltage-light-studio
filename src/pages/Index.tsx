import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CircuitBackground from "@/components/CircuitBackground";
import ElectricLoader from "@/components/ElectricLoader";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <ElectricLoader onComplete={handleComplete} />}
      <CircuitBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <FeaturesSection />
      <WhyChooseSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
