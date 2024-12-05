import mongoose from "mongoose";

// Define CartItem schema
const CartItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, // Reference to Product model
  quantity: { type: Number, required: true, min: 1 }, // Quantity of the product in the cart
  price: { type: Number, required: true }, // Price of the product
});

// Define Cart schema
const CartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User who owns the cart
  items: [CartItemSchema], // List of items in the cart
  totalPrice: { type: Number, default: 0 }, // Total price of all items in the cart
  createdAt: { type: Date, default: Date.now },
});

// Update totalPrice whenever items are added/updated
CartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  next();
});

// Create Cart model
const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
