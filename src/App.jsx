import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/bookings" element={<div>My Bookings</div>} />
        <Route path="/partner-register" element={<div>Partner Register</div>} />
      </Routes>
    </Router>
  );
};

export default App;
