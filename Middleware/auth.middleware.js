import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import dotenv from "dotenv";
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SEC);
      res.user = await User.findById(decodedToken.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);

      throw new Error("NOt authorized , invalid token ");
    }
  } else {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
export default protect;
