import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/logo.png" alt="Load-N-Go" className="h-10" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>

            {/* Our Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="text-gray-700 hover:text-orange-500 font-medium flex items-center"
              >
                Our Services ▾
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200">
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Furniture/Home Removals</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Office & Appliance Delivery</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">International Removals</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Storage Services</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Car Transport</Link>
                  <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Motorcycle Transport</Link>
                </div>
              )}
            </div>

            <Link to="/partner-register" className="text-gray-700 hover:text-orange-500 font-medium">
              Become a Driver
            </Link>

            {/* Book Now Button */}
            <Link
              to="#"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-500"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Our Services ▾
          </button>
          {servicesOpen && (
            <div className="pl-4">
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Furniture/Home Removals</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Office & Appliance Delivery</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">International Removals</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Storage Services</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Car Transport</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Motorcycle Transport</Link>
            </div>
          )}
          <Link to="/partner-register" className="block px-4 py-2 hover:bg-gray-100">
            Become a Driver
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 text-center rounded-md"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
