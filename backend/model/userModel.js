const db = require("../config/db.js");

const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

const createUser = async ({ username, password, role, status }) => {
  const [result] = await db.query(
    "INSERT INTO users (username, password, role, status) VALUES (?, ?, ?, ?)",
    [username, password, role, status]
  );
  return result;
};

const updateUser = async (id, { username, role, status }) => {
  const [result] = await db.query(
    "UPDATE users SET username = ?, role = ?, status = ? WHERE id = ?",
    [username, role, status, id]
  );
  return result;
};

const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};

const approveUser = async (id) => {
  const [result] = await db.query(
    'UPDATE users SET status = "active" WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
};
