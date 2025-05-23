// routes/authRoutes.js
const express = require("express");
const { register, login, verify } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authenticateToken, verify);

module.exports = router;
