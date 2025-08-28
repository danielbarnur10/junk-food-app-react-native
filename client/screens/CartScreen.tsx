import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useOrder,
  useAddOrder,
  useUpdateOrderItem,
  useRemoveOrderItem,
  useClearOrder,
} from "@/hooks/useOrders";

export default function CartScreen() {
  const { data: order, isLoading, isError, refetch, isRefetching } = useOrder();
  const { mutate: addOrder, isPending: ordering } = useAddOrder();
  const { mutate: updateItem, isPending: updating } = useUpdateOrderItem();
  const { mutate: removeItem, isPending: removing } = useRemoveOrderItem();
  const { mutate: clearOrder, isPending: clearing } = useClearOrder();

  const items = order?.items ?? [];
  const totalQty = items.reduce((acc, it) => acc + (it.quantity ?? 0), 0);
  const totalPrice = order?.total ?? 0;

  const disabled = ordering || updating || removing || clearing;

  const handleIncrease = (productId: string, currentQty: number) => {
    updateItem({ productId, qty: currentQty + 1 });
  };

  const handleDecrease = (productId: string, currentQty: number) => {
    const next = currentQty - 1;
    if (next <= 0) {
      removeItem(productId);
    } else {
      updateItem({ productId, qty: next });
    }
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const handleClear = () => {
    if (items.length === 0) return;
    Alert.alert("Clear cart", "Remove all items from cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => clearOrder() },
    ]);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Cart is empty", "Add some products first.");
      return;
    }
    addOrder(undefined as any, {
      onSuccess: () => {
        Alert.alert("Success", "Order created!");
        refetch();
      },
      onError: () => Alert.alert("Error", "Failed to create order"),
    });
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading cart…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
        <Text style={styles.errorTitle}>Failed to load cart</Text>
        <Pressable style={styles.primaryBtn} onPress={() => refetch()}>
          <Text style={styles.primaryBtnText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="cart" size={22} />
          <Text style={styles.title}>My Cart</Text>
          {!!totalQty && <Text style={styles.badge}>{totalQty}</Text>}
        </View>
        <Pressable
          style={[
            styles.clearBtn,
            (clearing || totalQty === 0) && styles.btnDisabled,
          ]}
          onPress={handleClear}
          disabled={clearing || totalQty === 0}
        >
          <Ionicons name="trash-outline" size={18} color="#F44336" />
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="bag-outline" size={48} color="#999" />
          <Text style={styles.muted}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i, idx) => i.product?._id ?? `${idx}`}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => {
            const productId = item.product?._id ?? "";
            const title =
              item.product?.title ??
              (productId ? `#${productId.slice(-5)}` : "Product");
            const image = item.product?.image;
            const unitPrice = item.price ?? item.product?.price ?? 0;
            const qty = item.quantity ?? 0;
            const linePrice = unitPrice * qty;

            return (
              <View style={styles.card}>
                <View style={styles.row}>
                  <Image
                    source={{ uri: image || "https://via.placeholder.com/100" }}
                    style={styles.thumb}
                  />
                  <View style={styles.info}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {title}
                    </Text>
                    <Text style={styles.itemPrice}>${unitPrice}</Text>

                    <View style={styles.qtyRow}>
                      <Pressable
                        style={[styles.qtyBtn, disabled && styles.btnDisabled]}
                        onPress={() => handleDecrease(productId, qty)}
                        disabled={disabled || !productId}
                      >
                        <Ionicons name="remove" size={16} />
                      </Pressable>

                      <Text style={styles.qtyText}>{qty}</Text>

                      <Pressable
                        style={[styles.qtyBtn, disabled && styles.btnDisabled]}
                        onPress={() => handleIncrease(productId, qty)}
                        disabled={disabled || !productId}
                      >
                        <Ionicons name="add" size={16} />
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.rightCol}>
                    <Text style={styles.linePrice}>${linePrice}</Text>
                    <Pressable
                      style={[styles.removeBtn, disabled && styles.btnDisabled]}
                      onPress={() => handleRemove(productId)}
                      disabled={disabled || !productId}
                    >
                      <Ionicons name="close" size={16} color="#F44336" />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
          ListFooterComponent={<View style={{ height: 12 }} />}
        />
      )}

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalPrice}</Text>
        </View>
        <Pressable
          style={[
            styles.checkoutBtn,
            (disabled || totalQty === 0) && styles.btnDisabled,
          ]}
          onPress={handleCheckout}
          disabled={disabled || totalQty === 0}
        >
          <Text style={styles.checkoutText}>
            {ordering ? "Processing…" : "Checkout"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: 30 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  muted: { color: "#7f8c8d", marginTop: 8 },
  errorTitle: { fontSize: 16, fontWeight: "700", marginVertical: 8 },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 20, fontWeight: "bold" },
  badge: {
    marginLeft: 6,
    backgroundColor: "#2ecc71",
    color: "#fff",
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
  },

  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#F44336",
    borderRadius: 8,
  },
  clearText: { color: "#F44336", fontWeight: "600" },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  card: {
    borderRadius: 12,
    backgroundColor: "#fafafa",
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  row: { flexDirection: "row", gap: 12 },
  thumb: { width: 72, height: 72, borderRadius: 8, backgroundColor: "#ddd" },
  info: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "700" },
  itemPrice: { fontSize: 14, color: "#007AFF", marginTop: 2 },
  qtyRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  qtyText: { minWidth: 22, textAlign: "center", fontWeight: "700" },

  rightCol: { alignItems: "flex-end", justifyContent: "space-between" },
  linePrice: { fontSize: 15, fontWeight: "700" },
  removeBtn: {
    marginTop: 8,
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f2d7d7",
    backgroundColor: "#fff",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { color: "#7f8c8d", fontWeight: "600" },
  totalValue: { fontSize: 20, fontWeight: "800" },
  checkoutBtn: {
    backgroundColor: "#ed9090ff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  primaryBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  btnDisabled: { opacity: 0.6 },
});
