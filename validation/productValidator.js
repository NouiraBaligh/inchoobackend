import Validator from "validator";
import isEmpty from "./is-empty.js";

const validateProductInput = (data) => {
  let errors = {};

  // Convert values to strings to avoid validation errors with non-string types
  data.title = !isEmpty(data.title) ? String(data.title) : "";
  data.description = !isEmpty(data.description) ? String(data.description) : "";
  data.price = !isEmpty(data.price) ? String(data.price) : "";

  // Validation checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  } else if (!Validator.isNumeric(data.price, { no_symbols: true })) {
    errors.price = "Price must be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateProductInput;
