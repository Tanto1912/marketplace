import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }
    try {
      await axios.post("/api/api/auth/register", {
        username,
        password,
      });
      setSuccess("Registrasi berhasil!");
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registrasi gagal");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a002b] via-[#3a0142] to-[#ff5bbd] px-4">
      <motion.div
        className="w-full max-w-md bg-[#0f001a] border border-pink-500/20 shadow-[0_0_30px_#ff00cc44] rounded-3xl p-8 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-500 font-mono neon-glow mb-5">
            Register
          </h1>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500 px-3 py-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-green-400 bg-green-500/10 border border-green-500 px-3 py-2 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-pink-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border border-pink-500 rounded-md py-2 pl-10 pr-3 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-pink-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-pink-500 rounded-md py-2 pl-10 pr-3 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-pink-400" />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border border-pink-500 rounded-md py-2 pl-10 pr-3 text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md shadow-md transition-all"
          >
            Register
          </motion.button>
        </form>

        <div className="text-center text-sm text-pink-300 pt-4">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-pink-400 font-semibold hover:underline"
          >
            Login di sini
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
