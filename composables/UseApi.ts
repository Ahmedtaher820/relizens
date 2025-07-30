import { useUserStore } from '../stores/auth.js'
import { useNuxtApp } from '#app'
import { toast } from 'vue3-toastify';
import { useRuntimeConfig } from 'nuxt/app';


export default function useApi() {
  /***************************************
   **** Section Variables Declaration ****
   **************************************/
  //#region Variables
  const authStore = useUserStore()
  const API = $fetch.create({
    // Request interceptor
    async onRequest(data: any) {
      requestInterceptor(data)
    },
    async onResponseError(data: any) {
      responseErrorInterceptor(data)
    }
  })
  //#endregion

  /***************************************
   **** Section Computed Variables  ******
   **************************************/
  //#region Computed
  //#endregion

  /***************************************
   **** Section Watchers *****************
   **************************************/
  //#region Watchers
  //#endregion

  /***************************************
   **** Section Lifecycle Hooks  *********
   **************************************/
  //#region Lifecycle Hooks
  //#endregion

  /***************************************
   **** Section Functions Declaration ****
   **************************************/
  //#region Functions
  /**
   * @description This function is called to set request interceptors
   * @param {any} data
   * @returns {void}
   */
  function requestInterceptor(data: any): void {
    const { options } = data
    const config = useRuntimeConfig()
    // Set baseUrl for all API calls
    options.baseURL = config.public.baseUrl
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      ...authStore.getAuthHeaders
    }
    console.log(authStore.getAuthHeaders);
    
  }

  /**
   * @description This function is called to set response error interceptors
   * @param {any} data
   * @returns {void}
   */
  function responseErrorInterceptor(data: any): void {
    const { response } = data
    const statusCode = response.status
    console.log(response);
    
    switch (statusCode) {
      case 401:
        // Reset auth data on 401 Unauthorized error
        authStore.resetAuthData()
        break
      case 404:
        toast.error('errors.404', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      })
         case 403:
        toast.error(response._data?.error?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      })
        break
      case 500:
         toast.error('errors.500', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      })
        break
    }
  }
  //#endregion
  return {
    API
  }
}
