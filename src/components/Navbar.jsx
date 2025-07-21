import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-16 w-auto rounded-lg shadow-md" />
          <h1 className="text-2xl font-extrabold text-orange-600">Load-N-Go</h1>
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-semibold">
          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="hover:text-orange-500 transition">
              My Bookings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-orange-500 transition">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/login" className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
