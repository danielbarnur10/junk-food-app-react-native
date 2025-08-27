import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";

async function readToken(): Promise<string | null> {
  const keys = ["authToken", "token", "accessToken", "jwt"];
  for (const k of keys) {
    const v = await AsyncStorage.getItem(k);
    if (v) return v.replace(/^"|"$/g, "");
  }
  const rawUser = await AsyncStorage.getItem("user");
  if (rawUser) {
    try {
      const u = JSON.parse(rawUser);
      return u?.token || u?.jwt || null;
    } catch {}
  }
  return null;
}

async function readUserId(): Promise<string | null> {
  const rawUser = await AsyncStorage.getItem("user");
  if (rawUser) {
    try {
      const u = JSON.parse(rawUser);
      return u?._id || u?.id || null;
    } catch {}
  }
  return process.env.EXPO_PUBLIC_DEV_USER_ID || null;
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config: any) => {
  const token = await readToken();
  const uid = await readUserId();
  if (token && config.headers) config.headers.authorization = `Bearer ${token}`;
  if (uid && config.headers) config.headers["x-user-id"] = uid;
  return config;
});
