import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useAuth } from "@/context/authContext";
import { registerSchema, RegisterFormData } from "@/schemas/auth.schema";
import { RegisterScreenProps } from "@/types/navigation";

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "test@gmail.com",
    email: "test@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    try {
      registerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Partial<RegisterFormData> = {};
      error.errors?.forEach((err: any) => {
        if (err.path) {
          newErrors[err.path[0] as keyof RegisterFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (result.success) {
        Alert.alert("Success", "Registration successful!");
      } else {
        // Display the specific backend error message
        Alert.alert("Error", result.error || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      // Handle unexpected errors
      let errorMessage = "Something went wrong. Please try again.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, errors.username && styles.inputError]}
          placeholder="Full Name"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          autoCapitalize="words"
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Creating Account..." : "Register"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
