import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Agent } from "../types/Agent";
import { router } from "expo-router";

interface Props {
  agent: Agent;
}

export default function AgentCard({ agent }: Props) {
  const getStatusColor = () => {
    switch (agent.status) {
      case "Pending":
        return "#f59e0b";
      case "In Progress":
        return "#3b82f6";
      case "Delivered":
        return "#10b981";
      default:
        return "#94a3b8";
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/agent/${agent.id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.agentName}>{agent.agentName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor() },
          ]}
        >
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <Text style={styles.client}>Client: {agent.clientName}</Text>
      <Text style={styles.date}>Delivery: {agent.deliveryDate}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  agentName: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  client: {
    color: "#cbd5e1",
  },
  date: {
    color: "#94a3b8",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
