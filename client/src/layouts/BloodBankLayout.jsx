import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from '../Context/DarkModeContext';
import { Outlet } from "react-router-dom";
import '../App.css';
import styles from '../pages/BloodBankPage.module.css'
import Footer from "../Components/Footer";
import BloodNav from "../Components/BloodNav";


const BloodBankLayout = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <>
    <div className={`${styles.wrapper} ${isDarkMode ? 'dark' : 'light'}`}>
      <BloodNav/>
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

export default BloodBankLayout;
