import { useState, createContext, useContext } from 'react';
import Sidebar from '../pages/Sidebar';
import styles from './Layout.module.css';
import { Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <motion.div 
        className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <nav className={styles.navbar}>
          <div className={styles.navLeft}>
            <button className={styles.hamburgerButton} onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className={styles.logo}>AuraHP</h1>
          </div>
          <motion.div 
            className={styles.darkModeToggle} 
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className={styles.toggleCircle}
              animate={{ 
                x: darkMode ? 30 : 0,
                background: darkMode ? '#f1c40f' : '#ffffff'
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {darkMode ? <Sun size={18} color="#1a1f36" /> : <Moon size={18} color="#1a1f36" />}
            </motion.div>
          </motion.div>
        </nav>
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
        <div className={styles.pageContent}>{children}</div>
      </motion.div>
    </ThemeContext.Provider>
  );
};

export default Layout;