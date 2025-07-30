import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  console.log(to.name);
  
  if ((!userStore.currentUser || !userStore.currentUser.id) && to.path !== '/login' && process.client) {
    return navigateTo('/login')
  }
})