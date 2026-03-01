<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">ComKit</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                My Items
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Browse Items
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Requests
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <button
                @click="handleLogout"
                class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Welcome section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            <ClientOnly>
              Welcome back, {{ user?.name || 'User' }}!
            </ClientOnly>
          </h2>
          <p class="mt-1 text-sm text-gray-600">Here's what's happening with your kitchen sharing community.</p>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.totalUsers }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Items</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.totalItems }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">My Items</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.myItems }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Pending Requests</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.pendingRequests }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent activity -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div class="flow-root">
              <ul class="-mb-8">
                <li v-for="(activity, index) in recentActivities" :key="index">
                  <div class="relative pb-8">
                    <div v-if="index !== recentActivities.length - 1" class="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                    <div class="relative flex space-x-3">
                      <div>
                        <span class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p class="text-sm text-gray-500">{{ activity.description }}</p>
                        </div>
                        <div class="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{{ activity.time }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from "~~/composables/useAuth"
import authMiddleware from "~~/middleware/auth"

// Page metadata
definePageMeta({
  title: 'Dashboard - ComKit',
  description: 'Your ComKit dashboard',
  middleware: authMiddleware
})

// Use auth composable
const { user: authUser, logout } = useAuth()

// Interfaces
interface Stats {
  totalUsers: number
  totalItems: number
  myItems: number
  pendingRequests: number
}

interface Activity {
  description: string
  time: string
}

// Computed user data from auth
const user = computed(() => authUser.value || { name: 'User', username: 'user' })

// State
const stats = ref<Stats>({
  totalUsers: 0,
  totalItems: 0,
  myItems: 0,
  pendingRequests: 0
})

const recentActivities = ref<Activity[]>([])

// Methods
const loadDashboardData = async (): Promise<void> => {
  try {
    // TODO: Replace with actual API calls
    // Mock data for now
    stats.value = {
      totalUsers: 45,
      totalItems: 128,
      myItems: 5,
      pendingRequests: 3
    }

    recentActivities.value = [
      {
        description: 'New request for your "Kitchen Aid" item',
        time: '2 hours ago'
      },
      {
        description: 'Your request for "Blender" was approved',
        time: '5 hours ago'
      },
      {
        description: 'You added a new item "Stand Mixer"',
        time: '1 day ago'
      },
      {
        description: 'New user "Sarah Johnson" joined the community',
        time: '2 days ago'
      }
    ]
  } catch (error: any) {
    console.error('Error loading dashboard data:', error)
  }
}

const handleLogout = async (): Promise<void> => {
  try {
    logout()
  } catch (error: any) {
    console.error('Logout error:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
/* Additional styles if needed */
</style>
