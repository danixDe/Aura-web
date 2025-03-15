import React, { useEffect, useState } from "react";
import Card from "./Card";
import Sidebar from "./Sidebar";
import styles from "./DonorHome.module.css";
import { motion } from "framer-motion";
import { Search, User, ListFilter, Menu } from "lucide-react";

const DonorHome = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get user's geolocation; if denied, we'll use a fallback location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Location access denied or unavailable.");
      }
    );
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = [
        { id: 1, medicalFacility: "City Hospital", bloodGroup: "A+", unitsRequired: 3, eLevel: 5, latitude: 12.9716, longitude: 77.5946 },
        { id: 2, medicalFacility: "Metro Health Center", bloodGroup: "O-", unitsRequired: 2, eLevel: 4, latitude: 13.0359, longitude: 77.5970 },
        { id: 3, medicalFacility: "LifeLine Clinic", bloodGroup: "B-", unitsRequired: 1, eLevel: 6, latitude: 13.0500, longitude: 77.6000 },
        { id: 4, medicalFacility: "Apollo Hospital Visakhapatnam", bloodGroup: "AB+", unitsRequired: 2, eLevel: 7, latitude: 17.7231, longitude: 83.3115 },
        { id: 5, medicalFacility: "SevenHills Hospital", bloodGroup: "O+", unitsRequired: 3, eLevel: 5, latitude: 17.7260, longitude: 83.3150 },
        { id: 6, medicalFacility: "Care Hospital Visakhapatnam", bloodGroup: "A-", unitsRequired: 2, eLevel: 1, latitude: 17.7200, longitude: 83.3080 },
        { id: 7, medicalFacility: "KGH Visakhapatnam", bloodGroup: "B+", unitsRequired: 4, eLevel: 6, latitude: 17.7174, longitude: 83.3155 },
      ];
      setRequests(data);
    };

    const fetchDonationHistory = async () => {
      const history = [
        { id: 1, hospital: "Green Cross Hospital", date: "2024-03-05", bloodGroup: "A+" },
        { id: 2, hospital: "Red Life Clinic", date: "2024-02-12", bloodGroup: "O-" },
      ];
      setDonationHistory(history);
    };

    fetchRequests();
    fetchDonationHistory();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

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

  const effectiveLocation = userLocation || { latitude: 17.6868, longitude: 83.2185 };

  const finalRequests = requests
    .filter((request) => request.medicalFacility.toLowerCase().includes(searchQuery))
    .filter((request) => {
      if (!showAllRequests) {
        return getDistance(effectiveLocation.latitude, effectiveLocation.longitude, request.latitude, request.longitude) <= 30;
      }
      return true;
    });

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.hamburgerButton} onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className={styles.logo}>AuraHP</h1>
        </div>
      </nav>
      <div className={styles.content}>
      <motion.div
          className={styles.searchmotion}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className={styles.searchWrapper}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.searchBar}
                placeholder="Search blood requests..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </motion.div>
        <div className={styles.header}>
          <h2 className={styles.heading}>Emergency Blood Requests</h2>
          <button className={styles.toggleButton} onClick={() => setShowAllRequests(!showAllRequests)}>
            <ListFilter size={18} /> {showAllRequests ? "Show Nearby Requests" : "Show All Requests"}
          </button>
        </div>

        <div className={styles.grid}>
          {finalRequests.length > 0 ? (
            finalRequests.map((request) => <Card key={request.id} request={request} />)
          ) : (
            <p className={styles.noRequests}>No matching or nearby requests found.</p>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default DonorHome;
