import authRouter from "./auth.router.js";
import productRouter from "./products.router.js";
import orderRouter from "./orders.router.js";
import categoryRouter from "./categories.router.js";

const router = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/orders", orderRouter);
};

export default router;
