import express from "express";
import { createOrderController, getAllOrders, getMyOrders, getOrderById } from "../controllers/order.controller";
import { protect } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";


const router = express.Router();

// Create Order
router.post("/", protect, createOrderController);

// Logged-in user's orders
router.get("/me", protect, getMyOrders);

// Get single order
router.get("/:id", protect, getOrderById);

// Admin - Get all orders
router.get("/", protect, adminOnly, getAllOrders);

export default router;