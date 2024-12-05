import multer from "multer"; // Using ES Module import
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define storage location and file naming function for user avatars and product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "avatar") {
      cb(null, path.join(__dirname, "../public/users_avatars")); // Folder for user avatars
    } else if (file.fieldname === "productImage") {
      cb(null, path.join(__dirname, "../public/products_images")); // Folder for product images
    } else {
      cb(new Error("Invalid file field"));
    }
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.fieldname +
        "." +
        extension
    );
  },
});

// Define file filter function to only accept image files for both avatars and product images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Allow valid image files
  } else {
    req.fileValidationError = "Forbidden file extension";
    cb(null, false, req.fileValidationError); // Reject invalid files
  }
};

export default multer({ storage: storage, fileFilter: fileFilter }); // Export as default
