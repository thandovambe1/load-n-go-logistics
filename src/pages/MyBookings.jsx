import React, { useState } from "react";

const Bookings = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = () => {
    alert(`Booking confirmed for ${date} at ${time}`);
  };

  return (
    <div className="page bookings">
      <h1>Book a Delivery</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleBooking}>Confirm Booking</button>
      <button className="pay-btn">Pay with Yoco</button>
    </div>
  );
};

export default Bookings;
