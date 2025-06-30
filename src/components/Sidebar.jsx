import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Settings,
  Book,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setUsername(localStorage.getItem("username"));

    const syncUser = () => {
      setRole(localStorage.getItem("role"));
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menus = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    ...(role === "admin"
      ? [{ name: "Manage Users", icon: Users, path: "/dashboard/manageusers" }]
      : []),
    { name: "Profile", icon: Users, path: "/dashboard/profile" },
    { name: "Settings", icon: Settings, path: "/dashboard/settingpage" },
    {
      name: "Edit LandingPage",
      icon: Book,
      isDropdown: true,
      children: [
        { name: "Edit Banner", path: "/dashboard/managebanner" },
        { name: "Edit Produk", path: "/dashboard/manageproduk" },
        { name: "Edit Artikel", path: "/dashboard/managearticle" },
      ],
    },
    { name: "View LandingPage", icon: Book, path: "/" },
    { name: "Logout", icon: LogOut },
  ];

  return (
    <div className={`${open ? "w-64" : "w-20"} fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-pink-500 to-pink-400 text-white flex flex-col transition-all duration-300`}>
      {/* ... (rest of the component remains the same) ... */}
    </div>
  );
}