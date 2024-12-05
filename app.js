import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./Middleware/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import cartRoute from "./routes/cart.route.js";
import promocodeRoute from "./routes/promocode.route.js";
import multer from "./config/multer.js"; // Import multer configuration
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cors and body parsing middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Serve static files from 'public' directory
app.use(
  "/products_images",
  express.static(path.join(__dirname, "public/products_images"))
);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/promocode", promocodeRoute);

// Example route for handling file uploads with multer
app.post("/upload", multer.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }
  res.status(200).send({
    message: "File uploaded successfully",
    file: req.file,
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
