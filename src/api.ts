import axios from "axios";

// Gunakan baseURL dari environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api4.app.iklin.online",
});

export default api;
