import { body, param, query, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

// Collects express-validator errors and turns them into a single ApiError
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors
      .array()
      .map((e) => ({ field: e.path, message: e.msg }));
    return next(ApiError.badRequest("Validation failed", details));
  }
  next();
};

export const createBrandRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("description").optional().trim().isLength({ max: 1000 }),
  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),
];

export const updateBrandRules = [
  param("id").isMongoId().withMessage("Invalid brand id"),
  body("name").optional().trim().isLength({ min: 2, max: 100 }),
  body("description").optional().trim().isLength({ max: 1000 }),
  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),
];

export const idParamRule = [
  param("id").isMongoId().withMessage("Invalid brand id"),
];

export const listBrandsRules = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("search").optional().trim().isLength({ max: 100 }),
  query("sortBy").optional().isIn(["name", "createdAt", "updatedAt"]),
  query("order").optional().isIn(["asc", "desc"]),
];
