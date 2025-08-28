import { Product } from "./product";

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
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

export interface OrderCreateItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderCreate {
  items: OrderCreateItem[];
  total: number;
}
