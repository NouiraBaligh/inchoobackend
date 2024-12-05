import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

//UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedUser) {
    req.statusCode(400);
    throw new Error("User was not updated ");
  } else {
    res.status(200).json(updatedUser);
  }
});

//DELETE USER

const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    res.status(400);
    throw new Error("user was not deleted successfully");
  } else {
    res.status(200).json("User was deleted successfully");
  }
});

//GET ONE USER

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findBy(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  } else {
    res.status(200).json(user);
  }
});

//GET ALL USERS

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(400);
    throw new Error("Users were not fetched ");
  } else {
    res.status(200).json(users);
  }
});

export { getAllUsers, getUser, updateUser, deleteUser };
