import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };
    fetchBookings();
  }, [user]);

  if (!user) return <p>Please log in to view your bookings.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="border p-3 rounded">
              <p><strong>Pickup:</strong> {b.pickup}</p>
              <p><strong>Drop-off:</strong> {b.dropoff}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
