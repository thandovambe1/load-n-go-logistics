// src/pages/Home.jsx
import React from 'react';
import hero from '../assets/hero.jpg';

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="relative w-full h-3/4">
        <img src={hero} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-4">Load-N-Go Logistics</h1>
          <p className="text-xl">Fast, Reliable & Affordable Deliveries</p>
        </div>
      </div>
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold mb-4">Book Your Delivery Now</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg">
          Get Started
        </button>
      </div>
    </div>
  );
}
