import React from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";

type ProductProps = {
  name: string;
  price: number;
  img?: string;
};
export default function ProductCard(Props: ProductProps) {
  function handleButtonClick() {
    console.log("Button Clicked!");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: Props.img }} />
      <Text>{Props.name}</Text>
      <Text style={styles.price}>${Props.price}</Text>
      <Pressable style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.buttonTitle}>Add {Props.name} To Cart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    width: 200,
    height: 200,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    // For Android Devices
    elevation: 10,

    // For iOS Devices
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  img: {
    width: 60,
    height: 60,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "rgba(81, 211, 58, 1)",
    color: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#fff",
  },
  price: {
    color: "gray",
    fontSize: 11,
  },
});
