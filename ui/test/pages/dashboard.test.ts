import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from '../../app/pages/dashboard.vue'

// Mock navigateTo
vi.mock('#app/composables', () => ({
  navigateTo: vi.fn()
}))

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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
    
    const dashboardLink = wrapper.find('a[href="#"]')
    expect(dashboardLink.text()).toContain('Dashboard')
  })

  it('has logout button', () => {
    const wrapper = mount(Dashboard)
    
    const logoutButton = wrapper.find('button')
    expect(logoutButton.exists()).toBe(true)
    expect(logoutButton.text()).toBe('Logout')
  })

  it('displays stats cards', () => {
    const wrapper = mount(Dashboard)
    
    const statsCards = wrapper.findAll('.bg-white.overflow-hidden.shadow.rounded-lg')
    expect(statsCards.length).toBe(4)
    
    expect(wrapper.text()).toContain('Total Users')
    expect(wrapper.text()).toContain('Total Items')
    expect(wrapper.text()).toContain('My Items')
    expect(wrapper.text()).toContain('Pending Requests')
  })

  it('displays recent activity section', () => {
    const wrapper = mount(Dashboard)
    
    const activitySection = wrapper.find('.bg-white.shadow.rounded-lg')
    expect(activitySection.exists()).toBe(true)
    expect(wrapper.text()).toContain('Recent Activity')
  })

  it('shows activity items', async () => {
    const wrapper = mount(Dashboard)
    
    // Wait for component to mount and load data
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('New request for your "Kitchen Aid" item')
    expect(wrapper.text()).toContain('Your request for "Blender" was approved')
    expect(wrapper.text()).toContain('You added a new item "Stand Mixer"')
    expect(wrapper.text()).toContain('New user "Sarah Johnson" joined the community')
  })

  it('has correct stats values', async () => {
    const wrapper = mount(Dashboard)
    
    // Wait for data to load
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.stats.totalUsers).toBe(45)
    expect(wrapper.vm.stats.totalItems).toBe(128)
    expect(wrapper.vm.stats.myItems).toBe(5)
    expect(wrapper.vm.stats.pendingRequests).toBe(3)
  })

  it('loads dashboard data on mount', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Check that data is loaded on mount
    expect(wrapper.vm.stats.totalUsers).toBe(45)
    expect(wrapper.vm.stats.totalItems).toBe(128)
    expect(wrapper.vm.stats.myItems).toBe(5)
    expect(wrapper.vm.stats.pendingRequests).toBe(3)
  })

  it('has user information', () => {
    const wrapper = mount(Dashboard)
    
    expect(wrapper.vm.user.name).toBe('John Doe')
    expect(wrapper.vm.user.username).toBe('johndoe')
  })

  it('displays timestamps for activities', () => {
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Check that activity items have timestamps
    expect(wrapper.vm.recentActivities.length).toBe(4)
    expect(wrapper.vm.recentActivities[0].time).toBe('2 hours ago')
    expect(wrapper.vm.recentActivities[1].time).toBe('5 hours ago')
    expect(wrapper.vm.recentActivities[2].time).toBe('1 day ago')
    expect(wrapper.vm.recentActivities[3].time).toBe('2 days ago')
  })

  it('has proper navigation structure', () => {
    const wrapper = mount(Dashboard)
    
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
    
    const navDiv = nav.find('.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8')
    expect(navDiv.exists()).toBe(true)
  })

  it('has main content area', () => {
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    
    // The main element itself has the max-w-7xl class
    expect(main.classes()).toContain('max-w-7xl')
    expect(main.classes()).toContain('mx-auto')
    expect(main.classes()).toContain('py-6')
    expect(main.classes()).toContain('sm:px-6')
    expect(main.classes()).toContain('lg:px-8')
  })

  it('has responsive design classes', () => {
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Check for responsive grid
    const statsGrid = wrapper.find('.grid.grid-cols-1.gap-5.sm\\:grid-cols-2.lg\\:grid-cols-4')
    expect(statsGrid.exists()).toBe(true)
  })

  it('has activity timeline structure', async () => {
    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Wait for the component to mount and load data
    await wrapper.vm.$nextTick()
    
    // Trigger the data loading manually if needed
    await wrapper.vm.loadDashboardData()
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
