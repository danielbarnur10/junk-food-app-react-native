import { NextFunction, Request, Response } from "express";
import Product from "../models/ProductModel";


const productController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Product.find().lean();
            console.log("get all : ", products)
            res.status(200).json({
                message: "productController.getAll",
                data: products,
                success: true
            })
            return;

        } catch (error) {

            next(error)
        }
    },
    getProductbyId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.findById(req.body.id);
            res.status(200).json({ message: "productController.getProductbyId", product, success: true })
            return;
        } catch (error) {

            next(error)
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json({ message: "productController.create", product, success: true })
            return;

        } catch (error) {

            next(error)
        }

    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.findOne(req.body.id);
            const updatedProduct = await product?.updateOne(req.body);
            res.status(201).json({ message: "productController.update", product: updatedProduct, success: true })
            return;

        } catch (error) {

            next(error)
        }
    },
    remove: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await Product.findOne(req.body.id);
            const deletedProduct = await product?.deleteOne();
            res.status(200).json({ message: "productController.remove", product: deletedProduct, success: true })
            return;

        } catch (error) {

            next(error)
        }
    }


}

export default productController;