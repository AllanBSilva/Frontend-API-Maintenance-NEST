import axios from 'axios';

const API_URL = '/equipments';

export const createEquipment = async (equipmentData: any) => {
  const response = await axios.post(`${API_URL}/create`, equipmentData);
  return response.data;
};

export const updateEquipment = async (id: string, equipmentData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, equipmentData);
  return response.data;
};

export const deleteEquipment = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchEquipments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
