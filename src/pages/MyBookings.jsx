const MyBookings = () => {
  const bookings = [
    { id: 1, date: "2025-07-25", time: "09:00 AM", status: "Confirmed" },
    { id: 2, date: "2025-07-30", time: "02:00 PM", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">My Bookings</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white shadow-lg rounded-xl p-6 border">
            <h3 className="text-xl font-semibold mb-2">Booking #{b.id}</h3>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p className={`font-bold ${b.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
              Status: {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
