import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import MyBookings from "./pages/MyBookings";
import PartnerRegister from "./pages/PartnerRegister";
import ContactSupport from "./pages/ContactSupport";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/partner-register" element={<PartnerRegister />} />
        <Route path="/contact-support" element={<ContactSupport />} />
      </Routes>
    </Router>
  );
};

export default App;
