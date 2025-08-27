import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import {
  addItem,
  updateItem as svcUpdate,
  removeItem as svcRemove,
  clearCart,
  getOrCreateCart,
} from "../services/cart.service";
import Product from "../models/ProductModel";
import { Order } from "../models/Order";

type HydratedItem = { product: any; quantity: number; price: number };
type HydratedCart = {
  _id: string;
  user: string;
  items: HydratedItem[];
  total: number;
  status: "pending";
  createdAt: Date;
  updatedAt: Date;
};

function requireUserId(req: Request, res: Response): Types.ObjectId | null {
  if (req.user?.id) return new Types.ObjectId(req.user.id);
  const headerId = req.headers["x-user-id"];
  if (headerId) return new Types.ObjectId(String(headerId));
  res.status(401).json({ success: false, message: "User not authenticated" });
  return null;
}

async function hydrateCart(userId: Types.ObjectId): Promise<HydratedCart> {
  const cart = await getOrCreateCart(userId);
  const ids = cart.items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: ids } }).lean();
  const map = new Map(products.map((p) => [String(p._id), p]));
  const items: HydratedItem[] = [];
  let total = 0;
  for (const i of cart.items) {
    const p = map.get(String(i.productId));
    if (!p) continue;
    const price = Number(p.price ?? 0);
    total += price * i.qty;
    items.push({ product: p, quantity: i.qty, price });
  }
  return {
    _id: String(cart._id),
    user: String(userId),
    items,
    total,
    status: "pending",
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
}

export const orderCartController = {
  getCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      const data = await hydrateCart(userId);
      res.json({ success: true, message: "Cart fetched", data });
    } catch (e) {
      next(e);
    }
  },

  addItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      const rawId = req.body?.productId || req.body?.id;
      const q = req.body?.qty ?? req.body?.quantity ?? 1;
      const qty = Number(q);
      if (
        !rawId ||
        !Types.ObjectId.isValid(String(rawId)) ||
        !Number.isFinite(qty) ||
        qty <= 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Valid productId and positive qty/quantity are required",
          });
      }
      const prod = await Product.findById(rawId).select("_id");
      if (!prod)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      await addItem(userId, new Types.ObjectId(String(rawId)), qty);
      const data = await hydrateCart(userId);
      res.json({ success: true, message: "Item added to cart", data });
    } catch (e) {
      next(e);
    }
  },

  updateItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      const { productId } = req.params;
      const q = req.body?.qty ?? req.body?.quantity;
      const qty = Number(q);
      if (
        !productId ||
        !Types.ObjectId.isValid(productId) ||
        !Number.isFinite(qty)
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Valid :productId and numeric qty/quantity are required",
          });
      }
      await svcUpdate(userId, new Types.ObjectId(productId), qty);
      const data = await hydrateCart(userId);
      res.json({ success: true, message: "Cart item updated", data });
    } catch (e) {
      next(e);
    }
  },

  removeItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      const { productId } = req.params;
      if (!productId || !Types.ObjectId.isValid(productId)) {
        return res
          .status(400)
          .json({ success: false, message: "Valid :productId is required" });
      }
      await svcRemove(userId, new Types.ObjectId(productId));
      const data = await hydrateCart(userId);
      res.json({ success: true, message: "Cart item removed", data });
    } catch (e) {
      next(e);
    }
  },

  clear: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      await clearCart(userId);
      const data = await hydrateCart(userId);
      res.json({ success: true, message: "Cart cleared", data });
    } catch (e) {
      next(e);
    }
  },

  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      const cart = await hydrateCart(userId);
      if (!cart.items.length) {
        return res
          .status(409)
          .json({
            success: false,
            message: "Cart is empty or contains unavailable products",
          });
      }
      const items = cart.items.map((i) => ({
        productId: i.product._id,
        qty: i.quantity,
        priceAtPurchase: i.price,
      }));
      const order = await Order.create({
        userId,
        items,
        total: cart.total,
        status: "placed",
      });
      await clearCart(userId);
      res
        .status(201)
        .json({ success: true, message: "Order created", data: { order } });
    } catch (e) {
      next(e);
    }
  },

  listOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = requireUserId(req, res);
      if (!userId) return;
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });
      res.json({ success: true, message: "Orders list", data: { orders } });
    } catch (e) {
      next(e);
    }
  },
};
