import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { AgentContext } from "../../src/context/AgentContext";

export default function AgentDetail() {
  const { id } = useLocalSearchParams();
  const { agents } = useContext(AgentContext);

  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return <Text style={{ padding: 16 }}>Agent not found</Text>;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 8 }}>
        {agent.agentName}
      </Text>
      <Text style={{ color: "white" }}>Client: {agent.clientName}</Text>
      <Text style={{ color: "white" }}>Email: {agent.clientEmail}</Text>
      <Text style={{ color: "white" }}>Description: {agent.description}</Text>
      <Text style={{ color: "white" }}>Delivery: {agent.deliveryDate}</Text>
      <Text style={{ color: "white" }}>Status: {agent.status}</Text>
    </View>
  );
}
