const pool = require("../config/db");
const path = require("path");
const fs = require("fs");

exports.getAllProduk = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produk");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProduk = async (req, res) => {
  try {
    const { nama, harga, keterangan } = req.body;
    const gambar = req.file ? req.file.filename : null;

    const sql =
      "INSERT INTO produk (nama, harga, keterangan, gambar) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(sql, [nama, harga, keterangan, gambar]);

    res.json({ id: result.insertId, nama, harga, keterangan, gambar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga, keterangan } = req.body;

    // Cek produk lama
    const [produkLama] = await pool.query("SELECT * FROM produk WHERE id = ?", [
      id,
    ]);
    if (!produkLama.length)
      return res.status(404).json({ error: "Produk tidak ditemukan" });

    let gambar = produkLama[0].gambar;

    if (req.file) {
      if (gambar) {
        const oldPath = path.join(__dirname, "..", "uploads", gambar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      gambar = req.file.filename;
    }

    const sql =
      "UPDATE produk SET nama=?, harga=?, keterangan=?, gambar=? WHERE id=?";
    await pool.query(sql, [nama, harga, keterangan, gambar, id]);

    res.json({ id, nama, harga, keterangan, gambar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;

    const [produk] = await pool.query("SELECT * FROM produk WHERE id=?", [id]);
    if (!produk.length)
      return res.status(404).json({ error: "Produk tidak ditemukan" });

    const gambar = produk[0].gambar;
    if (gambar) {
      const filePath = path.join(__dirname, "..", "uploads", gambar);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pool.query("DELETE FROM produk WHERE id=?", [id]);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
