import express from "express";

import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  getFeaturedCoupon,
} from "../controllers/coupon.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin Routes

router.get("/", protect, adminOnly, getAllCoupons);

router.get("/featured", getFeaturedCoupon);

router.get("/:id", protect, adminOnly, getCouponById);

router.post("/", protect, adminOnly, createCoupon);

router.put("/:id", protect, adminOnly, updateCoupon);

router.delete("/:id", protect, adminOnly, deleteCoupon);

export default router;
