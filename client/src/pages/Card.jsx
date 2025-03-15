import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Card.module.css";

const Card = ({ request }) => {
  const { medicalFacility, bloodGroup, unitsRequired, eLevel, latitude, longitude } = request;

  const getELevelColor = (level) => {
    const shades = ["#dfe6e9", "#fdecea", "#fab7b7", "#ff6b6b", "#e63946", "#c91f37", "#8b0000"];
    return shades[level - 1] || "#dfe6e9";
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
          <span className={styles.eLevel} style={{ backgroundColor: getELevelColor(eLevel) }}>
            E-Level {eLevel}
          </span>
        </div>

        <div className={styles.info}>
          <p><strong>Blood Group:</strong> {bloodGroup}</p>
          <p><strong>Units Required:</strong> {unitsRequired}</p>
        </div>
        <button className={styles.donateBtn}>Donate Now</button>
      </div>
    </div>
  );
};

export default Card;
