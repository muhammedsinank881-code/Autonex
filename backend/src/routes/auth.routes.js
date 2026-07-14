import express from "express";

import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteUser,
  verifyOTP,
  resendOTP,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { ownerOrAdmin } from "../middlewares/userOrAdmin.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  loginValidation,
  registerValidation,
  updateProfileValidation,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profile"),
  validate(registerValidation),
  register,
);

router.post("/resend-otp", resendOTP);

router.post("/verify-otp", verifyOTP);

router.post("/login", validate(loginValidation), login);

router.get("/profile", protect, getProfile);

router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password", verifyForgotPassword);
router.post("/reset-password", resetPassword);

router.put(
  "/updateUser",
  protect,
  upload.single("profile"),
  validate(updateProfileValidation),
  updateProfile,
);

router.delete("/delete", protect, ownerOrAdmin, deleteUser);

export default router;
