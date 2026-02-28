import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { AgentContext } from "../src/context/AgentContext";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";

export default function CreateAgentScreen() {
  const { addAgent } = useContext(AgentContext);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = async () => {
  const id = await Crypto.randomUUID();

  addAgent({
    id,
    clientName,
    clientEmail,
    agentName,
    description,
    deliveryDate,
    status: "Pending",
  });

  router.back();
};


  return (
    <View style={styles.container}>
      <TextInput placeholder="Client Name" style={styles.input} onChangeText={setClientName} />
      <TextInput placeholder="Client Email" style={styles.input} onChangeText={setClientEmail} />
      <TextInput placeholder="Agent Name" style={styles.input} onChangeText={setAgentName} />
      <TextInput placeholder="Description" style={styles.input} onChangeText={setDescription} />
      <TextInput placeholder="Delivery Date" style={styles.input} onChangeText={setDeliveryDate} />
      <Button title="Save Agent" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
