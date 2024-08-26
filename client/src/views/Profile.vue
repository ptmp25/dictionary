<template>
    <div class="p-8 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h1 class="text-2xl font-bold mb-4">Update Profile</h1>
      <form @submit.prevent="updateProfile">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="user.name" id="name" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="user.email" id="email" type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="profilePicture" class="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input v-model="user.profilePicture" id="profilePicture" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div class="mt-6">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Update Profile
          </button>
        </div>
      </form>
      <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { updateUserProfile } from '../services/apiService';
  
  const router = useRouter();
  const user = ref({
    name: '',
    email: '',
    profilePicture: ''
  });
  const errorMessage = ref(null);
  
  const updateProfile = async () => {
    try {
      const response = await updateUserProfile(user.value);
      console.log('Profile updated:', response);
      // Redirect or show success message
      router.push('/'); // Redirect to home or dashboard
    } catch (error) {
      if (error.response && error.response.status === 401) {
        errorMessage.value = 'Unauthorized: Please log in again.';
      } else {
        errorMessage.value = 'Error updating profile. Please try again.';
      }
      console.error('Error updating profile:', error);
    }
  };
  
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  