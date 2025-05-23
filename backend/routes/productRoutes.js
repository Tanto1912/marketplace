const express = require("express");
const {
  getProducts,
  addProductWithUpload,
  updateProduct,
  deleteProduct,
  getProductById,
  getPublicProducts,
} = require("../controllers/productController.js");

const { upload } = require("../middlewares/uploud.js");

const router = express.Router();

router.get("/public-products", getPublicProducts); // tempatkan sebelum "/:id"
router.get("/", getProducts); // GET /products
router.post("/", upload.single("image"), addProductWithUpload);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

module.exports = router;
