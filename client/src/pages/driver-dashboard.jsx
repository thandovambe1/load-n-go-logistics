import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { app } from "@/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DriverDashboard() {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const auth = getAuth(app)
  const db = getFirestore(app)

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          setError("User not authenticated")
          setLoading(false)
          return
        }

        const q = query(
          collection(db, "delivery_requests"),
          where("driverId", "==", user.uid)
        )
        const querySnapshot = await getDocs(q)
        const deliveryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setDeliveries(deliveryList)
      } catch (err) {
        console.error("Error fetching deliveries:", err)
        setError("Failed to fetch deliveries")
      } finally {
        setLoading(false)
      }
    }

    fetchDeliveries()
  }, [auth, db])

  if (loading) return <p>Loading deliveries...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Deliveries</h2>
      {deliveries.length === 0 ? (
        <p>No deliveries assigned to you yet.</p>
      ) : (
        <div className="grid gap-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardContent className="p-4">
                <p><strong>Pickup:</strong> {delivery.pickupLocation}</p>
                <p><strong>Destination:</strong> {delivery.destination}</p>
                <p><strong>Time:</strong> {new Date(delivery.pickupTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {delivery.status || "Pending"}</p>
                <div className="mt-2">
                  <Button variant="outline">Update Status</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
