import React from "react";

const ContactSupport = () => {
  const whatsappNumber = "27810554566"; // Replace with your number

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Support</h1>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        Chat on WhatsApp
      </a>
      <div className="mt-6">
        <h2 className="text-xl mb-4">Send us a message</h2>
        <form className="space-y-4 max-w-md">
          <input type="text" placeholder="Your Name" className="border p-2 w-full" />
          <input type="email" placeholder="Your Email" className="border p-2 w-full" />
          <textarea placeholder="Message" className="border p-2 w-full"></textarea>
          <button type="submit" className="bg-accent text-white px-6 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSupport;
