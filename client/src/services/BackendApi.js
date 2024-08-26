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

export default {
  registerUser(user) {
    return apiClient.post("/users", user);
  },
  loginUser(user) {
    return apiClient.post("/auth", user);
  },
};
