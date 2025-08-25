export interface Product {
  __v: number;
  _id: string;
  title: string;
  price: number;
  image?: string;
  createdAt: Date;
  updateAt: Date;
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
