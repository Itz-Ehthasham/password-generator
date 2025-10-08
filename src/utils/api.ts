import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const savePassword = async (userId: string, password: string) => {
  const response = await api.post('/passwords', { userId, password });
  return response.data;
};

export const getPasswordHistory = async (userId: string) => {
  const response = await api.get(`/passwords/${userId}`);
  return response.data;
};

export const deletePassword = async (passwordId: string) => {
  await api.delete(`/passwords/${passwordId}`);
};