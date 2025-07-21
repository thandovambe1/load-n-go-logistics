import React from "react";
import heroImage from "../assets/hero.jpg";

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative">
        <img src={heroImage} alt="Hero" className="w-full h-[500px] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Load-N-Go Logistics</h1>
          <p className="mt-4 text-xl">Your trusted partner for fast & reliable deliveries</p>
          <a
            href="/bookings"
            className="mt-6 bg-orange-500 px-6 py-3 rounded text-white font-semibold hover:bg-orange-600"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
