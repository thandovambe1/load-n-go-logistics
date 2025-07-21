export default function MyBookings() {
  const bookings = [
    { id: 1, date: "2025-07-21", time: "10:00 AM", status: "Confirmed" },
    { id: 2, date: "2025-07-23", time: "2:00 PM", status: "Pending" },
  ];

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="p-4 bg-white rounded-lg shadow">
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
