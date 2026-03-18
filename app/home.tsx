import { View, Text, FlatList, TouchableOpacity, RefreshControl, StatusBar } from "react-native";
import { useContext, useState } from "react";
import { AgentContext } from "../src/context/AgentContext";
import AgentCard from "../src/components/AgentCard";
import { router, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { agents } = useContext(AgentContext);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const activeAgents = agents.filter(a => a.status === "In Progress" || a.status === "Pending").length;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
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
          style={{ paddingTop: Math.max(insets.top + 20, 60) }}
        >
          {/* Increased horizontal padding to px-8 here */}
          <View className="flex-row justify-between items-center mb-8 px-8">
            <View>
              <Text className="text-slate-300 text-sm font-medium mb-1 tracking-wider uppercase text-opacity-80">Welcome back</Text>
              <Text className="text-white text-4xl font-extrabold tracking-tight">kAI Nexus</Text>
            </View>
            <TouchableOpacity 
              className="w-14 h-14 bg-indigo-500/20 rounded-full items-center justify-center border border-indigo-500/30"
            >
              <Feather name="box" size={26} color="#818CF8" />
            </TouchableOpacity>
          </View>
          
          <View className="px-8">
            <View className="bg-white/10 rounded-3xl p-5 flex-row items-center border border-white/5">
              <View className="w-14 h-14 bg-indigo-500 rounded-full items-center justify-center mr-5 shadow-lg shadow-indigo-500/50">
                <Feather name="activity" size={24} color="white" />
              </View>
              <View>
                <Text className="text-white font-black text-2xl tracking-tight">{activeAgents} Active</Text>
                <Text className="text-slate-400 text-sm mt-0.5 font-medium">Agents in your ecosystem</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View className="flex-1 px-6 pt-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Your Directory</Text>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Feather name="filter" size={22} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={agents}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <AgentCard agent={item} index={index} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#818CF8" />
            }
            ListEmptyComponent={
              <View className="items-center justify-center py-20">
                <View className="w-20 h-20 bg-slate-800 rounded-full items-center justify-center mb-5">
                  <Feather name="inbox" size={32} color="#475569" />
                </View>
                <Text className="text-white text-xl font-semibold mb-2">No agents found</Text>
                <Text className="text-slate-500 text-center px-6 leading-relaxed">
                  You haven&apos;t deployed any agents yet. Tap the + icon below to start.
                </Text>
              </View>
            }
          />
        </View>

        {/* Pure minimalist pristine Add Button */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="absolute self-center bottom-10 shadow-2xl items-center justify-center bg-white"
          onPress={() => router.push("/create")}
          style={{ 
            width: 70,
            height: 70,
            borderRadius: 35,
            shadowColor: '#818CF8', 
            shadowOffset: { width: 0, height: 12 }, 
            shadowOpacity: 0.4, 
            shadowRadius: 20, 
            elevation: 15 
          }}
        >
          <Feather name="plus" size={34} color="#3730A3" />
        </TouchableOpacity>
      </View>
    </>
  );
}
