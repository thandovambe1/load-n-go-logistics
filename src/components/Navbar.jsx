import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Load-N-Go" className="w-14 h-auto" />
          <span className="text-xl font-bold text-gray-800">Load-N-Go</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-orange-500 font-medium">Home</a>

          {/* Our Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-orange-500 font-medium"
            >
              Our Services <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg w-64 py-2 animate-fadeIn">
                {[
                  "Furniture/Home Removals & Delivery",
                  "Office & Home Furniture & Appliance Delivery",
                  "International Removals",
                  "Storage Services",
                  "Car Transport",
                  "Motorcycle Transport"
                ].map((service, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 hover:bg-orange-100 text-gray-700"
                  >
                    {service}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="/my-bookings" className="hover:text-orange-500 font-medium">My Bookings</a>
          <a href="/profile" className="hover:text-orange-500 font-medium">Profile</a>

          {/* Book Now Button */}
          <a
            href="/book"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
          >
            Our Services <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {isDropdownOpen && (
            <div className="bg-gray-50 px-4">
              {[
                "Furniture/Home Removals & Delivery",
                "Office & Home Furniture & Appliance Delivery",
                "International Removals",
                "Storage Services",
                "Car Transport",
                "Motorcycle Transport"
              ].map((service, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-2 py-1 hover:text-orange-500"
                >
                  {service}
                </a>
              ))}
            </div>
          )}
          <a href="/my-bookings" className="block px-4 py-2 hover:bg-gray-100">My Bookings</a>
          <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
          <a
            href="/book"
            className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 m-4 rounded-lg"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
