import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaPhoneAlt, FaHome, FaCarSide, FaMotorcycle, FaBox } from "react-icons/fa";

const services = [
  { icon: <FaHome />, title: "Furniture/Home Removals", desc: "Safe and reliable home relocation." },
  { icon: <FaBox />, title: "Appliance Delivery", desc: "We deliver heavy appliances hassle-free." },
  { icon: <FaTruck />, title: "Office Furniture Delivery", desc: "Move your office efficiently." },
  { icon: <FaCarSide />, title: "Car Transport", desc: "We transport vehicles securely." },
  { icon: <FaMotorcycle />, title: "Motorcycle Transport", desc: "Fast and safe bike delivery." },
];

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* ✅ NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-orange-500">Load-N-Go</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-orange-500">Home</a>
            <a href="#services" className="hover:text-orange-500">Services</a>
            <a href="#contact" className="hover:text-orange-500">Contact</a>
          </nav>
          <a
            href="#book"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* ✅ HERO SECTION */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center text-white"
      >
        <img
          src="/assets/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          className="relative z-10 max-w-xl px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Fast & Reliable Logistics
          </h2>
          <p className="mb-6 text-lg md:text-xl">
            Move anything, anywhere, anytime with Load-N-Go.
          </p>
          <a
            href="#book"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            Get a Quote
          </a>
        </motion.div>
      </section>

      {/* ✅ SERVICES SECTION */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800">Our Services</h3>
          <p className="text-gray-600 mt-2">We cover all your transport needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-orange-500 text-4xl mb-4">{service.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ CONTACT SECTION */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
          <form className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg p-3"
            />
            <textarea
              placeholder="Your Message"
              className="w-full border rounded-lg p-3"
            ></textarea>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg w-full">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} Load-N-Go Logistics. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
