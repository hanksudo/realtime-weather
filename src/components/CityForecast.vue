<template>
  <div class="city-forecast">
    <div class="forecast-header">
      <div class="city-info">
        <router-link to="/" class="back-link">← Back to Cities</router-link>
        <h2>{{ city ? city.name : 'Loading...' }} 5-Day Forecast</h2>
      </div>
      <button @click="refreshForecast" class="refresh-btn">
        Refresh
      </button>
    </div>
    
    <div v-if="loading" class="loading-state">
      <p>Loading forecast data...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="refreshForecast">Try Again</button>
    </div>
    
    <div v-else-if="forecast.length" class="forecast-content">
      <div v-for="(day, index) in forecast" :key="index" class="forecast-day">
        <div class="day-header">
          <h3>{{ formatDate(day.date) }}</h3>
        </div>
        
        <div class="day-content">
          <div class="day-temps">
            <div class="temp-item">
              <span class="temp-label">High</span>
              <span class="temp-value high">{{ Math.round(day.maxTemp) }}°C</span>
            </div>
            <div class="temp-item">
              <span class="temp-label">Low</span>
              <span class="temp-value low">{{ Math.round(day.minTemp) }}°C</span>
            </div>
          </div>
          
          <div class="day-weather">
            <img 
              :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" 
              :alt="day.description" 
              class="weather-icon" 
            />
            <p class="weather-description">{{ day.description }}</p>
          </div>
          
          <div class="day-details">
            <div class="detail-item">
              <span class="detail-label">Humidity</span>
              <span class="detail-value">{{ day.humidity }}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Wind</span>
              <span class="detail-value">{{ Math.round(day.windSpeed) }} m/s</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Precipitation</span>
              <span class="detail-value">{{ day.precipitation }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p>No forecast data available</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { format, addDays } from 'date-fns';

type ForecastDay = {
  date: Date;
  maxTemp: number;
  minTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
};

type CityInfo = {
  name: string;
  lat: number;
  lon: number;
};

export default defineComponent({
  name: 'CityForecast',
  props: {
    cityId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const cities = {
      tokyo: { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
      kyoto: { name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
      sapporo: { name: 'Sapporo', lat: 43.0618, lon: 141.3545 },
      okinawa: { name: 'Okinawa', lat: 26.2124, lon: 127.6809 }
    };
    
    const city = computed<CityInfo | null>(() => {
      return cities[props.cityId as keyof typeof cities] || null;
    });
    
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);
    const forecast = ref<ForecastDay[]>([]);
    
    const formatDate = (date: Date): string => {
      return format(date, 'EEE, MMM d');
    };
    
    const fetchForecast = async () => {
      if (!city.value) {
        error.value = 'City not found';
        loading.value = false;
        return;
      }
      
      loading.value = true;
      error.value = null;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Base temperature varies by city
        const baseTemp = {
          tokyo: 18,
          kyoto: 20,
          sapporo: 12,
          okinawa: 26
        }[props.cityId] || 20;
        
        // Create 5 days of forecast data
        const days: ForecastDay[] = [];
        const weatherOptions = [
          { description: 'clear sky', icon: '01d' },
          { description: 'few clouds', icon: '02d' },
          { description: 'scattered clouds', icon: '03d' },
          { description: 'broken clouds', icon: '04d' },
          { description: 'light rain', icon: '10d' },
        ];
        
        for (let i = 0; i < 5; i++) {
          // Some randomness in temperature
          const tempVariation = Math.random() * 4 - 2;
          const dayTemp = baseTemp + tempVariation + i * 0.5; // Slight warming trend
          
          // Pick a random weather condition
          const weatherIndex = Math.floor(Math.random() * weatherOptions.length);
          
          days.push({
            date: addDays(new Date(), i),
            maxTemp: dayTemp + 3 + Math.random() * 2,
            minTemp: dayTemp - 3 - Math.random() * 2,
            description: weatherOptions[weatherIndex].description,
            icon: weatherOptions[weatherIndex].icon,
            humidity: Math.floor(60 + Math.random() * 25),
            windSpeed: 2 + Math.random() * 6,
            precipitation: Math.floor(Math.random() * 70)
          });
        }
        
        forecast.value = days;
      } catch (err) {
        console.error('Error fetching forecast:', err);
        error.value = 'Failed to load forecast data. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    const refreshForecast = () => {
      fetchForecast();
    };
    
    onMounted(() => {
      fetchForecast();
    });
    
    return {
      city,
      loading,
      error,
      forecast,
      formatDate,
      refreshForecast
    };
  }
});
</script>

<style scoped>
.city-forecast {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.forecast-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.back-link {
  display: block;
  margin-bottom: 0.5rem;
  color: #1976d2;
  text-decoration: none;
  font-size: 0.9rem;
}

.city-info h2 {
  font-size: 1.8rem;
  color: #1565c0;
  margin: 0;
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

.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #757575;
}

.error-state button {
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.forecast-content {
  display: grid;
  gap: 1.5rem;
}

.forecast-day {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.day-header {
  background-color: #1976d2;
  color: white;
  padding: 0.75rem 1rem;
}

.day-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.day-content {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 1rem;
  align-items: center;
}

.day-temps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.temp-item {
  display: flex;
  flex-direction: column;
}

.temp-label {
  font-size: 0.8rem;
  color: #757575;
  margin-bottom: 0.25rem;
}

.temp-value {
  font-size: 1.2rem;
  font-weight: 500;
}

.temp-value.high {
  color: #f44336;
}

.temp-value.low {
  color: #2196f3;
}

.day-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  width: 60px;
  height: 60px;
}

.weather-description {
  text-transform: capitalize;
  color: #455a64;
  font-size: 0.9rem;
  text-align: center;
}

.day-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
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

@media (max-width: 768px) {
  .forecast-header {
    flex-direction: column;
  }
  
  .refresh-btn {
    margin-top: 1rem;
    width: 100%;
  }
  
  .day-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .day-temps {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .day-details {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
</style>
