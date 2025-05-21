import React from "react";
import Sidebar from "../components/Sidebar"; // Pastikan path sesuai
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar muncul di semua halaman dashboard */}
      <Sidebar />

      {/* Konten utama dashboard */}
      <div className="ml-[64px] md:ml-[240px] flex-1 min-h-screen p-4 transition-all">
        <Outlet />{" "}
        {/* Ini untuk render halaman seperti /dashboard, /dashboard/add, dll */}
      </div>
    </div>
  );
};

export default DashboardLayout;
