import React, { createContext, useState } from "react";
import { Agent } from "../types/Agent";

const INITIAL_AGENTS: Agent[] = [
  {
    id: "1",
    clientName: "Cyberdyne Systems",
    clientEmail: "sarah.connor@cyberdyne.io",
    agentName: "T-800 Sentinel",
    description: "Multi-purpose security agent with advanced pattern recognition and threat assessment capabilities.",
    deliveryDate: "2025-12-25",
    status: "In Progress",
    imageUrl: require("../../assets/images/kai-christmas.png"),
    progress: 65,
  },
  {
    id: "2",
    clientName: "Stark Industries",
    clientEmail: "pepper.potts@stark.com",
    agentName: "JARVIS Alpha",
    description: "Home automation and personal assistant specialized in energy management and aerospace navigation.",
    deliveryDate: "2025-06-15",
    status: "Delivered",
    imageUrl: require("../../assets/images/kai-conexion-exitosa.png"),
    progress: 100,
  },
  {
    id: "3",
    clientName: "Weyland-Yutani",
    clientEmail: "ripley@weyland.corp",
    agentName: "MU-TH-UR 6000",
    description: "Deep space mission coordinator with expertise in bio-hazard monitoring and distress signal analysis.",
    deliveryDate: "2026-02-10",
    status: "Pending",
    imageUrl: require("../../assets/images/icon.png"),
    progress: 15,
  },
  {
    id: "4",
    clientName: "Tyrell Corporation",
    clientEmail: "rachel@tyrell.com",
    agentName: "Nexus-6 Dreamer",
    description: "Emotional intelligence specialist focused on memory synthesis and empathy simulations.",
    deliveryDate: "2025-11-19",
    status: "In Progress",
    imageUrl: require("../../assets/images/kai-christmas.png"),
    progress: 42,
  }
];

interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
}

export const AgentContext = createContext<AgentContextType>({
  agents: [],
  addAgent: () => {},
  removeAgent: () => {},
  updateAgent: () => {},
});

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);

  const addAgent = (agent: Agent) => {
    const newAgent = {
      ...agent,
      imageUrl: agent.imageUrl || require("../../assets/images/icon.png"),
      progress: agent.progress || 0,
    };
    setAgents((prev) => [newAgent, ...prev]);
  };

  const removeAgent = (id: string) => {
    setAgents((prev) => prev.filter(a => a.id !== id));
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents((prev) => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  return (
    <AgentContext.Provider value={{ agents, addAgent, removeAgent, updateAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
