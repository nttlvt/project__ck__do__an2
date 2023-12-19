import express from "express";
import {
  authenticateToken,
  restrictTo,
} from "../controllers/auth.controller.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.use(authenticateToken);
router.route("/").post(createOrder).get(getAllOrders);
router.route("/:id").get(getOrder);
router.use(restrictTo("admin"));
router.route("/:id").delete(deleteOrder);

export default router;
