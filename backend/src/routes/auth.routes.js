import express from "express";

import { register, login, getProfile, updateProfile } from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile",protect,  getProfile);

router.put("/updateUser", protect , updateProfile)

export default router;
