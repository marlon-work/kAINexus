export type AgentStatus = "Pending" | "In Progress" | "Delivered";

export interface Agent {
  id: string;
  clientName: string;
  clientEmail: string;
  agentName: string;
  description: string;
  deliveryDate: string;
  status: AgentStatus;
}
