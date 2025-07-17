import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// ✅ Home Page
function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Tech Driven Transit</h1>
        <p>Reliable, Fast, and Secure Logistics Services</p>
        <button onClick={() => (window.location.href = "/bookings")}>Book Now</button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Quick and reliable load transport at your convenience.</p>
        </div>
        <div className="feature-card">
          <h3>Track Loads</h3>
          <p>Real-time updates on your deliveries anytime.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>Yoco-powered seamless transactions.</p>
        </div>
      </section>
    </div>
  );
}

// ✅ My Bookings Page
function Bookings() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nPickup: ${pickup}\nDrop-off: ${dropoff}\nDate: ${date}\nTime: ${time}\nDetails: ${details}`);
  };

  return (
    <div className="form-container">
      <h2>Book Your Load</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Pickup Location" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
        <input type="text" placeholder="Drop-off Location" value={dropoff} onChange={(e) => setDropoff(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <textarea placeholder="Load Details" value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>
        <button type="submit">Confirm Booking</button>
      </form>
      <a
        href="https://pay.yoco.com/" // Replace with your Yoco Pay Link
        target="_blank"
        rel="noopener noreferrer"
        className="yoco-button"
      >
        Pay with Yoco
      </a>
    </div>
  );
}

// ✅ Contact Support Page
function Contact() {
  return (
    <div className="contact">
      <h2>Contact Support</h2>
      <p>Need help? Reach us via:</p>
      <p>Email: support@loadngologistics.com</p>
      <p>Phone: +27 81 123 4567</p>
      <p>Or click the WhatsApp button below!</p>
    </div>
  );
}

// ✅ WhatsApp Floating Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27811234567" // Replace with your WhatsApp number
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      💬
    </a>
  );
}

// ✅ Main App Component
function App() {
  return (
    <Router>
      <header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Load-N-Go Logo" />
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
        <Route path="/bookings" element={<Bookings />} />
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
