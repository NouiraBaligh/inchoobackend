import {
  ratingProduct,
  getALLproducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getReviewsByProduct,
} from "../controller/product.controller.js";
import express from "express";
const router = express.Router();
import upload from "../config/multer.js"; // Import multer configuration as default

// RATING PRODUCT ROUTE
router.post("/rating", ratingProduct);
// GET RATIES PRODUCT ROUTE
router.get("/rates/:productId", getReviewsByProduct);
// GET ALL PRODUCTS
router.get("/", getALLproducts);
// GET ONE PRODUCT
router.get("/:id", getProduct);
//CREATE PRODUCT
router.post("/", upload.single("productImage"), createProduct);
// UPDATE PRODUCT
router.put("/:id", upload.single("productImage"), updateProduct);
//DELETE PRODUCT
router.delete("/:id", deleteProduct);
export default router;
