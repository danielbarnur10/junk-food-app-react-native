import { NextFunction, Router } from "express";
import authRouter from "./authRoute";
import userRouter from "./userRoute";
import productRouter from "./productRoute";
import orderCartRoutes from "./orderCart.Routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use(orderCartRoutes);

router.get("/health-check", (_req, res, next: NextFunction) => {
  try {
    console.log("health-check");
    res.status(200).json({ message: "health-check", ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;
