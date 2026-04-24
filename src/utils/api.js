import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const processHierarchy = async (data) => {
  try {
    const response = await api.post('/bfhl', { data });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'API Error');
    }
    throw new Error('Failed to connect to the server. Is the backend running?');
  }
};

export default api;
