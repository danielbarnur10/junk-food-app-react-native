import { User } from "./user";

export type LoginRequest = {
    email: string;
    password: string;
    username?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
};
