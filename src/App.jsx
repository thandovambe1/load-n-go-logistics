import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// ✅ WhatsApp Button Component
const WhatsAppButton = () => (
  <a
    href="https://wa.me/27600000000" // Replace with your WhatsApp number
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#25D366",
      color: "white",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      zIndex: "1000"
    }}
  >
    💬
  </a>
);

// ✅ Home Page
const Home = () => (
  <section className="hero">
    <h1>Tech Driven Transit</h1>
    <p>Reliable, Fast, and Secure Logistics Services</p>
    <button style={{ marginRight: "10px" }}>Book Now</button>
    <button style={{ background: "black", color: "white" }}>Pay with Yoco</button>
  </section>
);

// ✅ My Bookings Page
const MyBookings = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    loadDetails: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nPickup: ${formData.pickup}\nDrop-off: ${formData.dropoff}\nDate: ${formData.date}\nTime: ${formData.time}`);
  };

  return (
    <div className="booking-form">
      <h2>Book Your Load</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="pickup" placeholder="Pickup Location" onChange={handleChange} required />
        <input type="text" name="dropoff" placeholder="Drop-off Location" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <textarea name="loadDetails" placeholder="Load Details" onChange={handleChange}></textarea>
        <button type="submit">Confirm Booking</button>
        <button type="button" style={{ background: "black", color: "white", marginTop: "10px" }}>
          Pay with Yoco
        </button>
      </form>
    </div>
  );
};

// ✅ Contact Support Page
const Contact = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>Contact Support</h2>
    <p>Need help? Reach out to us via WhatsApp or email: support@loadngo.com</p>
  </div>
);

function App() {
  return (
    <Router>
      <header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Load-N-Go Logo" style={{ height: "50px" }} />
          <h1 style={{ marginLeft: "10px" }}>LOAD-N-GO</h1>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/contact">Contact Support</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <WhatsAppButton />

      <footer>
        <p>© {new Date().getFullYear()} Load-N-Go Logistics. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
