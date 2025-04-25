<template>
  <div class="weather-dashboard">
    <div class="weather-controls">
      <div class="location-display">
        <h2>{{ locationName }}</h2>
        <p>{{ currentDate }}</p>
      </div>
      <div class="actions">
        <button @click="refreshWeather" class="refresh-btn">
          Refresh
        </button>
        <router-link to="/search" class="search-link">Change Location</router-link>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading weather data...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="refreshWeather">Try Again</button>
    </div>

    <div v-else class="weather-content">
      <div class="current-weather">
        <div class="temperature">
          <span class="temp-value">{{ Math.round(weather.main.temp) }}°</span>
          <span class="temp-unit">C</span>
        </div>
        <div class="weather-info">
          <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" :alt="weather.weather[0].description" class="weather-icon" />
          <p class="weather-description">{{ weather.weather[0].description }}</p>
        </div>
      </div>

      <div class="weather-details">
        <div class="detail-item">
          <span class="detail-label">Feels Like</span>
          <span class="detail-value">{{ Math.round(weather.main.feels_like) }}°C</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Humidity</span>
          <span class="detail-value">{{ weather.main.humidity }}%</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Wind</span>
          <span class="detail-value">{{ Math.round(weather.wind.speed) }} m/s</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Pressure</span>
          <span class="detail-value">{{ weather.main.pressure }} hPa</span>
        </div>
      </div>
    </div>

    <div class="forecast-link">
      <router-link to="/forecast">View 5-Day Forecast</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { format } from 'date-fns';
import { WeatherData } from '@/types';

export default defineComponent({
  name: 'WeatherDashboard',
  setup() {
    const weather = ref<WeatherData | null>(null);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);
    const locationName = ref<string>('Loading location...');
    const currentDate = ref<string>(format(new Date(), 'EEEE, MMMM d, yyyy'));
    
    let updateInterval: number | null = null;

    const fetchWeather = async (lat: number, lon: number): Promise<void> => {
      try {
        loading.value = true;
        error.value = null;
        
        // For demo purposes, using a sample response
        // In a real app, use:
        // const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample weather data
        weather.value = {
          main: {
            temp: 18.5,
            feels_like: 17.8,
            humidity: 65,
            pressure: 1013
          },
          weather: [
            {
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03d'
            }
          ],
          wind: {
            speed: 4.2
          },
          name: 'Tokyo'
        };
        
        locationName.value = weather.value.name;
        loading.value = false;
      } catch (err) {
        console.error('Error fetching weather:', err);
        error.value = 'Failed to load weather data. Please try again.';
        loading.value = false;
      }
    };

    const getUserLocation = (): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.error('Geolocation error:', err);
            // Fallback to default location (Tokyo)
            fetchWeather(35.6895, 139.6917);
          }
        );
      } else {
        // Geolocation not supported, use default
        fetchWeather(35.6895, 139.6917);
      }
    };

    const refreshWeather = (): void => {
      getUserLocation();
    };

    onMounted(() => {
      getUserLocation();
      
      // Set up auto-refresh every 5 minutes
      updateInterval = window.setInterval(() => {
        refreshWeather();
      }, 5 * 60 * 1000);
    });

    onUnmounted(() => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    });

    return {
      weather,
      loading,
      error,
      locationName,
      currentDate,
      refreshWeather
    };
  }
});
</script>

<style scoped>
.weather-dashboard {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.weather-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.location-display h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #1565c0;
}

.location-display p {
  color: #757575;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.refresh-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background-color: #1565c0;
}

.search-link {
  color: #1976d2;
  text-decoration: none;
  font-size: 0.9rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #757575;
}

.error button {
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.current-weather {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.temperature {
  display: flex;
  align-items: flex-start;
}

.temp-value {
  font-size: 5rem;
  font-weight: 300;
  line-height: 1;
  color: #0d47a1;
}

.temp-unit {
  font-size: 2rem;
  color: #0d47a1;
  margin-top: 0.5rem;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.weather-description {
  text-transform: capitalize;
  color: #455a64;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.85rem;
  color: #757575;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.2rem;
  font-weight: 500;
  color: #455a64;
}

.forecast-link {
  text-align: center;
  margin-top: 1.5rem;
}

.forecast-link a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .weather-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .actions {
    width: 100%;
    justify-content: space-between;
  }

  .current-weather {
    flex-direction: column;
    gap: 1rem;
  }

  .weather-details {
    grid-template-columns: 1fr;
  }
}
</style>
