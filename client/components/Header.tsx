import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Header() {
  return (
    <View style={styles.container}>
      <Ionicons size={20} name="fast-food" />
      <Text style={styles.text}>Burgerim</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    width: 400,
    height: 50,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#efb359fe",
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
