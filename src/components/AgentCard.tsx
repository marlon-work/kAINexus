import { View, Text, TouchableOpacity, Image } from "react-native";
import { Agent } from "../types/Agent";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

interface Props {
  agent: Agent;
  index?: number;
}

export default function AgentCard({ agent, index = 0 }: Props) {
  const getStatusConfig = () => {
    switch (agent.status) {
      case "Pending":
        return { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", dot: "bg-amber-400", icon: "clock" };
      case "In Progress":
        return { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", dot: "bg-indigo-400", icon: "refresh-cw" };
      case "Delivered":
        return { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400", icon: "check-circle" };
      default:
        return { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-400", dot: "bg-slate-400", icon: "circle" };
    }
  };

  const status = getStatusConfig();
  const progress = agent.progress || 0;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-[#151B2B] p-5 rounded-3xl mb-4 border border-slate-800/60"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5
      }}
      onPress={() => router.push(`/agent/${agent.id}`)}
    >
      <View className="flex-row justify-between items-start mb-5">
        <View className="flex-row items-center flex-1">
          <View className="w-14 h-14 bg-[#1E293B] rounded-2xl items-center justify-center mr-4 border border-slate-700/50 overflow-hidden">
            {agent.imageUrl ? (
              <Image 
                source={typeof agent.imageUrl === 'string' ? { uri: agent.imageUrl } : agent.imageUrl} 
                className="w-full h-full" 
                resizeMode="cover"
              />
            ) : (
              <Feather name="cpu" size={24} color="#818CF8" />
            )}
          </View>
          <View className="flex-1 pr-3">
            <Text className="text-white text-lg font-bold tracking-tight" numberOfLines={1}>
              {agent.agentName}
            </Text>
            <View className="flex-row items-center mt-1">
              <Feather name="user" size={12} color="#94A3B8" />
              <Text className="text-slate-400 text-sm ml-1.5 font-medium" numberOfLines={1}>
                {agent.clientName}
              </Text>
            </View>
          </View>
        </View>

        {/* Status & Priority Badge */}
        <View className="items-end">
          <View className={`px-3 py-1.5 rounded-full flex-row items-center border ${status.bg} ${status.border} mb-2`}>
            <View className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status.dot}`} />
            <Text className={`text-[9px] font-black tracking-widest uppercase ${status.text}`}>
              {agent.status}
            </Text>
          </View>
          {agent.priority && (
            <View className={`px-2 py-0.5 rounded-lg border ${
              agent.priority === 'Critical' ? 'bg-rose-500/10 border-rose-500/30' : 
              agent.priority === 'High' ? 'bg-amber-500/10 border-amber-500/30' : 
              'bg-slate-800 border-slate-700'
            }`}>
              <Text className={`text-[8px] font-black uppercase tracking-tight ${
                agent.priority === 'Critical' ? 'text-rose-400' : 
                agent.priority === 'High' ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {agent.priority}
              </Text>
            </View>
          )}
        </View>
      </View>

      {agent.category && (
        <View className="flex-row mb-4">
          <View className="bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">
            <Text className="text-indigo-400 text-[9px] font-black uppercase tracking-tighter">{agent.category}</Text>
          </View>
        </View>
      )}

      {/* Progress Bar */}
      <View className="mb-5">
        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Deployment Progress</Text>
          <Text className="text-indigo-400 text-[10px] font-bold">{progress}%</Text>
        </View>
        <View className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <View 
            className="h-full bg-indigo-500 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-4 border-t border-slate-800/50">
        <View className="flex-row items-center">
          <Feather name="calendar" size={14} color="#64748B" />
          <Text className="text-slate-400 ml-2 text-sm font-medium">Delivery: <Text className="text-slate-300">{agent.deliveryDate}</Text></Text>
        </View>
        <Feather name="chevron-right" size={20} color="#475569" />
      </View>
    </TouchableOpacity>
  );
}
