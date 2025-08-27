import { NextFunction, Request, Response } from "express";
import Product from "../models/ProductModel";

const productController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find().lean();
      res
        .status(200)
        .json({
          message: "productController.getAll",
          data: products,
          success: true,
        });
    } catch (error) {
      next(error);
    }
  },

  getProductbyId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id).lean();
      if (!product)
        return res.status(404).json({ success: false, message: "Not found" });
      res
        .status(200)
        .json({
          message: "productController.getProductbyId",
          data: product,
          success: true,
        });
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await Product.create(req.body);
      res
        .status(201)
        .json({
          message: "productController.create",
          data: created,
          success: true,
        });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updated = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      }).lean();
      if (!updated)
        return res.status(404).json({ success: false, message: "Not found" });
      res
        .status(200)
        .json({
          message: "productController.update",
          data: updated,
          success: true,
        });
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await Product.findByIdAndDelete(id).lean();
      if (!deleted)
        return res.status(404).json({ success: false, message: "Not found" });
      res
        .status(200)
        .json({
          message: "productController.remove",
          data: deleted,
          success: true,
        });
    } catch (error) {
      next(error);
    }
  },
};

export default productController;
