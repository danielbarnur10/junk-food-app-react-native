import { Product } from "./product";

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

// When fetching orders from the server (populated with product info)
export interface OrderItem {
  product: Product;       // full product details
  quantity: number;
  price: number;          // unit price (copied at order time, so price doesn't change later)
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// For creating new orders, you usually just send productId, qty, price
export interface OrderCreateItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderCreate {
  items: OrderCreateItem[];
  total: number;
}