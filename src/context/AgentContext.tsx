import React, { createContext, useState } from "react";
import { Agent } from "../types/Agent";

interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
}

export const AgentContext = createContext<AgentContextType>({
  agents: [],
  addAgent: () => {},
});

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const addAgent = (agent: Agent) => {
    setAgents((prev) => [...prev, agent]);
  };

  return (
    <AgentContext.Provider value={{ agents, addAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
