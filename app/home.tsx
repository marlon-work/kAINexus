import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AgentContext } from "../src/context/AgentContext";
import AgentCard from "../src/components/AgentCard";
import { router, Stack } from "expo-router";

export default function HomeScreen() {
  const { agents } = useContext(AgentContext);

  return (
    <>
      <Stack.Screen options={{ title: "kAI Nexus", headerBackVisible: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>kAI Nexus</Text>
        <Text style={styles.subtitle}>Agent Deployment Control</Text>

        <FlatList
          data={agents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AgentCard agent={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/create")}
        >
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f172a",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#6366f1",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  fabText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});
