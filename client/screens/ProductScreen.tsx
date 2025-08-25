import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types/product";
import { ProductModal } from "@/components/modals/ProductModal";

const { width } = Dimensions.get("window");

export const ProductScreen = () => {
  const { data: products = [], isLoading, isError, refetch } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "update">("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = async (productData: Omit<Product, "_id">) => {
    try {
      await createProductMutation.mutateAsync(productData);
      Alert.alert("Success", "Product added successfully!");
      refetch(); // Refresh the products list
    } catch (error) {
      Alert.alert("Error", "Failed to add product");
      console.log(error);
    }
  };

  const handleUpdateProduct = async (productData: Omit<Product, "_id">) => {
    if (!selectedProduct) return;

    try {
      await updateProductMutation.mutateAsync({
        _id: selectedProduct._id,
        ...productData,
      });
      Alert.alert("Success", "Product updated successfully!");
      refetch(); // Refresh the products list
    } catch (error) {
      Alert.alert("Error", "Failed to update product");
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProductMutation.mutateAsync(productId);
            Alert.alert("Success", "Product deleted successfully!");
            refetch(); // Refresh the products list
          } catch (error) {
            Alert.alert("Error", "Failed to delete product");
            console.log(error);
          }
        },
      },
    ]);
  };

  const openAddModal = () => {
    setModalMode("add");
    setSelectedProduct(null);
    setModalVisible(true);
  };

  const openUpdateModal = (product: Product) => {
    setModalMode("update");
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleModalSubmit = (productData: Omit<Product, "_id">) => {
    if (modalMode === "add") {
      handleAddProduct(productData);
    } else {
      handleUpdateProduct(productData);
    }
    closeModal();
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <View style={styles.availabilityContainer}>
          <Ionicons
            name={item.isAvailable ? "checkmark-circle" : "close-circle"}
            size={16}
            color={item.isAvailable ? "#4CAF50" : "#F44336"}
          />
          <Text style={[styles.availabilityText, { color: item.isAvailable ? "#4CAF50" : "#F44336" }]}>
            {item.isAvailable ? "Available" : "Not Available"}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={() => openUpdateModal(item)}>
        <Ionicons name="create-outline" size={20} color="#007AFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item._id)}>
        <Ionicons name="trash-outline" size={20} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#F44336" />
        <Text style={styles.errorTitle}>Failed to load products</Text>
        <Text style={styles.errorMessage}>Please check your connection and try again</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Products</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <ProductModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        product={selectedProduct}
        mode={modalMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  productsList: {
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    width: (width - 40) / 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  updateButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
