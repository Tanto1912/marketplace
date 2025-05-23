const db = require("../config/db.js");
const bcrypt = require("bcrypt");

// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    console.error("DB Error getUsers:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ADD USER

exports.addUser = async (req, res) => {
  const { username, password, role, approved = 0 } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10
    await db.query(
      "INSERT INTO users (username, password, role, approved) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, role, approved]
    );
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("DB Error addUser:", err);
    res.status(500).json({ message: "Failed to add user" });
  }
};

// APPROVE USER
exports.approveUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE users SET approved = 1 WHERE id = ?", [id]);
    res.json({ message: "User approved" });
  } catch (err) {
    console.error("DB Error approveUser:", err);
    res.status(500).json({ message: "Failed to approve user" });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("DB Error deleteUser:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;
  try {
    await db.query("UPDATE users SET username = ?, role = ? WHERE id = ?", [
      username,
      role,
      id,
    ]);
    res.json({ message: "User updated" });
  } catch (err) {
    console.error("DB Error updateUser:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};
