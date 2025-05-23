const express = require("express");
const router = express.Router();
const {
  register,
  login,
  approveUser,
  changePassword,
} = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// hanya admin bisa approve user
router.put("/approve/:id", verifyToken, isAdmin, approveUser);
router.post("/change-password", verifyToken, changePassword);

module.exports = router;
