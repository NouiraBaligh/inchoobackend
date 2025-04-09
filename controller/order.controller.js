import Order from "../models/order.models.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

// CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = Order(req.body);
  const savedOrder = await newOrder.save();

  if (!savedOrder) {
    res.status(400);
    throw new Error("Order was not created");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: "nouirabaligh009@gmail.com",
    subject: "🛒 New Order Received From Inchoo Store",
    html: `
      <h2>Inchoo Store : New Order Created</h2>
      <p><strong>Order ID:</strong> ${savedOrder._id}</p>
      <p><strong>Customer:</strong> ${savedOrder.prename || ""} ${
      savedOrder.name || ""
    }</p>
      <p><strong>Total:</strong> ${savedOrder.totalPrice || "N/A"} TND</p>
      <p><strong>Date:</strong> ${new Date(
        savedOrder.createdAt
      ).toLocaleString()}</p>
      
      <hr/>
      <p>This is an automatic email from your e-commerce platform Inchoo Store.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(201).json(savedOrder);
});

// UPDATE ORDER
const updateOrder = asyncHandler(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedOrder) {
    res.status(400);
    throw new Error("Order was not updated ");
  } else {
    res.status(200).json(updatedOrder);
  }
});

// DELETE ORDER
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(400);
    throw new Error("order was not deleted successfully");
  } else {
    res.status(200).json(order);
  }
});

// GET USER ORDER
const getUserOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.id }).reverse();
  if (!orders) {
    res.status(400);
    throw new Error("No order was found or something went wrong");
  } else {
    res.status(200).json(orders);
  }
});

// GET ALL ORDERS
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    res.status(400);
    throw new Error("No order was found or something went wrong");
  } else {
    res.status(200).json(orders);
  }
});

export { getAllOrders, getUserOrder, deleteOrder, updateOrder, createOrder };
