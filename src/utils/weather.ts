/**
 * Convert temperature from Celsius to Fahrenheit
 * @param celsius Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert temperature from Fahrenheit to Celsius
 * @param fahrenheit Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Format temperature with symbol
 * @param temp Temperature value
 * @param unit Unit to format in ('C' for Celsius, 'F' for Fahrenheit)
 * @returns Formatted temperature string
 */
export function formatTemperature(temp: number, unit: 'C' | 'F'): string {
  const rounded = Math.round(temp);
  return `${rounded}°${unit}`;
}

/**
 * Get appropriate weather icon class based on weather conditions
 * @param condition Weather condition code
 * @param isDay Whether it's day time
 * @returns CSS class name for the weather icon
 */
export function getWeatherIconClass(condition: string, isDay: boolean = true): string {
  const timePrefix = isDay ? 'day' : 'night';
  
  switch (condition.toLowerCase()) {
    case 'clear sky':
      return `weather-icon-${timePrefix}-clear`;
    case 'few clouds':
    case 'scattered clouds':
      return `weather-icon-${timePrefix}-partly-cloudy`;
    case 'broken clouds':
    case 'overcast clouds':
      return `weather-icon-${timePrefix}-cloudy`;
    case 'light rain':
    case 'moderate rain':
      return `weather-icon-${timePrefix}-rain`;
    case 'heavy rain':
    case 'thunderstorm':
      return `weather-icon-${timePrefix}-thunderstorm`;
    case 'snow':
      return `weather-icon-${timePrefix}-snow`;
    case 'mist':
    case 'fog':
      return `weather-icon-${timePrefix}-fog`;
    default:
      return `weather-icon-${timePrefix}-unknown`;
  }
}
