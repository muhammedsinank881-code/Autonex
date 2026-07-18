import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  restoreCategory,
  getActiveCategories,
} from "../controllers/category.cotroller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";
import { categoryUpload } from "../middlewares/multer/types.multer.middleware.js";
import { searchLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Public Routes
router.get("/",searchLimiter , getAllCategories);
router.get("/active",searchLimiter , getActiveCategories);
router.get("/:id",searchLimiter, getCategoryById);

// Admin Routes
router.post(
  "/",
  protect,
  adminOnly,
  categoryUpload.fields([{ name: "icon", maxCount: 1 }]),
  createCategory,
);
router.put(
  "/:id",
  protect,
  adminOnly,
  categoryUpload.fields([{ name: "icon", maxCount: 1 }]),
  updateCategory,
);
router.patch("/:id/restore", protect, adminOnly, restoreCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
 