import React, { useState, useEffect } from "react";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Produk", href: "/produkiklin" },
    { name: "About", href: "/aboutiklin" },
    { name: "Contact", href: "/contactiklin" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 backdrop-blur-md ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 select-none">
          <img src="/Logo2.png" alt="Iklin Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
          Iklin.online
          </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300">
            {navItems.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-medium"
              >
                {name}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 flex items-center cursor-pointer transition-colors"
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
              <span
                className={`absolute left-1 text-yellow-400 transition-opacity duration-300 ${
                  darkMode ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
              >
                ☀️
              </span>
              <span
                className={`absolute right-1 text-indigo-400 transition-opacity duration-300 ${
                  darkMode ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              >
                🌙
              </span>
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Toggle Menu"
            >
              {!isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="block text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
