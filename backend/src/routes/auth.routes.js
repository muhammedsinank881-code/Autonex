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
import { validate } from "../middlewares/validation.middleware.js";
import {
  emailValidation,
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  updateProfileValidation,
  verifyOtpValidation,
} from "../validators/auth.validator.js";
import { otpLimiter } from "../middlewares/rateLimiter.js";
import { profileUpload } from "../middlewares/multer/types.multer.middleware.js";

const router = express.Router();

router.post(
  "/register",
  profileUpload.single("profile"),
  validate(registerValidation),
  register,
);

router.post("/resend-otp", otpLimiter, validate(emailValidation), resendOTP);

router.post(
  "/verify-otp",
  otpLimiter,
  validate(verifyOtpValidation),
  verifyOTP,
);

router.post("/login", validate(loginValidation), login);

router.get("/profile", protect, getProfile);

router.post(
  "/forgot-password",
  otpLimiter,
  validate(emailValidation),
  forgotPassword,
);
router.post(
  "/verify-forgot-password",
  otpLimiter,
  validate(verifyOtpValidation),
  verifyForgotPassword,
);
router.post(
  "/reset-password",
  validate(resetPasswordValidation),
  resetPassword,
);

router.put(
  "/updateUser",
  protect,
  profileUpload.single("profile"),
  validate(updateProfileValidation),
  updateProfile,
);

router.delete("/delete", protect, deleteUser);

export default router;
