import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBars, FaTimes, FaWhatsapp, FaTruck, FaHome } from "react-icons/fa";

// Pages
const Home = () => (
  <div className="text-center p-8">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold text-white drop-shadow-lg"
    >
      Move Anything, Anytime
    </motion.h1>
    <p className="text-lg text-gray-200 mt-4">
      Affordable, Reliable & Fast Logistics at Your Fingertips
    </p>
    <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg">
      Book a Delivery
    </button>
    <div className="mt-10">
      <img src="/assets/hero.jpg" alt="Hero" className="rounded-2xl shadow-lg mx-auto max-w-md" />
    </div>
  </div>
);

const FAQs = () => {
  const faqs = [
    { q: "How do I book a delivery?", a: "Simply click 'Book a Delivery' and fill out the form." },
    { q: "What areas do you cover?", a: "We cover nationwide and cross-border deliveries." },
    { q: "How can I track my delivery?", a: "Use the Track page with your booking ID for live updates." },
  ];
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-4 rounded-lg mb-3"
        >
          <p className="font-semibold">{item.q}</p>
          <p className="text-gray-300">{item.a}</p>
        </motion.div>
      ))}
    </div>
  );
};

const TrackDriver = () => {
  const center = { lat: -33.918861, lng: 18.4233 }; // Example: Cape Town
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Live Driver Tracking</h2>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "12px" }}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

// Navbar
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg fixed w-full z-50">
      <Link to="/" className="text-2xl font-bold text-orange-500">Load-N-Go</Link>
      <div className="hidden md:flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/track">Track</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/profile">My Profile</Link>
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 bg-gray-800 w-full p-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/track" onClick={() => setOpen(false)}>Track</Link>
          <Link to="/faqs" onClick={() => setOpen(false)}>FAQs</Link>
          <Link to="/profile" onClick={() => setOpen(false)}>My Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/track" element={<TrackDriver />} />
          </Routes>
        </div>
        {/* WhatsApp Support */}
        <a
          href="https://wa.me/27700000000"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600"
          target="_blank"
        >
          <FaWhatsapp size={28} color="#fff" />
        </a>
      </div>
    </Router>
  );
}
