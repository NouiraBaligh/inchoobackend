import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createMessage,
  getMessages,
  deleteMessage,
} from "../controller/user.controller.js";

// GET ALL USERS ROUTE
router.get("/", getAllUsers);
//DELETE USER
router.delete("/:id", deleteUser);
// UPDATE USER
router.put("/:id", updateUser);
// GET ONE USER
router.get("/find/:userId", getUser);

router.post("/createMsg", createMessage);
router.get("/messages", getMessages);
router.delete("/messages/:id", deleteMessage);

export default router;
