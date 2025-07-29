import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchDeliveries(firebaseUser.uid);
      } else {
        setUser(null);
        setDeliveries([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDeliveries = async (uid) => {
    try {
      const q = query(collection(db, 'deliveries'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (deliveryDate) => {
    const now = new Date();
    const dDate = new Date(deliveryDate);
    if (dDate < now) return 'Past';
    if (dDate.toDateString() === now.toDateString()) return 'Today';
    return 'Upcoming';
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!user)
    return (
      <div className="text-center py-10">
        <p className="text-xl">Please log in to view your dashboard.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.displayName || user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="border rounded-xl p-4 shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{delivery.serviceType}</h2>
            <p>
              <strong>Pickup:</strong> {delivery.pickupLocation}
            </p>
            <p>
              <strong>Destination:</strong> {delivery.destination}
            </p>
            <p>
              <strong>Date:</strong> {new Date(delivery.pickupTime).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Status: {getStatus(delivery.pickupTime)}
            </p>
          </div>
        ))}
      </div>
      {deliveries.length === 0 && <p className="text-center mt-10">No deliveries found.</p>}
    </div>
  );
}
