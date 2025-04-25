<template>
  <div class="dashboard">
    <div v-if="user">
      <h2>Welcome, {{ user.username }}!</h2>
      <p>You have successfully logged in.</p>
      <div class="dashboard-actions">
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
    <div v-else>
      <p>You need to login first.</p>
      <button @click="redirectToLogin" class="login-btn">Go to Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        // Invalid stored data
        localStorage.removeItem('user');
        this.redirectToLogin();
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.user = null;
      this.redirectToLogin();
    },
    redirectToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.dashboard {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1.5rem;
  color: #555;
}

.dashboard-actions {
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.login-btn {
  background-color: #42b983;
  color: white;
  border: none;
}

.login-btn:hover {
  background-color: #3aa876;
}
</style>
