import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  onRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
};

export function RegisterScreen({ onRegister }: Props) {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;

    if (!email.includes("@")) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }
    if (password.length < 4) {
      Alert.alert("Weak password", "Password must be at least 4 characters.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Mismatch", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await onRegister(name.trim(), email.trim(), password);
      setLoading(false);
      if (!res.ok) {
        Alert.alert("Register failed", res.error || "Unknown error");
        return;
      }
      Alert.alert("Success", "Account created. Please log in.");
      navigation.replace("Login");
    } catch (e) {
      setLoading(false);
      Alert.alert("Register error", "Unexpected error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name (optional)"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
      />

      <Pressable
        style={[styles.btn, loading && { opacity: 0.6 }]}
        onPress={submit}
      >
        <Text style={styles.btnText}>
          {loading ? "Please wait..." : "Register"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
    textAlign: "center",
    color: "#111",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  btn: {
    height: 48,
    backgroundColor: "#E11D48",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  btnText: { color: "#fff", fontWeight: "800" },
  hint: { marginTop: 10, color: "#666", fontSize: 12, textAlign: "center" },
});
