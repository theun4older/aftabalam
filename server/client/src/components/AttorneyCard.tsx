import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

interface AttorneyCardProps {
  image: string;
  name: string;
  title: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  delay: number;
}

const AttorneyCard = ({ image, name, title, bio, socialLinks, delay }: AttorneyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Values for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform the motion values to create the tilt effect
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Handle mouse move for the tilt effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const imageVariants = {
    initial: { 
      scale: 1,
      filter: "brightness(0.95)"
    },
    hover: { 
      scale: 1.08,
      filter: "brightness(1.05)",
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const socialIconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      scale: 1.2, 
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden group relative perspective-1000"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        transition: isHovered ? undefined : "all 0.5s ease-out"
      }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute -right-4 -top-4 w-20 h-20 bg-[#E6AF2E]/10 rounded-full z-0 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="bg-[#0A2463] h-1 w-full relative z-10">
        <motion.div 
          className="h-full bg-[#E6AF2E]" 
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* 3D Shine Effect */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0) 100%)",
          }}
        />
      )}
      
      <div className="relative overflow-hidden">
        <motion.div
          className="w-full h-80 overflow-hidden"
          whileHover={{ 
            boxShadow: "0 10px 25px rgba(10, 36, 99, 0.3)",
          }}
        >
          <motion.img
            src={image}
            alt={name}
            className="w-full h-80 object-cover object-center transition-all duration-700"
            variants={imageVariants}
            initial="initial"
            whileHover="hover"
          />
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#0A2463]/90 via-[#0A2463]/50 to-transparent flex flex-col justify-end p-6"
          variants={overlayVariants}
          initial="hidden"
          whileHover="hover"
        >
          <motion.div 
            className="flex space-x-3 mb-3 justify-center"
            initial="hidden"
            whileHover="visible"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {socialLinks.linkedin && (
              <motion.a 
                href={socialLinks.linkedin} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                target="_blank"
                rel="noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <motion.i 
                  className="fab fa-linkedin-in text-[#0A2463]"
                  whileHover={{ color: "#E6AF2E" }}
                ></motion.i>
              </motion.a>
            )}
            {socialLinks.twitter && (
              <motion.a 
                href={socialLinks.twitter} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                target="_blank"
                rel="noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <motion.i 
                  className="fab fa-twitter text-[#0A2463]"
                  whileHover={{ color: "#E6AF2E" }}
                ></motion.i>
              </motion.a>
            )}
            {socialLinks.email && (
              <motion.a 
                href={`mailto:${socialLinks.email}`} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <motion.i 
                  className="fas fa-envelope text-[#0A2463]"
                  whileHover={{ color: "#E6AF2E" }}
                ></motion.i>
              </motion.a>
            )}
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-white bg-[#E6AF2E]/20 backdrop-blur-sm p-3 rounded-lg"
          >
            <p className="text-sm leading-relaxed">{bio}</p>
            <motion.div 
              className="w-1/4 h-0.5 bg-[#E6AF2E] mt-3 mx-auto"
              initial={{ width: "10%" }}
              whileHover={{ width: "50%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-6 relative z-10"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div 
          className="w-12 h-1 bg-[#E6AF2E] mb-4 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out"
          }}
        />
        
        <motion.h3 
          className="text-xl font-serif font-bold text-[#0A2463] mb-1 relative inline-block"
          variants={textVariants}
          style={{
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out"
          }}
        >
          {name}
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E6AF2E]/30"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>
        
        <motion.p 
          className="text-[#E6AF2E] font-medium mb-3"
          variants={textVariants}
          style={{
            transform: isHovered ? "translateZ(25px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out"
          }}
        >
          {title}
        </motion.p>
        
        <motion.div 
          className="flex items-center text-sm text-gray-500"
          variants={textVariants}
        >
          <motion.i 
            className="fas fa-gavel mr-2 text-[#E6AF2E]"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
          ></motion.i>
          <span>Available for consultation</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AttorneyCard;