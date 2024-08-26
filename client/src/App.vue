<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LogOut from './components/LogOut.vue';

const router = useRouter();
const isAuthenticated = ref(false);

function checkAuthStatus() {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token;
}

onMounted(() => {
  checkAuthStatus();
});

watch(
  () => router.currentRoute.value,
  () => {
    checkAuthStatus();
  }
);
</script>

<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink v-if="isAuthenticated" to="/profile">Profile</RouterLink>
    <LogOut v-if="isAuthenticated" />
    <RouterLink v-if="!isAuthenticated" to="/login">Login</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
/* Your existing styles */
</style>
