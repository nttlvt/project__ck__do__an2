import express from "express";
import {
  authenticateToken,
  restrictTo,
} from "../controllers/auth.controller.js";
import multer from "../utils/multer.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  uploadImage,
  getProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct)
router.use(authenticateToken);
router.use(restrictTo("admin"));
router.route("/").post(createProduct);
router.route("/upload").post(multer.single('file'),uploadImage);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

export default router;
