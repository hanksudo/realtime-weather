<template>
  <div class="forecast-view">
    <div class="header">
      <h2>5-Day Forecast</h2>
      <router-link to="/weather" class="back-link">Back to Current Weather</router-link>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading forecast data...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchForecast">Try Again</button>
    </div>

    <div v-else class="forecast-container">
      <div v-for="(day, index) in forecast" :key="index" class="forecast-day">
        <h3 class="day-name">{{ day.day }}</h3>
        <div class="day-details">
          <img :src="`http://openweathermap.org/img/wn/${day.icon}@2x.png`" :alt="day.description" class="weather-icon" />
          <div class="temperature-range">
            <span class="max-temp">{{ Math.round(day.maxTemp) }}°</span>
            <span class="min-temp">{{ Math.round(day.minTemp) }}°</span>
          </div>
          <p class="weather-description">{{ day.description }}</p>
          <div class="additional-info">
            <div class="info-item">
              <span class="info-label">Humidity</span>
              <span class="info-value">{{ day.humidity }}%</span>
            </div>
            <div class="info-item">
              <span class="info-label">Wind</span>
              <span class="info-value">{{ Math.round(day.windSpeed) }} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { format, addDays } from 'date-fns';

export default {
  setup() {
    const forecast = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    const fetchForecast = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        // For demo purposes, using sample data
        // In a real app, use:
        // const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        // await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate sample 5-day forecast
        const today = new Date();
        forecast.value = [
          {
            day: format(addDays(today, 1), 'EEEE'),
            icon: '01d',
            maxTemp: 22,
            minTemp: 15,
            description: 'clear sky',
            humidity: 50,
            windSpeed: 3.5
          },
          {
            day: format(addDays(today, 2), 'EEEE'),
            icon: '02d',
            maxTemp: 21,
            minTemp: 14,
            description: 'few clouds',
            humidity: 55,
            windSpeed: 4.1
          },
          {
            day: format(addDays(today, 3), 'EEEE'),
            icon: '10d',
            maxTemp: 18,
            minTemp: 12,
            description: 'light rain',
            humidity: 75,
            windSpeed: 5.8
          },
          {
            day: format(addDays(today, 4), 'EEEE'),
            icon: '10d',
            maxTemp: 17,
            minTemp: 12,
            description: 'moderate rain',
            humidity: 80,
            windSpeed: 6.2
          },
          {
            day: format(addDays(today, 5), 'EEEE'),
            icon: '03d',
            maxTemp: 19,
            minTemp: 13,
            description: 'scattered clouds',
            humidity: 60,
            windSpeed: 4.5
          }
        ];
        
        loading.value = false;
      } catch (err) {
        console.error('Error fetching forecast:', err);
        error.value = 'Failed to load forecast data. Please try again.';
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchForecast();
    });

    return {
      forecast,
      loading,
      error,
      fetchForecast
    };
  }
};
</script>

<style scoped>
.forecast-view {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h2 {
  font-size: 1.8rem;
  color: #1565c0;
  margin: 0;
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

.forecast-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.forecast-day {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.day-name {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #0d47a1;
  font-weight: 500;
}

.day-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.weather-icon {
  width: 60px;
  height: 60px;
}

.temperature-range {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.max-temp {
  font-size: 1.6rem;
  font-weight: 500;
  color: #f44336;
}

.min-temp {
  font-size: 1.6rem;
  font-weight: 500;
  color: #2196f3;
}

.weather-description {
  text-transform: capitalize;
  color: #455a64;
  margin: 0;
  flex-basis: 150px;
}

.additional-info {
  display: flex;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.8rem;
  color: #757575;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: #455a64;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .day-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .weather-description {
    flex-basis: auto;
  }
}
</style>
