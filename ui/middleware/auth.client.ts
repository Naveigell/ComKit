import {useAuth} from "~~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware for server-side rendering to avoid hydration issues
  // We'll rely on client-side validation for now
  if (process.server) {
    return
  }

  // Only run on client side to avoid SSR issues
  if (process.client) {
    // For now, let's be more permissive and assume if cookies exist, user is authenticated
    // We'll let the actual API calls handle authentication validation

    // Try to make a simple API call to check if we're authenticated
    try {
      const { authApi } = await import('../services/api')
      // This will fail if we're not authenticated due to missing cookies
      await authApi.validateCookies()
    } catch (error) {
      return navigateTo('/login')
    }
  }
})
