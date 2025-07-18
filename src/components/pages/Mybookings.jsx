import React, { useState } from "react";

const MyBookings = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">Book a Delivery</h2>
      <input
        type="date"
        className="border p-2 mr-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        className="border p-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button className="bg-[var(--accent)] text-white px-4 py-2 rounded ml-4">
        Pay with Yoco
      </button>
    </div>
  );
};

export default MyBookings;
