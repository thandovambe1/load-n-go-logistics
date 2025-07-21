import React, { useState } from "react";

const Bookings = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="pt-24 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Book a Delivery</h2>
      <form className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
        <label className="block mb-4">
          <span className="text-gray-700">Choose Date:</span>
          <input
            type="date"
            className="block w-full mt-2 border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Choose Time:</span>
          <input
            type="time"
            className="block w-full mt-2 border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Bookings;
