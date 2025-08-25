import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { View, Pressable, Text, StyleSheet, Image, ScrollView } from "react-native";
import { AppStackParamList } from "@/types/navigation";
import ProductCard from "../components/ProductCard";
import { registerRootComponent } from "expo";

type CartProp = NativeStackNavigationProp<AppStackParamList, "Cart">;

export default function CartPage({ navigation }: { navigation: CartProp }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cart}>
          <Ionicons size={20} name="cart" />
          <Text>Cart:</Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cart: {
    backgroundColor: "#ed9090ff",
    borderRadius: 5,
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3436",
    letterSpacing: 2,
  },
});

registerRootComponent(CartPage);
