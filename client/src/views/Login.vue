<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="loginUserHandler"> <!-- Ensure this is correct -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
  
        <button type="submit">Login</button>
        <p>If you don't have an account,</p>
        <router-link to="/register">Register</router-link>
      </form>
  
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { loginUser } from '../services/apiService';
  
  export default {
    setup() {
      const router = useRouter();
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      const loginUserHandler = async () => {
        try {
          const res = await loginUser({ email: email.value, password: password.value });
          if (res.token) {
            localStorage.setItem('token', res.token);
            router.push('/');
          } else {
            errorMessage.value = 'Login failed.';
          }
        } catch (error) {
          errorMessage.value = 'An error occurred. Please try again.';
        }
      };
  
      return {
        email,
        password,
        errorMessage,
        loginUserHandler,
      };
    },
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  