import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  Home,
  User,
  Users,
  Settings,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Helper untuk gabung class tailwind
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Daftar menu sidebar
const navItems = [
  { name: "Landing Page", path: "/", icon: Home },
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Manajemen Produk", path: "/dashboard/products", icon: Package },
  { name: "Manajemen User", path: "/dashboard/manageusers", icon: Users },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 64 },
  };

  return (
    <motion.div
      animate={isOpen ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className="h-screen bg-gradient-to-b from-[#1a001f] via-[#330033] to-[#1a001f] border-r border-pink-800 shadow-[0_0_20px_#ff00cc] fixed z-50 flex flex-col transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h1 className="text-xl font-bold text-pink-400 tracking-wider drop-shadow-[0_0_4px_#ff00cc]">
            IKLIN-APP
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-pink-400 hover:text-white transition"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-pink-200 transition-all",
                "hover:bg-pink-700/30 hover:text-white",
                "hover:shadow-[0_0_10px_#ff00cc]",
                isActive && "bg-pink-600 text-white shadow-[0_0_10px_#ff00cc]"
              )
            }
          >
            <Icon className="w-5 h-5 text-pink-300 group-hover:text-white transition" />
            {isOpen && <span className="truncate">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-pink-700 text-white hover:bg-pink-800 hover:shadow-[0_0_12px_#ff00cc] transition"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>

      {/* Mobile toggle (visible only on mobile) */}
      <div className="md:hidden block p-2 mt-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition"
          aria-label="Toggle sidebar mobile"
        >
          <Menu className="mx-auto" />
        </button>
      </div>
    </motion.div>
  );
}
