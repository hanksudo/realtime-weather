import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import WeatherDashboard from './components/WeatherDashboard.vue'
import ForecastView from './components/ForecastView.vue'
import LocationSearch from './components/LocationSearch.vue'
import NotFound from './components/NotFound.vue'
import CitiesOverview from './components/CitiesOverview.vue'
import CityDashboard from './components/CityDashboard.vue'
import CitiesDashboard from './components/CitiesDashboard.vue'
import CityForecast from './components/CityForecast.vue'

// Get the base URL from Vite
const base = import.meta.env.BASE_URL || '/'

// Define the routes with proper handling of the base URL
const routes: RouteRecordRaw[] = [
  // New dashboard is now the homepage
  { path: '/', component: CitiesDashboard },
  { path: '/weather', redirect: '/' },
  // Add a route for /cities that works with the base URL prefix
  { path: '/cities', component: CitiesOverview },
  { 
    path: '/city/:city', 
    name: 'CityView', 
    component: CityDashboard, 
    props: (route) => {
      const cities = {
        tokyo: { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
        kyoto: { name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
        sapporo: { name: 'Sapporo', lat: 43.0618, lon: 141.3545 },
        okinawa: { name: 'Okinawa', lat: 26.2124, lon: 127.6809 }
      };
      const cityName = route.params.city as string;
      return { city: cities[cityName as keyof typeof cities] || cities.tokyo };
    }
  },
  { 
    path: '/city/:city/forecast', 
    name: 'CityForecast', 
    component: CityForecast, 
    props: (route) => ({
      cityId: route.params.city
    })
  },
  { path: '/forecast', component: ForecastView },
  { path: '/search', component: LocationSearch },
  // 404 route - must be last!
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

// Create router with proper history mode using the base URL
const router = createRouter({
  history: createWebHistory(base),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
