import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Produits peau",
        "Produits visage",
        "Produits intimes",
        "Produits capillaires",
        "Produits de rasage",
        "Produits d'hygiène et de bien être",
        "Bakhour",
        "Packs",
        "Coffrets",
      ],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        star: { type: String },
        name: { type: String },
        comment: { type: String },
        postedBy: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
ProductSchema.index({ "$**": "text" });
const Product = mongoose.model("Product", ProductSchema);
export default Product;
