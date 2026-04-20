import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Stack, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "update" | "alert" | "system";
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Deployment Complete",
    message: "JARVIS Alpha has been successfully deployed to the cloud environment.",
    time: "2m ago",
    type: "update",
    isRead: false,
  },
  {
    id: "2",
    title: "Neural Core Warning",
    message: "T-800 Sentinel reports a 5% increase in neural drift. Diagnostics recommended.",
    time: "1h ago",
    type: "alert",
    isRead: false,
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "Nexus Ecosystem will undergo scheduled maintenance at 03:00 UTC.",
    time: "3h ago",
    type: "system",
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <View className="flex-1 bg-[#0B0F19]">
      <Stack.Screen 
        options={{ 
          title: "System Alerts",
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={markAllRead}>
              <Text className="text-indigo-400 font-bold text-xs">Read All</Text>
            </TouchableOpacity>
          )
        }} 
      />
      <StatusBar barStyle="light-content" />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 40 }}
      >
        {notifications.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Feather name="bell-off" size={48} color="#1E293B" />
            <Text className="text-slate-500 mt-4 font-bold uppercase tracking-widest">No Alerts</Text>
          </View>
        ) : (
          notifications.map((n) => (
            <TouchableOpacity 
              key={n.id} 
              className={`mb-4 p-5 rounded-3xl border ${n.isRead ? 'bg-slate-900/40 border-slate-800/30' : 'bg-[#151B2B] border-indigo-500/20 shadow-xl'}`}
              onPress={() => {
                setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, isRead: true } : notif));
              }}
            >
              <View className="flex-row items-start">
                <View className={`w-10 h-10 rounded-2xl items-center justify-center mr-4 ${
                  n.type === 'alert' ? 'bg-rose-500/10' : n.type === 'update' ? 'bg-emerald-500/10' : 'bg-indigo-500/10'
                }`}>
                  <Feather 
                    name={n.type === 'alert' ? 'alert-triangle' : n.type === 'update' ? 'check-circle' : 'info'} 
                    size={18} 
                    color={n.type === 'alert' ? '#FB7185' : n.type === 'update' ? '#34D399' : '#818CF8'} 
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className={`font-bold text-lg ${n.isRead ? 'text-slate-400' : 'text-white'}`}>{n.title}</Text>
                    {!n.isRead && <View className="w-2 h-2 rounded-full bg-indigo-500" />}
                  </View>
                  <Text className={`text-sm leading-5 mb-2 ${n.isRead ? 'text-slate-500' : 'text-slate-400'}`}>{n.message}</Text>
                  <Text className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{n.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity 
        className="mx-6 mb-8 bg-slate-800 py-4 rounded-2xl items-center border border-slate-700"
        onPress={() => router.back()}
      >
        <Text className="text-white font-bold">Close Panel</Text>
      </TouchableOpacity>
    </View>
  );
}
