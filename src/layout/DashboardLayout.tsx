import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 min-h-screen">
      <Sidebar />
      <main className="pl-70 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
