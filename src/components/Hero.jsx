import React from "react";
import heroImage from "../assets/hero.jpg"; // Make sure hero.jpg exists in src/assets
import FAQ from "../components/FAQ";

const Hero = () => {
  return (
    <div>
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-orange-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Load-N-Go</h1>
        <p className="text-lg mb-6">Fast, reliable logistics solutions at your fingertips</p>
        <a href="/services" className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold hover:bg-gray-100">
          Book Now
        </a>
      </section>

      {/* ✅ Add FAQ Below */}
      <FAQ />
    </div>
  );
};

export default Hero;
