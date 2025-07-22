import React from "react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('/src/assets/hero.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Fast, Reliable & Affordable Logistics</h1>
        <p className="text-lg md:text-xl mb-6">
          From Furniture Removals to International Shipping — We’ve Got You Covered!
        </p>
        <a
          href="/book-now"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Book Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
