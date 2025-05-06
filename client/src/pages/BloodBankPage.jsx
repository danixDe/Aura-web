import React,{useState} from 'react';
import styles from './BloodBankPage.module.css';
import BloodRequests from './BloodRequests.jsx';
import BloodRequestForm from './BloodRequestForm.jsx';
import Sidebar from '../Components/Side.jsx';
import Analytics from './Analytics.jsx';

import {
  Plus, Droplet, Activity, AlertTriangle, Users, Clock
} from 'lucide-react';

function BloodBankPage(){
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm);
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      <main className={styles.mainContent}>
        <Dashboard 
          activeView={activeView} 
          onCreateRequest={toggleRequestForm} 
        />
        {showRequestForm && (
          <BloodRequestForm onClose={toggleRequestForm} />
        )}
      </main>
    </div>
  );
}

const mockRequests = [
  { 
    id: 1, 
    blood_group: 'O+', 
    units: 3, 
    urgency: 'Urgent', 
    type: 'live_blood',
    created_at: '2023-06-15',
    patientName: 'John Doe',
    patientAge: 45
  },
  { 
    id: 2, 
    blood_group: 'AB-', 
    units: 2, 
    urgency: 'Within 24 hours', 
    type: 'store_blood',
    created_at: '2023-06-14',
    patientName: 'Jane Smith',
    patientAge: 32
  },
  { 
    id: 3, 
    blood_group: 'A+', 
    units: 1, 
    urgency: 'Within a week', 
    type: 'live_blood',
    created_at: '2023-06-13',
    patientName: 'Mike Johnson',
    patientAge: 28
  }
];

const Dashboard = ({ activeView, onCreateRequest }) => {
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'bloodRequests':
        return <BloodRequests onCreateRequest={onCreateRequest} />;
      case 'donors':
        return <div className={styles.viewContainer}><h2>Donors Management</h2></div>;
      case 'analytics':
        return <div className={styles.viewContainer}><h2>Analytics</h2></div>;
      case 'settings':
        return <div className={styles.viewContainer}><h2>Settings</h2></div>;
      case 'about':
        return <div className={styles.viewContainer}><h2>About</h2></div>;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    return (
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>Facility Dashboard</h1>
            <p>Welcome back, Medical Center</p>
          </div>
          <button 
            className={styles.newRequestButton} 
            onClick={onCreateRequest}
          >
            <Plus size={18} />
            New Blood Request
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <AlertTriangle size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>5</h3>
              <p>Urgent Requests</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Droplet size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>12</h3>
              <p>Total Requests</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Activity size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>85%</h3>
              <p>Fulfillment Rate</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>28</h3>
              <p>Available Donors</p>
            </div>
          </div>
        </div>

        <div className={styles.recentRequests}>
          <div className={styles.sectionHeader}>
            <h2>Recent Blood Requests</h2>
            <button 
              className={styles.viewAllButton}
              onClick={() => onViewChange('bloodRequests')}
            >
              View All
            </button>
          </div>
          
          <div className={styles.requestsTable}>
            <div className={styles.tableHeader}>
              <div>Blood Group</div>
              <div>Units</div>
              <div>Urgency</div>
              <div>Patient</div>
              <div>Request Date</div>
              <div>Type</div>
            </div>
            
            {mockRequests.map(request => (
              <div key={request.id} className={styles.tableRow}>
                <div className={styles.bloodGroup}>
                  <span 
                    className={`${styles.bloodBadge} ${styles[`blood${request.blood_group.replace('+', 'pos').replace('-', 'neg')}`]}`}
                  >
                    {request.blood_group}
                  </span>
                </div>
                <div>{request.units}</div>
                <div>
                  <span className={`${styles.urgencyBadge} ${styles[request.urgency.toLowerCase().replace(/\s+/g, '')]}`}>
                    {request.urgency}
                  </span>
                </div>
                <div>{request.patientName}, {request.patientAge}</div>
                <div className={styles.requestDate}>
                  <Clock size={14} />
                  {request.created_at}
                </div>
                <div>{request.type === 'live_blood' ? 'Live Donation' : 'Blood Bank'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return renderView();
};

export default BloodBankPage;