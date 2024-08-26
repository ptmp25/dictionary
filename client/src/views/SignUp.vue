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
                <input type="password" v-model="confirmPassword"  id="confirmPassword" required autocomplete="off" />
            </div>

            <button type="submit">Register</button>
        </form>

        <div v-if="errorMessage" class="error">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
import BackendApi from "../services/BackendApi"; // Adjust the path as necessary

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
            if (confirmPassword.value !== password.value) {
                console.log(confirmPassword, password);
                this.errorMessage = "Passwords do not match.";
                return;
            }
            try {
                const user = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                };
                const res = await BackendApi.registerUser(user);
                alert("User registered");
                console.log("User registered:", res.data);
                // Optionally, redirect to login or another page
                // this.$router.push('/login');
            } catch (error) {
                this.errorMessage = error.response.data.msg || "Registration failed.";
                console.error(error.response.data);
            }
        },
    },
};
</script>


<style scoped>
.register {
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
