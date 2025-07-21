import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Load-N-Go Logistics</h1>
      <div className="flex space-x-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>

        {/* Services Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="hover:underline">Our Services ▾</button>
          {showDropdown && (
            <div className="absolute top-8 bg-white text-black rounded shadow-lg w-72 z-50">
              <ul>
                <li className="p-2 hover:bg-gray-200">Furniture/Home removals & delivery</li>
                <li className="p-2 hover:bg-gray-200">Office & Home Furniture & appliance delivery</li>
                <li className="p-2 hover:bg-gray-200">International removals</li>
                <li className="p-2 hover:bg-gray-200">Storage services</li>
                <li className="p-2 hover:bg-gray-200">Car transport</li>
                <li className="p-2 hover:bg-gray-200">Motorcycle transport</li>
              </ul>
            </div>
          )}
        </div>

        <Link to="/bookings" className="hover:underline">My Bookings</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
