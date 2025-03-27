import { motion } from 'framer-motion';
import logoImage from '../assets/logoalam.jpg';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  type FooterLink = 
    | { label: string; section: string; href?: never; }
    | { label: string; href: string; section?: never; };

  type FooterColumn = {
    title: string;
    links: FooterLink[];
  };

  const footerLinks: FooterColumn[] = [
    { 
      title: 'Services',
      links: [
        { label: 'Criminal Law', section: 'services' },
        { label: 'Business Law', section: 'services' },
        { label: 'Family & Marriage Laws', section: 'services' },
        { label: 'Protection Laws', section: 'services' },
        { label: 'Cyber Law', section: 'services' },
        { label: 'Intellectual Property', section: 'services' },
      ]
    },
    {
      title: 'About Us',
      links: [
        { label: 'Our Firm', section: 'about' },
        { label: 'Legal Team', section: 'team' },
        { label: 'Testimonials', section: 'testimonials' },
        { label: 'Clients', section: 'clients' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Legal Articles', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'News', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-[#0A2463] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E6AF2E]/40 via-[#E6AF2E] to-[#E6AF2E]/40"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E6AF2E]/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#E6AF2E]/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and contact info column */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center mb-6 group"
            >
              <div className="mr-3 w-10 h-10 bg-white flex items-center justify-center rounded-md overflow-hidden">
                <img src={logoImage} alt="Advocate Aftab Alam" className="w-full h-full object-contain" />
              </div>
              <div className="text-xl font-serif font-bold text-white group-hover:text-[#E6AF2E] transition-colors duration-300">
                Advocate Aftab Alam
              </div>
            </button>
            
            <p className="mb-8 text-white/80 max-w-md">
              Providing exceptional legal counsel with integrity, expertise, and a commitment to your success for over 10 years in criminal, civil, and family law matters.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-[#E6AF2E] mr-3 mt-1">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <span>Law Office Of Aftab Alam Ansari Advocate<br />Lakhimpur Kheri, Uttar Pradesh, India</span>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#E6AF2E] mr-3 mt-1">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <span>+91 9005505557 / +91 8299429974</span>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#E6AF2E] mr-3 mt-1">
                  <i className="fas fa-envelope"></i>
                </div>
                <span>aftabalamanasari1987@gmail.com</span>
              </div>
            </div>
          </motion.div>
          
          {/* Quick links */}
          {footerLinks.map((column, idx) => (
            <motion.div 
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            >
              <h3 className="text-xl font-serif font-bold mb-4 text-[#E6AF2E]">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.section ? (
                      <button 
                        onClick={() => scrollToSection(link.section)}
                        className="text-white/80 hover:text-[#E6AF2E] transition-colors duration-300 flex items-center"
                      >
                        <span className="text-[#E6AF2E] mr-2 text-xs">
                          <i className="fas fa-chevron-right"></i>
                        </span>
                        {link.label}
                      </button>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-white/80 hover:text-[#E6AF2E] transition-colors duration-300 flex items-center"
                      >
                        <span className="text-[#E6AF2E] mr-2 text-xs">
                          <i className="fas fa-chevron-right"></i>
                        </span>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Consultation call to action */}
        <motion.div
          className="border-t border-white/10 pt-10 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-[#0C2D7A] rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden mb-10">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E6AF2E]/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#E6AF2E]/5 rounded-full"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3">
                  Need Legal Assistance?
                </h3>
                <p className="text-white/80 max-w-xl leading-relaxed">
                  I'm here to help you navigate your legal challenges. Get in touch for a consultation.
                </p>
              </div>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-[#E6AF2E] hover:bg-[#E6AF2E]/90 text-[#0A2463] font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 relative overflow-hidden group"
                style={{ whiteSpace: 'nowrap' }}
              >
                <span className="relative z-10">Schedule a Consultation</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </button>
            </div>
          </div>
          
          {/* Practice areas highlight */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/80 transition-colors cursor-default">Criminal Law</span>
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/80 transition-colors cursor-default">Business Law</span>
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/80 transition-colors cursor-default">Family & Marriage Laws</span>
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/80 transition-colors cursor-default">Protection Laws</span>
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/80 transition-colors cursor-default">Cyber Law</span>
            <span className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/80 transition-colors cursor-default">Intellectual Property</span>
          </div>
          
          {/* Social media links */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/aftabalamlmp?mibextid=ZbWKwL" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-[#E6AF2E]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-[#E6AF2E]"></i>
              </a>
              <a 
                href="https://youtube.com/channel/UCdWSJXOkTlVnAWiltezgX-Q" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-[#E6AF2E]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-[#E6AF2E]"></i>
              </a>
              <a 
                href="https://www.instagram.com/advaftabalam/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-[#E6AF2E]/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-[#E6AF2E]"></i>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-white/10 text-center pt-6 text-sm text-white/60 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-3">
            <p className="flex items-center">
              <span className="text-[#E6AF2E] mr-2"><i className="fas fa-balance-scale"></i></span>
              <span>&copy; {new Date().getFullYear()} Advocate Aftab Alam</span>
            </p>
            <p className="flex items-center">
              <span className="text-[#E6AF2E] mr-2"><i className="fas fa-shield-alt"></i></span>
              <span>All rights reserved</span>
            </p>
            <p className="flex items-center">
              <span className="text-[#E6AF2E] mr-2"><i className="fas fa-gavel"></i></span>
              <span>Est. 2013</span>
            </p>
          </div>
          <p className="mt-3 max-w-2xl mx-auto">
            This website is for informational purposes only. No attorney-client relationship is created by visiting this website.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
