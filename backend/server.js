// server.js
const express = require("express");
const cors = require("cors");
const pool = require("./config/db.js");

const productRoutes = require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const {
  authenticateToken,
  authorizeAdmin,
} = require("./middlewares/authMiddleware.js");

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

// Product
app.use("/products", productRoutes);
app.use("/uploads", express.static("uploads"));

// Users
app.use("/api/auth", authRoutes);
app.get("/api/admin", authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: "Selamat datang admin!" });
});
app.use("/api", userRoutes);

// Gunakan PORT dari environment (cPanel), fallback ke 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
