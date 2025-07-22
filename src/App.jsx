import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PartnerRegister from "./pages/PartnerRegister";  // ✅ NEW IMPORT

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner-register" element={<PartnerRegister />} /> {/* ✅ NEW ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;
