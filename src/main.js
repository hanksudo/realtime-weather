import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import WeatherDashboard from './components/WeatherDashboard.vue'
import ForecastView from './components/ForecastView.vue'
import LocationSearch from './components/LocationSearch.vue'

// Get the base URL from Vite
const base = import.meta.env.BASE_URL || '/'

const routes = [
  { path: '/', redirect: '/weather' },
  { path: '/weather', component: WeatherDashboard },
  { path: '/forecast', component: ForecastView },
  { path: '/search', component: LocationSearch }
]

const router = createRouter({
  history: createWebHistory(base),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
