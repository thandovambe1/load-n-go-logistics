import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MyBookings = () => {
  const { user } = useAuth();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [bookings, setBookings] = useState([]);

  const createBooking = async () => {
    if (!pickup || !destination || !date || !time || !service) {
      alert("Please fill in all fields");
      return;
    }

    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      pickup,
      destination,
      date,
      time,
      service,
      createdAt: new Date(),
    });

    fetchBookings();
  };

  const fetchBookings = async () => {
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>

      {/* Booking Form */}
      <div className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Create New Booking</h3>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        {/* Service Dropdown */}
        <select
          className="border p-2 mb-2 w-full"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Select Service</option>
          <option value="Furniture/Home removals & delivery">Furniture/Home removals & delivery</option>
          <option value="Office & Home Furniture & appliance delivery">Office & Home Furniture & appliance delivery</option>
          <option value="International removals">International removals</option>
          <option value="Storage services">Storage services</option>
          <option value="Car transport">Car transport</option>
          <option value="Motorcycle transport">Motorcycle transport</option>
        </select>

        <button
          onClick={createBooking}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>

      {/* Display Bookings */}
      <h3 className="text-lg font-semibold mb-2">Your Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id} className="border-b py-2">
            <strong>{booking.service}</strong> → {booking.pickup} → {booking.destination} on {booking.date} at {booking.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;

