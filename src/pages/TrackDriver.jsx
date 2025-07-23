import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import LiveMap from "../components/LiveMap";

const TrackDriver = () => {
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "drivers", "driver1"), (docSnap) => {
      if (docSnap.exists()) {
        setDriverLocation(docSnap.data());
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Track Your Driver</h1>
      <LiveMap driverLocation={driverLocation} />
    </div>
  );
};

export default TrackDriver;
