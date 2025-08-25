import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";


const userController = {
    getAllUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find();
            res.status(204).json({ message: "userController.getAllUser", users, success: true })
            return;

        } catch (error) {

            next(error)
        }
    },
    getUserbyId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.body.id);
            res.status(204).json({ message: "userController.getUserbyId", user, success: true })
            return;
        } catch (error) {

            next(error)
        }
    },
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.create(req.body);
            res.status(201).json({ message: "userController.createUser", user, success: true })
            return;

        } catch (error) {

            next(error)
        }

    },
    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findOne(req.body.id);
            const updatedUser = await user?.updateOne(req.body);
            res.status(201).json({ message: "userController.updateUser", user: updatedUser, success: true })
            return;

        } catch (error) {

            next(error)
        }
    },
    removeUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findOne(req.body.id);
            const deletedUser = await user?.deleteOne();
            res.status(204).json({ message: "userController.removeUser", user: deletedUser, success: true })
            return;

        } catch (error) {

            next(error)
        }
    }


}

export default userController;