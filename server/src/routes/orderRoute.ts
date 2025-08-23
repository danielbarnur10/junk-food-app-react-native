import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);

router.get("/", getMyOrders);

export default router;
