import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api4.app.iklin.online",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;