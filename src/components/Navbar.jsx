import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Truck, Box, Car, Archive, Globe, Package, Bike } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
          🚚 Load-N-Go
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-orange-400">Home</Link>

          {/* Our Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center hover:text-orange-400">
              Our Services ▾
            </button>
            {servicesOpen && (
              <div className="absolute top-8 left-0 bg-white text-black rounded-lg shadow-xl p-4 w-80 animate-fadeIn">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 hover:text-blue-700">
                    <Box size={18} /> Furniture/Home removals & delivery
                  </li>
                  <li className="flex items-center gap-2 hover:text-blue-700">
                    <Package size={18} /> Office & Home Furniture & appliance delivery
                  </li>
                  <li className="flex items-center gap-2 hover:text-blue-700">
                    <Globe size={18} /> International removals
                  </li>
                  <li className="flex items-center gap-2 hover:text-blue-700">
                    <Archive size={18} /> Storage services
                  </li>
                  <li className="flex items-center gap-2 hover:text-blue-700">
                    <Car size={18} /> Car transport
                  </li>
                  <li className="flex items-center gap-2 hover:text-blue-700">
                    <Bike size={18} /> Motorcycle transport
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Link to="/bookings" className="hover:text-orange-400">My Bookings</Link>
          <Link to="/contact" className="hover:text-orange-400">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 text-white flex flex-col space-y-4 p-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <button
            className="flex justify-between"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Our Services {servicesOpen ? "▲" : "▼"}
          </button>
          {servicesOpen && (
            <ul className="pl-4 space-y-2">
              <li>Furniture/Home removals</li>
              <li>Office & Home delivery</li>
              <li>International removals</li>
              <li>Storage services</li>
              <li>Car transport</li>
              <li>Motorcycle transport</li>
            </ul>
          )}
          <Link to="/bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
