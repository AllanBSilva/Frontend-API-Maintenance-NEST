import axios from 'axios';

// URL base da API para manutenção
const API_URL = '/maintenance';

// Função para criar uma nova manutenção
export const createMaintenance = async (maintenanceData: any) => {
  try {
    const response = await axios.post(`${API_URL}/create`, maintenanceData);
    return response.data;  // Retorna os dados da manutenção criada
  } catch (error) {
    console.error('Erro ao criar manutenção', error);
    throw error;  // Lança o erro para ser tratado onde for chamado
  }
};

// Função para atualizar uma manutenção existente
export const updateMaintenance = async (id: string, maintenanceData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, maintenanceData);
    return response.data;  // Retorna os dados da manutenção atualizada
  } catch (error) {
    console.error('Erro ao atualizar manutenção', error);
    throw error;  // Lança o erro para ser tratado onde for chamado
  }
};

// Função para excluir uma manutenção
export const deleteMaintenance = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Retorna uma confirmação ou mensagem após a exclusão
  } catch (error) {
    console.error('Erro ao excluir manutenção', error);
    throw error;  // Lança o erro para ser tratado onde for chamado
  }
};

// Função para buscar todas as manutenções
export const fetchAllMaintenances = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Retorna a lista de manutenções
  } catch (error) {
    console.error('Erro ao buscar manutenções', error);
    throw error;  // Lança o erro para ser tratado onde for chamado
  }
};

// Função para buscar manutenções por ID de equipamento
export const fetchMaintenancesByEquipmentId = async (equipmentId: string) => {
  try {
    const response = await axios.get(`${API_URL}/equipment/${equipmentId}`);
    return response.data;  // Retorna a lista de manutenções para o equipamento especificado
  } catch (error) {
    console.error('Erro ao buscar manutenções por equipamento', error);
    throw error;  // Lança o erro para ser tratado onde for chamado
  }
};
