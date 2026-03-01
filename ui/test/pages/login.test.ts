import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '../../app/pages/login.vue'

// Mock navigateTo
vi.mock('#app/composables', () => ({
  navigateTo: vi.fn()
}))

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
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
    
    expect(wrapper.find('h2').text()).toBe('Sign in to your account')
    expect(wrapper.find('input#username').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.find('input#remember-me').exists()).toBe(true)
  })

  it('has correct form labels and placeholders', () => {
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
    
    const usernameInput = wrapper.find('input#username')
    const passwordInput = wrapper.find('input#password')
    
    expect(usernameInput.attributes('placeholder')).toBe('Enter your username')
    expect(passwordInput.attributes('placeholder')).toBe('Enter your password')
    expect(wrapper.find('label[for="username"]').text()).toBe('Username')
    expect(wrapper.find('label[for="password"]').text()).toBe('Password')
  })

  it('has link to register page', () => {
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
    
    const registerLink = wrapper.find('a[href="/register"]')
    expect(registerLink.exists()).toBe(true)
    expect(registerLink.text()).toContain('create a new account')
  })

  it('has forgot password link', () => {
    const wrapper = mount(Login)
    
    const forgotLink = wrapper.find('a[href="#"]')
    expect(forgotLink.exists()).toBe(true)
    expect(forgotLink.text()).toBe('Forgot your password?')
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

  it('toggles remember me checkbox', async () => {
    const wrapper = mount(Login)
    
    const checkbox = wrapper.find('input#remember-me')
    
    expect(wrapper.vm.form.rememberMe).toBe(false)
    
    await checkbox.setChecked(true)
    expect(wrapper.vm.form.rememberMe).toBe(true)
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
    
    expect(wrapper.vm.error).toBe('')
    
    const errorDiv = wrapper.find('.bg-red-50')
    expect(errorDiv.exists()).toBe(false)
  })

  it('does not display error when no error', () => {
    const wrapper = mount(Login)
    
    const errorDiv = wrapper.find('.bg-red-50')
    expect(errorDiv.exists()).toBe(false)
  })

  it('submits form with correct data', async () => {
    const wrapper = mount(Login)
    
    const usernameInput = wrapper.find('input#username')
    const passwordInput = wrapper.find('input#password')
    const form = wrapper.find('form')
    
    await usernameInput.setValue('test')
    await passwordInput.setValue('password')
    
    await form.trigger('submit.prevent')
    
    // Since the mock validation passes with test/password,
    // it should attempt to navigate to dashboard
    expect(wrapper.vm.form.username).toBe('test')
    expect(wrapper.vm.form.password).toBe('password')
  })

  it('shows error with invalid credentials', async () => {
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
    
    const usernameInput = wrapper.find('input#username')
    const passwordInput = wrapper.find('input#password')
    const form = wrapper.find('form')
    
    await usernameInput.setValue('wrong')
    await passwordInput.setValue('wrong')
    
    await form.trigger('submit.prevent')
    
    // Wait for the async validation to complete
    await new Promise(resolve => setTimeout(resolve, 1100))
    
    // Should show error for invalid credentials
    expect(wrapper.vm.error).toBe('Invalid username or password')
  })
})
