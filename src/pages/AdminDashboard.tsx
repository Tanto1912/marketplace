import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "admin") {
      alert("Akses hanya untuk admin");
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Selamat datang admin! Ini halaman khusus admin.</p>
    </div>
  );
};

export default AdminDashboard;
