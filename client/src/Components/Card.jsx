import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Card.module.css";
import { Clock, MapPin, Droplet, AlertTriangle } from "lucide-react";

const Card = ({ request }) => {
  const { medicalFacility, bloodGroup, unitsRequired, eLevel, latitude, longitude } = request;

  const getELevelColor = (level) => {
    switch(level) {
      case 1: return "green"; 
      case 2: return "orange";
      case 3: return "red";
      default: return "green";
    }
  };

  const getELevelText = (level) => {
    switch(level) {
      case 1: return "Normal";
      case 2: return "Moderate";
      case 3: return "Urgent";
      default: return "Normal";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.mapContainer}>
        <MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={false} className={styles.map}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>{medicalFacility}</strong><br />
              <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <h3 className={styles.medicalFacility}>{medicalFacility}</h3>
          <span 
            className={styles.eLevel} 
            style={{ backgroundColor: getELevelColor(eLevel) }}
          >
            <AlertTriangle size={16} />
            {getELevelText(eLevel)}
          </span>
        </div>

        <div className={styles.info}>
          <p>
            <Droplet size={20} />
            <strong>Blood Group:</strong> {bloodGroup}
          </p>
          <p>
            <Clock size={20} />
            <strong>Units Required:</strong> {unitsRequired}
          </p>
          <p>
            <MapPin size={20} />
            <strong>Distance:</strong> 2.5 km
          </p>
        </div>
        
        <button className={styles.donateBtn}>
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Card;