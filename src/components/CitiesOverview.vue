<template>
  <div class="cities-overview">
    <div class="header">
      <h2>Japan Weather Overview</h2>
      <p>{{ currentDate }}</p>
    </div>
    <div class="cities-grid">
      <div 
        v-for="city in cities" 
        :key="city.name" 
        class="city-card"
        @click="goToCity(city)"
      >
        <div v-if="loading" class="city-loading">
          <p>Loading...</p>
        </div>
        <div v-else class="city-content">
          <h3>{{ city.name }}</h3>
          <div class="weather-summary">
            <div class="temp">{{ Math.round(city.weather.temp) }}°C</div>
            <div class="icon">
              <img :src="`http://openweathermap.org/img/wn/${city.weather.icon}@2x.png`" :alt="city.weather.description" />
            </div>
          </div>
          <p class="weather-desc">{{ city.weather.description }}</p>
          <div class="city-details">
            <div class="detail">
              <span class="label">Humidity</span>
              <span class="value">{{ city.weather.humidity }}%</span>
            </div>
            <div class="detail">
              <span class="label">Wind</span>
              <span class="value">{{ city.weather.wind }} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="refresh-controls">
      <button @click="refreshAll" class="refresh-btn">
        Refresh All
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';

interface CityWeather {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
}

interface City {
  name: string;
  lat: number;
  lon: number;
  weather: CityWeather;
}

export default defineComponent({
  name: 'CitiesOverview',
  setup() {
    const router = useRouter();
    const cities = ref<City[]>([
      {
        name: 'Tokyo',
        lat: 35.6895,
        lon: 139.6917,
        weather: { temp: 0, description: '', icon: '', humidity: 0, wind: 0 }
      },
      {
        name: 'Kyoto',
        lat: 35.0116,
        lon: 135.7681,
        weather: { temp: 0, description: '', icon: '', humidity: 0, wind: 0 }
      },
      {
        name: 'Sapporo',
        lat: 43.0618,
        lon: 141.3545,
        weather: { temp: 0, description: '', icon: '', humidity: 0, wind: 0 }
      },
      {
        name: 'Okinawa',
        lat: 26.2124,
        lon: 127.6809,
        weather: { temp: 0, description: '', icon: '', humidity: 0, wind: 0 }
      }
    ]);
    const loading = ref<boolean>(true);
    const currentDate = ref<string>(format(new Date(), 'EEEE, MMMM d, yyyy'));

    const goToCity = (city: City): void => {
      router.push({ 
        name: 'CityView',
        params: { city: city.name.toLowerCase() },
        state: { city }
      });
    };

    const fetchWeatherForAllCities = async (): Promise<void> => {
      loading.value = true;
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update with simulated weather data
      cities.value = cities.value.map(city => {
        return {
          ...city,
          weather: generateWeatherForCity(city.name)
        };
      });
      
      loading.value = false;
    };
    
    const generateWeatherForCity = (cityName: string): CityWeather => {
      // Simulate different temperature ranges for different cities
      const baseTempMap: Record<string, number> = {
        'Tokyo': 18,
        'Kyoto': 17,
        'Sapporo': 10,
        'Okinawa': 26
      };
      
      const baseTemp = baseTempMap[cityName] || 20;
      const weatherTypes = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm'];
      const descriptions = [
        'clear sky', 'few clouds', 'scattered clouds', 
        'broken clouds', 'light rain', 'moderate rain'
      ];
      const icons = ['01d', '02d', '03d', '04d', '09d', '10d'];
      
      return {
        temp: baseTemp + (Math.random() * 6 - 3),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)],
        humidity: Math.floor(Math.random() * 30) + 50,
        wind: Math.floor(Math.random() * 7) + 1
      };
    };

    const refreshAll = (): void => {
      fetchWeatherForAllCities();
    };

    onMounted(() => {
      fetchWeatherForAllCities();
    });

    return {
      cities,
      loading,
      currentDate,
      goToCity,
      refreshAll
    };
  }
});
</script>

<style scoped>
.cities-overview {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.header h2 {
  font-size: 2rem;
  color: #0d47a1;
  margin-bottom: 0.5rem;
}

.header p {
  color: #757575;
  font-size: 0.9rem;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.city-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.city-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.city-loading {
  text-align: center;
  padding: 2rem;
  color: #757575;
}

.city-content h3 {
  font-size: 1.5rem;
  color: #1565c0;
  margin-bottom: 1rem;
}

.weather-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.temp {
  font-size: 2.5rem;
  font-weight: 300;
  color: #0d47a1;
}

.icon img {
  width: 70px;
  height: 70px;
}

.weather-desc {
  text-transform: capitalize;
  color: #455a64;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.city-details {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.detail {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.8rem;
  color: #757575;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #455a64;
}

.refresh-controls {
  margin-top: 2rem;
  text-align: center;
}

.refresh-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background-color: #1565c0;
}

@media (max-width: 768px) {
  .cities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
