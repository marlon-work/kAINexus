import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useContext, useEffect, useState, useRef } from "react";
import { AgentContext } from "../../../src/context/AgentContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "system";
}

export default function ControlRoom() {
  const { id } = useLocalSearchParams();
  const { agents } = useContext(AgentContext);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const agent = agents.find((a) => a.id === id);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!agent) return;

    // Initial logs
    const initialLogs: LogEntry[] = [
      { id: "1", timestamp: new Date().toLocaleTimeString(), message: `Establishing connection to ${agent.agentName} neural core...`, type: "system" },
      { id: "2", timestamp: new Date().toLocaleTimeString(), message: "Secure link established via Nexus Protocol v4.2", type: "success" },
      { id: "3", timestamp: new Date().toLocaleTimeString(), message: `Fetching operational parameters for ${agent.clientName}...`, type: "info" },
    ];
    setLogs(initialLogs);

    if (isLive) {
      const interval = setInterval(() => {
        const messages = [
          { message: "Monitoring incoming data streams...", type: "info" },
          { message: "Optimizing response latency...", type: "success" },
          { message: "Neural weights recalculated.", type: "info" },
          { message: "Minor anomaly detected in pattern group B7.", type: "warning" },
          { message: "Auto-correcting anomaly... Done.", type: "success" },
          { message: "Processing batch request #842-X", type: "info" },
          { message: "External API heartbeat: OK", type: "info" },
        ];
        
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const newLog: LogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          message: randomMsg.message,
          type: randomMsg.type as any,
        };
        
        setLogs(prev => [...prev, newLog].slice(-50)); // Keep last 50
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [id, isLive]);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [logs]);

  if (!agent) {
    return (
      <View className="flex-1 bg-[#0B0F19] items-center justify-center">
        <Text className="text-white">Agent not found</Text>
      </View>
    );
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case "success": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "error": return "text-rose-400";
      case "system": return "text-indigo-400";
      default: return "text-slate-300";
    }
  };

  return (
    <View className="flex-1 bg-[#05080F]">
      <Stack.Screen 
        options={{ 
          title: "Control Room",
          headerStyle: { backgroundColor: '#05080F' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => setIsLive(!isLive)}
              className={`px-3 py-1.5 rounded-full border ${isLive ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-800 border-slate-700'}`}
            >
              <Text className={`text-[10px] font-black uppercase tracking-widest ${isLive ? 'text-indigo-400' : 'text-slate-400'}`}>
                {isLive ? '● LIVE' : 'PAUSED'}
              </Text>
            </TouchableOpacity>
          )
        }} 
      />
      <StatusBar barStyle="light-content" />

      {/* Terminal View */}
      <View className="flex-1 p-4">
        <View className="flex-1 bg-[#0B0F19] rounded-3xl border border-slate-800/50 overflow-hidden shadow-2xl">
          <View className="flex-row items-center px-4 py-3 border-b border-slate-800/50 bg-slate-900/30">
            <View className="flex-row space-x-1.5 mr-3">
              <View className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
              <View className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <View className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </View>
            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex-1">
              {agent.agentName} • TERMINAL SESSION
            </Text>
            <Feather name="refresh-cw" size={10} color="#475569" className={isLive ? "animate-spin" : ""} />
          </View>

          <ScrollView 
            ref={scrollViewRef}
            className="flex-1 p-4"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {logs.map((log) => (
              <View key={log.id} className="mb-2 flex-row">
                <Text className="text-[#334155] font-mono text-[10px] mr-3 mt-0.5">[{log.timestamp}]</Text>
                <Text className={`font-mono text-xs flex-1 ${getLogColor(log.type)}`}>
                  {log.message}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Stats Overlay */}
        <View className="flex-row mt-4 space-x-3 h-24">
          <View className="flex-1 bg-slate-900/50 rounded-2xl border border-slate-800/50 p-3 justify-center items-center">
            <Text className="text-slate-500 text-[8px] font-black uppercase mb-1">Response Time</Text>
            <Text className="text-white text-xl font-black">24ms</Text>
          </View>
          <View className="flex-1 bg-slate-900/50 rounded-2xl border border-slate-800/50 p-3 justify-center items-center">
            <Text className="text-slate-500 text-[8px] font-black uppercase mb-1">Logic Load</Text>
            <Text className="text-indigo-400 text-xl font-black">{Math.floor(Math.random() * 15 + 10)}%</Text>
          </View>
          <View className="flex-1 bg-slate-900/50 rounded-2xl border border-slate-800/50 p-3 justify-center items-center">
            <Text className="text-slate-500 text-[8px] font-black uppercase mb-1">Queue Size</Text>
            <Text className="text-white text-xl font-black">0</Text>
          </View>
        </View>
      </View>

      {/* Command Input Area */}
      <View 
        className="px-6 pt-4 pb-8 bg-slate-900/40 border-t border-slate-800/40" 
        style={{ paddingBottom: Math.max(insets.bottom, 24) }}
      >
        <View className="flex-row space-x-3">
          <TouchableOpacity 
            className="flex-1 bg-indigo-600 rounded-2xl py-4 items-center justify-center border border-indigo-500/50"
            onPress={() => {
              setLogs(prev => [...prev, { 
                id: Math.random().toString(), 
                timestamp: new Date().toLocaleTimeString(), 
                message: ">> MANUAL_OVERRIDE_ENABLED", 
                type: "warning" 
              }]);
            }}
          >
            <Text className="text-white font-black text-sm uppercase tracking-widest">Run Diagnostics</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-16 bg-slate-800 rounded-2xl items-center justify-center border border-slate-700"
            onPress={() => router.back()}
          >
            <Feather name="power" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
