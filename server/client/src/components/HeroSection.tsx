import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const HeroSection = ({ registerSection }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerSection('hero', sectionRef.current);
  }, [registerSection]);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: custom * 0.2,
      }
    })
  };

  const btnVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px -5px rgba(10, 36, 99, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  const glowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: [0.2, 0.4, 0.2],
      scale: 1.2,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const, 
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get header height dynamically
      const header = document.querySelector('header');
      const headerHeight = header ? header.clientHeight : 80;
      
      const offsetTop = element.offsetTop;
      
      // Use smooth scroll with correct offset
      window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >
      {/* Background elements */}
      {/* Enhanced background with gradient overlay for better aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2463]/95 via-[#0A2463]/80 to-[#0A2463]/95 z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center z-0 before:absolute before:inset-0 before:bg-black/40"></div>
      
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-20 z-5 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')]"></div>
      
      {/* Pattern overlay - adds subtle visual texture */}
      <div className="absolute inset-0 opacity-15 z-5 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')]"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute w-72 h-72 rounded-full bg-[#E6AF2E] blur-[120px] top-1/4 -left-20 z-5"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />
      
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-[#0A2463] blur-[140px] bottom-1/4 right-0 z-5"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Additional glow element */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full bg-white blur-[80px] top-1/3 right-1/4 z-5"
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-16 left-16 text-[#E6AF2E] opacity-30 z-15 hidden lg:block"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.3, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <i className="fas fa-balance-scale text-6xl"></i>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-24 right-16 text-[#E6AF2E] opacity-30 z-15 hidden lg:block"
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 0.3, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <i className="fas fa-gavel text-6xl"></i>
      </motion.div>
      
      {/* Decorative law symbols */}
      <motion.div 
        className="absolute top-32 right-1/4 text-white opacity-15 z-15 hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <i className="fas fa-bookmark text-5xl"></i>
      </motion.div>
      
      {/* Main content - Significantly enhanced with modern design */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative top element */}
          <motion.div 
            className="w-20 h-1 bg-[#E6AF2E] mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="text-[#E6AF2E] text-sm uppercase tracking-[0.25em] font-medium"
              animate={{ 
                letterSpacing: ["0.25em", "0.3em", "0.25em"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              James Wilson Law Firm
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <motion.div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
              <motion.span 
                className="relative inline-block mb-2 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.span 
                  className="text-[#E6AF2E] relative z-10 block md:inline"
                  animate={{ 
                    textShadow: ["0 0 5px rgba(230, 175, 46, 0)", "0 0 15px rgba(230, 175, 46, 0.5)", "0 0 5px rgba(230, 175, 46, 0)"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                >
                  Legal Excellence
                </motion.span>
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-[#E6AF2E]/20 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.span>
              
              <motion.span
                className="text-white font-serif hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >•</motion.span>
              
              <motion.span
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                className="block md:inline relative"
              >
                <span>Personalized Approach</span>
                <motion.div 
                  className="absolute -bottom-3 left-1/4 right-1/4 h-0.5 bg-white/40"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.6 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </motion.span>
            </motion.div>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Dedicated to providing exceptional legal counsel with integrity, expertise, and commitment to your success. Our team brings over 15 years of experience to your most challenging legal matters.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-5 mb-16"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="bg-[#E6AF2E] hover:bg-yellow-500 text-[#0A2463] font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl relative overflow-hidden group"
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#E6AF2E] via-[#FBBC05] to-[#E6AF2E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  repeatType: "loop",
                }}
              />
              <span className="relative z-10 flex items-center justify-center">
                <i className="fas fa-calendar-check mr-2"></i>
                Schedule Consultation
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('services')}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-bold py-4 px-8 rounded-xl transition-all duration-300 relative overflow-hidden"
              variants={btnVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10 flex items-center justify-center">
                <i className="fas fa-briefcase mr-2"></i>
                Explore Our Services
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
          
          {/* Feature cards - with improved spacing for mobile */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 px-2 max-w-md md:max-w-full mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.8
                }
              }
            }}
          >
            {[
              { icon: 'fa-balance-scale', text: 'Skilled Litigation' },
              { icon: 'fa-landmark', text: 'Trusted Counsel' },
              { icon: 'fa-shield-alt', text: 'Client Protection' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-4 flex items-center justify-center gap-3 shadow-lg"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-full bg-[#E6AF2E]/20 flex items-center justify-center text-[#E6AF2E]"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(230, 175, 46, 0.3)" }}
                >
                  <i className={`fas ${item.icon}`}></i>
                </motion.div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced decorative floating elements instead of scroll button */}
      <motion.div
        className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-[#E6AF2E]/10 backdrop-blur-sm z-20"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0.3],
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-1/4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm z-20"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0.1],
          y: [0, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />
    </section>
  );
};

export default HeroSection;
