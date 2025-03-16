import React, { useEffect, useState } from "react";
import Card from "./Card";
import Sidebar from "./Sidebar";
import styles from "./DonorHome.module.css";
import { motion } from "framer-motion";
import { Search, User,Sun,Moon, ListFilter, Menu } from "lucide-react";

const DonorHome = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState("");


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => console.warn("Location access denied or unavailable.")
    );
  }, []);

  useEffect(() => {
    setRequests([
      { id: 1, medicalFacility: "City Hospital", bloodGroup: "A+", unitsRequired: 3, eLevel: 5, latitude: 12.9716, longitude: 77.5946 },
      { id: 2, medicalFacility: "Metro Health Center", bloodGroup: "O-", unitsRequired: 2, eLevel: 4, latitude: 13.0359, longitude: 77.5970 },
      { id: 3, medicalFacility: "LifeLine Clinic", bloodGroup: "B-", unitsRequired: 1, eLevel: 6, latitude: 13.0500, longitude: 77.6000 },
      { id: 4, medicalFacility: "Apollo Hospital Visakhapatnam", bloodGroup: "AB+", unitsRequired: 2, eLevel: 7, latitude: 17.7231, longitude: 83.3115 },
      { id: 5, medicalFacility: "SevenHills Hospital", bloodGroup: "O+", unitsRequired: 3, eLevel: 5, latitude: 17.7260, longitude: 83.3150 },
      { id: 6, medicalFacility: "Care Hospital Visakhapatnam", bloodGroup: "A-", unitsRequired: 2, eLevel: 1, latitude: 17.7200, longitude: 83.3080 },
      { id: 7, medicalFacility: "KGH Visakhapatnam", bloodGroup: "B+", unitsRequired: 4, eLevel: 6, latitude: 17.7174, longitude: 83.3155 },
    ]);
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const effectiveLocation = userLocation || { latitude: 17.6868, longitude: 83.2185 };
  const finalRequests = requests
    .filter((request) => request.medicalFacility.toLowerCase().includes(searchQuery))
    .filter((request) =>
      showAllRequests ? true : getDistance(effectiveLocation.latitude, effectiveLocation.longitude, request.latitude, request.longitude) <= 30
    );

  return (
    <motion.div className={`${styles.container} ${darkMode ? styles.dark : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
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
              animate={{ x: darkMode ? 30 : 0, background: darkMode ? "#f1c40f" : "#fff" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {darkMode ? <Sun size={18} color="black" /> : <Moon size={18} color="black" />}
            </motion.div>
          </motion.div>
      </nav>
      <div className={styles.alertBanner}>
        ⚠️ Urgent Blood Requests Available! Help Save Lives.  
      </div>
      <div className={styles.content}>
      <div className={styles.statsContainer}>
          <motion.div className={styles.statCard} whileHover={{ scale: 1.05 }}>
            <h3>Total Requests</h3>
            <p>120+</p>
          </motion.div>
          <motion.div className={styles.statCard} whileHover={{ scale: 1.05 }}>
            <h3>Donations Completed</h3>
            <p>90+</p>
          </motion.div>
          <motion.div className={styles.statCard} whileHover={{ scale: 1.05 }}>
            <h3>Urgent Cases</h3>
            <p>10+</p>
          </motion.div>
        </div>
        <motion.div className={styles.searchmotion} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className={styles.searchWrapper}>
            <div className={styles.inputContainer}>
              <input type="text" className={styles.searchBar} placeholder="Search blood requests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
            </div>
          </div>
        </motion.div>
        <div className={styles.header}>
          <h2 className={styles.heading}>Emergency Blood Requests</h2>
          <button className={styles.showRequests} onClick={() => setShowAllRequests(!showAllRequests)}>
            <ListFilter size={18} /> {showAllRequests ? "Show Nearby Requests" : "Show All Requests"}
          </button>
        </div>
        <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, staggerChildren: 0.2 }}>
          {finalRequests.length > 0 ? (
            finalRequests.map((request) => (
              <motion.div key={request.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card request={request} />
              </motion.div>
            ))
          ) : (
            <p className={styles.noRequests}>No matching or nearby requests found.</p>
          )}
        </motion.div>
      </div>
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </motion.div>
  );
};

export default DonorHome;
