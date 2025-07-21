import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* ✅ Navbar */}
          <Navbar />

          {/* ✅ Main Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          {/* ✅ WhatsApp Floating Button */}
          <a
            href="https://wa.me/27831234567" // ✅ Replace with your WhatsApp number
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬
          </a>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
