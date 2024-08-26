<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" v-model="email" id="email" required />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" id="password" required />
            </div>

            <button type="submit">Login</button>
        </form>

        <div v-if="errorMessage" class="error">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
import BackendApi from "@/services/BackendApi"; // Adjust the path as necessary

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: null,
        };
    },
    methods: {
        async loginUser() {
            try {
                const user = {
                    email: this.email,
                    password: this.password,
                };
                const res = await BackendApi.loginUser(user);
                console.log("User logged in, token received:", res.data.token);
                // Store token and redirect as needed
                localStorage.setItem("token", res.data.token);
                // this.$router.push('/dashboard'); // Example redirect after login
            } catch (error) {
                this.errorMessage = error.response.data.msg || "Login failed.";
                console.error(error.response.data);
            }
        },
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
