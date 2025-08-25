import { api } from "./api.service";
import { Order } from "@/types/orders";

export const orderService = {
  async get(): Promise<Order> {
    const res = await api.get('/order');
    console.log(res);
    return res.data.data;
  },

  async create(payload: { productId: string; qty: number }): Promise<Order> {
    const res = await api.post<{ success: boolean; data: Order }>(
      "/order/items",
      payload
    );
    return res.data.data;
  },

  async updateItem(productId: string, qty: number): Promise<Order> {
    const res = await api.patch<{ success: boolean; data: Order }>(
      `/order/items/${productId}`,
      { qty }
    );
    return res.data.data;
  },

  async removeItem(productId: string): Promise<Order> {
    const res = await api.delete<{ success: boolean; data: Order }>(
      `/order/items/${productId}`
    );
    return res.data.data;
  },

  async clear(): Promise<Order> {
    const res = await api.delete<{ success: boolean; data: Order }>("/cart");
    return res.data.data;
  },
};