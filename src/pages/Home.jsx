import React from "react";
import heroImage from "../assets/hero.jpg";

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[100vh]">
        <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">Load-N-Go Logistics</h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl">
            Fast, reliable deliveries. Book your trip now.
          </p>
          <a
            href="/bookings"
            className="mt-8 bg-orange-500 px-8 py-4 rounded-xl text-xl font-bold hover:bg-orange-600 transition"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
