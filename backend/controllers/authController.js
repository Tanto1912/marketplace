const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || username.length < 4 || password.length < 4) {
    return res
      .status(400)
      .json({ message: "Minimal 4 karakter untuk username dan password." });
  }

  try {
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Username sudah digunakan." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res
      .status(201)
      .json({ message: "Registrasi berhasil, menunggu approval admin." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "Username tidak ditemukan." });
    }

    const user = users[0];

    if (!user.approved) {
      return res
        .status(403)
        .json({ message: "Akun belum disetujui oleh admin." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan saat login." });
  }
};

const approveUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await pool.query(
      "UPDATE users SET approved = 1, role = 'user' WHERE id = ?",
      [userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    res.status(200).json({ message: "User berhasil disetujui." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menyetujui user." });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Tidak ada token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (userRows.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });

    const user = userRows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password saat ini salah" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    res.json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Token tidak valid atau expired" });
  }
};

module.exports = { register, login, approveUser, changePassword };
