import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase'; // adjust this import if needed
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(
          collection(db, 'deliveries'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDeliveries(data);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const now = new Date();

  const upcoming = deliveries.filter(d => new Date(d.pickupTime) > now);
  const past = deliveries.filter(d => new Date(d.pickupTime) <= now);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">My Dashboard</h1>
      <div className="bg-white p-4 shadow rounded mb-6">
        <p className="text-lg font-medium">Welcome, {user?.email}</p>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">Upcoming Deliveries</h2>
      {upcoming.length > 0 ? (
        upcoming.map(del => (
          <div key={del.id} className="bg-gray-100 p-3 mb-2 rounded">
            <p><strong>Pickup:</strong> {del.pickup}</p>
            <p><strong>Destination:</strong> {del.destination}</p>
            <p><strong>Time:</strong> {new Date(del.pickupTime).toLocaleString()}</p>
            <div className="mt-2 flex gap-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cancel</button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
            </div>
          </div>
        ))
      ) : <p className="text-gray-500">No upcoming deliveries.</p>}

      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Past Deliveries</h2>
      {past.length > 0 ? (
        past.map(del => (
          <div key={del.id} className="bg-gray-100 p-3 mb-2 rounded">
            <p><strong>Pickup:</strong> {del.pickup}</p>
            <p><strong>Destination:</strong> {del.destination}</p>
            <p><strong>Time:</strong> {new Date(del.pickupTime).toLocaleString()}</p>
          </div>
        ))
      ) : <p className="text-gray-500">No past deliveries.</p>}
    </div>
  );
}
