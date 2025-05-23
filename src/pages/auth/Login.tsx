import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 4 || password.length < 4) {
      setError("Username dan Password minimal 4 karakter.");
      return;
    }

    setError("");

    try {
      const response = await api.post<{ data: LoginResponse }>("/auth/login", {
        username,
        password,
      });

      const { token, user, message } = response.data.data || response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);

      alert(message || "Login berhasil");
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login gagal. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 dark:from-gray-800 dark:via-gray-900 dark:to-black px-4 transition-colors duration-500">
      <motion.div
        className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-pink-600 dark:text-pink-400 mb-6">
          Login Admin
        </h2>

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          {error && (
            <motion.p
              className="text-red-500 text-sm text-center -mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-pink-800 dark:text-pink-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-pink-300 dark:border-pink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 bg-white dark:bg-gray-800 text-pink-900 dark:text-pink-200"
              required
              minLength={4}
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pink-800 dark:text-pink-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-pink-300 dark:border-pink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 bg-white dark:bg-gray-800 text-pink-900 dark:text-pink-200 pr-10"
                required
                minLength={4}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AnimatePresence initial={false}>
                  {showPassword ? (
                    <motion.span
                      key="eyeoff"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <EyeOff size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="eye"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Eye size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-pink-600 dark:text-pink-400 hover:underline"
          >
            Daftar di sini
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
