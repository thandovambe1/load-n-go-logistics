import React from "react";
import heroImage from "../assets/hero.jpg";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <h1 className="text-5xl font-bold drop-shadow-lg">Fast & Reliable Logistics</h1>
        <p className="mt-4 text-lg drop-shadow-md">Book your delivery in minutes!</p>
        <a
          href="/bookings"
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Book Now
        </a>
      </div>

      {/* Features Section */}
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Load-N-Go?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            🚚 <h3 className="text-xl font-semibold">Fast Delivery</h3>
            <p>Get your goods delivered quickly and safely.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            💰 <h3 className="text-xl font-semibold">Affordable</h3>
            <p>Competitive pricing with no hidden fees.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            📍 <h3 className="text-xl font-semibold">Live Tracking</h3>
            <p>Track your delivery in real-time on your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
