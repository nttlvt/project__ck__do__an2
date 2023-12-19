import express from "express";
import {
  authenticateToken,
  login,
  loginAmin,
  logout,
  restrictTo,
  signup,
} from "../controllers/auth.controller.js";
import {
  getMe,
  updateMe,
  updatePassword,
} from "../controllers/users.controller.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/login-admin").post(loginAmin);
router.route("/signup").post(signup);
router.use(authenticateToken);
router.route("/get-me").get(getMe);
router.route("/update-me").put(updateMe);
router.route("/update-password").patch(updatePassword);
router.route("/logout").post(logout);

export default router;
