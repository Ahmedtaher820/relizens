import { defineNuxtPlugin } from '#app'
import Toast, { type PluginOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    autoClose: 3000,
    theme: 'light',
  }

  nuxtApp.vueApp.use(Toast, options)
})