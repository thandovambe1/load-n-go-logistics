import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db, auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

export default function RequestDeliveryForm() {
const [user] = useAuthState(auth)
const [formData, setFormData] = useState({
pickupAddress: "",
dropoffAddress: "",
scheduledDate: "",
scheduledTime: "",
price: "",
})
const [loading, setLoading] = useState(false)
const [successMsg, setSuccessMsg] = useState("")

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
e.preventDefault()
if (!user) return alert("You must be logged in.")

try {
  setLoading(true)
  await addDoc(collection(db, "delivery_requests"), {
    ...formData,
    userId: user.uid,
    status: "pending",
    createdAt: serverTimestamp(),
  })
  setFormData({
    pickupAddress: "",
    dropoffAddress: "",
    scheduledDate: "",
    scheduledTime: "",
    price: "",
  })
  setSuccessMsg("Request submitted!")
} catch (err) {
  console.error(err)
  alert("Failed to submit request.")
} finally {
  setLoading(false)
}
}

return (
<form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded-xl shadow">
<h2 className="text-xl font-bold">Book a Delivery</h2>
<input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} placeholder="Pickup Address" className="w-full p-2 border rounded" required />
<input type="text" name="dropoffAddress" value={formData.dropoffAddress} onChange={handleChange} placeholder="Dropoff Address" className="w-full p-2 border rounded" required />
<input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="w-full p-2 border rounded" required />
<input type="time" name="scheduledTime" value={formData.scheduledTime} onChange={handleChange} className="w-full p-2 border rounded" required />
<input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (ZAR)" className="w-full p-2 border rounded" required />
<button type="submit" disabled={loading} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
{loading ? "Submitting..." : "Submit Request"}
</button>
{successMsg && <p className="text-green-600">{successMsg}</p>}
</form>
)
}