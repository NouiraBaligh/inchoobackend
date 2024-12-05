import mongoose from "mongoose";
const PromocodeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pourcentage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Promocode = mongoose.model("Promocode", PromocodeSchema);
export default Promocode;
