<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required autocomplete="off" />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required autocomplete="off" />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required autocomplete="off" />
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required autocomplete="off" />
        </div>
  
        <button type="submit">Register</button>
      </form>
  
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import { registerUser } from '../services/apiService';
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: null,
      };
    },
    methods: {
      async registerUser() {
        if (this.confirmPassword !== this.password) {
          this.errorMessage = "Passwords do not match.";
          return;
        }
        try {
          const user = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          await registerUser(user);
          alert("User registered successfully");
          this.$router.push('/login');
        } catch (error) {
          this.errorMessage = error.response?.data?.msg || "Registration failed.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  