const express = require("express");
const router = express.Router();


const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");

const protect = require(
  "../middleware/authMiddleware"
);

const adminOnly = require(
  "../middleware/adminMiddleware"
);

const {
  productValidation,
} = require(
  "../validations/productValidation"
);

const validate = require(
  "../middleware/validate"
);

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  protect,
  adminOnly,
  productValidation,
  validate,
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  productValidation,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);


module.exports = router;