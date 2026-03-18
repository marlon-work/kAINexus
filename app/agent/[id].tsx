import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useContext } from "react";
import { AgentContext } from "../../src/context/AgentContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function AgentDetail() {
  const { id } = useLocalSearchParams();
  const { agents } = useContext(AgentContext);
  const insets = useSafeAreaInsets();

  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return (
      <View className="flex-1 bg-[#0B0F19] items-center justify-center">
        <Feather name="alert-circle" size={48} color="#475569" />
        <Text className="text-white text-xl font-bold mt-4">Agent not found</Text>
      </View>
    );
  }

  const getStatusConfig = () => {
    switch (agent.status) {
      case "Pending":
        return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", icon: "clock" };
      case "In Progress":
        return { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30", icon: "refresh-cw" };
      case "Delivered":
        return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", icon: "check-circle" };
      default:
        return { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/30", icon: "circle" };
    }
  };
  const status = getStatusConfig();

  return (
    <View className="flex-1 bg-[#0B0F19]">
      <Stack.Screen 
        options={{ 
          title: "",
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Feather name="more-vertical" size={24} color="#94A3B8" />
            </TouchableOpacity>
          ),
        }} 
      />
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 40 }}>
        {/* Header Icon & Title */}
        <View className="mb-8 items-center mt-2">
          <View className="w-24 h-24 bg-[#1E293B] rounded-[32px] items-center justify-center mb-6 shadow-xl border border-slate-700/50">
            <Feather name="cpu" size={40} color="#818CF8" />
          </View>
          <Text className="text-white text-3xl font-black text-center mb-4 tracking-tight">
            {agent.agentName}
          </Text>
          <View className={`px-4 py-2 rounded-full flex-row items-center border ${status.bg} ${status.border}`}>
            {/* @ts-ignore */}
            <Feather name={status.icon} size={14} color={status.text.replace('text-', '')} style={{ marginRight: 6 }} />
            <Text className={`font-bold tracking-widest uppercase text-xs ${status.text}`}>
              {agent.status}
            </Text>
          </View>
        </View>

        {/* Details Cards */}
        <View className="space-y-4">
          <View className="bg-[#151B2B] p-5 rounded-3xl border border-slate-800">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Client Details</Text>
            
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center mr-3 border border-slate-700">
                <Feather name="user" size={18} color="#94A3B8" />
              </View>
              <View>
                <Text className="text-white font-semibold text-lg">{agent.clientName}</Text>
                <Text className="text-slate-400 text-sm">{agent.clientEmail || 'No email provided'}</Text>
              </View>
            </View>
          </View>

          <View className="bg-[#151B2B] p-5 rounded-3xl border border-slate-800">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Project Scope</Text>
            
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <Feather name="file-text" size={16} color="#6366F1" />
                <Text className="text-white font-semibold ml-2">Description</Text>
              </View>
              <Text className="text-slate-300 leading-6">{agent.description || 'No specific objective provided.'}</Text>
            </View>

            <View className="h-[1px] bg-slate-800 my-2" />

            <View className="mt-2 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Feather name="flag" size={16} color="#F59E0B" />
                <Text className="text-white font-semibold ml-2">Delivery Targets</Text>
              </View>
              <Text className="text-slate-300 font-medium">{agent.deliveryDate}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 space-y-3">
          <TouchableOpacity className="bg-indigo-600 rounded-2xl py-4 flex-row justify-center items-center shadow-lg">
            <Feather name="play" size={18} color="white" />
            <Text className="text-white font-bold text-lg ml-2 tracking-wide">Start Training Task</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="border border-slate-700 bg-slate-800/30 rounded-2xl py-4 flex-row justify-center items-center"
            onPress={() => router.back()}
          >
            <Text className="text-slate-300 font-bold text-lg tracking-wide">Back to Dashboard</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
