import { Platform } from "react-native";
import Constants from "expo-constants";

function normalizeBase(u?: string | null) {
  if (!u) return null;
  let s = u.trim();
  while (s.endsWith("/")) s = s.slice(0, -1);
  if (s.toLowerCase().endsWith("/api")) s = s.slice(0, -4);
  return s;
}

function resolveDevBase(): string {
  const env = normalizeBase(process.env.EXPO_PUBLIC_API_BASE_URL || null);
  if (env) return `${env}/api`;

  const hostUri =
    (Constants as any)?.expoConfig?.hostUri ||
    (Constants as any)?.manifest?.debuggerHost ||
    (Constants as any)?.manifest2?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = String(hostUri).split(":")[0];
    return `http://${host}:3001/api`;
  }

  if (Platform.OS === "android") return "http://10.0.2.2:3001/api";
  return "http://192.168.1.100:3001/api";
}

const isDev = process.env.NODE_ENV === "development";
export const API_URL = isDev
  ? resolveDevBase()
  : (normalizeBase(process.env.EXPO_PUBLIC_API_BASE_URL || "") ||
      "https://example.com") + "/api";
