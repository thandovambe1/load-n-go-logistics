import React from "react";
import heroImage from "../assets/hero.jpg";

export default function Home() {
  return (
    <div className="w-full">
      <div className="relative">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-[550px] object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Your Logistics Partner</h1>
          <p className="text-xl mb-6">Reliable. Affordable. On Time.</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold">
            Book a Load Now
          </button>
        </div>
      </div>
    </div>
  );
}
