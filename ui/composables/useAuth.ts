import {computed, readonly, ref} from 'vue'
import type {ApiError, AuthResponse} from '../services/api'

// Auth state
const user = ref<AuthResponse['user'] | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const isInitialized = ref(false)

// Load auth state from HTTP-only cookies only
const loadAuthState = async () => {
  if (process.client) {
    
    // Clear any existing user info first
    user.value = null
    
    // Validate from cookies to get user info
    try {
      const { authApi } = await import('../services/api')
      const response = await authApi.validateCookies()
      if (response.user) {
        user.value = response.user
      } else {
        console.log('No valid user info from cookies')
      }
    } catch (error: unknown) {
      // Cookie validation failed - this might be expected if the endpoint doesn't exist yet
      console.log('Cookie validation failed, but this might be OK:', error)
      // Don't set user to null here, let the middleware handle it
    }
    
    isInitialized.value = true
  }
}

// Clear auth state
const clearAuthState = async () => {
  user.value = null
  error.value = null
  
  if (process.client) {
    // NO localStorage/sessionStorage cleanup - only cookies
    
    // Clear HTTP-only cookies via API call
    const { authApi } = await import('../services/api')
    authApi.clearAuthCookies().catch((error: unknown) => {
      console.error('Failed to clear auth cookies:', error)
    })
  }
}

// Composable for authentication
export const useAuth = () => {
  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  
  // Login method
  const login = async (username: string, password: string, rememberMe: boolean = false) => {
    isLoading.value = true
    error.value = null

    try {
      const { authApi } = await import('../services/api')
        return await authApi.login({username, password})
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.detail || 'Login failed'
      throw apiError
    } finally {
      isLoading.value = false
    }
  }
  
  // Register method
  const register = async (userData: {
    username: string
    password: string
    name: string
    address: string
  }) => {
    isLoading.value = true
    error.value = null
    
    try {
      const { authApi } = await import('../services/api')
        return await authApi.register(userData)
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.detail || 'Registration failed'
      throw apiError
    } finally {
      isLoading.value = false
    }
  }
  
  // Logout method
  const logout = async () => {
    await clearAuthState()
    // Navigate to login page
    navigateTo('/login')
  }
  
  // Initialize auth state
  const initAuth = async () => {
    if (!isInitialized.value) {
      await loadAuthState()
    }
    return isInitialized.value
  }
  
  return {
    // State
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isInitialized: readonly(isInitialized),
    
    // Computed
    isAuthenticated,
    currentUser,
    
    // Methods
    login,
    register,
    logout,
    initAuth
  }
}

// Initialize auth state on app startup
if (process.client) {
  const auth = useAuth()
  auth.initAuth()
}
