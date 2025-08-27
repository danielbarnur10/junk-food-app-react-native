import { Router } from "express";
import { orderCartController } from "../controllers/orderCart.controller";
import { authGuard } from "../middlewares/authGuard";

const router = Router();

router.use(authGuard);

router.get("/cart", orderCartController.getCart);
router.delete("/cart", orderCartController.clear);

router.post("/order/items", orderCartController.addItem);
router.patch("/order/items/:productId", orderCartController.updateItem);
router.delete("/order/items/:productId", orderCartController.removeItem);

router.post("/order", orderCartController.createOrder);
router.get("/orders", orderCartController.listOrders);
router.get("/order", orderCartController.listOrders);

export default router;
