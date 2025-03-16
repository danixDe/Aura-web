import React from "react";
import styles from "./Sidebar.module.css";
import { X, User, History, Settings, Info, HomeIcon } from "lucide-react";
import {useNavigate} from 'react-router-dom'

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.sidebar}>
      <button className={styles.closeButton} onClick={onClose}>
        <X size={28} />
      </button>
      <div className={styles.menu}>
        <h2 className={styles.menuTitle}>Menu</h2>
        <ul className={styles.menuList}>
          <li onClick={()=>navigate('/DonorHome')} className = {styles.menuItem}>
            <HomeIcon size={20} /> Home
          </li>
          <li onClick = {()=>navigate('/donor')}className={styles.menuItem}>
            <User size={20} /> Profile
          </li>
          <li onClick={()=>navigate('/donationHistory')}className={styles.menuItem}>
            <History size={20} /> Donation History
          </li>
          <li className={styles.menuItem}>
            <Settings size={20} /> Settings
          </li>
          <li className={styles.menuItem}>
            <Info size={20} /> About
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
