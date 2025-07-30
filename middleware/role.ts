import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  // Get required roles from route meta
  const requiredRoles = to.meta?.roles as string[] | undefined

  // If no roles required, let user through
  if (!requiredRoles || requiredRoles.length === 0) {
    return
  }

  // Check if current user role is allowed
  const userRole = userStore.currentUser.role

  if (!userRole || !requiredRoles.includes(userRole)) {
    // Redirect to unauthorized or home page
    return navigateTo('/unauthorized') // create this page or redirect to '/'
  }
})
