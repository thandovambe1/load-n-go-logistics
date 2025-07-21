import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Load-N-Go Logo" className="w-14 h-14 rounded-full" />
        <h1 className="text-2xl font-bold text-orange-600">Load-N-Go Logistics</h1>
      </div>
      <ul className="flex space-x-6 text-gray-800 font-semibold">
        <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
        <li><Link to="/bookings" className="hover:text-orange-500">My Bookings</Link></li>
        <li><Link to="/profile" className="hover:text-orange-500">Profile</Link></li>
        <li><Link to="/contact" className="hover:text-orange-500">Contact</Link></li>
      </ul>
    </nav>
  );
}
