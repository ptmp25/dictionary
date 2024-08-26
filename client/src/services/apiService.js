import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Axios request config:', config); // Debugging line
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const loginUser = async (user) => {
  try {
    const response = await api.post('/auth/login', user);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};


// Register User
export const registerUser = async (user) => {
  try {
    const response = await api.post('/users', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update User Profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.patch('/users/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Change Password
export const changePassword = async (passwords) => {
  try {
    const response = await api.patch('/auth/change-password', passwords);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
