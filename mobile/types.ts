export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  qty: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
};
