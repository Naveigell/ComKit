<template>
  <div v-if="isAuthenticating" class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
      <p class="text-gray-600 text-lg">Checking authentication...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isAuthenticating: boolean
}

defineProps<Props>()
</script>

<style scoped>
/* Additional styles if needed */
</style>
