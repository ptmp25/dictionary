import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Register User
export const registerUser = async (user) => {
  try {
    const response = await api.post('/users', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

