import {
  createPromocode,
  deletePromocode,
  getAllPromocodes,
  updatePromocode,
  getPromocode,
  getOnePromocode,
} from "../controller/promocode.controller.js";
import express from "express";
const router = express.Router();

router.post("/", createPromocode);
router.get("/", getAllPromocodes);
router.get("/:id", getOnePromocode);
router.post("/apply", getPromocode);
router.put("/:id", updatePromocode);
router.delete("/:id", deletePromocode);

export default router;
