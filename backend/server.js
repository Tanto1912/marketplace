const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const produkRoutes = require("./routes/produkRoutes");
const postRoutes = require("./routes/postRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const path = require("path");
const pool = require("./config/db.js");

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://iklin.online",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/produk", produkRoutes);
app.use("/api/articles", postRoutes);
app.use("/api/banners", bannerRoutes);

// Gunakan PORT dari environment (cPanel), fallback ke 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
