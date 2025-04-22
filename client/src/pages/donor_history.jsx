import styles from "./donor_history.module.css";
import { Calendar, MapPin, Printer } from "lucide-react";

const DonationHistory = () => {
  const donations = [
    {
      id: 1,
      date: "March 10, 2025",
      location: "Apollo Hospital, Visakhapatnam",
    },
    {
      id: 2,
      date: "January 22, 2025",
      location: "KIMS Hospital, Hyderabad",
    },
    {
      id: 3,
      date: "December 5, 2024",
      location: "Govt Hospital, Chennai",
    },
  ];

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.title}>Donation History</h2>
      <ul className={styles.donationList}>
        {donations.map((donation) => (
          <li key={donation.id} className={styles.donationItem}>
            <div className={styles.infoRow}>
              <Calendar size={18} /> {donation.date}
            </div>
            <div className={styles.infoRow}>
              <MapPin size={18} /> {donation.location}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <button className={styles.actionButton} onClick={handlePrint}>
          <Printer size={18} /> Print
        </button>
      </div>
    </div>
  );
};

export default DonationHistory;