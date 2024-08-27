<template>
    <div class="profile">
        <h2>User Profile</h2>
        <form @submit.prevent="updateUser">
            <div class="form-group">
                <label for="name">Name:</label>
                <input readonly type="text" v-model="user.name" id="name" required />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input readonly type="email" v-model="user.email" id="email" required />
            </div>

            <div class="form-group">
                <label for="point">Point</label>
                <input readonly type="text" v-model="user.point" id="point" required />
            </div>
            <!-- <button type="submit">Update Profile</button> -->
            <RouterLink to="/change-password" class="btn btn-primary">Change Password</RouterLink>
            <!-- Delete Account Button -->
            <button @click="confirmDeleteAccount">Delete Account</button>
            <!-- Confirmation Modal (optional) -->
            <div v-if="showConfirmation" class="confirmation-modal">
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <button @click="deleteAccount">Yes, Delete</button>
                <button @click="cancelDelete">Cancel</button>
            </div>

            <!-- <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <div v-if="successMessage" class="success">{{ successMessage }}</div> -->
        </form>

        <div v-if="errorMessage" class="error">
            {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="success">
            {{ successMessage }}
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import BackendApi from "../services/backendApi"; // Adjust the path as necessary
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";

export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
            errorMessage: null,
            successMessage: null,
            showConfirmation: false,
        };
    },
    setup() {
        const toast = useToast();
        const route = useRoute();
        return { toast, route };
    },
    created() {
        this.getUserProfile();
    },
    methods: {
        async getUserProfile() {
            try {
                const res = await BackendApi.getUserProfile();
                this.user = res.data;
            }
            catch (error) {
                this.errorMessage = "Failed to load user data.";
                console.error(error.response.data);
            }
        },
        confirmDeleteAccount() {
            this.showConfirmation = true;
        },
        cancelDelete() {
            this.showConfirmation = false;
        },
        async deleteAccount() {
            try {
                await BackendApi.deleteUserAccount();
                this.successMessage = "Account deleted successfully.";
                localStorage.removeItem("token"); // Clear token from localStorage
                this.toast.success("Account deleted successfully.");
                this.$router.push("/"); // Redirect to home page or login page
            } catch (error) {
                this.errorMessage = error.response.data.msg || "Failed to delete account.";
                console.error(error.response.data);
            }
        },
    },
    components: { RouterLink }
};
</script>

<style scoped>
.profile {
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

.success {
    color: green;
    margin-top: 10px;
}
</style>
