<script setup lang="ts">
</script>
<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <h1 class="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 class="text-2xl font-semibold mb-2">Unauthorized Access</h2>
        <p class="text-gray-700 mb-6">You do not have permission to view this page.</p>
        <NuxtLink to="/" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Go Home
        </NuxtLink>
    </div>
</template>
<style scoped>
/* Optional additional styles */
</style>