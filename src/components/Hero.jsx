import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToBooking = () => {
    const section = document.getElementById("book");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center text-white">
      {/* Background Image */}
      <img
        src="/assets/hero.jpg"
        alt="Load-N-Go Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-700 opacity-70"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Move Anything, Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Fast, reliable, and affordable logistics at your fingertips.
        </p>
        <button
          onClick={scrollToBooking}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Book Now
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
