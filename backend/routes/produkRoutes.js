const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produkController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.get("/", produkController.getAllProduk);
router.post("/", upload.single("gambar"), produkController.addProduk);
router.put("/:id", upload.single("gambar"), produkController.updateProduk);
router.delete("/:id", produkController.deleteProduk);

module.exports = router;
