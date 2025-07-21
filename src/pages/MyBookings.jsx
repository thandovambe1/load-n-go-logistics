import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const createBooking = async () => {
    if (!pickup || !destination || !date || !time) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        pickup,
        destination,
        date,
        time,
        createdAt: new Date(),
      });
      alert("Booking added!");
      setPickup("");
      setDestination("");
      setDate("");
      setTime("");
      fetchBookings();
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  if (!user) {
    return <p className="p-8 text-center">Please log in to view bookings.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>

      {/* Booking Form */}
      <div className="border p-4 rounded mb-6">
        <h2 className="text-xl font-bold mb-2">Create New Booking</h2>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 mb-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 mb-2 w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={createBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Booking
        </button>
      </div>

      {/* Bookings List */}
      <h2 className="text-xl font-bold mb-2">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="border-b py-2">
              {booking.pickup} → {booking.destination} on {booking.date} at {booking.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
