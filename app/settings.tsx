import { View, Text, ScrollView, TouchableOpacity, StatusBar, Switch } from "react-native";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const triggerHaptic = () => {
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const SettingRow = ({ icon, title, subtitle, value, onValueChange, isLast = false }: any) => (
    <View className={`flex-row items-center justify-between py-5 ${!isLast ? 'border-b border-slate-800/50' : ''}`}>
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-slate-800/50 rounded-xl items-center justify-center mr-4 border border-slate-700/30">
          <Feather name={icon} size={18} color="#818CF8" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-base">{title}</Text>
          <Text className="text-slate-500 text-xs">{subtitle}</Text>
        </View>
      </View>
      <Switch 
        value={value} 
        onValueChange={(val) => {
          triggerHaptic();
          onValueChange(val);
        }}
        trackColor={{ false: '#1E293B', true: '#4F46E5' }}
        thumbColor={value ? '#fff' : '#94A3B8'}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-[#0B0F19]">
      <Stack.Screen 
        options={{ 
          title: "System Config",
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
        <View className="mb-8">
          <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-[3px] mb-4">Interface</Text>
          <View className="bg-[#151B2B] rounded-[32px] px-6 border border-slate-800">
            <SettingRow 
              icon="zap" 
              title="Neural Haptics" 
              subtitle="Tactile feedback on core interactions"
              value={hapticsEnabled}
              onValueChange={setHapticsEnabled}
            />
            <SettingRow 
              icon="bell" 
              title="System Alerts" 
              subtitle="Push notifications for agent status"
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
            <SettingRow 
              icon="refresh-cw" 
              title="Auto-Sync" 
              subtitle="Background neural core synchronization"
              value={autoSync}
              onValueChange={setAutoSync}
              isLast
            />
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-[3px] mb-4">Account</Text>
          <View className="bg-[#151B2B] rounded-[32px] px-6 border border-slate-800">
            <TouchableOpacity 
              className="flex-row items-center justify-between py-5 border-b border-slate-800/50"
              onPress={triggerHaptic}
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-slate-800/50 rounded-xl items-center justify-center mr-4 border border-slate-700/30">
                  <Feather name="user" size={18} color="#94A3B8" />
                </View>
                <Text className="text-white font-bold text-base">Node Identity</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#475569" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-row items-center justify-between py-5"
              onPress={triggerHaptic}
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-slate-800/50 rounded-xl items-center justify-center mr-4 border border-slate-700/30">
                  <Feather name="shield" size={18} color="#94A3B8" />
                </View>
                <Text className="text-white font-bold text-base">Security Protocol</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-rose-500/10 py-5 rounded-[24px] items-center justify-center border border-rose-500/20 shadow-xl"
          style={{ shadowColor: '#F43F5E', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 5 }}
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            router.replace("/");
          }}
        >
          <Text className="text-rose-500 font-black uppercase tracking-[2px]">Deauthenticate Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
