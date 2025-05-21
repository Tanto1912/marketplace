import axios from "axios";

const api = axios.create({
  baseURL: "https://api3.app.iklin.online", // sesuaikan
});

export default api;
