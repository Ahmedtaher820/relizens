<script setup>
import { ref, watchEffect } from 'vue'

const isDark = ref(false)

// Optional: persist preference
if (process.client) {
  isDark.value = localStorage.theme === 'dark'

  watchEffect(() => {
    localStorage.theme = isDark.value ? 'dark' : 'light'
  })
}
</script>

<template>
  <div  :class="{ dark: isDark }">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
