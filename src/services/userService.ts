import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

// Funções exportadas
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/create`, userData);
  return response.data;
};

export const updateUser = async (id: string, userData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchUserByName = async (username: string) => {
  const response = await axios.get(`${API_URL}/${username}`);
  return response.data;
};
