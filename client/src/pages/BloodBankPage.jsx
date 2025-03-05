import React, { useState } from "react";
import Bloodunit from "./Bloodunit";
import styles from "./BloodBankPage.module.css"
function BloodBankPage() {
    document.title="AuraHP blood bank"
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Aura HP</h1>
        {/* <BloodInventory /> */}
        <Bloodunit/>
      </div>
    </div>
  );
}


function BloodInventory() {
  const [bloodStock, setBloodStock] = useState([
    { type: "A+", units: 10 },
    { type: "A-", units: 5 },
    { type: "B+", units: 8 },
    { type: "B-", units: 4 },
    { type: "O+", units: 12 },
    { type: "O-", units: 6 },
    { type: "AB+", units: 3 },
    { type: "AB-", units: 2 },
  ]);

  return (
    <div>
      <h2>Available Blood Units</h2>
      <table className={styles["blood-table"]}>
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
