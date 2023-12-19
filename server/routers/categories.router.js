import express from "express";
import {
  authenticateToken,
  restrictTo,
} from "../controllers/auth.controller.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.route("/").get(getAllCategories);
router.use(authenticateToken);
router.use(restrictTo("admin"));
router.route("/").post(createCategory);
router.route("/:id").patch(updateCategory).delete(deleteCategory);

export default router;
