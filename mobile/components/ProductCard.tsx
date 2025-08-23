import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Product } from "../types";

type Props = {
  product: Product;
  onPressDetails: () => void;
};

export function ProductCard({ product, onPressDetails }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.img} />
      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>
      <Text style={styles.price}>{`₪${product.price}`}</Text>
      <Pressable style={styles.btn} onPress={onPressDetails}>
        <Text style={styles.btnText}>Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    flex: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  img: { width: "100%", height: 110, borderRadius: 10, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: "600", color: "#111" },
  price: { marginTop: 4, fontSize: 14, color: "#444" },
  btn: {
    marginTop: 10,
    backgroundColor: "#E11D48",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "700" },
});
