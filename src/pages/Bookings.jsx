import { useState } from "react";

export default function Bookings() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Schedule Your Delivery</h2>
      <form className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <button className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600 w-full">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
