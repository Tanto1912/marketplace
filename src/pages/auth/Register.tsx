import api from "../../services/api.ts";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 4 || password.length < 4) {
      setError("Username dan Password minimal 4 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    setError("");

    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });

      alert(response.data.message);
      window.location.href = "/login";
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registrasi gagal. Silakan coba lagi.");
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
          Register Akun Baru
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <motion.p
              className="text-red-500 text-sm text-center -mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-pink-800 dark:text-pink-300"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-pink-300 dark:border-pink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 bg-white dark:bg-gray-800 text-pink-900 dark:text-pink-200 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition"
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                <AnimatePresence initial={false}>
                  {showConfirmPassword ? (
                    <motion.span
                      key="eyeoff-confirm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <EyeOff size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="eye-confirm"
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
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-pink-600 dark:text-pink-400 hover:underline"
          >
            Login di sini
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
