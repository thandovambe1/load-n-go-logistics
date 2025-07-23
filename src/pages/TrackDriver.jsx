import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import LiveMap from "../components/LiveMap";

const TrackDriver = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [destination] = useState({ lat: -33.9249, lng: 18.4241 }); // Example destination
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "drivers", "driver1"), (docSnap) => {
      if (docSnap.exists()) {
        setDriverLocation(docSnap.data());
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (driverLocation) {
      calculateETA(driverLocation, destination);
    }
  }, [driverLocation]);

  const calculateETA = async (origin, dest) => {
    const originStr = `${origin.lat},${origin.lng}`;
    const destStr = `${dest.lat},${dest.lng}`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&key=AIzaSyARfpJ1uTkjnuVrk79Go0PdeYESyirNco0`
    );
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      setEta(data.routes[0].legs[0].duration.text);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Track Your Driver</h1>
      {eta && <p className="text-xl mb-4">Estimated Arrival: {eta}</p>}
      <LiveMap driverLocation={driverLocation} destination={destination} />
    </div>
  );
};

export default TrackDriver;
