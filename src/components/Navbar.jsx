import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "27810554566";
  const message = "Hello, I need assistance with Load-N-Go Logistics.";

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        padding: "15px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
      }}
    >
      <img
        src="/assets/whatsapp.png"
        alt="WhatsApp"
        style={{ width: "40px", height: "40px" }}
      />
    </div>
  );
};

export default WhatsAppButton;
