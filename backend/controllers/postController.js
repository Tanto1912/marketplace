const db = require("../config/db");
const path = require("path");

exports.getPosts = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM articles ORDER BY created_at DESC"
  );
  res.json(rows);
};

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.filename : null;
  await db.query(
    "INSERT INTO articles (title, content, category, image, created_at) VALUES (?, ?, ?, ?, NOW())",
    [title, content, category, image]
  );
  res.json({ message: "Post created" });
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const image = req.file ? req.file.filename : req.body.image;
  await db.query(
    "UPDATE articles SET title=?, content=?, category=?, image=? WHERE id=?",
    [title, content, category, image, id]
  );
  res.json({ message: "Post updated" });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM articles WHERE id=?", [id]);
  res.json({ message: "Post deleted" });
};
