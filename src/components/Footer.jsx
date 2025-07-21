const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white text-center py-6 mt-10">
      <p className="text-lg font-semibold">Load-N-Go Logistics © {new Date().getFullYear()}</p>
      <p className="text-sm mt-2">Contact us: support@loadngologistics.com | +27 82 123 4567</p>
      <div className="flex justify-center space-x-4 mt-3">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img src="/facebook-icon.png" alt="Facebook" className="h-6 w-6" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img src="/instagram-icon.png" alt="Instagram" className="h-6 w-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
