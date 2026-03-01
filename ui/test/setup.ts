import { vi } from 'vitest'
import { config } from '@vue/test-utils'

global.vi = vi

// Mock navigateTo
global.navigateTo = vi.fn()

// Mock definePageMeta
global.definePageMeta = vi.fn()

// Configure Vue Test Utils
config.global.stubs = {
  'NuxtLink': true,
  'NuxtRouteAnnouncer': true,
  'NuxtPage': true
}

// Mock Vue components for testing
config.global.mocks = {
  'NuxtRouteAnnouncer': {
    template: '<nuxt-route-announcer-stub></nuxt-route-announcer-stub>'
  },
  'NuxtPage': {
    template: '<nuxt-page-stub></nuxt-page-stub>'
  }
}
