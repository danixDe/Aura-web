import React, { useState } from "react";
import { Menu, X, Home, ClipboardList, Users, Settings } from "lucide-react";
import styles from "./BloodBankPage.module.css";

function BloodBankPage() {
  document.title = "AuraHP Blood Bank";
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Aura HP Blood Bank</h1>
          <Dashboard />
          <BloodInventory />
        </div>
      </div>
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
      </ul>
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
