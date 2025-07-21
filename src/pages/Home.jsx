import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }
    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      pickup,
      dropoff,
      date,
      time,
      createdAt: new Date()
    });
    alert("Booking confirmed!");
    setPickup("");
    setDropoff("");
    setDate("");
    setTime("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Drop-off Location"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Confirm Booking
      </button>
    </div>
  );
}
