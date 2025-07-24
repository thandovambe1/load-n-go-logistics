import React from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Hero Section Component
const Hero = () => (
  <motion.section
    className="relative h-screen flex items-center justify-center text-center text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Background Image */}
    <img
      src="/assets/hero.jpg"
      alt="Hero Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>

    {/* Content */}
    <div className="relative z-10 px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Move Anything, Anytime
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl mb-6 max-w-xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Your trusted partner for fast, reliable, and affordable logistics.
      </motion.p>
      <Link to="/book">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 text-lg font-semibold"
        >
          Book Now
        </motion.button>
      </Link>
    </div>
  </motion.section>
);

// About Page
const About = () => (
  <motion.div
    className="p-10 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-semibold text-blue-900">About Us</h2>
    <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
      Load-N-Go is your trusted partner for furniture removals, deliveries, and more.
      We simplify moving so you can focus on what matters most.
    </p>
  </motion.div>
);

// Booking Page
const Book = () => (
  <motion.div
    className="p-10 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-semibold text-blue-900">Book a Ride</h2>
    <p className="text-gray-700 mt-4">Fill in your details and let us handle the rest.</p>
  </motion.div>
);

function App() {
  return (
    <Router>
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-md text-white z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="text-xl font-bold text-orange-400">
          Load-N-Go
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/about" className="hover:text-orange-400">About</Link>
          <Link to="/book" className="hover:text-orange-400">Book</Link>
        </div>
      </motion.nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
      </Routes>

      {/* Footer */}
      <motion.footer
        className="text-center py-4 bg-gray-100 text-gray-600 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        © 2025 Load-N-Go Logistics | All Rights Reserved
      </motion.footer>
    </Router>
  );
}

export default App;

  );
}
