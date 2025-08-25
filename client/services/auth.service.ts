import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";
import { api } from "./api.service";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  },
};
