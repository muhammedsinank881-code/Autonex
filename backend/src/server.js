import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.routes.js'
import app from "./app.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api/auth" , authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});