import { Stack } from "expo-router";
import { AgentProvider } from "../src/context/AgentContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AgentProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0f172a" },
          headerTitleStyle: { fontWeight: "600" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#0f172a" },
        }}
      />
    </AgentProvider>
  );
}
