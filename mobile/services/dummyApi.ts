import db, { Token } from "./dummyDb";
import { Product, User } from "../types";
import { delay } from "./delay";

function makeToken(userId: string): Token {
  return `token_${userId}_${Date.now()}`;
}

export const api = {
  auth: {
    async register(name: string, email: string, password: string): Promise<{ ok: true; token: Token; user: User } | { ok: false; error: string }> {
      await delay(400);
      const emailNorm = email.trim().toLowerCase();
      if (db.users.some(u => u.email.toLowerCase() == emailNorm)) {
        return { ok: false, error: "Email already exists" };
      }
      const user: User = { id: String(Date.now()), name, email: emailNorm, password };
      db.users.push(user);
      const token = makeToken(user.id);
      db.tokens.add(token);
      return { ok: true, token, user };
    },

    async login(email: string, password: string): Promise<{ ok: true; token: Token; user: User } | { ok: false; error: string }> {
      await delay(300);
      const emailNorm = email.trim().toLowerCase();
      const user = db.users.find(u => u.email.toLowerCase() === emailNorm);
      if (!user || user.password !== password) {
        return { ok: false, error: "Invalid email or password" };
      }
      const token = makeToken(user.id);
      db.tokens.add(token);
      return { ok: true, token, user };
    },

    async logout(token: Token): Promise<void> {
      await delay(100);
      db.tokens.delete(token);
    },
  },

  products: {
    async list(): Promise<Product[]> {
      await delay(300);
      // return a shallow copy
      return db.products.slice();
    },

    async getById(id: string): Promise<Product | null> {
      await delay(200);
      const p = db.products.find(p => p.id === id);
      return p ?? null;
    },
  },
};
