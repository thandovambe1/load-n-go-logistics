import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto rounded-md" />
          <h1 className="ml-3 text-xl font-bold text-orange-600">Load-N-Go</h1>
        </div>

        {/* Links */}
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="hover:text-orange-500">
              My Bookings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-orange-500">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
