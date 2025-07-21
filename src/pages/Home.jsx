import React from "react";
import heroImage from "../assets/hero.jpg";
import logo from "../assets/logo.jpg";

const Home = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <img src={logo} alt="Load-N-Go Logo" className="w-40 mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold">Welcome to Load-N-Go Logistics</h1>
      <p className="text-lg mt-4">Fast, Reliable, and Affordable Delivery Services</p>
      <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold">
        Book a Delivery
      </button>
    </div>
  );
};

export default Home;
