import Promocode from "../models/promocodes.models.js";
import asyncHandler from "express-async-handler";

// CREATE PRODUCT with Image Upload
const createPromocode = asyncHandler(async (req, res) => {
  const { title, pourcentage } = req.body;

  if (!title || !pourcentage) {
    return res.status(400).json({
      success: false,
      message: "Title and percentage are required.",
    });
  }

  if (isNaN(pourcentage) || pourcentage <= 0 || pourcentage > 100) {
    return res.status(400).json({
      success: false,
      message: "Percentage must be a number between 1 and 100.",
    });
  }

  try {
    const newPromocode = new Promocode({ title, pourcentage });
    const promocode = await newPromocode.save();

    return res.status(201).json({
      success: true,
      message: "Promocode created successfully.",
      promocode,
    });
  } catch (error) {
    console.error("Error creating promocode:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Unable to create promocode.",
    });
  }
});

const getAllPromocodes = asyncHandler(async (req, res) => {
  const promocodes = await Promocode.find();
  if (!promocodes) {
    res.status(400);
    throw new Error("promocodes were not fetched ");
  } else {
    res.status(200).json(promocodes);
  }
});
// UPDATE ORDER
const updatePromocode = asyncHandler(async (req, res) => {
  const updatedPromocode = await Promocode.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedPromocode) {
    res.status(400);
    throw new Error("Promocode was not updated ");
  } else {
    res.status(200).json(updatedPromocode);
  }
});

// DELETE Promocode
const deletePromocode = asyncHandler(async (req, res) => {
  const deletedPromocode = await Promocode.findByIdAndDelete(req.params.id);

  if (!deletedPromocode) {
    res.status(400);
    throw new Error("Promocode was not deleted successfully");
  } else {
    res.status(200).json({
      success: true,
      message: "Promocode deleted successfully",
      promocode: deletedPromocode,
    });
  }
});

const getPromocode = asyncHandler(async (req, res) => {
  const { title } = req.body; // Get the promocode from the request body

  // Check if the promocode exists in the database
  const promocode = await Promocode.findOne({ title });

  if (!promocode) {
    res.status(404).json({
      success: false,
      message: "Saisir un code de réduction valide",
    });
    return;
  }

  // Return the promocode details
  res.status(200).json({
    success: true,
    promoCode: {
      title: promocode.title,
      pourcentage: promocode.pourcentage,
    },
  });
});
const getOnePromocode = asyncHandler(async (req, res) => {
  const { id } = req.params; // Assuming you're passing the ID as a route parameter

  // Find the promocode by its ID
  const promocode = await Promocode.findById(id);

  if (!promocode) {
    res.status(404); // Not found
    throw new Error("Promocode not found");
  }

  // Return the promocode
  res.status(200).json(promocode);
});
export {
  createPromocode,
  getAllPromocodes,
  getPromocode,
  updatePromocode,
  deletePromocode,
  getOnePromocode,
};
