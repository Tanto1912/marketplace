const User = require("../model/userModel.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Gagal mengambil user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, role = "user", status = "pending" } = req.body;
    await User.createUser({ username, password, role, status });
    res.status(201).json({ message: "User berhasil ditambahkan" });
  } catch {
    res.status(500).json({ message: "Gagal menambahkan user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, role, status } = req.body;
    await User.updateUser(req.params.id, { username, role, status });
    res.json({ message: "User berhasil diperbarui" });
  } catch {
    res.status(500).json({ message: "Gagal memperbarui user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "User berhasil dihapus" });
  } catch {
    res.status(500).json({ message: "Gagal menghapus user" });
  }
};

const approveUser = async (req, res) => {
  try {
    await User.approveUser(req.params.id);
    res.json({ message: "User berhasil di-approve" });
  } catch {
    res.status(500).json({ message: "Gagal approve user" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
};
