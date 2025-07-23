import React from "react";
import heroImage from "../assets/hero.jpg"; // Make sure you have hero.jpg in src/assets

const Hero = () => {
  return (
    <section className="bg-gray-100 flex flex-col md:flex-row items-center justify-between px-8 py-12">
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Move Anything, Anytime!
        </h1>
        <p className="text-gray-700 mb-6">
          Fast, reliable, and affordable logistics at your fingertips.
        </p>
        <button className="bg-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600">
          Book a Delivery
        </button>
      </div>
      <div className="mt-6 md:mt-0">
        <img src={heroImage} alt="Hero" className="rounded-2xl shadow-lg w-full max-w-md" />
      </div>
    </section>
  );
};

export default Hero;
