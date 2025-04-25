import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import WeatherDashboard from './components/WeatherDashboard.vue'
import ForecastView from './components/ForecastView.vue'
import LocationSearch from './components/LocationSearch.vue'

const routes = [
  { path: '/', redirect: '/weather' },
  { path: '/weather', component: WeatherDashboard },
  { path: '/forecast', component: ForecastView },
  { path: '/search', component: LocationSearch }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
