import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types/product";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, "_id">) => void;
  product?: Product | null;
  mode: "add" | "update";
}

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  onClose,
  onSubmit,
  product,
  mode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (product && mode === "update") {
      setFormData({
        title: product.title,
        price: product.price.toString(),
        image: product.image || "",
        isAvailable: product.isAvailable || true,
      });
    } else {
      setFormData({
        title: "",
        price: "",
        image: "",
        isAvailable: true,
      });
    }
  }, [product, mode, visible]);

  const handleSubmit = () => {
    if (!formData.title || !formData.price || !formData.image) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    onSubmit({
      title: formData.title,
      price,
      image: formData.image,
      isAvailable: formData.isAvailable,
    });

    if (mode === "add") {
      setFormData({ title: "", price: "", image: "", isAvailable: true });
    }
  };

  const isAddMode = mode === "add";
  const modalTitle = isAddMode ? "Add New Product" : "Update Product";
  const submitButtonText = isAddMode ? "Add Product" : "Update Product";

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <Text style={styles.inputLabel}>Product Name</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              placeholder="Enter product name"
              placeholderTextColor="#999"
            />

            <Text style={styles.inputLabel}>Price ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              placeholder="Enter price"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={formData.image}
              onChangeText={(text) => setFormData({ ...formData, image: text })}
              placeholder="Enter image URL"
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              style={styles.availabilityToggle}
              onPress={() =>
                setFormData({ ...formData, isAvailable: !formData.isAvailable })
              }
            >
              <Ionicons
                name={formData.isAvailable ? "checkmark-circle" : "close-circle"}
                size={24}
                color={formData.isAvailable ? "#4CAF50" : "#F44336"}
              />
              <Text style={styles.availabilityText}>
                {formData.isAvailable ? "Available" : "Not Available"}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{submitButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    color: "#1A1A1A",
  },
  availabilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    color: "#333",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
