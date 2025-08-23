import { Request, Response } from "express";
import { OrderModel } from "../models/OrderModel";
import jwt from "jsonwebtoken";

const getUserIdFromToken = (req: Request): string | null => {
  const header = req.headers.authorization;
  if (!header) return null;
  const token = header.split(" ")[1];
  try {
    const payload: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "secret"
    );
    return payload.id;
  } catch {
    return null;
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { items, total } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items" });
  }

  try {
    const order = await OrderModel.create({
      user: userId,
      items,
      total,
      status: "pending",
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const orders = await OrderModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
