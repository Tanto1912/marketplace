const db = require("../config/db.js");

const getProducts = async (req, res) => {
  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query(
      `SELECT * FROM products 
       WHERE title LIKE ? OR description LIKE ?
       LIMIT ? OFFSET ?`,
      [`%${search}%`, `%${search}%`, limit, offset]
    );

    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM products 
       WHERE title LIKE ? OR description LIKE ?`,
      [`%${search}%`, `%${search}%`]
    );

    const total = countRows[0].total;

    res.json({
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const { title, description, image_url } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (title, description, image_url) VALUES (?, ?, ?)",
      [title, description, image_url]
    );
    res.json({ id: result.insertId, title, description, image_url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductWithUpload = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    await db.query(
      "INSERT INTO products (title, description, image_url) VALUES (?, ?, ?)",
      [title, description, image_url]
    );

    res.status(201).json({ message: "Produk berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image_url = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.image_url || null;

  try {
    const [result] = await db.query(
      `UPDATE products SET title = ?, description = ?, image_url = ? WHERE id = ?`,
      [title, description, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(`DELETE FROM products WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPublicProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, description, image_url FROM products"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  addProductWithUpload,
  updateProduct,
  deleteProduct,
  getProductById,
  getPublicProducts,
};
