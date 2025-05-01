import React from 'react';
import { User, Award, Edit } from 'lucide-react';
import styles from './donor_profile.module.css';
import DonationHistory from './donor_history';

const DonorProfile = () => {
  const donorData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City, Country",
    bloodType: "O+",
    lastDonation: "2024-02-15",
    totalDonations: 5,
    donorLevel: "Silver",
    joinDate: "2023-06-15"
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicSection}>
          <div className={styles.profilePic}>
            <User size={40} />
          </div>
          <button className={styles.editButton}>
            <Edit size={16} />
            Edit Profile
          </button>
        </div>
        <div className={styles.bloodBadge}>{donorData.bloodType}</div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <User size={20} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.infoContent}>
            <p><strong>Name:</strong> {donorData.name}</p>
            <p><strong>Email:</strong> {donorData.email}</p>
            <p><strong>Phone:</strong> {donorData.phone}</p>
            <p><strong>Address:</strong> {donorData.address}</p>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <Award size={20} />
            <h3>Donation Status</h3>
          </div>
          <div className={styles.infoContent}>
            <p><strong>Donor Level:</strong> {donorData.donorLevel}</p>
            <p><strong>Total Donations:</strong> {donorData.totalDonations}</p>
            <p><strong>Last Donation:</strong> {donorData.lastDonation}</p>
            <p><strong>Member Since:</strong> {donorData.joinDate}</p>
          </div>
        </div>
      </div>

      <div className={styles.achievementsSection}>
        <h3>Achievements</h3>
        <div className={styles.achievementGrid}>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className={styles.achievementCard}>
              <Award size={24} />
              <h4>First Time Donor</h4>
              <p>Completed first blood donation</p>
            </div>
          ))}
        </div>
      </div>
    <DonationHistory/>
    </div>
  );
};

export default DonorProfile;