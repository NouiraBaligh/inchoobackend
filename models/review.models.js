import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Converts email to lowercase for consistency
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: Number,
      required: true,
      min: 1, // Minimum value for the rating
      max: 5, // Maximum value for the rating
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product", // Must match the model name in `mongoose.model("Product", ProductSchema)`
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
