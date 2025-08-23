import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../types";

type Props = { onLogout?: () => void; currentUser: User | null };

export function InfoScreen({ onLogout, currentUser }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Burger & Junk-Food Place</Text>

      {currentUser && (
        <View style={[styles.row, { marginBottom: 14 }]}>
          <Ionicons name="person-circle" size={22} color="#E11D48" />
          <Text style={[styles.text, { fontWeight: "700" }]}>
            {currentUser.name ? `${currentUser.name} • ` : ""}
            {currentUser.email}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Ionicons name="home" size={20} color="#E11D48" />
        <Text style={styles.text}>Family-style burger house</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="time" size={20} color="#E11D48" />
        <Text style={styles.text}>Sun-Thu 11:00–23:00, Fri 11:00–15:00</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="location" size={20} color="#E11D48" />
        <Text style={styles.text}>123 Burger St, Tel Aviv</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="call" size={20} color="#E11D48" />
        <Text style={styles.text}>+972-50-000-0000</Text>
      </View>

      <Pressable style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 14, color: "#111" },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  text: { fontSize: 16, color: "#333" },
  logoutBtn: {
    marginTop: 16,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "800" },
  note: { marginTop: 10, color: "#666", fontSize: 12 },
});
