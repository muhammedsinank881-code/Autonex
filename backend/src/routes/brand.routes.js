import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/",protect , adminOnly , createBrand);
router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id",protect, adminOnly, updateBrand);
router.delete("/:id",protect, adminOnly, deleteBrand);

export default router;