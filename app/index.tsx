import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../src/lib/supabase";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa todos los datos.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // Autenticación (Login)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace("/home");
      } else {
        // Inscripción (Signup)
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert("Éxito", "¡Registro completado! Si tienes activada la confirmación por email, revisa tu buzón.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#0B0F19]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1E1B4B', '#0B0F19']}
        className="absolute top-0 left-0 right-0 h-1/2 rounded-b-[60px]"
      />

      <KeyboardAvoidingView 
        className="flex-1 justify-center px-8" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-white/10 rounded-[24px] items-center justify-center mb-6 border border-white/10">
            <Feather name="cpu" size={40} color="#818CF8" />
          </View>
          <Text className="text-white text-5xl font-black tracking-tighter mb-2">kAI Nexus</Text>
          <Text className="text-slate-400 text-sm font-bold uppercase tracking-[4px] opacity-70">
            {isLogin ? "Encrypted Entry" : "New Node Enrollment"}
          </Text>
        </View>

        <View className="space-y-4">
          <View className="bg-[#151B2B] rounded-2xl flex-row items-center px-5 h-16 border border-white/5 mb-4 shadow-xl">
            <Feather name="mail" size={20} color="#475569" />
            <TextInput
              className="flex-1 text-white font-medium ml-4 h-full"
              placeholder="Protocol Email"
              placeholderTextColor="#475569"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="bg-[#151B2B] rounded-2xl flex-row items-center px-5 h-16 border border-white/5 mb-4 shadow-xl">
            <Feather name="lock" size={20} color="#475569" />
            <TextInput
              className="flex-1 text-white font-medium ml-4 h-full"
              placeholder="Access Cipher"
              placeholderTextColor="#475569"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-indigo-600 rounded-2xl h-16 items-center justify-center mt-4 shadow-2xl" 
            style={{ shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12 }}
            onPress={handleAuth}
          >
            <View className="flex-row items-center">
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className="text-white text-lg font-black tracking-widest uppercase">
                    {isLogin ? "Authenticate" : "Enroll"}
                  </Text>
                  <Feather name="arrow-right" size={20} color="white" style={{ marginLeft: 10 }} />
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          activeOpacity={0.7}
          className="mt-10 items-center bg-white/5 py-3 rounded-xl border border-white/5" 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text className="text-slate-400 text-xs font-black uppercase tracking-widest">
            {isLogin ? "Initialize New Account" : "Access Existing Node"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

