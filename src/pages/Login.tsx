import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { saveToken } from "../types/auth";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api4.app.iklin.online/api/auth/login", {
        username,
        password,
      });
      const token = res.data?.token;
      if (!token) {
      setError("Login gagal: token tidak ditemukan");
      
      saveToken(token);
      return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("role", res.data.user.role);
      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a002b] via-[#3a0142] to-[#ff5bbd] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-[#0f001a] border border-pink-500/20 shadow-[0_0_30px_#ff00cc44] rounded-3xl p-8 backdrop-blur-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-500 font-mono neon-glow">
            IKLIN OFFICIAL
          </h1>
          <p className="text-pink-200 text-sm font-mono mt-2">
            Welcome back, Karyawan
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 p-2 rounded text-center border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 font-mono">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-pink-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-transparent border border-pink-500/30 rounded-md text-pink-100 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-pink-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-transparent border border-pink-500/30 rounded-md text-pink-100 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md shadow-lg transition-all duration-300"
          >
            Masuk Sistem
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-pink-300">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-pink-400 hover:underline font-medium"
          >
            Daftar di sini
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
