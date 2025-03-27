import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  items: string[];
  delay: number;
}

const ServiceCard = ({ icon, title, description, items, delay }: ServiceCardProps) => {
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
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: delay + 0.2 }
    },
    hover: { 
      scale: 1.1,
      backgroundColor: "rgba(230, 175, 46, 0.2)",
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: delay + 0.3 + (i * 0.1),
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: { 
      x: 5,
      color: "#0A2463",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.5, delay } },
    hover: { backgroundColor: "#E6AF2E", transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute -right-4 -top-4 w-20 h-20 bg-[#0A2463]/5 rounded-full z-0 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Top bar */}
      <div className="bg-[#0A2463] h-1 w-full relative z-10">
        <motion.div 
          className="h-full bg-[#E6AF2E]" 
          variants={barVariants}
        />
      </div>
      
      <div className="p-8">
        <motion.div 
          className="w-20 h-20 rounded-full bg-[#0A2463]/10 flex items-center justify-center mb-6 mx-auto relative group overflow-hidden"
          variants={iconVariants}
          whileHover="hover"
        >
          <motion.i 
            className={`${icon} text-[#0A2463] text-2xl relative z-10`}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          ></motion.i>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-[#0A2463]/5 to-transparent"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-xl font-serif font-bold text-center mb-2 text-[#0A2463] relative inline-block"
            whileHover={{ color: "#E6AF2E", transition: { duration: 0.2 } }}
          >
            {title}
            <motion.div 
              className="h-1 bg-[#E6AF2E]/20 absolute bottom-0 left-0 right-0 hidden group-hover:block"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.h3>
          
          <motion.div 
            className="w-10 h-0.5 bg-[#E6AF2E] mx-auto my-3"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-center mb-8 text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </motion.div>
        
        <motion.ul 
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((item, index) => (
            <motion.li 
              key={index} 
              className="flex items-start group/item"
              variants={listItemVariants}
              custom={index}
              whileHover="hover"
            >
              <motion.div 
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6AF2E]/20 text-[#E6AF2E] mr-3"
                whileHover={{
                  backgroundColor: "rgba(230, 175, 46, 0.4)",
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.i 
                  className="fas fa-check text-xs"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                ></motion.i>
              </motion.div>
              <span className="text-gray-700 group-hover/item:text-[#0A2463]">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Bottom link indicator */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="text-sm text-[#0A2463] font-medium flex items-center gap-2 relative overflow-hidden px-4 py-2 rounded-md group-hover:bg-[#E6AF2E]/10 transition-colors duration-300"
            whileHover={{ 
              x: 5,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            Learn More
            <motion.span 
              initial={{ x: -5, opacity: 0 }}
              whileHover={{ 
                x: 0, 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            >
              <i className="fas fa-arrow-right text-[#E6AF2E]"></i>
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
