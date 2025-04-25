import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CitiesDashboard from '../CitiesDashboard.vue'
import { format } from 'date-fns'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Mock timer
vi.mock('date-fns', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    format: vi.fn().mockReturnValue('12:34:56')
  }
})

describe('CitiesDashboard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders dashboard title correctly', () => {
    const wrapper = mount(CitiesDashboard)
    expect(wrapper.find('.dashboard-title').text()).toBe('Japan Cities Weather')
  })

  it('renders all four city cards', async () => {
    const wrapper = mount(CitiesDashboard)
    await wrapper.vm.$nextTick() // Wait for component to render
    
    const cityCards = wrapper.findAll('.city-card')
    expect(cityCards.length).toBe(4)
    
    const cityNames = ['Tokyo', 'Kyoto', 'Sapporo', 'Okinawa']
    cityCards.forEach((card, index) => {
      expect(card.find('h3').text()).toBe(cityNames[index])
    })
  })
  
  it('shows loading state initially', () => {
    const wrapper = mount(CitiesDashboard)
    const loadingElements = wrapper.findAll('.city-loading')
    expect(loadingElements.length).toBeGreaterThan(0)
  })
  
  it('formats time correctly', () => {
    const wrapper = mount(CitiesDashboard)
    const vm = wrapper.vm as any
    
    vm.formatTime()
    expect(format).toHaveBeenCalled()
  })
  
  it('refreshes all cities when refresh button is clicked', async () => {
    const wrapper = mount(CitiesDashboard)
    const vm = wrapper.vm as any
    
    // Spy on refreshAllWeather method
    const refreshSpy = vi.spyOn(vm, 'refreshAllWeather')
    
    // Click the refresh button
    await wrapper.find('.refresh-btn').trigger('click')
    
    expect(refreshSpy).toHaveBeenCalledTimes(1)
  })
})
