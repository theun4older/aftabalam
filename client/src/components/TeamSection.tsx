import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import AttorneyCard from './AttorneyCard';
import aboutImage from '../assets/aboutalam.jpg';

interface TeamSectionProps {
  registerSection: (id: string, ref: HTMLDivElement | null) => void;
}

const attorneys = [
  {
    image: aboutImage,
    name: "Advocate Aftab Alam",
    title: "Founding Partner",
    bio: "With over 10 years of experience, Aftab has established a reputation for excellence in criminal law, civil disputes, and family law. Mumbai University Law graduate and member of the Bar Council of India.",
    socialLinks: {
      facebook: "https://www.facebook.com/aftabalamlmp?mibextid=ZbWKwL",
      youtube: "https://youtube.com/channel/UCdWSJXOkTlVnAWiltezgX-Q",
      instagram: "https://www.instagram.com/advaftabalam/",
      email: "aftabalamanasari1987@gmail.com"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    name: "Sarah Johnson",
    title: "Senior Associate",
    bio: "Sarah specializes in litigation and employment law. With her background in both corporate and non-profit sectors, she brings valuable insights to complex cases. Yale Law School graduate.",
    socialLinks: {
      linkedin: "#",
      email: "sarah@advocateaftabalam.com"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Michael Chen",
    title: "Partner",
    bio: "Michael's expertise in real estate law and estate planning has helped numerous clients protect their assets and secure their futures. Columbia Law School graduate with 10 years of experience.",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      email: "michael@advocateaftabalam.com"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Alexandra Davis",
    title: "Associate",
    bio: "Alexandra focuses on intellectual property and technology law. Her background in computer science provides her with unique insights into tech-related legal matters. Stanford Law School graduate.",
    socialLinks: {
      linkedin: "#",
      email: "alexandra@advocateaftabalam.com"
    }
  }
];

const TeamSection = ({ registerSection }: TeamSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    registerSection('team', sectionRef.current);
  }, [registerSection]);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#F8F9FA] to-[#F0F2F5]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2"
          >
            <span className="px-4 py-1.5 bg-[#E6AF2E]/10 text-[#E6AF2E] rounded-full text-sm font-medium">Meet Our Team</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our <span className="text-[#E6AF2E]">Legal Team</span></h2>
          
          <div className="w-20 h-1 bg-[#E6AF2E] mx-auto mb-8 relative">
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E6AF2E]"
              animate={{ 
                x: [0, 20, 0], 
                opacity: [1, 0.5, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[#E6AF2E]"
              animate={{ 
                x: [0, -20, 0], 
                opacity: [1, 0.5, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1 
              }}
            />
          </div>
          
          <motion.p 
            className="max-w-3xl mx-auto text-lg text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Meet our experienced attorneys who are dedicated to providing exceptional legal representation and achieving the best outcomes for our clients.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {attorneys.map((attorney, index) => (
            <AttorneyCard
              key={index}
              image={attorney.image}
              name={attorney.name}
              title={attorney.title}
              bio={attorney.bio}
              socialLinks={attorney.socialLinks}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Sample section with consultation options */}
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-3xl mx-auto border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="text-[#0A2463] font-serif font-bold text-xl mb-3">Sample Free Consultation</h3>
            <p className="text-gray-600 mb-4">Experience our approach with a complimentary 30-minute consultation. Discuss your legal needs with our experienced attorneys.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <motion.div 
                className="bg-[#F8F9FA] p-4 rounded-lg border border-gray-100 flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#E6AF2E]/20 flex items-center justify-center mb-3">
                  <i className="fas fa-phone text-[#E6AF2E]"></i>
                </div>
                <h4 className="font-medium text-[#0A2463]">Phone Call</h4>
                <p className="text-sm text-gray-500 text-center mt-1">Quick discussion of your legal matter</p>
              </motion.div>
              
              <motion.div 
                className="bg-[#F8F9FA] p-4 rounded-lg border border-gray-100 flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#E6AF2E]/20 flex items-center justify-center mb-3">
                  <i className="fas fa-video text-[#E6AF2E]"></i>
                </div>
                <h4 className="font-medium text-[#0A2463]">Video Call</h4>
                <p className="text-sm text-gray-500 text-center mt-1">Face-to-face virtual meeting with an attorney</p>
              </motion.div>
              
              <motion.div 
                className="bg-[#F8F9FA] p-4 rounded-lg border border-gray-100 flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#E6AF2E]/20 flex items-center justify-center mb-3">
                  <i className="fas fa-building text-[#E6AF2E]"></i>
                </div>
                <h4 className="font-medium text-[#0A2463]">Office Visit</h4>
                <p className="text-sm text-gray-500 text-center mt-1">In-person consultation at our office</p>
              </motion.div>
            </div>
            
            <motion.button
              className="mt-6 bg-[#E6AF2E] hover:bg-[#E6AF2E]/90 text-[#0A2463] font-bold py-3 px-6 rounded-lg shadow-md"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 15px rgba(230, 175, 46, 0.2)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Free Consultation
            </motion.button>
          </motion.div>

          <motion.a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A2463] text-white rounded-lg font-medium shadow-lg hover:bg-[#0A2463]/90 transition-all"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 20px rgba(10, 36, 99, 0.2)",
              scale: 1.02 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.i 
              className="fas fa-users mr-1"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            ></motion.i>
            Join Our Team
            <i className="fas fa-arrow-right"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;