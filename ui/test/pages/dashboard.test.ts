import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Dashboard from '../../app/pages/dashboard.vue'

// Mock useAuth composable
const mockUser = ref({
  name: 'John Doe',
  username: 'johndoe'
})

vi.mock('~/composables/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    logout: vi.fn()
  })
}))

// Mock navigateTo
vi.mock('#app/composables', () => ({
  navigateTo: vi.fn()
}))

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const getVm = (wrapper: any) => wrapper.vm as any

  it('renders dashboard correctly', () => {
    const wrapper = mount(Dashboard)
    
    expect(wrapper.find('h1').text()).toBe('ComKit')
    expect(wrapper.find('h2').text()).toContain('Welcome back,')
    expect(wrapper.find('h2').text()).toContain('John Doe!')
  })

  it('displays navigation menu', () => {
    const wrapper = mount(Dashboard)
    
    const navLinks = wrapper.findAll('nav a')
    expect(navLinks.length).toBeGreaterThanOrEqual(4)
  })

  it('displays stats cards', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.findAll('.bg-white.overflow-hidden.shadow.rounded-lg').length).toBe(4)
  })

  it('shows activity items', async () => {
    const wrapper = mount(Dashboard)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('New request for your "Kitchen Aid" item')
  })

  it('has correct stats values', async () => {
    const wrapper = mount(Dashboard)
    const vm = getVm(wrapper)

    await wrapper.vm.$nextTick()

    expect(vm.stats.totalUsers).toBe(45)
    expect(vm.stats.totalItems).toBe(128)
  })

  it('loads dashboard data on mount', async () => {
    const wrapper = mount(Dashboard, {
      global: { stubs: { NuxtLink: true } }
    })
    const vm = getVm(wrapper)

    expect(vm.stats.totalUsers).toBe(45)
    expect(vm.stats.totalItems).toBe(128)
  })

  it('has user information', () => {
    const wrapper = mount(Dashboard)
    const vm = getVm(wrapper)

    expect(vm.user.name).toBe('John Doe')
    expect(vm.user.username).toBe('johndoe')
  })

  it('displays timestamps for activities', () => {
    const wrapper = mount(Dashboard, { global: { stubs: { NuxtLink: true } } })
    const vm = getVm(wrapper)

    expect(vm.recentActivities.length).toBe(4)
    expect(vm.recentActivities[0].time).toBe('2 hours ago')
  })

  it('has activity timeline structure', async () => {
    const wrapper = mount(Dashboard, { global: { stubs: { NuxtLink: true } } })
    const vm = getVm(wrapper)

    // Wait for the component to mount and load data
    await wrapper.vm.$nextTick()
    await vm.loadDashboardData()
    await wrapper.vm.$nextTick()

    const activityList = wrapper.find('ul.-mb-8')
    expect(activityList.exists()).toBe(true)
    
    // The li elements should be rendered from the v-for loop
    const activityItems = wrapper.findAll('ul.-mb-8 > li')
    expect(activityItems.length).toBe(4)
    
    // Check that each activity has the correct structure
    activityItems.forEach((item) => {
      expect(item.find('div.relative.pb-8').exists()).toBe(true)
    })
  })
})
