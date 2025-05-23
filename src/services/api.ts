import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ganti sesuai alamat backend
  withCredentials: false, // biasanya false kalau pakai JWT di header
});

// Interceptor request: tambahkan token JWT ke header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Jika ada token, set header Authorization
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
