import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
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
      className="flex-1 bg-slate-900 justify-center" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="px-6">
        <View className="mb-10">
          <Text className="text-white text-4xl font-extrabold mb-2 text-center">kAI Nexus</Text>
          <Text className="text-slate-400 text-base text-center">
            {isLogin ? "Welcome back, agent." : "Join the Nexus."}
          </Text>
        </View>

        <TextInput
          className="bg-slate-800 text-white rounded-xl p-4 text-base mb-4 border border-slate-700"
          placeholder="Email address"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="bg-slate-800 text-white rounded-xl p-4 text-base mb-4 border border-slate-700"
          placeholder="Password"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          className="bg-indigo-500 rounded-xl p-4 items-center mt-2 shadow-lg shadow-indigo-500/30" 
          onPress={handleAuth}
        >
          <Text className="text-white text-base font-bold tracking-wide">
            {isLogin ? "Access Nexus" : "Register"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-6 items-center p-2" onPress={() => setIsLogin(!isLogin)}>
          <Text className="text-slate-400 text-sm">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
