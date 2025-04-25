<template>
  <div class="cities-dashboard">
    <h2 class="dashboard-title">Japan Cities Weather</h2>
    
    <div class="city-cards">
      <div v-for="city in cities" :key="city.id" class="city-card" @click="goToCityForecast(city.id)">
        <div class="city-header">
          <h3>{{ city.name }}</h3>
          <span v-if="city.weather" class="timestamp">Updated: {{ formatTime() }}</span>
        </div>
        
        <div v-if="loadingStates[city.id]" class="city-loading">
          <p>Loading weather data...</p>
        </div>
        
        <div v-else-if="errorStates[city.id]" class="city-error">
          <p>{{ errorStates[city.id] }}</p>
          <button @click.stop="fetchCityWeather(city)">Retry</button>
        </div>
        
        <div v-else-if="city.weather" class="city-content">
          <div class="temperature">
            <span class="temp-value">{{ Math.round(city.weather.main.temp) }}°C</span>
          </div>
          <div class="weather-info">
            <img 
              :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`" 
              :alt="city.weather.weather[0].description" 
              class="weather-icon" 
            />
            <p class="weather-description">{{ city.weather.weather[0].description }}</p>
          </div>
          <div class="city-details">
            <div class="detail-item">
              <span class="detail-label">Humidity</span>
              <span class="detail-value">{{ city.weather.main.humidity }}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Wind</span>
              <span class="detail-value">{{ Math.round(city.weather.wind.speed) }} m/s</span>
            </div>
          </div>
        </div>
        
        <div class="view-forecast">
          <span class="forecast-link">View 5-Day Forecast →</span>
        </div>
      </div>
    </div>
    
    <div class="dashboard-actions">
      <button @click="refreshAllWeather" class="refresh-btn">
        Refresh All
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';

type City = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  weather?: any;
};

export default defineComponent({
  name: 'CitiesDashboard',
  setup() {
    const router = useRouter();
    const cities = ref<City[]>([
      { id: 'tokyo', name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
      { id: 'kyoto', name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
      { id: 'sapporo', name: 'Sapporo', lat: 43.0618, lon: 141.3545 },
      { id: 'okinawa', name: 'Okinawa', lat: 26.2124, lon: 127.6809 }
    ]);
    
    const loadingStates = reactive<Record<string, boolean>>({});
    const errorStates = reactive<Record<string, string | null>>({});
    
    const formatTime = () => {
      return format(new Date(), 'HH:mm:ss');
    };
    
    const fetchCityWeather = async (city: City) => {
      loadingStates[city.id] = true;
      errorStates[city.id] = null;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        
        // Mock weather data
        const temps = {
          tokyo: 18.5,
          kyoto: 20.2,
          sapporo: 12.8,
          okinawa: 25.5
        };
        
        const descriptions = {
          tokyo: 'scattered clouds',
          kyoto: 'light rain',
          sapporo: 'clear sky',
          okinawa: 'broken clouds'
        };
        
        const icons = {
          tokyo: '03d',
          kyoto: '10d',
          sapporo: '01d',
          okinawa: '04d'
        };
        
        // Create simulated weather data
        const cityWeather = {
          main: {
            temp: temps[city.id as keyof typeof temps] + (Math.random() * 2 - 1),
            feels_like: temps[city.id as keyof typeof temps] - 0.7,
            humidity: Math.floor(65 + Math.random() * 20),
            pressure: 1013
          },
          weather: [
            {
              main: descriptions[city.id as keyof typeof descriptions].split(' ')[1] || 'Clouds',
              description: descriptions[city.id as keyof typeof descriptions],
              icon: icons[city.id as keyof typeof icons]
            }
          ],
          wind: {
            speed: 3 + Math.random() * 5
          },
          name: city.name
        };
        
        // Update city weather
        const cityIndex = cities.value.findIndex(c => c.id === city.id);
        if (cityIndex !== -1) {
          cities.value[cityIndex] = {
            ...cities.value[cityIndex],
            weather: cityWeather
          };
        }
      } catch (err) {
        console.error(`Error fetching weather for ${city.name}:`, err);
        errorStates[city.id] = `Failed to load ${city.name} weather data.`;
      } finally {
        loadingStates[city.id] = false;
      }
    };
    
    const refreshAllWeather = () => {
      cities.value.forEach(city => {
        fetchCityWeather(city);
      });
    };
    
    const goToCityForecast = (cityId: string) => {
      router.push(`/city/${cityId}/forecast`);
    };
    
    onMounted(() => {
      refreshAllWeather();
    });
    
    return {
      cities,
      loadingStates,
      errorStates,
      fetchCityWeather,
      refreshAllWeather,
      goToCityForecast,
      formatTime
    };
  }
});
</script>

<style scoped>
.cities-dashboard {
  max-width: 100%;
  margin: 0 auto;
}

.dashboard-title {
  text-align: center;
  color: #1565c0;
  margin-bottom: 1.5rem;
  font-weight: 400;
  font-size: 1.8rem;
}

.city-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.city-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.city-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.city-header h3 {
  font-size: 1.3rem;
  color: #1565c0;
  margin: 0;
}

.timestamp {
  font-size: 0.8rem;
  color: #757575;
}

.city-loading, .city-error {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #757575;
}

.city-error button {
  margin-top: 0.5rem;
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.city-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
}

.temperature {
  margin-bottom: 1rem;
}

.temp-value {
  font-size: 2.5rem;
  font-weight: 300;
  color: #0d47a1;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.weather-icon {
  width: 60px;
  height: 60px;
}

.weather-description {
  text-transform: capitalize;
  color: #455a64;
  font-size: 0.9rem;
  margin-top: -0.5rem;
}

.city-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  color: #757575;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
  color: #455a64;
}

.view-forecast {
  text-align: center;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #e1e1e1;
}

.forecast-link {
  color: #1976d2;
  font-weight: 500;
  font-size: 0.9rem;
}

.dashboard-actions {
  text-align: center;
  margin-top: 1rem;
}

.refresh-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background-color: #1565c0;
}

@media (max-width: 768px) {
  .city-cards {
    grid-template-columns: 1fr;
  }
}
</style>
