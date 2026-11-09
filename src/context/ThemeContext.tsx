import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// The site is always light (pale blue, white and mint), as the teacher asked. A dark choice saved by an older version is
// cleared, so a device that was left in dark mode shows the light pages again. The toggle is kept as a no-op for callers.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<ThemeMode>('light');

  useEffect(() => {
    try {
      localStorage.setItem('chem_cambridge_theme', 'light');
    } catch {
      // Storage can be blocked; the page is light either way
    }
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light-theme');
  }, []);

  const toggleTheme = () => undefined;

  const setTheme = (_t: ThemeMode) => undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
