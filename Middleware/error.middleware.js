import dotenv from "dotenv";

dotenv.config();

// Middleware for handling 404 (Not Found) errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error); // Pass error to the next middleware without manually setting status
};

// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  // If headers are already sent, pass to the next middleware
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle specific Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    error: true,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler, notFound };
