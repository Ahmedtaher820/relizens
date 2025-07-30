<script setup lang="ts">
import { UserCheckIcon } from 'lucide-vue-next';
import { onMounted } from 'vue';
import authServices from "@/services/auth"

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
// onMounted(() => {
//     authServices().getServices().then((res) => {
//         console.log(res)
//     })
// })
//#endregion

/***************************************
 **** Section Functions Declaration ****
 **************************************/
//#region Functions
//#endregion
</script>
<template>
    <div class=" text-blue-200 ">
        <div class="p-6">
            <h1 class="text-2xl font-bold mb-6 text-gray-800 ">Dashboard Summary</h1>

            <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <!-- Total Users -->
                <div class="bg-white shadow rounded-lg p-5">

                    <div class="text-sm text-gray-500 flex gap-2 items-center">
                        <p class="text-gray-800 text-lg font-bold">Total Users</p>
                        <User class="w-5 h-5 text-indigo-600" />
                    </div>
                    <div class="mt-1 text-3xl font-bold text-indigo-600">600.00</div>
                </div>

                <!-- Reports -->
                <div class="bg-white shadow rounded-lg p-5">
                    <div class="text-sm text-gray-500 flex gap-2 items-center">
                        <p class="text-gray-800 text-lg font-bold">Reports</p>
                        <ClipboardList class="w-5 h-5 text-amber-500" />
                    </div>
                    <div class="mt-1 text-3xl font-bold text-amber-500">260.00</div>
                </div>

                <!-- Active Users -->
                <div class="bg-white shadow rounded-lg p-5">
                    <div class="text-sm flex gap-2 items-center">
                        <p class="text-gray-800 text-lg font-bold">Active Users</p>
                        <UserCheckIcon class="w-5 h-5 text-green-500" />
                    </div>
                    <div class="mt-1 text-3xl font-bold text-green-500">400.00</div>
                </div>

                <!-- Inactive Users -->
                <div class="bg-white shadow rounded-lg p-5">
                    <div class="text-sm flex gap-2 items-center">
                        <p class="text-gray-800 text-lg font-bold">Inactive Users</p>
                        <UserX class="w-5 h-5 text-red-500" />
                    </div>
                    <div class="mt-1 text-3xl font-bold text-red-500">200.00</div>
                </div>
            </div>
        </div>

    </div>
</template>