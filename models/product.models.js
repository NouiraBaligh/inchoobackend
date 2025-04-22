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
        "SOINS DE PEAU",
        "SOINS DE VISAGE",
        "SOINS CAPILLAIRES",
        "PARFUMS MAISON",
        "PARFUMS CHEVEUX ET CORPS",
        "PACKS",
        "ACCESOIRES",
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
