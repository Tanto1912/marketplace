const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const multer = require("multer");
const path = require("path");

// Setup multer untuk upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", bannerController.getBanners);
router.post("/", upload.single("image"), bannerController.createBanner);
router.put("/:id", upload.single("image"), bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
