import { useState } from "react";
import { Menu, X, Home, ClipboardList, Users, Settings, Info, Activity, Sun , Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from '../Context/DarkModeContext';
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import '../App.css';
import styles from '../pages/BloodBankPage.module.css'
import styles1 from './Layout.module.css'
import Footer from "../Components/Footer";

const BloodBankLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  return (
    <>
    <div className={`${styles.wrapper} ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <Outlet />
      </motion.div>
    
    </div>
    <Footer />
  </>
  );
};

function Navbar({ toggleSidebar }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogo = () => {
    if (location.pathname === '/donor') {
      window.location.reload();
    } else {
      navigate('/donor');
    }
  };
  return (
    <motion.div 
      className={styles1.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{display:'flex'}} >
      <button className={styles1.hamburgerButton} onClick={toggleSidebar}>
        <Menu size={28} />
      </button>
      <h1 onClick={handleLogo} className={styles1.logo}>AuraHP</h1>
    </div>
      <motion.div 
        className={styles1.darkModeToggle} 
        onClick={toggleDarkMode}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div 
          className={styles1.toggleCircle}
          animate={{ 
            x: isDarkMode ? 30 : 0,
            background: isDarkMode ? '#f1c40f' : '#ffffff'
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {isDarkMode ? <Sun size={18} color="#1a1f36" /> : <Moon size={18} color="#1a1f36" />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  return (
    <motion.div 
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <button className={styles.closeBtn} onClick={toggleSidebar}>
        <X size={24} />
      </button>
      <ul>
        <Link style={{ textDecoration: 'none' }} to="/bloodbank">
          <motion.li whileHover={{ x: 5 }}><Home size={20} /> Dashboard</motion.li>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/bloodbank/bloodRequests">
          <motion.li whileHover={{ x: 5 }}><ClipboardList size={20} /> Blood Requests</motion.li>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/bloodbank/donorsList">
          <motion.li whileHover={{ x: 5 }}><Users size={20} /> Donors List</motion.li>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/bloodbank/analytics">
          <motion.li whileHover={{ x: 5 }}><Activity size={20} /> Analytics</motion.li>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="#">
          <motion.li whileHover={{ x: 5 }}><Settings size={20} /> Settings</motion.li>
        </Link>
        <motion.li whileHover={{ x: 5 }} onClick={() => navigate('/about')}>
          <Info size={20} /> About
        </motion.li>
      </ul>
    </motion.div>
  );
}

export default BloodBankLayout;
