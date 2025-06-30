import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  LogOut,
  Book,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type MenuItem = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path?: string;
  isDropdown?: boolean;
  children?: { name: string; path: string }[];
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

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

  const menus: MenuItem[] = [
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
    { name: "Logout", icon: LogOut }, // no path, special button
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-pink-500 to-pink-400 text-white flex flex-col transition-all duration-300`}
    >
      <div className="flex flex-col p-4 flex-grow overflow-y-auto">
        <button
          onClick={() => setOpen(!open)}
          className="mb-6"
          aria-label="Toggle sidebar"
        >
          <span className="text-2xl font-bold">{open ? "≡" : "☰"}</span>
        </button>

        {open && (
          <div className="mb-6 p-3 border-b border-white/30">
            <p className="font-semibold">User: {username || "-"}</p>
            <p className="text-sm opacity-80">Role: {role || "-"}</p>
          </div>
        )}

        {menus
          .filter((menu) => menu.name !== "Logout")
          .map((menu, i) => {
            if (menu.isDropdown && menu.children) {
              return (
                <div key={`dropdown-${i}`}>
                  <button
                    onClick={() => setEditOpen(!editOpen)}
                    aria-expanded={editOpen}
                    aria-controls="edit-landingpage-menu"
                    className={`flex items-center justify-between w-full p-3 rounded-md transition-all ${
                      editOpen
                        ? "bg-amber-200 text-pink-500"
                        : "hover:bg-pink-600"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <menu.icon className="w-5 h-5" />
                      {open && <span>{menu.name}</span>}
                    </div>
                    {open &&
                      (editOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>

                  {editOpen && open && (
                    <div
                      id="edit-landingpage-menu"
                      className="pl-10 flex flex-col gap-2 mt-2"
                    >
                      {menu.children.map((child, cIdx) => (
                        <Link
                          key={`child-${cIdx}`}
                          to={child.path}
                          onClick={() => setEditOpen(false)}
                          className={`text-sm p-2 rounded-md transition-all ${
                            pathname === child.path
                              ? "bg-white text-pink-500"
                              : "hover:bg-pink-600"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return menu.path ? (
              <Link
                key={`menu-${i}`}
                to={menu.path}
                onClick={() => setEditOpen(false)}
                className={`flex items-center gap-4 p-3 rounded-md transition-all ${
                  pathname === menu.path
                    ? "bg-white text-pink-500"
                    : "hover:bg-pink-600"
                }`}
              >
                <menu.icon className="w-5 h-5" />
                {open && <span>{menu.name}</span>}
              </Link>
            ) : null;
          })}
      </div>

      {/* Logout button fixed di bawah */}
      <div className="p-3 border-t border-white/30">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full rounded-md p-3 transition-all hover:bg-pink-600"
        >
          <LogOut className="w-5 h-5" />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
