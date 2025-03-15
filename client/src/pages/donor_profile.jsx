import React, { useState } from "react";
import styles from "./donor_profile.module.css";
import { Calendar, MapPin, Mail, Phone, Edit3, Save } from "lucide-react";

const DonorProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe99",
    bloodGroup: "O+",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    location: "Visakhapatnam, India",
    donations: 5,
    lastDonation: "March 10, 2025",
    image: "https://via.placeholder.com/150" 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    setUser(editedUser);
    setIsEditing(false);
    await fetch("/api/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
    });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img src={user.image} alt="Profile" className={styles.profileImage} />
        {isEditing ? (
          <input type="text" name="name" value={editedUser.name} onChange={handleChange} className={styles.inputField} />
        ) : (
          <h2>{user.name}</h2>
        )}
        <p>@{user.username}</p>
        {isEditing ? (
          <input type="text" name="bloodGroup" value={editedUser.bloodGroup} onChange={handleChange} className={styles.inputField} />
        ) : (
          <p className={styles.bloodGroup}>{user.bloodGroup} Blood Group</p>
        )}
        <div className={styles.infoRow}><Mail size={18} /> {isEditing ? <input type="email" name="email" value={editedUser.email} onChange={handleChange} className={styles.inputField} /> : user.email}</div>
        <div className={styles.infoRow}><Phone size={18} /> {isEditing ? <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} className={styles.inputField} /> : user.phone}</div>
        <div className={styles.infoRow}><MapPin size={18} /> {isEditing ? <input type="text" name="location" value={editedUser.location} onChange={handleChange} className={styles.inputField} /> : user.location}</div>
        <div className={styles.stats}>
          <p><strong>{user.donations}</strong> Donations</p>
          <p><Calendar size={18} /> Last: {user.lastDonation}</p>
        </div>
        <button className={styles.editButton} onClick={() => isEditing ? saveChanges() : setIsEditing(true)}>
          {isEditing ? <Save size={18} /> : <Edit3 size={18} />} {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default DonorProfile;
