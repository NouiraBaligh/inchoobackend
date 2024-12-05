import express from "express";
const router = express.Router();
import {
  getAllOrders,
  getUserOrder,
  deleteOrder,
  updateOrder,
  createOrder,
} from "../controller/order.controller.js";
import protect from "../Middleware/auth.middleware.js";
//CREATE ORDER
router.post("/", createOrder);
// UPDATE ORDER
router.put("/:id", updateOrder);
// GET ALL ORDERS
// router.get("/", protect, getAllOrders);
router.get("/", getAllOrders);
//DELETE ORDER
router.delete("/:id", deleteOrder);
// GET USER'S ORDER
router.get("/find/:userId", getUserOrder);

export default router;
