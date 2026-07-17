import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/whishlist.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getWishlist); 

router.post("/", addToWishlist);

router.delete("/:productId", removeFromWishlist);

router.delete("/", clearWishlist);

export default router;
