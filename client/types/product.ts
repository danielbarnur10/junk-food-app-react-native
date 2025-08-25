export interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
  isAvailable?: boolean;
}

export type ProductCreate = Omit<Product, "_id">;

export type ProductUpdate = {
  _id: string;
  title?: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
};
