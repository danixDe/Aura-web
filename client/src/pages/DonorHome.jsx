import React, { useEffect, useState } from "react";
import Card from "./Card";

const DonorHome = () => {
  const [requests, setRequests] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location: ", error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = [
        {
          id: 1,
          medicalFacility: "City Hospital",
          bloodGroup: "A+",
          unitsRequired: 3,
          eLevel: 5,
          latitude: 12.9716,
          longitude: 77.5946,
        },
        {
          id: 2,
          medicalFacility: "Metro Health Center",
          bloodGroup: "O-",
          unitsRequired: 2,
          eLevel: 2,
          latitude: 13.0359,
          longitude: 77.5970,
        },
      ];
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const sortedRequests = [...requests].sort((a, b) => a.eLevel - b.eLevel);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/blood-donation-bg.jpg')" }}
    >
      <nav className="bg-white shadow-md p-4 flex justify-between">
        <h1 className="text-red-600 text-2xl font-bold">AuraHP</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Donate Now</button>
      </nav>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Emergency Blood Requests Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedRequests.map((request) => (
            <Card key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorHome;