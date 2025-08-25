import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { View, Pressable, Button, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";
import { registerRootComponent } from "expo";
import { AppStackParamList } from "@/types/navigation";

const burgers = [
  {
    id: "b01",
    name: "Classic Cheeseburger",
    price: 12.99,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b02",
    name: "Double Bacon Burger",
    price: 15.49,
    img: "https://images.unsplash.com/photo-1550547660-7a38d69e5e3f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b03",
    name: "BBQ Smokehouse Burger",
    price: 14.99,
    img: "https://images.unsplash.com/photo-1551782450-17144c3a091e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b04",
    name: "Mushroom Swiss Burger",
    price: 13.99,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b05",
    name: "Spicy Jalapeño Burger",
    price: 13.49,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b06",
    name: "Blue Cheese Burger",
    price: 14.49,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b07",
    name: "Hawaiian Teriyaki",
    price: 13.99,
    img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b08",
    name: "Truffle Garlic",
    price: 16.49,
    img: "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b09",
    name: "Veggie Garden",
    price: 11.99,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "b10",
    name: "Breakfast Egg",
    price: 12.49,
    img: "https://images.unsplash.com/photo-1606756790138-261d2b21cd30?q=80&w=800&auto=format&fit=crop",
  },
];

type MenuProp = NativeStackNavigationProp<AppStackParamList, "Menu">;

export default function MenuPage({ navigation }: { navigation: MenuProp }) {
  return (
    <>
      <View>
        <FlatList
          data={burgers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.img} resizeMode="cover" />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Pressable>
                <Text style={styles.button}>Add To Cart</Text>
              </Pressable>
            </View>
          )}
          ListHeaderComponent={<Text style={styles.header}>🍔 Burgers</Text>}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  list: { padding: 16, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    width: 300,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    overflow: "hidden",
  },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 14, opacity: 0.8 },
  button: {
    padding: 6,
    color: "#fff",
    fontWeight: "bold",
    // marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#f8a545ff",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
});

registerRootComponent(MenuPage);
