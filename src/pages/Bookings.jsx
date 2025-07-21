import React, { useState } from "react";

const Bookings = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nPickup: ${pickup}\nDropoff: ${dropoff}\nDate: ${date}\nTime: ${time}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Delivery</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full p-3 border rounded mb-4"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Drop-off Location"
          className="w-full p-3 border rounded mb-4"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-3 border rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="w-full p-3 border rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded font-bold hover:bg-orange-600">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Bookings;
