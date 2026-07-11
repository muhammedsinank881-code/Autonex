import express from "express";

import { register, login, getProfile, updateProfile, deleteUser } from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import {ownerOrAdmin} from "../middlewares/userOrAdmin.middleware.js"
import upload from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile",protect,  getProfile);

router.put("/updateUser", protect ,ownerOrAdmin ,upload.single("profile") , updateProfile)

router.delete("/delete",protect ,ownerOrAdmin, deleteUser )

export default router;
