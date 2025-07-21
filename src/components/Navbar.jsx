import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Load-N-Go" className="h-12 w-12 rounded-full" />
        <h1 className="text-2xl font-bold text-orange-500">Load-N-Go</h1>
      </div>
      <div className="space-x-6">
        <Link to="/" className="hover:text-orange-400">Home</Link>
        <Link to="/bookings" className="hover:text-orange-400">My Bookings</Link>
        <Link to="/login" className="hover:text-orange-400">Login</Link>
        <Link to="/profile" className="hover:text-orange-400">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
