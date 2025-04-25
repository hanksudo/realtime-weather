<template>
  <div class="not-found">
    <div class="error-container">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <div class="actions">
        <router-link to="/weather" class="home-link">Go to Weather Dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.error-container {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: #1976d2;
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.7;
}

h1 {
  color: #0d47a1;
  margin-bottom: 1rem;
}

p {
  color: #455a64;
  margin-bottom: 2rem;
}

.actions {
  margin-top: 2rem;
}

.home-link {
  display: inline-block;
  background-color: #1976d2;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.home-link:hover {
  background-color: #1565c0;
}
</style>
