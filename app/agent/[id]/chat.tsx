import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, Image, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useContext, useState, useRef } from "react";
import { AgentContext } from "../../../src/context/AgentContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: string;
}

export default function AgentChat() {
  const { id } = useLocalSearchParams();
  const agentId = Array.isArray(id) ? id[0] : id;
  const { agents } = useContext(AgentContext);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const agent = agents.find((a) => a.id === agentId);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      text: `Neural link established. I am ${agent?.agentName}. How can I assist with the ${agent?.clientName} directives today?`, 
      sender: "agent", 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMsg: Message = {
      id: Math.random().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate Agent Response
    setTimeout(() => {
      const agentMsg: Message = {
        id: Math.random().toString(),
        text: `Processing directive: "${inputText}". I am analyzing the parameters based on my ${agent?.category} module.`,
        sender: "agent",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  };

  if (!agent) return null;

  return (
    <View className="flex-1 bg-[#0B0F19]">
      <Stack.Screen 
        options={{ 
          title: agent.agentName,
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => (
            <View className="w-8 h-8 bg-indigo-500/20 rounded-full items-center justify-center border border-indigo-500/30">
              <View className="w-2 h-2 bg-emerald-500 rounded-full" />
            </View>
          )
        }} 
      />
      <StatusBar barStyle="light-content" />

      <ImageBackground 
        source={require("../../../assets/images/chat-background.png")}
        className="flex-1"
        imageStyle={{ opacity: 0.1 }}
      >
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 p-6"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              className={`mb-6 max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
            >
              <View className={`p-4 rounded-3xl ${
                msg.sender === "user" 
                  ? "bg-indigo-600 rounded-tr-none" 
                  : "bg-slate-800/80 rounded-tl-none border border-slate-700/50"
              }`}>
                <Text className="text-white text-base font-medium leading-6">{msg.text}</Text>
              </View>
              <Text className="text-slate-500 text-[10px] font-black uppercase mt-2 tracking-widest">{msg.timestamp}</Text>
            </View>
          ))}
          {isTyping && (
            <View className="flex-row items-center mb-10 ml-2">
              <View className="w-2 h-2 rounded-full bg-indigo-500 mr-1 animate-pulse" />
              <View className="w-2 h-2 rounded-full bg-indigo-500 mr-1 opacity-60" />
              <View className="w-2 h-2 rounded-full bg-indigo-500 opacity-30" />
            </View>
          )}
        </ScrollView>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View 
          className="px-6 pt-4 pb-8 bg-[#0B0F19] border-t border-slate-800/50" 
          style={{ paddingBottom: Math.max(insets.bottom, 24) }}
        >
          <View className="flex-row items-center bg-slate-900/80 rounded-[32px] px-2 py-2 border border-slate-800">
            <TouchableOpacity className="w-12 h-12 items-center justify-center">
              <Feather name="paperclip" size={20} color="#475569" />
            </TouchableOpacity>
            <TextInput
              placeholder="Inject neural directive..."
              placeholderTextColor="#475569"
              className="flex-1 text-white font-medium px-2 py-3"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              onPress={sendMessage}
              className={`w-12 h-12 rounded-full items-center justify-center ${inputText.trim() ? 'bg-indigo-600' : 'bg-slate-800'}`}
            >
              <Feather name="send" size={20} color={inputText.trim() ? "white" : "#475569"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
