import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAddToCart } from "@/hooks/useCart";

export function ProductCard({ item }: { item: any }) {
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAdd = () => {
    const pid = item?._id ?? item?.id;
    if (!pid) return;
    addToCart({ productId: pid, qty: 1 });
  };

  return (
    <Pressable onPress={handleAdd} disabled={isPending}>
      <Ionicons name="cart-outline" size={20} color="#007AFF" />
    </Pressable>
  );
}
