import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import WeatherDashboard from './components/WeatherDashboard.vue'
import ForecastView from './components/ForecastView.vue'
import LocationSearch from './components/LocationSearch.vue'
import NotFound from './components/NotFound.vue'
import CitiesOverview from './components/CitiesOverview.vue'
import CityDashboard from './components/CityDashboard.vue'

// Get the base URL from Vite
const base = import.meta.env.BASE_URL || '/'

const routes: RouteRecordRaw[] = [
  { path: '/', component: CitiesOverview },
  { path: '/weather', redirect: '/' },
  { path: '/city/:city', name: 'CityView', component: CityDashboard, props: (route) => {
    const cities = {
      tokyo: { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
      kyoto: { name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
      sapporo: { name: 'Sapporo', lat: 43.0618, lon: 141.3545 },
      okinawa: { name: 'Okinawa', lat: 26.2124, lon: 127.6809 }
    };
    const cityName = route.params.city as string;
    return { city: cities[cityName as keyof typeof cities] || cities.tokyo };
  }},
  { path: '/forecast', component: ForecastView },
  { path: '/search', component: LocationSearch },
  // 404 route - must be last!
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(base),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
