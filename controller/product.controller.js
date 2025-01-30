import Product from "../models/product.models.js";
import asyncHandler from "express-async-handler";
import validateProductInput from "../validation/productValidator.js";
import Review from "../models/review.models.js";

// CREATE PRODUCT with Image Upload
const createProduct = asyncHandler(async (req, res) => {
  // Validate the input data
  const { errors, isValid } = validateProductInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Ensure the image file is uploaded with the correct field name (productImage)
  if (!req.file) {
    return res.status(400).json({ message: "Product image is required" });
  }

  // Explicitly convert inStock to Boolean
  const productData = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock === "true", // Converts string to Boolean
    img: `/products_images/${req.file.filename}`, // Store the relative path of the image
  };

  try {
    const newProduct = new Product(productData);
    const product = await newProduct.save();

    if (product) {
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } else {
      res.status(400);
      throw new Error("Product was not created");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
});

//UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const updatedFields = { ...req.body };

    if (req.file) {
      updatedFields.img = `/products_images/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(400).json({ message: "Product has not been updated" });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

//DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("product was not deleted");
  } else {
    res.status(201).json("Product deleted successfully");
  }
});

// GET PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  } else {
    res.status(200).json(product);
  }
});

// GET ALL PRODUCTS
const getALLproducts = asyncHandler(async (req, res) => {
  // Fetch all products without filtering
  let products = await Product.find();

  // Helper function to calculate the average rating for a product
  const getAverageRating = async (productId) => {
    const reviews = await Review.find({ productId });
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (acc, review) => acc + (review.note || 0),
      0
    );
    return totalRating / reviews.length;
  };

  // Enrich products with their average ratings
  const productsWithRatings = await Promise.all(
    products.map(async (product) => {
      const averageRating = await getAverageRating(product._id);
      return { ...product.toObject(), averageRating };
    })
  );

  // Sort the products by their average ratings (in descending order)
  productsWithRatings.sort((a, b) => b.averageRating - a.averageRating);

  res.status(200).json(productsWithRatings);
});

// RATING PRODUCTS

const ratingProduct = asyncHandler(async (req, res) => {
  const { productId, name, email, review, note } = req.body;

  // Validate input data
  if (!productId || !name || !email || !review || !note) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (note < 1 || note > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5");
  }

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Create the review
  const newReview = await Review.create({
    productId,
    name,
    email,
    review,
    note,
  });

  res.status(201).json({
    message: "Review added successfully",
    review: newReview,
  });
});
// GET Reviews by Product
const getReviewsByProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Validate productId
  if (!productId) {
    res.status(400);
    throw new Error("Product ID is required");
  }

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Retrieve reviews for the product
  const reviews = await Review.find({ productId }).sort({ createdAt: -1 }); // Sort by most recent review first

  // If no reviews are found, return a message without throwing an error
  if (reviews.length === 0) {
    return res.status(200).json({
      message: "No reviews found for this product",
      reviews: [],
    });
  }

  // If reviews are found, return them
  res.status(200).json({
    message: "Reviews retrieved successfully",
    reviews,
  });
});

const getAllReviews = asyncHandler(async (req, res) => {
  // Retrieve all reviews and populate the product name
  const reviews = await Review.find()
    .populate({
      path: "productId", // Reference to the Product model
      select: "title", // Select only the 'name' field from the Product model
    })
    .sort({ createdAt: -1 }); // Sort by most recent review first

  // Transform the response to include the product name
  const formattedReviews = reviews.map((review) => ({
    _id: review._id,
    name: review.name,
    email: review.email,
    review: review.review,
    note: review.note,
    productName: review.productId?.title || "Unknown Product", // Handle cases where the product might not exist
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  }));

  res.status(200).json(formattedReviews);
});

//DELETE Review
const deleteReview = asyncHandler(async (req, res) => {
  const reveiw = await Review.findByIdAndDelete(req.params.id);
  if (!reveiw) {
    res.status(400);
    throw new Error("reveiw was not deleted");
  } else {
    res.status(201).json("Reveiw deleted successfully");
  }
});
export {
  ratingProduct,
  getALLproducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getReviewsByProduct,
  getAllReviews,
  deleteReview,
};
