const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", getPosts);
router.post("/", upload.single("image"), createPost);
router.put("/:id", upload.single("image"), updatePost);
router.delete("/:id", deletePost);

module.exports = router;
