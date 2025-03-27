import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const services = [
  {
    icon: "fas fa-gavel",
    title: "Criminal Law",
    description: "Criminal law governs crimes, prescribing conduct that threatens public safety and welfare, focusing on punishment and rehabilitation.",
    items: [
      "Criminal Defense",
      "Bail Conditions",
      "Legal Representation",
      "Criminal Case Handling"
    ]
  },
  {
    icon: "fas fa-briefcase",
    title: "Business Law",
    description: "Corporate law governs the rights, relations, and conduct of businesses and organizations, ensuring legal compliance.",
    items: [
      "Business Formation",
      "Corporate Governance",
      "Legal Compliance",
      "Business Disputes"
    ]
  },
  {
    icon: "fas fa-user-friends",
    title: "Family & Marriage Laws",
    description: "Specialized legal services for family matters including marriage, divorce, custody, and inheritance issues.",
    items: [
      "Muslim Personal Law",
      "Special Marriage Act",
      "Hindu Marriage Act",
      "Matrimonial Disputes"
    ]
  },
  {
    icon: "fas fa-shield-alt",
    title: "Protection Laws",
    description: "Legal protection for individuals facing harassment, violence, or rights violations, with focus on safety and justice.",
    items: [
      "Dowry & Domestic Violence",
      "Bail Conditions",
      "Child Custody",
      "Protection Orders"
    ]
  },
  {
    icon: "fas fa-laptop",
    title: "Cyber Law",
    description: "Legal services addressing digital crimes, online privacy, and electronic communications in an increasingly connected world.",
    items: [
      "Digital Crime Defense",
      "Online Privacy Protection",
      "Electronic Evidence Handling",
      "Cyber Security Compliance"
    ]
  },
  {
    icon: "fas fa-lightbulb",
    title: "Intellectual Property",
    description: "Protection and enforcement of intellectual property rights including patents, trademarks, and copyrights.",
    items: [
      "Trademark Registration",
      "Copyright Protection",
      "IP Licensing",
      "IP Litigation"
    ]
  }
];

const ServicesSection = ({ registerSection }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    registerSection('services', sectionRef.current);
  }, [registerSection]);

  const titleVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.6
      }
    }
  };

  // Function to handle smooth scrolling
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      // Get header height with additional offset
      const header = document.querySelector('header');
      const additionalOffset = window.innerWidth < 768 ? 20 : 10;
      const headerHeight = header ? header.clientHeight + additionalOffset : 90;
      
      const offsetTop = element.offsetTop;
      
      // Smooth scroll with correct offset
      setTimeout(() => {
        window.scrollTo({
          top: offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-[#F8F9FA] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-40 left-0 w-96 h-96 bg-[#E6AF2E]/5 rounded-full -ml-48"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-0 w-80 h-80 bg-[#0A2463]/5 rounded-full -mr-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.span 
            className="text-[#E6AF2E] uppercase tracking-wide font-semibold mb-2 block"
            variants={titleVariant}
          >
            Our Expertise
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold mb-5 relative inline-block"
            variants={titleVariant}
          >
            Legal <span className="text-[#E6AF2E]">Services</span>
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-1 bg-[#E6AF2E]/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-[#E6AF2E] mx-auto mt-6 mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          
          <motion.p 
            className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed"
            variants={titleVariant}
          >
            I offer comprehensive legal services tailored to meet your specific needs. My expertise spans across multiple practice areas, ensuring you receive exceptional representation for all your legal challenges.
          </motion.p>
        </motion.div>
        
        {/* 3D service selection tabs */}
        <motion.div 
          className="max-w-3xl mx-auto overflow-x-auto mb-16 scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex space-x-2 sm:space-x-4 p-2 min-w-max">
            {services.map((service, index) => (
              <motion.button
                key={`btn-${index}`}
                className="px-4 py-2 rounded-full bg-white shadow-md text-sm flex items-center gap-2 hover:bg-[#E6AF2E] hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${service.icon} text-[#E6AF2E] group-hover:text-white`}></i>
                <span>{service.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              items={service.items}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-20 relative">
          <motion.div 
            className="bg-[#0A2463] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-[#E6AF2E]/20 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#E6AF2E]/10 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            />
            
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
              <div className="text-center md:text-left">
                <motion.h3 
                  className="text-2xl md:text-3xl font-serif font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Ready to Discuss Your Legal Needs?
                </motion.h3>
                <motion.p 
                  className="text-white/80 text-lg max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Schedule a consultation today and take the first step toward resolving your legal challenges with confidence.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  onClick={scrollToContact}
                  className="bg-[#E6AF2E] hover:bg-[#E6AF2E]/90 text-[#0A2463] font-bold py-4 px-8 rounded-lg shadow-lg flex items-center gap-2 relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(230, 175, 46, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Schedule a Consultation</span>
                  <motion.span
                    className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                    whileHover={{ scale: 1.5, opacity: 0.2 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
