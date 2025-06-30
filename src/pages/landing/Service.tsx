import React from "react";
import { FaSpa, FaTruck, FaStar, FaHandsHelping } from "react-icons/fa";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    id: 1,
    title: "Perawatan Kulit Profesional",
    description:
      "Dapatkan perawatan terbaik untuk kulit sehat dan bercahaya dari ahli kecantikan kami.",
    icon: <FaSpa className="text-pink-600 text-4xl" />,
  },
  {
    id: 2,
    title: "Pengiriman Cepat",
    description: "Layanan pengiriman cepat dan aman ke seluruh Indonesia.",
    icon: <FaTruck className="text-pink-600 text-4xl" />,
  },
  {
    id: 3,
    title: "Produk Berkualitas",
    description:
      "Kami hanya menyediakan produk asli dengan kualitas terbaik dan terpercaya.",
    icon: <FaStar className="text-pink-600 text-4xl" />,
  },
  {
    id: 4,
    title: "Konsultasi Gratis",
    description:
      "Tersedia konsultasi gratis dengan tim kami untuk memilih produk yang tepat.",
    icon: <FaHandsHelping className="text-pink-600 text-4xl" />,
  },
];

const ServicePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-10">
        Layanan Kami
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-center text-pink-800 mb-2">
              {service.title}
            </h3>
            <p className="text-center text-pink-700">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
