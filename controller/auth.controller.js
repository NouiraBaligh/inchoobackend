import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateToken.js";
import jwt from "jsonwebtoken";

// REGISTER USER
// Route: POST /api/v1/register
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  // Create new user
  const user = await User.create({ name, email, password });

  if (!user) {
    return res.status(400).json({ error: true, message: "Invalid user data" });
  }

  // Generate authentication token
  generateToken(res, user._id);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

// LOGIN USER
// Route: POST /api/v1/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email or password" });
  }

  // Validate password
  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "inchoo@2024;",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    error: false,
    message: "Login successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  });
});

// LOGOUT USER
// Route: POST /api/v1/logout
// Access: Public
const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successful" });
});

export { registerUser, loginUser, logOut };
