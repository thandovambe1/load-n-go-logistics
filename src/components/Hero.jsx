import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: "url('/assets/hero.jpg')" }} // ✅ Make sure hero.jpg exists in public/assets
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-white px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Fast & Reliable Logistics
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Moving your goods safely and on time, every time.
        </p>
        <button
          onClick={() => navigate("/booking")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-lg shadow-lg transition duration-300"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
