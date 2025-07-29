import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'deliveries'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeliveries(results);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (id) => {
    await updateDoc(doc(db, 'deliveries', id), {
      status: 'Cancelled',
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'deliveries', id));
  };

  const filteredDeliveries = deliveries.filter((d) => {
    if (filter === 'all') return true;
    return d.status === filter;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2 font-semibold">Filter:</label>
          <select
            className="border px-2 py-1 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">Logged in as: {user?.email}</p>
      </div>

      {filteredDeliveries.length === 0 ? (
        <p>No deliveries found.</p>
      ) : (
        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white shadow p-4 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-1 mb-2 md:mb-0">
                <p><strong>Pickup:</strong> {delivery.pickup}</p>
                <p><strong>Destination:</strong> {delivery.destination}</p>
                <p><strong>Time:</strong> {delivery.pickupTime}</p>
                <p><strong>Status:</strong> <span className="text-blue-600">{delivery.status}</span></p>
              </div>
              <div className="flex gap-2">
                {delivery.status !== 'Cancelled' && (
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleCancel(delivery.id)}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 transition"
                  onClick={() => handleDelete(delivery.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
