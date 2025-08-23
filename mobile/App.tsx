import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { MenuScreen } from "./screens/MenuScreen";
import { InfoScreen } from "./screens/InfoScreen";
import { ProductDetailsScreen } from "./screens/ProductDetailsScreen";
import { CartScreen } from "./screens/CartScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { CartItem, Product, User } from "./types";

export type RootStackParamList = {
  MainTabs: { screen?: "Menu" | "Info"; params?: any } | undefined;
  ProductDetails: Product;
  Cart: { items: CartItem[] };
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Menu: { add?: CartItem; clear?: boolean } | undefined;
  Info: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function MainTabs({
  onLogout,
  currentUser,
  cartItems,
  onAdd,
  onClear,
}: {
  onLogout?: () => void;
  currentUser?: User | null;
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onClear: () => void;
}) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#E11D48",
        tabBarInactiveTintColor: "#777",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === "Menu"
              ? "fast-food"
              : route.name === "Info"
              ? "information-circle"
              : "ellipse";
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Menu" options={{ headerTitle: "Menu" }}>
        {() => (
          <MenuScreen cartItems={cartItems} onAdd={onAdd} onClear={onClear} />
        )}
      </Tabs.Screen>

      <Tabs.Screen name="Info" options={{ headerTitle: "Info" }}>
        {() => (
          <InfoScreen onLogout={onLogout} currentUser={currentUser ?? null} />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (
    email: string,
    password: string
  ): { ok: boolean; error?: string } => {
    const user = users.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (!user || user.password !== password)
      return { ok: false, error: "Invalid email or password" };
    setToken(`demo-token-${Date.now()}`);
    setCurrentUser(user);
    return { ok: true };
  };

  const register = (
    name: string,
    email: string,
    password: string
  ): { ok: boolean; error?: string } => {
    const exists = users.some(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) return { ok: false, error: "Email already exists" };
    const user: User = { id: String(Date.now()), name, email, password };
    setUsers((prev) => [...prev, user]);
    setToken(`demo-token-${Date.now()}`);
    setCurrentUser(user);
    return { ok: true };
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setCartItems([]);
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (add: CartItem) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === add.id);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + add.qty };
        return clone;
      }
      return [...prev, add];
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <RootStack.Navigator>
        {token ? (
          <>
            <RootStack.Screen name="MainTabs" options={{ headerShown: false }}>
              {() => (
                <MainTabs
                  onLogout={logout}
                  currentUser={currentUser}
                  cartItems={cartItems}
                  onAdd={addToCart}
                  onClear={clearCart}
                />
              )}
            </RootStack.Screen>

            <RootStack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ title: "Product" }}
            />
            <RootStack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Your Cart" }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen name="Login" options={{ headerShown: false }}>
              {({ navigation }) => (
                <LoginScreen
                  onLogin={(email, password) => {
                    const res = login(email, password);
                    if (!res.ok) return res;
                    return { ok: true };
                  }}
                  onGoRegister={() => navigation.navigate("Register")}
                />
              )}
            </RootStack.Screen>
            <RootStack.Screen
              name="Register"
              options={{ title: "Create Account" }}
            >
              {() => (
                <RegisterScreen
                  onRegister={(name, email, password) =>
                    register(name, email, password)
                  }
                />
              )}
            </RootStack.Screen>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
