import "dotenv/config";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import app from "./app.js";
import { errorHandler } from "./middlewares/error.middleware.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes );
app.use("/api/brands", brandRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
