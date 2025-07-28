import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';  // Adjust import if your firebase config is elsewhere
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user and deliveries
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/login'); // Redirect if not logged in
      } else {
        setUser(currentUser);
        // Fetch deliveries for this user
        try {
          const deliveriesRef = collection(db, 'deliveries');
          const q = query(deliveriesRef, where('userId', '==', currentUser.uid));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDeliveries(data);
        } catch (error) {
          console.error("Error fetching deliveries:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const now = new Date();

  const upcoming = deliveries.filter(d => new Date(d.pickupTime) > now);
  const past = deliveries.filter(d => new Date(d.pickupTime) <= now);

  // Cancel delivery function (example, deletes from Firestore)
  async function cancelDelivery(id) {
    if (window.confirm("Are you sure you want to cancel this delivery?")) {
      try {
        await deleteDoc(doc(db, 'deliveries', id));
        setDeliveries((prev) => prev.filter(d => d.id !== id));
      } catch (err) {
        alert("Failed to cancel: " + err.message);
      }
    }
  }

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">My Dashboard</h1>

      <div className="bg-white p-4 rounded shadow mb-8">
        <p className="text-lg font-semibold">Welcome, {user?.email}</p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Deliveries</h2>
        {upcoming.length ? (
          upcoming.map(del => (
            <div key={del.id} className="bg-gray-100 rounded p-4 mb-3 shadow-sm">
              <p><strong>Pickup:</strong> {del.pickup}</p>
              <p><strong>Destination:</strong> {del.destination}</p>
              <p><strong>Pickup Time:</strong> {new Date(del.pickupTime).toLocaleString()}</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => cancelDelivery(del.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Edit functionality coming soon!')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No upcoming deliveries.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Past Deliveries</h2>
        {past.length ? (
          past.map(del => (
            <div key={del.id} className="bg-gray-100 rounded p-4 mb-3 shadow-sm">
              <p><strong>Pickup:</strong> {del.pickup}</p>
              <p><strong>Destination:</strong> {del.destination}</p>
              <p><strong>Pickup Time:</strong> {new Date(del.pickupTime).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No past deliveries.</p>
        )}
      </section>
    </div>
  );
}
