import React from "react";
import Hero from "../components/Hero"; // ✅ Import the Hero component

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <Hero />

      {/* ✅ You can add more sections below if needed */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Load-N-Go Logistics</h2>
        <p className="mt-4 text-gray-600">
          Your trusted partner for fast, safe, and reliable deliveries.
        </p>
      </section>
    </div>
  );
};

export default Home;
