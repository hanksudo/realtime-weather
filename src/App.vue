<template>
  <div class="app">
    <header>
      <h1>Realtime Weather Dashboard</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>Data refreshes automatically every 5 minutes</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
}

body {
  background-color: #f0f8ff;
  color: #333;
}

.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
}

header {
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 1rem;
}

h1 {
  color: #0d47a1;
  font-weight: 300;
  font-size: 2.5rem;
}

footer {
  margin-top: 2rem;
  text-align: center;
  color: #757575;
  font-size: 0.8rem;
  padding-top: 1rem;
  border-top: 1px solid #e1e1e1;
}
</style>
