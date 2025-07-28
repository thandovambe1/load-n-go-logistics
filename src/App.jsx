// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing page components
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";

// Importing reusable components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<MyBookings />} />
            {/* You can add more routes here like Contact, About, etc. */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
