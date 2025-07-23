import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-primary text-white p-4 shadow-lg flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-accent">Load-N-Go</Link>

      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-accent">Home</Link>
        <div className="relative">
          <button
            className="hover:text-accent flex items-center"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Services ▼
          </button>
          {servicesOpen && (
            <div className="absolute top-full mt-2 bg-white text-black rounded shadow-lg w-56">
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Furniture & Home Delivery</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Office Delivery</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Car Transport</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Motorcycle Transport</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Storage Services</Link>
            </div>
          )}
        </div>
        <Link to="/bookings" className="hover:text-accent">My Bookings</Link>
        <Link to="/partner-register" className="hover:text-accent">Partner Register</Link>
        <Link to="/contact-support" className="hover:text-accent">Contact</Link>
      </div>

      {/* Mobile Menu */}
      <button
        className="md:hidden text-accent text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-primary p-4 md:hidden">
          <Link to="/" className="block py-2 hover:text-accent">Home</Link>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="block w-full text-left py-2 hover:text-accent"
          >
            Services ▼
          </button>
          {servicesOpen && (
            <div className="bg-white text-black rounded shadow-lg">
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Furniture & Home Delivery</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Office Delivery</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Car Transport</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Motorcycle Transport</Link>
              <Link to="/services" className="block px-4 py-2 hover:bg-gray-200">Storage Services</Link>
            </div>
          )}
          <Link to="/bookings" className="block py-2 hover:text-accent">My Bookings</Link>
          <Link to="/partner-register" className="block py-2 hover:text-accent">Partner Register</Link>
          <Link to="/contact-support" className="block py-2 hover:text-accent">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
