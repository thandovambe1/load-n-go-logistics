import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold">Load-N-Go</h1>
      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
