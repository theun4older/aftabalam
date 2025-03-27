import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial theme from localStorage or use dark as default
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // Check for saved theme or use system preference
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  // Effect to update document element class and localStorage when theme changes
  useEffect(() => {
    // Set data-theme attribute on document element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', theme);
    
    // Prepare for transition
    const transitionClass = theme === 'dark' ? 'to-dark' : 'to-light';
    document.documentElement.classList.add(transitionClass);
    
    // Remove transition class after transition completes
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('to-dark', 'to-light');
    }, 800);
    
    return () => clearTimeout(timer);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};