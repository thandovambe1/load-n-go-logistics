import React, { useState } from "react";

const faqs = [
  {
    question: "How do I book a delivery?",
    answer: "Simply click the 'Book Now' button on our homepage and fill out the details.",
  },
  {
    question: "Can I track my driver in real-time?",
    answer: "Yes! Use our Track Driver feature to see your driver's location and ETA.",
  },
  {
    question: "What areas do you cover?",
    answer: "We currently operate across South Africa, including all major cities.",
  },
  {
    question: "How can I pay?",
    answer: "You can pay using Yoco (card payments) and other secure methods we offer.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
