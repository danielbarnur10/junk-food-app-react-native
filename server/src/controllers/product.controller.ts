import { NextFunction, Request, Response } from "express";
import Product from "../models/ProductModel";


const productController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Product.find();
            res.status(204).json({ message: "products", products })
            return;

        } catch (error) {

            next(error)
        }
    },
    getProductbyId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.findById(req.body.id);
            res.status(204).json({ message: "products", product })
            return;
        } catch (error) {

            next(error)
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json({ message: "product", product })
            return;

        } catch (error) {

            next(error)
        }

    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.findOne(req.body.id);
            const updatedProduct = await product?.updateOne(req.body);
            res.status(201).json({ message: "products", updatedProduct })
            return;

        } catch (error) {

            next(error)
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.findOne(req.body.id);
            const deletedProduct = await product?.deleteOne();
            res.status(204).json({ message: "products", deletedProduct })
            return;

        } catch (error) {

            next(error)
        }
    }


}

export default productController;