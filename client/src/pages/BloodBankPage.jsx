import { useState } from "react";
import { Menu, X, Home, ClipboardList, Users, Settings, PlusCircle, Info, Activity, Droplet, AlertTriangle } from "lucide-react";
import styles from "./BloodBankPage.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {useDarkMode} from '../Context/DarkModeContext';
import toast from "react-hot-toast";
function BloodBankPage() {
  document.title = "AuraHP Blood Bank";
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRequestOpen, setRequestOpen] = useState(false);
  const {isDarkMode} = useDarkMode();

  return (
    <div className={`${styles.wrapper} ${isDarkMode ? 'dark' : 'light'}`}>
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>
      <motion.div 
        className={styles.mainContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.container}>
          <motion.h1 
            className={styles.title}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Aura HP Blood Bank
          </motion.h1>
          <motion.button 
            className={styles.postRequestBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRequestOpen(true)}
          >
            <PlusCircle size={20} /> Post a Request
          </motion.button>
          <Dashboard />
          <BloodInventory />
        </div>
      </motion.div>
      <AnimatePresence>
        {isRequestOpen && <RequestPopup closePopup={() => setRequestOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

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
        <motion.li whileHover={{ x: 5 }}><Home size={20} /> <Link to="/bloodbank">Dashboard</Link></motion.li>
        <motion.li whileHover={{ x: 5 }}><ClipboardList size={20} /> <Link to="/blood-requests">Blood Requests</Link></motion.li>
        <motion.li whileHover={{ x: 5 }}><Users size={20} /> <Link to="/donors-list">Donors List</Link></motion.li>
        <motion.li whileHover={{ x: 5 }}><Activity size={20} /> <Link to="/analytics">Analytics</Link></motion.li>
        <motion.li whileHover={{ x: 5 }}><Settings size={20} /> <Link to="#">Settings</Link></motion.li>
        <motion.li whileHover={{ x: 5 }}><Info size={20} /> About</motion.li>
      </ul>
    </motion.div>
  );
}

function RequestPopup({ closePopup }) {
  const [formData, setFormData] = useState({
    facility_id:1,
    blood_group: "A+",
    units: 1,
    urgency: "Urgent",
    type: 'live_blood',
    facilityName: "City Hospital",
    address: "123 Main St, Visakhapatnam",
    patientName: " ",
    patientAge: 18,
    contactNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit=async()=>{
    console.log(formData);
    const response=await  axios.post("http://localhost:5000/api/blood-requests",formData);
    console.log(response.data);
    toast.success('Blood Request Sent');
    closePopup();
  }
  return (
    <motion.div 
      className={styles.popupOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={styles.popup}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button className={styles.closeBtn} onClick={closePopup}>×</button>
        <h2>Post a Blood Request</h2>
        
        <label>Blood Group</label>
        <select name="blood_group" value={formData.blood_group} onChange={handleChange}>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Number of Units</label>
        <input type="number" name="units" value={Number.parseInt(formData.units)} onChange={handleChange} placeholder="Enter units" />

        <label>Patient Name</label>
        <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Enter patient name" />

        <label>Patient Age</label>
        <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} placeholder="Enter patient age" />

        <label>Contact Number</label>
        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter contact number" />

        <label>Urgency Level</label>
        <select name="urgency" value={formData.urgency} onChange={handleChange}>
          {["Urgent", "Within 24 hours", "Within 3 days", "Within a week"].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <label htmlFor="">Type</label>
        <select name="type" id="" value={formData.type} onChange={handleChange} >
          {
          ["live_blood","store_blood"].map((item)=> (
            <option value={item}>{item}</option>
          )
          )}
        </select>
        <label>Medical Facility</label>
        <input type="text" value={formData.facilityName} disabled />

        <label>Address</label>
        <input type="text" value={formData.address} disabled />

        <label>Additional Notes</label>
        <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any additional information" />

        <motion.button 
          className={styles.submitBtn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
        >
          Submit Request
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Dashboard() {
  const [requests] = useState([
    { bloodType: "O+", urgency: "High", status: "Pending", timestamp: "2024-03-15 10:30" },
    { bloodType: "A-", urgency: "Medium", status: "Fulfilled", timestamp: "2024-03-15 09:15" },
    { bloodType: "B+", urgency: "High", status: "Processing", timestamp: "2024-03-15 08:45" }
  ]);

  return (
    <motion.div 
      className={styles.dashboard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2>Recent Blood Requests</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <td><Droplet size={16} /> {req.bloodType}</td>
              <td>
                <span style={{ color: req.urgency === "High" ? "#ef4444" : "#f59e0b" }}>
                  {req.urgency === "High" ? <AlertTriangle size={16} /> : null} {req.urgency}
                </span>
              </td>
              <td>{req.status}</td>
              <td>{req.timestamp}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function BloodInventory() {
  const [bloodStock] = useState([
    { type: "A+", units: 10, status: "Adequate" },
    { type: "B+", units: 8, status: "Low" },
    { type: "O-", units: 6, status: "Critical" },
    { type: "AB+", units: 12, status: "Adequate" }
  ]);

  return (
    <motion.div 
      className={styles.dashboard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2>Blood Inventory Status</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Units Available</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bloodStock.map((blood, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <td><Droplet size={16} /> {blood.type}</td>
              <td>{blood.units}</td>
              <td>
                <span style={{ 
                  color: blood.status === "Critical" ? "#ef4444" : 
                         blood.status === "Low" ? "#f59e0b" : "#22c55e"
                }}>
                  {blood.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default BloodBankPage;