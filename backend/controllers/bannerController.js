const db = require("../config/db");
const path = require("path");
const fs = require("fs");

exports.getBanners = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM banners ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data banner" });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Gambar wajib diupload" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    await db.query(
      "INSERT INTO banners (title, subtitle, imageUrl) VALUES (?, ?, ?)",
      [title, subtitle, imageUrl]
    );

    res.status(201).json({ message: "Banner berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan banner" });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle } = req.body;

    // Ambil data banner lama
    const [rows] = await db.query("SELECT * FROM banners WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Banner tidak ditemukan" });
    }
    const oldBanner = rows[0];

    // Jika ada gambar baru, hapus gambar lama
    let imageUrl = oldBanner.imageUrl;
    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", oldBanner.imageUrl);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Gagal hapus gambar lama:", err);
      });
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await db.query(
      "UPDATE banners SET title = ?, subtitle = ?, imageUrl = ? WHERE id = ?",
      [title, subtitle, imageUrl, id]
    );

    res.json({ message: "Banner berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui banner" });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data banner lama
    const [rows] = await db.query("SELECT * FROM banners WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Banner tidak ditemukan" });
    }
    const banner = rows[0];

    // Hapus gambar
    const imagePath = path.join(__dirname, "..", banner.imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Gagal hapus gambar:", err);
    });

    // Hapus data banner
    await db.query("DELETE FROM banners WHERE id = ?", [id]);

    res.json({ message: "Banner berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus banner" });
  }
};
