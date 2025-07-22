import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<h1 className="text-center mt-10">Home Page</h1>} />
          <Route path="/bookings" element={<h1 className="text-center mt-10">My Bookings</h1>} />
          <Route path="/contact" element={<h1 className="text-center mt-10">Contact Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
