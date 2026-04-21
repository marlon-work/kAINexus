import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from "react-native";
import { useState, useContext } from "react";
import { AgentContext } from "../src/context/AgentContext";
import { agentService } from "../src/services/agentService";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function CreateAgentScreen() {
  const { addAgent } = useContext(AgentContext);
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [category, setCategory] = useState<"Sales" | "Support" | "Security" | "Creative" | "Technical">("Technical");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Critical">("Medium");

  const handleSubmit = async () => {
    if (!agentName || !clientName) return; 
    
    setLoading(true);
    try {
      // 1. Guardar en Supabase a través del servicio
      const newAgent = await agentService.createAgent({
        clientName,
        clientEmail,
        agentName,
        description,
        deliveryDate,
        category,
        priority,
      });

      // 2. Opcional: Actualizar el contexto local si quieres que aparezca instantáneamente sin recargar
      // Nota: Aquí podrías añadir una imagen por defecto como hacías antes
      addAgent({
        ...newAgent,
        clientName: newAgent.client_name, // Mapeo de vuelta si el contexto usa camelCase
        agentName: newAgent.agent_name,
        imageUrl: require("../assets/images/icon.png"), // Imagen por defecto
      });

      router.back();
    } catch (error) {
      alert("Error al guardar el agente: " + (error as any).message);
    } finally {
      setLoading(false);
    }
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
        <View className="items-center mb-12 mt-4">
          <View className="w-20 h-20 bg-indigo-500/10 rounded-full items-center justify-center border border-indigo-500/30 mb-6">
            <Feather name="cpu" size={32} color="#818CF8" />
          </View>
          <Text className="text-white text-3xl font-extrabold tracking-tight">Deploy Agent</Text>
          <Text className="text-slate-400 mt-2 text-center px-4 leading-5">Configure the details for your new automated assistant.</Text>
        </View>

        <View className="gap-y-8">
          {/* Agent Name */}
          <View>
            <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Agent Identity</Text>
            <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-16 border border-slate-800">
              <Feather name="cpu" size={20} color="#6366F1" />
              <TextInput 
                placeholder="e.g. Sales Assistant Bot" 
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
                  onPress={() => setCategory(cat as any)}
                  className={`mr-3 px-6 py-3 rounded-xl border ${category === cat ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}
                >
                  <Text className={`text-xs font-bold ${category === cat ? 'text-white' : 'text-slate-400'}`}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Neural Core selection */}
          <View>
            <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Neural Core Specification</Text>
            <View className="flex-row space-x-3">
              {[
                { name: "GPT-4x", icon: "activity", color: "#34D399" },
                { name: "Claude 3", icon: "cloud", color: "#FBBF24" },
                { name: "Nexus-M", icon: "zap", color: "#818CF8" }
              ].map((core) => (
                <TouchableOpacity 
                  key={core.name}
                  className="flex-1 bg-slate-900/50 p-5 rounded-[28px] border border-slate-800 items-center"
                >
                  <View className="w-10 h-10 rounded-2xl items-center justify-center mb-3" style={{ backgroundColor: `${core.color}20` }}>
                    {/* @ts-ignore */}
                    <Feather name={core.icon} size={16} color={core.color} />
                  </View>
                  <Text className="text-white text-[10px] font-black uppercase tracking-tight">{core.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Client Details */}
          <View className="flex-row">
            <View className="flex-1 mr-4">
              <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Company</Text>
              <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-16 border border-slate-800">
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
              <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Deadline</Text>
              <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-16 border border-slate-800">
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
            <View className="flex-row space-x-3">
              {["Low", "Medium", "High", "Critical"].map((p) => (
                <TouchableOpacity 
                  key={p}
                  onPress={() => setPriority(p as any)}
                  className={`flex-1 py-4 rounded-2xl border items-center ${priority === p ? 'bg-slate-800 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}
                >
                  <View className={`w-2 h-2 rounded-full mb-1.5 ${p === 'Critical' ? 'bg-rose-500' : p === 'High' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                  <Text className={`text-[10px] font-bold ${priority === p ? 'text-white' : 'text-slate-500'}`}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Contact Protocol</Text>
            <View className="flex-row items-center bg-[#151B2B] rounded-2xl px-4 h-16 border border-slate-800">
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
            <Text className="text-slate-500 font-bold mb-3 ml-1 text-[10px] uppercase tracking-[2px]">Project Directive</Text>
            <View className="bg-[#151B2B] rounded-[24px] p-5 border border-slate-800 h-40">
              <TextInput 
                placeholder="Describe the agent's primary objective..." 
                placeholderTextColor="#475569"
                multiline
                textAlignVertical="top"
                className="flex-1 text-white font-medium leading-5"
                onChangeText={setDescription} 
                value={description}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 w-full px-6 pt-6 pb-12 bg-[#0B0F19]/90 border-t border-slate-800/60" style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
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
          <Text className={`font-black text-lg ml-2 uppercase tracking-widest ${agentName && clientName ? 'text-white' : 'text-slate-500'}`}>
            Initialize Agent
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
