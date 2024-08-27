<template>
    <div  class="card bg-base-100 w-10/12 my-2.5  mx-auto shadow-xl">
        <div class="card-body">

            <p class="card-title">Login</p>
    
            <form @submit.prevent="loginUser">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input class="input input-bordered" type="email" v-model="email" id="email" required />
                </div>
    
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input class="input input-bordered" type="password" v-model="password" id="password" required />
                </div>
    
                <button type="submit" class="btn btn-sm">Login</button>
                <p>If you don't have account</p> <router-link class="btn btn-success btn-sm"
                    to="/register">Register</router-link>
            </form>
    
            <div v-if="errorMessage" class="error">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import BackendApi from "../services/BackendApi";
import { useRoute } from 'vue-router'; 
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: null,
        };
    },
    setup() {
        const toast = useToast();
        const router = useRoute();
        return { router, toast };
    },
    methods: {
        async loginUser() {
            try {
                const user = {
                    email: this.email,
                    password: this.password,
                };
                const res = await BackendApi.loginUser(user);
                // Store token and redirect as needed
                localStorage.setItem("token", res.data.token);
                // console.log("User logged in, token received:", res.data.token);
                this.toast.success('Login successful');
                this.$router.push("/");
                // this.$router.push('/dashboard'); // Example redirect after login
            } catch (error) {
                this.errorMessage = error || "Login failed.";
                console.error(error);
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
