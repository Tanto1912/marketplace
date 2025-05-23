import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  Bubbles,
  Sparkles,
  SprayCan,
  Droplets,
  Info,
  Phone,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-pink-200 via-white to-pink-100/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-600 tracking-tight">
          I-KLIN
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-pink-800 font-medium relative">
          <a
            href="/"
            className="flex items-center gap-1 hover:text-pink-600 transition-all duration-200 ease-in-out"
          >
            <Home size={18} /> Home
          </a>

          {/* Product as simple link */}
          <a
            href="produk"
            className="flex items-center gap-1 hover:text-pink-600 transition-all duration-200 ease-in-out"
          >
            <ShoppingBag size={18} /> Product
          </a>

          <a
            href="layanan"
            className="flex items-center gap-1 hover:text-pink-600 transition-all duration-200 ease-in-out"
          >
            <Sparkles size={18} /> Services
          </a>
          <a
            href="artikel"
            className="flex items-center gap-1 hover:text-pink-600 transition-all duration-200 ease-in-out"
          >
            <Bubbles size={18} /> Article
          </a>
          <a
            href="tentang"
            className="flex items-center gap-1 hover:text-pink-600 transition-all duration-200 ease-in-out"
          >
            <Info size={18} /> About
          </a>
          <a
            href="kontak"
            className="flex items-center gap-1 hover:text-pink-600 transition-all duration-200 ease-in-out"
          >
            <Phone size={18} /> Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-pink-600" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Remove Desktop Dropdown */}

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white/80 backdrop-blur-md text-pink-800 px-6 py-4 shadow-inner space-y-4 overflow-hidden rounded-b-2xl"
        >
          <a
            href="#"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <Home size={18} /> Home
          </a>

          {/* Product as simple link */}
          <a
            href="produk"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <ShoppingBag size={18} /> Product
          </a>

          <a
            href="layanan"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <Sparkles size={18} /> Services
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <Bubbles size={18} /> Article
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <Info size={18} /> About
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <Phone size={18} /> Contact
          </a>
        </motion.div>
      )}
    </header>
  );
}
