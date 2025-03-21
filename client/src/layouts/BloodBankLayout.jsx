import React, { useState, useContext } from "react";
import { Menu, X, Home, ClipboardList, Users, Settings, Info, Activity } from "lucide-react";
import styles from "../pages/BloodBankPage.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../layouts/Layout";
import { Link,useNavigate } from "react-router-dom";

const BloodBankLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`${styles.wrapper} ${darkMode ? 'dark' : 'light'}`}>
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

function Navbar({ toggleSidebar }) {
  return (
    <motion.div 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className={styles.menuBtn} onClick={toggleSidebar}>
        <Menu size={28} />
      </button>
      <h2>Aura HP Blood Bank</h2>
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
  <Link style={{textDecoration:'none'}} to="/bloodbank">
    <motion.li whileHover={{ x: 5 }}><Home size={20} /> Dashboard</motion.li>
  </Link>
  <Link style={{textDecoration:'none'}} to="/blood-requests">
    <motion.li whileHover={{ x: 5 }}><ClipboardList size={20} /> Blood Requests</motion.li>
  </Link>
  <Link style={{textDecoration:'none'}} to="/donors-list">
    <motion.li whileHover={{ x: 5 }}><Users size={20} /> Donors List</motion.li>
  </Link>
  <Link style={{textDecoration:'none'}} to="/analytics">
    <motion.li whileHover={{ x: 5 }}><Activity size={20} /> Analytics</motion.li>
  </Link>
  <Link style={{textDecoration:'none'}} to="#">
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