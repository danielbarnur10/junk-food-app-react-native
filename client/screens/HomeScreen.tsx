import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { HomeScreenProps } from "@/types/navigation";

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Burger Palace!</Text>
      <Image source={require("@/assets/images/burgerLogo.png")} style={{ width: "auto", height: 400 }} />
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
