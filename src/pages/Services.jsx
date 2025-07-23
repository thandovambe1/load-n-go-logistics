import React from "react";

const Services = () => {
  const services = [
    "Furniture/Home removals & delivery",
    "Office & Home Furniture & appliance delivery",
    "International removals",
    "Storage services",
    "Car transport",
    "Motorcycle transport"
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Our Services</h1>
      <ul className="grid md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
