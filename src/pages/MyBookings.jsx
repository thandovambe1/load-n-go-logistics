import { useState } from "react"
import emailjs from "@emailjs/browser"

export default function MyBookings() {
  const [formData, setFormData] = useState({
    pickup_location: "",
    destination: "",
    pickup_time: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send(
        "service_gdzxaeo",     // ← replace with your EmailJS service ID
        "template_hk9853t",    // ← replace with your template ID
        formData,
        "GaBDQxhP0ASdqxt-I"      // ← replace with your EmailJS public key
      )
      .then(
        () => {
          alert("Booking request sent successfully!")
          setFormData({
            pickup_location: "",
            destination: "",
            pickup_time: "",
          })
        },
        (error) => {
          alert("Error sending booking: " + error.text)
        }
      )
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Now</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="pickup_location"
          placeholder="Pickup Location"
          value={formData.pickup_location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="pickup_time"
          value={formData.pickup_time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Submit Booking
        </button>
      </form>
    </div>
  )
}
