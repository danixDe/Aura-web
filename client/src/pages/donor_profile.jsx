import { useState, useContext, useEffect } from "react";
import styles from "./donor_profile.module.css";
import { Calendar, MapPin, Mail, Phone } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
const DonorProfile = () => {

  const {user} = useContext(AuthContext);
  const [donor, setDonor] = useState(null);

  useEffect(()=>{
    const fetchDonorData = async()=>{
      try{
        const res = await axios.get(`http://localhost:5000/api/donors/${user.email}`);
        setDonor(res.data);
      }
      catch(err){
        console.error("Error fetching the donor data:", err.message);
      }
    };
    if(user) fetchDonorData()
  },[user])
if(!donor) return <>Loading....</>
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <img src="https://via.placeholder.com/150" alt="Profile" className={styles.profileImage} />
          <h2>{donor.dName}</h2>
          <p>{donor.blood_group} Blood Group</p>
          <div className={styles.infoRow}><Mail size={18} /> {donor.email}</div>
          <div className={styles.infoRow}><Phone size={18} /> {donor.phone}</div>
          <div className={styles.infoRow}><MapPin size={18} /> {donor.permanent_location}</div>
          <div className={styles.stats}>
            <p><strong>--</strong> Donations</p>
            <p><Calendar size={18} /> Last: --</p>
          </div>
        </div>
      </div>
    );
  };


export default DonorProfile;
