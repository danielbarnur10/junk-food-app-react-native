import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Ionicons name="person" size={24} />
        Profile Page
      </Text>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user?.username}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>

        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user?._id}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  userInfo: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
