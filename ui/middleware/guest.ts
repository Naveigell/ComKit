// middleware/guest.ts
import {useAuth} from "../composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (process.client) {
    // For now, let's be more permissive and assume if cookies exist, user is authenticated
    // We'll let the actual API calls handle authentication validation

    // Try to make a simple API call to check if we're authenticated
    try {
      const { authApi } = await import('../services/api')
      // This will fail if we're not authenticated due to missing cookies
      await authApi.validateCookies()

      return navigateTo('/dashboard')
    } catch (error) {
      console.log('Authentication check failed, protect to login')
    }
  }
})