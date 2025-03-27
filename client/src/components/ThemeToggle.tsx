import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering during SSR or initial mount
  }

  return (
    <motion.button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative rounded-full p-2 w-11 h-11 flex items-center justify-center ${
        isDark ? 'bg-gray-800 text-yellow-300' : 'bg-blue-50 text-[#0A2463]'
      }`}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sun or Moon Icon with animation */}
      {isDark ? (
        <motion.div
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ 
            rotate: 0, 
            opacity: 1,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <i className="fas fa-sun text-xl" />
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-300/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 30, opacity: 0 }}
          animate={{ 
            rotate: 0, 
            opacity: 1,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <i className="fas fa-moon text-xl" />
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-900/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
      
      {/* Visual indicator for the current mode */}
      <motion.span
        className={`absolute -bottom-8 text-xs font-medium px-2 py-1 rounded-md ${
          isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-[#0A2463]'
        } shadow-md`}
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -5
        }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;