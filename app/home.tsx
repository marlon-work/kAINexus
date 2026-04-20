import { View, Text, FlatList, TouchableOpacity, RefreshControl, StatusBar, Image, TextInput } from "react-native";
import { useContext, useState } from "react";
import { AgentContext } from "../src/context/AgentContext";
import AgentCard from "../src/components/AgentCard";
import { router, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const { agents, updateAgent } = useContext(AgentContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const insets = useSafeAreaInsets();

  const filteredAgents = agents.filter(agent => 
    agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeAgents = agents.filter(a => a.status === "In Progress" || a.status === "Pending").length;
  const featuredAgent = agents.find(a => a.status === "In Progress") || agents[0];

  const triggerHaptic = (type: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
    Haptics.impactAsync(type);
  };

  const onRefresh = () => {
    triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
    setRefreshing(true);
    // Simulate real updates
    setTimeout(() => {
      agents.forEach(agent => {
        if (agent.status === "In Progress" && agent.progress && agent.progress < 100) {
          const newProgress = Math.min(100, agent.progress + Math.floor(Math.random() * 5));
          const updates: any = { progress: newProgress };
          if (newProgress === 100) updates.status = "Delivered";
          updateAgent(agent.id, updates);
        }
      });
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#1E1B4B" />
      <View className="flex-1 bg-[#0B0F19]">
        {/* Header Gradient */}
        <LinearGradient
          colors={['#1E1B4B', '#0B0F19']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="pb-8 rounded-b-[40px]"
          style={{ paddingTop: Math.max(insets.top + 10, 50) }}
        >
          <View className="flex-row justify-between items-center mb-6 px-8">
            <TouchableOpacity 
              onPress={() => {
                triggerHaptic();
                router.push('/settings');
              }}
              className="w-10 h-10 bg-white/5 rounded-xl items-center justify-center border border-white/10"
            >
              <Feather name="settings" size={18} color="#94A3B8" />
            </TouchableOpacity>
            <View className="items-center">
              <Text className="text-slate-400 text-[10px] font-black mb-0.5 tracking-[3px] uppercase opacity-70">Nexus Ecosystem • {activeAgents} Active</Text>
              <Text className="text-white text-3xl font-black tracking-tighter">kAI Nexus</Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity 
                onPress={() => {
                  triggerHaptic();
                  setShowSearch(!showSearch);
                }}
                className="w-10 h-10 bg-white/5 rounded-xl items-center justify-center border border-white/10 mr-2"
              >
                <Feather name={showSearch ? "x" : "search"} size={18} color="#818CF8" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  triggerHaptic();
                  router.push('/notifications');
                }}
                className="w-10 h-10 bg-white/5 rounded-xl items-center justify-center border border-white/10"
              >
                <View className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full z-10 border border-[#1E1B4B]" />
                <Feather name="bell" size={18} color="#818CF8" />
              </TouchableOpacity>
            </View>
          </View>
          
          {showSearch ? (
            <View className="px-6 mb-4">
              <View className="bg-white/5 rounded-2xl flex-row items-center px-4 py-3 border border-white/10">
                <Feather name="search" size={16} color="#475569" />
                <TextInput 
                  placeholder="Search agents or clients..."
                  placeholderTextColor="#475569"
                  className="flex-1 ml-3 text-white font-medium"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </View>
            </View>
          ) : (
            <View className="px-6">
              <TouchableOpacity 
                activeOpacity={0.9}
                className="bg-indigo-600/10 rounded-[32px] overflow-hidden border border-indigo-500/20"
                onPress={() => {
                  triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
                  featuredAgent && router.push(`/agent/${featuredAgent.id}`);
                }}
              >
                <LinearGradient
                  colors={['rgba(79, 70, 229, 0.2)', 'rgba(11, 15, 25, 0.6)']}
                  className="p-5 flex-row items-center"
                >
                  <View className="w-16 h-16 bg-indigo-600/30 rounded-2xl items-center justify-center mr-4 border border-indigo-500/30 overflow-hidden">
                    {featuredAgent?.imageUrl ? (
                      <Image 
                        source={typeof featuredAgent.imageUrl === 'string' ? { uri: featuredAgent.imageUrl } : featuredAgent.imageUrl} 
                        className="w-full h-full opacity-80" 
                        resizeMode="cover"
                      />
                    ) : (
                      <Feather name="zap" size={28} color="white" />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">Featured Deployment</Text>
                    <Text className="text-white font-bold text-xl mb-1">{featuredAgent?.agentName || "No active agents"}</Text>
                    <View className="flex-row items-center">
                      <View className="h-1.5 flex-1 bg-white/5 rounded-full mr-3 overflow-hidden">
                        <View className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ width: `${featuredAgent?.progress || 0}%` }} />
                      </View>
                      <Text className="text-indigo-300 text-[10px] font-black">{featuredAgent?.progress || 0}%</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>

        <View className="flex-1 px-6 pt-6">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <Text className="text-white text-xl font-black tracking-tight mr-2">Your Directory</Text>
              <View className="bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                <Text className="text-indigo-400 text-[10px] font-black">{filteredAgents.length}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => {
                triggerHaptic();
                router.push('/analytics');
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View className="flex-row items-center bg-slate-800/30 px-3 py-1.5 rounded-xl border border-white/5">
                <Feather name="sliders" size={14} color="#94A3B8" />
                <Text className="text-slate-400 text-xs font-bold ml-2">Analyze</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredAgents}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <AgentCard agent={item} index={index} />}
            contentContainerStyle={{ paddingBottom: 150 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#818CF8" />
            }
            ListEmptyComponent={
              <View className="items-center justify-center py-10 px-10">
                <View className="w-64 h-64 mb-8 rounded-[40px] overflow-hidden border border-slate-800">
                  <Image source={require("../assets/images/kai-chateando.png")} className="w-full h-full opacity-70" resizeMode="cover" />
                </View>
                <Text className="text-white text-2xl font-black mb-2 text-center">
                  {searchQuery ? "No matches found" : "Neural Void Detected"}
                </Text>
                <Text className="text-slate-500 text-center leading-relaxed font-semibold">
                  {searchQuery 
                    ? `Our search protocol couldn't locate any node matching "${searchQuery}".`
                    : "Your Nexus is currently empty. Initialize your first neural agent to begin ecosystem expansion."
                  }
                </Text>
              </View>
            }
          />
        </View>

        {/* Pure minimalist pristine Add Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="absolute self-center bottom-8 shadow-[0_20px_50px_rgba(99,102,241,0.3)] items-center justify-center bg-white"
          onPress={() => {
            triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
            router.push("/create");
          }}
          style={{ 
            width: 72,
            height: 72,
            borderRadius: 24,
            elevation: 20 
          }}
        >
          <Feather name="plus" size={32} color="#4F46E5" />
        </TouchableOpacity>
      </View>
    </>
  );
}
