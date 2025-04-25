<template>
  <div class="city-dashboard">
    <div class="city-controls">
      <div class="city-display">
        <h2>{{ city.name }}</h2>
        <p>{{ currentDate }}</p>
      </div>
      <div class="actions">
        <button @click="refreshWeather" class="refresh-btn">
          Refresh
        </button>
        <router-link to="/" class="back-link">Back to Dashboard</router-link>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading weather data...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="refreshWeather">Try Again</button>
    </div>

    <div v-else>
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

      <h3 class="forecast-title">5-Day Forecast</h3>
      <div class="forecast-container">
        <div v-for="(day, index) in forecast" :key="index" class="forecast-day">
          <p class="forecast-date">{{ day.date }}</p>
          <img :src="`http://openweathermap.org/img/wn/${day.icon}.png`" :alt="day.description" class="forecast-icon" />
          <p class="forecast-temp">{{ Math.round(day.temp) }}°C</p>
          <p class="forecast-desc">{{ day.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { format } from 'date-fns';
import { WeatherData } from '@/types';

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface ForecastDay {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export default defineComponent({
  name: 'CityDashboard',
  props: {
    city: {
      type: Object as PropType<City>,
      required: true
    }
  },
  setup(props) {
    const weather = ref<WeatherData | null>(null);
    const forecast = ref<ForecastDay[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);
    const currentDate = ref<string>(format(new Date(), 'EEEE, MMMM d, yyyy'));
    
    const fetchWeather = async (): Promise<void> => {
      try {
        loading.value = true;
        error.value = null;
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample weather data for the selected city
        weather.value = {
          main: {
            temp: getRandomTemp(props.city.name),
            feels_like: getRandomTemp(props.city.name) - 1,
            humidity: Math.floor(Math.random() * 30) + 50,
            pressure: Math.floor(Math.random() * 20) + 1000
          },
          weather: [
            {
              main: getRandomWeatherType(),
              description: getRandomWeatherDescription(),
              icon: getRandomWeatherIcon()
            }
          ],
          wind: {
            speed: Math.floor(Math.random() * 7) + 1
          },
          name: props.city.name
        };
        
        // Sample 5-day forecast
        forecast.value = generateForecast();
        
        loading.value = false;
      } catch (err) {
        console.error('Error fetching weather:', err);
        error.value = 'Failed to load weather data. Please try again.';
        loading.value = false;
      }
    };

    const getRandomTemp = (cityName: string): number => {
      // Simulate different temperature ranges for different cities
      const baseTempMap: Record<string, number> = {
        'Tokyo': 18,
        'Kyoto': 17,
        'Sapporo': 10,
        'Okinawa': 26
      };
      
      const baseTemp = baseTempMap[cityName] || 20;
      return baseTemp + (Math.random() * 6 - 3);
    };
    
    const getRandomWeatherType = (): string => {
      const types = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm'];
      return types[Math.floor(Math.random() * types.length)];
    };
    
    const getRandomWeatherDescription = (): string => {
      const descriptions = [
        'clear sky', 'few clouds', 'scattered clouds', 
        'broken clouds', 'light rain', 'moderate rain',
        'light drizzle', 'thunderstorm'
      ];
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    };
    
    const getRandomWeatherIcon = (): string => {
      const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d'];
      return icons[Math.floor(Math.random() * icons.length)];
    };
    
    const generateForecast = (): ForecastDay[] => {
      const result: ForecastDay[] = [];
      const today = new Date();
      
      for (let i = 1; i <= 5; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        
        result.push({
          date: format(date, 'EEE, MMM d'),
          temp: getRandomTemp(props.city.name) + (Math.random() * 4 - 2),
          description: getRandomWeatherDescription(),
          icon: getRandomWeatherIcon()
        });
      }
      
      return result;
    };

    const refreshWeather = (): void => {
      fetchWeather();
    };

    onMounted(() => {
      fetchWeather();
    });

    return {
      weather,
      forecast,
      loading,
      error,
      currentDate,
      refreshWeather
    };
  }
});
</script>

<style scoped>
.city-dashboard {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.city-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.city-display h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #1565c0;
}

.city-display p {
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

.back-link {
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

.forecast-title {
  margin-bottom: 1rem;
  color: #1565c0;
  font-size: 1.5rem;
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.forecast-day {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.forecast-date {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #455a64;
}

.forecast-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto;
}

.forecast-temp {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.5rem 0;
  color: #1565c0;
}

.forecast-desc {
  font-size: 0.8rem;
  color: #757575;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .city-controls {
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
  
  .forecast-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
