import { Product, User } from "../types";
import { MENU } from "../data/menu";

export type Token = string;

const FALLBACK: Product[] = [
  {
    id: "b1",
    title: "Classic Burger",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=60",
  },
  {
    id: "b2",
    title: "Cheese Burger",
    price: 46,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=60",
  },
  {
    id: "s1",
    title: "Fries",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1541592553160-82008b127ccb?w=1200&q=60",
  },
  {
    id: "d1",
    title: "Cola",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1600275669283-4d8a1a54a21f?w=1200&q=60",
  },
];

const initialProducts: Product[] =
  Array.isArray(MENU) && MENU.length ? MENU : FALLBACK;

const db = {
  users: [] as User[],
  products: initialProducts.slice(),
  tokens: new Set<Token>(),
};

export default db;
