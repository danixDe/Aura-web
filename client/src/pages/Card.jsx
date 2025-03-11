import React from "react";
import { MapPin } from "lucide-react";

const Card = ({ request }) => {
  const { medicalFacility, bloodGroup, unitsRequired, eLevel, latitude, longitude } = request;
  
  const getCardColor = (level) => {
    const shades = ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#d32f2f"];
    return shades[level - 1] || "#ffebee";
  };

  return (
    <div className="rounded-2xl shadow-md p-4" style={{ backgroundColor: getCardColor(eLevel) }}>
      <div className="flex">
        <div className="w-1/3 flex items-center justify-center border-r">
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-700 hover:text-red-900"
          >
            <MapPin size={30} />
          </a>
        </div>
        {/* Details Section (2/3 of the card) */}
        <div className="w-2/3 pl-4">
          <h3 className="text-lg font-bold">{medicalFacility}</h3>
          <p className="text-sm">Blood Group: <span className="font-semibold">{bloodGroup}</span></p>
          <p className="text-sm">Units Required: <span className="font-semibold">{unitsRequired}</span></p>
          <p className="text-sm">Emergency Level: <span className="font-semibold">{eLevel}</span></p>
          <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800">Donate Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
