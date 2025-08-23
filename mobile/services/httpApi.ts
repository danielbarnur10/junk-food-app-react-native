import { Product, User } from "../types";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:3000";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      ...init,
    });
    const ct = res.headers.get("content-type") || "";
    let body: any = undefined;
    if (ct.includes("application/json")) {
      body = await res.json().catch(() => undefined);
    } else {
      body = await res.text().catch(() => undefined);
    }
    if (!res.ok) {
      const msg = (body && (body.message || body.error)) || String(body) || `HTTP ${res.status}`;
      return { ok: false, status: res.status, error: msg };
    }
    return { ok: true, status: res.status, data: body as T };
  } catch (e: any) {
    return { ok: false, status: 0, error: e?.message || "Network error" };
  }
}

export const httpApi = {
  baseUrl: BASE_URL,
  async health(): Promise<boolean> {
    const r = await jsonFetch<string>(`${BASE_URL}/health-check`);
    return !!r.ok;
  },
  auth: {
    async register(name: string, email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
      const payload = { username: name || email.split("@")[0], email, password };
      const res = await jsonFetch<any>(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) return { ok: false, error: res.error || "Register failed" };
      return { ok: true };
    },
    async login(email: string, password: string): Promise<{ ok: true; token: string; user?: User } | { ok: false; error: string }> {
      const payload = { email, password, username: "" };
      const res = await jsonFetch<any>(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) return { ok: false, error: res.error || "Login failed" };
      const token = (res.data && (res.data.token || res.data.accessToken)) || "";
      if (!token) return { ok: false, error: "No token in response" };
      const user: User | undefined = { id: "-", email, password, name: email.split("@")[0] } as any;
      return { ok: true, token, user };
    },
    async logout(token: string): Promise<void> {
      await jsonFetch<any>(`${BASE_URL}/auth/logout`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    async me(token: string): Promise<boolean> {
      const res = await jsonFetch<any>(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return !!res.ok;
    },
  },
};
