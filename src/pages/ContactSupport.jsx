import React from "react";

const ContactSupport = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Have questions? Reach out to us at:
      </p>
      <p className="text-lg font-semibold">📧 support@load-n-go.com</p>
      <p className="text-lg font-semibold">📞 +27 81 055 4566</p>
      <a
        href="https://wa.me/27810554566"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
};

export default Contact;

