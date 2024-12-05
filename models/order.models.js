import mongoose from "mongoose";
const OrderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    prename: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    secondPhone: {
      type: String,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },

    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
