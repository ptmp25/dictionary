// BackendApi.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add authorization header for protected routes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  registerUser(user) {
    return apiClient.post("/users", user);
  },
  loginUser(user) {
    return apiClient.post("/auth", user);
  },
  getUserProfile() {
    return apiClient.get("/auth"); // GET request to fetch logged-in user data
  },
  updateUserProfile(user) {
    return apiClient.patch("/auth", user); // PATCH request to update user profile
  },
};
