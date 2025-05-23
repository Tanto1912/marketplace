const express = require("express");
const {
  getUsers,
  deleteUser,
  updateUser,
  approveUser,
  addUser,
} = require("../controllers/usersController");

const router = express.Router();

// GET all users
router.get("/", getUsers);

// ADD a new user
router.post("/", addUser);

// UPDATE a user
router.put("/:id", updateUser);

// DELETE a user
router.delete("/:id", deleteUser);

// APPROVE a user
router.put("/approve/:id", approveUser);

module.exports = router;
