<template>
    <div class="change-password">
        <h2>Change Password</h2>
        <form @submit.prevent="changePassword">
            <div class="form-group">
                <label for="oldPassword">Old Password:</label>
                <input class="input input-bordered"  type="password" v-model="oldPassword" id="oldPassword" required />
            </div>

            <div class="form-group">
                <label for="newPassword">New Password:</label>
                <input class="input input-bordered" type="password" v-model="newPassword" id="newPassword" required />
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirm New Password:</label>
                <input class="input input-bordered" type="password" v-model="confirmPassword" id="confirmPassword" required />
            </div>

            <button  class="btn btn-warning btn-xs mt-2" type="submit">Change Password</button>
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
import BackendApi from "../services/backendApi"; // Adjust the path as necessary

export default {
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            errorMessage: null,
            successMessage: null,
        };
    },
    methods: {
        async changePassword() {
            // Basic validation
            if (this.newPassword !== this.confirmPassword) {
                this.errorMessage = "New passwords do not match.";
                return;
            }

            try {
                const res = await BackendApi.changeUserPassword({
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                });
                this.successMessage = "Password changed successfully!";
                this.oldPassword = "";
                this.newPassword = "";
                this.confirmPassword = "";
            } catch (error) {
                this.errorMessage = error.response.data.msg || "Failed to change password.";
                console.error(error.response.data);
            }
        },
    },
};
</script>

<style scoped>
.change-password {
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
