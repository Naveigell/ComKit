import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../app/app.vue'

// Mock navigateTo
vi.mock('#app/composables', () => ({
  navigateTo: vi.fn()
}))

describe('App Component', () => {
  it('renders app correctly', () => {
    const wrapper = mount(App)
    
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('includes NuxtRouteAnnouncer', () => {
    const wrapper = mount(App)
    
    // Check if the stubbed component is rendered
    expect(wrapper.html()).toContain('nuxt-route-announcer-stub')
  })

  it('includes NuxtPage component', () => {
    const wrapper = mount(App)
    
    // Check if the stubbed component is rendered
    expect(wrapper.html()).toContain('nuxt-page-stub')
  })

  it('has correct structure', () => {
    const wrapper = mount(App)
    
    const appDiv = wrapper.find('div')
    expect(appDiv.exists()).toBe(true)
    expect(appDiv.element.children.length).toBe(2) // NuxtRouteAnnouncer and NuxtPage
  })
})
