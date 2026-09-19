import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import corsOptions from "./config/cors.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishRoutes from "./routes/whishlist.routes.js";
import addressRoutes from "./routes/address.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import couponRoutes from "./routes/coupon.routes.js";

import app from "./app.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(cookieParser());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/brands", brandRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/wishlist", wishRoutes);
    app.use("/api/address", addressRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/contact", contactRoutes);
    app.use("/api/checkout", checkoutRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/reviews", reviewRoutes);
    app.use("/api/blogs", blogRoutes);
    app.use("/api/faqs", faqRoutes);
    app.use("/api/settings", settingsRoutes);
    app.use("/api/coupons", couponRoutes);

    // Global error handler must be registered last.
    app.use(errorHandler);

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        try {
          // We'll add DB/WhatsApp cleanup here later if needed.
          console.log("Server closed.");
          process.exit(0);
        } catch (error) {
          console.error("Shutdown error:", error);
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
