import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* WhatsApp Floating Button */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
