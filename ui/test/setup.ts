import {MockInstance, vi} from 'vitest'
import { config } from '@vue/test-utils'

declare global {
  var vi: any // Or import { vi } from 'vitest' and use its specific type
  var navigateTo: MockInstance
  var definePageMeta: MockInstance
}

globalThis.vi = vi
globalThis.navigateTo = vi.fn()
globalThis.definePageMeta = vi.fn()

// Configure Vue Test Utils
config.global.stubs = {
  'NuxtLink': true,
  'NuxtRouteAnnouncer': true,
  'NuxtPage': true
}

// Mock Vue components for testing
config.global.mocks = {
  NuxtRouteAnnouncer: {
    template: '<nuxt-route-announcer-stub></nuxt-route-announcer-stub>'
  },
  NuxtPage: {
    template: '<nuxt-page-stub></nuxt-page-stub>'
  }
}