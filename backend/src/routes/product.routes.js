import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createProductValidation, updateProductValidation } from "../validators/product.validator.js";
import { productUpload } from "../middlewares/multer/types.multer.middleware.js";

const router = express.Router();

router.post("/",protect , adminOnly , productUpload.array("images" , 10 ) , validate(createProductValidation) , createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", protect , adminOnly,productUpload.array("images" , 10) , validate(updateProductValidation) , updateProduct);

router.delete("/:id",protect , adminOnly, deleteProduct);

export default router;
