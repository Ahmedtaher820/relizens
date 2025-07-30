<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "@/stores/auth"
import { toast } from 'vue3-toastify'
import { storeToRefs } from "pinia";
import { navigateTo } from "nuxt/app";
import authServices from "@/services/auth"
definePageMeta({
  layout: 'auth'
})
/***************************************
 **** Section Props Declaration  ******
 **************************************/
//#region Props
//#endregion

/***************************************
 **** Section Emits Declaration ********
 **************************************/
//#region Emits
//#endregion

/***************************************
 **** Section Variables Declaration ****
 **************************************/
//#region Variables
const { users, currentUser } = storeToRefs(useUserStore())
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters long"),
});
const { values, defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
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
 * @description Log function to handle data
 * @param data
 * @returns void
 */
const submitForm = handleSubmit(
  (values) => {
    // const getUser = users.value.find((item) => item.email === values.email)
    // if (!getUser) {
    //   toast.error('user is not found', {
    //     position: 'top-right',
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //   })
    // }else{
    //   currentUser.value = getUser
    //   navigateTo('/dashboard')
    // }
    const payload = {
      email : values.email,
      password : values.password
    }
    authServices().login(payload).then((res)=>{
      console.log('res', res);
    })
  },
  (errors) => {
    console.log('Form validation failed:', errors)
  }
)
//#endregion
</script>

<template>
  <div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-red-400">Email address</label>
          <div class="mt-2">
            <input v-model="email" v-bind="emailAttrs" type="text"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" v-model="password" v-bind="passwordAttrs"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.base-component {}
</style>
