import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<h1 className="text-center text-3xl">Home Page</h1>} />
          <Route path="/book" element={<h1 className="text-center text-3xl">Booking Page</h1>} />
          <Route path="/contact" element={<h1 className="text-center text-3xl">Contact Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
