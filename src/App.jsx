import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaPhoneAlt, FaHome, FaCarSide, FaMotorcycle, FaBox } from "react-icons/fa";

const services = [
  { icon: <FaHome />, title: "Furniture/Home Removals", desc: "Safe and reliable home relocation." },
  { icon: <FaBox />, title: "Appliance Delivery", desc: "We deliver heavy appliances hassle-free." },
  { icon: <FaTruck />, title: "Office Furniture Delivery", desc: "Move your office efficiently." },
  { icon: <FaCarSide />, title: "Car Transport", desc: "We transport vehicles securely." },
  { icon: <FaMotorcycle />, title: "Motorcycle Transport", desc: "Fast and safe bike delivery." },
];

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* ✅ NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-orange-500">Load-N-Go</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-orange-500">Home</a>
            <a href="#services" className="hover:text-orange-500">Services</a>
            <a href="#contact" className="hover:text-orange-500">Contact</a>
          </nav>
          <a
            href="#book"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* ✅ HERO SECTION */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center text-white"
      >
        <img
          src="/assets/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div classNam
