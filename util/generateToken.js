import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SEC, {
    expiresIn: "10d", // Token validity period
  });

  // Set the cookie with the JWT
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents access to the cookie via client-side scripts
    secure: process.env.NODE_ENV !== "production", // Secure only in production
    sameSite: "strict", // Strict CSRF protection
    maxAge: 10 * 24 * 60 * 60 * 1000, // Correct spelling of maxAge, 10 days in milliseconds
  });
};

export default generateToken;
