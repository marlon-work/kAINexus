import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useContext } from "react";
import { AgentContext } from "../../src/context/AgentContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function AgentDetail() {
  const { id } = useLocalSearchParams();
  const { agents, removeAgent } = useContext(AgentContext);
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
  const progress = agent.progress || 0;

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
          <View className="w-32 h-32 bg-[#1E293B] rounded-[40px] items-center justify-center mb-6 shadow-2xl border border-slate-700/50 overflow-hidden">
            {agent.imageUrl ? (
              <Image 
                source={typeof agent.imageUrl === 'string' ? { uri: agent.imageUrl } : agent.imageUrl} 
                className="w-full h-full" 
                resizeMode="cover"
              />
            ) : (
              <Feather name="cpu" size={48} color="#818CF8" />
            )}
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

        {/* Progress Section */}
        <View className="bg-[#151B2B] p-6 rounded-3xl border border-slate-800 mb-4">
          <View className="flex-row justify-between items-end mb-4">
            <View>
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Current Status</Text>
              <Text className="text-white text-xl font-bold">Deployment Phase</Text>
            </View>
            <Text className="text-indigo-400 text-2xl font-black">{progress}%</Text>
          </View>
          
          <View className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
            <View 
              className="h-full bg-indigo-500 rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </View>
          
          <View className="flex-row justify-between mt-4">
            <View className="items-center">
              <View className="w-2 h-2 rounded-full bg-indigo-500 mb-1" />
              <Text className="text-slate-500 text-[10px] font-bold">ALPHA</Text>
            </View>
            <View className="items-center">
              <View className={`w-2 h-2 rounded-full ${progress >= 50 ? 'bg-indigo-500' : 'bg-slate-700'} mb-1`} />
              <Text className="text-slate-500 text-[10px] font-bold">BETA</Text>
            </View>
            <View className="items-center">
              <View className={`w-2 h-2 rounded-full ${progress >= 90 ? 'bg-indigo-500' : 'bg-slate-700'} mb-1`} />
              <Text className="text-slate-500 text-[10px] font-bold">STABLE</Text>
            </View>
            <View className="items-center">
              <View className={`w-2 h-2 rounded-full ${progress === 100 ? 'bg-indigo-500' : 'bg-slate-700'} mb-1`} />
              <Text className="text-slate-500 text-[10px] font-bold">LIVE</Text>
            </View>
          </View>
        </View>

        {/* Details Cards */}
        <View className="space-y-4">
          <View className="bg-[#151B2B] p-5 rounded-3xl border border-slate-800">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Client Details</Text>
            
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-slate-800 rounded-2xl items-center justify-center mr-4 border border-slate-700">
                <Feather name="user" size={20} color="#94A3B8" />
              </View>
              <View>
                <Text className="text-white font-semibold text-lg">{agent.clientName}</Text>
                <Text className="text-slate-400 text-sm font-medium">{agent.clientEmail || 'No email provided'}</Text>
              </View>
            </View>
          </View>

          <View className="bg-[#151B2B] p-5 rounded-3xl border border-slate-800">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Project Scope</Text>
            
            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View className="w-6 h-6 bg-indigo-500/10 rounded-lg items-center justify-center mr-2">
                  <Feather name="file-text" size={14} color="#6366F1" />
                </View>
                <Text className="text-white font-bold tracking-tight">Executive Summary</Text>
              </View>
              <Text className="text-slate-300 leading-6 font-medium">{agent.description || 'No specific objective provided.'}</Text>
            </View>

            <View className="h-[1px] bg-slate-800/50 my-2" />

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-6 h-6 bg-amber-500/10 rounded-lg items-center justify-center mr-2">
                  <Feather name="flag" size={14} color="#F59E0B" />
                </View>
                <Text className="text-white font-bold tracking-tight">Target Timeline</Text>
              </View>
              <View className="bg-slate-800 px-3 py-1 rounded-lg">
                <Text className="text-slate-200 font-bold text-xs">{agent.deliveryDate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 space-y-4">
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-indigo-600 rounded-[28px] py-6 flex-row justify-center items-center shadow-2xl"
            style={{ shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 }}
            onPress={() => router.push(`/agent/${agent.id}/control`)}
          >
            <Feather name="terminal" size={20} color="white" />
            <Text className="text-white font-black text-xl ml-3 tracking-tight">Enter Control Room</Text>
          </TouchableOpacity>
          
          <View className="flex-row space-x-3 mt-2">
            <TouchableOpacity 
              className="flex-1 border border-slate-800 bg-slate-900/40 rounded-2xl py-4 flex-row justify-center items-center"
              onPress={() => router.back()}
            >
              <Text className="text-slate-400 font-bold text-sm uppercase tracking-widest">Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-16 border border-rose-900/30 bg-rose-500/10 rounded-2xl items-center justify-center"
              onPress={() => {
                if (confirm('Are you sure you want to decommission this agent?')) {
                  // @ts-ignore - added to context earlier
                  removeAgent(agent.id);
                  router.replace('/home');
                }
              }}
            >
              <Feather name="trash-2" size={18} color="#FB7185" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
