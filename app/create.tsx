import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from "react-native";
import { useState, useContext } from "react";
import { AgentContext } from "../src/context/AgentContext";
import * as Crypto from "expo-crypto";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function CreateAgentScreen() {
  const { addAgent } = useContext(AgentContext);
  const insets = useSafeAreaInsets();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = async () => {
    if (!agentName || !clientName) return; // Super basic validation

    const id = await Crypto.randomUUID();

    addAgent({
      id,
      clientName,
      clientEmail,
      agentName,
      description,
      deliveryDate,
      status: "Pending",
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-[#0B0F19]" 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen 
        options={{ 
          title: "New Agent",
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }} 
      />
      <StatusBar barStyle="light-content" />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: 10, paddingHorizontal: 24 }}
      >
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 bg-indigo-500/10 rounded-full items-center justify-center border border-indigo-500/30 mb-4">
            <Feather name="cpu" size={32} color="#818CF8" />
          </View>
          <Text className="text-white text-3xl font-extrabold tracking-tight">Deploy Agent</Text>
          <Text className="text-slate-400 mt-2 text-center">Configure the details for your new automated assistant.</Text>
        </View>

        <View className="space-y-5">
          {/* Agent Name */}
          <View>
            <Text className="text-slate-400 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">Agent Name</Text>
            <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800 focus:border-indigo-500">
              <Feather name="box" size={20} color="#64748B" />
              <TextInput 
                placeholder="e.g. Sales Assistant Bot" 
                placeholderTextColor="#475569"
                className="flex-1 text-white font-medium ml-3 h-full"
                onChangeText={setAgentName} 
              />
            </View>
          </View>

          {/* Client Details */}
          <View className="flex-row space-x-3">
            <View className="flex-1 mr-3">
              <Text className="text-slate-400 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">Client</Text>
              <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
                <Feather name="user" size={20} color="#64748B" />
                <TextInput 
                  placeholder="Company" 
                  placeholderTextColor="#475569"
                  className="flex-1 text-white font-medium ml-3 h-full"
                  onChangeText={setClientName} 
                />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-slate-400 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">Delivery</Text>
              <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
                <Feather name="calendar" size={20} color="#64748B" />
                <TextInput 
                  placeholder="DD/MM/YYYY" 
                  placeholderTextColor="#475569"
                  className="flex-1 text-white font-medium ml-3 h-full"
                  onChangeText={setDeliveryDate} 
                />
              </View>
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="text-slate-400 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">Contact Email</Text>
            <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
              <Feather name="mail" size={20} color="#64748B" />
              <TextInput 
                placeholder="client@email.com" 
                placeholderTextColor="#475569"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-white font-medium ml-3 h-full"
                onChangeText={setClientEmail} 
              />
            </View>
          </View>

          {/* Description */}
          <View>
            <Text className="text-slate-400 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">Objective / Goal</Text>
            <View className="bg-[#151B2B] rounded-2xl p-4 border border-slate-800 h-32">
              <TextInput 
                placeholder="What exactly will this agent do?" 
                placeholderTextColor="#475569"
                multiline
                textAlignVertical="top"
                className="flex-1 text-white font-medium"
                onChangeText={setDescription} 
              />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 w-full px-6 pt-4 pb-10 bg-[#0B0F19]/90 border-t border-slate-800/60" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
        <TouchableOpacity
          activeOpacity={0.8}
          className={`h-16 rounded-full flex-row items-center justify-center ${agentName && clientName ? 'bg-indigo-600' : 'bg-slate-800'}`}
          onPress={handleSubmit}
          disabled={!agentName || !clientName}
          style={agentName && clientName ? {
            shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 10
          } : {}}
        >
          <Feather name="zap" size={20} color={agentName && clientName ? "white" : "#475569"} />
          <Text className={`font-bold text-lg ml-2 ${agentName && clientName ? 'text-white' : 'text-slate-500'}`}>
            Initialize Agent
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
