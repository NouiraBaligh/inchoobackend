import User from "../models/user.models.js";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateToken.js";
import jwt from "jsonwebtoken";

// REGISTER USER
// route POST /api/v1/register
// @acces public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists ");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// LOGIN USER
// route POST /api/v1/login
// @acces public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Validate password
  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const token = jwt.sign({ userId: user._id }, "inchoo@2024;", {
    expiresIn: "1h",
  });

  // Return the user data along with success message
  res.status(200).json({
    error: false,
    message: "Login successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    },
  });
};

// LOGOUT USER
// route POST /api/v1/logout
// @acces public

const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successfully" });
});

export { logOut, loginUser, registerUser };
