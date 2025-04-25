import { describe, it, expect } from 'vitest'
import { 
  celsiusToFahrenheit, 
  fahrenheitToCelsius, 
  formatTemperature, 
  getWeatherIconClass 
} from '../weather'

describe('Weather Utils', () => {
  describe('celsiusToFahrenheit', () => {
    it('converts 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32)
    })

    it('converts 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212)
    })

    it('converts -40°C to -40°F', () => {
      expect(celsiusToFahrenheit(-40)).toBe(-40)
    })

    it('handles decimal values', () => {
      expect(celsiusToFahrenheit(20.5)).toBeCloseTo(68.9, 1)
    })
  })

  describe('fahrenheitToCelsius', () => {
    it('converts 32°F to 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBe(0)
    })

    it('converts 212°F to 100°C', () => {
      expect(fahrenheitToCelsius(212)).toBe(100)
    })

    it('converts -40°F to -40°C', () => {
      expect(fahrenheitToCelsius(-40)).toBe(-40)
    })

    it('handles decimal values', () => {
      expect(fahrenheitToCelsius(68.9)).toBeCloseTo(20.5, 1)
    })
  })

  describe('formatTemperature', () => {
    it('formats Celsius temperature correctly', () => {
      expect(formatTemperature(23.4, 'C')).toBe('23°C')
    })

    it('formats Fahrenheit temperature correctly', () => {
      expect(formatTemperature(73.6, 'F')).toBe('74°F')
    })

    it('rounds temperature values correctly', () => {
      expect(formatTemperature(23.5, 'C')).toBe('24°C')
      expect(formatTemperature(23.4, 'C')).toBe('23°C')
    })
  })

  describe('getWeatherIconClass', () => {
    it('returns correct icon class for clear sky during day', () => {
      expect(getWeatherIconClass('clear sky', true)).toBe('weather-icon-day-clear')
    })

    it('returns correct icon class for clear sky during night', () => {
      expect(getWeatherIconClass('clear sky', false)).toBe('weather-icon-night-clear')
    })

    it('handles partly cloudy conditions correctly', () => {
      expect(getWeatherIconClass('few clouds')).toBe('weather-icon-day-partly-cloudy')
      expect(getWeatherIconClass('scattered clouds')).toBe('weather-icon-day-partly-cloudy')
    })

    it('handles cloudy conditions correctly', () => {
      expect(getWeatherIconClass('broken clouds')).toBe('weather-icon-day-cloudy')
      expect(getWeatherIconClass('overcast clouds')).toBe('weather-icon-day-cloudy')
    })

    it('handles rain conditions correctly', () => {
      expect(getWeatherIconClass('light rain')).toBe('weather-icon-day-rain')
      expect(getWeatherIconClass('moderate rain')).toBe('weather-icon-day-rain')
    })

    it('handles severe weather correctly', () => {
      expect(getWeatherIconClass('heavy rain')).toBe('weather-icon-day-thunderstorm')
      expect(getWeatherIconClass('thunderstorm')).toBe('weather-icon-day-thunderstorm')
    })

    it('handles unknown conditions correctly', () => {
      expect(getWeatherIconClass('unknown condition')).toBe('weather-icon-day-unknown')
    })
  })
})
