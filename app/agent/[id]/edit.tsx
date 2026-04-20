import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from "react-native";
import { useState, useContext, useEffect } from "react";
import { AgentContext } from "../../../src/context/AgentContext";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function EditAgentScreen() {
  const { id } = useLocalSearchParams();
  const { agents, updateAgent } = useContext(AgentContext);
  const insets = useSafeAreaInsets();

  const existingAgent = agents.find(a => a.id === id);

  const [agentName, setAgentName] = useState(existingAgent?.agentName || "");
  const [clientName, setClientName] = useState(existingAgent?.clientName || "");
  const [clientEmail, setClientEmail] = useState(existingAgent?.clientEmail || "");
  const [description, setDescription] = useState(existingAgent?.description || "");
  const [deliveryDate, setDeliveryDate] = useState(existingAgent?.deliveryDate || "");
  const [category, setCategory] = useState(existingAgent?.category || "Technical");
  const [priority, setPriority] = useState(existingAgent?.priority || "Medium");

  useEffect(() => {
    if (!existingAgent) {
      router.back();
    }
  }, [existingAgent]);

  const handleUpdate = () => {
    if (!agentName || !clientName) return;
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    updateAgent(id as string, {
      agentName,
      clientName,
      clientEmail,
      description,
      deliveryDate,
      category,
      priority,
    });

    router.back();
  };

  if (!existingAgent) return null;

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-[#0B0F19]" 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen 
        options={{ 
          title: "Update Parameters",
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
        <View className="space-y-6 mt-4">
          {/* Agent Name */}
          <View>
            <Text className="text-slate-500 font-bold mb-2 ml-1 text-[10px] uppercase tracking-[2px]">Agent Identity</Text>
            <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
              <Feather name="cpu" size={20} color="#6366F1" />
              <TextInput 
                placeholder="Agent Name" 
                placeholderTextColor="#475569"
                className="flex-1 text-white font-medium ml-3 h-full"
                onChangeText={setAgentName} 
                value={agentName}
              />
            </View>
          </View>

          {/* Category Selector */}
          <View>
            <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Primary Module</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {["Sales", "Support", "Security", "Creative", "Technical"].map((cat) => (
                <TouchableOpacity 
                  key={cat}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setCategory(cat as any);
                  }}
                  className={`mr-2 px-5 py-2.5 rounded-xl border ${category === cat ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}
                >
                  <Text className={`text-xs font-bold ${category === cat ? 'text-white' : 'text-slate-400'}`}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Client Details */}
          <View className="flex-row space-x-3">
            <View className="flex-1 mr-3">
              <Text className="text-slate-500 font-bold mb-2 ml-1 text-[10px] uppercase tracking-[2px]">Company</Text>
              <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
                <Feather name="briefcase" size={18} color="#94A3B8" />
                <TextInput 
                  placeholder="Client Name" 
                  placeholderTextColor="#475569"
                  className="flex-1 text-white font-medium ml-3 h-full"
                  onChangeText={setClientName} 
                  value={clientName}
                />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-slate-500 font-bold mb-2 ml-1 text-[10px] uppercase tracking-[2px]">Deadline</Text>
              <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
                <Feather name="calendar" size={18} color="#94A3B8" />
                <TextInput 
                  placeholder="DD/MM/YYYY" 
                  placeholderTextColor="#475569"
                  className="flex-1 text-white font-medium ml-3 h-full"
                  onChangeText={setDeliveryDate} 
                  value={deliveryDate}
                />
              </View>
            </View>
          </View>

          {/* Priority */}
          <View>
            <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Deployment Priority</Text>
            <View className="flex-row space-x-2">
              {["Low", "Medium", "High", "Critical"].map((p) => (
                <TouchableOpacity 
                  key={p}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setPriority(p as any);
                  }}
                  className={`flex-1 py-3 rounded-xl border items-center ${priority === p ? 'bg-slate-800 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}
                >
                  <View className={`w-1.5 h-1.5 rounded-full mb-1 ${p === 'Critical' ? 'bg-rose-500' : p === 'High' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                  <Text className={`text-[10px] font-bold ${priority === p ? 'text-white' : 'text-slate-500'}`}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="text-slate-500 font-bold mb-2 ml-1 text-[10px] uppercase tracking-[2px]">Contact Protocol</Text>
            <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-14 border border-slate-800">
              <Feather name="mail" size={20} color="#94A3B8" />
              <TextInput 
                placeholder="client@nexus.io" 
                placeholderTextColor="#475569"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-white font-medium ml-3 h-full"
                onChangeText={setClientEmail} 
                value={clientEmail}
              />
            </View>
          </View>

          {/* Description */}
          <View>
            <Text className="text-slate-500 font-bold mb-2 ml-1 text-[10px] uppercase tracking-[2px]">Project Directive</Text>
            <View className="bg-[#151B2B] rounded-2xl p-4 border border-slate-800 h-32">
              <TextInput 
                placeholder="Objective Directive" 
                placeholderTextColor="#475569"
                multiline
                textAlignVertical="top"
                className="flex-1 text-white font-medium"
                onChangeText={setDescription} 
                value={description}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View 
        className="absolute bottom-0 w-full px-6 pt-4 pb-10 bg-[#0B0F19]/90 border-t border-slate-800/60" 
        style={{ paddingBottom: Math.max(insets.bottom, 24) }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-16 rounded-full flex-row items-center justify-center bg-indigo-600 shadow-2xl"
          style={{ shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12 }}
          onPress={handleUpdate}
        >
          <Feather name="save" size={20} color="white" />
          <Text className="font-black text-lg ml-2 text-white uppercase tracking-widest">
            Overwrite Parameters
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
