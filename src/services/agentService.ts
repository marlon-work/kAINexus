import { supabase } from '../lib/supabase';
import { Agent } from '../types/Agent';

export const agentService = {
  /**
   * Crea un nuevo agente en Supabase
   */
  async createAgent(agentData: Omit<Agent, 'id' | 'status' | 'progress' | 'imageUrl'>) {
    const { data, error } = await supabase
      .from('agents')
      .insert([
        {
          client_name: agentData.clientName,
          client_email: agentData.clientEmail,
          agent_name: agentData.agentName,
          description: agentData.description,
          delivery_date: agentData.deliveryDate,
          category: agentData.category,
          priority: agentData.priority,
          status: 'Pending',
          progress: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error in agentService.createAgent:', error.message);
      throw error;
    }
    
    return data;
  },

  /**
   * Obtiene todos los agentes de Supabase
   */
  async getAgents() {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error in agentService.getAgents:', error.message);
      throw error;
    }

    return data;
  }
};
