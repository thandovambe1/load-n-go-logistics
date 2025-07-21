import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-6 py-4 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/src/assets/logo.jpg"
          alt="Load-N-Go Logo"
          className="w-14 h-14 rounded-full border-2 border-orange-500"
        />
        <h1 className="text-2xl font-bold text-orange-500">Load-N-Go</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-lg font-medium">
        <li>
          <Link
            to="/"
            className="text-gray-800 hover:text-orange-500 transition duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/bookings"
            className="text-gray-800 hover:text-orange-500 transition duration-300"
          >
            My Bookings
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="text-gray-800 hover:text-orange-500 transition duration-300"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition duration-300"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
