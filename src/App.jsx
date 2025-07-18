import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
