import React from "react";
import { motion } from "framer-motion";
import { FaTruckMoving, FaCouch, FaMotorcycle, FaCar } from "react-icons/fa";

const services = [
  { icon: <FaTruckMoving size={40} />, title: "Furniture Delivery", desc: "Fast and safe home/office furniture delivery." },
  { icon: <FaCouch size={40} />, title: "Home & Office Moves", desc: "We make moving stress-free and quick." },
  { icon: <FaMotorcycle size={40} />, title: "Motorcycle Transport", desc: "Secure transport for your bikes." },
  { icon: <FaCar size={40} />, title: "Car Transport", desc: "Safe and reliable vehicle transport." },
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
        <p className="text-gray-600 mt-2">Flexible options tailored for your needs</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="text-orange-500 mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
