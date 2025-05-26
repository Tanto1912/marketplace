import { FaWhatsapp } from "react-icons/fa";
import React from "react";

const WhatsAppFloating: React.FC = () => {
  return (
    <div className="fixed bottom-15 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4 transition">
      {/* Nama */}
      <div className="text-sm font-semibold whitespace-nowrap">
        CECEP MUBAROCK
      </div>

      {/* Logo WhatsApp */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        title="Hubungi via WhatsApp"
        className="bg-white text-green-500 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <FaWhatsapp className="w-5 h-5" />
      </a>

      {/* Nomor Telepon */}
      <div className="text-sm font-semibold whitespace-nowrap">
        0812-3456-7890
      </div>
    </div>
  );
};

export default WhatsAppFloating;
