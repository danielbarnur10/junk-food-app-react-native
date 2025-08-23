import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { api } from "../services/dummyApi";
import { CartItem, Product } from "../types";
import { MainTabParamList } from "../App";

type Props = {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onClear: () => void;
};

export function MenuScreen({ cartItems, onAdd, onClear }: Props) {
  const route = useRoute<RouteProp<MainTabParamList, "Menu">>();
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    api.products
      .list()
      .then((list) => {
        if (!mounted) return;
        setProducts(list);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load products");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const add = (route.params as any)?.add as CartItem | undefined;
      const clear = (route.params as any)?.clear as boolean | undefined;

      if (clear) {
        onClear();
        navigation.setParams({ clear: undefined });
      }

      if (add) {
        onAdd(add);
        navigation.setParams({ add: undefined });
      }
    }, [route.params, navigation, onAdd, onClear])
  );

  const qtyTotal = useMemo(
    () => cartItems.reduce((acc, it) => acc + it.qty, 0),
    [cartItems]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Cart", { items: cartItems })}
          style={{ paddingHorizontal: 8, paddingVertical: 4 }}
        >
          <View>
            <Ionicons name="cart" size={24} color="#E11D48" />
            {qtyTotal > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{qtyTotal}</Text>
              </View>
            )}
          </View>
        </Pressable>
      ),
      headerTitle: "Menu",
    });
  }, [navigation, cartItems, qtyTotal]);

  const { width } = useWindowDimensions();
  const numColumns = width >= 520 ? 2 : 1;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const src = products;
    if (!q) return src;
    return src.filter((p) => p.title.toLowerCase().includes(q));
  }, [search, products]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search…"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        key={numColumns}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Card
              item={item}
              onPress={() => navigation.navigate("ProductDetails", item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            {loading ? "Loading…" : error ? "Products not found" : "No results"}
          </Text>
        }
      />
    </View>
  );
}

function Card({ item, onPress }: { item: Product; onPress: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.thumbWrap}>
        <Image
          source={{ uri: item.image }}
          style={styles.img}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price}>{`₪${item.price}`}</Text>
      <Pressable style={styles.detailsBtn} onPress={onPress}>
        <Text style={styles.detailsText}>Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  search: {
    margin: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  thumbWrap: {
    width: "100%",
    height: undefined,
    aspectRatio: 0.85,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  img: { width: "100%", height: "100%" },
  title: { fontSize: 16, fontWeight: "600", color: "#111", marginTop: 8 },
  price: { marginTop: 4, fontSize: 14, color: "#444" },
  detailsBtn: {
    marginTop: 10,
    backgroundColor: "#E11D48",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  detailsText: { color: "white", fontWeight: "700" },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#E11D48",
    paddingHorizontal: 6,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 18,
  },
  badgeText: { color: "white", fontSize: 11, fontWeight: "800" },
});
