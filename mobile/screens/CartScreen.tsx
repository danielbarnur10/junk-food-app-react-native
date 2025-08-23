import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { CartItem } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export function CartScreen({ route, navigation }: Props) {
  const items: CartItem[] = Array.isArray(route.params?.items)
    ? route.params.items
    : [];

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
    [items]
  );

  const formatILS = (n: number) => `₪${Math.round(n)}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle} numberOfLines={1}>
              {item.title} × {item.qty}
            </Text>
            <Text style={styles.rowPrice}>
              {formatILS(item.price * item.qty)}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 24 }}>
            Cart is empty
          </Text>
        }
      />

      <View style={styles.totalBox}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalVal}>{formatILS(subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalVal}>{formatILS(subtotal)}</Text>
        </View>

        <Pressable
          style={styles.clearBtn}
          onPress={() =>
            navigation.navigate("MainTabs", {
              screen: "Menu",
              params: { clear: true },
            })
          }
        >
          <Text style={styles.clearText}>Clear All</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowTitle: { fontWeight: "600", color: "#222", maxWidth: "70%" },
  rowPrice: { fontWeight: "700", color: "#111" },
  totalBox: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: { color: "#333" },
  totalVal: { fontWeight: "800", color: "#111" },
  clearBtn: {
    marginTop: 10,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  clearText: { color: "#fff", fontWeight: "800" },
});
