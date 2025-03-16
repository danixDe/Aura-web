import React, { useState } from "react";
import { Menu, X, Home, ClipboardList, Users, Settings, PlusCircle, Info } from "lucide-react";
import styles from "./BloodBankPage.module.css";

function BloodBankPage() {
  document.title = "AuraHP Blood Bank";
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRequestOpen, setRequestOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Aura HP Blood Bank</h1>
          <button className={styles.postRequestBtn} onClick={() => setRequestOpen(true)}>
            <PlusCircle size={20} /> Post a Request
          </button>
          <Dashboard />
          <BloodInventory />
        </div>
      </div>
      {isRequestOpen && <RequestPopup closePopup={() => setRequestOpen(false)} />}
    </div>
  );
}

function Navbar({ toggleSidebar }) {
  return (
    <div className={styles.navbar}>
      <button className={styles.menuBtn} onClick={toggleSidebar}>
        <Menu size={28} />
      </button>
      <h2>Aura HP Blood Bank</h2>
    </div>
  );
}

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={toggleSidebar}>
        <X size={24} />
      </button>
      <ul>
        <li><Home size={20} /> <a href="#">Dashboard</a></li>
        <li><ClipboardList size={20} /> <a href="#">Blood Requests</a></li>
        <li><Users size={20} /> <a href="#">Donors List</a></li>
        <li><Settings size={20} /> <a href="#">Settings</a></li>
        <li><Info size={20} /> About</li>
      </ul>
    </div>
  );
}

function RequestPopup({ closePopup }) {
  const [formData, setFormData] = useState({
    bloodGroup: "A+",
    units: "",
    urgency: "Urgent",
    facilityName: "City Hospital",
    address: "123 Main St, Visakhapatnam",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={closePopup}>×</button>
        <h2>Post a Blood Request</h2>
        <label>Blood Group</label>
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Number of Units</label>
        <input type="number" name="units" value={formData.units} onChange={handleChange} placeholder="Enter units" />

        <label>Urgency Level</label>
        <select name="urgency" value={formData.urgency} onChange={handleChange}>
          {["Urgent", "Within 24 hours", "Within 3 days", "Within a week"].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <label>Medical Facility</label>
        <input type="text" value={formData.facilityName} disabled />

        <label>Address</label>
        <input type="text" value={formData.address} disabled />

        <button className={styles.submitBtn}>Request</button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [requests] = useState([
    { bloodType: "O+", urgency: "High", status: "Pending" },
    { bloodType: "A-", urgency: "Medium", status: "Fulfilled" }
  ]);

  return (
    <div className={styles.dashboard}>
      <h2>Blood Requests</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Urgency</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req.bloodType}</td>
              <td>{req.urgency}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BloodInventory() {
  const [bloodStock] = useState([
    { type: "A+", units: 10 },
    { type: "B+", units: 8 },
    { type: "O-", units: 6 },
  ]);

  return (
    <div>
      <h2>Available Blood Units</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {bloodStock.map((blood, index) => (
            <tr key={index}>
              <td>{blood.type}</td>
              <td>{blood.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BloodBankPage;
