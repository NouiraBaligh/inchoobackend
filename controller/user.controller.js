import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Message from "../models/messages.models.js";

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
const createMessage = asyncHandler(async (req, res) => {
  const { email, sujet, message } = req.body;

  if (!email || !sujet || !message) {
    return res.status(400).json({
      success: false,
      message: "email, sujet and message are required.",
    });
  }

  try {
    const newMessage = new Message({ email, sujet, message });
    const savedMessage = await newMessage.save(); // Renamed from 'message' to 'savedMessage'

    return res.status(201).json({
      success: true,
      message: "Message created successfully.",
      data: savedMessage, // Adjusted property name
    });
  } catch (error) {
    console.error("Error creating message:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Unable to create message.",
    });
  }
});
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find();
  if (!messages) {
    res.status(400);
    throw new Error("Messages were not fetched ");
  } else {
    res.status(200).json(messages);
  }
});
//DELETE PRODUCT
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) {
    res.status(400);
    throw new Error("Message was not deleted");
  } else {
    res.status(201).json("Message deleted successfully");
  }
});
export {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createMessage,
  getMessages,
  deleteMessage,
};
