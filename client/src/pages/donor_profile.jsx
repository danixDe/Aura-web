import { useState, useEffect } from "react";
import styles from "./donor_profile.module.css";
import { Calendar, MapPin, Mail, Phone } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const DonorProfile = () => {
  const { userEmail } = useAuth();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    const fetchDonorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/donors/${userEmail}`);
        setDonor(response.data);
      } catch (error) {
        console.error("Error fetching donor data:", error.message);
      }
    };

    fetchDonorData();
  }, [userEmail]);

  if (!donor || !donor.dName) {
    return (
      <div className={styles.loading}>
        Loading donor information...
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className={styles.profileImage} 
        />
        <h2>{donor.dName}</h2>
        <p>{donor.blood_group} Blood Group</p>

        <div className={styles.infoRow}>
          <Mail size={18} /> {donor.email}
        </div>
        <div className={styles.infoRow}>
          <Phone size={18} /> {donor.phone}
        </div>
        <div className={styles.infoRow}>
          <MapPin size={18} /> {donor.permanent_location}
        </div>
        <div className={styles.stats}>
          <p><strong>--</strong> Donations</p>
          <p><Calendar size={18} /> Last: --</p>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
