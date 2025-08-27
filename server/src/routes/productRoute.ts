import { Router } from "express";
import productController from "../controllers/product.controller";

const route = Router();

route.get("/", productController.getAll);
route.get("/:id", productController.getProductbyId);
route.post("/", productController.create);
route.put("/:id", productController.update);
route.delete("/:id", productController.remove);

export default route;
