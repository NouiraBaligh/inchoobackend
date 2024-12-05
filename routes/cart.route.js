import express from "express";
const router = express.Router();
import {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} from "../controller/cart.controller.js";

// CREATE CART
router.post("/", createCart); // Protect this route if the user needs to be authenticated

// UPDATE CART
router.put("/:cartId", updateCart); // Protect this route if the user needs to be authenticated

// DELETE CART
router.delete("/:id", deleteCart); // Protect this route if the user needs to be authenticated

// GET USER'S CART
router.get("/find/:id", getUserCart); // Protect this route to only allow authenticated users to access their own cart

// GET ALL CARTS (optional, can be protected if needed)
router.get("/", getAllCarts); // You can leave this unprotected for admin access if needed

export default router;
