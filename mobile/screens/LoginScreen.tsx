import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

type Props = {
  onLogin: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  onGoRegister: () => void;
};

export function LoginScreen({ onLogin, onGoRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await onLogin(email, password);
      setLoading(false);
      if (!res.ok) Alert.alert("Login failed", res.error || "Unknown error");
    } catch {
      setLoading(false);
      Alert.alert("Login error", "Unexpected error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <Pressable
        style={[styles.btn, loading && { opacity: 0.6 }]}
        onPress={submit}
      >
        <Text style={styles.btnText}>
          {loading ? "Please wait..." : "Login"}
        </Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onGoRegister}>
        <Text style={styles.linkText}>Create an account</Text>
      </Pressable>

      <Pressable
        style={styles.smallLink}
        onPress={() =>
          Alert.alert("Demo", "Forgot password is not implemented in demo.")
        }
      >
        <Text style={styles.smallText}>Forgot password?</Text>
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
  link: { alignItems: "center", marginTop: 12 },
  linkText: { color: "#E11D48", fontWeight: "700" },
  smallLink: { alignItems: "center", marginTop: 6 },
  smallText: { color: "#555", fontSize: 12 },
  hint: { marginTop: 10, color: "#666", fontSize: 12, textAlign: "center" },
});
