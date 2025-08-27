import { Types } from "mongoose";
import { Cart } from "../models/Cart";

export async function getOrCreateCart(userId: Types.ObjectId) {
  const existing = await Cart.findOne({ userId });
  if (existing) return existing;
  return Cart.create({ userId, items: [] });
}

export async function addItem(
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  qty: number
) {
  const cart = await getOrCreateCart(userId);
  const i = cart.items.findIndex(
    (x) => String(x.productId) === String(productId)
  );
  if (i >= 0) cart.items[i].qty += qty;
  else cart.items.push({ productId, qty });
  await cart.save();
  return cart;
}

export async function updateItem(
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  qty: number
) {
  const cart = await getOrCreateCart(userId);
  const i = cart.items.findIndex(
    (x) => String(x.productId) === String(productId)
  );
  if (i < 0) return cart;
  if (qty <= 0) cart.items.splice(i, 1);
  else cart.items[i].qty = qty;
  await cart.save();
  return cart;
}

export async function removeItem(
  userId: Types.ObjectId,
  productId: Types.ObjectId
) {
  const cart = await getOrCreateCart(userId);
  cart.items = cart.items.filter(
    (x) => String(x.productId) !== String(productId)
  );
  await cart.save();
  return cart;
}

export async function clearCart(userId: Types.ObjectId) {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
}
