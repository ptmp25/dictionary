<template>
    <div>
        <button @click="logoutUser">Logout</button>
    </div>
</template>

<script>
export default {
    methods: {
        logoutUser() {
            // Clear the token from localStorage
            localStorage.removeItem("token");
            // Redirect to the login page or home page
            this.$router.push("/login"); // Adjust the path as needed
        },
    },
};
</script>

<style scoped>
button {
    padding: 10px 20px;
    background-color: #f00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #c00;
}
</style>
