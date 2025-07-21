const WhatsAppButton = () => {
  const phoneNumber = "27810554566";
  const message = "Hello! I need assistance with Load-N-Go Logistics.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-xl flex items-center space-x-2 font-bold text-lg"
    >
      <img src="/whatsapp-icon.png" alt="WhatsApp" className="h-6 w-6" />
      <span>Chat</span>
    </a>
  );
};

export default WhatsAppButton;
