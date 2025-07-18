import React from "react";

const Contact = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">Contact Support</h2>
      <form className="flex flex-col space-y-4 max-w-md">
        <input type="text" placeholder="Your Name" className="border p-2" />
        <input type="email" placeholder="Your Email" className="border p-2" />
        <textarea placeholder="Message" className="border p-2" rows="4"></textarea>
        <button className="bg-[var(--accent)] text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
