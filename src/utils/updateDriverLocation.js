import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const startDriverTracking = (driverId = "driver1") => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      await setDoc(doc(db, "drivers", driverId), {
        lat: latitude,
        lng: longitude,
        timestamp: Date.now(),
      });
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};
