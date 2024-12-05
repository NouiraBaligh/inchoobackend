import Cart from "../models/cart.models.js";
import asyncHandler from "express-async-handler";

// CREATE CART
const createCart = asyncHandler(async (req, res) => {
  const { user, items } = req.body;

  // Create a new cart object
  const newCart = new Cart({
    user,
    items,
  });

  // Save the cart to the database
  const savedCart = await newCart.save();

  if (!savedCart) {
    res.status(400);
    throw new Error("Cart was not created");
  } else {
    res.status(201).json(savedCart);
  }
});

// UPDATE CART (add item or update quantity)
const updateCart = asyncHandler(async (req, res) => {
  const { cartId, items } = req.body;

  const updatedCart = await Cart.findByIdAndUpdate(
    cartId,
    { $set: { items } },
    { new: true }
  );

  if (!updatedCart) {
    res.status(400);
    throw new Error("Cart was not updated");
  } else {
    res.status(200).json(updatedCart);
  }
});

// DELETE CART
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  if (!cart) {
    res.status(400);
    throw new Error("Cart was not deleted successfully");
  } else {
    res.status(200).json(cart);
  }
});

// GET USER CART
const getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.id });

  if (!cart) {
    res.status(400);
    throw new Error("No cart was found for this user");
  } else {
    res.status(200).json(cart);
  }
});

// GET ALL CARTS (optional, for admin)
const getAllCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();

  if (!carts) {
    res.status(400);
    throw new Error("No carts were found or something went wrong");
  } else {
    res.status(200).json(carts);
  }
});

export { createCart, updateCart, deleteCart, getUserCart, getAllCarts };
