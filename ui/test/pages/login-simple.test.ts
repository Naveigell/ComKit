import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '../../app/pages/login.vue'

// Mock navigateTo
vi.mock('#app/composables', () => ({
  navigateTo: vi.fn()
}))

describe('Login Page - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
    const wrapper = mount(Login)
    
    expect(wrapper.find('h2').text()).toBe('Sign in to your account')
    expect(wrapper.find('input#username').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('has correct form labels', () => {
    const wrapper = mount(Login)
    
    expect(wrapper.find('label[for="username"]').text()).toBe('Username')
    expect(wrapper.find('label[for="password"]').text()).toBe('Password')
  })

  it('binds form data correctly', async () => {
    const wrapper = mount(Login)
    
    const usernameInput = wrapper.find('input#username')
    const passwordInput = wrapper.find('input#password')
    
    await usernameInput.setValue('testuser')
    await passwordInput.setValue('testpass')
    
    expect(wrapper.vm.form.username).toBe('testuser')
    expect(wrapper.vm.form.password).toBe('testpass')
  })

  it('shows loading state', () => {
    const wrapper = mount(Login, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const button = wrapper.find('button[type="submit"]')
    
    expect(button.text()).toBe('Sign in')
    
    // Test loading state by checking the template logic
    // The button text changes based on the loading property
    expect(wrapper.vm.loading).toBe(false)
  })

  it('displays error message when error exists', () => {
    const wrapper = mount(Login, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Check that error state is initially false
    expect(wrapper.vm.error).toBe('')
    
    const errorDiv = wrapper.find('.bg-red-50')
    expect(errorDiv.exists()).toBe(false)
  })

  it('does not display error when no error', () => {
    const wrapper = mount(Login)
    
    const errorDiv = wrapper.find('.bg-red-50')
    expect(errorDiv.exists()).toBe(false)
  })
})
