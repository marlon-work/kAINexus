import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { Stack, router } from "expo-router";
import { useContext } from "react";
import { AgentContext } from "../src/context/AgentContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

export default function AnalyticsScreen() {
  const { agents } = useContext(AgentContext);
  const insets = useSafeAreaInsets();

  const totalAgents = agents.length;
  const avgProgress = Math.round(agents.reduce((acc, a) => acc + (a.progress || 0), 0) / totalAgents) || 0;
  const deliveredCount = agents.filter(a => a.status === "Delivered").length;
  const inProgressCount = agents.filter(a => a.status === "In Progress").length;

  const triggerHaptic = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  return (
    <View className="flex-1 bg-[#0B0F19]">
      <Stack.Screen 
        options={{ 
          title: "Ecosystem Analytics",
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }} 
      />
      <StatusBar barStyle="light-content" />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 40 }}
      >
        {/* Core Metrics Grid */}
        <View className="flex-row flex-wrap justify-between mb-8">
          <View className="w-[48%] bg-[#151B2B] p-5 rounded-[32px] border border-slate-800 mb-4 h-40 justify-between">
            <View className="w-10 h-10 bg-indigo-500/10 rounded-2xl items-center justify-center">
              <Feather name="activity" size={20} color="#818CF8" />
            </View>
            <View>
              <Text className="text-white text-3xl font-black">{avgProgress}%</Text>
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Avg Efficiency</Text>
            </View>
          </View>

          <View className="w-[48%] bg-[#151B2B] p-5 rounded-[32px] border border-slate-800 mb-4 h-40 justify-between">
            <View className="w-10 h-10 bg-emerald-500/10 rounded-2xl items-center justify-center">
              <Feather name="check-circle" size={20} color="#34D399" />
            </View>
            <View>
              <Text className="text-white text-3xl font-black">{deliveredCount}</Text>
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Deploys OK</Text>
            </View>
          </View>

          <View className="w-[48%] bg-[#151B2B] p-5 rounded-[32px] border border-slate-800 mb-4 h-40 justify-between">
            <View className="w-10 h-10 bg-amber-500/10 rounded-2xl items-center justify-center">
              <Feather name="cpu" size={20} color="#FBBF24" />
            </View>
            <View>
              <Text className="text-white text-3xl font-black">{inProgressCount}</Text>
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Neural Syncing</Text>
            </View>
          </View>

          <View className="w-[48%] bg-[#151B2B] p-5 rounded-[32px] border border-slate-800 mb-4 h-40 justify-between">
            <View className="w-10 h-10 bg-indigo-600 rounded-2xl items-center justify-center">
              <Feather name="plus" size={20} color="white" />
            </View>
            <View>
              <Text className="text-white text-3xl font-black">{totalAgents}</Text>
              <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Nodes</Text>
            </View>
          </View>
        </View>

        {/* Neural Load Visualization */}
        <View className="bg-[#151B2B] p-6 rounded-[32px] border border-slate-800 mb-6">
          <Text className="text-white text-xl font-black mb-6 tracking-tight">System Neural Load</Text>
          
          <View className="flex-row items-end justify-between h-40 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 85, 30, 95, 60, 75].map((height, i) => (
              <View key={i} className="w-4 bg-slate-800 rounded-full overflow-hidden">
                <LinearGradient
                  colors={['#6366F1', '#4F46E5']}
                  className="w-full absolute bottom-0 rounded-full"
                  style={{ height: `${height}%` }}
                />
              </View>
            ))}
          </View>
          
          <View className="flex-row justify-between mt-4 border-t border-slate-800/50 pt-4">
            <View>
              <Text className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Peak Status</Text>
              <Text className="text-indigo-400 font-bold">Stable Ops</Text>
            </View>
            <View className="items-end">
              <Text className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Last Sync</Text>
              <Text className="text-white font-bold">Just now</Text>
            </View>
          </View>
        </View>

        {/* Category Distribution */}
        <View className="bg-[#151B2B] p-6 rounded-[32px] border border-slate-800">
          <Text className="text-white text-xl font-black mb-6 tracking-tight">Sector Distribution</Text>
          
          {["Technical", "Sales", "Security", "Creative", "Support"].map((cat) => {
            const count = agents.filter(a => a.category === cat).length;
            const percentage = totalAgents > 0 ? (count / totalAgents) * 100 : 0;
            
            return (
              <View key={cat} className="mb-5">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-slate-300 font-bold text-sm">{cat}</Text>
                  <Text className="text-indigo-400 font-black text-xs">{count} Units</Text>
                </View>
                <View className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <View className="h-full bg-indigo-500 rounded-full" style={{ width: `${percentage}%` }} />
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity 
          className="mt-10 bg-indigo-600 py-5 rounded-[24px] items-center justify-center shadow-2xl"
          style={{ shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12 }}
          onPress={() => {
            triggerHaptic();
            router.back();
          }}
        >
          <Text className="text-white font-black uppercase tracking-[2px]">Return to Nexus</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
