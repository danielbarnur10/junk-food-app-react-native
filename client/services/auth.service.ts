import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { api } from "./api.service";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  },
};
