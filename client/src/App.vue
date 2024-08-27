<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <header>
    <Header />
  </header>
  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.checkAuthStatus();
  },
  methods: {
    checkAuthStatus() {
      // Check if the token exists in localStorage
      const token = localStorage.getItem("token");
      this.isAuthenticated = !!token;
    },
  },
  watch: {
    '$route'() {
      this.checkAuthStatus();
    }
  }
};
</script>