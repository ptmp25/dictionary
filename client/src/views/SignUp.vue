<template>
    <div class="card bg-base-100 w-10/12 my-2.5  mx-auto shadow-xl">
        <div class="card-body">

            <div class="card-title">Register</div>
            <form @submit.prevent="registerUser">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="input input-bordered" v-model="name" id="name" required autocomplete="off" />
                </div>
    
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="input input-bordered" v-model="email" id="email" required autocomplete="off" />
                </div>
    
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="input input-bordered" v-model="password" id="password" required autocomplete="off" />
                </div>
    
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" class="input input-bordered" v-model="confirmPassword"  id="confirmPassword" required autocomplete="off" />
                </div>
    
                <button class="btn btn-success btn-outline btn-xs mt-2" type="submit">Register</button>
            </form>
    
            <div v-if="errorMessage" class="error">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import BackendApi from "../services/BackendApi"; // Adjust the path as necessary
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

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
    setup() {
        const router = useRoute();
        const toast = useToast();
        return { router, toast };
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
                // alert("User registered");
                console.log("User registered:", res.data);
                this.toast.success('Registration successful');
                // Optionally, redirect to login or another page
                this.$router.push('/login');
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
