import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { router, Stack } from "expo-router";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    // Navigate to the main app screen and prevent returning to the login screen
    router.replace("/home" as any);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>kAI Nexus</Text>
          <Text style={styles.subtitle}>
            {isLogin ? "Welcome back, agent." : "Join the Nexus."}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isLogin ? "Access Nexus" : "Register"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchButton} onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 8,
    elevation: 4,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  switchButton: {
    marginTop: 24,
    alignItems: "center",
    padding: 10,
  },
  switchText: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
