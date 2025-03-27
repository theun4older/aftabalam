import { useEffect, useState, useRef } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ClientsSection from "./components/ClientsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import DisclaimerPopup from "./components/DisclaimerPopup";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    hero: null,
    about: null,
    services: null,
    team: null,
    testimonials: null,
    clients: null,
    contact: null,
  });

  // Handle initial loading to fix margin issues 
  useEffect(() => {
    // Short timeout to ensure the DOM is fully rendered
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (!element) return;
        
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const registerSection = (id: string, ref: HTMLDivElement | null) => {
    if (ref) {
      sectionsRef.current[id] = ref;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-[#0A2463] z-[100] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div 
                  className="w-16 h-16 rounded-full border-4 border-[#E6AF2E] border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.div 
                className="text-xl font-serif text-white/90 flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-[#E6AF2E] mr-2">James Wilson</span> 
                <span>Law Firm</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen font-sans antialiased bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DisclaimerPopup />
        <Header activeSection={activeSection} />
        
        <HeroSection registerSection={registerSection} />
        <AboutSection registerSection={registerSection} />
        <ServicesSection registerSection={registerSection} />
        <TeamSection registerSection={registerSection} />
        <TestimonialsSection registerSection={registerSection} />
        <ClientsSection registerSection={registerSection} />
        <ContactSection registerSection={registerSection} />
        
        <Footer />
        <ScrollToTop />
      </motion.div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
