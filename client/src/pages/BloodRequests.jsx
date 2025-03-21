import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BloodBankLayout from '../layouts/BloodBankLayout';
import styles from './BloodBankPage.module.css';
import { Calendar, MapPin, Phone, User, Search } from 'lucide-react';

const BloodRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const requests = [
    {
      id: 1,
      patientName: "John Doe",
      bloodType: "A+",
      units: 2,
      urgency: "High",
      hospital: "City Hospital",
      location: "123 Main St",
      contactNumber: "+1 234-567-8900",
      requestDate: "2024-03-15",
      status: "Pending"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      bloodType: "O-",
      units: 3,
      urgency: "Medium",
      hospital: "General Hospital",
      location: "456 Oak Ave",
      contactNumber: "+1 234-567-8901",
      requestDate: "2024-03-14",
      status: "Fulfilled"
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      bloodType: "B+",
      units: 1,
      urgency: "Critical",
      hospital: "Emergency Care Center",
      location: "789 Pine St",
      contactNumber: "+1 234-567-8902",
      requestDate: "2024-03-15",
      status: "Processing"
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && request.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <BloodBankLayout>
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
            Blood Requests
          </motion.h1>

          <div className={styles.searchWrapper}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className={styles.searchBar}
                  style={{ paddingLeft: '40px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className={styles.searchBar} 
                style={{ width: 'auto' }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="fulfilled">Fulfilled</option>
              </select>
            </div>
          </div>

          <div className={styles.dashboard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient Details</th>
                  <th>Blood Type</th>
                  <th>Units</th>
                  <th>Hospital</th>
                  <th>Contact</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <motion.tr 
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <User size={16} /> {request.patientName}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <Calendar size={14} /> {request.requestDate}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        background: 'var(--nav-bg)',
                        color: 'var(--text-primary)'
                      }}>
                        {request.bloodType}
                      </span>
                    </td>
                    <td>{request.units} units</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div>{request.hospital}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <MapPin size={14} /> {request.location}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={16} /> {request.contactNumber}
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        background: request.status === 'Pending' ? '#fff3cd' :
                                   request.status === 'Fulfilled' ? '#d1e7dd' :
                                   '#cfe2ff',
                        color: request.status === 'Pending' ? '#856404' :
                               request.status === 'Fulfilled' ? '#0f5132' :
                               '#084298'
                      }}>
                        {request.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </BloodBankLayout>
  );
};

export default BloodRequests;