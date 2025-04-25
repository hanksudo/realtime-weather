<template>
  <div class="location-search">
    <div class="header">
      <h2>Search Location</h2>
      <router-link to="/weather" class="back-link">Back to Weather</router-link>
    </div>

    <div class="search-container">
      <form @submit.prevent="searchLocation">
        <div class="search-input">
          <input 
            type="text" 
            v-model="query" 
            placeholder="Enter city name or coordinates (e.g., 'Tokyo' or '35.6895,139.6917')"
            required
          />
          <button type="submit" :disabled="loading">
            {{ loading ? 'Searching...' : 'Search' }}
          </button>
        </div>
      </form>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-if="locations.length > 0" class="search-results">
        <h3>Search Results</h3>
        <div class="results-list">
          <div 
            v-for="(location, index) in locations" 
            :key="index" 
            class="location-item"
            @click="selectLocation(location)"
          >
            <div class="location-name">
              <strong>{{ location.name }}</strong>
              <span v-if="location.state">, {{ location.state }}</span>
              <span v-if="location.country">, {{ location.country }}</span>
            </div>
            <div class="location-coords">
              Lat: {{ location.lat.toFixed(4) }}, Lon: {{ location.lon.toFixed(4) }}
            </div>
          </div>
        </div>
      </div>

      <div class="popular-locations">
        <h3>Popular Locations</h3>
        <div class="popular-grid">
          <div 
            v-for="(city, index) in popularCities" 
            :key="index" 
            class="popular-city"
            @click="setCity(city)"
          >
            {{ city.name }}
          </div>
        </div>
      </div>

      <div class="use-current">
        <button @click="useCurrentLocation" class="current-location-btn">
          Use Current Location
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const query = ref('');
    const locations = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const popularCities = ref([
      { name: 'New York', lat: 40.7128, lon: -74.0060 },
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
      { name: 'Paris', lat: 48.8566, lon: 2.3522 },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
      { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
      { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
      { name: 'Beijing', lat: 39.9042, lon: 116.4074 }
    ]);

    const searchLocation = async () => {
      if (!query.value.trim()) return;
      
      try {
        loading.value = true;
        error.value = null;
        
        // Check if the query is coordinates (contains a comma)
        if (query.value.includes(',')) {
          const [lat, lon] = query.value.split(',').map(coord => parseFloat(coord.trim()));
          if (!isNaN(lat) && !isNaN(lon)) {
            // Valid coordinates entered, redirect directly
            router.push('/weather');
            return;
          }
        }
        
        // For demo purposes, simulate API response with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample response for any city search
        locations.value = [
          {
            name: query.value,
            state: 'Prefecture',
            country: 'Country',
            lat: 35.6895,
            lon: 139.6917
          },
          {
            name: query.value + ' City',
            country: 'Another Country',
            lat: 34.1234,
            lon: 138.5678
          }
        ];
        
        loading.value = false;
      } catch (err) {
        console.error('Error searching location:', err);
        error.value = 'Failed to search for location. Please try again.';
        loading.value = false;
      }
    };

    const selectLocation = (location) => {
      // In a real app, you would store the selected location in local storage or vuex/pinia
      // For demo, just redirect back to weather page
      router.push('/weather');
    };

    const setCity = (city) => {
      // In a real app, you would store the selected city
      // For demo, just redirect back to weather page
      router.push('/weather');
    };

    const useCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, you would store these coordinates
            router.push('/weather');
          },
          (err) => {
            console.error('Geolocation error:', err);
            error.value = 'Could not access your location. Please try searching instead.';
          }
        );
      } else {
        error.value = 'Geolocation is not supported by your browser. Please try searching instead.';
      }
    };

    return {
      query,
      locations,
      loading,
      error,
      popularCities,
      searchLocation,
      selectLocation,
      setCity,
      useCurrentLocation
    };
  }
};
</script>

<style scoped>
.location-search {
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

.search-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.search-input {
  display: flex;
  gap: 0.5rem;
}

.search-input input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input input:focus {
  border-color: #2196f3;
  outline: none;
}

.search-input button,
.current-location-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.search-input button:hover,
.current-location-btn:hover {
  background-color: #1565c0;
}

.search-input button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}

.error {
  color: #f44336;
  margin: 1rem 0;
}

.search-results h3,
.popular-locations h3 {
  color: #455a64;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.location-item {
  padding: 1rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.location-item:hover {
  background-color: #e0e0e0;
}

.location-name {
  margin-bottom: 0.5rem;
}

.location-coords {
  font-size: 0.85rem;
  color: #757575;
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.popular-city {
  padding: 1rem;
  background-color: #e3f2fd;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popular-city:hover {
  background-color: #bbdefb;
}

.use-current {
  text-align: center;
}

.current-location-btn {
  background-color: #4caf50;
}

.current-location-btn:hover {
  background-color: #388e3c;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .search-input {
    flex-direction: column;
  }
  
  .popular-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
