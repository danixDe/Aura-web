import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import styles from './Layout.module.css';
import { Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../Context/DarkModeContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogo = () => {
    if (location.pathname === '/DonorHome') {
      window.location.reload();
    } else {
      navigate('/DonorHome');
    }
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.hamburgerButton} onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 onClick={handleLogo} className={styles.logo}>AuraHP</h1>
        </div>

        <motion.div 
          className={styles.darkModeToggle} 
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div 
            className={styles.toggleCircle}
            animate={{ 
              x: isDarkMode ? 30 : 0,
              background: isDarkMode ? '#f1c40f' : '#ffffff'
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isDarkMode ? <Sun size={18} color="#1a1f36" /> : <Moon size={18} color="#1a1f36" />}
          </motion.div>
        </motion.div>
      </nav>

      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      <div className={styles.pageContent}>
        <Outlet />
      </div>
    </motion.div>
  );
};

export default Layout;
