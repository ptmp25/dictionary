<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BackendApi from '../services/BackendApi';

const router = useRouter();
const profilePicture = ref('');
const userName = ref('');

onMounted(async () => {
  // Fetch user profile data
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userProfile = await BackendApi.getUserProfile();
      profilePicture.value = userProfile.profilePicture || '/default-profile.png';
      userName.value = userProfile.name || 'User';
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  } else {
    // Redirect to login if no token
    router.push('/login');
  }
});
</script>

<template>
  <div class="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
    <header class="flex items-center w-full max-w-3xl justify-between mb-8">
      <img 
        :src="profilePicture" 
        alt="Profile Picture" 
        class="w-16 h-16 rounded-full border-2 border-gray-300"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-800">{{ userName }}</h1>
      </div>
      <button 
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </header>

    <nav class="flex space-x-4 mb-8">
      <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
      <router-link to="/profile" class="text-blue-500 hover:underline">Profile</router-link>
      <router-link to="/about" class="text-blue-500 hover:underline">About</router-link>
    </nav>

    <main class="text-center max-w-2xl">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">
        Welcome, {{ userName }}!
      </h1>
      <p class="text-lg text-gray-600 mb-4">
        Explore the features of our application and get started by navigating through the menu above.
      </p>
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
}
</style>
