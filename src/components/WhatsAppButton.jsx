import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/27600000000" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600"
    >
      WhatsApp
    </a>
  );
};

export default WhatsAppButton;
