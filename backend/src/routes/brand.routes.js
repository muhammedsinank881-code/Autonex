import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  toggleBrandStatus,
  permanentlyDeleteBrand,
} from "../controllers/brand.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createBrandSchema,
  updateBrandSchema,
} from "../validators/Brand.validator.js";
import { brandUpload } from "../middlewares/multer/types.multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  brandUpload.fields([{ name: "logo", maxCount: 1 }]),
  validate(createBrandSchema),
  createBrand,
);

router.get("/", getAllBrands); // have features - brand name , isActive , isFeatured , sort by , search , pagination
router.get("/:id", validateObjectId, getBrandById);
router.put(
  "/:id",
  protect,
  adminOnly,
  validateObjectId,
  brandUpload.fields([{ name: "logo", maxCount: 1 }]),
  validate(updateBrandSchema),
  updateBrand,
);
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  validateObjectId,
  toggleBrandStatus,
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  validateObjectId,
  permanentlyDeleteBrand,
);

export default router;
