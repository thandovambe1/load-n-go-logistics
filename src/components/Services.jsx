// src/components/Services.jsx
import { motion } from "framer-motion";

const services = [
  { title: "Furniture Removals", description: "Safe and reliable", icon: "🏠" },
  { title: "Appliance Delivery", description: "Heavy appliances handled", icon: "📦" },
];

export default function Services() {
  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">Our Services</h2>
      <div className="space-y-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white shadow p-4 rounded-md flex space-x-4"
          >
            <div className="text-2xl">{s.icon}</div>
            <div>
              <h3 className="font-bold">{s.title}</h3>
              <p>{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
