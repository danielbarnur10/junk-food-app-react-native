import { LoginRequest, RegisterRequest } from "@/types/auth";
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    credentials: LoginRequest
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    credentials: RegisterRequest
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem("authToken"),
        AsyncStorage.getItem("user"),
      ]);

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error("error initializing auth: ", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    credentials: LoginRequest
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authService.login(credentials);

      if (response.success) {
        const { token, user: userData } = response.data;

        await Promise.all([
          AsyncStorage.setItem("authToken", token),
          AsyncStorage.setItem("user", JSON.stringify(userData)),
        ]);

        const item = AsyncStorage.getItem("user");

        setUser(userData);
        return { success: true };
      }
      return { success: false, error: response.message || "Login failed" };
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "An unexpected error occurred";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      return { success: false, error: errorMessage };
    }
  };

  const register = async (
    credentials: RegisterRequest
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authService.register(credentials);

      if (response.success) {
        const { token, user: userData } = response.data;
        await Promise.all([
          AsyncStorage.setItem("authToken", token),
          AsyncStorage.setItem("user", JSON.stringify(userData)),
        ]);
        const token2 = await AsyncStorage.getItem("authToken");

        setUser(userData);
        return { success: true };
      }

      return {
        success: false,
        error: response.message || "Registration failed",
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "An unexpected error occurred";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      return { success: false, error: errorMessage };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem("authToken"),
        AsyncStorage.removeItem("user"),
      ]);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
