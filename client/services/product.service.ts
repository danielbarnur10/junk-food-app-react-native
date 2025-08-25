import { Product, ProductCreate, ProductUpdate } from "@/types/product";
import { api } from "./api.service";

export const productService = {
  async getAll(): Promise<Product[]> {
    const res = await api.get<{ success: boolean; data: Product[] }>(
      "/products"
    );
    return res.data.data;
  },

  async create(product: ProductCreate): Promise<Product> {
    const res = await api.post<{ success: boolean; data: Product }>(
      "/products",
      product
    );
    return res.data.data;
  },

  async update(product: ProductUpdate): Promise<Product> {
    const res = await api.put<{ success: boolean; data: Product }>(
      `/products/${product._id}`,
      product
    );
    return res.data.data;
  },

  async delete(id: string): Promise<Product> {
    const res = await api.delete<{ success: boolean; data: Product }>(
      `/products/${id}`
    );
    return res.data.data;
  },
};
