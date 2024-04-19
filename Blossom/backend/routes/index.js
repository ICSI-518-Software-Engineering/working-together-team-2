import productRouter from "./productRoutes.js";
import userRouter from "./userRoutes.js";

export const initializeRoutes = (app) => {
  app.use("/api/auth", userRouter);
  app.use("/api/products", productRouter);
};
