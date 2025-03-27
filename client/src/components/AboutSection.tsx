import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutImage from '../assets/aboutalam.jpg';

interface AboutSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const AboutSection = ({ registerSection }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    registerSection('about', sectionRef.current);
  }, [registerSection]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const statsItems = [
    { icon: "fa-user-graduate", title: "Education", details: "LLB Graduate", subDetails: "AIBE Qualified Advocate" },
    { icon: "fa-gavel", title: "Experience", details: "14+ Years of Practice", subDetails: "80+ Criminal Cases Handled" },
    { icon: "fa-award", title: "Recognition", details: "Expert in Criminal, Civil & IP Law", subDetails: "Best Law Office of Aftab Alam Ansari" },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#F8F9FA] to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-[#E6AF2E]/5 rounded-full -mr-32 -mt-32"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#0A2463]/5 rounded-full -ml-40 -mb-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="text-[#E6AF2E] uppercase tracking-wide font-semibold mb-2 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Story
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">About <span className="text-[#E6AF2E] relative">
            Advocate Aftab Alam
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-1 bg-[#E6AF2E]/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </span></h2>
          <motion.div 
            className="w-24 h-1 bg-[#E6AF2E] mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <motion.div 
            className="lg:w-2/5 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 border-2 border-[#E6AF2E] rounded-xl"
                initial={{ x: 20, y: 20, opacity: 0 }}
                animate={isInView ? { x: 20, y: 20, opacity: 1 } : { x: 20, y: 20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.div
                className="relative z-10 rounded-xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={aboutImage} 
                  alt="Advocate Aftab Alam" 
                  className="w-full object-cover h-96 md:h-[500px]"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#0A2463]/80 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-lg font-medium">"Justice is not just my profession, it's my passion."</p>
                      <p className="text-white/80 text-sm mt-2 italic">- Advocate Aftab Alam</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[#0A2463] relative inline-block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              A Dedicated Advocate For Your Legal Needs
              <motion.div 
                className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#E6AF2E]"
                initial={{ width: 0 }}
                animate={isInView ? { width: "33%" } : { width: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
            </motion.h3>
            
            <motion.p 
              className="mb-6 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Founded in February 2013, the Best Law Office of Aftab Alam Ansari offers specialized legal services in Criminal, Civil, and IP Law, focusing on minimizing proceedings and maximizing protection for our clients.
            </motion.p>
            
            <motion.p 
              className="mb-8 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Our firm uses secure ERP and IMS systems to manage cases efficiently, representing clients in Criminal and Civil matters across Lakhimpur Kheri and Lucknow. With over 14 years of experience, we handle a wide range of legal matters including Family & Marriage Laws and Criminal & Protection Laws.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {["Professional", "Experienced", "Dedicated", "Trustworthy", "Strategic"].map((tag, i) => (
                <motion.span 
                  key={i}
                  className="px-4 py-2 bg-[#0A2463]/5 text-[#0A2463] rounded-full text-sm font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                  whileHover={{ 
                    backgroundColor: "#E6AF2E", 
                    color: "white",
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div
              className="mt-6" 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.button
                className="bg-[#0A2463] hover:bg-[#0A2463]/90 text-white px-6 py-3 rounded-md shadow-md flex items-center gap-2 group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(10, 36, 99, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More About Our Approach
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fas fa-arrow-right text-[#E6AF2E] group-hover:text-white transition-colors duration-300"></i>
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Stats and achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {statsItems.map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-[#E6AF2E]/30 transition-colors duration-300 relative overflow-hidden group"
              variants={cardVariants}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-[#E6AF2E]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-16 h-16 rounded-full bg-[#0A2463]/10 flex items-center justify-center mb-6 mx-auto text-[#E6AF2E] text-2xl group-hover:bg-[#E6AF2E]/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <i className={`fas ${item.icon}`}></i>
              </motion.div>
              <h4 className="text-xl font-bold mb-4 text-center text-[#0A2463]">{item.title}</h4>
              <div className="text-center text-gray-700">
                <p className="font-medium">{item.details}</p>
                <p>{item.subDetails}</p>
              </div>
              <motion.div 
                className="w-12 h-0.5 bg-[#E6AF2E] mx-auto mt-4"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.2), duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
