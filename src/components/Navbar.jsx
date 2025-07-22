import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const services = [
    "Furniture/Home Removals & Delivery",
    "Office & Home Furniture & Appliance Delivery",
    "International Removals",
    "Storage Services",
    "Car Transport",
    "Motorcycle Transport"
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Load-N-Go
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-orange-500"
            >
              Our Services <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {service}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-orange-500">Contact</Link>

          {/* Book Now Button */}
          <Link
            to="/book"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block hover:text-orange-500">Home</Link>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center w-full text-left hover:text-orange-500"
          >
            Our Services <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {isDropdownOpen && (
            <div className="ml-4">
              {services.map((service, index) => (
                <a
                  key={index}
                  href="#"
                  className="block py-1 hover:text-orange-500"
                >
                  {service}
                </a>
              ))}
            </div>
          )}
          <Link to="/contact" className="block hover:text-orange-500">Contact</Link>
          <Link
            to="/book"
            className="block bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
