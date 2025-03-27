import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  activeSection: string;
}

const navSections = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Our Team' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' }
];

const Header = ({ activeSection }: HeaderProps) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCallbackVisible, setIsCallbackVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle window resizing and scrolling
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      // Close mobile menu on resize to desktop
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Call once to set initial state
    handleResize();
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Enhanced scroll navigation with proper offset calculation
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the header height dynamically
      const header = document.querySelector('header');
      const headerHeight = header ? header.clientHeight : 80;
      
      // Additional offset based on device type
      const additionalOffset = viewportWidth < 768 ? 20 : 10;
      const totalOffset = headerHeight + additionalOffset;
      
      // Get the element's position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalOffset;
      
      // Scroll with smooth behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false);
      }
    }
  }, [isOpen, viewportWidth]);

  // Toggle handlers
  const toggleCallback = useCallback(() => {
    setIsCallbackVisible(prev => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
    console.log("Menu toggled");
  }, []);

  // Animation variants
  const navItemVariants = {
    hidden: { 
      opacity: 0,
      y: 10, 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.05 * i,
        duration: 0.2,
      }
    }),
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(230, 175, 46, 0.15)",
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <>
      {/* Main Header */}
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        } bg-white backdrop-blur-lg bg-opacity-95 shadow-lg`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo / Brand */}
            <motion.button 
              onClick={() => scrollToSection('hero')} 
              className="flex items-center group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="mr-3 w-12 h-12 bg-[#E6AF2E] text-[#0A2463] flex items-center justify-center rounded-md relative overflow-hidden"
                whileHover={{
                  boxShadow: "0 0 15px rgba(230, 175, 46, 0.6)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span 
                  className="font-serif font-bold text-xl relative z-10"
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 5
                  }}
                >
                  JW
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-[#E6AF2E]"
                  whileHover={{
                    background: "radial-gradient(circle at center, #E6AF2E 0%, #d9a429 100%)"
                  }}
                />
              </motion.div>
              <div className="text-xl font-serif font-bold text-[#0A2463] group-hover:text-[#E6AF2E] transition-colors duration-300">
                James Wilson <span className="hidden md:inline text-sm font-sans font-normal text-gray-500">LAW FIRM</span>
              </div>
            </motion.button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex space-x-1">
                {navSections.map((section, i) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                      activeSection === section.id 
                        ? 'text-[#0A2463] bg-[#E6AF2E]/10' 
                        : 'text-[#343A40] hover:text-[#0A2463]'
                    }`}
                    whileHover="hover"
                    whileTap="tap"
                    variants={navItemVariants}
                    custom={i}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E6AF2E]"
                        layoutId="activeSection"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="ml-8">
                <motion.button
                  onClick={toggleCallback}
                  className="bg-[#E6AF2E] text-[#0A2463] font-medium py-2 px-4 rounded-md shadow-md hover:bg-[#E6AF2E]/90 transition-colors duration-300 flex items-center"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(230, 175, 46, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.i 
                    className="fas fa-phone-alt mr-2"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity, 
                      repeatDelay: 3 
                    }}
                  ></motion.i>
                  <span>Request Callback</span>
                </motion.button>
              </div>
            </nav>
            
            {/* Mobile Navigation Toggle */}
            <div className="flex items-center lg:hidden">
              <motion.button
                onClick={toggleCallback}
                className="bg-[#E6AF2E] text-[#0A2463] font-medium py-1.5 px-3 rounded-md shadow hover:bg-[#E6AF2E]/90 transition-colors duration-300 mr-3 text-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 4px 10px rgba(230, 175, 46, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.i 
                  className="fas fa-phone-alt"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  }}
                ></motion.i>
              </motion.button>
              
              <motion.button 
                ref={buttonRef}
                onClick={toggleMenu}
                className="w-10 h-10 rounded-md flex items-center justify-center focus:outline-none overflow-hidden bg-slate-100 text-[#0A2463]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open main menu"
              >
                <motion.i 
                  className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`}
                  initial={false}
                  animate={{ 
                    rotate: isOpen ? 90 : 0,
                    scale: isOpen ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.i>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Navigation Menu - Separate from header for better z-index control */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            ref={menuRef}
            className="fixed inset-0 bg-gradient-to-b from-[#0A2463]/95 to-[#0A2463]/90 backdrop-blur-md z-[100] flex flex-col lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top header with logo and close button */}
            <motion.div 
              className="flex items-center justify-between px-6 py-4 border-b border-white/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#E6AF2E] flex items-center justify-center rounded-lg mr-3">
                  <span className="text-[#0A2463] font-serif font-bold text-xl">JW</span>
                </div>
                <div className="text-white font-serif text-lg">James Wilson <span className="text-xs font-light text-white/70">LAW FIRM</span></div>
              </div>
              
              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                onClick={toggleMenu}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times text-xl"></i>
              </motion.button>
            </motion.div>
            
            {/* Navigation items with beautiful design */}
            <motion.div 
              className="flex-1 overflow-auto px-4 sm:px-6 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <nav>
                <ul className="grid grid-cols-2 gap-3">
                  {navSections.map((section, i) => (
                    <motion.li
                      key={section.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            delay: 0.15 + (i * 0.08)
                          }
                        }
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        onClick={() => scrollToSection(section.id)}
                        className={`flex flex-col items-center w-full py-4 px-3 rounded-xl ${
                          activeSection === section.id 
                            ? 'bg-white text-[#0A2463]' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            activeSection === section.id 
                              ? 'bg-[#E6AF2E]/20 text-[#E6AF2E]' 
                              : 'bg-white/10 text-white'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <i className={`fas ${
                            section.id === 'about' ? 'fa-user' :
                            section.id === 'services' ? 'fa-briefcase' :
                            section.id === 'team' ? 'fa-users' :
                            section.id === 'testimonials' ? 'fa-quote-right' :
                            section.id === 'clients' ? 'fa-handshake' :
                            section.id === 'contact' ? 'fa-envelope' : 'fa-circle'
                          } text-xl`}></i>
                        </motion.div>
                        <span className="text-center font-medium text-sm">
                          {section.label}
                        </span>
                        {activeSection === section.id && (
                          <motion.div 
                            className="mt-2 w-6 h-1 bg-[#E6AF2E] rounded-full"
                            layoutId="mobileActiveIndicator"
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
            
            {/* Bottom action button */}
            <motion.div
              className="p-4 sm:p-6 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => {
                  toggleCallback();
                  toggleMenu();
                }}
                className="w-full bg-[#E6AF2E] hover:bg-[#E6AF2E]/90 text-[#0A2463] font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(230, 175, 46, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.i 
                  className="fas fa-phone-alt text-lg"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                ></motion.i>
                <span className="text-lg">Request Callback</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Callback Modal - Highest z-index to appear above all */}
      <AnimatePresence>
        {isCallbackVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg shadow-2xl w-full max-w-md relative overflow-hidden bg-white"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <motion.div 
                className="bg-[#0A2463] h-2 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <motion.h2 
                    className="text-2xl font-serif font-bold text-[#0A2463]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    Request a Callback
                  </motion.h2>
                  <motion.button 
                    onClick={toggleCallback}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </motion.button>
                </div>
                
                <motion.form 
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-600">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-600">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <label htmlFor="preferred-time" className="block text-sm font-medium mb-1 text-gray-600">
                      Preferred Time
                    </label>
                    <select
                      id="preferred-time"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent"
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 6PM)</option>
                    </select>
                  </motion.div>
                  
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-600">
                      Brief Description
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6AF2E] focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </motion.div>
                  
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <motion.button
                      type="submit"
                      className="w-full bg-[#E6AF2E] hover:bg-yellow-500 text-[#0A2463] font-bold py-2.5 px-4 rounded-md transition-colors duration-300 shadow-lg"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 5px 15px rgba(230, 175, 46, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Callback
                    </motion.button>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
