import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { CartItem } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export function ProductDetailsScreen({ route, navigation }: Props) {
  const { id, title, price, image } = route.params;
  const [qty, setQty] = useState(1);
  const [okVisible, setOkVisible] = useState(false);

  const addToOrder = () => {
    const payload: CartItem = { id, title, price, image, qty };

    setOkVisible(true);
    setTimeout(() => {
      setOkVisible(false);
      navigation.navigate("MainTabs", {
        screen: "Menu",
        params: { add: payload },
      });
    }, 900);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroWrap}>
        <Image source={{ uri: image }} style={styles.hero} resizeMode="cover" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{`₪${price}`}</Text>

      <Text style={styles.desc}>
        A juicy burger / junk-food item you will love. Fresh bun, quality
        ingredients, and crispy sides. Served hot!
      </Text>

      <View style={styles.qtyRow}>
        <Pressable
          style={styles.qtyBtn}
          onPress={() => setQty((q) => Math.max(1, q - 1))}
        >
          <Text style={styles.qtyBtnText}>–</Text>
        </Pressable>

        <Text style={styles.qtyText}>{qty}</Text>

        <Pressable
          style={styles.qtyBtn}
          onPress={() => setQty((q) => Math.min(99, q + 1))}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.cta} onPress={addToOrder}>
        <Text style={styles.ctaText}>Add to Order</Text>
      </Pressable>

      <Modal visible={okVisible} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>Added to cart ✓</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  heroWrap: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  hero: { width: "100%", height: "100%" },
  title: { fontSize: 24, fontWeight: "800", color: "#111" },
  price: { fontSize: 18, color: "#444", marginTop: 4 },
  desc: { marginTop: 10, fontSize: 14, color: "#555", lineHeight: 20 },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { fontSize: 22, fontWeight: "900", color: "#111" },
  qtyText: {
    fontSize: 18,
    fontWeight: "700",
    minWidth: 28,
    textAlign: "center",
  },

  cta: {
    marginTop: 18,
    backgroundColor: "#E11D48",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaText: { color: "white", fontWeight: "800", fontSize: 16 },

  modalWrap: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalText: { fontWeight: "700", color: "#111" },
});
