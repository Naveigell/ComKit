import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { initApi } from '../services/api'
import apiClient from '../services/api'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const val = config.public.apiBase as string;
  
  if (process.client) {
    console.warn("[API PLUGIN DEBUG] Plugin 01.api.ts loading on client. useRuntimeConfig().public.apiBase =", val)
  }
  
  initApi(val)
  apiClient.setBaseURL(val)
})
